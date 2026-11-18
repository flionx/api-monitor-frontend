import { Stats } from "@/shared/api/types";
import { formatResponseTime } from "@/shared/lib/format";
import { formatPercent, getUptimeTone, UptimeTone } from "@/shared/lib/uptime";
import { cn } from "cn";

const TONE_TEXT: Record<UptimeTone, string> = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive"
};

interface MetricCardProps {
    label: string;
    value: string;
    hint: string;
    valueClassName?: string;
    title?: string;
}

function MetricCard({ label, value, hint, valueClassName, title }: MetricCardProps) {
    return (
        <div
            className="bg-card border-border/50 flex flex-col gap-2 rounded-xl border p-4"
            title={title}
        >
            <span className="text-muted-foreground text-sm">{label}</span>
            <span className={cn("text-2xl font-semibold tabular-nums", valueClassName)}>
                {value}
            </span>
            <span className="text-muted-foreground truncate text-xs tabular-nums">{hint}</span>
        </div>
    );
}

export function StatsCards({ stats }: { stats: Stats }) {
    const { uptimePercent, totalChecks, failedChecks, responseTime } = stats;
    const tone = uptimePercent === null ? null : getUptimeTone(uptimePercent);
    const timesNote = "Calculated from successful chesks only";

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard
                label="Uptime"
                value={uptimePercent === null ? "-" : formatPercent(uptimePercent)}
                hint={
                    totalChecks === 0
                        ? "No checks in this period"
                        : `${failedChecks.toLocaleString("en-US")} failed checks`
                }
                valueClassName={tone ? TONE_TEXT[tone] : "text-muted-foreground"}
            />
            <MetricCard
                label="Avg response"
                value={formatResponseTime(responseTime.avgMs)}
                hint={`Min ${formatResponseTime(responseTime.minMs)} | Max ${formatResponseTime(responseTime.maxMs)}`}
                title={timesNote}
            />
            <MetricCard
                label="P95 response"
                value={formatResponseTime(responseTime.p95Ms)}
                hint="95% of checks are faster"
                title={timesNote}
            />
            <MetricCard
                label="Checks"
                value={totalChecks.toLocaleString("en-US")}
                hint={`${(totalChecks - failedChecks).toLocaleString("en-US")} succeeded`}
            />
        </div>
    );
}
