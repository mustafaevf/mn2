import client from "./client";
import { IItem } from "../types/Item";

export const fetchItems = async (id: number): Promise<IItem[]> => {
    const response = await client.get<any>(`/users/${id}/items`);
    return response.data;
}
