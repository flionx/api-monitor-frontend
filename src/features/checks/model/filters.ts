import { CheckErrorType } from "@/shared/api/types";
import { parseAsStringLiteral } from "nuqs";

export const CHECK_FILTERS = ["all", "up", "down"] as const;
export type CheckFilter = (typeof CHECK_FILTERS)[number];

export const CHECKS_FILTER_LABELS: Record<CheckFilter, string> = {
    all: "All results",
    up: "Up",
    down: "Down"
};

export const CHECKS_PAGE_SIZE = 25;

export const checkFilterParser = parseAsStringLiteral(CHECK_FILTERS).withDefault("all");

export function toIsUp(filter: CheckFilter): boolean | undefined {
    return filter === "all" ? undefined : filter === "up";
}

export const ERROR_TYPE_LABELS: Record<CheckErrorType, string> = {
    timeout: "Timeout",
    server_error: "Server error",
    client_error: "Client error",
    connection: "Connection",
    unknown: "Unknown"
};
