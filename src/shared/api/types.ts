export type MonitorStatus = "unknown" | "up" | "down";
export type ChannelType = "telegram" | "discord";
export type CheckErrorType = "timeout" | "server_error" | "client_error" | "connection" | "unknown";
export type MetricsRange = "1h" | "24h" | "7d" | "30d";

export interface User {
    id: number;
    email: string;
    createdAt: string;
}

export interface Monitor {
    id: number;
    userId: number;
    name: string;
    url: string;
    intervalSeconds: number;
    timeoutMs: number;
    isActive: boolean;
    failureThreshold: number;
    status: MonitorStatus;
    consecutiveFailures: number;
    lastCheckedAt: string | null;
    lastResponseTimeMs: number | null;
    lastErrorMessage: string | null;
    createdAt: string;
}

export interface TelegramConfigMasked {
    botToken: string;
    chatId: string;
}

export interface DiscordConfigMasked {
    webhookUrl: string;
}

export interface NotificationChannel {
    id: number;
    name: string;
    type: ChannelType;
    config: TelegramConfigMasked | DiscordConfigMasked;
    createdAt: string;
}

export interface MonitorChannelLink {
    channel: NotificationChannel;
    message: string | null;
    isEnabled: boolean;
}

export interface LinkResponse {
    monitorId: number;
    channelId: number;
    message: string | null;
    isEnabled: boolean;
    warnings: string[];
}

export interface Check {
    id: number;
    statusCode: number | null;
    responseTimeMs: number | null;
    isUp: boolean;
    errorType: CheckErrorType | null;
    errorMessage: string | null;
    checkedAt: string;
}

export interface Page<T> {
    data: T[];
    meta: { total: number; limit: number; offset: number };
}

export interface ChecksPage {
    data: Check[];
    meta: { limit: number; nextCursor: number | null };
}

export interface Summary {
    counts: { total: number; up: number; down: number; pending: number; paused: number };
    uptime24h: { percent: number | null; totalChecks: number; failedChecks: number };
    downMonitors: Array<{
        id: number;
        name: string;
        url: string;
        lastCheckedAt: string | null;
        lastErrorMessage: string | null;
    }>;
}

export interface Stats {
    range: MetricsRange;
    currentStatus: MonitorStatus;
    lastCheckedAt: string | null;
    uptimePercent: number | null;
    totalChecks: number;
    failedChecks: number;
    responseTime: {
        avgMs: number | null;
        minMs: number | null;
        maxMs: number | null;
        p95Ms: number | null;
    };
}

export interface ChartPoint {
    timestamp: string;
    avgResponseTimeMs: number | null;
    maxResponseTimeMs: number | null;
    totalChecks: number;
    failedChecks: number;
    uptimePercent: number | null;
}

export interface Chart {
    range: MetricsRange;
    bucketSeconds: number;
    points: ChartPoint[];
}

export interface MonitorInput {
    name: string;
    url: string;
    intervalSeconds: number;
    timeoutMs: number;
    failureThreshold: number;
    isActive: boolean;
}
