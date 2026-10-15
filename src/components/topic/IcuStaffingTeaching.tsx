import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** GPICS V3 staffing standards by role and shift. Quotes resolve verified excerpt records so wording cannot drift. */
const Q = makeQuote("icu-staffing-ratios");
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;

export function StaffingOverviewTeaching() {
  return <div className={lessonWrap}>
    <p>What GPICS V3 adds for cardiothoracic, neuro, burns, remote and rural, and enhanced care units is on <L to="/intensive-care/icu-staffing-by-unit">ICU Staffing by Unit Type</L>.</p>
    <H>Minimum standards versus quality recommendations</H>
    <Q label="GPICS V3 minimum standards" />
    <p><Reasoning />GPICS V3 (January 2026) separates <strong>minimum standards</strong> (&quot;must&quot;; unmet standards are expected to be recorded on a risk register) from <strong>recommendations for a quality service</strong> (&quot;should&quot;). Every ratio on this page is a minimum, not a target. The summary below lists each role's numeric requirement and the hours it applies; the lessons that follow quote the standards word for word.</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead className="bg-muted/50"><tr><th className="p-2 text-left">Role</th><th className="p-2 text-left">Minimum ratio / establishment</th><th className="p-2 text-left">Day</th><th className="p-2 text-left">Night / out of hours</th></tr></thead>
      <tbody>
        <tr className="border-t border-border"><td className="p-2">ICM consultant</td><td className="p-2">1:8 to 1:12 (daytime)</td><td className="p-2">Leads care 7 days; twice-daily ward rounds, one face-to-face</td><td className="p-2">Immediately available 24/7; attend within 30 min if non-resident</td></tr>
        <tr className="border-t border-border"><td className="p-2">Resident doctors and ACCPs (on-site rota)</td><td className="p-2">Not normally above 1:8</td><td className="p-2">1:8</td><td className="p-2">1:8 — the ratio applies 24/7</td></tr>
        <tr className="border-t border-border"><td className="p-2">Registered nurse, level 3</td><td className="p-2">1:1 direct care</td><td className="p-2">Every shift</td><td className="p-2">Every shift</td></tr>
        <tr className="border-t border-border"><td className="p-2">Registered nurse, level 2</td><td className="p-2">1:2 direct care</td><td className="p-2">Every shift</td><td className="p-2">Every shift</td></tr>
        <tr className="border-t border-border"><td className="p-2">Clinical shift leader</td><td className="p-2">1 per ICU, not allocated a patient</td><td className="p-2">Yes</td><td className="p-2">Yes — 24/7</td></tr>
        <tr className="border-t border-border"><td className="p-2">Additional enhanced critical care nurse</td><td className="p-2">≥1 above 10 beds, plus 1 per further 10 beds</td><td className="p-2">Per shift (teaching interpretation)</td><td className="p-2">Per shift (teaching interpretation)</td></tr>
        <tr className="border-t border-border"><td className="p-2">Bank/agency RNs</td><td className="p-2">No more than 20%</td><td className="p-2">On any one shift</td><td className="p-2">On any one shift</td></tr>
        <tr className="border-t border-border"><td className="p-2">Pharmacist</td><td className="p-2">≥0.14 WTE per bed</td><td className="p-2">Available 5 days; core service 7 days</td><td className="p-2">Not specified in minimum standards</td></tr>
        <tr className="border-t border-border"><td className="p-2">Physiotherapist</td><td className="p-2">Access 5 days/week</td><td className="p-2">Weekdays</td><td className="p-2">Emergency respiratory physiotherapy 24 h</td></tr>
        <tr className="border-t border-border"><td className="p-2">Dietitian, SLT, OT</td><td className="p-2">Access 5 days/week each</td><td className="p-2">Weekdays</td><td className="p-2">Not specified</td></tr>
        <tr className="border-t border-border"><td className="p-2">Practitioner psychologist</td><td className="p-2">Access (no ratio)</td><td className="p-2">—</td><td className="p-2">—</td></tr>
        <tr className="border-t border-border"><td className="p-2">Clinical nurse educator</td><td className="p-2">≥1 WTE per 75 RNs + HCSWs (quality: 1 per 50)</td><td className="p-2">Supernumerary</td><td className="p-2">—</td></tr>
        <tr className="border-t border-border"><td className="p-2">Non-registered support staff incl. NARs</td><td className="p-2">≤10% of direct-care nursing workforce</td><td className="p-2">—</td><td className="p-2">—</td></tr>
      </tbody></table></div>
    <p><Reasoning />&quot;Day&quot; and &quot;night&quot; columns are a teaching layout: GPICS states hours for each role (daytime, 24/7, five days, seven days) rather than defining fixed shift patterns. Where a cell says &quot;not specified&quot;, the minimum standards set no out-of-hours requirement; that is not a statement that none is needed. Continue to the <L to="/intensive-care/critical-care-overview">Critical Care Overview</L> for the wider GPICS context.</p>
    <Check question="What is the difference between a GPICS V3 minimum standard and a quality recommendation?">A minimum standard is a &quot;must&quot; every UK ICU is expected to meet (or record as a risk if unmet); a quality recommendation is a &quot;should&quot; describing a better service.</Check>
  </div>;
}

