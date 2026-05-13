import { useState } from "react";
import { cn } from "@/lib/utils";

interface VolumeSegment {
  id: string;
  label: string;
  fullName: string;
  value: number; // ml
  color: string;
  definition: string;
}

const segments: VolumeSegment[] = [
  { id: "irv", label: "IRV", fullName: "Inspiratory Reserve Volume", value: 3100, color: "hsl(210, 70%, 55%)", definition: "Maximum volume that can be inspired above tidal volume. Recruited during exercise or deep breathing." },
  { id: "tv", label: "TV", fullName: "Tidal Volume", value: 500, color: "hsl(150, 60%, 45%)", definition: "Volume of air moved in or out during normal quiet breathing. Typically 6–8 ml/kg ideal body weight (~500 ml in a 70 kg adult)." },
  { id: "erv", label: "ERV", fullName: "Expiratory Reserve Volume", value: 1200, color: "hsl(35, 85%, 50%)", definition: "Maximum volume that can be expired below tidal volume (from FRC to RV). Reduced in obesity and pregnancy." },
  { id: "rv", label: "RV", fullName: "Residual Volume", value: 1200, color: "hsl(0, 65%, 55%)", definition: "Volume remaining in the lungs after maximal expiration. Cannot be measured by spirometry — requires body plethysmography or helium dilution. Increased in air trapping (COPD)." },
];

interface CapacityDef {
  id: string;
  label: string;
  fullName: string;
  segmentIds: string[];
  color: string;
  definition: string;
}

const capacities: CapacityDef[] = [
  { id: "tlc", label: "TLC", fullName: "Total Lung Capacity", segmentIds: ["irv", "tv", "erv", "rv"], color: "hsl(270, 50%, 55%)", definition: "Total volume of gas in the lungs at maximal inspiration. TLC = IRV + TV + ERV + RV ≈ 6000 ml. Cannot be measured by spirometry alone." },
  { id: "vc", label: "VC", fullName: "Vital Capacity", segmentIds: ["irv", "tv", "erv"], color: "hsl(210, 60%, 50%)", definition: "Maximum volume that can be exhaled after maximal inspiration. VC = IRV + TV + ERV ≈ 4800 ml. Reduced in both obstructive and restrictive disease." },
  { id: "ic", label: "IC", fullName: "Inspiratory Capacity", segmentIds: ["irv", "tv"], color: "hsl(190, 65%, 45%)", definition: "Maximum volume that can be inspired from FRC. IC = IRV + TV ≈ 3600 ml." },
  { id: "frc", label: "FRC", fullName: "Functional Residual Capacity", segmentIds: ["erv", "rv"], color: "hsl(25, 80%, 50%)", definition: "Volume remaining in the lungs at end of normal expiration — the equilibrium point where inward lung recoil equals outward chest wall recoil. FRC = ERV + RV ≈ 2400 ml. Reduced under GA, supine position, obesity. Increased in COPD (hyperinflation)." },
];

const W = 500;
const H = 380;
const BAR_LEFT = 100;
const BAR_WIDTH = 180;
const BAR_TOP = 30;
const BAR_BOTTOM = H - 35;
const BAR_H = BAR_BOTTOM - BAR_TOP;

const totalVol = segments.reduce((s, v) => s + v.value, 0);

