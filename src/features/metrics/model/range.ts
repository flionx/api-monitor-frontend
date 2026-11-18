import { MetricsRange } from "@/shared/api/types";
import { parseAsStringLiteral } from "nuqs";

export const METRICS_RANGES = ["1h", "24h", "7d", "30d"] as const satisfies readonly MetricsRange[];

export const RANGE_LABELS: Record<MetricsRange, string> = {
    "1h": "Last hour",
    "24h": "Last 24 hours",
    "7d": "Last 7 days",
    "30d": "Last 30 days"
};

export const rangeParser = parseAsStringLiteral(METRICS_RANGES).withDefault("24h");

export function getAxisFormat(range: MetricsRange): string {
    return range === "1h" || range === "24h" ? "HH:mm" : "MMM d";
}
