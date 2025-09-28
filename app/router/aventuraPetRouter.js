const express = require('express');
const aventuraPetRouter = express.Router();
const aventuraPetController = require('../controller/aventuraPetController');

aventuraPetRouter.get('/aventura-pet', function(req, res){
    aventuraPetController.index(req, res);
});

module.exports = aventuraPetRouter;