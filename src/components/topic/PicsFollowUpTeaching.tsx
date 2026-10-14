import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "pics-follow-up";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: React.ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const B = ({ children }: { children: React.ReactNode }) => <strong className="text-foreground">{children}</strong>;
const Check = ({ q, a }: { q: string; a: string }) => (
  <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: {q}</summary><p className="mt-2">{a}</p></details>
);
const wrap = "space-y-4 text-sm text-muted-foreground leading-relaxed mt-5 mb-4";

export function EarlyRiskCheckTeaching() {
  return <div className={wrap}>
    <H>Why a plan is needed</H>
    <p>Post-intensive care syndrome (PICS) describes new or worsening physical, cognitive or mental health problems that arise after critical illness and persist beyond the hospital stay, in the survivor or a family member.<R label="SCCM PICS 2012" /> In a UK cohort, 55% of survivors who replied had anxiety, depression or PTSD symptoms, and depression was linked to 47% higher death risk over 2 years; only 38% replied, so true rates are uncertain.<R label="Hatch 2018" /></p>

    <H>Step 1: short risk check, as early as possible in ICU</H>
    <p>NICE asks for a <B>short clinical assessment during the critical care stay, as early as clinically possible</B>, to find patients at risk of physical and non-physical morbidity. Patients at risk then get a <B>comprehensive assessment</B> of current rehabilitation needs, and short- and medium-term rehabilitation goals are agreed.<R label="NICE CG83 early assessment" /></p>
    <p>NICE's examples of risk markers:<R label="NICE CG83 table 1" /></p>
    <ul className="list-disc list-inside space-y-1">
      <li><B>Physical:</B> unable to get out of bed independently; anticipated long stay; obvious significant physical or neurological injury; not cognitively able to continue exercise independently; unable to self-ventilate on 35% oxygen or less; premorbid respiratory or mobility problems; unable to mobilise independently over short distances.</li>
      <li><B>Non-physical:</B> recurrent nightmares, particularly if the patient tries to stay awake to avoid them; intrusive memories; new or recurrent anxiety or panic attacks; wanting not to talk about the illness.</li>
    </ul>
    <p>NICE notes this list is not exhaustive.<R label="NICE CG83 table 1" /></p>

    <H>Step 2: start rehabilitation and inform the family</H>
    <p>One competent professional should coordinate the rehabilitation pathway for continuity. For patients at risk, <B>rehabilitation starts as early as clinically possible</B>, based on the assessment and goals. Information about the illness and treatment goes to the patient and also to family or carer unless the patient disagrees.<R label="NICE CG83 start early" /></p>

    <Check q="a patient on day 3 of ventilation still needs 50% oxygen. When should the first PICS risk check happen?" a="Now. NICE asks for the short clinical assessment during the critical care stay as early as clinically possible. Being unable to self-ventilate on 35% oxygen or less is itself one of NICE's physical risk markers." />
    <LessonSources topicId={T} labels={["SCCM PICS 2012", "Hatch 2018", "NICE CG83 early assessment", "NICE CG83 table 1", "NICE CG83 start early"]} />
  </div>;
}

export function DischargeStepsTeaching() {
  return <div className={wrap}>
    <H>Step 3: before leaving critical care</H>
    <p>Patients earlier judged <B>low risk get a repeat short assessment before discharge</B> from critical care, because risk can change.<R label="NICE CG83 ward step-down" /></p>

    <H>Step 4: on the ward</H>
    <p>Patients at risk are offered an individualised, structured rehabilitation programme. NICE says to <B>consider a structured, supported self-directed rehabilitation manual for at least 6 weeks</B> after critical care discharge. Patients with stress symptoms from traumatic incidents or memories should be referred along the NICE PTSD pathway with preventive strategies started.<R label="NICE CG83 ward step-down" /></p>

    <H>Step 5: before going home</H>
    <p>Give the patient, and family or carer if the patient agrees, information on physical recovery against the ward goals, diet and continuing treatment, daily living, and where relevant <B>driving, returning to work, housing and benefits</B>, plus local support services such as support groups.<R label="NICE CG83 home discharge" /></p>

    <H>Step 6: the 2–3 month rehabilitation review</H>
    <p><B>Review patients with rehabilitation needs 2 to 3 months after critical care discharge.</B> The functional reassessment should be <B>face to face</B>, in the community or in hospital, by a suitably skilled professional who knows the patient's critical care problems and pathway. Refer on to rehabilitation or specialist services if recovery is slower than the goals predicted, or if new physical or non-physical problems appear.<R label="NICE CG83 review" /></p>

    <Check q="who should do the 2–3 month review, and how?" a="Face to face, in the community or in hospital, by an appropriately skilled professional familiar with the patient's critical care problems and rehabilitation pathway (NICE CG83 1.23–1.24)." />
    <Check q="a patient judged low risk on day 1 is now leaving ICU after 12 days. What does NICE ask for?" a="A repeat short clinical assessment before discharge from critical care, because their risk may have changed." />
    <LessonSources topicId={T} labels={["NICE CG83 ward step-down", "NICE CG83 home discharge", "NICE CG83 review"]} />
  </div>;
}

export function DiariesEvidenceTeaching() {
  return <div className={wrap}>
    <H>ICU diaries: two trials, two answers</H>
    <ul className="list-disc list-inside space-y-1">
      <li><B>Jones 2010:</B> 352 patients with ICU stays over 72 hours received a diary 1 month after discharge. <B>New PTSD at 3 months fell from 13% to 5%.</B><R label="Jones 2010 (ICU diaries)" /></li>
      <li><B>Garrouste-Orgeas 2019 (JAMA, 35 French ICUs):</B> 657 ventilated patients randomised, diary written by clinicians and family. Significant PTSD symptoms at 3 months were <B>29.9% with a diary versus 34.3% without, not a significant difference</B>. The authors concluded the findings do not support diaries for preventing PTSD symptoms.<R label="Garrouste-Orgeas 2019" /></li>
    </ul>
    <p>The trials differ in when the diary was given, who wrote it and how PTSD was measured, and only about half of patients completed the French trial. A fair summary is that diaries may help some patients but are not proven to prevent PTSD. That synthesis is teaching reasoning, not a quoted source.</p>

    <H>Follow-up clinics</H>
    <p>The UK PRaCTICaL trial found a <B>nurse-led ICU follow-up programme showed no evidence of being effective or cost-effective</B> for quality of life in the year after discharge. The authors suggested future work focus on early physical rehabilitation, delirium, cognitive dysfunction and relatives.<R label="PRaCTICaL 2009" /> This does not remove the NICE 2–3 month review; it means the content of follow-up matters, not just holding a clinic.</p>

    <Check q="a colleague says ICU diaries are proven to prevent PTSD. Is that right?" a="No. Jones 2010 found 13% v 5% new PTSD, but the larger 2019 JAMA trial found no significant difference (34.3% v 29.9%) and concluded the findings do not support diaries for preventing PTSD symptoms." />
    <LessonSources topicId={T} labels={["Jones 2010 (ICU diaries)", "Garrouste-Orgeas 2019", "PRaCTICaL 2009"]} />
  </div>;
}
