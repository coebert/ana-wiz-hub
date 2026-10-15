import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** ICU outcomes: national audit and survivorship. Quotes resolve original report/abstract excerpts. */
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
      <H>UK survival after hospital discharge</H>
      <Q label="Lone 2016 five-year survival" />
      <p><Reasoning />Lone used Scottish linked national registries: adult general ICU admissions in 2005 who survived hospital discharge, compared with matched hospital controls. Five-year mortality was 32.3% versus 22.7%; equivalently, survival was 67.7% versus 77.3% (arithmetic complements, not a new estimate). The clock starts at hospital discharge, so these percentages exclude deaths during the index admission. This is useful long-term UK evidence, but it is a historical cohort, not the 2024–25 ICNARC population or a prediction for a present-day patient. Comorbidity, pre-illness function, age and diagnosis matter; association with ICU admission does not establish that ICU care caused the excess deaths.</p>
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
      <p><Reasoning /><strong>Latest public annual report located, checked 15 October 2026:</strong> the 2024–25 report was released in 2026. It includes 209,047 patients but 222,377 admissions: a patient can have more than one admission. Scotland is not included in this CMP summary. Do not apply the national averages to sepsis, ARDS, elective postoperative care or another specific diagnosis without examining the relevant case mix.</p>
      <H>Public rounding versus the clinical summary</H>
      <Q label="ICNARC CMP 2024-25 clinical outcomes" />
      <p><Reasoning />The clinical summary reports hospital survival as 84.6%, rounded to 85% in the public version; critical care survival is 88.5% in both. Its mean stays are 5.9 days in critical care and 20.4 days in acute hospital (public version: 6 and 20). Means are not medians: a minority of long stays can raise the average. Hospital length of stay includes the hospital episode, not simply time on the ward after ICU. The public chart gives 7 critical care days and 16 hospital days for critical care non-survivors; its survivor/non-survivor grouping is by critical care outcome.</p>
      <p><Reasoning /><strong>Denominator caution:</strong> ICU survival, hospital survival, unique patients and admissions are different measures. The reports' rounded headline percentages do not establish a ward-only death rate: outcome follow-up, transfers, repeat admissions and eligible denominators must be checked first. The percentage-point difference is not the percentage of ICU survivors who died on a ward. ICNARC is an audit of acute outcomes; it does not supply a national return-to-work or PTSD rate in this summary.</p>
      <Check question="In the ICNARC CMP 2024-25 public summary, what proportion of admissions died in critical care and in acute hospital?">11.5% died in critical care; 15% died in acute hospital (85% survived to hospital discharge).</Check>
    </div>
  );
}

export function OutcomesLengthOfStayTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Length of stay and functional recovery</H>
      <Q label="Herridge 2003 ARDS stay" />
      <Q label="Herridge 2003 lung function" />
      <Q label="Herridge 2003 walk test" />
      <Q label="Herridge 2003 conclusion" />
      <p><Reasoning />a long ICU stay is a marker of severe illness and a cause of muscle wasting, weakness and lost weight. Length of stay is not a quality measure on its own: it reflects case mix, ward capacity and delayed discharge as well as care (teaching summary). Long stays are one of the NICE CG83 rehabilitation risk factors, covered on <L to="/intensive-care/icu-discharge-planning">ICU Discharge Planning</L>; physical, mental and cognitive consequences are on <L to="/intensive-care/pics-follow-up">PICS &amp; follow-up</L>.</p>
      <H>Five years on</H>
      <Q label="Herridge 2011 five-year function" />
      <Q label="Herridge 2011 conclusion" />
      <p><Reasoning />the lungs largely recover, but physical function does not return to normal even at five years, and the burden extends to family caregivers. Both Herridge cohorts were small Canadian ARDS groups of relatively young patients, so they show the pattern of recovery rather than the figures for every ICU survivor (teaching summary).</p>
      <Q label="NICE CG83 review" />
      <H>Disability is broader than lung function</H>
      <Q label="Hodgson 2017 disability" />
      <p><Reasoning />In this five-centre Australian cohort of hospital survivors ventilated for more than 24 hours, 65 of 262 followed-up survivors (25%) reported moderate or severe disability at six months using the WHO Disability Assessment Schedule 2.0. This is not a UK all-admission rate or simply a measurement of muscle strength. Function includes mobility, self-care, cognition, relationships, usual activities and participation. Compare with the patient's pre-illness baseline: discharge home, normal spirometry and independence in daily life are not interchangeable endpoints.</p>
      <Check question="What did Herridge find was the main reason for disability one year after ARDS?">Extrapulmonary problems, most prominently muscle wasting and weakness — lung volumes and spirometry were normal by 6 months, though gas transfer stayed low.</Check>
      <Check question="At 5 years in Herridge 2011, what was the median 6-minute walk distance?">436 m, 76% of predicted; neither younger nor older patients returned to normal predicted physical function.</Check>
    </div>
  );
}

