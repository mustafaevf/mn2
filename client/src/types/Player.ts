import { IUser } from "./User";

export interface Player extends IUser {
    id: number;
    color: string;
    position: number;
    balance: number;
    socketId: string;
};