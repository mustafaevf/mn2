const {User} = require('../associations');


exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({message: error});
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

