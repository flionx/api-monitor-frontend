# API Monitor - Frontend

Frontend for [API Monitor](https://github.com/flionx/api-monitor-backend), an uptime and availability monitoring service. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Status

🚧 **Work in progress.** Auth, layout, a paginated monitors list, and the create monitor form are implemented. Monitor details, check history, metrics, and notifiers are coming next.

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui (Base UI)
- **Data fetching:** TanStack Query
- **Forms:** React Hook Form + Zod
- **State:** Zustand (UI state), nuqs (URL state)

## Getting started

### Prerequisites

- Node.js 24, pnpm (version pinned in `package.json` via `packageManager`)

### Installation

1. Clone the repository and install dependencies:

    ```bash
    git clone https://github.com/flionx/api-monitor-frontend.git
    cd api-monitor-frontend
    pnpm install
    ```

2. Configure environment variables:

    ```bash
    cp .env.example .env     # then edit BACKEND_URL
    ```

3. Run the development server:

    ```bash
    pnpm dev
    ```

## License

This project is licensed under the [MIT License](./LICENSE).
