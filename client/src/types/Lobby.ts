export interface ILobby {
    id: number;
    max_person: number;
    userId: number;
    uuid: string;
    settings?: string;
    status: number;
};