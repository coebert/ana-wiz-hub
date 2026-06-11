## Goal

Author 3 visible Q&A pairs per topic/subtopic page and emit `FAQPage` JSON-LD via the existing prerender pipeline, so every topic/subtopic route ships compliant FAQ schema (Q&A visible on page, mirrored in JSON-LD).

## Scope

- ~340 prerendered topic/subtopic routes total.
- 29 already have authored FAQs (keep as-is).
- ~310 routes need 3 Q&A each (~930 new pairs).

Sections to cover:

| Section | Routes needing FAQs (approx) |
|---|---|
| physics | 55 |
| physiology | 60 |
| pharmacology | 55 |
| clinical | 50 |
| intensive-care | 45 |
| perioperative | 30 |
| anatomy | 10 |
| chemistry | 5 |

## Authoring rules (per Google's FAQ policy)

- Q&A is **visible on the page** — rendered by a shared `<TopicFaqs>` component above references, not hidden.
- Questions are exam-style and specific to the topic (no generic "What is X?" unless that's the FRCA-relevant framing).
- Answers are 1–3 sentences, factual, no marketing.
- 3 Q&A per topic minimum (a few high-value topics may get more, like the existing 8–10).
- No duplicate questions across topics.
- All in en-GB.

## Technical approach

1. **Add a shared `TopicFaqs` component** (`src/components/TopicFaqs.tsx`) — accordion-style, renders the same `Array<[string, string]>` tuple shape `extract-faqs.ts` already parses.

2. **Per-topic edit pattern**:
   ```tsx
   const <topic>Faqs: Array<[string, string]> = [
     ["Question 1?", "Answer 1."],
     ["Question 2?", "Answer 2."],
     ["Question 3?", "Answer 3."],
   ];
   // …in JSX, before references:
   <TopicFaqs faqs={<topic>Faqs} />
   ```
   `extract-faqs.ts` already recognises the `const <name>Faqs` pattern — no script changes needed.

3. **Verifier change**: extend `verify-prerender.ts` so failure of FAQPage coverage on any topic/subtopic route (not just currently-authored ones) fails the build, gated by an env flag (`STRICT_FAQ_COVERAGE=1`) to avoid breaking the build mid-rollout.

4. **Rollout in batches** (one section per turn, you review and approve before the next):
   - Batch 1: chemistry (5) + anatomy (10) — smallest, proves the pattern
   - Batch 2: perioperative (30)
   - Batch 3: intensive-care (45)
   - Batch 4: clinical (50)
   - Batch 5: pharmacology (55)
   - Batch 6: physiology (60)
   - Batch 7: physics (55)
   - Final: flip `STRICT_FAQ_COVERAGE=1` in `package.json` postbuild

## What I'll deliver this turn (if approved)

- `src/components/TopicFaqs.tsx` — the shared accordion
- Batch 1 only: chemistry + anatomy topic edits (~15 files, ~45 Q&A)
- Postbuild prerender + verifier run confirming the new routes ship FAQPage JSON-LD

After you review Batch 1's content quality and accordion UI, I'll proceed batch by batch.

## Open questions

- Accordion UI: use the existing shadcn `<Accordion>` (single open at a time) — OK?
- Heading: "Frequently asked" vs "Exam-style FAQs" vs "Quick Q&A"?
- Should questions deliberately mirror common FRCA viva stems where possible?
