var usersController = require('../app/users/usersController');
var express = require('express');
var router = express.Router();

/* GET users listing. */
// TODO: save token API
router.post('/from-token', usersController.createFromToken);

module.exports = router;
