import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "critical-care-overview";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const Q = ({ children }: { children: ReactNode }) => <blockquote className="border-l-2 border-border pl-4 italic">{children}</blockquote>;
const Reasoning = ({ children }: { children: ReactNode }) => (
  <p><strong className="text-foreground">Teaching reasoning (not a quoted guideline):</strong> {children}</p>
);
const Check = ({ question, children }: { question: string; children: ReactNode }) => (
  <details className="border-l-2 border-primary pl-4">
    <summary className="cursor-pointer font-semibold text-foreground">Learning check: {question}</summary>
    <div className="mt-2 space-y-2">{children}</div>
  </details>
);
const wrap = "space-y-4 text-muted-foreground leading-relaxed";
const link = "text-primary underline";

export function IcuStructureTeaching() {
  return (
    <div className={wrap}>
      <H>Levels of care describe the patient, not the bed</H>
      <p>UK critical care is organised around the Intensive Care Society levels of care. The 2021 second edition is explicit about what the levels mean:</p>
      <Q>Levels of Adult Critical Care Second Edition, as in the original guidance, describes the care a patient requires, not where they are receiving it, nor does it measure the actual care being delivered.<R label="ICS Levels 2021 purpose" /></Q>
      <Reasoning>a level 3 patient waiting in recovery or the emergency department is still a level 3 patient. The level tells you what nursing, monitoring and senior input they need now, wherever they physically are.</Reasoning>
      <H>What changed in 2021</H>
      <Q>It merges the pre-existing level 0 and level 1 into ward care. This frees up ‘level 1’ of critical care to represent the emerging Enhanced Care, with Level 2 and 3 remaining.<R label="ICS Levels 2021 enhanced care" /></Q>
      <p>So the current scheme is: ward care; level 1 (enhanced care, for example single-organ basic support or step-down patients); level 2; and level 3. Two of the level 2 descriptors are worth learning word for word:</p>
      <Q>Patients needing one organ systems monitored and supported at an advanced level (other than advanced respiratory support).<R label="ICS Levels 2021 level 2" /></Q>
      <p>Level 3 starts with the ventilated patient:</p>
      <Q>Patients needing advanced respiratory monitoring and support alone. Patients requiring monitoring and support for two or more organ systems at an advanced level.<R label="ICS Levels 2021 level 3" /></Q>
      <p>Delirium was added as a reason to step up a level, because an agitated patient needs more nursing to stay safe:</p>
      <Q>Patients who experience delirium and agitation in addition to requiring level 2 care.<R label="ICS Levels 2021 delirium" /></Q>
      <H>Getting in and getting out: UK time standards</H>
      <p>The Guidelines for the Provision of Intensive Care Services (GPICS 2.1, 2022) set time standards around admission and discharge:</p>
      <Q>Unplanned admissions to the critical care unit must occur within four hours of making the decision to admit.<R label="GPICS 2.1 admission timing" /></Q>
      <Q>Patients must be reviewed, in person, by a consultant in Intensive Care Medicine as urgently as the clinical state dictates and always within 12 hours of admission to critical care.<R label="GPICS 2.1 consultant review" /></Q>
      <Q>Discharge from critical care to a general ward must occur within four hours of the decision and must occur between 0700hrs and 2159hrs.<R label="GPICS 2.1 discharge" /></Q>
      <Reasoning>the 12-hour standard is a maximum, not a target. A deteriorating patient needs consultant review as soon as their condition demands. Night-time discharges are avoided because ward staffing and senior cover are thinner then, so problems are less likely to be picked up.</Reasoning>
      <p>For pre-operative decisions about who needs level 2 or 3 care after surgery, see <Link to="/intensive-care/postop-high-risk-icu" className={link}>Critical Care of the High-Risk Surgical Patient</Link>. For moving patients between units, see <Link to="/clinical/transfer-medicine" className={link}>Transfer Medicine</Link>.</p>
      <Check question="a patient is intubated for pneumonia but needs no other organ support. What level of care is this?">
        <p>Level 3: “advanced respiratory monitoring and support alone” is enough on its own. Contrast a patient on a single vasopressor without ventilation: advanced support for one organ other than the lungs is a level 2 descriptor.</p>
      </Check>
      <LessonSources topicId={T} labels={["ICS Levels 2021 purpose", "ICS Levels 2021 enhanced care", "ICS Levels 2021 level 2", "ICS Levels 2021 level 3", "ICS Levels 2021 delirium", "GPICS 2.1 admission timing", "GPICS 2.1 consultant review", "GPICS 2.1 discharge"]} />
    </div>
  );
}

