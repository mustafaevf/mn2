import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import useModal from './hooks/useModal';
import Modal from './components/ui/Modal';
import Input from './components/ui/Input';
import Button from './components/ui/Button';
import { useState } from 'react';
import { useAuthStore } from './stores/authStore';
import UserPage from './pages/UserPage/UserPage';
import MarketplacePage from './pages/MarketplacePage/MarketplacePage';
import GameBoardPage from './pages/GameBoardPage/GameBoardPage';

function App() {
  const { isOpen: isOpenLoginModal, openModal: openLoginModal, closeModal: closeLoginModal} = useModal();
  const [loginInput, setLoginInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  
  const handleLogin = async () => {
    await useAuthStore.getState().login(loginInput, passwordInput);
    closeLoginModal();
  }

  return (
    <>
      <Header onLogin={openLoginModal} />

      <div className="mx-auto w-full min-h-[calc(100vh-10rem)] lg:min-h-[calc(100vh-7rem)] flex flex-col lg:w-[1200px] pb-[300px]">
 
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/users/:userId' element={<UserPage />} />
          <Route path='/marketplace' element={<MarketplacePage />} />
          <Route path='/boards/:uuid' element={<GameBoardPage />} />
        </Routes>

        <Modal title="Авторизация" isOpen={isOpenLoginModal} onClose={closeLoginModal}>
          <Input label="Логин" value={loginInput} onChange={setLoginInput} placeholder="Логин" />
          <Input label="Пароль"  value={passwordInput} onChange={setPasswordInput} placeholder="Пароль" type='password'/>
          <Button label="Авторизация" onClick={handleLogin} />
        </Modal>
      </div>
    </>
    
  );
}

export default App;
