import { Player } from "./Player";

enum IStatus {
    LOBBY_CREATED = 0,
    LOBBY_READY = 1,
    LOBBY_STARTED = 2,
    LOBBY_INACTIVE = -1,
}

export interface Board {
    max_person: number;
    status: IStatus;
    userId: number;
    players: Player[];
}