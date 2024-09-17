import React, { useState } from 'react'
import { useAuthStore } from '../../store/authStore';

export default function DealPopup({to, from, close, offerDeal}) {
    const [fromValue, setFromValue] = useState(null);
    const [toValue, setToValue] = useState(null);
  return (
    <div className="deal-popup">
        <div className="deal-popup-close">
            <p onClick={() => close()}>Закрыть</p>
        </div>
        <div className="deal-popup-content">
            <div className="deal-popup-left">
                {to.login}
                <div className="input">
                    <input type="number" onChange={(e) => setToValue(e.target.value)} value={toValue}/>
                </div>
            </div>
            <div className="deal-popup-right">
                {from.login}
                <div className="input">
                    <input type="number" onChange={(e) => setFromValue(e.target.value)} value={fromValue}/>
                </div>
            </div>
        </div>
        <div className="deal-popup-bottom">
            <button 
            onClick={() => offerDeal({
                to: { user: to, value: toValue }, 
                from: { user: from, value: fromValue }
            })}
            >
            Отправить
        </button>
        </div>
        
    </div>
  )
}
