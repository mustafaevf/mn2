import React, { useEffect, useState, useRef } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import io, { Socket } from 'socket.io-client';
import { useAuthStore } from '../../stores/authStore';
import { IUser } from '../../types/User';
import { useNotification } from '../../contexts/NotificationContext';
import { useBalanceStore } from '../../stores/balanceStore';
import BetInput from '../../components/ui/BetInput';
import { motion } from 'framer-motion';

type Props = {};

type Bets = {
    user: IUser;
    color: string;
    bet: number;
};

type GameInfo = {
    isSpinning: boolean;
    isRunning: boolean;
    bets: Bets[];
    history: string[];
    prevRotation: number;
    winnerColor: string;
};

type GameResult = {
    rotation: number;
    winnerColor: string;
};

const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const COLORS = [
    { name: 'purple', multiplier: 10 },
    { name: 'yellow', multiplier: 5 },
    { name: 'green', multiplier: 3 },
    { name: 'blue', multiplier: 2 },
];

const socket: Socket = io('http://localhost:8080/api/games/double');

const DoubleGamePage = (props: Props) => {
    const { addNotification } = useNotification();
    const [bet, setBet] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [timer, setTimer] = useState<number>(20);
    const [gameInfo, setGameInfo] = useState<GameInfo>({
        isSpinning: false,
        isRunning: false,
        bets: [],
        history: [],
        prevRotation: 0,
        winnerColor: '',
    });
    const [transitionDuration, setTransitionDuration] = useState(0);
    const [gameResult, setGameResult] = useState<GameResult>({
        rotation: 0,
        winnerColor: '',
    });
    const { user, isAuth } = useAuthStore();
    const wheelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleTimerUpdate = (timer: number) => setTimer(timer);
        const handleError = (error: string) => addNotification(error, 'error');
        const handleGameUpdate = (gameInfo: any) => {
            setGameInfo(gameInfo);
            console.log(gameInfo);
        };
        const handleGameResult = (result: GameResult) => {
            if (isAuth) {
                useBalanceStore.getState().fetchBalance();
            }
            setGameResult((prev) => {
                const newState = {
                    ...prev,
                    winnerColor: result.winnerColor,
                    rotation: result.rotation,
                };
                console.log(newState);
                return newState;
            });
        };
    
        socket.on('timer_update', handleTimerUpdate);
        socket.on('error', handleError);
        socket.on('game_update', handleGameUpdate);
        socket.on('game_result', handleGameResult);
    
        return () => {
            socket.off('timer_update', handleTimerUpdate);
            socket.off('error', handleError);
            socket.off('game_update', handleGameUpdate);
            socket.off('game_result', handleGameResult);
        };
    }, []);
    
    useEffect(() => {
        if (wheelRef.current && gameResult.rotation && gameInfo.isSpinning == true) {
            const currentRotation = gameInfo.prevRotation;
            let targetRotation = gameResult.rotation;
            // targetRotation = 360 + -1 + 360 / 54;

            wheelRef.current.style.transition = `transform ${5000 / 1000}s cubic-bezier(0.23, 1, 0.32, 1)`;
            wheelRef.current.style.transform = `rotate(${targetRotation}deg)`;
        }
    }, [gameResult, gameInfo.prevRotation]);

    const placeBet = () => {
        if (!isAuth) {
            alert('Войдите в аккаунт');
            return;
        }

        socket.emit('place_bet', {
            bet: Number(bet),
            color: color,
            user: user,
        });

        useBalanceStore.getState().fetchBalance();
    };

    const renderSegments = () => {
        const colors = [
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#ba55d3',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
            '#ffb84f',
            '#6495ed',
            '#90ee90',
        ];
        return colors.map((color, index) => (
            <div
                key={index}
                className="slice"
                style={{
                    backgroundColor: color,
                    transform: `rotate(${index * (360 / colors.length)}deg)`,
                    transformOrigin: '50% 50%',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
            ></div>
        ));
    };

    const renderColorButton = (value: string, label: string, multiplier: string, colorStyle: string) => (
        <button
            type="button"
            aria-pressed={color === value}
            className={`btn relative flex aspect-square h-11 items-center justify-center overflow-hidden rounded font-medium text-sm text-primary hover:brightness-110 transition duration-100 grow gap-1 ${color === value ? colorStyle : 'bg-ui'}`}
            onClick={() => setColor(value)}
        >
            {label}
        </button>
    );

    return (
        <>
            <div className="text-primary text-xl font-bold mb-4">Double</div>
            <div className="flex flex-col md:flex-row gap-4 text-dark-text">
                <div className="md:w-1/4 lg:w-1/5 flex flex-col gap-4">
                    <div className="rounded-lg relative p-4 lg:p-5 shrink-0 flex flex-col bg-secondary gap-3.5">
                        <div className="text-xs font-medium uppercase text-secondary">Сумма ставки</div>
                        <BetInput bet={bet} setBet={setBet} />
                        <div className="text-xs font-medium uppercase text-secondary">Сделать ставку</div>
                        <div className="group flex gap-1 border border border-border p-1 rounded">
                            {renderColorButton('blue', 'x2', '2', 'bg-wheel-blue')}
                            {renderColorButton('green', 'x3', '3', 'bg-wheel-green')}
                            {renderColorButton('yellow', 'x5', '5', 'bg-wheel-yellow')}
                            {renderColorButton('purple', 'x10', '10', 'bg-wheel-purple')}
                        </div>
                        <Button label="Сделать ставку" onClick={() => placeBet()} />
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4 bg-secondary rounded-lg p-4">
                    <div className="rounded bg-dark-secondary p-4 flex flex-col items-center justify-center">
                        <div className="wheel-container">
                            <div
                                className={`wheel ${gameInfo.isSpinning ? 'spinning' : ''}`}
                                ref={wheelRef}
                            >
                                {renderSegments()}
                            </div>
                            <div className="wheel-center">
                                <div className="triangle"></div>
                                {gameInfo.isSpinning == false ? (
                                    <>
                                        <p>До начала игры</p>
                                        <p className="timer">{timer} сек</p>
                                    </>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-background rounded p-4">
                        <div className="flex gap-2 justify-center">
                            {gameInfo.history
                                .slice()
                                .reverse()
                                .map((hs, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeInVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`h-6 w-6 rounded bg-wheel-${hs}`}
                                    ></motion.div>
                                ))}
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-4">
                            {COLORS.map(({ name, multiplier }) => {
                                const colorBets = gameInfo.bets.filter((bet) => bet.color === name);

                                return (
                                    <div className="flex flex-col border border-border rounded gap-2 p-2">
                                        <div key={name} className={`p-4 bg-wheel-${name} border border-border rounded`}>
                                            <div className="flex justify-between items-center">
                                                <div className="text-base font-bold text-primary">x{multiplier}</div>
                                                <div className="text-xs text-primary">{colorBets.length} игроков</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1 h-24 overflow-scroll overflow-y-scroll overflow-x-hidden">
                                            {colorBets.map(({ user, bet }) => (
                                                <div
                                                    key={user.id}
                                                    className="flex items-center justify-between text-xs"
                                                >
                                                    <div className="flex items-center gap-1">
                                                        <img
                                                            className="w-6 h-6 rounded-sm object-cover"
                                                            src={`http://localhost:8080/uploads/${user?.image}`}
                                                            alt={user?.login}
                                                        />
                                                        <span className="text-primary text-xs font-medium">
                                                            {user.login}
                                                        </span>
                                                    </div>
                                                    <span className="text-primary text-xs font-bold">
                                                        {bet.toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoubleGamePage;
