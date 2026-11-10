"use client";

import { useMonitor } from "../model/queries";
import { EditMonitorForm } from "./edit-monitor-form";

export function MonitorSettings({ id }: { id: number }) {
    const { data: monitor } = useMonitor(id);
    if (!monitor) return null;

    return <EditMonitorForm monitor={monitor} />;
}
