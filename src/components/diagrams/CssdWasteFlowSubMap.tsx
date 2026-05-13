import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, Ban } from "lucide-react";
import { DiagramFigure } from "./_shared/DiagramFigure";

interface Node {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: "sterile" | "dirty" | "decon" | "clean";
}

const nodes: Node[] = [
  { id: "theatre", label: "Operating theatre", sub: "+25 Pa · sterile", x: 10, y: 20, w: 90, h: 50, tone: "sterile" },
  { id: "sluice", label: "Sluice", sub: "−5 Pa · dirty", x: 130, y: 20, w: 80, h: 50, tone: "dirty" },
  { id: "dirty-corridor", label: "Dirty corridor", sub: "−5 Pa · one-way", x: 230, y: 20, w: 90, h: 50, tone: "dirty" },
  { id: "cssd-dirty", label: "CSSD — wash-in", sub: "Bag-break, ultrasonic, washer-disinfector", x: 340, y: 20, w: 120, h: 50, tone: "decon" },
  { id: "cssd-clean", label: "CSSD — pack & sterilise", sub: "Inspection · autoclave 134 °C", x: 340, y: 100, w: 120, h: 50, tone: "clean" },
  { id: "store", label: "Sterile store", sub: "Returns to theatre via CLEAN route", x: 200, y: 100, w: 110, h: 50, tone: "clean" },
  { id: "waste", label: "Clinical waste hold", sub: "Orange/yellow stream → incineration", x: 340, y: 180, w: 120, h: 40, tone: "dirty" },
];

const toneStyles: Record<Node["tone"], string> = {
  sterile: "hsl(var(--clinical) / 0.22)",
  dirty: "hsl(var(--destructive) / 0.18)",
  decon: "hsl(var(--muted))",
  clean: "hsl(var(--primary) / 0.18)",
};

interface Path {
  id: string;
  type: "instrument" | "waste" | "return";
  color: string;
  points: { x: number; y: number }[];
}

const paths: Path[] = [
  // Dirty instruments: theatre → sluice → dirty corridor → CSSD wash-in
  {
    id: "instr-dirty",
    type: "instrument",
    color: "hsl(var(--destructive))",
    points: [
      { x: 100, y: 45 },
      { x: 130, y: 45 },
      { x: 210, y: 45 },
      { x: 230, y: 45 },
      { x: 340, y: 45 },
    ],
  },
  // Waste: theatre → sluice → dirty corridor → waste hold
  {
    id: "waste-out",
    type: "waste",
    color: "hsl(var(--destructive))",
    points: [
      { x: 100, y: 60 },
      { x: 170, y: 60 },
      { x: 275, y: 60 },
      { x: 275, y: 200 },
      { x: 340, y: 200 },
    ],
  },
  // Reprocessed instruments: CSSD wash → pack/sterilise → sterile store → theatre (CLEAN return route)
  {
    id: "return",
    type: "return",
    color: "hsl(var(--primary))",
    points: [
      { x: 400, y: 70 },
      { x: 400, y: 100 },
      { x: 400, y: 125 },
      { x: 310, y: 125 },
      { x: 200, y: 125 },
      { x: 55, y: 125 },
      { x: 55, y: 70 },
    ],
  },
];

const pathMeta: Record<Path["type"], { label: string; desc: string }> = {
  instrument: {
    label: "Used instruments",
    desc: "Sealed at point-of-use, transported in red rigid containers via the sluice and dirty corridor to CSSD wash-in. Never re-enter the theatre suite via the clean route until fully decontaminated and sterilised.",
  },
  waste: {
    label: "Clinical waste",
    desc: "Orange (infectious, alternative treatment) and yellow (incineration-only) bags exit via sluice → dirty corridor → external waste hold. Negative pressure (−5 Pa) prevents back-flow of contaminated air.",
  },
  return: {
    label: "Reprocessed return",
    desc: "After autoclave validation (134 °C, 3 min hold) instruments are packed, stored sterile, and re-enter theatre via the CLEAN supply route — physically separated from the dirty corridor.",
  },
};

const interp = (path: { x: number; y: number }[], frac: number) => {
  const segs = path.slice(1).map((p, i) => {
    const a = path[i];
    return { a, b: p, len: Math.hypot(p.x - a.x, p.y - a.y) };
  });
  const total = segs.reduce((s, x) => s + x.len, 0);
  let target = frac * total;
  for (const s of segs) {
    if (target <= s.len) {
      const k = target / s.len;
      return { x: s.a.x + (s.b.x - s.a.x) * k, y: s.a.y + (s.b.y - s.a.y) * k };
    }
    target -= s.len;
  }
  return path[path.length - 1];
};

