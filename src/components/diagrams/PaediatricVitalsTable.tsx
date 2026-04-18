import { useMemo, useState } from "react";

type Band = {
  label: string;
  minMonths: number; // inclusive
  maxMonths: number; // exclusive
  hr: [number, number]; // awake
  rr: [number, number];
  sbp: [number, number];
  // urine output minimum (mL/kg/hr) — adequate threshold
  uo: number;
};

// APLS 2021 / RCEM reference ranges (awake values). SBP lower limit ≈ 70 + 2×age (yr) for >1 yr.
const BANDS: Band[] = [
  { label: "Neonate (0–1 mo)", minMonths: 0, maxMonths: 1, hr: [110, 170], rr: [30, 60], sbp: [60, 90], uo: 2 },
  { label: "Infant (1–12 mo)", minMonths: 1, maxMonths: 12, hr: [100, 160], rr: [25, 45], sbp: [70, 100], uo: 2 },
  { label: "Toddler (1–2 yr)", minMonths: 12, maxMonths: 36, hr: [90, 150], rr: [20, 30], sbp: [80, 105], uo: 1.5 },
  { label: "Pre-school (3–5 yr)", minMonths: 36, maxMonths: 72, hr: [80, 140], rr: [20, 25], sbp: [85, 110], uo: 1 },
  { label: "School age (6–11 yr)", minMonths: 72, maxMonths: 144, hr: [70, 120], rr: [15, 20], sbp: [90, 120], uo: 1 },
  { label: "Adolescent (12+ yr)", minMonths: 144, maxMonths: 999, hr: [60, 100], rr: [12, 20], sbp: [100, 130], uo: 0.5 },
];

const PaediatricVitalsTable = () => {
  const [ageMonths, setAgeMonths] = useState<number>(48); // 4 yr default to match WETFLAG

  const activeIdx = useMemo(
    () => BANDS.findIndex((b) => ageMonths >= b.minMonths && ageMonths < b.maxMonths),
    [ageMonths]
  );

  const ageLabel = ageMonths < 12
    ? `${ageMonths} mo`
    : `${Math.floor(ageMonths / 12)} yr${ageMonths % 12 ? ` ${ageMonths % 12} mo` : ""}`;

  const rows: { key: keyof Pick<Band, "hr" | "rr" | "sbp">; label: string; unit: string; color: string }[] = [
    { key: "hr", label: "Heart rate", unit: "bpm", color: "hsl(0 70% 50%)" },
    { key: "rr", label: "Respiratory rate", unit: "/min", color: "hsl(200 70% 50%)" },
    { key: "sbp", label: "Systolic BP", unit: "mmHg", color: "hsl(280 60% 50%)" },
  ];

  return (
    <div className="my-6 p-4 rounded-xl border border-border bg-card h-full flex flex-col">
      <div className="mb-3">
        <h3 className="text-lg font-serif font-bold text-foreground">Paediatric Vital Signs — Normal Ranges</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          APLS 2021 awake reference ranges. Values lie outside these in stress, sleep, fever — interpret in context.
        </p>
      </div>

      <div className="mb-4 p-3 rounded-lg border border-border bg-secondary/30">
        <label className="text-xs font-semibold text-foreground flex items-center justify-between">
          <span>Age</span>
          <span className="text-primary font-mono">{ageLabel}</span>
        </label>
        <input
          type="range"
          min={0}
          max={192}
          step={1}
          value={ageMonths}
          onChange={(e) => setAgeMonths(Number(e.target.value))}
          className="w-full mt-1 accent-primary"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
          <span>0 mo</span><span>4 yr</span><span>8 yr</span><span>12 yr</span><span>16 yr</span>
        </div>
      </div>

      <div className="flex-1 space-y-1.5">
        {rows.map((r) => {
          const band = BANDS[activeIdx];
          const [lo, hi] = band[r.key];
          return (
            <div key={r.key} className="p-3 rounded-lg border border-border bg-background">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">{r.label}</p>
                <p className="text-base font-bold font-mono" style={{ color: r.color }}>
                  {lo}–{hi} <span className="text-xs font-normal text-muted-foreground">{r.unit}</span>
                </p>
              </div>
            </div>
          );
        })}

        <div className="p-3 rounded-lg border border-border bg-background">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-foreground">Urine output (adequate)</p>
            <p className="text-base font-bold font-mono" style={{ color: "hsl(35 90% 45%)" }}>
              ≥ {BANDS[activeIdx].uo} <span className="text-xs font-normal text-muted-foreground">mL/kg/hr</span>
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Oliguria threshold for AKI assessment in children (KDIGO paediatric).
          </p>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-1 pr-2 font-semibold">Age band</th>
              <th className="text-right py-1 px-1 font-semibold">HR</th>
              <th className="text-right py-1 px-1 font-semibold">RR</th>
              <th className="text-right py-1 pl-1 font-semibold">SBP</th>
            </tr>
          </thead>
          <tbody>
            {BANDS.map((b, i) => (
              <tr
                key={b.label}
                className={`border-b border-border/50 ${i === activeIdx ? "bg-primary/10 text-foreground font-semibold" : "text-muted-foreground"}`}
              >
                <td className="py-1 pr-2">{b.label}</td>
                <td className="text-right py-1 px-1 font-mono">{b.hr[0]}–{b.hr[1]}</td>
                <td className="text-right py-1 px-1 font-mono">{b.rr[0]}–{b.rr[1]}</td>
                <td className="text-right py-1 pl-1 font-mono">{b.sbp[0]}–{b.sbp[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 p-2.5 rounded bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
        <strong className="text-foreground">Hypotension threshold: </strong>
        SBP &lt; 70 mmHg (neonate &lt;60), &lt; 70 + 2×age (yr) for 1–10 yr, &lt; 90 mmHg in adolescents — a <em>late</em> sign of shock in children due to robust vasoconstriction.
      </div>
    </div>
  );
};

export default PaediatricVitalsTable;
