"use client";

import { useForm } from "react-hook-form";
import { useRegister } from "../model/queries";
import { LoginValues, registerSchema } from "../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/shared/lib/form-errors";
import { isApiError } from "@/shared/api/errors";
import { AuthCard } from "./auth-card";
import { FormField } from "@/shared/ui/form-field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import Link from "next/link";

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
                toast.error(isApiError(error) ? error.message : "Network error. Please try again");
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
                <Button type="submit" size="lg" disabled={registerUser.isPending} className="mt-2">
                    {registerUser.isPending ? (
                        <>
                            <Loader className="animate-spin" />
                            <span className="sr-only">Creating account...</span>
                        </>
                    ) : (
                        "Sign Up"
                    )}
                </Button>
            </form>
        </AuthCard>
    );
}
