import { api } from "@/shared/api/client";
import { User } from "@/shared/api/types";

export interface Credentials {
    email: string;
    password: string;
}

export const authApi = {
    me: () => api.get<User>("/auth/me"),
    login: (body: Credentials) => api.post<User>("/auth/login", body),
    register: (body: Credentials) => api.post<User>("/auth/register", body),
    logout: () => api.post<{ message: string }>("/auth/logout")
};
