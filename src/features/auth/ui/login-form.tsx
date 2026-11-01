"use client";

import { useForm } from "react-hook-form";
import { useLogin } from "../model/queries";
import { loginSchema, LoginValues } from "../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/shared/lib/form-errors";
import { isApiError } from "@/shared/api/errors";
import { AuthCard } from "./auth-card";
import Link from "next/link";
import { FormField } from "@/shared/ui/form-field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export function LoginForm() {
    const login = useLogin();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" }
    });

    const onSubmit = handleSubmit((values) => {
        login.mutate(values, {
            onError: (error) => {
                if (applyFieldErrors(error, setError, ["email", "password"])) return;
                setError("root", {
                    message: isApiError(error) ? error.message : "Network error. Please try again"
                });
            }
        });
    });

    return (
        <AuthCard
            title="Log In"
            footer={
                <>
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-primary hover:underline">
                        Sign Up
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
                <FormField label="Password" htmlFor="password" error={errors.password?.message}>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        aria-invalid={!!errors.password}
                        {...register("password")}
                    />
                </FormField>
                {errors.root?.message && (
                    <p role="alert" className="text-destructive text-center text-sm">
                        {errors.root.message}
                    </p>
                )}
                <Button type="submit" size="lg" disabled={login.isPending} className="mt-2">
                    {login.isPending ? "Logging in..." : "Log In"}
                </Button>
            </form>
        </AuthCard>
    );
}
