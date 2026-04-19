# Anatomy Diagram Style Guide

This document defines the visual + interaction conventions for all anatomy diagrams in the curriculum (head & neck, spine, neuro, thorax, cardiac, abdomen, limbs). Follow it whenever creating, polishing, or reviewing a diagram component under `src/components/diagrams/`.

The reference implementations are:
- `SkullBaseDiagram.tsx`
- `OrbitBonyAnatomyDiagram.tsx`
- `LaryngealNervesDiagram.tsx`
- `NeckTrianglesDiagram.tsx`
- `LaryngealCrossSectionDiagram.tsx`

---

## 1. Card shell

```tsx
<div className="my-6 space-y-4">
  <div className="bg-muted/30 rounded-xl border border-border p-4">
    {/* DiagramToggleBar */}
    {/* Optional legend row */}
    {/* SVG */}
    {/* Mnemonic / footer */}
    {/* Detail panel for the selected element */}
  </div>
</div>
```

- Outer wrapper: `my-6 space-y-4`.
- Card: `bg-muted/30 rounded-xl border border-border p-4`.
- Always centre the SVG with `mx-auto` and constrain width with `max-w-2xl` (or wider only when essential).

## 2. Header — DiagramToggleBar

Every diagram MUST use `DiagramToggleBar` at the top of its card:

```tsx
import { DiagramToggleBar } from "./DiagramToggleBar";

<DiagramToggleBar
  title="Sagittal section of the larynx — cartilage skeleton"
  subtitle="Tap a cartilage to reveal clinical relevance"
  toggles={[
    { label: "Sutures", active: showSutures, onChange: () => setShowSutures(s => !s) },
    { label: "Labels",  active: showLabels,  onChange: () => setShowLabels(s => !s)  },
  ]}
/>
```

Conventions for toggles:
- `Sutures` — gates anatomical detail lines: bony sutures, fibre directions, tracheal-ring outlines, vessel wall hints, dotted reference axes.
- `Labels` — gates all text labels and leader lines on the SVG (NOT the legend chips or detail panel).
- Add other toggles only when the diagram has a clearly distinct gated layer (e.g. `Subdivisions`, `Tracts`, `Foramina`). Keep the universal two first.
- Default state: both `true`.
- Always put the user-facing title on the toggle bar. Do NOT add a separate `<h3>` above it.

## 3. SVG depth + texture system

Define these in `<defs>` (prefix every id with a 3-letter component slug, e.g. `skb-`, `lcx-`, `pvs-`, to avoid collisions when multiple diagrams render on one page):

### 3a. Radial gradients for body cavity / fossa depth

```tsx
<radialGradient id="skb-anteriorShade" cx="50%" cy="40%" r="60%">
  <stop offset="0%"   stopColor="hsl(var(--anatomy))" stopOpacity="0.22" />
  <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.04" />
</radialGradient>
```

Use one gradient per anatomical region. Keep stops in the 0.04 → 0.22 opacity range; anything stronger overpowers the labels.

### 3b. Tissue / bone patterns

```tsx
{/* Bone grain — subtle dots */}
<pattern id="skb-boneGrain" patternUnits="userSpaceOnUse" width="6" height="6">
  <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
</pattern>

{/* Muscle fibres — directional lines */}
<pattern id="nck-muscleFibre" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(35)">
  <line x1="0" y1="3" x2="6" y2="3" stroke="hsl(0,40%,40%)" strokeWidth="0.5" opacity="0.35" />
</pattern>

{/* Collagen / ligament */}
<pattern id="sc-collagen" patternUnits="userSpaceOnUse" width="4" height="14" patternTransform="rotate(10)">
  <line x1="2" y1="0" x2="2" y2="14" stroke="hsl(210,25%,55%)" strokeWidth="0.5" opacity="0.3" />
</pattern>

{/* Elastic fibres (ligamentum flavum, aryepiglottic) */}
<pattern id="sc-elastic" patternUnits="userSpaceOnUse" width="8" height="20">
  <path d="M4,0 Q6,5 4,10 Q2,15 4,20" fill="none" stroke="hsl(55,50%,48%)" strokeWidth="0.6" opacity="0.3" />
</pattern>
```

Layer the pattern over the base fill, NEVER instead of it. Use `pointerEvents="none"` on overlay layers so clicks still hit the underlying anatomy.

### 3c. Drop-shadow filter for vault/organ depth

```tsx
<filter id="skb-vaultShadow" x="-10%" y="-10%" width="120%" height="120%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
  <feOffset dx="0" dy="2" result="off" />
  <feComponentTransfer><feFuncA type="linear" slope="0.32" /></feComponentTransfer>
  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
</filter>
```

Apply with `filter="url(#skb-vaultShadow)"` to the outermost organ outline (skull, larynx, vertebra). Do not stack shadows on inner structures.

## 4. Colour palette (semantic only)

Use HSL tokens from `index.css`. NEVER hard-code Tailwind palette classes (`text-red-500`).

| Use | Token |
|---|---|
| Section accent (anatomy) | `hsl(var(--anatomy))` |
| Card background | `hsl(var(--muted))` / `bg-muted/30` |
| Borders, leader lines | `hsl(var(--border))`, `hsl(var(--muted-foreground))` |
| Text | `hsl(var(--foreground))`, `hsl(var(--muted-foreground))` |
| Selected highlight | `hsl(var(--primary))` |

