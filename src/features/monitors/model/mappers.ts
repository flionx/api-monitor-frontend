import { MonitorInput } from "@/shared/api/types";
import { MonitorFormValues } from "./schema";
import { getIntervalSeconds } from "./interval";
import { parseWholeNumber } from "@/shared/lib/numbers";

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
    const timeoutSeconds = parseWholeNumber(values.timeoutSeconds);
    const failureThreshold = parseWholeNumber(values.failureThreshold);

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
