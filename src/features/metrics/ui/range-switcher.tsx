"use client";

import { cn } from "cn";
import { MetricsRange } from "@/shared/api/types";
import { METRICS_RANGES, RANGE_LABELS } from "../model/range";

interface RangeSwitcher {
    value: MetricsRange;
    onChange: (value: MetricsRange) => void;
}

export function RangeSwitcher({ value, onChange }: RangeSwitcher) {
    return (
        <div role="group" aria-label="Time range" className="bg-card flex gap-1 rounded-lg p-1">
            {METRICS_RANGES.map((range) => (
                <button
                    key={range}
                    type="button"
                    aria-pressed={range === value}
                    aria-label={RANGE_LABELS[range]}
                    onClick={() => onChange(range)}
                    className={cn(
                        "rounded-md px-3 py-1 text-sm transition-colors",
                        range === value
                            ? "bg-secondary text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {range}
                </button>
            ))}
        </div>
    );
}
