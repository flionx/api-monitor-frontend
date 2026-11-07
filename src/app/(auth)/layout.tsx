import { ReactNode } from "react";
import { GuestGuard } from "@/features/auth";
import { AppFooter } from "@/widgets/app-footer";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-svh flex-col">
            <main className="flex flex-1 items-center justify-center p-4">
                <GuestGuard>{children}</GuestGuard>
            </main>
            <AppFooter />
        </div>
    );
}
