import { StorageService } from "../services/storage.service";
import { environment } from "../environment";
import axios, { AxiosError, HttpStatusCode } from "axios";

export interface ApiResponseInterface<T> {
    errors: string[];
    result: T;
    status: number;
}

export const api = axios.create({
    baseURL: environment.apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async config => {
        const token = StorageService.token;

        if (token) {
            config.headers.Authorization = `Bearer ${ token }`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const validation = async (): Promise<boolean> => {
    let valid: boolean = true;
    await api.get("/user/validate", {
        timeout: 10000,
    })
        .catch((error: AxiosError) => {
            if (error.code === "ECONNABORTED") {
                throw error;
            } else if (error.response?.status === HttpStatusCode.Unauthorized) {
                valid = false;
            }
        });
    return valid;
};
