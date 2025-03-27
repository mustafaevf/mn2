const { User } = require('../associations');
const io = require('socket.io-client');

class Bot {
    constructor(userId, game) {
        this.userId = userId;
        this.socket = io('http://localhost:3000/api/games/' + game);
    }

    async addBalance(amount) {
        const user = await User.findByPk(this.userId);
        user.balance += amount;
        await user.save();        
    }

    async placeBet() {
        const user = await User.findByPk(this.userId);
        if(user.balance < 10) {
            this.addBalance(Math.floor(Math.random() * 105));
        }
        let bet = Math.floor(Math.random() * 25);
        while(bet < user.balance) {
            bet = Math.floor(Math.random() * 25);
        }
        this.socket.emit('place_bet', { user: user, bet: bet });
    }
}

module.exports = Bot;
