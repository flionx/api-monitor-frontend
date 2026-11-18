import { format } from "date-fns";
import { ChartDatum } from "../model/chart-data";
import { formatBucketSize, formatResponseTime } from "@/shared/lib/format";
import { formatPercent } from "@/shared/lib/uptime";

interface ChartTooltipProps {
    bucketSeconds: number;
    active?: boolean;
    payload?: Array<{ payload: ChartDatum }>;
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-6">
            <span className="text-muted-foreground">{label}</span>
            <span className="tabular-nums">{value}</span>
        </div>
    );
}

export function ChartTooltip({ bucketSeconds, active, payload }: ChartTooltipProps) {
    const datum = payload?.[0]?.payload;
    if (!active || !datum) return null;

    return (
        <div className="bg-popover border-border flex min-w-44 flex-col gap-1 rounded-lg border p-3 text-xs shadow-lg">
            <p className="font-medium">{format(new Date(datum.timestamp), "MMM d, HH:mm")}</p>
            <p className="text-muted-foreground mb-1">Bucket: {formatBucketSize(bucketSeconds)}</p>
            {datum.total > 0 && datum.avg === null && (
                <p className="text-destructive font-medium">All checks failed</p>
            )}
            {datum.total === 0 ? (
                <p className="text-muted-foreground">No checks</p>
            ) : (
                <>
                    <Row label="Avg" value={formatResponseTime(datum.avg)} />
                    <Row label="Max" value={formatResponseTime(datum.max)} />
                    <Row label="Checks" value={String(datum.total)} />
                    <Row label="Failed" value={String(datum.failed)} />
                    <Row
                        label="Uptime"
                        value={datum.uptime === null ? "-" : formatPercent(datum.uptime)}
                    />
                </>
            )}
        </div>
    );
}
