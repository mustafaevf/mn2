import React from 'react';
import { Player } from '../../../types/Player';

type PlayersProp = {
    players?: Player[];
};

const GameUsers = ({ players }: PlayersProp) => {
    return (
        <div className="flex flex-col mt-4 space-y-2 gap-4">
            {players?.map((player) => (
                <div className="flex items-center">
                    <span
                        className={`w-[47px] h-[47px] rounded-tl-sm rounded-tr-sm rounded-bl-sm bg-player-${player.color} mr-2`}
                    ></span>
                    <div className="flex flex-col">
                        <span>{player.login}</span>
                        <span>$ {player.balance} k</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

// <img
// className="w-20 h-20 rounded-full object-cover border-2"
// src={`http://localhost:8080/uploads/${player.image}`}
// alt={player.login}
// />

export default GameUsers;
