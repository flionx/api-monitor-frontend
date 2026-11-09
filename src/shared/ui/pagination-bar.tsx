import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { getPageItems } from "../lib/pagination";

interface PaginationBarProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}

export function PaginationBar({ page, pageSize, total, onPageChange }: PaginationBarProps) {
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    if (pageCount <= 1) return null;

    return (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
            <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Previous page"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
            >
                <ChevronLeft />
            </Button>
            {getPageItems(page, pageCount).map((item) =>
                typeof item === "number" ? (
                    <Button
                        key={item}
                        variant={item === page ? "secondary" : "ghost"}
                        size="icon-sm"
                        aria-label={`Page ${item}`}
                        aria-current={item === page ? "page" : undefined}
                        className="tabular-nums"
                        onClick={() => onPageChange(item)}
                    >
                        {item}
                    </Button>
                ) : (
                    <span
                        key={item}
                        aria-hidden
                        className="text-muted-foreground flex size-7 items-center justify-center"
                    >
                        <MoreHorizontal className="size-4" />
                    </span>
                )
            )}
            <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Next page"
                disabled={page >= pageCount}
                onClick={() => onPageChange(page + 1)}
            >
                <ChevronRight />
            </Button>
        </nav>
    );
}
