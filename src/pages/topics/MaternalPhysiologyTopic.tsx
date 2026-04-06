import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { maternalPhysiologyQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const MaternalPhysiologyTopic = () => {
  return (
    <SectionLayout title="Maternal Physiology" subtitle="FRCA Primary & Final — Physiology" backPath="/physiology" backLabel="Physiology" accentColor="text-physiology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Pregnancy induces profound physiological adaptations across every organ system to meet the metabolic demands of the growing fetus and prepare for delivery. These changes have major implications for anaesthetic management, drug pharmacokinetics, and perioperative risk.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cardiovascular Changes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Cardiac Output", value: "↑ 30–50% by 28 weeks (peaks early 3rd trimester)" },
              { label: "Heart Rate", value: "↑ 15–25 bpm above baseline" },
              { label: "Stroke Volume", value: "↑ 25–30% by end of 2nd trimester" },
              { label: "SVR", value: "↓ 20% (progesterone-mediated vasodilation)" },
              { label: "Blood Pressure", value: "↓ in 2nd trimester (nadir ~20 weeks), returns to baseline at term" },
              { label: "Aortocaval Compression", value: "Supine position → IVC compression by gravid uterus → ↓ venous return up to 25%" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            <strong>Left uterine displacement</strong> (15° tilt or manual displacement) is essential from 20 weeks onwards during supine positioning to prevent aortocaval compression syndrome.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Respiratory Changes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Minute Ventilation", value: "↑ 50% (↑ tidal volume, rate largely unchanged)" },
              { label: "Tidal Volume", value: "↑ 40% (progesterone-driven)" },
              { label: "FRC", value: "↓ 20% (diaphragm elevated by gravid uterus)" },
              { label: "Oxygen Consumption", value: "↑ 20–30%" },
              { label: "PaCO₂", value: "↓ to ~4.0 kPa (30 mmHg) — chronic respiratory alkalosis" },
              { label: "PaO₂", value: "↑ slightly due to hyperventilation (13–14 kPa)" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            The combination of <strong>↑ O₂ consumption</strong> and <strong>↓ FRC</strong> means the parturient desaturates rapidly during apnoea — reinforcing the critical importance of pre-oxygenation before RSI.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Haematological Changes</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Plasma volume</strong> ↑ 45% vs red cell mass ↑ 20% → <strong>physiological anaemia of pregnancy</strong> (dilutional, Hb nadir ~110 g/L)</li>
            <li><strong>Hypercoagulable state</strong>: ↑ fibrinogen (4–6 g/L), ↑ factors VII, VIII, X, vWF; ↓ protein S; ↓ fibrinolysis</li>
            <li><strong>VTE risk</strong> ↑ 5–10× — prophylactic LMWH often indicated</li>
            <li><strong>White cell count</strong> ↑ (up to 15 × 10⁹/L in 3rd trimester, up to 25 in labour) — limits WCC as infection marker</li>
            <li><strong>Platelet count</strong> mildly ↓ (gestational thrombocytopenia ~100–150 in 8% of pregnancies)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Gastrointestinal & Airway Changes</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>↓ Lower oesophageal sphincter tone</strong> (progesterone) + ↑ intragastric pressure (gravid uterus) → ↑ aspiration risk</li>
            <li><strong>Delayed gastric emptying</strong> in labour (opioids compound this further)</li>
            <li><strong>Airway oedema</strong>: capillary engorgement of nasopharyngeal/laryngeal mucosa — use smaller ETT (6.0–6.5), avoid nasal intubation if possible</li>
            <li><strong>Mallampati score worsens</strong> during pregnancy and especially during labour</li>
            <li>Failed intubation rate in obstetrics historically ~1:250 (vs 1:2000 in general population)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Renal & Hepatic Changes</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Renal blood flow</strong> ↑ 50–80% → GFR ↑ 50% → ↓ creatinine (normal upper limit ~75 µmol/L in pregnancy)</li>
            <li><strong>Glycosuria</strong> common (↓ tubular reabsorption threshold)</li>
            <li><strong>Hepatic</strong>: ↓ albumin (dilutional), ↓ plasma cholinesterase activity (prolonged suxamethonium action rarely clinically significant)</li>
            <li><strong>ALP</strong> elevated (placental isoenzyme) — not a reliable marker of liver disease in pregnancy</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pharmacological Implications</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>↑ Volume of distribution</strong>: ↑ plasma volume and total body water → larger loading doses may be needed</li>
            <li><strong>↓ Protein binding</strong>: ↓ albumin → ↑ free fraction of highly protein-bound drugs (thiopentone, diazepam)</li>
            <li><strong>MAC ↓ 30–40%</strong> for volatile agents (progesterone, endorphins)</li>
            <li><strong>↑ Sensitivity to local anaesthetics</strong>: epidural/spinal doses reduced by ~30% (engorged epidural veins ↓ CSF volume + ↑ neural sensitivity)</li>
            <li><strong>↑ Sensitivity to neuromuscular blockers</strong>: ↓ plasma cholinesterase</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "CO ↑ 30-50%, SVR ↓ 20% — left uterine displacement essential from 20 weeks",
        "↓ FRC + ↑ O₂ consumption = rapid desaturation during apnoea — pre-oxygenate meticulously",
        "Physiological anaemia: plasma volume ↑ 45% vs RBC mass ↑ 20%",
        "Hypercoagulable state: ↑ fibrinogen, ↑ clotting factors, ↓ protein S → VTE risk ↑ 5-10×",
        "MAC ↓ 30-40% and local anaesthetic dose requirements ↓ ~30%",
        "Aspiration risk ↑: ↓ LOS tone, ↑ intragastric pressure, delayed gastric emptying in labour",
      ]} />

      <QuizSection questions={maternalPhysiologyQuestions} />
      <ReferencesList topicId="maternal-physiology" />

      <TopicCompletionToggle topicId="maternal-physiology" topicTitle="Maternal Physiology" />
    </SectionLayout>
  );
};

export default MaternalPhysiologyTopic;
