const { User, ItemUser, Item, Marketplace } = require('../associations');
const bcrypt = require('bcryptjs');
const sequlize = require('../config/connection');

exports.getListings = async (req, res) => {
    const { offset = 0, limit = 10, sortBy, order='DESC'} = req.query;
    try {
        if(order !== 'DESC' && order !== 'ASC') {
            res.status(500).json({ message: 'Internal error' });
        }
        let query = `SELECT * FROM marketplace_listings`;
        const replacements = {
            limit: parseInt(limit),
            offset: parseInt(offset),
        }
        if(sortBy) {
            switch(sortBy) {
                case 'price':
                    query += ` ORDER BY price ${order}`;
            }
        }
        query += ` LIMIT :limit OFFSET :offset`;
        const listings = await sequlize.query(query, {
            replacements: replacements,
            type: sequlize.QueryTypes.SELECT,
        });
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.createListings = async (req, res) => {
    const { itemId, price } = req.body;
    const userId = req.user.id;

    try {
        const userItem = await ItemUser.findOne({ where: { userId, itemId } });
        if (!userItem) {
            return res.status(400).json({ error: 'Item not owned by user' });
        }
        
        userItem.inSell = true;
        await userItem.save();

        const listing = await Marketplace.create({
            itemId: userItem.itemId,
            price,
            userId: userId,
            isActive: true,
        });
        
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create listing' });
    }
};
