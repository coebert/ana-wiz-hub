import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { RCH_EPIDURAL_URL, RCH_PCA_URL, rchPaedsPca, rchRopivacaineEpidural, type RchPcaBoundary, type RchPcaResult } from "@/lib/calculators/t1-calculators";

/**
 * PCA + epidural teaching calculator.
 *
 * Paediatric outputs implement ONE named protocol — Royal Children's Hospital (RCH) Melbourne
 * PCA dilution table and RCH epidural ropivacaine 0.2% 0.1–0.3 mL/kg/h — using MEASURED weight only.
 * No rate above the protocol range is produced; RCH special groups receive no rate.
 * Adult values are example UK regimens shown for teaching, not computed prescriptions.
 */

type Population = "adult" | "paeds";
type PcaOpioid = "morphine" | "fentanyl" | "oxycodone" | "hydromorphone";

const BUCKS_URL = "https://www.bucksformulary.nhs.uk/docs/Guideline_332FM.pdf";

const ADULT_PCA_EXAMPLES: Record<"morphine" | "fentanyl" | "oxycodone", { bolus: string; lockout: string; background: string; conc: string }> = {
  morphine: { bolus: "1 mg", lockout: "5 min", background: "None (restricted settings only)", conc: "1 mg/mL" },
  fentanyl: { bolus: "20 micrograms", lockout: "5 min", background: "None (restricted settings only)", conc: "10 micrograms/mL" },
  oxycodone: { bolus: "1 mg", lockout: "5 min", background: "None (restricted settings only)", conc: "1 mg/mL" },
};

