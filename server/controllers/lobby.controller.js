const {
    Lobby,
    Platform,
    User,
    LobbyUser,
} = require('../associations');
const { randomUUID } = require('crypto');
const { Fields } = require('../Games/monopoly')

exports.getLobbies = async (req, res) => {
    try {
        const lobbies = await Lobby.findAll({ where: { status: 0 || 1} });
        res.status(200).json(lobbies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    const lobbyId = req.params.id;

    const users_id = await LobbyUser.findAll({ where: { lobbyId: lobbyId } });
    const users = await Promise.all(
        users_id.map(async (user_id) => {
            const user = await User.findByPk(user_id.userId);
            return user;
        })
    );
    res.status(200).json({ users });
};

exports.createLobby = async (req, res) => {
    const userId = req.user.id;
    const { max_person, platformId } = req.body;
    if (!max_person || !platformId || !userId) {
        return res.status(401).json({ message: 'Fill all parametrs' });
    }

    if (!User.findByPk(userId)) {
        return res.status(402).json({ message: 'User not founded' });
    }

    if (!Platform.findByPk(platformId)) {
        return res.status(402).json({ message: 'Platform not founded' });
    }

    try {
        const createdLobby = await Lobby.create({
            uuid: randomUUID(),
            max_person: max_person,
            status: 0,
            platformId: platformId,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await LobbyUser.create({ userId: userId, lobbyId: createdLobby.id });
        res.status(200).json({ createdLobby });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.connectLobby = async (req, res) => {
    const lobbyId = req.params.id;
    const user = req.user;
    const existLobbyUser = await LobbyUser.findOne({
        where: { lobbyId: lobbyId, userId: user.id },
    });
    if (!existLobbyUser) {
        const result = await LobbyUser.findAll({ where: { userId: user.id } });
        if (result.length != 0) {
            console.log('вы уже подключены');
        } else {
            await LobbyUser.create({ userId: user.id, lobbyId: lobbyId });
        }
    }
};

exports.disconnectLobby = async (req, res) => {
    const lobbyId = req.params.id;
    const user = req.user;
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
};

exports.startLobby = async (req, res) => {
    const lobbyId = req.params.id;
    const user = req.user;

    const currentLobby = await Lobby.findByPk(lobbyId);

    if (currentLobby.userId != user.id) {
        return res.json({ message: 'Owner must start game' });
    }

    const lobbyUsers = await LobbyUser.findAll({
        where: { lobbyId: currentLobby.id },
    });

    if (lobbyUsers.length !== currentLobby.max_person) {
        return res.json({ message: 'max_person' });
    }

    currentLobby.status = 1;

    await currentLobby.save();
    return res.json({ currentLobby });
};

exports.waitLobby = async (req, res) => {
    const user = req.user;

    const currentLobby = await LobbyUser.findOne({
        where: { userId: user.id },
    });
    if (currentLobby) {
        const lobby = await Lobby.findByPk(currentLobby.lobbyId);
        return res.status(200).json({ lobby });
    }
};

exports.getLobby = async (req, res) => {
    const lobbyId = req.params.id;
    const lobby = await Lobby.findByPk(lobbyId);
    res.status(200).json(lobby);
};

exports.getFields = async (req, res) => {
    res.json(Fields)
}
