import React, { useEffect, useState } from 'react';
import Tabs from '../ui/Tabs';
import { Socket } from 'socket.io-client';
import { Bet } from '../../types/Bet';
import { formatMoney } from '../../helpers/formatMoney';

type Props = {
    s: Socket;
};

const BetTable = ({ s }: Props) => {
    const [activeTab, setActiveTab] = useState<string>('Ставки');
    const [bets, setBets] = useState<Bet[]>([]);

    useEffect(() => {
        s.on('getBets', (data) => {
            console.log(data);
            setBets(data);
        });
    }, []);

    return (
        <>
            <div className="flex flex-col gap-2 w-96 rounded-lg h-full">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {bets &&
                    bets.map((bet) => (
                        <div className="bg-secondary flex rounded rounded-lg px-4 py-2 gap-4 items-center cursor-pointer">
                            <img
                                className="w-8 h-8 rounded-sm object-cover "
                                src={`http://localhost:8080/uploads/${bet.user.image}`}
                                alt={bet.user.login}
                            />
                            <div className="flex flex-col">
                                <div className="text-primary text-sm">{bet.user.login}</div>
                                <div className="text-secondary text-xs">{formatMoney(bet.amount)}</div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default BetTable;
