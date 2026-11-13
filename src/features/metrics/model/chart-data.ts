import { ChartPoint } from "@/shared/api/types";

export interface ChartDatum {
    timestamp: string;
    avg: number | null;
    max: number | null;
    total: number;
    failed: number;
    uptime: number | null;
    isolated: boolean;
}

export function toChartData(points: ChartPoint[]): ChartDatum[] {
    return points.map((point, index) => {
        const prev = points[index - 1]?.avgResponseTimeMs ?? null;
        const next = points[index + 1]?.avgResponseTimeMs ?? null;

        return {
            timestamp: point.timestamp,
            avg: point.avgResponseTimeMs,
            max: point.maxResponseTimeMs,
            total: point.totalChecks,
            failed: point.failedChecks,
            uptime: point.uptimePercent,
            isolated: point.avgResponseTimeMs !== null && prev === null && next === null
        };
    });
}

export function hasResponseData(points: ChartPoint[]): boolean {
    return points.some((point) => point.avgResponseTimeMs !== null);
}
