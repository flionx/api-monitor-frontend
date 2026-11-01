"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useMe } from "../model/queries";

export function GuestGuard({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { data: user } = useMe();

    useEffect(() => {
        if (user) router.replace("/overview");
    }, [user, router]);

    return <>{children}</>;
}
