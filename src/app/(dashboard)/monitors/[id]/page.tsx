import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MonitorInfo } from "@/features/metrics";
import { parseId } from "@/shared/lib/numbers";

export const metadata: Metadata = { title: "Monitor" };

export default async function MonitorInfoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const monitorId = parseId(id);
    if (monitorId === null) notFound();

    return <MonitorInfo id={monitorId} />;
}
