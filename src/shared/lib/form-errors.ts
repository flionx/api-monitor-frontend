import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { getFieldsErrors } from "../api/errors";

export function applyFieldErrors<T extends FieldValues>(
    error: unknown,
    setError: UseFormSetError<T>,
    fields: readonly Path<T>[],
    aliases: Partial<Record<string, Path<T>>> = {}
): boolean {
    let applied = false;

    for (const [serverField, message] of Object.entries(getFieldsErrors(error))) {
        const target = aliases[serverField] ?? fields.find((field) => field === serverField);
        if (!target) continue;
        setError(target, { type: "server", message });
        applied = true;
    }

    return applied;
}
