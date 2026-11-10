import {
    keepPreviousData,
    QueryClient,
    skipToken,
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";
import { MonitorListQuery } from "./filters";
import { monitorsApi } from "../api/monitors-api";
import { MonitorInput } from "@/shared/api/types";

export const monitorKeys = {
    all: ["monitors"] as const,
    lists: () => [...monitorKeys.all, "list"] as const,
    list: (query: MonitorListQuery) => [...monitorKeys.lists(), query] as const,
    detail: (id: number | null) => [...monitorKeys.all, "detail", id] as const
};

function invalidateCollections(queryClient: QueryClient) {
    return queryClient.invalidateQueries({
        queryKey: monitorKeys.all,
        predicate: (query) => query.queryKey[1] !== "detail"
    });
}

export function useMonitors(query: MonitorListQuery) {
    return useQuery({
        queryKey: monitorKeys.list(query),
        queryFn: ({ signal }) => monitorsApi.list(query, signal),
        placeholderData: keepPreviousData,
        refetchInterval: 15_000
    });
}

export function useMonitor(id: number | null) {
    return useQuery({
        queryKey: monitorKeys.detail(id),
        queryFn: id === null ? skipToken : ({ signal }) => monitorsApi.get(id, signal),
        refetchInterval: 30_000
    });
}

export function useCreateMonitor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: monitorsApi.create,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: monitorKeys.all })
    });
}

export function useUpdateMonitor(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (patch: Partial<MonitorInput>) => monitorsApi.update(id, patch),
        onSuccess: (monitor) => {
            queryClient.setQueryData(monitorKeys.detail(id), monitor);
            return invalidateCollections(queryClient);
        }
    });
}

export function useDeleteMonitor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: monitorsApi.remove,
        onSuccess: () => invalidateCollections(queryClient)
    });
}
