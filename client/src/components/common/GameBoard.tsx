import React from "react";


const GameBoard = () => {
    const cellWidthTopBottom = 60;
    const cellHeightTopBottom = 90;
    const cellWidthSides = 90;
    const cellHeightSides = 60;
    const cornerSize = 90;
    const boardSize = cornerSize * 8;

    return (
        <div className="p-2" style={{width: 'fit-content'}}>
            <div
                className="relative shadow bg-gradient-2 px-3 py-3"
                style={{
                    width: boardSize,
                    height: boardSize,
                }}
            >
                <div className="absolute top-0 left-0 w-[90px] h-[90px] bg-[#161b2e] flex items-center justify-center" style={{borderTopLeftRadius: '.75rem'}}>
                    <span>Старт</span>
                </div>
                <div className="absolute top-0 right-0 w-[90px] h-[90px] bg-[#161b2e] border border-black flex items-center justify-center" style={{borderTopRightRadius: '.75rem'}}>
                    <span>Угол</span>
                </div>
                <div className="absolute bottom-0 left-0 w-[90px] h-[90px] bg-[#161b2e] border border-black flex items-center justify-center" style={{borderBottomLeftRadius: '.75rem'}}>
                    <span>Угол</span>
                </div>
                <div className="absolute bottom-0 right-0 w-[90px] h-[90px] bg-[#161b2e] border border-black flex items-center justify-center" style={{borderBottomRightRadius: '.75rem'}}>
                    <span>Тюрьма</span>
                </div>

                {[...Array(9)].map((_, index) => (
                    <div
                        key={index}
                        className="absolute top-0 bg-[#242c48] border border-black flex items-center justify-center"
                        style={{
                            width: `${cellWidthTopBottom}px`,
                            height: `${cellHeightTopBottom}px`,
                            left: `${cornerSize + index * cellWidthTopBottom}px`,
                        }}
                    >
                        <span>Клетка {index + 1}</span>
                    </div>
                ))}

                {[...Array(9)].map((_, index) => (
                    <div
                        key={index}
                        className="absolute right-0 bg-yellow-200 border border-black flex items-center justify-center"
                        style={{
                            width: `${cellWidthSides}px`,
                            height: `${cellHeightSides}px`,
                            top: `${cornerSize + index * cellHeightSides}px`,
                        }}
                    >
                        <span>Клетка {10 + index}</span>
                    </div>
                ))}

                {[...Array(9)].map((_, index) => (
                    <div
                        key={index}
                        className="absolute bottom-0 bg-red-200 border border-black flex items-center justify-center"
                        style={{
                            width: `${cellWidthTopBottom}px`,
                            height: `${cellHeightTopBottom}px`,
                            left: `${cornerSize + index * cellWidthTopBottom}px`,
                        }}
                    >
                        <span>Клетка {19 - index}</span>
                    </div>
                ))}

                {[...Array(9)].map((_, index) => (
                    <div
                        key={index}
                        className="absolute left-0 bg-green-200 border border-black flex items-center justify-center"
                        style={{
                            width: `${cellWidthSides}px`,
                            height: `${cellHeightSides}px`,
                            top: `${cornerSize + index * cellHeightSides}px`,
                        }}
                    >
                        <span>Клетка {28 - index}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
