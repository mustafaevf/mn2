interface ISettings {
    price: number;
    lvl: number;
}

export interface IItem {
    id: number;
    title: string;
    image: string;
    type: string;
    settings: ISettings;
};