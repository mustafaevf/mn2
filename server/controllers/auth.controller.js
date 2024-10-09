const { where } = require('sequelize');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.login = async(req, res) => {
    const { login, password } = req.body;
    if(!login || !password) {
        return res.status(400).json({ message: 'Fill all fields' });
    }

    try {
        const candidate = await User.findOne({where: {login: login}});
        if(!candidate) {
            return res.status(401).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, candidate.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: candidate.id, login: candidate.login, status: candidate.status, balance: candidate.balance }, "123123", { expiresIn: '1h' });
        res.status(200).json({ candidate, token });

    } catch(error) {
        res.status(500).json({message: error});
        console.log(error);
    }
};

exports.register = async(req, res) => {
    const {login, password} = req.body;
    if(!login || !password) {
        return res.status(400).json({message: 'Fill all fields'});
    }

    try {
        const existLogin = await User.findOne({where: {login: login}});

        if(existLogin) {
            return res.status(401).json({message: 'User exist'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({login: login, password: hashedPassword});
        res.status(200).json(createdUser);

    } catch (error) {
        res.status(500).json({message: error});
        console.log(error);
    }
};

exports.check = async(req, res) => {
    res.status(200).json({message: "cool"});
}