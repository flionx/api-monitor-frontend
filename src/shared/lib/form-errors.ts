import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { getFieldsErrors } from "../api/errors";

export function applyFieldErrors<T extends FieldValues>(
    error: unknown,
    setError: UseFormSetError<T>,
    fields: readonly Path<T>[]
): boolean {
    const serverErrors = getFieldsErrors(error);
    let applied = false;

    for (const field of fields) {
        const message = serverErrors[field];
        if (!message) continue;
        setError(field, { type: "server", message });
        applied = true;
    }

    return applied;
}
