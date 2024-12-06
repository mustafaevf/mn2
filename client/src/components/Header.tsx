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
        <div className="mx-auto w-full flex flex-col lg:w-[1800px]">
            <header className="flex items-center justify-between p-4 text-white">
                <Link to='/'>
                    <h1 className="text-lg text-primary font-bold">My App</h1>
                </Link>
                {isAuth && isAuth === true ? (
                    <div className="flex justify-between items-center space-x-3">
                        <Link to='/marketplace'>
                            <h3 className="text-base text-secondary">Маркет</h3>
                        </Link>
                        <Link to={`/users/${user?.id}`}>
                            <img
                                className="w-12 h-12 rounded object-cover border-2 border-indigo-500"
                                src={`http://localhost:8080/uploads/${user?.image}`}
                                alt={user?.login}
                            />
                        </Link>
                        {/* <Button label="Выход" onClick={logout} /> */}
                    </div>
                ) : (
                    <Button label="Авторизация" onClick={onLogin} />
                )}
            </header>
        </div>
       
    );
};

export default Header;
