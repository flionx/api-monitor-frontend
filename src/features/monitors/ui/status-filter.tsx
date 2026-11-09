"use client";

import { Check, ListFilter, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";
import { STATUS_TAB_LABELS, STATUS_TABS, StatusTab } from "../model/filters";
import { Button } from "@/shared/ui/button";

interface StatusFilterProps {
    value: StatusTab;
    onChange: (value: StatusTab) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
    const isFiltered = value !== "all";

    return (
        <div className="flex items-center gap-1">
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                    <ListFilter />
                    {isFiltered ? STATUS_TAB_LABELS[value] : "Filter"}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {STATUS_TABS.map((tab) => (
                        <DropdownMenuItem key={tab} onClick={() => onChange(tab)}>
                            {STATUS_TAB_LABELS[tab]}
                            {tab === value && <Check className="ml-auto" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            {isFiltered && (
                <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Clear filter"
                    onClick={() => onChange("all")}
                >
                    <X />
                </Button>
            )}
        </div>
    );
}
