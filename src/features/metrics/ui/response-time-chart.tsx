"use client";

import { useMemo } from "react";
import {
    Area,
    ComposedChart,
    CartesianGrid,
    DotProps,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { format } from "date-fns";
import { ChartDatum, hasResponseData, toChartData } from "../model/chart-data";
import { getAxisFormat } from "../model/range";
import { ChartTooltip } from "./chart-tooltip";
import { Chart, Stats } from "@/shared/api/types";

const TICK = { fill: "var(--muted-foreground)", fontSize: 12 };

function IsolatedDot({ cx, cy, payload }: { cx?: number; cy?: number; payload?: ChartDatum }) {
    if (!payload?.isolated || typeof cx !== "number" || typeof cy !== "number") return null;
    return <circle cx={cx} cy={cy} r={3} fill="var(--success)" />;
}

function FailureDot({ cy, cx }: DotProps) {
    if (typeof cx !== "number" || typeof cy !== "number") return null;
    return (
        <circle
            cx={cx}
            cy={cy}
            r={4}
            fill="var(--destructive)"
            stroke="var(--card)"
            strokeWidth={2}
        />
    );
}

function formatAxisMs(value: number): string {
    return value >= 1000 ? `${Number((value / 1000).toFixed(1))}s` : `${value}ms`;
}

interface ResponseTimeChartProps {
    chart: Chart;
    stats: Stats;
}
export function ResponseTimeChart({ chart, stats }: ResponseTimeChartProps) {
    const data = useMemo(() => toChartData(chart.points), [chart.points]);
    const axisFormat = getAxisFormat(chart.range);
    const hasData = hasResponseData(chart.points);

    return (
        <section className="bg-card border-border/50 flex flex-col gap-4 rounded-xl border p-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <h2 className="text-sm font-semibold">Response time</h2>
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <span className="bg-success size-1.5 rounded-full" aria-hidden />
                    Success {stats.totalChecks - stats.failedChecks}
                </span>
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <span className="bg-destructive size-1.5 rounded-full" aria-hidden />
                    Failed {stats.failedChecks}
                </span>
            </div>

            <div className="relative h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
                        <defs>
                            <linearGradient id="response-time-fill" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    style={{ stopColor: "var(--success)", stopOpacity: 0.35 }}
                                />
                                <stop
                                    offset="100%"
                                    style={{ stopColor: "var(--success)", stopOpacity: 0 }}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            vertical={false}
                            stroke="var(--border)"
                            strokeDasharray="3 3"
                        />
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value: string) => format(new Date(value), axisFormat)}
                            tick={TICK}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={40}
                        />
                        <YAxis
                            tickFormatter={formatAxisMs}
                            tick={TICK}
                            tickLine={false}
                            axisLine={false}
                            width={48}
                            domain={[0, (dataMax: number) => Math.max(dataMax, 100)]}
                        />
                        <Tooltip
                            content={<ChartTooltip bucketSeconds={chart.bucketSeconds} />}
                            cursor={{ stroke: "var(--border)" }}
                        />
                        <Area
                            dataKey="avg"
                            type="monotone"
                            stroke="var(--success)"
                            strokeWidth={2}
                            fill="url(#response-time-fill)"
                            connectNulls={false}
                            dot={<IsolatedDot />}
                            activeDot={{ r: 4 }}
                            isAnimationActive={false}
                        />
                        <Line
                            dataKey="marker"
                            stroke="none"
                            dot={<FailureDot />}
                            connectNulls={false}
                            isAnimationActive={false}
                            legendType="none"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
                {!hasData && (
                    <div className="text-muted-foreground absolute inset-0 flex items-center justify-center text-sm">
                        No checks in this period
                    </div>
                )}
            </div>
        </section>
    );
}
