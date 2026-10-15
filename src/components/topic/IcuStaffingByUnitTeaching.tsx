import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** GPICS V3 staffing by unit type. Quotes resolve verified excerpt records so wording cannot drift. */
const Q = makeQuote("icu-staffing-by-unit");
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;
const R = ({ cells }: { cells: ReactNode[] }) => <tr className="border-t border-border">{cells.map((c, i) => <td key={i} className="p-2">{c}</td>)}</tr>;

export function UnitSummaryTeaching() {
  return <div className={lessonWrap}>
    <H>One baseline, specialist additions</H>
    <Q label="GPICS V3 minimum standards" />
    <p><Reasoning />GPICS V3 does not set a separate numerical staffing ratio for each unit type. Every specialist chapter either says that staffing must meet the general staffing chapters, or that care must meet general ICU standards, and then adds unit-specific roles. The table shows the general baseline in the first row and what each chapter adds. &quot;—&quot; means the chapter adds nothing beyond the baseline for that role (our reading of the chapter, not a GPICS statement).</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead className="bg-muted/50"><tr><th className="p-2 text-left">Unit type</th><th className="p-2 text-left">Consultant</th><th className="p-2 text-left">On-site doctor / ACCP</th><th className="p-2 text-left">Nursing</th><th className="p-2 text-left">Other specialist staff</th></tr></thead>
      <tbody>
        <R cells={["General adult ICU (baseline)", "1:8–1:12 by day; attend within 30 min out of hours", "Not normally above 1:8, 24/7", "1:1 level 3, 1:2 level 2, plus shift leader; extra senior nurse above 10 beds", "Pharmacist 0.14 WTE per bed; AHPs"]} />
        <R cells={["Cardiothoracic", "Out-of-hours consultants must have daytime cardiothoracic sessions; job-planned cardiothoracic consultant leads 7/7 ward round", "Plus a cardiothoracic surgeon; rota CALS-trained and able to reopen the chest 24/7", "Baseline", "Perfusion and theatre staff for resternotomy and bypass 24/7; TOE-competent clinician readily available 24/7"]} />
        <R cells={["Neurocritical care", "Out-of-hours consultants must have daytime neurocritical sessions; consultant trained in neuro intensive care leads 7/7 ward round", "Baseline", "Baseline", "Access to neurosurgery, spinal surgery, neurology, stroke, neuroradiology, neurophysiology, neurorehabilitation"]} />
        <R cells={["Burns", "Joint management by burns surgery and ICM consultants with burns-specific training", "Baseline", "Baseline", "Joint burns–ICU multidisciplinary working"]} />
        <R cells={["Smaller remote and rural", "Access to ICM consultant advice 24/7; network support to meet GPICS", "Dedicated 24/7 on-site rota; airway skillset on site, advanced airway access 24/7", "Baseline", "Pharmacist, psychologist or AHP advice via the network if not deliverable locally (recommendation)"]} />
        <R cells={["Enhanced care (level 1)", "Twice-daily senior review, one consultant-led; designated lead clinician", "Grade set from curricula and guidance (recommendation)", "Designated lead nurse; ratio matched to acuity — no fixed ratio", "MDT input to ward round"]} />
      </tbody></table></div>
    <p><Reasoning />The baseline ratios are explained role by role on <L to="/intensive-care/icu-staffing-ratios">ICU Staffing Ratios</L>; the quotations below back the first row of the table.</p>
    <Q label="GPICS V3 consultant ratio" />
    <Q label="GPICS V3 consultant availability" />
    <Q label="GPICS V3 resident ratio" />
    <Q label="GPICS V3 nurse ratios" />
    <Q label="GPICS V3 coordinator" />
    <Q label="GPICS V3 additional nurse" />
    <Q label="GPICS V3 pharmacist" />
    <Check question="Does GPICS V3 give cardiothoracic or neuro ICUs their own nurse:patient ratio?">No. Both chapters say staffing must meet the general staffing chapters; they add specialist medical, surgical and support roles, not a different nursing ratio.</Check>
  </div>;
}

export function UnitCardiothoracicTeaching() {
  return <div className={lessonWrap}>
    <H>Cardiothoracic ICU</H>
    <Q label="GPICS V3 cardiothoracic consultant" />
    <Q label="GPICS V3 cardiothoracic skills" />
    <Q label="GPICS V3 cardiothoracic perfusion" />
    <Q label="GPICS V3 cardiothoracic ward round" />
    <p><Reasoning />The distinctive additions are a cardiothoracic surgeon alongside the on-site ICU doctor or ACCP, and a resident team able to run Cardiac Surgery Advanced Life Support and reopen the chest at any hour, backed by perfusion and theatre staff. Consultants covering at night must also work there by day, so out-of-hours advice comes from someone current in the specialty.</p>
    <Check question="Which extra on-site role does GPICS V3 require in a cardiothoracic ICU?">A cardiothoracic surgeon, in addition to the on-site medical doctor or ACCP; the rota must be CALS-trained and able to reopen the chest 24/7.</Check>
  </div>;
}

export function UnitNeuroBurnsTeaching() {
  return <div className={lessonWrap}>
    <H>Neurocritical care</H>
    <Q label="GPICS V3 neuro staffing" />
    <Q label="GPICS V3 neuro specialists" />
    <Q label="GPICS V3 neuro ward round" />
    <p><Reasoning />Neurocritical care keeps the general ratios, but its consultants must be trained in neuro intensive care and do daytime sessions there. The unit must have access to a defined list of neuroscience specialties. The standard requires access, not that those specialists are based in the unit.</p>
    <H>Burns</H>
    <Q label="GPICS V3 burns joint care" />
    <Q label="GPICS V3 burns MDT" />
    <p><Reasoning />Burns intensive care is defined by joint consultant management — burns surgeon and intensivist — rather than by a separate ratio. Most critically ill burns patients in the UK are cared for in general ICUs with burns input, so these standards apply wherever such patients are treated, not only in dedicated burns ICUs.</p>
    <Check question="Who must jointly manage a burns patient needing intensive care?">Consultants in burns surgery and in ICM, each with appropriate burns-specific training.</Check>
  </div>;
}

export function UnitRemoteEnhancedTeaching() {
  return <div className={lessonWrap}>
    <H>Smaller remote and rural units</H>
    <Q label="GPICS V3 remote consultant" />
    <Q label="GPICS V3 remote airway" />
    <Q label="GPICS V3 remote network MDT" />
    <p><Reasoning />Small units must still meet GPICS; the difference is how. Network support is a minimum standard, consultant advice must be available 24/7, and the on-site rota must be dedicated to the ICU. Where a pharmacist, psychologist or allied health service cannot be provided locally, GPICS recommends (does not require) advice through the network.</p>
    <H>Enhanced care (level 1)</H>
    <Q label="GPICS V3 enhanced leadership" />
    <Q label="GPICS V3 enhanced review" />
    <Q label="GPICS V3 enhanced grade" />
    <Q label="GPICS V3 enhanced nurse ratio" />
    <p><Reasoning />Enhanced care has no fixed nurse ratio and no fixed grade of doctor: both are recommendations to be matched to the patients and service. What is mandatory is the leadership — a lead clinician and lead nurse — and twice-daily senior review, one being a consultant-led ward round with the nurse in charge.</p>
    <Check question="What nurse:patient ratio does GPICS V3 set for enhanced care units?">None fixed: it recommends the ratio match acuity, skill mix, workload and services. The minimum standards cover leadership and twice-daily senior review instead.</Check>
  </div>;
}
