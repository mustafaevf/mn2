import React, { useEffect, useState } from 'react';
import { Player } from '../../../types/Player';

type Props = {
    color: string;
    pos: number;
    players: Player[];
};

const PlayerCircle = ({ color, pos, players }: Props) => {
    const [style, setStyle] = useState({}); 

    useEffect(() => {
        const playersOnSamePosition = players.filter((player) => player.position === pos);

        const playerIndex = playersOnSamePosition.findIndex(
            (player) => player.position === pos && player.color === color
        );

        const offset = playerIndex !== -1 ? playerIndex * 10 : 0;

        let newStyles = {};

        const corners = [0, 10, 20, 30];

        if (corners.includes(pos)) {
            if (pos === 10) {

                setStyle({
                    left: `${55 + 55 * 10 + offset}px`,
                    top: `${55 + 55 * 10}px`,
                    position: 'absolute',
                    transition: 'left 0.5s ease, top 0.5s ease',
                });

                setTimeout(() => {
                    setStyle({
                        left: `${55 + 55 * 10 + offset}px`,
                        top: `${55 + 55 * (pos - 10)}px`,
                        position: 'absolute',
                        transition: 'left 0.5s ease, top 0.5s ease',
                    });
                }, 500); 
            } else if (pos === 20) {
                setStyle({
                    left: `${55 + 55 * 10 + offset}px`,
                    top: `${55 + 55 * 10}px`,
                    position: 'absolute',
                    transition: 'left 0.5s ease, top 0.5s ease',
                });

                setTimeout(() => {
                    setStyle({
                        left: `${55 + 55 * (30 - pos) + offset}px`,
                        top: `${55 + 55 * 10}px`,
                        position: 'absolute',
                        transition: 'left 0.5s ease, top 0.5s ease',
                    });
                }, 500);
            } else if (pos === 30) {
                setStyle({
                    left: `${10 + offset}px`,
                    top: `${55 + 55 * 10}px`,
                    position: 'absolute',
                    transition: 'left 0.5s ease, top 0.5s ease',
                });

                setTimeout(() => {
                    setStyle({
                        left: `${10 + offset}px`,
                        top: `${55 + 55 * (40 - pos)}px`,
                        position: 'absolute',
                        transition: 'left 0.5s ease, top 0.5s ease',
                    });
                }, 500);
            } else if (pos === 0) {
                setStyle({
                    left: `${144 / 2 + offset}px`,
                    top: '10px',
                    position: 'absolute',
                    transition: 'left 0.5s ease, top 0.5s ease',
                });
            }
        } else {
            if (pos > 10) {
                if (pos < 21) {
                    newStyles = {
                        left: `${144 + 71 * 10 + offset}px`,
                        top: `${144 + 71 * (pos - 11)}px`,
                        position: 'absolute',
                    };
                } else {
                    newStyles = {
                        left: `${144 + 71 * (30 - pos) + offset}px`,
                        top: `${144 + 71 * 10}px`,
                        position: 'absolute',
                    };
                }
                if (pos > 30) {
                    newStyles = {
                        left: `${10 + offset}px`,
                        top: `${144 + 71 * (40 - pos)}px`,
                        position: 'absolute',
                    };
                }
            } else {
                newStyles = {
                    left: `${144 / 2 + 71 * pos + 71 / 2 - 15 + offset}px`,
                    top: `${144 / 2 - 40}px`,
                    position: 'absolute',
                };
            }
            setStyle({
                ...newStyles,
                transition: 'left 0.5s ease, top 0.5s ease',
            });
        }
    }, [pos, players, color]);
    return <div className={`absolute circle bg-player-${color}`} style={style}></div>;
};

export default PlayerCircle;
