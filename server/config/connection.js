const {Sequelize} = require('sequelize')

const sequelize = new Sequelize("mn", "postgres", "1234", {
                                    dialect: "postgres",
                                    host: "127.0.0.1",
                                    logging: false,
                                });


// const sequelize = new Sequelize("postgres://postgres:12345@db:5432/db");
// const sequelize = new Sequelize("postgres://postgres:1234@localhost:5432/mn");

module.exports = sequelize;