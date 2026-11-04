"use client";

import { useServerStatus } from "@/shared/stores/server-status";
import { Loader } from "lucide-react";

export function ServerWakingBanner() {
    const isWaking = useServerStatus((s) => s.isWaking);
    if (!isWaking) return;

    return (
        <div className="border-warning/30 bg-warning/10 text-warning flex items-center gap-2 border-b px-6 py-2 text-sm">
            <Loader className="animation-duration-1500 size-5 animate-spin" />
            Server is waking up, this can take up to a minute...
        </div>
    );
}
