import { useState } from "react";

type Stage = 0 | 1 | 2;

const STAGES: { title: string; subtitle: string; bullets: string[] }[] = [
  {
    title: "1. Pre-division",
    subtitle: "Translaryngeal armoured tube in situ",
    bullets: [
      "Reinforced oral ETT through larynx into mid-trachea",
      "FiO₂ 1.0, TIVA running, paralysis maintained",
      "Sterile armoured tube + long circuit primed on the field",
      "Surgeon confirms readiness before tracheal division",
    ],
  },
  {
    title: "2. Tracheal division",
    subtitle: "Tube withdrawn under direct vision; trachea opened",
    bullets: [
      "Surgeon divides trachea below cricoid",
      "Anaesthetist withdraws ETT under vision to just above the cut",
      "Brief apnoea — pre-oxygenated, SpO₂ monitored",
      "Cuff deflated before withdrawal to avoid mucosal trauma",
    ],
  },
  {
    title: "3. Stomal intubation",
    subtitle: "Sterile armoured tube into distal trachea from the field",
    bullets: [
      "Surgeon inserts cuffed armoured tube into distal trachea stump",
      "Long sterile circuit handed off the drapes & connected",
      "Confirm bilateral ventilation + capnography",
      "Original oral ETT removed completely; secure stomal tube",
    ],
  },
];

