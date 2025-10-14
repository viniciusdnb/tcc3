const express = require('express');
const aventuraPetRouter = express.Router();
const aventuraPetController = require('../controller/aventuraPetController');
const { checkSchema, validationResult } = require('express-validator');
//const uploads = require('../libs/multerFunctions');
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({storage: storage});

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
    uploads.single('imgpet'),
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
    function(req, res){
    const errorResult = validationResult(req);
        

    if(!errorResult.isEmpty()){
        if(!req.session.strErrorMsg){
            req.session.strErrorMsg = "";
        }
        req.session.strErrorMsg = "nome invalido tente novamente"
        
        return res.redirect('/aventura-pet')
    }
    
 
    aventuraPetController.insertImgPet(req, res);
    
});

aventuraPetRouter.get('/aventura-pet/get-img', function(req, res){
    aventuraPetController.getImgPet(req, res)
})

module.exports = aventuraPetRouter;

