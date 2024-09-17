const { DataTypes } = require('sequelize')
const connection = require('../config/connection')

const Platform = connection.define('platform', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Platform;