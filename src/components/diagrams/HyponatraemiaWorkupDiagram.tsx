import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { RotateCcw } from "lucide-react";

type StepKey = "plasmaOsm" | "urineOsm" | "urineNa" | "volume";
type PlasmaOsm = "low" | "normalHigh";
type UrineOsm = "lt100" | "gte100";
type UrineNa = "lt20" | "gte30";
type Volume = "hypo" | "eu" | "hyper";

interface Diagnosis {
  id: string;
  label: string;
  category: "true" | "pseudo" | "translocational";
  causes: string[];
  management: string;
  color: string;
}

const diagnoses: Record<string, Diagnosis> = {
  pseudo: {
    id: "pseudo",
    label: "Pseudohyponatraemia",
    category: "pseudo",
    causes: [
      "Hyperlipidaemia, hyperproteinaemia (paraproteinaemia)",
      "Lab artefact — measured Na⁺ falsely low on indirect ISE",
    ],
    management: "Confirm with direct ion-selective electrode / blood-gas Na⁺. Treat underlying cause; no Na⁺ correction needed.",
    color: "hsl(45, 70%, 50%)",
  },
  translocational: {
    id: "translocational",
    label: "Translocational hyponatraemia",
    category: "translocational",
    causes: [
      "Hyperglycaemia (DKA / HHS) — water shifts from ICF to ECF",
      "Mannitol, glycine (TURP syndrome), maltose",
    ],
    management: "Correct hyperglycaemia or stop offending solute. Corrected Na⁺ ≈ measured + 2.4 × (glucose − 5.5)/5.5.",
    color: "hsl(30, 75%, 50%)",
  },
  primaryPolydipsia: {
    id: "primaryPolydipsia",
    label: "Primary polydipsia / low solute intake",
    category: "true",
    causes: [
      "Excessive water intake (>10 L/day) overwhelming dilutional capacity",
      "Beer potomania, 'tea-and-toast' diet (low solute → ↓ free water clearance)",
    ],
    management: "Fluid restriction. Slow correction (<8 mmol/L/24h) — high osmotic demyelination risk.",
    color: "hsl(195, 70%, 45%)",
  },
  hypovolaemic: {
    id: "hypovolaemic",
    label: "Hypovolaemic hyponatraemia",
    category: "true",
    causes: [
      "Renal losses (Una ≥ 30): diuretics (esp. thiazides), salt-wasting nephropathy, cerebral salt wasting, mineralocorticoid deficiency (Addison)",
      "Extra-renal losses (Una < 20): vomiting, diarrhoea, third-spacing, burns, sweating",
    ],
    management: "Restore volume with isotonic saline (0.9% NaCl). ADH suppression follows volume restoration → free water diuresis → risk of overcorrection.",
    color: "hsl(0, 70%, 55%)",
  },
  siadh: {
    id: "siadh",
    label: "SIADH",
    category: "true",
    causes: [
      "CNS: stroke, SAH, trauma, meningitis, tumour",
      "Pulmonary: pneumonia, TB, small-cell lung Ca (ectopic ADH)",
      "Drugs: SSRIs, carbamazepine, MDMA, vincristine, opioids",
      "Post-operative (pain, nausea, opioids, hypotonic IVF)",
    ],
    management: "Diagnosis of exclusion (euvolaemic, normal thyroid/cortisol, Uosm > Posm, Una > 30, low uric acid). Fluid restriction (800–1000 mL/d), tolvaptan, demeclocycline, hypertonic saline if symptomatic.",
    color: "hsl(270, 65%, 55%)",
  },
  endocrine: {
    id: "endocrine",
    label: "Hypothyroidism / cortisol deficiency",
    category: "true",
    causes: [
      "Severe hypothyroidism — ↓ CO and GFR, non-osmotic ADH release",
      "Glucocorticoid deficiency (secondary adrenal insufficiency) — loss of ADH suppression",
    ],
    management: "Replace hormone (levothyroxine / hydrocortisone). Often resolves rapidly — beware overcorrection.",
    color: "hsl(290, 60%, 55%)",
  },
  hypervolaemicLow: {
    id: "hypervolaemicLow",
    label: "Hypervolaemic — effective ↓ circulating volume",
    category: "true",
    causes: [
      "Congestive cardiac failure",
      "Cirrhosis with ascites",
      "Nephrotic syndrome",
    ],
    management: "Treat underlying disease. Fluid + Na⁺ restriction, loop diuretic, consider tolvaptan. Marker of poor prognosis.",
    color: "hsl(220, 70%, 50%)",
  },
  hypervolaemicHigh: {
    id: "hypervolaemicHigh",
    label: "Hypervolaemic — renal failure",
    category: "true",
    causes: [
      "Acute kidney injury / advanced CKD — impaired free water excretion",
    ],
    management: "Fluid restriction, loop diuretic, RRT if refractory.",
    color: "hsl(210, 65%, 45%)",
  },
};

