import { Metadata } from "next";

export const metadata: Metadata = { title: "Monitor" };

export default function MonitorInfoPage() {
    return <p className="text-muted-foreground text-sm">Stats and charts will appear here</p>;
}
