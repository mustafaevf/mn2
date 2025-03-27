const { Op } = require('sequelize');
const { Bet } = require('../associations');

module.exports = (io) => {
    io.of('api/other').on('connection', (socket) => {
        socket.on('getBets', async (data) => {});
    });
};
