import { useState } from "react";

/**
 * JetVentilationDiagram — three modalities (supraglottic, subglottic, transtracheal)
 * shown over a shared larynx/trachea schematic, with a parameters & safety side panel.
 */

type Mode = "supraglottic" | "subglottic" | "transtracheal";

interface Profile {
  label: string;
  device: string;
  driverPressure: string;
  rate: string;
  iTime: string;
  fiO2: string;
  pearls: string[];
  hazards: string[];
}

const PROFILES: Record<Mode, Profile> = {
  supraglottic: {
    label: "Supraglottic — Sanders injector",
    device:
      "16 G cannula or rigid laryngoscope side-port aimed down the glottic axis. High-pressure O₂ source (≈4 bar / 400 kPa wall outlet) entrains room air by the Venturi effect.",
    driverPressure: "1–4 bar (titrate from low)",
    rate: "10–20 breaths · min⁻¹ (low-frequency)",
    iTime: "I:E ≈ 1:2 (long expiration is mandatory)",
    fiO2: "0.3–0.6 (entrainment dilutes O₂)",
    pearls: [
      "Surgeon and anaesthetist watch the chest rise on every breath",
      "Pause jet for any laser firing in the line of beam",
      "TIVA only — no volatile, no scavenging",
    ],
    hazards: [
      "Gastric insufflation if jet aimed off-axis",
      "Misalignment → hypoventilation rather than barotrauma",
      "Cannot measure ETCO₂ reliably",
    ],
  },
  subglottic: {
    label: "Subglottic — Hunsaker / laser-jet catheter",
    device:
      "Self-centring small-bore catheter sited below the cords through the surgical laryngoscope. Separate insufflation and monitoring lumens allow distal CO₂ and airway-pressure sampling.",
    driverPressure: "1.5–3 bar",
    rate: "100–150 min⁻¹ (high-frequency jet ventilation, HFJV)",
    iTime: "I:E 1:2 or longer; small VT (1–3 mL · kg⁻¹)",
    fiO2: "0.3–1.0 (no entrainment if catheter centred)",
    pearls: [
      "Distal pressure monitoring is mandatory — auto-stops on overpressure",
      "Catheter must be centred so the expiratory pathway around it stays open",
      "Far less surgical-field movement than low-frequency jetting",
    ],
    hazards: [
      "Catheter migration into a bronchus → unilateral barotrauma",
      "Subglottic stenosis or web obstructing exhalation → gas trapping",
      "Mucosal drying / cold-gas tracheitis without humidification",
    ],
  },
  transtracheal: {
    label: "Transtracheal — emergency cricothyroid jet",
    device:
      "14 G cannula through the cricothyroid membrane connected via a Sanders injector or Manujet to a 4 bar O₂ source. A bridge to definitive airway in CICO.",
    driverPressure: "1–4 bar (start low — 1 bar in children)",
    rate: "10–12 min⁻¹ initially, observing chest rise",
    iTime: "I:E ≥ 1:4 — exhalation must occur via the upper airway",
    fiO2: "≈ 1.0",
    pearls: [
      "Confirm cannula intratracheal (free aspiration of air) before jetting",
      "Maintain upper airway patency — jaw thrust, oral airway",
      "Convert to surgical airway as soon as practical (DAS 2015)",
    ],
    hazards: [
      "Barotrauma & surgical emphysema if upper airway is obstructed (no exit)",
      "Catheter kinking or displacement during ventilation",
      "Tension pneumothorax — high-pressure source + closed glottis",
    ],
  },
};

