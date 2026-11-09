import { SessionGuard } from "@/features/auth";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppFooter } from "@/widgets/app-footer";
import { AppHeader } from "@/widgets/app-header";
import { AppSidebar } from "@/widgets/app-sidebar";
import { ServerWakingBanner } from "@/widgets/server-waking-banner";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

    return (
        <SessionGuard>
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <SidebarInset className="min-w-0">
                    <AppHeader />
                    <ServerWakingBanner />
                    <div className="flex-1 p-6">{children}</div>
                    <AppFooter />
                </SidebarInset>
            </SidebarProvider>
        </SessionGuard>
    );
}
