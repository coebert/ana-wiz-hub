import { POST_ARREST_CO2, POST_ARREST_PERFUSION, POST_ARREST_ENTRY, POST_ARREST_NSE, POST_ARREST_SSEP, POST_ARREST_ECPR_TRIALS, POST_ARREST_VENTILATION, POST_ARREST_PROGNOSIS } from "@/components/topic/PostArrestReviewedFacts";
import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { Ttm2Teaching } from "@/components/topic/Ttm2Teaching";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { cardiacArrestPostResusQuestions } from "@/data/quizzes";
import TopicTableOfContents from "@/components/layout/TopicTableOfContents";
import { ExamSection } from "@/components/exam/ExamSection";
import TtmTargetExplorerDiagram from "@/components/diagrams/intensive-care/TtmTargetExplorerDiagram";
import EcprDecisionTreeDiagram from "@/components/diagrams/intensive-care/EcprDecisionTreeDiagram";
import PostCardiacArrestProgDiagram from "@/components/diagrams/intensive-care/PostCardiacArrestProgDiagram";
import PostCardiacArrestSyndromeDiagram from "@/components/diagrams/intensive-care/PostCardiacArrestSyndromeDiagram";
import EEGTraceDiagram from "@/components/diagrams/physics/EEGTraceDiagram";
import ECMOCircuitDiagram from "@/components/diagrams/intensive-care/ECMOCircuitDiagram";
import ECMOTroubleshootingDiagram from "@/components/diagrams/intensive-care/ECMOTroubleshootingDiagram";
import MultimodalNeuromonitoringDiagram from "@/components/diagrams/intensive-care/MultimodalNeuromonitoringDiagram";
import CerebralMicrodialysisDiagram from "@/components/diagrams/intensive-care/CerebralMicrodialysisDiagram";
import ExpandableEcgCard from "@/components/diagrams/intensive-care/ExpandableEcgCard";
import { eegTraceContent, postArrestProgContent } from "@/components/diagrams/ecgExpandedContent";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InlineRef } from "@/components/references/InlineRef";
import { PostArrestOxygenTeaching } from "@/components/topic/PostArrestOxygenTeaching";

const arrestFaqs: Array<[string, string]> = [
  [
    "What does the 2021 Resuscitation Council UK / ERC ALS algorithm say for an adult in cardiac arrest?",
    "Confirm arrest, call for help and start chest compressions at 100–120 min⁻¹, depth 5–6 cm, with full recoil and minimal interruptions. Attach defibrillator pads as soon as available and assess rhythm every 2 minutes. For VF/pVT: deliver a shock (biphasic 120–200 J per manufacturer, then equal or escalating), resume CPR immediately for 2 minutes, give adrenaline 1 mg IV after the third shock and every 3–5 minutes thereafter, and amiodarone 300 mg after the third shock with a further 150 mg after the fifth. For non-shockable rhythms (asystole / PEA): give adrenaline 1 mg IV as soon as access is obtained and every 3–5 minutes, continue CPR, and actively look for reversible causes. Secure the airway (supraglottic device or tracheal tube) and switch to continuous compressions with asynchronous ventilations once an advanced airway is in place. Use waveform capnography throughout.",
  ],
  [
    "What are the 4 Hs and 4 Ts and how do I treat each at the bedside?",
    "The reversible causes are Hypoxia (high-flow O₂, secure airway, check ETT position and ventilation), Hypovolaemia (rapid IV/IO crystalloid, control haemorrhage, consider blood/MTP), Hyper/hypokalaemia and other metabolic disorders (10 mL 10% calcium chloride, 10 U insulin + 50 mL 50% dextrose, salbutamol, sodium bicarbonate; correct hypoglycaemia and acidosis), and Hypothermia (active rewarming, extended resuscitation and consider eCPR — 'not dead until warm and dead'); Tension pneumothorax (needle decompression / finger thoracostomy then chest drain), Tamponade (pericardiocentesis or resuscitative thoracotomy in trauma), Toxins (antidotes — naloxone, flumazenil, digibind, intralipid 20% for local-anaesthetic toxicity, sodium bicarbonate for TCAs), and Thrombosis (thrombolysis with alteplase 50 mg for suspected pulmonary embolism, then continue CPR for 60–90 minutes; primary PCI for coronary cause).",
  ],
  [
    "When should defibrillation energy be escalated and what's the role of dual sequential defibrillation?",
    "Use the manufacturer-recommended first biphasic energy (typically 120–200 J). If the manufacturer dose is unknown, default to the maximum available. Subsequent shocks should be of equal or higher energy. The DOSE-VF trial (Cheskes, NEJM 2022) randomised refractory VF after 3 standard shocks to (a) continued standard defibrillation, (b) vector-change (pad reposition anterior-posterior), or (c) double sequential external defibrillation (DSED, two defibrillators delivered ~1 second apart): DSED improved survival to hospital discharge (30.4% vs 13.3%) and survival with good neurological outcome. Vector-change was also superior to standard. That is trial evidence, not the UK recommendation: DOSE-VF was a single-system Canadian trial stopped early by COVID-19. RCUK 2025 advises considering a vector change (antero-posterior pads) after three failed shocks once correct antero-lateral positioning is ensured, and does not recommend routine dual (double) sequential defibrillation.",
  ],
  [
    "Does adrenaline actually improve outcome — what did PARAMEDIC2 show?",
    "PARAMEDIC2 (Perkins, NEJM 2018, n = 8 014 OHCA) compared 1 mg IV adrenaline every 3–5 minutes with placebo. Adrenaline increased survival to 30 days (3.2% vs 2.4%, OR 1.39) but the absolute increase in survivors with favourable neurological outcome (modified Rankin 0–3) was small (2.2% vs 1.9%) and no different statistically, with a higher proportion of survivors having severe neurological impairment (31% vs 18%). Interpretation: adrenaline improves ROSC and short-term survival but the marginal neurological benefit is debated. UK/ERC guidance retains 1 mg IV after the third shock in shockable rhythms and as soon as access is obtained in non-shockable rhythms, recognising the trade-off and the absence of a superior alternative.",
  ],
  [
    "Should I cool post-arrest patients to 33 °C or aim for active normothermia? What changed after TTM2?",
    "HACA (NEJM 2002) and Bernard (NEJM 2002) first showed benefit of 32–34 °C for 12–24 h after witnessed VF OHCA. TTM (Nielsen, NEJM 2013, n = 950) found no significant difference between 33 °C and 36 °C (no superiority shown; this is not proof of equivalence) — both were 'targeted temperature management' and both prevented fever. TTM2 (Dankiewicz, NEJM 2021, n = 1 850) compared 33 °C with normothermia targeting ≤ 37.5 °C, with device cooling triggered at ≥ 37.8 °C and found no difference in 6-month mortality (50% vs 48%) or neurological outcome. Current UK advice (RCUK / ERC–ESICM 2025) is to actively prevent fever by targeting ≤ 37.5 °C in patients who remain comatose after ROSC; the RCUK narrative gives 36–72 h, and its March 2026 algorithm states at least 72 h, which this page follows. The superseded 2022 update used > 37.7 °C. If a hypothermic target is used, rewarm slowly (TTM2 used about 0.33 °C/h).",
  ],
  [
    "Who is an appropriate candidate for eCPR and what does ARREST, Prague OHCA and INCEPTION tell us?",
    "ARREST (2020) was a small single-centre trial in selected refractory shockable arrests, with survival to discharge 6/14 versus 1/15 and early stopping for benefit. Prague OHCA did not meet its primary 180-day favourable neurological-survival endpoint (31.5% versus 22.0%; P = 0.09); favourable secondary or subgroup signals are exploratory. INCEPTION also found no statistically significant primary benefit. These trials do not prove that speed or operator volume alone explains their differences. eCPR is a selected rescue strategy within an organised service; eligibility and time-to-flow goals are locally defined, not universal age/ETCO₂ cutoffs or guarantees of benefit.",
  ],
  [
    "What is multimodal neuroprognostication and when do I perform it?",
    "Use current RCUK 2025 multimodal neuroprognostication in patients not awake and obeying commands (GCS motor < 6) at ≥ 72 h after ROSC, after excluding relevant confounders. Combine at least two concordant poor-outcome predictors at their specified times, and assess evidence supporting recovery as well as poor outcome. NSE > 60 µg/L at 48 h and/or 72 h is one specified marker; a rising trend alone is not an interchangeable threshold. EEG must be interpreted by pattern, timing and confounders. Technical quality matters for bilateral N20 absence, and neuromuscular blockade may improve recording quality. Indeterminate or discordant findings require further assessment. Prognosis informs shared decisions alongside patient wishes, overall illness and other factors; it is not an automatic withdrawal rule.",
  ],
  [
    "How should I manage the airway and ventilator in the first 6 hours post-ROSC?",
    "Intubation is indicated for persistent coma or another need for ventilation; rapid normal neurological recovery with adequate breathing does not automatically require intubation. For ventilated patients use tidal volume 6–8 mL/kg predicted body weight, individualised PEEP and reliable oxygen measurement to titrate toward SpO₂ 94–98%, with arterial PaCO₂ 4.7–6.0 kPa and continuous waveform capnography. Avoid hypoxaemia, hyperoxaemia and hypocapnia; repeat arterial gases after adjustments. Use short-acting sedation where appropriate. Routine neuromuscular blockade is not recommended, but may be considered for critical hypoxaemia with ARDS and, when clinically indicated, refractory shivering despite adequate sedation and counter-warming; assess the individual patient.",
  ],
];


