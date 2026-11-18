"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { CheckFilter, CHECKS_PAGE_SIZE, toIsUp } from "./filters";
import { checksApi } from "../api/checks-api";

export const checksKey = (id: number, filter: CheckFilter) =>
    ["monitors", "checks", id, filter] as const;

export function useChecks(id: number, filter: CheckFilter) {
    return useInfiniteQuery({
        queryKey: checksKey(id, filter),
        queryFn: ({ pageParam, signal }) =>
            checksApi.list(
                id,
                { limit: CHECKS_PAGE_SIZE, cursor: pageParam, isUp: toIsUp(filter) },
                signal
            ),
        initialPageParam: undefined as number | undefined,
        getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? undefined,
        placeholderData: (prev, prevQuery) => (prevQuery?.queryKey[2] === id ? prev : undefined),
        refetchInterval: (query) => ((query.state.data?.pages.length ?? 0) <= 1 ? 30_000 : false)
    });
}
