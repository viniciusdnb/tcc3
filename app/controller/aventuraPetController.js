const petUserModel = require('../model/models/petUserModel');
const imagPetModel = require('../model/models/imgePetModel');
const userModel = require('../model/models/userModel');
const axios = require('axios')

module.exports = {
    index: function (req, res) {
        let cep = req.session.userAutentication.dataContactUser.cep
        axios.get({
            method: 'get',
            url: `https://www.cepaberto.com/api/v3/cep?cep=${cep}`,
            data: {
                headers: { 'Authorization': 'Token token=be380c54fed0e26adf0f82bf75438313' }
            }

        }).then(function (response) {

        })


        res.render('aventura-pet/index', { fileName: 'main' });
    },
    addPetPage: function (req, res) {

        res.render('aventura-pet/index', { fileName: 'add-pet' });
    },
    insertImgPet: async function (req, res) {
        let idUser = req.session.userAutentication.dataUser.idUser;

        try {
            const userPet = await petUserModel.create({
                id_usuario: idUser,
                nome_pet: req.bode.namePet,
                disponivel: true
            });

            const idPetUser = userPet.id_user_pet;

            for (let i = 0; i < req.body.imgpet.length; i++) {
                await imagPetModel.create({
                    id_user_pet: idPetUser,
                    imagem: req.body.imgpet[i]
                });
            }
        } catch (error) {

        }


    }
}
