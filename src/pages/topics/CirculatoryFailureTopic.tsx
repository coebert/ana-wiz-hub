import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { circulatoryFailureQuestions } from "@/data/quizzes";
import FluidResponsivenessDiagram from "@/components/diagrams/FluidResponsivenessDiagram";

const CirculatoryFailureTopic = () => {
  return (
    <SectionLayout title="Circulatory Failure & Shock" subtitle="FRCA Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Shock is defined as inadequate tissue oxygen delivery relative to metabolic demand, resulting in cellular dysfunction. Classification by mechanism guides diagnosis and treatment.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Classification of Shock</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Type</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                  <th className="text-left py-2 text-foreground font-semibold">CVP</th>
                  <th className="text-left py-2 text-foreground font-semibold">CO</th>
                  <th className="text-left py-2 text-foreground font-semibold">SVR</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Hypovolaemic</td><td>↓ Preload</td><td>↓</td><td>↓</td><td>↑</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cardiogenic</td><td>Pump failure</td><td>↑</td><td>↓↓</td><td>↑</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Distributive</td><td>↓ SVR (vasodilation)</td><td>↓/N</td><td>↑/N</td><td>↓↓</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Obstructive</td><td>↓ Venous return / outflow</td><td>↑</td><td>↓</td><td>↑</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Assessment of Fluid Responsiveness</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Static measures (CVP, PAOP) are poor predictors. Dynamic indices are more reliable:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Pulse pressure variation (PPV)</strong>: &gt;13% predicts fluid responsiveness (requires sinus rhythm, controlled ventilation, VT ≥8 ml/kg)</li>
            <li><strong>Stroke volume variation (SVV)</strong>: &gt;10-15% threshold</li>
            <li><strong>Passive leg raise (PLR)</strong>: Autotransfusion of ~300ml. ↑CO by ≥10% predicts responsiveness. Works in spontaneous breathing and arrhythmias.</li>
            <li><strong>Mini fluid challenge</strong>: 100ml crystalloid over 1 min; ↑VTI &gt;10%</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cardiogenic Shock</h2>
          <p className="text-muted-foreground leading-relaxed">
            Caused by acute MI, myocarditis, cardiomyopathy, valvular emergency. Management: early revascularisation (PCI for STEMI), inotropes (dobutamine, milrinone), vasopressors if needed (noradrenaline). Consider mechanical circulatory support (IABP, Impella, VA-ECMO) for refractory cases. Avoid excessive fluids (may worsen pulmonary oedema).
          </p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Classify shock by mechanism: hypovolaemic, cardiogenic, distributive, obstructive",
        "Dynamic indices (PPV, SVV, PLR) are superior to static measures (CVP) for fluid responsiveness",
        "Passive leg raise is the gold standard — works in spontaneous breathing and arrhythmias",
        "Cardiogenic shock: inotropes + vasopressors, avoid fluid overload, consider mechanical support",
        "Lactate clearance (>20% in 2h) is a useful target for resuscitation adequacy",
      ]} />

      <QuizSection questions={circulatoryFailureQuestions} />
      <TopicCompletionToggle topicId="circulatory-failure" topicTitle="Circulatory Failure &amp; Shock" />
    </SectionLayout>
  );
};

export default CirculatoryFailureTopic;
