const { User } = require("../../associations");

let gameInfo = {
    orders: [],
    ceff: 1.0,
    isRunning: false,
    timeToStartRound: 0,
    crashAt: 0,
};

const ROUND_INTERVAL = 14000; // 14 секунд перед новым раундом
const GAME_TICK = 100; // Каждые 100 мс обновление коэффициента

function start(io) {
    gameInfo.ceff = 1.0;
    gameInfo.isRunning = true;
    gameInfo.crashAt = getRandomCrashMultiplier();
    gameInfo.timeToStartRound = 0;

    console.log(`[Crash] Игра началась! Краш на ${gameInfo.crashAt.toFixed(2)}x`);
    io.emit("game_start", { isRunning: true });

    let interval = setInterval(async () => {
        gameInfo.ceff += 0.01;
        io.emit("game_info", { orders: gameInfo.orders, isRunning: gameInfo.isRunning, ceff: gameInfo.ceff });

        for (let i = gameInfo.orders.length - 1; i >= 0; i--) {
            let order = gameInfo.orders[i];
            if (order.cashoutAt !== 0 && order.cashoutAt <= gameInfo.ceff) {
                let profit = order.bet * gameInfo.ceff;
                try {
                    const user = await User.findByPk(order.user.id);
                    if (user) {
                        user.balance += profit;
                        await user.save();
                    }
                    console.log(`[Crash] Игрок ${order.userId} вышел на ${gameInfo.ceff.toFixed(2)}x с ${profit.toFixed(2)} ₽`);
                } catch (error) {
                    console.error("Ошибка при обновлении баланса:", error);
                }
                gameInfo.orders.splice(i, 1);
            }
        }

        if (gameInfo.ceff >= gameInfo.crashAt) {
            clearInterval(interval);
            console.log(`[Crash] Игра крашнулась на ${gameInfo.crashAt.toFixed(2)}x`);
        
            gameInfo.isRunning = false;
            gameInfo.crashAt = 0;
            gameInfo.orders = [];
            gameInfo.timeToStartRound = ROUND_INTERVAL;
        
            io.emit("game_end", { crashedAt: gameInfo.ceff });
            io.emit("game_info", formatGameInfo(gameInfo));
        
            let countdown = setInterval(() => {
                gameInfo.timeToStartRound -= 100;
        
                if (gameInfo.timeToStartRound <= 0) {
                    clearInterval(countdown);
                    start(io);
                } else {
                    io.emit("game_info", formatGameInfo(gameInfo));
                }
            }, 100);
        }
        
    }, GAME_TICK);
}

function formatGameInfo(info) {
    return {
        ...info,
        timeToStartRound: (info.timeToStartRound / 1000).toFixed(2)
    };
}

async function cashOut(user) {
    let index = gameInfo.orders.findIndex(order => order.user.id === user.id);
    if (index !== -1) {
        let order = gameInfo.orders[index];
        let profit = order.bet * gameInfo.ceff;
        try {
            const userData = await User.findByPk(order.user.id);
            if (userData) {
                userData.balance += profit;
                await userData.save();
            }
            console.log(`[Crash] Игрок ${order.user.login} вышел вручную на ${gameInfo.ceff.toFixed(2)}x с ${profit.toFixed(2)} ₽`);
        } catch (error) {
            console.error("Ошибка при обновлении баланса:", error);
        }
        gameInfo.orders.splice(index, 1);
    }
}

function getRandomCrashMultiplier() {
    return parseFloat((1.05 + Math.random() * 2).toFixed(2));
}

module.exports = { gameInfo, start, cashOut };
