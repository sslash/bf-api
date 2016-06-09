var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ReactDOM = require('react-dom/server');
var PrettyError = require('pretty-error');

//
//
var favicon = require('serve-favicon');
var logger = require('morgan');
var errorHandler = require('api-error-handler');
//
// // routes
var conversations = require('./routes/conversations');
var users = require('./routes/users');
//
var app = express();
//
// //
// // Register Node.js middleware
// // -----------------------------------------------------------------------------
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

app.use('/api/v1/conversations', conversations);
app.use('/api/v1/users', users);

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use(errorHandler());

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

if (process.env.SEND_TOKEN) {
    require('./app/notifications/notificationService').sendNotification()
    .then(() => {
        console.log('win');
    })
    .catch((err) => {
        console.error('Failed to send notification', err);
    })
}

//
module.exports = app;
