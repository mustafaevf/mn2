import React, { useState } from 'react'
import { getLobby } from '../redux/slices/lobby';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lobby from '../components/Lobby';
import Button from '../components/Button';
import axios from 'axios';
import CreateLobbyModal from '../components/Modals/CreateLobbyModal';
import { useAuthStore } from '../store/authStore';


export default function Main() {

  const [lobbies, setLobbies] = useState([]);

  const [waitLobby, setWaitLobby] = useState([]);
  const [isOpenModalCreateLobby, setOpenModalCreateLobby] = useState(false);
 
  const {check, isAuth} = useAuthStore();

  const openModalCreateLobby = () => {
    setOpenModalCreateLobby(!isOpenModalCreateLobby);
  }

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/lobbies');
        setLobbies(response.data);

        if(isAuth) {
          await check();
          const response = await axios.get('http://localhost:8080/api/waitLobby');
          console.log(response.data);
          setWaitLobby(response.data.lobby);
        }
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching lobbies:', error);
      }
    };
    fetchLobbies();
    const intervalId = setInterval(() => {
      console.log("dpsads");
      fetchLobbies();
    }, 2000); // Обновление каждые 5 секунд (можно изменить)

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  const renderLobbies = () => {
    if (lobbies.length === 0) return <p>No lobbies available</p>;

    return lobbies.map(({ lobby }) => (
      <Lobby key={lobby.id} id={lobby.id} max_person={lobby.max_person} ownerId={lobby.userId} createdAt={lobby.createdAt}/>
    ));

    // renderLobbies();
  };
  

  return (
    <>
      
      <CreateLobbyModal state={isOpenModalCreateLobby} openModal={openModalCreateLobby} />

      <div className="menu">
          <div className="left_menu">
              <Link href={'/'}>
                  <div className="back box light-bg">
                      <svg className="back-desc" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-994d45d4=""><path d="M12.625 4.87458H4.08621L6.10558 2.8552C6.31593 2.64485 6.43411 2.35956 6.43411 2.06208C6.43411 1.7646 6.31593 1.4793 6.10558 1.26895C5.89523 1.0586 5.60994 0.94043 5.31246 0.94043C5.01498 0.94043 4.72968 1.0586 4.51933 1.26895L0.581835 5.20645C0.47673 5.31007 0.393269 5.43355 0.336302 5.56971C0.279336 5.70586 0.25 5.85198 0.25 5.99958C0.25 6.14717 0.279336 6.29329 0.336302 6.42945C0.393269 6.56561 0.47673 6.68908 0.581835 6.7927L4.51933 10.7302C4.62349 10.8344 4.74714 10.917 4.88322 10.9733C5.01931 11.0297 5.16516 11.0587 5.31246 11.0587C5.45976 11.0587 5.60561 11.0297 5.74169 10.9733C5.87778 10.917 6.00143 10.8344 6.10558 10.7302C6.20974 10.626 6.29236 10.5024 6.34873 10.3663C6.4051 10.2302 6.43411 10.0844 6.43411 9.93708C6.43411 9.78978 6.4051 9.64393 6.34873 9.50784C6.29236 9.37176 6.20974 9.24811 6.10558 9.14395L4.08621 7.12458H12.625C12.9233 7.12458 13.2095 7.00605 13.4205 6.79507C13.6314 6.58409 13.75 6.29795 13.75 5.99958C13.75 5.70121 13.6314 5.41506 13.4205 5.20408C13.2095 4.9931 12.9233 4.87458 12.625 4.87458Z" fill="#898D93" data-v-994d45d4=""></path></svg>
                  </div>
              </Link>
              <h4>Режимы</h4>
          </div>
          <div className="right_menu">
              <Button name={"Создать игру"} clickHandle={openModalCreateLobby}/>
          </div>
      </div>
      
      {isAuth && (
        <div className="waitLobby mt-1">
          {/* <div className="blur"></div> */}
          <div className="box light-bg">
      {/* <div className="blur"></div> */}
            <div className="game_header mb-1">
              <div className="game_title">
                Игра №{waitLobby.id}
              </div>
            </div>
            <div className="game_body mt-2 mb-1">
              <Link to={`board/` + waitLobby.uuid}>
                <div className="a-btn">Перейти</div>
              </Link> 
            </div>

          </div>
          {/* <Lobby key={waitLobby.id} id={waitLobby.id} max_person={waitLobby.max_person} ownerId={waitLobby.userId} createdAt={waitLobby.createdAt}/> */}
        </div>
      )}
      <div className="list mt-1 box bg">
        {renderLobbies()}
      </div>
    </>
  )
}
