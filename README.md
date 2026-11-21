# EnerDeFi Frontend Assessment

A permits & licensing dashboard and a multi-step project submission wizard for EnerDeFi.

**Stack:** React 19 · TypeScript · TanStack Router · TanStack Query · Tailwind CSS v4 · Vite

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit tests (Vitest)
npm run build    # type-check + production build
```

## What's included

- **Permits & Licenses dashboard** (`/`) — stat cards, search by permit ID or project name, status filter, pagination and a permit details modal with a downloadable report. Filters live in the URL, so a filtered view can be shared or bookmarked.
- **Create Project wizard** (`/projects/new`) — eight steps with a completion bar, per-step validation, toast feedback (success, info, error, warning), drafts that survive a page reload, document uploads with drag and drop, and a submission flow that adds a new pending permit to the dashboard.
- **Sidebar** — active states, collapsible icon-only mode, ⌘K / Ctrl+K menu search and a mobile drawer.

## Mock API

There is no backend. `src/api/` exposes async functions that behave like HTTP calls (with a short artificial delay) and keep their data in `localStorage`. The UI only talks to them through TanStack Query, so swapping them for real `fetch` calls would not change any component.

To reset the demo data, clear the site's local storage.

## Project structure

```
src/
  api/            mock API, seed data and query definitions
  components/     layout (sidebar, header) and shared UI (button, modal, toast…)
  features/
    permits/      dashboard page, table, pagination, report modal
    projects/     wizard, field config, validation, upload + submit modals
  lib/            small helpers (formatting, pagination, file checks)
  pages/          placeholder pages for sections outside this assessment
  router.tsx      all routes and URL search-param validation
```
