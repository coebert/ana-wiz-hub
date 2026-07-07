# Styling Review & Improvement Plan

## 1. Expert review — what's working, what's not

**Audience reminder.** Resident doctors and clinicians. They read on hospital PCs (bright wards, glare), personal laptops, and phones on-call. They want fast scanability, calm authority (not a consumer app), and clear signposting between exam curricula. The current app already has real strengths — semantic HSL tokens, per-section colour coding, Playfair/Inter pairing, careful diagram system, dark mode, motion-reduced fallbacks. But the visual language is inconsistent and reads more "revision blog" than "clinical reference tool."

### What's working
- Solid design-token discipline in `index.css` (semantic HSL, per-section pairs like `--physics` / `--physics-light`).
- Coherent diagram style guide with a shared toggle bar, radial gradients, pattern fills.
- Sensible typographic contract (Playfair for h1–h3, Inter body).
- Accessibility fundamentals: muted-foreground lightness tuned for AA, SVG dark-mode safety net, reduced-motion overrides.

### What's holding it back

1. **Hero is generic and heavy.** Home page hero is a full-width blue → teal gradient with a giant Playfair headline centred over a faded brain. This is the exact "generic AI/SaaS marketing" look residents will scroll past. It fights the medical-reference tone the rest of the app aims for.
2. **Header is broken at common laptop widths.** The `AnaesthesiaCore` wordmark visibly overlaps the section-nav chips (physics/physiology/pharmacology…) at ~1280 px — see "ysiology" bleeding out from under the logo in the screenshot. This is the single most damaging polish bug because it's on every page.
3. **Nine section colours + FRCA/Final/FFICM chips create rainbow noise.** Physics blue, physiology magenta, pharmacology teal, clinical orange, ICU purple, perioperative yellow, anatomy cyan, chemistry green, drugs violet — plus coloured exam-tag chips on every topic row. On a list of 25 topics the eye has nowhere to rest. Clinicians expect a restrained palette with one accent.
4. **Card system is flat and low-contrast.** Topic rows are white-on-near-white with a thin border and a left accent bar. No hover elevation worth speaking of, no visited state, no clear "you've completed this" affordance beyond a tiny outlined circle. Compared to the density of information, cards feel unloved.
5. **Typography rhythm is off.** Playfair Display used for h1/h2/h3 including small subsection headings feels ornamental on clinical content and hurts scannability. Body Inter is fine but line-length is uncapped in some containers; letter-spacing/weight for eyebrow labels ("MAPS TO", "VIVA VOCE PRACTICE") is inconsistent.
6. **Spacing scale drifts.** Mix of `py-8 / py-12 / py-16 / py-24`, `gap-3/5`, `p-4/5`, `rounded-lg/xl` used inter-changeably. No enforced 4/8 pt rhythm.
7. **Interactive affordances are weak.** Buttons rely on shadcn defaults; there's no distinctive primary/secondary/ghost variant tuned to the brand. Focus rings are default. The `.topic-card` hover is a single `shadow-md`.
8. **Dark mode is a straight token flip.** Cards, borders and muted foregrounds work, but hero gradient, section-light hovers (`--physics-light` at 95% L) and some diagrams weren't tuned for a dark surface — hovering a section card in dark mode washes it out.
9. **Iconography inconsistent.** Lucide icons at various sizes (`h-4`, `h-5`, `h-8`) with no shared stroke-width convention. Section icons and the brain logo don't share a visual family.
10. **Empty states / progress micro-UI.** Progress rings and completion badges are functional but visually timid; overall progress bar in the hero is a thin translucent strip that's easy to miss.
11. **Marketing-tone microcopy in a reference tool.** "Master the science and clinical practice…" — swap for a factual, confident tone that respects the reader.

## 2. Design north star

Move the visual language from *revision blog with medical accent colours* → *clinical reference tool with editorial polish*.

- **Restrained palette.** Neutral canvas + one primary (deep clinical navy or teal) + one accent (warm amber) for calls-to-action and progress. Section colours reduced to **muted category dots/rules**, not full hover-tints.
- **Editorial typography.** Keep Playfair for hero + page h1 only. Switch h2/h3 to a modern sans (Inter Tight or Söhne-alike) for scannability. Add a mono variant for values (`P₅₀ 26.7 mmHg`).
- **Card as a proper object.** Consistent 12 px radius, subtle 1 px border, layered hover (border tint + 1 px translate-y + shadow), clear visited/completed states, sensible internal spacing (16 / 20 / 24).
- **Density = medical fluency.** Slightly tighter line-height on lists, more whitespace between blocks. Section pages become scannable indexes, not stacked marketing cards.
- **Focus on the topic page.** That's where residents actually spend time; it deserves the most craft (sticky mini-TOC, better section rhythm, in-content callout styles for Learning Objectives / Key points / Clinical pearls).

