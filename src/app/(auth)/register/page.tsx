import { RegisterForm } from "@/features/auth/ui/register-form";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Sign Up" };

export default function RegisterPage() {
    return <RegisterForm />;
}
