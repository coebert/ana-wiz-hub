interface DoseRow {
  exam: string;
  category: "Plain film" | "Fluoroscopy" | "CT" | "Interventional" | "Nuclear";
  dose_mSv: number;
  /** Optional context to display under the exam name. */
  note?: string;
}

/**
 * Reference values are the conventional UK figures used by PHE/UKHSA, RCR iRefer,
 * AAPM Report 96 and the RCoA primary syllabus. Real-world doses vary by scanner,
 * protocol, and patient size — these are typical adult effective doses.
 */
const ROWS: DoseRow[] = [
  // Plain films
  { exam: "Chest X-ray (PA)", category: "Plain film", dose_mSv: 0.02 },
  { exam: "Limb / extremity X-ray", category: "Plain film", dose_mSv: 0.001 },
  { exam: "Skull X-ray", category: "Plain film", dose_mSv: 0.07 },
  { exam: "Cervical spine X-ray", category: "Plain film", dose_mSv: 0.08 },
  { exam: "Thoracic spine X-ray", category: "Plain film", dose_mSv: 0.7 },
  { exam: "Lumbar spine X-ray", category: "Plain film", dose_mSv: 1.0 },
  { exam: "Pelvis / hip X-ray", category: "Plain film", dose_mSv: 0.4 },
  { exam: "Abdomen X-ray (KUB)", category: "Plain film", dose_mSv: 0.7 },
  { exam: "Mammogram (bilateral, 4-view)", category: "Plain film", dose_mSv: 0.4 },
  { exam: "Dental panoramic (OPG)", category: "Plain film", dose_mSv: 0.01 },

  // CT
  { exam: "CT head", category: "CT", dose_mSv: 2 },
  { exam: "CT cervical spine", category: "CT", dose_mSv: 3 },
  { exam: "CT chest", category: "CT", dose_mSv: 7 },
  { exam: "CT pulmonary angiogram (CTPA)", category: "CT", dose_mSv: 7, note: "Higher local breast dose in young women" },
  { exam: "CT coronary angiogram (CTCA)", category: "CT", dose_mSv: 5, note: "Prospective ECG-gated, modern scanner" },
  { exam: "CT calcium score", category: "CT", dose_mSv: 1 },
  { exam: "CT abdomen + pelvis", category: "CT", dose_mSv: 10 },
  { exam: "CT triple-phase liver", category: "CT", dose_mSv: 15 },
  { exam: "CT KUB (renal stones)", category: "CT", dose_mSv: 5, note: "Low-dose protocol ~2 mSv" },
  { exam: "CT venogram (pelvis/legs)", category: "CT", dose_mSv: 6 },
  { exam: "CT aortogram (TAVI / EVAR work-up)", category: "CT", dose_mSv: 12 },
  { exam: "CT colonography", category: "CT", dose_mSv: 6 },
  { exam: "CT trauma series (pan-scan)", category: "CT", dose_mSv: 20 },
  { exam: "CT perfusion (stroke)", category: "CT", dose_mSv: 5 },

  // Fluoroscopy / interventional
  { exam: "Barium swallow", category: "Fluoroscopy", dose_mSv: 1.5 },
  { exam: "Diagnostic coronary angiography", category: "Interventional", dose_mSv: 7, note: "Operator-dependent" },
  { exam: "PCI (single-vessel)", category: "Interventional", dose_mSv: 15 },
  { exam: "EP study + ablation", category: "Interventional", dose_mSv: 15 },
  { exam: "TAVI", category: "Interventional", dose_mSv: 20 },
  { exam: "EVAR", category: "Interventional", dose_mSv: 35 },
  { exam: "TIPS", category: "Interventional", dose_mSv: 70, note: "Among highest fluoroscopic doses in routine practice" },
  { exam: "Mechanical thrombectomy (stroke)", category: "Interventional", dose_mSv: 5 },
  { exam: "ERCP", category: "Interventional", dose_mSv: 4 },

  // Nuclear (for context)
  { exam: "V/Q scan (perfusion only)", category: "Nuclear", dose_mSv: 1.5 },
  { exam: "Myocardial perfusion (MPI, Tc-99m)", category: "Nuclear", dose_mSv: 8 },
  { exam: "PET-CT (FDG, whole body)", category: "Nuclear", dose_mSv: 14 },
  { exam: "Bone scan (Tc-99m MDP)", category: "Nuclear", dose_mSv: 4 },
];

const UK_BACKGROUND_MSV_PER_YEAR = 2.7;
const CXR_MSV = 0.02;

const CATEGORY_COLORS: Record<DoseRow["category"], string> = {
  "Plain film": "hsl(var(--muted-foreground))",
  Fluoroscopy: "hsl(195 80% 55%)",
  CT: "hsl(25 85% 55%)",
  Interventional: "hsl(0 70% 55%)",
  Nuclear: "hsl(280 65% 60%)",
};

