import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin", "cyrillic"]
});

export const metadata: Metadata = {
    title: { default: "API Monitor", template: "%s | API Monitor" },
    description: "Uptime and availability monitoring"
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={`${inter.variable} h-full`}>
            <body className="flex min-h-full flex-col font-sans antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
