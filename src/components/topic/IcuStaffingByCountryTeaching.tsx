import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** ICU staffing standards by country: GPICS V3 beside CICM IC-1, ESICM 2011 and Leapfrog. Quotes resolve verified excerpt records so wording cannot drift. */
const Q = makeQuote("icu-staffing-by-country");
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;
const R = ({ cells }: { cells: ReactNode[] }) => <tr className="border-t border-border">{cells.map((c, i) => <td key={i} className="p-2 align-top">{c}</td>)}</tr>;

export function CountrySummaryTeaching() {
  return <div className={lessonWrap}>
    <H>Four standards side by side</H>
    <p><Reasoning />The table is our summary of the quoted standards below. The documents differ in status: GPICS V3 and CICM IC-1 are professional minimum standards, ESICM 2011 is a set of recommendations for Europe that it says may need adapting for each country, and Leapfrog is a US purchaser-led safety standard covering doctors only.</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead className="bg-muted/50"><tr><th className="p-2 text-left">Role</th><th className="p-2 text-left">UK — GPICS V3 (2026)</th><th className="p-2 text-left">Australia & NZ — CICM IC-1 (reviewed 2016)</th><th className="p-2 text-left">Europe — ESICM (2011)</th><th className="p-2 text-left">US — Leapfrog (2026)</th></tr></thead>
      <tbody>
        <R cells={["Sickest patients: nurses", "1:1 (level 3)", "At least 1:1 for ventilated and other critically ill patients", "1:1 (level of care III)", "Not covered"]} />
        <R cells={["Less sick patients: nurses", "1:2 (level 2)", "1:2 for lower acuity patients", "1:2 (level II); 1:3 (level I)", "Not covered"]} />
        <R cells={["Nurse in charge", "Clinical shift leader with no patients of their own", "Supernumerary team leader per ICU or pod per shift (should)", "Not given as a ratio", "Not covered"]} />
        <R cells={["Senior doctor by day", "Consultant 1:8 to 1:12", "At least one specialist rostered at all times; one per pod of 8–15 beds in larger units (should)", "Physician FTE per 6–8 level II beds, by formula", "Intensivist on site at least 8 hours a day, 7 days a week"]} />
        <R cells={["Senior doctor out of hours", "Contactable and able to attend within 30 minutes", "At least one specialist rostered at all times", "Certified physician on duty, available at short notice in the hospital", "Returns over 95% of calls within 5 minutes; telemedicine allowed with on-site cover"]} />
        <R cells={["Resident doctors", "No more than 1:8, 24/7 (with ACCPs)", "At least one other doctor rostered at all times", "Not given as a ratio", "A doctor, PA, NP or FCCS nurse can reach ICU patients within 5 minutes"]} />
        <R cells={["Ward rounds", "Twice daily, one in person", "Two bedside rounds a day (should)", "Not specified", "Not specified"]} />
      </tbody></table></div>
    <p><Reasoning />On nursing for the sickest patients, the UK, Australian/New Zealand and European standards agree closely: one nurse per patient. They differ most on doctors: the UK fixes a consultant ratio and a 30-minute attendance time, Australia and New Zealand require a specialist rostered to the unit at all times, and the US standard measures intensivist presence and response times rather than a ratio. Comparing them does not show which is safer; they reflect different health systems and training models.</p>
    <Check question="On which role do the UK, Australian/New Zealand and European standards most closely agree?">Nursing for the sickest patients: one nurse per patient (1:1).</Check>
  </div>;
}

export function CountryUkTeaching() {
  return <div className={lessonWrap}>
    <H>UK: GPICS V3 baseline</H>
    <Q label="GPICS V3 nurse ratios" />
    <Q label="GPICS V3 consultant ratio" />
    <Q label="GPICS V3 consultant availability" />
    <Q label="GPICS V3 resident ratio" />
    <p><Reasoning />Full role-by-role detail is on <L to="/intensive-care/icu-staffing-ratios#staffing-roles">ICU Staffing Ratios</L>, and specialist unit additions on <L to="/intensive-care/icu-staffing-ratios#unit-summary">ICU Staffing by Unit Type</L>. GPICS covers adult units; it does not set children's ICU ratios.</p>
    <Check question="How quickly must a non-resident UK ICU consultant be able to attend?">Within 30 minutes, and continually contactable 24/7.</Check>
  </div>;
}

export function CountryAnzTeaching() {
  return <div className={lessonWrap}>
    <H>Australia and New Zealand: CICM IC-1</H>
    <p><Reasoning />The College of Intensive Care Medicine's minimum standards cover Level I, II and III and paediatric units. The nurse ratios are quoted from the Australian College of Critical Care Nurses guidelines.</p>
    <Q label="CICM IC-1 nurse ratios" />
    <Q label="CICM IC-1 team leader" />
    <Q label="CICM IC-1 specialist roster" />
    <Q label="CICM IC-1 junior doctor" />
    <Q label="CICM IC-1 ward rounds" />
    <p><Reasoning />IC-1 was last reviewed in 2016, ten years before GPICS V3, so check the CICM website for any newer version. Unlike GPICS, it organises specialists by pods of 8–15 beds rather than a patient ratio, and it says "should" for the team leader and ward rounds where GPICS says "must".</p>
    <Check question="How does CICM IC-1 scale specialist cover in larger ICUs?">More than one specialist should be rostered: one per pod of 8–15 beds.</Check>
  </div>;
}

export function CountryEuropeTeaching() {
  return <div className={lessonWrap}>
    <H>Europe: ESICM recommendations</H>
    <p><Reasoning />ESICM's 2011 recommendations define three levels of care (III highest) and link nurse ratios and nursing posts per bed to each.</p>
    <Q label="ESICM 2011 nurse ratios" />
    <Q label="ESICM 2011 ratio caveat" />
    <Q label="ESICM 2011 physicians" />
    <p><Reasoning />ESICM is the only one of the four to give nursing whole-time posts per bed (6 per level III bed), which makes planning a rota explicit. It is also the oldest (2011) and is a recommendation for many health systems, not a binding standard. Individual European countries set their own rules, which we have not covered here.</p>
    <Check question="How many nursing whole-time posts per level III ICU bed does ESICM 2011 suggest?">Six, matching a 1:1 nurse/patient ratio.</Check>
  </div>;
}

export function CountryUsTeaching() {
  return <div className={lessonWrap}>
    <H>United States: Leapfrog ICU physician staffing</H>
    <p><Reasoning />There is no single national US ICU staffing standard. Leapfrog, a group of employers and purchasers, scores hospitals against its ICU Physician Staffing standard. It covers doctors only.</p>
    <Q label="Leapfrog 2026 daytime intensivist" />
    <Q label="Leapfrog 2026 five-minute response" />
    <Q label="Leapfrog 2026 effector" />
    <p><Reasoning />Leapfrog sets presence and response times rather than ratios, and allows a remote intensivist (telemedicine) if there is also on-site intensivist cover. We did not include US nurse ratios: there is no national ICU nurse ratio standard, and we have not checked individual state laws.</p>
    <Check question="Under the Leapfrog standard, how often must an off-site intensivist return calls from the ICU within five minutes?">More than 95% of the time.</Check>
  </div>;
}
