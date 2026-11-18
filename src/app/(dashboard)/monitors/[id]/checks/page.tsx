import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MonitorChecks } from "@/features/checks";
import { parseId } from "@/shared/lib/numbers";

export const metadata: Metadata = { title: "Monitor checks" };

export default async function MonitorChecksPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const monitorId = parseId(id);
    if (monitorId === null) notFound();

    return <MonitorChecks id={monitorId} />;
}
