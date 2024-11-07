const {Lobby, Platform, User, LobbyUser, Board, BoardUser, Item, ItemUser} = require('../associations');
const {Player, Game, Fields} = require('../Games/Game');

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
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getItem = async(req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByPk(id);
        if(!item) {
            return res.status(400).json({message: 'item not found'});
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getItems = async(req, res) => {
    try {
        const items = await Item.findAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({message: error})
    }
};