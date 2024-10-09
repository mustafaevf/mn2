const {Lobby, Platform, User, LobbyUser, Board, BoardUser} = require('../associations');
const { randomUUID } = require('crypto');
const {Player, Game, Fields} = require('../Games/monopoly');

exports.getStatus = async(req, res) => {
    const uuid = req.params.uuid;
    try {
        const response = await Lobby.findOne({where: {uuid: uuid}});
        if(!response) {
            return res.json({message: "not founde"});
        }

        const lobby_users = await LobbyUser.findAll({where: {lobbyId: response.id}});
        
        const users = await Promise.all(
            lobby_users.map(async (lobby_user) => {
                const user = await User.findByPk(lobby_user.userId);
                return {user, socketId: lobby_user.socketId};
            })
        );

        return res.json({board: response, users: users});

    } catch(error) {
        return res.json({message: error});
    }
};

exports.getFields = async(req, res) => {
    res.json(Fields);
};