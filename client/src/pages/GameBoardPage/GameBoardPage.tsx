import React from 'react';
import useBoard from '../../hooks/useBoard';
import { useParams } from 'react-router-dom';
import GameBoard from '../../components/common/GameBoard';
import GameUsers from '../../components/common/GameUsers';
import io, { Socket } from 'socket.io-client';
import { useAuthStore } from '../../stores/authStore';
import { useState, useEffect } from 'react';

type GameBoardPageParams = {
    uuid: string;
};

const socket: Socket = io('http://localhost:8080/api/game');

const GameBoardPage = () => {
    const { uuid } = useParams<GameBoardPageParams>();
    const { user } = useAuthStore();
    const { board, isLoading } = useBoard(uuid || '');

    useEffect(() => {
        if(board?.players.some((player) => player.id === user?.id)) {
            socket.emit('connected', { user });
        }
    }, [board]);

    if (isLoading === false) {
        return <h3>загрузка</h3>;
    }

    const emitEvent = (event: string, data?: any) => {
        socket.emit(event, { user, ...data });
    };

    return (
       <div className="flex gap-4 bg-gradient-2 rounded">
            <GameBoard />
            <GameUsers players={board?.players}/>
       </div>

    );
};

export default GameBoardPage;