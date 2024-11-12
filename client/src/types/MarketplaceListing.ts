import { IItem } from "./Item";

export interface IMarketplaceListing {
    item: IItem;
    price: number;
    userId: number;
    isActive: boolean;
}