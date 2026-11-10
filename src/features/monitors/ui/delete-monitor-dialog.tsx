"use client";

import { Monitor } from "@/shared/api/types";
import { useDeleteMonitor } from "../model/queries";
import { toast } from "sonner";
import { isApiError } from "@/shared/api/errors";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";

interface DeleteMonitorDialogProps {
    monitor: Pick<Monitor, "id" | "name">;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDeleted?: () => void;
}
export function DeleteMonitorDialog({
    monitor,
    open,
    onOpenChange,
    onDeleted
}: DeleteMonitorDialogProps) {
    const deleteMonitor = useDeleteMonitor();

    const handleDelete = () => {
        deleteMonitor.mutate(monitor.id, {
            onSuccess: () => {
                toast.success("Monitor deleted");
                onOpenChange(false);
                onDeleted?.();
            },
            onError: (error) =>
                toast.error(isApiError(error) ? error.message : "Network error. Please try again")
        });
    };
    return (
        <Dialog open={open} onOpenChange={(next) => !deleteMonitor.isPending && onOpenChange(next)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete monitor?</DialogTitle>
                    <DialogDescription>
                        <strong>{monitor.name}</strong> will be removed together with its check
                        history and notification links. This cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        disabled={deleteMonitor.isPending}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        disabled={deleteMonitor.isPending}
                        onClick={handleDelete}
                    >
                        {deleteMonitor.isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
