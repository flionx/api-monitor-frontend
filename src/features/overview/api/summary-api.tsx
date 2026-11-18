import { api } from "@/shared/api/client";
import { Summary } from "@/shared/api/types";

export const summaryApi = {
    get: (signal: AbortSignal) => api.get<Summary>("/monitors/summary", undefined, signal)
};
