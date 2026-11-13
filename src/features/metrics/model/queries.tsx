import { MetricsRange } from "@/shared/api/types";
import { useQuery } from "@tanstack/react-query";
import { metricsApi } from "../api/metrics-api";

export const CHART_POINTS = 60;

export const metricsKey = (id: number, range: MetricsRange) =>
    ["monitors", "metrics", id, range, CHART_POINTS] as const;

export function useMonitorMetrics(id: number, range: MetricsRange) {
    return useQuery({
        queryKey: metricsKey(id, range),
        queryFn: ({ signal }) => metricsApi.overview(id, { range, points: CHART_POINTS }, signal),
        placeholderData: (prev, prevQuery) => (prevQuery?.queryKey[2] === id ? prev : undefined),
        refetchInterval: 30_000
    });
}
