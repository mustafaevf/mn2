import React from 'react';
import Button from './Button';
import { useAuthStore } from '../store/authStore';

export default function Header({openAuthModal}) {
  const {user, isAuth} = useAuthStore();
  console.log("Current User:", user);  // Check if user is being set correctly
  console.log("Is Authenticated:", isAuth); 
  return (
    <header>
      <div className="header-container">
        <div className="header-container-left">
          <div className="header-container-left_logo">
            <h3>logo</h3>
          </div>
        </div>
        <div className="header-container-right">
          {isAuth ? user.login : <Button name={"Войти"} clickHandle={openAuthModal} />}
          
        </div>
      </div>
    </header>
  )
}