export function StaffingConsultantTeaching() {
  return <div className={lessonWrap}>
    <H>Daytime: consultant-led care seven days a week</H>
    <Q label="GPICS V3 consultant daytime lead" />
    <Q label="GPICS V3 consultant ratio" />
    <Q label="GPICS V3 ward round" />
    <Q label="GPICS V3 consultant job plan" />
    <p><Reasoning />The 1:8–1:12 range applies to the <em>daytime</em> consultant; a unit at the upper limit has less capacity for new admissions, outreach and family meetings, so the range should be applied with case mix in mind. Daytime ICM sessions must be exclusive — a consultant cannot simultaneously run an anaesthetic list or a second specialty.</p>
    <H>Nights and weekends</H>
    <Q label="GPICS V3 consultant availability" />
    <Q label="GPICS V3 consultant out of hours" />
    <p><Reasoning />GPICS does not require a resident consultant overnight; it requires immediate contactability and attendance within 30 minutes. This fits the evidence: high-intensity (intensivist-led) staffing is associated with lower mortality, whereas adding an in-house intensivist overnight to an academic unit that already had daytime intensivists did not improve outcomes in a randomised trial.</p>
    <Q label="Pronovost 2002 staffing" />
    <Q label="Kerlin 2013 night staffing" />
    <Check question="What is the GPICS V3 out-of-hours requirement for the consultant responsible for the ICU?">Immediately available 24/7 — continually contactable and, if non-resident, able to attend within 30 minutes.</Check>
    <Check question="How many consultant ward rounds per day does GPICS V3 require?">Two a day, seven days a week, one of which is face-to-face.</Check>
  </div>;
}

export function StaffingResidentTeaching() {
  return <div className={lessonWrap}>
    <H>The on-site doctor and ACCP rota: day and night</H>
    <Q label="GPICS V3 resident ratio" />
    <Q label="GPICS V3 rota airway" />
    <Q label="GPICS V3 rota fatigue" />
    <p><Reasoning />Unlike the consultant ratio, the 1:8 resident ratio is explicitly 24/7: the night rota needs as many on-site staff per patient as the day rota. Doctors and ACCPs share one rota, so an ACCP can count towards the 1:8 — but trainee ACCPs cannot.</p>
    <Q label="GPICS V3 ACCP supernumerary" />
    <p><Reasoning />Airway skills are tiered: everyone on the rota needs basic skills, a minimum standardised skillset must be immediately available, and advanced airway skills must be on site 24/7 — this may be the anaesthetist or ICU consultant rather than the resident. Fatigue, rest areas and hot food overnight are minimum standards, not optional extras.</p>
    <Check question="Can a trainee ACCP count towards the 1:8 on-site ratio?">No. GPICS V3 requires trainee ACCPs to practise for two years in a completely supernumerary capacity.</Check>
  </div>;
}

