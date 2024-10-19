import React from 'react'
import Button from '../common/Button'

export default function Popup({title, description, actions}) {
    console.log(actions);
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
            <div className="popup-bottom inline">
                {
                    (actions && actions.map((action, index) => (
                        <Button key={index} name={action.title} clickHandle={action.func} />
                    )))
                }
                {/* <Button name={"Действие"} clickHandle={action}/> */}
            </div>
            

        </div>
           
    // <div className="modal-wrapper">
        
    // </div>
  )
}
