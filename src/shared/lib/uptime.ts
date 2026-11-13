export type UptimeTone = "danger" | "warning" | "success";

export function getUptimeTone(percent: number): UptimeTone {
    if (percent >= 99) return "success";
    if (percent >= 95) return "warning";
    return "danger";
}

export function formatPercent(percent: number): string {
    return `${percent.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`;
}