export function IcuTeamRolesTeaching() {
  return (
    <div className={wrap}>
      <H>Doctors: consultant-led care</H>
      <p>GPICS sets ratios for daytime medical staff:</p>
      <Q>The daytime consultant to patient ratio must not normally exceed a range between 1:8 and 1:12.<R label="GPICS 2.1 consultant ratio" /></Q>
      <Q>The daytime intensive care resident to patient ratio should not normally exceed 1:8.<R label="GPICS 2.1 resident ratio" /></Q>
      <p>The reason for intensivist-led care comes mainly from observational data. A systematic review compared “high-intensity” staffing (mandatory intensivist input or a closed unit) with “low-intensity” staffing:</p>
      <Q>High-intensity staffing was associated with lower hospital mortality in 16 of 17 studies (94%) and with a pooled estimate of the relative risk for hospital mortality of 0.71 (95% confidence interval [CI], 0.62-0.82).<R label="Pronovost 2002 staffing" /></Q>
      <p>More is not always better. When one US academic unit randomised days to having an in-house intensivist overnight, on top of daytime intensivist care and resident cover:</p>
      <Q>In an academic medical ICU in the United States, nighttime in-hospital intensivist staffing did not improve patient outcomes.<R label="Kerlin 2013 night staffing" /></Q>
      <Reasoning>the observational studies compared having intensivists with not having them, and could not fully adjust for differences between hospitals. The randomised trial added overnight presence to a unit already run by intensivists. The lesson is that intensivists direct care. It is not that every extra consultant hour saves lives.</Reasoning>
      <H>Nurses: the core of the unit</H>
      <Q>Level 3 patients must have a registered nurse/patient ratio of a minimum 1:1 to deliver direct care. Level 2 patients must have a registered nurse/patient ratio of a minimum of 1:2 to deliver direct care.<R label="GPICS 2.1 nurse ratios" /></Q>
      <Q>There must be a supernumerary (i.e. not rostered to deliver direct patient care to a specific patient) senior registered nurse who provides the supervisory clinical coordinator role on duty 24/7 in critical care units.<R label="GPICS 2.1 coordinator" /></Q>
      <Reasoning>the nurse in charge has no patients of their own so that they can cover breaks, run emergencies, manage beds and spot problems across the unit. If they have to take a patient, that whole safety layer is lost.</Reasoning>
      <H>The wider team on the ward round</H>
      <Q>Consultant in Intensive Care Medicine-led ward rounds must occur twice a day (including weekends and national holidays). The ward round must have daily input from nursing, microbiology, pharmacy and physiotherapy, and regular input from dietetics, SLT, OT and clinical psychology to assist decision making.<R label="GPICS 2.1 ward round" /></Q>
      <Reasoning>each role covers a different risk. Pharmacists catch drug doses and interactions, especially in kidney failure. Physiotherapists help clear secretions and start rehabilitation early. Dietitians plan feeding. Speech and language therapists assess swallowing after a breathing tube or tracheostomy. Psychologists support recovery from distressing ICU experiences. Advanced critical care practitioners increasingly fill resident-grade roles. Recovery after discharge is covered in <Link to="/intensive-care/pics-follow-up" className={link}>PICS Follow-up</Link>.</Reasoning>
      <Check question="a 14-bed unit has eleven level 3 and three level 2 patients. What is the minimum number of registered nurses needed for direct care?">
        <p>11 (1:1 for level 3) + 2 (1:2 for three level 2 patients, rounded up) = 13 bedside nurses, plus a supernumerary nurse in charge, who must not take a patient. The unit also has more than ten beds, and GPICS asks for extra supernumerary senior nursing staff above the coordinator in that case. (Arithmetic from the standards; actual rostering also depends on how sick each patient is.)</p>
      </Check>
      <LessonSources topicId={T} labels={["GPICS 2.1 consultant ratio", "GPICS 2.1 resident ratio", "Pronovost 2002 staffing", "Kerlin 2013 night staffing", "GPICS 2.1 nurse ratios", "GPICS 2.1 coordinator", "GPICS 2.1 ward round"]} />
    </div>
  );
}

