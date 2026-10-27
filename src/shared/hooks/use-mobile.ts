import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

let mql: MediaQueryList | undefined;

function getMql() {
    if (!mql) {
        mql = window.matchMedia(MOBILE_QUERY);
    }
    return mql;
}

function subscribe(callback: () => void) {
    const mediaQuery = getMql();
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
    return getMql().matches;
}

export function useIsMobile() {
    return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
