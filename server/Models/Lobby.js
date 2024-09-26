const { DataTypes } = require('sequelize')
const connection = require('../config/connection')

const Lobby = connection.define('lobby', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
    },
    uuid: {
        type: DataTypes.STRING,
        allowNull: true
    },
    max_person: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    settings: {
        type: DataTypes.JSON,
        allowNull: true,
    }
});

module.exports = Lobby;