import React, { useEffect, useState } from "react";
import { IItem } from "../../../types/Item";
import { createMarketplaceListing } from "../../../services/marketplaceService";
import Input from "../../../components/ui/Input";
import Dropdown from "../../../components/ui/Dropdown";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import useModal from "../../../hooks/useModal";

interface ItemsTabProps {
    items: IItem[];
}

type SelectedType = {
    title: string;
    data: string;
}
    
const ItemsTab = ({items}: ItemsTabProps) => {
    const { isOpen: isOpenSellModal, openModal: openSellModal, closeModal: closeSellModal} = useModal();
    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
    const [priceSelectedItem, setPriceSelectedItem] = useState<string>("");
    const [titleForSearch, setTitleForSearch] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<SelectedType | null>(null);
    const [filter, setFilter] = useState<string>("");

    const sellItem = async () => {
        console.log("Sell item: " + selectedItem?.id)
        if(selectedItem) {
            const response = await createMarketplaceListing(selectedItem.id, Number(priceSelectedItem));
        }
    }

    const applyFilterAndSearch = (): IItem[] => {
        return items.filter((item) => {
            const matchesType = selectedOption ? item.type === selectedOption.data : true;
            const matchesSearch = item.title.toLowerCase().includes(titleForSearch.toLowerCase());
            return matchesType && matchesSearch;
        });
    };

    const filteredItems = applyFilterAndSearch();

    if (items.length === 0) {
        return <p>Нет доступных предметов.</p>; 
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <Input label="Название" value={titleForSearch} onChange={setTitleForSearch} placeholder="Название"/>
                <Button label="Сбросить" onClick={() => setSelectedOption(null)} variant="secondary" />
                <Dropdown
                    options={[{title: "Предметы", data: "item"}, {title: "Скины", data: "skin"}, {title: "Контейнеры", data: "container"}]}
                    selected={selectedOption}
                    onSelect={setSelectedOption}
                    placeholder="Тип"
                />
            </div>
            <div className="grid grow grid-cols-3 place-content-start gap-2.5 overflow-y-auto py-2.5 lg:grid-cols-8 ">
            {filteredItems.map((item) => (
                <div
                key={item.id}
                className="relative rounded shadow-md border border-[#323e60] bg-block cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center pt-4 pb-4"
                onClick={() => {setSelectedItem(item)}}
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
                        <p className="text-secondary mt-2">Цена: {item.type}</p>
                    </div>
                
                    {
                        selectedItem?.id === item.id && (
                            <>
                                <div className="fixed inset-0 bg-black bg-opacity-50 z-10  pointer-events-auto" onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(null);
                                }}></div>
                                            
                                <div className="absolute right-[20px] bottom-[-20px] mt-2 bg-[#1f2a46] rounded shadow-lg z-20">
                                    <button
                                        onClick={() => openSellModal()}
                                        className="block w-full text-left px-8 py-2.5 text-secondary hover:bg-[#2b3654] rounded transition-colors"
                                    >
                                        Продать
                                        
                                    </button>
                                    <button
                                        onClick={() => openSellModal()}
                                        className="block w-full text-left px-8 py-2.5 text-secondary hover:bg-[#2b3654] rounded transition-colors"
                                    >
                                        Продать
                                        
                                    </button>
                                </div>
                            </>
                        )
                    }
                    
                </div>
            ))}
            </div>
            <Modal title="Продажа предмета" isOpen={isOpenSellModal} onClose={closeSellModal}>
                { (
                    <div>
                        {/* <p className="text-lg text-primary font-semibold mb-4">{selectedItem.title}</p> */}
                        <Input
                            label="Цена"
                            value={priceSelectedItem}
                            onChange={setPriceSelectedItem}
                            placeholder="Введите цену"
                        />
                        <Button
                            label="Продать"
                            onClick={sellItem}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ItemsTab;