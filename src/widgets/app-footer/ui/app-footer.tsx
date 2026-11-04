import { CONTACT_EMAIL, GITHUB_URL } from "@/shared/config/navigation";

export function AppFooter() {
    return (
        <footer className="text-muted-foreground flex items-center justify-between px-6 py-4 text-xs">
            <span>{new Date().getFullYear()} API Monitor</span>
            <div className="flex gap-4">
                <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                >
                    Github
                </a>
                <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="hover:text-foreground transition-colors"
                >
                    Contact
                </a>
            </div>
        </footer>
    );
}
