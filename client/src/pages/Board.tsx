// Import necessary libraries and types
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import io, { Socket } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';
import Fields from '../components/Game/Fields';
import Popup from '../components/Game/Popup';
import Player from '../components/Game/Player';
import DealPopup from '../components/Game/DealPopup';
import Chat from '../components/Game/Chat';

// Define TypeScript types for the entities
interface User {
   socketId: string;
   user: any;
}

interface Player {
    id: number;
    color: string;
    position: number;
    balance: number;
    socketId: string;
}

interface Game {
    events: any[];
    players: Player[];
    boardState: BoardState[];
    currentPlayerId: number;
    status: number;
}

interface BoardState {
    playerId: number;
    event: string;
    data?: any;
}

interface Field {
    id: number;
    name: string;
}

interface UserEvent {
    title: string;
    description: string;
    actions: { title: string; func: () => void }[];
}

interface Property {

}

const socket: Socket = io('http://localhost:8080/api/plays');

const Board: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const { user, isAuth } = useAuthStore();

    const [board, setBoard] = useState<any>({});
    const [users, setUsers] = useState<User[]>([]);
    const [fields, setFields] = useState<Field[] | null>(null);
    const [userEvent, setUserEvent] = useState<UserEvent | null>(null);
    const [chats, setChats] = useState<any[]>([]);
    const chatRef = useRef<HTMLDivElement>(null);
    const [game, setGame] = useState<Game>({} as Game);
    const [boardState, setBoardState] = useState<BoardState[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedUser, setSelectedUser] = useState<Player | null>(null);
    const [showUserPopup, setShowUserPopup] = useState(false);
    const [showDealPopup, setShowDealPopup] = useState(false);
    const [selectedUserForDeal, setSelectedUserForDeal] = useState<Player | null>(null);

    const clickTest = () => setUserEvent(null);
    const createDeal = () => {
        setShowUserPopup(false);
        setShowDealPopup(true);
    };
    const handleUserClick = (user: Player) => {
        setSelectedUser(showUserPopup ? null : user);
        setShowUserPopup(!showUserPopup);
    };

    const emitEvent = (event: string, data?: any) => {
        socket.emit(event, { user, ...data });
    };

    const callUserEvent = (title: string, description: string, actions: { title: string; func: () => void }[]) => {
        setUserEvent({ title, description, actions });
    };

    useEffect(() => {
        if (!boardState || boardState.length === 0) return;
        
        const lastState = boardState[boardState.length - 1];
        console.log('Последний элемент:', lastState);

        const state = boardState.find((bs) => bs.playerId === user.id);
        if (!state) return;

        if (state.event === 'rollDice') {
            callUserEvent('Твой ход', 'Бросай куб', [{ title: 'Бросить куб', func: () => emitEvent('rollDice') }]);
        } else if (state.event === 'buyProperty') {
            callUserEvent('Покупка недви', '', [
                { title: 'Купить', func: () => emitEvent('buyProperty') },
                { title: 'Аукцион', func: clickTest },
            ]);
        } else if (state.event === 'payTax') {
            callUserEvent('Оплата', state.data.price, [{ title: 'Оплатить', func: () => emitEvent('payTax') }]);
        } else if (state.event === 'offerDeal') {
            alert('пришла сделка');
            console.log(state.data);
        }
    }, [boardState]);

    

    useEffect(() => {
        socket.on('update', (data: Game) => (setGame(data)));

        socket.on('event', (message: string, data: any) => {
            const actions = message === 'rollDice'
                ? [{ title: 'Бросить куб', func: () => emitEvent('rollDice') }]
                : message === 'buyProperty'
                ? [
                      { title: 'Купить', func: () => emitEvent('buyProperty') },
                      { title: 'Аукцион', func: clickTest },
                  ]
                : message === 'payTax'
                ? [{ title: 'Оплатить', func: () => emitEvent('payTax') }]
                : [];
            if (actions.length) callUserEvent(message, data.price || '', actions);
        });

        const fetchStatus = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/boards/${uuid}/info/status`);
                console.log(data);
                setBoard(data.board);
                setUsers(data.users);
                if (isAuth && data.board.status === 1) {
                    socket.emit('connected', { user });
                }
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        const fetchFields = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/lobbies/${uuid}/info/fields`);
                setFields(data);
            } catch (error) {
                console.error('Error fetching fields:', error);
            }
        };

        fetchFields();
        fetchStatus();

        return () => {
            socket.off('update');
            socket.off('event');
        };
    }, [uuid, isAuth]);

    useEffect(() => {
        console.log(game);
        setChats(game.events);
        setPlayers(game.players);
        setBoardState(game.boardState);
    }, [game]);

    if (!fields) return <div>Загрузка...</div>;

    return (
        <div className="content">
            <div className="board bg">
                {userEvent && (
                    <Popup {...userEvent} />
                )}
                {showDealPopup && (
                    <DealPopup
                        to={selectedUserForDeal!}
                        from={players.find((player) => player.id === user.id)!}
                        close={createDeal}
                        offerDeal={(data: any) => emitEvent('offerDeal', data)}
                    />
                )}
                {players && (
                    <Fields
                        fields={fields}
                        users={players}
                        pawnProperty={(property : Property) => emitEvent('pawnProperty', { property })}
                        buybackProperty={(property : Property) => emitEvent('buybackProperty', { property })}
                        upgradeProperty={(property : Property) => emitEvent('upgradeProperty', { property })}
                    />
                )}

                {players?.map((player) => (
                    <Player key={player.socketId} color={player.color} pos={player.position} players={players} />
                ))}

                <Chat chats={chats} />
            </div>

            <div className="users bg box">
                {users && players &&(
                    users.map((us) => {
                        console.log(us.user);
                        console.log(players);
                        const player = players.find((p) => p.id === us.user.id);
                        return player ? (
                            <div
                                className={`user light-bg ${player.color}${game.currentPlayerId === player.id ? '' : '-opacity'}`}
                                onClick={() => handleUserClick(player)}
                                key={us.user.login}
                            >
                                <img src={`http://localhost:8080/uploads/${us.user.image}`} alt="avatar" />
                                <div className="user-login">{us.user.login}</div>
                                <div className="user-balance">{player.balance}</div>
                                {showUserPopup && selectedUser?.id === player.id && (
                                    <div className="user-popup">
                                        {selectedUser.id === user.id ? (
                                            <div className="user-popup-item">Покинуть</div>
                                        ) : (
                                            <>
                                                <div className="user-popup-item">Пожаловаться</div>
                                                <div className="user-popup-item" onClick={createDeal}>Обмен</div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="user light-bg" key={us.user.login}>
                                <img src={`http://localhost:8080/uploads/${us.user.image}`} alt="avatar" />
                                <div className="user-login">{us.user.login}</div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Board;