const formatBackground = (mSv: number): string => {
  const years = mSv / UK_BACKGROUND_MSV_PER_YEAR;
  if (years >= 1) {
    return `${years.toFixed(years >= 10 ? 0 : 1)} yr`;
  }
  const days = years * 365;
  if (days >= 30) {
    const months = days / 30;
    return `${months.toFixed(months >= 10 ? 0 : 1)} mo`;
  }
  if (days >= 1) {
    return `${days.toFixed(0)} d`;
  }
  return `${(days * 24).toFixed(1)} h`;
};

const formatCxr = (mSv: number): string => {
  const n = mSv / CXR_MSV;
  if (n < 1) return `${n.toFixed(1)}×`;
  if (n < 10) return `${n.toFixed(1)}×`;
  if (n < 100) return `${Math.round(n)}×`;
  if (n < 1000) return `${Math.round(n / 5) * 5}×`;
  return `${(n / 1000).toFixed(1)}k×`;
};

const formatMsv = (mSv: number): string => {
  if (mSv < 0.01) return `${(mSv * 1000).toFixed(1)} µSv`;
  if (mSv < 1) return `${mSv.toFixed(2)} mSv`;
  if (mSv < 10) return `${mSv.toFixed(1)} mSv`;
  return `${Math.round(mSv)} mSv`;
};

