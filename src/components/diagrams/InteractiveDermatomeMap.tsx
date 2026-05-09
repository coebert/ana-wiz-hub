import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { normaliseLevel, findLocalLevel, type CanonicalLevel } from "@/lib/dermatome-sync";

type Dermatome = {
  level: string;
  cordY: number; // y on cord diagram
  region: "cervical" | "thoracic" | "lumbar" | "sacral";
  landmark: string;
  // Polygon points on anterior body (viewBox 0 0 200 500)
  anterior?: string;
  // Polygon points on posterior body (viewBox 0 0 200 500)
  posterior?: string;
};

const DERMATOMES: Dermatome[] = [
  // Cervical
  { level: "C2", cordY: 70, region: "cervical", landmark: "Occiput / posterior scalp",
    posterior: "70,30 130,30 135,55 65,55" },
  { level: "C3", cordY: 90, region: "cervical", landmark: "Posterior neck / collar",
    anterior: "78,55 122,55 128,75 72,75",
    posterior: "65,55 135,55 138,75 62,75" },
  { level: "C4", cordY: 110, region: "cervical", landmark: "Shoulder tip / clavicle",
    anterior: "60,75 140,75 150,95 50,95",
    posterior: "62,75 138,75 148,95 52,95" },
  { level: "C5", cordY: 130, region: "cervical", landmark: "Lateral upper arm (regimental badge)",
    anterior: "30,95 50,95 45,140 20,140",
    posterior: "30,95 52,95 47,140 22,140" },
  { level: "C6", cordY: 150, region: "cervical", landmark: "Thumb / lateral forearm",
    anterior: "15,140 45,140 40,185 5,185",
    posterior: "18,140 47,140 42,185 8,185" },
  { level: "C7", cordY: 170, region: "cervical", landmark: "Middle finger",
    anterior: "0,185 40,185 35,215 0,215",
    posterior: "0,185 42,185 38,215 0,215" },
  { level: "C8", cordY: 185, region: "cervical", landmark: "Little finger / medial forearm",
    anterior: "0,215 35,215 38,240 0,240",
    posterior: "0,215 38,215 40,240 0,240" },
  { level: "T1", cordY: 200, region: "thoracic", landmark: "Medial upper arm",
    anterior: "38,240 70,240 70,180 50,140 45,140",
    posterior: "40,240 72,240 72,180 52,140 47,140" },
  // Thoracic trunk
  { level: "T2", cordY: 215, region: "thoracic", landmark: "Axilla",
    anterior: "70,95 130,95 130,115 70,115" },
  { level: "T3", cordY: 235, region: "thoracic", landmark: "Upper chest",
    anterior: "70,115 130,115 130,135 70,135" },
  { level: "T4", cordY: 255, region: "thoracic", landmark: "Nipple line",
    anterior: "70,135 130,135 130,155 70,155" },
  { level: "T5", cordY: 275, region: "thoracic", landmark: "Inframammary",
    anterior: "70,155 130,155 130,175 70,175" },
  { level: "T6", cordY: 295, region: "thoracic", landmark: "Xiphisternum",
    anterior: "70,175 130,175 130,195 70,195" },
  { level: "T7", cordY: 315, region: "thoracic", landmark: "Lower costal margin",
    anterior: "70,195 130,195 130,215 70,215" },
  { level: "T8", cordY: 335, region: "thoracic", landmark: "Upper abdomen",
    anterior: "70,215 130,215 130,232 70,232" },
  { level: "T9", cordY: 355, region: "thoracic", landmark: "Above umbilicus",
    anterior: "70,232 130,232 130,247 70,247" },
  { level: "T10", cordY: 375, region: "thoracic", landmark: "Umbilicus",
    anterior: "70,247 130,247 130,262 70,262" },
  { level: "T11", cordY: 395, region: "thoracic", landmark: "Below umbilicus",
    anterior: "70,262 130,262 130,277 70,277" },
  { level: "T12", cordY: 415, region: "thoracic", landmark: "Suprapubic / iliac crest",
    anterior: "70,277 130,277 130,292 70,292" },
  // Posterior trunk T1-T12 simplified
  { level: "T2-T12 (back)", cordY: 295, region: "thoracic", landmark: "Posterior trunk segments",
    posterior: "72,95 138,95 138,295 72,295" },
  // Lumbar
  { level: "L1", cordY: 440, region: "lumbar", landmark: "Inguinal / groin",
    anterior: "70,292 130,292 130,310 70,310" },
  { level: "L2", cordY: 465, region: "lumbar", landmark: "Anterior thigh (upper)",
    anterior: "65,310 135,310 130,345 70,345",
    posterior: "65,310 135,310 130,345 70,345" },
  { level: "L3", cordY: 490, region: "lumbar", landmark: "Medial knee",
    anterior: "65,345 135,345 130,380 70,380",
    posterior: "65,345 135,345 130,380 70,380" },
  { level: "L4", cordY: 515, region: "lumbar", landmark: "Medial malleolus / medial calf",
    anterior: "70,380 130,380 125,420 75,420",
    posterior: "70,380 130,380 125,420 75,420" },
  { level: "L5", cordY: 540, region: "lumbar", landmark: "Dorsum of foot / great toe",
    anterior: "75,420 125,420 122,460 78,460" },
  // Sacral
  { level: "S1", cordY: 565, region: "sacral", landmark: "Lateral foot / little toe / sole",
    anterior: "78,460 122,460 120,490 80,490",
    posterior: "75,420 125,420 120,490 80,490" },
  { level: "S2", cordY: 580, region: "sacral", landmark: "Posterior thigh",
    posterior: "70,345 95,345 95,420 75,420" },
  { level: "S3", cordY: 595, region: "sacral", landmark: "Buttock crease / ischial",
    posterior: "85,300 115,300 115,345 85,345" },
  { level: "S4-S5", cordY: 612, region: "sacral", landmark: "Perineum / saddle area",
    posterior: "92,295 108,295 108,310 92,310" },
];

