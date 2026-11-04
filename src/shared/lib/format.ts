import { formatDistanceToNow } from "date-fns";

export function formatRelative(iso: string | null): string {
    if (!iso) return "Never";
    const date = new Date(iso);
    if (Date.now() - date.getTime() < 10_000) return "Just now";
    return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDateTime(iso: string | null): string | undefined {
    return iso ? new Date(iso).toLocaleString() : undefined;
}

export function formatResponseTime(ms: number | null): string {
    if (ms === null) return "-";
    return ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${ms} ms`;
}
