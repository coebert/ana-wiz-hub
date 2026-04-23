import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
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
import { airwayManagementQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Describe a structured airway assessment (LEMON, Mallampati, Wilson) and list red-flag predictors of difficulty.",
  "Apply the DAS 2015 unanticipated difficult intubation algorithm: Plans A → B → C → D with maximum attempts at each step.",
  "Compare 1st vs 2nd-generation supraglottic airways, ETT cuffs, and videolaryngoscopes for routine and rescue ventilation.",
  "Outline awake fibreoptic intubation: indications, sensory innervation of the airway, and topicalisation strategy.",
  "Recognise CICO early and perform scalpel-bougie-tube cricothyroidotomy per DAS guidance.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Unanticipated CICO at induction",
    scenario:
      "A 58-year-old man for elective laparotomy is induced with propofol and rocuronium. Direct laryngoscopy shows Cormack–Lehane IV. Two further attempts (CMAC, repositioning) fail. An i-gel is inserted but inadequate ventilation (PEEP 15, SpO₂ 86 % falling). What do you do next, and at what SpO₂ should FONA be performed?",
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
        diagrams: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CL_BK_03"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CL_BK_03"] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CL_BK_03"] },
      }}
      sectionSources={{
        objectives: ["DAS 2015", "NAP4 2011"],
        diagrams: ["DAS 2015", "BJA Educ 2017"],
        workedExamples: ["DAS 2015", "NAP4 2011"],
        keyPoints: ["DAS 2015", "NAP4 2011", "BJA Educ 2017"],
      }}
      diagrams={
        <>
          <CICODrillAnimation />
          <div className="bg-card rounded-xl border border-border p-6">
            <DASAlgorithmDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <AirwayAssessmentDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <CormackLehaneDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <MallampatiDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <WilsonRiskScoreCalculator />
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <AirwayDevicesDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <BreathingCircuitDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <AirwayInnervationDiagram />
          </div>
        </>
      }
      coreConcepts={
        <>
          <ExamSection exams={["final", "fficm"]} curriculumCodes={["CL_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Airway management is the cornerstone of safe anaesthetic and critical care practice. The Difficult Airway
              Society (DAS) algorithms standardise the approach to anticipated and unanticipated difficulty, supported by
              structured assessment tools and a hierarchy of rescue techniques culminating in front-of-neck access.
            </p>
          </ExamSection>

          <ExamSection exams={["final", "fficm"]} curriculumCodes={["CL_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pre-operative airway assessment</h2>
            <p className="text-foreground/90 leading-relaxed">
              Systematic assessment is performed before every anaesthetic. No single test reliably predicts difficulty —
              composite scores (Wilson, El-Ganzouri) outperform single bedside tests. Document Mallampati, thyromental
              distance, mouth opening, neck movement, dentition, and previous airway records. Ultrasound of the cricothyroid
              membrane is increasingly recommended for predicted difficult anatomy or obesity.
            </p>
          </ExamSection>

          <ExamSection exams={["final", "fficm"]} curriculumCodes={["CL_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Airway equipment</h2>
            <p className="text-foreground/90 leading-relaxed">
              Modern practice favours <strong>2nd-generation supraglottic airways</strong> (i-gel, ProSeal LMA) with gastric
              drain ports and seal pressures of 25–35 cmH₂O. Videolaryngoscopy (Macintosh-blade or hyperangulated) is now
              recommended as default in patients with predicted difficulty, with Cochrane evidence supporting reduced failed
              intubation rates compared with direct laryngoscopy.
            </p>
          </ExamSection>

          <ExamSection exams={["final", "fficm"]} curriculumCodes={["CL_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">DAS 2015 algorithm — four sequential plans</h2>
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
          </ExamSection>

          <ExamSection exams={["final", "fficm"]} curriculumCodes={["CL_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Awake fibreoptic intubation</h2>
            <p className="text-foreground/90 leading-relaxed">
              Successful AFOI requires systematic topicalisation of every sensory zone of the airway: V₁/V₂ (nasal),
              glossopharyngeal IX (oropharynx, posterior tongue), internal branch of superior laryngeal X (vallecula, base
              of tongue), and recurrent laryngeal X (below cords). Antisialogogue, light sedation (remifentanil TCI or
              dexmedetomidine) and a planned backup are mandatory.
            </p>
          </ExamSection>

          <ExamSection exams={["final", "fficm"]} curriculumCodes={["CL_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Front-of-neck access (FONA)</h2>
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
          </ExamSection>
        </>
      }
      keyPoints={[
        "DAS 2015 — 4 sequential plans: intubation → SAD → facemask → FONA. Maximum 3+1 intubation attempts.",
        "2nd-generation SADs have gastric drain ports and seal pressures 25–35 cmH₂O.",
        "Videolaryngoscopy reduces failed intubation rates (Cochrane 2022) and is now the recommended default in predicted difficulty.",
        "AFOI: block V₁/V₂, IX, internal SLN and recurrent laryngeal — sensory map drives the topicalisation plan.",
        "CICO requires early declaration and immediate scalpel-bougie-tube cricothyroidotomy before SpO₂ < 80 %.",
        "NAP4 lessons: failure to plan, failure to plan for failure, and persistence with failing techniques are the dominant themes.",
      ]}
    />
  );
};

export default AirwayManagementTopic;
