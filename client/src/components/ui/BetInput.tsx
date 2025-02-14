import { useEffect } from 'react';
import { useBalanceStore } from '../../stores/balanceStore';
import Input from './Input';

type BetInputProps = {
    bet: string;
    setBet: (value: string) => void;
};

const BetInput = ({ bet, setBet }: BetInputProps) => {
    const balance = useBalanceStore((state) => state.balance);
    const fetchBalance = useBalanceStore((state) => state.fetchBalance);

    useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    const formatNumber = (value: string) => {
        const num = Number(value.replace(/\s/g, ''));
        if (isNaN(num)) return '';
        return new Intl.NumberFormat('ru-RU').format(num);
    };

    const handleChange = (value: string) => {
        let rawValue = Number(value.replace(/\s/g, ''));
        if (rawValue > balance) rawValue = balance;
        if (rawValue < 0) rawValue = 0;
        setBet(String(rawValue));
    };

    const handleMaxClick = () => {
        setBet(String(balance));
    };

    const handleFractionClick = (fraction: number) => {
        setBet(String(Math.floor(Number(bet.replace(/\s/g, '')) * fraction)));
    };

    return (
        <div className="flex flex-col gap-2">
            <Input
                label="Ставка"
                value={formatNumber(bet)}
                onChange={(val) => handleChange(val)}
                placeholder="Введите ставку"
                type="text"
                iconType='rub'
            />
            <div className="flex gap-2 flex-grow">
                <button
                    onClick={handleMaxClick}
                    className="bg-secondary border border-border rounded-sm px-3 py-2 text-secondary text-xs hover:bg-hover transition-colors"
                >
                    max
                </button>
                <button
                    onClick={() => handleFractionClick(1 / 2)}
                    className="bg-secondary border border-border rounded-sm text-secondary text-xs px-3 py hover:bg-hover transition-colors"
                >
                    1/2
                </button>
                <button
                    onClick={() => handleFractionClick(1 / 3)}
                    className="bg-secondary border border-border rounded-sm px-3 py text-secondary text-xs hover:bg-hover transition-colors"
                >
                    1/3
                </button>
                <button
                    onClick={() => handleFractionClick(1 / 4)}
                    className="bg-secondary border border-border rounded-sm px-3 py text-secondary text-xs hover:bg-hover transition-colors"
                >
                    1/4
                </button>
            </div>
        </div>
    );
};

export default BetInput;
