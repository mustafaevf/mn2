import client from "./client";
import { IItem } from "../types/Item";
import { IMarketplaceListing } from "../types/MarketplaceListing";
import { getItem } from "./itemService";
import { FilterProps } from "../types/FilterProps";

export const createItem = async (item: IItem): Promise<IItem> => {
    const response = await client.post<any>(`/items`);
    return response.data;
}

export const getMarketplaceListing = async (offset: number, filter?: FilterProps): Promise<IMarketplaceListing[]> => {
    let url = `marketplace/listings?offset=${offset}`;
    if(filter?.order && filter.sortBy) {
        url += `&sortBy=${filter?.sortBy}&order=${filter?.order}`;
    }
    const response = await client.get<any>(url);
    const data = response.data;
    const result = await Promise.all(
        data.map(async (e: any) => {
            try {
                const itemDetails = await getItem(e.itemId);
                return {...e, item: itemDetails}
            }
            catch(er) {
                console.log(er);
            }
        })
    );
    return result;
}

export const createMarketplaceListing = async (itemId: number, price: number): Promise<IMarketplaceListing> => {
    const response = await client.post<any>(`marketplace/listings`, {itemId, price});
    return response.data;
} 