const LaryngectomyAirwayHandoverDiagram = () => {
  const [stage, setStage] = useState<Stage>(0);

  // Anatomy palette
  const skin = "hsl(25 40% 85%)";
  const skinStroke = "hsl(25 30% 55%)";
  const tissue = "hsl(350 30% 70%)";
  const tracheaFill = "hsl(0 0% 96%)";
  const tracheaStroke = "hsl(0 0% 35%)";
  const ringFill = "hsl(0 0% 88%)";
  const tumour = "hsl(280 50% 45%)";
  const tubeOral = "hsl(220 70% 45%)";
  const tubeStomal = "hsl(142 60% 35%)";
  const cuff = "hsl(45 90% 55%)";
  const drapeColor = "hsl(200 50% 35%)";

  return (
    <div className="my-6 p-4 rounded-xl border border-border bg-card">
      <div className="mb-3">
        <h3 className="text-lg font-serif font-bold text-foreground">
          Laryngectomy — Intra-operative Airway Hand-over
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Three-step transition from translaryngeal ETT to a sterile stomal armoured tube once the trachea is divided.
        </p>
      </div>

      {/* Stage selector */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {STAGES.map((s, i) => (
          <button
            key={i}
            onClick={() => setStage(i as Stage)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
              stage === i
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 items-start">
        {/* SVG */}
        <div className="rounded-lg border border-border bg-background p-2">
          <svg viewBox="0 0 400 400" className="w-full h-auto" role="img" aria-label="Laryngectomy airway hand-over diagram">
            {/* Head silhouette (top) */}
            <path
              d="M 130 20 Q 130 0 200 0 Q 270 0 270 20 L 270 80 Q 270 110 240 115 L 160 115 Q 130 110 130 80 Z"
              fill={skin}
              stroke={skinStroke}
              strokeWidth="1.5"
            />
            {/* Mouth */}
            <ellipse cx="200" cy="55" rx="22" ry="6" fill="hsl(0 40% 35%)" />
            {/* Nose hint */}
            <path d="M 195 30 Q 200 40 205 30" fill="none" stroke={skinStroke} strokeWidth="1" />

            {/* Neck soft tissue */}
            <path
              d="M 150 110 L 150 230 Q 150 260 200 260 Q 250 260 250 230 L 250 110 Z"
              fill={tissue}
              opacity="0.6"
              stroke={skinStroke}
              strokeWidth="1"
            />

            {/* Larynx (cricoid + thyroid cartilage) — only present in stage 0 (still in body before resection conceptually intact) */}
            <g>
              <rect x="183" y="115" width="34" height="40" rx="6" fill={ringFill} stroke={tracheaStroke} strokeWidth="1" />
              <rect x="185" y="155" width="30" height="14" rx="3" fill={ringFill} stroke={tracheaStroke} strokeWidth="1" />
              {/* tumour */}
              <ellipse cx="205" cy="135" rx="9" ry="11" fill={tumour} opacity={stage === 2 ? 0.15 : 0.85} />
            </g>

            {/* Trachea */}
            <rect x="186" y="170" width="28" height="120" fill={tracheaFill} stroke={tracheaStroke} strokeWidth="1" />
            {/* Tracheal rings */}
            {[180, 195, 210, 225, 240, 255, 270].map((y) => (
              <line key={y} x1="186" y1={y} x2="214" y2={y} stroke={tracheaStroke} strokeWidth="0.75" opacity="0.6" />
            ))}

            {/* Division line — visible in stages 1 & 2 */}
            {stage >= 1 && (
              <>
                <line x1="170" y1="220" x2="230" y2="220" stroke="hsl(0 80% 50%)" strokeWidth="2" strokeDasharray="3 2" />
                <text x="234" y="223" fontSize="9" fill="hsl(0 80% 50%)" fontWeight="600">division</text>
              </>
            )}

            {/* Stage 2 — gap between proximal & distal trachea */}
            {stage === 2 && (
              <rect x="186" y="215" width="28" height="14" fill="hsl(var(--background))" stroke="none" />
            )}

            {/* Surgical drape (stages 1 & 2) */}
            {stage >= 1 && (
              <>
                <rect x="0" y="280" width="400" height="120" fill={drapeColor} opacity="0.18" />
                <line x1="0" y1="280" x2="400" y2="280" stroke={drapeColor} strokeWidth="1" strokeDasharray="4 3" />
                <text x="8" y="295" fontSize="9" fill={drapeColor} fontWeight="600">sterile field ↓</text>
              </>
            )}

            {/* === ORAL TUBE === */}
            {stage === 0 && (
              <g>
                {/* tube goes from above mouth → through larynx → mid trachea */}
                <path
                  d="M 200 -10 L 200 55 Q 200 90 200 130 L 200 270"
                  stroke={tubeOral}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* lumen */}
                <path
                  d="M 200 -10 L 200 270"
                  stroke="hsl(220 50% 75%)"
                  strokeWidth="3"
                  fill="none"
                />
                {/* cuff */}
                <ellipse cx="200" cy="255" rx="11" ry="6" fill={cuff} stroke={tracheaStroke} strokeWidth="0.75" />
                <text x="270" y="50" fontSize="10" fill={tubeOral} fontWeight="700">Oral armoured ETT</text>
                <line x1="265" y1="48" x2="212" y2="50" stroke={tubeOral} strokeWidth="0.75" />
              </g>
            )}

            {stage === 1 && (
              <g>
                {/* tube withdrawn — tip now just above division */}
                <path
                  d="M 200 -10 L 200 55 Q 200 90 200 130 L 200 210"
                  stroke={tubeOral}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <path d="M 200 -10 L 200 210" stroke="hsl(220 50% 75%)" strokeWidth="3" fill="none" />
                {/* cuff deflated — flat */}
                <ellipse cx="200" cy="200" rx="6" ry="3" fill={cuff} opacity="0.5" stroke={tracheaStroke} strokeWidth="0.5" />
                <text x="270" y="190" fontSize="10" fill={tubeOral} fontWeight="700">ETT withdrawn</text>
                <text x="270" y="202" fontSize="9" fill={tubeOral}>(cuff deflated)</text>
                <line x1="265" y1="195" x2="212" y2="208" stroke={tubeOral} strokeWidth="0.75" />

                {/* upward arrow */}
                <path d="M 175 250 L 175 220 M 170 225 L 175 220 L 180 225" stroke={tubeOral} strokeWidth="1.5" fill="none" />
                <text x="140" y="245" fontSize="9" fill={tubeOral} fontWeight="600">withdraw</text>
              </g>
            )}

            {stage === 2 && (
              <g>
                {/* Oral tube fully removed (faded ghost) */}
                <path
                  d="M 200 -10 L 200 55 Q 200 90 200 130 L 200 200"
                  stroke={tubeOral}
                  strokeWidth="3"
                  fill="none"
                  opacity="0.12"
                  strokeLinecap="round"
                />
                <text x="265" y="100" fontSize="10" fill={tubeOral} opacity="0.6" fontWeight="600">oral ETT removed</text>

                {/* === STOMAL TUBE === enters from the surgical field (right side) */}
                <path
                  d="M 380 340 Q 320 320 270 290 Q 240 270 215 245 L 200 240 L 200 290"
                  stroke={tubeStomal}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* lumen */}
                <path
                  d="M 380 340 Q 320 320 270 290 Q 240 270 215 245 L 200 240 L 200 290"
                  stroke="hsl(142 50% 75%)"
                  strokeWidth="3"
                  fill="none"
                />
                {/* cuff inflated in distal trachea */}
                <ellipse cx="200" cy="265" rx="13" ry="7" fill={cuff} stroke={tracheaStroke} strokeWidth="0.75" />
                {/* connector to circuit */}
                <rect x="372" y="332" width="22" height="14" rx="3" fill={tubeStomal} />
                <text x="240" y="370" fontSize="10" fill={tubeStomal} fontWeight="700">Sterile armoured tube</text>
                <text x="240" y="382" fontSize="9" fill={tubeStomal}>→ long circuit off drapes</text>

                {/* downward arrow into stoma */}
                <path d="M 235 220 L 215 240 M 218 235 L 215 240 L 220 240" stroke={tubeStomal} strokeWidth="1.5" fill="none" />
              </g>
            )}

            {/* Carina — right main bronchus more vertical & wider (~25° from midline),
                left more horizontal (~45°); origins at the same carinal level. */}
            <path d="M 186 290 L 162 332" stroke={tracheaStroke} strokeWidth="1.5" fill="none" />
            <path d="M 214 290 L 232 332" stroke={tracheaStroke} strokeWidth="2" fill="none" />
            <text x="140" y="345" fontSize="8" fill={tracheaStroke}>L bronchus</text>
            <text x="225" y="345" fontSize="8" fill={tracheaStroke}>R bronchus</text>

            {/* Stage label */}
            <text x="10" y="18" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">
              Stage {stage + 1} of 3
            </text>
          </svg>
        </div>

        {/* Stage details */}
        <div className="space-y-2">
          <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
            <p className="text-sm font-bold text-foreground">{STAGES[stage].title}</p>
            <p className="text-xs text-muted-foreground italic mt-0.5">{STAGES[stage].subtitle}</p>
          </div>
          <ul className="space-y-1.5">
            {STAGES[stage].bullets.map((b, i) => (
              <li key={i} className="text-xs text-muted-foreground leading-relaxed pl-4 relative">
                <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-3 p-2.5 rounded bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
            <strong className="text-foreground">Pitfall: </strong>
            do not advance the original oral ETT into the divided distal trachea — it is no longer sterile. Always use the surgeon's prepared armoured tube from the field.
          </div>
          <div className="p-2.5 rounded bg-secondary/40 border border-border text-xs text-muted-foreground">
            <strong className="text-foreground">Communication: </strong>
            announce "ready to withdraw" before division and "ventilating via stomal tube, EtCO₂ confirmed" after the swap so the team has a shared mental model.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaryngectomyAirwayHandoverDiagram;
