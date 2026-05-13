import { useEffect, useState } from "react";

/**
 * Animated two-panel diagram contrasting plain propofol vs propofol + lidocaine
 * at a venous nociceptor.
 *
 * Left  — Plain propofol: free aqueous propofol molecules drift out of the
 *         lipid micelles and contact the vein wall, opening Na+ channels on
 *         free nerve endings → action potential → pain signal.
 * Right — Propofol + lidocaine: lidocaine (a) blocks Na+ channels and (b)
 *         lowers mixture pH, shifting propofol partition back into the lipid
 *         phase so less free drug reaches the endothelium.
 *
 * Pure SVG + React state — no external animation library.
 */

type Mode = "plain" | "with-lido";

const PANEL_W = 360;
const PANEL_H = 260;

interface FreePropofolDot {
  id: number;
  /** start position inside a micelle */
  startX: number;
  startY: number;
  /** target position near the vein wall (or trapped in micelle for with-lido) */
  endX: number;
  endY: number;
  delay: number;
}

const buildDots = (mode: Mode): FreePropofolDot[] => {
  const dots: FreePropofolDot[] = [];
  // 8 propofol molecules; in plain mode all migrate out, in with-lido only 2.
  const escaping = mode === "plain" ? 8 : 2;
  for (let i = 0; i < 8; i++) {
    const startX = 60 + (i % 4) * 40;
    const startY = 70 + Math.floor(i / 4) * 50;
    const escapes = i < escaping;
    dots.push({
      id: i,
      startX,
      startY,
      endX: escapes ? 250 + (i % 3) * 25 : startX + (Math.random() - 0.5) * 8,
      endY: escapes ? 175 + (i % 2) * 15 : startY + (Math.random() - 0.5) * 8,
      delay: i * 250,
    });
  }
  return dots;
};

