import { MetricsRange } from "@/shared/api/types";
import { useQuery } from "@tanstack/react-query";
import { metricsApi } from "../api/metrics-api";
import { getChartPoints } from "./points";

export const metricsKey = (id: number, range: MetricsRange, points: number) =>
    ["monitors", "metrics", id, range, points] as const;

export function useMonitorMetrics(id: number, range: MetricsRange, intervalSeconds: number) {
    const points = getChartPoints(range, intervalSeconds);
    return useQuery({
        queryKey: metricsKey(id, range, points),
        queryFn: ({ signal }) => metricsApi.overview(id, { range, points }, signal),
        placeholderData: (prev, prevQuery) => (prevQuery?.queryKey[2] === id ? prev : undefined),
        refetchInterval: 30_000
    });
}
