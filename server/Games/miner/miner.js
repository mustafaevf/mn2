
let gameState = {
    games: []
};
// game {user: user, bet: bet, countMines: countMines, turn: 0, board: [], coefficient: []}

// const calculateCoefficients = (countMines) => {
//     const coefficients = [];
//     let initialCoefficient = 1 + countMines; 

//     for (let i = 0; i < 25 - countMines; i++) {
//         const coefficient = initialCoefficient + i * countMines / 10 + 0.2;  
//         initialCoefficient = coefficient
//         coefficients.push(coefficient);
//     }

//     return coefficients;
// };

const calculateCoefficients = (countMines) => {
    const coefficients = [];
    let initialCoefficient = 1.2 + countMines / 10; 
    for (let i = 0; i < 25 - countMines; i++) {
        const coefficient = initialCoefficient + i * countMines / 10 + 0.2;  
        initialCoefficient = coefficient
        coefficients.push(coefficient);
    }
    return coefficients;
};

const initGame = (user, bet, countMines) => {
    let board = new Array(25).fill(1); 
    
    let minePositions = new Set();
    while (minePositions.size < countMines) {
        let randomIndex = Math.floor(Math.random() * 25);
        minePositions.add(randomIndex);
    }

    minePositions.forEach(index => board[index] = 2);

    gameState.games.push({
        user: user,
        bet: bet,
        countMines: countMines,
        turn: 0,
        board,
        coefficients: calculateCoefficients(countMines)
    });

    console.log(gameState);
};


module.exports = {gameState, initGame, calculateCoefficients};