import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { cardiacElectrophysiologyQuestions } from "@/data/quizzes";
import CardiacActionPotentialDiagram from "@/components/diagrams/CardiacActionPotentialDiagram";
import LongQTTorsadesDiagram from "@/components/diagrams/LongQTTorsadesDiagram";
import IonChannelTimelineDiagram from "@/components/diagrams/IonChannelTimelineDiagram";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Contrast the fast and slow cardiac action potentials and identify the dominant ionic currents in each phase.",
  "Describe pacemaker automaticity (If, ICa-T) and the consequences of vagal/sympathetic modulation.",
  "Trace the normal conduction pathway and explain the function of the AV nodal delay and refractory periods.",
  "Outline the mechanisms of long QT syndrome and torsades de pointes, and link them to anaesthetic drug interactions.",
  "Summarise short-, medium- and long-term blood pressure regulation and how anaesthesia disrupts each.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "QT prolongation in the anaesthetic room",
    scenario: (
      <>
        A 70-year-old on amiodarone, citalopram and ondansetron presents with a corrected QT (QTc) of 520 ms on the
        pre-op ECG. Why is this dangerous, and how do you anaesthetise safely?
      </>
    ),
    working: (
      <>
        QTc &gt; 500 ms is a recognised threshold for torsades de pointes. Mechanism:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Drugs blocking the rapidly-activating delayed rectifier IKr (hERG channel) prolong phase 3 repolarisation.</li>
          <li>Prolonged AP duration → reactivation of L-type Ca²⁺ channels in mid-myocardial cells → early afterdepolarisations.</li>
          <li>EADs propagate through electrically heterogeneous myocardium → polymorphic VT (torsades).</li>
        </ul>
        Common anaesthetic offenders: ondansetron, droperidol, methadone, sevoflurane, antibiotics (macrolides,
        fluoroquinolones), and electrolyte disturbance (↓K⁺, ↓Mg²⁺, ↓Ca²⁺).
      </>
    ),
    answer: (
      <>
        Stop non-essential QT-prolonging drugs preoperatively, correct K⁺ to ≥4.5 mmol/L and Mg²⁺ to ≥1.0 mmol/L, prefer
        propofol TIVA, avoid ondansetron (substitute cyclizine/dexamethasone), continuous ECG with QT monitoring, and
        keep IV magnesium 2 g ready to treat torsades. Defibrillator immediately available.
      </>
    ),
  },
  {
    title: "Why does AV nodal delay matter?",
    scenario: (
      <>
        A patient develops fast atrial fibrillation (HR 160 bpm) with hypotension intra-operatively. Explain the role of
        the AV node in protecting the ventricles and the rationale for rate vs rhythm control.
      </>
    ),
    working: (
      <>
        The AV node is the only normal electrical connection between atria and ventricles. Its slow conduction
        (~0.05 m/s) and long refractory period act as a frequency filter — many atrial impulses (300–600 bpm in AF) are
        blocked, so ventricular rate is determined by AV node refractoriness.
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Rate control</strong>: prolong AV refractoriness — β-blockers (metoprolol), non-DHP Ca²⁺ blockers
            (diltiazem), digoxin (vagally mediated). Avoid AV-blocking combos in pre-excited AF.</li>
          <li><strong>Rhythm control</strong>: amiodarone (mixed class III, broad spectrum) or DC cardioversion if
            haemodynamically unstable.</li>
          <li>Ventricular filling time depends on diastole — at HR 160 the diastolic filling phase is severely
            shortened, dropping CO especially in non-compliant ventricles.</li>
        </ul>
      </>
    ),
    answer: (
      <>
        Hypotensive new-onset AF → synchronised DC cardioversion (RCUK peri-arrest algorithm). Otherwise, IV magnesium,
        rate control with metoprolol/digoxin, and treat reversible causes (sepsis, hypovolaemia, electrolytes).
      </>
    ),
  },
];

