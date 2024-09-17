import React from 'react'

export default function Button({name, clickHandle}) {
  return (
    <button onClick={clickHandle}>{name}</button>
  )
}
