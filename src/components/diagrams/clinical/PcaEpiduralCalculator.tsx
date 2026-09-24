import { useMemo, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * PCA + Epidural Prescribing Calculator
 *
 * Adult & paediatric variants. All doses follow APM/RCoA Acute Pain SIG guidance,
 * APAGBI Good Practice in Postoperative & Procedural Pain (2012/2021), and
 * the Royal Children's Hospital Melbourne PCA/NCA & epidural protocols.
 *
 * NOT for opioid-tolerant or chronic-pain patients — those require specialist review.
 */

type Population = "adult" | "paeds";
type PcaOpioid = "morphine" | "fentanyl" | "oxycodone";
type PcaMode = "pca" | "nca"; // PCA = patient-controlled, NCA = nurse-controlled
type EpiduralLA = "levobupi-0125-fent2" | "levobupi-01-fent2" | "bupi-0125-fent2" | "ropi-02";

const round = (n: number, dp = 1) => {
  const f = Math.pow(10, dp);
  return Math.round(n * f) / f;
};

// PCA/NCA bolus (per kg in paeds, fixed in adults), lockout, 4-h max
const PCA_PROTOCOLS: Record<PcaOpioid, {
  label: string;
  adult: { bolus: string; lockout: number; background: string; max4h: string };
  paedsBolusPerKg: number; // mg/kg or µg/kg
  paedsBolusUnit: "mg" | "µg";
  paedsLockout: number;
  paedsMax4hPerKg: number; // mg/kg or µg/kg
  paedsBackgroundPerKgHr?: number;
  concentration: string;
  notes: string;
}> = {
  morphine: {
    label: "Morphine",
    adult: { bolus: "1 mg", lockout: 5, background: "0 (default)", max4h: "30 mg" },
    paedsBolusPerKg: 0.02, // 20 µg/kg
    paedsBolusUnit: "mg",
    paedsLockout: 5,
    paedsMax4hPerKg: 0.4,
    paedsBackgroundPerKgHr: 0.004, // 4 µg/kg/h optional
    concentration: "1 mg/mL (50 mg in 50 mL 0.9% saline)",
    notes: "Avoid background infusion in opioid-naive adults. Caution in renal impairment (M6G accumulates).",
  },
  fentanyl: {
    label: "Fentanyl",
    adult: { bolus: "20 µg", lockout: 5, background: "0 (default)", max4h: "300 µg" },
    paedsBolusPerKg: 0.5, // µg/kg
    paedsBolusUnit: "µg",
    paedsLockout: 5,
    paedsMax4hPerKg: 5,
    paedsBackgroundPerKgHr: 0.5,
    concentration: "10 µg/mL (500 µg in 50 mL 0.9% saline)",
    notes: "Preferred in renal impairment. Shorter duration → tighter titration. Risk of chest-wall rigidity at high doses.",
  },
  oxycodone: {
    label: "Oxycodone",
    adult: { bolus: "1 mg", lockout: 5, background: "0 (default)", max4h: "30 mg" },
    paedsBolusPerKg: 0.02,
    paedsBolusUnit: "mg",
    paedsLockout: 5,
    paedsMax4hPerKg: 0.4,
    concentration: "1 mg/mL (50 mg in 50 mL 0.9% saline)",
    notes: "Useful when morphine intolerance; ~1.5× potency PO. IV PCA practice less standardised than morphine.",
  },
};

const EPIDURAL_SOLUTIONS: Record<EpiduralLA, { label: string; adultRate: string; paedsRatePerKgHr: number; maxRatePerKgHr: number; notes: string }> = {
  "levobupi-0125-fent2": {
    label: "Levobupivacaine 0.125% + fentanyl 2 µg/mL",
    adultRate: "4–10 mL/h",
    paedsRatePerKgHr: 0.3,
    maxRatePerKgHr: 0.4,
    notes: "Standard adult thoracic/lumbar mix. Adjust by dermatomes covered.",
  },
  "levobupi-01-fent2": {
    label: "Levobupivacaine 0.1% + fentanyl 2 µg/mL",
    adultRate: "6–12 mL/h",
    paedsRatePerKgHr: 0.3,
    maxRatePerKgHr: 0.4,
    notes: "Lower concentration favours sensory block, preserves motor — good for thoracic epidurals & ambulation.",
  },
  "bupi-0125-fent2": {
    label: "Bupivacaine 0.125% + fentanyl 2 µg/mL",
    adultRate: "4–10 mL/h",
    paedsRatePerKgHr: 0.3,
    maxRatePerKgHr: 0.4,
    notes: "Levobupivacaine preferred (lower cardiotoxicity) where available.",
  },
  "ropi-02": {
    label: "Ropivacaine 0.2% (no opioid)",
    adultRate: "4–8 mL/h",
    paedsRatePerKgHr: 0.2,
    maxRatePerKgHr: 0.4,
    notes: "Useful when avoiding opioid (e.g. OSA, day-case). Preferred LA in some paediatric protocols.",
  },
};

const PcaEpiduralCalculator = () => {
  const [pop, setPop] = useState<Population>("adult");
  const [weight, setWeight] = useState<number>(70);
  const [age, setAge] = useState<number>(5);
  const [opioid, setOpioid] = useState<PcaOpioid>("morphine");
  const [mode, setMode] = useState<PcaMode>("pca");
  const [withBackground, setWithBackground] = useState<boolean>(false);
  const [epLA, setEpLA] = useState<EpiduralLA>("levobupi-0125-fent2");

  // Auto-derived paediatric weight estimate (APLS, kept simple)
  const estPaedsWeight = useMemo(() => {
    if (age < 1) return 7;
    if (age < 5) return 2 * age + 8;
    return 3 * age + 7;
  }, [age]);

  const w = pop === "paeds" ? weight : weight;

  // Set sensible default weight when toggling
  const switchPop = (p: Population) => {
    setPop(p);
    if (p === "adult" && weight < 30) setWeight(70);
    if (p === "paeds" && weight > 50) setWeight(estPaedsWeight);
  };

  const proto = PCA_PROTOCOLS[opioid];
  const isNCA = mode === "nca";

  // Paeds bolus calculation
  const paedsBolus = round(proto.paedsBolusPerKg * w, proto.paedsBolusUnit === "µg" ? 1 : 2);
  const paedsMax4h = round(proto.paedsMax4hPerKg * w, proto.paedsBolusUnit === "µg" ? 0 : 1);
  const paedsBackground = proto.paedsBackgroundPerKgHr
    ? round(proto.paedsBackgroundPerKgHr * w, proto.paedsBolusUnit === "µg" ? 1 : 2)
    : 0;

  // Epidural
  const ep = EPIDURAL_SOLUTIONS[epLA];
  const paedsEpRate = round(ep.paedsRatePerKgHr * w, 2);
  const paedsEpMaxRate = round(ep.maxRatePerKgHr * w, 2);
  // Bupivacaine max safe rate in paeds: 0.4 mg/kg/h (>6 mo), 0.2 mg/kg/h (<6 mo / neonate)
  const isInfant = pop === "paeds" && age < 0.5;
  const maxBupiMgPerKgHr = isInfant ? 0.2 : 0.4;
  const bupiMgPerMl = epLA.includes("0125") ? 1.25 : epLA.includes("01-fent") ? 1.0 : epLA.includes("ropi-02") ? 2.0 : 1.25;
  const maxRateFromLAToxicity = round((maxBupiMgPerKgHr * w) / bupiMgPerMl, 2);

  return (
    <DiagramFigure
      id="pca-epidural-calculator"
      title="PCA epidural"
      description="PCA calculator: enter patient values to compute the score step by step, with the interpretation thresholds and clinical actions FRCA and FFICM candidates should know."
    >
              <div className="my-6 p-4 rounded-xl border border-border bg-card">
        <div className="mb-3">
          <h3 className="text-lg font-serif font-bold text-foreground">PCA / NCA + Epidural Prescribing Calculator</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            APM/RCoA Acute Pain SIG, APAGBI 2012/2021 and RCH Melbourne protocols. Opioid-naive postoperative patients only —
            opioid-tolerant or chronic-pain patients need specialist review.
          </p>
        </div>
  
        {/* Population + weight */}
        <div className="p-3 rounded-lg border border-border bg-secondary/30 mb-4">
          <div className="flex flex-wrap gap-1.5 mb-3 text-xs">
            {(["adult", "paeds"] as Population[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => switchPop(p)}
                aria-pressed={pop === p}
                className={`px-3 py-1 rounded border transition-colors ${
                  pop === p ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {p === "adult" ? "Adult" : "Paediatric"}
              </button>
            ))}
          </div>
  
          <div className="grid sm:grid-cols-2 gap-3">
            {pop === "paeds" && (
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
                  onChange={(e) => {
                    const a = Number(e.target.value);
                    setAge(a);
                    const w = a < 1 ? 7 : a < 5 ? 2 * a + 8 : 3 * a + 7;
                    setWeight(w);
                  }}
                  className="w-full mt-1 accent-primary"
                />
                <p className="text-[10px] text-muted-foreground mt-0.5">Estimated weight: {estPaedsWeight} kg (APLS)</p>
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Weight (kg)</span>
                <span className="text-primary font-mono">{weight} kg</span>
              </label>
              <input
                type="number"
                min={1}
                max={200}
                step={0.5}
                value={weight}
                onChange={(e) => setWeight(Math.max(1, Number(e.target.value) || 0))}
                className="w-full mt-1 px-2 py-1 rounded border border-border bg-background text-sm font-mono"
              />
            </div>
          </div>
        </div>
  
        {/* PCA */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
            {pop === "paeds" ? "PCA / NCA" : "PCA"} — IV opioid
          </h4>
  
          <div className="flex flex-wrap gap-1.5 mb-2 text-xs">
            {(Object.keys(PCA_PROTOCOLS) as PcaOpioid[]).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setOpioid(o)}
                aria-pressed={opioid === o}
                className={`px-2.5 py-1 rounded border transition-colors ${
                  opioid === o ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {PCA_PROTOCOLS[o].label}
              </button>
            ))}
            {pop === "paeds" && (
              <div className="ml-auto flex gap-1.5">
                {(["pca", "nca"] as PcaMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className={`px-2.5 py-1 rounded border transition-colors ${
                      mode === m ? "border-clinical bg-clinical/10 text-foreground" : "border-border text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    {m === "pca" ? "PCA (≥6 yr)" : "NCA (<6 yr)"}
                  </button>
                ))}
              </div>
            )}
          </div>
  
          {pop === "adult" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <PcaCard label="Bolus" value={proto.adult.bolus} />
              <PcaCard label="Lockout" value={`${proto.adult.lockout} min`} />
              <PcaCard label="Background" value={proto.adult.background} />
              <PcaCard label="4-h max" value={proto.adult.max4h} />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <PcaCard
                label={isNCA ? "NCA bolus" : "PCA bolus"}
                value={`${paedsBolus} ${proto.paedsBolusUnit}`}
                sub={`${proto.paedsBolusPerKg} ${proto.paedsBolusUnit}/kg`}
                highlight
              />
              <PcaCard label="Lockout" value={`${isNCA ? 15 : proto.paedsLockout} min`} sub={isNCA ? "NCA = longer lockout" : ""} />
              <PcaCard
                label="Background"
                value={
                  withBackground && proto.paedsBackgroundPerKgHr
                    ? `${paedsBackground} ${proto.paedsBolusUnit}/h`
                    : "0"
                }
                sub={withBackground && proto.paedsBackgroundPerKgHr ? `${proto.paedsBackgroundPerKgHr} ${proto.paedsBolusUnit}/kg/h` : "Default off"}
              />
              <PcaCard label="4-h max" value={`${paedsMax4h} ${proto.paedsBolusUnit}`} sub={`${proto.paedsMax4hPerKg} ${proto.paedsBolusUnit}/kg`} />
            </div>
          )}
  
          {pop === "paeds" && proto.paedsBackgroundPerKgHr && (
            <label className="flex items-start gap-2 text-[11px] text-foreground cursor-pointer mt-2">
              <input type="checkbox" checked={withBackground} onChange={(e) => setWithBackground(e.target.checked)} className="mt-0.5 accent-primary" />
              <span>
                Add background infusion (NCA, infants, or post-major surgery — increases risk of respiratory depression; use HDU-level monitoring).
              </span>
            </label>
          )}
  
          <p className="text-[11px] text-muted-foreground mt-2">
            <strong className="text-foreground">Concentration:</strong> {proto.concentration}.{" "}
            <strong className="text-foreground">Notes:</strong> {proto.notes}
          </p>
        </div>
  
        {/* Epidural */}
        <div>
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">Epidural infusion</h4>
          <select
            value={epLA}
            onChange={(e) => setEpLA(e.target.value as EpiduralLA)}
            className="w-full mb-2 px-2 py-1.5 rounded border border-border bg-background text-sm"
          >
            {Object.entries(EPIDURAL_SOLUTIONS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
  
          {pop === "adult" ? (
            <div className="grid sm:grid-cols-2 gap-2">
              <PcaCard label="Starting rate" value={ep.adultRate} highlight />
              <PcaCard label="Bolus (top-up)" value="3–5 mL of 0.25% bupi / levobupi" sub="By anaesthetist; reassess block height" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-2">
              <PcaCard
                label="Starting rate"
                value={`${paedsEpRate} mL/h`}
                sub={`${ep.paedsRatePerKgHr} mL/kg/h`}
                highlight
              />
              <PcaCard
                label="Maximum rate"
                value={`${paedsEpMaxRate} mL/h`}
                sub={`${ep.maxRatePerKgHr} mL/kg/h`}
              />
              <PcaCard
                label={`LA ceiling (${isInfant ? "<6 mo" : "≥6 mo"})`}
                value={`${maxRateFromLAToxicity} mL/h`}
                sub={`${maxBupiMgPerKgHr} mg/kg/h LA limit`}
                warn={paedsEpRate > maxRateFromLAToxicity}
              />
            </div>
          )}
  
          <p className="text-[11px] text-muted-foreground mt-2">
            <strong className="text-foreground">Notes:</strong> {ep.notes}{" "}
            {pop === "paeds" && (
              <>
                In neonates/infants &lt;6 months, halve the LA rate ({maxBupiMgPerKgHr} mg/kg/h ceiling) — reduced α₁-acid glycoprotein
                & immature hepatic metabolism increase free LA fraction.
              </>
            )}
          </p>
        </div>
  
        {/* Monitoring & safety */}
        <div className="mt-4 grid sm:grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded bg-secondary/30 border border-border text-muted-foreground">
            <strong className="text-foreground">PCA monitoring:</strong> hourly RR, sedation (UMSS), pain & nausea score for first 4 h then
            2-hourly. Naloxone 400 µg drawn up; oxygen at the bedside; one-way valve & anti-syphon line on PCA giving set.
            Avoid concurrent sedatives (gabapentinoids, benzos) — synergistic respiratory depression.
          </div>
          <div className="p-2.5 rounded bg-secondary/30 border border-border text-muted-foreground">
            <strong className="text-foreground">Epidural monitoring:</strong> hourly BP, HR, sedation, sensory level (Bromage motor score),
            catheter site check. NAP3 — alert for new motor block, back pain, or rising sensory level (epidural haematoma/abscess);
            urgent MRI if suspected. Daily LA-toxicity & catheter dressing review.
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

const PcaCard = ({
  label,
  value,
  sub,
  highlight,
  warn,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  warn?: boolean;
}) => (
      <div
    className={`p-2 rounded border ${
      warn
        ? "border-destructive/40 bg-destructive/5"
        : highlight
        ? "border-primary/40 bg-primary/5"
        : "border-border bg-background"
    }`}
  >
    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
    <p className={`text-base font-mono font-bold ${warn ? "text-destructive" : highlight ? "text-primary" : "text-foreground"}`}>
      {value}
    </p>
    {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
  </div>
  );

export default PcaEpiduralCalculator;
