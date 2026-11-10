"use client";

import Link from "next/link";
import { ExternalLink, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";
import { Monitor } from "@/shared/api/types";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import { DeleteMonitorDialog } from "./delete-monitor-dialog";

export function MonitorRowActions({ monitor }: { monitor: Monitor }) {
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="cursor-pointer"
                    render={<Button variant="ghost" size="icon-sm" aria-label="Monitor actions" />}
                >
                    <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        render={<a href={monitor.url} target="_blank" rel="noopener noreferrer" />}
                    >
                        <ExternalLink />
                        Visit
                    </DropdownMenuItem>
                    <DropdownMenuItem render={<Link href={`/monitors/${monitor.id}/settings`} />}>
                        <Pencil />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => setDeleteOpen(true)}>
                        <Trash2 />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteMonitorDialog monitor={monitor} open={deleteOpen} onOpenChange={setDeleteOpen} />
        </>
    );
}
