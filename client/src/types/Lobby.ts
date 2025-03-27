import { IUser } from "./User";

export interface ILobby {
    id: number;
    max_person: number;
    userId: number;
    uuid: string;
    users: IUser[];
    settings?: string;
    status: number;
};