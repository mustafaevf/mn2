import client from "./client";
import { IUser } from "../types/User";
import { ILobby } from "../types/Lobby";

export const fetchLobbies = async (): Promise<ILobby[]> => {
    const response = await client.get<ILobby[]>(`/lobbies`);
    return response.data;
}

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

export const startLobby = async (id: number): Promise<void> => {
    const response = await client.get<any>(`/lobbies/${id}/start`);
    return response.data.uuid;
}

export const createLobby = async (max_person: number): Promise<ILobby> => {
    const response = await client.post<ILobby>(`/lobbies`, { max_person });
    return response.data;
}