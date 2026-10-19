# Admin metrics audit fixes

## Visitor classification
- [x] Centralise automated / likely-human / unknown classification and regression tests.
- [x] Collect browser automation and trusted interaction signals without claiming identity verification.
- [x] Show separate estimates and verify collection and signed-in admin reporting.

## Traffic (AdminDashboard.tsx, VisitorsWorldMap.tsx, log-visit/index.ts)
- [x] Engagement rate: numerator is bot-excluded, denominator includes bots — use human/human
- [x] World map footer sums only top-15 countries — pass all countries, slice table only
- [x] Retention cohorts: maturity based on cohort Monday, not each visitor's first day; range-limited first-seen
- [x] Source classifier substring matching (notgoogle.com → search) — exact/dot-suffix host matching
- [x] "New Today" / lifetime labels wrong under date-range selection
- [x] Jump clicks / google-referrer queries assume >1000 row cap (limit 5000/20000)

## SEO (SeoIndexing.tsx, SeoAnalyticsPanel.tsx, gsc-search-analytics, seo-analytics, CoverageBreakdownPanel.tsx, SearchVsReferrerPanel.tsx)
- [x] "Indexed pages (28d)" counts only 10 capped top-page rows — relabel or fix
- [x] gsc-search-analytics ignores POST body `days`; N-day window returns N+1 dates; include lag cutoff
- [x] SearchVsReferrerPanel: clicks summed over 30 dates, impressions over 31; UTC vs Pacific dates; suspected-spoof definition inconsistent
- [x] CoverageBreakdownPanel fetchCoverage ignores limit/offset on normal path — Next refetches offset 0
- [x] Failed GSC calls render as "No data yet" — show error/unavailable state
- [x] Zero-value days render 2% minimum bars (cosmetic, skip unless trivial)
- [x] seo-analytics allTime `days` overcount at/after noon UTC

## Other (WebVitalsPanel.tsx, OpenFindingsByTopic.tsx, seed-lighthouse-run, Donations.tsx, admin-user-count)
- [x] Web Vitals uses only latest 1,000 rows (of 5,748 in 30d) — wrong p75s; FCP/TTFB ratings flip. Aggregate full window (paginate or SQL)
- [x] Daily vitals chart drops earliest partial day (31 UTC dates vs 30 bars)
- [x] Info findings (35) counted as minor (622 shown vs 587 actual) — separate info bucket
- [x] Filtered OpenFindings header: finding total global, topic total filtered — consistent totals
- [x] seed-lighthouse-run: missing PSI category score becomes 0 — preserve null
- [x] Donations: `donated_on` parsed as UTC midnight then local getMonth — month boundary bug west of UTC
- [x] admin-user-count: replace client-side capped scans with SQL counts (fine today, truncates at 50k)

## Topic learning progress
- [x] Show topic completions, active time and per-account detail in admin.
- [x] Harden account-scoped study-time syncing and verify signed-in learning flow.
