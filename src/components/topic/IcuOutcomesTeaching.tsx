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
      <p><Reasoning />ICU mortality, hospital mortality and long-term mortality are different numbers and must not be mixed. Some deaths happen on the ward after ICU discharge, and survivors who needed mechanical ventilation keep an excess risk for months afterwards. Wunsch studied elderly US Medicare patients, so the absolute figures do not transfer directly to younger or UK populations (teaching summary). UK units compare their risk-adjusted mortality nationally through ICNARC audit (teaching summary; not quoted here).</p>
      <Check question="In Wunsch 2010, when was the excess mortality in ventilated ICU survivors concentrated?">In the first 6 months after hospital discharge.</Check>
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
