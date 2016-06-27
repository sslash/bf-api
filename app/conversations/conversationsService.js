'use strict';
var Promise = require('bluebird');
var conversationsDAO = require('./conversationsDAO');
var knex = require('../../db/knex');
var log = require('../helpers/logger');
const notificationService = require('../notifications/notificationService');


function getAll (lastSeenId) {
    return conversationsDAO.getAll(lastSeenId);
}

function create (conversation) {
    log.info('Saving: ', conversation);
    // todo save conversation with all messages within transaction

    if (!conversation.name || !conversation.messages || !conversation.messages.length) {
        log.info('Illegal params');
        throw new Error('conversation must have name and messages');
    }

    return new Promise((resolve, reject) => {
        // Using trx as a query builder:
        knex.transaction(function(trx) {

            return trx
            .insert({
                name: conversation.name,
                schedule_notification: conversation.scheduleNotification
            }, 'id')
            .into('conversations')
            .then(function(ids) {

                const convId = ids[0];

                return Promise.reduce(conversation.messages, function(prev, message) {
                    message.conversations_id = convId;

                    // Some validation could take place here.

                    if (!message.text) {
                        throw new Error('Conversation message must have a text ' + JSON.stringify(message));
                    }

                    let promise;

                    // if the message has an answer, save that first
                    // so we get the answer id
                    if (message.answer) {
                        promise = knex('answer').insert({
                                    text: message.answer.text,
                                    user_input_answer: message.answer.user_input_answer
                                }, 'id');
                    } else {
                        promise = Promise.resolve();
                    }

                    // save the message,
                    // potentially with an answer id, if there is one
                    return promise.then((maybeAnswerIds) => {
                        let answerId = (maybeAnswerIds && maybeAnswerIds.length) ?
                            maybeAnswerIds[0] : null;

                        if (answerId) {
                            message.answer_post_id = answerId;
                        }


                        const messageData = {
                            text: message.text,
                            conversations_id: convId,
                            answer_post_id: answerId,
                            image: message.image
                            // table.json('messages_for_answer_options');
                        }

                        log.info('Saving message save:', messageData);


                        return trx
                            .insert(messageData, 'id')
                            .into('messages');
                    });
                }, conversation.messages[0]);
            });

        })
        .then(function(inserts) {
            log.info(inserts.length + ' new messages saved.');

            // send out a notification
            setTimeout(notificationService.sendNotification);

            resolve(inserts);
        })
        .catch(function(error) {
            // If we get here, that means that neither the 'Old Books' catalogues insert,
            // nor any of the books inserts will have taken place.
            console.error(error);
            reject(error);
        });
    });
}

module.exports = {
    getAll: getAll,
    create: create
};
