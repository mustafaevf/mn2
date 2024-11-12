import React, { useState } from "react";
import { IItem } from "../../../types/Item";
import { createMarketplaceListing } from "../../../services/marketplaceService";
import Input from "../../../components/ui/Input";

interface ItemsTabProps {
    items: IItem[];
}

const ItemsTab = ({items}: ItemsTabProps) => {
    const [selectedItem, setSelectedItem] = useState<IItem | null>();
    const [priceSelectedItem, setPriceSelectedItem] = useState<string>("");

    const sellItem = async () => {
    
        if(selectedItem) {
            const response = await createMarketplaceListing(selectedItem.id, Number(priceSelectedItem));
        }
    }

    if (items.length === 0) {
        return <p>Нет доступных предметов.</p>; 
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    onClick={() => setSelectedItem(item)}
                >
                    <img
                        src={`http://localhost:8080/uploads/${item.image}`}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 mt-2">Цена: ${item.type}</p>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center text-white opacity-0 hover:opacity-100">
                        <p className="text-lg font-bold">Подробнее</p>
                    </div>
                </div>
            ))}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={() => setSelectedItem(null)}
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4">Продажа предмета</h2>
                        <div className="mb-4">
                            <p className="text-lg font-semibold">{selectedItem.title}</p>
                            <Input label="price" value={priceSelectedItem} onChange={setPriceSelectedItem} placeholder="price"/>
                            {/* <p className="text-gray-600">Цена: ${selectedItem.price}</p> */}
                        </div>
                        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={() => sellItem()}>
                            Продать
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemsTab;