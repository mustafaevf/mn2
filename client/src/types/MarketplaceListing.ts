import { IItem } from "./Item";

export interface IMarketplaceListing {
    id: number;
    item: IItem;
    price: number;
    userId: number;
    isActive: boolean;
}