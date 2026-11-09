import { RegisterForm } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Sign Up" };

export default function RegisterPage() {
    return <RegisterForm />;
}
