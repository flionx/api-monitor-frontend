"use client";

import { ReactNode, useEffect } from "react";
import { useServerStatus } from "@/shared/stores/server-status";
import { useRouter } from "next/navigation";
import { useMe } from "../model/queries";
import { isApiError } from "@/shared/api/errors";
import { Button } from "@/shared/ui/button";
import { Loader } from "lucide-react";

export function SessionGuard({ children }: { children: ReactNode }) {
    const router = useRouter();
    const isWaking = useServerStatus((s) => s.isWaking);
    const { data: user, error, refetch, isFetching } = useMe();

    const isUnauthorized = isApiError(error) && error.status === 401;

    useEffect(() => {
        if (isUnauthorized) router.replace("/login");
    }, [isUnauthorized, router]);

    if (user) return <>{children}</>;

    if (error && !isUnauthorized)
        return (
            <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-4">
                <p className="text-muted-foreground text-sm">Could not reach the server</p>
                <Button onClick={() => refetch()} disabled={isFetching}>
                    Try again
                </Button>
            </div>
        );

    return (
        <div className="text-muted-foreground flex min-h-svh flex-col items-center justify-center gap-3 text-sm">
            <Loader className="animation-duration-1500 size-6 animate-spin" />
            {isWaking ? "Server is waking up, this can take up to a minute..." : "Loading..."}
        </div>
    );
}
