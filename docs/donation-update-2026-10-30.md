# Homepage donation update — 30 Oct 2026

Base reviewed source: bb9cac5c0dc3eb784ba9683fd8c81b9c8929951d. Not published.

## Changed files
- `src/lib/donation.ts` (new) — the only place the PayPal.me recipient (`RCoe`) is configured; £3/£5/£10/Other choices; anonymous `donation_clicks` logging (fixed source labels `support-card-3gbp`, `-5gbp`, `-10gbp`, `-other`; errors swallowed); `scrollToSupport()` that waits for mount, re-aligns after layout settles and honours reduced motion.
- `src/components/feedback/DonationNote.tsx` — long fee/cost-pressure banner replaced with the one-line "Free to use. If it helps, you can support its upkeep." link to `/#support`.
- `src/components/feedback/SupportSection.tsx` — new card copy, four equal 44px links (`noopener noreferrer`, new tab, explicit aria-labels), transparency line, divider + "Feedback is welcome too." Feedback form/backend unchanged. Duplicate recipient config and inaccurate PayPal Giving Fund comment removed.
- `src/pages/Landing.tsx` — banner removed; quiet line under hero buttons; support card eagerly mounted after the tools grid, before RecentExpansions; bottom duplicate removed.
- `src/pages/Index.tsx` (/revise) — still shows the note, now the same quiet one-liner (old banner copy removed).
- `src/components/layout/Header.tsx` — Support links use the shared scroll helper.

## Verified (Playwright, reduced motion, 1280px and 360px)
- One `#support` region; four links have exact hrefs, `target=_blank`, `rel="noopener noreferrer"`, aria-labels, 44px height.
- £5 click opens `paypal.com/paypalme/RCoe/5GBP` popup even with click logging blocked.
- Feedback dialog opens and closes (no feedback submitted).
- `/#support` on first load, hero link, and desktop header link from `/revise` all place the section at the 80px scroll margin.
- Old "note from the creator"/fee copy absent; no page errors; typecheck clean.

## Not verified
- Mobile drawer Support link from another route (shares the same helper, not clicked).
- Dark theme visually (app theme toggle not exercised); PayPal page contents beyond the URL.
- Whether click rows reach the database in preview.
