const { User, ItemUser, Item, Marketplace} = require('../associations');
const bcrypt = require('bcryptjs');

exports.getListings = async (req, res) => {
    try {
        const listings = await Marketplace.findAll({where: {isActive: true}});
        res.status(200).json(listings);
    } catch(error) {
        res.status(500).json({message: error});
    }
}

exports.createListings = async (req, res) => {
    const { itemId, price } = req.body;
    const userId = req.user.id;

    try {
        const userItem = await ItemUser.findOne({ where: { userId, itemId } });
        if (!userItem) {
            return res.status(400).json({ error: 'Item not owned by user' });
        }

        const listing = await Marketplace.create({
            itemId: userItem.itemId,
            price,
            userId: userId,
            isActive: true,
        });
        res.json(listing);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create listing' });
    }
}