const HyponatraemiaWorkupDiagram = () => {
  const [plasmaOsm, setPlasmaOsm] = useState<PlasmaOsm | null>(null);
  const [urineOsm, setUrineOsm] = useState<UrineOsm | null>(null);
  const [volume, setVolume] = useState<Volume | null>(null);
  const [urineNa, setUrineNa] = useState<UrineNa | null>(null);

  const reset = () => {
    setPlasmaOsm(null);
    setUrineOsm(null);
    setVolume(null);
    setUrineNa(null);
  };

  // Determine current step
  const currentStep: StepKey = useMemo(() => {
    if (plasmaOsm === null) return "plasmaOsm";
    if (plasmaOsm === "normalHigh") return "plasmaOsm"; // terminal
    if (urineOsm === null) return "urineOsm";
    if (urineOsm === "lt100") return "urineOsm"; // terminal (primary polydipsia)
    if (volume === null) return "volume";
    if (volume === "hypo") {
      return urineNa === null ? "urineNa" : "urineNa";
    }
    return "volume";
  }, [plasmaOsm, urineOsm, volume, urineNa]);

  // Determine diagnosis
  const diagnosis: Diagnosis | null = useMemo(() => {
    if (plasmaOsm === "normalHigh") {
      // Could be pseudo or translocational — let user pick a sub-option not modelled here; default to pseudo with note
      return diagnoses.pseudo;
    }
    if (urineOsm === "lt100") return diagnoses.primaryPolydipsia;
    if (volume === "hypo" && urineNa) return diagnoses.hypovolaemic;
    if (volume === "eu") return diagnoses.siadh;
    if (volume === "hyper") {
      // urineNa branches: <20 = CCF/cirrhosis/nephrotic; ≥30 = renal failure
      if (urineNa === "lt20") return diagnoses.hypervolaemicLow;
      if (urineNa === "gte30") return diagnoses.hypervolaemicHigh;
      return diagnoses.hypervolaemicLow;
    }
    return null;
  }, [plasmaOsm, urineOsm, volume, urineNa]);

  const showVolumeUrineNa = volume === "hypo" || volume === "hyper";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-muted-foreground">
          Plasma Na⁺ &lt; 135 mmol/L. Work through the algorithm step-by-step.
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted text-foreground text-xs font-semibold hover:bg-muted/70 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Progress chips */}
      <div className="flex flex-wrap gap-2 items-center text-xs">
        <Chip label="Plasma osm" value={plasmaOsm ? (plasmaOsm === "low" ? "Low" : "Normal/High") : null} active={currentStep === "plasmaOsm"} />
        <Arrow />
        <Chip label="Urine osm" value={urineOsm ? (urineOsm === "lt100" ? "<100" : "≥100") : null} active={currentStep === "urineOsm"} disabled={plasmaOsm !== "low"} />
        <Arrow />
        <Chip label="Volume status" value={volume ? volume === "hypo" ? "Hypo" : volume === "eu" ? "Eu" : "Hyper" : null} active={currentStep === "volume"} disabled={urineOsm !== "gte100"} />
        <Arrow />
        <Chip label="Urine Na⁺" value={urineNa ? (urineNa === "lt20" ? "<20" : "≥30") : null} active={currentStep === "urineNa"} disabled={!showVolumeUrineNa} />
      </div>

      {/* Step 1: Plasma osmolality */}
      <Step
        number={1}
        title="Measure plasma osmolality"
        helper="Normal: 275–295 mOsm/kg. Distinguishes true hypotonic hyponatraemia from pseudo / translocational."
        active={currentStep === "plasmaOsm"}
        completed={plasmaOsm !== null}
      >
        <div className="grid sm:grid-cols-2 gap-2">
          <Choice
            label="Low (< 275 mOsm/kg)"
            sublabel="True hypotonic hyponatraemia → continue"
            selected={plasmaOsm === "low"}
            onClick={() => { setPlasmaOsm("low"); setUrineOsm(null); setVolume(null); setUrineNa(null); }}
          />
          <Choice
            label="Normal or High (≥ 275)"
            sublabel="Pseudo- or translocational hyponatraemia"
            selected={plasmaOsm === "normalHigh"}
            onClick={() => { setPlasmaOsm("normalHigh"); setUrineOsm(null); setVolume(null); setUrineNa(null); }}
          />
        </div>
      </Step>

      {/* Step 2: Urine osmolality (only if plasma low) */}
      {plasmaOsm === "low" && (
        <Step
          number={2}
          title="Measure urine osmolality"
          helper="Distinguishes appropriate ADH suppression (dilute urine) from inappropriate ADH activity."
          active={currentStep === "urineOsm"}
          completed={urineOsm !== null}
        >
          <div className="grid sm:grid-cols-2 gap-2">
            <Choice
              label="< 100 mOsm/kg (dilute)"
              sublabel="Appropriate ADH suppression → primary polydipsia / low solute"
              selected={urineOsm === "lt100"}
              onClick={() => { setUrineOsm("lt100"); setVolume(null); setUrineNa(null); }}
            />
            <Choice
              label="≥ 100 mOsm/kg (concentrated)"
              sublabel="ADH activity present → assess volume status"
              selected={urineOsm === "gte100"}
              onClick={() => { setUrineOsm("gte100"); setVolume(null); setUrineNa(null); }}
            />
          </div>
        </Step>
      )}

      {/* Step 3: Volume status */}
      {urineOsm === "gte100" && (
        <Step
          number={3}
          title="Assess clinical volume status"
          helper="Clinical exam ± dynamic markers (CVP, IVC US, passive leg raise). Often the hardest step."
          active={currentStep === "volume"}
          completed={volume !== null}
        >
          <div className="grid sm:grid-cols-3 gap-2">
            <Choice
              label="Hypovolaemic"
              sublabel="Tachycardia, ↓ skin turgor, dry mucosa, postural ↓ BP"
              selected={volume === "hypo"}
              onClick={() => { setVolume("hypo"); setUrineNa(null); }}
            />
            <Choice
              label="Euvolaemic"
              sublabel="No oedema, normal JVP, normal BP"
              selected={volume === "eu"}
              onClick={() => { setVolume("eu"); setUrineNa(null); }}
            />
            <Choice
              label="Hypervolaemic"
              sublabel="Oedema, ↑ JVP, ascites, S3 gallop"
              selected={volume === "hyper"}
              onClick={() => { setVolume("hyper"); setUrineNa(null); }}
            />
          </div>
        </Step>
      )}

      {/* Step 4: Urine Na (for hypo and hyper paths) */}
      {showVolumeUrineNa && (
        <Step
          number={4}
          title="Measure urine sodium"
          helper={
            volume === "hypo"
              ? "Distinguishes renal vs extra-renal losses."
              : "Distinguishes effective volume depletion (CCF/cirrhosis/nephrotic) from primary renal failure."
          }
          active={currentStep === "urineNa"}
          completed={urineNa !== null}
        >
          <div className="grid sm:grid-cols-2 gap-2">
            <Choice
              label="< 20 mmol/L"
              sublabel={volume === "hypo" ? "Extra-renal Na⁺ loss (GI, skin, third-space)" : "Avid Na⁺ retention — CCF, cirrhosis, nephrotic"}
              selected={urineNa === "lt20"}
              onClick={() => setUrineNa("lt20")}
            />
            <Choice
              label="≥ 30 mmol/L"
              sublabel={volume === "hypo" ? "Renal Na⁺ loss — diuretics, CSW, Addison" : "Renal failure (AKI / advanced CKD)"}
              selected={urineNa === "gte30"}
              onClick={() => setUrineNa("gte30")}
            />
          </div>
        </Step>
      )}

      {/* Diagnosis output */}
      {diagnosis && (
        <div
          className="border-2 rounded-xl p-5 space-y-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
          style={{ borderColor: diagnosis.color, backgroundColor: diagnosis.color + "10" }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="text-xs font-bold text-white" style={{ backgroundColor: diagnosis.color }}>
              Diagnosis
            </Badge>
            <h3 className="text-lg font-serif font-bold text-foreground">{diagnosis.label}</h3>
            {plasmaOsm === "normalHigh" && (
              <Badge variant="outline" className="text-[10px]">
                Also consider translocational (hyperglycaemia, mannitol, glycine)
              </Badge>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Common causes</p>
            <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
              {diagnosis.causes.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Management</p>
            <p className="text-sm text-foreground leading-relaxed">{diagnosis.management}</p>
          </div>
          <div className="pt-2 border-t border-border/50 text-xs text-muted-foreground italic">
            ⚠ Correction rate: ≤ 8 mmol/L/24h in chronic hyponatraemia to avoid osmotic demyelination syndrome (central pontine myelinolysis).
          </div>
        </div>
      )}

      {/* SIADH note */}
      {volume === "eu" && diagnosis?.id === "siadh" && (
        <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-md border border-border">
          <strong>Before diagnosing SIADH:</strong> exclude hypothyroidism (TFTs) and adrenal insufficiency (cortisol). Both produce a near-identical biochemical picture and require hormone replacement, not fluid restriction.
        </div>
      )}
    </div>
  );
};

const Step = ({
  number, title, helper, active, completed, children,
}: {
  number: number; title: string; helper: string; active: boolean; completed: boolean; children: React.ReactNode;
}) => (
  <div
    className={`rounded-xl border p-4 transition-all ${
      active ? "border-primary/60 bg-primary/5 shadow-sm" : completed ? "border-border bg-card" : "border-border bg-card"
    }`}
  >
    <div className="flex items-start gap-3 mb-3">
      <div
        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
          completed ? "bg-primary text-primary-foreground" : active ? "bg-primary/20 text-primary border border-primary" : "bg-muted text-muted-foreground"
        }`}
      >
        {number}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{helper}</p>
      </div>
    </div>
    {children}
  </div>
);

const Choice = ({
  label, sublabel, selected, onClick,
}: { label: string; sublabel: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`text-left p-3 rounded-lg border-2 transition-all duration-200 ${
      selected
        ? "border-primary bg-primary/10 shadow-sm"
        : "border-border bg-background hover:border-primary/40 hover:bg-muted/40"
    }`}
  >
    <p className={`text-sm font-semibold ${selected ? "text-primary" : "text-foreground"}`}>{label}</p>
    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{sublabel}</p>
  </button>
);

const Chip = ({
  label, value, active, disabled,
}: { label: string; value: string | null; active: boolean; disabled?: boolean }) => (
  <span
    className={`px-2 py-1 rounded-md border text-[10px] font-semibold transition-all ${
      disabled
        ? "border-border/40 text-muted-foreground/40 bg-transparent"
        : value
        ? "border-primary bg-primary/10 text-primary"
        : active
        ? "border-primary/60 text-primary bg-primary/5 animate-pulse"
        : "border-border text-muted-foreground bg-transparent"
    }`}
  >
    {label}{value ? `: ${value}` : ""}
  </span>
);

const Arrow = () => <span className="text-muted-foreground/50 text-xs">→</span>;

export default HyponatraemiaWorkupDiagram;
