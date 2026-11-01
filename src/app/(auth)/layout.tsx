import { GuestGuard } from "@/features/auth/ui/guest-guard";
import { AppFooter } from "@/widgets/app-footer";
import React, { ReactNode } from "react";

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
