const {Item} = require('../associations');
const { User, ItemUser } = require('../associations');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({message: error});
    }
}

exports.addItemToUser = async (req, res) => {
    const userId = req.params.id;
    const { itemId } = req.body;
    try {
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const userItem = await ItemUser.create({ userId, itemId });
        
        res.status(200).json(userItem);
    } catch (error) {
        console.log(error);
    }
}

exports.getItems = async (req, res) => {
    try {
        const userId = req.params.id;
        const itemUserRecords = await ItemUser.findAll({
            where: { userId: userId },
        });

        if (!itemUserRecords.length) {
            return res.status(404).json({ message: 'No items found for this user' });
        }

        const itemIds = itemUserRecords.map(record => record.itemId);

        const items = await Item.findAll({
            where: { id: itemIds }
        });

        res.status(200).json(items);
    } catch (error) {
        console.log(error);
    }
}

exports.getUser = async (req, res) => {
    const userId = req.params.id;
    if(!userId) {
        return res.status(401).json({message : "User not found"});
    }
    try {
        const user = await User.findByPk(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

exports.changePassword = async (req, res) => {
    const {old_password, new_password} = req.body;
    const user = req.user;

    if(!user) {
        return res.status(401).json({message: "Login"});
    }

    const candidate = await User.findByPk(user.id);

    const isCorrect = await bcrypt.compare(old_password, candidate.password);

    if(!isCorrect) {
        return res.status(402).json({message: "Password not corrected"});
    }

    const cryptNewPassword = await bcrypt.hash(new_password, 10);
    candidate.password = cryptNewPassword;
    await candidate.save();
}

exports.sellItem = async (req, res) => {
    const user = req.user;
    return user;
}