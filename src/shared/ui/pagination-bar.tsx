import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface PaginationBarProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}

export function PaginationBar({ page, pageSize, total, onPageChange }: PaginationBarProps) {
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    if (pageCount <= 1) return null;

    const from = (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);

    return (
        <div className="text-muted-foreground flex items-center justify-between gap-2 text-xs">
            <span className="tabular-nums">
                {from}-{to} of {total}
            </span>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Previous page"
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    <ChevronLeft />
                </Button>
                <span className="tabular-nums">
                    {page} / {pageCount}
                </span>
                <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Next page"
                    disabled={page >= pageCount}
                    onClick={() => onPageChange(page + 1)}
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
    );
}
