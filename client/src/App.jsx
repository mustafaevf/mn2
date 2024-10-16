import './App.css';
import Header from './components/Header';
import { Routes, Route, useLocation } from 'react-router-dom'
import MainPage from './pages/Main'
import RegisterPage from './pages/Register';
import UserPage from './pages/User';
import AuthModal from './components/Modals/AuthModal';
import { useState } from 'react';
import Board from './pages/Board';
import Market from './pages/Market';

function App() {
  
  const [isOpenModalAuth, setOpenModalAuth] = useState(false);
  const location = useLocation();

  const openAuthModal = () => {
    setOpenModalAuth(!isOpenModalAuth);
  }

  const path = !location.pathname.startsWith('/board');
  
  return (
    <>
      {/* <Routes>
      
      </Routes> */}
    {path && <Header openAuthModal={openAuthModal} />}
    <AuthModal openAuthModal={openAuthModal} state={isOpenModalAuth}/>

    

    {path ? (
        <div className="wrapper">
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/users/:id' element={<UserPage />} />
            <Route path='/board/:uuid' element={<Board />} />
            <Route path='/market' element={<Market />} />
            {/* <Route path='/admin/users' element={<} />
            <Route path='/admin/items' element={<} /> */}
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path='/board/:uuid' element={<Board />} />
        </Routes>
      )}
    </>
  );
}

export default App;
