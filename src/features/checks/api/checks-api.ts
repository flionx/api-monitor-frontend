import { api } from "@/shared/api/client";
import { ChecksPage } from "@/shared/api/types";

export const checksApi = {
    list: (
        id: number,
        query: { limit: number; cursor?: number; isUp?: boolean },
        signal?: AbortSignal
    ) => api.get<ChecksPage>(`/monitors/${id}/checks`, query, signal)
};
