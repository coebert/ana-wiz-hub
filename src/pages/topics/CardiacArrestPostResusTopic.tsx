import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { WorkedExample } from "@/components/WorkedExamples";
import { cardiacArrestPostResusQuestions } from "@/data/quizzes";
import TopicTableOfContents from "@/components/TopicTableOfContents";
import { ExamSection } from "@/components/ExamSection";
import TtmTargetExplorerDiagram from "@/components/diagrams/TtmTargetExplorerDiagram";
import EcprDecisionTreeDiagram from "@/components/diagrams/EcprDecisionTreeDiagram";
import PostCardiacArrestProgDiagram from "@/components/diagrams/PostCardiacArrestProgDiagram";
import PostCardiacArrestSyndromeDiagram from "@/components/diagrams/PostCardiacArrestSyndromeDiagram";
import EEGTraceDiagram from "@/components/diagrams/EEGTraceDiagram";
import ECMOCircuitDiagram from "@/components/diagrams/ECMOCircuitDiagram";
import ECMOTroubleshootingDiagram from "@/components/diagrams/ECMOTroubleshootingDiagram";
import MultimodalNeuromonitoringDiagram from "@/components/diagrams/MultimodalNeuromonitoringDiagram";
import CerebralMicrodialysisDiagram from "@/components/diagrams/CerebralMicrodialysisDiagram";
import ExpandableEcgCard from "@/components/diagrams/ExpandableEcgCard";
import { eegTraceContent, postArrestProgContent } from "@/components/diagrams/ecgExpandedContent";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    "Use the manufacturer-recommended first biphasic energy (typically 120–200 J). If the manufacturer dose is unknown, default to the maximum available. Subsequent shocks should be of equal or higher energy. The DOSE-VF trial (Cheskes, NEJM 2022) randomised refractory VF after 3 standard shocks to (a) continued standard defibrillation, (b) vector-change (pad reposition anterior-posterior), or (c) double sequential external defibrillation (DSED, two defibrillators delivered ~1 second apart): DSED improved survival to hospital discharge (30.4% vs 13.3%) and survival with good neurological outcome. Vector-change was also superior to standard. UK and ERC guidance now permit vector change or DSED for refractory VF after the third shock where local protocols allow.",
  ],
  [
    "Does adrenaline actually improve outcome — what did PARAMEDIC2 show?",
    "PARAMEDIC2 (Perkins, NEJM 2018, n = 8 014 OHCA) compared 1 mg IV adrenaline every 3–5 minutes with placebo. Adrenaline increased survival to 30 days (3.2% vs 2.4%, OR 1.39) but the absolute increase in survivors with favourable neurological outcome (modified Rankin 0–3) was small (2.2% vs 1.9%) and no different statistically, with a higher proportion of survivors having severe neurological impairment (31% vs 18%). Interpretation: adrenaline improves ROSC and short-term survival but the marginal neurological benefit is debated. UK/ERC guidance retains 1 mg IV after the third shock in shockable rhythms and as soon as access is obtained in non-shockable rhythms, recognising the trade-off and the absence of a superior alternative.",
  ],
  [
    "Should I cool post-arrest patients to 33 °C or aim for active normothermia? What changed after TTM2?",
    "HACA (NEJM 2002) and Bernard (NEJM 2002) first showed benefit of 32–34 °C for 12–24 h after witnessed VF OHCA. TTM (Nielsen, NEJM 2013, n = 950) demonstrated equivalence of 33 °C and 36 °C — both were 'targeted temperature management' and both prevented fever. TTM2 (Dankiewicz, NEJM 2021, n = 1 850) compared 33 °C with active normothermia (≤ 37.5 °C, fever treated aggressively) and found no difference in 6-month mortality (50% vs 48%) or neurological outcome. Contemporary ERC/ESICM 2021 guidance therefore recommends a constant temperature 32–36 °C, with active normothermia ≤ 37.7 °C now the most common pragmatic default; fever (> 37.7 °C) must be prevented for at least 72 hours regardless of strategy. Rewarming should be slow (0.25–0.5 °C / h) when starting from 33 °C.",
  ],
  [
    "Who is an appropriate candidate for eCPR and what does ARREST, Prague OHCA and INCEPTION tell us?",
    "ARREST (Yannopoulos, Lancet 2020, n = 30, single-centre Minnesota) randomised refractory shockable OHCA and was stopped early for benefit — 43% vs 7% survival to discharge with eCPR. Prague OHCA (Belohlavek, JAMA 2022, n = 256) compared invasive (eCPR + cath lab) with standard advanced ALS and showed a non-significant trend to better 180-day favourable neurological outcome (31.5% vs 22.0%); subgroup analysis favoured the invasive strategy with longer arrest durations. INCEPTION (Suverein, NEJM 2023, n = 134) was a multicentre Dutch trial and was neutral — reflecting the impact of system speed and operator volume. Suitable candidates have: witnessed arrest, bystander CPR, initial shockable rhythm, age < 65–75, no major comorbidity, ETCO₂ > 10 mmHg sustained, and a realistic prospect of cannulation within 60 minutes of collapse. Outside high-volume eCPR centres with rapid pathways, benefit is unlikely.",
  ],
  [
    "What is multimodal neuroprognostication and when do I perform it?",
    "Neuroprognostication is performed in the comatose post-cardiac-arrest patient at ≥ 72 hours after ROSC, only once confounders (sedation, NMBA, hypothermia, severe metabolic derangement, hypoglycaemia, hypotension, ongoing seizure activity) are excluded. The entry criterion is GCS motor ≤ 2. ERC/ESICM 2021 require at least two concordant poor-outcome markers from independent modalities before predicting poor outcome: (1) bilaterally absent pupillary AND corneal reflexes (or NPi < 2 on automated pupillometry); (2) bilaterally absent N20 cortical SSEPs; (3) NSE > 60 µg/L at 48 h or > 75 µg/L at 72 h, or a rising trend; (4) highly malignant EEG (suppression < 10 µV, or unreactive burst-suppression); (5) diffuse anoxic injury on CT (loss of grey-white differentiation, GWR < 1.10) or MRI (widespread restricted diffusion). Status myoclonus alone is not sufficient. Withdrawal of life-sustaining therapy in the first 72 hours risks self-fulfilling prophecy.",
  ],
  [
    "How should I manage the airway and ventilator in the first 6 hours post-ROSC?",
    "Intubate if not already (or replace a supraglottic with a tracheal tube once stable). Set tidal volume 6–8 mL/kg predicted body weight, PEEP 5–10 cmH₂O, FiO₂ titrated to SpO₂ 94–98% (avoid hyperoxia — observational data link PaO₂ > 40 kPa to higher mortality; the EXACT pilot RCT supports normoxic targeting). Set minute ventilation to PaCO₂ 4.5–6.0 kPa (avoid hypocapnia which causes cerebral vasoconstriction and is independently associated with worse neurological outcome — TAME trial 2023 found no benefit from mild hypercapnia 6.7–7.3 kPa over normocapnia). Use continuous waveform capnography. Sedate with short-acting agents (propofol + remifentanil or fentanyl ± dexmedetomidine) to facilitate later neuroprognostication. Avoid prolonged NMBA except briefly for shivering not controlled by sedation and counter-warming.",
  ],
];


