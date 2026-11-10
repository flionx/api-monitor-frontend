"use client";

import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
    { label: "Info", path: "" },
    { label: "Notifiers", path: "/notifiers" },
    { label: "Checks", path: "/checks" },
    { label: "Settings", path: "/settings" }
] as const;

export default function MonitorTabs({ id }: { id: number }) {
    const pathname = usePathname();

    return (
        <nav
            aria-label="Monitor sections"
            className="flex gap-1 overflow-x-auto shadow-[inset_0_-1px_0_var(--border)]"
        >
            {TABS.map((tab) => {
                const href = `/monitors/${id}/${tab.path}`;
                const isActive = pathname === href;

                return (
                    <Link
                        key={tab.label}
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                            "border-b-2 px-3 py-2 text-sm whitespace-nowrap transition-colors",
                            isActive
                                ? "border-primary text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground border-transparent"
                        )}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </nav>
    );
}
