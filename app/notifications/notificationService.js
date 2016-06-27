var apn = require('apn');
var logger = require('../helpers/logger');
var path = require('path');

var certDir = path.join(__dirname, 'cert.pem');
var keyDir = path.join(__dirname, 'key.pem');

var options = {
    production: process.env.NODE_ENV === 'production',
    cert: certDir,
    key: keyDir
};

var apnConnection = new apn.Connection(options);
var knex = require('../../db/knex.js');


function _sendNotifications(userTokenz) {

    const userTokens = [
        { app_token: '1465985797837' },
        { app_token: 'b4277db1892960d37b08b1df44496ef56eaf51940ec0bbd4108494f5479bbc88' },
        { app_token: '1466689613743' },
        { app_token: 'c66d276c4bad7f407be9a41dd86781303c8e71d9ba1da062f351261340da9c14' }
    ];

    return userTokens.map((userRes) => {
        var token = userRes.app_token;
        logger.info('Sending notification: ', token);

        try {

            var myDevice = new apn.Device(token);

            var note = new apn.Notification();

            note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
            note.badge = 1;
            note.sound = "ping.aiff";
            note.alert = "Hey! I have a message for you.";
            note.payload = {};

            // resolve even if it fails
            apnConnection.pushNotification(note, myDevice);

        } catch (err) {
            logger.warn('Failed to do push notification', err);
        }
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
