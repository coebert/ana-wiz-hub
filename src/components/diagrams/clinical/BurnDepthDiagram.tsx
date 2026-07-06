import { useState } from "react";
import { cn } from "@/lib/utils";
import { DiagramFigure, svgImgProps, svgDecorativeProps } from "./_shared/DiagramFigure";

/**
 * BurnDepthDiagram
 *
 * Cross-section of skin showing the four clinical burn depths and which
 * tissue layers each one destroys. Hover/tap a depth chip to highlight the
 * layers it involves; the legend underneath lists the bedside features.
 */

type Depth = "superficial" | "superficialPartial" | "deepPartial" | "fullThickness";

interface DepthInfo {
  label: string;
  short: string;
  /** Y-coordinate of the burn front in the SVG (skin top = 0, deep = ~210). */
  frontY: number;
  /** Tailwind colour for the chip + burn band. */
  accent: string;
  features: string;
  healing: string;
}

const DEPTHS: Record<Depth, DepthInfo> = {
  superficial: {
    label: "Superficial (epidermal)",
    short: "Superficial",
    frontY: 38,
    accent: "bg-amber-200 text-amber-900 border-amber-400",
    features: "Erythema, dry, painful, no blistering. Blanches briskly. Example: sunburn.",
    healing: "Heals in ~7 days, no scarring",
  },
  superficialPartial: {
    label: "Superficial partial thickness",
    short: "Superficial partial",
    frontY: 78,
    accent: "bg-rose-300 text-rose-900 border-rose-500",
    features: "Blisters, moist pink base, very painful. Brisk capillary refill.",
    healing: "Heals in ~14 days, minimal scarring",
  },
  deepPartial: {
    label: "Deep partial thickness",
    short: "Deep partial",
    frontY: 130,
    accent: "bg-rose-500 text-white border-rose-700",
    features: "Mottled red/white, reduced sensation, sluggish capillary refill.",
    healing: "Often grafted; heals 3+ weeks with scarring",
  },
  fullThickness: {
    label: "Full thickness",
    short: "Full thickness",
    frontY: 195,
    accent: "bg-stone-800 text-stone-100 border-stone-900",
    features: "Waxy, leathery or charred. Painless (nerves destroyed). No blanching.",
    healing: "Requires excision and grafting; circumferential burns may need escharotomy",
  },
};

// Skin layer Y-bands in the SVG canvas (viewBox 0 0 360 240)
const LAYERS = [
  { id: "epidermis", label: "Epidermis", y: 20, h: 22, fill: "hsl(35 60% 86%)" },
  { id: "papillary", label: "Papillary dermis", y: 42, h: 38, fill: "hsl(25 55% 72%)" },
  { id: "reticular", label: "Reticular dermis", y: 80, h: 60, fill: "hsl(18 50% 58%)" },
  { id: "subcutis", label: "Subcutis (fat)", y: 140, h: 55, fill: "hsl(40 55% 80%)" },
  { id: "muscle", label: "Muscle / fascia", y: 195, h: 30, fill: "hsl(0 45% 32%)" },
];

const DEPTH_INVOLVES: Record<Depth, string[]> = {
  superficial: ["epidermis"],
  superficialPartial: ["epidermis", "papillary"],
  deepPartial: ["epidermis", "papillary", "reticular"],
  fullThickness: ["epidermis", "papillary", "reticular", "subcutis"],
};

