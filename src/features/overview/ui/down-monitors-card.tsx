import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Summary } from "@/shared/api/types";
import { formatDateTime, formatRelative } from "@/shared/lib/format";

interface DownMonitorsCardProps {
    monitors: Summary["downMonitors"];
    totalDown: number;
}

export default function DownMonitorsCard({ monitors, totalDown }: DownMonitorsCardProps) {
    const hiddenCount = totalDown - monitors.length;

    return (
        <section className="bg-card flex h-full flex-col gap-2 rounded-xl p-4">
            <div className="flex items-center justify-between gap-2">
                <h2 className="text-muted-foreground text-sm">Down monitors</h2>
                {totalDown > 0 && (
                    <Link href="/monitors?status=down" className="text-xs hover:underline">
                        View all
                    </Link>
                )}
            </div>

            {monitors.length === 0 ? (
                <div className="text-muted-foreground flex items-center gap-2 py-6 text-sm">
                    <CircleCheck className="text-success size-5" />
                    All systems operational
                </div>
            ) : (
                <ul className="flex flex-col">
                    {monitors.map((monitor) => (
                        <li key={monitor.id}>
                            <Link
                                href={`/monitors/${monitor.id}`}
                                className="hover:bg-secondary -mx-2 flex items-start gap-3 rounded-lg px-2 py-2 transition-colors"
                            >
                                <span
                                    className="bg-destructive mt-1.5 size-1.5 shrink-0 rounded-full"
                                    aria-hidden
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">{monitor.name}</p>
                                    <p className="text-muted-foreground truncate text-xs">
                                        {monitor.url}
                                    </p>
                                    {monitor.lastErrorMessage && (
                                        <p className="text-destructive truncate text-xs">
                                            {monitor.lastErrorMessage}
                                        </p>
                                    )}
                                </div>
                                <span
                                    className="text-muted-foreground shrink-0 text-xs"
                                    title={formatDateTime(monitor.lastCheckedAt)}
                                >
                                    {formatRelative(monitor.lastCheckedAt)}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {hiddenCount > 0 && (
                <Link
                    href="/monitors?status=down"
                    className="text-muted-foreground hover:text-foreground pt-1 text-xs"
                >
                    and {hiddenCount} more
                </Link>
            )}
        </section>
    );
}
