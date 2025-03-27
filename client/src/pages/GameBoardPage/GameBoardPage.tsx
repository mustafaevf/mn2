import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { useAuthStore } from '../../stores/authStore';
import GameBoard from '../../components/common/monopoly/GameBoard';
import GameUsers from '../../components/common/monopoly/GameUsers';
import { Board } from '../../types/Board';
import Button from '../../components/ui/Button';
import GameChat from '../../components/common/monopoly/GameChat';

type Field = {
    pos: number;
    title: string;
    action: string;
    price?: number;
    upgrade?: number;
    pawn?: number;
    buyback?: number;
    tax?: number;
    level?: object;
    group?: number;
};

type GameBoardPageParams = {
    uuid: string;
};

export type userEvent = {
    title: string;
    description: string;
    actions: { name: string; func: () => void }[];
};

const socket: Socket = io('http://localhost:8080/api/games/monopoly');

const GameBoardPage = () => {
    const { uuid } = useParams<GameBoardPageParams>();
    const { user } = useAuthStore();
    const [board, setBoard] = useState<Board>();
    const [fields, setFields] = useState<Field[]>();
    const connected = useRef(false);
    const [userEvent, setUserEvent] = useState<userEvent | null>();

    const payTax = () => {
        socket.emit('payTax', { user });
        setUserEvent(null);
    };

    const rollDice = () => {
        socket.emit('rollDice', { user });
        setUserEvent(null);
    };

    const offerDeal = (data: any) => {
        socket.emit('offerDeal', { user, data });
    };

    const confirmDeal = (data: any) => {
        socket.emit('confirmDeal', { user, data });
    };

    const pawnProperty = (property: any) => {
        socket.emit('pawnProperty', { user, property });
    };

    const buybackProperty = (property: any) => {
        socket.emit('buybackProperty', { user, property });
    };

    const upgradeProperty = (property: any) => {
        socket.emit('upgradeProperty', { user, property });
    };

    const buyProperty = () => {
        socket.emit('buyProperty', { user });
        setUserEvent(null);
    };

    const callUserEvent = ({ title, description, actions }: userEvent) => {
        const userEvent = {
            title: title,
            description: description,
            actions: actions,
        };
        setUserEvent(userEvent);
    };

    const clickTest = () => {
        setUserEvent(null);
    };

    useEffect(() => {
        socket.on('fields', (data) => {
            setFields(data);
            console.log(data);
        });

        if (!connected.current && user) {
            socket.emit('connect_board', { user });
            console.log('connect_board sent');
            connected.current = true;
        }
    }, [user]);

    useEffect(() => {
        if (!user) return;
        if (board?.boardState && board?.boardState.length > 0) {
            const lastState = board?.boardState[board?.boardState.length - 1]
            console.log('Последний элемент:', lastState)

            const state = board?.boardState.find((bs) => bs.playerId === user.id)
            console.log('Состояние для текущего пользователя:', state)

            if (state && state.event === 'rollDice') {
                const actions = [
                    {
                        name: 'Бросить куб',
                        func: rollDice,
                    },
                ];
                callUserEvent({ title: 'Твой ход', description: 'Бросай куб', actions });
            }
            if (state && state.event === 'buyProperty') {
                const actions = [
                    {
                        name: 'Купить',
                        func: buyProperty,
                    },
                    { name: 'Аукцион', func: clickTest },
                ];
                callUserEvent({ title: 'Покупка недвиги', description: 'Купить', actions });
            }
            if (state && state.event === 'payTax') {
                const actions = [
                    {
                        name: 'Оплатить',
                        func: payTax,
                    },
                ];
                callUserEvent({ title: 'Оплата', description: "9", actions });
            }
            if (state && state.event === 'offerDeal') {
                alert('пришла сделка')
                console.log(state.data)
            }
        }
    }, [board?.boardState])

    useEffect(() => {

        const handleUpdate = (data: Board) => {
            console.log('update', data);
            setBoard(data);
        };
        

        const handleEvent = (data: any) => {
            console.log('event ' + data);
            if (data === 'rollDice') {
                const actions = [
                    {
                        name: 'Бросить куб',
                        func: rollDice,
                    },
                ];
                callUserEvent({ title: 'Твой ход', description: 'Бросай куб', actions });
            } else if (data == 'buyProperty') {
                const actions = [
                    {
                        name: 'Купить',
                        func: buyProperty,
                    },
                    { name: 'Аукцион', func: clickTest },
                ];
                callUserEvent({ title: 'Покупка недвиги', description: 'Купить', actions });
            } else if (data === 'payTax') {
                const actions = [
                    {
                        name: 'Оплатить',
                        func: payTax,
                    },
                ];
                callUserEvent({ title: 'Оплата', description: data.price, actions });
            }
            console.log('event', data);
        };

        socket.on('update', handleUpdate);
        socket.on('event', handleEvent);

        return () => {
            socket.off('update', handleUpdate);
            socket.off('event', handleEvent);
        };
    }, []);

    const emitEvent = (event: string, data?: any) => {
        socket.emit(event, { user, ...data });
    };

    return (
        <>
            <div className="flex text-white max-w-[1770px] mx-auto flex-grow">
                <div className="w-2/6 mr-20 h-screen flex flex-col justify-center">
                    <div className="text-lg">
                        Игроки
                        <span>
                            {board?.players.length} из {board?.max_person}
                        </span>
                    </div>
                    <GameUsers players={board?.players} />

                    <div className="mt-4 space-y-2">
                        <button className="w-full py-2 bg-orange-500 text-black rounded-lg font-semibold">
                            Купить
                        </button>
                        <button className="w-full py-2 bg-gray-800 text-white rounded-lg">Кинуть кубик</button>
                    </div>
                </div>

                <div className="w-5/6 flex justify-center my-auto">
                    <GameBoard fields={fields ?? []} board={board!} userEvent={userEvent || null}/>
                    {/* <div className="relative w-[931px] h-[931px] bg-gray-900 border border-gray-700 rounded-lg p-4"> */}
                    
                    {/* </div> */}
                </div>

                <GameChat messages={board?.events ?? []} s={socket} />
            </div>
            {/* .
            <div className="absolute top-[200px] left-[450px] z-[9999]">
                {userEvent && (
                    <div className="bg-secondary p-4 border border-border rounded">
                        {userEvent.title}
                        {userEvent.description}
                        {userEvent.actions &&
                            userEvent.actions.map((action, index) => (
                                <Button key={index} label={action.name} onClick={action.func} />
                            ))}
                    </div>
                )}
            </div>
            <div className="flex gap-4">
                <GameBoard chats={board?.events ? board.events : []} />
               
            </div> */}
        </>
    );
};

export default GameBoardPage;