const REGION_COLOR: Record<Dermatome["region"], string> = {
  cervical: "hsl(var(--anatomy))",
  thoracic: "hsl(var(--primary))",
  lumbar: "hsl(var(--accent-foreground))",
  sacral: "hsl(var(--destructive))",
};

interface InteractiveDermatomeMapProps {
  /** Optional controlled canonical level (e.g. "T10", "S2-4"). */
  selectedLevel?: CanonicalLevel | null;
  /** Notified on every click with the canonical level (or null when un-mappable). */
  onLevelChange?: (level: CanonicalLevel | null) => void;
}

const InteractiveDermatomeMap = ({ selectedLevel, onLevelChange }: InteractiveDermatomeMapProps = {}) => {
  const isControlled = selectedLevel !== undefined;
  const [internal, setInternal] = useState<string | null>("T10");

  // When controlled: resolve canonical -> local level string; when uncontrolled: use internal local id.
  const selected = isControlled
    ? findLocalLevel(DERMATOMES, selectedLevel ?? null, "level")?.level ?? null
    : internal;

  const setSelected = (local: string) => {
    if (!isControlled) setInternal(local);
    onLevelChange?.(normaliseLevel(local));
  };

  const [showLabels, setShowLabels] = useState(true);
  const [showPosterior, setShowPosterior] = useState(true);

  const sel = DERMATOMES.find((d) => d.level === selected) ?? null;

  const renderBody = (side: "anterior" | "posterior") => (
    <svg viewBox="0 0 200 500" className="w-full h-auto max-w-[220px] mx-auto" role="img" aria-label={`${side} dermatome map`}>
      {/* 1. Body silhouette (under territories) */}
      <path
        d="M 100 15 C 85 15 78 28 80 42 C 75 50 75 62 82 68 L 75 78 C 65 80 55 88 50 100 L 30 130 C 22 145 15 175 8 215 C 4 240 2 260 0 280 L 8 282 C 12 260 18 235 25 215 L 35 180 L 50 175 L 60 240 C 62 280 68 350 70 420 L 75 490 L 88 495 L 95 420 L 100 360 L 105 420 L 112 495 L 125 490 L 130 420 C 132 350 138 280 140 240 L 150 175 L 165 180 L 175 215 C 182 235 188 260 192 282 L 200 280 C 198 260 196 240 192 215 C 185 175 178 145 170 130 L 150 100 C 145 88 135 80 125 78 L 118 68 C 125 62 125 50 120 42 C 122 28 115 15 100 15 Z"
        fill="hsl(var(--muted))"
        opacity="0.35"
        stroke="hsl(var(--border))"
        strokeWidth="0.8"
      />

      {/* 2. Dermatome polygons — translucent so anatomy reads through */}
      {DERMATOMES.filter((d) => d[side]).map((d) => {
        const isSel = d.level === selected;
        const fill = REGION_COLOR[d.region];
        return (
          <g key={`${side}-${d.level}`}>
            <polygon
              points={d[side]}
              fill={fill}
              opacity={isSel ? 0.65 : 0.30}
              stroke={isSel ? "hsl(var(--foreground))" : fill}
              strokeWidth={isSel ? 1.5 : 0.6}
              strokeDasharray={isSel ? undefined : "3 2"}
              style={{ cursor: "pointer", transition: "all 0.15s" }}
              onClick={() => setSelected(d.level)}
            >
              <title>{`${d.level} — ${d.landmark}`}</title>
            </polygon>
            <polygon
              points={d[side]!.split(" ").map((p) => {
                const [x, y] = p.split(",").map(Number);
                return `${200 - x},${y}`;
              }).join(" ")}
              fill={fill}
              opacity={isSel ? 0.65 : 0.30}
              stroke={isSel ? "hsl(var(--foreground))" : fill}
              strokeWidth={isSel ? 1.5 : 0.6}
              strokeDasharray={isSel ? undefined : "3 2"}
              style={{ cursor: "pointer", transition: "all 0.15s" }}
              onClick={() => setSelected(d.level)}
            >
              <title>{`${d.level} — ${d.landmark}`}</title>
            </polygon>
            {isSel && showLabels && d[side] && (() => {
              const pts = d[side]!.split(" ").map((p) => p.split(",").map(Number));
              const cx = pts.reduce((s, [x]) => s + x, 0) / pts.length;
              const cy = pts.reduce((s, [, y]) => s + y, 0) / pts.length;
              return (
                <text x={cx} y={cy + 3} textAnchor="middle" fontSize="9" fontWeight="700" fill="hsl(var(--foreground))" pointerEvents="none">
                  {d.level}
                </text>
              );
            })()}
          </g>
        );
      })}

      {/* 3. Surface anatomy plate (on top of territories) */}
      <g fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.7" opacity="0.55"
        style={{ pointerEvents: "none" }}>
        {side === "anterior" ? (
          <>
            {/* Clavicles */}
            <path d="M82,82 C72,84 64,86 58,90" />
            <path d="M118,82 C128,84 136,86 142,90" />
            {/* Sternum */}
            <path d="M100,90 L100,165" strokeWidth="0.9" />
            <line x1="94" y1="100" x2="106" y2="100" strokeWidth="0.5" />
            {/* Costal margin */}
            <path d="M65,165 C82,200 100,210 100,210 C100,210 118,200 135,165" strokeDasharray="2 2" />
            {/* Nipples (T4) */}
            <circle cx="78" cy="148" r="1.6" fill="hsl(var(--foreground))" stroke="none" />
            <circle cx="122" cy="148" r="1.6" fill="hsl(var(--foreground))" stroke="none" />
            {/* Umbilicus (T10) */}
            <circle cx="100" cy="248" r="2.2" strokeWidth="0.7" />
            {/* ASIS + inguinal */}
            <circle cx="78" cy="302" r="1.8" fill="hsl(var(--foreground))" stroke="none" />
            <circle cx="122" cy="302" r="1.8" fill="hsl(var(--foreground))" stroke="none" />
            <path d="M78,302 L100,318 L122,302" strokeDasharray="2 2" opacity="0.7" />
            {/* Patellae */}
            <ellipse cx="88" cy="395" rx="5" ry="6" />
            <ellipse cx="112" cy="395" rx="5" ry="6" />
            {/* Medial malleoli */}
            <circle cx="88" cy="485" r="1.6" fill="hsl(var(--foreground))" stroke="none" />
            <circle cx="112" cy="485" r="1.6" fill="hsl(var(--foreground))" stroke="none" />
          </>
        ) : (
          <>
            {/* Spine */}
            <line x1="100" y1="60" x2="100" y2="290" strokeWidth="0.8" strokeDasharray="2 3" />
            {/* C7 vertebra prominens */}
            <circle cx="100" cy="80" r="1.8" fill="hsl(var(--foreground))" stroke="none" />
            {/* Scapulae */}
            <path d="M78,115 C72,128 72,148 80,158 C88,162 92,152 92,142 C92,128 88,118 84,115 Z" />
            <path d="M122,115 C128,128 128,148 120,158 C112,162 108,152 108,142 C108,128 112,118 116,115 Z" />
            {/* Inferior scapular angle (T7) */}
            <circle cx="84" cy="160" r="1.5" fill="hsl(var(--foreground))" stroke="none" />
            <circle cx="116" cy="160" r="1.5" fill="hsl(var(--foreground))" stroke="none" />
            {/* Iliac crests (L4) */}
            <path d="M68,272 C76,282 88,288 100,290" strokeWidth="0.9" />
            <path d="M132,272 C124,282 112,288 100,290" strokeWidth="0.9" />
            {/* PSIS dimples */}
            <circle cx="92" cy="295" r="1.4" fill="hsl(var(--foreground))" stroke="none" />
            <circle cx="108" cy="295" r="1.4" fill="hsl(var(--foreground))" stroke="none" />
            {/* Gluteal fold */}
            <path d="M75,318 C85,326 100,328 115,326 C120,326 125,322 125,318" strokeDasharray="2 2" />
          </>
        )}
      </g>

      {showLabels && (
        <text x="100" y="10" textAnchor="middle" fontSize="9" fontWeight="700" fill="hsl(var(--foreground))">
          {side === "anterior" ? "ANTERIOR" : "POSTERIOR"}
        </text>
      )}
    </svg>
  );

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Interactive dermatome map"
          subtitle="Click any dermatome on the body to highlight its spinal cord level."
          toggles={[
            { label: "Posterior view", active: showPosterior, onChange: () => setShowPosterior((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        <div className={`grid gap-4 items-start ${showPosterior ? "lg:grid-cols-[1fr_1fr_auto]" : "lg:grid-cols-[1fr_auto]"}`}>
          {/* Anterior body */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground text-center mb-1">Anterior view</p>
            {renderBody("anterior")}
          </div>

          {/* Posterior body */}
          {showPosterior && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground text-center mb-1">Posterior view</p>
              {renderBody("posterior")}
            </div>
          )}

        {/* Coupled cord */}
        <div className="lg:w-48">
          <p className="text-xs font-semibold text-muted-foreground text-center mb-1">Spinal level</p>
          <svg viewBox="0 0 180 680" className="w-full h-auto max-w-[180px] mx-auto" role="img" aria-label="Spinal cord with highlighted level">
            {/* Vertebral column */}
            <rect x="60" y="35" width="60" height="610" fill="hsl(var(--muted))" opacity="0.4" stroke="hsl(var(--border))" strokeWidth="0.8" />

            {/* Spinal canal */}
            <rect x="78" y="40" width="24" height="580" fill="hsl(var(--background))" opacity="0.5" stroke="hsl(var(--border))" strokeDasharray="2 2" strokeWidth="0.5" />

            {/* Cord */}
            <path
              d="M 84 40 L 84 125 Q 80 165 84 200 L 84 390 Q 81 420 84 440 L 88 452 L 92 452 L 96 440 Q 99 420 96 390 L 96 200 Q 100 165 96 125 L 96 40 Z"
              fill="hsl(var(--anatomy) / 0.25)"
              stroke="hsl(var(--anatomy))"
              strokeWidth="1.2"
            />

            {/* Cauda equina */}
            {Array.from({ length: 10 }).map((_, i) => {
              const sx = 86 + (i * 8) / 9;
              const ex = 70 + (i * 40) / 9;
              const ey = 580 + (i % 3) * 8;
              return (
                <path
                  key={i}
                  d={`M ${sx} 452 Q ${sx} ${(452 + ey) / 2}, ${ex} ${ey}`}
                  stroke="hsl(var(--anatomy))"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.7"
                />
              );
            })}

            {/* Region bands on right */}
            <rect x="125" y="40" width="6" height="135" fill={REGION_COLOR.cervical} opacity="0.6" />
            <rect x="125" y="175" width="6" height="240" fill={REGION_COLOR.thoracic} opacity="0.6" />
            <rect x="125" y="415" width="6" height="135" fill={REGION_COLOR.lumbar} opacity="0.6" />
            <rect x="125" y="550" width="6" height="80" fill={REGION_COLOR.sacral} opacity="0.6" />
            <text x="135" y="110" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600">C1–C8</text>
            <text x="135" y="295" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600">T1–T12</text>
            <text x="135" y="485" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600">L1–L5</text>
            <text x="135" y="595" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600">S1–S5</text>

            {/* Conus marker */}
            <line x1="60" y1="452" x2="120" y2="452" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
            <text x="58" y="450" textAnchor="end" fontSize="7" fill="hsl(var(--muted-foreground))">Conus L1/2</text>

            {/* Highlighted level */}
            {sel && (
              <g>
                <line
                  x1="55"
                  y1={sel.cordY}
                  x2="120"
                  y2={sel.cordY}
                  stroke="hsl(var(--destructive))"
                  strokeWidth="2"
                />
                <circle
                  cx="90"
                  cy={sel.cordY}
                  r="6"
                  fill="hsl(var(--destructive))"
                  opacity="0.9"
                />
                <rect x="0" y={sel.cordY - 12} width="50" height="24" rx="3" fill="hsl(var(--destructive))" />
                <text x="25" y={sel.cordY + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--destructive-foreground))">
                  {sel.level}
                </text>
              </g>
            )}
          </svg>
          </div>
        </div>

        {/* Standardised detail panel with left-border accent */}
        <div className="mt-4 min-h-[80px]">
          {sel ? (
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
              style={{ borderLeftWidth: 4, borderLeftColor: REGION_COLOR[sel.region] }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-foreground text-sm">{sel.level} — {sel.landmark}</p>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{ background: withAlpha(REGION_COLOR[sel.region], 0.15), color: REGION_COLOR[sel.region] }}
                >
                  {sel.region}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg border border-dashed border-border bg-background/40">
              <p className="text-xs text-muted-foreground italic">Click a dermatome to see its spinal level and landmark.</p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {(Object.keys(REGION_COLOR) as Dermatome["region"][]).map((r) => (
            <div key={r} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded" style={{ background: REGION_COLOR[r] }} />
              <span className="capitalize text-muted-foreground">{r}</span>
            </div>
          ))}
        </div>

        {/* Quick-jump key levels */}
        <div className="mt-3">
          <p className="text-xs font-semibold text-foreground mb-2">Key block heights:</p>
          <div className="flex flex-wrap gap-1.5">
            {[
              { level: "C4", note: "Diaphragm — phrenic palsy if blocked" },
              { level: "T4", note: "Nipple — C-section minimum" },
              { level: "T6", note: "Xiphisternum — upper abdo surgery" },
              { level: "T10", note: "Umbilicus — labour analgesia / TURP" },
              { level: "L1", note: "Inguinal — hernia / lower limb" },
              { level: "S2-4", note: "Saddle block — perineal" },
            ].map((k) => (
              <button
                key={k.level}
                onClick={() => setSelected(k.level === "S2-4" ? "S4-S5" : k.level)}
                className="text-[10px] px-2 py-1 rounded border border-border hover:bg-muted/50 transition"
                title={k.note}
              >
                <span className="font-bold text-primary">{k.level}</span>
                <span className="text-muted-foreground ml-1">{k.note}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDermatomeMap;
