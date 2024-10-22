import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import Button from './common/Button';

export default function Lobby({ id, max_person, createdAt, ownerId }) {
    const { check, user, isAuth } = useAuthStore();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/lobbies/${id}/info/users`
            );
            setUsers(response.data.users);
        } catch (error) {
            console.error('Ошибка при загрузке списка пользователей:', error);
        }
    };

    const handleClickStartLobby = async () => {
        try {
            await check();
            const response = await axios.get(
                `http://localhost:8080/api/lobbies/${id}/start`
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickJoinLobby = async () => {
        try {
            await check();
            const response = await axios.get(
                `http://localhost:8080/api/lobbies/${id}/connect`,
                { headers: { 'Cache-Control': 'no-cache' } }
            );
            console.log('Ответ сервера на подключение:', response.data);
            await fetchUsers();
        } catch (error) {
            console.error('Ошибка при подключении к лобби:', error);
        }
    };

    const handleClickLeaveLobby = async () => {
        try {
            await check();
            await axios.get(
                `http://localhost:8080/api/lobbies/${id}/disconnect`,
                { headers: { 'Cache-Control': 'no-cache' } }
            );
            await fetchUsers();
        } catch (error) {
            console.error('Ошибка при выходе из лобби:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [id]);

    const getUsers = () => {
        const result_users = [];

        if (users.length === 0) {
            for (let index = 0; index < max_person; index++) {
                result_users.push(
                    <div
                        key={index}
                        className="game_user"
                        onClick={handleClickJoinLobby}
                    >
                        <svg
                            data-v-679cc1bc=""
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 18 18"
                            fill="none"
                            className="fill-current wh-21 sm:block hidden"
                        >
                            <path
                                d="M10.0158 3.41529C10.0158 2.85365 9.56203 2.3999 9.00039 2.3999C8.43876 2.3999 7.98501 2.85365 7.98501 3.41529V7.98452H3.41578C2.85414 7.98452 2.40039 8.43827 2.40039 8.9999C2.40039 9.56154 2.85414 10.0153 3.41578 10.0153H7.98501V14.5845C7.98501 15.1462 8.43876 15.5999 9.00039 15.5999C9.56203 15.5999 10.0158 15.1462 10.0158 14.5845V10.0153H14.585C15.1466 10.0153 15.6004 9.56154 15.6004 8.9999C15.6004 8.43827 15.1466 7.98452 14.585 7.98452H10.0158V3.41529Z"
                                fill="#898d93"
                            ></path>
                        </svg>
                        <div className="game_user-login">подключиться</div>
                    </div>
                );
            }
        } else {
            users.map((user) =>
                result_users.push(
                    <div
                        key={user.id}
                        className="game_user"
                        onClick={handleClickLeaveLobby}
                    >
                        <svg
                            data-v-679cc1bc=""
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 18 18"
                            fill="none"
                            className="fill-current wh-21 sm:block hidden"
                        >
                            <path
                                d="M10.0158 3.41529C10.0158 2.85365 9.56203 2.3999 9.00039 2.3999C8.43876 2.3999 7.98501 2.85365 7.98501 3.41529V7.98452H3.41578C2.85414 7.98452 2.40039 8.43827 2.40039 8.9999C2.40039 9.56154 2.85414 10.0153 3.41578 10.0153H7.98501V14.5845C7.98501 15.1462 8.43876 15.5999 9.00039 15.5999C9.56203 15.5999 10.0158 15.1462 10.0158 14.5845V10.0153H14.585C15.1466 10.0153 15.6004 9.56154 15.6004 8.9999C15.6004 8.43827 15.1466 7.98452 14.585 7.98452H10.0158V3.41529Z"
                                fill="#898d93"
                            ></path>
                        </svg>
                        <div className="game_user-login">{user.login}</div>
                    </div>
                )
            );
            if (users.length != max_person) {
                for (let index = users.length; index < max_person; index++) {
                    result_users.push(
                        <div
                            key={index}
                            className="game_user"
                            onClick={handleClickJoinLobby}
                        >
                            <svg
                                data-v-679cc1bc=""
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 18 18"
                                fill="none"
                                className="fill-current wh-21 sm:block hidden"
                            >
                                <path
                                    d="M10.0158 3.41529C10.0158 2.85365 9.56203 2.3999 9.00039 2.3999C8.43876 2.3999 7.98501 2.85365 7.98501 3.41529V7.98452H3.41578C2.85414 7.98452 2.40039 8.43827 2.40039 8.9999C2.40039 9.56154 2.85414 10.0153 3.41578 10.0153H7.98501V14.5845C7.98501 15.1462 8.43876 15.5999 9.00039 15.5999C9.56203 15.5999 10.0158 15.1462 10.0158 14.5845V10.0153H14.585C15.1466 10.0153 15.6004 9.56154 15.6004 8.9999C15.6004 8.43827 15.1466 7.98452 14.585 7.98452H10.0158V3.41529Z"
                                    fill="#898d93"
                                ></path>
                            </svg>
                            <div className="game_user-login">подключиться</div>
                        </div>
                    );
                }
            }
        }
        return result_users;
    };

    return (
        <div className="box light-bg">
            <div className="game_header mb-1">
                <div className="game_title">
                    Игра №{id}
                    <div className="game_title-admin">
                        {isAuth && ownerId == user.id && users.length === max_person && (
                            <Button
                                name="Начать игру"
                                clickHandle={handleClickStartLobby}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="game_body mt-2 mb-1">{getUsers()}</div>
            {isAuth && ownerId == user.id && (
                <>
                    <div className="game_header mb-1"></div>
                </>
            )}
        </div>
    );
}
