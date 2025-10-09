const imagemPetModel = require('../model/models/imagemPetModel');
const userModel = require('../model/models/userModel');
const axios = require('axios')

module.exports = {
    index:function(req, res){
        let cep = req.session.userAutentication.dataContactUser.cep
        axios.get({
            method:'get',
            url: `https://www.cepaberto.com/api/v3/cep?cep=${cep}`,
            data:{
                headers:{'Authorization': 'Token token=be380c54fed0e26adf0f82bf75438313'}
            }
             
        }).then(function(response){
            
        })

        /*
        SELECT ST_Distance_Sphere(
            POINT(-23.542298, -46.8848325),
            POINT(-23.5421686, -46.8812042)
)
        */
        res.render('aventura-pet/index', {fileName: 'main'});
    },
    addPetPage: function(req, res){
        
        res.render('aventura-pet/index', {fileName:'add-pet'});
    },
    insertImgPet: async function(req, res){
        let idUser = req.session.userAutentication.dataUser.idUser;
        for(let i = 0; i < req.body.imgpet.length; i++){
            await imagemPetModel.create({
                id_usuario: idUser,
                name_pet: req.body.namepet,
                imagem : req.body.namepet[i]
            });
        }

    }
}