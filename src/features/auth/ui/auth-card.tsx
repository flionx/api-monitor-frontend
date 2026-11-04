import React, { ReactNode } from "react";
interface AuthCardProps {
    title: string;
    children: ReactNode;
    footer: ReactNode;
}

export function AuthCard({ title, children, footer }: AuthCardProps) {
    return (
        <div className="bg-card w-full max-w-sm rounded-2xl p-8 shadow-lg">
            <h1 className="mb-6 text-center text-xl font-semibold">{title}</h1>
            {children}
            <p className="text-muted-foreground mt-6 text-center text-xs">{footer}</p>
        </div>
    );
}