const tocItems = [
  { id: "overview", label: "Overview & chain of survival", group: "Background" },
  { id: "als-algorithm", label: "ALS algorithm & 4Hs/4Ts", group: "Intra-arrest" },
  { id: "rosc-bundle", label: "Post-ROSC care bundle", group: "Acute" },
  { id: "ttm", label: "Targeted temperature management", group: "Acute" },
  { id: "haemodynamics", label: "Haemodynamics & ventilation", group: "Acute" },
  { id: "neuroprog", label: "Neuroprognostication", group: "Recovery" },
  { id: "modalities", label: "Modality deep-dive", group: "Recovery" },
  { id: "ecpr", label: "ECMO-CPR (eCPR)", group: "Advanced" },
  { id: "ecmo-circuit", label: "VA-ECMO circuit & troubleshooting", group: "Advanced" },
  { id: "ethics", label: "Family, ethics & WLST", group: "Recovery" },
  { id: "trial-evidence", label: "Landmark trial evidence", group: "Evidence" },
  { id: "faq", label: "Frequently asked questions", group: "Evidence" },
];


const objectives = [
  "Deliver the current RCUK 2025 post-ROSC bundle including airway, ventilation, haemodynamic and metabolic targets within the first 6 hours.",
  "Explain why current UK guidance (RCUK 2025) targets ≤ 37.5 °C fever prevention for at least 72 h, noting that TTM2's normothermia arm also targeted ≤ 37.5 °C with a ≥ 37.8 °C device trigger.",
  "Set evidence-based MAP, SpO₂, PaCO₂, glucose and Hb targets and justify each in terms of secondary brain injury.",
  "Perform multimodal neuroprognostication ≥ 72 h post-ROSC using clinical exam, NSE, EEG, SSEPs and imaging while excluding confounders.",
  "Identify suitable candidates for ECMO-CPR (eCPR) and outline the cannulation pathway, complications and Harlequin physiology.",
  "Manage VA-ECMO complications — limb ischaemia, LV distension, recirculation and differential hypoxia — at the bedside.",
  "Communicate honestly with families, time WLST appropriately and refer DCD candidates to SNOD before withdrawal.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Setting post-ROSC ventilation & oxygen targets",
    scenario:
      "55-year-old, witnessed VF OHCA, ROSC at 18 min after 3 shocks. Now intubated, sedated, FiO₂ 1.0, SpO₂ 100 %, PaO₂ 38 kPa, PaCO₂ 3.4 kPa on TV 550 mL (PBW 70 kg). MAP 60 on noradrenaline 0.15 µg/kg/min. Lactate 6.2.",
    working:
      "Reliable oxygen measurements show hyperoxaemia and PaCO₂ 3.4 kPa shows hypocapnia. Titrate FiO₂ toward SpO₂ 94–98% and adjust ventilation toward PaCO₂ 4.7–6.0 kPa, using repeat arterial gases. TV 550 mL at PBW 70 kg is 7.9 mL/kg, within the 6–8 mL/kg range. MAP 60 requires reassessment of perfusion, volume status, myocardial function and cause; current UK guidance targets SBP > 100 mmHg or MAP > 60–65 mmHg with individual adjustment. Do not prescribe a fixed vasopressor escalation from that number alone.",
    answer:
      "Titrate oxygen and ventilation to the current targets, assess perfusion and cardiac function, and tailor fluid/vasoactive support. If the patient remains comatose, use active fever prevention targeting ≤ 37.5 °C. Obtain ECG and echocardiography; prioritise immediate angiography for ST elevation or strong suspicion of occlusion, including haemodynamic or electrical instability. VF as the original rhythm alone does not require immediate angiography in every stable patient.",
    cites: ["RCUK PRC 2025", "RCUK PRC Algorithm March 2026", "Schmidt 2022 BOX oxygen"],
  },
  {
    title: "Multimodal neuroprognostication at 72 h",
    scenario:
      "Day 4 post-OHCA, fully rewarmed, off sedation for 36 h. GCS E1 VT M2. Pupils fixed bilaterally, corneals absent, NPi 0. NSE 88 µg/L at 72 h (rising from 62 at 48 h). Continuous EEG: burst-suppression unreactive. SSEPs: bilaterally absent N20.",
    working:
      "At day 4, a motor score 2 meets the current RCUK 2025 entry criterion (motor < 6), but 36 h without sedation alone does not establish drug clearance. Confirm all confounders and technical quality. Concordant absent pupil/corneal reflexes, highly malignant burst-suppression, bilateral N20 absence and appropriately timed NSE elevations warrant a structured multimodal assessment; EEG unreactivity alone is not the malignant-pattern definition. Consider recovery signs and the whole patient before communicating prognosis or treatment decisions.",
    answer:
      "These findings warrant a specialist multimodal assessment after confounders and technical quality are verified, alongside signs supporting recovery. Communicate uncertainty and patient-centred goals; motor score or a count of tests does not automatically determine withdrawal. Prognostication is distinct from DNC testing.",
    cites: ["RCUK PRC 2025"],
  },
  {
    title: "eCPR candidate selection",
    scenario:
      "42-year-old collapses in front of bystander, immediate CPR. EMS arrive at 6 min — VF, 3 shocks, mechanical CPR (LUCAS) commenced. ETCO₂ 22 mmHg. No ROSC at 25 min. Initial rhythm shockable, no significant comorbidities, transport time to ECMO centre 15 min.",
    working:
      "This history may meet the local eCPR selection pathway: witnessed arrest, immediate CPR, refractory shockable rhythm and a prospect of short low-flow time. Confirm eligibility with the receiving ECMO team while high-quality ALS continues. Trial enrolment rules are not universal criteria; projected transport time does not itself guarantee timely extracorporeal flow.",
    answer:
      "Activate the organised eCPR pathway if accepted, continue high-quality CPR during safe transport and aim for rapid extracorporeal flow. The specialist team determines coronary assessment and cannulation details. Monitor limb perfusion and arrange a distal-perfusion cannula promptly when indicated; it should not delay initial restoration of circulation.",
    cites: ["ARREST 2020", "Prague OHCA 2022", "INCEPTION 2023", "ELSO ECPR 2021"],
  },
  {
    title: "Harlequin (north–south) syndrome on VA-ECMO",
    scenario:
      "Day 2 femoro-femoral VA-ECMO post eCPR. ECMO flow 4.5 L/min, post-oxygenator PaO₂ 55 kPa. Right radial ABG: PaO₂ 7.1 kPa, SpO₂ 86 %. Femoral ABG: PaO₂ 32 kPa. Pulmonary oedema on CXR, low LV ejection fraction.",
    working:
      "Differential hypoxia: well-oxygenated retrograde ECMO blood meets poorly oxygenated antegrade native cardiac output in the aortic arch. The 'mixing point' has shifted distal to the great vessels because native LV ejection (with diseased lungs) has improved while the lungs cannot oxygenate. Upper body (cerebral, coronary) perfused by hypoxic native blood.",
    answer:
      "Optimise native lung function first (recruit, increase PEEP/FiO₂, diuresis). If persistent, convert to VAV-ECMO by adding an internal jugular return cannula to oxygenate the upper body, or move to central VA-ECMO. Monitor right radial saturation continuously as the early warning.",
    cites: ["ELSO Guidelines 2020"],
  },
];

