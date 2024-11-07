import React, { useState } from "react";
import useModal from "../hooks/useModal";
import LobbyList from "../components/LobbyList";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import { useAuthStore } from "../stores/authStore";
import Button from "../components/ui/Button";
import client from "../services/client";
import { ILobby } from "../types/Lobby";
import Checkbox from "../components/ui/Checkbox";

const MainPage = () => {
  const { isOpen: isOpenLobbyCreateModal, openModal: openLobbyCreateModal, closeModal: closeLobbyCreateModal} = useModal();
  const [maxPersonInput, setMaxPersonInput] = useState<string>("");
  const [autoStart, setAutoStart] = useState<boolean>(true);

  const { isAuth } = useAuthStore();

  const handleCreateLobby = async () => {
    try {
      const response = await client.post<ILobby>('lobbies', {max_person: Number(maxPersonInput)});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      
      
        {isAuth && <Button label="Создать лобби" onClick={openLobbyCreateModal} />}
        <LobbyList />
        
        <Modal isOpen={isOpenLobbyCreateModal} onClose={closeLobbyCreateModal}>
          <Input label="Кол-во" value={maxPersonInput} onChange={setMaxPersonInput} placeholder="Кол-во" />
          <Checkbox label="Автостарт" value={autoStart} onChange={setAutoStart} />
          <Button label="Создать лобби" onClick={handleCreateLobby} />
        </Modal>

       

      
      
    </>
  );
};

export default MainPage;