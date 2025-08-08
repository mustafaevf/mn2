import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import Button from './ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useBalanceStore } from '../stores/balanceStore';
import { formatMoney } from '../helpers/formatMoney';
import Dropdown from './ui/Dropdown';

interface HeaderProps {
    onLogin: () => void;
}

type SelectedType = {
    title: string;
    data: string;
};

const Header = ({ onLogin }: HeaderProps) => {
    const { isAuth, user, logout } = useAuthStore();
    const [selectedOption, setSelectedOption] = useState<SelectedType | null>(null);
    const balance = useBalanceStore((state) => state.balance);
    const navigate = useNavigate();

    const handleSelect = (option: SelectedType) => {
        setSelectedOption(option);

        switch (option.data) {
            case 'user':
                navigate('/users/' + user?.id);
                break;
            case 'wallet':
                navigate('/wallet');
                break;
            case 'exit':
                logout();
                navigate('/');
                break;
            default:
                break;
        }
    };

    return (
        <header className="bg-transparent flex items-center justify-end py-8">

            {isAuth ? (
                <div className="flex items-center space-x-4">
                    <div className="bg-ui rounded-sm w-30 flex justify-center px-2  flex items-center py-2 text-primary border border-border font-medium text-sm">
                        {formatMoney(balance)}
                    </div>
                    <Dropdown
                        options={[
                            { title: 'Профиль', data: 'user' },
                            { title: 'Кошелек', data: 'wallet' },
                            { title: 'Выйти', data: 'exit' },
                        ]}
                        selected={selectedOption}
                        onSelect={handleSelect}
                        trigger={
                            <img
                                className="w-12 h-12 rounded-sm object-cover"
                                src={`http://localhost:8080/uploads/${user?.image}`}
                                alt={user?.login}
                            />
                        }
                    />
                </div>
            ) : (
                <Button label="Авторизация" onClick={onLogin} />
            )}
        </header>
    );
};

export default Header;
