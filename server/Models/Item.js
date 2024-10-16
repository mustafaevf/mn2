const { DataTypes } = require('sequelize')
const connection = require('../config/connection')

const Item = connection.define('item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    settings: {
        type: DataTypes.JSON,
        allowNull: true,
    },
});

module.exports = Item;