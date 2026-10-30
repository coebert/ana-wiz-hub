import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import {
  FPM_ORAL,
  FPM_PATCH,
  FPM_URL,
  type FpmOralKey,
  type FpmPatchKey,
  minimumFpmReduction,
  omeddFromOral,
  omeddFromPatch,
  oralTargetDailyMg,
  perDoseMg,
} from "@/lib/calculators/t1-calculators";

/**
 * Educational opioid-equivalence estimator using ONE named convention:
 * FPM Opioids Aware oral potency and transdermal tables (reviewed March 2023).
 * Patch rates (micrograms/hour) are kept separate from daily oral masses (mg/24 h).
 * No patch strength, rescue dose or titration step is generated automatically.
 */

const SCOT_FENT = "https://www.rightdecisions.scot.nhs.uk/scottish-palliative-care-guidelines/pain/pain-medicines-analgesics/fentanyl-patches/";
const SCOT_BUP = "https://www.rightdecisions.scot.nhs.uk/scottish-palliative-care-guidelines/pain/pain-medicines-analgesics/buprenorphine-patches/";

type SourceKind = { kind: "oral"; key: FpmOralKey } | { kind: "patch"; key: FpmPatchKey };
const SOURCE_OPTIONS: { id: string; label: string; src: SourceKind }[] = [
  ...FPM_ORAL.map((o) => ({ id: `oral:${o.key}`, label: o.label, src: { kind: "oral", key: o.key } as SourceKind })),
  ...(Object.keys(FPM_PATCH) as FpmPatchKey[]).map((k) => ({ id: `patch:${k}`, label: FPM_PATCH[k].label, src: { kind: "patch", key: k } as SourceKind })),
];

const TARGET_INTERVALS = [
  { value: "", label: "Select the target formulation's prescribed interval" },
  { value: "6", label: "4-hourly (6 doses/24 h)" },
  { value: "2", label: "12-hourly (2 doses/24 h)" },
  { value: "1", label: "24-hourly (1 dose/24 h)" },
];

const fmt = (n: number) => (n >= 10 ? Math.round(n).toString() : (Math.round(n * 10) / 10).toString());

