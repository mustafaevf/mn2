import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { useAuthStore } from '../../../stores/authStore';

type Message = {
    type: number;
    data: string;
};

interface GameChatProps {
    messages: string[];
    s: Socket;
    // chats?: string[];
}

const GameChat = ({ messages, s }: GameChatProps) => {
    const { user } = useAuthStore();
    const [message, setMessage] = useState<string>();

    const sendMessageHandle = () => {
        s.emit('sendMessage', { user: user, message: message });
    };

    return (
        <div className="w-4/6 p-4 flex flex-col justify-center">
            <h2 className="text-lg font-semibold">Чат</h2>
            <div className="flex flex-col overflow-y-auto justify-between h-[600px] max-h-[600px] overflow-y-scroll scrollbar-thin scrollbar-thumb">
                <div className="message">
                    {messages.map((msg, index) => {
                        const match = msg.match(/^#\{([a-zA-Z0-9]+)\}([^#]+)#\s(.+)$/);
                        if (match) {
                            const [, color, login, text] = match;
                            return (
                                <p key={index} className="text-gray-400">
                                    <span className={`color-player-${color}`}>{login}</span> {text}
                                </p>
                            );
                        }
                        return (
                            <p key={index} className="text-gray-400">
                                {msg}
                            </p>
                        );
                    })}
                </div>

                <div className="bottom-0 flex">
                    <input
                        type="text"
                        placeholder="Введите сообщение"
                        className=" bg-transparent text-[#696969] border-b border-[#101010] px-4 py-2 focus:outline-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={() => sendMessageHandle()}>Льп</button>
                </div>
            </div>
        </div>
    );
};

export default GameChat;
