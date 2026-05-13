import { useState, useRef, useEffect, ReactNode } from "react";

export interface HotspotDef {
  id: string;
  /** Short label shown as the tooltip title. */
  label: string;
  /** Plain-language explanation (1–2 short sentences). */
  detail: string;
  /** Hotspot geometry in SVG user units (matches diagram viewBox). */
  shape:
    | { type: "rect"; x: number; y: number; w: number; h: number; rx?: number }
    | { type: "circle"; cx: number; cy: number; r: number }
    | { type: "ellipse"; cx: number; cy: number; rx: number; ry: number };
}

interface HotspotLayerProps {
  hotspots: HotspotDef[];
  /** SVG viewBox dims — used to anchor the floating tooltip. */
  viewBoxWidth?: number;
  viewBoxHeight?: number;
}

/**
 * Overlay layer that adds invisible-but-interactive hotspots over an SVG
 * pathophys diagram. On hover OR tap, shows a small explainer card for
 * the labelled structure (AChR, myelin, GABA, basal-ganglia node, etc.).
 *
 * Render this AS THE LAST CHILD inside the same <svg> as the diagram
 * body so coordinates align with the diagram viewBox.
 */
export const HotspotLayer = ({
  hotspots,
  viewBoxWidth = 460,
  viewBoxHeight = 250,
}: HotspotLayerProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<SVGGElement | null>(null);

  // Dismiss on outside tap
  useEffect(() => {
    if (!activeId) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (containerRef.current && target && !containerRef.current.contains(target)) {
        setActiveId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [activeId]);

  const active = hotspots.find((h) => h.id === activeId);

  const renderShape = (h: HotspotDef, isActive: boolean) => {
    const common = {
      // Invisible-but-clickable fill ensures pointer events fire across the whole region
      fill: isActive ? "hsl(var(--primary) / 0.18)" : "hsl(var(--primary) / 0.001)",
      stroke: isActive ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.55)",
      strokeWidth: isActive ? 1.4 : 1,
      strokeDasharray: isActive ? undefined : "3 3",
      style: { cursor: "pointer", transition: "fill 120ms, stroke 120ms" },
      onMouseEnter: () => setActiveId(h.id),
      onMouseLeave: () => setActiveId((id) => (id === h.id ? null : id)),
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveId((id) => (id === h.id ? null : h.id));
      },
      onFocus: () => setActiveId(h.id),
      onBlur: () => setActiveId((id) => (id === h.id ? null : id)),
      tabIndex: 0,
      role: "button" as const,
      "aria-label": `${h.label}: ${h.detail}`,
    };

    if (h.shape.type === "rect") {
      return (
        <rect
          key={h.id}
          x={h.shape.x}
          y={h.shape.y}
          width={h.shape.w}
          height={h.shape.h}
          rx={h.shape.rx ?? 4}
          {...common}
        />
      );
    }
    if (h.shape.type === "circle") {
      return <circle key={h.id} cx={h.shape.cx} cy={h.shape.cy} r={h.shape.r} {...common} />;
    }
    return (
      <ellipse
        key={h.id}
        cx={h.shape.cx}
        cy={h.shape.cy}
        rx={h.shape.rx}
        ry={h.shape.ry}
        {...common}
      />
    );
  };

  // Compute tooltip anchor coords for the active hotspot
  let tipX = 0;
  let tipY = 0;
  if (active) {
    if (active.shape.type === "rect") {
      tipX = active.shape.x + active.shape.w / 2;
      tipY = active.shape.y + active.shape.h + 6;
    } else if (active.shape.type === "circle") {
      tipX = active.shape.cx;
      tipY = active.shape.cy + active.shape.r + 6;
    } else {
      tipX = active.shape.cx;
      tipY = active.shape.cy + active.shape.ry + 6;
    }
  }

  // Estimate tooltip width/height in SVG units, then clamp into viewBox
  const TIP_W = 170;
  const TIP_H = 56;
  let tx = Math.max(4, Math.min(viewBoxWidth - TIP_W - 4, tipX - TIP_W / 2));
  let ty = tipY;
  if (ty + TIP_H > viewBoxHeight - 4) {
    // flip above
    if (active) {
      if (active.shape.type === "rect") ty = active.shape.y - TIP_H - 6;
      else if (active.shape.type === "circle") ty = active.shape.cy - active.shape.r - TIP_H - 6;
      else ty = active.shape.cy - active.shape.ry - TIP_H - 6;
    }
    ty = Math.max(4, ty);
  }

  return (
        <g ref={containerRef} className="hotspot-layer">
      {hotspots.map((h) => renderShape(h, h.id === activeId))}

      {active && (
        <g transform={`translate(${tx} ${ty})`} pointerEvents="none">
          <rect
            x={0}
            y={0}
            width={TIP_W}
            height={TIP_H}
            rx={6}
            fill="hsl(var(--popover))"
            stroke="hsl(var(--primary))"
            strokeWidth={1}
            opacity={0.98}
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.18))"
          />
          <text x={8} y={14} fontSize={9} fontWeight={700} className="fill-foreground">
            {active.label}
          </text>
          <foreignObject x={8} y={18} width={TIP_W - 16} height={TIP_H - 22}>
            <div
              style={{
                fontSize: "9px",
                lineHeight: 1.35,
                color: "hsl(var(--muted-foreground))",
                fontFamily: "inherit",
              }}
            >
              {active.detail}
            </div>
          </foreignObject>
        </g>
      )}
    </g>
  );
};

/**
 * Convenience caption shown beneath the diagram explaining the hotspots.
 */
export const HotspotHint = ({ children }: { children?: ReactNode }) => (
      <p className="text-[11px] text-muted-foreground mt-1 italic">
    {children ?? "Hover or tap the dashed regions to reveal what each labelled structure does."}
  </p>
  );

export default HotspotLayer;
