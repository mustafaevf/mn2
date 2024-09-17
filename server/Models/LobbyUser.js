const { DataTypes } = require('sequelize')
const connection = require('../config/connection')

const LobbyUser = connection.define('lobby_user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
    },
    socketId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = LobbyUser;