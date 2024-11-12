import React, { useState, useEffect } from "react";
import { getMarketplaceListing, createMarketplaceListing } from "../../services/marketplaceService";
import { IMarketplaceListing } from "../../types/MarketplaceListing";
import { FilterProps, OrderByEnum, SortByEnum } from "../../types/FilterProps";
import Card from "../../components/ui/Card";

const MarketplacePage = () => {
    const [items, setItems] = useState<IMarketplaceListing[]>([]);
    const [filter, setFilter] = useState<FilterProps>();
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getMarketplaceListing(page * 10, filter); 
                setItems(response);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };
        fetchItems();
    }, [page, filter]);

    return (
        <div className="p-2">
            <h2 className="text-xl font-bold mb-4">Торговая площадка</h2>
                <p onClick={() => setFilter({...filter, sortBy: SortByEnum.PRICE, order: OrderByEnum.ASC})}>Сортировать по цене</p>
            <div className="flex">
                {
                    items && items.map((item) => (<Card title={item.item.title} price={item.price} image={item.item.image} />))
                }
            </div>
            <div className="flex flex-col">
                <p onClick={() => setPage((prev) => prev - 1)} className={page === 0 ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer'}>Пред</p>
                <p onClick={() => setPage((prev) => prev + 1)}>След</p>
            </div>
        </div>
    );
};

export default MarketplacePage;