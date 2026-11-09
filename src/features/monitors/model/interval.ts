import { parseInteger } from "@/shared/lib/numbers";

export const CUSTOM_INTERVAL = "custom";

export const INTERVAL_PRESETS = [
    { value: "30", label: "30 seconds" },
    { value: "60", label: "60 seconds" },
    { value: "300", label: "5 minutes" },
    { value: "900", label: "15 minutes" },
    { value: "3600", label: "1 hour" }
];

export const INTERVAL_UNITS = ["seconds", "minutes", "hours"] as const;
export type IntervalUnit = (typeof INTERVAL_UNITS)[number];

const UNIT_FACTOR: Record<IntervalUnit, number> = { seconds: 1, minutes: 60, hours: 3600 };

export const MIN_INTERVAL_SECONDS = 10;
export const MAX_INTERVAL_SECONDS = 86_400;

interface IntervalFields {
    intervalPreset: string;
    customInterval: string;
    customUnit: IntervalUnit;
}

export function getIntervalSeconds(fields: IntervalFields): number | null {
    if (fields.intervalPreset !== CUSTOM_INTERVAL) return Number(fields.intervalPreset);
    const amount = parseInteger(fields.customInterval);
    return amount === null ? null : amount * UNIT_FACTOR[fields.customUnit];
}
