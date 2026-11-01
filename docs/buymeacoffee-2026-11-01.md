# Optional Buy Me a Coffee support — 1 November 2026

## Change
- `src/lib/donation.ts`: reusable `BUY_ME_A_COFFEE_URL` = `https://buymeacoffee.com/anaesthesiacore` and click source `support-card-buymeacoffee`.
- `src/components/feedback/SupportSection.tsx`: understated external link after PayPal, before feedback; 44px target, keyboard focus ring, `target="_blank" rel="noopener noreferrer"`, optional-support note.
- Stripe remains primary; all four PayPal choices and feedback unchanged. No widget, credentials, subscription integration, supporter counts or payment-completion claims. No clinical files changed.
- `drizzle/migrations/0012_donation_clicks_add_buymeacoffee_source.sql`: applied directly to the shared project database; aborts on missing/unknown policy shape or predicate; accepts only exact seven-source prior state or already-correct eight-source state. Uses ALTER POLICY without replacing grants/roles/admin SELECT.
- `src/test/support-buymeacoffee.test.tsx`: exact destination, source-only mocked logging, existing destinations/order and feedback regression.
- `AGENTS.md`, `roadmap.md`: policy-extension convention and task completion.

## Readback
INSERT `Anyone can log a valid donate click`: PERMISSIVE, roles `{anon,authenticated}`, no USING predicate. Sources exactly:
`home-note`, `support-box`, `support-card-3gbp`, `support-card-5gbp`, `support-card-10gbp`, `support-card-other`, `support-card-stripe`, `support-card-buymeacoffee`.
Both inclusive `clicked_at >= now() - interval '5 minutes'` and `clicked_at <= now() + interval '5 minutes'` unchanged.
SELECT `Admins read donate clicks`: PERMISSIVE, `{authenticated}`, `has_role(auth.uid(), 'admin'::app_role)` unchanged. RLS was enabled before the change; no RLS/grant changes.

## Verification
- `bunx vitest run src/test/support-buymeacoffee.test.tsx src/lib/donation-scroll.test.ts`: **6 passed, 0 failed**, two files.
- Read-only database evaluations execute the actual retrieved `with_check` predicate, not a copied approximation: **7 cases passed** (BMC/Stripe/Other allowed; unknown/null source and timestamps ±6 minutes rejected); **12 further cases passed** (all eight sources, both inclusive ±5-minute boundaries and both 1ms-outside rejections). No row INSERT or fake donations.
- `python3 /tmp/browser/bmc/check_support.py`: preview root at desktop 1280×1800 and mobile 390×844; destination/attributes correct; 44px height at both sizes; keyboard `:focus-visible` and visible ring checked; support captures inspected after opening screen cleared; feedback opened/closed; no page errors. No external checkout click or payment performed. Logging tested with a mocked INSERT, not a synthetic production click.
- Harness automatic build/type validation: latest observed **build OK 2026-11-01T13:44:34Z**. No separate manual build/typecheck or full suite run (harness supplies validation).
- Source-content implementation revision observed: `b5d4c13fe4473bebaa0a3e51158907005a8642ab`; final documentation revision reported separately in chat.

## Preview versus production
UI changed in preview only; no publication. The click-policy migration is already applied to the shared project database used by preview and production. Public BMC page/About/payout status verification is the user's supplied 1 November verification, not independently repeated here. Neither payment completion nor the service being exclusively one-off is claimed.