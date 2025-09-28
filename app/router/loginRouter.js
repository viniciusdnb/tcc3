const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controller/loginController');

loginRouter.get('/login', function(req, res){
    loginController.index(req, res);
});

module.exports = loginRouter;
