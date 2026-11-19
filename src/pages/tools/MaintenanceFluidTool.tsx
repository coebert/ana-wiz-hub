import { useState } from "react";
import { Link } from "react-router-dom";
import { niceMaintenance } from "@/lib/icu-shock-calcs";
import { ToolShell } from "@/components/tools/ToolShell";

/** Holliday–Segar: 4 mL/kg/h first 10 kg, 2 next 10, 1 each kg above 20. */
function hourly(weightKg: number) {
  if (weightKg <= 0) return 0;
  if (weightKg <= 10) return 4 * weightKg;
  if (weightKg <= 20) return 40 + 2 * (weightKg - 10);
  return 60 + 1 * (weightKg - 20);
}

export default function MaintenanceFluidTool() {
  const [population, setPopulation] = useState<"child" | "adult">("child");
  const [weight, setWeight] = useState("20");
  const kg = Number(weight);
  const adult = population === "adult";
  const adultRange = adult ? niceMaintenance(kg) : null;
  const valid = adult ? adultRange !== null : Number.isFinite(kg) && kg >= 1 && kg <= 150;
  const daily = 100 * Math.min(kg, 10) + 50 * Math.max(0, Math.min(kg - 10, 10)) + 20 * Math.max(0, kg - 20);

  return (
    <ToolShell
      slug="maintenance-fluid"
      title="Maintenance fluid calculator for children and adults"
      description="Estimate routine maintenance water using NICE CG174 for adults or the paediatric daily Holliday–Segar formula and hourly 4-2-1 approximation for children."
      intro={
        <>
          Select the patient group and enter the prescribing weight. These estimates are for routine
          maintenance in a euvolaemic patient. Assess resuscitation, deficits and ongoing losses
          separately. Use a dedicated pathway for neonates or paediatric DKA. Read the{" "}
          <Link
            to="/notes/paediatric-maintenance-fluids-4-2-1-rule"
            className="text-pharmacology hover:underline"
          >
            paediatric maintenance fluids guide
          </Link>
          .
        </>
      }

      references={
        <>
          <p>
            Holliday MA, Segar WE. The maintenance need for water in parenteral
            fluid therapy. Pediatrics 1957; 19:823–32.
          </p>
          <p>
            <a className="underline" href="https://www.nice.org.uk/guidance/ng29/chapter/recommendations">NICE NG29, routine maintenance in children (section 1.4)</a>.
          </p>
          <p>
            <a className="underline" href="https://www.nice.org.uk/guidance/cg174/chapter/recommendations">NICE CG174, routine maintenance in adults (section 1.4)</a>.
          </p>

        </>
      }
    >
      <label className="block text-sm">
        Patient group
        <select value={population} onChange={(e) => setPopulation(e.target.value === "adult" ? "adult" : "child")}
          className="mt-1 mb-3 w-full rounded-lg border border-input bg-background px-3 py-2">
          <option value="child">Child (after the neonatal period, under 16)</option>
          <option value="adult">Adult (16 and over)</option>
        </select>
      </label>
      <label className="block text-sm">
        {adult ? "Prescribing weight (kg; ideal body weight in obesity)" : "Child’s weight (kg)"}
        <input type="number" min={adult ? 20 : 1} max={adult ? 250 : 150} step="any" value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground" />
      </label>
      {valid ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2" aria-live="polite">
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="text-xs uppercase text-muted-foreground">{adult ? "Adult hourly equivalent" : "Child hourly approximation (4-2-1)"}</div>
            <div className="mt-1 text-3xl font-bold text-foreground">
              {adultRange ? `${Math.round(adultRange.waterLow / 24)}–${Math.round(adultRange.waterHigh / 24)}` : Number(hourly(kg).toFixed(1))} <span className="text-base">mL/h</span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="text-xs uppercase text-muted-foreground">{adult ? "Adult routine maintenance (CG174)" : "Child daily requirement (NG29)"}</div>
            <div className="mt-1 text-3xl font-bold text-foreground">
              {adultRange ? `${adultRange.waterLow}–${adultRange.waterHigh}` : Math.round(daily)} <span className="text-base">mL/day</span>
            </div>
          </div>
        </div>
      ) : <p className="mt-3 text-sm" role="status">Enter a weight within this calculator’s range ({adult ? "20–250" : "1–150"} kg).</p>}

      <div className="mt-5 text-xs text-muted-foreground space-y-1">
        <p>
          <span className="font-semibold text-foreground">Children:</span> NICE
          recommends isotonic crystalloid for initial routine maintenance. The daily and approximate hourly formulae give slightly different results. Consider body surface area for weight above the 91st centile. Over 24 hours, males rarely need more than 2,500 mL and females rarely need more than 2,000 mL.
        </p>
        <p>
          <span className="font-semibold text-foreground">Adults:</span> 25–30
          mL/kg/day water with 1 mmol/kg Na⁺, K⁺ and Cl⁻, plus 50–100 g glucose
          (NICE CG174). Consider 20–25 mL/kg/day if older or frail, in renal impairment or cardiac failure, or at risk of refeeding syndrome. In obesity, use ideal body weight and the lower end of the range; requirements rarely exceed 3 L/day. Seek expert advice for BMI above 40 kg/m².
        </p>
      </div>

      <section className="mt-8" aria-labelledby="how-the-rule-works">
        <h2
          id="how-the-rule-works"
          className="font-serif text-xl font-bold text-foreground"
        >
          How the 4-2-1 rule works
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          In children, the 4-2-1 rule is a rounded hourly approximation to the Holliday–Segar estimate of
          daily water requirement. Body weight is divided into three bands and
          each band is given its own rate:
        </p>
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground list-disc pl-5">
          <li>
            <span className="font-semibold text-foreground">4 mL/kg/h</span> for
            the first 10 kg
          </li>
          <li>
            <span className="font-semibold text-foreground">2 mL/kg/h</span> for
            the next 10 kg (10–20 kg)
          </li>
          <li>
            <span className="font-semibold text-foreground">1 mL/kg/h</span> for
            every kilogram above 20 kg
          </li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          For a child over 20 kg the hourly shortcut is{" "}
          <span className="font-semibold text-foreground">weight + 40 mL/h</span>
          . NICE NG29 calculates the daily requirement separately using 100 mL/kg for the first
          10 kg, 50 mL/kg for the next 10 kg and 20 mL/kg thereafter.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="worked-examples">
        <h2
          id="worked-examples"
          className="font-serif text-xl font-bold text-foreground"
        >
          Worked examples
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Paediatric hourly estimates and daily Holliday–Segar requirements
            </caption>
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th scope="col" className="py-2 pr-3 font-medium">Weight</th>
                <th scope="col" className="py-2 pr-3 font-medium">Calculation</th>
                <th scope="col" className="py-2 pr-3 font-medium">Hourly</th>
                <th scope="col" className="py-2 font-medium">NG29 daily total</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 text-foreground">8 kg infant</td>
                <td className="py-2 pr-3">4 × 8</td>
                <td className="py-2 pr-3">32 mL/h</td>
                <td className="py-2">800 mL</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 text-foreground">15 kg child</td>
                <td className="py-2 pr-3">40 + (2 × 5)</td>
                <td className="py-2 pr-3">50 mL/h</td>
                <td className="py-2">1250 mL</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 text-foreground">30 kg child</td>
                <td className="py-2 pr-3">60 + (1 × 10)</td>
                <td className="py-2 pr-3">70 mL/h</td>
                <td className="py-2">1700 mL</td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="physiological-basis">
        <h2
          id="physiological-basis"
          className="font-serif text-xl font-bold text-foreground"
        >
          Why 4-2-1? The physiological basis
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Holliday and Segar observed that water requirement tracks energy
          expenditure: roughly 1 mL of water is needed per kilocalorie
          metabolised. Small children have a high metabolic rate per kilogram
          (~100 kcal/kg/day for the first 10 kg), which falls to ~50 kcal/kg/day
          for the next 10 kg and ~20 kcal/kg/day beyond 20 kg. Dividing those
          daily figures by 24 and rounding gives the approximate 4, 2 and 1 mL/kg/h bands.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          The estimate assumes a well, afebrile, euvolaemic patient at rest.
          Fever, burns, sepsis, tachypnoea and open body cavities all increase
          losses, while SIADH, cardiac failure, renal impairment and the
          post-operative ADH surge argue for restriction. The rule also
          over-estimates in obesity — use ideal or adjusted body weight.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="clinical-application">
        <h2
          id="clinical-application"
          className="font-serif text-xl font-bold text-foreground"
        >
          Using the rule in practice
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    <li>
            <span className="font-semibold text-foreground">
              Maintenance is one of four components
            </span>{" "}
            — NICE NG29 distinguishes routine maintenance from replacement, redistribution and resuscitation. 
            For children needing resuscitation, start with 10 mL/kg glucose-free isotonic crystalloid and reassess; seek expert advice if 40–60 mL/kg or more is needed. Term neonates and specialist pathways differ.
          </li>
          <li>
            <span className="font-semibold text-foreground">Deficit:</span>{" "}
            assess intake, losses and clinical fluid status; do not automatically replace an assumed hourly-maintenance-times-fasting deficit. Follow the age- and procedure-specific fasting policy.
          </li>
          <li>
            <span className="font-semibold text-foreground">Choose isotonic:</span>{" "}
            hypotonic maintenance fluid in children caused fatal hyponatraemic
            encephalopathy; NICE NG29 mandates isotonic crystalloid with
            glucose where needed, and monitoring of plasma sodium.
          </li>
          <li>
            <span className="font-semibold text-foreground">Adults:</span> the
            initial NICE CG174 routine maintenance range for a 70 kg adult is 1,750–2,100 mL/day (about 73–88 mL/h). Reassess against oral intake, fluid balance and clinical status.
          </li>
          <li>
            <span className="font-semibold text-foreground">Reassess daily:</span>{" "}
            weigh the patient, review fluid balance charts and check
            electrolytes rather than continuing a fixed rate.
          </li>
        </ul>
      </section>

    </ToolShell>
  );
}
