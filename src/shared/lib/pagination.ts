export type PageItem = number | "ellipsis-start" | "ellipsis-end";

function range(from: number, to: number) {
    return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

export function getPageItems(page: number, pageCount: number): PageItem[] {
    if (pageCount <= 7) return range(1, pageCount);
    if (page <= 4) return [...range(1, 5), "ellipsis-end", pageCount];
    if (page >= pageCount - 3) return [1, "ellipsis-start", ...range(pageCount - 4, pageCount)];
    return [1, "ellipsis-start", page - 1, page, page + 1, "ellipsis-end", pageCount];
}
