import { Monitor } from "../api/types";

export type DisplayStatus = "up" | "down" | "pending" | "paused";

export function getDisplayStatus(monitor: Pick<Monitor, "isActive" | "status">): DisplayStatus {
    if (!monitor.isActive) return "paused";
    if (monitor.status === "unknown") return "pending";
    return monitor.status;
}
