import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Interactive summary of pregnancy physiology changes by system.
 * Click a system on the silhouette (or the chip row) to see direction,
 * magnitude and the key anaesthetic implication.
 *
 * Conforms to STYLE_GUIDE.md: DiagramToggleBar header, prefixed defs ids
 * (ppd-), radial depth gradient, drop-shadow on the silhouette, default
 * selection, left-border detail panel keyed to system.
 */

type SystemKey =
  | "cvs"
  | "resp"
  | "airway"
  | "gi"
  | "haem"
  | "renal"
  | "neuro"
  | "endo";

type Direction = "up" | "down" | "mixed";

interface SystemInfo {
  label: string;
  region: SystemKey;
  color: string;
  changes: { name: string; pct: string; dir: Direction }[];
  implication: string;
}

const REGION_COLOR: Record<SystemKey, string> = {
  cvs: "hsl(0, 70%, 55%)",
  resp: "hsl(200, 70%, 50%)",
  airway: "hsl(280, 55%, 55%)",
  gi: "hsl(35, 70%, 50%)",
  haem: "hsl(340, 65%, 50%)",
  renal: "hsl(45, 80%, 45%)",
  neuro: "hsl(260, 55%, 55%)",
  endo: "hsl(160, 55%, 45%)",
};

const SYSTEMS: Record<SystemKey, SystemInfo> = {
  cvs: {
    label: "Cardiovascular",
    region: "cvs",
    color: REGION_COLOR.cvs,
    changes: [
      { name: "Cardiac output", pct: "+40%", dir: "up" },
      { name: "Stroke volume", pct: "+30%", dir: "up" },
      { name: "Heart rate", pct: "+15–25%", dir: "up" },
      { name: "SVR", pct: "−20%", dir: "down" },
      { name: "Plasma volume", pct: "+45%", dir: "up" },
    ],
    implication:
      "Aortocaval compression from ~20 wk → left lateral tilt 15°. Rapid hypotension with neuraxial blockade; phenylephrine first-line vasopressor.",
  },
  resp: {
    label: "Respiratory",
    region: "resp",
    color: REGION_COLOR.resp,
    changes: [
      { name: "Minute ventilation", pct: "+50%", dir: "up" },
      { name: "Tidal volume", pct: "+40%", dir: "up" },
      { name: "Respiratory rate", pct: "≈ unchanged", dir: "mixed" },
      { name: "FRC", pct: "−20%", dir: "down" },
      { name: "O₂ consumption", pct: "+20%", dir: "up" },
      { name: "PaCO₂", pct: "−25% (~4.0 kPa)", dir: "down" },
    ],
    implication:
      "Compensated respiratory alkalosis (pH ~7.44, HCO₃⁻ ~20). Rapid desaturation on apnoea — pre-oxygenate to ETO₂ >90%. Target normocapnia at the pregnant baseline.",
  },
  airway: {
    label: "Airway",
    region: "airway",
    color: REGION_COLOR.airway,
    changes: [
      { name: "Mucosal oedema / vascularity", pct: "↑↑", dir: "up" },
      { name: "Mallampati grade", pct: "↑ by ≥1", dir: "up" },
      { name: "Breast / chest-wall mass", pct: "↑", dir: "up" },
      { name: "Failed intubation rate", pct: "~1:300", dir: "up" },
    ],
    implication:
      "Smaller cuffed ETT (6.0–7.0), short-handle laryngoscope, ramped position, videolaryngoscope first-pass. Avoid nasal instrumentation — epistaxis risk.",
  },
  gi: {
    label: "GI",
    region: "gi",
    color: REGION_COLOR.gi,
    changes: [
      { name: "LOS tone (progesterone)", pct: "↓", dir: "down" },
      { name: "Gastric emptying (pregnancy alone)", pct: "≈ preserved", dir: "mixed" },
      { name: "Gastric emptying (labour / opioids)", pct: "↓↓", dir: "down" },
      { name: "Gastric acid secretion", pct: "↑", dir: "up" },
    ],
    implication:
      "Treat as 'full stomach' from ~16–18 wk gestation. Aspiration prophylaxis (sodium citrate, H₂-blocker / PPI, metoclopramide) and RSI for any GA.",
  },
  haem: {
    label: "Haematology",
    region: "haem",
    color: REGION_COLOR.haem,
    changes: [
      { name: "Plasma volume", pct: "+45%", dir: "up" },
      { name: "Red cell mass", pct: "+20%", dir: "up" },
      { name: "Hb (dilutional)", pct: "↓ (~105 g/L)", dir: "down" },
      { name: "Fibrinogen, factors VII/VIII/X", pct: "↑↑", dir: "up" },
      { name: "Protein S, fibrinolysis", pct: "↓", dir: "down" },
      { name: "WCC (physiological)", pct: "↑", dir: "up" },
    ],
    implication:
      "Hypercoagulable — VTE prophylaxis throughout pregnancy and 6 wk post-partum. Raised WCC alone does not imply infection. ROTEM/TEG useful in PPH.",
  },
  renal: {
    label: "Renal & hepatic",
    region: "renal",
    color: REGION_COLOR.renal,
    changes: [
      { name: "GFR", pct: "+50%", dir: "up" },
      { name: "Creatinine, urea", pct: "↓ (Cr <75 µmol/L 'normal')", dir: "down" },
      { name: "Albumin", pct: "−20%", dir: "down" },
      { name: "ALP (placental)", pct: "↑↑", dir: "up" },
      { name: "Plasma cholinesterase activity", pct: "−25–30%", dir: "down" },
    ],
    implication:
      "Renally cleared drugs (Mg²⁺, LMWH) cleared faster. ↓Albumin → ↑free fraction of bound drugs. Sux duration clinically unchanged (↑Vd offsets ↓enzyme).",
  },
  neuro: {
    label: "Neuraxial",
    region: "neuro",
    color: REGION_COLOR.neuro,
    changes: [
      { name: "Epidural venous engorgement", pct: "↑↑", dir: "up" },
      { name: "Epidural space volume", pct: "↓", dir: "down" },
      { name: "CSF volume", pct: "↓", dir: "down" },
      { name: "LA dose requirement", pct: "−30–40%", dir: "down" },
      { name: "MAC of volatile", pct: "−25–40%", dir: "down" },
      { name: "β-endorphins, progesterone", pct: "↑", dir: "up" },
    ],
    implication:
      "Reduce spinal/epidural doses ~30%. Higher risk of bloody tap / intravascular catheter. Awareness risk if MAC mis-targeted on the high side.",
  },
  endo: {
    label: "Endocrine",
    region: "endo",
    color: REGION_COLOR.endo,
    changes: [
      { name: "Insulin resistance", pct: "↑↑", dir: "up" },
      { name: "Cortisol (free)", pct: "↑", dir: "up" },
      { name: "Total T4 / TBG", pct: "↑", dir: "up" },
      { name: "Free T4", pct: "≈ unchanged", dir: "mixed" },
      { name: "Prolactin", pct: "↑↑↑", dir: "up" },
    ],
    implication:
      "Gestational diabetes screening at 24–28 wk. Stress-dose steroids if previously on long-term steroids. Thyroid function interpreted with pregnancy-specific reference ranges.",
  },
};

