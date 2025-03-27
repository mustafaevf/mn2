import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../../types/User';
import client from '../../services/client';
import { useAuthStore } from '../../stores/authStore';
import ItemsTab from './tabs/ItemsTab';
import { IItem } from '../../types/Item';
import { fetchItems } from '../../services/userService';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

type UserPageParams = {
    userId: string;
};

enum ActiveTab {
    ITEMS = 'items',
    FRIENDS = 'friends',
    GAMES = 'games',
    SETTINGS = 'settings',
}

const UserPage = () => {
    const { userId } = useParams<UserPageParams>();
    const [activeTab, setActiveTab] = useState<string>('Аккаунт');
    const [user, setUser] = useState<IUser>();
    const [userItems, setUserItems] = useState<IItem[]>([]);
    const [newLogin, setNewLogin] = useState<string>('');

    const fetchUser = async () => {
        try {
            const response = await client.get<IUser>(`users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const renderContent = () => {
        if (activeTab == 'Настройки') {
            return (
                <div className="grid gap-12 grid-cols-4">
                    <div className="rounded bg-secondary flex flex-col p-4 gap-3.5">
                        <div className="text-xs font-medium uppercase text-secondary">Аватар</div>
                        <img
                            className="w-[4rem] h-[4rem] rounded-sm object-cover"
                            src={`http://localhost:8080/uploads/${user?.image}`}
                            alt={user?.login}
                        />
                        <div className="text-xs font-medium uppercase text-secondary">Новый логин</div>
                        {user && (
                            <Input label="" onChange={() => setNewLogin} value={user?.login} placeholder="Логин" />
                        )}
                        <Button label="Сохранить" onClick={() => alert('save')} />
                    </div>
                    <div className="rounded bg-secondary flex flex-col p-4 gap-3.5">
                        <div className="text-xs font-medium uppercase text-secondary">Старый пароль</div>
                        {user && (
                            <Input label="" onChange={() => setNewLogin} value="" placeholder="Старый пароль" type='password'/>
                        )}
                        <div className="text-xs font-medium uppercase text-secondary">Новый пароль</div>
                         {user && (
                            <Input label="" onChange={() => setNewLogin} value="" placeholder="Новый пароль" type='password'/>
                        )}
                        <Button label="Сохранить" onClick={() => alert('save')} />
                    </div>
                </div>
            );
        }
    };

    useEffect(() => {
        const getItems = async () => {
            try {
                const data = await fetchItems(Number(userId));
                setUserItems(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
        getItems();
    }, [userId]);

    return (
        <>
            <div className="text-primary text-xl font-bold mb-4">Аккаунт</div>
            <div className="flex flex-col gap-4 text-dark-text">
                <div className="flex justify-between">
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={['Аккаунт', 'Настройки', 'Друзья']} />
                    <Button label="Выйти" onClick={() => alert('exit')} />
                    {/* Изменить стиль кнопки */}
                </div>
                {renderContent()}
            </div>
        </>
    );
};

export default UserPage;
