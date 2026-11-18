"use client";

import { useQuery } from "@tanstack/react-query";
import { summaryApi } from "../api/summary-api";

export const summaryKey = ["monitors", "summary"];

export function useSummary() {
    return useQuery({
        queryKey: summaryKey,
        queryFn: ({ signal }) => summaryApi.get(signal),
        refetchInterval: 20_000
    });
}
