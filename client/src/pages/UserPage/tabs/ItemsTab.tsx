import React, { useState } from "react";
import { IItem } from "../../../types/Item";
import { createMarketplaceListing } from "../../../services/marketplaceService";
import Input from "../../../components/ui/Input";
import Dropdown from "../../../components/ui/Dropdown";

interface ItemsTabProps {
    items: IItem[];
}

const ItemsTab = ({items}: ItemsTabProps) => {
    const [selectedItem, setSelectedItem] = useState<IItem | null>();
    const [priceSelectedItem, setPriceSelectedItem] = useState<string>("");
    const [titleForSearch, setTitleForSearch] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState("");

    const sellItem = async () => {
    
        if(selectedItem) {
            const response = await createMarketplaceListing(selectedItem.id, Number(priceSelectedItem));
        }
    }

    if (items.length === 0) {
        return <p>Нет доступных предметов.</p>; 
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <Input label="Название" value={titleForSearch} onChange={setTitleForSearch} placeholder="Название"/>
                <Dropdown
                    options={["Предметы", "Скины", "Контейнеры"]}
                    selected={selectedOption}
                    onSelect={setSelectedOption}
                    placeholder="Тип"
                />
            </div>
            <div className="grid grow grid-cols-3 place-content-start gap-1.5 overflow-y-auto px-2.5 py-2.5 lg:grid-cols-8 ">
            {items.map((item) => (
                <div
                key={item.id}
                className="relative rounded shadow-md border border-[#323e60] bg-block cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center pt-4 pb-4"
                onClick={() => setSelectedItem(item)}
                >
                    <div className="flex items-center justify-center w-16 h-16 bg-[#2b3654] rounded-lg mb-4">
                        <img
                            src={`http://localhost:8080/uploads/${item.image}`}
                            alt={item.title}
                            className="object-contain w-10 h-10"
                        />
                    </div>
            
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                        <p className="text-secondary mt-2">Цена: ${item.type}</p>
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
        </div>

        
    );
};

export default ItemsTab;