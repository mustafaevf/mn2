import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuthStore } from '../store/authStore'
import { useParams } from 'react-router';
import Button from '../components/Button';

export default function User() {
    const { id } = useParams(); 
    const {user, check, isAuth} = useAuthStore();
    const [queryUser, setQueryUser] = useState(null);
    const [activeTab, setActiveTab] = useState('inventory');


    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    const getUser = async () => {
        await check();
        const response = await axios.get(`http://localhost:8080/api/user/${id}`);
        console.log(response.data);
        setQueryUser(response.data);
    }

    useEffect(() => {
        getUser();  
    }, [id]);  

    const handleTabClick = (activeTab) => {
        setActiveTab(activeTab);
    }

    const handleChangePasswordClick = async () => {
        await check();
        const response = await axios.post(`http://localhost:8080/api/user/change/password`, {old_password: oldPassword, new_password: newPassword});
        console.log(response);
    }

    return (
        <>
            {queryUser && (
                <div className="user-wrapper">
                    <div className="user-wrapper_avatar">
                        <img
                            src={`http://localhost:8080/uploads/${queryUser.image}`}
                            alt="avatar"
                        />
                    </div>
                    <div className="user-wrapper-login">
                        {queryUser.login}
                    </div>
                    <div className="user-wrapper_stats">
                        <div className="user-stat">
                            <div className="user-stat-title">
                                Сыграно игр
                            </div>
                            <div className="user-stat-count">
                                0
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="user-stat">
                            <div className="user-stat-title">
                                Побед
                            </div>
                            <div className="user-stat-count">
                                0
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="user-stat">
                            <div className="user-stat-title">
                                Друзей
                            </div>
                            <div className="user-stat-count">
                                0
                            </div>
                        </div>
                    </div>
                    <div className="user-wrapper-ch mt-1">
                        <div className={`user-ch ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => handleTabClick('inventory')}>
                            Инвентарь
                        </div>
                        <div className={`user-ch ${activeTab === 'friends' ? 'active' : ''}`} onClick={() => handleTabClick('friends')}>
                            Друзья
                        </div>
                        { queryUser.id === user.id ?
                            <div className={`user-ch ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => handleTabClick('settings')}>
                            Настройки
                        </div> : ''}
                    </div>
                    <div className="user-wrapper-content">
                        {activeTab === 'inventory' && 
                            ( 
                            <>
                                <div className="user-wrapper-inventory mt-1">
                                    <div className="item-box light-bg">
                                        <div className="item-body">
                                            <img src="https://m1.dogecdn.wtf/fields/brands/6_food/sbarro.svg" alt="" />
                                        </div>
                                        <div className="item-bottom">
                                            Хуйня 1
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeTab === 'settings' && 
                        (
                            <>
                                <div className='form mt-1'>
                                    <h3>Смена пароля</h3>
                                    <div className="input">
                                        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Введите старый пароль" />
                                    </div>
                                    <div className="input">
                                        <input type="password" value={newPassword}  onChange={(e) => setNewPassword(e.target.value)} placeholder="Введите новый пароль" />
                                    </div>
                                    {/* <Input text={"Введите логин"}/>
                                    <Input text={"Введите пароль"} t={"password"}/> */}
                                    <Button name="Сменить пароль" clickHandle={handleChangePasswordClick}/>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