When you need extra colour to encode region/category (e.g. anterior/middle/posterior fossa, V1/V2/V3, dermatome bands), define a small typed map at the top of the file:

```tsx
const fossaColors = {
  anterior:  "hsl(var(--anatomy))",
  middle:    "hsl(210 70% 55%)",
  posterior: "hsl(280 50% 55%)",
};
```

Keep these maps small (3–6 entries). Reuse the same hue families across diagrams (blue=middle/venous, red=arterial, purple=neural, yellow=elastic, green=epidural/pia).

## 5. Anatomical fidelity

- Foramina, vessels, and cartilages should have **anatomically suggestive shapes** — not generic circles. Ovale = oval, spinosum = small round, jugular = large irregular path, SOF = curved slit, IAM = horizontal slit, tracheal rings = open C-shapes.
- Use `<radialGradient>` fills on cartilages and viscera to suggest depth.
- Bilateral structures (paired foramina, cords, cervical roots) should mirror around the midline. Show a faint dashed midline (`strokeDasharray="2 4" opacity="0.25"`) for orientation.
- Add a compass: small `ANTERIOR / POSTERIOR / LEFT / RIGHT` (or `SUPERIOR / INFERIOR`) labels at the four edges of the viewBox in `text-[9px] fill-muted-foreground`.

## 6. Interaction

```tsx
const [selected, setSelected] = useState<string | null>("default-id");
```

- Always have one element selected by default so the detail panel is non-empty on first render.
- Clicking an element toggles it; clicking the selected element again deselects.
- Highlight the selected element with: stronger fill opacity (0.85 vs 0.55), thicker stroke (1.6 vs 0.8), and brightened leader line.
- For paired structures: selecting one highlights both. Show the label only on the "primary" side to avoid duplication.

## 7. Detail panel

Below the SVG, render a fixed-height panel:

```tsx
<div className="mt-4 min-h-[110px]">
  {selectedItem ? (
    <div
      className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
      style={{ borderLeftWidth: 4, borderLeftColor: regionColor }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-foreground text-sm">{selectedItem.label}</p>
        <span
          className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
          style={{ background: `${regionColor}26`, color: regionColor }}
        >
          {selectedItem.region}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Transmits:</span> {selectedItem.contents}
      </p>
      <p className="text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Clinical:</span> {selectedItem.clinical}
      </p>
    </div>
  ) : (
    <p className="text-xs text-muted-foreground text-center italic">
      Tap a structure above to see clinical relevance.
    </p>
  )}
</div>
```

Use a coloured 4px left border keyed to the region/category. Keep the placeholder copy on-brand and inviting.

## 8. Typography inside SVG

- Labels: `className="text-[8px] fill-foreground select-none pointer-events-none"`. Bump to `text-[9px]` only when readability suffers.
- Italicised anatomical names (`crista galli`, `sella turcica`, `vallecula`): `className="text-[7.5px] fill-muted-foreground italic"`.
- Compass / orientation: `text-[9px] fill-muted-foreground font-medium`.
- Always pair labels with a hairline leader line (`strokeWidth={0.5}`, `opacity={0.45}`); thicken + brighten when its target is selected.

## 9. Accessibility

- Every `<svg>` MUST have `role="img"` and a descriptive `aria-label`.
- Toggle buttons get `aria-pressed` (handled by `DiagramToggleBar`).
- Don't rely on colour alone — pair coloured legends with text and a left-border accent in the detail panel.

## 10. Mnemonic / footer (optional but encouraged)

A single italic line directly under the SVG carrying the classical FRCA mnemonic:

```tsx
<p className="text-xs text-center text-muted-foreground mt-2 italic">
  <span className="font-semibold not-italic text-foreground">Standing Room Only — </span>
  CN V₁ → SOF, V₂ → Rotundum, V₃ → Ovale.
</p>
```

## 11. Performance + structural rules

- Define typed data arrays at the top of the file. Render the SVG by mapping over them. Don't repeat `<g>` blocks by hand.
- Keep each diagram self-contained — no shared state across diagrams.
- Default `viewBox` to a clean ratio (e.g. `600 × 470`, `300 × 400`) and rely on `className="w-full max-w-2xl"` for sizing.
- Never use `width="100%"` on the SVG; use `viewBox` + Tailwind width classes.

## 12. Craft checklist before merging

- [ ] Uses `DiagramToggleBar` with at least `Sutures` + `Labels`
- [ ] All ids in `<defs>` are component-prefixed
- [ ] Only HSL semantic tokens (no `text-red-500`, no raw hex except in small typed colour maps)
- [ ] Anatomically shaped structures, not generic shapes
- [ ] Compass / orientation labels present
- [ ] Default selection so detail panel is never empty
- [ ] Detail panel uses left-border accent keyed to region
- [ ] Mnemonic / footer where one exists in FRCA tradition
- [ ] `role="img"` + `aria-label` on `<svg>`
- [ ] Mobile: card looks good at 375px width

When in doubt, mirror `SkullBaseDiagram.tsx` or `OrbitBonyAnatomyDiagram.tsx`.
