import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ToolShell } from "@/components/tools/ToolShell";

/** Holliday–Segar: 4 mL/kg/h first 10 kg, 2 next 10, 1 each kg above 20. */
function hourly(weightKg: number) {
  if (weightKg <= 0) return 0;
  if (weightKg <= 10) return 4 * weightKg;
  if (weightKg <= 20) return 40 + 2 * (weightKg - 10);
  return 60 + 1 * (weightKg - 20);
}

export default function MaintenanceFluidTool() {
  const [weight, setWeight] = useState(20);

  const { rate, daily } = useMemo(() => {
    const rate = hourly(weight);
    return { rate, daily: rate * 24 };
  }, [weight]);

  return (
    <ToolShell
      slug="maintenance-fluid"
      title="4-2-1 Rule Maintenance Fluid Calculator"
      description="Work out maintenance IV fluids with the 4-2-1 rule (Holliday–Segar): hourly and 24-hour rates by weight, with worked examples for children and adults."
      intro={
        <>
          Enter a weight to get the hourly and daily maintenance rate from the
          4-2-1 rule (Holliday–Segar) for healthy euvolaemic children and
          adults. Add deficit and ongoing losses separately. For the
          derivation, fluid choice and the move to isotonic solutions, read the{" "}
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
            NICE NG29: IV fluid therapy in children and young people in hospital.
          </p>
        </>
      }
    >
      <label className="block text-sm">
        <span className="text-muted-foreground">Weight (kg)</span>
        <input
          type="number"
          min={1}
          max={150}
          step={0.5}
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value) || 0)}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
        />
      </label>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="text-xs uppercase text-muted-foreground">Hourly rate</div>
          <div className="mt-1 text-3xl font-bold text-foreground">
            {rate.toFixed(0)}{" "}
            <span className="text-base font-medium text-muted-foreground">
              mL/h
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="text-xs uppercase text-muted-foreground">
            24-hour total
          </div>
          <div className="mt-1 text-3xl font-bold text-foreground">
            {daily.toFixed(0)}{" "}
            <span className="text-base font-medium text-muted-foreground">
              mL/day
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 text-xs text-muted-foreground space-y-1">
        <p>
          <span className="font-semibold text-foreground">Children:</span> NICE
          recommends isotonic crystalloid (e.g. 0.9% NaCl + 5% glucose). Cap routine
          maintenance at ~100 mL/kg/24 h for first 10 kg.
        </p>
        <p>
          <span className="font-semibold text-foreground">Adults:</span> 25–30
          mL/kg/day water with 1 mmol/kg Na⁺, K⁺ and Cl⁻, plus 50–100 g glucose
          (NICE CG174).
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
          The 4-2-1 rule is the hourly form of the Holliday–Segar estimate of
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
          A useful shortcut for anyone over 20 kg is{" "}
          <span className="font-semibold text-foreground">weight + 40 mL/h</span>
          . The daily (100-50-20 rule) equivalent is 100 mL/kg for the first
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
              Maintenance fluid rates calculated with the 4-2-1 rule
            </caption>
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th scope="col" className="py-2 pr-3 font-medium">Weight</th>
                <th scope="col" className="py-2 pr-3 font-medium">Calculation</th>
                <th scope="col" className="py-2 pr-3 font-medium">Hourly</th>
                <th scope="col" className="py-2 font-medium">24 h</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 text-foreground">8 kg infant</td>
                <td className="py-2 pr-3">4 × 8</td>
                <td className="py-2 pr-3">32 mL/h</td>
                <td className="py-2">768 mL</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 text-foreground">15 kg child</td>
                <td className="py-2 pr-3">40 + (2 × 5)</td>
                <td className="py-2 pr-3">50 mL/h</td>
                <td className="py-2">1200 mL</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 text-foreground">30 kg child</td>
                <td className="py-2 pr-3">60 + (1 × 10)</td>
                <td className="py-2 pr-3">70 mL/h</td>
                <td className="py-2">1680 mL</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 text-foreground">70 kg adult</td>
                <td className="py-2 pr-3">60 + (1 × 50)</td>
                <td className="py-2 pr-3">110 mL/h</td>
                <td className="py-2">2640 mL</td>
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
          daily figures by 24 gives the familiar 4, 2 and 1 mL/kg/h bands.
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
              Maintenance is only one of four components
            </span>{" "}
            — prescribe resuscitation, replacement of deficit, redistribution
            and maintenance separately (NICE CG174 "the 5 Rs").
          </li>
          <li>
            <span className="font-semibold text-foreground">Deficit:</span>{" "}
            fasting deficit ≈ hourly maintenance × hours fasted; modern
            practice with clear fluids until 1 hour pre-operatively makes this
            small.
          </li>
          <li>
            <span className="font-semibold text-foreground">Choose isotonic:</span>{" "}
            hypotonic maintenance fluid in children caused fatal hyponatraemic
            encephalopathy; NICE NG29 mandates isotonic crystalloid with
            glucose where needed, and monitoring of plasma sodium.
          </li>
          <li>
            <span className="font-semibold text-foreground">Adults:</span> the
            4-2-1 rate (≈40 mL/kg/day at 70 kg) exceeds NICE's routine adult
            maintenance of 25–30 mL/kg/day — use the adult figure for
            ward prescribing and reserve 4-2-1 for intra-operative estimates.
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
