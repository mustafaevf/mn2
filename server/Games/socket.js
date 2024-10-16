const {
    Lobby,
    User,
    LobbyUser,
} = require('../associations');
const { games, Game } = require('./monopoly');

module.exports = (io) => {
    io.of('api/plays').on('connection', (socket) => {
        socket.on('client_init', async () => {});
    
        socket.on('connected', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                if (!games.find((game) => game.id === lobbyUser.lobbyId)) {
                    const lobby = await Lobby.findByPk(lobbyUser.lobbyId);
                    var result = new Game(
                        lobby.id,
                        lobby.uuid,
                        lobby.max_person,
                        io
                    );
    
                    games.push(result);
                }
                const current_game = games.find(
                    (game) => game.id === lobbyUser.lobbyId
                );
                if (!current_game.players.find((us) => us.id === data.user.id)) {
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
    
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}