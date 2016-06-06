const conversationsService = require('./conversationsService');

function getAll(req, res, next) {
    const lastSeenId = req.query.lastSeenId;
    conversationsService.getAll(lastSeenId)
    .then((conversations) => {
        res.status(200)
        .json({
            conversations: conversations ? conversations.length : 0,
            result: conversations
        });
    })
    .catch(next);
}

function create(req, res, next) {
    const conversation = req.body.conversation;

    if (!conversation) {
        return next({message: 'conversation must be included', status: 401});
    }

    conversationsService.create(conversation)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch(next);
}

module.exports = {
    getAll: getAll,
    create: create
};
