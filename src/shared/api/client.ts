import { useServerStatus } from "../stores/server-status";
import { ApiError, ApiErrorBody } from "./errors";

const BASE_URL = "/api";
const REQUEST_TIMEOUT_MS = 90_000;
const SLOW_REQUEST_MS = 3000;
const RETRY_DELAYS_MS = [1000, 2000];
const RETRYABLE_STATUSES = new Set([502, 503, 504]);
const AUTH_PATHS = ["/auth/login", "/auth/register", "/auth/me"];

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type QueryValue = string | number | boolean | null | undefined;

interface RequestOptions {
    method?: Method;
    body?: unknown;
    query?: Record<string, QueryValue>;
    signal?: AbortSignal;
}

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query ?? {})) {
        if (value === undefined || value === null || value === "") continue;
        params.set(key, String(value));
    }
    const queryString = params.toString();
    return `${BASE_URL}${path}${queryString ? `?${queryString}` : ""}`;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function parseError(response: Response): Promise<ApiError> {
    let body: Partial<ApiErrorBody> = {};
    try {
        body = await response.json();
    } catch {}
    return new ApiError(
        response.status,
        body.error ?? response.statusText ?? "Unknown error",
        body.details
    );
}

function handleUnauthorized(): void {
    if (typeof window === "undefined") return;
    const { pathname } = window.location;
    if (pathname === "/login" || pathname === "/register") return;
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign("/login");
}

let slowCalls = 0;

function trackSlowCall(): () => void {
    let fired = false;
    const timer = setTimeout(() => {
        fired = true;
        slowCalls += 1;
        useServerStatus.getState().setWaking(true);
    }, SLOW_REQUEST_MS);

    return () => {
        clearTimeout(timer);
        if (!fired) return;
        slowCalls -= 1;
        if (slowCalls === 0) useServerStatus.getState().setWaking(false);
    };
}

function isRetryable(error: unknown): boolean {
    if (error instanceof ApiError) return RETRYABLE_STATUSES.has(error.status);
    return error instanceof TypeError;
}

async function request<T>(path: string, method: Method, options: RequestOptions): Promise<T> {
    const hasBody = options.body !== undefined;
    const signals = [AbortSignal.timeout(REQUEST_TIMEOUT_MS)];
    if (options.signal) signals.push(options.signal);

    const response = await fetch(buildUrl(path, options.query), {
        method,
        headers: hasBody ? { "Content-Type": "application/json" } : undefined,
        body: hasBody ? JSON.stringify(options.body) : undefined,
        credentials: "same-origin",
        signal: AbortSignal.any(signals)
    });

    if (!response.ok) {
        const error = await parseError(response);
        if (error.status === 401 && !AUTH_PATHS.includes(path)) handleUnauthorized();
        throw error;
    }

    return (await response.json()) as T;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const method = options.method ?? "GET";
    const maxAttempts = method === "GET" ? RETRY_DELAYS_MS.length + 1 : 1;
    const done = trackSlowCall();

    try {
        for (let attempt = 0; ; attempt++) {
            try {
                return await request<T>(path, method, options);
            } catch (error) {
                const canRetry =
                    attempt < maxAttempts - 1 && isRetryable(error) && !options.signal?.aborted;
                if (!canRetry) throw error;
                await sleep(RETRY_DELAYS_MS[attempt]);
            }
        }
    } finally {
        done();
    }
}

export const api = {
    get: <T>(path: string, query?: Record<string, QueryValue>, signal?: AbortSignal) =>
        apiFetch<T>(path, { query, signal }),
    post: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "POST", body }),
    put: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "PUT", body }),
    patch: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "PATCH", body }),
    delete: <T>(path: string) => apiFetch<T>(path, { method: "DELETE" })
};
