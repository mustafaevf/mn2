const { User, Bet } = require('../../associations');
const { gameInfo, start, cashOut } = require('./crash');

module.exports = (io) => {
    start(io.of('api/games/crash'));
    io.of('api/games/crash').on('connection', (socket) => {
        console.log('User from game crash connected');

        socket.on('place_bet', async (data) => {
            if (!data) {
                console.log('error, data');
                return socket.emit('error', 'Internal error');
            }

            if (!data.user) {
                console.log('user not exist in data');
                return socket.emit('error', 'Internal error');
            }

            const user = await User.findByPk(data.user.id);

            if (gameInfo.orders.find((gi) => gi.user.id == user.id)) {
                return socket.emit('error', 'Вы уже поставили');
            }

            if(data.bet <= 0) {
                return socket.emit("error", "Ставка должна быть больше 0");
            } 

            if(user.balance < data.bet) {
                return socket.emit("error", "Недостаточно средств на балансе");
            }

            user.balance -= data.bet;

            await user.save();

            if (gameInfo.isRunning) {
                return socket.emit('error', 'Game already in progress');
            }
            await Bet.create({amount: data.bet, currency: 'RUB', game: 'crash', status: 0, userId: user.id});
            gameInfo.orders.push({ user: data.user, bet: data.bet, cashoutAt: data.cashoutAt });
            io.of('api/games/crash').emit("game_info", { orders: gameInfo.orders, isRunning: gameInfo.isRunning, ceff: gameInfo.ceff });
        });

        socket.on('cash_out', async (data) => {
            console.log(gameInfo);
            if(!data.user) {
                return socket.emit('error', 'user not exist');
            }
            socket.emit("game_info", { orders: gameInfo.orders, isRunning: gameInfo.isRunning, ceff: gameInfo.ceff });
            console.log(data);
            cashOut(data.user);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