const OpioidConversionCalculator = () => {
  const [sourceId, setSourceId] = useState("oral:oxycodone");
  const [doseText, setDoseText] = useState("20");
  const [dosesPerDay, setDosesPerDay] = useState("2");
  const [patchStrength, setPatchStrength] = useState("");
  const [targetKey, setTargetKey] = useState<FpmOralKey>("morphine");
  const [targetInterval, setTargetInterval] = useState("");
  const [reductionPct, setReductionPct] = useState(25);
  const [highRisk, setHighRisk] = useState(false);

  const source = SOURCE_OPTIONS.find((s) => s.id === sourceId)!.src;
  const omedd =
    source.kind === "oral"
      ? omeddFromOral(source.key, Number(doseText), Number(dosesPerDay))
      : omeddFromPatch(source.key, Number(patchStrength));

  const minReduction = omedd !== null ? minimumFpmReduction(omedd, highRisk) : 25;
  const effectiveReduction = Math.max(reductionPct, minReduction);
  const sameDrug = source.kind === "oral" && source.key === targetKey;
  const targetDaily = omedd !== null ? oralTargetDailyMg(omedd, targetKey, sameDrug ? 0 : effectiveReduction) : null;
  const targetUnreduced = omedd !== null ? oralTargetDailyMg(omedd, targetKey, 0) : null;
  const perDose = perDoseMg(targetDaily, targetInterval ? Number(targetInterval) : null);
  const targetLabel = FPM_ORAL.find((o) => o.key === targetKey)!.label;

  return (
    <DiagramFigure
      id="opioid-conversion-calculator"
      title="Opioid conversion"
      description="Educational opioid-equivalence estimator using the FPM Opioids Aware tables: oral morphine equivalent per 24 hours, kept separate from patch rates, with no automatic patch, rescue or titration prescribing."
    >
      <div className="my-6 p-4 rounded-xl border border-border bg-card">
        <div className="mb-3">
          <h3 className="text-lg font-serif font-bold text-foreground">Opioid equivalence estimator (FPM Opioids Aware tables)</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Estimates only, using one named convention — the{" "}
            <a href={FPM_URL} target="_blank" rel="noopener noreferrer" className="underline">FPM dose-equivalents tables</a>{" "}
            (reviewed March 2023). FPM: conversion factors are approximate, an individualised approach is necessary and switching
            should be supervised by a competent practitioner. This is not a prescription.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-lg border border-border bg-secondary/30 space-y-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Current opioid</p>
            <label className="sr-only" htmlFor="opioid-source">Current opioid</label>
            <select id="opioid-source" value={sourceId} onChange={(e) => setSourceId(e.target.value)} className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm">
              {SOURCE_OPTIONS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            {source.kind === "oral" ? (
              <div className="grid grid-cols-2 gap-2">
                <label className="text-[11px] font-semibold text-foreground">
                  Dose per administration (mg)
                  <input type="number" min={0} step={0.5} value={doseText} onChange={(e) => setDoseText(e.target.value)} className="w-full mt-0.5 px-2 py-1 rounded border border-border bg-background text-sm font-mono" />
                </label>
                <label className="text-[11px] font-semibold text-foreground">
                  Doses per 24 h
                  <input type="number" min={1} max={24} step={1} value={dosesPerDay} onChange={(e) => setDosesPerDay(e.target.value)} className="w-full mt-0.5 px-2 py-1 rounded border border-border bg-background text-sm font-mono" />
                </label>
              </div>
            ) : (
              <label className="text-[11px] font-semibold text-foreground block">
                Patch strength (micrograms/hour) — FPM-listed strengths only
                <select value={patchStrength} onChange={(e) => setPatchStrength(e.target.value)} className="w-full mt-0.5 px-2 py-1 rounded border border-border bg-background text-sm font-mono">
                  <option value="">Select strength</option>
                  {FPM_PATCH[source.key].rows.map((r) => <option key={r.ugPerHour} value={r.ugPerHour}>{r.ugPerHour} micrograms/hour</option>)}
                </select>
              </label>
            )}
          </div>

          <div className="p-3 rounded-lg border border-border bg-secondary/30 space-y-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Estimate for (oral)</p>
            <select aria-label="Target oral opioid" value={targetKey} onChange={(e) => setTargetKey(e.target.value as FpmOralKey)} className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm">
              {FPM_ORAL.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
            <select aria-label="Target prescribed interval" value={targetInterval} onChange={(e) => setTargetInterval(e.target.value)} className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm">
              {TARGET_INTERVALS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <label className="text-[11px] font-semibold text-foreground flex items-center justify-between">
              <span>Dose reduction from calculated equivalent</span>
              <span className="font-mono text-primary">−{sameDrug ? 0 : effectiveReduction}%</span>
            </label>
            <input type="range" aria-label="Dose reduction percent" min={25} max={75} step={5} value={reductionPct} onChange={(e) => setReductionPct(Number(e.target.value))} className="w-full accent-primary" />
            <label className="flex items-start gap-2 text-[11px] text-foreground cursor-pointer">
              <input type="checkbox" checked={highRisk} onChange={(e) => setHighRisk(e.target.checked)} className="mt-0.5 accent-primary" />
              <span>Elderly or frail, or switching because of intolerable effects (FPM: reduce by at least 50%; also applies at ≥500 mg/24 h).</span>
            </label>
            <p className="text-[10px] text-muted-foreground">FPM gives 25–50% as a starting point; the right reduction depends on circumstances.</p>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-border bg-background mb-3">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">Oral morphine equivalent (mg/24 h)</p>
          {omedd === null ? (
            <p className="text-sm text-destructive" role="status">
              {source.kind === "patch" ? "Select an FPM-listed patch strength." : "Enter a dose above zero and a whole number of doses (1–24) per 24 h."}
            </p>
          ) : (
            <>
              <p className="text-3xl font-bold font-mono text-foreground">{fmt(omedd)} <span className="text-sm font-normal text-muted-foreground">mg oral morphine / 24 h</span></p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {source.kind === "oral"
                  ? `${doseText} mg × ${dosesPerDay}/24 h × FPM potency ${FPM_ORAL.find((o) => o.key === source.key)!.potency}`
                  : `FPM table: ${patchStrength} micrograms/hour patch ≈ ${omedd} mg oral morphine/24 h (a rate, not a daily mass)`}
              </p>
              {omedd > 120 && <p className="text-[11px] text-destructive mt-1.5">Above 120 mg/24 h: FPM Opioids Aware notes increased harm without increased benefit in persistent pain — seek specialist review.</p>}
            </>
          )}
        </div>

        {omedd !== null && targetDaily !== null && (
          <div className="p-3 rounded-lg border-2 border-primary/30 bg-primary/5">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">{targetLabel} — equianalgesic estimate</p>
            <div className="grid sm:grid-cols-3 gap-2 text-sm">
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-[10px] text-muted-foreground uppercase">Calculated equivalent</p>
                <p className="font-mono font-semibold text-muted-foreground">{fmt(targetUnreduced!)} mg / 24 h</p>
              </div>
              <div className="p-2 rounded bg-background border-2 border-primary">
                <p className="text-[10px] text-primary uppercase font-semibold">After −{sameDrug ? 0 : effectiveReduction}%</p>
                <p className="font-mono font-bold text-primary">{fmt(targetDaily)} mg / 24 h</p>
              </div>
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-[10px] text-muted-foreground uppercase">Per dose at chosen interval</p>
                <p className="font-mono font-semibold text-foreground">{perDose === null ? "Select interval" : `${fmt(perDose)} mg`}</p>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              Breakthrough doses are not generated. Choose any immediate-release rescue medicine separately from the protocol you are
              following, based on the final intended regular regimen. After switching, FPM advises titrating carefully to individual
              response with close monitoring.
            </p>
          </div>
        )}

        <div className="mt-3 grid sm:grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded bg-secondary/30 border border-border text-muted-foreground">
            <strong className="text-foreground">Converting to a patch:</strong> no patch strength is chosen automatically. Compare the
            FPM transdermal table above with a named product and the{" "}
            <a href={SCOT_FENT} target="_blank" rel="noopener noreferrer" className="underline">Scottish fentanyl</a> /{" "}
            <a href={SCOT_BUP} target="_blank" rel="noopener noreferrer" className="underline">buprenorphine</a> patch guidance. Patches
            are never used as rescue medication. Scottish guidance: continue the previous regular opioid for about the first 12 h after
            a first fentanyl patch (onset), and review the dose at 72 h when levels reach steady state; seek specialist advice where required.
          </div>
          <div className="p-2.5 rounded bg-destructive/5 border border-destructive/20 text-muted-foreground">
            <strong className="text-foreground">Not included:</strong> methadone (FPM: specialist advice always), parenteral opioids and
            parenteral fentanyl — these need route-specific specialist conversion and are not estimated here.
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default OpioidConversionCalculator;
