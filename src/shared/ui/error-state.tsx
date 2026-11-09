import { Button } from "./button";

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="bg-card flex flex-col items-center gap-3 rounded-xl px-4 py-12 text-center">
            <p className="text-muted-foreground text-sm">{message}</p>
            {onRetry && (
                <Button variant="outline" onClick={onRetry}>
                    Try again
                </Button>
            )}
        </div>
    );
}
