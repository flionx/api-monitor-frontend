import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MonitorListQuery } from "./filters";
import { monitorsApi } from "../api/monitors-api";

export const monitorKeys = {
    all: ["monitors"] as const,
    lists: () => [...monitorKeys.all, "list"] as const,
    list: (query: MonitorListQuery) => [...monitorKeys.lists(), query] as const
};

export function useMonitors(query: MonitorListQuery) {
    return useQuery({
        queryKey: monitorKeys.list(query),
        queryFn: ({ signal }) => monitorsApi.list(query, signal),
        placeholderData: keepPreviousData,
        refetchInterval: 15_000
    });
}
