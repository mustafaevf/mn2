export enum SortByEnum {
    PRICE = "price",
}

export enum OrderByEnum {
    ASC = "ASC",
    DESC = "DESC",
}

export interface FilterProps {
    sortBy: SortByEnum,
    order: OrderByEnum,
};