import { Player } from "./Player";

enum IStatus {
    LOBBY_CREATED = 0,
    LOBBY_READY = 1,
    LOBBY_STARTED = 2,
    LOBBY_INACTIVE = -1,
}

interface Message {
    type: number,
    data: string,
}

interface BoardState {
    event: string;
    data: Record<string, any>;
    playerId: number;
    round: number;
}

export interface Board {
    max_person: number;
    status: IStatus;
    userId: number;
    boardState: BoardState[];
    events: string[];
    players: Player[];
}