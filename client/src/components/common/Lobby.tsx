import React, { useEffect, useState } from 'react';
import { ILobby } from '../../types/Lobby';
import { IUser } from '../../types/User';
import client from '../../services/client';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';
import { fetchUsersFromLobby, connectToLobby, disconnectFromLobby, startLobby } from '../../services/lobbyService';
import { useNavigate } from 'react-router-dom';

interface LobbyProps {
    lobby: ILobby; 
    type?: number;
  }

const Lobby = ({lobby, type=1}: LobbyProps) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<IUser[]>([]);
    const { isAuth, user } = useAuthStore();

    const { id, max_person, uuid, userId, status } = lobby;

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
                <img
                    className="w-13 h-13 rounded object-cover border-2 border-indigo-500"
                    src={`http://localhost:8080/uploads/${user?.image}`}
                    alt={user?.login}
                />
            );
        });

        if(users.length === max_person) {
            return templateUsers;
        }

        for (let index = users.length; index < max_person; index++) {
            templateUsers.push(
                <div className="rounded cursor-pointer border border-dashed border-[#323e60] bg-[#272f4d] w-13" style={{aspectRatio: 1/1, placeContent: 'center', display: 'grid'}} onClick={isAuth && user && users.includes(user) ?  () => handleDisconnectFromLobby(): () => handleConnectToLobby()}>
                    <div className="icon w-4 bg-[#bfcbe7]"  style={{ maskImage: 'url("/add.svg")' }}></div>
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

    const handleStartLobby = async () => {
        try {
            const data = await startLobby(id);
            navigate(`/boards/${data}`);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchUsersFromLobby();
    }, []);

    return (
        <div
            key={id}
            className={`relative z-1 overflow-hidden rounded-3xl px-4 py-4 flex justify-between items-center ${type == 2? 'bg-[#432f47] mb-4' : 'bg-[#1e253d]'}`}
        >
            <div className="flex flex-col">
                <span className="text-[#A6ADCD] font-bold text-2xl leading-none mb-1">{`Лобби ${id}`}</span>
                <div className="font-semibold text-[#ffc6b0]">Классический режим</div>
            </div>
            <div className="flex lg:gap-2 items-center">
                { getUsers() }
                {isAuth && (userId === user?.id && users.length === max_person) ? (<Button label='Начать игру' onClick={handleStartLobby}/>) : ''}
                {/* {isAuth && isAuth === true && 
                    (
                        user && users.includes(user) ?
                        <Button label='Подключиться' onClick={handleConnectToLobby}/>
                        :
                        <Button label='Отключиться' onClick={handleDisconnectFromLobby}/>
                    ) 
                } */}
            </div>
            
        </div>
    );
};

export default Lobby;
