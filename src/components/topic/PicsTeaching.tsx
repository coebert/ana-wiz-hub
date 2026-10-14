import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "prognostication-ethics-icu";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: React.ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const B = ({ children }: { children: React.ReactNode }) => <strong className="text-foreground">{children}</strong>;
const Check = ({ q, a }: { q: string; a: string }) => (
  <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: {q}</summary><p className="mt-2">{a}</p></details>
);

export function PicsTeaching() {
  return <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-2 mb-4">
    <H>What PICS means</H>
    <p>The Society of Critical Care Medicine stakeholders' conference agreed <B>post-intensive care syndrome (PICS)</B> as the term for <B>new or worsening problems in physical, cognitive or mental health that arise after a critical illness and persist beyond the acute hospital stay</B>. The term can apply to the survivor or to a family member (often called PICS-F).<R label="SCCM PICS 2012" /> It is a description of problems across three domains, not a single diagnosis with fixed criteria.</p>

    <H>Physical: the legacy can last years</H>
    <p>Herridge's cohort followed 109 survivors of ARDS for five years. At 5 years the median 6-minute walk distance was <B>436 m, 76% of predicted</B>. Younger patients recovered faster, but <B>neither younger nor older patients returned to normal predicted physical function</B>, even though lung function was normal or near-normal. Other physical and psychological problems persisted in patients <em>and family caregivers</em> for up to five years.<R label="Herridge 2011" /> The limitation is therefore mainly outside the lung: muscle weakness, poor exercise tolerance and reduced physical quality of life.</p>

    <H>Cognitive: comparable to brain injury or early dementia</H>
    <p>BRAIN-ICU enrolled 821 adults with respiratory failure or shock; only 6% had cognitive impairment at baseline, and 74% developed delirium in hospital.<R label="BRAIN-ICU 2013 sedatives" /> <B>At 3 months, 40% had global cognition scores similar to moderate traumatic brain injury and 26% similar to mild Alzheimer's disease.</B> Deficits affected younger as well as older patients and persisted to 12 months. <B>Longer delirium was independently associated with worse cognition and executive function at 3 and 12 months.</B><R label="BRAIN-ICU 2013" /> Sedative and analgesic use was <em>not</em> consistently associated with long-term cognitive impairment.<R label="BRAIN-ICU 2013 sedatives" /> The modifiable target the trial points to is delirium duration, not one drug class. That is an association, not proof that shortening delirium prevents impairment.</p>

    <H>Psychological: common, overlapping and linked to mortality</H>
    <p>A UK-wide cohort of 21,633 ICU admissions sent questionnaires to 13,155 survivors; 38% replied. <B>Of the respondents, 55% passed the threshold for anxiety, depression or PTSD at 3 or 12 months</B>: anxiety 46%, depression 40% and PTSD 22%. Patients with depression symptoms were <B>47% more likely to die in the first 2 years</B> after ICU discharge (HR 1.47).<R label="Hatch 2018" /> With only 38% responding, the true prevalence in all survivors may be lower or higher; non-responders are a known source of bias in postal surveys.</p>

    <H>Prevention in the ICU: the ABCDEF bundle</H>
    <p>The bundle is: <B>A</B>ssess, prevent and manage pain; <B>B</B>oth spontaneous awakening and breathing trials; <B>C</B>hoice of analgesia and sedation; <B>D</B>elirium assessment and management; <B>E</B>arly mobility and exercise; <B>F</B>amily engagement. In the ICU Liberation Collaborative (over 15,000 adults), complete bundle performance was associated with lower delirium (AOR 0.60), coma (AOR 0.35), next-day ventilation (AOR 0.28), physical restraint (AOR 0.37), ICU readmission (AOR 0.54) and discharge somewhere other than home (AOR 0.64).<R label="ICU Liberation 2019" /> This was an observational quality-improvement study, so it shows association, not that the bundle prevents PICS itself.</p>

    <H>After the ICU: what NICE asks for</H>
    <ul className="list-disc list-inside space-y-1">
      <li><B>During the ICU stay:</B> a short clinical assessment as early as possible to find patients at risk of physical and non-physical morbidity, followed by a comprehensive assessment of rehabilitation needs for those at risk.<R label="NICE CG83 recs" /></li>
      <li><B>2–3 months after critical care discharge:</B> review patients with rehabilitation needs, with a face-to-face functional reassessment of health and social care needs.<R label="NICE CG83 recs" /></li>
    </ul>

    <H>Do follow-up clinics and diaries work?</H>
    <p><B>ICU diaries:</B> in a randomised trial of 352 patients with ICU stays over 72 hours, receiving a diary of their stay 1 month after discharge reduced new PTSD at 3 months from 13% to 5%.<R label="Jones 2010 (ICU diaries)" /></p>
    <p><B>Nurse-led follow-up clinics:</B> the UK PRaCTICaL trial (286 patients, three hospitals) found no evidence that a nurse-led follow-up programme improved quality of life at 12 months, and it cost more. The authors suggested future work should focus on early physical rehabilitation, delirium, cognitive dysfunction and relatives.<R label="PRaCTICaL 2009" /> So "follow-up clinics reduce PTSD" is not supported as a general statement; the evidence is specific to the intervention.</p>

    <Check q="a 45-year-old ARDS survivor has normal spirometry at 1 year but cannot return to work. Is this unusual?" a="No. In Herridge's 5-year ARDS cohort, lung function was normal or near-normal but physical function never returned to predicted levels, in younger as well as older patients. The limitation is mainly muscle weakness and poor exercise tolerance, not the lungs." />
    <Check q="what was the strongest modifiable association with long-term cognitive impairment in BRAIN-ICU?" a="Duration of delirium. Sedative and analgesic use was not consistently associated with impairment. It is an association, so it supports delirium prevention but does not prove it prevents cognitive PICS." />
    <Check q="a colleague says ICU follow-up clinics are proven to improve recovery. How do you respond?" a="PRaCTICaL found no quality-of-life benefit and higher cost from a nurse-led follow-up programme. The positive randomised evidence is narrower: ICU diaries given at 1 month reduced new PTSD at 3 months (5% v 13%). NICE still asks for rehabilitation review 2–3 months after discharge." />
    <LessonSources topicId={T} labels={["SCCM PICS 2012", "Herridge 2011", "BRAIN-ICU 2013", "BRAIN-ICU 2013 sedatives", "Hatch 2018", "ICU Liberation 2019", "NICE CG83 recs", "Jones 2010 (ICU diaries)", "PRaCTICaL 2009"]} />
  </div>;
}
