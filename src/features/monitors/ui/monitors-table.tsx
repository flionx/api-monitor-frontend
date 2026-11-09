import Link from "next/link";
import { cn } from "cn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { formatDateTime, formatRelative, formatResponseTime } from "@/shared/lib/format";
import { getDisplayStatus } from "@/shared/lib/status";
import { StatusBadge } from "./status-badge";
import { MonitorRowActions } from "./monitor-row-actions";
import { Skeleton } from "@/shared/ui/skeleton";
import { Monitor } from "@/shared/api/types";

const HEAD = "text-muted-foreground text-xs font-normal";

export function MonitorRow({ monitor }: { monitor: Monitor }) {
    return (
        <TableRow>
            <TableCell>
                <StatusBadge status={getDisplayStatus(monitor)} />
            </TableCell>
            <TableCell>
                <div className="max-w-[45vw] min-w-0 @2xl:max-w-xs @5xl:max-w-56">
                    <Link
                        href={`/monitors/${monitor.id}`}
                        className="block max-w-fit truncate py-0.5 font-medium hover:underline"
                    >
                        {monitor.name}
                    </Link>
                    <p className="text-muted-foreground truncate text-xs @5xl:hidden">
                        {monitor.url}
                    </p>
                    {monitor.lastErrorMessage && (
                        <p className="text-destructive truncate text-xs @5xl:hidden">
                            {monitor.lastErrorMessage}
                        </p>
                    )}
                    <p className="text-muted-foreground text-xs @2xl:hidden">
                        {formatRelative(monitor.lastCheckedAt)} ·{" "}
                        {formatResponseTime(monitor.lastResponseTimeMs)}
                    </p>
                </div>
            </TableCell>
            <TableCell className="hidden @5xl:table-cell">
                <div className="text-muted-foreground max-w-64 truncate" title={monitor.url}>
                    {monitor.url}
                </div>
            </TableCell>
            <TableCell className="hidden tabular-nums @2xl:table-cell">
                {formatResponseTime(monitor.lastResponseTimeMs)}
            </TableCell>
            <TableCell className="hidden @5xl:table-cell">
                <div className="max-w-64 truncate" title={monitor.lastErrorMessage ?? undefined}>
                    {monitor.lastErrorMessage ?? "-"}
                </div>
            </TableCell>
            <TableCell className="text-muted-foreground hidden @2xl:table-cell">
                <span title={formatDateTime(monitor.lastCheckedAt)}>
                    {formatRelative(monitor.lastCheckedAt)}
                </span>
            </TableCell>
            <TableCell className="w-12">
                <MonitorRowActions monitor={monitor} />
            </TableCell>
        </TableRow>
    );
}

export function MonitorsTable({ monitors }: { monitors: Monitor[] }) {
    return (
        <div className="@container">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className={cn(HEAD, "w-24")}>Status</TableHead>
                        <TableHead className={HEAD}>Monitor</TableHead>
                        <TableHead className={cn(HEAD, "hidden @5xl:table-cell")}>URL</TableHead>
                        <TableHead className={cn(HEAD, "hidden @2xl:table-cell")}>
                            Response
                        </TableHead>
                        <TableHead className={cn(HEAD, "hidden @5xl:table-cell")}>
                            Last Error
                        </TableHead>
                        <TableHead className={cn(HEAD, "hidden @2xl:table-cell")}>
                            Last Check
                        </TableHead>
                        <TableHead className="w-12">
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border-b">
                    {monitors.map((monitor) => (
                        <MonitorRow key={monitor.id} monitor={monitor} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export function MonitorsTableSkeleton() {
    return (
        <div className="flex flex-col gap-3" aria-busy="true">
            {Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
            ))}
        </div>
    );
}
