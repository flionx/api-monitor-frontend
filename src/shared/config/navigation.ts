import { Bell, LayoutDashboard, LucideIcon, Server } from "lucide-react";

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
    { title: "Overview", href: "/overview", icon: LayoutDashboard },
    { title: "Monitors", href: "/monitors", icon: Server },
    { title: "Notifiers", href: "/notifiers", icon: Bell }
];
