"use client";

import { useUpdateMonitor } from "../model/queries";
import { Monitor } from "@/shared/api/types";
import { getMonitorPatch, monitorToFormValues } from "../model/mappers";
import { MonitorForm } from "./monitor-form";
import { toast } from "sonner";

export function EditMonitorForm({ monitor }: { monitor: Monitor }) {
    const updateMonitor = useUpdateMonitor(monitor.id);
    const initial = monitorToFormValues(monitor);
    return (
        <MonitorForm
            key={JSON.stringify(initial)}
            defaultValues={initial}
            submitLabel="Save changes"
            pendingLabel="Saving..."
            cancelHref={`/monitors/${monitor.id}`}
            requireChanges
            onSubmit={async (values) => {
                const patch = getMonitorPatch(initial, values);
                if (Object.keys(patch).length === 0) {
                    toast.info("No changes to save");
                    return;
                }

                await updateMonitor.mutateAsync(patch);
                toast.success("Monitor saved");
            }}
        />
    );
}