const tocItems = [
  { id: "overview", label: "Overview & chain of survival", group: "Background" },
  { id: "rosc-bundle", label: "Post-ROSC care bundle", group: "Acute" },
  { id: "ttm", label: "Targeted temperature management", group: "Acute" },
  { id: "haemodynamics", label: "Haemodynamics & ventilation", group: "Acute" },
  { id: "neuroprog", label: "Neuroprognostication", group: "Recovery" },
  { id: "modalities", label: "Modality deep-dive", group: "Recovery" },
  { id: "ecpr", label: "ECMO-CPR (eCPR)", group: "Advanced" },
  { id: "ecmo-circuit", label: "VA-ECMO circuit & troubleshooting", group: "Advanced" },
  { id: "ethics", label: "Family, ethics & WLST", group: "Recovery" },
];

const objectives = [
  "Deliver the ERC/ESICM 2021 post-ROSC bundle including airway, ventilation, haemodynamic and metabolic targets within the first 6 hours.",
  "Choose between TTM 33 °C, 36 °C and normothermia ≤ 37.7 °C citing TTM2 (2021) and apply strict fever control to 72 hours.",
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
      "Hyperoxia (PaO₂ 38 kPa) is associated with worse outcome — wean FiO₂ to target SpO₂ 94–98 %. Hypocapnia (PaCO₂ 3.4 kPa) causes cerebral vasoconstriction — reduce minute ventilation to target 4.5–6.0 kPa. Tidal volume 550 mL = 7.9 mL/kg PBW — acceptable but trim to 6–8 mL/kg. MAP 60 is below the ≥ 65 mmHg target — uptitrate noradrenaline.",
    answer:
      "Wean FiO₂ for SpO₂ 94–98 %, reduce RR for PaCO₂ 4.5–6.0 kPa, TV ~ 480 mL (6.8 mL/kg PBW), increase noradrenaline to MAP ≥ 65 mmHg, then start active normothermia ≤ 37.7 °C and book early coronary angiography.",
    cites: ["INCEPTION 2023"],
  },
  {
    title: "Multimodal neuroprognostication at 72 h",
    scenario:
      "Day 4 post-OHCA, fully rewarmed, off sedation for 36 h. GCS E1 VT M2. Pupils fixed bilaterally, corneals absent, NPi 0. NSE 88 µg/L at 72 h (rising from 62 at 48 h). Continuous EEG: burst-suppression unreactive. SSEPs: bilaterally absent N20.",
    working:
      "Confounders excluded (rewarmed, sedation washed out, no metabolic derangement, no status epilepticus). Apply ERC/ESICM 2021 algorithm — entry criterion (GCS M ≤ 2) met. Look for ≥ 2 concordant poor-outcome markers from independent modalities: (1) bilaterally absent pupillary + corneal reflexes, (2) NSE > 75 at 72 h with rising trend, (3) highly malignant unreactive burst-suppression EEG, (4) bilaterally absent N20 SSEPs.",
    answer:
      "Four concordant poor-outcome markers across clinical, biochemical, electrophysiological and SSEP modalities — poor neurological outcome can be predicted with high specificity. Discuss WLST with family, refer to SNOD before withdrawal for potential DCD donation.",
    cites: ["Prague OHCA 2022"],
  },
  {
    title: "eCPR candidate selection",
    scenario:
      "42-year-old collapses in front of bystander, immediate CPR. EMS arrive at 6 min — VF, 3 shocks, mechanical CPR (LUCAS) commenced. ETCO₂ 22 mmHg. No ROSC at 25 min. Initial rhythm shockable, no significant comorbidities, transport time to ECMO centre 15 min.",
    working:
      "ARREST/Prague OHCA criteria favouring eCPR: witnessed arrest, bystander CPR, initial shockable rhythm, age < 65–70, ETCO₂ > 10 mmHg (sign of effective CPR), low-flow time projected < 60 min at cannulation, no major comorbidity. All criteria met. INCEPTION reminds us system speed matters — must reach cannulation within ~ 60 min.",
    answer:
      "Suitable eCPR candidate. Activate ECMO team, continue mechanical CPR, transport directly to ECMO bay/cath lab, target femoral VA cannulation within 60 min of arrest, then immediate coronary angiography after stable flow. Insert distal limb perfusion catheter at the time of cannulation.",
    cites: ["ARREST 2020"],
  },
  {
    title: "Harlequin (north–south) syndrome on VA-ECMO",
    scenario:
      "Day 2 femoro-femoral VA-ECMO post eCPR. ECMO flow 4.5 L/min, post-oxygenator PaO₂ 55 kPa. Right radial ABG: PaO₂ 7.1 kPa, SpO₂ 86 %. Femoral ABG: PaO₂ 32 kPa. Pulmonary oedema on CXR, low LV ejection fraction.",
    working:
      "Differential hypoxia: well-oxygenated retrograde ECMO blood meets poorly oxygenated antegrade native cardiac output in the aortic arch. The 'mixing point' has shifted distal to the great vessels because native LV ejection (with diseased lungs) has improved while the lungs cannot oxygenate. Upper body (cerebral, coronary) perfused by hypoxic native blood.",
    answer:
      "Optimise native lung function first (recruit, increase PEEP/FiO₂, diuresis). If persistent, convert to VAV-ECMO by adding an internal jugular return cannula to oxygenate the upper body, or move to central VA-ECMO. Monitor right radial saturation continuously as the early warning.",
    cites: ["TTM 2013"],
  },
];

