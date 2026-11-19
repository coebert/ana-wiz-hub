import { useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/ToolShell";
import {
  ONDANSETRON_SMPC_URL,
  RCUK_PAEDIATRIC_CHART_URL,
  IV_PARACETAMOL_SMPC_URL,
  arrestAdrenaline,
  arrestAmiodarone,
  arrestAtropine,
  dexamethasonePonv,
  ivParacetamolDose,
  ondansetronPonv,
  oralParacetamolDose,
  paediatricDefibrillation,
} from "@/lib/paediatric-emergency-doses";

interface DoseRow {
  name: string;
  route: string;
  perKg: string;
  dose: string;
  volume?: string;
  notes: string;
}

interface FixedDrug {
  name: string;
  route: string;
  mgPerKg?: number;
  mcgPerKg?: number;
  notes: string;
}

/** Rows the RCUK 2025 chart and named UK products do not cap or scope differently. */
const FIXED_DRUGS: FixedDrug[] = [
  {
    name: "Suxamethonium",
    route: "IV",
    mgPerKg: 1.5,
    notes: "2 mg/kg in infants; 4 mg/kg IM if no IV access.",
  },
  {
    name: "Rocuronium (RSI)",
    route: "IV",
    mgPerKg: 1,
    notes: "1.2 mg/kg for true RSI; 0.6 mg/kg otherwise.",
  },
  {
    name: "Propofol (induction)",
    route: "IV",
    mgPerKg: 3,
    notes: "Range 2–4 mg/kg; reduce in shock.",
  },
  {
    name: "Ketamine (induction)",
    route: "IV",
    mgPerKg: 1.5,
    notes: "5–10 mg/kg IM if no IV access.",
  },
  {
    name: "Fentanyl",
    route: "IV",
    mcgPerKg: 1,
    notes: "1–3 mcg/kg; titrate to effect.",
  },
  {
    name: "Morphine",
    route: "IV",
    mgPerKg: 0.1,
    notes: "0.05–0.1 mg/kg; halve in neonates.",
  },
  {
    name: "Midazolam",
    route: "IV",
    mgPerKg: 0.1,
    notes: "0.5 mg/kg PO premed (max 20 mg).",
  },
  {
    name: "Ibuprofen",
    route: "PO",
    mgPerKg: 10,
    notes: "Avoid <3 months or dehydration.",
  },
];

function fmt(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return String(Number(n.toFixed(digits)));
}

export default function PaedDoseTool() {
  const [weight, setWeight] = useState(15);
  const [age, setAge] = useState(4);

  const ageMonths = age * 12;

  const estimatedWeight = useMemo(() => {
    // APLS: (age+4)×2 for 1–10 y; infants ~ (0.5×age_months)+4
    if (age < 1) return 3.5 + age * 6;
    if (age <= 10) return (age + 4) * 2;
    return age * 3.3;
  }, [age]);

  const rows = useMemo<DoseRow[]>(() => {
    const out: DoseRow[] = [];

    const adrenaline = arrestAdrenaline(weight);
    if (adrenaline) {
      out.push({
        name: "Adrenaline (cardiac arrest)",
        route: "IV/IO",
        perKg: "10 micrograms/kg (max 1 mg)",
        dose: `${fmt(adrenaline.amount, 0)} micrograms`,
        volume: `${fmt(adrenaline.volumeMl ?? 0, 1)} mL of 1:10,000 (100 micrograms/mL)`,
        notes: "RCUK 2025: repeat every 3–5 min during CPR. The 1 mg ceiling is the chart maximum.",
      });
    }

    const amiodaroneFirst = arrestAmiodarone(weight, 1);
    const amiodaroneSecond = arrestAmiodarone(weight, 2);
    if (amiodaroneFirst && amiodaroneSecond) {
      out.push({
        name: "Amiodarone — after 3rd shock",
        route: "IV/IO",
        perKg: "5 mg/kg (max 300 mg)",
        dose: `${fmt(amiodaroneFirst.amount)} mg`,
        notes: "Flush with 0.9% saline or 5% glucose. Over 60 min if not in cardiac arrest.",
      });
      out.push({
        name: "Amiodarone — after 5th shock",
        route: "IV/IO",
        perKg: "5 mg/kg (max 150 mg)",
        dose: `${fmt(amiodaroneSecond.amount)} mg`,
        notes: "Second arrest dose has a lower 150 mg ceiling than the first.",
      });
    }

    const atropine = arrestAtropine(weight);
    if (atropine) {
      out.push({
        name: "Atropine",
        route: "IV",
        perKg: "20 micrograms/kg (max 600 micrograms)",
        dose: `${fmt(atropine.amount, 0)} micrograms`,
        notes: "RCUK 2025 ceiling is 600 micrograms per dose.",
      });
    }

    const ivParacetamol = ivParacetamolDose(weight);
    if (ivParacetamol) {
      out.push({
        name: "Paracetamol — IV",
        route: "IV over 15 min",
        perKg: ivParacetamol.band,
        dose: `${fmt(ivParacetamol.doseMg)} mg`,
        volume: `${fmt(ivParacetamol.doseMg / 10, 1)} mL of 10 mg/mL`,
        notes: `Max ${fmt(ivParacetamol.maxDailyMg, 0)} mg/24 h; at least ${ivParacetamol.intervalHours} h between doses and no more than 4 doses/24 h. No preterm dosing in this product SmPC; count oral and IV paracetamol together.`,
      });
    }

    const oralParacetamol = oralParacetamolDose(weight, ageMonths);
    if (oralParacetamol) {
      out.push({
        name: "Paracetamol — oral",
        route: "PO",
        perKg: "10–15 mg/kg per dose",
        dose: `${fmt(oralParacetamol.minDoseMg)}–${fmt(oralParacetamol.maxDoseMg)} mg`,
        notes: `Max ${fmt(oralParacetamol.maxDailyMg, 0)} mg/24 h, ${oralParacetamol.intervalHours}–6 hourly, max ${oralParacetamol.maxDosesPerDay} doses/24 h. Separate from the IV bands; not for infants under 2 months.`,
      });
    }

    const ondansetron = ondansetronPonv(weight, ageMonths);
    if (ondansetron) {
      out.push({
        name: "Ondansetron (PONV)",
        route: "IV, slow",
        perKg: "0.1 mg/kg (max 4 mg)",
        dose: `${fmt(ondansetron.amount)} mg`,
        notes:
          "Named product covers children over 1 month for post-operative nausea and vomiting. Prolongs QT — check other QT-prolonging drugs.",
      });
    }

    const dexamethasone = dexamethasonePonv(weight, age);
    if (dexamethasone) {
      out.push({
        name: "Dexamethasone (PONV prophylaxis)",
        route: "IV",
        perKg: "0.15 mg/kg (max 8 mg)",
        dose: `${fmt(dexamethasone.amount)} mg`,
        notes:
          "Guideline dose (APA 2016), not a UK product indication; no confirmed paediatric PONV source under 1 year, so it is withheld there. Expect transient hyperglycaemia.",
      });
    }

    for (const d of FIXED_DRUGS) {
      if (d.mgPerKg != null) {
        out.push({
          name: d.name,
          route: d.route,
          perKg: `${d.mgPerKg} mg/kg`,
          dose: `${fmt(d.mgPerKg * weight)} mg`,
          notes: d.notes,
        });
      } else if (d.mcgPerKg != null) {
        out.push({
          name: d.name,
          route: d.route,
          perKg: `${d.mcgPerKg} mcg/kg`,
          dose: `${fmt(d.mcgPerKg * weight, 0)} mcg`,
          notes: d.notes,
        });
      }
    }

    return out;
  }, [weight, age, ageMonths]);

  const defib = useMemo(() => paediatricDefibrillation(weight, age), [weight, age]);

  return (
    <ToolShell
      slug="paediatric-emergency-doses"
      title="Paediatric emergency drug doses"
      description="Weight-based paediatric doses with the RCUK 2025 arrest ceilings and named UK product limits for paracetamol and anti-emetics."
      intro={
        <>
          Enter the child's actual weight (preferred) or use the APLS age-based estimate. Arrest
          drugs follow the RCUK 2025 paediatric algorithms; IV paracetamol follows the named UK
          product SmPC. Each row states its own ceiling and cohort — rows the source does not
          support are withheld.
        </>
      }
      references={
        <>
          <p>
            Resuscitation Council UK. Paediatric emergency algorithms and resources, G2025, February
            2026 (V3).{" "}
            <a className="underline" href={RCUK_PAEDIATRIC_CHART_URL}>
              RCUK chart
            </a>
          </p>
          <p>
            Paracetamol 10 mg/mL solution for infusion SmPC (emc 100803, April 2025).{" "}
            <a className="underline" href={IV_PARACETAMOL_SMPC_URL}>
              SmPC
            </a>
          </p>
          <p>
            Ondansetron 2 mg/mL solution for injection SmPC.{" "}
            <a className="underline" href={ONDANSETRON_SMPC_URL}>
              SmPC
            </a>
          </p>
          <p>BNF for Children (oral paracetamol) and APA 2016 POV guideline (dexamethasone).</p>
        </>
      }
      caveat={
        <>
          Educational aid only. Doses must be checked against your local paediatric formulary and
          protocol and reviewed by a pharmacist before prescribing; the calculator does not replace
          that sign-off.
        </>
      }
    >
      <div className="mb-5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-foreground">
        <strong>Pharmacist review and local protocol required.</strong> Ceilings below are the named
        source maxima, not targets, and do not certify an individual dose.
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted-foreground">Weight (kg)</span>
          <input
            type="number"
            min={1}
            max={120}
            step={0.5}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">
            Age (years; 0.1 = ~1 month) — estimate weight if unknown
          </span>
          <div className="mt-1 flex gap-2">
            <input
              type="number"
              min={0}
              max={16}
              step={0.1}
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
            />
            <button
              type="button"
              onClick={() => setWeight(Math.round(estimatedWeight * 10) / 10)}
              className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Use {fmt(estimatedWeight, 1)} kg
            </button>
          </div>
        </label>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-muted-foreground border-b border-border">
              <th className="py-2 pr-3">Drug</th>
              <th className="py-2 pr-3">Route</th>
              <th className="py-2 pr-3">Per kg / ceiling</th>
              <th className="py-2 pr-3">Dose @ {weight} kg</th>
              <th className="py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={d.name} className="border-b border-border/60 align-top">
                <td className="py-2 pr-3 font-medium text-foreground">{d.name}</td>
                <td className="py-2 pr-3 text-muted-foreground">{d.route}</td>
                <td className="py-2 pr-3 text-muted-foreground">{d.perKg}</td>
                <td className="py-2 pr-3 text-foreground font-semibold">
                  {d.dose}
                  {d.volume && (
                    <div className="text-xs font-normal text-muted-foreground">{d.volume}</div>
                  )}
                </td>
                <td className="py-2 text-xs text-muted-foreground">{d.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {defib && (
        <section className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
          <h2 className="text-sm font-semibold text-foreground">
            Defibrillation and cardioversion (RCUK 2025)
          </h2>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>
              <strong className="text-foreground">
                First and subsequent shocks: 4 J/kg = {fmt(defib.initialJ, 1)} J
              </strong>{" "}
              transthoracic, monophasic or biphasic
              {defib.initialCapped ? " (the chart's manual column caps this at 150 J)" : ""}. Same
              energy for each of the first five shocks.
            </li>
            <li>
              <strong className="text-foreground">
                Refractory VF/pVT after the 5th shock: stepwise increase to 8 J/kg, max{" "}
                {defib.adolescent ? "360 J (adolescent)" : `${fmt(defib.refractoryMaxJ, 0)} J`}
              </strong>
              .
            </li>
            <li>
              Synchronised cardioversion: start at 1 J/kg = {fmt(defib.cardioversionInitialJ, 1)} J,
              doubling each attempt to a maximum of 4 J/kg = {fmt(defib.cardioversionMaxJ, 0)} J.
            </li>
            <li>
              <strong className="text-foreground">Adult device:</strong> for a child under 8 years
              use an AED's paediatric mode or attenuated pads where available; if not, use standard
              adult pads positioned to avoid contact and do not delay defibrillation.
            </li>
            <li>
              Paediatric pads/attenuators are the default for infants and young children; manual
              energy selection above follows the RCUK chart, and the full RCUK PALS guideline and
              local protocol govern the sequence.
            </li>
          </ul>
        </section>
      )}
    </ToolShell>
  );
}