const PcaEpiduralCalculator = () => {
  const [pop, setPop] = useState<Population>("adult");
  const [weightText, setWeightText] = useState("");
  const [ageMonthsText, setAgeMonthsText] = useState("");
  const [hepatic, setHepatic] = useState(false);
  const [opioid, setOpioid] = useState<PcaOpioid>("morphine");

  const weight = Number(weightText);
  const ageMonths = Number(ageMonthsText);
  const pcaRaw = pop === "paeds" && weightText !== "" ? rchPaedsPca(opioid, weight) : null;
  const pcaBoundary = pcaRaw && "boundary" in pcaRaw && pcaRaw.boundary ? (pcaRaw as RchPcaBoundary) : null;
  const pca = pcaRaw && !pcaBoundary ? (pcaRaw as RchPcaResult) : null;
  const ep = pop === "paeds" && weightText !== "" && ageMonthsText !== "" ? rchRopivacaineEpidural(weight, ageMonths, hepatic) : null;
  const opioidKeys: PcaOpioid[] = pop === "paeds" ? ["morphine", "fentanyl", "oxycodone", "hydromorphone"] : ["morphine", "fentanyl", "oxycodone"];
  const adult = ADULT_PCA_EXAMPLES[(opioid === "hydromorphone" ? "morphine" : opioid) as keyof typeof ADULT_PCA_EXAMPLES];

  return (
    <DiagramFigure
      id="pca-epidural-calculator"
      title="PCA epidural"
      description="PCA and epidural teaching calculator: paediatric values follow the named RCH Melbourne PCA and ropivacaine 0.2% epidural protocols using measured weight; adult values are example regimens."
    >
      <div className="my-6 p-4 rounded-xl border border-border bg-card">
        <div className="mb-3">
          <h3 className="text-lg font-serif font-bold text-foreground">PCA + epidural teaching calculator</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Paediatric values follow the{" "}
            <a href={RCH_PCA_URL} target="_blank" rel="noopener noreferrer" className="underline">RCH Melbourne PCA</a> and{" "}
            <a href={RCH_EPIDURAL_URL} target="_blank" rel="noopener noreferrer" className="underline">RCH epidural infusion</a>{" "}
            guidelines only. At RCH only CPMS and anaesthesia staff prescribe PCA. Use your own hospital protocol for real patients.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-border bg-secondary/30 mb-4">
          <div className="flex flex-wrap gap-1.5 mb-3 text-xs">
            {(["adult", "paeds"] as Population[]).map((p) => (
              <button key={p} type="button" onClick={() => { setPop(p); if (p === "adult" && opioid === "hydromorphone") setOpioid("morphine"); }} aria-pressed={pop === p}
                className={`px-3 py-1 rounded border transition-colors ${pop === p ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-muted/50"}`}>
                {p === "adult" ? "Adult (examples)" : "Paediatric (RCH protocol)"}
              </button>
            ))}
          </div>
          {pop === "paeds" && (
            <div className="grid sm:grid-cols-3 gap-3">
              <label className="text-xs font-semibold text-foreground">
                Measured weight (kg)
                <input type="number" min={0} step={0.1} value={weightText} onChange={(e) => setWeightText(e.target.value)} className="w-full mt-1 px-2 py-1 rounded border border-border bg-background text-sm font-mono" />
              </label>
              <label className="text-xs font-semibold text-foreground">
                Age (months; corrected if premature)
                <input type="number" min={0} max={216} step={1} value={ageMonthsText} onChange={(e) => setAgeMonthsText(e.target.value)} className="w-full mt-1 px-2 py-1 rounded border border-border bg-background text-sm font-mono" />
              </label>
              <label className="flex items-start gap-2 text-[11px] text-foreground cursor-pointer mt-5">
                <input type="checkbox" checked={hepatic} onChange={(e) => setHepatic(e.target.checked)} className="mt-0.5 accent-primary" />
                Significantly impaired liver synthetic/metabolic function
              </label>
            </div>
          )}
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">IV opioid PCA</h4>
          <div className="flex flex-wrap gap-1.5 mb-2 text-xs">
            {opioidKeys.map((o) => (
              <button key={o} type="button" onClick={() => setOpioid(o)} aria-pressed={opioid === o}
                className={`px-2.5 py-1 rounded border capitalize transition-colors ${opioid === o ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-muted/50"}`}>
                {o}
              </button>
            ))}
          </div>

          {pop === "adult" ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <PcaCard label="Example bolus" value={adult.bolus} />
                <PcaCard label="Example lockout" value={adult.lockout} />
                <PcaCard label="Background" value={adult.background} />
                <PcaCard label="Concentration" value={adult.conc} />
              </div>
              <p className="text-[11px] text-muted-foreground mt-2">
                Illustrative settings within one institution's protocol —{" "}
                <a href={BUCKS_URL} target="_blank" rel="noopener noreferrer" className="underline">Buckinghamshire guideline 332FM.5</a>{" "}
                (effective March 2024, review March 2027, pp. 3–4). Not a universal UK regimen: that protocol permits other boluses and lockouts
                chosen individually, and restricts background infusion to specified settings. Opioid-tolerant patients need specialist review.
              </p>
            </>
          ) : pcaBoundary ? (
            <p className="text-sm text-destructive" role="status">{pcaBoundary.message}</p>
          ) : pca === null ? (
            <p className="text-sm text-muted-foreground" role="status">Enter a measured weight above zero to show the RCH dilution.</p>
          ) : (
            <>
              <div className="grid sm:grid-cols-3 gap-2">
                <PcaCard label={`Syringe (${pca.band})`} value={pca.syringe} />
                <PcaCard label="Bolus" value={`${pca.bolusMl} mL = ${pca.bolusDose} micrograms`} highlight />
                <PcaCard label="Background — rarely needed, specialist prescription only" value={`${pca.backgroundMlPerHour} mL/h`} sub={pca.backgroundDose} />
              </div>
              {pca.flag && <p className="text-[11px] text-destructive mt-2" role="note">{pca.flag}</p>}
              <p className="text-[11px] text-muted-foreground mt-2">
                Lockout, hourly/4-hourly limits and background use are set on the RCH PCA prescription by CPMS. RCH eligibility is cognitive
                ability to understand and willingness to use PCA — not a fixed age; otherwise a nurse-controlled infusion under its own
                guideline is used (not calculated here). Morphine is RCH's preferred opioid.
              </p>
            </>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">Epidural infusion</h4>
          {pop === "adult" ? (
            <p className="text-[11px] text-muted-foreground">
              Adult regimens (e.g. levobupivacaine 0.1–0.125% ± fentanyl 2 micrograms/mL) vary by hospital protocol, catheter level and
              surgery. No adult rate is calculated; use your local protocol.
            </p>
          ) : ep === null ? (
            <p className="text-sm text-muted-foreground" role="status">Enter measured weight and age in months.</p>
          ) : "reason" in ep ? (
            <p className="text-sm text-destructive" role="status">{ep.reason}</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-2">
              <PcaCard label="RCH ropivacaine 0.2% range" value={`${ep.minMlPerHour.toFixed(1)}–${ep.maxMlPerHour.toFixed(1)} mL/h`} sub="0.1–0.3 mL/kg/h (measured weight)" highlight />
              <PcaCard label="Ropivacaine delivered" value={`${ep.minMgPerKgHour}–${ep.maxMgPerKgHour} mg/kg/h`} sub="2 mg/mL × 0.1–0.3 mL/kg/h; not a bupivacaine limit" />
            </div>
          )}
          {pop === "paeds" && (
            <p className="text-[11px] text-muted-foreground mt-2">
              RCH: ropivacaine 0.2% is the usual solution (fentanyl 1–2 or clonidine 0.8–1.5 micrograms/mL may be added). An anaesthetist must
              give any bolus above 0.2%. Neonates (&lt;44 weeks corrected PMA), infants &lt;8 months and significant liver impairment need
              modified dosing — no rate is generated for them.
            </p>
          )}
        </div>

        <div className="mt-4 grid sm:grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded bg-secondary/30 border border-border text-muted-foreground">
            <strong className="text-foreground">PCA monitoring:</strong> regular respiratory rate, sedation, pain and nausea scores per
            protocol; naloxone and oxygen available; anti-syphon/anti-reflux giving set. Avoid concurrent sedatives where possible.
          </div>
          <div className="p-2.5 rounded bg-secondary/30 border border-border text-muted-foreground">
            <strong className="text-foreground">Epidural monitoring (RCH, Clinical observations):</strong>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              <li><em>Cardiorespiratory:</em> RR, HR, BP and sedation hourly for the first 4 h; thereafter RR and HR hourly, BP and temperature 4-hourly.</li>
              <li><em>After a bolus:</em> HR, RR and BP every 5 min for 20 min. <em>After a rate increase:</em> hourly for 4 h.</li>
              <li><em>Sensory level and motor block (separately):</em> 4-hourly, and 1 h after a bolus or rate increase.</li>
            </ul>
            <p className="mt-1">Escalate urgently for unexpected neurological signs, dense or new motor block, back pain or a high/rising block (haematoma/abscess; urgent MRI if suspected).{" "}
              <a href={RCH_EPIDURAL_URL} target="_blank" rel="noopener noreferrer" className="underline">Full RCH protocol</a></p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

const PcaCard = ({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) => (
  <div className={`p-2 rounded border ${highlight ? "border-primary/40 bg-primary/5" : "border-border bg-background"}`}>
    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
    <p className={`text-sm font-mono font-bold break-words ${highlight ? "text-primary" : "text-foreground"}`}>{value}</p>
    {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
  </div>
);

export default PcaEpiduralCalculator;
