"use client";

import { buttonVariants } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function AddMonitorButton({ label = "Add monitor" }: { label?: string }) {
    return (
        <Link href="/monitors/new" className={buttonVariants()}>
            <Plus />
            {label}
        </Link>
    );
}
