var express = require('express');
var conversationsController = require('../app/conversations/conversationsController');
var router = express.Router();

router.get('/', conversationsController.getAll);

module.exports = router;
