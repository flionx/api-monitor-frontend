"use client";

import { cn } from "cn";
import { ERROR_TYPE_LABELS } from "../model/filters";
import { Check } from "@/shared/api/types";
import {
    formatDateShort,
    formatDateTime,
    formatRelative,
    formatResponseTime,
    formatTime
} from "@/shared/lib/format";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { StatusBadge } from "@/shared/ui/status-badge";
import { Skeleton } from "@/shared/ui/skeleton";

const HEAD = "text-muted-foreground text-xs font-normal";

function ErrorText({ check }: { check: Check }) {
    if (check.isUp || (!check.errorType && !check.errorMessage)) return <>-</>;

    return (
        <>
            {check.errorType && (
                <span className="text-muted-foreground">{ERROR_TYPE_LABELS[check.errorType]}</span>
            )}
            {check.errorType && check.errorMessage && " · "}
            {check.errorMessage}
        </>
    );
}

function CheckRow({ check }: { check: Check }) {
    const hasError = !check.isUp && (check.errorType || check.errorMessage);
    const responseTime = formatResponseTime(check.responseTimeMs);

    const date = formatDateShort(check.checkedAt);
    const checkedAt = date
        ? `${date} (${formatTime(check.checkedAt)})`
        : formatTime(check.checkedAt);

    return (
        <TableRow>
            <TableCell className="w-24 @2xl:w-30">
                <StatusBadge status={check.isUp ? "up" : "down"} />
            </TableCell>
            <TableCell>
                <div className="max-w-[55vw] min-w-0 @2xl:max-w-none">
                    <p>
                        {check.statusCode ?? "-"}
                        <span className="@2xl:hidden">
                            {" · "}
                            {responseTime}
                        </span>
                    </p>
                    {hasError && (
                        <p className="text-destructive truncate text-xs @2xl:hidden">
                            <ErrorText check={check} />
                        </p>
                    )}
                    <p
                        title={formatDateTime(check.checkedAt)}
                        className="text-muted-foreground truncate text-xs tabular-nums @4xl:hidden"
                    >
                        {checkedAt}
                    </p>
                </div>
            </TableCell>
            <TableCell
                className={cn(
                    "hidden tabular-nums @2xl:table-cell",
                    !check.isUp && "text-muted-foreground"
                )}
            >
                {responseTime}
            </TableCell>
            <TableCell className="hidden @2xl:table-cell">
                <div className="w-fit max-w-85 truncate" title={check.errorMessage ?? undefined}>
                    <ErrorText check={check} />
                </div>
            </TableCell>
            <TableCell className="hidden @4xl:table-cell">
                <div
                    className="text-muted-foreground w-fit max-w-90 truncate tabular-nums"
                    title={formatDateTime(check.checkedAt)}
                >
                    {checkedAt}
                </div>
            </TableCell>
        </TableRow>
    );
}

export function ChecksTable({ checks }: { checks: Check[] }) {
    return (
        <div className="@container">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className={cn(HEAD, "w-24")}>Result</TableHead>
                        <TableHead className={HEAD}>
                            <span className="@4xl:hidden">Details</span>
                            <span className="hidden @4xl:inline-block @4xl:w-40">Status code</span>
                        </TableHead>
                        <TableHead className={cn(HEAD, "hidden w-90 @2xl:table-cell")}>
                            Response
                        </TableHead>
                        <TableHead className={cn(HEAD, "hidden w-90 @2xl:table-cell")}>
                            Error
                        </TableHead>
                        <TableHead className={cn(HEAD, "hidden w-90 @4xl:table-cell")}>
                            Time
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {checks.map((check) => (
                        <CheckRow key={check.id} check={check} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export function ChecksTableSkeleton() {
    return (
        <div className="flex flex-col gap-3" aria-busy="true">
            {Array.from({ length: 8 }, (_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
            ))}
        </div>
    );
}
