## Lighthouse history panel

A new section on the existing `/dev/seo-indexing` admin page that shows
trend lines for all 4 Lighthouse categories (Performance, Accessibility,
Best Practices, SEO) plus the Core Web Vitals (LCP, CLS, INP, TBT) across
every published build. Data is captured by a GitHub Actions workflow that
runs Lighthouse against the live URL after each publish and POSTs the
results to a new edge function.

### What you'll see in the UI

A "Lighthouse history" card under the existing GSC analytics, with:

- Latest scores row — 4 score chips (perf / a11y / BP / SEO) colour-coded
  red / amber / green using the standard 0–49 / 50–89 / 90–100 buckets.
- Trend chart — small Recharts line chart with one line per category over
  the last 30 runs. Toggle chips above the chart to switch between
  "Categories" and "Core Web Vitals" (LCP / CLS / INP / TBT).
- Run table — most-recent-first list of runs with timestamp, commit SHA
  (linked to GitHub), URL audited, the 4 scores, and an "Open report"
  link to the raw LHCI HTML report stored in Supabase Storage.

Admin-only (already wrapped by `RequireAdmin`).

### Data flow

```text
 GitHub Actions ──┐
  on: deployment  │   1. lhci collect against published URL
  status=success  │   2. POST JSON summary + HTML report
                  ▼
   ┌──────────────────────────────────┐
   │ edge fn: ingest-lighthouse-run   │
   │  - verify GH OIDC bearer / shared│
   │    secret                         │
   │  - parse LHCI summary             │
   │  - upload HTML report to Storage  │
   │  - insert row in lighthouse_runs  │
   └──────────────────────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────┐
   │ /dev/seo-indexing                │
   │  - read lighthouse_runs (admin)  │
   │  - render scores + trend chart   │
   └──────────────────────────────────┘
```

### Technical sections

#### 1. Database

New table `lighthouse_runs`:

| column | type | notes |
|---|---|---|
| `id` | uuid PK default `gen_random_uuid()` | |
| `created_at` | timestamptz default now() | run time |
| `url` | text not null | e.g. `https://anaesthesiacore.app/` |
| `commit_sha` | text nullable | from GH workflow context |
| `branch` | text nullable | usually `main` |
| `lh_version` | text nullable | e.g. `12.2.0` |
| `score_performance` | int (0–100) | |
| `score_accessibility` | int (0–100) | |
| `score_best_practices` | int (0–100) | |
| `score_seo` | int (0–100) | |
| `lcp_ms` | int nullable | Core Web Vital, ms |
| `cls` | numeric(6,4) nullable | unitless |
| `inp_ms` | int nullable | ms |
| `tbt_ms` | int nullable | ms |
| `report_path` | text nullable | path in `lighthouse-reports` bucket |
| `raw_summary` | jsonb | full LHCI summary for future drill-down |

Indexes: `(created_at desc)` for the trend query, `(url, created_at desc)`
for per-route filtering later.

RLS:
- SELECT: `has_role(auth.uid(), 'admin')`
- INSERT: deny for `anon`/`authenticated`; the edge function uses the
  service-role key, which bypasses RLS, so no INSERT policy is needed.
- UPDATE/DELETE: blocked.

New private storage bucket `lighthouse-reports` for the HTML report HTMLs.

#### 2. Edge function — `ingest-lighthouse-run`

`supabase/functions/ingest-lighthouse-run/index.ts`. POST endpoint that
accepts a multipart body: `summary` (JSON string) + optional `report`
(HTML file). Authenticates via a shared secret header
`x-lighthouse-ingest-token` checked against a new
`LIGHTHOUSE_INGEST_TOKEN` secret. (We'll add the secret first via
`secrets--add_secret` so you can paste a freshly generated random
string.) Validates the summary with Zod, uploads the HTML report to the
private bucket if present, then inserts into `lighthouse_runs` using the
service-role client.

`verify_jwt = false` for this function (CI calls it without a user JWT);
auth is enforced by the shared-secret header.

#### 3. GitHub Actions workflow

`.github/workflows/lighthouse.yml` runs on `deployment_status` events
where `state == 'success'` and the environment is the production
publish. Steps:
1. `npm i -g @lhci/cli`
2. `lhci collect --url=https://anaesthesiacore.app/ --numberOfRuns=3`
3. Pick the median run, extract scores + CWV.
4. `curl -X POST` to the edge function with the JSON summary and the
   HTML report attached, using the `LIGHTHOUSE_INGEST_TOKEN` GitHub
   repo secret.

The workflow file is committed; the `LIGHTHOUSE_INGEST_TOKEN` repo
secret is something you'll paste into GitHub Settings → Secrets after
I generate it for the edge function.

#### 4. UI — `LighthouseHistoryPanel.tsx`

New component mounted inside `src/pages/SeoIndexing.tsx`, beneath the
existing GSC card. Uses `supabase.from('lighthouse_runs')` with
`.order('created_at', { ascending: false }).limit(30)`. Renders:
- `ScoreChips` — 4 chips with the latest scores.
- `Tabs` — "Categories" / "Core Web Vitals".
- Recharts `<LineChart>` (already in the project) with the relevant
  series.
- `<Table>` with the run list and signed-URL "Open report" links via
  `supabase.storage.from('lighthouse-reports').createSignedUrl`.

Empty state when zero rows: instructions on how to wire the GitHub
Actions secret and a copy-paste `curl` to seed a manual run.

### What I'll need from you after the build

1. Click the "Add secret" prompt to generate `LIGHTHOUSE_INGEST_TOKEN`.
2. Copy that token into GitHub → repo Settings → Secrets and variables
   → Actions, named `LIGHTHOUSE_INGEST_TOKEN`.
3. Republish the app once so the `deployment_status` event fires and
   the first row lands in the table.
