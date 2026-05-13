import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";

const hiatus = [
  { name: "Aortic hiatus", level: "T12", contents: "Aorta, thoracic duct, azygos vein", color: "hsl(0, 60%, 55%)", clinical: "Passes BEHIND the crura — not through the diaphragm. Aorta is therefore not compressed during diaphragmatic contraction." },
  { name: "Oesophageal hiatus", level: "T10", contents: "Oesophagus, vagal trunks (anterior & posterior)", color: "hsl(140, 50%, 45%)", clinical: "Passes through the right crus, which contributes to the lower oesophageal sphincter mechanism. Site of sliding/rolling hiatus hernia." },
  { name: "Vena caval foramen", level: "T8", contents: "IVC, right phrenic nerve", color: "hsl(220, 60%, 55%)", clinical: "Sits within the central tendon — widens during inspiration to augment venous return. Right phrenic nerve passes through to supply the diaphragm from below." },
];

export const DiaphragmDiagram = () => {
  const [active, setActive] = useState<number>(0);
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const item = hiatus[active];

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Diaphragm — inferior view"
          subtitle="Tap an opening, crus or ligament. The diaphragm is viewed from below (abdominal surface)."
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        <svg viewBox="0 0 500 420" className="w-full max-w-2xl mx-auto" role="img" aria-label="Diaphragm inferior view showing borders, muscular slips, crura and three major openings">
        <defs>
          <radialGradient id="diaGrad" cx="50%" cy="48%" r="48%">
            <stop offset="0%" stopColor="hsl(0, 30%, 55%)" stopOpacity="0.18" />
            <stop offset="70%" stopColor="hsl(0, 25%, 48%)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="hsl(0, 20%, 40%)" stopOpacity="0.04" />
          </radialGradient>
          {/* muscle fibre pattern */}
          <pattern id="diaFibre" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(0)">
            <line x1="3" y1="0" x2="3" y2="6" stroke="hsl(0, 25%, 50%)" strokeWidth="0.5" opacity="0.18" />
          </pattern>
          {/* radial fibre pattern */}
          <pattern id="radFibre" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <line x1="4" y1="0" x2="4" y2="8" stroke="hsl(0, 20%, 48%)" strokeWidth="0.5" opacity="0.12" />
          </pattern>
          <filter id="diaShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2" result="off" />
            <feComponentTransfer><feFuncA type="linear" slope="0.32" /></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ===== DOME OUTLINE — asymmetric, right higher ===== */}
        <path
          d="M 60,260 Q 80,130 140,80 Q 180,55 250,50 Q 320,55 360,80 Q 420,130 440,260 Q 430,310 400,340 Q 360,370 310,385 Q 250,395 190,385 Q 140,370 100,340 Q 70,310 60,260 Z"
          fill="url(#diaGrad)" stroke="hsl(0, 25%, 45%)" strokeWidth="1.5"
        />
        {/* Muscle fibre overlay */}
        <path
          d="M 60,260 Q 80,130 140,80 Q 180,55 250,50 Q 320,55 360,80 Q 420,130 440,260 Q 430,310 400,340 Q 360,370 310,385 Q 250,395 190,385 Q 140,370 100,340 Q 70,310 60,260 Z"
          fill="url(#diaFibre)" stroke="none"
        />

        {/* ===== CENTRAL TENDON — trefoil shape ===== */}
        <path
          d="M 200,185 Q 210,160 230,150 Q 250,145 270,150 Q 290,160 300,185 Q 310,210 295,230 Q 280,245 250,248 Q 220,245 205,230 Q 190,210 200,185 Z"
          fill="hsl(40, 25%, 75%)" fillOpacity="0.2" stroke="hsl(40, 20%, 55%)" strokeWidth="1" strokeDasharray="4 2"
        />
        <text x="250" y="200" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">Central tendon</text>
        <text x="250" y="212" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">(trefoil)</text>

        {/* ===== CRURA ===== */}
        {/* Right crus — larger, wraps around oesophagus */}
        <path
          d="M 220,280 Q 215,300 218,330 Q 222,355 230,375 Q 235,385 240,390"
          fill="none" stroke="hsl(0, 30%, 50%)" strokeWidth="3" opacity="0.25" strokeLinecap="round"
        />
        <path
          d="M 220,280 Q 215,300 218,330 Q 222,355 230,375 Q 235,385 240,390"
          fill="none" stroke="hsl(0, 25%, 45%)" strokeWidth="1" opacity="0.5"
        />
        <text x="205" y="340" fontSize="7" fill="hsl(var(--muted-foreground))" fontStyle="italic" transform="rotate(-80, 205, 340)">Right crus (L1–L3)</text>

        {/* Left crus — shorter */}
        <path
          d="M 280,280 Q 285,300 282,325 Q 278,345 272,360 Q 268,370 265,375"
          fill="none" stroke="hsl(0, 30%, 50%)" strokeWidth="3" opacity="0.2" strokeLinecap="round"
        />
        <path
          d="M 280,280 Q 285,300 282,325 Q 278,345 272,360 Q 268,370 265,375"
          fill="none" stroke="hsl(0, 25%, 45%)" strokeWidth="1" opacity="0.45"
        />
        <text x="295" y="330" fontSize="7" fill="hsl(var(--muted-foreground))" fontStyle="italic" transform="rotate(80, 295, 330)">Left crus (L1–L2)</text>

        {/* ===== MEDIAN ARCUATE LIGAMENT ===== */}
        <path d="M 222,280 Q 250,270 278,280" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.3" strokeDasharray="3 2" />
        <text x="250" y="268" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))" opacity="0.6">median arcuate lig.</text>

        {/* ===== MEDIAL ARCUATE LIGAMENTS (over psoas) ===== */}
        <path d="M 195,290 Q 175,305 160,330" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.25" />
        <text x="155" y="345" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.5">Medial arcuate lig.</text>
        <text x="155" y="355" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4" fontStyle="italic">(over psoas)</text>

        <path d="M 305,290 Q 325,305 340,330" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.25" />
        <text x="345" y="345" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.5">Medial arcuate lig.</text>

        {/* ===== LATERAL ARCUATE LIGAMENTS (over QL) ===== */}
        <path d="M 130,290 Q 110,310 95,340" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />
        <text x="75" y="340" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.45">Lateral arcuate lig.</text>
        <text x="75" y="350" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.35" fontStyle="italic">(over QL)</text>

        <path d="M 370,290 Q 390,310 405,340" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />
        <text x="395" y="355" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.45">Lateral arcuate lig.</text>

        {/* ===== COSTAL SLIPS — muscular origins from ribs ===== */}
        {[100, 120, 140, 160].map((y, i) => (
          <g key={`left-${i}`} opacity="0.15">
            <line x1={65 + i * 8} y1={y + 100} x2={85 + i * 10} y2={y + 70} stroke="hsl(0, 25%, 50%)" strokeWidth="2" />
          </g>
        ))}
        {[100, 120, 140, 160].map((y, i) => (
          <g key={`right-${i}`} opacity="0.15">
            <line x1={435 - i * 8} y1={y + 100} x2={415 - i * 10} y2={y + 70} stroke="hsl(0, 25%, 50%)" strokeWidth="2" />
          </g>
        ))}
        <text x="55" y="240" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4" fontStyle="italic">Costal slips</text>
        <text x="55" y="250" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.35">(ribs 7–12)</text>

        {/* ===== STERNAL ORIGIN ===== */}
        <path d="M 230,50 Q 240,42 250,40 Q 260,42 270,50" fill="none" stroke="hsl(0, 20%, 50%)" strokeWidth="2" opacity="0.2" />
        <text x="250" y="35" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.5">Sternal origin (xiphoid)</text>

        {/* ===== THREE MAJOR OPENINGS ===== */}

        {/* T8 — IVC foramen (in central tendon, right of midline) */}
        <ellipse
          cx="275" cy="172" rx="14" ry="10"
          fill={active === 2 ? "hsl(220, 60%, 55%)" : "hsl(220, 50%, 60%)"}
          fillOpacity={active === 2 ? 0.4 : 0.15}
          stroke="hsl(220, 60%, 55%)" strokeWidth={active === 2 ? 2 : 1.2}
          className="cursor-pointer transition-all"
          onClick={() => setActive(active === 2 ? null : 2)}
        />
        <text x="275" y="175" textAnchor="middle" fontSize="7" fill="hsl(220, 60%, 55%)" fontWeight="600" className="pointer-events-none">IVC</text>
        <text x="275" y="158" textAnchor="middle" fontSize="6" fill="hsl(220, 50%, 50%)" fontWeight="bold" className="pointer-events-none">T8</text>

        {/* T10 — Oesophageal hiatus (through right crus, slightly left) */}
        <ellipse
          cx="242" cy="255" rx="12" ry="9"
          fill={active === 1 ? "hsl(140, 50%, 45%)" : "hsl(140, 40%, 50%)"}
          fillOpacity={active === 1 ? 0.4 : 0.15}
          stroke="hsl(140, 50%, 45%)" strokeWidth={active === 1 ? 2 : 1.2}
          className="cursor-pointer transition-all"
          onClick={() => setActive(active === 1 ? null : 1)}
        />
        <text x="242" y="258" textAnchor="middle" fontSize="6.5" fill="hsl(140, 50%, 40%)" fontWeight="600" className="pointer-events-none">Oes.</text>
        <text x="242" y="242" textAnchor="middle" fontSize="6" fill="hsl(140, 45%, 42%)" fontWeight="bold" className="pointer-events-none">T10</text>

        {/* T12 — Aortic hiatus (behind crura, posterior) */}
        <ellipse
          cx="250" cy="295" rx="13" ry="10"
          fill={active === 0 ? "hsl(0, 60%, 55%)" : "hsl(0, 50%, 55%)"}
          fillOpacity={active === 0 ? 0.4 : 0.15}
          stroke="hsl(0, 60%, 55%)" strokeWidth={active === 0 ? 2 : 1.2}
          className="cursor-pointer transition-all"
          onClick={() => setActive(active === 0 ? null : 0)}
        />
        <text x="250" y="298" textAnchor="middle" fontSize="6.5" fill="hsl(0, 60%, 50%)" fontWeight="600" className="pointer-events-none">Aorta</text>
        <text x="250" y="310" textAnchor="middle" fontSize="6" fill="hsl(0, 55%, 50%)" fontWeight="bold" className="pointer-events-none">T12</text>

        {/* ===== PHRENIC NERVES ===== */}
        {/* Right phrenic */}
        <path d="M 310,60 Q 300,100 290,140 Q 280,165 275,172" fill="none" stroke="hsl(50, 70%, 50%)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
        <text x="315" y="95" fontSize="6" fill="hsl(50, 65%, 45%)" fontStyle="italic">R. phrenic (C3,4,5)</text>

        {/* Left phrenic */}
        <path d="M 190,60 Q 200,100 210,140 Q 220,170 225,190" fill="none" stroke="hsl(50, 70%, 50%)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
        <text x="165" y="95" fontSize="6" fill="hsl(50, 65%, 45%)" fontStyle="italic">L. phrenic (C3,4,5)</text>

        {/* Motor supply label */}
        <text x="250" y="410" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.5">Motor: phrenic nerve (C3,4,5) — "keeps the diaphragm alive"</text>

        {/* ===== SPLANCHNIC NERVES ===== */}
        <path d="M 200,310 Q 195,330 192,350" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.75" opacity="0.2" strokeDasharray="2 2" />
        <text x="175" y="365" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.35" fontStyle="italic">Splanchnic nn.</text>
        <text x="175" y="374" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.3">(pierce crura)</text>

        {/* ===== Compass labels (gated by Labels) ===== */}
        {showLabels && (
          <g pointerEvents="none">
            <text x="250" y="22" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.5" fontWeight="600">ANTERIOR</text>
            <text x="250" y="412" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.5" fontWeight="600">POSTERIOR</text>
            <text x="14" y="215" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.5" fontWeight="600">RIGHT</text>
            <text x="475" y="215" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.5" fontWeight="600">LEFT</text>
          </g>
        )}
        </svg>

        <p className="text-xs text-center text-muted-foreground mt-2 italic">
          <span className="font-semibold not-italic text-foreground">"I 8 10 Eggs At 12" — </span>
          IVC at T8, oEsophagus at T10, Aorta at T12.
        </p>

        {/* Hiatus chips */}
        <div className="grid sm:grid-cols-3 gap-2 mt-3">
          {hiatus.map((h, i) => (
            <button
              key={h.name}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`text-left p-3 rounded-lg border transition-all ${active === i ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: h.color }} />
                <span className="font-semibold text-foreground text-sm">{h.name}</span>
                <span className="text-xs font-bold ml-auto" style={{ color: h.color }}>{h.level}</span>
              </div>
              <p className="text-xs text-muted-foreground">{h.contents}</p>
            </button>
          ))}
        </div>

        {/* Standardised detail panel */}
        <div className="mt-4 min-h-[110px]">
          <div
            className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
            style={{ borderLeftWidth: 4, borderLeftColor: item.color }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-foreground text-sm">{item.name}</p>
              <span
                className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                style={{ background: `${item.color}26`, color: item.color }}
              >
                {item.level}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Transmits:</span> {item.contents}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Clinical:</span> {item.clinical}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaphragmDiagram;