const JetVentilationDiagram = () => {
  const [mode, setMode] = useState<Mode>("supraglottic");
  const p = PROFILES[mode];

  return (
            <div className="my-6 p-4 rounded-xl border border-border bg-card">
      <div className="mb-3">
        <h3 className="text-lg font-serif font-bold text-foreground">Jet ventilation — modalities, set-up & safety</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Three jet-ventilation strategies share a common safety principle: a high-pressure
          inspiratory source paired with a guaranteed low-resistance expiratory pathway.
        </p>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        {(Object.keys(PROFILES) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
              mode === m
                ? "bg-clinical text-white border-clinical"
                : "bg-background text-muted-foreground border-border hover:border-clinical/50"
            }`}
          >
            {PROFILES[m].label.split(" — ")[0]}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-4 items-start">
        {/* Schematic */}
        <div className="rounded-lg border border-border bg-background p-2">
          <svg viewBox="0 0 360 320" className="w-full h-auto" role="img" aria-label={`${p.label} schematic`}>
            {/* Head/neck silhouette */}
            <path
              d="M 120 20 Q 200 10 240 50 Q 260 90 245 130 L 230 145 L 230 175 Q 230 195 240 200 L 330 220 L 330 260 L 230 260 L 230 305 L 130 305 L 130 260 L 30 260 L 30 220 L 120 200 Q 130 195 130 175 L 130 145 L 115 130 Q 100 90 120 50 Z"
              fill="hsl(25 35% 90%)"
              stroke="hsl(25 25% 50%)"
              strokeWidth="1"
            />
            {/* Mouth */}
            <ellipse cx="180" cy="115" rx="22" ry="5" fill="hsl(0 50% 35%)" />
            {/* Larynx + trachea outline */}
            <path d="M 165 130 L 165 220 Q 165 245 175 245 L 185 245 Q 195 245 195 220 L 195 130 Z"
              fill="hsl(0 0% 98%)" stroke="hsl(0 0% 30%)" strokeWidth="1" />
            {/* Vocal cords */}
            <line x1="165" y1="148" x2="180" y2="155" stroke="hsl(0 0% 30%)" strokeWidth="1.5" />
            <line x1="195" y1="148" x2="180" y2="155" stroke="hsl(0 0% 30%)" strokeWidth="1.5" />
            {/* Cricothyroid membrane marker */}
            <line x1="165" y1="170" x2="195" y2="170" stroke="hsl(280 40% 50%)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="200" y="173" fontSize="8" fill="hsl(280 40% 45%)">cricothyroid m.</text>
            {/* Carina */}
            <line x1="180" y1="245" x2="155" y2="280" stroke="hsl(0 0% 30%)" strokeWidth="1" />
            <line x1="180" y1="245" x2="205" y2="280" stroke="hsl(0 0% 30%)" strokeWidth="1" />

            {/* Mode-specific overlay */}
            {mode === "supraglottic" && (
              <g>
                {/* Sanders injector aimed at glottis */}
                <rect x="60" y="100" width="80" height="10" fill="hsl(0 0% 30%)" />
                <polygon points="140,95 165,140 165,118 145,108" fill="hsl(200 70% 55%)" opacity="0.7" />
                {/* Entrained air arrows */}
                <path d="M 110 80 Q 130 95 145 105" stroke="hsl(140 50% 45%)" strokeWidth="1.5" fill="none" markerEnd="url(#ar1)" />
                <path d="M 110 130 Q 130 120 145 113" stroke="hsl(140 50% 45%)" strokeWidth="1.5" fill="none" markerEnd="url(#ar1)" />
                <text x="55" y="92" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">4 bar O₂</text>
                <text x="40" y="155" fontSize="9" fill="hsl(140 50% 35%)">+ entrained air</text>
                {/* Expiratory pathway up through glottis */}
                <path d="M 175 220 Q 175 180 180 130 Q 180 120 200 115" stroke="hsl(0 70% 50%)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                <text x="208" y="115" fontSize="9" fill="hsl(0 70% 45%)">expiration ↑</text>
              </g>
            )}

            {mode === "subglottic" && (
              <g>
                {/* Catheter through glottis sitting below cords */}
                <line x1="180" y1="115" x2="180" y2="210" stroke="hsl(220 60% 45%)" strokeWidth="3" />
                {/* Distal jet */}
                <polygon points="180,210 172,225 188,225" fill="hsl(220 70% 55%)" opacity="0.85" />
                {/* Pressure-monitoring lumen tag */}
                <circle cx="180" cy="115" r="5" fill="hsl(220 60% 35%)" />
                <line x1="185" y1="115" x2="240" y2="80" stroke="hsl(220 60% 35%)" strokeWidth="0.75" />
                <text x="245" y="80" fontSize="9" fill="hsl(220 60% 35%)" fontWeight="600">distal P + ETCO₂</text>
                {/* Expiratory annular flow around catheter */}
                <path d="M 168 220 Q 165 180 168 145 Q 170 130 185 120" stroke="hsl(0 70% 50%)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                <path d="M 192 220 Q 195 180 192 145" stroke="hsl(0 70% 50%)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                <text x="120" y="200" fontSize="9" fill="hsl(0 70% 45%)">annular expiration</text>
                <text x="35" y="260" fontSize="9" fill="hsl(220 60% 35%)" fontWeight="600">100–150 min⁻¹ HFJV</text>
              </g>
            )}

            {mode === "transtracheal" && (
              <g>
                {/* 14G cannula through cricothyroid */}
                <line x1="120" y1="170" x2="178" y2="178" stroke="hsl(0 70% 45%)" strokeWidth="3" />
                <polygon points="178,178 170,170 170,186" fill="hsl(0 70% 45%)" />
                <rect x="100" y="165" width="20" height="10" fill="hsl(0 0% 25%)" />
                <text x="35" y="160" fontSize="9" fill="hsl(0 70% 45%)" fontWeight="600">14 G + Manujet</text>
                {/* Inspiration arrow */}
                <path d="M 110 170 Q 130 175 175 180" stroke="hsl(220 70% 45%)" strokeWidth="1.5" fill="none" markerEnd="url(#ar1)" />
                {/* MANDATORY upper airway exit */}
                <path d="M 180 200 Q 180 160 180 130 Q 180 120 200 115" stroke="hsl(140 60% 40%)" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                <text x="208" y="110" fontSize="9" fill="hsl(140 60% 40%)" fontWeight="600">upper-airway exit MUST be patent</text>
                {/* Warning if not */}
                <text x="35" y="290" fontSize="9" fill="hsl(0 75% 45%)" fontWeight="600">No exit → tension PTX in seconds</text>
              </g>
            )}

            <defs>
              <marker id="ar1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill="currentColor" />
              </marker>
            </defs>

            <text x="10" y="18" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">{p.label}</text>
          </svg>
        </div>

        {/* Side panel */}
        <div className="space-y-2">
          <div className="p-3 rounded-lg border border-clinical/30 bg-clinical/5">
            <p className="text-sm font-bold text-foreground">Set-up</p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">{p.device}</p>
            <div className="grid grid-cols-2 gap-1.5 mt-2 text-[11px]">
              <div className="bg-background border border-border rounded px-2 py-1">
                <span className="text-muted-foreground">Driver: </span>
                <span className="text-foreground font-medium">{p.driverPressure}</span>
              </div>
              <div className="bg-background border border-border rounded px-2 py-1">
                <span className="text-muted-foreground">Rate: </span>
                <span className="text-foreground font-medium">{p.rate}</span>
              </div>
              <div className="bg-background border border-border rounded px-2 py-1">
                <span className="text-muted-foreground">I:E / VT: </span>
                <span className="text-foreground font-medium">{p.iTime}</span>
              </div>
              <div className="bg-background border border-border rounded px-2 py-1">
                <span className="text-muted-foreground">FiO₂: </span>
                <span className="text-foreground font-medium">{p.fiO2}</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
              <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Pearls</p>
              <ul className="space-y-1">
                {p.pearls.map((b, i) => (
                  <li key={i} className="text-[11px] text-muted-foreground leading-snug pl-3 relative">
                    <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-emerald-500" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-2.5 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-[11px] font-semibold text-destructive mb-1">Hazards</p>
              <ul className="space-y-1">
                {p.hazards.map((b, i) => (
                  <li key={i} className="text-[11px] text-muted-foreground leading-snug pl-3 relative">
                    <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-destructive" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-2.5 rounded bg-secondary/40 border border-border text-[11px] text-muted-foreground">
            <strong className="text-foreground">Universal safety rule: </strong>
            never deliver a jet breath unless the expiratory pathway is verified open.
            Start at the lowest driving pressure, deliver a single test breath while watching
            the chest, then escalate. Continuous SpO₂, capnography (where possible) and
            visual chest-rise observation are mandatory; bilateral chest auscultation between
            sets detects the silent unilateral pneumothorax before it tensions.
          </div>
        </div>
      </div>
    </div>
  );
};

export default JetVentilationDiagram;
