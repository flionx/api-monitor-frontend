"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/shared/ui/sidebar";
import { useLogout, useMe } from "../model/queries";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";
import { CircleUser, LogOut, MoreHorizontal } from "lucide-react";

export const AccountMenu = () => {
    const { data: user } = useMe();
    const logout = useLogout();
    const { isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger render={<SidebarMenuButton />}>
                        <CircleUser />
                        <span className="truncate">{user?.email}</span>
                        <MoreHorizontal className="ml-auto" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side={isMobile ? "bottom" : "right"}
                        align="start"
                        className="min-w-56"
                    >
                        <div className="text-muted-foreground truncate px-2 py-1.5 text-xs">
                            {user?.email}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            disabled={logout.isPending}
                            onClick={() => logout.mutate()}
                        >
                            <LogOut />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};
