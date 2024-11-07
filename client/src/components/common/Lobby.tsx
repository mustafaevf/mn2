import React, { useEffect, useState } from 'react';
import { ILobby } from '../../types/Lobby';
import { IUser } from '../../types/User';
import client from '../../services/client';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';
import { fetchUsersFromLobby, connectToLobby, disconnectFromLobby } from '../../services/lobbyService';

const Lobby = ({ id, max_person, uuid, userId, status }: ILobby) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const { isAuth, user } = useAuthStore();

    const handleFetchUsersFromLobby = async () => {
        try {
            const response = await fetchUsersFromLobby(id);
            setUsers(response);
        } catch (error) {
            console.log(error);
        }
    };

    const getUsers = () => {
        let templateUsers: JSX.Element[] = [];

        users.map((user) => {
            templateUsers.push(
                <div key={user.id} className="flex py-3">
                    {user.login}
                </div>
            );
        });

        if(users.length === max_person) {
            return templateUsers;
        }

        for (let index = users.length; index < max_person; index++) {
            templateUsers.push(
                <div className="flex py-3">
                    Подключиться
                </div>
            );
        }
        return templateUsers;
    }

    const handleConnectToLobby = async () => {
        try {
            await connectToLobby(id);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDisconnectFromLobby = async () => {
        try {
            await disconnectFromLobby(id);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleFetchUsersFromLobby();
    }, []);

    return (
        <div
            key={id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2 hover:bg-gray-100 transition duration-200"
        >
            <span className="font-semibold">{`Лобби ${id}`}</span>
            <span className="font-semibold">{`${users.length}/${max_person}`}</span>
            { getUsers() }
            {isAuth && (userId === user?.id && users.length === max_person) ? (<Button label='Начать игру' onClick={handleConnectToLobby}/>) : ''}
            {isAuth && isAuth === true && 
                (
                    user && users.includes(user) ?
                    <Button label='Подключиться' onClick={handleConnectToLobby}/>
                    :
                    <Button label='Отключиться' onClick={handleDisconnectFromLobby}/>
                ) 
            }
        </div>
    );
};

export default Lobby;
