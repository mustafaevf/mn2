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
import DoubleGamePage from './pages/DoubleGamePage/DoubleGamePage';
import MonopolyGamePage from './pages/MonopolyGamePage/MonopolyGamePage';
import CrashGamePage from './pages/CrashGamePage/CrashGamePage';
import { NotificationProvider } from './contexts/NotificationContext';
import { useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MinerGamePage from './pages/MinerGamePage/MinerGamePage';

function App() {
    const { isOpen: isOpenLoginModal, openModal: openLoginModal, closeModal: closeLoginModal } = useModal();
    const [loginInput, setLoginInput] = useState<string>('');
    const location = useLocation();
    const isBoardRoute = location.pathname.startsWith('/boards/');
    const [passwordInput, setPasswordInput] = useState<string>('');

    const handleLogin = async () => {
        await useAuthStore.getState().login(loginInput, passwordInput);
        closeLoginModal();
    };

    return (
        <NotificationProvider>
            <Header onLogin={openLoginModal} />

            <Routes>
                <Route path="/boards/:uuid" element={<GameBoardPage />} />
            </Routes>
            {!isBoardRoute && <Sidebar />}
            {!isBoardRoute && (
                <div className="flex h-screen">
                    <div className="flex flex-col flex-grow p-8 mt-8 ml-8 mr-8">
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/games/monopoly" element={<MonopolyGamePage />} />
                            <Route path="/games/double" element={<DoubleGamePage />} />
                            <Route path="/games/crash" element={<CrashGamePage />} />
                            <Route path="/games/miner" element={<MinerGamePage />} />
                            <Route path="/monopoly" element={<MainPage />} />
                            <Route path="/users/:userId" element={<UserPage />} />
                            <Route path="/marketplace" element={<MarketplacePage />} />
                        </Routes>
                    </div>
                </div>
            )}

            <Modal title="Авторизация" isOpen={isOpenLoginModal} onClose={closeLoginModal}>
                <div className="flex flex-col gap-4">
                    <Input label="Логин" value={loginInput} onChange={setLoginInput} placeholder="Логин" />
                    <Input
                        label="Пароль"
                        value={passwordInput}
                        onChange={setPasswordInput}
                        placeholder="Пароль"
                        type="password"
                    />
                    <Button label="Авторизация" onClick={handleLogin} />
                </div>
            </Modal>
        </NotificationProvider>
    );
}

export default App;
