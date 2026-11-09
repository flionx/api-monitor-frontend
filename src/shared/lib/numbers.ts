export function parseWholeNumber(value: string): number | null {
    const trimmed = value.trim();
    return /^\d+$/.test(trimmed) ? Number(trimmed) : null;
}
