"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Monitor } from "@/shared/api/types";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/shared/ui/dialog";
import { DEFAULT_FORM_VALUES, toMonitorInput } from "../model/mappers";
import { useCreateMonitor } from "../model/queries";
import { MonitorForm } from "./monitor-form";

export function CreateMonitorForm() {
    const router = useRouter();
    const createMonitor = useCreateMonitor();
    const [created, setCreated] = useState<Monitor | null>(null);

    const goTo = (path: string) => router.push(path);

    return (
        <>
            <MonitorForm
                defaultValues={DEFAULT_FORM_VALUES}
                submitLabel="Create Monitor"
                pendingLabel="Creating…"
                cancelHref="/monitors"
                onSubmit={async (values) => {
                    setCreated(await createMonitor.mutateAsync(toMonitorInput(values)));
                }}
            />
            <Dialog
                open={created !== null}
                onOpenChange={(open) => {
                    if (!open && created) goTo(`/monitors/${created.id}`);
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Monitor created</DialogTitle>
                        <DialogDescription>
                            <strong>{created?.name}</strong> will be checked within about 10
                            seconds. Set up notifications now to get alerts in Telegram or Discord
                            when it goes down?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => created && goTo(`/monitors/${created.id}`)}
                        >
                            Not now
                        </Button>
                        <Button
                            onClick={() => created && goTo(`/monitors/${created.id}/notifiers`)}
                        >
                            Set up notifications
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
