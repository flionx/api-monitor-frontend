import { cn } from "cn";
import { Summary } from "@/shared/api/types";
import { formatPercent, getUptimeTone, UptimeTone } from "@/shared/lib/uptime";

const TEXT: Record<UptimeTone, string> = {
    danger: "text-destructive",
    warning: "text-warning",
    success: "text-success"
};

const BAR: Record<UptimeTone, string> = {
    danger: "bg-destructive",
    warning: "bg-warning",
    success: "bg-success"
};

export default function UptimeCard({ uptime }: { uptime: Summary["uptime24h"] }) {
    const { percent, totalChecks, failedChecks } = uptime;
    const tone = percent === null ? null : getUptimeTone(percent);

    return (
        <section className="bg-card flex flex-col gap-3 rounded-xl p-6">
            <h2 className="text-muted-foreground text-sm">Uptime, last 24 hours</h2>
            {percent === null || tone === null ? (
                <>
                    <span className="text-muted-foreground text-3xl font-semibold">-</span>
                    <p className="text-muted-foreground text-sm">
                        No data yet. The first checks run within about 10 seconds
                    </p>
                </>
            ) : (
                <>
                    <span className={cn("text-3xl font-semibold tabular-nums", TEXT[tone])}>
                        {formatPercent(percent)}
                    </span>
                    <div
                        role="progressbar"
                        aria-label="Uptime"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={percent}
                        className="bg-secondary h-1.5 overflow-hidden rounded-full"
                    >
                        <div
                            className={cn("h-full rounded-full", BAR[tone])}
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                    <p className="text-muted-foreground text-xs tabular-nums">
                        {failedChecks.toLocaleString("en-US")} failed of{" "}
                        {totalChecks.toLocaleString("en-US")} checks
                    </p>
                </>
            )}
        </section>
    );
}
