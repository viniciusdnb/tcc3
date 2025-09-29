const express = require('express');
const aventuraPetRouter = express.Router();
const aventuraPetController = require('../controller/aventuraPetController');

aventuraPetRouter.get('/aventura-pet', function (req, res) {
    if (!req.session.autentication) {
        if (!req.session.strErrorMsg) {
            req.session.strErrorMsg = "";
        }
        req.session.strErrorMsg = "voce nao tem autorização para acessar a pagina";
        res.redirect('/login');
        req.session.strErrorMsg = "";
    }
    aventuraPetController.index(req, res);
});

module.exports = aventuraPetRouter;