export const LungVolumesDiagram = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Compute y positions for each segment (top-down: IRV, TV, ERV, RV)
  let cumY = BAR_TOP;
  const segPositions = segments.map((seg) => {
    const h = (seg.value / totalVol) * BAR_H;
    const pos = { ...seg, y: cumY, h };
    cumY += h;
    return pos;
  });

  // Find which segments are highlighted
  const activeCapacity = capacities.find((c) => c.id === activeItem);
  const activeSegment = segments.find((s) => s.id === activeItem);
  const highlightedSegIds = activeCapacity
    ? new Set(activeCapacity.segmentIds)
    : activeSegment
    ? new Set([activeSegment.id])
    : null;

  // Compute bracket positions for capacities
  const capBrackets = capacities.map((cap) => {
    const segs = segPositions.filter((s) => cap.segmentIds.includes(s.id));
    const top = Math.min(...segs.map((s) => s.y));
    const bottom = Math.max(...segs.map((s) => s.y + s.h));
    return { ...cap, top, bottom };
  });

  const activeInfo = activeCapacity || activeSegment;

  return (
        <div className="space-y-4">
      <h3 className="font-semibold text-foreground text-sm">Lung Volumes & Capacities</h3>

      {/* SVG */}
      <div className="bg-background rounded-lg border border-border overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {/* Volume segments */}
          {segPositions.map((seg) => {
            const dimmed = highlightedSegIds && !highlightedSegIds.has(seg.id);
            const isActive = activeItem === seg.id;
            return (
              <g key={seg.id} onClick={() => setActiveItem(activeItem === seg.id ? null : seg.id)} style={{ cursor: "pointer" }}>
                <rect
                  x={BAR_LEFT}
                  y={seg.y}
                  width={BAR_WIDTH}
                  height={seg.h}
                  fill={seg.color}
                  opacity={dimmed ? 0.15 : 0.35}
                  stroke={isActive ? seg.color : "hsl(var(--border))"}
                  strokeWidth={isActive ? 2 : 0.5}
                  rx="2"
                />
                {/* Segment label inside bar */}
                {seg.h > 20 && (
                  <text
                    x={BAR_LEFT + BAR_WIDTH / 2}
                    y={seg.y + seg.h / 2 + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={dimmed ? "hsl(var(--muted-foreground))" : seg.color}
                    opacity={dimmed ? 0.4 : 1}
                  >
                    {seg.label}
                  </text>
                )}
                {/* Volume value on left */}
                <text
                  x={BAR_LEFT - 8}
                  y={seg.y + seg.h / 2 + 4}
                  textAnchor="end"
                  fontSize="9"
                  fill="hsl(var(--muted-foreground))"
                  opacity={dimmed ? 0.3 : 0.8}
                >
                  {seg.value} ml
                </text>
              </g>
            );
          })}

          {/* Horizontal divider lines between segments */}
          {segPositions.slice(0, -1).map((seg, i) => (
            <line
              key={`div-${i}`}
              x1={BAR_LEFT}
              x2={BAR_LEFT + BAR_WIDTH}
              y1={seg.y + seg.h}
              y2={seg.y + seg.h}
              stroke="hsl(var(--background))"
              strokeWidth="2"
            />
          ))}

          {/* Level labels on the right (TLC line, FRC line, RV line) */}
          {[
            { label: "TLC", y: BAR_TOP },
            { label: "FRC", y: segPositions[1].y + segPositions[1].h },
            { label: "RV", y: segPositions[2].y + segPositions[2].h },
          ].map((lvl) => (
            <g key={lvl.label}>
              <line
                x1={BAR_LEFT + BAR_WIDTH}
                x2={BAR_LEFT + BAR_WIDTH + 15}
                y1={lvl.y}
                y2={lvl.y}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              <text
                x={BAR_LEFT + BAR_WIDTH + 18}
                y={lvl.y + 3}
                fontSize="8"
                fill="hsl(var(--muted-foreground))"
              >
                {lvl.label}
              </text>
            </g>
          ))}

          {/* Capacity brackets on the far right */}
          {capBrackets.map((cap, idx) => {
            const bx = BAR_LEFT + BAR_WIDTH + 45 + idx * 38;
            const isActive = activeItem === cap.id;
            const dimmed = highlightedSegIds && !highlightedSegIds.has(cap.segmentIds[0]) && activeItem !== cap.id;
            return (
              <g key={cap.id} onClick={() => setActiveItem(activeItem === cap.id ? null : cap.id)} style={{ cursor: "pointer" }}>
                {/* Vertical bracket line */}
                <line
                  x1={bx} x2={bx}
                  y1={cap.top + 2} y2={cap.bottom - 2}
                  stroke={cap.color}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  opacity={dimmed ? 0.3 : 0.8}
                />
                {/* Top tick */}
                <line x1={bx - 4} x2={bx} y1={cap.top + 2} y2={cap.top + 2} stroke={cap.color} strokeWidth={isActive ? 2.5 : 1.5} opacity={dimmed ? 0.3 : 0.8} />
                {/* Bottom tick */}
                <line x1={bx - 4} x2={bx} y1={cap.bottom - 2} y2={cap.bottom - 2} stroke={cap.color} strokeWidth={isActive ? 2.5 : 1.5} opacity={dimmed ? 0.3 : 0.8} />
                {/* Label */}
                <text
                  x={bx + 2}
                  y={(cap.top + cap.bottom) / 2 + 4}
                  fontSize="9"
                  fontWeight="700"
                  fill={cap.color}
                  opacity={dimmed ? 0.3 : 1}
                  transform={`rotate(-90, ${bx + 2}, ${(cap.top + cap.bottom) / 2 + 4})`}
                  textAnchor="middle"
                >
                  {cap.label}
                </text>
              </g>
            );
          })}

          {/* Highlight bracket fill when capacity selected */}
          {activeCapacity && (() => {
            const bracket = capBrackets.find((c) => c.id === activeCapacity.id)!;
            return (
                  <rect
                x={BAR_LEFT}
                y={bracket.top}
                width={BAR_WIDTH}
                height={bracket.bottom - bracket.top}
                fill={activeCapacity.color}
                opacity={0.08}
                stroke={activeCapacity.color}
                strokeWidth="1.5"
                strokeDasharray="4,3"
                rx="2"
                pointerEvents="none"
              />
  );
          })()}
        </svg>
      </div>

      {/* Interactive buttons below for mobile */}
      <div className="space-y-2">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Volumes</p>
        <div className="flex flex-wrap gap-1.5">
          {segments.map((seg) => (
            <button
              key={seg.id}
              onClick={() => setActiveItem(activeItem === seg.id ? null : seg.id)}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded-lg border transition-all font-medium",
                activeItem === seg.id
                  ? "shadow-sm"
                  : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
              )}
              style={activeItem === seg.id ? { borderColor: seg.color, background: `${seg.color}15`, color: seg.color } : undefined}
            >
              {seg.label}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-3">Capacities</p>
        <div className="flex flex-wrap gap-1.5">
          {capacities.map((cap) => (
            <button
              key={cap.id}
              onClick={() => setActiveItem(activeItem === cap.id ? null : cap.id)}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded-lg border transition-all font-medium",
                activeItem === cap.id
                  ? "shadow-sm"
                  : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
              )}
              style={activeItem === cap.id ? { borderColor: cap.color, background: `${cap.color}15`, color: cap.color } : undefined}
            >
              {cap.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info panel */}
      {activeInfo && (
        <div
          className="p-3 rounded-lg border border-border"
          style={{ background: `${"color" in activeInfo ? activeInfo.color : "hsl(var(--primary))"}10` }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: activeInfo.color }}>
            {activeInfo.fullName} ({activeInfo.label})
            {"value" in activeInfo && ` — ${(activeInfo as VolumeSegment).value} ml`}
            {activeCapacity && ` — ${activeCapacity.segmentIds.reduce((sum, id) => sum + (segments.find(s => s.id === id)?.value || 0), 0)} ml`}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">{activeInfo.definition}</p>
        </div>
      )}

      {!activeInfo && (
        <p className="text-xs text-muted-foreground/60 text-center italic">
          Tap a volume or capacity to see its definition
        </p>
      )}
    </div>
  );
};
