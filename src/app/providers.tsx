"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/shared/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: { staleTime: 10_000, retry: false, refetchOnWindowFocus: false }
                }
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <NuqsAdapter>{children}</NuqsAdapter>
            <Toaster richColors closeButton />
        </QueryClientProvider>
    );
}
