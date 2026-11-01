import { LoginForm } from "@/features/auth/ui/login-form";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Log In" };

export default function LoginPage() {
    return <LoginForm />;
}
