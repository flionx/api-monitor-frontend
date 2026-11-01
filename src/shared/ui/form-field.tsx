import { ReactNode } from "react";
import { Label } from "./label";

interface FormFieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    hint?: string;
    children: ReactNode;
}

export function FormField({ label, htmlFor, error, hint, children }: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={htmlFor}>{label}</Label>
            {children}
            {error ? (
                <p role="alert" className="text-destructive text-xs">
                    {error}
                </p>
            ) : hint ? (
                <p className="text-muted-foreground text-xs">{hint}</p>
            ) : null}
        </div>
    );
}
