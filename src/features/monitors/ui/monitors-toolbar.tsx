"use client";

import { Search } from "lucide-react";
import { StatusTab } from "../model/filters";
import { AddMonitorButton } from "./add-monitor-button";
import { StatusFilter } from "./status-filter";
import { Input } from "@/shared/ui/input";

interface MonitorsToolbarProps {
    tab: StatusTab;
    onTabChange: (tab: StatusTab) => void;
    search: string;
    onSearchChange: (tab: string) => void;
}

export function MonitorsToolbar({
    tab,
    onTabChange,
    search,
    onSearchChange
}: MonitorsToolbarProps) {
    return (
        <div className="bg-card flex flex-wrap items-center gap-2 rounded-xl p-2">
            <AddMonitorButton />
            <StatusFilter value={tab} onChange={onTabChange} />
            <div className="relative w-full sm:ml-auto sm:w-50">
                <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
                <Input
                    className="pl-8"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search"
                    aria-label="Search monitors"
                    title="Enter Name or URL"
                    maxLength={100}
                />
            </div>
        </div>
    );
}
