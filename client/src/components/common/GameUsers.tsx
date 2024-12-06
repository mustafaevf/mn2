import React from "react";
import { Player } from "../../types/Player";

type PlayersProp = {
    players?: Player[];
}

const GameUsers = ({players} : PlayersProp) => {
    return (
        <div className="flex flex-col">
            {players?.map((player) => (
                <div className="rounded bg-[#242c48] p-2 w-[300px] h-[150px]" key={player.id}>
                    <div className="bg-player1 p-2 rounded shadow-lg">
                        <div className="flex flex-col text-center">
                            <div className="flex justify-between">
                                <div className="w-10 h-10 rounded-full border flex items-center text-center p-2 justify-center">
                                    <span>0</span>
                                </div>
                                <img
                                    className="w-20 h-20 rounded-full object-cover border-2"
                                    src={`http://localhost:8080/uploads/${player.image}`}
                                    alt={player.login}
                                />
                            </div>
                            <h3>{player.balance}</h3>
                            <h4>{player.login}</h4>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GameUsers;