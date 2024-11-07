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
import MarketplacePage from './pages/MarketplacePage';

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

      <div className="flex flex-col min-h-screen bg-background text-body p-4">
 
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/users/:userId' element={<UserPage />} />
          <Route path='/marketplace' element={<MarketplacePage />} />
        </Routes>

        <Modal isOpen={isOpenLoginModal} onClose={closeLoginModal}>
          <Input label="Логин" value={loginInput} onChange={setLoginInput} placeholder="Логин" />
          <Input label="Пароль"  value={passwordInput} onChange={setPasswordInput} placeholder="Пароль" />
          <Button label="Авторизация" onClick={handleLogin} />
        </Modal>
      </div>
    </>
    
  );
}

export default App;
