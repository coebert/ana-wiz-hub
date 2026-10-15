import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** ICU outcomes: survival, length of stay, readmission. Quotes are verbatim from PubMed abstracts and NICE guidance. */
const Q = makeQuote("icu-outcomes");
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;

export function OutcomesSurvivalTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Survival: leaving hospital is not the end point</H>
      <Q label="Wunsch 2010 three-year mortality" />
      <Q label="Wunsch 2010 ventilation risk" />
      <Q label="Wunsch 2010 conclusion" />
      <Q label="Duke 2004 post-ICU deaths" />
      <p><Reasoning />ICU mortality, hospital mortality and long-term mortality are different numbers and must not be mixed. Some deaths happen on the ward after ICU discharge, and survivors who needed mechanical ventilation keep an excess risk for months afterwards. Wunsch studied elderly US Medicare patients, so the absolute figures do not transfer directly to younger or UK populations (teaching summary). UK national figures are in the ICNARC lesson below.</p>
      <Check question="In Wunsch 2010, when was the excess mortality in ventilated ICU survivors concentrated?">In the first 6 months after hospital discharge.</Check>
    </div>
  );
}

export function OutcomesIcnarcTeaching() {
  return (
    <div className={lessonWrap}>
      <H>UK national audit: ICNARC Case Mix Programme</H>
      <Q label="ICNARC CMP 2024-25 scope" />
      <Q label="ICNARC CMP 2024-25 survival" />
      <Q label="ICNARC CMP 2024-25 length of stay" />
      <p><Reasoning /><strong>Where these data come from:</strong> every figure above is quoted word for word from the public summary of the ICNARC Case Mix Programme (CMP) Public Report 2024-25, the national clinical audit of admissions to adult critical care in England, Wales and Northern Ireland, covering April 2024 to March 2025 across 286 participating units. The CMP is observational audit data, not a trial: the 11.5% critical care mortality and 15% acute hospital mortality are raw, unadjusted figures for a very mixed case mix, and they describe populations, not individual risk. Individual units are compared using risk-adjusted (not raw) mortality through the ICNARC model (teaching summary).</p>
      <p><Reasoning />Note the gap between the two outcome rows: 88.5% survived to critical care discharge but only 85% survived to hospital discharge — about 3.5% of admissions died on the ward after leaving critical care, the same post-ICU deaths seen in the Duke 2004 cohort above (teaching summary).</p>
      <Check question="In the ICNARC CMP 2024-25 public summary, what proportion of admissions died in critical care and in acute hospital?">11.5% died in critical care; 15% died in acute hospital (85% survived to hospital discharge).</Check>
    </div>
  );
}

export function OutcomesLengthOfStayTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Length of stay and functional recovery</H>
      <Q label="Herridge 2003 ARDS stay" />
      <Q label="Herridge 2003 conclusion" />
      <p><Reasoning />a long ICU stay is a marker of severe illness and a cause of muscle wasting, weakness and lost weight. Length of stay is not a quality measure on its own: it reflects case mix, ward capacity and delayed discharge as well as care (teaching summary). Long stays are one of the NICE CG83 rehabilitation risk factors, covered on <L to="/intensive-care/icu-discharge-planning">ICU Discharge Planning</L>; physical, mental and cognitive consequences are on <L to="/intensive-care/pics-follow-up">PICS &amp; follow-up</L>.</p>
      <Q label="NICE CG83 review" />
      <Check question="What did Herridge find was the main reason for disability one year after ARDS?">Extrapulmonary problems, most prominently muscle wasting and weakness — lung volumes and spirometry were normal by 6 months.</Check>
    </div>
  );
}

export function OutcomesReadmissionTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Readmission to ICU</H>
      <Q label="Rosenberg 2000 readmission rate" />
      <Q label="Rosenberg 2000 readmission mortality" />
      <Q label="Rosenberg 2000 conclusion" />
      <Q label="Duke 2004 predictors" />
      <Q label="NICE CG50 night transfer" />
      <p><Reasoning />readmitted patients do much worse, but the review warns that readmission rates are not yet proven to measure quality of care. Unstable vital signs at discharge are the most consistent warning sign, and night-time discharge was an independent predictor of death in one Australian cohort — consistent with NICE advice to avoid it. These are associations from observational studies, not proof that changing discharge timing alone saves lives (teaching summary).</p>
      <Check question="According to Rosenberg & Watts, what is the average ICU readmission rate and the most consistent predictor?">About 7% (range 4–14%); unstable vital signs at the time of ICU discharge.</Check>
    </div>
  );
}
