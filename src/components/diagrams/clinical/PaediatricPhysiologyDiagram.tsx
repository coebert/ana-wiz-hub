import { useState } from "react";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Interactive comparison of paediatric physiology vs adult, by age band.
 * Click a system on the silhouette (or chip row) to see system-specific
 * values for neonate / infant / child and the key anaesthetic implication.
 *
 * Conforms to STYLE_GUIDE.md: DiagramToggleBar header, prefixed defs ids
 * (pdp-), radial depth gradient, drop-shadow on the silhouette, default
 * selection, left-border detail panel keyed to system.
 */

type SystemKey =
  | "airway"
  | "resp"
  | "cvs"
  | "haem"
  | "renal"
  | "neuro"
  | "thermo"
  | "pharma";

type AgeKey = "neonate" | "infant" | "child" | "adult";

interface Row {
  name: string;
  values: Record<AgeKey, string>;
}

interface SystemInfo {
  label: string;
  region: SystemKey;
  color: string;
  rows: Row[];
  implication: string;
}

const REGION_COLOR: Record<SystemKey, string> = {
  airway: "hsl(280, 55%, 55%)",
  resp: "hsl(200, 70%, 50%)",
  cvs: "hsl(0, 70%, 55%)",
  haem: "hsl(340, 65%, 50%)",
  renal: "hsl(45, 80%, 45%)",
  neuro: "hsl(260, 55%, 55%)",
  thermo: "hsl(30, 80%, 55%)",
  pharma: "hsl(160, 55%, 45%)",
};

const AGE_LABEL: Record<AgeKey, string> = {
  neonate: "Neonate",
  infant: "Infant",
  child: "Child",
  adult: "Adult",
};

const AGE_DETAIL: Record<AgeKey, string> = {
  neonate: "<28 d / ~3.5 kg",
  infant: "1–12 mo / ~5–10 kg",
  child: "1–12 yr / ~10–40 kg",
  adult: "≥16 yr / ~70 kg",
};