export const BurnDepthDiagram = () => {
  const [active, setActive] = useState<Depth>("deepPartial");
  const front = DEPTHS[active].frontY;
  const involved = new Set(DEPTH_INVOLVES[active]);

  return (
    <DiagramFigure
      id="burn-depth"
      title="Burn depth across skin layers"
      description="Cross-section of skin showing how each burn depth (superficial, superficial partial, deep partial, full thickness) destroys progressively deeper tissue layers."
    >
      <div className="space-y-3">
        {/* Depth selector chips */}
        <div role="tablist" aria-label="Burn depth" className="flex flex-wrap gap-2">
          {(Object.keys(DEPTHS) as Depth[]).map((d) => {
            const isActive = d === active;
            return (
              <button
                key={d}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(d)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium border transition-all",
                  isActive
                    ? DEPTHS[d].accent + " shadow-sm scale-[1.02]"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
                )}
              >
                {DEPTHS[d].short}
              </button>
            );
          })}
        </div>

        {/* SVG cross-section */}
        <div className="rounded-lg border border-border bg-card p-3 overflow-x-auto">
          <svg
            viewBox="0 0 360 240"
            className="w-full h-auto min-w-[320px] max-w-[560px] mx-auto block"
            {...svgImgProps({ id: "burn-depth" })}
          >
            <title id="burn-depth-title">Skin cross-section showing burn depth</title>
            <desc id="burn-depth-desc">
              Five horizontal bands representing epidermis, papillary dermis, reticular dermis, subcutis and muscle.
              A red burn front extends from the surface to the depth corresponding to the selected burn category.
            </desc>

            {/* Skin layers */}
            {LAYERS.map((layer) => {
              const dim = !involved.has(layer.id) && layer.id !== "muscle";
              return (
                <g key={layer.id}>
                  <rect
                    x={20}
                    y={layer.y}
                    width={240}
                    height={layer.h}
                    fill={layer.fill}
                    opacity={dim ? 0.45 : 1}
                    stroke="hsl(var(--border))"
                    strokeWidth={0.5}
                  />
                  {/* Layer label on the right */}
                  <line
                    x1={260}
                    y1={layer.y + layer.h / 2}
                    x2={272}
                    y2={layer.y + layer.h / 2}
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={0.7}
                    {...svgDecorativeProps}
                  />
                  <text
                    x={276}
                    y={layer.y + layer.h / 2 + 3}
                    fontSize={9}
                    fill="hsl(var(--foreground))"
                    fontFamily="ui-sans-serif, system-ui"
                  >
                    {layer.label}
                  </text>
                </g>
              );
            })}

            {/* Burn front overlay — semi-transparent red descending to frontY */}
            <rect
              x={20}
              y={20}
              width={240}
              height={front - 20}
              fill="hsl(0 75% 35% / 0.42)"
              stroke="hsl(0 80% 30%)"
              strokeWidth={1}
            />
            {/* Front-line emphasis */}
            <line
              x1={20}
              y1={front}
              x2={260}
              y2={front}
              stroke="hsl(0 80% 30%)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />

            {/* Depth scale on the left — all four burn depths permanently labelled */}
            <g {...svgDecorativeProps}>
              <line x1={12} y1={20} x2={12} y2={225} stroke="hsl(var(--muted-foreground))" strokeWidth={0.6} />
              {(Object.keys(DEPTHS) as Depth[]).map((d) => {
                const y = DEPTHS[d].frontY;
                const isActive = d === active;
                return (
                  <g key={d}>
                    <line
                      x1={9}
                      y1={y}
                      x2={15}
                      y2={y}
                      stroke={isActive ? "hsl(0 80% 30%)" : "hsl(var(--muted-foreground))"}
                      strokeWidth={isActive ? 1.2 : 0.6}
                    />
                  </g>
                );
              })}
              <text x={4} y={18} fontSize={7} fill="hsl(var(--muted-foreground))">0 mm</text>
              <text x={4} y={228} fontSize={7} fill="hsl(var(--muted-foreground))">~5 mm</text>
            </g>

            {/* Permanent depth-class labels inside the skin column so all four are visible at once */}
            {(Object.keys(DEPTHS) as Depth[]).map((d) => {
              const y = DEPTHS[d].frontY;
              const isActive = d === active;
              return (
                <text
                  key={`lbl-${d}`}
                  x={26}
                  y={y - 2}
                  fontSize={7.5}
                  fontWeight={isActive ? 700 : 500}
                  fill={isActive ? "hsl(0 80% 25%)" : "hsl(var(--foreground))"}
                  opacity={isActive ? 1 : 0.75}
                  fontFamily="ui-sans-serif, system-ui"
                >
                  {DEPTHS[d].short}
                </text>
              );
            })}

            {/* Active depth callout removed — the permanent depth-class labels
                inside the skin column already show the active depth, so an extra
                callout duplicated the same text (e.g. "Deep partial" twice). */}
          </svg>
        </div>

        {/* Bedside features card */}
        <div className="grid sm:grid-cols-[1fr_auto] gap-3 rounded-lg border border-border bg-muted/40 p-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Bedside features
            </p>
            <p className="text-sm text-foreground mt-0.5">{DEPTHS[active].features}</p>
          </div>
          <div className="text-xs text-muted-foreground sm:text-right sm:self-end">
            {DEPTHS[active].healing}
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default BurnDepthDiagram;
