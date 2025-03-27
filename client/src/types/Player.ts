import { IUser } from "./User";

export interface Player extends IUser{
    id: number;
    color: string;
    login: string;
    timer: string;
    position: number;
    balance: number;
    socketId: string;
    image: string;
};