const CssdWasteFlowSubMap = () => {
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0);
  const [active, setActive] = useState<Path["type"]>("instrument");
  const rafRef = useRef<number>();
  const lastRef = useRef<number>(performance.now());

  useEffect(() => {
    const tick = (now: number) => {
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      if (playing) setT((p) => (p + dt / 7) % 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  return (
    <DiagramFigure
      id="cssd-waste-flow-sub-map"
      title="Cssd waste flow sub MAP"
      description="Auto-generated wrapper for the Cssd waste flow sub MAP anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground mb-1">CSSD & waste-side sub-map</h3>
          <p className="text-xs text-muted-foreground">
            Dirty instruments and clinical waste exit theatre via the sluice on a strictly one-way path. Reprocessed
            instruments only re-enter through the separate CLEAN supply route — never back through the dirty corridor.
          </p>
        </div>
  
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-1 flex-wrap">
            {(Object.keys(pathMeta) as Path["type"][]).map((p) => (
              <Button
                key={p}
                size="sm"
                variant={active === p ? "default" : "outline"}
                onClick={() => setActive(p)}
              >
                {pathMeta[p].label}
              </Button>
            ))}
          </div>
          <Button size="sm" variant="outline" className="ml-auto" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </Button>
        </div>
  
        <div className="rounded-md border border-border bg-background p-2 overflow-x-auto">
          <svg viewBox="0 0 480 235" className="w-full h-auto min-w-[420px]" role="img" aria-label="CSSD and waste flow sub-map">
            <defs>
              {paths.map((p) => (
                <marker
                  key={p.id}
                  id={`sub-arrow-${p.id}`}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={p.color} />
                </marker>
              ))}
            </defs>
  
            {/* Barrier line: visualise the physical separation between dirty corridor and clean return */}
            <line
              x1="10"
              y1="87"
              x2="470"
              y2="87"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <text x="14" y="83" fontSize="6.5" className="fill-muted-foreground" fontStyle="italic">
              DIRTY side ↑ · CLEAN side ↓ — physical barrier (no back-flow)
            </text>
  
            {/* Nodes */}
            {nodes.map((n) => (
              <g key={n.id}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="4"
                  fill={toneStyles[n.tone]}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                />
                <text
                  x={n.x + n.w / 2}
                  y={n.y + n.h / 2 - 2}
                  textAnchor="middle"
                  className="fill-foreground"
                  fontSize="9"
                  fontWeight="600"
                >
                  {n.label}
                </text>
                <text
                  x={n.x + n.w / 2}
                  y={n.y + n.h / 2 + 10}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  fontSize="7"
                >
                  {n.sub}
                </text>
              </g>
            ))}
  
            {/* Paths */}
            {paths
              .filter((p) => p.type === active)
              .map((p) => {
                const d = p.points.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" ");
                const dot = interp(p.points, t);
                return (
                      <g key={p.id}>
                    <path
                      d={d}
                      fill="none"
                      stroke={p.color}
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      opacity="0.75"
                      markerEnd={`url(#sub-arrow-${p.id})`}
                    />
                    <circle cx={dot.x} cy={dot.y} r="4.5" fill={p.color} />
                    <circle cx={dot.x} cy={dot.y} r="8" fill={p.color} opacity="0.22" />
                  </g>
    );
              })}
  
            {/* No-entry symbol on the boundary back into theatre from dirty side */}
            <g transform="translate(115 92)">
              <circle r="7" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive))" strokeWidth="1" />
              <line x1="-4.5" y1="-4.5" x2="4.5" y2="4.5" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
              <text x="11" y="3" fontSize="6.5" className="fill-destructive" fontWeight="600">
                No back-flow from dirty corridor
              </text>
            </g>
          </svg>
        </div>
  
        <div className="rounded-md border border-border bg-muted/40 p-3 text-sm">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1 flex items-center gap-1">
            <Ban className="h-3 w-3" /> Active pathway
          </p>
          <p className="font-semibold text-foreground mb-1">{pathMeta[active].label}</p>
          <p className="text-muted-foreground">{pathMeta[active].desc}</p>
        </div>
  
        <p className="text-[11px] text-muted-foreground italic">
          Aligned with HTM 01-01 (decontamination of medical devices) and HTM 07-01 (safe management of healthcare waste).
        </p>
      </div>
    </DiagramFigure>
  );
};

export default CssdWasteFlowSubMap;
