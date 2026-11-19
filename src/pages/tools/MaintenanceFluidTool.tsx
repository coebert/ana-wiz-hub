import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";
import {
  adultDailyRange,
  childDailyMaintenanceMlPerDay,
  childHourlyApproximationMlPerHour,
  neonateDailyRange,
  neonateBand,
  type FluidPatientGroup,
} from "@/lib/maintenance-fluid";

const GROUP_LABEL: Record<FluidPatientGroup, string> = {
  adult: "Adult (CG174)",
  child: "Child or young person (NG29)",
  neonate: "Term neonate (NG29)",
};

const GROUP_DEFAULT_WEIGHT: Record<FluidPatientGroup, number> = {
  adult: 70,
  child: 20,
  neonate: 3.5,
};

function fmt(n: number): string {
  return n.toLocaleString("en-GB", { maximumFractionDigits: 0 });
}

export default function MaintenanceFluidTool() {
  const [group, setGroup] = useState<FluidPatientGroup>("adult");
  const [weight, setWeight] = useState(70);
  const [ageDays, setAgeDays] = useState(3);

  const changeGroup = (next: FluidPatientGroup) => {
    setGroup(next);
    setWeight(GROUP_DEFAULT_WEIGHT[next]);
  };

  const calculation = useMemo(() => {
    if (group === "adult") {
      const range = adultDailyRange(weight);
      return range ? { kind: "range" as const, range } : { kind: "invalid" as const };
    }
    if (group === "neonate") {
      const range = neonateDailyRange(weight, ageDays);
      const band = neonateBand(ageDays);
      return range && band ? { kind: "neonate" as const, range, band } : { kind: "invalid" as const };
    }
    const daily = childDailyMaintenanceMlPerDay(weight);
    const hourlyApprox = childHourlyApproximationMlPerHour(weight);
    return daily !== null && hourlyApprox !== null
      ? { kind: "child" as const, daily, hourlyApprox }
      : { kind: "invalid" as const };
  }, [group, weight, ageDays]);

  return (
    <ToolShell
      slug="maintenance-fluid"
      title="Maintenance fluid calculator (adult, child and neonate)"
      description="Routine maintenance IV fluids for adults (NICE CG174, 25–30 mL/kg/day), children (NICE NG29 exact 100/50/20 mL/kg/day with the approximate 4-2-1 hourly figure shown separately) and term neonates by age (NG29)."
      intro={
        <>
          Enter a weight to get <strong>routine maintenance</strong> fluid, not a
          resuscitation bolus. Adults use NICE CG174's 25–30 mL/kg/day range;
          children use NG29's exact 100/50/20 mL/kg/day with the approximate
          4-2-1 hourly figure kept separate; term neonates use NG29's age bands.
          Add deficit and ongoing losses separately. For the derivation and fluid
          choice, read the{" "}
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
            NICE NG29: Intravenous fluid therapy in children and young people in
            hospital (updated 2020) —{" "}
            <a
              href="https://www.nice.org.uk/guidance/ng29"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              nice.org.uk/guidance/ng29
            </a>
            .
          </p>
          <p>
            NICE CG174: Intravenous fluid therapy in adults in hospital (updated
            2017) —{" "}
            <a
              href="https://www.nice.org.uk/guidance/cg174"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              nice.org.uk/guidance/cg174
            </a>
            .
          </p>
        </>
      }
    >
      <fieldset>
        <legend className="text-sm text-muted-foreground mb-2">Patient group</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(GROUP_LABEL) as FluidPatientGroup[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => changeGroup(g)}
              aria-pressed={group === g}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                group === g
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {GROUP_LABEL[g]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted-foreground">Weight (kg)</span>
          <input
            type="number"
            min={0.3}
            max={500}
            step={0.1}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>
        {group === "neonate" && (
          <label className="block text-sm">
            <span className="text-muted-foreground">Age (whole days, 0–28)</span>
            <input
              type="number"
              min={0}
              max={28}
              step={1}
              value={ageDays}
              onChange={(e) => setAgeDays(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
            />
          </label>
        )}
      </div>

      {calculation.kind === "invalid" && (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {group === "neonate"
            ? "Enter a weight between 0.3 and 500 kg and an age of 0–28 days."
            : "Enter a weight between 0.3 and 500 kg."}
        </p>
      )}

      {calculation.kind === "range" && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="text-xs uppercase text-muted-foreground">24-hour total</div>
            <div className="mt-1 text-3xl font-bold text-foreground">
              {fmt(calculation.range.minMlPerDay)}–{fmt(calculation.range.maxMlPerDay)}{" "}
              <span className="text-base font-medium text-muted-foreground">mL/day</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              25–30 mL/kg/day (CG174)
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="text-xs uppercase text-muted-foreground">Hourly equivalent</div>
            <div className="mt-1 text-3xl font-bold text-foreground">
              {fmt(calculation.range.minMlPerDay / 24)}–{fmt(calculation.range.maxMlPerDay / 24)}{" "}
              <span className="text-base font-medium text-muted-foreground">mL/h</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              routine maintenance, not a bolus
            </div>
          </div>
        </div>
      )}

      {calculation.kind === "child" && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-4">
            <div className="text-xs uppercase text-muted-foreground">
              NG29 daily maintenance (exact)
            </div>
            <div className="mt-1 text-3xl font-bold text-primary">
              {fmt(calculation.daily)}{" "}
              <span className="text-base font-medium text-muted-foreground">mL/day</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              100 / 50 / 20 mL/kg/day = {fmt(calculation.daily / 24)} mL/h
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="text-xs uppercase text-muted-foreground">
              Approximate hourly (4-2-1)
            </div>
            <div className="mt-1 text-3xl font-bold text-foreground">
              {fmt(calculation.hourlyApprox)}{" "}
              <span className="text-base font-medium text-muted-foreground">mL/h</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              ≈ {fmt(calculation.hourlyApprox * 24)} mL/day — an estimate, not the NG29 prescription
            </div>
          </div>
        </div>
      )}

      {calculation.kind === "neonate" && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="text-xs uppercase text-muted-foreground">
              24-hour total — {calculation.band.label}
            </div>
            <div className="mt-1 text-3xl font-bold text-foreground">
              {fmt(calculation.range.minMlPerDay)}–{fmt(calculation.range.maxMlPerDay)}{" "}
              <span className="text-base font-medium text-muted-foreground">mL/day</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              {calculation.band.minMlPerKgPerDay}–{calculation.band.maxMlPerKgPerDay} mL/kg/day
              (NG29 1.4.2)
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="text-xs uppercase text-muted-foreground">Hourly equivalent</div>
            <div className="mt-1 text-3xl font-bold text-foreground">
              {fmt(calculation.range.minMlPerDay / 24)}–{fmt(calculation.range.maxMlPerDay / 24)}{" "}
              <span className="text-base font-medium text-muted-foreground">mL/h</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              Holliday–Segar / 4-2-1 is not applied to neonates
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 text-xs text-muted-foreground space-y-1">
        {group === "adult" && (
          <>
            <p>
              <span className="font-semibold text-foreground">Adults (CG174):</span>{" "}
              start at 25–30 mL/kg/day water with approximately 1 mmol/kg/day of
              sodium, potassium and chloride and 50–100 g/day glucose. Adjust to
              ideal body weight in obesity and use the lower 20–25 mL/kg/day range
              in older or frail patients, renal impairment, cardiac failure or
              refeeding risk. Patients rarely need more than 3 litres/day.
            </p>
            <p>
              This is <span className="font-semibold text-foreground">routine maintenance only</span> —
              it is not a fluid bolus and does not cover resuscitation, deficits or
              ongoing losses.
            </p>
          </>
        )}
        {group === "child" && (
          <>
            <p>
              <span className="font-semibold text-foreground">Children (NG29):</span>{" "}
              the exact prescription is the daily Holliday–Segar figure
              (100 mL/kg/day for the first 10 kg, 50 for the next 10 kg, 20
              thereafter). The 4-2-1 mL/kg/h rule is an approximation of that
              daily total and is shown separately so the two are not confused.
            </p>
            <p>
              Over 24 hours, males rarely need more than 2,500 mL and females
              rarely more than 2,000 mL. Use isotonic crystalloid containing
              sodium 131–154 mmol/L.
            </p>
          </>
        )}
        {group === "neonate" && (
          <p>
            <span className="font-semibold text-foreground">Term neonates (NG29):</span>{" "}
            maintenance is calculated by age, not by the Holliday–Segar or 4-2-1
            rules: birth to day 1 50–60 mL/kg/day, day 2 70–80, day 3 80–100,
            day 4 100–120 and days 5–28 120–150 mL/kg/day. Use isotonic
            crystalloid containing sodium 131–154 mmol/L. Preterm or unwell
            neonates need specialist neonatal guidance.
          </p>
        )}
      </div>

      <section className="mt-8" aria-labelledby="how-the-rules-work">
        <h2
          id="how-the-rules-work"
          className="font-serif text-xl font-bold text-foreground"
        >
          How the rules differ
        </h2>
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground list-disc pl-5">
          <li>
            <span className="font-semibold text-foreground">NG29 daily (exact):</span>{" "}
            100 mL/kg/day for the first 10 kg, 50 mL/kg/day for the next 10 kg and
            20 mL/kg/day for every kilogram above 20 kg.
          </li>
          <li>
            <span className="font-semibold text-foreground">4-2-1 hourly (approximate):</span>{" "}
            4 mL/kg/h for the first 10 kg, 2 mL/kg/h for the next 10 kg and
            1 mL/kg/h above 20 kg. It approximates the daily figure and is useful
            for intra-operative estimates, but it is not the NG29 prescription.
          </li>
          <li>
            <span className="font-semibold text-foreground">CG174 adult range:</span>{" "}
            25–30 mL/kg/day, subject to the clinical adjustments above.
          </li>
          <li>
            <span className="font-semibold text-foreground">Neonates:</span>{" "}
            NG29 age bands; neither of the above weight-band rules applies.
          </li>
        </ul>
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
              Routine maintenance fluid totals by patient group
            </caption>
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th scope="col" className="py-2 pr-3 font-medium">Patient</th>
                <th scope="col" className="py-2 pr-3 font-medium">Calculation</th>
                <th scope="col" className="py-2 pr-3 font-medium">Daily</th>
                <th scope="col" className="py-2 font-medium">Hourly</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 text-foreground">8 kg child</td>
                <td className="py-2 pr-3">100 × 8</td>
                <td className="py-2 pr-3">800 mL</td>
                <td className="py-2">33 mL/h (4-2-1 ≈ 32 mL/h)</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 text-foreground">15 kg child</td>
                <td className="py-2 pr-3">1000 + (50 × 5)</td>
                <td className="py-2 pr-3">1250 mL</td>
                <td className="py-2">52 mL/h (4-2-1 = 50 mL/h)</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 text-foreground">30 kg child</td>
                <td className="py-2 pr-3">1000 + 500 + (20 × 10)</td>
                <td className="py-2 pr-3">1700 mL</td>
                <td className="py-2">71 mL/h (4-2-1 = 70 mL/h)</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 text-foreground">70 kg adult</td>
                <td className="py-2 pr-3">25–30 × 70</td>
                <td className="py-2 pr-3">1750–2100 mL</td>
                <td className="py-2">73–88 mL/h</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 text-foreground">3.5 kg term neonate, day 3</td>
                <td className="py-2 pr-3">80–100 × 3.5</td>
                <td className="py-2 pr-3">280–350 mL</td>
                <td className="py-2">12–15 mL/h</td>
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
          Why weight bands? The physiological basis
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Holliday and Segar observed that water requirement tracks energy
          expenditure: roughly 1 mL of water is needed per kilocalorie
          metabolised. Because energy expenditure per kilogram falls with
          increasing body size, the requirement per kilogram also falls — hence
          the bands. The rules estimate <em>routine</em> maintenance only; they
          do not replace assessment of deficits, ongoing losses or
          redistribution, and they never justify a bolus.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="practice-points">
        <h2
          id="practice-points"
          className="font-serif text-xl font-bold text-foreground"
        >
          Practical points
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
          <li>
            <span className="font-semibold text-foreground">Deficit:</span> assess
            intake, losses and clinical fluid status; do not automatically replace
            an assumed hourly-maintenance-times-fasting deficit. Follow the age-
            and procedure-specific fasting policy.
          </li>
          <li>
            <span className="font-semibold text-foreground">Choose isotonic:</span>{" "}
            hypotonic maintenance fluid in children caused fatal hyponatraemic
            encephalopathy; NG29 mandates isotonic crystalloid with glucose where
            needed, and monitoring of plasma sodium.
          </li>
          <li>
            <span className="font-semibold text-foreground">Do not confuse rules:</span>{" "}
            the 4-2-1 hourly figure is an estimate of the NG29 daily total, not a
            separate prescription, and neither rule applies to term neonates.
          </li>
          <li>
            <span className="font-semibold text-foreground">Reassess daily:</span>{" "}
            weigh the patient, review fluid balance charts and check electrolytes
            rather than continuing a fixed rate.
          </li>
        </ul>
      </section>
    </ToolShell>
  );
}
