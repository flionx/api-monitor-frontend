import { api } from "@/shared/api/client";
import { MonitorListQuery } from "../model/filters";
import { Monitor, MonitorInput, Page } from "@/shared/api/types";

export const monitorsApi = {
    list: (query: MonitorListQuery, signal?: AbortSignal) =>
        api.get<Page<Monitor>>("/monitors", query, signal),
    create: (body: MonitorInput) => api.post<Monitor>("/monitors", body)
};
