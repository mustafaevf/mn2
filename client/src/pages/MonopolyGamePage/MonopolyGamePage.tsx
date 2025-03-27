import React, { useEffect, useState } from 'react';
import useModal from '../../hooks/useModal';
import { useAuthStore } from '../../stores/authStore';
import { createLobby } from '../../services/lobbyService';
import io, { Socket } from 'socket.io-client';
// import LobbyList from '../../components/LobbyList';
import Button from '../../components/ui/Button';
import { useNotification } from '../../contexts/NotificationContext';
import { ILobby } from '../../types/Lobby';
import { useNavigate } from 'react-router-dom';
import Lobby from '../../components/common/Lobby';

type Props = {};

const socket: Socket = io('http://localhost:8080/api/games/monopoly');

const MonopolyGamePage = (props: Props) => {
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const {
        isOpen: isOpenLobbyCreateModal,
        openModal: openLobbyCreateModal,
        closeModal: closeLobbyCreateModal,
    } = useModal();
    const [maxPerson, setMaxPerson] = useState<number>(1);
    const [lobbies, setLobbies] = useState<ILobby[]>([]);
    const [autoStart, setAutoStart] = useState<boolean>(true);
    const [waitLobby, setWaitLobby] = useState<ILobby>();

    const { user, isAuth } = useAuthStore();


    const handleCreateLobby = async () => {
        if (!isAuth) {
            addNotification('Войдите в аккаунт', 'error');
        }
        socket.emit('create_lobby', { user: user, maxPerson: maxPerson });
    };

    useEffect(() => {
        socket.emit('get_lobbies');
        const handleLobbiesUpdate = (lobbiesData: ILobby[]) => {
            setLobbies(lobbiesData);
        };

        const handleError = (data: any) => {
            addNotification(data, 'error');
        };

        const handleSuccess = (data: any) => {
            addNotification(data, 'success');
        };

        const handleStartedGame = (data: any) => {
            navigate(`/boards/${data.uuid}`);
        };

        socket.on('startedGame', handleStartedGame);
        socket.on('lobbies', handleLobbiesUpdate);
        socket.on('error', handleError);
        socket.on('success', handleSuccess);

        return () => {
            socket.off('lobbies', handleLobbiesUpdate);
            socket.off('error', handleError);
            socket.off('success', handleSuccess);
            socket.off('startedGame', handleStartedGame);
        };
    }, []);

    return (
        <>
            <div className="text-primary text-xl font-bold mb-4">Monopoly</div>
            <div className="flex flex-col md:flex-row gap-4 text-dark-text">
                <div className="md:w-1/4 lg:w-1/5 flex flex-col gap-4">
                    <div className="rounded-lg relative p-4 lg:p-5 shrink-0 flex flex-col bg-secondary gap-3.5">
                        <div className="pl-1.5 text-xs font-medium uppercase text-secondary">Количество игроков</div>
                        <div className="group flex gap-1 border border-border p-1 rounded">
                            <button
                                type="button"
                                aria-pressed="true"
                                className={`btn relative flex aspect-square h-11 items-center justify-center overflow-hidden rounded bg-[#2e3a61] bg-gradient-var  font-bold text-sm text-[#c2ddff] hover:brightness-110  transition duration-100  [.group:has([aria-pressed=true])_&amp;:not([aria-pressed=true])]:opacity-25 grow gap-1 [--angle:45deg] [--from:#3d76d1]  [--to:#2957a0] ${maxPerson == 2 ? `active` : ''}`}
                                onClick={() => setMaxPerson(2)}
                            >
                                <div
                                    className="icon w-4 bg-[#bfcbe7]"
                                    style={{ maskImage: 'url("/players.svg")' }}
                                ></div>
                                2
                            </button>
                            <button
                                type="button"
                                aria-pressed="false"
                                className={`btn relative flex aspect-square h-11 items-center justify-center overflow-hidden rounded bg-[#2e3a61] bg-gradient-var  font-bold text-sm text-[#c2ddff] hover:brightness-110  transition duration-100  [.group:has([aria-pressed=true])_&amp;:not([aria-pressed=true])]:opacity-25 grow gap-1 [--angle:45deg] [--from:#3d76d1]  [--to:#2957a0] ${maxPerson == 3 ? `active` : ''}`}
                                onClick={() => setMaxPerson(3)}
                            >
                                <div
                                    className="icon w-4 bg-[#bfcbe7]"
                                    style={{ maskImage: 'url("/players.svg")' }}
                                ></div>
                                3
                            </button>
                            <button
                                type="button"
                                aria-pressed="false"
                                className={`btn relative flex aspect-square h-11 items-center justify-center overflow-hidden rounded bg-[#2e3a61] bg-gradient-var  font-bold text-sm text-[#c2ddff] hover:brightness-110  transition duration-100  [.group:has([aria-pressed=true])_&amp;:not([aria-pressed=true])]:opacity-25 grow gap-1 [--angle:45deg] [--from:#3d76d1]  [--to:#2957a0] ${maxPerson == 4 ? `active` : ''}`}
                                onClick={() => setMaxPerson(4)}
                            >
                                <div
                                    className="icon w-4 bg-[#bfcbe7]"
                                    style={{ maskImage: 'url("/players.svg")' }}
                                ></div>
                                4
                            </button>
                            <button
                                type="button"
                                aria-pressed="false"
                                className={`btn relative flex aspect-square h-11 items-center justify-center overflow-hidden rounded bg-[#2e3a61] bg-gradient-var  font-bold text-sm text-[#c2ddff] hover:brightness-110  transition duration-100  [.group:has([aria-pressed=true])_&amp;:not([aria-pressed=true])]:opacity-25 grow gap-1 [--angle:45deg] [--from:#3d76d1]  [--to:#2957a0] ${maxPerson == 22 ? `active` : ''}`}
                                onClick={() => setMaxPerson(22)}
                            >
                                <div
                                    className="icon w-4 bg-[#bfcbe7]"
                                    style={{ maskImage: 'url("/players.svg")' }}
                                ></div>
                                2x2
                            </button>
                        </div>
                        {isAuth && <Button label="Создать лобби" onClick={handleCreateLobby} />}
                    </div>
                </div>
                <div className="grow max-md:contents">
                    {lobbies.length === 0 ? (
                        <p className="text-gray-500">Нет доступных лобби.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {lobbies.map((lobby) => (
                                <Lobby socket={socket} lobby={lobby}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MonopolyGamePage;
