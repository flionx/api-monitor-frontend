"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { isApiError } from "@/shared/api/errors";
import { applyFieldErrors } from "@/shared/lib/form-errors";
import { Button, buttonVariants } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/form-field";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { monitorFormSchema, type MonitorFormValues } from "../model/schemas";
import { IntervalField } from "./interval-field";

type FormFieldName = keyof MonitorFormValues;

const FORM_FIELDS: FormFieldName[] = [
    "name",
    "url",
    "intervalPreset",
    "timeoutSeconds",
    "failureThreshold"
];
const SERVER_FIELD_ALIASES: Partial<Record<string, FormFieldName>> = {
    intervalSeconds: "intervalPreset",
    timeoutMs: "timeoutSeconds"
};

interface MonitorFormProps {
    defaultValues: MonitorFormValues;
    submitLabel: string;
    pendingLabel: string;
    cancelHref: string;
    onSubmit: (values: MonitorFormValues) => Promise<unknown>;
}

export function MonitorForm({
    defaultValues,
    submitLabel,
    pendingLabel,
    cancelHref,
    onSubmit
}: MonitorFormProps) {
    const {
        register,
        control,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm<MonitorFormValues>({
        resolver: zodResolver(monitorFormSchema),
        defaultValues
    });

    const submit = handleSubmit(async (values) => {
        try {
            await onSubmit(values);
        } catch (error) {
            if (applyFieldErrors(error, setError, FORM_FIELDS, SERVER_FIELD_ALIASES)) return;
            toast.error(isApiError(error) ? error.message : "Network error. Please try again");
        }
    });

    return (
        <form onSubmit={submit} noValidate className="flex max-w-6xl flex-col gap-6">
            <section className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold">Monitor Information</h2>
                <div className="bg-card grid gap-6 rounded-xl p-6 sm:grid-cols-2">
                    <FormField label="Monitor Name" htmlFor="name" error={errors.name?.message}>
                        <Input
                            id="name"
                            placeholder="Example"
                            autoComplete="off"
                            aria-invalid={!!errors.name}
                            {...register("name")}
                        />
                    </FormField>
                    <FormField label="URL" htmlFor="url" error={errors.url?.message}>
                        <Input
                            id="url"
                            type="url"
                            placeholder="https://example.com"
                            autoComplete="off"
                            aria-invalid={!!errors.url}
                            {...register("url")}
                        />
                    </FormField>
                </div>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold">Monitor Settings</h2>
                <div className="bg-card grid gap-6 rounded-xl p-6 sm:grid-cols-2">
                    <IntervalField
                        control={control}
                        register={register}
                        clearErrors={clearErrors}
                        error={errors.intervalPreset?.message ?? errors.customInterval?.message}
                    />
                    <FormField
                        label="Timeout"
                        htmlFor="timeoutSeconds"
                        hint="How long to wait for a response (1-30)"
                        error={errors.timeoutSeconds?.message}
                    >
                        <div className="flex items-center gap-2">
                            <Input
                                id="timeoutSeconds"
                                type="number"
                                inputMode="numeric"
                                aria-invalid={!!errors.timeoutSeconds}
                                {...register("timeoutSeconds")}
                                className="sm:max-w-55"
                            />
                            <span className="text-muted-foreground text-sm">seconds</span>
                        </div>
                    </FormField>
                    <FormField
                        label="Failure threshold"
                        htmlFor="failureThreshold"
                        hint="Send an alert after this many failed checks in a row (1-10)"
                        error={errors.failureThreshold?.message}
                    >
                        <Input
                            id="failureThreshold"
                            type="number"
                            inputMode="numeric"
                            aria-invalid={!!errors.failureThreshold}
                            {...register("failureThreshold")}
                            className="sm:max-w-55"
                        />
                    </FormField>
                    <FormField
                        label="Status"
                        htmlFor="isActive"
                        hint="Paused monitors are not checked"
                    >
                        <div className="flex h-8 items-center gap-2">
                            <Controller
                                control={control}
                                name="isActive"
                                render={({ field }) => (
                                    <Switch
                                        id="isActive"
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                )}
                            />
                            <span className="text-sm">Active</span>
                        </div>
                    </FormField>
                </div>
            </section>

            <div className="flex justify-end gap-2">
                <Link href={cancelHref} className={buttonVariants({ variant: "outline" })}>
                    Cancel
                </Link>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? pendingLabel : submitLabel}
                </Button>
            </div>
        </form>
    );
}
