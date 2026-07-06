import { ReactNode } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Shared visual grammar for nerve plexus diagrams (cervical, brachial, lumbosacral).
 *
 * Goal: every plexus diagram should:
 *  - sit inside the standard card shell (`my-6 space-y-4` + `bg-muted/30 rounded-xl border border-border p-4`)
 *  - use `<DiagramToggleBar>` at the top
 *  - draw spinal column on the LEFT, branches fanning to the RIGHT
 *  - have ONE element selected by default so the detail panel is never empty
 *  - render the detail panel via `<PlexusDetailPanel>` below the SVG with a 4 px left border keyed to the selected nerve
 *  - render a chip row via `<PlexusChipRow>` so the selectable nerves are visible without scanning the SVG
 *
 * Root colours ARE enforced via {@link ROOT_COLORS} so that any given spinal
 * root (e.g. C7, L4) shows the same hue across cervical, brachial and
 * lumbosacral plexus diagrams. Each plexus may still pick its own colours for
 * trunks / divisions / cords / branches — the shared bit is the ROOT level.
 */

/**
 * Canonical hue ramp for spinal nerve roots, shared across every plexus diagram.
 *
 * Design:
 *  - C1–T1 forms a smooth red→orange→yellow→green→blue→indigo arc so adjacent
 *    cervical roots are visually distinguishable but stay within one family.
 *  - L1–S4 reuses the same arc on the lumbar/sacral half of the cord, so the
 *    eye learns "warm = upper, cool = lower" once and applies it everywhere.
 *  - Values are deliberately mid-saturation / mid-lightness HSL so the same
 *    swatch reads correctly on dark backgrounds, in chip pills, and as SVG fill.
 *
 * Use this map for: vertebra label fill, root node fill, dermatome legend
 * swatches, and any "root pill" UI in plexus diagrams.
 */
export const ROOT_COLORS: Record<string, string> = {
  // Cervical
  C1: "hsl(330, 50%, 52%)",
  C2: "hsl(350, 60%, 54%)",
  C3: "hsl(10, 65%, 54%)",
  C4: "hsl(25, 68%, 52%)",
  C5: "hsl(0, 65%, 55%)",
  C6: "hsl(20, 70%, 52%)",
  C7: "hsl(45, 65%, 48%)",
  C8: "hsl(150, 50%, 42%)",
  // Thoracic (only T1 is plexus-relevant)
  T1: "hsl(210, 55%, 50%)",
  // Lumbosacral
  L1: "hsl(0, 65%, 55%)",
  L2: "hsl(20, 70%, 52%)",
  L3: "hsl(45, 65%, 48%)",
  L4: "hsl(90, 45%, 45%)",
  L5: "hsl(150, 50%, 42%)",
  S1: "hsl(190, 55%, 48%)",
  S2: "hsl(210, 55%, 50%)",
  S3: "hsl(250, 45%, 55%)",
  S4: "hsl(280, 45%, 55%)",
};

/** Helper — returns the canonical root colour, or foreground if unknown. */
export const rootColor = (level: string): string =>
  ROOT_COLORS[level.toUpperCase()] ?? "hsl(var(--foreground))";

export interface PlexusDetailField {
  /** Bold inline label, e.g. "Motor", "Sensory", "Block". */
  label: string;
  /** Body copy. Plain string only — no React nodes. */
  value: string;
}

interface PlexusDetailPanelProps {
  /** Nerve / element name shown as the panel heading. */
  title: string;
  /** Spinal-root contributions, e.g. "C5, C6, C7". Rendered next to the title. */
  roots?: string;
  /** Region badge in the top-right (e.g. "Lumbar", "Lateral cord", "Superficial"). */
  region?: string;
  /** Accent colour for the left border + region badge. HSL string. */
  accent: string;
  /** One row per clinically meaningful field. */
  fields: PlexusDetailField[];
  /** Re-mount key so the panel animates when the selection changes. */
  reactKey?: string;
}

/**
 * Standard detail panel rendered below every plexus SVG.
 * Matches STYLE_GUIDE.md §7 — fixed min-height, 4 px left border keyed to region,
 * region badge top-right with translucent fill of the accent colour.
 */
export const PlexusDetailPanel = ({
  title,
  roots,
  region,
  accent,
  fields,
  reactKey,
}: PlexusDetailPanelProps) => {
  return (
    <div
      key={reactKey}
      className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5 min-h-[110px] animate-fade-in"
      style={{ borderLeftWidth: 4, borderLeftColor: accent }}
    >
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <p className="font-semibold text-foreground text-sm">{title}</p>
        {roots && <span className="text-xs text-muted-foreground">({roots})</span>}
        {region && (
          <span
            className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md ml-auto"
            style={{ background: withAlpha(accent, 0.15), color: accent }}
          >
            {region}
          </span>
        )}
      </div>
      {fields.map((f) => (
        <p key={f.label} className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{f.label}:</span> {f.value}
        </p>
      ))}
    </div>
  );
};

interface PlexusChipRowProps<K extends string> {
  items: { key: K; label: string; color: string }[];
  selected: K;
  onSelect: (key: K) => void;
}

/**
 * Standard pill chip row of selectable nerves shown below the detail panel.
 * Selected chip gets a coloured border + soft tinted background keyed to the nerve colour.
 */
export const PlexusChipRow = <K extends string>({
  items,
  selected,
  onSelect,
}: PlexusChipRowProps<K>): ReactNode => {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((it) => {
        const isActive = it.key === selected;
        return (
              <button
            key={it.key}
            type="button"
            onClick={() => onSelect(it.key)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors border ${
              isActive ? "text-foreground" : "border-border text-muted-foreground hover:bg-muted/50"
            }`}
            style={
              isActive
                ? { borderColor: it.color, backgroundColor: withAlpha(it.color, 0.09) }
                : undefined
            }
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: it.color, opacity: 0.7 }}
            />
            {it.label}
          </button>
  );
      })}
    </div>
  );
};

/**
 * Standard outer card shell for plexus diagrams.
 * Matches STYLE_GUIDE.md §1.
 */
export const PlexusCard = ({ children }: { children: ReactNode }) => (
    <DiagramFigure
      id="plexus-shared"
      title="Plexus shared"
      description="Auto-generated wrapper for the Plexus shared anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
            <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">{children}</div>
    </div>
    </DiagramFigure>
  );
