import { IUser } from "./User";

interface Property {
    title: string,
    group: number,
    pawn: number,
    pos: number,
    status: number,
    tax: number,
    upgrade: number,
}

export interface Player extends IUser{
    id: number;
    color: string;
    login: string;
    timer: string;
    position: number;
    properties: Property[],
    balance: number;
    socketId: string;
    image: string;
};