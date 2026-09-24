import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  AnatomyDefs,
  HeadProfile,
  Arm,
  Leg,
  TorsoLateral,
  MayfieldPins,
  SupinePatient,
  LateralPatient,
  PronePatient,
  SittingPatient,
} from "@/components/diagrams/clinical/patientAnatomy";

/**
 * Patient-positioning diagrams — labelled SVG illustrations used by the
 * "Patient Positioning in Anaesthesia" clinical topic.
 *
 * Each diagram is a self-contained component:
 *  • Side-on schematic of the patient on the operating table
 *  • Numbered hotspots for pressure points / nerve injury zones
 *  • Hover or tap a hotspot → contextual injury / mitigation note
 *  • A small legend / ETT-and-monitoring side bar where relevant
 *
 * Colour use is restricted to semantic tokens or HSL strings that
 * read clearly on both light and dark backgrounds.
 */

// ── Shared building blocks ─────────────────────────────────────────────

interface Hotspot {
  id: string;
  /** Pixel coordinates inside the chosen viewBox */
  x: number;
  y: number;
  /** Short label shown when active */
  label: string;
  /** Detailed clinical note shown in the side panel */
  detail: string;
}

/** Named anatomical landmark — rendered in the validation overlay. */
export interface Landmark {
  id: string;
  x: number;
  y: number;
  label: string;
  /** Optional offset for the label text (default 8, -8). */
  dx?: number;
  dy?: number;
  /** Anchor side; default "start". */
  anchor?: "start" | "middle" | "end";
}

/** A measurement primitive — either an angle at a vertex or a distance segment. */
export type Measurement =
  | {
      kind: "angle";
      id: string;
      vertex: { x: number; y: number };
      a: { x: number; y: number };
      b: { x: number; y: number };
      label?: string;
      radius?: number;
    }
  | {
      kind: "distance";
      id: string;
      from: { x: number; y: number };
      to: { x: number; y: number };
      unit?: string;
      pxPerUnit?: number;
      label?: string;
    };

interface PositionDiagramProps {
  title: string;
  caption: string;
  hotspots: Hotspot[];
  width?: number;
  height?: number;
  /** SVG body — the painted patient + table */
  children: React.ReactNode;
  /** Optional small legend rendered below the SVG */
  legend?: React.ReactNode;
  /** Optional anatomy-validation overlay. When present, a toggle in the
   *  frame header shows landmark labels and angle/distance readouts. */
  landmarks?: Landmark[];
  measurements?: Measurement[];
}

const POS_GREEN = "hsl(150 55% 40%)";
const POS_AMBER = "hsl(35 95% 50%)";
const POS_RED = "hsl(0 70% 50%)";

