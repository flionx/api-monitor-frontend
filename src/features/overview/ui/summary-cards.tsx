import { CircleCheck, CircleX, Clock, Pause, Server } from "lucide-react";
import { Summary } from "@/shared/api/types";
import { StatCard } from "./stat-card";

export function SummaryCards({ counts }: { counts: Summary["counts"] }) {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            <StatCard
                label="Monitors"
                value={counts.total}
                icon={Server}
                href="/monitors"
                tone="neutral"
            />
            <StatCard
                label="Up"
                value={counts.up}
                icon={CircleCheck}
                href="/monitors?status=up"
                tone="success"
            />
            <StatCard
                label="Down"
                value={counts.down}
                icon={CircleX}
                href="/monitors?status=down"
                tone="danger"
            />
            <StatCard
                label="Pending"
                value={counts.pending}
                icon={Clock}
                href="/monitors?status=pending"
                tone="pending"
            />
            <StatCard
                label="Paused"
                value={counts.paused}
                icon={Pause}
                href="/monitors?status=paused"
                tone="warning"
            />
        </div>
    );
}
