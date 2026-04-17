import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { cardiacElectrophysiologyQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import CardiacActionPotentialDiagram from "@/components/diagrams/CardiacActionPotentialDiagram";

const CardiacElectrophysiologyTopic = () => {
  return (
    <SectionLayout title="Cardiac Electrophysiology & Vascular Physiology" subtitle="FRCA Primary & Final — Physiology" backPath="/physiology" backLabel="Physiology" accentColor="text-physiology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cardiac Action Potentials</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">The heart has two types of action potential: the fast-response (atrial/ventricular myocytes, Purkinje fibres) and the slow-response (SA and AV nodes).</p>
          <div className="space-y-3">
            {[
              { phase: "Phase 0", fast: "Rapid Na⁺ influx (INa) → rapid depolarisation. Velocity ~1 m/s in ventricle.", slow: "Slow Ca²⁺ influx (ICa-L) → slow depolarisation. Velocity ~0.05 m/s in AV node." },
              { phase: "Phase 1", fast: "Transient K⁺ efflux (Ito) → brief partial repolarisation (notch).", slow: "Absent." },
              { phase: "Phase 2", fast: "Plateau: balanced Ca²⁺ influx (ICa-L) and K⁺ efflux. Duration ~200ms. Excitation-contraction coupling.", slow: "Absent — no plateau." },
              { phase: "Phase 3", fast: "K⁺ efflux (IKr, IKs) predominates → repolarisation.", slow: "K⁺ efflux → repolarisation." },
              { phase: "Phase 4", fast: "Stable resting membrane potential (−90mV) maintained by IK1.", slow: "Pacemaker potential: 'funny current' (If, Na⁺ inward) + ICa-T → spontaneous depolarisation to threshold (−40mV)." },
            ].map(p => (
              <div key={p.phase} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{p.phase}</p>
                <div className="grid sm:grid-cols-2 gap-2 mt-1 text-xs text-muted-foreground">
                  <div><strong>Fast:</strong> {p.fast}</div>
                  <div><strong>Slow:</strong> {p.slow}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Conduction System</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Normal conduction: SA node → atrial myocardium → AV node (delay ~0.1s) → Bundle of His → left and right bundle branches → Purkinje fibres → ventricular myocardium.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "SA Node Rate", value: "60–100 bpm (intrinsic ~100 bpm without vagal tone)" },
              { label: "AV Node Delay", value: "~0.1s — allows atrial contraction to complete before ventricular systole" },
              { label: "AV Node Rate", value: "40–60 bpm (escape rhythm)" },
              { label: "Purkinje Rate", value: "20–40 bpm (ventricular escape)" },
              { label: "Refractory Periods", value: "ARP (absolute) ~250ms, RRP (relative) ~50ms. Long refractory period prevents tetanic contraction." },
              { label: "ECG Correlation", value: "P wave = atrial depolarisation, PR interval = AV delay, QRS = ventricular depolarisation, T wave = repolarisation" },
            ].map(item => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Blood Pressure Regulation</h2>
          <div className="space-y-3">
            {[
              { title: "Short-term (seconds–minutes)", desc: "Baroreceptor reflex: carotid sinus (CN IX) and aortic arch (CN X) detect ↑ BP → ↑ afferent firing → NTS → ↑ vagal tone + ↓ sympathetic output → ↓ HR, ↓ contractility, vasodilation. Resets over 24-48h in chronic hypertension." },
              { title: "Chemoreceptors", desc: "Peripheral (carotid/aortic bodies): respond to ↓PaO₂, ↑PaCO₂, ↓pH → ↑ sympathetic output + ↑ ventilation. Central (medullary): respond to ↑CSF H⁺. CNS ischaemic response (Cushing reflex): ↑↑ MAP → severe ↑ BP." },
              { title: "Medium-term (hours)", desc: "Capillary fluid shift: ↑ BP → ↑ filtration → ↓ blood volume → ↓ BP. RAAS activation: ↓ renal perfusion → renin → angiotensin II (vasoconstriction + aldosterone) → Na⁺/H₂O retention." },
              { title: "Long-term (days–weeks)", desc: "Renal pressure natriuresis: ↑ MAP → ↑ Na⁺ and H₂O excretion → ↓ blood volume. ADH: ↑ osmolality or ↓ BP → posterior pituitary → V2 receptors → aquaporin-2. ANP/BNP: atrial/ventricular stretch → natriuresis + vasodilation." },
            ].map(item => (
              <div key={item.title} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Vascular Physiology</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Arterioles</strong> are the major site of resistance — control organ blood flow via sympathetic tone and local metabolites (autoregulation)</li>
            <li><strong>Venous system</strong> contains ~65% of blood volume — capacitance vessels. Venoconstriction (α₁) increases preload</li>
            <li><strong>Endothelial function</strong>: NO (vasodilation via cGMP), prostacyclin (PGI₂), endothelin-1 (vasoconstriction)</li>
            <li><strong>Special circulations</strong>: coronary (diastolic filling, metabolic autoregulation), cerebral (CO₂ reactivity, 50-150 mmHg autoregulation), renal (myogenic + TGF), pulmonary (HPV), hepatic (HABR)</li>
            <li><strong>Valsalva manoeuvre</strong>: Phase I (↑ MAP from ↑ intrathoracic pressure), Phase II (↓ VR → ↓ BP → baroreceptor ↑ HR), Phase III (release → transient ↓ BP), Phase IV (↑ VR → ↑ BP → reflex bradycardia/overshoot)</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Fast AP (myocytes): Phase 0 = Na⁺ influx; Slow AP (nodes): Phase 0 = Ca²⁺ influx via ICa-L",
        "SA node automaticity: funny current (If) + ICa-T in Phase 4 → spontaneous depolarisation",
        "AV node delay (~0.1s) allows atrial contraction to complete — only AV nodal pathway connects atria to ventricles",
        "Baroreceptor reflex: carotid sinus (CN IX) + aortic arch (CN X) → NTS → rapid BP adjustment",
        "Long-term BP: renal pressure natriuresis + RAAS + ADH + ANP/BNP",
        "Coronary flow is predominantly diastolic; cerebral flow is autoregulated 50-150 mmHg with CO₂ reactivity",
      ]} />
      <QuizSection questions={cardiacElectrophysiologyQuestions} />
      <ReferencesList topicId="cardiac-electrophysiology" />
      <SeeAlso topicId="cardiac-electrophysiology" />
        <TopicCompletionToggle topicId="cardiac-electrophysiology" topicTitle="Cardiac Electrophysiology &amp; Vascular Physiology" />
    </SectionLayout>
  );
};

export default CardiacElectrophysiologyTopic;
