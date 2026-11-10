import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { MonitorShell } from "@/features/monitors";
import { parseId } from "@/shared/lib/numbers";

export default async function MonitorLayout({
    children,
    params
}: {
    children: ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const monitorId = parseId(id);
    if (monitorId === null) return notFound();

    return <MonitorShell id={monitorId}>{children}</MonitorShell>;
}
