import React, { useState } from 'react';
import useModal from '../hooks/useModal';
import LobbyList from '../components/LobbyList';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/ui/Button';
import client from '../services/client';
import { ILobby } from '../types/Lobby';
import { createLobby } from '../services/lobbyService';
import Checkbox from '../components/ui/Checkbox';

const MainPage = () => {
    const {
        isOpen: isOpenLobbyCreateModal,
        openModal: openLobbyCreateModal,
        closeModal: closeLobbyCreateModal,
    } = useModal();
    const [maxPerson, setMaxPerson] = useState<number>(1);
    const [autoStart, setAutoStart] = useState<boolean>(true);

    const { isAuth } = useAuthStore();

    const handleCreateLobby = async () => {
        try {
            const response = await createLobby(Number(maxPerson));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row gap-2.5 md:gap-4">
                <LobbyList />
                <div className="max-md:order-first md:w-70 lg:w-79 shrink-0  md:sticky top-5 self-start flex flex-col gap-4">
                    <div className="rounded-3xl relative p-4  lg:p-5  shrink-0 flex flex-col bg-[#1e253d] gap-3.5">
                        <div className="mb-1 pl-1.5 text-nano font-medium uppercase text-[#abb2cf]">
                            Кол-во игроков
                        </div>
                        <div className="group flex gap-1 border border-[#262F4D] p-1 rounded">
                            <button
                                type="button"
                                aria-pressed="true"
                                className={`btn relative flex aspect-square h-11 items-center justify-center overflow-hidden rounded bg-[#2e3a61] bg-gradient-var  font-bold text-sm text-[#c2ddff] hover:brightness-110  transition duration-100  [.group:has([aria-pressed=true])_&amp;:not([aria-pressed=true])]:opacity-25 grow gap-1 [--angle:45deg] [--from:#3d76d1]  [--to:#2957a0] ${maxPerson == 2? `active` : ''}`}
                                onClick={() => setMaxPerson(2)}
                            >
                                <div
                                    className="icon w-4 bg-[#bfcbe7]"
                                    style={{ maskImage: 'url("/players.svg")' }}
                                ></div>
                                2
                            </button>
                            <button
                                type="button"
                                aria-pressed="false"
                                className={`btn relative flex aspect-square h-11 items-center justify-center overflow-hidden rounded bg-[#2e3a61] bg-gradient-var  font-bold text-sm text-[#c2ddff] hover:brightness-110  transition duration-100  [.group:has([aria-pressed=true])_&amp;:not([aria-pressed=true])]:opacity-25 grow gap-1 [--angle:45deg] [--from:#3d76d1]  [--to:#2957a0] ${maxPerson == 3? `active` : ''}`}
                                onClick={() => setMaxPerson(3)}
                            >
                                <div
                                    className="icon w-4 bg-[#bfcbe7]"
                                    style={{ maskImage: 'url("/players.svg")' }}
                                ></div>
                                3
                            </button>
                            <button
                                type="button"
                                aria-pressed="false"
                                className={`btn relative flex aspect-square h-11 items-center justify-center overflow-hidden rounded bg-[#2e3a61] bg-gradient-var  font-bold text-sm text-[#c2ddff] hover:brightness-110  transition duration-100  [.group:has([aria-pressed=true])_&amp;:not([aria-pressed=true])]:opacity-25 grow gap-1 [--angle:45deg] [--from:#3d76d1]  [--to:#2957a0] ${maxPerson == 4? `active` : ''}`}
                                onClick={() => setMaxPerson(4)}
                            >
                                <div
                                    className="icon w-4 bg-[#bfcbe7]"
                                    style={{ maskImage: 'url("/players.svg")' }}
                                ></div>
                                4
                            </button>
                            <button
                                type="button"
                                aria-pressed="false"
                                className={`btn relative flex aspect-square h-11 items-center justify-center overflow-hidden rounded bg-[#2e3a61] bg-gradient-var  font-bold text-sm text-[#c2ddff] hover:brightness-110  transition duration-100  [.group:has([aria-pressed=true])_&amp;:not([aria-pressed=true])]:opacity-25 grow gap-1 [--angle:45deg] [--from:#3d76d1]  [--to:#2957a0] ${maxPerson == 22? `active` : ''}`}
                                onClick={() => setMaxPerson(22)}
                            >
                                <div
                                    className="icon w-4 bg-[#bfcbe7]"
                                    style={{ maskImage: 'url("/players.svg")' }}
                                ></div>
                                2x2
                            </button>
                        </div>
                        {isAuth && (
                            <Button
                                label="Создать лобби"
                                onClick={handleCreateLobby}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* <Modal
                isOpen={isOpenLobbyCreateModal}
                onClose={closeLobbyCreateModal}
            >
                <Input
                    label="Кол-во"
                    value={maxPerson}
                    onChange={setMaxPersonInput}
                    placeholder="Кол-во"
                />
                <Checkbox
                    label="Автостарт"
                    value={autoStart}
                    onChange={setAutoStart}
                />
                <Button label="Создать лобби" onClick={handleCreateLobby} />
            </Modal> */}
        </>
    );
};

export default MainPage;
