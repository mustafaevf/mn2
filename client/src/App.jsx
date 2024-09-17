import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/Main'
import RegisterPage from './pages/Register';
import AuthModal from './components/Modals/AuthModal';
import { useState } from 'react';
import Board from './pages/Board';

function App() {
  
  const [isOpenModalAuth, setOpenModalAuth] = useState(false);
 

  const openAuthModal = () => {
    setOpenModalAuth(!isOpenModalAuth);
  }

  return (
    <>
      {/* <Routes>
      
      </Routes> */}
    <Header openAuthModal={openAuthModal}></Header>
    <AuthModal openAuthModal={openAuthModal} state={isOpenModalAuth}/>

    

    <div className="wrapper">
    <Routes>
        <Route path='/' element={<MainPage/>}/>  
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/board/:uuid' element={<Board />}/>
    </Routes>  
    </div>
    </>
  );
}

export default App;