export function StaffingNursingTeaching() {
  return <div className={lessonWrap}>
    <H>Registered nurses: every shift</H>
    <Q label="GPICS V3 nurse ratios" />
    <Q label="GPICS V3 nurse ratio judgement" />
    <p><Reasoning />The ratios are minimums for direct care; GPICS asks for them to be reviewed shift by shift and within a shift, because a level 2 patient with delirium or high dependency may need 1:1. Worked example (fictional unit, arithmetic only): 6 level 3 and 4 level 2 patients need at least 6 + 2 = 8 direct-care RNs, plus the shift leader = 9 registered nurses on that shift, before any additional enhanced nurse.</p>
    <H>Nurses not allocated a patient</H>
    <Q label="GPICS V3 coordinator" />
    <Q label="GPICS V3 additional nurse" />
    <p><Reasoning />Read literally, a 12-bed unit needs the shift leader plus at least one additional enhanced nurse; how &quot;each additional 10 beds&quot; rounds for, say, a 25-bed unit is not spelled out in the standard, so check local interpretation (teaching note). These supernumerary nurses provide coordination, escalation, breaks and supervision of nursing associates.</p>
    <H>Skill mix on any one shift</H>
    <Q label="GPICS V3 bank agency" />
    <Q label="GPICS V3 nursing associates" />
    <Q label="GPICS V3 nurse education" />
    <Q label="GPICS V3 novice supernumerary" />
    <p><Reasoning />The 20% bank/agency limit is per shift; the 50% critical-care-award requirement and the 10% non-registered limit are workforce-level. Nursing associates and healthcare support workers support registered nurses but cannot fill a 1:1 or 1:2 slot. New starters are supernumerary for 12 weeks and do not count in the ratio.</p>
    <Check question="Under GPICS V3, a 10-bed unit has 6 level 3 and 4 level 2 patients. What is the minimum number of registered nurses on shift?">8 for direct care (6 × 1:1 plus 4 at 1:2) plus a clinical shift leader not allocated a patient = 9.</Check>
    <Check question="What is the maximum proportion of bank or agency registered nurses on any one shift?">No more than 20%.</Check>
  </div>;
}

export function StaffingMdtTeaching() {
  return <div className={lessonWrap}>
    <H>Pharmacy</H>
    <Q label="GPICS V3 pharmacist" />
    <p><Reasoning />0.14 WTE per bed means a 20-bed unit needs at least 2.8 WTE pharmacists (arithmetic). Note the split: core clinical pharmacy services seven days, but the dedicated ICU pharmacist need only be available five days with weekday ward-round attendance.</p>
    <H>Allied health professionals and psychology</H>
    <Q label="GPICS V3 physiotherapy" />
    <Q label="GPICS V3 dietitian" />
    <Q label="GPICS V3 SLT OT" />
    <Q label="GPICS V3 psychologists" />
    <p><Reasoning />AHP minimum standards are expressed as access days rather than patient ratios. Only respiratory physiotherapy has a 24-hour requirement. These roles drive rehabilitation, swallowing and nutrition — see <L to="/intensive-care/icu-discharge-planning">ICU Discharge Planning</L> and <L to="/intensive-care/pics-follow-up">PICS &amp; follow-up</L>.</p>
    <H>Support staff</H>
    <Q label="GPICS V3 support staff" />
    <Check question="What is the minimum pharmacist establishment for a 20-bed ICU under GPICS V3?">0.14 WTE per bed × 20 = 2.8 WTE.</Check>
    <Check question="Which AHP service has a 24-hour minimum standard?">Emergency respiratory physiotherapy.</Check>
  </div>;
}
