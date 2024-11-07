import React, { useState, useEffect } from "react";
import { ILobby } from "../types/Lobby";
import client from "../services/client";
import Lobby from "./common/Lobby";

interface LobbyListProps {

};

const LobbyList = ({}: LobbyListProps) => {
    const [lobbies, setLobbies] = useState<ILobby[]>([]);

    const getLobbies = async () => {
        try {
            const response = await client.get<ILobby[]>('lobbies');
            setLobbies(response.data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLobbies();
    }, [])

    return (
        <div className="p-2">
            <h2 className="text-xl font-bold mb-4">Доступные лобби</h2>
            {lobbies.length === 0 ? (
                <p className="text-gray-500">Нет доступных лобби.</p>
            ) : (
                <ul className="space-y-2">
                    {lobbies.map((lobby) => (
                        <Lobby {...lobby} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LobbyList;