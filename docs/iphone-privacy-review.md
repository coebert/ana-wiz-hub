# iPhone privacy/support page — review diff

Prepared 2 November 2026 against current source (initial HEAD `b7f37d0229abbc370e2d137f4c821da779f54f77`, newer than the supplied observed HEAD).

- `public/iphone/privacy.html`: the reviewed standalone document, wording and styling unchanged; no scripts, analytics or external assets.
- `scripts/iphone-privacy-page.ts`: web-only delivery at `/iphone/privacy` (GET/HEAD), plus an exact extensionless generated asset. The `.html` source is also copied by Vite as a directly usable fallback.
- `vite.config.ts`: register the web-only page plugin and exclude this path from the PWA homepage fallback. No native features changed.
- `src/test/iphone-privacy-route.test.ts`: two focused delivery tests; both passed. Existing native configuration tests: two passed.
- `AGENTS.md`: record the isolated static-page boundary.

## Verified

Actual localhost unauthenticated navigation to `/iphone/privacy`, keyboard navigation to `#support`, refresh with that fragment, HTTP 200 and HTML content type. Desktop 1280 × 1800 and mobile 390 × 844 in light/dark mode: no horizontal overflow, readable support text, zero WCAG A/AA axe violations. Before the QA-only accessibility injection, requests were only the page itself; no scripts or external asset requests. The output-hook test verifies the emitted exact-path asset equals the reviewed HTML. Automatic validation reports `build OK`; no manual build or native rebuild run.

## Remaining hosted verification

Nothing published. The hosted preview request returned HTTP 401 at its preview access boundary, so unauthenticated hosted delivery could not be inspected. Lovable documents existing-file precedence over SPA fallback, but not the MIME type of extensionless files. Generated bundle files were not exposed in this sandbox; the emitted asset was checked through its output hook, not by inspecting the harness's bundle. After owner-approved publication, verify `https://anaesthesiacore.app/iphone/privacy` and `#support` return this document with `Content-Type: text/html`, rather than a download or homepage. The explicit `/iphone/privacy.html` alternative is available if hosting needs a supported clean-URL mapping. Do not treat local checks as proof of hosted MIME behavior.

No database, credentials, payment settings, clinical content, AI pause, audio or native features changed. The notice's supplied policy statements were reproduced, not independently re-audited in this task.