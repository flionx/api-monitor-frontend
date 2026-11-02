"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser } from "lucide-react";
import { NAV_ITEMS } from "@/shared/config/navigation";
import { isActivePath } from "@/shared/lib/breadcrumbs";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/shared/ui/sidebar";
import { AccountMenu } from "@/features/auth";

export function AppSidebar() {
    const pathname = usePathname();
    const { setOpenMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <AccountMenu />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {NAV_ITEMS.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={isActivePath(pathname, item.href)}
                                        render={
                                            <Link
                                                href={item.href}
                                                onClick={() => setOpenMobile(false)}
                                            />
                                        }
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
