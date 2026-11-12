"use client";

import { useSummary } from "../model/queries";
import { useDelayedLoading } from "@/shared/hooks/use-delayed-loading";
import { ErrorState } from "@/shared/ui/error-state";
import { EmptyState } from "@/shared/ui/empty-state";
import { AddMonitorButton } from "@/features/monitors";
import { SummaryCards } from "./summary-cards";
import { Skeleton } from "@/shared/ui/skeleton";
import DownMonitorsCard from "./down-monitors-card";
import UptimeCard from "./uptime-card";

export function OverviewSkeleton() {
    return (
        <div className="flex flex-col gap-4" aria-busy="true">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
                {Array.from({ length: 5 }, (_, index) => (
                    <Skeleton key={index} className="h-24 rounded-xl" />
                ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
                <Skeleton className="h-36 rounded-xl" />
                <Skeleton className="h-36 rounded-xl lg:col-span-2" />
            </div>
        </div>
    );
}
export function OverviewDashboard() {
    const { data, isError, refetch } = useSummary();
    const showSkeleton = useDelayedLoading(!data && !isError);

    if (!data) {
        if (!isError) {
            return <ErrorState message="Could not load the summary." onRetry={() => refetch()} />;
        }
        return showSkeleton ? <OverviewDashboard /> : null;
    }

    if (data.counts.total === 0) {
        return (
            <EmptyState
                imageSrc="/images/empty-state.webp"
                title="No monitors"
                description="To get started, add your first monitor"
                action={<AddMonitorButton label="Add a monitor" />}
            />
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <SummaryCards counts={data.counts} />
            <div className="grid gap-4 lg:grid-cols-3">
                <UptimeCard uptime={data.uptime24h} />
                <div className="lg:col-span-2">
                    <DownMonitorsCard monitors={data.downMonitors} totalDown={data.counts.down} />
                </div>
            </div>
        </div>
    );
}
