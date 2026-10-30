import { Bell, ChartPie, LucideIcon, Server } from "lucide-react";

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
    { title: "Overview", href: "/overview", icon: ChartPie },
    { title: "Monitors", href: "/monitors", icon: Server },
    { title: "Notifiers", href: "/notifiers", icon: Bell }
];

export const GITHUB_URL = "https://github.com/flionx/api-monitor-frontend";
