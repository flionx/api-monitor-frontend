import { Metadata } from "next";
import { MonitorsList } from "@/features/monitors";

export const metadata: Metadata = { title: "Monitors" };

export default function MonitorsPage() {
    return (
        <div className="flex h-full flex-col gap-6">
            <h1 className="text-xl font-semibold">Monitors List</h1>
            <MonitorsList />
        </div>
    );
}
