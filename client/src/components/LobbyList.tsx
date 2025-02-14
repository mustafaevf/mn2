import React, { useState, useEffect } from "react";
import { ILobby } from "../types/Lobby";
import client from "../services/client";
import Lobby from "./common/Lobby";
import { useAuthStore } from "../stores/authStore";

interface LobbyListProps {

};

const LobbyList = ({}: LobbyListProps) => {
    const { isAuth, user } = useAuthStore();
    const [lobbies, setLobbies] = useState<ILobby[]>([]);
    const [waitLobby, setWaitLobby] = useState<ILobby>();

    const getUserConnectedLobby = async () => {
        try {
            const response = await client.get<ILobby>('waitlobby');
            console.log(response.data);
            setWaitLobby(response.data);
        } catch(error) {
            console.log(error);
        }
    }

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
        getUserConnectedLobby();
    }, [])

    return (
        <div className="grow max-md:contents">
            {
                isAuth && user && waitLobby && (
                    <div className="flex flex-col gap">
                        <Lobby lobby={waitLobby} type={2} />
                    </div>
                )
            }
            {lobbies.length === 0 ? (
                <p className="text-gray-500">Нет доступных лобби.</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {lobbies.map((lobby) => (
                        <Lobby lobby={lobby} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LobbyList;