export function IcuCommunicationTeaching() {
  return (
    <div className={wrap}>
      <H>Shared daily goals</H>
      <p>A busy ward round can end with everyone leaving with a different idea of the plan. In one surgical ICU, a written daily goals form showed how large that gap was:</p>
      <Q>At baseline, less than 10% of residents and nurses understood the goals of care for the day. After implementing the daily goals form, greater than 95% of nurses and residents understood the goals of care for the day.<R label="Pronovost 2003 daily goals" /></Q>
      <Reasoning>this was a before-and-after study in a single unit, so it shows that teams understood the plan better. It does not prove patients did better. In practice, finish each patient’s review by stating the goals out loud: what must happen today, what would trigger a call, and who is doing each task.</Reasoning>
      <H>Structured handover</H>
      <p>The best multicentre evidence for structured handover comes from I-PASS, a programme for resident doctors in children’s hospitals. It used a memory aid, training, observation of handovers and a standard written document:</p>
      <Q>In 10,740 patient admissions, the medical-error rate decreased by 23% from the preintervention period to the postintervention period (24.5 vs. 18.8 per 100 admissions, P&lt;0.001), and the rate of preventable adverse events decreased by 30% (4.7 vs. 3.3 events per 100 admissions, P&lt;0.001).<R label="Starmer 2014 I-PASS" /></Q>
      <p>Discharge from ICU is a handover between teams too, and GPICS requires both spoken and written handover:</p>
      <Q>The receiving (ward) team responsible for ongoing care needs to be directly involved in this process and there should be verbal as well as written handover.<R label="GPICS 2.1 discharge handover" /></Q>
      <Reasoning>I-PASS was a package tested in children’s wards, not adult ICUs, and it was not randomised. Its message is that a memory aid only works alongside training and a standard document. SBAR, call-outs and check-back for urgent escalation are taught on the <Link to="/intensive-care/non-technical-skills" className={link}>Non-technical Skills</Link> page.</Reasoning>
      <H>Communicating with families</H>
      <p>Families are part of ICU communication too. In a French trial of relatives of patients dying in ICU, a planned end-of-life meeting plus a bereavement leaflet reduced psychological harm:</p>
      <Q>On day 90, the 56 participants in the intervention group who responded to the telephone interview had a significantly lower median IES score than the 52 participants in the control group (27 vs. 39, P=0.02) and a lower prevalence of PTSD-related symptoms (45% vs. 69%, P=0.01).<R label="Lautrette 2007 family" /></Q>
      <Reasoning>in the trial, relatives in the intervention group talked for more of the meeting. Listening is part of the treatment. Detailed family-meeting technique is covered in <Link to="/intensive-care/end-of-life-communication" className={link}>End-of-Life Care &amp; Communication</Link>.</Reasoning>
      <Check question="the I-PASS programme reduced the medical-error rate from 24.5 to 18.8 per 100 admissions. How was the 23% calculated, and what does it not prove?">
        <p>(24.5 − 18.8) ÷ 24.5 ≈ 0.23, a relative reduction of 23%. The absolute reduction is 5.7 errors per 100 admissions. Because the study compared periods before and after the programme rather than randomising, other changes over the same period could explain some of the difference. It was also done in children’s hospitals rather than adult ICUs.</p>
      </Check>
      <LessonSources topicId={T} labels={["Pronovost 2003 daily goals", "Starmer 2014 I-PASS", "GPICS 2.1 discharge handover", "Lautrette 2007 family"]} />
    </div>
  );
}
