import React, { useState } from 'react';
import Button from './common/Button';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

export default function Header({openAuthModal}) {
  const {user, isAuth, logout} = useAuthStore();  
  const [userPopup, setUserPopup] = useState(false);
  return (
    <header>
      <div className="header-container">
        <div className="header-container-left">
          <div className="header-container-left_logo">
            <Link to='/'>
              <h3>logo</h3>
            </Link>
          </div>
        </div>
        <div className="header-container-right">
          {isAuth ? (
            <div className="user-header">
              <div className="user-item">Маркет</div>
              <div className="user-item">Друзья</div>
              <div className="user-avatar" onClick={() => setUserPopup(!userPopup)}>
                <img
                  src={`http://localhost:8080/uploads/${user.image}`}
                  alt="avatar"
                />
              </div>
              {
                userPopup && 
                  (
                    <div className="user-header-popup box">
                        <div className="user-header-popup_item">
                          {user.balance} руб
                        </div>
                      <Link to={`/users/${user.id}`}>
                        <div className="user-header-popup_item">
                          Профиль
                        </div>
                      </Link>
                      <div className="user-header-popup_item" onClick={() => logout()}>
                        Выйти
                      </div>
                    </div>  
                  )
              }
            </div>
          ) : <Button name={"Войти"} clickHandle={openAuthModal} />}
          
        </div>
      </div>
    </header>
  )
}
