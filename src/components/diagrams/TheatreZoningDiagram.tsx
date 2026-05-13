import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, User, Users, Trash2 } from "lucide-react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Flow = "patient" | "staff" | "waste" | "all";

interface Room {
  id: string;
  label: string;
  zone: "protective" | "clean" | "sterile" | "disposal";
  x: number;
  y: number;
  w: number;
  h: number;
  desc: string;
  pressure: string;
}

const rooms: Room[] = [
  // Protective (outer)
  { id: "reception", label: "Reception", zone: "protective", x: 10, y: 30, w: 70, h: 50, desc: "Patient arrival, identity check, consent confirmation. Street clothes permitted.", pressure: "0 Pa" },
  { id: "changing", label: "Staff changing", zone: "protective", x: 10, y: 90, w: 70, h: 40, desc: "Staff change into theatre scrubs and overshoes. No patient contact.", pressure: "0 Pa" },
  { id: "office", label: "Offices / rest", zone: "protective", x: 10, y: 140, w: 70, h: 40, desc: "Administrative and rest areas. No clinical activity.", pressure: "0 Pa" },

  // Clean
  { id: "holding", label: "Holding bay", zone: "clean", x: 100, y: 30, w: 70, h: 50, desc: "Patient checked in by theatre team; final checks before induction.", pressure: "+5 Pa" },
  { id: "anaes", label: "Anaesthetic room", zone: "clean", x: 100, y: 90, w: 70, h: 50, desc: "Induction of anaesthesia. Stepped pressure to protect theatre cleanliness.", pressure: "+10 Pa" },
  { id: "recovery", label: "Recovery (PACU)", zone: "clean", x: 100, y: 150, w: 70, h: 50, desc: "Post-op care; patient leaves via recovery WITHOUT re-entering sterile zone.", pressure: "+5 Pa" },

  // Sterile / aseptic
  { id: "scrub", label: "Scrub-up", zone: "sterile", x: 190, y: 30, w: 60, h: 40, desc: "Surgical hand antisepsis; gowning/gloving area.", pressure: "+15 Pa" },
  { id: "theatre", label: "Operating theatre", zone: "sterile", x: 190, y: 80, w: 110, h: 100, desc: "≥20 ACH, HEPA-filtered, +25 Pa, ultra-clean canopy if implant surgery.", pressure: "+25 Pa" },
  { id: "prep", label: "Sterile prep", zone: "sterile", x: 190, y: 190, w: 60, h: 30, desc: "Layup of sterile instruments; opens directly into theatre.", pressure: "+15 Pa" },

  // Disposal
  { id: "sluice", label: "Sluice / disposal", zone: "disposal", x: 320, y: 80, w: 70, h: 60, desc: "Used instruments and clinical waste exit one-way; never re-enters sterile zone.", pressure: "−5 Pa" },
  { id: "exit", label: "Dirty corridor", zone: "disposal", x: 320, y: 150, w: 70, h: 40, desc: "Routed back to CSSD / waste hold via separate corridor.", pressure: "−5 Pa" },
];

const zoneStyles: Record<Room["zone"], { fill: string; label: string; tone: string }> = {
  protective: { fill: "hsl(var(--muted))", label: "Protective (outer)", tone: "text-muted-foreground" },
  clean: { fill: "hsl(var(--primary) / 0.18)", label: "Clean", tone: "text-primary" },
  sterile: { fill: "hsl(var(--clinical) / 0.22)", label: "Aseptic / sterile", tone: "text-clinical" },
  disposal: { fill: "hsl(var(--destructive) / 0.18)", label: "Disposal (dirty)", tone: "text-destructive" },
};

interface FlowPath {
  id: string;
  type: "patient" | "staff" | "waste";
  points: { x: number; y: number }[];
  color: string;
}

const flows: FlowPath[] = [
  // Patient: reception → holding → anaesthetic → theatre → recovery → exit (back through clean corridor)
  {
    id: "patient",
    type: "patient",
    color: "hsl(var(--primary))",
    points: [
      { x: 45, y: 55 },
      { x: 135, y: 55 },
      { x: 135, y: 115 },
      { x: 170, y: 115 },
      { x: 245, y: 130 },
      { x: 170, y: 175 },
      { x: 135, y: 175 },
      { x: 45, y: 175 },
    ],
  },
  // Staff: changing → scrub → theatre → recovery handover → changing
  {
    id: "staff",
    type: "staff",
    color: "hsl(var(--clinical))",
    points: [
      { x: 45, y: 110 },
      { x: 220, y: 50 },
      { x: 245, y: 130 },
      { x: 170, y: 175 },
      { x: 45, y: 110 },
    ],
  },
  // Waste: theatre → sluice → exit (one-way, never returns)
  {
    id: "waste",
    type: "waste",
    color: "hsl(var(--destructive))",
    points: [
      { x: 295, y: 130 },
      { x: 355, y: 110 },
      { x: 355, y: 170 },
    ],
  },
];

