const { DataTypes } = require('sequelize')
const connection = require('../config/connection')

const User = connection.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "test.jpg"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'avatar.png'
    },
    status: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = User;