var express = require('express');
var conversationsController = require('../app/conversations/conversationsController');
var router = express.Router();

router
    .get('/', conversationsController.getAll)
    .post('/', conversationsController.create);

module.exports = router;
