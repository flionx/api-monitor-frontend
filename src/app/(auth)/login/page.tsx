import { LoginForm } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Log In" };

export default function LoginPage() {
    return <LoginForm />;
}