const CardiacElectrophysiologyTopic = () => {
  return (
    <TopicTemplate
      title="Cardiac Electrophysiology & Vascular Physiology"
      subtitle="FRCA Primary & Final — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="cardiac-electrophysiology"
      topicTitle="Cardiac Electrophysiology & Vascular Physiology"
      quizQuestions={cardiacElectrophysiologyQuestions}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["CR_BK_02"] },
        diagrams: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["OA_BK_01"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["Peck & Hill Ch.4"],
        diagrams: ["BJA Educ 2015"],
        workedExamples: ["BJA Educ 2015"],
        keyPoints: ["Peck & Hill Ch.4", "Ganong Ch.29"],
      }}
      diagrams={
        <>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <h3 className="text-base font-semibold text-foreground mb-3">Cardiac Action Potential</h3>
            <CardiacActionPotentialDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <h3 className="text-base font-semibold text-foreground mb-3">Ion Channel Timeline</h3>
            <IonChannelTimelineDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <h3 className="text-base font-semibold text-foreground mb-3">Long QT & Torsades de Pointes</h3>
            <LongQTTorsadesDiagram />
          </div>
        </>
      }
      keyPoints={[
        "Fast AP (myocytes): Phase 0 = Na⁺ influx; Slow AP (nodes): Phase 0 = Ca²⁺ influx via ICa-L.",
        "SA node automaticity: funny current (If) + ICa-T in Phase 4 → spontaneous depolarisation to threshold.",
        "AV node delay (~0.1 s) allows atrial contraction to complete and acts as a frequency filter in AF/flutter.",
        "QTc >500 ms with hypokalaemia/hypomagnesaemia is a high-risk substrate for torsades — correct electrolytes and avoid IKr blockers.",
        "Baroreceptor reflex: carotid sinus (CN IX) + aortic arch (CN X) → NTS → rapid BP adjustment.",
        "Long-term BP control: renal pressure natriuresis + RAAS + ADH + ANP/BNP.",
        "Coronary flow is predominantly diastolic; cerebral flow is autoregulated 50–150 mmHg with CO₂ reactivity.",
      ]}
      coreConcepts={
        <>
          <ExamSection id="action-potentials" exams={["primary", "final"]} curriculumCodes={["CR_BK_02"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cardiac Action Potentials</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The heart has two types of action potential: the fast-response (atrial/ventricular myocytes, Purkinje
              fibres) and the slow-response (SA and AV nodes). The interactive plots show membrane potential against
              time, with each phase highlighted — toggle between cell types and click any phase for ion-current detail.
            </p>
            <div className="space-y-3">
              {[
                { phase: "Phase 0", fast: "Rapid Na⁺ influx (INa) → rapid depolarisation. Velocity ~1 m/s in ventricle.", slow: "Slow Ca²⁺ influx (ICa-L) → slow depolarisation. Velocity ~0.05 m/s in AV node." },
                { phase: "Phase 1", fast: "Transient K⁺ efflux (Ito) → brief partial repolarisation (notch).", slow: "Absent." },
                { phase: "Phase 2", fast: "Plateau: balanced Ca²⁺ influx (ICa-L) and K⁺ efflux. Duration ~200 ms. Excitation–contraction coupling.", slow: "Absent — no plateau." },
                { phase: "Phase 3", fast: "K⁺ efflux (IKr, IKs) predominates → repolarisation.", slow: "K⁺ efflux → repolarisation." },
                { phase: "Phase 4", fast: "Stable resting membrane potential (−90 mV) maintained by IK1.", slow: "Pacemaker potential: 'funny current' (If, Na⁺ inward) + ICa-T → spontaneous depolarisation to threshold (−40 mV)." },
              ].map((p) => (
                <div key={p.phase} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{p.phase}</p>
                  <div className="grid sm:grid-cols-2 gap-2 mt-1 text-xs text-muted-foreground">
                    <div><strong>Fast:</strong> {p.fast}</div>
                    <div><strong>Slow:</strong> {p.slow}</div>
                  </div>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="long-qt" exams={["final", "fficm"]} curriculumCodes={["OA_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Long QT Syndrome & Torsades de Pointes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Prolonged phase 3 repolarisation creates a window for L-type Ca²⁺ channel reactivation → early
              afterdepolarisations (EADs) → triggered polymorphic VT (torsades). Class III antiarrhythmics, IKr blockers
              (ondansetron, methadone, macrolides, fluoroquinolones), hypokalaemia and congenital LQT mutations stretch
              the action potential and collapse the repolarisation reserve.
            </p>
          </ExamSection>

          <ExamSection id="conduction" exams={["primary", "final"]} curriculumCodes={["CR_BK_02"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Conduction System</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Normal conduction: SA node → atrial myocardium → AV node (delay ~0.1 s) → Bundle of His → left and right
              bundle branches → Purkinje fibres → ventricular myocardium.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "SA Node Rate", value: "60–100 bpm (intrinsic ~100 bpm without vagal tone)." },
                { label: "AV Node Delay", value: "~0.1 s — allows atrial contraction to complete before ventricular systole." },
                { label: "AV Node Rate", value: "40–60 bpm (escape rhythm)." },
                { label: "Purkinje Rate", value: "20–40 bpm (ventricular escape)." },
                { label: "Refractory Periods", value: "ARP (absolute) ~250 ms, RRP (relative) ~50 ms. Long ARP prevents tetanic contraction." },
                { label: "ECG Correlation", value: "P = atrial depolarisation, PR = AV delay, QRS = ventricular depolarisation, T = repolarisation." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="bp-regulation" exams={["primary", "final", "fficm"]} curriculumCodes={["CR_BK_02"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Blood Pressure Regulation</h2>
            <div className="space-y-3">
              {[
                { title: "Short-term (seconds–minutes)", desc: "Baroreceptor reflex: carotid sinus (CN IX) and aortic arch (CN X) detect ↑ BP → ↑ afferent firing → NTS → ↑ vagal tone + ↓ sympathetic output → ↓ HR, ↓ contractility, vasodilation. Resets over 24–48 h in chronic hypertension." },
                { title: "Chemoreceptors", desc: "Peripheral (carotid/aortic bodies): respond to ↓ PaO₂, ↑ PaCO₂, ↓ pH → ↑ sympathetic output + ↑ ventilation. Central (medullary): respond to ↑ CSF H⁺. CNS ischaemic response (Cushing reflex): ↑↑ MAP → severe ↑ BP." },
                { title: "Medium-term (hours)", desc: "Capillary fluid shift: ↑ BP → ↑ filtration → ↓ blood volume → ↓ BP. RAAS activation: ↓ renal perfusion → renin → angiotensin II (vasoconstriction + aldosterone) → Na⁺/H₂O retention." },
                { title: "Long-term (days–weeks)", desc: "Renal pressure natriuresis: ↑ MAP → ↑ Na⁺ and H₂O excretion → ↓ blood volume. ADH: ↑ osmolality or ↓ BP → posterior pituitary → V₂ receptors → aquaporin-2. ANP/BNP: atrial/ventricular stretch → natriuresis + vasodilation." },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="vascular" exams={["primary", "final"]} curriculumCodes={["CR_BK_02"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Vascular Physiology</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Arterioles</strong> are the major site of resistance — control organ blood flow via sympathetic tone and local metabolites (autoregulation).</li>
              <li><strong>Venous system</strong> contains ~65% of blood volume — capacitance vessels. Venoconstriction (α₁) increases preload.</li>
              <li><strong>Endothelial function</strong>: NO (vasodilation via cGMP), prostacyclin (PGI₂), endothelin-1 (vasoconstriction).</li>
              <li><strong>Special circulations</strong>: coronary (diastolic filling, metabolic autoregulation), cerebral (CO₂ reactivity, 50–150 mmHg autoregulation), renal (myogenic + TGF), pulmonary (HPV), hepatic (HABR).</li>
              <li><strong>Valsalva manoeuvre</strong>: Phase I (↑ MAP from ↑ intrathoracic pressure), Phase II (↓ VR → ↓ BP → baroreceptor ↑ HR), Phase III (release → transient ↓ BP), Phase IV (↑ VR → ↑ BP → reflex bradycardia/overshoot).</li>
            </ul>
          </ExamSection>
        </>
      }
    />
  );
};

export default CardiacElectrophysiologyTopic;
