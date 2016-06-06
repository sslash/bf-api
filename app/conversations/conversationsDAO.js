var knex = require('../../db/knex.js');
var _ = require('lodash');

function Conversations() {
    return knex('conversations as conv');
}

// *** queries *** //

function getAll(conversationId) {
    conversationId = conversationId || 0;
    return Conversations()
        .join('messages as msg', 'conv.id', '=', 'msg.conversations_id')
        .leftJoin('answer as answ', 'answ.id', '=', 'msg.answer_post_id')
        .orderBy('msg.id', 'asc')
        .select('answ.text as answer_text')
        .select('answer_post_id')
        .select('user_input_answer')
        .select('msg.*')
        .where('conv.id', '>', conversationId)
        .then(mapResult);
}

function mapResult(res) {
    return _.values(_.reduce(res, (total, current) => {

            if (!total[current.conversations_id]) {
                total['' + current.conversations_id] = [current];
            } else {
                total['' + current.conversations_id].push(current);
            }
            return total;

        }, {}));
}


module.exports = {
    getAll: getAll
};
