import { api } from "@/shared/api/client";
import { MonitorListQuery } from "../model/filters";
import { Monitor, MonitorInput, Page } from "@/shared/api/types";

export const monitorsApi = {
    list: (query: MonitorListQuery, signal?: AbortSignal) =>
        api.get<Page<Monitor>>("/monitors", query, signal),
    get: (id: number, signal?: AbortSignal) =>
        api.get<Monitor>(`/monitors/${id}`, undefined, signal),
    create: (body: MonitorInput) => api.post<Monitor>("/monitors", body),
    update: (id: number, body: Partial<MonitorInput>) =>
        api.patch<Monitor>(`/monitors/${id}`, body),
    remove: (id: number) => api.delete<{ message: string }>(`/monitors/${id}`)
};
