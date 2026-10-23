import { useState } from "react";
import { describeRisk, absoluteRiskComparison } from "@/lib/risk-communication";

export function RiskCommunicationFigure() {
  const [baseline, setBaseline] = useState("2");
  const [after, setAfter] = useState("1");
  const beforeValue = baseline.trim() === "" ? NaN : Number(baseline);
  const afterValue = after.trim() === "" ? NaN : Number(after);
  const frequency = describeRisk(beforeValue);
  const comparison = absoluteRiskComparison(beforeValue, afterValue);
  const format = (n: number) => n.toLocaleString("en-GB", { maximumFractionDigits: 3 });
  return <figure className="my-4 space-y-4 border border-border rounded-lg p-4">
    <figcaption className="font-semibold text-foreground">Absolute risk and natural frequencies</figcaption>
    <p className="text-sm text-muted-foreground">Fictional teaching probabilities, not a prediction for a patient. An intervention comparison is meaningful only when both estimates refer to the same outcome, population and time period.</p>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm text-foreground space-y-1 block">Baseline risk (%)<input type="number" min="0" max="100" step="any" value={baseline} onChange={e => setBaseline(e.target.value)} className="block w-full rounded-md border border-input bg-background px-3 py-2" /></label>
      <label className="text-sm text-foreground space-y-1 block">Risk after intervention (%)<input type="number" min="0" max="100" step="any" value={after} onChange={e => setAfter(e.target.value)} className="block w-full rounded-md border border-input bg-background px-3 py-2" /></label>
    </div>
    <div aria-live="polite" className="text-sm text-muted-foreground space-y-2">
      {frequency && comparison ? <>
        <p><strong className="text-foreground">{format(frequency.perTenThousand)} in 10,000</strong> experience the event; {format(frequency.unaffectedPerTenThousand)} do not. {frequency.oneIn !== null && <>Approximately 1 in {format(frequency.oneIn)}.</>}</p>
        <svg viewBox="0 0 500 120" role="img" aria-label={`Baseline probability: ${format(beforeValue)} percent. Each square represents one percentage point.`} className="w-full max-w-lg">
          {Array.from({ length: 100 }, (_, i) => <rect key={i} x={(i % 25) * 20 + 2} y={Math.floor(i / 25) * 28 + 2} width="16" height="22" rx="2" className={i < Math.floor(beforeValue) ? "fill-primary" : "fill-muted stroke-border"} />)}
        </svg>
        <p className="text-xs">Each square = 1 percentage point. Whole squares only; the written frequency retains fractional values and is authoritative for rare events.</p>
        <p>Absolute reduction: <strong className="text-foreground">{format(comparison.percentagePointReduction)} percentage points</strong>. Relative reduction: {comparison.relativeReductionPercent === null ? "undefined at zero baseline" : `${format(comparison.relativeReductionPercent)}%`}. Number needed to treat: {comparison.numberNeededToTreat ?? "not applicable (no positive reduction)"}.</p>
        <p>A negative reduction means an increase in risk. NNT is rounded up and describes the stated follow-up period, not a lifetime guarantee.</p>
      </> : <p className="text-destructive">Enter both probabilities between 0 and 100%.</p>}
    </div>
  </figure>;
}