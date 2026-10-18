# Admin metrics audit fixes

## Traffic (AdminDashboard.tsx, VisitorsWorldMap.tsx, log-visit/index.ts)
- [ ] Engagement rate: numerator is bot-excluded, denominator includes bots — use human/human
- [ ] World map footer sums only top-15 countries — pass all countries, slice table only
- [ ] Retention cohorts: maturity based on cohort Monday, not each visitor's first day; range-limited first-seen
- [ ] Source classifier substring matching (notgoogle.com → search) — exact/dot-suffix host matching
- [ ] "New Today" / lifetime labels wrong under date-range selection
- [ ] Jump clicks / google-referrer queries assume >1000 row cap (limit 5000/20000)

## SEO (SeoIndexing.tsx, SeoAnalyticsPanel.tsx, gsc-search-analytics, seo-analytics, CoverageBreakdownPanel.tsx, SearchVsReferrerPanel.tsx)
- [ ] "Indexed pages (28d)" counts only 10 capped top-page rows — relabel or fix
- [ ] gsc-search-analytics ignores POST body `days`; N-day window returns N+1 dates; include lag cutoff
- [ ] SearchVsReferrerPanel: clicks summed over 30 dates, impressions over 31; UTC vs Pacific dates; suspected-spoof definition inconsistent
- [ ] CoverageBreakdownPanel fetchCoverage ignores limit/offset on normal path — Next refetches offset 0
- [ ] Failed GSC calls render as "No data yet" — show error/unavailable state
- [ ] Zero-value days render 2% minimum bars (cosmetic, skip unless trivial)
- [ ] seo-analytics allTime `days` overcount at/after noon UTC

## Other (WebVitalsPanel.tsx, OpenFindingsByTopic.tsx, seed-lighthouse-run, Donations.tsx, admin-user-count)
- [ ] Web Vitals uses only latest 1,000 rows (of 5,748 in 30d) — wrong p75s; FCP/TTFB ratings flip. Aggregate full window (paginate or SQL)
- [ ] Daily vitals chart drops earliest partial day (31 UTC dates vs 30 bars)
- [ ] Info findings (35) counted as minor (622 shown vs 587 actual) — separate info bucket
- [ ] Filtered OpenFindings header: finding total global, topic total filtered — consistent totals
- [ ] seed-lighthouse-run: missing PSI category score becomes 0 — preserve null
- [ ] Donations: `donated_on` parsed as UTC midnight then local getMonth — month boundary bug west of UTC
- [ ] admin-user-count: replace client-side capped scans with SQL counts (fine today, truncates at 50k)
