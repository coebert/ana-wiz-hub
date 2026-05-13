import { useMemo, useState } from "react";
import { withAlpha } from "@/lib/color-utils";

/* ─── data ─── */

type BleedRisk = "low" | "moderate" | "high";

interface RestartDrug {
  name: string;
  value: string;
  group: string;
  /** Hours after surgery (no epidural, low bleed risk) before restart */
  restartLow: number;
  /** moderate bleed risk */
  restartMod: number;
  /** high bleed risk */
  restartHigh: number;
  /** Additional delay (h) if indwelling epidural catheter — catheter must be removed BEFORE restart */
  cathDelay: number;
  /** Minimum hours between drug restart and safe catheter removal */
  cathRemovalAfterRestart: number;
  /** If >0, catheter must be removed this many hours AFTER last dose (and before restart) */
  cathRemovalPreDrugHrs: number;
  note: string;
}

const DRUGS: RestartDrug[] = [
  // ── Antiplatelets ──
  { name: "Aspirin (≤300 mg)", value: "aspirin", group: "Antiplatelet",
    restartLow: 6, restartMod: 6, restartHigh: 24,
    cathDelay: 0, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 0,
    note: "Aspirin can often be continued peri-op. If stopped, restart 6–24 h post-op depending on bleed risk." },
  { name: "Clopidogrel", value: "clopidogrel", group: "Antiplatelet",
    restartLow: 6, restartMod: 24, restartHigh: 48,
    cathDelay: 0, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 6,
    note: "Remove epidural catheter ≥6 h after last clopidogrel; restart ≥6 h after catheter removal (ESAIC 2022)." },
  { name: "Prasugrel", value: "prasugrel", group: "Antiplatelet",
    restartLow: 6, restartMod: 24, restartHigh: 48,
    cathDelay: 0, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 7 * 24,
    note: "Potent — often bridged with tirofiban. Restart ≥6 h after catheter removal." },
  { name: "Ticagrelor", value: "ticagrelor", group: "Antiplatelet",
    restartLow: 6, restartMod: 24, restartHigh: 48,
    cathDelay: 0, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 6,
    note: "Restart 6–48 h post-op. Catheter removal at least 6 h before restart." },

  // ── LMWH ──
  { name: "LMWH — prophylactic", value: "lmwh-prophy", group: "LMWH",
    restartLow: 6, restartMod: 12, restartHigh: 24,
    cathDelay: 4, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 12,
    note: "Restart ≥4 h after catheter removal (AAGBI 2013). Remove catheter ≥12 h after last prophylactic dose." },
  { name: "LMWH — treatment dose", value: "lmwh-treat", group: "LMWH",
    restartLow: 12, restartMod: 24, restartHigh: 48,
    cathDelay: 4, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 24,
    note: "Remove catheter ≥24 h after last treatment dose. Restart ≥4 h after catheter removal." },

  // ── UFH ──
  { name: "UFH — SC prophylactic", value: "ufh-sc", group: "UFH",
    restartLow: 2, restartMod: 6, restartHigh: 12,
    cathDelay: 1, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 4,
    note: "Restart 1 h after catheter removal. Check APTT." },
  { name: "UFH — IV therapeutic", value: "ufh-iv", group: "UFH",
    restartLow: 4, restartMod: 6, restartHigh: 12,
    cathDelay: 4, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 4,
    note: "Restart infusion ≥4 h after catheter removal. APTT must be ≤1.4 before removal." },

  // ── DOACs ──
  { name: "Apixaban", value: "apixaban", group: "DOAC",
    restartLow: 6, restartMod: 24, restartHigh: 48,
    cathDelay: 6, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 26,
    note: "Remove catheter ≥26 h after last dose. Restart ≥6 h after catheter removal." },
  { name: "Rivaroxaban", value: "rivaroxaban", group: "DOAC",
    restartLow: 6, restartMod: 24, restartHigh: 48,
    cathDelay: 6, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 26,
    note: "Remove catheter ≥26 h after last dose. Restart ≥6 h after catheter removal." },
  { name: "Dabigatran", value: "dabigatran", group: "DOAC",
    restartLow: 6, restartMod: 24, restartHigh: 72,
    cathDelay: 6, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 48,
    note: "Highly renally cleared. Remove catheter ≥48 h after last dose; ≥72 h if CrCl <50." },
  { name: "Edoxaban", value: "edoxaban", group: "DOAC",
    restartLow: 6, restartMod: 24, restartHigh: 48,
    cathDelay: 6, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 26,
    note: "Remove catheter ≥26 h after last dose. Restart ≥6 h after catheter removal." },

  // ── Warfarin ──
  { name: "Warfarin", value: "warfarin", group: "Warfarin",
    restartLow: 12, restartMod: 24, restartHigh: 48,
    cathDelay: 0, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 0,
    note: "Can restart same evening as surgery (takes ~3 d to reach therapeutic INR). Remove catheter when INR <1.4." },

  // ── Fondaparinux ──
  { name: "Fondaparinux (prophylactic)", value: "fondaparinux-prophy", group: "Other",
    restartLow: 6, restartMod: 24, restartHigh: 48,
    cathDelay: 0, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 36,
    note: "Epidural catheters best avoided with fondaparinux. Single-shot preferred." },
  { name: "Fondaparinux (treatment)", value: "fondaparinux-treat", group: "Other",
    restartLow: 12, restartMod: 48, restartHigh: 72,
    cathDelay: 0, cathRemovalAfterRestart: 0, cathRemovalPreDrugHrs: 36,
    note: "Neuraxial generally avoided at treatment dose." },
];

