import axios, { AxiosInstance } from "axios";
import { error } from "console";
import { useAuthStore } from "../stores/authStore";

const getToken = () => {
    return useAuthStore.getState().token;
};

const client: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use(
    (config) => {
        const token = getToken();
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default client;