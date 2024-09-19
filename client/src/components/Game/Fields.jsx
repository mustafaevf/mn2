import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Button from '../Button';

export default function Fields({fields, users, pawnProperty, buybackProperty, upgradeProperty}) {
    console.log(fields);
    const [popupFieldId, setPopupFieldId] = useState(null); // State to track which field's popup is open
    const {user, isAuth} = useAuthStore();
    const getInfoProperty = (field) => {
        if(field.pos == popupFieldId) {
            setPopupFieldId(null);
        } else {
            setPopupFieldId(field.pos); 
        }
    };
    
    const getFieldOwner = (fieldPos) => {
        for (const user of users) {
            for (const pr of user.properties) {
                if (pr.pos === fieldPos) {
                    if(pr.status == 0) {
                        return [user.color+'-opacity isPawned', user.id, pr.status, pr.tax]
                    } 
                    return [user.color, user.id, pr.status, pr.tax];
                }
            }
        }
        return [null, null, null, null];
    };


    

    const fieldElements = [];
    for (let i = 0; i < 11; i++) {
        const ownerColor = getFieldOwner(fields[i].pos)[0];
        const ownerId = getFieldOwner(fields[i].pos)[1];
        const statusField = getFieldOwner(fields[i].pos)[2];
        const propertyTax = getFieldOwner(fields[i].pos)[3];
        fieldElements.push(
            <div
            key={fields[i].pos}
            onClick={fields[i].action === 'property' ? () => getInfoProperty(fields[i]) : null}
            className={`cell ${fields[i].action === 'start' || fields[i].action === 'jail' ? 'corner' : ''} ${ownerColor != null ? ownerColor : 'white'}`}
            style={{
                left: fields[i].action === 'start' ? '0px' : `${100 + 55 * (i - 1)}px`,
                top: '0px',
                width: fields[i].action === 'start' || fields[i].action === 'jail' ? '100px' : '55px',
                height: '100px',
            }}>
            {fields[i].title}   
            {fields[i].action === 'property' ? <div className={`field-price top group-${fields[i].group}`}>{ownerColor == null ? fields[i].price : propertyTax}k</div> : null}
            {fields[i].action === 'property' && fields[i].currentLevel && fields[i].currentLevel != 0 ? <div className="field-info-stars">
                        <img src="/star.svg" alt="" />
                    </div>: null}   
                
                
                <div className="field-info top" style={{ display: popupFieldId === fields[i].pos ? 'block' : 'none' , left:  `${1 + 55 * (i - 1)}` }}>
                    
                    <div className={`field-info-header group-${fields[i].group}`}>
                        {fields[i].title}
                    </div>
                    <div className="field-info-body">
                    <p>Базовая рента {fields[i].tax}</p>
                    <p>Покупка филиала {fields[i].upgrade}</p>
                    <p>Заложить {fields[i].pawn}</p>
                    <p><img src="/star.svg" alt="" /> {fields[i].level && fields[i].level[1]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[2]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[3]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> {fields[i].level && fields[i].level[4]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[5]}</p>
                    {ownerId === user.id && (statusField == 1 ? <div className='inline'><Button name={'Заложить'} clickHandle={() => pawnProperty(fields[i])}/> <Button name={'Повысить'} clickHandle={() => upgradeProperty(fields[i])}/></div>:  <Button name={'Выкупить'} clickHandle={() => buybackProperty(fields[i])}/>) }
                    </div>
                </div>
            </div>
        );
    }
    for(let i = 11; i < 21; i++) {
        const ownerColor = getFieldOwner(fields[i].pos)[0];
        const ownerId = getFieldOwner(fields[i].pos)[1];
        const statusField = getFieldOwner(fields[i].pos)[2];
        const propertyTax = getFieldOwner(fields[i].pos)[3];
        fieldElements.push(
            <div 
            key={fields[i].pos} 
            onClick={fields[i].action === 'property' ? () => getInfoProperty(fields[i]) : null}
            className={`cell ${fields[i].action === "casiono" || fields[i].action === "jail" ? "corner" : ""} ${ownerColor != null ? ownerColor : 'white'}`} 
            style={{
                left: '595px', 
                top: `${45 + 55 * (i - 10)}px`, 
                width: '100px',  // Условие для ширины
                height: fields[i].action === 'casiono' || fields[i].action === 'jail' ? '100px' : '55px',
            }}>
            {fields[i].title}
            {fields[i].action === "property" ? <div className={`field-price right group-${fields[i].group}`}>{fields[i].price}k</div> : null}
                <div className="field-info right" style={{ display: popupFieldId === fields[i].pos ? 'block' : 'none' , left:  `${1 + 55 * (i - 1)}` }}>
                    <div className={`field-info-header group-${fields[i].group}`}>
                        {fields[i].title}
                    </div>
                    <div className="field-info-body">
                    <p>Базовая рента {fields[i].tax}</p>
                    <p>Покупка филиала {fields[i].upgrade}</p>
                    <p>Заложить {fields[i].pawn}</p>
                    <p><img src="/star.svg" alt="" /> {fields[i].level && fields[i].level[1]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[2]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[3]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> {fields[i].level && fields[i].level[4]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[5]}</p>
                    {ownerId === user.id && (statusField == 1 ? <div className='inline'><Button name={'Заложить'} clickHandle={() => pawnProperty(fields[i])}/> <Button name={'Повысить'} clickHandle={() => upgradeProperty(fields[i])}/></div>:  <Button name={'Выкупить'} clickHandle={() => buybackProperty(fields[i])}/>) }
                    </div>
                </div>
            </div>
        );
    }
    for(let i = 21; i < 31; i++) {
        const ownerColor = getFieldOwner(fields[i].pos)[0];
        const ownerId = getFieldOwner(fields[i].pos)[1];
        const statusField = getFieldOwner(fields[i].pos)[2];
        const propertyTax = getFieldOwner(fields[i].pos)[3];
        fieldElements.push(
            <div 
            key={fields[i].pos} 
            onClick={fields[i].action === 'property' ? () => getInfoProperty(fields[i]) : null}
            className={`cell ${fields[i].action === "ot" || fields[i].action === "ot" ? "corner" : ""} ${ownerColor != null ? ownerColor : 'white'}`} 
            style={{
                left:  fields[i].action === 'ot' || fields[i].action === 'ot' ? '0px' : `${540 - 55 * (i - 9) + 660}px`, 
                top: `${595}px`, 
                width: fields[i].action === 'ot' || fields[i].action === 'ot' ? '100px' : '55px',  // Условие для ширины
                height: '100px',
            }}
            >
            {fields[i].title}
           
            {fields[i].action === "property" ? <div className={`field-price bottom group-${fields[i].group}`}>{fields[i].price}k</div> : null}
                <div className="field-info bottom" style={{ display: popupFieldId === fields[i].pos ? 'block' : 'none' , left:  `${1 + 55 * (i - 1)}` }}>
                    <div className={`field-info-header group-${fields[i].group}`}>
                        {fields[i].title}
                    </div>
                    <div className="field-info-body">
                    <p>Базовая рента {fields[i].tax}</p>
                    <p>Покупка филиала {fields[i].upgrade}</p>
                    <p>Заложить {fields[i].pawn}</p>
                    <p><img src="/star.svg" alt="" /> {fields[i].level && fields[i].level[1]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[2]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[3]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> {fields[i].level && fields[i].level[4]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[5]}</p>
                    {ownerId === user.id && (statusField == 1 ? <div className='inline'><Button name={'Заложить'} clickHandle={() => pawnProperty(fields[i])}/> <Button name={'Повысить'} clickHandle={() => upgradeProperty(fields[i])}/></div>:  <Button name={'Выкупить'} clickHandle={() => buybackProperty(fields[i])}/>) }
                    </div>
                </div>
            </div>
        );

    }
    for(let i = 31; i < 40; i++) {
        const ownerColor = getFieldOwner(fields[i].pos)[0];
        const ownerId = getFieldOwner(fields[i].pos)[1];
        const statusField = getFieldOwner(fields[i].pos)[2];
        const propertyTax = getFieldOwner(fields[i].pos)[3];
        fieldElements.push(
            <div 
            key={fields[i].pos} 
            onClick={fields[i].action === 'property' ? () => getInfoProperty(fields[i]) : null}
            className={`cell ${fields[i].action === "ot" || fields[i].action === "ot" ? "corner" : ""} ${ownerColor != null ? ownerColor : 'white'}`} 
            style={{
                left:   '0px', 
                top: `${45 + 55 * (40 - i)}px`, 
                width: '100px',  // Условие для ширины
                height: '55px',
            }}
            >
            {fields[i].title}
            {fields[i].action === "property" ? <div className={`field-price left group-${fields[i].group}`}>{fields[i].price}k</div> : null}
                <div className="field-info left" style={{ display: popupFieldId === fields[i].pos ? 'block' : 'none' , left:  `${1 + 55 * (i - 1)}` }}>
                    <div className={`field-info-header group-${fields[i].group}`}>
                        {fields[i].title}
                    </div>
                    <div className="field-info-body">
                    <p>Базовая рента {fields[i].tax}</p>
                    <p>Покупка филиала {fields[i].upgrade}</p>
                    <p>Заложить {fields[i].pawn}</p>
                    <p><img src="/star.svg" alt="" /> {fields[i].level && fields[i].level[1]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[2]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[3]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> {fields[i].level && fields[i].level[4]}</p>
                    <p><img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" /><img src="/star.svg" alt="" /> <img src="/star.svg" alt="" />  {fields[i].level && fields[i].level[5]}</p>
                    {ownerId === user.id && (statusField == 1 ? <div className='inline'><Button name={'Заложить'} clickHandle={() => pawnProperty(fields[i])}/> <Button name={'Повысить'} clickHandle={() => upgradeProperty(fields[i])}/></div>:  <Button name={'Выкупить'} clickHandle={() => buybackProperty(fields[i])}/>) }
                    </div>
                </div>
            </div>
        );

    }
    return <>{fieldElements}</>;
}
