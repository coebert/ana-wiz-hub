import { useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/ToolShell";
import {
  interpretAbg,
  parseAbgValue,
  MMHG_PER_KPA,
} from "@/lib/abg-interpretation";

export default function ABGInterpreterTool() {
  // Plausible demonstration from a single arterial sample: a lactic
  // acidosis with appropriate respiratory compensation.
  const [pH, setPH] = useState("7.25");
  const [pCO2, setPCO2] = useState("3.2");
  const [HCO3, setHCO3] = useState("10");
  const [Na, setNa] = useState("140");
  const [Cl, setCl] = useState("105");

  const result = useMemo(
    () =>
      interpretAbg({
        pH: parseAbgValue(pH),
        pCO2KPa: parseAbgValue(pCO2),
        hco3: parseAbgValue(HCO3),
        na: parseAbgValue(Na),
        cl: parseAbgValue(Cl),
      }),
    [pH, pCO2, HCO3, Na, Cl],
  );

  const interpreted = result.status === "interpreted";
  const tone =
    result.status === "inconsistent"
      ? "border-amber-500/50 bg-amber-500/10"
      : "border-border bg-muted/40";

  return (
    <ToolShell
      slug="abg-interpreter"
      title="ABG interpreter"
      description="Acid–base interpretation using the Boston rules: identifies the primary disturbance, expected compensation, and anion gap."
      intro={
        <>
          Enter pH, pCO₂ (kPa) and HCO₃⁻ from the <strong>same arterial sample</strong>.
          pCO₂ is converted to mmHg at {MMHG_PER_KPA} mmHg per kPa before the
          compensation rules are applied. Optional Na⁺/Cl⁻ unlocks the anion gap.
          Values that are not mutually consistent are flagged rather than
          interpreted.
        </>
      }
      references={
        <>
          <p>
            Berend K, Duits AJ, van der Horst ICC, de Vries M. Physiological
            approach to assessment of acid–base disturbances. N Engl J Med
            2014;371:1434–45.{" "}
            <a
              className="underline"
              href="https://doi.org/10.1056/NEJMra1003327"
              target="_blank"
              rel="noreferrer"
            >
              doi:10.1056/NEJMra1003327
            </a>
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

      <div className={`mt-5 rounded-xl border p-4 ${tone}`}>
        <div className="text-xs uppercase text-muted-foreground">
          {interpreted ? "Interpretation" : "Input check"}
        </div>
        {interpreted ? (
          <>
            <div className="mt-1 text-xl font-semibold text-foreground">
              {result.primary}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {result.compensation}
            </p>
            {result.expected && (
              <p className="text-xs text-muted-foreground mt-2">
                {result.expected}
              </p>
            )}
            {result.anionGap && (
              <p className="text-xs text-muted-foreground mt-2">
                {result.anionGap}
              </p>
            )}
            {result.notes.length > 0 && (
              <ul className="text-xs text-muted-foreground mt-2 list-disc pl-4">
                {result.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
            {result.derived && (
              <p className="text-[11px] text-muted-foreground mt-3">
                pCO₂ {result.derived.pCO2mmHg.toFixed(0)} mmHg (
                {parseAbgValue(pCO2)?.toFixed(1)} kPa); Henderson–Hasselbalch pH{" "}
                {result.derived.expectedPh.toFixed(2)}.
              </p>
            )}
          </>
        ) : (
          <p
            className={`mt-1 text-sm ${
              result.status === "inconsistent"
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {result.message}
          </p>
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
  value: string;
  step: number;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
      />
    </label>
  );
}