const Panel = ({
  mode,
  tick,
}: {
  mode: Mode;
  tick: number;
}) => {
  const dots = buildDots(mode);
  // Animation cycle is ~3s; tick increments every 50ms via parent.
  const phase = (tick % 60) / 60; // 0 → 1
  const wallContact = mode === "plain" && phase > 0.6;
  const channelsOpen = mode === "plain" && phase > 0.7;
  const painFiring = mode === "plain" && phase > 0.8;

  const title = mode === "plain" ? "Propofol alone" : "Propofol + lidocaine";
  const subtitle =
    mode === "plain"
      ? "Free aqueous propofol reaches vein wall → Na⁺ channels open → pain"
      : "Lidocaine blocks Na⁺ channels & shifts propofol back into lipid phase";

  return (
    <div className="flex-1 min-w-[300px]">
      <div className="text-center mb-2">
        <h4 className="font-display font-semibold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <svg
        viewBox={`0 0 ${PANEL_W} ${PANEL_H}`}
        className="w-full h-auto rounded-lg border border-border bg-card"
        role="img"
        aria-label={`${title} mechanism diagram`}
      >
        {/* Aqueous phase background */}
        <rect width={PANEL_W} height={PANEL_H} fill="hsl(var(--muted) / 0.3)" />

        {/* Vein wall (right side) */}
        <rect
          x={290}
          y={20}
          width={28}
          height={PANEL_H - 40}
          fill={wallContact ? "hsl(var(--destructive) / 0.25)" : "hsl(var(--muted-foreground) / 0.18)"}
          stroke="hsl(var(--border))"
          strokeWidth={1}
          style={{ transition: "fill 0.4s" }}
        />
        <text
          x={304}
          y={16}
          fontSize={9}
          fill="hsl(var(--muted-foreground))"
          textAnchor="middle"
        >
          Vein wall
        </text>

        {/* Free nerve endings (3 little branches) */}
        {[60, 130, 200].map((y, i) => (
          <g key={i}>
            <path
              d={`M 318 ${y} Q 335 ${y - 8} 345 ${y - 4}`}
              stroke="hsl(var(--foreground))"
              strokeWidth={1.5}
              fill="none"
            />
            {/* Na+ channel */}
            <rect
              x={314}
              y={y - 4}
              width={6}
              height={8}
              rx={1}
              fill={
                channelsOpen
                  ? "hsl(var(--destructive))"
                  : mode === "with-lido"
                    ? "hsl(var(--primary) / 0.7)"
                    : "hsl(var(--muted-foreground) / 0.6)"
              }
              style={{ transition: "fill 0.4s" }}
            />
            {/* Lidocaine "plug" inside channel */}
            {mode === "with-lido" && (
              <circle cx={317} cy={y} r={2.2} fill="hsl(var(--background))" />
            )}
            {/* Action potential burst */}
            {painFiring && (
              <g>
                <circle
                  cx={345}
                  cy={y - 4}
                  r={3 + (phase - 0.8) * 30}
                  fill="none"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={1.5}
                  opacity={1 - (phase - 0.8) * 5}
                />
              </g>
            )}
          </g>
        ))}

        {/* Lipid micelles (2 ovals on the left) */}
        {[
          { cx: 95, cy: 95, rx: 55, ry: 35 },
          { cx: 95, cy: 175, rx: 55, ry: 35 },
        ].map((m, i) => (
          <ellipse
            key={i}
            cx={m.cx}
            cy={m.cy}
            rx={m.rx}
            ry={m.ry}
            fill="hsl(var(--pharmacology) / 0.18)"
            stroke="hsl(var(--pharmacology) / 0.5)"
            strokeWidth={1}
            strokeDasharray="3 2"
          />
        ))}
        <text x={20} y={45} fontSize={9} fill="hsl(var(--muted-foreground))">
          Lipid micelles
        </text>

        {/* Lidocaine molecules floating in aqueous phase (right panel only) */}
        {mode === "with-lido" &&
          [180, 220, 245, 270].map((x, i) => (
            <g key={i}>
              <circle
                cx={x + Math.sin(phase * Math.PI * 2 + i) * 4}
                cy={100 + i * 30 + Math.cos(phase * Math.PI * 2 + i) * 4}
                r={5}
                fill="hsl(var(--primary) / 0.85)"
              />
              <text
                x={x + Math.sin(phase * Math.PI * 2 + i) * 4}
                y={103 + i * 30 + Math.cos(phase * Math.PI * 2 + i) * 4}
                fontSize={6}
                fill="hsl(var(--primary-foreground))"
                textAnchor="middle"
                fontWeight={700}
              >
                L
              </text>
            </g>
          ))}

        {/* Propofol molecules — animated migration */}
        {dots.map((d) => {
          // Each dot starts at (startX,startY) inside its micelle, then
          // linearly travels to (endX,endY) as phase progresses.
          // Stagger by delay: only start moving after delay/3000 of cycle.
          const dotStart = d.delay / 3000;
          const local = Math.max(0, Math.min(1, (phase - dotStart) / (1 - dotStart || 1)));
          const x = d.startX + (d.endX - d.startX) * local;
          const y = d.startY + (d.endY - d.startY) * local;
          const escaping = d.endX > 200; // i.e. headed for the wall
          return (
            <g key={d.id}>
              <circle
                cx={x}
                cy={y}
                r={4.5}
                fill={
                  escaping && local > 0.3
                    ? "hsl(var(--destructive) / 0.85)"
                    : "hsl(var(--pharmacology))"
                }
                opacity={escaping ? 0.95 : 0.7}
              />
              <text
                x={x}
                y={y + 2}
                fontSize={6}
                fill="hsl(var(--background))"
                textAnchor="middle"
                fontWeight={700}
              >
                P
              </text>
            </g>
          );
        })}

        {/* pH indicator */}
        <g>
          <rect
            x={10}
            y={PANEL_H - 22}
            width={120}
            height={14}
            rx={3}
            fill="hsl(var(--background))"
            stroke="hsl(var(--border))"
          />
          <text
            x={70}
            y={PANEL_H - 12}
            fontSize={9}
            fill="hsl(var(--foreground))"
            textAnchor="middle"
          >
            {mode === "plain" ? "Mixture pH ~7.5" : "Mixture pH ~6.5 (acidic)"}
          </text>
        </g>

        {/* Outcome label */}
        <g>
          <rect
            x={PANEL_W - 130}
            y={PANEL_H - 22}
            width={120}
            height={14}
            rx={3}
            fill={
              mode === "plain"
                ? "hsl(var(--destructive) / 0.15)"
                : "hsl(var(--primary) / 0.15)"
            }
            stroke={
              mode === "plain"
                ? "hsl(var(--destructive) / 0.5)"
                : "hsl(var(--primary) / 0.5)"
            }
          />
          <text
            x={PANEL_W - 70}
            y={PANEL_H - 12}
            fontSize={9}
            fontWeight={600}
            fill={mode === "plain" ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
            textAnchor="middle"
          >
            {mode === "plain" ? "Pain on injection" : "Pain reduced"}
          </text>
        </g>
      </svg>
    </div>
  );
};

const PropofolLidocaineMechanismDiagram = () => {
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 50);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
            <figure className="my-6">
      <figcaption className="sr-only">
        Animated comparison of plain propofol injection versus propofol mixed with
        lidocaine, showing reduced free aqueous propofol, sodium channel block at
        venous nociceptors, and absence of pain firing.
      </figcaption>

      <div className="flex flex-wrap gap-4">
        <Panel mode="plain" tick={tick} />
        <Panel mode="with-lido" tick={tick} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="px-3 py-1 rounded-md border border-border bg-card hover:bg-muted transition-colors text-foreground font-medium"
          aria-pressed={playing}
        >
          {playing ? "Pause animation" : "Play animation"}
        </button>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-pharmacology" />
          <span className="text-muted-foreground">Propofol (P)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Lidocaine (L)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-destructive" />
          <span className="text-muted-foreground">Activated Na⁺ channel / pain</span>
        </div>
      </div>

      <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
        <span className="font-semibold text-foreground">Left:</span> Free propofol
        leaves the lipid micelle, contacts venous endothelial nociceptors, opens
        Na⁺ channels, and triggers an action potential.{" "}
        <span className="font-semibold text-foreground">Right:</span> Lidocaine
        sits in the Na⁺ channel pore (raising firing threshold) and the lower
        mixture pH favours partition of propofol back into the lipid phase, so
        far less free drug reaches the vein wall — pain is suppressed.
      </p>
    </figure>
  );
};

export default PropofolLidocaineMechanismDiagram;
