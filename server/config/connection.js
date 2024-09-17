const {Sequelize} = require('sequelize')

const sequelize = new Sequelize("mn", "postgres", "1234", {
                                    dialect: "postgres",
                                    host: "localhost",
                                    logging: false,
                                });
module.exports = sequelize;