export interface ApiFieldError {
    field: string;
    message: string;
}

export interface ApiErrorBody {
    error: string;
    details: ApiFieldError[];
}

export class ApiError extends Error {
    readonly status: number;
    readonly details: ApiFieldError[];

    constructor(status: number, message: string, details: ApiFieldError[] = []) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.details = details;
    }
}

export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}

export function getFieldsErrors(error: unknown): Record<string, string> {
    if (!isApiError(error)) return {};
    return Object.fromEntries(error.details.map((item) => [item.field, item.message]));
}
