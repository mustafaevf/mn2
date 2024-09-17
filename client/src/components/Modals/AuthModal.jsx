import React, { useState } from 'react'
import Button from '../Button'
import Input from '../Input';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
// import {} from 'mobx-react';

export default function AuthModal({openAuthModal, state}) {
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuthStore();

    const handleSubmit = async (e) => {
        await login(loginInput, password);
        openAuthModal();
    };

    if(state == false) return null;
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-header_title">
                        Авторизация
                    </div>
                    <span onClick={openAuthModal} className="close">&times;</span>
                </div>
                
                <div className='form mt-1'>
                    <div className="input">
                        <input type="text" value={loginInput} placeholder="Введите логин" onChange={(e) => setLoginInput(e.target.value)}/>
                    </div>
                    <div className="input">
                        <input type="password" value={password} placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                   <Button name="Войти" clickHandle={handleSubmit}/>
                   <Link to="/register">
                    <div className="a-btn" onClick={openAuthModal}>
                        Регистрация
                    </div>
                   </Link>
                </div>
            </div>
        </div>
        
    )
}
