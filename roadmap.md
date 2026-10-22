# Admin metrics audit fixes

## Obstetric, gynaecological and dermatological expansion
- [ ] Add six new operations with five stages, per-stage anaesthetic notes, checked references and interactive diagrams; introduce Dermatology specialty.
- [ ] Verify stage controls, search, specialty filtering and narrow-screen fit; run regressions and refresh search/private audit coverage.

## Colorectal Operations Library additions
- [x] Add AP resection, right/left hemicolectomy and Hartmann's procedure with five stages, anaesthetic notes, diagrams and sources (72 operations).
- [x] Verify 20 stages, labels, local search and narrow-screen fit; 46 regressions pass and search/private audit coverage refreshed. Consultant review remains outstanding; surgical source access was partial.

## Cross-specialty Operations Library expansion
- [x] Add hysteroscopy, TURBT, burn excision/grafting and bimaxillary osteotomy: 68 operations, each new entry with five stages, anaesthetic notes, staged diagrams and checked sources.
- [x] Verify all 20 stage selections, label controls, local search and narrow-screen fit; 37 regressions pass, search/audit regenerated and private audit copy uploaded. Consultant review remains outstanding.

## Cleft palate repair diagram
- [x] Add a five-stage illustration with palate layers, shared-airway risks and source links; verify all stages, label controls, desktop/mobile fit and 33 regressions. Private audit copy rebuilt locally; consultant review remains outstanding.

## ICU contrast-associated kidney injury
- [x] Added supplied RCR–RCEM emergency CT advisory with verified excerpts; nine tests passed, learner display checked without page errors, search/audit regenerated and private audit copy uploaded.
- [x] Expand AKI & RRT teaching with source-led mechanisms, current prevention evidence, management and fictional clinical cases; align the linked calculator, quizzes and summaries.
- [x] Verify 27 regressions, desktop/mobile teaching, calculator, checks and a guideline quotation; rebuild search and upload private audit coverage. New cited evidence checked; global reference checker still reports 42 unrelated unresolved identifiers, not a whole-library pass. Consultant review remains outstanding.

## Operations Library: diagram detail and realism
- [x] Refine fifteen remaining orthopaedic, urological and neurosurgical drawings with implant interfaces, operative corridors and reconstruction detail; check all 64 for clipped labels/runtime errors, verify search/mobile/dark rendering and pass 38 regressions; refresh the private audit copy. Consultant review remains outstanding.
- [x] Refine ten vascular, cardiac, ENT, paediatric, colorectal and transplant schematics; check all 64 for clipped labels/runtime errors, verify search/mobile/dark views, pass 38 regressions and refresh/upload private audit coverage. Further specialty refinements and consultant review remain future work.
- [x] Redraw ten vascular, cardiac and shared-airway diagrams with cutaways, vessel connections and surgical detail.
- [x] Check all 64 drawings for clipped labels/runtime errors; verify mitral search/mobile/dark views, pass 38 regressions and refresh/upload the private audit copy.
- [x] Improve shared tissue, vessel and instrument rendering across the library.
- [x] Add operation-specific anatomical detail to all 64 drawings; redraw ten priority illustrations and correct misleading routes. Educational schematics, not anatomically certified plates.
- [x] Verify all 64 diagrams without clipped labels or runtime errors, check search/mobile/dark appearance, pass 38 regression tests and upload refreshed audit copy.

## Operations Library: ENT additions
- [x] Add laryngectomy, glossectomy and microlaryngoscopy with stages, anaesthetic notes, diagrams and sources; two BJA full texts could not be independently fetched and have no displayed quote.
- [x] Verify search and rendering; regenerate and upload audit coverage.

## Operations Library: search bar
- [x] Add a prominent search box at the top of the operations page, with specialty filters, live match count and Enter-to-open.
- [x] Keep it pinned while the list is on screen without covering the header bars; test lookup, filtering, clearing and jump-to-first.

## Operations Library: October 20 next batch
- [x] Add nine source-led operations across paediatric, cardiac, thoracic, GI, eye, spine and obstetric practice (53 total).
- [x] Add diagrams; verify specialty filtering, procedure anchors and source integrity (14 new excerpts checked against fetched text).
- [x] Regenerate search and audit coverage, run 22 regression checks and upload the private audit copy.

## Operations Library: next expansion
- [x] Add six sourced operations across vascular, general surgery, urology and neurosurgery.
- [x] Add procedure diagrams and regression checks; verify search and specialty grouping in the preview.
- [x] Regenerate search and private audit records and upload the updated audit corpus.

## Viva audio timeout
- [x] Bound voice generation and all callers; surface a readable retry fallback.
- [x] Test timeout handling and signed-in playback, then resolve the monitoring finding.

## Visitor survey
- [x] Add optional survey with first-response deduplication and recorded invitations.
- [x] Show self-reports and invitation response rates by visitor classification.
- [x] Test submission, privacy restrictions and signed-in admin reporting; remove automated test answer.

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

## ICU guideline expansions (checklists, fictional cases, calculators, comparison tables)
- [x] Sepsis: NICE NG253 (2025–26) vs SSC 2021, CLOVERS/CLASSIC, fluid comparison calculator.
- [x] ARDS: ESICM 2023 / ATS 2024, prone, ECMO, steroids, PBW/driving-pressure calculator.
- [x] Transfusion: NICE NG24, BSH, restrictive thresholds, MINT/TRAIN.
