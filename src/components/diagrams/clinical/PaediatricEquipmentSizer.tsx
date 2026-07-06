import { useMemo, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Mode = "age" | "weight";

interface EquipmentRow {
  category: string;
  item: string;
  value: string;
  formula: string;
  note: string;
  color: string;
}

interface DrugRow {
  drug: string;
  indication: string;
  dose: string;
  formula: string;
  note: string;
  color: string;
}

/**
 * Paediatric airway equipment sizer + WETFLAG-style emergency drug doses.
 * APLS 2021 / RCH Melbourne / Broselow-aligned formulae.
 * Drives all calculations from age (years) or measured weight (kg).
 */
const PaediatricEquipmentSizer = () => {
  const [mode, setMode] = useState<Mode>("age");
  const [age, setAge] = useState<number>(4);
  const [measuredWeight, setMeasuredWeight] = useState<number>(16);

  // APLS 2021 weight estimation
  const estimatedWeight = useMemo(() => {
    if (age < 1) return Math.round((0.5 * 6 + 4) * 10) / 10; // assume 6 mo if <1 yr
    if (age < 5) return 2 * age + 8;
    return 3 * age + 7;
  }, [age]);

  const w = mode === "age" ? estimatedWeight : measuredWeight;
  // Approximate age from weight (3*age+7 rearranged) for tube/length sizing when in weight-mode
  const a = mode === "age" ? age : Math.max(0.1, Math.round(((measuredWeight - 7) / 3) * 10) / 10);

  // ===== Airway / equipment sizing =====
  const ettUncuffed = +(a / 4 + 4).toFixed(1);
  const ettCuffed = +(a / 4 + 3.5).toFixed(1);
  const ettLengthOral = +(a / 2 + 12).toFixed(1);
  const ettLengthNasal = +(a / 2 + 15).toFixed(1);

  // Laryngoscope blade selection (RCH Melbourne)
  const blade = useMemo(() => {
    if (w < 3) return "Miller 0 (straight)";
    if (a < 1) return "Miller 1 (straight)";
    if (a < 2) return "Miller 1 / Mac 1";
    if (a < 6) return "Mac 2";
    if (a < 12) return "Mac 2–3";
    return "Mac 3";
  }, [w, a]);

  // LMA size by weight
  const lma = useMemo(() => {
    if (w < 5) return "Size 1 (≤5 kg) — cuff 4 mL";
    if (w < 10) return "Size 1.5 (5–10 kg) — cuff 7 mL";
    if (w < 20) return "Size 2 (10–20 kg) — cuff 10 mL";
    if (w < 30) return "Size 2.5 (20–30 kg) — cuff 14 mL";
    if (w < 50) return "Size 3 (30–50 kg) — cuff 20 mL";
    if (w < 70) return "Size 4 (50–70 kg) — cuff 30 mL";
    return "Size 5 (>70 kg) — cuff 40 mL";
  }, [w]);

  // i-gel by weight
  const igel = useMemo(() => {
    if (w < 5) return "Size 1 (2–5 kg)";
    if (w < 12) return "Size 1.5 (5–12 kg)";
    if (w < 25) return "Size 2 (10–25 kg)";
    if (w < 35) return "Size 2.5 (25–35 kg)";
    if (w < 60) return "Size 3 (30–60 kg)";
    if (w < 90) return "Size 4 (50–90 kg)";
    return "Size 5 (>90 kg)";
  }, [w]);

  // Suction catheter — French = ETT × 2
  const suctionFr = Math.round(ettUncuffed * 2);
  // NG/OG tube — French ≈ ETT × 2 (round to nearest even)
  const ngFr = Math.max(5, 2 * Math.round(ettUncuffed));
  // Urinary catheter — French ≈ (age/2) + 8, min 5, even sizes
  const urinaryFrRaw = a / 2 + 8;
  const urinaryFr = Math.max(6, 2 * Math.round(urinaryFrRaw / 2));
  // IV cannula
  const cannula = w < 5 ? "24G" : w < 10 ? "22G" : w < 25 ? "22G–20G" : w < 50 ? "20G–18G" : "18G–16G";
  // IO needle (EZ-IO)
  const ioNeedle = w < 3 ? "15 mm pink (3–39 kg also OK)" : w < 40 ? "15 mm pink" : "25 mm blue";
  // Defib pads
  const defibPads = w < 10 || a < 1 ? "Paediatric pads (anteroposterior if overlap)" : "Adult pads";
  // Chest drain
  const chestDrain = useMemo(() => {
    if (w < 5) return "8–12 Fr";
    if (w < 10) return "12–16 Fr";
    if (w < 20) return "16–20 Fr";
    if (w < 40) return "20–24 Fr";
    return "24–28 Fr";
  }, [w]);

  const equipment: EquipmentRow[] = [
    {
      category: "Airway",
      item: "ETT — uncuffed",
      value: `${ettUncuffed} mm`,
      formula: "age/4 + 4",
      note: `Length at lips ${ettLengthOral} cm. Have ½ size above & below ready.`,
      color: "hsl(220 70% 50%)",
    },
    {
      category: "Airway",
      item: "ETT — cuffed (microcuff)",
      value: `${ettCuffed} mm`,
      formula: "age/4 + 3.5",
      note: `Now first-line in any age. Cuff pressure <20 cmH₂O. Nasal length ${ettLengthNasal} cm.`,
      color: "hsl(220 70% 50%)",
    },
    {
      category: "Airway",
      item: "Laryngoscope blade",
      value: blade,
      formula: "Age-based",
      note: "Straight blade lifts the floppy infant epiglottis directly; switch to Macintosh ≥2 yr.",
      color: "hsl(220 70% 50%)",
    },
    {
      category: "Airway",
      item: "LMA classic",
      value: lma,
      formula: "Weight-banded",
      note: "Avoid in full stomach, poor compliance, prone surgery. Inflate cuff to just achieve a seal — keep cuff pressure ≤40 cmH₂O (lower volumes than the maximum on the device) to limit pharyngeal mucosal injury.",
      color: "hsl(220 70% 50%)",
    },
    {
      category: "Airway",
      item: "i-gel",
      value: igel,
      formula: "Weight-banded",
      note: "Preferred SAD in paediatric resus (no cuff inflation). Lubricate gastric port.",
      color: "hsl(220 70% 50%)",
    },
    {
      category: "Airway",
      item: "Suction catheter",
      value: `${suctionFr} Fr`,
      formula: "ETT × 2",
      note: "Yankauer for oropharynx; soft catheter through ETT — no deeper than ETT length.",
      color: "hsl(220 70% 50%)",
    },
    {
      category: "Access",
      item: "IV cannula",
      value: cannula,
      formula: "Weight-banded",
      note: "Two attempts max in resus — escalate to IO at 90 sec. EMLA/Ametop pre-elective.",
      color: "hsl(0 70% 50%)",
    },
    {
      category: "Access",
      item: "IO needle (EZ-IO)",
      value: ioNeedle,
      formula: "Weight-banded",
      note: "Proximal tibia 1st-line <6 yr. Confirm with aspirate, flush 10 mL, secure with EZ-Stabilizer.",
      color: "hsl(0 70% 50%)",
    },
    {
      category: "Drainage",
      item: "Nasogastric tube",
      value: `${ngFr} Fr`,
      formula: "≈ ETT × 2",
      note: "Length: nose → ear → xiphoid. Confirm with pH <5.5 (NEX); CXR if any doubt.",
      color: "hsl(142 60% 40%)",
    },
    {
      category: "Drainage",
      item: "Urinary catheter",
      value: `${urinaryFr} Fr`,
      formula: "(age/2) + 8, even sizes",
      note: "Foley with 3 mL balloon <10 kg, 5 mL >10 kg. Lubricate, sterile technique.",
      color: "hsl(142 60% 40%)",
    },
    {
      category: "Drainage",
      item: "Chest drain",
      value: chestDrain,
      formula: "Weight-banded",
      note: "Smaller pigtail (8–14 Fr) for pneumothorax; larger for haemothorax/empyema. 4th–5th ICS, MAL.",
      color: "hsl(142 60% 40%)",
    },
    {
      category: "Resus",
      item: "Defibrillator pads",
      value: defibPads,
      formula: "<10 kg / <1 yr → paeds",
      note: "Energy 4 J/kg for VF/pVT; 1 J/kg for first synchronised cardioversion (2 J/kg if needed).",
      color: "hsl(35 90% 45%)",
    },
  ];

  // ===== WETFLAG-style emergency drugs =====
  const drugs: DrugRow[] = [
    {
      drug: "Adrenaline (cardiac arrest)",
      indication: "VF/pVT/asystole/PEA",
      dose: `${Math.round(10 * w)} µg = ${(0.1 * w).toFixed(2)} mL of 1:10 000`,
      formula: "10 µg/kg IV/IO",
      note: "Every 3–5 min. Avoid endotracheal route.",
      color: "hsl(0 80% 50%)",
    },
    {
      drug: "Adrenaline (anaphylaxis IM)",
      indication: "Anaphylaxis",
      dose: w < 30 ? `${Math.round(10 * w)} µg IM (1:1000)` : "300–500 µg IM (1:1000)",
      formula: "10 µg/kg IM (max 500 µg)",
      note: "Anterolateral mid-thigh. Repeat at 5 min if no response.",
      color: "hsl(0 80% 50%)",
    },
    {
      drug: "Atropine",
      indication: "Bradycardia, pre-intubation",
      dose: `${Math.max(100, Math.round(20 * w))} µg (min 100 µg)`,
      formula: "20 µg/kg IV (min 100, max 600)",
      note: "Bradycardia in children = haemodynamic emergency. Treat the cause (hypoxia first).",
      color: "hsl(35 90% 45%)",
    },
    {
      drug: "Amiodarone",
      indication: "Shockable arrest after 3rd shock",
      dose: `${Math.round(5 * w)} mg IV/IO`,
      formula: "5 mg/kg (max 300 mg)",
      note: "Bolus after 3rd & 5th shock. Run with flush.",
      color: "hsl(35 90% 45%)",
    },
    {
      drug: "Fluid bolus",
      indication: "Shock (non-trauma)",
      dose: `${Math.round(10 * w)} mL balanced crystalloid`,
      formula: "10 mL/kg",
      note: "APLS 2021 — reduced from 20 mL/kg post-FEAST. Up to 20 mL/kg in trauma.",
      color: "hsl(200 70% 50%)",
    },
    {
      drug: "Glucose 10%",
      indication: "Hypoglycaemia (<3 mmol/L)",
      dose: `${Math.round(2 * w)} mL = ${(0.2 * w).toFixed(1)} g`,
      formula: "2 mL/kg of 10%",
      note: "Avoid 50% (osmolar injury). Recheck BM at 10 min.",
      color: "hsl(142 60% 40%)",
    },
    {
      drug: "Lorazepam",
      indication: "Status epilepticus (IV)",
      dose: `${Math.min(4, +(0.1 * w).toFixed(2))} mg IV`,
      formula: "0.1 mg/kg (max 4 mg)",
      note: "Repeat once at 10 min if persisting.",
      color: "hsl(280 60% 50%)",
    },
    {
      drug: "Midazolam (buccal)",
      indication: "Status — no IV",
      dose: `${Math.min(10, +(0.3 * w).toFixed(2))} mg buccal`,
      formula: "0.3 mg/kg (max 10 mg)",
      note: "First-line if no IV. Squirt half each cheek.",
      color: "hsl(280 60% 50%)",
    },
    {
      drug: "Levetiracetam",
      indication: "2nd-line status",
      dose: `${Math.round(40 * w)} mg IV`,
      formula: "40 mg/kg (max 2.5 g)",
      note: "EcLiPSE/ConSEPT trials — equivalent to phenytoin, fewer adverse effects.",
      color: "hsl(280 60% 50%)",
    },
    {
      drug: "Salbutamol (IV)",
      indication: "Severe asthma",
      dose: `${Math.round(15 * w)} µg IV bolus over 10 min`,
      formula: "15 µg/kg",
      note: "Then 1–5 µg/kg/min infusion. Monitor K⁺ & lactate.",
      color: "hsl(190 70% 45%)",
    },
    {
      drug: "Magnesium sulfate",
      indication: "Severe asthma / torsades",
      dose: `${(50 * w / 1000).toFixed(2)} g IV over 20 min`,
      formula: "50 mg/kg (max 2 g)",
      note: "Watch for hypotension; have calcium ready.",
      color: "hsl(190 70% 45%)",
    },
    {
      drug: "Hydrocortisone",
      indication: "Asthma / anaphylaxis / adrenal crisis",
      dose: w < 6 ? `25 mg IV` : w < 12 ? `50 mg IV` : w < 18 ? `100 mg IV` : `200 mg IV`,
      formula: "Age-banded BNFc",
      note: "Onset 4–6 h — give early, but doesn't replace adrenaline in anaphylaxis.",
      color: "hsl(35 90% 45%)",
    },
    {
      drug: "Naloxone",
      indication: "Opioid toxicity",
      dose: `${(10 * w).toFixed(0)} µg IV`,
      formula: "10 µg/kg (titrate to RR)",
      note: "Repeat to effect. Half-life shorter than most opioids — infusion often needed.",
      color: "hsl(15 80% 50%)",
    },
    {
      drug: "Defib energy",
      indication: "VF/pVT",
      dose: `${Math.round(4 * w)} J`,
      formula: "4 J/kg",
      note: "Same energy each shock. Synchronised cardioversion: 1 then 2 J/kg.",
      color: "hsl(0 80% 50%)",
    },
  ];

  const categories = ["Airway", "Access", "Drainage", "Resus"] as const;

  return (
    <DiagramFigure
      id="paediatric-equipment-sizer"
      title="Paediatric equipment sizer"
      description="Auto-generated wrapper for the Paediatric equipment sizer anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 p-4 rounded-xl border border-border bg-card">
        <div className="mb-3">
          <h3 className="text-lg font-serif font-bold text-foreground">
            Paediatric Equipment Sizer + Emergency Drug Doses
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            APLS 2021 / BNFc / RCH Melbourne. Enter age <em>or</em> measured weight — all sizes & doses recompute live.
            Designed for the resus trolley wall and the anaesthetic check.
          </p>
        </div>
  
        {/* Input panel */}
        <div className="p-3 rounded-lg border border-border bg-secondary/30 mb-4">
          <div className="flex flex-wrap gap-1.5 mb-3 text-xs">
            {(["age", "weight"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`px-3 py-1 rounded border transition-colors ${
                  mode === m
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {m === "age" ? "Estimate from age" : "Use measured weight"}
              </button>
            ))}
          </div>
  
          <div className="grid sm:grid-cols-2 gap-3">
            {mode === "age" ? (
              <div>
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Age (years)</span>
                  <span className="text-primary font-mono">{age < 1 ? "<1 yr" : `${age} yr`}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={14}
                  step={1}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full mt-1 accent-primary"
                />
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Estimated weight: <span className="font-mono text-foreground">{estimatedWeight} kg</span> ({age < 1 ? "(0.5 × mo) + 4, assumes 6 mo" : age < 5 ? "(2 × age) + 8" : "(3 × age) + 7"})
                </p>
              </div>
            ) : (
              <div>
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Measured weight (kg)</span>
                  <span className="text-primary font-mono">{measuredWeight} kg</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  step={0.5}
                  value={measuredWeight}
                  onChange={(e) => setMeasuredWeight(Math.max(0.5, Number(e.target.value) || 0))}
                  className="w-full mt-1 px-2 py-1 rounded border border-border bg-background text-sm"
                />
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Inferred age for tube/length: <span className="font-mono text-foreground">{a < 1 ? "<1" : a} yr</span>
                </p>
              </div>
            )}
  
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Working weight</p>
                <p className="text-lg font-bold font-mono text-foreground">{w} kg</p>
              </div>
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Defib energy</p>
                <p className="text-lg font-bold font-mono text-destructive">{Math.round(4 * w)} J</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Equipment by category */}
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Airway & Equipment Sizing</h4>
          {categories.map((cat) => {
            const rows = equipment.filter((e) => e.category === cat);
            if (!rows.length) return null;
            return (
                  <div key={cat}>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{cat}</p>
                <div className="grid md:grid-cols-2 gap-1.5">
                  {rows.map((row) => (
                    <div
                      key={row.item}
                      className="p-2.5 rounded-lg border border-border bg-background"
                      style={{ borderLeftWidth: 3, borderLeftColor: row.color }}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground">{row.item}</p>
                        <p className="text-sm font-bold font-mono" style={{ color: row.color }}>
                          {row.value}
                        </p>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">Formula: {row.formula}</p>
                      <p className="text-xs text-muted-foreground/90 mt-1 leading-snug">{row.note}</p>
                    </div>
                  ))}
                </div>
              </div>
    );
          })}
        </div>
  
        {/* Emergency drugs */}
        <div className="space-y-1.5">
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Emergency Drug Doses (WETFLAG+)</h4>
          <div className="grid md:grid-cols-2 gap-1.5">
            {drugs.map((d) => (
              <div
                key={d.drug}
                className="p-2.5 rounded-lg border border-border bg-background"
                style={{ borderLeftWidth: 3, borderLeftColor: d.color }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">{d.drug}</p>
                  <p className="text-sm font-bold font-mono text-right" style={{ color: d.color }}>
                    {d.dose}
                  </p>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5 italic">{d.indication}</p>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">Formula: {d.formula}</p>
                <p className="text-xs text-muted-foreground/90 mt-1 leading-snug">{d.note}</p>
              </div>
            ))}
          </div>
        </div>
  
        <div className="mt-3 p-2.5 rounded bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
          <strong className="text-foreground">Clinical use: </strong>
          Calculate at the start of every paediatric list and on PICU/ED admission. Always cross-check with a Broselow tape or
          measured weight when available — estimates may be inaccurate in obesity, prematurity, or syndromic children.
          Cuffed microcuff ETTs are now first-line at any age; have ½ size above and below ready.
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PaediatricEquipmentSizer;
