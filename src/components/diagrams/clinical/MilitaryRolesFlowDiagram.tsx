import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DiagramFigure, svgNodeProps } from "../_shared/DiagramFigure";

/**
 * Animated handover / resource flow across NATO Roles 1–4 with CCAST in transit.
 *
 * Phases (≈14s cycle):
 *   0. Point of wounding — buddy aid, <C>ABC, CAT tourniquet
 *   1. Role 1 (regimental aid post) — primary survey, TXA, packaged
 *   2. Forward MEDEVAC (MERT/HEMS) — handover to Role 2
 *   3. Role 2 (forward surgical) — DCR + DCS, abbreviated, prepare for evac
 *   4. CCAST aero-medical to Role 3 — ICU in flight
 *   5. Role 3 (deployed hospital) — definitive surgery, ICU
 *   6. Strategic CCAST → Role 4 (home) — rehabilitation
 *
 * Animated casualty token travels left → right across the chain; ISBAR handover
 * pulses appear at each interface.
 */

const CYCLE_MS = 14000;

const NODES = [
  { id: 0, x: 60, label: "Point of wounding", sub: "Buddy aid · CAT · <C>ABC", color: "hsl(var(--destructive))" },
  { id: 1, x: 180, label: "Role 1", sub: "RAP · TXA · package", color: "hsl(0 75% 55%)" },
  { id: 2, x: 320, label: "Role 2", sub: "Forward surgical · DCR + DCS", color: "hsl(20 85% 50%)" },
  { id: 3, x: 500, label: "Role 3", sub: "Deployed hospital · definitive Sx + ICU", color: "hsl(200 85% 45%)" },
  { id: 4, x: 700, label: "Role 4", sub: "Home base · rehabilitation", color: "hsl(142 65% 40%)" },
];

// Casualty progress checkpoints: tValue at which patient sits at node[i].x
// Between checkpoints a transit (MEDEVAC/CCAST) animation plays.
const CHECKPOINTS = [
  { node: 0, t: 0.05 },
  { node: 1, t: 0.22 },   // forward MEDEVAC 0.10–0.22
  { node: 2, t: 0.42 },   // tactical transfer
  { node: 3, t: 0.68 },   // CCAST tactical
  { node: 4, t: 0.95 },   // strategic CCAST
];

function casualtyX(t: number) {
  for (let i = 0; i < CHECKPOINTS.length - 1; i++) {
    const a = CHECKPOINTS[i], b = CHECKPOINTS[i + 1];
    if (t >= a.t && t <= b.t) {
      const local = (t - a.t) / (b.t - a.t);
      return NODES[a.node].x + (NODES[b.node].x - NODES[a.node].x) * local;
    }
  }
  return NODES[t < CHECKPOINTS[0].t ? 0 : NODES.length - 1].x;
}

// Which interface is currently being crossed, if any: returns { fromNode, toNode, mode }
function currentTransit(t: number) {
  for (let i = 0; i < CHECKPOINTS.length - 1; i++) {
    const a = CHECKPOINTS[i], b = CHECKPOINTS[i + 1];
    if (t > a.t && t < b.t && a.node !== b.node) {
      const mode =
        b.node === 1 ? "Forward MEDEVAC (MERT)" :
        b.node === 2 ? "Tactical transfer" :
        b.node === 3 ? "CCAST tactical (rotary/fixed)" :
        "Strategic CCAST (fixed-wing)";
      return { from: a.node, to: b.node, mode, p: (t - a.t) / (b.t - a.t) };
    }
  }
  return null;
}

function activeNode(t: number) {
  // pick last checkpoint we've reached
  let n = 0;
  for (const cp of CHECKPOINTS) if (t >= cp.t - 0.005) n = cp.node;
  // when in transit, "active" is the destination so its handover pulse can show
  const tr = currentTransit(t);
  return tr ? tr.to : n;
}

