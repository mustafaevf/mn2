import React, { useState, useEffect } from 'react';
import {
    getMarketplaceListing,
    createMarketplaceListing,
} from '../../services/marketplaceService';
import { IMarketplaceListing } from '../../types/MarketplaceListing';
import { FilterProps, OrderByEnum, SortByEnum } from '../../types/FilterProps';
import Card from '../../components/ui/Card';
import Dropdown from '../../components/ui/Dropdown';
import Button from '../../components/ui/Button';
import { IItem } from '../../types/Item';
import ToggleButton from '../../components/ui/ToggleButton';

type SelectedType = {
    title: string;
    data: string;
};

const MarketplacePage = () => {
    const [items, setItems] = useState<IMarketplaceListing[]>([]);
    const [filter, setFilter] = useState<FilterProps>();
    const [page, setPage] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<SelectedType | null>(
        null
    );

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getMarketplaceListing(page * 10, filter);
                console.log(response);
                setItems(response);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };
        fetchItems();
    }, [page, filter]);

    return (
        <div className="rounded w-full p-4 bg-secondary">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    {/* <Input label="Название" value={titleForSearch} onChange={setTitleForSearch} placeholder="Название"/> */}
                    <ToggleButton
                        title="Сортировать по цене"
                        toggle={() =>
                            setFilter({
                                ...filter,
                                sortBy: SortByEnum.PRICE,
                                order:
                                    filter?.order == OrderByEnum.ASC
                                        ? OrderByEnum.DESC
                                        : OrderByEnum.ASC,
                            })
                        }
                        status={
                            filter?.order === OrderByEnum.ASC ? true : false
                        }
                    />

                    <Dropdown
                        options={[
                            { title: 'Предметы', data: 'item' },
                            { title: 'Скины', data: 'skin' },
                            { title: 'Контейнеры', data: 'container' },
                        ]}
                        selected={selectedOption}
                        onSelect={setSelectedOption}
                        placeholder="Тип"
                    />
                </div>
                <div className="grid grow grid-cols-3 rounded  mt-4 mb-4  py-4 place-content-start gap-2.5 overflow-y-auto lg:grid-cols-8 ">
                    {items.length > 0 ? items.map((item) => (
                        <div
                            key={item.id}
                            className="relative rounded shadow-md border border-[#323e60] bg-block cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center pt-4 pb-4"
                        >
                            <div className="flex items-center justify-center w-16 h-16 bg-[#2b3654] rounded-lg mb-4">
                                <img
                                    src={`http://localhost:8080/uploads/${item.item.image}`}
                                    alt={item.item.title}
                                    className="object-contain w-10 h-10"
                                />
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-primary">
                                    {item.item.title}
                                </h3>
                                <p className="text-secondary mt-2">
                                    Цена: {item.price}
                                </p>
                            </div>
                        </div>
                    )): (
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-lg font-semibold text-primary">
                                Ничего нет
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-center">
                    <div className="rounded bg-[#2b3654] ">
                        <ul className="flex">
                            <li
                                className={`text-dop rounded p-6 pb-4 pt-4 hover:bg-[#3c4868] cursor-pointer ${ page === 0
                                    ? 'text-gray-500 cursor-not-allowed'
                                    : 'cursor-pointer'}`}
                                onClick={() => setPage((prev) => prev - 1)}
                            >
                                Пред
                            </li>
                            <li
                                className={`text-dop rounded p-6 pb-4 pt-4 cursor-pointer hover:bg-[#3c4868]`}
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                След
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketplacePage;
