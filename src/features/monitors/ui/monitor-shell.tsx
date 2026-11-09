"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useMonitor } from "../model/queries";
import { useDelayedLoading } from "@/shared/hooks/use-delayed-loading";
import { isApiError } from "@/shared/api/errors";
import { EmptyState } from "@/shared/ui/empty-state";
import { buttonVariants } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { ErrorState } from "@/shared/ui/error-state";
import { StatusBadge } from "./status-badge";
import { getDisplayStatus } from "@/shared/lib/status";
import { ExternalLink } from "lucide-react";
import MonitorTabs from "./monitor-tabs";

export function MonitorShell({ id, children }: { id: number; children: ReactNode }) {
    const { data: monitor, error, isPending, refetch } = useMonitor(id);
    const showSkeleton = useDelayedLoading(isPending);

    if (isApiError(error) && error.status === 404) {
        return (
            <EmptyState
                imageSrc="/images/empty-state.webp"
                title="Monitor not found"
                description="It may have been deleted."
                action={
                    <Link href="/monitors" className={buttonVariants({ variant: "outline" })}>
                        Back to monitors
                    </Link>
                }
            />
        );
    }

    if (isPending) return showSkeleton ? <Skeleton className="h-24 w-full" /> : null;

    if (!monitor) {
        return <ErrorState message="Could not load the monitor." onRetry={() => refetch()} />;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <h1 className="min-w-0 truncate text-xl font-semibold">{monitor.name}</h1>
                    <StatusBadge status={getDisplayStatus(monitor)} className="shrink-0" />
                </div>
                <a
                    href={monitor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground inline-flex w-fit max-w-full items-center gap-1 text-sm"
                >
                    <span>{monitor.url}</span>
                    <ExternalLink className="size-3.5 shrink-0" />
                </a>
            </div>
            <MonitorTabs id={id} />
            {children}
        </div>
    );
}
