import { api } from "@/shared/api/client";
import { MonitorListQuery } from "../model/filters";
import { Monitor, Page } from "@/shared/api/types";

export const monitorsApi = {
    list: (query: MonitorListQuery, signal?: AbortSignal) =>
        api.get<Page<Monitor>>("/monitors", query, signal)
};
