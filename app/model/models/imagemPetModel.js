const connect = require('../connect');
const {DataTypes} = require('sequelize');

const imagemPetModel = connect.define(
    'imagem_pet',{
        id_imagem_pet:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nome_pet:{
            type: DataTypes.CHAR(50),
            allowNull: null
        },
        id_usuario:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imagem:{
            type: DataTypes.BLOB,
            allowNull: false
        }
    },
    {
        timestamps:false,
        freezeTableName:true
    }
);

module.exports = imagemPetModel;