import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { ecmoQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const ECMOTopic = () => {
  return (
    <SectionLayout title="ECMO & Mechanical Circulatory Support" subtitle="FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ECMO Configurations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                <th className="text-left py-2 text-foreground font-semibold">VV-ECMO</th>
                <th className="text-left py-2 text-foreground font-semibold">VA-ECMO</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Indication</td><td>Respiratory failure (severe ARDS)</td><td>Cardiogenic shock ± respiratory failure</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cannulation</td><td>Femoral vein → jugular vein (or dual-lumen Avalon in IJ)</td><td>Femoral vein → femoral artery (peripheral) or central (RA → aorta)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cardiac support</td><td>None — patient's heart provides CO</td><td>Yes — provides both cardiac output and gas exchange</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Oxygenation</td><td>Via membrane lung. FiO₂ and sweep gas control PaO₂/PaCO₂</td><td>Same — but retrograde aortic flow can cause differential hypoxia (Harlequin syndrome)</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Complications</td><td>Recirculation, haemolysis, bleeding</td><td>Limb ischaemia (distal perfusion cannula needed), LV distension, differential hypoxia, stroke</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ECMO Circuit</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Components</strong>: drainage cannula → centrifugal pump → membrane oxygenator (polymethylpentene) → heat exchanger → return cannula</li>
            <li><strong>Flow rates</strong>: VV-ECMO 50-80 mL/kg/min to achieve adequate oxygenation. VA-ECMO: sufficient to support cardiac output (~3-6 L/min)</li>
            <li><strong>Sweep gas</strong>: controls CO₂ removal. ↑ sweep gas flow → ↑ CO₂ removal (↓ PaCO₂). FiO₂ on membrane controls PaO₂</li>
            <li><strong>Anticoagulation</strong>: UFH infusion targeting APTT 60-80s or ACT 180-220s. Balance bleeding vs thrombosis</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Indications & Evidence</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>VV-ECMO for ARDS</strong>: CESAR trial (2009) — survival benefit when referred to ECMO centre. EOLIA trial (2018) — no significant 60-day mortality benefit but high crossover. Used as rescue after prone positioning, NMB, iNO fail</li>
            <li><strong>VA-ECMO</strong>: refractory cardiogenic shock (acute MI, post-cardiotomy, myocarditis), bridge to transplant/LVAD, refractory cardiac arrest (eCPR)</li>
            <li><strong>Contraindications</strong>: irreversible underlying condition, futility, uncontrolled bleeding, advanced directives against</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Other Mechanical Circulatory Support</h2>
          <div className="space-y-3">
            {[
              { device: "IABP", desc: "Intra-aortic balloon pump: inflates in diastole (↑ coronary perfusion, ↑ diastolic BP), deflates in systole (↓ afterload, ↓ myocardial O₂ demand). Triggered by ECG or arterial pressure. Contraindicated in aortic regurgitation, aortic dissection." },
              { device: "Impella", desc: "Percutaneous LVAD: Archimedes screw pump placed across aortic valve (femoral artery). Provides 2.5-5.5 L/min flow. Direct LV unloading. Used in high-risk PCI, cardiogenic shock." },
              { device: "LVAD", desc: "Left ventricular assist device: continuous-flow axial or centrifugal pump. Bridge to transplant, destination therapy, or recovery. Requires anticoagulation. No pulsatile flow → MAP monitoring (no systolic/diastolic)." },
            ].map(d => (
              <div key={d.device} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{d.device}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "VV-ECMO: respiratory support only. VA-ECMO: cardiac + respiratory support (but risk of limb ischaemia, LV distension)",
        "Sweep gas controls CO₂ removal; membrane FiO₂ controls oxygenation",
        "Differential hypoxia (Harlequin syndrome): upper body hypoxic in VA-ECMO if native lung function poor + recovering LV",
        "IABP: inflates in diastole (↑ coronary perfusion), deflates in systole (↓ afterload). Contraindicated in AR/dissection",
        "ECMO anticoagulation: UFH targeting APTT 60-80s. Balance bleeding vs circuit thrombosis",
      ]} />
      <QuizSection questions={ecmoQuestions} />
      <ReferencesList topicId="ecmo" />
      <TopicCompletionToggle topicId="ecmo" topicTitle="ECMO &amp; Mechanical Circulatory Support" />
    </SectionLayout>
  );
};

export default ECMOTopic;
