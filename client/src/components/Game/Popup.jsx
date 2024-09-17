import React from 'react'
import Button from '../Button'

export default function Popup({title, description, action}) {
  return (
        <div className="popup-content">
            <div className="popup-header">
                <div className="popup-header_title">
                    {title}
                </div>
            </div>
            <div className="popup-body">
                {description}
            </div>
            <Button name={"Действие"} clickHandle={action}/>

        </div>
           
    // <div className="modal-wrapper">
        
    // </div>
  )
}
