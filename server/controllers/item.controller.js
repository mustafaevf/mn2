const {Lobby, Platform, User, LobbyUser, Board, BoardUser, Item, ItemUser} = require('../associations');
const {Player, Game, Fields} = require('../Games/monopoly');

exports.createItem = async(req, res) => {
    try {
        console.log(req.body);
        const { title, image, type, settings } = req.body;

        if (!title || !image || !type) {
            return res.status(400).json({ message: 'Fill all fields' });
        }

        const createdItem = await Item.create({
            title: title,
            image: image,
            type: type,
            createdAt: new Date(),
            updatedAt: new Date(),
            settings: settings || null 
        });

        res.status(200).json(createdItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getFields = async(req, res) => {
    res.json(Fields);
};