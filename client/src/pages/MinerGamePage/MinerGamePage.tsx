import React, { useEffect } from 'react';
import Tabs from '../../components/ui/Tabs';
import BetInput from '../../components/ui/BetInput';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import io, { Socket } from 'socket.io-client';
import { useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuthStore } from '../../stores/authStore';
import { useBalanceStore } from '../../stores/balanceStore';
import CoefficientScroller from '../../components/common/miner/CoefficientScroller';
import BetTable from '../../components/common/BetTable';

type Props = {};

const socket: Socket = io('http://localhost:8080/api/games/miner');

const MinerGamePage = (props: Props) => {
    const { addNotification } = useNotification();
    const { user, isAuth } = useAuthStore();
    const [bet, setBet] = useState<string>('');
    const [countMines, setCountMines] = useState<string>('');

    const [mines, setMines] = useState<number[]>(new Array(25).fill(0));
    const [canCollect, setCanCollect] = useState<boolean>(false);
    const [coefficient, setCoefficient] = useState<number>(1);
    const [coefficients, setCoefficients] = useState<number[]>([]);
    const [guessedSteps, setGuessedSteps] = useState<number[]>([]);

    const placeBet = () => {
        if (!isAuth) {
            addNotification('Войдите в аккаунт', 'error');
            return;
        }
        setMines(new Array(25).fill(0));
        setCanCollect(false);
        setCoefficient(0);
        setGuessedSteps([]);

        socket.emit('place_bet', {
            bet: Number(bet),
            countMines: Number(countMines),
            user: user,
        });

        useBalanceStore.getState().fetchBalance();
    };

    const collectWinnings = () => {
        socket.emit('collectWinnings', { user: user });
    };

    useEffect(() => {
        console.log('mines');
        socket.emit('getCoefficients', { countMines });
    }, [countMines]);

    useEffect(() => {
        socket.on('success', (data) => {
            addNotification(data, 'success');
        });

        socket.on('error', (data) => {
            addNotification(data, 'error');
        });

        socket.on('gameOver', (data) => {
            if (data.status === 'lose') {
                addNotification(data.message, 'error');
            } else {
                addNotification(data.message, 'success');
            }
            useBalanceStore.getState().fetchBalance();
            setMines(new Array(25).fill(0));
            setCanCollect(false);
            setCoefficient(0);
            setGuessedSteps([]);
        });

        socket.on('onCoefficients', (data) => {
            console.log(data);
            setCoefficients(data.coefficients);
        });

        socket.on('onTurn', (data) => {
            console.log(data);
            setMines((prevMines) => {
                const newMines = [...prevMines];
                newMines[data.index] = data.value;
                return newMines;
            });
            if (data.turn >= 1) {
                setCanCollect(true);
                setCoefficient(data.coefficient);
                setGuessedSteps((prev) => [...prev, data.turn - 1]);
            }
        });

        return () => {
            socket.off('onTurn');
            socket.off('success');
            socket.off('error');
        };
    }, []);

    const clickCell = (id: number) => {
        if (!isAuth) {
            addNotification('Войдите в аккаунт', 'error');
            return;
        }

        socket.emit('makeTurn', { user: user, index: id });
    };

    return (
        <>
            <div className="text-primary text-xl font-bold mb-4">Miner</div>
            <div className="flex flex-col md:flex-row gap-4 text-dark-text">
                <div className="md:w-1/4 lg:w-1/5 flex flex-col gap-4">
                    <div className="rounded-lg relative p-4 lg:p-5 shrink-0 flex flex-col bg-secondary gap-3.5">
                        <div className="pl-1.5 text-xs font-medium uppercase text-secondary">Сумма ставки</div>
                        <BetInput bet={bet} setBet={setBet} />
                        <div className="pl-1.5 text-xs font-medium uppercase text-secondary">Кол-во мин</div>
                        <Input label="Мины" value={countMines} onChange={setCountMines} placeholder="Количество мин" />
                        {canCollect == false ? (
                            <Button label={'Сделать ставку'} onClick={() => placeBet()} />
                        ) : (
                            <Button label={'Забрать выигрыш'} onClick={() => collectWinnings()} />
                        )}
                    </div>
                </div>

                <div className="flex-1 flex flex-col h-fit gap-4 bg-secondary items-center rounded-lg p-4">
                    <div className="grid grid-cols-5 gap-2 w-fit mx-auto p-4 rounded-lg border border-dot border-border">
                        {mines.map((state, index) => (
                            <div
                                key={index}
                                className={`w-16 h-16 rounded flex items-center text-primary justify-center cursor-pointer border-4 border-border  
                               ${state === -1 ? 'bg-success' : state === 2 ? 'bg-error' : 'bg-ui hover:bg-box'}`}
                                onClick={() => clickCell(index)}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                    <CoefficientScroller coefficients={coefficients} guessedSteps={guessedSteps} />
                </div>
                <BetTable s={socket} />
            </div>
        </>
    );
};

export default MinerGamePage;
