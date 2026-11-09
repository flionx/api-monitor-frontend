import { useEffect, useRef, useState } from "react";

export function useDelayedLoading(isLoading: boolean, delay = 250, minDuration = 400): boolean {
    const [visible, setVisible] = useState(false);
    const shownAt = useRef<number | null>(null);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;

        if (isLoading) {
            timer = setTimeout(() => {
                shownAt.current = Date.now();
                setVisible(true);
            }, delay);
        } else if (shownAt.current !== null) {
            const remaining = Math.max(0, minDuration - (Date.now() - shownAt.current));
            timer = setTimeout(() => {
                shownAt.current = null;
                setVisible(false);
            }, remaining);
        }

        return () => clearTimeout(timer);
    }, [isLoading, delay, minDuration]);

    return visible;
}
