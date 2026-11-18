import { api } from "@/shared/api/client";
import { MetricsRange, MonitorOverview } from "@/shared/api/types";

export const metricsApi = {
    overview: (id: number, query: { range: MetricsRange; points: number }, signal?: AbortSignal) =>
        api.get<MonitorOverview>(`/monitors/${id}/overview`, query, signal)
};
