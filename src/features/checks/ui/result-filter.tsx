import { CHECK_FILTERS, CheckFilter, CHECKS_FILTER_LABELS } from "../model/filters";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
import { Check, ListFilter, X } from "lucide-react";

interface ResultFilterProps {
    value: CheckFilter;
    onChange: (value: CheckFilter) => void;
}

export function ResultFilter({ value, onChange }: ResultFilterProps) {
    return (
        <div className="flex items-center gap-1">
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                    <ListFilter />
                    {CHECKS_FILTER_LABELS[value]}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {CHECK_FILTERS.map((item) => (
                        <DropdownMenuItem key={item} onClick={() => onChange(item)}>
                            {CHECKS_FILTER_LABELS[item]}
                            {item === value && <Check className="ml-auto" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            {value !== "all" && (
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
