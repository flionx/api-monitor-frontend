"use client";

import { useForm } from "react-hook-form";
import { useRegister } from "../model/queries";
import { LoginValues, registerSchema } from "../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/shared/lib/form-errors";
import { isApiError } from "@/shared/api/errors";
import { AuthCard } from "./auth-card";
import Link from "next/link";
import { FormField } from "@/shared/ui/form-field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export function RegisterForm() {
    const registerUser = useRegister();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<LoginValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: "", password: "" }
    });

    const onSubmit = handleSubmit((values) => {
        registerUser.mutate(values, {
            onError: (error) => {
                if (applyFieldErrors(error, setError, ["email", "password"])) return;
                if (isApiError(error) && error.status === 409) {
                    setError("email", { type: "server", message: error.message });
                    return;
                }
                setError("root", {
                    message: isApiError(error) ? error.message : "Network error. Please try again"
                });
            }
        });
    });

    return (
        <AuthCard
            title="Sign Up"
            footer={
                <>
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Log In
                    </Link>
                </>
            }
        >
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                <FormField label="Email" htmlFor="email" error={errors.email?.message}>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        {...register("email")}
                    />
                </FormField>
                <FormField
                    label="Password"
                    htmlFor="password"
                    hint="At least 8 characters"
                    error={errors.password?.message}
                >
                    <Input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        aria-invalid={!!errors.password}
                        {...register("password")}
                    />
                </FormField>
                {errors.root?.message && (
                    <p role="alert" className="text-destructive text-center text-sm">
                        {errors.root.message}
                    </p>
                )}
                <Button type="submit" size="lg" disabled={registerUser.isPending} className="mt-2">
                    {registerUser.isPending ? "Creating account..." : "Sign Up"}
                </Button>
            </form>
        </AuthCard>
    );
}
