import client from "./client";
import { IUser } from "../types/User";
import { ILobby } from "../types/Lobby";

export const fetchUsersFromLobby = async (id: number): Promise<IUser[]> => {
    const response = await client.get<any>(`/lobbies/${id}/info/users`);
    return response.data.users;
}

export const connectToLobby = async (id: number): Promise<void> => {
    await client.put<any>(`/lobbies/${id}/connect`);
}

export const disconnectFromLobby = async (id: number): Promise<void> => {
    await client.put<any>(`/lobbies/${id}/disconnect`);
}