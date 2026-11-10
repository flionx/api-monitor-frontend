import Link from "next/link";
import { ExternalLink, MoreHorizontal, Pencil } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";
import { Monitor } from "@/shared/api/types";
import { Button } from "@/shared/ui/button";

export function MonitorRowActions({ monitor }: { monitor: Monitor }) {
    return (
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
