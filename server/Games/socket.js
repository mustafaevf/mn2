const { Lobby, User, LobbyUser } = require('../associations');
const { games, Game } = require('./Game');

module.exports = (io) => {
    io.of('api/game').on('connection', (socket) => {
        socket.on('client_init', async () => {
            console.log('Client cnnect');
        });

        socket.on('get_lobbies', async () => {
            const lobbies = await Lobby.findAll({where: {status: 1} })
            io.of('/api/game').emit('lobbies', lobbies);
        });

        socket.on('connected', async (data) => {
            try {
                const lobbyUser = await LobbyUser.findOne({
                    where: { userId: data.user.id },
                });
                if (lobbyUser) {
                    const current_game = games.find(
                        (game) => game.id === lobbyUser.lobbyId
                    );
                    if(current_game) {
                        current_game.io = io;
                    }
                    console.log(games);
                    if (
                        !current_game.players.find((us) => us.id === data.user.id)
                    ) {
                        const user = await User.findByPk(lobbyUser.userId);
    
                        socket.join(current_game.id);
                        current_game.addPlayer(
                            user.id,
                            socket.id,
                            current_game.id,
                            user.login
                        );
                        current_game.broadcastMessage(
                            user.login + ' подключился к игре'
                        );
                    } else {
                        socket.join(current_game.id);
                    }
    
                    if (
                        current_game.players.length === current_game.max_person &&
                        current_game.round === 0
                    ) {
                        current_game.broadcastMessage('Start game');
                        current_game.startGame();
                    }
                    current_game._update();
    
                    await lobbyUser.update({
                        socketId: socket.id,
                    });
                }
            } catch(er) {
                console.log(er);
            }
            
        });

        socket.on('rollDice', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find(
                    (game) => game.id === lobbyUser.lobbyId
                );
                current_game.rollDice();
            }
        });

        socket.on('buyProperty', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find(
                    (game) => game.id === lobbyUser.lobbyId
                );
                current_game.buyProperty();
            }
        });

        socket.on('payTax', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find(
                    (game) => game.id === lobbyUser.lobbyId
                );
                current_game.payTax();
            }
        });
        socket.on('pawnProperty', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find(
                    (game) => game.id === lobbyUser.lobbyId
                );
                current_game.pawnProperty(data.user.id, data.property);
            }
        });

        socket.on('buybackProperty', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find(
                    (game) => game.id === lobbyUser.lobbyId
                );
                current_game.buybackProperty(data.user.id, data.property);
            }
        });

        socket.on('upgradeProperty', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find(
                    (game) => game.id === lobbyUser.lobbyId
                );
                current_game.upgradeProperty(data.user.id, data.property);
            }
        });

        socket.on('offerDeal', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find(
                    (game) => game.id === lobbyUser.lobbyId
                );
                current_game.offerDeal(data.user.id, data.data);
            }
        });

        socket.on('leaveGame', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find(
                    (game) => game.id === lobbyUser.lobbyId
                );
                current_game.leaveGame(data.user.id);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
