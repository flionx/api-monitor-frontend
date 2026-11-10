export function parseInteger(value: string): number | null {
    const trimmed = value.trim();
    return /^-?\d+$/.test(trimmed) ? Number(trimmed) : null;
}

export function parseId(value: string): number | null {
    const number = parseInteger(value);
    return number !== null && number > 0 ? number : null;
}
