const { User } = require('../../associations');
const { gameState, initGame, calculateCoefficients } = require('./miner');
const { formatMoney } = require('../../utils/formatMoney');

module.exports = (io) => {
    // start(io.of('api/games/miner'));
    io.of('api/games/miner').on('connection', (socket) => {
        console.log('User from game miner connected');

        socket.on('getCoefficients', async (data) => {
            const { countMines } = data;
            const coefficients = calculateCoefficients(countMines);
            socket.emit('onCoefficients', { coefficients });
        });

        socket.on('place_bet', async (data) => {
            if (!data) {
                console.log('error, data');
                socket.emit('error', 'Internal error');
                return;
            }

            if (!data.user) {
                console.log('user not exist in data');
                socket.emit('error', 'Internal error');
                return;
            }

            const user = await User.findByPk(data.user.id);

            if (user.balance < data.bet) {
                return socket.emit('error', 'Incorrect bet');
            }

            user.balance -= data.bet;

            await user.save();

            // if (gameState.running) {
            //     return socket.emit('error', 'Game already in progress');
            // }

            // if(gameState.running == false)

            // gameState.bets.push({bet: data.bet, color: data.color, user: data.user});
            initGame(user, data.bet, data.countMines);
            socket.emit('success', 'Выберите ячейки');
            console.log(gameState);
        });

        socket.on('makeTurn', (data) => {
            const game = gameState.games.find((game) => game.user.id === data.user.id);
            if (!game) {
                return socket.emit('error', 'Вы не сделали ставку');
            }

            const index = data.index;
            console.log(game.board);

            if (index < 0 || index >= 25) {
                return socket.emit('error', 'Некорректный ход');
            }

            if (game.board[index] == -1) {
                return socket.emit('error', 'Эта клетка уже открыта');
            }

            if (game.board[index] == 1) {
                game.board[index] = -1;
                game.turn++;
                socket.emit('onTurn', {
                    index: index,
                    value: game.board[index],
                    turn: game.turn,
                    coefficient: game.coefficients[game.turn],
                });
            }

            if (game.board[index] == 2) {
                socket.emit('gameOver', { status: 'lose', message: 'Вы проиграли ' + formatMoney(game.bet) + ' RUB.' });
                gameState.games = gameState.games.filter((g) => g.user.id !== data.user.id);
                return socket.emit('onTurn', {
                    index: index,
                    value: game.board[index],
                    turn: game.turn,
                    coefficient: game.coefficients[game.turn],
                });
            }
        });

        socket.on('collectWinnings', async (data) => {
            const game = gameState.games.find((game) => game.user.id === data.user.id);
            if (!game) {
                return socket.emit('error', 'Вы не сделали ставку');
            }

            const result = game.bet * game.coefficients[game.turn - 1];

            const user = await User.findByPk(game.user.id);

            user.balance += result;

            await user.save();
            socket.emit('gameOver', { status: 'win', message: 'Вы заработали ' + formatMoney(result) + ' RUB' });
            console.log(result, game.coefficients[game.turn - 1]);
            gameState.games = gameState.games.filter((g) => g.user.id !== data.user.id);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
