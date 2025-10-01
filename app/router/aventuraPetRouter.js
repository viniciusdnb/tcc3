const express = require('express');
const aventuraPetRouter = express.Router();
const aventuraPetController = require('../controller/aventuraPetController');

const isAutentication = function (req, res, next) {
    if (!req.session.autentication) {
        if (!req.session.strErrorMsg) {
            req.session.strErrorMsg = "";
        }
        req.session.strErrorMsg = "voce nao tem autorização para acessar a pagina";
        return res.redirect('/login');
    }

    next();
}


aventuraPetRouter.get('/aventura-pet', isAutentication, function (req, res) {
    aventuraPetController.index(req, res);
});

aventuraPetRouter.get('/aventura-pet/add-pet', isAutentication, function (req, res) {
    aventuraPetController.addPetPage(req, res);
})

module.exports = aventuraPetRouter;