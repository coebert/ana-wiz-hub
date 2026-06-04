import { useMemo, useState } from "react";
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
      title="Maintenance fluid (4-2-1 rule)"
      description="Holliday–Segar 4-2-1 hourly maintenance rate and 24-hour requirement by weight."
      intro={
        <>
          Hourly maintenance for healthy euvolaemic children and adults of any
          weight, using the Holliday–Segar rule. Add deficit and ongoing losses
          separately.
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
    </ToolShell>
  );
}
