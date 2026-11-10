"use client";

import {
    Control,
    Controller,
    UseFormClearErrors,
    UseFormRegister,
    useWatch
} from "react-hook-form";
import { MonitorFormValues } from "../model/schemas";
import { CUSTOM_INTERVAL, INTERVAL_PRESETS, INTERVAL_UNITS } from "../model/interval";
import { FormField } from "@/shared/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";

interface IntervalFieldProps {
    control: Control<MonitorFormValues>;
    register: UseFormRegister<MonitorFormValues>;
    clearErrors: UseFormClearErrors<MonitorFormValues>;
    error?: string;
}

const PRESET_LABELS: Record<string, string> = {
    ...Object.fromEntries(INTERVAL_PRESETS.map((preset) => [preset.value, preset.label])),
    [CUSTOM_INTERVAL]: "Custom"
};

export function IntervalField({ control, register, clearErrors, error }: IntervalFieldProps) {
    const preset = useWatch({ control, name: "intervalPreset" });
    const isCustom = preset === CUSTOM_INTERVAL;

    return (
        <FormField
            label="Interval"
            htmlFor="intervalPreset"
            error={error}
            hint={isCustom ? "From 10 seconds to 24 hours" : "How often the URL is checked"}
        >
            <div className="flex flex-col gap-2">
                <Controller
                    control={control}
                    name="intervalPreset"
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={(value) => {
                                if (!value) return;
                                field.onChange(value);
                                clearErrors(["intervalPreset", "customInterval"]);
                            }}
                        >
                            <SelectTrigger id="intervalPreset" className="w-full">
                                <SelectValue>
                                    {(value: string) => PRESET_LABELS[value] ?? value}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {INTERVAL_PRESETS.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                                <SelectItem value={CUSTOM_INTERVAL}>Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {isCustom && (
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            inputMode="numeric"
                            placeholder="45"
                            aria-label="Custom interval value"
                            aria-invalid={!!error}
                            {...register("customInterval")}
                            className="max-w-55"
                        />
                        <Controller
                            control={control}
                            name="customUnit"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        if (!value) return;
                                        field.onChange(value);
                                        clearErrors(["customInterval"]);
                                    }}
                                >
                                    <SelectTrigger aria-label="Interval unit" className="w-32">
                                        <SelectValue>{(value: string) => value}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {INTERVAL_UNITS.map((unit) => (
                                            <SelectItem key={unit} value={unit}>
                                                {unit}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                )}
            </div>
        </FormField>
    );
}
