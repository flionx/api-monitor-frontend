"use client";

import { useQueryState } from "nuqs";
import { History } from "lucide-react";
import { useDelayedLoading } from "@/shared/hooks/use-delayed-loading";
import { useChecks } from "../model/queries";
import { checkFilterParser } from "../model/filters";
import { ResultFilter } from "./result-filter";
import { ChecksTable, ChecksTableSkeleton } from "./checks-table";
import { EmptyState } from "@/shared/ui/empty-state";
import { ErrorState } from "@/shared/ui/error-state";
import { Button } from "@/shared/ui/button";

export function MonitorChecks({ id }: { id: number }) {
    const [filter, setFilter] = useQueryState("result", checkFilterParser);
    const {
        data,
        isPending,
        isError,
        isPlaceholderData,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch
    } = useChecks(id, filter);
    const showSkeleton = useDelayedLoading(isPending);

    const checks = data?.pages.flatMap((page) => page.data) ?? [];
    const isFiltered = filter !== "all";
    const showToolbar = isFiltered || checks.length > 0;

    const resetFilter = () => setFilter(null);

    let content;
    if (isPending) {
        content = showSkeleton ? <ChecksTableSkeleton /> : null;
    } else if (isError && !data) {
        content = <ErrorState message="Could not load checks" onRetry={() => refetch()} />;
    } else if (checks.length === 0) {
        content = isFiltered ? (
            <EmptyState
                icon={History}
                title="No checks found"
                description="Nothing matches the current filter"
                action={
                    <Button variant="outline" onClick={resetFilter}>
                        Clear filter
                    </Button>
                }
            />
        ) : (
            <EmptyState
                icon={History}
                title="No checks yet"
                description="The first check runs within about 10 seconds"
            />
        );
    } else {
        content = (
            <>
                <div className={isPlaceholderData ? "opacity-60 transition-opacity" : undefined}>
                    <ChecksTable checks={checks} />
                </div>
                {hasNextPage && (
                    <div className="flex justify-center">
                        <Button
                            variant="outline"
                            disabled={isFetchingNextPage}
                            onClick={() => fetchNextPage()}
                        >
                            {isFetchingNextPage ? "Loading..." : "Load more"}
                        </Button>
                    </div>
                )}
            </>
        );
    }

    return (
        <div className="flex h-full flex-col gap-4">
            {showToolbar && (
                <div className="bg-card flex items-center gap-2 rounded-xl p-2">
                    <ResultFilter
                        value={filter}
                        onChange={(next) => setFilter(next === "all" ? null : next)}
                    />
                </div>
            )}
            {content}
        </div>
    );
}
