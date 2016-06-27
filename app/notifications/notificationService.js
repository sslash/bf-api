var apn = require('apn');
var logger = require('../helpers/logger');
var path = require('path');

var certDir = path.join(__dirname, 'cert.pem');
var keyDir = path.join(__dirname, 'key.pem');

var options = {
    'production': false,
    cert: certDir,
    key: keyDir
};

var apnConnection = new apn.Connection(options);
var knex = require('../../db/knex.js');


function _sendNotifications (userTokens) {
    return userTokens.map((userRes) => {
        var token = userRes.app_token;
        logger.info('Sending notification: ', {token, userRes});

        var myDevice = new apn.Device(token);

        var note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 1;
        note.sound = "ping.aiff";
        note.alert = "Hey! I have a message for you.";
        note.payload = {};

        // resolve even if it fails
        return new Promise(resolve => 
            setTimeout(() => {
                apnConnection.pushNotification(note, myDevice)
                .then(resolve)
                .catch(resolve);
            })
        );
    });
}


function sendNotification () {

    return knex('users')
        .where({
            app_os: 'ios'
        })
        .then(_sendNotifications);
}

module.exports = {
    sendNotification: sendNotification
};
