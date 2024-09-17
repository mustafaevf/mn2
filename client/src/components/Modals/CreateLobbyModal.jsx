import React, { useState } from 'react'
import Button from '../Button';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';

export default function CreateLobbyModal({openModal, state}) {

    const [maxPerson, setMaxPerson] = useState(3);
    const {check} = useAuthStore();

    const handleCreateLobby = async () => {
        await check();
        const response = await axios.post('http://localhost:8080/api/lobby', {max_person: maxPerson, platformId: 1});
        
        openModal();
    };
    if(state == false) return null;
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-header_title">
                        Создать лобби
                    </div>
                    <span onClick={openModal} className="close">&times;</span>
                </div>
                
                <div className='form mt-1'>
                    <div className="input">
                        <input type="text" value={maxPerson} placeholder="Введите кол-во игроков" onChange={(e) => setMaxPerson(e.target.value)}/>
                    </div>
                    
                   <Button name="Создать" clickHandle={handleCreateLobby}/>
                   
                </div>
            </div>
        </div>
        
    )
}