const ORDER: SystemKey[] = ["cvs", "resp", "airway", "gi", "haem", "renal", "neuro", "endo"];

const Arrow = ({ dir }: { dir: Direction }) => {
  if (dir === "up") return <span className="text-clinical font-bold">▲</span>;
  if (dir === "down") return <span className="text-destructive font-bold">▼</span>;
  return <span className="text-muted-foreground font-bold">◆</span>;
};

export const PregnancyPhysiologyDiagram = () => {
  const [selected, setSelected] = useState<SystemKey>("cvs");
  const [showLabels, setShowLabels] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);

  const info = SYSTEMS[selected];
  const isSel = (k: SystemKey) => selected === k;
  const opacity = (k: SystemKey) => (isSel(k) ? 1 : 0.55);

  // Hotspot configuration: x, y, r anchored to the silhouette
  const HOTSPOTS: Record<SystemKey, { cx: number; cy: number; r: number }> = {
    airway: { cx: 200, cy: 80, r: 20 },
    resp: { cx: 200, cy: 175, r: 32 },
    cvs: { cx: 175, cy: 175, r: 22 },
    gi: { cx: 200, cy: 250, r: 28 },
    haem: { cx: 235, cy: 210, r: 18 },
    renal: { cx: 165, cy: 240, r: 18 },
    neuro: { cx: 200, cy: 320, r: 22 },
    endo: { cx: 230, cy: 130, r: 16 },
  };

  return (
    <DiagramFigure id="pregnancy-physiology" title="Pregnancy physiology by system: cardiovascular, respiratory, renal and haematological changes" description="System-by-system summary of the maternal physiological adaptations of pregnancy with anaesthetic implications.">
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          toggles={[
            { label: "Hotspots", active: showHotspots, onChange: () => setShowHotspots((v) => !v) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((v) => !v) },
          ]}
        />

        <div className="grid md:grid-cols-[280px_1fr] gap-4 items-start">
          <svg
            viewBox="0 0 400 540"
            className="w-full h-auto max-w-[280px] mx-auto"
            role="img"
            aria-label="Pregnant silhouette with clickable systems showing direction and magnitude of physiological change"
          >
            <defs>
              <radialGradient id="ppd-depth" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0" />
                <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.3" />
              </radialGradient>
              <pattern id="ppd-skin" patternUnits="userSpaceOnUse" width="6" height="6">
                <circle cx="3" cy="3" r="0.5" fill="hsl(30, 40%, 40%)" opacity="0.25" />
              </pattern>
              <filter id="ppd-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Silhouette of pregnant woman (lateral, gravid abdomen) */}
            <g filter="url(#ppd-shadow)">
              {/* Head */}
              <ellipse cx="200" cy="60" rx="32" ry="38" fill="url(#ppd-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
              {/* Neck */}
              <path d="M 185 95 Q 200 110 215 95 L 215 120 Q 200 125 185 120 Z" fill="url(#ppd-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
              {/* Torso (with breast curve and gravid abdomen) */}
              <path
                d="M 155 125 Q 145 160 150 200 Q 158 250 175 285 Q 200 305 230 295 Q 270 270 275 220 Q 275 165 250 135 Q 230 122 200 122 Q 175 122 155 125 Z"
                fill="url(#ppd-skin)"
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />
              {/* Hips */}
              <path d="M 165 285 Q 155 320 165 350 Q 200 360 235 350 Q 245 320 235 290 Z" fill="url(#ppd-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
              {/* Legs */}
              <path d="M 175 350 L 170 470 L 190 475 L 195 350 Z" fill="url(#ppd-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
              <path d="M 205 350 L 215 475 L 235 470 L 225 350 Z" fill="url(#ppd-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
              {/* Spine (for neuraxial hotspot) */}
              <path d="M 175 130 Q 170 200 175 280 Q 175 320 180 350" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            </g>

            {/* Hotspots */}
            {showHotspots && (
              <g>
                {ORDER.map((k) => {
                  const h = HOTSPOTS[k];
                  return (
                    <g key={k} onClick={() => setSelected(k)} style={{ cursor: "pointer" }}>
                      <circle
                        cx={h.cx}
                        cy={h.cy}
                        r={h.r}
                        fill={REGION_COLOR[k]}
                        opacity={isSel(k) ? 0.55 : 0.22}
                        stroke={REGION_COLOR[k]}
                        strokeWidth={isSel(k) ? 2.5 : 1.2}
                      />
                      {isSel(k) && (
                        <circle
                          cx={h.cx}
                          cy={h.cy}
                          r={h.r + 5}
                          fill="none"
                          stroke={REGION_COLOR[k]}
                          strokeWidth="1"
                          opacity="0.6"
                        >
                          <animate attributeName="r" from={h.r + 3} to={h.r + 10} dur="1.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </g>
            )}

            {/* Labels */}
            {showLabels && (
              <g fontSize="10" fill="hsl(var(--foreground))" fontFamily="sans-serif">
                <text x="240" y="80" opacity={opacity("airway")}>Airway</text>
                <text x="270" y="135" opacity={opacity("endo")}>Endo</text>
                <text x="120" y="180" textAnchor="end" opacity={opacity("cvs")}>CVS</text>
                <text x="280" y="180" opacity={opacity("resp")}>Resp</text>
                <text x="300" y="215" opacity={opacity("haem")}>Haem</text>
                <text x="120" y="245" textAnchor="end" opacity={opacity("renal")}>Renal</text>
                <text x="280" y="255" opacity={opacity("gi")}>GI</text>
                <text x="120" y="325" textAnchor="end" opacity={opacity("neuro")}>Neuro</text>
              </g>
            )}

            <rect x="0" y="0" width="400" height="540" fill="url(#ppd-depth)" pointerEvents="none" />
          </svg>

          {/* Detail panel */}
          <div
            className="rounded-lg border border-border bg-background p-4 min-h-[260px] border-l-4"
            style={{ borderLeftColor: REGION_COLOR[info.region] }}
          >
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h4 className="font-serif font-bold text-foreground text-lg">{info.label}</h4>
              <span
                className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded border"
                style={{ borderColor: REGION_COLOR[info.region], color: REGION_COLOR[info.region] }}
              >
                {info.region}
              </span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {info.changes.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{c.name}</span>
                  <span className="font-mono text-foreground whitespace-nowrap">
                    <Arrow dir={c.dir} /> {c.pct}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">
                Anaesthetic implication
              </p>
              <p className="text-sm text-foreground">{info.implication}</p>
            </div>
          </div>
        </div>

        {/* Chip row */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {ORDER.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setSelected(k)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                selected === k
                  ? "bg-primary/10 border-primary text-foreground"
                  : "border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {SYSTEMS[k].label}
            </button>
          ))}
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground">
          <span className="text-clinical font-bold">▲</span> increased &nbsp;
          <span className="text-destructive font-bold">▼</span> decreased &nbsp;
          <span className="text-muted-foreground font-bold">◆</span> mixed / unchanged
        </p>
      </div>
    </div>
    </DiagramFigure>
  );
};

export default PregnancyPhysiologyDiagram;