const keyPoints = [
  { text: "Post-cardiac-arrest syndrome = brain injury + myocardial dysfunction + ischaemia–reperfusion + precipitating pathology — treat all four.", cites: ["TTM2 2021"] },
  { text: "Avoid hyperoxia and hypocapnia: target SpO₂ 94–98 %, PaCO₂ 4.5–6.0 kPa, MAP ≥ 65 mmHg, glucose 7.8–10 mmol/L.", cites: ["ERC/ESICM 2021 Post-Resus"] },
  { text: "TTM2 (2021): normothermia ≤ 37.7 °C is the contemporary default; whichever target chosen, deliver strict fever control to ≥ 72 h with closed-loop feedback cooling.", cites: ["BJA Educ Neuroprog 2018"] },
  { text: "Rewarm slowly (0.25–0.5 °C/h) — watch for hyperkalaemic rebound and prolonged drug clearance during cooling.", cites: ["ELSO Guidelines 2020"] },
  { text: "Neuroprognostication is multimodal, performed ≥ 72 h after ROSC, after confounders are excluded, and requires ≥ 2 concordant poor-outcome markers.", cites: ["INCEPTION 2023"] },
  { text: "Specific markers: bilaterally absent pupil + corneal reflexes, bilaterally absent N20 SSEPs, NSE > 60 (48 h) / > 75 (72 h) µg/L or rising, highly malignant unreactive EEG, loss of grey-white differentiation on CT or restricted diffusion on MRI.", cites: ["Prague OHCA 2022"] },
  { text: "eCPR: ARREST and Prague OHCA show benefit only in highly selected witnessed shockable arrests with rapid cannulation (< 60 min); INCEPTION emphasises system speed.", cites: ["ARREST 2020"] },
  { text: "VA-ECMO: anticipate limb ischaemia (distal perfusion cannula), Harlequin syndrome (right radial sat monitoring → consider VAV), LV distension (vent with IABP/Impella).", cites: ["TTM 2013"] },
  { text: "Avoid the self-fulfilling prophecy — do not withdraw before multimodal assessment is complete.", cites: ["TTM2 2021"] },
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
        doubles the rate of intact neurological survival.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {[
          { label: "OHCA survival to discharge", value: "8–10 %", note: "UK national OHCA registry" },
          { label: "Survival with good neuro outcome", value: "~6–7 %", note: "CPC 1–2 at discharge" },
          { label: "IHCA survival to discharge", value: "~24 %", note: "Higher witnessed/monitored proportion" },
          { label: "eCPR survival (selected)", value: "30–43 %", note: "ARREST 2020, Prague OHCA 2022" },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-lg border border-border bg-card">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{s.label}</p>
            <p className="text-xl font-serif font-bold text-foreground mt-0.5">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.note}</p>
          </div>
        ))}
      </div>
      </CollapsibleSubsection>
    </ExamSection>

    <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
      <PostCardiacArrestSyndromeDiagram />
    </ExamSection>

    {/* ─────────── Post-ROSC bundle ─────────── */}
    <ExamSection id="rosc-bundle" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="The Post-ROSC Bundle (ERC/ESICM 2021)">
      <p className="text-muted-foreground leading-relaxed mb-3">
        Within the first 6 h after ROSC, deliver a structured bundle in
        parallel: airway and ventilation, haemodynamics, coronary reperfusion,
        temperature control, glycaemic control, and family communication.
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        {[
          {
            title: "Airway & ventilation",
            items: [
              "Sedate, intubate (if not already), lung-protective tidal volume 6–8 mL/kg PBW",
              "Target SpO₂ 94–98 % (avoid hyperoxia — increased mortality in observational studies)",
              "Target PaCO₂ 4.5–6.0 kPa (avoid hypocapnia — cerebral vasoconstriction)",
              "Capnography mandatory; ETCO₂ rise often heralds ROSC and falls warn of arrest recurrence",
            ],
          },
          {
            title: "Coronary reperfusion",
            items: [
              "Immediate angiography ± PCI for STEMI or new LBBB",
              "Strong consider in any ROSC patient with suspected coronary cause, even if comatose",
              "COACT (2019) showed no benefit of immediate PCI in shockable arrest without STEMI — selectivity matters",
            ],
          },
          {
            title: "Haemodynamics",
            items: [
              "MAP target 65–80 mmHg (some evidence higher MAP improves cerebral oxygenation in selected patients)",
              "Avoid persistent hypotension — every minute below MAP 65 increases poor outcome",
              "Echocardiogram early — myocardial stunning is common, often resolves by 48–72 h",
              "Vasopressors as needed; consider mechanical support (IABP, Impella, VA-ECMO) for cardiogenic shock",
            ],
          },
          {
            title: "Metabolic & glycaemic",
            items: [
              "Glucose 7.8–10.0 mmol/L (no benefit from tight control, harm from hypoglycaemia)",
              "Replace K⁺ to ≥ 4.0 mmol/L, Mg²⁺ ≥ 1.0 mmol/L",
              "Lactate clearance is a useful surrogate for tissue perfusion",
              "Avoid steroids routinely (no outcome benefit unless adrenal failure)",
            ],
          },
          {
            title: "Temperature control",
            items: [
              "Targeted temperature management (TTM) for at least 24 h within first 6 h of ROSC",
              "Normothermia ≤ 37.7 °C is the contemporary default (TTM2 2021)",
              "Strict fever control to ≥ 72 h post-ROSC regardless of strategy chosen",
              "Active cooling device + core temperature feedback (oesophageal/bladder/intravascular)",
            ],
          },
          {
            title: "Seizure & neuro monitoring",
            items: [
              "EEG within 24 h if comatose — early seizure detection & treatment",
              "Treat status epilepticus aggressively (levetiracetam, valproate, sodium channel blockers)",
              "Avoid prophylactic anticonvulsants (no outcome benefit)",
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
      </CollapsibleSubsection>
    </ExamSection>

    {/* ─────────── TTM ─────────── */}
    <ExamSection id="ttm" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <CollapsibleSubsection title="Targeted Temperature Management">
      <p className="text-muted-foreground leading-relaxed mb-3">
        TTM aims to <span className="font-medium text-foreground">prevent secondary brain injury</span> from
        ischaemia–reperfusion and to <span className="font-medium text-foreground">avoid pyrexia</span>, which
        independently worsens outcome. Choose a target (33 °C, 36 °C or
        normothermia ≤ 37.7 °C), induce within 6 h, hold for 24 h,
        rewarm at <span className="font-medium text-foreground">0.25–0.5 °C/h</span>, then maintain
        <span className="font-medium text-foreground"> strict fever control to 72 h post-ROSC</span>.
      </p>

      <TtmTargetExplorerDiagram />

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div className="p-3 rounded-lg border border-border bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">How to deliver TTM</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Surface (Arctic Sun) or intravascular (Thermogard / Coolgard) device with closed-loop temperature feedback</li>
            <li>Sedation: propofol + fentanyl ± dexmedetomidine. Bolus or infuse a short-acting NMBA (rocuronium / cisatracurium) only if shivering uncontrolled by sedation + magnesium / counter-warming</li>
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
            <li>Shivering increases CMR — manage stepwise: warm hands/face, magnesium, sedation, then NMBA</li>
          </ul>
        </div>
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
              ["MAP", "≥ 65 mmHg (consider 80–100 in selected)", "Maintain cerebral perfusion. MAP-COOL, NEUROPROTECT trials suggest higher MAP improves rSO₂."],
              ["SpO₂", "94–98 %", "Avoid hyperoxia (free-radical injury) and hypoxia."],
              ["PaCO₂", "4.5–6.0 kPa (35–45 mmHg)", "Hypocapnia → cerebral vasoconstriction; hypercapnia → ↑ICP."],
              ["Tidal volume", "6–8 mL/kg PBW", "Lung-protective; reduces VILI."],
              ["Glucose", "7.8–10 mmol/L", "Avoid hypo and severe hyper-glycaemia."],
              ["Hb", "≥ 70 g/L (≥ 90 if cardiogenic shock)", "Maintain DO₂ to vulnerable brain."],
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
        GCS motor ≤ 2 after exclusion of confounders. Two or more
        concordant poor-prognosis markers from independent modalities are
        required before consideration of withdrawal of life-sustaining
        therapy.
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
              "Bilateral absent pupillary light reflex AND absent corneal reflex at ≥ 72 h is the single most specific bedside sign of poor outcome (FPR ~ 1 %). Quantitative pupillometry (NPi < 2) is more reproducible than manual examination. GCS Motor 1–2 at 72 h is the trigger for formal multimodal assessment, but is NOT sufficient on its own. Status myoclonus within 72 h is concerning but does not equal status epilepticus.",
            color: "hsl(0, 75%, 55%)",
          },
          {
            title: "Neuron-specific enolase (NSE)",
            detail:
              "Serum NSE at 48–72 h. NSE > 60 µg/L at 48 h or > 75 µg/L at 72 h, OR a rising trend, predicts poor outcome (FPR < 5 %). Confounders: haemolysis (RBC contain NSE — recheck if rising in isolation), neuroendocrine tumours. Trend matters more than a single value. Take samples in non-haemolysed serum; many labs report NSE alongside S100B.",
            color: "hsl(170, 60%, 40%)",
          },
          {
            title: "Electroencephalography (EEG)",
            detail:
              "Continuous EEG within 24 h if available; targeted EEG ≥ 72 h. Highly malignant patterns (suppression < 10 µV background, burst-suppression with or without superimposed discharges) at ≥ 72 h predict poor outcome. Reactivity testing is essential — a reactive background is reassuring even in the comatose patient. Confounders: sedation, hypothermia, metabolic derangement.",
            color: "hsl(270, 65%, 55%)",
          },
          {
            title: "Somatosensory evoked potentials (SSEPs)",
            detail:
              "Bilaterally absent N20 cortical responses to median nerve stimulation at ≥ 72 h is one of the most specific markers of poor outcome (FPR ~ 0–1 %). Less affected by sedation and hypothermia than EEG. Operator-dependent; requires technical expertise. Best performed off muscle relaxant. A present N20 does not predict good outcome — it just removes one piece of bad evidence.",
            color: "hsl(220, 65%, 50%)",
          },
          {
            title: "Brain imaging (CT and MRI)",
            detail:
              "CT within 24 h: loss of grey-white differentiation, decreased grey-white ratio (GWR < 1.10–1.20) and effacement of sulci predict poor outcome. MRI at 2–7 days is more sensitive — restricted diffusion (low ADC) in cortex, basal ganglia, hippocampus and thalamus on DWI is a strong negative prognostic marker. Quantitative ADC mapping is increasingly used in research protocols.",
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
        cardiac arrest. ARREST (2020) and Prague OHCA (2022) demonstrated
        survival benefit in highly selected patients with witnessed
        shockable rhythms; INCEPTION (2023) was neutral, reflecting the
        critical importance of patient selection, system speed, and
        experienced operators. Outside high-volume centres with rapid
        cannulation pathways the marginal benefit shrinks rapidly.
      </p>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div className="p-3 rounded-lg border border-border bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">Practical eCPR pathway</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Identify candidate within 5 min of arrest using locally-agreed criteria</li>
            <li>Mechanical CPR (LUCAS / AutoPulse) — frees hands and maintains quality during transport</li>
            <li>Activate ECMO team with simultaneous transport to cath lab / ECMO bay</li>
            <li>Femoral arterial + venous cannulation under ultrasound + fluoroscopy</li>
            <li>Distal limb perfusion catheter to prevent leg ischaemia</li>
            <li>Aim for cannulation within 60 min of arrest; coronary angiography immediately after stable flow</li>
          </ul>
        </div>
        <div className="p-3 rounded-lg border border-border bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">Key complications</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li><span className="font-medium text-foreground">Limb ischaemia</span> from arterial cannulation — distal perfusion cannula is mandatory</li>
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
            <li>Only after multimodal neuroprognostication ≥ 72 h with two concordant poor-outcome markers</li>
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
        "Post-ROSC bundle: PaCO₂ 4.5–6.0 kPa, SpO₂ 94–98%, MAP ≥65, 12-lead ECG, urgent PCI if STEMI.",
        "TTM2: targeted normothermia (≤37.5 °C) non-inferior to 33 °C — prevent fever for 72 h.",
        "Neuroprognostication is multimodal — clinical (≥72 h), bilateral absent N20 SSEP, suppressed/burst EEG, NSE >60, MRI changes.",
        "eCPR: witnessed arrest, shockable rhythm, low-flow <60 min, no irreversible cause — only in selected centres.",
        "Avoid premature withdrawal in the first 72 h; sedation, hypothermia and metabolic confounders cloud neuro exam.",
        "SNOD referral early — even before brain-stem death testing or withdrawal decisions.",
      ]}
    />
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
          "ERC/ESICM 2021 Post-Resus",
          "TTM2 2021",
          "TTM 2013",
          "ARREST 2020",
          "Prague OHCA 2022",
          "INCEPTION 2023",
          "ELSO Guidelines 2020",
          "BJA Educ Neuroprog 2018",
        ],
        workedExamples: ["INCEPTION 2023", "Prague OHCA 2022", "ARREST 2020", "TTM 2013"],
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
