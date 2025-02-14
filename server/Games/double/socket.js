const { User } = require('../../associations');
const { gameState, start } = require('./double');

module.exports = (io) => {
    start(io.of('api/games/double'));
    io.of('api/games/double').on('connection', (socket) => {
        console.log("User from game double connected");
        
        socket.on('place_bet', async (data) => {
            // const user = await User.findAll({where: {status: 1} })
            // io.of('/api/game').emit('lobbies', lobbies);
            if(!data) {
                console.log("error, data");
                socket.emit("error", "Internal error");
            }

            if(!data.user) {
                console.log("user not exist in data");
                socket.emit("error", "Internal error");
            }


            const user = await User.findByPk(data.user.id);

            if(gameState.bets.find((bet) => bet.user.id == user.id)) {
                return socket.emit("error", "Вы уже поставили");
            }

            if(user.balance < data.bet) {
                return socket.emit("error", "Incorrect bet");
            }

            user.balance -= data.bet;

            await user.save();

            if (gameState.running) {
                return socket.emit('error', 'Game already in progress');
            }

            if(gameState.running == false)

            gameState.bets.push({bet: data.bet, color: data.color, user: data.user});
            console.log(data);
        });


    
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
