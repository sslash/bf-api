var bunyan = require('bunyan');

// Basic usage.
var log = bunyan.createLogger({
    name: 'boyfriendr',
    level: 'info',
    src: process.env.NODE_ENV === 'production'
});

// isInfoEnabled replacement
console.log('Logger is initialized. log.info() is:', log.info())

module.exports = log;
