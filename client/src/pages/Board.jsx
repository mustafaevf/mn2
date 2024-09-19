import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router';
import io from "socket.io-client";
import { useAuthStore } from '../store/authStore';
import Fields from '../components/Game/Fields';
import Popup from '../components/Game/Popup';
import Player from '../components/Game/Player';
import DealPopup from '../components/Game/DealPopup';
import Chat from '../components/Game/Chat';


const s = io('http://localhost:8080/api/plays');

export default function Board() {
    const { uuid } = useParams(); 
    
    const [board, setBoard] = useState({});
    const [users, setUsers] = useState([]);


    const {user, isAuth} = useAuthStore();
    const [fields, setFields] = useState(null);
    const [userEvent, setUserEvent] = useState(null);
    
    
    const [chats, setChats] = useState();
    const chatRef = useRef(null);
    const [game, setGame] = useState({});
    const [players, setPlayers] = useState();

    const [boardState, setBoardState] = useState();

    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserPopup, setShowUserPopup] = useState(false);

    const [showDealPopup, setShowDealPopup] = useState(false);
    const [selectedUserForDeal, setSelectedUserForDeal] = useState(null);

    const clickTest = () => {
        setUserEvent(null);
    }

    const clickUser = () => {
 
    }

    const createDeal = () => {
        setShowUserPopup(false);
        setShowDealPopup(true);
    }

    const handleUserClick = (user) => {
        if(showUserPopup) {
            setSelectedUser(null);
            setShowUserPopup(false);
        } else {
            setSelectedUser(user);
            setSelectedUserForDeal(user);
            setShowUserPopup(true);
        }
    };

    const payTax = () => {
        s.emit('payTax', {user});
        setUserEvent(null);
    }

    const rollDice = () => {
        s.emit('rollDice', {user});
        setUserEvent(null);
    }
    
    const offerDeal = (data) => {
        s.emit('offerDeal', {user, data});
    }

    const confirmDeal = (data) => {
        s.emit('confirmDeal', {user, data});
    }

    const pawnProperty = (property) => {
        s.emit('pawnProperty', {user, property});
    }

    const buybackProperty = (property) => {
        s.emit('buybackProperty', {user, property});
    }

    const upgradeProperty = (property) => {
        s.emit('upgradeProperty', {user, property});
    }

    const buyProperty = () => {
        s.emit('buyProperty', {user});
        setUserEvent(null);
    }

    const callUserEvent = (title, description, actions) => {
        const userEvent = {title: title, description: description, actions: actions};
        setUserEvent(userEvent);
    }

    useEffect(() => {
        if (boardState && boardState.length > 0) {
            const lastState = boardState[boardState.length - 1];
            console.log('Последний элемент:', lastState);
    
            const state = boardState.find((bs) => bs.playerId === user.id);
            console.log('Состояние для текущего пользователя:', state);
            
            if (state && state.event === 'rollDice') {
                const actions = [{
                    title: 'Бросить куб',
                    func: rollDice
                }]
                callUserEvent("Твой ход", "Бросай куб", actions);
            }
            if(state && state.event === 'buyProperty') {
                const actions = [{
                    title: 'Купить',
                    func: buyProperty
                }, {title: 'Аукцион', func: clickTest}]
                callUserEvent("Покупка недви", "", actions);
            }
            if(state && state.event === 'payTax') {
                callUserEvent("Оплата", state.data.price, payTax);
            }
            if(state && state.event === 'offerDeal') {
                alert("пришла сделка");
                console.log(state.data);
            }
        }
    }, [boardState]);
 
    
    useEffect(() => {
        setChats(game.events);
        setPlayers(game.players);
        setBoardState(game.boardState);
    }, [game]);

    useEffect(() => {
        s.on('update', (ob) => {
            setGame(ob);
        });

        s.on('event', (message, data) => {
            console.log(message);
            if(message === "rollDice") {
                const actions = [{
                    title: 'Бросить куб',
                    func: rollDice
                }]
                callUserEvent("Твой ход", "Бросай куб", actions);
            } else if(message == 'buyProperty') {
                 const actions = [{
                    title: 'Купить',
                    func: buyProperty
                }, {title: 'Аукцион', func: clickTest}]
                callUserEvent("Покупка недви", "", actions);
            } else if(message === 'payTax') {
                callUserEvent("Оплата", data.price, payTax);
            }
        });

        const getStatus = async () => {
            const response = await axios.get(`http://localhost:8080/api/board/${uuid}/status`);
            setBoard(response.data.board);
            setUsers(response.data.users);
            if(isAuth) {
                const currentUser = response.data.users.find(u => u.user.id === user.id);
                if(response.data.board.status == 0) {
                    s.emit("connected", {user});
                }
            }
        }

        const getFields = async () => {
            const response = await axios.get(`http://localhost:8080/api/board/fields`);
            setFields(response.data);
        };

        getFields();

        getStatus();
    }, [uuid, s]);   
    
    if (!fields) {
        return <div>Загрузка...</div>; 
    }

    return (
        <div className="content">
            
            <div className="board bg">
                {userEvent && <Popup 
                                    title={userEvent.title} 
                                    description={userEvent.description} 
                                    actions={userEvent.actions} 
                                /> }
                {showDealPopup && <DealPopup 
                                        to={selectedUserForDeal} 
                                        from={players.find((player) => player.id === user.id)} 
                                        close={createDeal} 
                                        offerDeal={offerDeal} 
                                    /> }
                {players && <Fields 
                                fields={fields} 
                                users={players} 
                                pawnProperty={pawnProperty} 
                                buybackProperty={buybackProperty} 
                                upgradeProperty={upgradeProperty} 
                            /> }

                {players && players.map((player) => ( <Player key={player.socketId} color={player.color} pos={player.position} players={players} /> ))}
                
               <Chat chats={chats}/>
            </div>
            
            <div className="users bg box">
            {users.length > 0 ? (
                users.map((us) => {
                const player = players && players.find((player) => player.id === us.user.id);
                return player ? (
                    <div className={`user light-bg ${player.color}${game.currentPlayerId === player.id ? '': '-opacity'}`} onClick={() => handleUserClick(player)} key={us.user.login}>
                        <img
                            src={`http://localhost:8080/uploads/${us.user.image}`}
                            alt="avatar"
                        />
                        <div className="user-login">{us.user.login}</div>
                        <div className="user-balance">{player.balance}</div> 
                        {showUserPopup && selectedUser.id === player.id ? (
                            <div className="user-popup">
                                
                                    {selectedUser.id === user.id ? (
                                        <div className="user-popup-item"> 
                                            <div className="text">Покинуть</div>
                                        </div>
                                    ): (
                                        <>
                                            <div className="user-popup-item"> 
                                                <div className="text">Пожаловаться</div>
                                            </div>
                                            <div className="user-popup-item"> 
                                                <div className="text" onClick={() => createDeal()}>Обмен</div>
                                            </div>
                                        </>
                                    )}

                            
                            </div>
                        ): null}
                        
                    </div>
                ) : (
                    <div className="user light-bg" key={us.user.login}>
                        <img
                            src={`http://localhost:8080/uploads/${us.user.image}`}
                            alt="avatar"
                        />
                        <div className="user-login">{us.user.login}</div>
                    </div>
                );
                })
            ) : (
                <div>No users found</div>
            )}
            </div>
           
        </div>
    )   
}
