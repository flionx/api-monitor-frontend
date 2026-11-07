"use client";

import { useEffect, useState } from "react";
import { useQueryStates } from "nuqs";
import { useMonitors } from "../model/queries";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
import { useDelayedLoading } from "@/shared/hooks/use-delayed-loading";
import { monitorListParsers } from "../model/search-params";
import { PAGE_SIZE, StatusTab, toListQuery } from "../model/filters";
import { MonitorsTable, MonitorsTableSkeleton } from "./monitors-table";
import { ErrorState } from "@/shared/ui/error-state";
import { PaginationBar } from "@/shared/ui/pagination-bar";
import { MonitorsToolbar } from "./monitors-toolbar";
import { EmptyState } from "@/shared/ui/empty-state";
import { AddMonitorButton } from "./add-monitor-button";
import { Button } from "@/shared/ui/button";

export function MonitorsList() {
    const [params, setParams] = useQueryStates(monitorListParsers);
    const tab = params.status;
    const page = Math.max(1, params.page);

    const [search, setSearch] = useState(params.q);
    const debouncedSearch = useDebouncedValue(search, 300);

    useEffect(() => {
        const next = debouncedSearch.trim();
        if (next === params.q) return;
        setParams({ q: next || null, page: null }, { history: "replace" });
    }, [debouncedSearch, params.q, setParams]);

    const { data, isPending, isError, isPlaceholderData, refetch } = useMonitors(
        toListQuery({ tab, q: params.q, page })
    );

    const total = data?.meta.total ?? 0;
    const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
    useEffect(() => {
        if (data && !isPlaceholderData && page > lastPage) {
            setParams({ page: lastPage === 1 ? null : lastPage });
        }
    }, [data, isPlaceholderData, page, lastPage, setParams]);

    const showSkeleton = useDelayedLoading(isPending);

    const hasFilters = tab !== "all" || params.q !== "";
    const showToolbar = isError || hasFilters || total > 0;

    const handleTabChange = (next: StatusTab) =>
        setParams({ status: next === "all" ? null : next, page: null });

    const handleReset = () => {
        setSearch("");
        setParams({ status: null, q: null, page: null });
    };

    let content;
    if (isPending) {
        content = showSkeleton ? <MonitorsTableSkeleton /> : null;
    } else if (isError) {
        content = <ErrorState message="Could not load monitors" onRetry={() => refetch()} />;
    } else if (data.meta.total === 0) {
        content = hasFilters ? (
            <EmptyState
                imageSrc="/images/empty-state.webp"
                title="No monitors found"
                description="Nothing matches the current filters"
                action={
                    <Button variant="outline" onClick={handleReset}>
                        Clear filters
                    </Button>
                }
            />
        ) : (
            <EmptyState
                imageSrc="/images/empty-state.webp"
                title="No monitors"
                description="To get started, add your first monitor"
                action={<AddMonitorButton label="Add a monitor" />}
            />
        );
    } else {
        content = (
            <>
                <div className={isPlaceholderData ? "opacity-60 transition-opacity" : undefined}>
                    <MonitorsTable monitors={data.data} />
                </div>
                <PaginationBar
                    page={page}
                    pageSize={PAGE_SIZE}
                    total={data.meta.total}
                    onPageChange={(next) => setParams({ page: next === 1 ? null : next })}
                />
            </>
        );
    }
    return (
        <div className="flex h-full flex-col gap-4">
            {showToolbar && (
                <MonitorsToolbar
                    tab={tab}
                    onTabChange={handleTabChange}
                    search={search}
                    onSearchChange={setSearch}
                />
            )}
            {content}
        </div>
    );
}
