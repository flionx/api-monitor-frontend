import { Metadata } from "next";
import { CreateMonitorForm } from "@/features/monitors";

export const metadata: Metadata = { title: "Create Monitor" };

export default function CreateMonitorPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-xl font-semibold">Create Monitor</h1>
            <CreateMonitorForm />
        </div>
    );
}
