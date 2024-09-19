import React from 'react'

export default function Chat({chats}) {
  return (
    <div className="chat">
        {chats && 
            chats.map((chat) => (
                <p>{chat}</p>
            ))
        }
    </div>
  )
}
