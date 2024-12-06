const {
    Lobby,
    Platform,
    User,
    LobbyUser,
    Board,
    BoardUser,
} = require('../associations');
const { randomUUID } = require('crypto');
const { Player, Game, Fields } = require('../Games/Game');

exports.getStatus = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const response = await Lobby.findOne({ where: { uuid: uuid } });
        if (!response) {
            return res.json({ message: 'not founded' });
        }

        const lobby_users = await LobbyUser.findAll({
            where: { lobbyId: response.id },
        });


        const players = await Promise.all(
            lobby_users.map(async (lobby_user) => {
                const user = await User.findByPk(lobby_user.userId, {attributes: ["id", "login", "balance", "status", "image"]});

                return {...user.toJSON(), socketId: lobby_user.socketId};
            })
        );

        const result = {
            ...response.toJSON(),
            players
        };

        return res.json(result);
    } catch (error) {
        return res.json({ message: error });
    }
};
