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
        console.error("Response error:", error);

        const status = error.response?.status;
        if(error.status == 403) {
            useAuthStore().user = null;
            useAuthStore().token = "";
            useAuthStore().isAuth = false;
        }
        return Promise.reject(error);
    }
);
client.interceptors.response.use(
    (response) => {
        console.log("Response:", response);
        return response;
    },
    (error) => {
        const status = error.response?.status;

        if (status === 403) {
            console.log("Handling 403 error");
            const authStore = useAuthStore.getState();
            // authStore.user = null;
            // authStore.token = "";
            // authStore.isAuth = false;
            authStore.logout();
        }
        return Promise.reject(error);
    }
);

export default client;