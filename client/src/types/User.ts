enum IUserStatus {
    USER = 0,
    ADMIN = 1,
    BANNED = 2,
};

export interface IUser {
    id: number;
    login: string;
    balance: number;
    image: string;
    status: IUserStatus
    img: string;
};