/** Render landmark labels + measurement annotations on top of the diagram. */
const ValidationOverlay = ({
  landmarks = [],
  measurements = [],
}: {
  landmarks?: Landmark[];
  measurements?: Measurement[];
}) => {
  const ACCENT = "hsl(190 90% 45%)";
  const ACCENT_SOFT = "hsl(190 90% 45% / 0.18)";
  return (
    <g pointerEvents="none">
      {/* Measurements first so labels overlay them. */}
      {measurements.map((m) => {
        if (m.kind === "distance") {
          const dx = m.to.x - m.from.x;
          const dy = m.to.y - m.from.y;
          const len = Math.hypot(dx, dy);
          const mx = (m.from.x + m.to.x) / 2;
          const my = (m.from.y + m.to.y) / 2;
          // Normal vector for label offset
          const nx = -dy / (len || 1);
          const ny = dx / (len || 1);
          const readout =
            m.label ??
            (m.pxPerUnit
              ? `${(len / m.pxPerUnit).toFixed(1)} ${m.unit ?? ""}`.trim()
              : `${len.toFixed(0)} px`);
          return (
            <g key={m.id}>
              {/* End ticks perpendicular to the segment */}
              <line
                x1={m.from.x + nx * 4} y1={m.from.y + ny * 4}
                x2={m.from.x - nx * 4} y2={m.from.y - ny * 4}
                stroke={ACCENT} strokeWidth={1}
              />
              <line
                x1={m.to.x + nx * 4} y1={m.to.y + ny * 4}
                x2={m.to.x - nx * 4} y2={m.to.y - ny * 4}
                stroke={ACCENT} strokeWidth={1}
              />
              <line
                x1={m.from.x} y1={m.from.y}
                x2={m.to.x} y2={m.to.y}
                stroke={ACCENT} strokeWidth={1} strokeDasharray="3 3"
              />
              <rect
                x={mx + nx * 9 - 18} y={my + ny * 9 - 7}
                width={36} height={14} rx={3}
                fill="hsl(var(--background))" stroke={ACCENT} strokeWidth={0.75}
              />
              <text
                x={mx + nx * 9} y={my + ny * 9 + 4}
                textAnchor="middle" fontSize={10} fontWeight={600}
                fill={ACCENT}
              >
                {readout}
              </text>
            </g>
          );
        }
        // Angle measurement
        const va = Math.atan2(m.a.y - m.vertex.y, m.a.x - m.vertex.x);
        const vb = Math.atan2(m.b.y - m.vertex.y, m.b.x - m.vertex.x);
        let delta = vb - va;
        // Normalise to (-π, π] then take absolute value for the inner angle
        while (delta > Math.PI) delta -= 2 * Math.PI;
        while (delta <= -Math.PI) delta += 2 * Math.PI;
        const sweep = delta > 0 ? 1 : 0;
        const deg = Math.abs((delta * 180) / Math.PI);
        const r = m.radius ?? 22;
        const ax = m.vertex.x + Math.cos(va) * r;
        const ay = m.vertex.y + Math.sin(va) * r;
        const bx = m.vertex.x + Math.cos(vb) * r;
        const by = m.vertex.y + Math.sin(vb) * r;
        const largeArc = Math.abs(delta) > Math.PI ? 1 : 0;
        // Label position — bisector midway through the arc
        const mid = va + delta / 2;
        const lx = m.vertex.x + Math.cos(mid) * (r + 12);
        const ly = m.vertex.y + Math.sin(mid) * (r + 12);
        const readout = m.label ?? `${deg.toFixed(0)}°`;
        return (
          <g key={m.id}>
            {/* Reference rays */}
            <line x1={m.vertex.x} y1={m.vertex.y} x2={ax} y2={ay}
              stroke={ACCENT} strokeWidth={1} strokeDasharray="2 2" />
            <line x1={m.vertex.x} y1={m.vertex.y} x2={bx} y2={by}
              stroke={ACCENT} strokeWidth={1} strokeDasharray="2 2" />
            {/* Filled arc */}
            <path
              d={`M ${ax},${ay} A ${r},${r} 0 ${largeArc} ${sweep} ${bx},${by} L ${m.vertex.x},${m.vertex.y} Z`}
              fill={ACCENT_SOFT} stroke={ACCENT} strokeWidth={1}
            />
            <text
              x={lx} y={ly + 3}
              textAnchor="middle" fontSize={10} fontWeight={700}
              fill={ACCENT}
              stroke="hsl(var(--background))" strokeWidth={3} paintOrder="stroke"
            >
              {readout}
            </text>
          </g>
        );
      })}
      {/* Landmark crosshairs + labels */}
      {landmarks.map((l) => {
        const dx = l.dx ?? 8;
        const dy = l.dy ?? -8;
        const anchor = l.anchor ?? "start";
        return (
          <g key={l.id}>
            <circle cx={l.x} cy={l.y} r={3} fill="hsl(var(--background))"
              stroke={ACCENT} strokeWidth={1.5} />
            <line x1={l.x} y1={l.y} x2={l.x + dx} y2={l.y + dy}
              stroke={ACCENT} strokeWidth={0.75} />
            <text
              x={l.x + dx + (anchor === "end" ? -2 : 2)}
              y={l.y + dy - 1}
              textAnchor={anchor}
              fontSize={9.5} fontWeight={600}
              fill="hsl(var(--foreground))"
              stroke="hsl(var(--background))" strokeWidth={3} paintOrder="stroke"
            >
              {l.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const PositionFrame = ({
  title,
  caption,
  hotspots,
  width = 560,
  height = 280,
  children,
  legend,
  landmarks,
  measurements,
}: PositionDiagramProps) => {
  const [activeId, setActiveId] = useState<string | null>(hotspots[0]?.id ?? null);
  const [overlayOn, setOverlayOn] = useState(false);
  const active = hotspots.find((h) => h.id === activeId);
  const hasOverlay = (landmarks?.length ?? 0) + (measurements?.length ?? 0) > 0;

  return (
    <div className="my-4 rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{caption}</p>
        </div>
        {hasOverlay && (
          <button
            type="button"
            onClick={() => setOverlayOn((v) => !v)}
            aria-pressed={overlayOn}
            className={cn(
              "flex-none text-[10px] uppercase tracking-wide font-semibold rounded-md border px-2 py-1 transition-colors",
              overlayOn
                ? "bg-[hsl(190_90%_45%)] text-white border-[hsl(190_90%_45%)]"
                : "bg-background text-muted-foreground border-border hover:text-foreground",
            )}
            title="Toggle landmark labels & measurements"
          >
            {overlayOn ? "Anatomy ✓" : "Anatomy overlay"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px]">
        {/* Diagram */}
        <div className="p-3 bg-[hsl(var(--background))]">
          <div className="overflow-x-auto -mx-1 px-1">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto min-w-[460px]"
              role="img"
              aria-label={title}
            >
              <AnatomyDefs idPrefix="pf" />
              {children}

              {/* Validation overlay */}
              {overlayOn && hasOverlay && (
                <ValidationOverlay landmarks={landmarks} measurements={measurements} />
              )}

              {/* Hotspots */}
              {hotspots.map((h, i) => {
                const isActive = h.id === activeId;
                return (
                  <g
                    key={h.id}
                    onPointerEnter={() => setActiveId(h.id)}
                    onClick={() => setActiveId(h.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <circle
                      cx={h.x}
                      cy={h.y}
                      r={isActive ? 13 : 11}
                      fill={isActive ? POS_RED : POS_AMBER}
                      fillOpacity={isActive ? 0.95 : 0.85}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                    <text
                      x={h.x}
                      y={h.y + 4}
                      textAnchor="middle"
                      fontSize={12}
                      fontWeight={700}
                      fill="hsl(var(--background))"
                    >
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          {legend ? (
            <div className="mt-2 px-1 text-[11px] text-muted-foreground">{legend}</div>
          ) : null}
        </div>

        {/* Side panel */}
        <div className="border-t md:border-t-0 md:border-l border-border bg-muted/20 p-3 text-xs">
          <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
            Pressure points & injury risks
          </p>
          <ol className="space-y-1.5 mb-3">
            {hotspots.map((h, i) => {
              const isActive = h.id === activeId;
              return (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(h.id)}
                    onPointerEnter={() => setActiveId(h.id)}
                    className={cn(
                      "w-full text-left rounded-md px-2 py-1 transition-colors flex items-start gap-2",
                      isActive
                        ? "bg-[hsl(0_70%_50%)]/10 text-foreground"
                        : "hover:bg-muted text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex-none w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white",
                      )}
                      style={{ background: isActive ? POS_RED : POS_AMBER }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-snug">{h.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          {active ? (
            <div className="rounded-md border border-border bg-background p-2 leading-relaxed text-foreground/90">
              <p className="font-semibold text-foreground mb-1">{active.label}</p>
              <p>{active.detail}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

// ── Generic reusable shapes ───────────────────────────────────────────

const Table = ({
  x,
  y,
  w,
  h = 8,
  rx = 2,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  rx?: number;
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={rx} fill="hsl(210 25% 35%)" />
    {/* Table column */}
    <rect x={x + w / 2 - 8} y={y + h} width={16} height={26} fill="hsl(210 20% 45%)" />
    <rect x={x + w / 2 - 28} y={y + h + 26} width={56} height={6} rx={1} fill="hsl(210 15% 55%)" />
  </g>
);

// ── 1. SUPINE ──────────────────────────────────────────────────────────

export const SupinePositionDiagram = () => (
  <PositionFrame
    title="Supine position"
    caption="Default surgical position — patient lies face-up on a flat operating table."
    hotspots={[
      { id: "occ", x: 90, y: 110, label: "Occiput — pressure alopecia", detail: "Prolonged surgery (>4 h) on a hard headrest can cause focal alopecia from sustained scalp ischaemia. Use a soft gel ring and reposition the head every 30–60 min." },
      { id: "elbow", x: 230, y: 145, label: "Ulnar nerve at the elbow", detail: "The ulnar nerve runs in the cubital tunnel posterior to the medial epicondyle. With the arm pronated and tucked it is compressed between the bone and the table — supinate the forearm and pad the elbow. Commonest postoperative neuropathy after general anaesthesia." },
      { id: "sacrum", x: 290, y: 155, label: "Sacrum & heels", detail: "Supine pressure ulcers cluster over the sacrum, scapulae and heels. Float the heels off the mattress and use a pressure-redistributing surface for cases >2 h." },
      { id: "brachial", x: 200, y: 130, label: "Brachial plexus (arm-board)", detail: "Abduction of the arm >90° on an arm-board stretches the plexus over the head of the humerus. Keep abduction <90°, externally rotate, and avoid extension." },
    ]}
    landmarks={[
      { id: "occ", x: 108, y: 120, label: "Occiput", dx: -6, dy: -14, anchor: "end" },
      { id: "sh", x: 130, y: 146, label: "Shoulder (acromion)", dx: -10, dy: -22, anchor: "end" },
      { id: "elb", x: 230, y: 145, label: "Elbow (med. epicondyle)", dx: 10, dy: 22 },
      { id: "wr", x: 280, y: 138, label: "Wrist", dx: 8, dy: 18 },
      { id: "asis", x: 360, y: 150, label: "ASIS", dx: 8, dy: 18 },
      { id: "knee", x: 430, y: 150, label: "Knee", dx: 0, dy: 22, anchor: "middle" },
      { id: "heel", x: 482, y: 158, label: "Heel", dx: 8, dy: 14 },
    ]}
    measurements={[
      // Shoulder abduction = angle between trunk axis (shoulder→hip) and humerus (shoulder→elbow)
      {
        kind: "angle", id: "abd",
        vertex: { x: 130, y: 146 },
        a: { x: 360, y: 146 },   // along trunk → hip (lateral arm-board)
        b: { x: 230, y: 145 },   // along upper arm → elbow
        radius: 28,
      },
      // Shoulder-to-wrist span (arm-board reach) — useful sanity check
      {
        kind: "distance", id: "armReach",
        from: { x: 130, y: 146 }, to: { x: 280, y: 138 },
        unit: "cm", pxPerUnit: 5,
      },
    ]}
    legend={<>Common procedures: most general, vascular, urological, breast and orthopaedic upper-limb surgery.</>}
  >
    {/* Table */}
    <Table x={70} y={170} w={420} />

    {/* Patient — supine, head left, feet right */}
    <SupinePatient idPrefix="pf" x={120} y={120} length={250} />

    {/* Anatomical labels */}
    <text x={108} y={108} textAnchor="middle" fontSize={10} fill="hsl(var(--muted-foreground))">head</text>
    <text x={500} y={144} fontSize={10} fill="hsl(var(--muted-foreground))">feet</text>
    {/* horizon */}
    <line x1={70} y1={170} x2={490} y2={170} stroke="hsl(210 25% 25%)" strokeWidth={1} />
  </PositionFrame>
);

// ── 2. TRENDELENBURG ───────────────────────────────────────────────────

export const TrendelenburgPositionDiagram = () => (
  <PositionFrame
    title="Trendelenburg & reverse Trendelenburg"
    caption="Whole-table tilt head-down (Trendelenburg) for pelvic surgery; head-up (reverse) for upper-abdominal/laparoscopic gastric work."
    hotspots={[
      { id: "iop", x: 130, y: 95, label: "↑ IOP & cerebral venous pressure", detail: "Steep head-down tilt (e.g. robotic prostatectomy, 25–40°) can raise IOP by 13 mmHg and ICP by ~10 mmHg. Risk of post-op visual loss (POVL), conjunctival oedema and cerebral oedema." },
      { id: "frc", x: 270, y: 130, label: "↓ FRC, atelectasis", detail: "Abdominal contents push the diaphragm cephalad → ↓ FRC, ↑ shunt, ↓ compliance. Use lung-protective ventilation, recruitment manoeuvres and PEEP. Reverse Trendelenburg has the opposite (favourable) respiratory effect." },
      { id: "preload", x: 320, y: 150, label: "↑ preload (Trendelenburg) / ↓ preload (reverse)", detail: "Head-down auto-transfuses the central circulation — preload rises, useful in hypovolaemia but can decompensate failing ventricles. Reverse Trendelenburg drops venous return and can cause hypotension on induction." },
      { id: "slip", x: 410, y: 110, label: "Patient sliding", detail: "Steep tilt risks the patient sliding cephalad. Use anti-slip gel mattress, shoulder braces (NOT on the brachial plexus!), or the bean-bag/vacuum mattress. Shoulder braces on the AC joint cause brachial plexopathy — place over the lateral clavicle only." },
    ]}
    landmarks={[
      { id: "head", x: 130, y: 95, label: "Head (down)", dx: -6, dy: -14, anchor: "end" },
      { id: "feet", x: 410, y: 170, label: "Feet (up)", dx: 12, dy: 0 },
      { id: "pivot", x: 280, y: 210, label: "Table pivot", dx: 0, dy: 18, anchor: "middle" },
    ]}
    measurements={[
      // Tilt angle: between horizontal (pivot→right) and tilted bed long axis (pivot→head end)
      {
        kind: "angle", id: "tilt",
        vertex: { x: 280, y: 210 },
        a: { x: 510, y: 210 },                  // horizontal reference
        // Rotated -15° about (280, 170): point originally (70, 210) maps to ~ (130, 90) on the head side
        b: { x: 280 + Math.cos((-195 * Math.PI) / 180) * 210,
             y: 210 + Math.sin((-195 * Math.PI) / 180) * 210 },
        radius: 60,
        label: "tilt 15°",
      },
    ]}
    legend={<>Common procedures: robotic/laparoscopic pelvic surgery, gynaecology, lower colorectal, central-line insertion (Trendelenburg); laparoscopic upper GI / bariatric (reverse).</>}
  >
    {/* Tilted table — head down */}
    <g transform="rotate(-15 280 170)">
      <Table x={70} y={170} w={420} />
      {/* Patient — supine on tilted table */}
      <SupinePatient idPrefix="pf" x={120} y={120} length={250} showFarArm={false} />
      {/* Shoulder brace (over lateral clavicle) */}
      <rect x={130} y={113} width={7} height={22} rx={2} fill={POS_RED} opacity={0.7} />
    </g>
    {/* Tilt-angle indicator */}
    <line x1={40} y1={210} x2={510} y2={210} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
    <text x={500} y={205} textAnchor="end" fontSize={10} fill="hsl(var(--muted-foreground))">horizontal</text>
    <text x={250} y={235} fontSize={11} fontWeight={600} fill="hsl(var(--foreground))">~ 15–40° head down</text>
  </PositionFrame>
);

// ── 3. LITHOTOMY ───────────────────────────────────────────────────────

export const LithotomyPositionDiagram = () => (
  <PositionFrame
    title="Lithotomy & Lloyd-Davies"
    caption="Hips and knees flexed in stirrups (Allen / Yellofin). Lloyd-Davies = lower (less flexed) variant for combined abdominal + perineal access."
    hotspots={[
      { id: "cpn", x: 360, y: 100, label: "Common peroneal nerve (fibular head)", detail: "Compressed between the lateral fibular head and the stirrup — causes foot drop. Pad the lateral knee and avoid lateral stirrup contact. Highest-incidence stirrup-related injury." },
      { id: "saph", x: 365, y: 130, label: "Saphenous nerve (medial tibia)", detail: "Compressed on the medial side by the stirrup support — paraesthesia along the medial calf." },
      { id: "compart", x: 380, y: 145, label: "Well-leg compartment syndrome", detail: "Risk rises sharply when stirrup time exceeds 4 h (some quote 2 h). Elevation ↓ perfusion pressure, calf compression by the stirrup ↑ tissue pressure. Mitigations: lower the legs every 2 h, use boot-style supports, avoid hypotension, document calf perfusion post-op." },
      { id: "hip", x: 320, y: 90, label: "Hip & femoral nerve stretch", detail: "Excessive hip flexion / abduction / external rotation stretches the femoral and obturator nerves and can dislocate prosthetic hips. Limit hip flexion to <90° if possible; both legs MUST be raised and lowered simultaneously to avoid pelvic torsion / lumbar strain." },
      { id: "back", x: 200, y: 150, label: "Lumbar lordosis loss", detail: "Flat positioning + pelvic tilt cause low-back pain post-op, especially in the elderly. Pad the lumbar spine and avoid prolonged extreme flexion." },
    ]}
    landmarks={[
      { id: "hip", x: 345, y: 132, label: "Hip", dx: -10, dy: -8, anchor: "end" },
      { id: "knee", x: 395, y: 92, label: "Knee", dx: 0, dy: -14, anchor: "middle" },
      { id: "fib", x: 405, y: 100, label: "Fibular head (CPN risk)", dx: 14, dy: -2 },
      { id: "ankle", x: 460, y: 120, label: "Ankle", dx: 12, dy: 6 },
    ]}
    measurements={[
      // Hip flexion: trunk axis (hip → shoulder) vs femur (hip → knee)
      {
        kind: "angle", id: "hipFlex",
        vertex: { x: 345, y: 132 },
        a: { x: 130, y: 146 },   // along trunk toward shoulder
        b: { x: 395, y: 92 },    // along femur toward knee
        radius: 32,
      },
      // Knee flexion: femur (knee → hip) vs tibia (knee → ankle)
      {
        kind: "angle", id: "kneeFlex",
        vertex: { x: 395, y: 92 },
        a: { x: 345, y: 132 },
        b: { x: 460, y: 120 },
        radius: 24,
      },
    ]}
    legend={<>Common procedures: cystoscopy, TURP, gynaecological surgery, anorectal surgery, vaginal hysterectomy; Lloyd-Davies for anterior resection / APR.</>}
  >
    <Table x={70} y={170} w={300} />

    {/* Patient — supine trunk + arms folded; legs drawn bespoke in stirrups */}
    <SupinePatient
      idPrefix="pf" x={120} y={120} length={225}
      armsFolded showLegs={false} showFarArm={false}
    />

    {/* RIGHT leg in Allen-style stirrup (upper view) */}
    <Leg idPrefix="pf" hx={345} hy={132} kx={395} ky={92} ax={460} ay={120} thighW={22} calfW={17} footLen={20} />
    {/* LEFT leg in stirrup (slightly behind) */}
    <g opacity={0.85}>
      <Leg idPrefix="pf" hx={345} hy={150} kx={400} ky={108} ax={462} ay={138} thighW={22} calfW={17} footLen={20} />
    </g>

    {/* Stirrup boot — Allen-style (cradles calf, NOT lateral fibular head) */}
    <g>
      <path d="M 452 110 Q 478 100 472 140 L 462 145 Q 466 118 448 118 Z"
        fill="hsl(210 25% 35%)" stroke="hsl(210 25% 20%)" strokeWidth={1} />
      <line x1={465} y1={138} x2={478} y2={158} stroke="hsl(210 25% 25%)" strokeWidth={3} />
    </g>

    <text x={250} y={235} fontSize={11} fontWeight={600} fill="hsl(var(--foreground))">hips & knees flexed in stirrups</text>
  </PositionFrame>
);

// ── 4. LATERAL DECUBITUS ───────────────────────────────────────────────

export const LateralPositionDiagram = () => (
  <PositionFrame
    title="Lateral decubitus"
    caption="Patient on their side with an axillary roll, dependent leg flexed, upper leg straight on a pillow."
    hotspots={[
      { id: "axroll", x: 145, y: 145, label: "Axillary roll (NOT in the axilla)", detail: "Placed beneath the chest 2–3 finger-breadths CAUDAL to the axilla — never IN the axilla, where it would compress the brachial plexus and axillary artery. Confirm the dependent radial pulse after positioning." },
      { id: "depeye", x: 100, y: 110, label: "Dependent eye & ear", detail: "Risk of corneal abrasion and pinna pressure ulcer. Use eye lubricant + tape, foam head ring with an ear cut-out, neutral cervical alignment." },
      { id: "depbrach", x: 175, y: 135, label: "Dependent brachial plexus", detail: "Compressed under the chest and humeral head. Pad the dependent arm and ensure axillary roll is correctly placed. Check pulses." },
      { id: "uplim", x: 230, y: 100, label: "Non-dependent (up) arm", detail: "Supported on a padded arm-rest or sling — abduction <90°, neutral rotation. Hyperabduction stretches the plexus." },
      { id: "vq", x: 285, y: 150, label: "V/Q mismatch", detail: "Awake spontaneously breathing lateral: ventilation matches perfusion (both favour dependent lung). Anaesthetised + paralysed + open chest: ventilation goes to the upper (compliant) lung but perfusion stays dependent → significant V/Q mismatch and shunt." },
      { id: "perlat", x: 360, y: 140, label: "Common peroneal & lateral malleolus", detail: "Dependent fibular neck compresses the common peroneal nerve. Place a pillow between the legs and pad the dependent fibular neck and lateral malleolus." },
    ]}
    landmarks={[
      { id: "head", x: 110, y: 120, label: "Head (dependent)", dx: -8, dy: -16, anchor: "end" },
      { id: "axroll", x: 145, y: 145, label: "Axillary roll (caudal to axilla)", dx: -8, dy: -22, anchor: "end" },
      { id: "shUp", x: 230, y: 100, label: "Up shoulder", dx: 0, dy: -16, anchor: "middle" },
      { id: "ilum", x: 320, y: 150, label: "Iliac crest", dx: 0, dy: 22, anchor: "middle" },
      { id: "kneeUp", x: 360, y: 110, label: "Up knee (straight on pillow)", dx: 14, dy: -8 },
      { id: "kneeDep", x: 365, y: 165, label: "Dependent knee (flexed)", dx: 14, dy: 16 },
    ]}
    measurements={[
      // Head-to-pelvis trunk length
      {
        kind: "distance", id: "trunk",
        from: { x: 145, y: 130 }, to: { x: 345, y: 150 },
        unit: "cm", pxPerUnit: 5,
      },
      // Up-arm shoulder abduction reference
      {
        kind: "angle", id: "shUpAbd",
        vertex: { x: 230, y: 110 },
        a: { x: 320, y: 150 },   // along trunk
        b: { x: 230, y: 70 },    // up-arm direction (≈ vertical)
        radius: 26,
      },
    ]}
    legend={<>Common procedures: thoracotomy, oesophagectomy, nephrectomy, hip surgery, retroperitoneal procedures.</>}
  >
    <Table x={70} y={170} w={420} />

    {/* Lateral patient — composite handles head, torso, axillary roll, both arms, knee pillow, legs */}
    <LateralPatient idPrefix="pf" cx={245} cy={150} length={220} height={60} facing="left" />

    <text x={250} y={235} fontSize={11} fontWeight={600} fill="hsl(var(--foreground))">left lateral shown — kidney rest under flank if renal surgery</text>
  </PositionFrame>
);

// ── 5. PRONE ───────────────────────────────────────────────────────────

export const PronePositionDiagram = () => (
  <PositionFrame
    title="Prone position (general)"
    caption="Patient face-down on supports that leave the abdomen free. Choice of frame (Wilson / Jackson / Montreal / Relton-Hall) depends on procedure — see frame comparison below."
    hotspots={[
      { id: "eyes", x: 120, y: 95, label: "Eyes — POVL & globe pressure", detail: "Direct globe pressure causes ischaemic optic neuropathy and retinal artery occlusion (post-op visual loss, POVL). Use a horseshoe / Mayfield / ProneView mirror system, document free eye position every 15 min, avoid hypotension, head NEUTRAL or slightly above the heart." },
      { id: "neck", x: 145, y: 110, label: "Cervical spine (neutral)", detail: "Excessive flexion / extension / rotation risks cord injury (especially in pre-existing cervical disease) and brachial plexus stretch. Confirm neutral alignment after every move." },
      { id: "ettube", x: 100, y: 100, label: "Endotracheal tube — endobronchial migration", detail: "ETT tip moves an average of 1.9 cm caudally on prone repositioning — risk of right main-bronchus intubation. Re-check ETT position and bilateral air entry after turning. Use a reinforced (armoured) tube." },
      { id: "abdo", x: 280, y: 145, label: "Abdomen MUST hang free", detail: "Abdominal compression raises intra-abdominal pressure → IVC obstruction → ↓ venous return → ↓ CO and engorged epidural veins (↑ surgical bleeding). All prone frames lift the chest and pelvis to keep the belly free." },
      { id: "knees", x: 410, y: 145, label: "Knees, anterior superior iliac spine, breasts/genitalia", detail: "Pad the knees, ASIS and male genitalia (avoid penile compression). Female breasts displaced laterally or supported." },
      { id: "arms", x: 220, y: 100, label: "Arms — 'superman' or tucked", detail: "Either tucked at the side (preferred for spinal fusion) or abducted <90° + flexed at elbow with neutral wrist (superman). Excessive abduction stretches the plexus; the humerus rotates anteriorly when prone." },
    ]}
    landmarks={[
      { id: "head", x: 120, y: 95, label: "Head (horseshoe)", dx: -6, dy: -16, anchor: "end" },
      { id: "chest", x: 200, y: 130, label: "Chest support", dx: 0, dy: -18, anchor: "middle" },
      { id: "asis", x: 360, y: 145, label: "ASIS / pelvis support", dx: 0, dy: 22, anchor: "middle" },
      { id: "knee", x: 410, y: 145, label: "Knee", dx: 8, dy: 22 },
    ]}
    measurements={[
      // Free abdominal span between chest and pelvis supports — must remain free
      {
        kind: "distance", id: "freeBelly",
        from: { x: 220, y: 145 }, to: { x: 340, y: 150 },
        unit: "cm", pxPerUnit: 5,
        label: "free belly",
      },
    ]}
    legend={<>Common procedures: posterior spinal surgery, posterior fossa craniotomy, nephrolithotomy (PCNL), severe ARDS proning in ICU.</>}
  >
    <Table x={70} y={180} w={420} />
    {/* Prone patient — composite handles chest+pelvis supports, torso, head, horseshoe, superman arms, legs */}
    <PronePatient idPrefix="pf" x={140} y={114} length={250} />
    <text x={280} y={172} textAnchor="middle" fontSize={10} fill={POS_GREEN} fontWeight={700}>abdomen hangs free</text>
    <text x={280} y={235} fontSize={11} fontWeight={600} fill="hsl(var(--foreground))">prone — chest & pelvis supported, abdomen free</text>
  </PositionFrame>
);

// ── 5b. PRONE FRAMES — Wilson / Jackson / Montreal / Relton ────────────

interface FrameCardProps {
  name: string;
  hue: number;
  caption: string;
  pros: string;
  cons: string;
  uses: string;
  /** Specific positioning issues / pitfalls unique to this frame. */
  issues: string[];
  /** Frame-specific supports drawn UNDER the patient silhouette (in viewBox 240×130). */
  draw: React.ReactNode;
  /** Optional spine curve override (path d). Defaults to a gentle natural lordosis. */
  spinePath?: string;
}

const FrameCard = ({
  name,
  hue,
  caption,
  pros,
  cons,
  uses,
  issues,
  draw,
  spinePath,
}: FrameCardProps) => {
  const accent = `hsl(${hue} 60% 50%)`;
  // Default spine: natural prone lordosis, head LEFT, feet RIGHT
  const spine = spinePath ?? "M 35 60 Q 80 56 120 60 Q 165 64 205 62";

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card flex flex-col">
      <div
        className="p-2 border-b border-border"
        style={{ background: `hsl(${hue} 60% 50% / 0.08)` }}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: accent }}
            aria-hidden
          />
          <p className="text-sm font-semibold text-foreground">{name}</p>
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5">{caption}</p>
      </div>

      <div className="p-2">
        <svg
          viewBox="0 0 240 130"
          className="w-full h-auto"
          role="img"
          aria-label={`${name} — side-on schematic of patient on frame`}
        >
          {/* Theatre table base + legs */}
          <rect x={10} y={108} width={220} height={6} rx={2} fill="hsl(210 25% 35%)" />
          <rect x={20} y={114} width={6} height={14} fill="hsl(210 25% 30%)" />
          <rect x={214} y={114} width={6} height={14} fill="hsl(210 25% 30%)" />

          {/* Floor reference line */}
          <line
            x1={0}
            y1={128}
            x2={240}
            y2={128}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={0.5}
            strokeDasharray="2 3"
            opacity={0.5}
          />

          {/* Frame-specific supports (drawn UNDER patient) */}
          <g style={{ color: accent }}>{draw}</g>

          {/* Patient — prone, side-on. Head LEFT, feet RIGHT. */}
          {/* Torso */}
          <path
            d="M 55 56 Q 90 50 130 54 Q 170 58 200 60 L 200 70 Q 170 68 130 64 Q 90 60 55 66 Z"
            fill="hsl(35 70% 82%)"
            stroke="hsl(35 50% 40%)"
            strokeWidth={0.75}
          />
          {/* Spine curve indicator */}
          <path
            d={spine}
            fill="none"
            stroke="hsl(0 0% 25%)"
            strokeWidth={1}
            strokeDasharray="2 2"
            opacity={0.7}
          />
          {/* Head + neck */}
          <circle
            cx={42}
            cy={58}
            r={9}
            fill="hsl(35 70% 82%)"
            stroke="hsl(35 50% 40%)"
            strokeWidth={0.75}
          />
          <line x1={50} y1={60} x2={58} y2={60} stroke="hsl(35 50% 40%)" strokeWidth={2} />
          {/* Buttock + leg taper */}
          <path
            d="M 200 60 Q 215 62 222 66 L 222 70 Q 215 70 200 70 Z"
            fill="hsl(35 70% 82%)"
            stroke="hsl(35 50% 40%)"
            strokeWidth={0.75}
          />

          {/* Head + foot direction labels */}
          <text x={32} y={48} fontSize={6} fill="hsl(var(--muted-foreground))" textAnchor="middle">
            HEAD
          </text>
          <text
            x={218}
            y={48}
            fontSize={6}
            fill="hsl(var(--muted-foreground))"
            textAnchor="middle"
          >
            FEET
          </text>
        </svg>

        <dl className="mt-2 text-[11px] grid grid-cols-1 gap-1.5">
          <div>
            <dt className="font-semibold text-[hsl(150_55%_35%)] dark:text-[hsl(150_55%_55%)]">
              Pros
            </dt>
            <dd className="text-muted-foreground">{pros}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[hsl(0_70%_45%)] dark:text-[hsl(0_70%_60%)]">Cons</dt>
            <dd className="text-muted-foreground">{cons}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Used for</dt>
            <dd className="text-muted-foreground">{uses}</dd>
          </div>
          <div>
            <dt
              className="font-semibold"
              style={{ color: accent }}
            >
              Specific positioning issues
            </dt>
            <dd>
              <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground marker:text-muted-foreground/75">
                {issues.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

// ── 5c. PRONE FACE PROTECTION (close-up) ───────────────────────────────

/**
 * Detailed close-up of how the face is protected when prone:
 *  • Three-mirror "ProneView" / horseshoe foam contour, with the eyes,
 *    nose and mouth suspended in the central cut-out (NO globe pressure).
 *  • Reinforced (armoured) ETT routed through the mirror gap, secured
 *    away from the lower lip.
 *  • Annotated checks: free eyes, ear flat, ETT free, chin off chest,
 *    forehead/malar bone bears the load.
 */
import proneFaceProtectorImg from "@/assets/positioning/prone-face-protector.jpg";
import { DiagramFigure } from "../_shared/DiagramFigure";

export const ProneFaceProtectionDiagram = () => {
  return (
    <figure className="my-4 rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">
          Face protection in prone — Proneview-style foam face protector
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Side and from-below views. Load is borne on the forehead and malar (zygomatic) bone; the
          globes, nose, lips and ETT hang free in the central cut-out — eyes are NOT compressed.
        </p>
      </div>
      <div className="bg-muted/10 p-3">
        <img
          src={proneFaceProtectorImg}
          alt="Two-panel illustration: side view and view-from-below of a patient's face resting in a Proneview-style foam face protector, showing eyes free of compression in the central cut-out"
          loading="lazy"
          width={1280}
          height={768}
          className="w-full h-auto object-contain max-h-[460px] mx-auto"
        />
      </div>
      <figcaption className="px-4 py-3 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Five face checks before the drape goes on
        </p>
        <ol className="mt-1.5 grid gap-1 sm:grid-cols-2 text-xs text-muted-foreground list-decimal list-inside">
          <li>Load on forehead + malar bone — never on the globes.</li>
          <li>Both eyes free in the central cut-out; lubricate + tape closed.</li>
          <li>Pinna flat, no folding under the foam rim.</li>
          <li>Nasal tip and lips suspended free; ETT taped away from skin.</li>
          <li>C-spine neutral — no rotation; chin off chest (two-finger rule).</li>
        </ol>
      </figcaption>
    </figure>
  );
};

// ── 5d. MAYFIELD 3-PIN HEAD HOLDER — correct pin siting ───────────────

/**
 * Bird's-eye / lateral hybrid view of the Mayfield clamp on a skull,
 * showing the safe corridor for pin placement and the structures that
 * must be avoided on each side.
 */
export const MayfieldPinSitingDiagram = () => {
  const W = 560;
  const H = 360;
  const STEEL = "hsl(220 15% 55%)";
  const STEEL_DARK = "hsl(220 18% 32%)";
  const PIN = "hsl(0 70% 50%)";
  const SAFE = "hsl(150 55% 40%)";
  const DANGER = POS_RED;

  // Skull viewed from above (vertex). Centre of cranium:
  const cx = 260, cy = 200;
  const a = 85;  // half AP length
  const b = 70;  // half lateral width
  // Pin coordinates around the equator of the skull.
  // Single-pin (rocker) on patient's RIGHT (viewer's left) above the ear.
  const p1 = { x: cx - b - 6, y: cy - 10 };
  // Two opposing pins on the patient's LEFT (viewer's right).
  const p2 = { x: cx + b * 0.55, y: cy - 55 };  // postero-temporal (above mastoid, behind hairline)
  const p3 = { x: cx + b * 0.55, y: cy + 35 };  // antero-temporal (above pinna, behind eye)

  return (
    <div className="my-4 rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">
          Mayfield 3-pin head holder — correct pin siting (vertex view)
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Single rocker pin on one side, two opposing pins on the other. Pins sit in the safe equatorial belt above the ear and behind the hairline — clear of temporal bone, frontal sinus, temporal artery and orbits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px]">
        <div className="p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[460px]" role="img" aria-label="Mayfield pin siting">
            <AnatomyDefs idPrefix="myf" />

            {/* Cranium from above */}
            <ellipse cx={cx} cy={cy} rx={a} ry={b} fill={`url(#myf-skin)`}
              stroke="hsl(28 50% 35%)" strokeWidth={1} />
            {/* Subtle sheen */}
            <ellipse cx={cx} cy={cy} rx={a} ry={b} fill={`url(#myf-skin-sheen)`} pointerEvents="none" className="anat-sheen" />

            {/* Nose marker (anterior) */}
            <path d={`M ${cx - a - 2},${cy - 6} L ${cx - a - 14},${cy} L ${cx - a - 2},${cy + 6} Z`}
              fill={`url(#myf-skin)`} stroke="hsl(28 50% 35%)" strokeWidth={1} />
            <text x={cx - a - 18} y={cy + 3} textAnchor="end" fontSize={10}
              fill="hsl(var(--muted-foreground))" fontWeight={600}>anterior</text>
            <text x={cx + a + 8} y={cy + 3} fontSize={10}
              fill="hsl(var(--muted-foreground))" fontWeight={600}>posterior</text>

            {/* Ear pinnae — landmarks */}
            <ellipse cx={cx - 18} cy={cy - b - 4} rx={9} ry={5}
              fill={`url(#myf-skin)`} stroke="hsl(28 50% 35%)" strokeWidth={1} />
            <ellipse cx={cx - 18} cy={cy + b + 4} rx={9} ry={5}
              fill={`url(#myf-skin)`} stroke="hsl(28 50% 35%)" strokeWidth={1} />
            <text x={cx - 18} y={cy - b - 12} textAnchor="middle" fontSize={9}
              fill="hsl(var(--muted-foreground))">L pinna</text>
            <text x={cx - 18} y={cy + b + 22} textAnchor="middle" fontSize={9}
              fill="hsl(var(--muted-foreground))">R pinna</text>

            {/* Sutures (decorative — coronal + sagittal hint) */}
            <path d={`M ${cx - 30},${cy - b + 6} Q ${cx - 30},${cy} ${cx - 30},${cy + b - 6}`}
              fill="none" stroke="hsl(28 50% 35%)" strokeWidth={0.5} strokeDasharray="2 2" opacity={0.5} className="anat-sheen" />
            <path d={`M ${cx - 30},${cy} L ${cx + a - 10},${cy}`}
              fill="none" stroke="hsl(28 50% 35%)" strokeWidth={0.5} strokeDasharray="2 2" opacity={0.5} className="anat-sheen" />

            {/* SAFE BELT — translucent green ring around the equator */}
            <ellipse cx={cx} cy={cy} rx={a - 6} ry={b - 4}
              fill="none" stroke={SAFE} strokeWidth={3} opacity={0.18} />
            <text x={cx + 18} y={cy - b + 6} fontSize={9} fontWeight={700} fill={SAFE}>
              safe equator
            </text>

            {/* DANGER ZONES */}
            {/* Frontal sinus (anterior midline) */}
            <ellipse cx={cx - a + 14} cy={cy} rx={14} ry={9}
              fill={DANGER} opacity={0.18} stroke={DANGER} strokeWidth={1} strokeDasharray="3 2" />
            <text x={cx - a + 14} y={cy + 26} textAnchor="middle" fontSize={9} fontWeight={700} fill={DANGER}>
              frontal sinus
            </text>
            {/* Temporal squame — thin bone, both sides */}
            <ellipse cx={cx - 30} cy={cy - b + 14} rx={26} ry={8}
              fill={DANGER} opacity={0.14} stroke={DANGER} strokeWidth={1} strokeDasharray="3 2" />
            <text x={cx - 30} y={cy - b + 1} textAnchor="middle" fontSize={9} fontWeight={700} fill={DANGER}>
              temporal squame
            </text>
            <ellipse cx={cx - 30} cy={cy + b - 14} rx={26} ry={8}
              fill={DANGER} opacity={0.14} stroke={DANGER} strokeWidth={1} strokeDasharray="3 2" />
            <text x={cx - 30} y={cy + b + 0} textAnchor="middle" fontSize={9} fontWeight={700} fill={DANGER}>
              temporal squame
            </text>
            {/* Superficial temporal artery course (just anterior to tragus) */}
            <path d={`M ${cx - 28},${cy - b - 1} Q ${cx - 38},${cy - b * 0.5} ${cx - 42},${cy}`}
              fill="none" stroke={DANGER} strokeWidth={1} opacity={0.7} />
            <text x={cx - 60} y={cy + 4} fontSize={9} fontWeight={700} fill={DANGER}>STA</text>

            {/* C-shaped Mayfield clamp */}
            <path
              d={`M ${cx - b - 30},${cy - 30}
                  Q ${cx + a + 50},${cy - 60} ${cx + b + 30},${cy - 70}
                  L ${cx + b + 30},${cy + 70}
                  Q ${cx + a + 50},${cy + 60} ${cx - b - 30},${cy + 30}`}
              fill="none" stroke={STEEL_DARK} strokeWidth={3} strokeLinecap="round" opacity={0.85}
            />
            <path
              d={`M ${cx - b - 30},${cy - 30}
                  Q ${cx + a + 50},${cy - 60} ${cx + b + 30},${cy - 70}
                  L ${cx + b + 30},${cy + 70}
                  Q ${cx + a + 50},${cy + 60} ${cx - b - 30},${cy + 30}`}
              fill="none" stroke={STEEL} strokeWidth={2} strokeLinecap="round" className="anat-sheen"
            />

            {/* PINS */}
            {[p1, p2, p3].map((p, i) => {
              const isRocker = i === 0;
              return (
                <g key={i}>
                  {/* Pin shaft */}
                  <line x1={p.x + (i === 0 ? -22 : 22) * (i === 0 ? 1 : 1)}
                    y1={p.y + (i === 0 ? 0 : (i === 1 ? -8 : 8))}
                    x2={p.x} y2={p.y}
                    stroke={STEEL_DARK} strokeWidth={3} strokeLinecap="round" />
                  <line x1={p.x + (i === 0 ? -22 : 22)}
                    y1={p.y + (i === 0 ? 0 : (i === 1 ? -8 : 8))}
                    x2={p.x} y2={p.y}
                    stroke={STEEL} strokeWidth={2} strokeLinecap="round" className="anat-sheen" />
                  {/* Pin tip + entry circle */}
                  <circle cx={p.x} cy={p.y} r={5} fill={PIN} stroke="hsl(var(--background))" strokeWidth={1.5} />
                  <circle cx={p.x} cy={p.y} r={9} fill="none" stroke={PIN} strokeWidth={1} opacity={0.5} className="anat-sheen" />
                  {/* Label */}
                  <text x={p.x + (i === 0 ? -32 : 32)}
                    y={p.y + (i === 0 ? -10 : (i === 1 ? -14 : 18))}
                    textAnchor={i === 0 ? "end" : "start"}
                    fontSize={10} fontWeight={800} fill={PIN}>
                    {isRocker ? "rocker pin ×1" : i === 1 ? "pin 2" : "pin 3"}
                  </text>
                </g>
              );
            })}

            {/* Caption strip */}
            <rect x={70} y={310} width={420} height={36} rx={4}
              fill="hsl(var(--muted))" opacity={0.5} stroke="hsl(var(--border))" strokeWidth="0.75" />
            <text x={280} y={326} textAnchor="middle" fontSize={10.5} fontWeight={700}
              fill="hsl(var(--foreground))">
              Torque 60–80 lb-in (adult) · 40 lb-in paeds · re-check after positioning
            </text>
            <text x={280} y={340} textAnchor="middle" fontSize={9.5}
              fill="hsl(var(--muted-foreground))">
              Pins sit ABOVE the equator, BEHIND the hairline, AVOID temporal squame · STA · frontal sinus · orbits
            </text>
          </svg>
        </div>

        {/* Rules panel */}
        <div className="border-t md:border-t-0 md:border-l border-border bg-muted/20 p-3 text-xs">
          <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
            Rules of safe pinning
          </p>
          <ul className="space-y-2 text-foreground/90 leading-snug">
            <li><span className="font-semibold text-foreground">Geometry —</span> 1 rocker pin opposite 2 pins; the three pins must be coplanar and roughly equatorial.</li>
            <li><span className="font-semibold text-foreground">Site —</span> in the thick parietal/occipital bone, above the superior temporal line, behind the hairline.</li>
            <li><span className="font-semibold text-foreground">Avoid —</span> frontal sinus (CSF leak), temporal squame (thin → fracture), superficial temporal artery, orbits, mastoid air cells.</li>
            <li><span className="font-semibold text-foreground">Torque —</span> 60–80 lb-in adult · 40 lb-in &lt;10 yr · &lt;30 lb-in infant (or use a paediatric horseshoe instead).</li>
            <li><span className="font-semibold text-foreground">Anaesthesia —</span> deepen / give remifentanil bolus + scalp infiltration with LA before pinning to blunt the hypertensive response.</li>
            <li><span className="font-semibold text-foreground">After —</span> re-check pin sites and torque after final positioning; document.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const ProneFrameComparisonDiagram = () => (
  <div className="my-4 rounded-xl border border-border bg-card">
    <div className="px-4 py-3 border-b border-border bg-muted/30">
      <p className="text-sm font-semibold text-foreground">
        Prone-position frames at a glance — Wilson · Jackson · Relton-Hall · bolsters
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        Side-on schematics (head left, feet right). Each frame supports the chest and pelvis
        differently — the choice trades off lumbar lordosis, abdominal decompression, fluoroscopy
        access and turning logistics. Each card lists the frame-specific positioning issues
        beneath the diagram.
      </p>
    </div>
    <div className="p-3 grid gap-3 md:grid-cols-2">
      <FrameCard
        name="Wilson frame"
        hue={210}
        caption="Adjustable convex (banana-shaped) pad on a standard table — flexes the lumbar spine, opens posterior interlaminar windows."
        pros="Quick set-up on any standard table; opens the posterior interlaminar space (good for microdiscectomy); height/curvature adjustable mid-case."
        cons="REVERSES lumbar lordosis (avoid in instrumented fusion); pad presses on the abdomen → ↑ intra-abdominal pressure → epidural venous engorgement → ↑ blood loss."
        uses="Lumbar microdiscectomy, single-level lumbar decompression, short non-instrumented cases."
        issues={[
          "Loss of lumbar lordosis — DO NOT use for instrumented fusion (fixes spine in flexion).",
          "Abdominal pad raises IAP → IVC compression, epidural venous bleeding, ↓ venous return.",
          "Single curved pad concentrates weight on lower ribs / costal margin → rib fracture in elderly.",
          "Femoral nerve stretch over the distal edge if hip flexion is excessive.",
          "Limited lateral fluoroscopy access (frame in the C-arm beam path).",
        ]}
        spinePath="M 35 60 Q 80 72 120 76 Q 165 72 205 62"
        draw={
          <>
            <path
              d="M 60 92 Q 120 50 180 92 Z"
              fill="currentColor"
              opacity={0.25}
              stroke="currentColor"
              strokeWidth={1}
            />
            <path d="M 60 92 Q 120 50 180 92" fill="none" stroke="currentColor" strokeWidth={2} />
            <line x1={120} y1={92} x2={120} y2={108} stroke="currentColor" strokeWidth={1} />
            <circle cx={120} cy={108} r={2} fill="currentColor" />
          </>
        }
      />
      <FrameCard
        name="Jackson (open / spinal) table"
        hue={280}
        caption="Dedicated cantilever spinal table — discrete chest, hip, thigh and shin pads with the abdomen completely free."
        pros="Abdomen totally free → ↓ epidural venous engorgement → ↓ blood loss; preserves natural lordosis (essential for fusion); permits AP and lateral fluoroscopy through the radiolucent gap."
        cons="Dedicated, expensive, theatre-occupying table; needs the 'sandwich-flip' transfer (supine top + Jackson top, then 180° rotation); not available for emergency airway prone."
        uses="Multi-level posterior spinal fusion / instrumentation, scoliosis correction, complex thoraco-lumbar surgery."
        issues={[
          "Sandwich-flip transfer — high-risk moment: ETT, lines, eyes and pin fixation can all dislodge.",
          "Chest pad too high → axillary plexus compression; too low → ↑ peak airway pressures.",
          "Hip pads must sit on iliac crests (NOT abdomen) — wrong placement re-creates IAP problem.",
          "Knees flexed over thigh pad — protect patella & common peroneal nerve at fibular head.",
          "Eye care critical: head usually in horseshoe / ProneView mirror — recheck free eyes every 15 min.",
        ]}
        draw={
          <>
            <rect x={55} y={72} width={28} height={20} rx={3} fill="currentColor" opacity={0.55} />
            <rect x={150} y={72} width={28} height={20} rx={3} fill="currentColor" opacity={0.55} />
            <rect x={186} y={78} width={22} height={14} rx={3} fill="currentColor" opacity={0.4} />
            <rect
              x={85}
              y={68}
              width={62}
              height={26}
              fill="none"
              stroke="currentColor"
              strokeDasharray="3 3"
            />
            <text x={116} y={104} fontSize={6} textAnchor="middle" fill="currentColor" opacity={0.85}>
              ABDOMEN FREE
            </text>
          </>
        }
      />
      <FrameCard
        name="Relton-Hall (Montreal 4-poster)"
        hue={150}
        caption="Four discrete pads — two on the lateral chest wall, two on the iliac crests — mounted on a frame fixed to a standard table."
        pros="Excellent abdominal decompression; preserves lordosis; lightweight and portable; the classic paediatric scoliosis frame."
        cons="Pad placement is critical (chest wall + iliac crests ONLY — never abdomen, breasts or pectoralis); needs sizing for paediatric vs adult patients."
        uses="Paediatric / adolescent posterior spinal surgery (AIS, scoliosis, kyphosis correction); selected adult fusion."
        issues={[
          "Chest pads must sit on lateral ribs — too medial compresses pectoralis & breast tissue (women).",
          "Iliac-crest pads must NOT slip onto the lateral femoral cutaneous nerve → meralgia paraesthetica.",
          "If pads too far apart in small children → abdomen sags between them, defeating the design.",
          "Genital compression in males — check penis and scrotum free between iliac pads.",
          "Frame is rigid — no mid-case lordosis adjustment; check lordosis BEFORE draping.",
        ]}
        draw={
          <>
            <rect x={62} y={78} width={14} height={14} rx={2} fill="currentColor" opacity={0.7} />
            <rect x={80} y={78} width={14} height={14} rx={2} fill="currentColor" opacity={0.45} />
            <rect x={150} y={78} width={14} height={14} rx={2} fill="currentColor" opacity={0.7} />
            <rect x={168} y={78} width={14} height={14} rx={2} fill="currentColor" opacity={0.45} />
            <line
              x1={96}
              y1={84}
              x2={148}
              y2={84}
              stroke="currentColor"
              strokeDasharray="2 2"
              opacity={0.6}
            />
          </>
        }
      />
      <FrameCard
        name="Standard table + bolsters / gel rolls"
        hue={35}
        caption="Two longitudinal foam or gel bolsters running chest-to-pelvis on a standard operating table."
        pros="Universally available; cheap; rapid set-up; suits short cases, non-spinal prone work and ICU prone ventilation."
        cons="Less effective abdominal decompression than dedicated frames; greater pressure-injury risk over a longer surface area; lordosis poorly controllable."
        uses="Posterior fossa craniotomy, PCNL, posterior fistula / pilonidal surgery, ENT (posterior pharynx), ICU prone ventilation."
        issues={[
          "Bolsters can migrate intra-operatively → abdomen drops onto the table; recheck after every position change.",
          "Pressure spread along a long surface → higher risk over iliac crests, ASIS and knees.",
          "Less abdominal decompression than Jackson / Relton — significant epidural bleeding in long spinal cases.",
          "Breast / genital entrapment between bolsters — actively check before draping.",
          "ICU prone ventilation: rotate head every 2 h, check ETT and lines, watch for facial pressure injury.",
        ]}
        draw={
          <>
            <rect x={45} y={78} width={150} height={14} rx={6} fill="currentColor" opacity={0.55} />
            <rect x={45} y={92} width={150} height={6} rx={3} fill="currentColor" opacity={0.3} />
          </>
        }
      />
    </div>

    {/* Quick comparison reference table */}
    <div className="border-t border-border p-3 overflow-x-auto">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
        Quick comparison
      </p>
      <table className="w-full text-[11px] border-collapse">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="py-1 pr-2 font-semibold">Feature</th>
            <th className="py-1 px-2 font-semibold">Wilson</th>
            <th className="py-1 px-2 font-semibold">Jackson</th>
            <th className="py-1 px-2 font-semibold">Relton-Hall</th>
            <th className="py-1 px-2 font-semibold">Bolsters</th>
          </tr>
        </thead>
        <tbody className="text-foreground">
          {[
            ["Lumbar lordosis", "Lost (kyphosis)", "Preserved", "Preserved", "Variable"],
            ["Abdomen free?", "No", "Yes ✓", "Yes ✓", "Partial"],
            ["IAP / blood loss", "↑↑", "↓↓", "↓", "↑"],
            ["Fluoroscopy access", "Limited", "AP + lateral", "AP only", "AP only"],
            ["Set-up cost / time", "Low", "High", "Medium", "Lowest"],
            ["Best for", "Microdiscectomy", "Long fusion", "Paediatric scoliosis", "Short / ICU"],
          ].map((row) => (
            <tr key={row[0]} className="border-t border-border/60">
              <td className="py-1 pr-2 font-medium text-muted-foreground">{row[0]}</td>
              {row.slice(1).map((cell, i) => (
                <td key={i} className="py-1 px-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ── 6. PARK BENCH (modified lateral for posterior fossa / CPA) ─────────

export const ParkBenchPositionDiagram = () => (
  <PositionFrame
    title="Park-bench position"
    caption="Modified lateral with the patient at the edge of the table, head pinned in 3-point fixation, dependent arm hanging in a sling. Used for posterior-fossa / CPA / vestibular schwannoma surgery."
    hotspots={[
      { id: "pin", x: 105, y: 95, label: "Mayfield 3-pin head fixation", detail: "Skull pinned at 60–80 N. Risks: hypertension on application (pre-treat with remifentanil bolus, lidocaine, or LA), pin-site bleeding/CSF leak, depressed skull fracture in children/elderly. Pins must avoid the temporalis (heavy bleeding), frontal sinus and superficial temporal artery." },
      { id: "neck", x: 130, y: 110, label: "Neck flexion + 'two-finger' rule", detail: "Head is flexed and rotated towards the floor for surgical access. Excessive flexion → kinks the ETT, obstructs jugular venous drainage, raises ICP and can cause cervical cord ischaemia / quadriplegia. Maintain ≥2 finger-breadths between chin and chest." },
      { id: "depax", x: 165, y: 145, label: "Dependent axilla / brachial plexus", detail: "The dependent arm is allowed to hang off the table in a padded sling — this AVOIDS axillary compression. An axillary roll is also placed under the chest 2–3 finger-breadths caudal to the axilla. Confirm dependent radial pulse." },
      { id: "vae", x: 270, y: 130, label: "Venous air embolism (VAE)", detail: "Posterior-fossa craniotomies often expose dural venous sinuses above heart level → risk of VAE. Use precordial Doppler or TOE, end-tidal CO₂ + N₂ monitoring, central venous catheter for aspiration. Sudden ↓ EtCO₂ + ↓ SpO₂ + 'mill-wheel' murmur = VAE." },
      { id: "leg", x: 410, y: 145, label: "Dependent leg — peroneal nerve", detail: "Dependent fibular head padded; pillow between knees; hips slightly flexed to lower the centre of gravity and prevent rolling forwards." },
    ]}
    legend={<>Common procedures: posterior-fossa tumours, vestibular schwannoma / CPA, microvascular decompression, foramen magnum decompression.</>}
  >
    <Table x={70} y={180} w={420} />
    {/* Patient lateral, head pinned at the table edge (facing left = head on viewer-left) */}
    <TorsoLateral cx={260} cy={150} length={230} height={50} idPrefix="pf" facing="left" />
    {/* Head profile + Mayfield 3-pin */}
    <HeadProfile cx={120} cy={112} r={20} idPrefix="pf" facing="left" />
    <MayfieldPins cx={120} cy={112} r={20} />
    {/* Axillary roll caudal to axilla */}
    <ellipse cx={170} cy={158} rx={12} ry={6} fill={POS_GREEN} opacity={0.85} />
    {/* Dependent arm hanging in padded sling off table edge */}
    <Arm sx={178} sy={150} ex={188} ey={185} wx={196} wy={210} idPrefix="pf" upperW={12} foreW={10} handLen={11} />
    <path d="M 168 198 Q 196 220 220 195" fill="none" stroke="hsl(280 50% 45%)" strokeWidth={2} />
    {/* Non-dependent (upper) arm supported forwards on padded gutter */}
    <Arm sx={215} sy={138} ex={245} ey={120} wx={275} wy={108} idPrefix="pf" upperW={12} foreW={10} handLen={11} gownSleeve />
    {/* Legs — flexed, slight roll */}
    <Leg hx={370} hy={148} kx={420} ky={130} ax={448} ay={120} idPrefix="pf" thighW={20} calfW={15} footLen={16} draped />
    <Leg hx={370} hy={162} kx={425} ky={172} ax={455} ay={178} idPrefix="pf" thighW={20} calfW={15} footLen={16} draped />
    <text x={250} y={235} fontSize={11} fontWeight={600} fill="hsl(var(--foreground))">dependent arm in sling — avoids axillary compression</text>
  </PositionFrame>
);

// ── 6b. PARK BENCH — DEDICATED DETAILED VIEW ───────────────────────────

interface ParkBenchHotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  risk: string;
  /** Ordered mitigation steps */
  mitigation: string[];
  severity: "high" | "moderate" | "low";
}

const PB_PROCEDURES: { name: string; why: string }[] = [
  { name: "Vestibular schwannoma / acoustic neuroma (CPA)", why: "Excellent retrosigmoid access without the VAE risk of full sitting." },
  { name: "Microvascular decompression (Jannetta) for trigeminal neuralgia / hemifacial spasm", why: "Lateral retromastoid trajectory to the root entry zone of CN V or CN VII." },
  { name: "Posterior fossa tumour resection (cerebellar, 4th-ventricle)", why: "Gravity-assisted retraction of the cerebellum; surgeon stands comfortably." },
  { name: "Foramen magnum / craniocervical decompression (Chiari)", why: "Allows midline suboccipital + upper-cervical exposure with neutral airway access." },
  { name: "Translabyrinthine / retrolabyrinthine skull-base approaches", why: "Joint ENT–neurosurgical CPA work; head pinned and rotated to floor." },
  { name: "Posterior cervical spine (selected upper-cervical cases)", why: "When prone is contraindicated (e.g. morbid obesity, severe cardio-respiratory disease)." },
];

const PB_HOTSPOTS: ParkBenchHotspot[] = [
  {
    id: "pb-pin",
    x: 130,
    y: 95,
    label: "Mayfield 3-pin head fixation",
    severity: "high",
    risk: "Hypertensive surge on pin application; pin-site bleeding, CSF leak, or depressed skull fracture (children, elderly, steroid-treated).",
    mitigation: [
      "Pre-treat: remifentanil 0.5–1 µg/kg bolus or alfentanil 10 µg/kg, ± lidocaine 1.5 mg/kg IV.",
      "Infiltrate pin sites with LA + adrenaline (e.g. 0.5% bupivacaine with 1:200,000 adrenaline).",
      "Avoid temporalis muscle, frontal sinus and superficial temporal artery.",
      "Torque 60–80 N in adults; reduce in children / thin skull.",
      "Eyes taped + padded BEFORE pinning; confirm no traction on ETT after pinning.",
    ],
  },
  {
    id: "pb-neck",
    x: 165,
    y: 115,
    label: "Cervical flexion / rotation",
    severity: "high",
    risk: "Excessive flexion → ETT kinking, jugular venous obstruction (raised ICP, venous bleeding), cervical cord ischaemia / quadriplegia.",
    mitigation: [
      "Maintain ≥ two finger-breadths between chin and sternum.",
      "Use an armoured (reinforced) ETT — taped, not tied around the neck.",
      "Limit head rotation to ≤ 45°; if more access needed, tilt the table laterally instead of rotating the neck further.",
      "Avoid intra-operative hypotension (cord watershed).",
    ],
  },
  {
    id: "pb-axilla",
    x: 205,
    y: 155,
    label: "Dependent arm — sling, NOT roll-in-axilla",
    severity: "high",
    risk: "Brachial plexus stretch / compression; axillary artery occlusion; rhabdomyolysis of the dependent arm.",
    mitigation: [
      "Allow the dependent arm to hang free in a padded sling off the table edge — this is the defining feature of park bench.",
      "Place the axillary roll on the chest wall 2–3 finger-breadths CAUDAL to (NOT IN) the axilla.",
      "Confirm dependent radial pulse ± pulse oximeter on the dependent hand after positioning.",
      "Recheck pulse and SpO₂ trace every 15 min during the case.",
    ],
  },
  {
    id: "pb-vae",
    x: 305,
    y: 130,
    label: "Venous air embolism (VAE)",
    severity: "moderate",
    risk: "Surgical site (posterior fossa dural sinuses) often above heart level — air entrainment. Lower risk than full sitting but still ~10–15%.",
    mitigation: [
      "Precordial Doppler (most sensitive non-invasive) over the right 2nd–3rd ICS, ± TOE for high-risk cases.",
      "Continuous EtCO₂ + EtN₂; sudden ↓ EtCO₂, ↓ SpO₂, ↑ PA pressure, mill-wheel murmur = VAE.",
      "Multi-orifice CVC tip at SVC–RA junction for air aspiration.",
      "Avoid N₂O (expands intravascular air).",
      "Crisis: alert surgeon (flood field with saline, bone wax exposed bone), jugular compression, FiO₂ 1.0, aspirate from CVC, fluid + vasopressors, left lateral / head-down if able.",
    ],
  },
  {
    id: "pb-uparm",
    x: 270,
    y: 105,
    label: "Non-dependent (upper) arm",
    severity: "moderate",
    risk: "Suspended forwards on a padded support → suprascapular nerve traction, shoulder dislocation, ulnar / radial nerve compression.",
    mitigation: [
      "Pad upper arm at < 90° abduction; forearm pronated and supported on a gel pad.",
      "Avoid traction by tying the arm across the chest rather than abducting.",
      "Pad the medial epicondyle; keep IV lines and ECG leads off pressure points.",
    ],
  },
  {
    id: "pb-fibhead",
    x: 410,
    y: 158,
    label: "Dependent fibular head — common peroneal n.",
    severity: "moderate",
    risk: "Pressure on the dependent fibular head → common peroneal palsy / foot drop.",
    mitigation: [
      "Pillow / gel pad between the knees and a second pad under the dependent fibular head.",
      "Slight hip and knee flexion to drop centre of gravity (stops the patient rolling forwards).",
      "Heels floated on gel pads.",
    ],
  },
  {
    id: "pb-tape",
    x: 360,
    y: 175,
    label: "Strapping & table-edge security",
    severity: "moderate",
    risk: "Patient is on the EDGE of the table to allow the dependent arm to hang — risk of falling, especially during head-up tilt.",
    mitigation: [
      "Wide cloth tape across the iliac crests and across the upper thighs to the table.",
      "Beanbag or vacuum mattress moulded to the patient before pinning.",
      "Brief the team: any table tilt requires a 5-person team and explicit call-out.",
    ],
  },
  {
    id: "pb-eye",
    x: 110,
    y: 105,
    label: "Eye and dependent ear",
    severity: "low",
    risk: "Globe pressure (dependent eye), corneal abrasion, pinna pressure necrosis on the dependent ear.",
    mitigation: [
      "Lubricate and tape both eyes BEFORE pinning; horseshoe head-rest cut-out clear of the globe.",
      "Pinna folded forwards and padded; no cables or tubing under the head.",
      "Inspect dependent eye and ear after every position adjustment.",
    ],
  },
];

const SEVERITY_COLOUR: Record<ParkBenchHotspot["severity"], string> = {
  high: POS_RED,
  moderate: POS_AMBER,
  low: POS_GREEN,
};

export const ParkBenchDetailedDiagram = () => {
  const [activeId, setActiveId] = useState<string>(PB_HOTSPOTS[0].id);
  const active = PB_HOTSPOTS.find((h) => h.id === activeId) ?? PB_HOTSPOTS[0];
  const accent = SEVERITY_COLOUR[active.severity];

  return (
    <div className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">
          Park-bench position — dedicated review
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Modified lateral with the patient at the table edge, head pinned in 3-point fixation and rotated towards the
          floor; dependent arm hangs in a padded sling. Workhorse position for posterior-fossa and CPA surgery — most of
          the VAE benefit of avoiding sitting, with simpler set-up and safer haemodynamics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
        {/* Diagram column */}
        <div className="p-3 bg-[hsl(var(--background))]">
          <div className="overflow-x-auto -mx-1 px-1">
            <svg viewBox="0 0 560 320" className="w-full h-auto min-w-[520px]" role="img" aria-label="Park-bench position with pressure-risk hotspots">
            <AnatomyDefs idPrefix="pb" />
            {/* Floor line */}
            <line x1={20} y1={285} x2={540} y2={285} stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="2 4" />
            <text x={20} y={300} fontSize={11} fill="hsl(var(--muted-foreground))">FLOOR</text>

            {/* Operating table */}
            <Table x={70} y={185} w={420} />

            {/* Beanbag / vacuum mattress */}
            <ellipse cx={290} cy={170} rx={185} ry={18} fill="hsl(45 35% 75%)" opacity={0.55} />
            <text x={490} y={170} fontSize={11} fill="hsl(var(--muted-foreground))">vacuum mattress</text>

            {/* Patient body — lateral */}
            <TorsoLateral cx={300} cy={150} length={260} height={54} idPrefix="pb" facing="left" />

            {/* Head — pinned, slightly rotated towards the floor */}
            <g>
              <HeadProfile cx={140} cy={110} r={22} idPrefix="pb" facing="left" />
              <MayfieldPins cx={140} cy={110} r={22} />
              <text x={140} y={68} fontSize={11} fontWeight={600} fill="hsl(280 60% 40%)" textAnchor="middle">Mayfield 3-pin</text>
              {/* ETT armoured */}
              <path d="M 158 122 Q 180 132 200 132" fill="none" stroke="hsl(var(--foreground))" strokeWidth={2} />
              <text x={200} y={125} fontSize={11} fill="hsl(var(--muted-foreground))">armoured ETT</text>
            </g>

            {/* Axillary roll caudal to axilla */}
            <ellipse cx={200} cy={155} rx={14} ry={7} fill={POS_GREEN} opacity={0.85} />
            <text x={200} y={132} fontSize={11} textAnchor="middle" fill={POS_GREEN} fontWeight={600}>axillary roll (NOT in axilla)</text>

            {/* Dependent arm — hanging off table edge in sling */}
            <Arm sx={215} sy={158} ex={222} ey={200} wx={228} wy={232} idPrefix="pb" upperW={13} foreW={11} handLen={12} />
            <path d="M 198 232 Q 230 258 258 228" fill="none" stroke="hsl(280 50% 45%)" strokeWidth={2} />
            <text x={235} y={275} fontSize={11} fill="hsl(280 50% 45%)" fontWeight={600}>padded sling</text>

            {/* Upper arm — supported forwards on padded gutter */}
            <Arm sx={250} sy={140} ex={278} ey={120} wx={310} wy={108} idPrefix="pb" upperW={13} foreW={11} handLen={12} gownSleeve />
            <rect x={295} y={100} width={45} height={14} rx={4} fill={POS_GREEN} opacity={0.6} />
            <text x={317} y={92} fontSize={11} textAnchor="middle" fill={POS_GREEN} fontWeight={600}>arm gutter</text>

            {/* Legs — flexed, pillow between knees */}
            <Leg hx={400} hy={150} kx={445} ky={132} ax={472} ay={120} idPrefix="pb" thighW={22} calfW={17} footLen={18} draped />
            <Leg hx={400} hy={162} kx={450} ky={170} ax={478} ay={178} idPrefix="pb" thighW={22} calfW={17} footLen={18} draped />
            <ellipse cx={445} cy={150} rx={9} ry={5} fill={POS_GREEN} opacity={0.85} />
            <text x={490} y={150} fontSize={11} fill={POS_GREEN} fontWeight={600}>knee pad</text>

            {/* Hip + thigh tape */}
            <line x1={310} y1={130} x2={310} y2={195} stroke="hsl(0 0% 25%)" strokeWidth={3} />
            <line x1={370} y1={132} x2={370} y2={195} stroke="hsl(0 0% 25%)" strokeWidth={3} />
            <text x={340} y={123} fontSize={11} textAnchor="middle" fill="hsl(var(--muted-foreground))">strapping</text>

            {/* Surgical access arrow — surgeon comes from behind the head */}
            <path d="M 70 60 Q 110 50 145 75" fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5} strokeDasharray="3 3" />
            <text x={75} y={46} fontSize={11} fill="hsl(var(--primary))" fontWeight={600}>surgeon</text>

            {/* Heart-to-craniotomy hydrostatic gradient */}
            <line x1={290} y1={150} x2={140} y2={90} stroke={POS_AMBER} strokeDasharray="3 3" strokeWidth={1} />
            <text x={210} y={106} fontSize={11} fill={POS_AMBER} fontWeight={600}>~10–15 cm gradient (VAE)</text>

            {/* Hotspots */}
            {PB_HOTSPOTS.map((h, i) => {
              const isActive = h.id === activeId;
              const colour = SEVERITY_COLOUR[h.severity];
              return (
                <g
                  key={h.id}
                  onPointerEnter={() => setActiveId(h.id)}
                  onClick={() => setActiveId(h.id)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={h.x}
                    cy={h.y}
                    r={isActive ? 14 : 12}
                    fill={colour}
                    fillOpacity={isActive ? 0.95 : 0.85}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                  <text
                    x={h.x}
                    y={h.y + 4}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill="hsl(var(--background))"
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
            </svg>
          </div>

          {/* Severity legend */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground px-1">
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_RED }} /> High risk</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_AMBER }} /> Moderate</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_GREEN }} /> Low / supportive</span>
          </div>
        </div>

        {/* Side panel: chip list + active detail */}
        <div className="border-t md:border-t-0 md:border-l border-border bg-muted/20 p-3 text-xs">
          <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
            Pressure-risk hotspots
          </p>
          <ol className="space-y-1.5 mb-3">
            {PB_HOTSPOTS.map((h, i) => {
              const isActive = h.id === activeId;
              const colour = SEVERITY_COLOUR[h.severity];
              return (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(h.id)}
                    className={cn(
                      "w-full text-left flex items-start gap-2 rounded-md px-2 py-1.5 transition",
                      isActive ? "bg-background border border-border shadow-sm" : "hover:bg-background/60"
                    )}
                  >
                    <span
                      className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold shrink-0"
                      style={{ background: colour, color: "hsl(var(--background))" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-foreground leading-tight">{h.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            className="rounded-md border border-border bg-background p-2.5"
            style={{ borderLeft: `4px solid ${accent}` }}
          >
            <p className="text-[11px] font-semibold text-foreground mb-1">{active.label}</p>
            <p className="text-[11px] text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Risk: </span>{active.risk}
            </p>
            <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-1">
              Mitigation
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-muted-foreground">
              {active.mitigation.map((m, i) => <li key={i}>{m}</li>)}
            </ol>
          </div>
        </div>
      </div>

      {/* Procedures footer */}
      <div className="border-t border-border bg-muted/10 p-4">
        <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
          Typical neuro-anaesthesia procedures performed in park-bench
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          {PB_PROCEDURES.map((p) => (
            <li key={p.name} className="leading-snug">
              <span className="text-foreground font-medium">{p.name}.</span> {p.why}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ── 6c. SITTING — DEDICATED DETAILED VIEW ──────────────────────────────

interface SittingHotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  category: "circulation" | "airway" | "pressure" | "neuro";
  risk: string;
  mitigation: string[];
  severity: "high" | "moderate" | "low";
}

const ST_PROCEDURES: { name: string; why: string }[] = [
  { name: "Posterior fossa tumour resection (cerebellar, brainstem, 4th-ventricle)", why: "Gravity drains blood and CSF from the field — bloodless midline exposure unmatched by lateral approaches." },
  { name: "Vestibular schwannoma / acoustic neuroma (CPA)", why: "Excellent retrosigmoid trajectory with the cerebellum falling away from the petrous bone." },
  { name: "Pineal-region & 3rd-ventricle tumours (supracerebellar infratentorial)", why: "Gravity retraction of the cerebellum gives a midline corridor without fixed retractors." },
  { name: "Microvascular decompression (Jannetta) — trigeminal neuralgia / hemifacial spasm", why: "Direct view of the cranial-nerve root entry zone with minimal cerebellar retraction." },
  { name: "Foramen magnum / craniocervical decompression (Chiari I)", why: "Midline suboccipital + upper-cervical exposure; excellent venous drainage of the field." },
  { name: "Posterior cervical spine (laminectomy, cervical fusion C1–C2)", why: "Reduces venous engorgement and intra-operative bleeding compared with prone." },
  { name: "Deep brain stimulator (DBS) electrode insertion (selected centres)", why: "Awake, semi-sitting position assists clinical testing during electrode placement." },
];

const ST_HOTSPOTS: SittingHotspot[] = [
  {
    id: "st-vae",
    x: 175,
    y: 95,
    label: "Venous air embolism (VAE) — highest-risk position",
    severity: "high",
    category: "circulation",
    risk: "Operative site sits ~25 cm above the right atrium → open dural sinuses entrain air. Reported VAE 25–45 %; paradoxical air embolism via PFO 5–10 %.",
    mitigation: [
      "Pre-op bubble echocardiogram to screen for PFO — positive PFO is a relative contraindication.",
      "Multi-orifice CVC tip at the SVC–RA junction for air aspiration; confirm position with intracardiac ECG or TOE.",
      "Precordial Doppler over the right 2nd–3rd ICS (most sensitive non-invasive monitor) ± TOE for high-risk cases.",
      "Continuous EtCO₂ + EtN₂; sudden ↓ EtCO₂, ↓ SpO₂, ↑ PA pressure, mill-wheel murmur = VAE.",
      "Avoid N₂O (expands intravascular air).",
      "Crisis: alert surgeon (flood field with saline, bone wax exposed bone), bilateral jugular compression, FiO₂ 1.0, aspirate CVC, fluid + vasopressors, recline patient if possible.",
    ],
  },
  {
    id: "st-cpp",
    x: 145,
    y: 80,
    label: "Cerebral perfusion pressure — zero at the EAM",
    severity: "high",
    category: "circulation",
    risk: "MAP measured at the heart overestimates cerebral pressure by ~15–20 mmHg (1 cmH₂O ≈ 0.74 mmHg). Cerebral hypoperfusion → watershed stroke / POVL.",
    mitigation: [
      "Zero the arterial line transducer at the EXTERNAL AUDITORY MEATUS (Circle of Willis level), NOT at the heart.",
      "Maintain cerebral MAP ≥ 70 mmHg (or within 20 % of pre-induction baseline).",
      "Anticipate hypotension on positioning — graded sit-up, fluid load, vasopressor (metaraminol / noradrenaline) infusion ready.",
      "Graduated compression stockings ± pneumatic calf compression to support venous return.",
    ],
  },
  {
    id: "st-pneumo",
    x: 165,
    y: 65,
    label: "Tension pneumocephalus",
    severity: "moderate",
    category: "neuro",
    risk: "CSF drains caudally during surgery; intracranial air rises and accumulates → tension pneumocephalus on emergence (delayed awakening, focal neurology, seizures).",
    mitigation: [
      "Strictly avoid N₂O for the entire case.",
      "Surgeon fills resection cavity with warm saline before dural closure.",
      "CT head if delayed awakening or new focal neurology post-op.",
      "Treat tension pneumocephalus with burr-hole release; supportive care with FiO₂ 1.0 to encourage nitrogen washout.",
    ],
  },
  {
    id: "st-neckflex",
    x: 215,
    y: 110,
    label: "Cervical flexion — cord ischaemia & quadriplegia",
    severity: "high",
    category: "neuro",
    risk: "Excessive cervical flexion combined with intra-operative hypotension and pin-fixation has caused mid-cervical cord infarction with permanent quadriplegia.",
    mitigation: [
      "Maintain ≥ two finger-breadths between chin and sternum at all times.",
      "Avoid intra-operative hypotension (cord watershed perfusion is pressure-dependent).",
      "Document neurology pre-op; consider somatosensory / motor evoked potentials in long cases.",
      "Use an armoured (reinforced) ETT taped — never tied — around the neck.",
    ],
  },
  {
    id: "st-airway",
    x: 235,
    y: 125,
    label: "Macroglossia & supraglottic airway oedema",
    severity: "moderate",
    category: "airway",
    risk: "Prolonged neck flexion + ETT/oral airway → venous and lymphatic obstruction → tongue, pharyngeal and supraglottic oedema → airway obstruction at extubation.",
    mitigation: [
      "Remove oral airways and bite-blocks once ETT is taped; keep the tongue inside the dental arches.",
      "Cuff-leak test before extubation; if absent, leave intubated and re-assess at 12–24 h.",
      "Consider tube-exchange catheter for at-risk extubation.",
      "Sit head up post-extubation; have re-intubation kit and surgical airway equipment immediately available.",
    ],
  },
  {
    id: "st-pin",
    x: 130,
    y: 95,
    label: "Mayfield 3-pin head fixation",
    severity: "high",
    category: "pressure",
    risk: "Hypertensive surge on pin application → ICP spikes, intracranial bleeding. Pin-site bleeding, CSF leak or depressed skull fracture in children / steroid-treated patients.",
    mitigation: [
      "Pre-treat with remifentanil 0.5–1 µg/kg or alfentanil 10 µg/kg ± lidocaine 1.5 mg/kg IV.",
      "Infiltrate pin sites with LA + adrenaline (0.5 % bupivacaine with 1:200,000 adrenaline).",
      "Avoid temporalis muscle, frontal sinus and superficial temporal artery.",
      "Torque 60–80 N in adults; reduce in children / thin skull. Tape eyes BEFORE pinning.",
    ],
  },
  {
    id: "st-sciatic",
    x: 305,
    y: 215,
    label: "Sciatic stretch & lower-limb compartment syndrome",
    severity: "moderate",
    category: "pressure",
    risk: "Sustained hip flexion stretches the sciatic nerve; dependent calves at heart level can develop well-leg compartment syndrome in long cases.",
    mitigation: [
      "Knees flexed and supported on padded gutters; legs elevated to heart level to encourage venous return.",
      "Keep hip flexion < 90°; avoid simultaneous hip flexion and knee extension (sciatic stretch).",
      "Pneumatic calf compression; document calf softness regularly in cases > 4 h.",
      "Heels floated on gel pads — no pressure on the Achilles tendon.",
    ],
  },
  {
    id: "st-buttock",
    x: 285,
    y: 200,
    label: "Sacrum & ischial tuberosities",
    severity: "moderate",
    category: "pressure",
    risk: "Whole body weight transmitted through the sacrum and ischial tuberosities → pressure necrosis, particularly in long (>4 h) cases or low cardiac-output states.",
    mitigation: [
      "Gel or visco-elastic seat cushion moulded under the buttocks before sit-up.",
      "Reposition / re-pad every 2 h if surgically possible; document inspection in the chart.",
      "Maintain normothermia and adequate cardiac output to preserve skin perfusion.",
    ],
  },
  {
    id: "st-arms",
    x: 250,
    y: 150,
    label: "Arms across the abdomen / lap",
    severity: "low",
    category: "pressure",
    risk: "Arms folded across the lap can compress the ulnar nerve at the elbow and obstruct venous access to the cubital fossa.",
    mitigation: [
      "Pad the medial epicondyle of both elbows; keep forearms supinated where possible.",
      "Site IV access pre-positioning; secure lines so they are not pulled when the patient is sat up.",
      "Confirm radial pulse and SpO₂ trace on both hands after positioning.",
    ],
  },
];

const ST_CATEGORY_LABEL: Record<SittingHotspot["category"], string> = {
  circulation: "Circulation",
  airway: "Airway",
  neuro: "Neurology",
  pressure: "Pressure / nerve",
};

const ST_SEVERITY_COLOUR: Record<SittingHotspot["severity"], string> = {
  high: POS_RED,
  moderate: POS_AMBER,
  low: POS_GREEN,
};

export const SittingPositionDetailedDiagram = () => {
  const [activeId, setActiveId] = useState<string>(ST_HOTSPOTS[0].id);
  const active = ST_HOTSPOTS.find((h) => h.id === activeId) ?? ST_HOTSPOTS[0];
  const accent = ST_SEVERITY_COLOUR[active.severity];

  return (
    <div className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">
          Sitting (Fowler's) position — dedicated review
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Trunk semi-upright (~60°), head flexed and pinned in 3-point fixation, knees flexed and elevated to heart
          level. Highest VAE-risk neurosurgical position but unmatched midline exposure of the posterior fossa,
          pineal region and craniocervical junction. Demands a coordinated package of cardiovascular, airway and
          neuromonitoring strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
        {/* Diagram column */}
        <div className="p-3 bg-[hsl(var(--background))]">
          <div className="overflow-x-auto -mx-1 px-1">
            <svg viewBox="0 0 420 320" className="w-full h-auto min-w-[420px]" role="img" aria-label="Sitting position with circulation, airway and pressure-risk hotspots">
            <AnatomyDefs idPrefix="st" />
            {/* Floor line */}
            <line x1={20} y1={295} x2={400} y2={295} stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="2 4" />
            <text x={20} y={310} fontSize={11} fill="hsl(var(--muted-foreground))">FLOOR</text>

            {/* Chair / table base */}
            <rect x={240} y={250} width={140} height={8} fill="hsl(210 25% 35%)" />
            <rect x={295} y={258} width={30} height={32} fill="hsl(210 20% 45%)" />

            {/* Seat pad */}
            <rect x={245} y={232} width={130} height={18} rx={4} fill="hsl(45 35% 75%)" opacity={0.8} />
            <text x={385} y={245} fontSize={11} fill="hsl(var(--muted-foreground))">gel cushion</text>

            {/* Backrest tilted ~60° from horizontal */}
            <g transform="rotate(-60 260 232)">
              <rect x={155} y={225} width={110} height={14} rx={3} fill="hsl(210 25% 35%)" />
            </g>

            {/* Patient torso + head + Mayfield via composite (60° backrest tilt) */}
            <SittingPatient
              sx={260} sy={232}
              tiltDeg={60}
              torsoLength={120} torsoHeight={52}
              showMayfield showLegs={false}
              idPrefix="st"
            />

            {/* Arms folded across lap */}
            <Arm sx={235} sy={155} ex={272} ey={168} wx={258} wy={186} idPrefix="st" upperW={11} foreW={9} handLen={10} gownSleeve />
            <Arm sx={250} sy={162} ex={278} ey={178} wx={250} wy={192} idPrefix="st" upperW={11} foreW={9} handLen={10} gownSleeve />

            {/* Legs — knees flexed and elevated to heart level */}
            <Leg hx={285} hy={205} kx={342} ky={188} ax={328} ay={232} idPrefix="st" thighW={20} calfW={16} footLen={16} draped />
            {/* Knee gutter pad */}
            <ellipse cx={345} cy={185} rx={9} ry={5} fill={POS_GREEN} opacity={0.85} />

            {/* Pneumatic calf compression cuff */}
            <rect x={315} y={215} width={22} height={12} rx={3} fill={POS_GREEN} opacity={0.6} />
            <text x={355} y={224} fontSize={11} fill={POS_GREEN} fontWeight={600}>calf SCDs</text>

            {/* External auditory meatus reference line — TRUE cerebral MAP */}
            <line x1={150} y1={80} x2={400} y2={80} stroke={POS_GREEN} strokeDasharray="4 3" strokeWidth={1} />
            <text x={400} y={72} fontSize={11} textAnchor="end" fill={POS_GREEN} fontWeight={700}>zero MAP at EAM</text>

            {/* Heart-level reference line */}
            <line x1={195} y1={170} x2={400} y2={170} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 3" strokeWidth={0.75} />
            <text x={400} y={162} fontSize={11} textAnchor="end" fill="hsl(var(--muted-foreground))">heart level (RA)</text>

            {/* Hydrostatic gradient annotation */}
            <line x1={170} y1={80} x2={170} y2={170} stroke={POS_AMBER} strokeDasharray="3 3" strokeWidth={1} />
            <text x={108} y={128} fontSize={12} fill={POS_AMBER} fontWeight={700}>~ 25 cm</text>
            <text x={108} y={142} fontSize={11} fill={POS_AMBER}>hydrostatic gradient</text>

            {/* Surgical access — surgeon stands behind */}
            <path d="M 70 50 Q 105 45 145 65" fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5} strokeDasharray="3 3" />
            <text x={70} y={42} fontSize={11} fill="hsl(var(--primary))" fontWeight={600}>surgeon</text>

            {/* CVC at SVC-RA junction */}
            <line x1={210} y1={155} x2={195} y2={170} stroke="hsl(var(--foreground))" strokeWidth={1} />
            <circle cx={195} cy={170} r={2.5} fill="hsl(var(--foreground))" />
            <text x={205} y={148} fontSize={11} fill="hsl(var(--muted-foreground))">multi-orifice CVC @ SVC–RA</text>

            {/* Hotspots */}
            {ST_HOTSPOTS.map((h, i) => {
              const isActive = h.id === activeId;
              const colour = ST_SEVERITY_COLOUR[h.severity];
              return (
                <g
                  key={h.id}
                  onPointerEnter={() => setActiveId(h.id)}
                  onClick={() => setActiveId(h.id)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={h.x}
                    cy={h.y}
                    r={isActive ? 14 : 12}
                    fill={colour}
                    fillOpacity={isActive ? 0.95 : 0.85}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                  <text
                    x={h.x}
                    y={h.y + 4}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill="hsl(var(--background))"
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
            </svg>
          </div>

          {/* Severity legend */}
          <div className="mt-2 flex items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground px-1 flex-wrap">
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_RED }} /> High risk</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_AMBER }} /> Moderate</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_GREEN }} /> Low / supportive</span>
          </div>
        </div>

        {/* Side panel: chip list + active detail */}
        <div className="border-t md:border-t-0 md:border-l border-border bg-muted/20 p-3 text-xs">
          <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
            Pressure / circulation / airway hotspots
          </p>
          <ol className="space-y-1.5 mb-3">
            {ST_HOTSPOTS.map((h, i) => {
              const isActive = h.id === activeId;
              const colour = ST_SEVERITY_COLOUR[h.severity];
              return (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(h.id)}
                    className={cn(
                      "w-full text-left flex items-start gap-2 rounded-md px-2 py-1.5 transition",
                      isActive ? "bg-background border border-border shadow-sm" : "hover:bg-background/60"
                    )}
                  >
                    <span
                      className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold shrink-0"
                      style={{ background: colour, color: "hsl(var(--background))" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-foreground leading-tight">{h.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            className="rounded-md border border-border bg-background p-2.5"
            style={{ borderLeft: `4px solid ${accent}` }}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-[11px] font-semibold text-foreground">{active.label}</p>
              <span
                className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded-md font-semibold shrink-0"
                style={{ background: `${accent}26`, color: accent }}
              >
                {ST_CATEGORY_LABEL[active.category]}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Risk: </span>{active.risk}
            </p>
            <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-1">
              Mitigation
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-muted-foreground">
              {active.mitigation.map((m, i) => <li key={i}>{m}</li>)}
            </ol>
          </div>
        </div>
      </div>

      {/* Procedures footer */}
      <div className="border-t border-border bg-muted/10 p-4">
        <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
          Typical neurosurgical procedures performed in the sitting position
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          {ST_PROCEDURES.map((p) => (
            <li key={p.name} className="leading-snug">
              <span className="text-foreground font-medium">{p.name}.</span> {p.why}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ── 7. SITTING (neurosurgical) ─────────────────────────────────────────

export const SittingPositionDiagram = () => (
  <PositionFrame
    title="Sitting (Fowler's) position"
    caption="Trunk semi-upright (~60°), head flexed and pinned, knees flexed and elevated to heart level. Classic neurosurgical position for posterior fossa and cervical spine."
    hotspots={[
      { id: "vae", x: 360, y: 95, label: "Venous air embolism (HIGH risk)", detail: "Operative site sits well above the right atrium → open dural sinuses entrain air. Reported VAE incidence 25–45 % (paradoxical air embolism via PFO 5–10 %). Mandatory monitoring: precordial Doppler ± TOE, EtCO₂, EtN₂. Place a multi-orifice CVC at the SVC-RA junction for aspiration. SCREEN FOR PFO pre-op (bubble echo) — relative contraindication if positive." },
      { id: "cpp", x: 320, y: 75, label: "Cerebral perfusion pressure", detail: "MAP measured at HEART level overestimates pressure at the brain by ~15–20 mmHg (1 cmH₂O ≈ 0.74 mmHg). ZERO the arterial transducer at the EXTERNAL AUDITORY MEATUS (Circle of Willis) to read true cerebral perfusion pressure. Hypotension on positioning is common — pressors and graduated compression stockings." },
      { id: "neckflex", x: 270, y: 100, label: "Neck flexion — quadriplegia risk", detail: "Excessive cervical flexion combined with hypotension and pin-fixation has caused mid-cervical cord infarction. Maintain two finger-breadths between chin and chest; avoid intra-operative hypotension." },
      { id: "tongue", x: 245, y: 115, label: "Macroglossia & airway oedema", detail: "Prolonged neck flexion + ETT/oral airway → venous obstruction → tongue and supraglottic oedema. Risk of airway obstruction at extubation. Plan for cuff-leak test and possible delayed extubation." },
      { id: "sciatic", x: 320, y: 200, label: "Sciatic stretch & compartment", detail: "Knees flexed and supported; legs at heart level to encourage venous return. Prolonged hip flexion can stretch the sciatic nerve and contribute to lower-limb compartment syndrome." },
      { id: "pneum", x: 280, y: 60, label: "Pneumocephalus", detail: "CSF drains, intracranial air rises and accumulates → tension pneumocephalus on emergence. Avoid N₂O. CT head if delayed awakening or new neurology." },
    ]}
    legend={<>Common procedures: posterior fossa tumours, cervical spine (anterior or posterior), shoulder surgery (modified beach chair).</>}
  >
    {/* Backrest tilted 60° */}
    <rect x={70} y={210} width={420} height={6} fill="hsl(210 25% 35%)" />
    <rect x={70} y={216} width={6} height={20} fill="hsl(210 20% 45%)" />
    {/* Seat */}
    <rect x={250} y={195} width={140} height={10} fill="hsl(210 25% 35%)" />
    {/* Backrest */}
    <g transform="rotate(-60 270 195)">
      <rect x={170} y={188} width={100} height={10} fill="hsl(210 25% 35%)" />
    </g>

    {/* Patient torso + head + Mayfield via composite (rotates internally) */}
    <SittingPatient
      sx={270} sy={195}
      tiltDeg={60}
      torsoLength={110} torsoHeight={42}
      showMayfield showLegs={false}
      idPrefix="pf"
    />

    {/* Legs flexed forward */}
    <Leg hx={300} hy={195} kx={360} ky={170} ax={400} ay={205} idPrefix="pf" thighW={20} calfW={17} footLen={18} draped />

    {/* Arterial transducer line */}
    <line x1={245} y1={115} x2={50} y2={115} stroke={POS_GREEN} strokeDasharray="4 3" strokeWidth={1} />
    <text x={50} y={108} fontSize={10} fill={POS_GREEN} fontWeight={700}>zero MAP at the external auditory meatus</text>
    <line x1={245} y1={115} x2={245} y2={195} stroke={POS_AMBER} strokeDasharray="2 2" />
    <text x={250} y={160} fontSize={10} fill={POS_AMBER} fontWeight={600}>~ 25 cm hydrostatic gradient</text>
  </PositionFrame>
);

// ── 8. BEACH CHAIR (shoulder) ──────────────────────────────────────────

export const BeachChairPositionDiagram = () => {
  // Step-through animation: 0 = neutral, 1 = 30° abduction,
  // 2 = 70° abduction + scapular protraction, 3 = traction loaded.
  const STEPS = [
    {
      label: "1. Neutral",
      caption: "Operative arm rests adducted on the body. Glenohumeral joint relaxed; scapula in resting position on the chest wall.",
      // shoulder, elbow, wrist
      arm: { sx: 235, sy: 120, ex: 248, ey: 150, wx: 260, wy: 178 },
      scapulaDx: 0,
      tractionOpacity: 0,
      forceOpacity: 0,
    },
    {
      label: "2. 30° abduction",
      caption: "Arm lifted from the side. Deltoid initiates the first 30°; scapula still largely static (glenohumeral rhythm 2:1 begins after this).",
      arm: { sx: 235, sy: 120, ex: 258, ey: 132, wx: 282, wy: 138 },
      scapulaDx: 1,
      tractionOpacity: 0,
      forceOpacity: 0,
    },
    {
      label: "3. 70° abduction + scapular protraction",
      caption: "Beyond ~30°, the scapula rotates upward and protracts forward to keep the glenoid under the humeral head — exposing the brachial plexus to stretch.",
      arm: { sx: 232, sy: 118, ex: 263, ey: 110, wx: 292, wy: 88 },
      scapulaDx: 5,
      tractionOpacity: 0,
      forceOpacity: 0,
    },
    {
      label: "4. Traction applied",
      caption: "Distal traction (typically 4–7 lb / 1.8–3 kg) pulls the humerus longitudinally to open the joint space — risk of brachial plexus / axillary nerve stretch and cerebral hypoperfusion if BP not maintained.",
      arm: { sx: 230, sy: 117, ex: 265, ey: 100, wx: 298, wy: 70 },
      scapulaDx: 7,
      tractionOpacity: 1,
      forceOpacity: 1,
    },
  ];

  const [step, setStep] = useState(0);

  // Auto-advance every 1.8s, pause on user interaction for 6s.
  const [paused, setPaused] = useState(false);
  React.useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), 1800);
    return () => clearTimeout(t);
  }, [step, paused]);
  React.useEffect(() => {
    if (!paused) return;
    const t = setTimeout(() => setPaused(false), 6000);
    return () => clearTimeout(t);
  }, [paused]);

  const active = STEPS[step];

  return (
    <div className="space-y-2">
      <PositionFrame
        title="Beach-chair position"
        caption="Modified Fowler's at ~30–45° for shoulder arthroscopy and open shoulder surgery. Lower VAE risk than full sitting but cerebral perfusion remains a concern."
        hotspots={[
          { id: "cere", x: 250, y: 85, label: "Cerebral hypoperfusion (CIDS)", detail: "Cerebral ischaemic desaturation events: hypotension at the brain (MAP measured at heart overestimates cerebral pressure by 12–20 mmHg) has caused stroke and visual loss after shoulder surgery. Zero arterial line at tragus / external auditory meatus; treat hypotension promptly with pressors; maintain cerebral MAP ≥ 70 mmHg." },
          { id: "neck", x: 230, y: 115, label: "Cervical alignment", detail: "Head and neck must be in neutral alignment with both ears visible. Lateral flexion stretches the contralateral brachial plexus and compromises vertebral artery flow." },
          { id: "ettmove", x: 215, y: 100, label: "ETT migration", detail: "Sitting up moves the carina cephalad relative to the ETT — risk of accidental extubation. Re-confirm bilateral air entry after positioning." },
          { id: "psd", x: 320, y: 130, label: "Padded support / no shoulder slip", detail: "Hip and head straps prevent slipping; padded foot-board supports body weight. Avoid hyperextension of the operative shoulder traction." },
        ]}
        legend={<>Common procedures: shoulder arthroscopy, rotator-cuff repair, open shoulder reconstruction, awake fibreoptic intubation.</>}
      >
        {/* Chair base */}
        <rect x={130} y={210} width={300} height={6} fill="hsl(210 25% 35%)" />
        <rect x={250} y={216} width={60} height={10} fill="hsl(210 20% 45%)" />
        {/* Backrest 35° */}
        <g transform="rotate(-35 280 200)">
          <rect x={195} y={155} width={170} height={45} rx={10} fill="hsl(210 25% 35%)" />
        </g>
        {/* Patient torso + head via composite (35° backrest tilt for beach-chair) */}
        <SittingPatient
          sx={280} sy={200}
          tiltDeg={35}
          torsoLength={170} torsoHeight={42}
          showLegs={false}
          idPrefix="pf"
        />
        {/* Legs */}
        <Leg hx={310} hy={195} kx={370} ky={195} ax={435} ay={195} idPrefix="pf" thighW={22} calfW={18} footLen={18} draped />

        {/* Animated scapula marker — slides forward / protracts with abduction */}
        <g style={{ transition: "transform 700ms ease-out" }} transform={`translate(${active.scapulaDx} ${-active.scapulaDx * 0.3})`}>
          <ellipse cx={222} cy={118} rx={9} ry={5} fill="hsl(35 50% 60%)" opacity={0.55} />
          <text x={222} y={108} fontSize={9} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontWeight={600}>scapula</text>
        </g>

        {/* Animated operative arm — interpolates between steps */}
        <g style={{ transition: "opacity 400ms ease-out" }}>
          <AnimatedArm
            sx={active.arm.sx} sy={active.arm.sy}
            ex={active.arm.ex} ey={active.arm.ey}
            wx={active.arm.wx} wy={active.arm.wy}
          />
        </g>

        {/* Traction line + force arrow — only appear on step 4 */}
        <g style={{ opacity: active.tractionOpacity, transition: "opacity 500ms ease-out" }}>
          <line x1={active.arm.wx} y1={active.arm.wy} x2={active.arm.wx + 22} y2={active.arm.wy - 22}
            stroke={POS_AMBER} strokeWidth={2} strokeDasharray="3 2" />
          <text x={active.arm.wx + 27} y={active.arm.wy - 24} fontSize={10} fill={POS_AMBER} fontWeight={700}>traction</text>
          {/* Force arrow */}
          <g style={{ opacity: active.forceOpacity, transition: "opacity 500ms ease-out 200ms" }}>
            <path
              d={`M ${active.arm.wx + 24} ${active.arm.wy - 24} l 8 -8 m 0 0 l -1 6 m 1 -6 l -6 1`}
              stroke={POS_AMBER} strokeWidth={1.5} fill="none" strokeLinecap="round"
            />
            <text x={active.arm.wx + 35} y={active.arm.wy - 38} fontSize={9} fill={POS_AMBER} fontWeight={600}>4–7 lb</text>
          </g>
        </g>

        <line x1={210} y1={108} x2={50} y2={108} stroke={POS_GREEN} strokeDasharray="4 3" strokeWidth={1} />
        <text x={50} y={101} fontSize={10} fill={POS_GREEN} fontWeight={700}>zero MAP at tragus</text>
      </PositionFrame>

      {/* Step controller */}
      <div className="rounded-xl border border-border bg-card p-3">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">
            Operative arm — abduction & traction sequence
          </p>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="text-[10px] font-semibold px-2 py-1 rounded-md border border-border bg-background hover:bg-muted transition"
          >
            {paused ? "▶ Resume" : "❚❚ Pause"}
          </button>
        </div>
        <div className="flex gap-1.5 mb-2">
          {STEPS.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => { setStep(i); setPaused(true); }}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-colors",
                i === step ? "bg-primary" : i < step ? "bg-primary/40" : "bg-muted"
              )}
              aria-label={s.label}
            />
          ))}
        </div>
        <p className="text-xs font-semibold text-foreground">{active.label}</p>
        <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{active.caption}</p>
      </div>
    </div>
  );
};

/**
 * Wrapper around <Arm> that animates shoulder/elbow/wrist coordinates
 * between steps. Achieves the effect by tweening with React state on a
 * requestAnimationFrame loop so the limb re-tessellates each frame
 * (the underlying SVG is path-based, not a CSS-transformable shape).
 */
const AnimatedArm = ({
  sx, sy, ex, ey, wx, wy,
}: { sx: number; sy: number; ex: number; ey: number; wx: number; wy: number }) => {
  const target = { sx, sy, ex, ey, wx, wy };
  const [coords, setCoords] = useState(target);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const start = { ...coords };
    const t0 = performance.now();
    const dur = 700;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      // ease-in-out cubic
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCoords({
        sx: start.sx + (target.sx - start.sx) * e,
        sy: start.sy + (target.sy - start.sy) * e,
        ex: start.ex + (target.ex - start.ex) * e,
        ey: start.ey + (target.ey - start.ey) * e,
        wx: start.wx + (target.wx - start.wx) * e,
        wy: start.wy + (target.wy - start.wy) * e,
      });
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sx, sy, ex, ey, wx, wy]);

  return (
    <DiagramFigure
      id="patient-positioning-diagrams"
      title="Patient positioning diagrams"
      description="Patient-positioning diagrams — labelled SVG illustrations used by the 'Patient Positioning in Anaesthesia' clinical topic."
    >
                  <Arm sx={coords.sx} sy={coords.sy} ex={coords.ex} ey={coords.ey} wx={coords.wx} wy={coords.wy}
        idPrefix="pf" upperW={13} foreW={11} handLen={12} gownSleeve />
    </DiagramFigure>
  );
};
