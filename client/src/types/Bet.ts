import { IUser } from './User';

export interface Bet {
    amount: number;
    currency: string;
    game: string;
    status: number;
    createdAt: string;
    user: IUser;
}
