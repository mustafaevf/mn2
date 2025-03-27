// import React, { useState, useEffect } from 'react';
// import { ILobby } from '../types/Lobby';
// import client from '../services/client';
// import io, { Socket } from 'socket.io-client';
// import Lobby from './common/Lobby';
// import { useAuthStore } from '../stores/authStore';

interface LobbyListProps {}

// const socket: Socket = io('http://localhost:8080/api/games/monopoly');

const LobbyList = ({}: LobbyListProps) => {
//     const { isAuth, user } = useAuthStore();
//     const [lobbies, setLobbies] = useState<ILobby[]>([]);
//     const [waitLobby, setWaitLobby] = useState<ILobby>();

//     const getUserConnectedLobby = async () => {
//         try {
//             const response = await client.get<ILobby>('waitlobby');
//             console.log(response.data);
//             setWaitLobby(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getLobbies = async () => {
//         try {
//             const response = await client.get<ILobby[]>('lobbies');
//             setLobbies(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const fetchLobbiesFromSocket = () => {
//         socket.emit('get_lobbies'); 
//         socket.on('lobbies', (lobbiesData: ILobby[]) => {
//             setLobbies(lobbiesData); 
//         });
//     };

//     useEffect(() => {
//         fetchLobbiesFromSocket();

//         return () => {
//             socket.off('lobbies');
//         };
//     }, []);

    return ( <></>
//         <div className="grow max-md:contents">
//             {isAuth && user && waitLobby && (
//                 <div className="flex flex-col gap">
//                     <Lobby lobby={waitLobby} type={2} />
//                 </div>
//             )}
            
//         </div>
    );
};

export default LobbyList;