export const RadiationDoseComparisonTable = () => {
  const maxDose = Math.max(...ROWS.map((r) => r.dose_mSv));

  return (
    <div className="my-6">
      <div className="bg-muted/30 rounded-xl border border-border p-4 space-y-3">
        <div>
          <h3 className="text-lg font-serif font-bold text-foreground leading-tight">
            Effective dose comparison — common imaging
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Typical adult effective dose, expressed as days/months/years of UK background
            (2.7 mSv/yr) and as multiples of one PA chest X-ray (0.02 mSv).
          </p>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {(Object.keys(CATEGORY_COLORS) as DoseRow["category"][]).map((c) => (
            <span
              key={c}
              className="px-1.5 py-0.5 rounded-md border border-border"
              style={{ background: `${CATEGORY_COLORS[c]}1A`, color: CATEGORY_COLORS[c] }}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Table — desktop / md+ */}
        <div className="hidden md:block overflow-x-auto -mx-4 px-4">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="py-2 pr-3 font-medium">Examination</th>
                <th className="py-2 pr-3 font-medium">Category</th>
                <th className="py-2 pr-3 font-medium text-right tabular-nums">Eff. dose</th>
                <th className="py-2 pr-3 font-medium text-right tabular-nums">≈ Background</th>
                <th className="py-2 pr-3 font-medium text-right tabular-nums">≈ CXRs</th>
                <th className="py-2 font-medium">Relative scale</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => {
                const color = CATEGORY_COLORS[r.category];
                const pct = Math.min(100, (r.dose_mSv / maxDose) * 100);
                return (
                  <tr key={r.exam} className="border-t border-border align-top">
                    <td className="py-2 pr-3">
                      <div className="font-medium text-foreground">{r.exam}</div>
                      {r.note && (
                        <div className="text-[10px] text-muted-foreground italic mt-0.5">{r.note}</div>
                      )}
                    </td>
                    <td className="py-2 pr-3">
                      <span
                        className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md whitespace-nowrap"
                        style={{ background: `${color}26`, color }}
                      >
                        {r.category}
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums text-foreground">
                      {formatMsv(r.dose_mSv)}
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums text-muted-foreground">
                      {formatBackground(r.dose_mSv)}
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums text-muted-foreground">
                      {formatCxr(r.dose_mSv)}
                    </td>
                    <td className="py-2 min-w-[120px]">
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: color }}
                          aria-label={`${(r.dose_mSv / maxDose * 100).toFixed(0)}% of highest exam in table`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Card list — mobile */}
        <ul className="md:hidden space-y-2">
          {ROWS.map((r) => {
            const color = CATEGORY_COLORS[r.category];
            const pct = Math.min(100, (r.dose_mSv / maxDose) * 100);
            return (
              <li
                key={r.exam}
                className="rounded-lg border border-border bg-background/80 p-3"
                style={{ borderLeftWidth: 4, borderLeftColor: color }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground">{r.exam}</div>
                    {r.note && (
                      <div className="text-[10px] text-muted-foreground italic mt-0.5">{r.note}</div>
                    )}
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md whitespace-nowrap shrink-0"
                    style={{ background: `${color}26`, color }}
                  >
                    {r.category}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <div className="text-muted-foreground">Dose</div>
                    <div className="tabular-nums font-semibold text-foreground">{formatMsv(r.dose_mSv)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">≈ Background</div>
                    <div className="tabular-nums text-foreground">{formatBackground(r.dose_mSv)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">≈ CXRs</div>
                    <div className="tabular-nums text-foreground">{formatCxr(r.dose_mSv)}</div>
                  </div>
                </div>
                <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="rounded-lg border border-border bg-background/60 p-3 space-y-2 text-[11px] text-muted-foreground leading-snug">
          <p className="text-[10px] uppercase tracking-wide text-foreground font-semibold">
            How to read this table
          </p>

          <div>
            <p className="text-foreground font-medium text-[11.5px]">What is "effective dose" (mSv)?</p>
            <p>
              Effective dose is a <strong>whole-body, risk-weighted</strong> quantity in sieverts (Sv).
              It takes the energy absorbed by each organ in the beam (the <em>absorbed dose</em>, in grays),
              multiplies it by a radiation weighting factor <em>w<sub>R</sub></em> (= 1 for X- and γ-rays)
              to give an <em>equivalent dose</em>, then applies ICRP tissue weighting factors{" "}
              <em>w<sub>T</sub></em> (e.g. lung 0.12, breast 0.12, gonads 0.08, skin 0.01) and sums across
              all organs. The result is the uniform whole-body dose that would carry the same stochastic
              risk (cancer, hereditary effects) as the actual non-uniform exposure. It is designed for
              population risk comparisons, not for predicting what will happen to one specific patient.
            </p>
          </div>

          <div>
            <p className="text-foreground font-medium text-[11.5px]">
              Why effective dose ≠ skin dose ≠ absorbed dose
            </p>
            <ul className="list-disc list-inside space-y-0.5 marker:text-muted-foreground">
              <li>
                <strong>Absorbed dose (Gy)</strong> is energy per unit mass deposited in a specific
                tissue — purely physical, no risk weighting.
              </li>
              <li>
                <strong>Peak skin dose</strong> is the absorbed dose at the most-irradiated patch of
                skin. In long fluoroscopic procedures (TIPS, complex PCI, EVAR) it can reach 2–5 Gy
                and cause deterministic injury (erythema, ulceration, hair loss) even when the
                effective dose is &quot;only&quot; 50–70 mSv. <em>Effective dose tells you nothing
                about local skin injury risk.</em>
              </li>
              <li>
                <strong>Effective dose (mSv)</strong> averages over the whole body weighted by tissue
                radiosensitivity. A 7 mSv CTPA and a 7 mSv abdominal CT carry similar overall
                stochastic risk but very different organ distributions (lungs &amp; breast vs. bowel
                &amp; gonads).
              </li>
              <li>
                Effective dose is also <strong>not measured</strong> — it is estimated from phantom
                models. ±40% uncertainty between scanners and patients is normal.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-foreground font-medium text-[11.5px]">
              Reading "days/years of background radiation"
            </p>
            <p>
              UK natural background averages <strong>~2.7 mSv/year</strong> (radon, cosmic, terrestrial,
              internal K-40 — varies regionally from ~2 to &gt;7 mSv/yr in granite areas like Cornwall).
              Expressing a scan as <em>"≈ 1 year of background"</em> is a communication device, not a
              biological equivalence:
            </p>
            <ul className="list-disc list-inside space-y-0.5 marker:text-muted-foreground mt-1">
              <li>
                Background is delivered <strong>chronically at very low rate</strong> (~7 µSv/day), which
                allows DNA repair between hits. A CT delivers the same energy in seconds — same total
                dose, but biologically <em>not</em> identical.
              </li>
              <li>
                The comparison assumes the linear-no-threshold (LNT) model of stochastic risk
                (≈ 5%/Sv attributable lifetime cancer risk for adults — higher in children, lower in
                the elderly).
              </li>
              <li>
                Use it to convey <em>magnitude</em> ("a CT abdomen ≈ 4 years of background") and
                <em> relative</em> risk between alternative tests, not to imply a scan is &quot;safe
                because we all get background anyway&quot;.
              </li>
            </ul>
          </div>

          <p className="italic">
            Bottom line: effective dose is the right number for justification and comparison between
            exams; peak skin dose is the right number for deterministic injury in interventional work;
            background-equivalent days/years are a patient-friendly translation, not a biological law.
          </p>

          <p className="border-t border-border pt-1.5 mt-1">
            Sources for table values: PHE/UKHSA <em>Patient dose information</em>, RCR <em>iRefer</em>,
            AAPM Report 96. Actual dose varies with scanner generation, protocol, patient size and
            operator technique; interventional fluoroscopic doses are particularly variable. UK
            background = 2.7 mSv/yr.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RadiationDoseComparisonTable;
