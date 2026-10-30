import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppFooter } from "@/widgets/app-footer";
import { AppHeader } from "@/widgets/app-header";
import { AppSidebar } from "@/widgets/app-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppHeader />
                <main className="flex-1 p-6">{children}</main>
                <AppFooter />
            </SidebarInset>
        </SidebarProvider>
    );
}
