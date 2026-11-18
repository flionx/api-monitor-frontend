"use client";

import { Skeleton } from "@/shared/ui/skeleton";
import { useQueryState } from "nuqs";
import { rangeParser } from "../model/range";
import { useMonitorMetrics } from "../model/queries";
import { useDelayedLoading } from "@/shared/hooks/use-delayed-loading";
import { ErrorState } from "@/shared/ui/error-state";
import { StatsCards } from "./stats-cards";
import { ResponseTimeChart } from "./response-time-chart";
import { RangeSwitcher } from "./range-switcher";
import { useMonitor } from "@/features/monitors";

function InfoSkeleton() {
    return (
        <div className="flex flex-col gap-4" aria-busy="true">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                    <Skeleton key={index} className="h-24 rounded-xl" />
                ))}
            </div>
            <Skeleton className="h-80 rounded-xl" />
        </div>
    );
}

export function MonitorInfo({ id }: { id: number }) {
    const [range, setRange] = useQueryState("range", rangeParser);
    const { data: monitor } = useMonitor(id);
    const { data, isPending, isError, isPlaceholderData, refetch } = useMonitorMetrics(
        id,
        range,
        monitor?.intervalSeconds ?? 60
    );
    const showSkeleton = useDelayedLoading(isPending);

    let content;
    if (isPending) {
        content = showSkeleton ? <InfoSkeleton /> : null;
    } else if (isError && !data) {
        content = <ErrorState message="Could not load the statistics" onRetry={() => refetch} />;
    } else if (data) {
        content = (
            <div
                className={
                    isPlaceholderData
                        ? "flex flex-col gap-4 opacity-60 transition-opacity"
                        : "flex flex-col gap-4"
                }
            >
                <StatsCards stats={data.stats} />
                <ResponseTimeChart chart={data.chart} stats={data.stats} />
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-4">
            <RangeSwitcher
                value={range}
                onChange={(next) => setRange(next === "24h" ? null : next)}
            />
            {content}
        </div>
    );
}
