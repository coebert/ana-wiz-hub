import { useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/ToolShell";

interface Interpretation {
  primary: string;
  compensation: string;
  expected: string;
  anionGap?: string;
  notes: string[];
}

/** Boston-rules acid–base interpretation. pCO2 in kPa, HCO3 in mmol/L. */
function interpret({
  pH,
  pCO2,
  HCO3,
  Na,
  Cl,
}: {
  pH: number;
  pCO2: number;
  HCO3: number;
  Na?: number;
  Cl?: number;
}): Interpretation {
  // Convert kPa → mmHg for Boston compensation formulas
  const pCO2mmHg = pCO2 * 7.5;
  const notes: string[] = [];
  let primary = "";
  let compensation = "";
  let expected = "";

  const acidaemic = pH < 7.35;
  const alkalaemic = pH > 7.45;

  if (acidaemic) {
    if (pCO2mmHg > 45) {
      primary = "Respiratory acidosis";
      const expHCO3acute = 24 + (pCO2mmHg - 40) * 0.1;
      const expHCO3chronic = 24 + (pCO2mmHg - 40) * 0.35;
      expected = `Expected HCO₃⁻ acute ${expHCO3acute.toFixed(
        1
      )} / chronic ${expHCO3chronic.toFixed(1)} mmol/L`;
      compensation =
        HCO3 > expHCO3chronic + 2
          ? "with concurrent metabolic alkalosis"
          : HCO3 < expHCO3acute - 2
          ? "with concurrent metabolic acidosis"
          : HCO3 > expHCO3acute + 2
          ? "with chronic renal compensation"
          : "acute, minimal compensation";
    } else if (HCO3 < 22) {
      primary = "Metabolic acidosis";
      const expPCO2 = 1.5 * HCO3 + 8; // Winters, mmHg
      expected = `Winters: expected pCO₂ ${expPCO2.toFixed(0)} mmHg (${(
        expPCO2 / 7.5
      ).toFixed(1)} kPa)`;
      compensation =
        pCO2mmHg > expPCO2 + 2
          ? "with concurrent respiratory acidosis"
          : pCO2mmHg < expPCO2 - 2
          ? "with concurrent respiratory alkalosis"
          : "with appropriate respiratory compensation";
    } else {
      primary = "Acidaemia, mixed pattern";
      compensation = "review pCO₂ and HCO₃⁻ together";
    }
  } else if (alkalaemic) {
    if (HCO3 > 26) {
      primary = "Metabolic alkalosis";
      const expPCO2 = 0.7 * HCO3 + 21; // mmHg
      expected = `Expected pCO₂ ${expPCO2.toFixed(0)} mmHg (${(
        expPCO2 / 7.5
      ).toFixed(1)} kPa)`;
      compensation =
        pCO2mmHg < expPCO2 - 2
          ? "with concurrent respiratory alkalosis"
          : pCO2mmHg > expPCO2 + 2
          ? "with concurrent respiratory acidosis"
          : "with appropriate respiratory compensation";
    } else if (pCO2mmHg < 35) {
      primary = "Respiratory alkalosis";
      const expHCO3acute = 24 - (40 - pCO2mmHg) * 0.2;
      const expHCO3chronic = 24 - (40 - pCO2mmHg) * 0.4;
      expected = `Expected HCO₃⁻ acute ${expHCO3acute.toFixed(
        1
      )} / chronic ${expHCO3chronic.toFixed(1)} mmol/L`;
      compensation =
        HCO3 < expHCO3chronic - 2
          ? "with concurrent metabolic acidosis"
          : "acute or chronic per HCO₃⁻";
    } else {
      primary = "Alkalaemia, mixed pattern";
      compensation = "review pCO₂ and HCO₃⁻ together";
    }
  } else {
    primary = "Normal pH";
    if (pCO2mmHg > 45 || pCO2mmHg < 35 || HCO3 < 22 || HCO3 > 26) {
      compensation = "but abnormal pCO₂/HCO₃⁻ — fully compensated or mixed disorder";
    } else {
      compensation = "no disturbance";
    }
  }

  let anionGap: string | undefined;
  if (Na != null && Cl != null && Na > 0 && Cl > 0) {
    const ag = Na - (Cl + HCO3);
    anionGap = `Anion gap ${ag.toFixed(0)} mmol/L (normal ~8–12; add ~2.5 × (4 − albumin g/dL) if hypoalbuminaemic).`;
    if (ag > 12) notes.push("Raised anion gap — consider MUDPILES.");
  }

  return { primary, compensation, expected, anionGap, notes };
}

export default function ABGInterpreterTool() {
  const [pH, setPH] = useState(7.25);
  const [pCO2, setPCO2] = useState(3.5);
  const [HCO3, setHCO3] = useState(14);
  const [Na, setNa] = useState(140);
  const [Cl, setCl] = useState(105);

  const result = useMemo(
    () => interpret({ pH, pCO2, HCO3, Na, Cl }),
    [pH, pCO2, HCO3, Na, Cl]
  );

  return (
    <ToolShell
      slug="abg-interpreter"
      title="ABG interpreter"
      description="Acid–base interpretation using the Boston rules: identifies primary disturbance, expected compensation, and anion gap."
      intro={
        <>
          Enter pH, pCO₂ (kPa) and HCO₃⁻. Optional Na⁺/Cl⁻ unlocks the anion gap.
          Uses Boston-rules compensation formulas.
        </>
      }
      references={
        <>
          <p>
            Berend K et al. Physiological approach to assessment of acid–base
            disturbances. N Engl J Med 2014; 371:1434–45.
          </p>
          <p>Boston / Winters compensation formulas (standard texts).</p>
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Input label="pH" value={pH} step={0.01} onChange={setPH} />
        <Input label="pCO₂ (kPa)" value={pCO2} step={0.1} onChange={setPCO2} />
        <Input label="HCO₃⁻ (mmol/L)" value={HCO3} step={0.5} onChange={setHCO3} />
        <Input label="Na⁺ (mmol/L)" value={Na} step={1} onChange={setNa} />
        <Input label="Cl⁻ (mmol/L)" value={Cl} step={1} onChange={setCl} />
      </div>

      <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
        <div className="text-xs uppercase text-muted-foreground">Interpretation</div>
        <div className="mt-1 text-xl font-semibold text-foreground">
          {result.primary}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{result.compensation}</p>
        {result.expected && (
          <p className="text-xs text-muted-foreground mt-2">{result.expected}</p>
        )}
        {result.anionGap && (
          <p className="text-xs text-muted-foreground mt-2">{result.anionGap}</p>
        )}
        {result.notes.length > 0 && (
          <ul className="text-xs text-muted-foreground mt-2 list-disc pl-4">
            {result.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}
      </div>
    </ToolShell>
  );
}

function Input({
  label,
  value,
  step,
  onChange,
}: {
  label: string;
  value: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
      />
    </label>
  );
}
