import z from "zod";

const email = z.string().trim().min(1, "Email is required").pipe(z.email("Invalid email format"));

export const registerSchema = z.object({
    email,
    password: z.string().min(8, "Password must be at least 8 characters")
});

export const loginSchema = z.object({
    email,
    password: z.string().min(1, "Password is required")
});

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
