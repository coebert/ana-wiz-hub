import { useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/ToolShell";

interface DrugRow {
  name: string;
  route: string;
  mgPerKg?: number;
  mcgPerKg?: number;
  mlPerKgConcentration?: { mlPerKg: number; concentration: string };
  jPerKg?: number;
  notes: string;
}

const DRUGS: DrugRow[] = [
  {
    name: "Adrenaline (arrest)",
    route: "IV/IO",
    mcgPerKg: 10,
    mlPerKgConcentration: { mlPerKg: 0.1, concentration: "1:10,000" },
    notes: "Repeat every 3–5 min during CPR.",
  },
  {
    name: "Atropine",
    route: "IV/IO",
    mcgPerKg: 20,
    notes: "Min 100 mcg, max 600 mcg single dose.",
  },
  {
    name: "Amiodarone (VF/pVT)",
    route: "IV/IO",
    mgPerKg: 5,
    notes: "After 3rd shock, then again after 5th.",
  },
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
    name: "Paracetamol",
    route: "IV/PO",
    mgPerKg: 15,
    notes: "Max 60 mg/kg/day; 30 mg/kg loading PR.",
  },
  {
    name: "Ibuprofen",
    route: "PO",
    mgPerKg: 10,
    notes: "Avoid <3 months or dehydration.",
  },
  {
    name: "Dexamethasone (PONV/airway)",
    route: "IV",
    mgPerKg: 0.15,
    notes: "Max 8 mg.",
  },
  {
    name: "Ondansetron",
    route: "IV",
    mgPerKg: 0.1,
    notes: "Max 4 mg.",
  },
  {
    name: "Defibrillation",
    route: "Shock",
    jPerKg: 4,
    notes: "4 J/kg every cycle; same energy for subsequent shocks.",
  },
];

function fmt(n: number, digits = 2) {
  if (!isFinite(n)) return "—";
  return n >= 100 ? n.toFixed(0) : n.toFixed(digits);
}

export default function PaedDoseTool() {
  const [weight, setWeight] = useState(15);
  const [age, setAge] = useState(4);

  const estimatedWeight = useMemo(() => {
    // APLS: (age+4)×2 for 1–10 y; infants ~ (0.5×age_months)+4
    if (age < 1) return 3.5 + age * 6;
    if (age <= 10) return (age + 4) * 2;
    return age * 3.3;
  }, [age]);

  return (
    <ToolShell
      slug="paediatric-emergency-doses"
      title="Paediatric emergency drug doses"
      description="Weight-based paediatric doses for resuscitation, induction and analgesia. APLS-aligned with editable weight."
      intro={
        <>
          Enter the child's actual weight (preferred) or use the APLS age-based
          estimate. Doses follow APLS / RCH / BNFc conventions; always cross-check.
        </>
      }
      references={
        <>
          <p>Advanced Paediatric Life Support (APLS), 7th ed., 2023.</p>
          <p>BNF for Children, current edition.</p>
        </>
      }
    >
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
            Age (years) — estimate weight if unknown
          </span>
          <div className="mt-1 flex gap-2">
            <input
              type="number"
              min={0}
              max={16}
              step={0.5}
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
              <th className="py-2 pr-3">Per kg</th>
              <th className="py-2 pr-3">Dose @ {weight} kg</th>
              <th className="py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {DRUGS.map((d) => {
              let perKg = "—";
              let dose = "—";
              if (d.mgPerKg != null) {
                perKg = `${d.mgPerKg} mg/kg`;
                dose = `${fmt(d.mgPerKg * weight)} mg`;
              } else if (d.mcgPerKg != null) {
                perKg = `${d.mcgPerKg} mcg/kg`;
                dose = `${fmt(d.mcgPerKg * weight)} mcg`;
              } else if (d.jPerKg != null) {
                perKg = `${d.jPerKg} J/kg`;
                dose = `${fmt(d.jPerKg * weight, 0)} J`;
              }
              const vol = d.mlPerKgConcentration
                ? `${fmt(d.mlPerKgConcentration.mlPerKg * weight)} mL of ${
                    d.mlPerKgConcentration.concentration
                  }`
                : null;
              return (
                <tr key={d.name} className="border-b border-border/60 align-top">
                  <td className="py-2 pr-3 font-medium text-foreground">{d.name}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{d.route}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{perKg}</td>
                  <td className="py-2 pr-3 text-foreground font-semibold">
                    {dose}
                    {vol && (
                      <div className="text-xs font-normal text-muted-foreground">
                        {vol}
                      </div>
                    )}
                  </td>
                  <td className="py-2 text-xs text-muted-foreground">{d.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ToolShell>
  );
}
