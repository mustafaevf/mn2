const { DataTypes } = require('sequelize')
const connection = require('../config/connection')

const ItemUser = connection.define('item_user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
    },
    
});

module.exports = ItemUser;