import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../types/User";
import client from "../../services/client";
import { useAuthStore } from "../../stores/authStore";
import ItemsTab from "./tabs/ItemsTab";
import { IItem } from "../../types/Item";
import { fetchItems } from "../../services/userService";

type UserPageParams = {
    userId: string;
};

enum ActiveTab {
    ITEMS = "items",
    FRIENDS = "friends",
    GAMES = "games",
    SETTINGS = "settings",
};

const UserPage = () => {
    const { userId } = useParams<UserPageParams>();
    const [user, setUser] = useState<IUser>();
    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.ITEMS);
    const [userItems, setUserItems] = useState<IItem[]>([]);

    const fetchUser = async () => {
        try {
            const response = await client.get<IUser>(`users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.log(error);            
        }
    };

    const renderContent = () => {
        if(activeTab == ActiveTab.ITEMS) {
            console.log(userItems);
            if(userItems.length > 0) {
                return <ItemsTab items={userItems}/>
            }
        }
    }

    useEffect(() => {
        const getItems = async () => {
            try {
                const data = await fetchItems(Number(userId));
                console.log(data);
                setUserItems(data);
            } catch (error) {
                console.log(error);            
            }
        };
        fetchUser();
        getItems();
    }, [userId]);

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-center p-6 bg-gray-200">
                <img
                    className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
                    src={`http://localhost:8080/uploads/${user?.image}`}
                    alt="Profile Picture"
                />
            </div>
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{user?.login}</h2>
                <div className="flex mt-4 space-x-4">
                </div>
            </div>
            <div className="mt-4">
                <div className="flex space-x-4 border-b-2 pb-2">
                    <button
                        onClick={() => setActiveTab(ActiveTab.ITEMS)}
                        className={`px-4 py-2 ${
                            activeTab === ActiveTab.ITEMS ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"
                        }`}
                    >
                        Предметы
                    </button>
                    <button
                        onClick={() => setActiveTab(ActiveTab.FRIENDS)}
                        className={`px-4 py-2 ${
                            activeTab === ActiveTab.FRIENDS ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"
                        }`}
                    >
                        Друзья
                    </button>
                    <button
                        onClick={() => setActiveTab(ActiveTab.GAMES)}
                        className={`px-4 py-2 ${
                            activeTab === ActiveTab.GAMES ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"
                        }`}
                    >
                        Игры
                    </button>
                    {useAuthStore.getState().isAuth && useAuthStore.getState().user?.id === userId && (
                        <button
                            onClick={() => setActiveTab(ActiveTab.SETTINGS)}
                            className={`px-4 py-2 ${
                                activeTab === ActiveTab.SETTINGS ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"
                            }`}
                        >
                            Настройки
                        </button>
                    )}
                </div>
                <div className="mt-4">{renderContent()}</div>
            </div>
        </div>

    );
}

export default UserPage;