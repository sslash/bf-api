const conversationsService = require('./conversationsService');

function getAll(req, res, next) {
    conversationsService.getAll()
    .then((conversations) => {
        res.status(200)
        .json({
            conversations: conversations ? conversations.length : 0,
            result: conversations 
        });
    })
    .catch(next);
}

module.exports = {
    getAll: getAll
};
