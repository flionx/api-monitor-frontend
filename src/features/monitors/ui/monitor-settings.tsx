"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { useMonitor } from "../model/queries";
import { EditMonitorForm } from "./edit-monitor-form";
import { DeleteMonitorDialog } from "./delete-monitor-dialog";

export function MonitorSettings({ id }: { id: number }) {
    const router = useRouter();
    const { data: monitor } = useMonitor(id);
    const [deleteOpen, setDeleteOpen] = useState(false);
    if (!monitor) return null;

    return (
        <div className="flex max-w-6xl flex-col gap-10">
            <EditMonitorForm monitor={monitor} />
            <div className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold">Danger Zone</h2>
                <section className="border-destructive/30 flex flex-col gap-4 rounded-xl border p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-semibold">Delete monitor</h2>
                        <p className="text-muted-foreground text-xs">
                            Permanently removes the monitor, its check history and notification
                            links.
                        </p>
                    </div>
                    <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                        Delete monitor
                    </Button>
                </section>
            </div>

            <DeleteMonitorDialog
                monitor={monitor}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                onDeleted={() => router.replace("/monitors")}
            />
        </div>
    );
}
