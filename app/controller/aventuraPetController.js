const petUserModel = require('../model/models/petUserModel');
const imagePetModel = require('../model/models/imagePetModel');
const userModel = require('../model/models/userModel');
const axios = require('axios')

module.exports = {
    index: function (req, res) {
        res.render('aventura-pet/index', { fileName: 'main' });
    },
    addPetPage: function (req, res) {

        res.render('aventura-pet/index', { fileName: 'add-pet' });
    },
    insertImgPet: async function (req, res) {
        
        let idUser = req.session.userAutentication.dataUser.idUser;

        /*try {
            const userPet = await petUserModel.create({
                id_usuario: idUser,
                nome_pet: req.bode.namePet,
                disponivel: true
            });

            const idPetUser = userPet.id_user_pet;

            for (let i = 0; i < req.body.imgpet.length; i++) {
                await imagePetModel.create({
                    id_user_pet: idPetUser,
                    imagem: req.body.imgpet[i]
                });
            }
        } catch (error) {

        }*/


    }
}
