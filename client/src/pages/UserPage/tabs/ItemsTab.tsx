import React from "react";
import { IItem } from "../../../types/Item";

interface ItemsTabProps {
    items: IItem[];
}

const ItemsTab = ({items}: ItemsTabProps) => {
    console.log(items);

    if (items.length === 0) {
        return <p>Нет доступных предметов.</p>; 
    }

    return (
        <div className="p-4"> 
            {items.map((item) => (
                <p key={item.id} className="text-gray-800">
                    {item.title}
                </p>
            ))}
        </div>
    );
};

export default ItemsTab;