import z from "zod";
import { parseWholeNumber } from "@/shared/lib/numbers";
import {
    CUSTOM_INTERVAL,
    getIntervalSeconds,
    INTERVAL_UNITS,
    MAX_INTERVAL_SECONDS,
    MIN_INTERVAL_SECONDS
} from "./interval";

function isHttpUrl(value: string): boolean {
    try {
        const { protocol } = new URL(value);
        return protocol === "http:" || protocol === "https:";
    } catch {
        return false;
    }
}

function wholeNumber(label: string, min: number, max: number) {
    return z
        .string()
        .trim()
        .min(1, `${label} is required`)
        .refine((value) => parseWholeNumber(value) !== null, "Enter a whole number")
        .refine((value) => {
            const number = parseWholeNumber(value);
            return number !== null && number >= min && number <= max;
        }, `${label} must be between ${min} and ${max}`);
}

export const monitorFormSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Name is required")
            .max(100, "Name must be at most 100 characters"),
        url: z
            .string()
            .trim()
            .min(1, "URL is required")
            .max(2048, "URL must be at most 2048 characters")
            .refine(isHttpUrl, "Enter a valid http(s) URL"),
        intervalPreset: z.string(),
        customInterval: z.string(),
        customUnit: z.enum(INTERVAL_UNITS),
        timeoutSeconds: wholeNumber("Timeout", 1, 30),
        failureThreshold: wholeNumber("Failure threshold", 1, 30),
        isActive: z.boolean()
    })
    .superRefine((values, ctx) => {
        if (values.intervalPreset !== CUSTOM_INTERVAL) return;

        const seconds = getIntervalSeconds(values);
        const message =
            seconds === null
                ? "Enter a whole number"
                : seconds < MIN_INTERVAL_SECONDS || seconds > MAX_INTERVAL_SECONDS
                  ? "Interval must be between 10 seconds and 24 hours"
                  : null;

        if (message) ctx.addIssue({ code: "custom", message, path: ["customInterval"] });
    });

export type MonitorFormValues = z.infer<typeof monitorFormSchema>;
