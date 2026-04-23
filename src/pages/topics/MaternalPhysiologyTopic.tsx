import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { maternalPhysiologyQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Describe the major cardiovascular changes of pregnancy and explain aortocaval compression.",
  "Outline the respiratory changes and their implications for pre-oxygenation and rapid sequence induction.",
  "Summarise the haematological adaptations and the basis of pregnancy-associated hypercoagulability.",
  "Recognise the airway and gastrointestinal changes that increase difficult intubation and aspiration risk.",
  "Apply pharmacological adaptations (MAC, LA dose, protein binding) to safe perioperative prescribing.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Pre-oxygenation in late pregnancy",
    scenario: (
      <>
        A 32-week pregnant woman is being prepared for emergency category-1 caesarean section under general anaesthesia.
        How long until she desaturates after induction compared with a non-pregnant adult, and how do you mitigate?
      </>
    ),
    working: (
      <>
        Time to SpO₂ &lt; 90% during apnoea ≈ <strong>O₂ store ÷ O₂ consumption</strong>:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Non-pregnant: FRC ~2.5 L × FiO₂ 0.9 (after pre-O₂) ≈ 2.25 L O₂; VO₂ ~250 mL/min → ~9 min.</li>
          <li>Term pregnancy: FRC ~2.0 L (↓ 20%) × 0.9 ≈ 1.8 L; VO₂ ~325 mL/min (↑ 30%) → <strong>~3–4 min</strong> at most.</li>
          <li>Aortocaval compression and supine position drop FRC further (closing capacity may exceed FRC awake).</li>
        </ul>
      </>
    ),
    answer: (
      <>
        Pre-oxygenate to ETO₂ ≥ 0.85 (3 min tidal volume or 8 vital-capacity breaths), 30° head-up + left lateral tilt,
        consider apnoeic oxygenation with HFNO (THRIVE) or nasal cannulae at 15 L/min, RSI with cricoid pressure, plan
        difficult-airway equipment, and recruit experienced help.
      </>
    ),
  },
  {
    title: "Spinal anaesthesia dose for caesarean section",
    scenario: (
      <>
        Why is the typical intrathecal dose for caesarean (heavy bupivacaine 0.5% 2.0–2.5 mL with diamorphine/fentanyl)
        about 30% lower than for a non-pregnant adult having lower-limb surgery, and what other factors do you check before
        block?
      </>
    ),
    working: (
      <>
        Pregnancy-specific factors increase block height and onset:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Engorged epidural veins ↓ effective CSF volume in the lumbar sac.</li>
          <li>Progesterone ↑ neural sensitivity to local anaesthetic.</li>
          <li>Hyperventilation-induced respiratory alkalosis ↑ non-ionised LA fraction.</li>
          <li>Aortocaval compression and rapid block onset → profound sympathectomy and hypotension.</li>
        </ul>
        Check left lateral tilt is in place, IV access is patent, vasopressor is drawn (phenoxybenzamine? — no:
        <em>phenylephrine</em> infusion 25–50 µg/min is preferred over ephedrine; OAA recommends prophylactic infusion
        from spinal injection).
      </>
    ),
    answer: (
      <>
        Reduced dose accounts for ↓ CSF volume + ↑ neural sensitivity + alkalosis-driven LA partitioning. Co-load IV fluid
        + start phenylephrine infusion at the time of spinal; maintain SBP within 10% of baseline.
      </>
    ),
  },
];

