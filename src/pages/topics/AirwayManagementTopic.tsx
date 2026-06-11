import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WorkedExample } from "@/components/WorkedExamples";
import { AirwayDevicesDiagram } from "@/components/diagrams/AirwayDevicesDiagram";
import { BreathingCircuitDiagram } from "@/components/diagrams/BreathingCircuitDiagram";
import DASAlgorithmDiagram from "@/components/diagrams/DASAlgorithmDiagram";
import AirwayAssessmentDiagram from "@/components/diagrams/AirwayAssessmentDiagram";
import CormackLehaneDiagram from "@/components/diagrams/CormackLehaneDiagram";
import MallampatiDiagram from "@/components/diagrams/MallampatiDiagram";
import WilsonRiskScoreCalculator from "@/components/diagrams/WilsonRiskScoreCalculator";
import AirwayInnervationDiagram from "@/components/diagrams/AirwayInnervationDiagram";
import { CICODrillAnimation } from "@/components/diagrams/CICODrillAnimation";
import PartialAirwayObstructionDiagram from "@/components/diagrams/PartialAirwayObstructionDiagram";
import BonfilsDeviceDiagram from "@/components/diagrams/BonfilsDeviceDiagram";
import bonfilsRetromolarIllustration from "@/assets/airway/bonfils-retromolar.jpg";
import { airwayManagementQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import CorPictumFolio from "@/components/diagrams/CorPictumFolio";
import { airwayFolio } from "@/components/diagrams/anatomyFolios";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { Link } from "react-router-dom";

import { TopicTableOfContents } from "@/components/TopicTableOfContents";

const tocItems = [
  { id: "section-introduction", label: "Introduction", group: "Core" },
  { id: "section-pre-operative-airway-assessment", label: "Pre-op Assessment", group: "Assessment" },
  { id: "section-airway-equipment", label: "Airway Equipment", group: "Equipment" },
  { id: "section-das-2015-algorithm-four-sequential-plans", label: "DAS 2015 Algorithm", group: "Algorithms" },
  { id: "section-awake-fibreoptic-intubation", label: "Awake Fibreoptic", group: "Techniques" },
  { id: "section-front-of-neck-access-fona", label: "Front-of-neck Access (FONA)", group: "Techniques" },
  { id: "section-partial-airway-obstruction-level-specific-management", label: "Partial Obstruction", group: "Clinical" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const objectives = [

  "Describe a structured airway assessment (LEMON, Mallampati, Wilson) and list red-flag predictors of difficulty.",
  "Apply the DAS 2015 unanticipated difficult intubation algorithm: Plans A → B → C → D with maximum attempts at each step.",
  "Compare 1st vs 2nd-generation supraglottic airways, ETT cuffs, and videolaryngoscopes for routine and rescue ventilation.",
  "Outline awake fibreoptic intubation: indications, sensory innervation of the airway, and topicalisation strategy.",
  "Recognise CICO early and perform scalpel-bougie-tube cricothyroidotomy per DAS guidance.",
];

// SEO-targeted FAQ — answers the highest-volume UK question keywords from
// Semrush in the airway cluster: rapid sequence induction (880/mo, KDI 32)
// + DAS / difficult airway algorithm (110 + 480/mo, KDI 25).
const airwayFaqs: Array<[string, string]> = [
  [
    "What is a rapid sequence induction (RSI)?",
    "Rapid sequence induction is an intubation technique used when there is a high risk of pulmonary aspiration (full stomach, bowel obstruction, pregnancy ≥ 16 weeks, severe reflux, trauma, emergency surgery). The patient is pre-oxygenated to an end-tidal O₂ ≥ 0.9, then receives a pre-determined induction agent (propofol 1.5–2.5 mg/kg or ketamine 1–2 mg/kg) immediately followed by a fast-acting neuromuscular blocker (suxamethonium 1–1.5 mg/kg or rocuronium 1.2 mg/kg) without intervening bag-mask ventilation. Tracheal intubation is performed as soon as relaxation is achieved.",
  ],
  [
    "How do you perform a rapid sequence induction step-by-step?",
    "1. WHO checklist, IV access, monitoring, suction, tilting trolley. 2. Pre-oxygenate 3 min with FiO₂ 1.0 to FetO₂ ≥ 0.9 (or 8 vital-capacity breaths). 3. Position: ramped/sniffing. 4. Apnoeic oxygenation 15 L/min nasal cannulae (THRIVE). 5. Pre-determined induction dose + neuromuscular blocker — no test dose, no bag-mask. 6. Consider cricoid pressure (10 N awake → 30 N once asleep) — release if view is poor or ventilation difficult. 7. Intubate, confirm with capnography (sustained ≥ 2 waveforms). 8. Inflate cuff, secure tube, ventilate. 9. Have a Plan B (videolaryngoscope) and Plan D (FONA) ready before induction.",
  ],
  [
    "Is cricoid pressure still recommended in RSI?",
    "Cricoid pressure remains part of the DAS / RCoA RSI bundle but its evidence base is weak. The 2018 IRIS trial (3472 patients) showed non-inferiority of sham vs cricoid for aspiration but did not establish equivalence and was underpowered. Current UK practice: apply 10 N awake increasing to 30 N when consciousness is lost, and release immediately if it impairs laryngoscopic view, mask ventilation or supraglottic airway placement. It is not a substitute for fasting or for skilled intubation.",
  ],
  [
    "What is the DAS unanticipated difficult intubation algorithm?",
    "The Difficult Airway Society (DAS) 2015 algorithm has four sequential plans: Plan A — tracheal intubation (maximum 3 + 1 attempts, change something each time: blade, operator, position, bougie, videolaryngoscope). Plan B — supraglottic airway (preferably 2nd-generation i-gel or LMA Supreme, maximum 3 attempts). Plan C — face-mask ventilation, two-person two-handed technique, full relaxation; wake the patient if oxygenation restored. Plan D — emergency front-of-neck access (scalpel-bougie-tube cricothyroidotomy) — declared CICO and performed before SpO₂ < 80 %.",
  ],
  [
    "How do you predict a difficult airway?",
    "Combine bedside tests rather than relying on one: Mallampati class III–IV (poor specificity alone), thyromental distance < 6.5 cm, mouth opening < 3 cm, restricted neck extension < 35°, prominent upper incisors, beard, obesity (BMI > 30), short thick neck, history of obstructive sleep apnoea or previous difficult intubation. Composite scores (Wilson, LEMON, El-Ganzouri) outperform individual tests but no tool reliably predicts CICO. NAP4 emphasised always planning for failure regardless of predictors.",
  ],
  [
    "When is awake fibreoptic intubation (AFOI) indicated?",
    "AFOI is the gold standard for the anticipated difficult airway when there is time, consent and a co-operative patient: known difficult intubation/ventilation, unstable cervical spine, severe airway pathology (e.g. supraglottic tumour, Ludwig's angina), morbid obesity with airway concerns, predicted difficult mask ventilation. Topicalise V₁/V₂ (nasal), IX (oropharynx), internal SLN and recurrent laryngeal (larynx/trachea) with 4% lidocaine spray-as-you-go, keep total lidocaine ≤ 9 mg/kg lean weight, sedate cautiously with remifentanil or dexmedetomidine.",
  ],
  [
    "What is CICO and when should front-of-neck access be performed?",
    "CICO = Can't Intubate, Can't Oxygenate: failed Plans A, B and C with falling SpO₂. Declare CICO out loud, stop further attempts, summon help and proceed to scalpel-bougie-tube cricothyroidotomy before SpO₂ falls below 80%. Technique: extend neck, palpate cricothyroid membrane, transverse stab with size 10 scalpel, rotate blade caudally, railroad a Frova/bougie, advance a 6.0 cuffed tube 2–3 cm, confirm with capnography. Needle cricothyroidotomy failed in > 60% of NAP4 emergencies and is no longer first-line.",
  ],
  [
    "What's the difference between RSI and a modified RSI?",
    "Classic RSI: pre-oxygenation, no bag-mask ventilation, cricoid pressure, suxamethonium 1.5 mg/kg. Modified RSI is widely practised but not standardised — typically includes gentle bag-mask ventilation between induction and intubation (peak ≤ 12 cmH₂O to avoid gastric insufflation), opioid co-induction (fentanyl 1–3 µg/kg) to blunt the pressor response, rocuronium 1.2 mg/kg instead of suxamethonium, and optional omission or release of cricoid pressure. It trades the dogma of the original technique for reduced hypoxaemia and haemodynamic stability in sick patients.",
  ],
  [
    "What are the key NAP4 lessons for airway management?",
    "NAP4 (2011) audited every major UK airway complication for a year: (1) Failure to plan and failure to plan for failure was the single commonest cause. (2) Persistence with failing techniques (especially repeated laryngoscopy) caused harm. (3) Aspiration was the commonest cause of airway-related death. (4) Supraglottic airway misuse in inappropriate patients led to events. (5) Emergency cricothyroidotomy was frequently delayed, performed badly, and the needle technique frequently failed. (6) ICU airway events had a far higher mortality than theatre events.",
  ],
  [
    "How long can you safely be apnoeic after pre-oxygenation?",
    "After 3 min of pre-oxygenation to FetO₂ ≥ 0.9, a fit non-obese adult tolerates ~8–10 min before SpO₂ falls below 90%. This shortens dramatically in obesity (3–4 min at BMI 40), pregnancy (2–3 min at term), sepsis, anaemia and small children (< 2 min in neonates). Apnoeic oxygenation with high-flow nasal cannulae (THRIVE, 70 L/min) or low-flow nasal cannulae (15 L/min) extends safe apnoea by passive diffusion of O₂ but does not clear CO₂ — PaCO₂ rises by 3–4 mmHg/min.",
  ],
];

const workedExamples: WorkedExample[] = [
  {
    title: "Unanticipated CICO at induction",
    scenario: (
      <>
        A 58-year-old man for elective laparotomy is induced with propofol and{" "}
        <Link to="/pharmacology/muscle-relaxants" className="text-pharmacology underline">rocuronium</Link>.
        Direct laryngoscopy shows Cormack–Lehane IV. Two further attempts (CMAC, repositioning) fail.
        An i-gel is inserted but inadequate ventilation (PEEP 15, SpO₂ 86 % falling). What do you do
        next, and at what SpO₂ should FONA be performed?
      </>
    ),
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Plan A failed (3 attempts max).</strong> Move on — repeat attempts cause oedema and worsen the situation.</li>
          <li><strong>Plan B has failed</strong> (SAD inserted, oxygenation inadequate after 3 attempts).</li>
          <li><strong>Plan C: facemask ventilation</strong> with two-person technique, full muscle relaxation maintained. If oxygenation restored → wake and reassess. Here it has also failed.</li>
          <li><strong>Declare CICO out loud.</strong> Call for help, theatre stops, prepare scalpel, bougie, 6.0 cuffed ETT.</li>
          <li><strong>Perform FONA before SpO₂ &lt; 80 %.</strong> Don't wait for arrest. Hypoxic brain injury occurs within minutes once SaO₂ &lt; 60 %.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Repeating Plan A &gt; 3 times — NAP4 highlighted persistence with laryngoscopy as a recurrent failure mode.</li>
            <li>Reversing rocuronium with sugammadex during CICO: DAS now advises <strong>not</strong> to wake during CICO — proceed to FONA.</li>
            <li>Substituting needle cricothyroidotomy for scalpel technique: NAP4 showed needle techniques fail in &gt; 60 % of emergencies.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Declare CICO at the failure of Plan C (or earlier if oxygenation is critical), and perform scalpel-bougie-tube cricothyroidotomy before SpO₂ < 80 %. Do not delay for further attempts at SAD or facemask ventilation.",
   cites: ["DAS 2015"],
  },
  {
    title: "Awake fibreoptic intubation in a known difficult airway",
    scenario:
      "A 62-year-old with previous radical neck dissection, mouth opening 1.5 cm and fixed flexion deformity is listed for shoulder surgery. You plan AFOI. Which nerves must be blocked, and what is your topicalisation sequence?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Sensory map.</strong> Nasal cavity → V₁/V₂. Oropharynx and posterior tongue → glossopharyngeal (IX). Vallecula and base of tongue → internal branch of superior laryngeal (X). Below cords / trachea → recurrent laryngeal (X).</li>
          <li><strong>Nasal preparation.</strong> Co-phenylcaine spray (lidocaine + phenylephrine) for vasoconstriction and mucosal anaesthesia.</li>
          <li><strong>Pharyngeal block.</strong> 4 % lidocaine spray to oropharynx; lidocaine lozenges or gargle for IX.</li>
          <li><strong>SLN block.</strong> Bilateral injection just inferior to greater cornu of hyoid, or atomised lidocaine to vallecula.</li>
          <li><strong>Tracheal anaesthesia.</strong> "Spray-as-you-go" via the working channel of the scope, OR transtracheal injection through cricothyroid membrane.</li>
          <li><strong>Sedation.</strong> Remifentanil TCI (0.5–2 ng/mL) or dexmedetomidine — preserve airway reflexes and cooperation.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Exceeding the lidocaine maximum: 9 mg/kg topical airway lidocaine is a pragmatic ceiling — toxicity is reduced but real.</li>
            <li>Over-sedating with propofol — loss of airway tone and reflexes converts a controlled AFOI into a CICO.</li>
            <li>Skipping antisialogogue (glycopyrrolate 200 µg IV/IM, 30 min before) — secretions degrade fibreoptic view.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Block V₁/V₂ (nasal), IX (oropharynx), internal SLN (vallecula), and recurrent laryngeal (trachea) using stepwise topicalisation — co-phenylcaine, 4 % lidocaine spray, atomised vallecular lidocaine, and spray-as-you-go below the cords. Sedate lightly with remifentanil/dexmedetomidine and pre-treat with glycopyrrolate.",
   cites: ["NAP4 2011"],
  },
];

const AirwayManagementTopic = () => {
  return (
    <TopicTemplate
      title="Airway Management"
      subtitle="FRCA Final / FFICM — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="airway-management"
      quizQuestions={airwayManagementQuestions}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CL_BK_03", "IC_BK_03"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CL_BK_03"] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CL_BK_03"] },
      }}
      sectionSources={{
        objectives: ["DAS 2015", "NAP4 2011"],
        workedExamples: ["DAS 2015", "NAP4 2011"],
        keyPoints: ["DAS 2015", "NAP4 2011", "BJA Educ 2017"],
      }}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />
          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CL_BK_03"]}>

            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-foreground/90 leading-relaxed">
              Airway management is the cornerstone of safe anaesthetic and critical care practice. The Difficult Airway
              Society (DAS) algorithms standardise the approach to anticipated and unanticipated difficulty, supported by
              structured assessment tools and a hierarchy of rescue techniques culminating in front-of-neck access.
            </p>
            <div className="mt-4">
              <CorPictumFolio {...airwayFolio} suppressOverlayLabels />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CL_BK_03"]}>
            <CollapsibleSubsection title="Pre-operative airway assessment">
            <p className="text-foreground/90 leading-relaxed">
              Systematic assessment is performed before every anaesthetic. No single test reliably predicts difficulty —
              composite scores (Wilson, El-Ganzouri) outperform single bedside tests. Document Mallampati, thyromental
              distance, mouth opening, neck movement, dentition, and previous airway records. Ultrasound of the cricothyroid
            </p>
            <div className="mt-4 space-y-4">
              <div className="bg-card rounded-xl border border-border p-6"><AirwayAssessmentDiagram /></div>
              <div className="bg-card rounded-xl border border-border p-6"><MallampatiDiagram /></div>
              <div className="bg-card rounded-xl border border-border p-6"><CormackLehaneDiagram /></div>
              <div className="bg-card rounded-xl border border-border p-6"><WilsonRiskScoreCalculator /></div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CL_BK_03"]}>
            <CollapsibleSubsection title="Airway equipment">
            <p className="text-foreground/90 leading-relaxed">
              Modern practice favours <strong>2nd-generation supraglottic airways</strong> (i-gel, ProSeal LMA) with gastric
              drain ports and seal pressures of 25–35 cmH₂O. Videolaryngoscopy (Macintosh-blade or hyperangulated) is now
              recommended as default in patients with predicted difficulty, with Cochrane evidence supporting reduced failed
            </p>
            <div className="mt-4 space-y-4">
              <div className="bg-card rounded-xl border border-border p-6"><AirwayDevicesDiagram /></div>
              <div className="bg-card rounded-xl border border-border p-6"><BreathingCircuitDiagram /></div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CL_BK_03"]}>
            <CollapsibleSubsection title="DAS 2015 algorithm — four sequential plans">
            <div className="space-y-3">
              {[
                { plan: "Plan A", title: "Facemask ventilation & tracheal intubation", detail: "Optimise position (ramped), pre-oxygenation, videolaryngoscopy as default/early. Maximum 3+1 intubation attempts. Maintain oxygenation throughout." },
                { plan: "Plan B", title: "Supraglottic airway device (SAD)", detail: "2nd-generation SAD (e.g., i-gel, ProSeal LMA). Maximum 3 attempts. If successful, wake or proceed. If ventilation fails → Plan C." },
                { plan: "Plan C", title: "Facemask ventilation", detail: "Two-person technique. Full neuromuscular blockade. If oxygenation maintained → wake patient. If CICO → Plan D." },
                { plan: "Plan D", title: "Emergency front-of-neck access (FONA)", detail: "Scalpel cricothyroidotomy. Stab incision through cricothyroid membrane, bougie, 6.0 cuffed tube. DECLARE CICO EARLY." },
              ].map((p) => (
                <div key={p.plan} className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-primary text-sm">{p.plan}</span>
                    <span className="font-semibold text-foreground text-sm">— {p.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-card rounded-xl border border-border p-6">
              <DASAlgorithmDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CL_BK_03"]}>
            <CollapsibleSubsection title="Awake fibreoptic intubation">
            <p className="text-foreground/90 leading-relaxed">
              Successful AFOI requires systematic topicalisation of every sensory zone of the airway: V₁/V₂ (nasal),
              glossopharyngeal IX (oropharynx, posterior tongue), internal branch of superior laryngeal X (vallecula, base
              of tongue), and recurrent laryngeal X (below cords). Antisialogogue, light sedation (remifentanil TCI or
              dexmedetomidine) and a planned backup are mandatory.
            </p>
            <div className="mt-4 bg-card rounded-xl border border-border p-6">
              <AirwayInnervationDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CL_BK_03"]}>
            <CollapsibleSubsection title="Front-of-neck access (FONA)">
            <p className="text-foreground/90 leading-relaxed mb-3">
              The DAS-recommended scalpel-bougie-tube technique for can't intubate, can't oxygenate (CICO):
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Palpate cricothyroid membrane (or use ultrasound pre-procedure)</li>
              <li>Transverse stab incision through skin and membrane</li>
              <li>Rotate scalpel blade 90° to maintain opening</li>
              <li>Insert bougie caudally (tracheal clicks)</li>
              <li>Railroad 6.0 mm cuffed ETT over bougie</li>
              <li>Inflate cuff, ventilate, confirm with capnography</li>
            </ol>
            <div className="mt-4">
              <CICODrillAnimation />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CL_BK_03"]}>
            <CollapsibleSubsection title="Partial airway obstruction — level-specific management">
            <p className="text-foreground/90 leading-relaxed mb-4">
              Partial obstruction is a dynamic problem: the noise, timing in the respiratory cycle and response to
              positioning all localise the lesion before any instrumentation. Mis-localising the level is the commonest
              reason a planned induction tips into can't-intubate–can't-oxygenate, because each anatomical zone responds
              very differently to muscle relaxation, positive pressure, and rescue devices. The bedside rule is simple:
              <em> inspiratory stridor = extrathoracic, expiratory wheeze = intrathoracic, biphasic noise = fixed lesion
              at or near the cords</em>.
            </p>

            <div className="my-4">
              <PartialAirwayObstructionDiagram />
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Supraglottic obstruction</h3>
            <p className="text-foreground/90 leading-relaxed mb-2">
              Pathology lies above the cords — tongue base, soft palate, pharyngeal wall, epiglottis, vallecula, or
              peri-tonsillar tissues. Typical causes include obtunded patients, OSA, Ludwig's angina, peritonsillar/
              retropharyngeal abscess, post-tonsillectomy bleeding, supraglottitis, angio-oedema and supraglottic tumour.
              Noise is a low-pitched <strong>snore or stertor</strong>, worse on inspiration and dramatically improved by
              jaw thrust, lateral position or an oro-/nasopharyngeal airway.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
              <li>Simple manoeuvres first: head-tilt/chin-lift, jaw thrust, NPA in conscious patients, OPA when tolerated.</li>
              <li>CPAP/HFNO splints the pharynx; useful as a temporising bridge or for OSA-pattern obstruction.</li>
              <li>Most supraglottic problems are <strong>relieved</strong> by an LMA/i-gel because the seal sits below the lesion — but avoid blind SAD insertion in abscess or distorted anatomy (rupture risk).</li>
              <li>Definitive plan in infection, haematoma or angio-oedema: awake assessment, sit upright, anaesthetist + ENT in theatre, consider awake fibreoptic or gas induction with the surgeon scrubbed for tracheostomy.</li>
              <li><strong>Avoid</strong> muscle relaxants until oxygenation is proven — relaxation removes pharyngeal tone and may collapse a borderline airway completely.</li>
            </ul>

            <h4 className="text-base font-serif font-semibold text-foreground mt-4 mb-2">Bonfils retromolar rigid intubation fibrescope</h4>
            <div className="grid grid-cols-1 md:grid-cols-[1fr,260px] gap-4 mb-3">
              <div className="text-sm text-foreground/90 leading-relaxed space-y-2">
                <p>
                  The Bonfils (Karl Storz, 1983) is a slim <strong>rigid stainless-steel fibrescope with a fixed 40°
                  distal curve</strong>, an eyepiece (or video adaptor), a battery handle and a side-port for oxygen
                  insufflation. It is particularly useful in supraglottic obstruction because it can be advanced through
                  a <strong>retromolar</strong> approach behind the molars, hugging the lateral pharyngeal wall and
                  rotating around the obstructing tongue base or epiglottis without requiring full mouth opening or
                  laryngoscopic displacement of soft tissue.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li><strong>Indications:</strong> limited mouth opening (≥1.2 cm interincisor gap), restricted neck movement, large tongue, supraglottic mass/abscess, predicted Cormack–Lehane III–IV, failed direct or video laryngoscopy, awake or asleep.</li>
                  <li><strong>Technique:</strong> ETT pre-loaded onto the shaft, jaw thrust by an assistant, scope inserted in the midline or retromolar gutter, advanced under <em>continuous</em> visualisation until the cords appear; ETT railroaded over the scope. O₂ at 2–6 L · min⁻¹ via the side-port keeps the lens clear and provides apnoeic oxygenation.</li>
                  <li><strong>Advantages over flexible fibreoptic:</strong> rigid shaft is unaffected by pharyngeal collapse, robust in blood/secretions, fast, single-handed; useful when soft tissue would close around a flexible scope.</li>
                  <li><strong>Limitations:</strong> steep learning curve, fixed curvature does not negotiate distal airway pathology, requires some mouth opening, lens fogging if O₂ flow inadequate, expensive single-use camera couplers.</li>
                  <li><strong>Pitfalls in supraglottic obstruction:</strong> bleeding obscures the eyepiece — use suction and side-port O₂; never force past resistance — convert to plan B (awake tracheostomy or scalpel-bougie-tube).</li>
                </ul>
              </div>
              <BonfilsDeviceDiagram />
            </div>

            <figure className="my-4">
              <img
                src={bonfilsRetromolarIllustration}
                alt="Sagittal anatomical illustration of Bonfils rigid retromolar fibrescope passing along the retromolar gutter, around the tongue base, beneath the epiglottis and into the trachea, with anatomical labels for the hard and soft palate, tongue, retromolar space, epiglottis, vocal cords and trachea."
                width={1536}
                height={1024}
                loading="lazy"
                className="w-full h-auto rounded-lg border border-border"
              />
              <figcaption className="text-xs text-muted-foreground mt-2 text-center">
                Bonfils retromolar intubation — the rigid scope is introduced lateral to the tongue through the retromolar gutter, rotated to bring the 40° tip beneath the epiglottis and railroad the loaded ETT through the cords. Mouth opening is by jaw thrust; no laryngoscope is used.
              </figcaption>
            </figure>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Glottic obstruction</h3>
            <p className="text-foreground/90 leading-relaxed mb-2">
              Lesion is at the cords or immediate peri-glottic region — laryngeal tumour, papillomatosis, vocal cord
              palsy/paradoxical motion, post-extubation laryngospasm, glottic oedema, foreign body lodged at the cords,
              or laryngeal trauma. Noise is classically <strong>high-pitched inspiratory (or biphasic) stridor</strong>,
              voice change or aphonia, and the patient often adopts a sniffing position. Unlike supraglottic obstruction,
              SADs sit <em>above</em> the lesion and provide little benefit.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
              <li>Maintain spontaneous ventilation: inhalational induction (sevoflurane in 100% O₂) or remifentanil-based TIVA preserving respiratory drive.</li>
              <li>Heliox (70:30 or 79:21) reduces turbulent flow resistance and buys time while definitive plan is mobilised.</li>
              <li>Plan for a <strong>smaller-than-predicted ETT</strong> (range of sizes opened: typically 6.0, 5.5, 5.0, microlaryngeal 5.0/4.0). Videolaryngoscopy or flexible scope through an SAD may be required.</li>
              <li>Avoid muscle relaxants and PPV until the cords are visualised — paralysis can convert a partial to a complete obstruction with no rescue.</li>
              <li>Surgical airway must be immediately available; for fixed glottic tumours, awake tracheostomy under local is often the safest primary plan.</li>
              <li>Post-extubation laryngospasm: jaw thrust + Larson's point pressure, CPAP with 100% O₂, deepen anaesthesia (propofol bolus); if persisting, low-dose <Link to="/pharmacology/muscle-relaxants" className="text-pharmacology underline">suxamethonium</Link> 0.1–0.5 mg·kg⁻¹.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Subglottic & tracheal obstruction</h3>
            <p className="text-foreground/90 leading-relaxed mb-2">
              The lesion sits below the cords: subglottic stenosis (post-intubation, GPA, idiopathic), tracheal tumour,
              tracheomalacia, anterior mediastinal mass, retrosternal goitre, distal foreign body, or external compression
              by haematoma/abscess. The cords look normal on laryngoscopy — a dangerous trap, because passing an ETT past
              the cords does not relieve the obstruction and may impact the lesion. Imaging (CT neck/chest, flow–volume
              loop) before induction is invaluable when symptoms allow.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-2">
              <strong>Extrathoracic vs intrathoracic compression</strong> behave like opposite physiological mirrors,
              driven by the difference between intraluminal airway pressure and the surrounding pressure (atmospheric in
              the neck, pleural in the chest):
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
              <li>
                <strong>Extrathoracic (cervical trachea, subglottis):</strong> during spontaneous <em>inspiration</em>,
                intratracheal pressure falls below atmospheric and a variable lesion collapses → <strong>inspiratory
                stridor</strong>, flattened inspiratory limb of the flow–volume loop. Expiration generates positive
                intratracheal pressure that splints the airway open. PPV and CPAP help by stenting the lumen; awake
                fibreoptic intubation with the patient sitting up and breathing spontaneously is often the safest plan,
                with the ETT advanced beyond the lesion under direct vision.
              </li>
              <li>
                <strong>Intrathoracic (lower trachea, carina, mediastinal mass):</strong> during <em>expiration</em>,
                pleural pressure exceeds intraluminal pressure and the airway collapses → <strong>expiratory stridor or
                wheeze</strong>, flattened expiratory limb. Inspiration (negative pleural pressure) holds the airway
                open. Loss of spontaneous ventilation, IPPV, or supine positioning can be catastrophic — the mass
                falls posteriorly and pleural pressure rises around a now-passive airway, producing complete
                obstruction unrelievable by ETT or FONA above the lesion.
              </li>
              <li>
                <strong>Fixed lesion</strong> (circumferential stenosis, fixed tumour): both limbs of the flow–volume
                loop are flattened, biphasic stridor, behaviour independent of intra- vs extrathoracic location.
              </li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mb-2">
              Practical implications for the anaesthetist:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
              <li>Maintain spontaneous ventilation in <strong>any</strong> dynamic obstruction until the airway is secured beyond the lesion.</li>
              <li>Anterior mediastinal mass: assess in supine and upright positions, have the ability to roll lateral or prone, and consider femoro-femoral cardiopulmonary bypass standby for high-risk lesions (&gt;50% tracheal narrowing, pericardial effusion, SVC obstruction, stridor at rest).</li>
              <li>Choose a long, reinforced or microlaryngeal ETT able to bridge the lesion; have a rigid bronchoscope and ENT/cardiothoracic surgeon present.</li>
              <li>FONA above an intrathoracic obstruction <strong>does not rescue</strong> the patient — distal rescue requires rigid bronchoscopy, tracheal stenting, or extracorporeal oxygenation. Plan accordingly before induction.</li>
              <li>Heliox and HFNO are useful temporising measures; nebulised adrenaline and dexamethasone reduce mucosal oedema in inflammatory subglottic narrowing.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Comparison summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-3 font-semibold">Level</th>
                    <th className="text-left py-2 pr-3 font-semibold">Typical noise</th>
                    <th className="text-left py-2 pr-3 font-semibold">Helpful</th>
                    <th className="text-left py-2 pr-3 font-semibold">Avoid</th>
                    <th className="text-left py-2 pr-3 font-semibold">Definitive plan</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-3">Supraglottic</td>
                    <td className="py-2 pr-3">Snore / stertor (insp.)</td>
                    <td className="py-2 pr-3">Jaw thrust, NPA/OPA, CPAP, lateral position, SAD</td>
                    <td className="py-2 pr-3">Early paralysis, blind SAD in distorted anatomy</td>
                    <td className="py-2 pr-3">SAD or ETT past the lesion; surgical drainage where indicated</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-3">Glottic</td>
                    <td className="py-2 pr-3">High-pitched inspiratory stridor, voice change</td>
                    <td className="py-2 pr-3">Spontaneous ventilation, gas induction, heliox, smaller ETT, awake techniques</td>
                    <td className="py-2 pr-3">Muscle relaxants before cord view, SAD as definitive airway</td>
                    <td className="py-2 pr-3">Awake tracheostomy or FOI past cords with surgeon scrubbed</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-3">Extrathoracic subglottic / cervical trachea</td>
                    <td className="py-2 pr-3">Inspiratory stridor (variable lesion collapses on inspiration)</td>
                    <td className="py-2 pr-3">Sit upright, CPAP/PPV stents lumen, AFOI past lesion</td>
                    <td className="py-2 pr-3">Apnoea without distal control, blind dilatation</td>
                    <td className="py-2 pr-3">ETT or tracheostomy <em>below</em> the lesion under vision</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3">Intrathoracic trachea / mediastinal mass</td>
                    <td className="py-2 pr-3">Expiratory stridor/wheeze; positional symptoms</td>
                    <td className="py-2 pr-3">Spontaneous ventilation, semi-recumbent/lateral, rigid bronchoscope ready, ECMO standby</td>
                    <td className="py-2 pr-3">Supine paralysis + IPPV, FONA expecting rescue</td>
                    <td className="py-2 pr-3">Rigid bronchoscopy, tracheal stent, debulk, or proceed on bypass</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "DAS 2015 unanticipated difficult intubation: Plan A (mask + tracheal tube), B (SAD), C (face-mask), D (front-of-neck access).",
              "Pre-oxygenation aims for FEtO₂ ≥ 0.9 to extend safe apnoea time; obese, pregnant and septic patients desaturate fast.",
              "Apnoeic oxygenation (THRIVE / nasal cannulae at 15 L/min) prolongs safe apnoea but does not clear CO₂.",
              "Cricothyroidotomy: scalpel-bougie-tube (size 6.0) for adults — front-of-neck airway is the rescue of last resort, not a delayed option.",
              "Awake fibreoptic intubation remains the gold standard for the predicted difficult airway with adequate time and consent.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              RSI & Difficult Airway — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Concise, evidence-based answers to the most-asked questions about rapid sequence induction, cricoid pressure, the DAS difficult-airway algorithm, awake fibreoptic intubation and front-of-neck access.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {airwayFaqs.map(([q, a], i) => (
                <AccordionItem key={q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <Helmet>
            {/* Title + meta description provided centrally via topicSeo.airway-management; keep FAQPage JSON-LD here for rich-result eligibility. */}
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: airwayFaqs.map(([name, acceptedAnswer]) => ({
                "@type": "Question",
                name,
                acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
              })),
            })}</script>
          </Helmet>

        </>
      }
      keyPoints={[
        { text: "DAS 2015 — 4 sequential plans: intubation → SAD → facemask → FONA. Maximum 3+1 intubation attempts.", cites: ["DAS 2015"] },
        { text: "Localise partial obstruction by noise: stertor = supraglottic, inspiratory stridor = glottic/extrathoracic, expiratory stridor = intrathoracic, biphasic = fixed.", cites: ["BJA Educ 2017"] },
        { text: "Maintain spontaneous ventilation and avoid muscle relaxants in dynamic obstruction until the airway is secured beyond the lesion.", cites: ["NAP4 2011"] },
        { text: "Extrathoracic lesions collapse on inspiration and are splinted by PPV/CPAP; intrathoracic lesions collapse on expiration and are catastrophically worsened by IPPV in the supine position.", cites: ["DAS 2015"] },
        { text: "FONA does not rescue an intrathoracic obstruction — plan rigid bronchoscopy, stenting or femoro-femoral bypass before induction in high-risk mediastinal masses.", cites: ["BJA Educ 2017"] },
        { text: "2nd-generation SADs have gastric drain ports and seal pressures 25–35 cmH₂O.", cites: ["NAP4 2011"] },
        { text: "Videolaryngoscopy reduces failed intubation rates (Cochrane 2022) and is now the recommended default in predicted difficulty.", cites: ["DAS 2015"] },
        { text: "AFOI: block V₁/V₂, IX, internal SLN and recurrent laryngeal — sensory map drives the topicalisation plan.", cites: ["BJA Educ 2017"] },
        { text: "CICO requires early declaration and immediate scalpel-bougie-tube cricothyroidotomy before SpO₂ < 80 %.", cites: ["NAP4 2011"] },
        { text: "NAP4 lessons: failure to plan, failure to plan for failure, and persistence with failing techniques are the dominant themes.", cites: ["DAS 2015"] },
      ]}
    />
  );
};

export default AirwayManagementTopic;
