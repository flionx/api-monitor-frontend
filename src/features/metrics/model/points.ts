import { MetricsRange } from "@/shared/api/types";

const RANGE_SECONDS: Record<MetricsRange, number> = {
    "1h": 3_600,
    "24h": 86_400,
    "7d": 604_800,
    "30d": 2_592_000
};

const WORKER_TICK_SECONDS = 10;
const MIN_POINTS = 10;
const MAX_POINTS = 60;

export function getChartPoints(range: MetricsRange, intervalSeconds: number): number {
    const minBucketSeconds = (intervalSeconds + WORKER_TICK_SECONDS) * 2;
    const points = Math.floor(RANGE_SECONDS[range] / minBucketSeconds);
    return Math.min(MAX_POINTS, Math.max(MIN_POINTS, points));
}