const MaternalPhysiologyTopic = () => {
  return (
    <TopicTemplate
      title="Maternal Physiology"
      subtitle="FRCA Primary & Final — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="maternal-physiology"
      topicTitle="Maternal Physiology"
      quizQuestions={maternalPhysiologyQuestions}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["OB_BK_01"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["OB_BK_02"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Power & Kam Ch.17"],
        workedExamples: ["OAA/AAGBI 2013", "BJA Educ 2020"],
        keyPoints: ["Power & Kam Ch.17", "BJA Educ 2015"],
      }}
      keyPoints={[
        "CO ↑ 30–50%, SVR ↓ 20% — left uterine displacement essential from 20 weeks.",
        "↓ FRC + ↑ O₂ consumption ⇒ rapid desaturation during apnoea — pre-oxygenate meticulously.",
        "Physiological anaemia: plasma volume ↑ 45% vs RBC mass ↑ 20%; Hb nadir ~110 g/L.",
        "Hypercoagulable state: ↑ fibrinogen, ↑ clotting factors, ↓ protein S → VTE risk ↑ 5–10×.",
        "MAC ↓ 30–40% and intrathecal/epidural LA dose requirements ↓ ~30%.",
        "Aspiration risk ↑: ↓ LOS tone, ↑ intragastric pressure, delayed gastric emptying in labour.",
        "Phenylephrine infusion is preferred over ephedrine for spinal hypotension at caesarean section.",
      ]}
      coreConcepts={
        <>
          <ExamSection id="overview" exams={["primary", "final"]} curriculumCodes={["OB_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pregnancy induces profound physiological adaptations across every organ system to meet the metabolic
              demands of the growing fetus and prepare for delivery. These changes have major implications for
              anaesthetic management, drug pharmacokinetics, and perioperative risk.
            </p>
          </ExamSection>

          <ExamSection id="cardiovascular" exams={["primary", "final"]} curriculumCodes={["OB_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cardiovascular Changes</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Cardiac Output", value: "↑ 30–50% by 28 weeks (peaks early 3rd trimester); further 50% in labour, peak immediately post-partum." },
                { label: "Heart Rate", value: "↑ 15–25 bpm above baseline." },
                { label: "Stroke Volume", value: "↑ 25–30% by end of 2nd trimester." },
                { label: "SVR", value: "↓ 20% (progesterone-mediated vasodilation, low-resistance placental bed)." },
                { label: "Blood Pressure", value: "↓ in 2nd trimester (nadir ~20 weeks), returns to baseline at term." },
                { label: "Aortocaval Compression", value: "Supine position from ~20 weeks → IVC compression → ↓ venous return up to 25%." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              <strong>Left uterine displacement</strong> (15° tilt or manual displacement) is essential from 20 weeks
              onwards during supine positioning to prevent aortocaval compression syndrome.
            </p>
          </ExamSection>

          <ExamSection id="respiratory" exams={["primary", "final"]} curriculumCodes={["OB_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Respiratory Changes</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Minute Ventilation", value: "↑ 50% (↑ tidal volume, rate largely unchanged)." },
                { label: "Tidal Volume", value: "↑ 40% (progesterone-driven)." },
                { label: "FRC", value: "↓ 20% (diaphragm elevated by gravid uterus)." },
                { label: "Oxygen Consumption", value: "↑ 20–30%." },
                { label: "PaCO₂", value: "↓ to ~4.0 kPa (30 mmHg) — chronic respiratory alkalosis with renal HCO₃⁻ compensation." },
                { label: "PaO₂", value: "↑ slightly due to hyperventilation (13–14 kPa)." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              The combination of <strong>↑ O₂ consumption</strong> and <strong>↓ FRC</strong> means the parturient
              desaturates rapidly during apnoea — reinforcing the critical importance of pre-oxygenation before RSI.
            </p>
          </ExamSection>

          <ExamSection id="haematology" exams={["primary", "final", "fficm"]} curriculumCodes={["OB_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Haematological Changes</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>
                <strong>Plasma volume</strong> ↑ 45% vs red cell mass ↑ 20% → <strong>physiological anaemia of pregnancy</strong>{" "}
                (dilutional, Hb nadir ~110 g/L).
              </li>
              <li>
                <strong>Hypercoagulable state</strong>: ↑ fibrinogen (4–6 g/L), ↑ factors VII, VIII, X, vWF; ↓ protein S; ↓ fibrinolysis.
              </li>
              <li>
                <strong>VTE risk</strong> ↑ 5–10× — RCOG-stratified prophylactic LMWH commonly indicated.
              </li>
              <li>
                <strong>White cell count</strong> ↑ (up to 15 × 10⁹/L in 3rd trimester, up to 25 in labour) — limits WCC as infection marker.
              </li>
              <li>
                <strong>Platelet count</strong> mildly ↓ (gestational thrombocytopenia ~100–150 × 10⁹/L in ~8% of pregnancies).
              </li>
            </ul>
          </ExamSection>

          <ExamSection id="gi-airway" exams={["primary", "final"]} curriculumCodes={["OB_BK_02"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Gastrointestinal & Airway Changes</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>↓ Lower oesophageal sphincter tone</strong> (progesterone) + ↑ intragastric pressure (gravid uterus) → ↑ aspiration risk.</li>
              <li><strong>Delayed gastric emptying</strong> in labour (opioids compound this further).</li>
              <li><strong>Airway oedema</strong>: capillary engorgement of nasopharyngeal/laryngeal mucosa — use smaller ETT (6.0–6.5), avoid nasal intubation if possible.</li>
              <li><strong>Mallampati score worsens</strong> during pregnancy and especially during labour.</li>
              <li>Failed intubation rate in obstetrics historically ~1:250 (vs ~1:2000 in general population) — follow OAA/DAS 2015 algorithm.</li>
            </ul>
          </ExamSection>

          <ExamSection id="renal-hepatic" exams={["primary", "final"]} curriculumCodes={["OB_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Renal & Hepatic Changes</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Renal blood flow</strong> ↑ 50–80% → GFR ↑ 50% → ↓ creatinine (normal upper limit ~75 µmol/L in pregnancy).</li>
              <li><strong>Glycosuria</strong> common (↓ tubular reabsorption threshold).</li>
              <li><strong>Hepatic</strong>: ↓ albumin (dilutional), ↓ plasma cholinesterase activity (prolonged suxamethonium action rarely clinically significant).</li>
              <li><strong>ALP</strong> elevated (placental isoenzyme) — not a reliable marker of liver disease in pregnancy.</li>
            </ul>
          </ExamSection>

          <ExamSection id="pharmacology" exams={["primary", "final"]} curriculumCodes={["OB_BK_02"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pharmacological Implications</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>↑ Volume of distribution</strong>: ↑ plasma volume and total body water → larger loading doses may be needed for some drugs.</li>
              <li><strong>↓ Protein binding</strong>: ↓ albumin → ↑ free fraction of highly protein-bound drugs (thiopentone, diazepam).</li>
              <li><strong>MAC ↓ 30–40%</strong> for volatile agents (progesterone, endorphins).</li>
              <li><strong>↑ Sensitivity to local anaesthetics</strong>: epidural/spinal doses reduced by ~30% (engorged epidural veins ↓ CSF volume + ↑ neural sensitivity).</li>
              <li><strong>↑ Sensitivity to neuromuscular blockers</strong>: ↓ plasma cholinesterase (clinically subtle).</li>
            </ul>
          </ExamSection>
        </>
      }
    />
  );
};

export default MaternalPhysiologyTopic;
