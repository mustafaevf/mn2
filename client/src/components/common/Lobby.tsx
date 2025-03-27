import React, { useEffect, useState } from 'react';
import { ILobby } from '../../types/Lobby';
import { IUser } from '../../types/User';
import client from '../../services/client';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';
import { fetchUsersFromLobby, connectToLobby, disconnectFromLobby, startLobby } from '../../services/lobbyService';
import { useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { getErrorMessage } from '../../utils/errorUtils';
import { useNotification } from '../../contexts/NotificationContext';

interface LobbyProps {
    lobby: ILobby;
    socket: Socket,
    type?: number;
}

const Lobby = ({ lobby, socket, type = 1 }: LobbyProps) => {
    const { addNotification } = useNotification();
    const navigate = useNavigate();
    // const [users, setUsers] = useState<IUser[]>([]);
    const { isAuth, user } = useAuthStore();
    const { id, max_person, uuid, userId, status } = lobby;

    // const handleFetchUsersFromLobby = async () => {
    //     try {
    //         const response = await fetchUsersFromLobby(id);
    //         setUsers(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const getUsers = () => {
        let templateUsers: JSX.Element[] = [];

        lobby.users.map((us) => {
            templateUsers.push(
                <div className="relative">
                    <img
                        className="w-13 h-13 rounded-sm object-cover border-2 border-indigo-500"
                        src={`http://localhost:8080/uploads/${us?.image}`}
                        alt={us?.login}
                    />
                    {user?.id === us.id && (
                        <div className="rounded border border-border absolute top-[-10px] right-[-10px] bg-secondary p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                fill="#fff"
                                viewBox="0 0 512 512"
                                className="cursor-pointer"
                                onClick={() => handleDisconnectFromLobby()}
                            >
                                <g>
                                    <path d="M494.692 100.847L339.56 255.996l155.132 155.142c23.076 23.084 23.076 60.477 0 83.561-11.529 11.529-26.645 17.299-41.754 17.299-15.133 0-30.251-5.761-41.772-17.299L256 339.54 100.845 494.697c-11.528 11.53-26.645 17.299-41.767 17.299-15.118 0-30.225-5.76-41.763-17.299-23.075-23.073-23.075-60.468 0-83.561l155.128-155.141L17.306 100.847c-23.075-23.075-23.075-60.477 0-83.552 23.07-23.058 60.45-23.058 83.53 0l155.162 155.149 155.151-155.15c23.084-23.057 60.468-23.057 83.535 0 23.084 23.076 23.084 60.478.008 83.553z"></path>
                                </g>
                            </svg>
                        </div>
                    )}
                </div>
            );
        });

        if (lobby.users.length === max_person) {
            return templateUsers;
        }

        for (let index = lobby.users.length; index < max_person; index++) {
            templateUsers.push(
                <div
                    className="rounded cursor-pointer border border-dashed border-border bg-secondary w-13"
                    style={{ aspectRatio: 1 / 1, placeContent: 'center', display: 'grid' }}
                    onClick={
                        isAuth && user && lobby.users.includes(user)
                            ? () => handleDisconnectFromLobby()
                            : () => handleConnectToLobby()
                    }
                >
                    <div className="icon w-4 bg-[#bfcbe7]" style={{ maskImage: 'url("/add.svg")' }}></div>
                </div>
            );
        }
        return templateUsers;
    };

    const handleConnectToLobby = async () => {
        socket.emit('connect_lobby', { user: user, lobbyId: id });
        // try {
        //     await connectToLobby(id);
        // } catch (error) {
        //     console.log(error);
        //     addNotification(getErrorMessage(error), 'error');
        // }
    };

    const handleDisconnectFromLobby = () => {
        socket.emit('disconnect_lobby', { user: user, lobbyId: id });
        // try {
        //     await disconnectFromLobby(id);
        // } catch (error) {
        //     console.log(error);
        //     addNotification(getErrorMessage(error), 'error');
        // }
    };

    const handleStartLobby = async () => {
        socket.emit('start_lobby', { user: user, lobbyId: id });
        // try {
        //     const data = await startLobby(id);
        //     navigate(`/boards/${data}`);
        // } catch (error) {
        //     console.log(error);
        //     addNotification(getErrorMessage(error), 'error');
        // }
    };

    // useEffect(() => {
    //     handleFetchUsersFromLobby();
    // }, []);

    return (
        <div
            key={id}
            className={`relative z-1 overflow-hidden rounded-sm px-4 py-4 flex border border-border justify-between items-center ${type == 2 ? 'bg-secondary mb-4' : 'bg-secondary'}`}
        >
            <div className="flex flex-col">
                <span className="text-[#A6ADCD] font-bold text-2xl leading-none mb-1">{`Лобби ${id}`}</span>
                <div className="font-semibold text-[#ffc6b0]">Классический режим</div>
            </div>
            <div className="flex lg:gap-2 items-center">
                {getUsers()}
                {isAuth && userId === user?.id && lobby.users.length === max_person ? (
                    <Button label="Начать игру" onClick={handleStartLobby} />
                ) : (
                    ''
                )}
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