const SYSTEMS: Record<SystemKey, SystemInfo> = {
  airway: {
    label: "Airway",
    region: "airway",
    color: REGION_COLOR.airway,
    rows: [
      { name: "Larynx position", values: { neonate: "C3–4 (high, anterior)", infant: "C3–4", child: "C4–5", adult: "C5–6" } },
      { name: "Narrowest point", values: { neonate: "Cricoid (subglottic)", infant: "Cricoid", child: "Cricoid → glottis ~8 yr", adult: "Glottis (vocal cords)" } },
      { name: "Tongue : oral cavity", values: { neonate: "Relatively large", infant: "Large", child: "Adult-like by 8 yr", adult: "Standard" } },
      { name: "Epiglottis", values: { neonate: "Long, stiff, omega-shaped", infant: "Floppy", child: "Adult-like by 8 yr", adult: "Flat, flexible" } },
      { name: "Occiput", values: { neonate: "Prominent → neck flexed", infant: "Prominent", child: "Adult by ~8 yr", adult: "Flat" } },
    ],
    implication:
      "Neutral 'sniffing' position needs a shoulder roll (not a head pillow) under <2 yr. Straight (Miller) blade lifts the floppy epiglottis. Cuffed micro-cuff ETT now accepted from term neonates; classic uncuffed formula (age/4 + 4) only if uncuffed.",
  },
  resp: {
    label: "Respiratory",
    region: "resp",
    color: REGION_COLOR.resp,
    rows: [
      { name: "Respiratory rate", values: { neonate: "40–60 /min", infant: "30–40", child: "20–30 (5 yr) → 16 (12 yr)", adult: "12–16" } },
      { name: "Tidal volume", values: { neonate: "6–8 ml/kg", infant: "6–8 ml/kg", child: "6–8 ml/kg", adult: "6–8 ml/kg" } },
      { name: "O₂ consumption", values: { neonate: "6–8 ml/kg/min", infant: "6 ml/kg/min", child: "5 ml/kg/min", adult: "3–4 ml/kg/min" } },
      { name: "FRC : closing capacity", values: { neonate: "FRC < CC (airway closure in tidal breathing)", infant: "FRC ≈ CC", child: "FRC > CC by ~6 yr", adult: "FRC > CC" } },
      { name: "Apnoea desaturation", values: { neonate: "<30 s to SpO₂ 90%", infant: "<60 s", child: "1–2 min", adult: "3–5 min (after preO₂)" } },
      { name: "Diaphragm type-I fibres", values: { neonate: "~25% (fatigues quickly)", infant: "30%", child: "Adult ~6 yr", adult: "55%" } },
    ],
    implication:
      "Apnoeic window is tiny — pre-oxygenate, plan for rapid desaturation. PEEP 5 cmH₂O routinely to prevent airway closure. Spontaneous ventilation with poor lung mechanics fatigues the neonatal diaphragm — controlled ventilation safer for any prolonged anaesthetic.",
  },
  cvs: {
    label: "Cardiovascular",
    region: "cvs",
    color: REGION_COLOR.cvs,
    rows: [
      { name: "Heart rate (awake)", values: { neonate: "120–160 /min", infant: "100–140", child: "80–110 (5 yr) → 70–100 (12 yr)", adult: "60–100" } },
      { name: "Systolic BP", values: { neonate: "60–80 mmHg", infant: "70–95", child: "80–110 → 100–120", adult: "100–130" } },
      { name: "Cardiac output", values: { neonate: "200 ml/kg/min (rate-dependent)", infant: "150 ml/kg/min", child: "100 ml/kg/min", adult: "70 ml/kg/min" } },
      { name: "Circulating volume", values: { neonate: "85–90 ml/kg", infant: "80 ml/kg", child: "75 ml/kg", adult: "65–70 ml/kg" } },
      { name: "Baroreflex / vagal tone", values: { neonate: "Immature; vagal predominance", infant: "Vagal predominance", child: "Maturing", adult: "Mature" } },
    ],
    implication:
      "Cardiac output is rate-dependent — bradycardia is a peri-arrest emergency. Atropine 20 µg/kg (min 100 µg) for vagally-mediated bradycardia (e.g. on intubation, suxamethonium, traction). Hypotension = late sign of hypovolaemia; capillary refill and HR change first.",
  },
  haem: {
    label: "Haematology",
    region: "haem",
    color: REGION_COLOR.haem,
    rows: [
      { name: "Haemoglobin (mean)", values: { neonate: "165 g/L (HbF ~70%)", infant: "100–110 g/L (physiological nadir 8–12 wk)", child: "115–135 g/L", adult: "130–170 g/L" } },
      { name: "Hb-O₂ affinity (P50)", values: { neonate: "Left-shifted (HbF, P50 ~19 mmHg)", infant: "Shifting right", child: "Adult", adult: "P50 ~27 mmHg" } },
      { name: "Vit-K dependent factors", values: { neonate: "Low at birth → IM Vit K", infant: "Normalised", child: "Normal", adult: "Normal" } },
      { name: "Allowable blood loss (Hb 80 → 70)", values: { neonate: "Calculated per case (small EBV → small ABL)", infant: "Small", child: "Larger", adult: "Large" } },
    ],
    implication:
      "Estimated blood volume × (Hbstart − Hbtarget)/Hbmean = allowable loss; in a 3 kg neonate even 30 ml is significant. HbF shifts dissociation curve left → SpO₂ overestimates oxygen delivery in early infancy. Always weigh swabs and use micro-sampling.",
  },
  renal: {
    label: "Renal & GI",
    region: "renal",
    color: REGION_COLOR.renal,
    rows: [
      { name: "GFR (corrected for BSA)", values: { neonate: "~30% adult", infant: "50–80%", child: "Adult by ~2 yr", adult: "100% (~120 ml/min/1.73 m²)" } },
      { name: "Concentrating ability", values: { neonate: "Limited (max ~600 mOsm/kg)", infant: "Improving", child: "Adult ~2 yr", adult: "1200 mOsm/kg" } },
      { name: "Total body water", values: { neonate: "75–80% body wt", infant: "65–70%", child: "60%", adult: "55–60%" } },
      { name: "Glycogen stores", values: { neonate: "Limited — hypoglycaemia risk", infant: "Improving", child: "Adequate", adult: "Adequate" } },
      { name: "Gastric emptying", values: { neonate: "Variable; reflux common", infant: "Improving", child: "Adult-like", adult: "Adult" } },
    ],
    implication:
      "Use isotonic fluids (0.9% NaCl or balanced salt) — APA 2007/NHS England safety alert against hypotonic maintenance fluids. Add 1–2.5% dextrose for neonates/infants and check glucose. Maintenance: 4-2-1 rule by weight.",
  },
  neuro: {
    label: "Neurological",
    region: "neuro",
    color: REGION_COLOR.neuro,
    rows: [
      { name: "MAC (sevoflurane)", values: { neonate: "3.3%", infant: "3.2% (peaks 1–6 mo)", child: "2.5% (5 yr)", adult: "1.8–2.0%" } },
      { name: "BBB permeability", values: { neonate: "Increased", infant: "Maturing", child: "Adult by ~1 yr", adult: "Mature" } },
      { name: "Spinal cord ends", values: { neonate: "L3", infant: "L3 → L1 by 1 yr", child: "L1", adult: "L1" } },
      { name: "Dural sac ends", values: { neonate: "S3–4", infant: "S2–3", child: "S2", adult: "S2" } },
      { name: "Myelination", values: { neonate: "Incomplete", infant: "Active", child: "Largely complete by 2 yr", adult: "Complete" } },
    ],
    implication:
      "Caudal block landmark (sacral hiatus) is reliable up to ~6 yr. Choose a higher inter-space (L4/5 or L5/S1) for spinal in neonates because the cord ends lower. Apnoea risk in ex-preterm infants <60 weeks post-conceptual age — admit for ≥12 h overnight monitoring.",
  },
  thermo: {
    label: "Thermoregulation",
    region: "thermo",
    color: REGION_COLOR.thermo,
    rows: [
      { name: "Surface area : weight", values: { neonate: "3× adult", infant: "2.5×", child: "1.5×", adult: "Reference" } },
      { name: "Heat production", values: { neonate: "Non-shivering (brown fat)", infant: "Brown fat + shivering", child: "Shivering", adult: "Shivering" } },
      { name: "Cold stress response", values: { neonate: "↑ O₂ use, metabolic acidosis, hypoglycaemia", infant: "Significant", child: "Tolerated", adult: "Tolerated" } },
      { name: "Skin water loss", values: { neonate: "High (esp preterm)", infant: "Moderate", child: "Adult", adult: "Reference" } },
    ],
    implication:
      "Pre-warm theatre (≥24 °C for neonates, ≥21 °C for older children — AAGBI 2016). Forced-air warming, warm fluids, humidified circuit. Continuous core temperature monitoring for any case >30 min. Hypothermia → coagulopathy, delayed emergence, ↑ sepsis risk.",
  },
  pharma: {
    label: "Pharmacology",
    region: "pharma",
    color: REGION_COLOR.pharma,
    rows: [
      { name: "Total body water", values: { neonate: "75–80% (↑ Vd water-soluble)", infant: "65–70%", child: "60%", adult: "55–60%" } },
      { name: "Albumin / α1-AGP", values: { neonate: "Low → ↑ free fraction", infant: "Approaching adult", child: "Adult", adult: "Reference" } },
      { name: "Hepatic enzymes (CYP)", values: { neonate: "Immature (esp CYP3A4)", infant: "Maturing 6–12 mo", child: "Adult (or higher) by 1–2 yr", adult: "Mature" } },
      { name: "Suxamethonium dose", values: { neonate: "2 mg/kg IV (or 4 mg/kg IM)", infant: "2 mg/kg", child: "1.5 mg/kg", adult: "1–1.5 mg/kg" } },
      { name: "Paracetamol (oral, max)", values: { neonate: "20 mg/kg load, 10–15 mg/kg q6h (lower in preterm)", infant: "20 mg/kg q6h", child: "15–20 mg/kg q4–6h (max 90 mg/kg/d)", adult: "1 g q4–6h (max 4 g/d)" } },
    ],
    implication:
      "Higher mg/kg dose of water-soluble drugs (sux, propofol, NMBs); lower mg/kg of lipid-soluble drugs in neonates (immature BBB and hepatic clearance). Always check a paediatric formulary (BNFc) — calculate, double-check, and write in micrograms where small volumes risk errors.",
  },
};

