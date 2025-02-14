const { User } = require('../../associations');

let gameState = {
    bets: [],
    timer: 20,
    winner: null,
    colors: ['blue', 'green', 'yellow', 'purple'],
    prevRotation: 0,
    history: [],
    running: false,
    isSpinning: false,
};

function start(io) {
    gameState.running = false;
    gameState.isSpinning = false;
    gameState.timer = 15;
    io.emit('game_start', gameState.timer);
    console.log("game_start")
    
    let countdown = setInterval(() => {
        console.log(gameState.timer);
        io.emit('timer_update', gameState.timer);
        io.emit('game_update', {history: gameState.history, prevRotation: gameState.prevRotation, isRunning: gameState.running, winnerColor: gameState.winner, isSpinning: gameState.isSpinning, bets: gameState.bets});
        if (gameState.timer <= 1) {
            clearInterval(countdown);
            gameState.isSpinning = true;
            io.emit('game_update', {history: gameState.history, prevRotation: gameState.prevRotation, isRunning: gameState.running, winnerColor: gameState.winner, isSpinning: gameState.isSpinning, bets: gameState.bets});
            spinWheel(io);
        }
        gameState.timer--;
    }, 1100);
}

const weight_colors = [
    { name: 'purple', weight: 1 },
    { name: 'yellow', weight: 3 },
    { name: 'green', weight: 2 },
    { name: 'blue', weight: 4 }
];

const colors = [
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'purple',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
    'blue',
    'green',
    'yellow',
];

const getRandomColor = () => {
    const weightedColors = [];
    weight_colors.forEach(color => {
        for (let i = 0; i < color.weight; i++) {
            weightedColors.push(color.name);
        }
    });
    const randomColor = weightedColors[Math.floor(Math.random() * weightedColors.length)];
    return randomColor;
};

function findIndexColor (winnerColor) {
    const segmentCount = 54;
    const segmentAngle = 360 / segmentCount;
    const a = colors.sort(() => Math.random() - 0.5);
    const winnerIndex = a.findIndex((c) => c === winnerColor);
    return Math.floor(360 * Math.random() * 100 - 0.5 * Math.random() + winnerIndex * segmentAngle) - 30;
}

const mult = {
    "blue": 2,
    "green": 3,
    "yellow": 5,
    "purple": 10
}

async function reward(winnerColor) {
    let result = gameState.bets.filter((bet) => bet.color === winnerColor);
    
    for (const r of result) {
        const user = await User.findByPk(r.user.id);
        if (user) {
            user.balance += r.bet * mult[winnerColor];
            await user.save();
        }
    }
}

function spinWheel(io) {
    const winnerColor = getRandomColor();
    gameState.winner = winnerColor;
    let rotation = findIndexColor(winnerColor);
    
    gameState.history.push(winnerColor);
    gameState.prevRotation = rotation;
    console.log("Победный цвет " + winnerColor);
    io.emit('game_result', {winnerColor: winnerColor, rotation: rotation});
    reward(winnerColor).then(() => {
        setTimeout(() => {
            if(gameState.history.length > 19) {
                gameState.history.shift();
            }
            gameState.bets = [];
            gameState.running = true;
            start(io);
        }, 5000);
    });
}

module.exports = { gameState, start};
