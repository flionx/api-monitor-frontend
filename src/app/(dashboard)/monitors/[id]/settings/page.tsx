import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MonitorSettings } from "@/features/monitors";
import { parseId } from "@/shared/lib/numbers";

export const metadata: Metadata = { title: "Monitor settings" };

export default async function MonitorSettingsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const monitorId = parseId(id);
    if (monitorId === null) notFound();

    return <MonitorSettings id={monitorId} />;
}
