var apn = require('apn');
var options = { 'production': false };
var apnConnection = new apn.Connection(options);

function sendNotification () {
    const token = '';
    var myDevice = new apn.Device(token);
}

module.exports = {
    sendNotification: sendNotification
};
