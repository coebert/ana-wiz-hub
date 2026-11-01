import { useState } from "react";
import { Button } from "@/components/ui/button";
import { strictDecimal as num, finiteResult } from "@/lib/science-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { makeQuote } from "@/components/topic/EndocrinePageShared";

/**
 * Arithmetic-only blood-gas calculator. Formulae are quoted from source records;
 * it never labels a result as normal/abnormal or suggests treatment.
 */
const Q = makeQuote("acids-bases-buffers");
const KPA_TO_MMHG = 7.50062;

export function BloodGasCalculator() {
  const [unit, setUnit] = useState<"kPa" | "mmHg">("kPa");
  const [v, setV] = useState({ pH: "7.40", pco2: "5.3", po2: "12.0", na: "", cl: "", k: "", fio2: "" });
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => setV({ ...v, [k]: e.target.value });

  const pH = num(v.pH), pco2 = num(v.pco2), po2 = num(v.po2), na = num(v.na), cl = num(v.cl), k = num(v.k), fio2 = num(v.fio2);
  const phOk = pH !== null && pH >= 6.5 && pH <= 8.0;
  const pco2Ok = pco2 !== null && pco2 > 0 && pco2 <= (unit === "kPa" ? 30 : 225);
  const pco2mmHg = pco2Ok && pco2 !== null ? pco2 * (unit === "kPa" ? KPA_TO_MMHG : 1) : null;

  const h = phOk && pH !== null ? Math.pow(10, 9 - pH) : null;
  const hco3 = phOk && pH !== null && pco2mmHg !== null ? 2.46e-8 * pco2mmHg / Math.pow(10, -pH) : null;
  const sbe = hco3 !== null && pH !== null ? 0.9287 * (hco3 - 24.4 + 14.83 * (pH - 7.4)) : null;
  const ag = hco3 !== null && na !== null && cl !== null && na > 0 && cl > 0 ? finiteResult(na - cl - hco3) : null;
  const agK = ag !== null && k !== null && k >= 0 ? finiteResult(ag + k) : null;
  const po2kPa = po2 !== null && po2 > 0 ? (unit === "kPa" ? po2 : po2 / KPA_TO_MMHG) : null;
  const pf = po2kPa !== null && fio2 !== null && fio2 >= 0.21 && fio2 <= 1 ? finiteResult(po2kPa / fio2) : null;

  const field = (id: keyof typeof v, label: string) => (
    <div className="space-y-1">
      <Label htmlFor={`bg-${id}`}>{label}</Label>
      <Input id={`bg-${id}`} inputMode="decimal" value={v[id]} onChange={set(id)} />
    </div>
  );
  const out = (label: string, value: number | null, units: string, dp = 1) => (
    <div className="rounded-md border border-border bg-muted/40 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold text-foreground" aria-live="polite">{value === null || !Number.isFinite(value) ? "—" : `${value.toFixed(dp)} ${units}`}</div>
    </div>
  );

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Enter values from a single blood gas. This tool does arithmetic only: it does not flag results as normal or abnormal and gives no
        diagnosis or treatment advice. Real analysers measure some of these values directly and may use slightly different constants.
      </p>
      <div className="flex gap-2" role="radiogroup" aria-label="Gas pressure units">
        {(["kPa", "mmHg"] as const).map((u) => (
          <Button variant="outline" key={u} type="button" role="radio" aria-checked={unit === u} onClick={() => { if (u === unit) return; const factor = u === "mmHg" ? KPA_TO_MMHG : 1 / KPA_TO_MMHG; setV(previous => ({ ...previous, pco2: num(previous.pco2) === null ? "" : String(Number(previous.pco2) * factor), po2: num(previous.po2) === null ? "" : String(Number(previous.po2) * factor) })); setUnit(u); }}
            className={`rounded-md border px-3 py-1 text-sm ${unit === u ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground"}`}>{u}</Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {field("pH", "pH")}
        {field("pco2", `pCO₂ (${unit})`)}
        {field("po2", `pO₂ (${unit})`)}
        {field("fio2", "FiO₂ (0.21–1, optional)")}
        {field("na", "Na⁺ mmol/L (optional)")}
        {field("cl", "Cl⁻ mmol/L (optional)")}
        {field("k", "K⁺ mmol/L (optional)")}
      </div>
      {!phOk && <p className="text-sm text-destructive">Enter a pH between 6.5 and 8.0.</p>}
      {phOk && !pco2Ok && <p className="text-sm text-destructive">Enter a positive pCO₂ in {unit}.</p>}
      {Object.entries(v).some(([, value]) => value.trim() !== "" && num(value) === null) && <p role="status" className="text-sm text-destructive">Use complete decimal numbers with a dot, not commas or partial entries.</p>}
      {po2kPa !== null && fio2 !== null && fio2 >= 0.21 && fio2 <= 1 && pf === null && <p role="status" className="text-sm text-destructive">Derived ratio is outside the finite calculation range.</p>}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {out("H⁺", h, "nmol/L", 0)}
        {out("Bicarbonate (calculated)", hco3, "mmol/L")}
        {out("Standard base excess", sbe, "mmol/L")}
        {out("Anion gap (Na − Cl − HCO₃)", ag, "mmol/L")}
        {out("Anion gap including K⁺", agK, "mmol/L")}
        {out("PaO₂/FiO₂ ratio", pf, "kPa")}
      </div>
      <div className="space-y-3 text-sm">
        <h4 className="font-semibold text-foreground">Formulae used</h4>
        <p><strong>H⁺:</strong> from the definition pH = −log₁₀[H⁺], so [H⁺] (nmol/L) = 10<sup>(9 − pH)</sup> (definition, teaching summary).</p>
        <p><strong>Bicarbonate:</strong> the bicarbonate term of this published formula, with pCO₂ in mmHg (kPa × 7.50):</p>
        <Q label="Maciel 2013 bicarbonate term" />
        <p><strong>Standard base excess:</strong> the Van Slyke equation, using the calculated bicarbonate:</p>
        <Q label="Maciel 2013 SBE formula" />
        <p><strong>Anion gap:</strong> using the calculated bicarbonate; the version including K⁺ simply adds K⁺ (teaching summary). Reference ranges depend on the analyser, so none is shown.</p>
        <Q label="Berend 2017 NAGMA" />
        <p><strong>PaO₂/FiO₂:</strong> simple division, shown in kPa (multiply by 7.5 for mmHg) (arithmetic, teaching summary).</p>
      </div>
    </div>
  );
}