## 3. Phased plan

Six phases, each independently shippable. Each is small enough to verify visually and revert.

### Phase 1 — Fix the polish bugs (blocking)
- Repair header overflow: wordmark truncation / responsive collapse at <1280 px so section chips never sit under the logo.
- Audit any `text-white`, `bg-black`, hard-coded hex outside the token file; convert to semantic tokens (already enforced by lint — sweep any exceptions).
- Normalise spacing scale: pick 4/8/12/16/20/24/32/48/64; sweep pages to snap to it.

### Phase 2 — Retune the design tokens
- Introduce a two-tier palette in `index.css`:
  - **Brand:** `--primary` (deep clinical navy, e.g. 215 55% 22%), `--primary-hover`, `--accent` (warm amber for CTAs/progress), `--surface`, `--surface-raised`, `--surface-sunken`.
  - **Categories:** demote section colours to `--cat-physics` etc., used only for a 4 px left rule, dot, and category badge — never as hover backgrounds.
- Add elevation tokens: `--shadow-1/2/3` (soft, single-direction, tuned for both themes).
- Retune dark mode: darker surface (`215 30% 8%`), lifted cards (`215 25% 12%`), warmer muted text, higher-chroma accent.

### Phase 3 — Typography system
- Load Inter Tight (or keep Inter but drop Playfair to hero + h1 only).
- Define semantic classes: `.eyebrow`, `.display`, `.h1`, `.h2`, `.h3`, `.lead`, `.body`, `.small`, `.mono` — with fixed weight, size, line-height, tracking.
- Sweep pages/topics to use the semantic classes rather than inline Tailwind combos.

### Phase 4 — Component refresh (shadcn variants)
- **Button:** new `primary`, `secondary`, `ghost`, `outline`, `danger` variants — 40 px default, 32 px sm, 48 px lg, 8 px radius, distinct hover + focus-ring using `--ring` (2 px, 2 px offset).
- **Card / TopicCard:** unified spec (12 px radius, 1 px border, layered hover, category rule left, completed state uses accent tick + subtle surface tint).
- **Badge / Chip (exam tags):** neutral outline chip with a coloured dot, not a full coloured background — reduces rainbow noise on topic lists.
- **Input / Combobox / Command palette:** align focus + border with new ring token.
- **Progress affordances:** promote `ProgressRing` visually (thicker stroke, accent fill), redesign the header progress bar as a proper 4 px accent track.

### Phase 5 — Page recompositions
- **Home (`Index.tsx`):** replace gradient hero with a calmer split hero — left: wordmark, one-line factual tagline, primary CTA ("Start revising"), secondary ("Take a viva"); right: current-progress card showing overall %, next topic, recent activity. Section grid becomes an 8-cell restrained grid with category dot + topic count + progress bar.
- **Section pages (e.g. `PhysicsSection.tsx`):** sticky sub-nav (Introduction / Topics / References), typographic topic index, category rule on left; completed rows subtly recede rather than fully changing colour.
- **Topic pages:** sticky mini-TOC on ≥lg, tighter learning-objectives block, standardised callout components (Key point / Clinical pearl / Pitfall / Exam tip) with a small icon + left rule using semantic colour.
- **Footer:** simpler, single-row, muted.

### Phase 6 — Micro-interactions & motion polish
- Standardise hover/press/focus transitions (150 ms ease-out, 8 ms opacity swap, 1 px translate on cards).
- Motion-preference already respected — extend to the new hover elevations.
- Skeleton states for topic lists and progress cards (avoid layout jumps on first paint).
- Reserve the neon-splash animation for `/` first visit only (currently blocks first paint of home — see screenshot which caught the splash mid-frame).

## 4. Deliverables per phase

Each phase ships with:
1. Updated `index.css` / `tailwind.config.ts` tokens (Phases 1–3).
2. Refreshed component files under `src/components/ui/` (Phase 4).
3. Updated page composition (Phase 5).
4. Playwright visual snapshots for home, one section page, one topic page, both themes, mobile + desktop.
5. Short before/after screenshot pair posted in the PR description.

## 5. Guardrails
- No hard-coded colours; every value goes through a token.
- Diagram style guide (`src/components/diagrams/STYLE_GUIDE.md`) is authoritative — token renames must be reflected there.
- No regressions to existing tests: `curriculum-links`, `topic-anchor-links`, `diagrams-dark-mode-contrast`, `seo-meta-lengths`.
- All work stays in presentation code — no changes to data, routes, or business logic.

## 6. Suggested order to start
Ship Phase 1 immediately (header overflow is user-visible on every page). Then agree the palette/typography direction (Phase 2 + 3 together, one round of visual approval) before touching components and pages.
