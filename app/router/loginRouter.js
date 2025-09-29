const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controller/loginController');
const { checkSchema, validationResult } = require('express-validator');


loginRouter.get('/login', function (req, res) {
    loginController.index(req, res);
});

loginRouter.post('/login/enter',
    checkSchema({
        user: {
            in: ['body'],
            errorMessage: "email invalido",
            trim: true,
            escape: true,
            notEmpty: true,
            isEmail: true,
            isLength: {
                options: {
                    max: 100
                }
            }
        },
        pass: {
            in: ['body'],
            isLength: {
                options: { min: 8 }
            },
            matches: {
                options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
            },
            trim: true,
            escape: true
        }
    }),
    function (req, res) {
        let errorResult = validationResult(req);
        if (!errorResult.isEmpty()) {
            if (!req.session.strErrorMsg) {
                req.session.strErrorMsg = "";
            }
            req.session.strErrorMsg = "senha invalido tente novamente";
            res.redirect('/login');
            req.session.strErrorMsg = "";
        }

        loginController.enter(req, res);
    });

loginRouter.get('/login/logout', function (req, res) {
    req.session.destroy();

    res.redirect('/login');

})

module.exports = loginRouter;
