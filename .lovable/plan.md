# TanStack Start migration (SSR/SSG for SEO)

## Why

Section and topic pages currently ship as a client-only Vite SPA. Crawlers get an empty `<div id="root">` plus client-mutated `<Helmet>` tags — good enough for Googlebot, invisible to LinkedIn/Slack/Facebook social previewers. TanStack Start renders every route on the server, so canonical `<title>`, meta description, JSON-LD, and page body are all in the initial HTML.

## Scope of this change

- Adopt TanStack Start + Vinxi as the app framework.
- Migrate React Router routes (`src/App.tsx`, `src/routes/topicRoutes.ts`) to TanStack Router file-based routes under `src/routes/`.
- Replace `react-helmet-async` with TanStack Router `head()` per-route (native SSR-safe metadata).
- Wire the five-layer SSR error handling from the knowledge (`src/server.ts`, `src/start.ts`, `src/lib/error-capture.ts`, `errorComponent`, `vite.config.ts` override).
- Prerender the fully static routes (`/`, `/physics`, `/physiology`, etc. and each topic page) at build time so hosting serves plain HTML.
- Keep `zustand` stores, contexts, Supabase client, and all business logic unchanged.

## Out of scope

- Redesign, copy changes, new features.
- Migrating admin/authenticated routes to SSR — they stay CSR-only (`ssr: false` on those routes).
- Changing the Supabase data model or edge functions.

## Execution steps

1. **Install & scaffold** — `bun add @tanstack/react-start @tanstack/react-router vinxi @lovable.dev/vite-tanstack-config`, remove `react-router-dom` and `react-helmet-async`.
2. **Config** — rewrite `vite.config.ts` using `@lovable.dev/vite-tanstack-config`, set `tanstackStart.server.entry = "server"` and enable prerendering for all public routes.
3. **File-based routes** — generate `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/$section/index.tsx`, `src/routes/$section/$topic.tsx` from the existing `topicRouteEntries`. Keep the same URL paths and lazy loading of topic modules.
4. **Per-route head** — replace each `<PageMeta>` call site with the route's `head()` function using the existing `buildPageTitle` / `buildMetaDescription` / `buildBreadcrumbJsonLd` / `buildCourseJsonLd` builders (they stay pure and testable).
5. **Router links** — codemod `Link`/`NavLink`/`useNavigate`/`useLocation` from `react-router-dom` → `@tanstack/react-router` equivalents (same names, slightly different props).
6. **SSR error handling** — add all five layers per the TanStack SSR knowledge (`server.ts`, `start.ts`, `error-capture.ts`, `error-page.ts`, root `errorComponent`).
7. **Prerender manifest** — feed the list of static routes (from `TOPIC_ROUTES` + section landing pages + hubs) into `tanstackStart.prerender.routes`.
8. **Verify** — run `bun run build`, inspect `.output/public/` for one `.html` per route, check that `curl -s <deployed>/physics/gas-laws | grep '<title>'` returns the topic title without JS execution.

## Technical details

**Router shape (file-based):**
```text
src/routes/
  __root.tsx                # providers, layout shell, errorComponent
  index.tsx                 # home
  revise.tsx, progress.tsx, viva.tsx, ...  # hubs
  $section/
    index.tsx               # section landing (/physics, /physiology, ...)
    $topic.tsx              # topic pages, resolves via topicRouteEntries map
```

**Route registration** — reuse `TOPIC_ROUTES` from `src/routes/topicRoutes.ts` inside `$section/$topic.tsx`'s `loader` to pick the right lazy module. Redirects from `TOPIC_REDIRECTS` become `beforeLoad: () => redirect(...)`.

**Loaders** — return serializable data only. Topic module is loaded inside the component via `React.lazy` / dynamic import, not the loader (loader returns just the slug per the TanStack SSR knowledge rule about non-serializable values).

**Prerender routes** — computed at build time by importing `topicRouteEntries` in `vite.config.ts` (Node-side) and mapping to path strings. Excludes `/admin/*`, `/audit/*`, `/login`.

**Backwards compat** — the SPA fallback and all Lovable hosting rules still apply; the built output is static HTML + hydration bundle.

## Risk

Large blast radius. Every page component keeps working, but 200+ files import from `react-router-dom`. A single codemod pass handles most of it; typecheck catches the rest. Rollback is one-click via version history.

## What I need from you

Confirm and I'll execute steps 1–8 in one turn, ending with `bun run build` output showing static HTML for each section + topic route.