const keyPoints = [
  { text: "Post-cardiac-arrest syndrome = brain injury + myocardial dysfunction + ischaemia–reperfusion + precipitating pathology — treat all four.", cites: ["TTM2 2021"] },
  { text: `After reliable measurement, target SpO₂ 94–98% and PaCO₂ ${POST_ARREST_CO2}. ${POST_ARREST_PERFUSION} Use standard ICU glucose care, avoiding hypoglycaemia.`, cites: ["RCUK PRC 2025", "RCUK PRC Algorithm March 2026"] },
  { text: "Temperature: RCUK 2025 targets ≤ 37.5 °C fever prevention in comatose survivors for at least 72 h (algorithm); TTM2 (2021) normothermia arm targeted ≤ 37.5 °C (device trigger ≥ 37.8 °C) and found 33 °C no better.", cites: ["RCUK PRC 2025", "TTM2 2021"] },
  { text: "Rewarm slowly (0.25–0.5 °C/h) — watch for hyperkalaemic rebound and prolonged drug clearance during cooling.", cites: ["ELSO Guidelines 2020"] },
  { text: "Neuroprognostication is multimodal, performed ≥ 72 h after ROSC, after confounders are excluded, and requires ≥ 2 concordant poor-outcome markers.", cites: ["RCUK PRC 2025", "RCUK PRC Algorithm March 2026"] },
  { text: "Specific markers: bilaterally absent pupil + corneal reflexes, bilaterally absent N20 SSEPs, NSE > 60 µg/L at 48 h and/or 72 h, highly malignant EEG after 24 h, status myoclonus ≤ 72 h, diffuse anoxic injury on CT or MRI.", cites: ["ERC/ESICM 2021 Post-Resus"] },
  { text: POST_ARREST_ECPR_TRIALS, cites: ["ARREST 2020", "Prague OHCA 2022", "INCEPTION 2023"] },
  { text: "VA-ECMO: anticipate limb ischaemia (distal perfusion cannula), Harlequin syndrome (right radial sat monitoring → consider VAV), LV distension (vent with IABP/Impella).", cites: ["ELSO Guidelines 2020"] },
  { text: "Avoid the self-fulfilling prophecy — do not withdraw before multimodal assessment is complete.", cites: ["ERC/ESICM 2021 Post-Resus"] },
  { text: "Refer DCD candidates to SNOD before WLST is raised with the family — preserves donation potential without altering care.", cites: ["ERC/ESICM 2021 Post-Resus"] },
];