const flowMeta: Record<FlowPath["type"], { label: string; icon: typeof User; description: string }> = {
  patient: {
    label: "Patient flow",
    icon: User,
    description:
      "One-way: Reception → Holding bay → Anaesthetic room → Theatre → Recovery → Discharge corridor. Patient never re-enters the sterile zone after surgery.",
  },
  staff: {
    label: "Scrubbed staff flow",
    icon: Users,
    description:
      "Scrubbed team change in the protective zone, scrub in the aseptic zone, then enter theatre. Movement in/out of theatre is minimised — each door opening transiently destroys laminar flow.",
  },
  waste: {
    label: "Waste & dirty instruments",
    icon: Trash2,
    description:
      "One-way exit via sluice → dirty corridor → CSSD/waste. Negative-pressure disposal area prevents back-flow of contaminated air into the sterile zone.",
  },
};

const TheatreZoningDiagram = () => {
  const [flow, setFlow] = useState<Flow>("patient");
  const [activeRoom, setActiveRoom] = useState<string | null>("theatre");
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0);
  const rafRef = useRef<number>();
  const lastRef = useRef<number>(performance.now());

  useEffect(() => {
    const tick = (now: number) => {
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      if (playing) setT((p) => (p + dt / 6) % 1); // 6s per loop
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const reset = () => {
    setT(0);
    lastRef.current = performance.now();
  };

  const visibleFlows = flow === "all" ? flows : flows.filter((f) => f.type === flow);
  const room = rooms.find((r) => r.id === activeRoom) ?? null;

  // Pressure gauge: parse target Pa from selected room and animate needle towards it
  const targetPa = room ? parseFloat(room.pressure.replace("−", "-").replace(" Pa", "")) || 0 : 0;
  const [displayPa, setDisplayPa] = useState(0);
  useEffect(() => {
    let raf: number;
    const animate = () => {
      setDisplayPa((prev) => {
        const diff = targetPa - prev;
        if (Math.abs(diff) < 0.05) return targetPa;
        return prev + diff * 0.12;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [targetPa]);

  // Map -10..+30 Pa to needle angle -90..+90 deg
  const paMin = -10;
  const paMax = 30;
  const needleAngle = ((displayPa - paMin) / (paMax - paMin)) * 180 - 90;
  const gaugeTone =
    displayPa >= 20
      ? "text-clinical"
      : displayPa >= 5
      ? "text-primary"
      : displayPa <= -1
      ? "text-destructive"
      : "text-muted-foreground";

  // Build SVG polyline path string + helper to interpolate position along it
  const pointsAt = (path: { x: number; y: number }[], frac: number) => {
    // total length
    const segs = path.slice(1).map((p, i) => {
      const a = path[i];
      const dx = p.x - a.x;
      const dy = p.y - a.y;
      return { a, b: p, len: Math.hypot(dx, dy) };
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

  return (
    <DiagramFigure
      id="theatre-zoning-diagram"
      title="Theatre zoning"
      description="Auto-generated wrapper for the Theatre zoning anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground mb-1">Operating-theatre complex zoning & one-way flow</h3>
          <p className="text-xs text-muted-foreground">
            Tap a room for its function and pressure. Toggle the flow overlay to see one-way patient, staff and waste pathways.
          </p>
        </div>
  
        {/* Controls */}
        <div className="flex flex-wrap gap-2 items-end">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Flow overlay</span>
            <div className="flex gap-1 flex-wrap">
              {(["patient", "staff", "waste", "all"] as Flow[]).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={flow === f ? "default" : "outline"}
                  onClick={() => {
                    setFlow(f);
                    reset();
                  }}
                >
                  {f === "all" ? "All" : flowMeta[f as FlowPath["type"]].label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex gap-1 ml-auto">
            <Button size="sm" variant="outline" onClick={() => setPlaying((p) => !p)}>
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </Button>
            <Button size="sm" variant="outline" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
  
        {/* Zone legend */}
        <div className="flex flex-wrap gap-2 text-[11px]">
          {(Object.keys(zoneStyles) as Room["zone"][]).map((z) => (
            <span key={z} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-border">
              <span className="w-3 h-3 rounded" style={{ background: zoneStyles[z].fill }} />
              <span className={zoneStyles[z].tone}>{zoneStyles[z].label}</span>
            </span>
          ))}
        </div>
  
        {/* SVG diagram */}
        <div className="rounded-md border border-border bg-background p-2 overflow-x-auto">
          <svg
            viewBox="0 0 410 235"
            className="w-full h-auto min-w-[360px]"
            role="img"
            aria-label="Operating theatre zoning diagram"
          >
            {/* Arrow marker definitions */}
            <defs>
              {flows.map((f) => (
                <marker
                  key={f.id}
                  id={`arrow-${f.id}`}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={f.color} />
                </marker>
              ))}
            </defs>
  
            {/* Rooms */}
            {rooms.map((r) => {
              const z = zoneStyles[r.zone];
              const isActive = activeRoom === r.id;
              return (
                <g key={r.id} className="cursor-pointer" onClick={() => setActiveRoom(r.id)}>
                  <rect
                    x={r.x}
                    y={r.y}
                    width={r.w}
                    height={r.h}
                    rx="4"
                    fill={z.fill}
                    stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}
                    strokeWidth={isActive ? 2 : 1}
                  />
                  <text
                    x={r.x + r.w / 2}
                    y={r.y + r.h / 2 - 2}
                    textAnchor="middle"
                    className="fill-foreground"
                    fontSize="9"
                    fontWeight="600"
                  >
                    {r.label}
                  </text>
                  <text
                    x={r.x + r.w / 2}
                    y={r.y + r.h / 2 + 10}
                    textAnchor="middle"
                    className="fill-muted-foreground"
                    fontSize="7.5"
                  >
                    {r.pressure}
                  </text>
                </g>
              );
            })}
  
            {/* Flow paths */}
            {visibleFlows.map((f) => {
              const pathStr = f.points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
              const dot = pointsAt(f.points, t);
              return (
                    <g key={f.id}>
                  <path
                    d={pathStr}
                    fill="none"
                    stroke={f.color}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    opacity="0.7"
                    markerEnd={`url(#arrow-${f.id})`}
                  />
                  <circle cx={dot.x} cy={dot.y} r="4.5" fill={f.color} />
                  <circle cx={dot.x} cy={dot.y} r="7" fill={f.color} opacity="0.25" />
                </g>
    );
            })}
          </svg>
        </div>
  
        {/* Animated pressure gauge */}
        <div className="rounded-md border border-border bg-muted/40 p-3 flex items-center gap-4">
          <svg viewBox="0 0 120 70" className="w-32 h-20 flex-shrink-0" role="img" aria-label="Pressure gauge">
            {/* Arc background segments */}
            <path d="M 10 60 A 50 50 0 0 1 36 17" fill="none" stroke="hsl(var(--destructive) / 0.5)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 36 17 A 50 50 0 0 1 84 17" fill="none" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 84 17 A 50 50 0 0 1 110 60" fill="none" stroke="hsl(var(--clinical) / 0.6)" strokeWidth="3" strokeLinecap="round" />
            {/* Tick labels */}
            <text x="10" y="68" fontSize="6" textAnchor="middle" className="fill-muted-foreground">−10</text>
            <text x="60" y="14" fontSize="6" textAnchor="middle" className="fill-muted-foreground">+10</text>
            <text x="110" y="68" fontSize="6" textAnchor="middle" className="fill-muted-foreground">+30</text>
            {/* Needle */}
            <g transform={`translate(60 60) rotate(${needleAngle})`}>
              <line x1="0" y1="0" x2="0" y2="-44" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
              <circle cx="0" cy="0" r="4" fill="hsl(var(--foreground))" />
            </g>
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Relative pressure</p>
            <p className={`text-2xl font-bold tabular-nums ${gaugeTone}`}>
              {displayPa >= 0 ? "+" : ""}
              {displayPa.toFixed(1)} Pa
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {room ? `${room.label} — vs corridor (0 Pa)` : "Select a room"}
            </p>
          </div>
        </div>
  
        {/* Room detail / flow detail */}
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          {room && (
            <div className="rounded-md border border-border bg-muted/40 p-3">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                Room — {zoneStyles[room.zone].label} ({room.pressure})
              </p>
              <p className="font-semibold text-foreground mb-1">{room.label}</p>
              <p className="text-muted-foreground">{room.desc}</p>
            </div>
          )}
          <div className="rounded-md border border-border bg-muted/40 p-3">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Active flow</p>
            {flow === "all" ? (
              <p className="text-muted-foreground">
                Showing all three pathways. Note they are kept SEPARATE — patient and staff routes never overlap with the
                one-way waste corridor. Pressure cascade (+25 → 0 → −5 Pa) drives airflow OUT of the theatre and INTO
                disposal.
              </p>
            ) : (
              <>
                <p className="font-semibold text-foreground mb-1">{flowMeta[flow as FlowPath["type"]].label}</p>
                <p className="text-muted-foreground">{flowMeta[flow as FlowPath["type"]].description}</p>
              </>
            )}
          </div>
        </div>
  
        <p className="text-[11px] text-muted-foreground italic">
          Schematic — actual UK theatre suites vary; pressures shown follow HTM 03-01 stepped cascade (theatre +25 Pa →
          anaesthetic room +10 Pa → corridor 0 Pa → disposal −5 Pa).
        </p>
      </div>
    </DiagramFigure>
  );
};

export default TheatreZoningDiagram;
