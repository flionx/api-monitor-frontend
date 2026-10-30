export interface Crumb {
    label: string;
    href?: string;
}

const ROOT: Crumb = { label: "Dashboards", href: "/overview" };

const MONITOR_TABS: Record<string, string> = {
    notifiers: "Notifiers",
    checks: "Checks",
    settings: "Settings"
};

export function buildBreadcrumbs(pathname: string): Crumb[] {
    const [section, second, third] = pathname.split("/").filter(Boolean);

    if (section === "overview") return [ROOT, { label: "Overview" }];
    if (section === "notifiers") return [ROOT, { label: "Notifiers" }];

    if (section === "monitors") {
        if (!second) return [ROOT, { label: "Monitors" }];

        const monitors: Crumb = { label: "Monitors", href: "/monitors" };
        if (second === "new") return [ROOT, monitors, { label: "Create Monitor" }];

        const label = `#${second}`;
        const tab = third ? MONITOR_TABS[third] : undefined;
        if (!tab) return [ROOT, monitors, { label }];

        return [ROOT, monitors, { label, href: `/monitors/${second}` }, { label: tab }];
    }

    return [ROOT];
}

export function isActivePath(pathname: string, href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
}
