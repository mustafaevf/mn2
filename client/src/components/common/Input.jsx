import React from 'react'

export default function Input({text, t}) {
  return (
    <div className="input">
        <input type={t ? t : "text"} placeholder={text} />
    </div>
  )
}
