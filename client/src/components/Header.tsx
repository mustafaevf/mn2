import React from 'react';
import { useAuthStore } from '../stores/authStore';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

interface HeaderProps {
    onLogin: () => void;
}

const Header = ({ onLogin }: HeaderProps) => {
    const { isAuth, user, logout } = useAuthStore();

    return (
        <header className="flex items-center justify-between p-4 bg-darkBackground text-white border-solid border-b-3 border-border">
            <Link to='/'>
                <h1 className="text-lg font-bold">My App</h1>
            </Link>
            {isAuth && isAuth === true ? (
                <div className="flex justify-between items-center space-x-3">
                    <Link to='/marketplace'>
                        <h3 className="text-lg font-bold">Маркет</h3>
                    </Link>
                    <Link to={`/users/${user?.id}`}>
                        <h3 className="text-lg font-bold">{user?.login}</h3>
                    </Link>
                    <Button label="Выход" onClick={logout} />
                </div>
            ) : (
                <Button label="Авторизация" onClick={onLogin} />
            )}
        </header>
    );
};

export default Header;
