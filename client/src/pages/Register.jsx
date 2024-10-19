import React from 'react'
import { useState } from 'react';
import Button from '../components/common/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Register() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const {register, isRegister} = useAuthStore();
    const handleSubmit = async () => {
        await register(login, password);
    };

  return (
    <>
        <div className="menu">
          <div className="left_menu">
              <Link href={'/'}>
                  <div className="back box light-bg">
                      <svg className="back-desc" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-994d45d4=""><path d="M12.625 4.87458H4.08621L6.10558 2.8552C6.31593 2.64485 6.43411 2.35956 6.43411 2.06208C6.43411 1.7646 6.31593 1.4793 6.10558 1.26895C5.89523 1.0586 5.60994 0.94043 5.31246 0.94043C5.01498 0.94043 4.72968 1.0586 4.51933 1.26895L0.581835 5.20645C0.47673 5.31007 0.393269 5.43355 0.336302 5.56971C0.279336 5.70586 0.25 5.85198 0.25 5.99958C0.25 6.14717 0.279336 6.29329 0.336302 6.42945C0.393269 6.56561 0.47673 6.68908 0.581835 6.7927L4.51933 10.7302C4.62349 10.8344 4.74714 10.917 4.88322 10.9733C5.01931 11.0297 5.16516 11.0587 5.31246 11.0587C5.45976 11.0587 5.60561 11.0297 5.74169 10.9733C5.87778 10.917 6.00143 10.8344 6.10558 10.7302C6.20974 10.626 6.29236 10.5024 6.34873 10.3663C6.4051 10.2302 6.43411 10.0844 6.43411 9.93708C6.43411 9.78978 6.4051 9.64393 6.34873 9.50784C6.29236 9.37176 6.20974 9.24811 6.10558 9.14395L4.08621 7.12458H12.625C12.9233 7.12458 13.2095 7.00605 13.4205 6.79507C13.6314 6.58409 13.75 6.29795 13.75 5.99958C13.75 5.70121 13.6314 5.41506 13.4205 5.20408C13.2095 4.9931 12.9233 4.87458 12.625 4.87458Z" fill="#898D93" data-v-994d45d4=""></path></svg>
                  </div>
              </Link>
              <h4>На главную</h4>
          </div>
      </div>
      <div className='form mt-1'>
        <div className="input">
            <input type="text" value={login} placeholder="Введите логин" onChange={(e) => setLogin(e.target.value)}/>
        </div>
        <div className="input">
            <input type="password" value={password} placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value)} />
        </div>
        {/* <Input text={"Введите логин"}/>
        <Input text={"Введите пароль"} t={"password"}/> */}
        <Button name="Создать аккаунт" clickHandle={handleSubmit}/>
        </div>
    </>
   
  )
}
