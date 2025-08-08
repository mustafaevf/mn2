const { Lobby, User, LobbyUser } = require('../../associations');
const { Op } = require('sequelize');
const { games, Game } = require('./Game');
const { randomUUID } = require('crypto');
const Field = require('./Field');

module.exports = (io) => {
    io.of('api/games/monopoly').on('connection', (socket) => {
        socket.on('client_init', async () => {
            console.log('Client cnnect');
        });

        socket.on('get_lobbies', async () => {
            const lobbiesWithUsers = await getLobbiesWithUsers();
            io.of('api/games/monopoly').emit(
                'lobbies',
                lobbiesWithUsers
            );
        });

        socket.on('update_lobby', async (lobbyId) => {
            const lobbiesWithUsers = await getLobbiesWithUsers();
            io.of('api/games/monopoly').emit(
                'lobbies',
                lobbiesWithUsers
            );
        });

        socket.on('create_lobby', async (data) => {
            console.log('create lobby');
            const { user, maxPerson } = data;
            const userId = user.id;
            if (!maxPerson || !userId) {
                return socket.emit('error', 'Заполните все параметры');
            }

            if (!User.findByPk(userId)) {
                return socket.emit('error', 'Пользователь не найден');
            }

            const existLobby = await Lobby.findAll({
                where: { status: 0, userId: user.id },
            });

            if (existLobby.length > 0) {
                return socket.emit('error', 'У вас уже есть созданные лобби');
            }

            const createdLobby = await Lobby.create({
                uuid: randomUUID(),
                max_person: maxPerson,
                status: 0,
                userId: userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            await LobbyUser.create({ userId: userId, lobbyId: createdLobby.id, socketId: socket.id });
            socket.emit('success', 'Лобби создано');
            const lobbiesWithUsers = await getLobbiesWithUsers();
            io.of('api/games/monopoly').emit(
                'lobbies',
                lobbiesWithUsers
            );
        });

        const getLobbiesWithUsers = async () => {
            const lobbies = await Lobby.findAll({
                where: { status: { [Op.or]: [0, 1] } },
            });
        
            const lobbiesWithUsers = await Promise.all(
                lobbies.map(async (lobby) => {
                    const lobbyUsers = await LobbyUser.findAll({ where: { lobbyId: lobby.id } });
                    const users = await Promise.all(
                        lobbyUsers.map(async (lobbyUser) => await User.findByPk(lobbyUser.userId))
                    );
        
                    return { ...lobby.toJSON(), users };
                })
            );
        
            return lobbiesWithUsers;
        };

        socket.on('start_lobby', async (data) => {
            const { lobbyId, user } = data;

            const currentLobby = await Lobby.findByPk(lobbyId);

            if (currentLobby.userId != user.id) {
                return socket.emit('error', 'Только создатель лобби может начать игру');
            }

            const lobbyUsers = await LobbyUser.findAll({
                where: { lobbyId: currentLobby.id },
            });

            if (lobbyUsers.length !== currentLobby.max_person) {
                return socket.emit('error', 'Кол-во игроков должно быть ' + currentLobby.max_person);
            }

            

            currentLobby.status = 2;

            if (!games.find((game) => game.id === lobbyId)) {
                const lobby = await Lobby.findByPk(lobbyId);
                let _game = new Game(
                    currentLobby.id,
                    currentLobby.uuid,
                    currentLobby.max_person 
                );

                games.push(_game);
                setTimeout(() => {
                    _game._checkConnection();
                }, 60000);
            }
            await currentLobby.save();
            const lobby = await Lobby.findByPk(lobbyId);
            lobbyUsers.forEach(user => {
                io.of('api/games/monopoly').to(user.socketId).emit("startedGame", {uuid: lobby.uuid});
            });

            socket.emit('success', 'Игра запущена ' + currentLobby.id);
            const lobbiesWithUsers = await getLobbiesWithUsers();
            io.of('api/games/monopoly').emit(
                'lobbies',
                lobbiesWithUsers
            );
        });

        socket.on('connect_lobby', async (data) => {
            const { user, lobbyId } = data;
            const existLobbyUser = await LobbyUser.findOne({
                where: { lobbyId: lobbyId, userId: user.id },
            });
            if (!existLobbyUser) {
                const result = await LobbyUser.findAll({ where: { userId: user.id } });
                if (result.length != 0) {
                    socket.emit('success', 'Вы уже в лобби');
                } else {
                    socket.emit('success', 'Вы подключились');
                    await LobbyUser.create({ userId: user.id, lobbyId: lobbyId, socketId: socket.id });
                }
                const lobbiesWithUsers = await getLobbiesWithUsers();
                io.of('api/games/monopoly').emit(
                    'lobbies',
                    lobbiesWithUsers
                );
            }
        });

        socket.on('disconnect_lobby', async (data) => {
            const { user, lobbyId } = data;

            const existLobbyUser = await LobbyUser.findOne({
                where: { lobbyId: lobbyId, userId: user.id },
            });
            const currentLobby = await Lobby.findByPk(lobbyId);
            if (currentLobby.userId == user.id) {
                Lobby.destroy({ where: { id: currentLobby.id } });
            }

            if (existLobbyUser) {
                await LobbyUser.destroy({
                    where: { lobbyId: lobbyId, userId: user.id },
                });
            }
            socket.emit('success', 'Вы покинули лобби');
            const lobbiesWithUsers = await getLobbiesWithUsers();
            io.of('api/games/monopoly').emit(
                'lobbies',
                lobbiesWithUsers
            );
        });

        socket.on('connect_board', async (data) => {
            console.log('connect');
            try {
                const lobbyUser = await LobbyUser.findOne({
                    where: { userId: data.user.id },
                });
        
                if (!lobbyUser) {
                    console.log('Lobby user not found');
                    return;
                }

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
        
                const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
        
                if (!current_game) {
                    console.log(`Game with ID ${lobbyUser.lobbyId} not found`);
                    return;
                }
        
                current_game.io = io;
        
                if (!current_game.players.find((us) => us.id === data.user.id)) {
                    const user = await User.findByPk(lobbyUser.userId);
        
                    if (!user) {
                        console.log(`User with ID ${lobbyUser.userId} not found`);
                        return;
                    }
        
                    socket.join(current_game.id);
                    current_game.addPlayer(user.id, socket.id, current_game.id, user.login);
                    current_game.broadcastMessage(`${user.login} подключился к игре`);
                } else {
                    socket.join(current_game.id);
                }
        
                if (current_game.players.length === current_game.max_person && current_game.round === 0) {
                    current_game.broadcastMessage('Start game');
                    current_game.startGame();
                }
                console.log("update");
                current_game._update();
                socket.emit('fields', Field);
                console.log("ok senmd")
        
                await lobbyUser.update({
                    socketId: socket.id,
                });
        
            } catch (er) {
                console.error('Error in connect_board:', er);
            }
        });
        
        socket.on('sendMessage', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                console.log(lobbyUser.lobbyId)
                const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
                current_game.sendMessage(data.user.id, data.message);
            }
        });

        socket.on('rollDice', async (data) => {
            console.log(data);
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                console.log(lobbyUser.lobbyId)
                const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
                current_game.rollDice();
            }
        });

        socket.on('buyProperty', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
                current_game.buyProperty();
            }
        });

        socket.on('payTax', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
                current_game.payTax();
            }
        });
        socket.on('pawnProperty', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
                current_game.pawnProperty(data.user.id, data.property);
            }
        });

        socket.on('buybackProperty', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
                current_game.buybackProperty(data.user.id, data.property);
            }
        });

        socket.on('upgradeProperty', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
                current_game.upgradeProperty(data.user.id, data.property);
            }
        });

        socket.on('offerDeal', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
                current_game.offerDeal(data.user.id, data.data);
            }
        });

        socket.on('leaveGame', async (data) => {
            const lobbyUser = await LobbyUser.findOne({
                where: { userId: data.user.id },
            });
            if (lobbyUser) {
                const current_game = games.find((game) => game.id === lobbyUser.lobbyId);
                current_game.leaveGame(data.user.id);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