const ORDER: SystemKey[] = ["airway", "resp", "cvs", "haem", "renal", "neuro", "thermo", "pharma"];
const AGE_ORDER: AgeKey[] = ["neonate", "infant", "child", "adult"];

export const PaediatricPhysiologyDiagram = () => {
  const [selected, setSelected] = useState<SystemKey>("resp");
  const [showLabels, setShowLabels] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);

  const info = SYSTEMS[selected];
  const isSel = (k: SystemKey) => selected === k;
  const opacity = (k: SystemKey) => (isSel(k) ? 1 : 0.55);

  // Hotspot configuration on infant silhouette
  const HOTSPOTS: Record<SystemKey, { cx: number; cy: number; r: number }> = {
    airway: { cx: 200, cy: 95, r: 18 },
    resp: { cx: 200, cy: 175, r: 30 },
    cvs: { cx: 175, cy: 175, r: 20 },
    haem: { cx: 235, cy: 200, r: 16 },
    renal: { cx: 200, cy: 250, r: 22 },
    neuro: { cx: 200, cy: 55, r: 22 },
    thermo: { cx: 145, cy: 220, r: 14 },
    pharma: { cx: 255, cy: 250, r: 16 },
  };

  return (
    <DiagramFigure
      id="paediatric-physiology-diagram"
      title="Paediatric physiology"
      description="Auto-generated wrapper for the Paediatric physiology anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
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
              aria-label="Infant silhouette with clickable systems comparing neonate, infant and child physiology to adult"
            >
              <defs>
                <radialGradient id="pdp-depth" cx="50%" cy="50%" r="65%">
                  <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0" />
                  <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.3" />
                </radialGradient>
                <pattern id="pdp-skin" patternUnits="userSpaceOnUse" width="6" height="6">
                  <circle cx="3" cy="3" r="0.5" fill="hsl(30, 40%, 40%)" opacity="0.25" />
                </pattern>
                <filter id="pdp-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.25" />
                </filter>
              </defs>
  
              {/* Infant silhouette — larger head:body ratio, prominent occiput */}
              <g filter="url(#pdp-shadow)">
                {/* Head — proportionally large */}
                <ellipse cx="200" cy="70" rx="48" ry="50" fill="url(#pdp-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
                {/* Prominent occiput hint */}
                <path d="M 152 70 Q 145 80 152 95" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.5" />
                {/* Short neck */}
                <path d="M 185 115 Q 200 122 215 115 L 218 132 Q 200 138 182 132 Z" fill="url(#pdp-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
                {/* Torso — short, rounded, prominent abdomen */}
                <path
                  d="M 160 138 Q 148 175 152 220 Q 158 265 175 290 Q 200 300 225 290 Q 245 265 250 220 Q 252 175 240 138 Q 220 130 200 130 Q 180 130 160 138 Z"
                  fill="url(#pdp-skin)"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                />
                {/* Hips */}
                <path d="M 170 290 Q 162 315 170 340 Q 200 348 230 340 Q 238 315 230 290 Z" fill="url(#pdp-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
                {/* Short, chubby legs */}
                <path d="M 178 340 L 175 430 L 195 432 L 198 340 Z" fill="url(#pdp-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
                <path d="M 202 340 L 205 432 L 225 430 L 222 340 Z" fill="url(#pdp-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
                {/* Arms */}
                <path d="M 152 145 Q 130 175 130 220 L 145 222 Q 152 180 165 155 Z" fill="url(#pdp-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
                <path d="M 248 145 Q 270 175 270 220 L 255 222 Q 248 180 235 155 Z" fill="url(#pdp-skin)" stroke="hsl(var(--border))" strokeWidth="1" />
                {/* Spine */}
                <path d="M 200 138 Q 198 200 200 285 Q 200 320 200 340" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
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
                  <text x="245" y="55" opacity={opacity("neuro")}>Neuro</text>
                  <text x="245" y="100" opacity={opacity("airway")}>Airway</text>
                  <text x="280" y="180" opacity={opacity("resp")}>Resp</text>
                  <text x="115" y="180" textAnchor="end" opacity={opacity("cvs")}>CVS</text>
                  <text x="295" y="205" opacity={opacity("haem")}>Haem</text>
                  <text x="105" y="225" textAnchor="end" opacity={opacity("thermo")}>Thermo</text>
                  <text x="245" y="255" opacity={opacity("renal")}>Renal/GI</text>
                  <text x="305" y="255" opacity={opacity("pharma")}>Pharma</text>
                </g>
              )}
  
              <rect x="0" y="0" width="400" height="540" fill="url(#pdp-depth)" pointerEvents="none" />
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
  
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-1.5 pr-2 text-muted-foreground font-medium">Variable</th>
                      {AGE_ORDER.map((a) => (
                        <th
                          key={a}
                          className="text-left py-1.5 pr-2 font-semibold text-foreground whitespace-nowrap"
                          title={AGE_DETAIL[a]}
                        >
                          {AGE_LABEL[a]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {info.rows.map((r) => (
                      <tr key={r.name} className="border-b border-border/60 align-top">
                        <td className="py-1.5 pr-2 text-muted-foreground">{r.name}</td>
                        {AGE_ORDER.map((a) => (
                          <td
                            key={a}
                            className={`py-1.5 pr-2 ${a === "adult" ? "text-muted-foreground italic" : "text-foreground"}`}
                          >
                            {r.values[a]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
  
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
            Adult column shown <span className="italic">in italics</span> as the reference. Hover an age header for the age band definition.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PaediatricPhysiologyDiagram;
