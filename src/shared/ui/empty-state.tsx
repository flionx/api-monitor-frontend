import { ReactNode } from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description?: string;
    action?: ReactNode;
    icon?: LucideIcon;
    imageSrc?: string;
    imageAlt?: string;
}
export function EmptyState({
    title,
    description,
    action,
    icon: Icon,
    imageSrc,
    imageAlt
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center gap-2 px-4 py-16 text-center">
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    alt={imageAlt ?? "Empty state"}
                    className="mb-2"
                    width={140}
                    height={110}
                />
            ) : Icon ? (
                <Icon className="text-muted-foreground/50 mb-2 size-12" strokeWidth={1.5} />
            ) : null}
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
            {action && <div className="mt-3">{action}</div>}
        </div>
    );
}
