import client from "./client";
import { IItem } from "../types/Item";

export const createItem = async (item: IItem): Promise<IItem> => {
    const response = await client.post<any>(`/items`);
    return response.data;
}

export const getItem = async (itemId: number): Promise<IItem> => {
    const response = await client.get<IItem>(`items/${itemId}`);
    return response.data;
}