const coreConcepts = (
  <>
    <TopicTableOfContents items={tocItems} />

    {/* ─────────── Overview ─────────── */}
    <ExamSection id="overview" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="From ROSC to Recovery" defaultOpen>
      <p className="text-muted-foreground leading-relaxed mb-3">
        Survival from cardiac arrest hinges on a chain of survival, but
        outcome is determined as much by what happens <em>after</em> ROSC
        as by the resuscitation itself. The post-cardiac-arrest syndrome
        comprises <span className="font-medium text-foreground">brain injury, myocardial dysfunction, systemic ischaemia–reperfusion</span>,
        and the <span className="font-medium text-foreground">precipitating pathology</span>. Bundled care — coronary
        reperfusion, controlled temperature, lung-protective ventilation,
        haemodynamic targets and delayed multimodal neuroprognostication —
        was associated with better neurological survival in before-and-after
        cohort studies, although the individual contribution of each element is uncertain.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {[
          { label: "OHCA survival to discharge", value: "8–10 %", note: "UK national OHCA registry" },
          { label: "Survival with good neuro outcome", value: "~6–7 %", note: "CPC 1–2 at discharge" },
          { label: "IHCA survival to discharge", value: "~24 %", note: "Higher witnessed/monitored proportion" },
          { label: "eCPR trial evidence", value: "Mixed", note: "ARREST positive; Prague OHCA and INCEPTION primary outcomes not significant" },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-lg border border-border bg-card">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{s.label}</p>
            <p className="text-xl font-serif font-bold text-foreground mt-0.5">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg border border-border bg-card mt-3">
        <p className="text-sm font-semibold text-foreground mb-2">Post-arrest myocardial dysfunction</p>
        <p className="text-xs text-muted-foreground mb-2">
          Global myocardial stunning affects most patients after prolonged arrest: cardiac index falls
          within hours, is typically lowest at 8–24 h and usually recovers by 48–72 h. It is reversible
          ischaemia–reperfusion injury (calcium overload, oxidative stress, cytokine release), distinct
          from infarct-related pump failure — although the two coexist
          <InlineRef topicId="cardiac-arrest-post-resus" refLabel="ERC/ESICM 2021 Post-Resus" />.
        </p>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li><span className="font-medium text-foreground">Recognise:</span> early echocardiography (global hypokinesia with low LVOT VTI/ejection fraction), rising lactate, low ScvO₂, oliguria, escalating vasopressor requirement, and a raised troponin/NT-proBNP that does not fit the coronary picture.</li>
          <li><span className="font-medium text-foreground">Exclude a treatable cause:</span> urgent coronary angiography for ST-elevation or ongoing ischaemia, and treat tamponade, PE, tension pneumothorax, arrhythmia, severe acidosis and electrolyte derangement.</li>
          <li><span className="font-medium text-foreground">Support:</span> optimise preload cautiously (fluid guided by dynamic assessment and echo), individualised perfusion support (UK SBP > 100 mmHg or MAP > 60–65 mmHg), considering an inotrope — dobutamine 2.5–10 µg/kg/min or milrinone — titrated to cardiac index, lactate clearance and urine output rather than to a fixed number. Avoid excessive tachycardia, which worsens the oxygen-supply balance.</li>
          <li><span className="font-medium text-foreground">Temperature and rhythm:</span> expect bradycardia at 33 °C (well tolerated if perfusing); maintain potassium ≥ 4.0 and magnesium ≥ 1.0 mmol/L; consider pacing only if bradycardia is compromising output.</li>
          <li><span className="font-medium text-foreground">Escalate:</span> if shock persists despite inotropes (cardiac index &lt; 2.0 L/min/m², rising lactate, oliguria), discuss mechanical support early — IABP, Impella or VA-ECMO — with the cardiology/cardiothoracic team, remembering that stunning is usually reversible and so justifies a bridge.</li>
          <li><span className="font-medium text-foreground">Monitor:</span> serial echocardiography, continuous cardiac-output monitoring, lactate and ScvO₂ trends; wean inotropes as function recovers over 48–72 h.</li>
        </ul>
      </div>
      </CollapsibleSubsection>
    </ExamSection>

    <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
      <PostCardiacArrestSyndromeDiagram />
    </ExamSection>

    {/* ─────────── Post-ROSC bundle ─────────── */}
    {/* ─────────── ALS algorithm ─────────── */}
    <ExamSection id="als-algorithm" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="Adult ALS Algorithm — RCUK / ERC 2021" defaultOpen>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Confirm arrest, call for help, deliver continuous chest compressions
          (100–120 min⁻¹, depth 5–6 cm, full recoil), attach the defibrillator
          and assess rhythm <span className="font-medium text-foreground">every 2 minutes</span>.
          The first pharmacological dose of adrenaline (1 mg IV) follows the
          third shock in VF/pVT, and is given as soon as access is obtained
          in non-shockable rhythms.
        </p>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-4 rounded-lg border border-icu/30 bg-icu/5">
            <p className="text-sm font-semibold text-foreground mb-2">Shockable (VF / pulseless VT)</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Shock 1 — biphasic 120–200 J (manufacturer-specified); equal or escalating thereafter</li>
              <li>Resume CPR immediately for 2 min — do not pulse-check post-shock</li>
              <li>After shock 3: <span className="font-medium text-foreground">adrenaline 1 mg IV</span> + <span className="font-medium text-foreground">amiodarone 300 mg IV</span></li>
              <li>After shock 5: amiodarone 150 mg IV (or lidocaine 1 mg/kg if amiodarone unavailable)</li>
              <li>Repeat adrenaline 1 mg every 3–5 min (alternate loops)</li>
              <li>Refractory VF after 3 shocks (correct antero-lateral pads confirmed) → consider vector change to antero-posterior pads. RCUK 2025 does not recommend routine dual sequential defibrillation; DOSE-VF 2022 is trial evidence only</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-icu/30 bg-icu/5">
            <p className="text-sm font-semibold text-foreground mb-2">Non-shockable (PEA / asystole)</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Adrenaline 1 mg IV as soon as access — then every 3–5 min</li>
              <li>Continuous high-quality CPR; secure airway when feasible</li>
              <li>Active search for reversible causes (4Hs / 4Ts) — POCUS to identify tamponade, RV strain, hypovolaemia</li>
              <li>No routine atropine; no routine bicarbonate (except hyperK⁺ / TCA / prolonged arrest with profound acidaemia)</li>
              <li>Confirm asystole on more than one lead; check leads, gain and pad contact before declaring</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full text-xs border border-border bg-card rounded-lg">
            <thead className="bg-muted/40">
              <tr>
                <th className="text-left px-3 py-2 font-semibold text-foreground">Reversible cause</th>
                <th className="text-left px-3 py-2 font-semibold text-foreground">Bedside clue</th>
                <th className="text-left px-3 py-2 font-semibold text-foreground">Immediate action</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Hypoxia", "Desaturation, mucus plug, oesophageal intubation", "100% O₂, confirm ETT placement, capnography, suction"],
                ["Hypovolaemia", "Trauma, GI bleed, ruptured AAA, anaphylaxis", "Rapid crystalloid + blood, MTP, control haemorrhage, adrenaline if anaphylactic"],
                ["Hyper/hypokalaemia & metabolic", "Renal failure, crush, rhabdo, DKA", "10 mL 10% CaCl₂, insulin/dextrose, salbutamol, bicarbonate; correct glucose"],
                ["Hypothermia", "Submersion, environmental, post-operative", "Active rewarming, prolong resus — 'not dead until warm and dead', consider eCPR"],
                ["Tension pneumothorax", "Tracheal deviation, absent breath sounds, ↑PAW", "Needle decompression 2nd ICS MCL or 5th ICS AAL, then finger thoracostomy + ICD"],
                ["Tamponade", "Trauma, post-cardiac surgery, malignancy", "POCUS confirmation, pericardiocentesis or resuscitative thoracotomy"],
                ["Toxins", "Overdose history, occupational exposure", "Naloxone (opioid), digibind (digoxin), intralipid (LA toxicity), bicarbonate (TCA)"],
                ["Thrombosis (PE / coronary)", "Recent surgery, immobility, chest pain pre-arrest", "Alteplase 50 mg IV for PE, continue CPR 60–90 min; primary PCI for coronary cause"],
              ].map((r) => (
                <tr key={r[0]} className="border-t border-border">
                  <td className="px-3 py-1.5 font-medium text-foreground">{r[0]}</td>
                  <td className="px-3 py-1.5 text-foreground/85">{r[1]}</td>
                  <td className="px-3 py-1.5 text-muted-foreground">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 rounded-lg border border-border bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">Capnography during CPR</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>ETCO₂ &lt; 1.3 kPa (10 mmHg) after 20 min of ALS predicts very poor outcome (but use as part of the overall picture, never in isolation)</li>
            <li>Sudden rise in ETCO₂ ≥ 1.3 kPa often heralds ROSC — finish the 2-minute cycle before pulse-checking</li>
            <li>Persistent flat trace with chest rise strongly suggests oesophageal intubation</li>
          </ul>
        </div>
      </CollapsibleSubsection>
    </ExamSection>

    <ExamSection id="rosc-bundle" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">

      <CollapsibleSubsection title="The Post-ROSC Bundle (RCUK 2025)">
      <p className="text-muted-foreground leading-relaxed mb-3">
        Within the first 6 h after ROSC, deliver a structured bundle in
        parallel: airway and ventilation, haemodynamics, coronary reperfusion,
        temperature control, glycaemic control, and family communication
        (<InlineRef topicId="cardiac-arrest-post-resus" refLabel="RCUK PRC 2025" />,
        <InlineRef topicId="cardiac-arrest-post-resus" refLabel="Singapore Med J 2017 (Post-resus)" />).
      </p>

      <div className="p-4 rounded-lg border border-border bg-card mb-3">
        <p className="text-sm font-semibold text-foreground mb-2">Current RCUK 2025 structured bundle</p>
        <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
          <li><span className="font-medium text-foreground">Identify and treat the cause</span> — 12-lead ECG in all patients; immediate coronary angiography ± PCI for STEMI or ongoing myocardial ischaemia; CT pulmonary angiogram if PE is suspected as the precipitant.</li>
          <li><span className="font-medium text-foreground">Airway and breathing</span> — intubate for persistent coma or another ventilation indication, not automatically after rapid recovery with adequate breathing; lung-protective ventilation (6–8 mL/kg PBW); target SpO₂ 94–98 %; target PaCO₂ {POST_ARREST_CO2} (normocapnia).</li>
          <li><span className="font-medium text-foreground">Circulation</span> — {POST_ARREST_PERFUSION} Assess urine output &gt; 0.5 mL/kg/h and a normal or falling lactate; obtain early echocardiography to assess myocardial function; use fluids, vasopressors and inotropes as required, with mechanical circulatory support (IABP, Impella, VA-ECMO) considered for refractory cardiogenic shock.</li>
          <li><span className="font-medium text-foreground">Disability / neuroprotection</span> — temperature control with active prevention of fever targeting ≤ 37.5 °C for at least 72 h; continuous EEG for seizure detection and prompt anticonvulsant treatment; a clear sedation strategy that permits later neuroprognostication.</li>
          <li><span className="font-medium text-foreground">Metabolic control</span> — avoid hypoglycaemia and manage glucose by standard ICU protocol (many units use about 6–10 mmol/L); correct potassium, magnesium and calcium.</li>
        </ol>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {[
          {
            title: "Airway & ventilation",
            items: [
              POST_ARREST_VENTILATION,
              "Target SpO₂ 94–98 % (avoid hyperoxia — increased mortality in observational studies)",
              `Target PaCO₂ ${POST_ARREST_CO2} (avoid hypocapnia — cerebral vasoconstriction)`,
              "Capnography mandatory; ETCO₂ rise often heralds ROSC and falls warn of arrest recurrence",
            ],
          },
          {
            title: "Coronary reperfusion",
            items: [
              "Prioritise immediate angiography for ST elevation or high suspicion of coronary occlusion, including haemodynamic/electrical instability; new LBBB alone is not an automatic indication",
              "In stable patients without ST elevation, use selective coronary assessment; the original VF rhythm alone is not an indication for immediate angiography",
              "COACT (2019) and TOMAHAWK (2021) showed no benefit of immediate angiography without ST elevation — selectivity matters",
            ],
          },
          {
            title: "Haemodynamics",
            items: [
              POST_ARREST_PERFUSION + " BOX (MAP 77 vs 63 mmHg) showed no benefit from the higher trial target.",
              "Hypotension after ROSC is associated with worse outcome in observational studies",
              "Echocardiogram early — myocardial stunning is common, often resolves by 48–72 h",
              "Vasopressors as needed; consider mechanical support (IABP, Impella, VA-ECMO) for cardiogenic shock",
            ],
          },
          {
            title: "Metabolic & glycaemic",
            items: [
              "Both hyperglycaemia (worsens cerebral oedema and ischaemic neuronal injury) and hypoglycaemia (directly neurotoxic) worsen neurological outcome — target a pragmatic 6–10 mmol/L rather than tight control",
              "Hourly capillary/arterial glucose monitoring with a dynamic (variable-rate) insulin infusion protocol titrated against the trend",
              "Avoid tight control (< 6 mmol/L) because of the high risk of unrecognised hypoglycaemia in the sedated, cooled patient",
              "Replace K⁺ to ≥ 4.0 mmol/L, Mg²⁺ ≥ 1.0 mmol/L, correct calcium",
              "Lactate clearance is a useful surrogate for tissue perfusion",
              "Avoid steroids routinely (no outcome benefit unless adrenal failure)",
            ],
          },
          {
            title: "Temperature control",
            items: [
              "Continuous core-temperature monitoring and active fever prevention targeting ≤ 37.5 °C for ≥ 72 h (RCUK / ERC–ESICM 2025)",
              "No routine hypothermic target: TTM2 found 33 °C no better than normothermia with fever control",
              "Avoid fever in the comatose patient regardless of strategy chosen",
              "Active cooling device + core temperature feedback (oesophageal/bladder/intravascular)",
            ],
          },
          {
            title: "Seizure & neuro monitoring",
            items: [
              "EEG within 24 h if comatose — early seizure detection & treatment",
              "Treat status epilepticus aggressively (levetiracetam, valproate, sodium channel blockers)",
              "Avoid prophylactic anticonvulsants (no outcome benefit); TELSTAR (2022) found aggressively suppressing rhythmic/periodic EEG patterns did not improve outcome",
              "NIRS / cerebral oximetry is an emerging adjunct",
            ],
          },
        ].map((card) => (
          <div key={card.title} className="p-4 rounded-lg border border-border bg-card">
            <p className="text-sm font-semibold text-foreground mb-2">{card.title}</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              {card.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Glycaemic targets and rationale per <InlineRef topicId="cardiac-arrest-post-resus" refLabel="Singapore Med J 2017 (Post-resus)" />.
      </p>
      </CollapsibleSubsection>
    </ExamSection>

    {/* ─────────── TTM ─────────── */}
    <ExamSection id="ttm" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="Targeted Temperature Management">
      <p className="text-muted-foreground leading-relaxed mb-3">
        TTM aims to <span className="font-medium text-foreground">prevent secondary brain injury</span> from
        ischaemia–reperfusion and to <span className="font-medium text-foreground">avoid pyrexia</span>, which
        independently worsens outcome. The 2022 ERC–ESICM update no longer recommends a routine hypothermic target;
        if a unit still cools to 33–36 °C, rewarm slowly
        (<span className="font-medium text-foreground">about 0.25–0.5 °C/h</span>), then maintain
        <span className="font-medium text-foreground"> strict fever control to 72 h post-ROSC</span>.
      </p>

      <TtmTargetExplorerDiagram />

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div className="p-3 rounded-lg border border-border bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">How to deliver TTM</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Surface (Arctic Sun) or intravascular (Thermogard / Coolgard) device with closed-loop temperature feedback</li>
            <li>Sedation: propofol + fentanyl ± dexmedetomidine. Routine NMBA is not recommended; consider individual need for critical hypoxaemia with ARDS or refractory shivering despite adequate sedation and counter-warming</li>
            <li>Core temperature monitoring — oesophageal probe is standard; bladder lags; rectal lags markedly</li>
            <li>Daily checklist: K⁺, Mg²⁺, glucose, coagulation, ileus, pressure areas, lines</li>
          </ul>
        </div>
        <div className="p-3 rounded-lg border border-border bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">Pitfalls of cooling</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li><span className="font-medium text-foreground">Cold diuresis</span> → hypovolaemia, hypoK⁺ during induction; <span className="font-medium text-foreground">hyperK⁺ rebound</span> on rewarm — rewarm slowly and don't aggressively replace K⁺ in last hour of cooling</li>
            <li><span className="font-medium text-foreground">Drug clearance ↓ ~30 %</span> — sedatives accumulate; lengthens neuroprognostication window</li>
            <li>Bradycardia (~40–50 bpm) at 33 °C is expected and well tolerated unless hypoperfusing</li>
            <li>Shivering increases metabolic rate and O₂ consumption — manage with a stepwise algorithm (below)</li>
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-border bg-card mt-3">
        <p className="text-sm font-semibold text-foreground mb-2">Stepwise shivering management during TTM</p>
        <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
          <li><span className="font-medium text-foreground">Measure it</span> — score shivering objectively (Bedside Shivering Assessment Scale 0 = none, 1 = mild neck/thorax, 2 = moderate involving the arms, 3 = generalised) at least hourly, and treat any score ≥ 1, since shivering raises metabolic rate, oxygen consumption, intracranial pressure and cooling failure <InlineRef topicId="cardiac-arrest-post-resus" refLabel="ERC/ESICM 2021 Post-Resus" />.</li>
          <li><span className="font-medium text-foreground">Counter-warming</span> — raise ambient room temperature and apply surface warming to the hands, feet and face (tricks the hypothalamic thermostat without impairing core cooling).</li>
          <li><span className="font-medium text-foreground">First-line pharmacological</span> — regular paracetamol; IV magnesium sulfate 2–4 g loading dose followed by an infusion, targeting a serum Mg²⁺ of ~1.0–1.5 mmol/L (raises the shivering threshold).</li>
          <li><span className="font-medium text-foreground">Deepen sedation</span> — increase propofol and add an α2-agonist (dexmedetomidine or clonidine) for its anti-shivering and sympatholytic effect.</li>
          <li><span className="font-medium text-foreground">Opioids</span> — fentanyl or alfentanil infusion (pethidine is effective via its kappa-agonist/anticholinergic action but is rarely used now because of seizure risk from the norpethidine metabolite).</li>
          <li><span className="font-medium text-foreground">Neuromuscular blockade — last resort</span> — cisatracurium or rocuronium as a bolus or infusion, only once sedation is adequate, with continuous EEG running throughout because paralysis masks clinical seizure activity.</li>
        </ol>
      </div>
      </CollapsibleSubsection>
    </ExamSection>

    {/* ─────────── Haemodynamics ─────────── */}
    <ExamSection id="haemodynamics" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="Haemodynamic & Ventilatory Targets">
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="w-full text-xs border border-border bg-card rounded-lg">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-left px-3 py-2 font-semibold text-foreground">Parameter</th>
              <th className="text-left px-3 py-2 font-semibold text-foreground">Target</th>
              <th className="text-left px-3 py-2 font-semibold text-foreground">Why</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["MAP", "SBP > 100 mmHg or MAP > 60–65 mmHg; individualised", "BOX (77 vs 63 mmHg) and NEUROPROTECT (higher MAP raised rSO₂ but did not reduce anoxic brain injury on MRI) found no benefit from higher targets."],
              ["SpO₂", "94–98 %", "Avoid hyperoxia (free-radical injury) and hypoxia."],
              ["PaCO₂", `${POST_ARREST_CO2} (35–45 mmHg)`, "Hypocapnia → cerebral vasoconstriction; hypercapnia → ↑ICP."],
              ["Tidal volume", "6–8 mL/kg PBW", "Lung-protective; reduces VILI."],
              ["Glucose", "Standard ICU protocol", "Avoid hypoglycaemia and severe hyperglycaemia; no post-arrest-specific target is mandated."],
              ["Hb", "General ICU thresholds", "No post-arrest-specific transfusion trial; most units use ~70 g/L, often higher with active myocardial ischaemia."],
              ["Sedation depth", "RASS −2 to −4 during TTM", "Suppress shivering, avoid awareness; minimise to allow neuro assessment after rewarming."],
            ].map((r) => (
              <tr key={r[0]} className="border-t border-border">
                <td className="px-3 py-1.5 font-medium text-foreground">{r[0]}</td>
                <td className="px-3 py-1.5 text-foreground/85">{r[1]}</td>
                <td className="px-3 py-1.5 text-muted-foreground">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InlineRef topicId="cardiac-arrest-post-resus" refLabel="RCUK PRC 2025" />
      </CollapsibleSubsection>
    </ExamSection>

    {/* ─────────── Neuroprognostication ─────────── */}
    <ExamSection id="neuroprog" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="Multimodal Neuroprognostication">
      <p className="text-muted-foreground leading-relaxed mb-3">
        No single test predicts poor outcome with sufficient certainty —
        ERC/ESICM mandate <span className="font-medium text-foreground">multimodal assessment</span> at
        <span className="font-medium text-foreground"> ≥ 72 h after ROSC</span> (later if sedated, hypothermic
        or metabolically deranged). Entry criterion: comatose patient with
        GCS motor &lt; 6 after exclusion of confounders. Two or more
        concordant poor-prognosis markers from independent modalities are
        interpreted at the specified times. {POST_ARREST_PROGNOSIS} This assessment is distinct from DNC testing.<InlineRef topicId="cardiac-arrest-post-resus" refLabel="RCUK PRC 2025" />
      </p>

      <div className="mt-4 p-3 rounded-lg border border-icu/30 bg-icu/5">
        <p className="text-sm font-semibold text-foreground mb-1">Confounders that must be excluded first</p>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li>Residual sedation (propofol, opioids, benzodiazepines, NMBA) — wait 5 × elimination half-lives</li>
          <li>Hypothermia (rewarm fully &gt; 36 °C before formal assessment)</li>
          <li>Severe metabolic derangement (uraemia, hepatic failure, electrolytes)</li>
          <li>Hypoglycaemia, hypotension, severe hypoxaemia at the time of testing</li>
          <li>Status epilepticus (treat aggressively, then reassess)</li>
        </ul>
      </div>
      <div className="mt-4 space-y-4">
        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <ExpandableEcgCard content={postArrestProgContent}>
            {() => <PostCardiacArrestProgDiagram />}
          </ExpandableEcgCard>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <MultimodalNeuromonitoringDiagram />
        </div>
      </div>
      </CollapsibleSubsection>
    </ExamSection>

    {/* ─────────── Modality deep-dive ─────────── */}
    <ExamSection id="modalities" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="Modality Deep-Dive">

      <div className="space-y-3">
        {[
          {
            title: "Clinical examination (≥ 72 h)",
            detail:
              "Assess pupils and corneal reflexes at the specified times with attention to technique and confounders. Current RCUK 2025 considers patients with GCS motor < 6 at ≥ 72 h who are not awake and obeying commands. Neither that motor score nor an isolated reflex finding establishes outcome. Status myoclonus within 72 h is one algorithm marker and should prompt EEG; distinguish it from electrographic status epilepticus.",
            color: "hsl(0, 75%, 55%)",
          },
          {
            title: "Neuron-specific enolase (NSE)",
            detail:
              POST_ARREST_NSE,
            color: "hsl(170, 60%, 40%)",
          },
          {
            title: "Electroencephalography (EEG)",
            detail:
              "Continuous or early EEG if available. Highly malignant patterns (suppressed background with or without periodic discharges, or burst-suppression) after 24 h count as a poor-outcome marker in ERC/ESICM 2021. Reactivity testing is essential — a reactive background is reassuring even in the comatose patient. Confounders: sedation, hypothermia, metabolic derangement.",
            color: "hsl(270, 65%, 55%)",
          },
          {
            title: "Somatosensory evoked potentials (SSEPs)",
            detail:
              POST_ARREST_SSEP,
            color: "hsl(220, 65%, 50%)",
          },
          {
            title: "Brain imaging (CT and MRI)",
            detail:
              "CT within 24 h: loss of grey-white differentiation, decreased grey-white ratio (published thresholds vary, roughly 1.10–1.20) and effacement of sulci predict poor outcome. MRI at 2–7 days is more sensitive — restricted diffusion (low ADC) in cortex, basal ganglia, hippocampus and thalamus on DWI is a strong negative prognostic marker. Quantitative ADC mapping is increasingly used in research protocols.",
            color: "hsl(40, 75%, 50%)",
          },
          {
            title: "S100B and emerging biomarkers",
            detail:
              "S100B has lower specificity than NSE. Neurofilament light chain (NfL) shows promising performance — high serum NfL at 24–72 h post-arrest correlates strongly with poor outcome and may discriminate earlier than NSE. Not yet routinely available in UK labs.",
            color: "hsl(310, 55%, 50%)",
          },
        ].map((m) => (
          <div
            key={m.title}
            className="p-3 rounded-lg border border-border bg-card"
            style={{ borderLeftWidth: 4, borderLeftColor: m.color }}
          >
            <p className="text-sm font-semibold text-foreground mb-1">{m.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{m.detail}</p>
          </div>
        ))}
      </div>
      <InlineRef topicId="cardiac-arrest-post-resus" refLabel="RCUK PRC 2025" /><InlineRef topicId="cardiac-arrest-post-resus" refLabel="RCUK PRC 2025 SSEP" />
      <div className="mt-4 space-y-4">
        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <ExpandableEcgCard content={eegTraceContent}>
            {() => <EEGTraceDiagram />}
          </ExpandableEcgCard>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <CerebralMicrodialysisDiagram />
        </div>
      </div>
      </CollapsibleSubsection>
    </ExamSection>

    {/* ─────────── eCPR ─────────── */}
    <ExamSection id="ecpr" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="ECMO-CPR (eCPR)">
      <p className="text-muted-foreground leading-relaxed mb-3">
        eCPR is VA-ECMO initiated <em>during</em> ongoing CPR for refractory
        cardiac arrest. {POST_ARREST_ECPR_TRIALS}<InlineRef topicId="cardiac-arrest-post-resus" refLabel="ARREST 2020" /><InlineRef topicId="cardiac-arrest-post-resus" refLabel="Prague OHCA 2022" /><InlineRef topicId="cardiac-arrest-post-resus" refLabel="INCEPTION 2023" />
      </p>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div className="p-3 rounded-lg border border-border bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">Practical eCPR pathway</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Identify candidate within 5 min of arrest using locally-agreed criteria</li>
            <li>Mechanical CPR (LUCAS / AutoPulse) — frees hands and maintains quality during transport</li>
            <li>Activate ECMO team with simultaneous transport to cath lab / ECMO bay</li>
            <li>Femoral arterial + venous cannulation under ultrasound + fluoroscopy</li>
            <li>Monitor limb perfusion; specialist distal-perfusion planning must not delay initial extracorporeal circulation</li>
            <li>Use locally defined rapid time-to-flow goals; the specialist team determines coronary assessment and cannulation details</li>
          </ul>
        </div>
        <div className="p-3 rounded-lg border border-border bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">Key complications</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li><span className="font-medium text-foreground">Limb ischaemia</span> requires surveillance and prompt specialist distal-perfusion planning; cannula placement should not delay initial restoration of circulation.<InlineRef topicId="cardiac-arrest-post-resus" refLabel="ELSO ECPR 2021" /></li>
            <li><span className="font-medium text-foreground">Harlequin syndrome</span> (north–south, differential hypoxia) — upper body desaturates if native lung fails on VA-ECMO; consider VAV upgrade</li>
            <li><span className="font-medium text-foreground">LV distension</span> from afterload — vent with IABP, Impella, or atrial septostomy if severe</li>
            <li>Bleeding (cannulation, GI, intracranial), thrombosis, oxygenator failure</li>
            <li>Severe HIE despite restored circulation (the dominant outcome driver)</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <div className="bg-card rounded-xl border border-border p-4 md:p-6"><EcprDecisionTreeDiagram /></div>
        <div className="bg-card rounded-xl border border-border p-4 md:p-6"><ECMOCircuitDiagram /></div>
        <div className="bg-card rounded-xl border border-border p-4 md:p-6"><ECMOTroubleshootingDiagram /></div>
      </div>
      </CollapsibleSubsection>
    </ExamSection>

    {/* ─────────── Family / WLST ─────────── */}
    <ExamSection id="ethics" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="Family Communication, WLST & Donation">
      <div className="grid md:grid-cols-2 gap-3">
        <div className="p-3 rounded-lg border border-border bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">Talking to families</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Honest, structured updates daily; one consistent ICU consultant if possible</li>
            <li>Set expectations early: "We won't know neurological outcome for at least 72 h after rewarming."</li>
            <li>Avoid prognostic certainty before formal multimodal assessment</li>
            <li>Document family discussions, named relatives, prior wishes and any advance decisions</li>
          </ul>
        </div>
        <div className="p-3 rounded-lg border border-border bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">Withdrawal of life-sustaining therapy</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>{POST_ARREST_PROGNOSIS}</li>
            <li>Beware self-fulfilling prophecy — early WLST removes the chance to demonstrate recovery</li>
            <li>Engage palliative care; manage symptoms (sedation, opioids, anti-secretory)</li>
          </ul>
        </div>
        <div className="md:col-span-2 p-3 rounded-lg border border-border bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">Organ donation</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Many post-arrest patients become DCD (donation after circulatory death) candidates following WLST. Refer to the Specialist Nurse for Organ Donation (SNOD) <span className="font-medium text-foreground">before</span> WLST is discussed with family. A small subset progress to brain-stem death testing and DBD donation. Post-cardiac-arrest patients can be excellent organ donors despite the index event — early SNOD involvement protects donation potential without changing care pathway.
          </p>
        </div>
      </div>
      </CollapsibleSubsection>
    </ExamSection>

    <ExamPitfallsCallout
      accent="icu"
      pitfalls={[
        `Post-ROSC: after reliable measurement, SpO₂ 94–98% and PaCO₂ ${POST_ARREST_CO2}; individual perfusion support; 12-lead ECG; immediate coronary assessment for ST elevation or strong occlusion suspicion.`,
        "TTM2: hypothermia at 33 °C was not superior to normothermia with early treatment of fever (≥37.8 °C) — death at 6 months 50% vs 48%.",
        "Neuroprognostication is multimodal — clinical (≥72 h), bilateral absent N20 SSEP, suppressed/burst EEG, NSE >60, MRI changes.",
        "eCPR is a selected rescue pathway; local ECMO-team acceptance and rapid flow are required, not universal age or ETCO₂ clearance.",
        "Avoid premature withdrawal in the first 72 h; sedation, hypothermia and metabolic confounders cloud neuro exam.",
        "SNOD referral early — even before brain-stem death testing or withdrawal decisions.",
      ]}
    />

    {/* ─────────── Landmark trial evidence ─────────── */}
    <ExamSection id="trial-evidence" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="Landmark trial evidence">
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full text-xs border border-border bg-card rounded-lg">
            <thead className="bg-muted/40">
              <tr>
                <th className="text-left px-3 py-2 font-semibold text-foreground">Trial (year)</th>
                <th className="text-left px-3 py-2 font-semibold text-foreground">Question</th>
                <th className="text-left px-3 py-2 font-semibold text-foreground">Result</th>
                <th className="text-left px-3 py-2 font-semibold text-foreground">Practice impact</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["HACA (NEJM 2002)", "32–34 °C × 24 h vs standard care after VF OHCA", "Mortality 41% vs 55%; favourable neuro 55% vs 39%", "Established mild hypothermia as standard"],
                ["Bernard (NEJM 2002)", "33 °C × 12 h after VF OHCA", "Good outcome 49% vs 26%", "Confirmed HACA in independent cohort"],
                ["TTM (Nielsen, NEJM 2013)", "33 °C vs 36 °C × 24 h, n = 950", "No difference in mortality (50% vs 48%) or neuro outcome", "Either target acceptable; fever-prevention is what matters"],
                ["TTM2 (Dankiewicz, NEJM 2021)", "33 °C vs normothermia ≤ 37.5 °C (device trigger ≥ 37.8 °C), n = 1 850", "No difference 6-mo mortality (50% vs 48%)", "Fever prevention rather than routine 33 °C; now ≤ 37.5 °C (RCUK 2025)"],
                ["TAME (NEJM 2023)", "Mild hypercapnia 6.7–7.3 kPa vs normocapnia post-arrest", "No difference 6-mo good neuro outcome (43.5% vs 44.6%)", `Continue normocapnia ${POST_ARREST_CO2}`],
                ["EXACT (Bernard, JAMA 2022)", "SpO₂ 90–94% vs 98–100% during pre-hospital post-ROSC", "Survival to discharge 38.3% vs 47.9% (lower with restrictive)", "Avoid hypoxaemia; do not aim ≤ 94% in pre-hospital phase"],
                ["BOX (NEJM 2022)", "MAP 63 vs 77 mmHg AND restrictive vs liberal O₂ post-ROSC", "No difference in death/poor neuro outcome at 90 d", "Current UK SBP > 100 mmHg or MAP > 60–65 mmHg; individualise, not a fixed trial-derived target"],
                ["PARAMEDIC2 (NEJM 2018)", "Adrenaline 1 mg IV vs placebo in OHCA, n = 8 014", "30-d survival 3.2% vs 2.4%; severe disability 31% vs 18% of survivors", "Adrenaline retained but with explicit trade-off"],
                ["DOSE-VF (NEJM 2022)", "Standard vs vector-change vs DSED for refractory VF after 3 shocks", "Survival to discharge: DSED 30.4% vs standard 13.3%", "Trial evidence; RCUK 2025 suggests vector change but does not recommend routine DSED"],
                ["ARREST (Lancet 2020)", "eCPR vs standard ALS in refractory shockable OHCA, n = 30", "Stopped early — 43% vs 7% survival to discharge", "Proof of concept in optimal system"],
                ["Prague OHCA (JAMA 2022)", "Invasive strategy versus standard care, n = 256", "180-day favourable neurological survival 31.5% versus 22.0%, P = 0.09", "Primary endpoint not significant; secondary/subgroup signals exploratory"],
                ["INCEPTION (NEJM 2023)", "Multicentre eCPR versus conventional CPR", "30-day favourable neurological survival 20% versus 16%, not significant", "Does not prove speed or centre volume caused the neutral result"],
                ["COACT (NEJM 2019)", "Immediate vs delayed angiography after shockable OHCA without STEMI", "No 90-d survival difference (64.5% vs 67.2%)", "Defer angiography in stable post-ROSC without STEMI"],
                ["TOMAHAWK (NEJM 2021)", "Immediate vs selective angiography after OHCA without STEMI", "No 30-d mortality difference (54% vs 46%)", "Reinforces selective approach without ST elevation"],
                ["AIRWAYS-2 (JAMA 2018)", "Supraglottic airway vs tracheal intubation in paramedic-led OHCA", "No difference in modified Rankin at 30 d", "SGA acceptable initial airway in OHCA"],
              ].map((r) => (
                <tr key={r[0]} className="border-t border-border align-top">
                  <td className="px-3 py-1.5 font-medium text-foreground whitespace-nowrap">{r[0]}</td>
                  <td className="px-3 py-1.5 text-foreground/85">{r[1]}</td>
                  <td className="px-3 py-1.5 text-foreground/85">{r[2]}</td>
                  <td className="px-3 py-1.5 text-muted-foreground">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSubsection>
    </ExamSection>

    {/* ─────────── FAQ ─────────── */}
    <ExamSection id="faq" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="Frequently asked questions">
        <Accordion type="single" collapsible className="w-full">
          {arrestFaqs.map(([q, a], i) => (
            <AccordionItem key={q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium text-foreground">{q}</AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CollapsibleSubsection>
      <CollapsibleSubsection title="Oxygen Targets After ROSC (BOX)">
        <PostArrestOxygenTeaching />
      </CollapsibleSubsection>
      <CollapsibleSubsection title="Temperature Control: TTM2 in Detail">
        <Ttm2Teaching />
      </CollapsibleSubsection>
    </ExamSection>

    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: arrestFaqs.map(([name, acceptedAnswer]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
        })),
      })}</script>
    </Helmet>
  </>
);



const CardiacArrestPostResusTopic = () => {
  return (
    <TopicTemplate
      title="Cardiac Arrest & Post-Resuscitation Care"
      subtitle="FRCA Final / FFICM / EDIC — TTM, multimodal neuroprognostication & eCPR"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "RCUK PRC 2025", "RCUK PRC Algorithm March 2026",
          "ERC/ESICM 2021 Post-Resus",
          "TTM2 2021",
          "TTM 2013",
          "ARREST 2020",
          "Prague OHCA 2022",
          "INCEPTION 2023",
          "ELSO Guidelines 2020",
          "BJA Educ Neuroprog 2018",
        ],
        keyPoints: [
          "RCUK PRC 2025", "RCUK PRC Algorithm March 2026",
          "ERC/ESICM 2021 Post-Resus",
          "TTM2 2021",
          "TTM 2013",
          "ARREST 2020",
          "Prague OHCA 2022",
          "INCEPTION 2023",
          "ELSO Guidelines 2020",
          "BJA Educ Neuroprog 2018",
        ],
        workedExamples: ["RCUK PRC 2025", "RCUK PRC Algorithm March 2026", "ELSO ECPR 2021", "ERC/ESICM 2021 Post-Resus", "Schmidt 2022 BOX oxygen", "ARREST 2020", "ELSO Guidelines 2020"],
      }}
      coreConcepts={coreConcepts}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="cardiac-arrest-post-resus"
      topicTitle="Cardiac Arrest & Post-Resuscitation Care"
      quizQuestions={cardiacArrestPostResusQuestions}
    />
  );
};

export default CardiacArrestPostResusTopic;
