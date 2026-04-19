import { ReactNode } from "react";
import { withAlpha } from "@/lib/color-utils";

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
 * Root colours are deliberately NOT enforced here — each plexus has its own
 * mnemonic colour story (e.g. brachial cord colours mapped to lateral / posterior /
 * medial). The shared bits are the SHELL and the DETAIL PANEL.
 */

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
  <div className="my-6 space-y-4">
    <div className="bg-muted/30 rounded-xl border border-border p-4">{children}</div>
  </div>
);
