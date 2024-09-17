import React, { useState, useEffect } from 'react';

export default function Player({ pos, color, players }) {
    const [style, setStyle] = useState({}); // Локальное состояние для стилей

    useEffect(() => {
        // Найти всех игроков на текущей позиции
        const playersOnSamePosition = players.filter((player) => player.position === pos);

        // Найти индекс текущего игрока на этой позиции
        const playerIndex = playersOnSamePosition.findIndex((player) => player.position === pos && player.color === color);

        // Смещение для каждого игрока на одной позиции
        const offset = playerIndex !== -1 ? playerIndex * 10 : 0;

        let newStyles = {};

        // Определение угловых позиций
        const corners = [0, 10, 20, 30];

        // Проверка, находится ли игрок на угловой позиции
        if (corners.includes(pos)) {
            // Если это угловая позиция, сначала перемещаем по оси X, затем по оси Y (или наоборот)
            if (pos === 10) {
                // Угол между позицией 10 и 20
                setStyle({
                    left: `${55 + 55 * 10 + offset}px`,
                    top: `${55 + 55 * 10}px`,
                    position: 'absolute',
                    transition: 'left 0.5s ease, top 0.5s ease'
                });

                setTimeout(() => {
                    setStyle({
                        left: `${55 + 55 * 10 + offset}px`,
                        top: `${55 + 55 * (pos - 10)}px`,
                        position: 'absolute',
                        transition: 'left 0.5s ease, top 0.5s ease'
                    });
                }, 500); // Задержка для второго этапа движения
            } else if (pos === 20) {
                // Угол между позицией 20 и 30
                setStyle({
                    left: `${55 + 55 * 10 + offset}px`,
                    top: `${55 + 55 * 10}px`,
                    position: 'absolute',
                    transition: 'left 0.5s ease, top 0.5s ease'
                });

                setTimeout(() => {
                    setStyle({
                        left: `${55 + 55 * (30 - pos) + offset}px`,
                        top: `${55 + 55 * 10}px`,
                        position: 'absolute',
                        transition: 'left 0.5s ease, top 0.5s ease'
                    });
                }, 500);
            } else if (pos === 30) {
                // Угол между позицией 30 и 40
                setStyle({
                    left: `${10 + offset}px`,
                    top: `${55 + 55 * 10}px`,
                    position: 'absolute',
                    transition: 'left 0.5s ease, top 0.5s ease'
                });

                setTimeout(() => {
                    setStyle({
                        left: `${10 + offset}px`,
                        top: `${55 + 55 * (40 - pos)}px`,
                        position: 'absolute',
                        transition: 'left 0.5s ease, top 0.5s ease'
                    });
                }, 500);
            } else if (pos === 0) {
                // Стартовая угловая позиция
                setStyle({
                    left: `${55 + 55 * pos + offset}px`,
                    top: '10px',
                    position: 'absolute',
                    transition: 'left 0.5s ease, top 0.5s ease'
                });
            }
        } else {
            // Если позиция не угловая, стандартное движение
            if (pos > 10) {
                if (pos < 21) {
                    newStyles = {
                        left: `${55 + 55 * 10 + offset}px`,
                        top: `${55 + 55 * (pos - 10)}px`,
                        position: 'absolute'
                    };
                } else {
                    newStyles = {
                        left: `${55 + 55 * (30 - pos) + offset}px`,
                        top: `${55 + 55 * 10}px`,
                        position: 'absolute'
                    };
                }
                if (pos > 30) {
                    newStyles = {
                        left: `${10 + offset}px`,
                        top: `${55 + 55 * (40 - pos)}px`,
                        position: 'absolute'
                    };
                }
            } else {
                newStyles = {
                    left: `${55 + 55 * pos + offset}px`,
                    top: '10px',
                    position: 'absolute'
                };
            }

            // Обновляем стили с анимацией
            setStyle({
                ...newStyles,
                transition: 'left 0.5s ease, top 0.5s ease'
            });
        }
    }, [pos, players, color]);

    return (
        <div className={`circle ${color}`} style={style}></div>
    );
}