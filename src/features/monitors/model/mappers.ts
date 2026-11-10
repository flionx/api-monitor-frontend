import { Monitor, MonitorInput } from "@/shared/api/types";
import { MonitorFormValues } from "./schemas";
import { CUSTOM_INTERVAL, getIntervalSeconds, INTERVAL_PRESETS, splitInterval } from "./interval";
import { parseInteger } from "@/shared/lib/numbers";

export const DEFAULT_FORM_VALUES: MonitorFormValues = {
    name: "",
    url: "",
    intervalPreset: "60",
    customInterval: "",
    customUnit: "minutes",
    timeoutSeconds: "10",
    failureThreshold: "1",
    isActive: true
};

export function toMonitorInput(values: MonitorFormValues): MonitorInput {
    const intervalSeconds = getIntervalSeconds(values);
    const timeoutSeconds = parseInteger(values.timeoutSeconds);
    const failureThreshold = parseInteger(values.failureThreshold);

    if (intervalSeconds === null || timeoutSeconds === null || failureThreshold === null) {
        throw new Error("Form values must be validated before mapping");
    }

    return {
        name: values.name.trim(),
        url: values.url.trim(),
        intervalSeconds,
        timeoutMs: timeoutSeconds * 1000,
        failureThreshold,
        isActive: values.isActive
    };
}

export function monitorToFormValues(monitor: Monitor): MonitorFormValues {
    const preset = INTERVAL_PRESETS.find((item) => Number(item.value) === monitor.intervalSeconds);
    const { amount, unit } = splitInterval(monitor.intervalSeconds);
    const timeoutSeconds = Math.min(30, Math.max(1, Math.round(monitor.timeoutMs / 1000)));

    return {
        name: monitor.name,
        url: monitor.url,
        intervalPreset: preset ? preset.value : CUSTOM_INTERVAL,
        customInterval: preset ? "" : String(amount),
        customUnit: preset ? DEFAULT_FORM_VALUES.customUnit : unit,
        timeoutSeconds: String(timeoutSeconds),
        failureThreshold: String(monitor.failureThreshold),
        isActive: monitor.isActive
    };
}

export function getMonitorPatch(
    initial: MonitorFormValues,
    current: MonitorFormValues
): Partial<MonitorInput> {
    const before = toMonitorInput(initial);
    const after = toMonitorInput(current);
    const patch: Partial<MonitorInput> = {};

    for (const key of Object.keys(after) as (keyof MonitorInput)[]) {
        if (after[key] !== before[key]) Object.assign(patch, { [key]: after[key] });
    }

    return patch;
}
