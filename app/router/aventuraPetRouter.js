const express = require('express');
const aventuraPetRouter = express.Router();
const aventuraPetController = require('../controller/aventuraPetController');

const {isImage, imageValidationResult} = require('express-image-validator');
const { checkSchema, validationResult } = require('express-validator');

const schema = isImage('imgpet',{
    require: true,
    limit: 3,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/jpg']
});


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
});

aventuraPetRouter.post('/aventura-pet/add-img', 
    isAutentication,
    checkSchema({
        namepet:{
            in:['body'],
            escape: true,
            trim: true,
            errorMessage: "nome invalido tente novamente",
            notEmpty: true,
            isLength: {
                options: {
                    min: 4,
                    max: 100
                }
            }
        }
    }),
    schema,
    function(req, res){
    const imgResult = imageValidationResult(req);
    const errorResult = validationResult(req);
        
    if(!imgResult.isEmpty()){
        if(!req.session.strErrorMsg){
            req.session.strErrorMsg = "";
        }
         req.session.strErrorMsg = "imagem invalida tente novamente"
        return res.redirect('/aventura-pet')
    }
    if(!errorResult.isEmpty()){
        if(!req.session.strErrorMsg){
            req.session.strErrorMsg = "";
        }
        req.session.strErrorMsg = "nome invalido tente novamente"
        
        return res.redirect('/aventura-pet')
    }
    
 

    console.log("imgem e nome concluido");
})

module.exports = aventuraPetRouter;