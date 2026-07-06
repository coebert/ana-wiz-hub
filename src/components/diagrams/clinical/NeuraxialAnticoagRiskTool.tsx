import { useMemo, useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Neuraxial complication risk stratification tool.
 *
 * Maps a patient's coagulation parameters, drug timing, platelet count and
 * intended technique against the published intervals from:
 *   - AAGBI: Regional anaesthesia and patients with abnormalities of coagulation (2013)
 *   - ESAIC (formerly ESA) European guidelines on regional anaesthesia
 *     and antithrombotic agents (2022 update)
 *
 * Output is a clear traffic-light verdict (proceed / caution / avoid) with
 * the specific minimum interval that should elapse before block, and the
 * shortest interval before the next dose can be re-given.
 *
 * Educational tool only — never substitute for senior, drug-specific advice
 * and the most recent local guideline.
 */

type Procedure = "single-spinal" | "epidural-cse" | "epidural-removal" | "deep-block" | "superficial-block";

interface DrugInterval {
  /** display name */
  name: string;
  /** key (used in select) */
  value: string;
  /** drug class for grouping in the dropdown */
  group: "Antiplatelet" | "Anticoagulant — prophylactic" | "Anticoagulant — treatment" | "DOAC" | "Fibrinolytic" | "Other";
  /** time before block (hours) — single-shot / catheter insertion */
  preBlock: number;
  /** time after block / catheter removal before next dose (hours) */
  postBlock: number;
  /** notes / source */
  note?: string;
  /** if true, neuraxial generally contraindicated (relative or absolute) */
  avoid?: boolean;
}

const drugs: DrugInterval[] = [
  { name: "None / aspirin monotherapy", value: "none", group: "Antiplatelet", preBlock: 0, postBlock: 0, note: "Aspirin (≤300 mg/day) alone is NOT a contraindication to neuraxial block (AAGBI 2013, ESAIC 2022)." },
  { name: "Clopidogrel", value: "clopidogrel", group: "Antiplatelet", preBlock: 7 * 24, postBlock: 6, note: "Stop ≥7 days pre-block. Restart ≥6 h after block / catheter removal." },
  { name: "Prasugrel", value: "prasugrel", group: "Antiplatelet", preBlock: 7 * 24, postBlock: 6, note: "Stop ≥7 days pre-block." },
  { name: "Ticagrelor", value: "ticagrelor", group: "Antiplatelet", preBlock: 5 * 24, postBlock: 6, note: "Stop ≥5 days pre-block." },
  { name: "Dipyridamole (modified release)", value: "dipyridamole", group: "Antiplatelet", preBlock: 24, postBlock: 6, note: "Stop ≥24 h pre-block (ESAIC 2022)." },
  { name: "GP IIb/IIIa inhibitors (abciximab, tirofiban, eptifibatide)", value: "gpiib", group: "Antiplatelet", preBlock: 48, postBlock: 6, avoid: true, note: "Abciximab 24–48 h, tirofiban/eptifibatide 8 h. Generally AVOID neuraxial in this window." },

  { name: "LMWH — prophylactic (enoxaparin ≤40 mg, dalteparin ≤5000 IU)", value: "lmwh-prophy", group: "Anticoagulant — prophylactic", preBlock: 12, postBlock: 4, note: "12 h since last prophylactic dose. Restart ≥4 h after block / catheter removal." },
  { name: "LMWH — treatment dose", value: "lmwh-treat", group: "Anticoagulant — treatment", preBlock: 24, postBlock: 4, note: "24 h since last treatment dose (e.g. enoxaparin 1 mg/kg BD). Catheter removal ≥24 h after last dose." },
  { name: "Unfractionated heparin — SC prophylactic (≤5000 IU)", value: "ufh-sc", group: "Anticoagulant — prophylactic", preBlock: 4, postBlock: 1, note: "4 h since last SC dose (some UK centres use 6 h if BD/TDS). Check APTT if uncertain." },
  { name: "Unfractionated heparin — IV treatment infusion", value: "ufh-iv", group: "Anticoagulant — treatment", preBlock: 4, postBlock: 4, note: "Stop infusion 4 h pre-block; APTT ratio must be ≤1.4 before block." },
  { name: "Warfarin", value: "warfarin", group: "Anticoagulant — treatment", preBlock: 5 * 24, postBlock: 0, note: "INR <1.4 required. Typically stop 5 days pre-elective block; bridging only if very high thrombotic risk." },
  { name: "Fondaparinux ≤2.5 mg/day (prophylactic)", value: "fondaparinux-prophy", group: "Anticoagulant — prophylactic", preBlock: 36, postBlock: 6, note: "36 h pre-block. Avoid catheters — single-shot only." },
  { name: "Fondaparinux >2.5 mg/day (treatment)", value: "fondaparinux-treat", group: "Anticoagulant — treatment", preBlock: 72, postBlock: 12, avoid: true, note: "Generally avoid neuraxial." },

  { name: "Apixaban (prophylactic 2.5 mg BD)", value: "apixaban-prophy", group: "DOAC", preBlock: 24, postBlock: 6, note: "24–26 h since last dose (normal CrCl)." },
  { name: "Apixaban (treatment 5 mg BD)", value: "apixaban-treat", group: "DOAC", preBlock: 48, postBlock: 6, note: "48 h since last treatment dose. ≥72 h if CrCl <30." },
  { name: "Rivaroxaban (prophylactic 10 mg OD)", value: "rivaroxaban-prophy", group: "DOAC", preBlock: 22, postBlock: 6, note: "22–26 h since last dose." },
  { name: "Rivaroxaban (treatment 15–20 mg)", value: "rivaroxaban-treat", group: "DOAC", preBlock: 48, postBlock: 6, note: "48 h since last dose; 72 h if renal impairment." },
  { name: "Dabigatran (prophylactic 110/150 mg BD)", value: "dabigatran-prophy", group: "DOAC", preBlock: 48, postBlock: 6, note: "Highly renally cleared — extend interval if CrCl <80." },
  { name: "Dabigatran (treatment)", value: "dabigatran-treat", group: "DOAC", preBlock: 96, postBlock: 6, note: "96 h if normal renal function; up to 120 h if impaired." },
  { name: "Edoxaban", value: "edoxaban", group: "DOAC", preBlock: 48, postBlock: 6, note: "48 h since last dose; longer if renal impairment." },

  { name: "Thrombolytics (alteplase, tenecteplase) within 10 days", value: "thrombolytic", group: "Fibrinolytic", preBlock: 240, postBlock: 240, avoid: true, note: "Absolute contraindication — bleeding risk extreme." },
  { name: "Bivalirudin / argatroban infusion", value: "bivalirudin", group: "Other", preBlock: 10, postBlock: 6, avoid: true, note: "Specialist input required; data limited." },
];

type Coag = "normal" | "abnormal" | "unknown";
type Plt = ">100" | "75-100" | "50-75" | "<50";

const procedures: { value: Procedure; label: string; risk: "low" | "moderate" | "high" }[] = [
  { value: "single-spinal", label: "Single-shot spinal (atraumatic needle)", risk: "low" },
  { value: "epidural-cse", label: "Epidural / CSE / catheter insertion", risk: "high" },
  { value: "epidural-removal", label: "Epidural catheter removal", risk: "high" },
  { value: "deep-block", label: "Deep peripheral / paravertebral / lumbar plexus", risk: "moderate" },
  { value: "superficial-block", label: "Superficial / fascial-plane block (compressible site)", risk: "low" },
];

interface Verdict {
  type: "proceed" | "caution" | "avoid";
  color: string;
  label: string;
  rationale: string[];
  postOp?: string;
}

const NeuraxialAnticoagRiskTool = () => {
  const [drug, setDrug] = useState<string>("none");
  const [hoursSince, setHoursSince] = useState<number>(0);
  const [procedure, setProcedure] = useState<Procedure>("single-spinal");
  const [coag, setCoag] = useState<Coag>("normal");
  const [platelets, setPlatelets] = useState<Plt>(">100");
  const [showSources, setShowSources] = useState(true);

  const drugObj = useMemo(() => drugs.find((d) => d.value === drug)!, [drug]);
  const procObj = useMemo(() => procedures.find((p) => p.value === procedure)!, [procedure]);

  const verdict: Verdict = useMemo(() => {
    const reasons: string[] = [];

    // Hard exclusions first
    if (drugObj.avoid) {
      reasons.push(`${drugObj.name}: ${drugObj.note ?? "Generally contraindicated for neuraxial / deep blocks."}`);
      if (procObj.risk === "high" || procObj.risk === "moderate") {
        return {
          type: "avoid",
          color: "hsl(0, 75%, 48%)",
          label: "AVOID — high bleeding risk",
          rationale: reasons,
        };
      }
    }
    if (coag === "abnormal") {
      reasons.push("Documented coagulopathy (abnormal PT/APTT/fibrinogen, DIC, hepatic failure or known bleeding disorder).");
      if (procObj.risk !== "low") {
        return { type: "avoid", color: "hsl(0, 75%, 48%)", label: "AVOID — coagulopathy", rationale: reasons };
      }
    }
    if (platelets === "<50") {
      reasons.push("Platelet count <50 ×10⁹/L — neuraxial generally contraindicated (AAGBI 2013).");
      return { type: "avoid", color: "hsl(0, 75%, 48%)", label: "AVOID — severe thrombocytopenia", rationale: reasons };
    }

    // Drug-timing logic
    const enoughTime = hoursSince >= drugObj.preBlock;
    if (!enoughTime && drugObj.preBlock > 0) {
      const remaining = drugObj.preBlock - hoursSince;
      reasons.push(
        `${drugObj.name}: ${drugObj.preBlock} h required pre-block (per AAGBI 2013 / ESAIC 2022); only ${hoursSince} h elapsed. Wait a further ${remaining} h.`,
      );
      if (procObj.risk === "low") {
        return {
          type: "caution",
          color: "hsl(38, 92%, 48%)",
          label: "CAUTION — short interval, low-risk technique only",
          rationale: [
            ...reasons,
            "Low-risk superficial / single-shot technique at a compressible site MAY proceed with senior input and full informed consent — but document carefully.",
          ],
          postOp: drugObj.postBlock ? `Restart drug ≥${drugObj.postBlock} h after block.` : undefined,
        };
      }
      return {
        type: "avoid",
        color: "hsl(0, 75%, 48%)",
        label: "AVOID — drug interval not satisfied",
        rationale: reasons,
      };
    }

    // Platelet thresholds
    if (platelets === "50-75") {
      reasons.push("Platelets 50–75 ×10⁹/L — neuraxial only after individualised risk-benefit, ideally with viscoelastic test (TEG/ROTEM) confirming function.");
      return {
        type: "caution",
        color: "hsl(38, 92%, 48%)",
        label: "CAUTION — borderline platelets",
        rationale: reasons,
        postOp: drugObj.postBlock ? `Restart drug ≥${drugObj.postBlock} h after block / catheter removal.` : undefined,
      };
    }
    if (platelets === "75-100") {
      reasons.push("Platelets 75–100 ×10⁹/L — generally safe for single-shot spinal with atraumatic needle; epidural catheter requires individualised decision (AAGBI 2013).");
      if (procedure === "epidural-cse") {
        return {
          type: "caution",
          color: "hsl(38, 92%, 48%)",
          label: "CAUTION — borderline platelets for catheter",
          rationale: reasons,
          postOp: drugObj.postBlock ? `Restart drug ≥${drugObj.postBlock} h after block / catheter removal.` : undefined,
        };
      }
    }

    if (coag === "unknown") {
      reasons.push("Coagulation status unknown — check INR, APTT, fibrinogen and platelets before any non-emergency neuraxial procedure.");
      return { type: "caution", color: "hsl(38, 92%, 48%)", label: "CAUTION — confirm coagulation first", rationale: reasons };
    }

    if (drug !== "none") {
      reasons.push(`${drugObj.name}: ${drugObj.preBlock} h pre-block interval satisfied (${hoursSince} h elapsed).`);
    }
    reasons.push(`Platelets ${platelets} ×10⁹/L; coagulation ${coag}.`);

    return {
      type: "proceed",
      color: "hsl(140, 55%, 40%)",
      label: "PROCEED — criteria satisfied",
      rationale: reasons,
      postOp: drugObj.postBlock
        ? `Restart drug ≥${drugObj.postBlock} h after block / catheter removal. For catheters, remove ≥${drugObj.preBlock} h after last dose, then wait ≥${drugObj.postBlock} h before next.`
        : "No drug-related restart restriction.",
    };
  }, [drugObj, hoursSince, procObj, coag, platelets, drug, procedure]);

  const grouped = useMemo(() => {
    const map = new Map<string, DrugInterval[]>();
    drugs.forEach((d) => {
      if (!map.has(d.group)) map.set(d.group, []);
      map.get(d.group)!.push(d);
    });
    return Array.from(map.entries());
  }, []);

  return (
    <DiagramFigure
      id="neuraxial-anticoag-risk-tool"
      title="Neuraxial anticoag risk tool"
      description="Auto-generated wrapper for the Neuraxial anticoag risk tool anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Neuraxial complication risk stratification"
            subtitle="Coagulation × drug timing × platelets × procedure → AAGBI / ESAIC verdict"
            toggles={[{ label: "Sources", active: showSources, onChange: () => setShowSources((s) => !s) }]}
          />
  
          <div className="grid sm:grid-cols-2 gap-3">
            {/* Procedure */}
            <div className="space-y-1">
              <label htmlFor="proc" className="text-xs font-semibold text-foreground">
                Intended procedure
              </label>
              <select
                id="proc"
                value={procedure}
                onChange={(e) => setProcedure(e.target.value as Procedure)}
                className="w-full text-sm rounded-md border border-border bg-background px-2 py-1.5"
              >
                {procedures.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label} ({p.risk}-risk)
                  </option>
                ))}
              </select>
            </div>
  
            {/* Drug */}
            <div className="space-y-1">
              <label htmlFor="drug" className="text-xs font-semibold text-foreground">
                Antiplatelet / anticoagulant
              </label>
              <select
                id="drug"
                value={drug}
                onChange={(e) => {
                  setDrug(e.target.value);
                  setHoursSince(0);
                }}
                className="w-full text-sm rounded-md border border-border bg-background px-2 py-1.5"
              >
                {grouped.map(([group, list]) => (
                  <optgroup key={group} label={group}>
                    {list.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
  
            {/* Hours since last dose */}
            <div className="space-y-1">
              <label htmlFor="hrs" className="text-xs font-semibold text-foreground">
                Hours since last dose
                <span className="text-muted-foreground font-normal">
                  {drugObj.preBlock > 0 ? ` (need ≥${drugObj.preBlock} h)` : ""}
                </span>
              </label>
              <input
                id="hrs"
                type="number"
                min={0}
                max={500}
                value={hoursSince}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (Number.isFinite(v)) setHoursSince(Math.max(0, Math.min(500, v)));
                }}
                className="w-full text-sm rounded-md border border-border bg-background px-2 py-1.5"
                disabled={drug === "none"}
              />
            </div>
  
            {/* Platelets */}
            <div className="space-y-1">
              <label htmlFor="plt" className="text-xs font-semibold text-foreground">
                Platelet count (×10⁹/L)
              </label>
              <select
                id="plt"
                value={platelets}
                onChange={(e) => setPlatelets(e.target.value as Plt)}
                className="w-full text-sm rounded-md border border-border bg-background px-2 py-1.5"
              >
                <option value=">100">&gt;100 (normal)</option>
                <option value="75-100">75–100</option>
                <option value="50-75">50–75</option>
                <option value="<50">&lt;50 (severe)</option>
              </select>
            </div>
  
            {/* Coag status */}
            <div className="space-y-1 sm:col-span-2">
              <p className="text-xs font-semibold text-foreground">Coagulation screen (PT / APTT / fibrinogen)</p>
              <div className="flex flex-wrap gap-2">
                {(["normal", "abnormal", "unknown"] as Coag[]).map((c) => {
                  const active = coag === c;
                  const accent = c === "abnormal" ? "hsl(0, 75%, 48%)" : c === "unknown" ? "hsl(38, 92%, 48%)" : "hsl(140, 55%, 42%)";
                  return (
                        <button
                      key={c}
                      onClick={() => setCoag(c)}
                      aria-pressed={active}
                      className="px-3 py-1 rounded-md text-xs font-medium border transition-all capitalize"
                      style={{
                        borderColor: active ? accent : "hsl(var(--border))",
                        backgroundColor: active ? withAlpha(accent, 0.15) : "transparent",
                        color: active ? accent : "hsl(var(--foreground))",
                      }}
                    >
                      {c}
                    </button>
    );
                })}
              </div>
            </div>
          </div>
  
          {/* Verdict */}
          <div
            className="mt-4 p-3 rounded-lg border-2"
            style={{ borderColor: verdict.color, backgroundColor: withAlpha(verdict.color, 0.08) }}
          >
            <p className="text-sm font-bold mb-2" style={{ color: verdict.color }}>
              {verdict.label}
            </p>
            <ul className="text-xs text-foreground/90 leading-relaxed list-disc list-inside space-y-1">
              {verdict.rationale.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            {verdict.postOp && (
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                <span className="font-semibold text-foreground/80">Post-block / restart: </span>
                {verdict.postOp}
              </p>
            )}
          </div>
  
          {showSources && (
            <div className="mt-3 p-3 rounded-lg border border-border bg-background/50">
              <p className="text-[11px] font-semibold text-foreground mb-1">Selected drug — published intervals</p>
              <ul className="text-[11px] text-muted-foreground leading-relaxed space-y-0.5">
                <li>
                  <strong>{drugObj.name}</strong>
                </li>
                <li>Time before block: <strong>{drugObj.preBlock} h</strong></li>
                <li>Time before next dose after block / catheter removal: <strong>{drugObj.postBlock} h</strong></li>
                {drugObj.note && <li className="italic">{drugObj.note}</li>}
              </ul>
            </div>
          )}
  
          <p className="text-[11px] text-muted-foreground mt-2 italic text-center leading-relaxed">
            Sources: AAGBI <em>Regional anaesthesia and patients with abnormalities of coagulation</em> (2013); ESAIC <em>European guidelines on regional anaesthesia and antithrombotic agents</em> (2022). Educational tool only — always check current product literature, local guidance and discuss with senior colleagues. Catheter removal carries the same bleeding risk as insertion — apply the same intervals.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default NeuraxialAnticoagRiskTool;
