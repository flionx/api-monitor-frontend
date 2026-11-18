import { OverviewDashboard } from "@/features/overview";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
    return (
        <div className="flex h-full flex-col gap-6">
            <h1 className="text-xl font-semibold">Overview</h1>
            <OverviewDashboard />
        </div>
    );
}