const BLEED_OPTIONS: { value: BleedRisk; label: string; desc: string; color: string }[] = [
  { value: "low", label: "Low", desc: "Minor surgery — e.g. inguinal hernia, minor ortho, cataract", color: "hsl(145, 60%, 42%)" },
  { value: "moderate", label: "Moderate", desc: "Intermediate — e.g. hip/knee arthroplasty, abdominal surgery", color: "hsl(35, 85%, 50%)" },
  { value: "high", label: "High", desc: "Major / high bleed risk — e.g. hepatobiliary, cardiac, neurosurgery", color: "hsl(0, 70%, 52%)" },
];

/* ─── component ─── */

export const AnticoagRestartTimeline = () => {
  const [drugVal, setDrugVal] = useState("lmwh-prophy");
  const [bleed, setBleed] = useState<BleedRisk>("moderate");
  const [hasEpidural, setHasEpidural] = useState(false);

  const drug = useMemo(() => DRUGS.find(d => d.value === drugVal)!, [drugVal]);

  const timeline = useMemo(() => {
    const baseRestart = bleed === "low" ? drug.restartLow : bleed === "moderate" ? drug.restartMod : drug.restartHigh;

    const events: { label: string; startH: number; endH: number; color: string; type: "bar" | "milestone"; detail: string }[] = [];

    // Surgery bar (0-2h nominal)
    events.push({ label: "Surgery", startH: 0, endH: 2, color: "hsl(220, 60%, 55%)", type: "bar", detail: "End of surgery = time zero" });

    if (hasEpidural) {
      // catheter in situ period
      const cathRemoveH = Math.max(baseRestart, drug.cathDelay > 0 ? baseRestart : 0);
      // Catheter must stay in at least until surgical haemostasis established
      const cathMinInSitu = 6; // minimum hours with catheter post-op for analgesia
      const cathRemoveTime = Math.max(cathMinInSitu, cathRemoveH);
      
      events.push({
        label: "Epidural catheter in situ",
        startH: 0,
        endH: cathRemoveTime,
        color: "hsl(265, 50%, 55%)",
        type: "bar",
        detail: `Catheter provides post-op analgesia. Remove before restarting anticoagulation.`,
      });

      events.push({
        label: "Catheter removal",
        startH: cathRemoveTime,
        endH: cathRemoveTime,
        color: "hsl(265, 50%, 55%)",
        type: "milestone",
        detail: `Remove catheter at ${fmtHrs(cathRemoveTime)} post-op — verify neurological function before and after.`,
      });

      // Drug restart = catheter removal + cathDelay
      const drugRestart = cathRemoveTime + drug.cathDelay;

      events.push({
        label: "Wait period",
        startH: cathRemoveTime,
        endH: drugRestart,
        color: "hsl(45, 80%, 55%)",
        type: "bar",
        detail: `≥${drug.cathDelay} h after catheter removal before restarting ${drug.name}.`,
      });

      events.push({
        label: `Restart ${drug.name}`,
        startH: drugRestart,
        endH: drugRestart,
        color: "hsl(145, 60%, 42%)",
        type: "milestone",
        detail: `Safe to restart at ${fmtHrs(drugRestart)} post-op (${fmtHrs(drug.cathDelay)} after catheter removal).`,
      });

      // Therapeutic effect line
      const therapeuticH = drugRestart + (drug.group === "Warfarin" ? 72 : drug.group === "Antiplatelet" ? 4 : 2);
      events.push({
        label: "Approaching therapeutic",
        startH: drugRestart,
        endH: therapeuticH,
        color: "hsl(145, 60%, 42%)",
        type: "bar",
        detail: `${drug.group === "Warfarin" ? "INR approaches therapeutic range ~72 h after restart" : "Drug approaching steady-state anticoagulant effect"}.`,
      });
    } else {
      // No epidural — simple restart
      events.push({
        label: "Haemostasis window",
        startH: 2,
        endH: baseRestart,
        color: "hsl(45, 80%, 55%)",
        type: "bar",
        detail: `Surgical haemostasis must be established. Wait ≥${fmtHrs(baseRestart)} post-op for ${bleed}-risk surgery.`,
      });

      events.push({
        label: `Restart ${drug.name}`,
        startH: baseRestart,
        endH: baseRestart,
        color: "hsl(145, 60%, 42%)",
        type: "milestone",
        detail: `Safe to restart at ${fmtHrs(baseRestart)} post-op (${bleed} bleeding risk).`,
      });

      const therapeuticH = baseRestart + (drug.group === "Warfarin" ? 72 : drug.group === "Antiplatelet" ? 4 : 2);
      events.push({
        label: "Approaching therapeutic",
        startH: baseRestart,
        endH: therapeuticH,
        color: "hsl(145, 60%, 42%)",
        type: "bar",
        detail: `${drug.group === "Warfarin" ? "INR approaches therapeutic range ~72 h after restart" : "Drug approaching steady-state effect"}.`,
      });
    }

    return events;
  }, [drug, bleed, hasEpidural]);

  // Compute timeline scale
  const maxH = useMemo(() => Math.max(...timeline.map(e => e.endH), 24), [timeline]);
  const scaleMax = Math.ceil(maxH / 12) * 12; // round to 12h

  const bleedColor = BLEED_OPTIONS.find(b => b.value === bleed)!.color;

  // Group drugs for select
  const drugGroups = useMemo(() => {
    const groups: { label: string; drugs: RestartDrug[] }[] = [];
    for (const d of DRUGS) {
      let g = groups.find(x => x.label === d.group);
      if (!g) { g = { label: d.group, drugs: [] }; groups.push(g); }
      g.drugs.push(d);
    }
    return groups;
  }, []);

  return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Inputs */}
      <div className="p-4 bg-secondary/30 border-b border-border space-y-4">
        {/* Drug picker */}
        <div>
          <label className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold block mb-1">Drug to restart</label>
          <select
            value={drugVal}
            onChange={e => setDrugVal(e.target.value)}
            className="w-full rounded-md border border-border bg-background text-foreground text-sm px-3 py-2"
          >
            {drugGroups.map(g => (
              <optgroup key={g.label} label={g.label}>
                {g.drugs.map(d => (
                  <option key={d.value} value={d.value}>{d.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Bleed risk */}
        <div>
          <label className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold block mb-1">Surgical bleeding risk</label>
          <div className="grid grid-cols-3 gap-1.5">
            {BLEED_OPTIONS.map(b => {
              const active = bleed === b.value;
              return (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setBleed(b.value)}
                  aria-pressed={active}
                  className="rounded-lg border-2 px-2 py-2 text-left transition-all"
                  style={{
                    borderColor: active ? b.color : "hsl(var(--border))",
                    backgroundColor: active ? withAlpha(b.color, 0.1) : "transparent",
                  }}
                >
                  <div className="text-xs font-bold" style={{ color: active ? b.color : "hsl(var(--foreground))" }}>{b.label}</div>
                  <div className="text-[9px] text-muted-foreground leading-tight mt-0.5 hidden sm:block">{b.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Epidural */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setHasEpidural(h => !h)}
            aria-pressed={hasEpidural}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              hasEpidural ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                hasEpidural ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm text-foreground">Indwelling epidural catheter</span>
        </div>
      </div>

      {/* Gantt chart */}
      <div className="p-4">
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-2">
          Post-operative timeline
        </div>

        {/* Time axis */}
        <div className="relative ml-[140px] sm:ml-[180px] mb-1">
          <div className="flex justify-between text-[9px] text-muted-foreground font-mono">
            {Array.from({ length: Math.min(7, Math.floor(scaleMax / 6) + 1) }, (_, i) => {
              const h = Math.round((i / Math.min(6, Math.floor(scaleMax / 6))) * scaleMax);
              return <span key={i}>{fmtHrsShort(h)}</span>;
            })}
          </div>
        </div>

        {/* Bars */}
        <div className="space-y-1.5">
          {timeline.map((ev, i) => {
            const left = (ev.startH / scaleMax) * 100;
            const width = ev.type === "milestone" ? 0 : ((ev.endH - ev.startH) / scaleMax) * 100;

            return (
                  <div key={i} className="flex items-center gap-2 group">
                <div className="w-[140px] sm:w-[180px] shrink-0 text-right pr-2">
                  <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{ev.label}</span>
                </div>
                <div className="flex-1 relative h-7 rounded bg-secondary/30">
                  {ev.type === "bar" ? (
                    <div
                      className="absolute top-0.5 bottom-0.5 rounded transition-all"
                      style={{
                        left: `${left}%`,
                        width: `${Math.max(1, width)}%`,
                        backgroundColor: withAlpha(ev.color, 0.5),
                        borderLeft: `3px solid ${ev.color}`,
                      }}
                    />
                  ) : (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 flex items-center"
                      style={{ left: `${left}%` }}
                    >
                      <div className="w-0.5 h-full" style={{ backgroundColor: ev.color }} />
                      <div
                        className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2"
                        style={{ borderColor: ev.color, backgroundColor: withAlpha(ev.color, 0.25) }}
                      />
                    </div>
                  )}
                  {/* Tooltip on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div
                      className="absolute -top-12 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground border border-border rounded-md px-2 py-1 text-[10px] leading-tight shadow-md w-48 text-center"
                    >
                      {ev.detail}
                    </div>
                  </div>
                </div>
              </div>
  );
          })}
        </div>

        {/* Summary card */}
        <div
          className="mt-4 rounded-lg border p-3"
          style={{ borderColor: withAlpha(bleedColor, 0.4), backgroundColor: withAlpha(bleedColor, 0.05) }}
        >
          <div className="text-[10px] uppercase tracking-wide font-semibold mb-1.5" style={{ color: bleedColor }}>
            Summary — {drug.name} · {bleed} bleeding risk{hasEpidural ? " · epidural in situ" : ""}
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
            {hasEpidural ? (
              <>
                <p>
                  <strong className="text-foreground">Catheter removal:</strong> ≥{fmtHrs(Math.max(6, bleed === "low" ? drug.restartLow : bleed === "moderate" ? drug.restartMod : drug.restartHigh))} post-op — verify motor & sensory function before and 2 h after removal.
                </p>
                <p>
                  <strong className="text-foreground">Drug restart:</strong> ≥{fmtHrs(drug.cathDelay)} after catheter removal.
                </p>
              </>
            ) : (
              <p>
                <strong className="text-foreground">Drug restart:</strong> ≥{fmtHrs(bleed === "low" ? drug.restartLow : bleed === "moderate" ? drug.restartMod : drug.restartHigh)} post-op, once haemostasis confirmed.
              </p>
            )}
            <p className="text-[10px] italic">{drug.note}</p>
          </div>
        </div>

        {/* Caveats */}
        <div className="mt-3 rounded-lg border border-border p-3 bg-secondary/10">
          <div className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-1">Important caveats</div>
          <ul className="text-[10px] text-muted-foreground leading-relaxed space-y-0.5">
            <li>• Always confirm surgical haemostasis before restarting any anticoagulant.</li>
            <li>• Renal impairment: extend intervals for renally cleared drugs (LMWH, dabigatran, fondaparinux).</li>
            <li>• Epidural catheter: check motor block (Bromage 0) before and after removal; report new weakness immediately.</li>
            <li>• This is an educational tool based on AAGBI 2013 & ESAIC 2022. Always follow your local protocol.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

function fmtHrs(h: number): string {
  if (h < 1) return `${Math.round(h * 60)} min`;
  if (h < 24) return `${h} h`;
  const d = Math.floor(h / 24);
  const rem = h % 24;
  return rem > 0 ? `${d} d ${rem} h` : `${d} d`;
}

function fmtHrsShort(h: number): string {
  if (h < 24) return `${h}h`;
  return `${Math.round(h / 24)}d`;
}

export default AnticoagRestartTimeline;