export function OutcomesSeverityTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Severity scoring and fair comparison</H>
      <Q label="Knaus 1985 APACHE II" />
      <Q label="Knaus 1985 uses" />
      <p><Reasoning />raw mortality cannot be compared between units because case mix differs. Severity scores predict the expected death rate for a population; dividing observed by expected deaths gives a standardised mortality ratio, and this is how the ICNARC audit compares units (teaching summary). A score describes groups: it should not be used alone to decide whether an individual patient is admitted or treatment is withdrawn (teaching summary). Note the authors' own condition — the score works best <em>combined with an accurate description of disease</em>.</p>
      <Check question="What does APACHE II combine to give its severity score, and what is its range?">Initial values of 12 routine physiological measurements, age and previous health status; range 0 to 71.</Check>
      <Check question="Why compare units using risk-adjusted rather than raw mortality?">Because units admit different case mixes; adjustment compares observed deaths with those expected for that severity of illness.</Check>
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
      <Q label="ICNARC CMP 2024-25 clinical outcomes" />
      <p><Reasoning /><strong>Current UK audit versus historical all-readmission estimates:</strong> ICNARC 2024–25 reports 1.1% unplanned readmissions within 48 hours. Rosenberg's approximately 7% concerns broader readmission definitions in older studies. Different time windows and planned/unplanned classifications explain why these figures cannot be used as competing estimates of the same outcome. An early return may reflect deterioration, premature transfer or unavoidable disease progression; a low rate may also reflect limits on readmission. Interpret alongside case mix and mortality, not as an isolated quality score.</p>
      <p><Reasoning />readmitted patients do much worse, but the review warns that readmission rates are not yet proven to measure quality of care. Unstable vital signs at discharge are the most consistent warning sign, and night-time discharge was an independent predictor of death in one Australian cohort — consistent with NICE advice to avoid it. These are associations from observational studies, not proof that changing discharge timing alone saves lives (teaching summary).</p>
      <Check question="According to Rosenberg & Watts, what is the average ICU readmission rate and the most consistent predictor?">About 7% (range 4–14%); unstable vital signs at the time of ICU discharge.</Check>
    </div>
  );
}

export function OutcomesCognitionTeaching() {
  return <div className={lessonWrap}>
    <H>Cognitive recovery: attention, memory and executive function</H>
    <Q label="Pandharipande 2013 cognition" />
    <Q label="Pandharipande 2013 delirium association" />
    <p><Reasoning />BRAIN-ICU enrolled 821 US adults with respiratory failure or shock. Among patients assessed at 12 months, 34% had global cognition scores comparable to those seen after moderate traumatic brain injury and 24% comparable to mild Alzheimer's disease. These are comparisons of test performance, <strong>not diagnoses of either disorder</strong>; the more severely impaired group overlaps the broader group, so do not add the percentages. These are follow-up participants, not 34% and 24% of all original admissions.</p>
    <p><Reasoning />Difficulty remembering instructions, managing medicines, planning a task or sustaining concentration can persist despite good physical recovery, including in younger survivors. Longer delirium duration was independently associated with worse later cognition, but observational association does not prove that a particular delirium intervention prevents this disability. Pre-existing impairment, deaths and loss to follow-up affect estimates. A review should distinguish new problems from baseline impairment and arrange assessment when daily function is affected; see <L to="/intensive-care/pics-follow-up">PICS follow-up</L>.</p>
    <Check question="Do the BRAIN-ICU test comparisons mean survivors developed Alzheimer's disease?">No. They describe the severity of cognitive test scores, not a new neurological diagnosis; the two percentages overlap and apply to assessed survivors.</Check>
  </div>;
}

export function OutcomesWorkTeaching() {
  return <div className={lessonWrap}>
    <H>Return to work is a participation outcome</H>
    <Q label="Kamdar 2020 return to work" />
    <p><Reasoning />Kamdar's review included 52 studies and 10,015 survivors who were employed before critical illness. Pooled return to work was 36% at 1–3 months (95% CI 23–49%), 60% at 12 months (50–69%) and 68% at 42–60 months (51–85%). These are study-specific follow-up groups pooled at each interval, not a single cohort's recovery curve. They do not describe retired people, all ICU admissions or the probability that an employed patient will survive and return to work.</p>
    <Q label="Kamdar 2020 employment change" />
    <p><Reasoning />Returning to any job is not returning to the same duties, hours or sustained employment. The reported ranges for subsequent job loss, occupation change and worse employment come from individual studies, not pooled risks to add together. Physical fatigue, cognitive difficulty and psychological symptoms may all limit work; job demands, employer flexibility and the welfare system also matter. The evidence search ended in February 2018 and between-study heterogeneity was high (I² 87%), so this 2020 review is a useful benchmark, not a current UK national statistic.</p>
    <p><Reasoning />Ask about previous work, caring responsibilities, driving, finances and the tasks the person now finds difficult. A supported graded return and occupational-health input may be appropriate, but an ICU discharge date or a normal lung test alone cannot certify readiness for a safety-critical job. Practical rehabilitation and information about work and benefits are covered in <L to="/intensive-care/icu-discharge-planning">ICU Discharge Planning</L>.</p>
    <Check question="What is the denominator for the 60% return-to-work estimate at 12 months?">Previously employed survivors in the included follow-up studies, not all ICU admissions; return to work does not guarantee the same hours or lasting employment.</Check>
  </div>;
}

