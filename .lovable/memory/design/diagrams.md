---
name: Anatomy diagram style
description: Required visual + interaction conventions for every anatomy diagram (DiagramToggleBar, gradients, patterns, palette, detail panel, plexus shared module)
type: design
---

All anatomy diagrams under `src/components/diagrams/` must follow `src/components/diagrams/STYLE_GUIDE.md`.

Non-negotiable rules:
- Header is `<DiagramToggleBar>` with `Sutures` + `Labels` toggles (default true). No separate `<h3>` above it.
- Card shell: `<div className="my-6 space-y-4"><div className="bg-muted/30 rounded-xl border border-border p-4">…</div></div>`.
- All `<defs>` ids component-prefixed (e.g. `skb-`, `lcx-`, `pvs-`) to avoid collisions when multiple diagrams render on one page.
- Use HSL tokens only (`hsl(var(--anatomy))`, `hsl(var(--foreground))`, etc.). Small typed colour maps allowed for region encoding (e.g. fossae, V1/V2/V3).
- Every diagram has: radial gradient for depth, tissue/bone pattern overlay, drop-shadow filter on the outer organ, dashed midline + 4-point compass labels, anatomically shaped structures (NOT generic circles).
- Detail panel below SVG with `min-h-[110px]`, 4px left border keyed to the selected region, fallback "Tap a structure…" copy. Always default-select one element so the panel is never empty.
- Labels gated by `showLabels`, sutures/fibres/reference lines gated by `showSutures`. Selected element brightens BOTH itself and the partner of any paired structure.
- `role="img"` + descriptive `aria-label` on every `<svg>`.

Plexus diagrams (cervical, brachial, lumbosacral) use shared primitives from `src/components/diagrams/plexusShared.tsx`:
- `<PlexusCard>` — standard outer shell.
- `<PlexusDetailPanel>` — standard left-border detail card with title/roots/region badge/typed fields. Always use this instead of hand-rolling a panel.
- `<PlexusChipRow<K>>` — standard pill chip row of selectable nerves below the panel. Pass an explicit generic `<K>` to satisfy the setState type.
- Layout: spinal column LEFT, branches fanning RIGHT.

Reference implementations: `SkullBaseDiagram.tsx`, `OrbitBonyAnatomyDiagram.tsx`, `LaryngealNervesDiagram.tsx`, `NeckTrianglesDiagram.tsx`, `LaryngealCrossSectionDiagram.tsx`, `LumbosacralPlexusDiagram.tsx` (canonical plexus example).
