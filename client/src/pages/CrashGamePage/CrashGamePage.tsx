import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import BetInput from '../../components/ui/BetInput';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuthStore } from '../../stores/authStore';
import { IUser } from '../../types/User';
import { useNotification } from '../../contexts/NotificationContext';
import { useBalanceStore } from '../../stores/balanceStore';
import Tabs from '../../components/ui/Tabs';

type Props = {};

type Order = {
    user: IUser;
    bet: number;
    cashoutAt: number;
};

type GameInfo = {
    orders: Order[];
    ceff: number;
    timeToStartRound: number;
    isRunning: boolean;
};

const socket: Socket = io('http://localhost:8080/api/games/crash');

const CrashGamePage = (props: Props) => {
    const { addNotification } = useNotification();
    const { isAuth, user } = useAuthStore();
    const [bet, setBet] = useState<string>('');
    const [cashoutAt, setCashoutAt] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('Ставки');
    const [gameInfo, setGameInfo] = useState<GameInfo>({
        orders: [],
        ceff: 0.0,
        isRunning: false,
        timeToStartRound: 0,
    });
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
    const [startTime, setStartTime] = useState<number | null>(null);

    const checkStatus = () => {
        return gameInfo.orders.find((ord) => ord.user.id === user?.id);
    };

    const placeBet = () => {
        if (checkStatus()) {
            socket.emit('cash_out', { user: user });
        } else {
            socket.emit('place_bet', {
                user: user,
                bet: Number(bet),
                cashoutAt: Number(cashoutAt),
            });
        }
        useBalanceStore.getState().fetchBalance();
    };

    useEffect(() => {
        const handleGameInfo = (data: GameInfo) => {
            console.log(data);
            setGameInfo(data);
            if (data.isRunning) {
                if (!startTime) {
                    setStartTime(Date.now());
                    setPoints([{ x: 0, y: 100 }]);
                }
                setPoints((prev) => [
                    ...prev,
                    { x: (Date.now() - (startTime || Date.now())) / 20, y: data.ceff * 100 },
                ]);
            } else {
                setStartTime(null);
                setPoints([]);
            }
            
        };


        socket.on('error', (data) => addNotification(data, 'error'));
        socket.on('game_info', handleGameInfo);

        return () => {
            socket.off('game_info', handleGameInfo);
        };
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.beginPath();
        ctx.moveTo(0, 100);

        points.forEach((point) => {
            ctx.lineTo(point.x, point.y);
        });

        ctx.strokeStyle = 'limegreen';
        ctx.lineWidth = 2;
        ctx.stroke();
    }, [points]);

    return (
        <>
            <div className="text-primary text-xl font-bold mb-4">Crash</div>
            <div className="flex flex-col md:flex-row gap-4 text-dark-text">
                <div className="md:w-1/4 lg:w-1/5 flex flex-col gap-4">
                    <div className="rounded-lg relative p-4 lg:p-5 shrink-0 flex flex-col bg-secondary gap-3.5">
                        <div className="pl-1.5 text-xs font-medium uppercase text-secondary">Сумма ставки</div>
                        <BetInput bet={bet} setBet={setBet} />

                        <div className="pl-1.5 text-xs font-medium uppercase text-secondary">Авто-стоп</div>
                        <Input label="Авто-стоп" value={cashoutAt} onChange={setCashoutAt} placeholder="Авто-стоп" />

                        {/* <div className="pl-1.5 text-xs font-medium uppercase text-secondary">Сделать ставку</div> */}
                        <Button
                            label={
                                checkStatus()
                                    ? 'Забрать ставку'
                                    : gameInfo.isRunning
                                      ? 'Ожидание новой игры'
                                      : 'Сделать ставку'
                            }
                            onClick={
                                checkStatus() ? () => placeBet() : gameInfo.isRunning ? () => {} : () => placeBet()
                            }
                            disabled={gameInfo.isRunning && !checkStatus()}
                        />
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-4 bg-secondary rounded-lg p-4">
                    {gameInfo.isRunning == true ? <p className="text-primary text-xl justify-center text-center font-bold">
                        x{gameInfo.ceff.toFixed(2)}
                    </p> : <p className="text-primary text-xl justify-center text-center font-bold">До начала нового раунда: {gameInfo.timeToStartRound} с.</p>}
                    <canvas ref={canvasRef} width={400} height={100} className="w-full h-24 bg-black rounded-lg"></canvas>
                    
                </div>
            </div>

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex flex-col mt-4 border border-border border-dot rounded-lg h-20 p-4">
                {gameInfo.orders.length > 0 ? (
                    gameInfo.orders.map((order) => (
                        <motion.div
                            key={order.user.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-secondary p-4 rounded-lg flex justify-between items-center"
                        >
                            <img
                                className="w-6 h-6 rounded-sm object-cover"
                                src={`http://localhost:8080/uploads/${order.user.image}`}
                                alt={order.user.login}
                            />
                            <div className="text-primary">{order.user.login}</div>
                            <div className="text-primary">{order.bet} руб.</div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center">Нет ставок</p>
                )}
            </div>
        </>
    );
};

export default CrashGamePage;