export function OutcomesPsychologicalTeaching() {
  return <div className={lessonWrap}>
    <H>Post-traumatic stress: the threshold changes the rate</H>
    <Q label="Parker 2015 PTSD thresholds" />
    <Q label="Parker 2015 PTSD one year" />
    <p><Reasoning />Parker's general-ICU meta-analysis found clinically important PTSD symptoms in 25% at 1–6 months using an Impact of Event Scale threshold ≥35, versus 44% with the less restrictive ≥20 threshold. At 7–12 months the respective estimates were 17% and 34%. Thus “the PTSD rate” needs a time point, instrument and threshold. These are symptom-screen estimates, not the proportion with a diagnosis confirmed by a clinical interview. Do not confuse the original IES thresholds with IES-Revised thresholds used elsewhere.</p>
    <H>Depression and anxiety can persist as well</H>
    <Q label="Rabiee 2016 depression" />
    <Q label="Nikayin 2016 anxiety" />
    <p><Reasoning />With Hospital Anxiety and Depression Scale subscale thresholds ≥8, pooled depressive symptoms were 29%, 34% and 29% at 2–3, 6 and 12–14 months; anxiety symptoms were 32%, 40% and 34% at the same intervals. These older systematic reviews are reference estimates rather than a present-day UK audit. PTSD, depression and anxiety overlap: adding them gives an invalid overall morbidity rate. A positive screen warrants clinical assessment; it does not establish a psychiatric diagnosis or show that ICU alone caused the symptoms.</p>
    <p><Reasoning />Explore intrusive memories, nightmares, avoidance, hyperarousal, low mood, loss of interest, anxiety and sleep problems alongside physical and cognitive recovery. Pre-existing mental ill health and frightening or delusional ICU memories can influence later symptoms. Persistent distress or impaired daily function should prompt appropriate psychological assessment; urgent concerns about self-harm need immediate clinical help, not a routine follow-up appointment. The <L to="/intensive-care/pics-follow-up">PICS Follow-Up Plan</L> covers the assessment pathway and conflicting diary trials.</p>
    <Check question="Why can two studies report 17% and 34% PTSD symptoms at the same follow-up interval?">Different screening thresholds identify different groups. Neither symptom percentage is automatically a clinician-confirmed PTSD diagnosis.</Check>
  </div>;
}

export function OutcomesContemporaryTeaching() {
  return <div className={lessonWrap}>
    <H>2026 evidence: common morbidity, but no single universal PICS rate</H>
    <Q label="Zare-Kaseb 2026 PICS prevalence" />
    <p><Reasoning />This review was published online in January 2026 and searched studies through October 2024. Its pooled prevalence of PICS was 60.3% and incidence 52.4%, but it accepted each primary study's definition and assessment method. PICS means new or worsening physical, cognitive or psychological problems after critical illness; a person need not have all three. Prevalence (problems present at assessment) and incidence (new cases under the study definition) are different measures and are not two stages of the same trajectory.</p>
    <p><Reasoning />The very high heterogeneity (I² 98.67% for prevalence) means the pooled estimate is a broad signal of burden, not “six in ten of every UK ICU population”. Timing, baseline function, screening cutoffs, diagnosis, geography and who survives or attends follow-up change the result. Report the outcome domain and its definition alongside any percentage. Family members can also experience psychological and practical consequences; patient percentages should not be repurposed as family prevalence.</p>
    <H>Latest psychological-intervention review</H>
    <Q label="Cesari 2026 psychological interventions" />
    <p><Reasoning />Cesari's review, published online in June 2026, included 39 studies of ICU or post-ICU interventions. Evidence remained heterogeneous: 14 studies found improvement in at least one psychological outcome, 23 found no benefit and two evaluative interventions were associated with worse outcomes. Counting positive studies does not establish a pooled treatment effect; narrative and multimodal approaches had signals of benefit but methodological limitations. Screening and referral are important, but neither follow-up attendance nor an ICU diary guarantees prevention of PTSD, depression or anxiety.</p>
    <Q label="NICE CG83 review" />
    <p><Reasoning />At the recommended 2–3 month review for patients with rehabilitation needs, document survival status, mobility and self-care, cognition, psychological symptoms, work/usual activities and progress against the person's goals. Use baseline-aware reassessment rather than a percentage to decide the next step. This page summarises source-checked evidence as of 15 October 2026, not individual prognostication or consultant certification.</p>
    <Check question="Can the 60.3% pooled PICS prevalence be used as an individual patient's risk?">No. Definitions, follow-up times and populations vary markedly; it describes a heterogeneous body of evidence, not an individual prognosis or a UK national audit rate.</Check>
  </div>;
}
