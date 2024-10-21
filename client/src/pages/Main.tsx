import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lobby from '../components/Lobby';
import Button from '../components/common/Button';
import axios from 'axios';
import CreateLobbyModal from '../components/Modals/CreateLobbyModal';
import { useAuthStore } from '../store/authStore';
import io from 'socket.io-client'

const s = io('http://localhost:8080/api/plays')

interface Lobby {
    id: number;
    uuid: string,
    max_person: number;
    userId: number;
    createdAt: string;
}

export default function Main() {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);

    const [waitLobby, setWaitLobby] = useState<Lobby | null>(null);
    const [isOpenModalCreateLobby, setOpenModalCreateLobby] = useState(false);

    const { check, isAuth } = useAuthStore();

    const openModalCreateLobby = () => {
        setOpenModalCreateLobby(!isOpenModalCreateLobby);
    };

    useEffect(() => {
        const fetchLobbies = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/api/lobbies'
                );
                console.log(response);
                setLobbies(response.data);

                if (isAuth) {
                    await check();
                    const response = await axios.get(
                        'http://localhost:8080/api/waitLobby'
                    );
                    setWaitLobby(response.data.lobby);
                }
            } catch (error) {
                console.error('Error fetching lobbies:', error);
            }
        };
        fetchLobbies();
    }, []);

    const renderLobbies = () => {
        if (lobbies.length === 0) return <h3>Лобстеров нет</h3>;

        return lobbies.map((lobby) => (
            <Lobby
                key={lobby.id}
                id={lobby.id}
                max_person={lobby.max_person}
                ownerId={lobby.userId}
                createdAt={lobby.createdAt}
            />
        ));
    };

    return (
        <>
            <div className="main">
                <div className="main-left">
                    <div className="list box bg"></div>
                </div>
                <div className="main-right">
                    {isAuth && waitLobby && (
                        <div className="waitLobby mt-1">
                            <div className="box light-bg">
                                <div className="game_header mb-1">
                                    <div className="game_title">
                                        Игра №{waitLobby.id}
                                    </div>
                                </div> 
                                <div className="game_body mt-2 mb-1">
                                    <Link to={`board/` + waitLobby.uuid}>
                                        <div className="a-btn">Перейти</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="list box bg">
                        <div
                            className="right_menu"
                            style={{ textAlign: 'right' }}
                        >
                            <Button
                                name={'Создать игру'}
                                clickHandle={openModalCreateLobby}
                            />
                        </div>
                        {renderLobbies()}
                    </div>
                </div>
            </div>
            <CreateLobbyModal
                state={isOpenModalCreateLobby}
                openModal={openModalCreateLobby}
            />
        </>
    );
}
