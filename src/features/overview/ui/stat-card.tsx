import Link from "next/link";
import { cn } from "cn";
import { LucideIcon } from "lucide-react";

export type StatTone = "neutral" | "success" | "danger" | "pending" | "warning";

const ICON_STYLES: Record<StatTone, string> = {
    neutral: "bg-primary/15",
    success: "bg-success/15 text-success",
    danger: "bg-destructive/15 text-destructive",
    pending: "bg-pending/15 text-pending",
    warning: "bg-warning/15 text-warning"
};

interface StatCardProps {
    label: string;
    value: number;
    icon: LucideIcon;
    href: string;
    tone: StatTone;
}

export function StatCard({ label, value, icon: Icon, href, tone }: StatCardProps) {
    const isAlert = tone === "danger" && value > 0;

    return (
        <Link
            href={href}
            className="bg-card hover:bg-secondary focus-visible:ring-ring flex flex-col gap-3 rounded-xl p-4 transition-colors outline-none focus-visible:ring-2"
        >
            <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground text-sm">{label}</span>
                <span
                    className={cn(
                        "flex size-8 items-center justify-center rounded-full",
                        ICON_STYLES[tone]
                    )}
                >
                    <Icon className="size-4" />
                </span>
            </div>
            <span
                className={cn("text-3xl font-semibold tabular-nums", isAlert && "text-destructive")}
            >
                {value}
            </span>
        </Link>
    );
}
