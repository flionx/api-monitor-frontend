import { MonitorStatus } from "@/shared/api/types";

export const STATUS_TABS = ["all", "up", "down", "pending", "paused"] as const;
export type StatusTab = (typeof STATUS_TABS)[number];

export const STATUS_TAB_LABELS: Record<StatusTab, string> = {
    all: "All",
    up: "Up",
    down: "Down",
    pending: "Pending",
    paused: "Paused"
};

export const PAGE_SIZE = 20;

export type MonitorListQuery = {
    limit: number;
    offset: number;
    q?: string;
    status?: MonitorStatus;
    isActive?: boolean;
};

export function tabToFilters(tab: StatusTab): Pick<MonitorListQuery, "status" | "isActive"> {
    switch (tab) {
        case "up":
            return { status: "up", isActive: true };
        case "down":
            return { status: "down", isActive: true };
        case "pending":
            return { status: "unknown", isActive: true };
        case "paused":
            return { isActive: true };
        default:
            return {};
    }
}

export function toListQuery(params: { tab: StatusTab; q: string; page: number }): MonitorListQuery {
    return {
        limit: PAGE_SIZE,
        offset: (params.page - 1) * PAGE_SIZE,
        q: params.q.trim() || undefined,
        ...tabToFilters(params.tab)
    };
}
