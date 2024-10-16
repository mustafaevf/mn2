import React from 'react'

export default function Item({title, image, type, settings}) {
  return (
    <div className="item-box light-bg">
        <div className="item-body">
            <img src={image} alt={title} />
        </div>
        <div className="item-bottom">
            {title}
        </div>
    </div>
  )
}
