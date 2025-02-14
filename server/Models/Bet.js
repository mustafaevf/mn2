const { DataTypes } = require('sequelize')
const connection = require('../config/connection')

const Bet = connection.define('bet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    game: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Bet;