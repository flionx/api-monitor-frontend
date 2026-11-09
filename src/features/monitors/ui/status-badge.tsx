import { DisplayStatus } from "@/shared/lib/status";
import { cn } from "cn";

const STATUS_STYLES: Record<DisplayStatus, { label: string; text: string; dot: string }> = {
    up: { label: "Up", text: "text-success", dot: "bg-success" },
    down: { label: "Down", text: "text-destructive", dot: "bg-destructive" },
    pending: { label: "Pending", text: "text-pending", dot: "bg-pending" },
    paused: { label: "Paused", text: "text-warning", dot: "bg-warning" }
};

export function StatusBadge({ status, className }: { status: DisplayStatus; className?: string }) {
    const style = STATUS_STYLES[status];

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium",
                style.text,
                className
            )}
        >
            <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden />
            {style.label}
        </span>
    );
}