export const MilitaryRolesFlowDiagram = () => {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const start = performance.now() - t * CYCLE_MS;
    let raf = 0;
    const tick = (now: number) => {
      const p = ((now - start) % CYCLE_MS) / CYCLE_MS;
      setT(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const x = casualtyX(t);
  const transit = currentTransit(t);
  const active = activeNode(t);

  // ISBAR handover pulse: fires for ~0.4s after each checkpoint reached
  const handoverPulse = (() => {
    for (let i = 1; i < CHECKPOINTS.length; i++) {
      const cp = CHECKPOINTS[i];
      if (t >= cp.t && t < cp.t + 0.04) {
        return { node: cp.node, p: (t - cp.t) / 0.04 };
      }
    }
    return null;
  })();

  // Resource backflow (consumables, blood) — ambient animated dashes from Role 4 → forward
  const dashOffset = -t * 200;

  return (
    <DiagramFigure
      id="military-roles-flow-diagram"
      title="Military roles flow"
      description="Animated handover / resource flow across NATO Roles 1–4 with CCAST in transit. Phases (≈14s cycle): 0. Point of wounding — buddy aid, ‹C›ABC, CAT tourniquet 1. Role 1 (regimental aid post) — primary survey, TXA, packaged 2."
    >
              <figure className="my-6 rounded-xl border border-border bg-card p-4 md:p-5">
        <figcaption className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Roles of medical care &amp; CCAST handover flow
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Animated journey of a single casualty from point of wounding through Role 4, with ISBAR handovers
              at each interface and reverse logistics of blood / consumables forward.
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="icon" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"}>
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setT(0)} aria-label="Restart">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </figcaption>
  
        {/* Timeline strip */}
        <div className="mb-3 grid grid-cols-5 gap-1">
          {NODES.map((n) => {
            const isActive = active === n.id;
            const isDone = active > n.id;
            return (
              <div
                key={n.id}
                className={cn(
                  "rounded-md border px-2 py-1.5 text-[11px] font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : isDone
                    ? "border-border bg-muted/50 text-muted-foreground"
                    : "border-border bg-background text-muted-foreground"
                )}
              >
                {n.label}
              </div>
            );
          })}
        </div>
  
        {/* Diagram */}
        <div className="rounded-lg border border-border bg-background p-3">
          <svg viewBox="0 0 800 280" className="w-full h-auto" role="img" aria-label="Roles 1-4 flow">
            <defs>
              <marker id="arrFwd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
              </marker>
              <marker id="arrBack" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>
  
            {/* Forward casualty path (background line) */}
            <line x1={NODES[0].x} y1="120" x2={NODES[NODES.length - 1].x} y2="120"
                  stroke="hsl(var(--border))" strokeWidth="2" />
  
            {/* Reverse logistics dashed line (top) */}
            <line
              x1={NODES[NODES.length - 1].x}
              y1="62"
              x2={NODES[0].x}
              y2="62"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
              strokeDasharray="6 6"
              strokeDashoffset={dashOffset}
              markerEnd="url(#arrBack)"
              opacity="0.55"
            />
            <text x="400" y="52" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
              Reverse logistics: blood, drugs, oxygen, consumables, expertise
            </text>
  
            {/* Nodes */}
            {NODES.map((n, idx) => {
              const isActive = active === n.id;
              return (
                    <g key={n.id} {...svgNodeProps(`Step ${idx + 1}/${NODES.length}: ${n.label} — ${n.sub}`)}>
                  <circle
                    cx={n.x}
                    cy={120}
                    r={isActive ? 22 : 18}
                    fill={isActive ? n.color : "hsl(var(--card))"}
                    stroke={n.color}
                    strokeWidth={isActive ? 2.5 : 1.6}
                    style={{ transition: "r 250ms" }}
                  />
                  <text x={n.x} y={124} textAnchor="middle" fontSize="11" fontWeight="700"
                        fill={isActive ? "hsl(var(--background))" : n.color}>
                    {n.id === 0 ? "PoW" : `R${n.id}`}
                  </text>
                  <text x={n.x} y={156} textAnchor="middle" fontSize="11" fontWeight="600"
                        fill="hsl(var(--foreground))">{n.label}</text>
                  <text x={n.x} y={172} textAnchor="middle" fontSize="9.5" fill="hsl(var(--muted-foreground))">
                    {n.sub}
                  </text>
  
                  {/* Handover ISBAR pulse */}
                  {handoverPulse?.node === n.id && (
                    <circle cx={n.x} cy={120} r={22 + handoverPulse.p * 25}
                            fill="none" stroke="hsl(var(--primary))" strokeWidth="2"
                            opacity={1 - handoverPulse.p} />
                  )}
                </g>
    );
            })}
  
            {/* Casualty token */}
            <g style={{ transition: "transform 80ms linear" }}>
              <circle cx={x} cy={120} r={7} fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="2" />
            </g>
  
            {/* Transit label + vehicle icon */}
            {transit && (
              <g>
                <rect x={x - 70} y={88} width={140} height={20} rx={4}
                      fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1" />
                <text x={x} y={102} textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(var(--primary))">
                  {transit.mode}
                </text>
                {/* helicopter / plane glyph */}
                <text x={x} y={82} textAnchor="middle" fontSize="14">
                  {transit.to === 4 ? "✈" : "🚁"}
                </text>
              </g>
            )}
  
            {/* ISBAR handover label at active interface */}
            {handoverPulse && (
              <g>
                <rect x={NODES[handoverPulse.node].x - 50} y={195} width={100} height={20} rx={4}
                      fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x={NODES[handoverPulse.node].x} y={209} textAnchor="middle"
                      fontSize="10" fontWeight="700" fill="hsl(var(--primary-foreground))">
                  ISBAR handover
                </text>
              </g>
            )}
  
            {/* Bottom legend bar */}
            <g transform="translate(0,235)">
              <text x="20" y="14" fontSize="10.5" fontWeight="700" fill="hsl(var(--foreground))">Care escalation:</text>
              <text x="120" y="14" fontSize="10" fill="hsl(var(--muted-foreground))">
                self/buddy → first responder → forward surgical → deployed hospital → home
              </text>
              <text x="20" y="30" fontSize="10.5" fontWeight="700" fill="hsl(var(--foreground))">CCAST:</text>
              <text x="65" y="30" fontSize="10" fill="hsl(var(--muted-foreground))">
                consultant-led ICU team that delivers Level 3 care in transit between Roles 2/3 and Role 4
              </text>
            </g>
          </svg>
        </div>
  
        {/* Phase explainer */}
        <div className="mt-3 text-xs text-muted-foreground">
          {transit ? (
            <p>
              <span className="font-semibold text-foreground">In transit ({transit.mode}):</span>{" "}
              ongoing sedation, lung-protective ventilation, blood products and warming continue under the
              transferring team. ETCO₂, oxygen reserve and battery are checked before departure.
            </p>
          ) : (
            <p>
              <span className="font-semibold text-foreground">{NODES[active].label}:</span>{" "}
              {active === 0 && "Self / buddy aid: catastrophic haemorrhage control (CAT, haemostatic dressing), open airway, decompress chest, call for MERT."}
              {active === 1 && "Regimental Aid Post — primary survey, advanced airway if trained, TXA <3 h, antibiotics, package for forward MEDEVAC."}
              {active === 2 && "Forward surgical (Role 2) — Damage Control Resuscitation (whole blood / 1:1:1) + Damage Control Surgery (<90 min). Stabilise for onward CCAST."}
              {active === 3 && "Deployed hospital (Role 3) — definitive surgery, ICU, imaging, blood bank. Re-evaluate physiology before strategic evacuation."}
              {active === 4 && "Home base (Role 4) — definitive reconstructive surgery, rehabilitation, psychological support, governance and learning."}
            </p>
          )}
          <p className="mt-2">
            <span className="font-semibold text-foreground">Handover principle:</span> ISBAR (Identification ·
            Situation · Background · Assessment · Recommendation) at every interface, with written transfer
            documentation, drug and blood-product logs, and incident timeline.
          </p>
        </div>
      </figure>
    </DiagramFigure>
  );
};

export default MilitaryRolesFlowDiagram;
