var logger = require('../helpers/logger');
var knex = require('../../db/knex.js');


function createFromToken(req, res, next) {
    const body = req.body;
    const data = {
        app_token: body.token,
        app_os: body.os
    };

    logger.info('Creating new user', data);

    if (!body.token || !body.os) {
        logger.info('tried to create user from token with illegal input', body);
        return next({message: 'must have token and os'});
    }

    knex('users').insert(data)
    .then(() => {
        res.json({status: 'ok'});
    })
    .catch((err) => {
        logger.warn({message: 'Failed to create user'}, err);
        next({message: 'something went wrong while storing token'});
    });


}

module.exports = {
    createFromToken: createFromToken
};
