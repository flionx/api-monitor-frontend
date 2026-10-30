import { GITHUB_URL } from "@/shared/config/navigation";

export const AppFooter = () => {
    return (
        <footer className="text-muted-foreground flex items-center justify-between px-6 py-4 text-xs">
            <span>{new Date().getFullYear()} API Monitor</span>
            <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
            >
                Github
            </a>
        </footer>
    );
};
