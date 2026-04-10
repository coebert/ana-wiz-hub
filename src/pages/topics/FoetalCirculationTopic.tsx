import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { foetalCirculationQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import FoetalCirculationDiagram from "@/components/diagrams/FoetalCirculationDiagram";

const FoetalCirculationTopic = () => {
  return (
    <SectionLayout title="Foetal Circulation" subtitle="FRCA Primary & Final — Physiology" backPath="/physiology" backLabel="Physiology" accentColor="text-physiology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            The foetal circulation is uniquely designed to bypass the non-functioning lungs, directing oxygenated blood from the placenta to the systemic circulation via three key shunts. Understanding these pathways and their closure at birth is essential for managing neonatal physiology and congenital heart disease.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Three Foetal Shunts</h2>
          <div className="space-y-3">
            {[
              {
                name: "Ductus Venosus",
                desc: "Connects the umbilical vein to the IVC, bypassing the hepatic sinusoids. Carries ~50% of well-oxygenated umbilical venous blood directly to the heart. Closes functionally within minutes of birth (ligamentum venosum).",
              },
              {
                name: "Foramen Ovale",
                desc: "A flap valve between right and left atria. Allows oxygenated IVC blood to pass directly to the LA, bypassing the pulmonary circulation. Stays open due to higher RA pressure. Functionally closes when LA pressure exceeds RA pressure after first breath. Anatomically closes by 3–12 months (probe-patent in ~25% of adults — PFO).",
              },
              {
                name: "Ductus Arteriosus",
                desc: "Connects the pulmonary artery to the descending aorta. Diverts ~90% of RV output away from the high-resistance pulmonary vasculature into the systemic circulation. Kept open by prostaglandins (PGE₂) and low PaO₂. Closes functionally within 10–15 hours of birth (↑ PaO₂ + ↓ PGE₂). Anatomically closes by 2–3 weeks (ligamentum arteriosum).",
              },
            ].map((shunt) => (
              <div key={shunt.name} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{shunt.name}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{shunt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Foetal Blood Flow Pathway</h2>
          <div className="p-4 rounded-lg border border-border bg-secondary/20">
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside leading-relaxed">
              <li>Oxygenated blood from the <strong>placenta</strong> travels via the <strong>umbilical vein</strong> (SpO₂ ~80%)</li>
              <li>~50% passes through the <strong>ductus venosus</strong> to the IVC; ~50% perfuses the liver</li>
              <li>IVC blood (mixed, SpO₂ ~67%) enters the <strong>right atrium</strong></li>
              <li>Oxygenated stream preferentially crosses the <strong>foramen ovale</strong> to the <strong>left atrium</strong> → LV → ascending aorta → brain and coronaries (SpO₂ ~65%)</li>
              <li>Deoxygenated SVC blood enters the RA → RV → pulmonary artery</li>
              <li>~90% of PA blood shunts through the <strong>ductus arteriosus</strong> → descending aorta → placenta via umbilical arteries</li>
              <li>Only ~10% of RV output passes through the lungs (high PVR)</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Foetal Oxygen Delivery</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Umbilical Vein PaO₂", value: "~4.0 kPa (30 mmHg) — much lower than adult arterial" },
              { label: "Foetal Haemoglobin (HbF)", value: "Left-shifted ODC (P50 ~2.7 kPa vs 3.5 kPa adult) → higher O₂ affinity" },
              { label: "Foetal Hb Concentration", value: "~180 g/L — compensates for lower PaO₂" },
              { label: "Cardiac Output", value: "~450 mL/kg/min (combined ventricular) — much higher than adult per kg" },
              { label: "2,3-DPG Effect", value: "HbF binds 2,3-DPG poorly → maintains left-shifted curve" },
              { label: "Double Bohr Effect", value: "CO₂ transfer to maternal blood shifts maternal ODC right + foetal ODC left simultaneously" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Transitional Circulation at Birth</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>First breath</strong>: alveolar expansion → dramatic ↓ PVR (8–10×) → ↑ pulmonary blood flow</li>
            <li><strong>Cord clamping</strong>: removes low-resistance placental circuit → ↑ SVR</li>
            <li><strong>LA pressure rises</strong> above RA pressure → <strong>foramen ovale closes</strong> (functional)</li>
            <li><strong>↑ PaO₂ + ↓ PGE₂</strong> → smooth muscle constriction → <strong>ductus arteriosus closes</strong> (10–15 hours)</li>
            <li><strong>Ductus venosus</strong> closes as umbilical venous flow ceases</li>
            <li>Transition from <strong>parallel circulation</strong> (two ventricles in parallel) to <strong>series circulation</strong> (adult pattern)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Persistent Foetal Circulation (PPHN)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Failure of the normal transitional changes leads to persistent pulmonary hypertension of the newborn (PPHN):
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>Persistent high PVR → right-to-left shunting through PDA and/or PFO</li>
            <li>Causes: meconium aspiration, sepsis, congenital diaphragmatic hernia, lung hypoplasia</li>
            <li>Pre- vs post-ductal SpO₂ difference &gt;5% suggests PDA shunting</li>
            <li>Management: optimise oxygenation and ventilation, inhaled nitric oxide (iNO), correct acidosis, consider ECMO</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pharmacological Manipulation</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Keep PDA Open", value: "PGE₁ (alprostadil) infusion — duct-dependent congenital heart disease (e.g., TGA, critical coarctation)" },
              { label: "Close PDA", value: "Indomethacin or ibuprofen (COX inhibitors) — premature infant with symptomatic PDA" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Three foetal shunts: ductus venosus, foramen ovale, ductus arteriosus — all bypass the lungs",
        "HbF has higher O₂ affinity (P50 2.7 kPa) — left-shifted ODC aids placental O₂ uptake",
        "The double Bohr effect enhances O₂ transfer: maternal curve shifts right as foetal shifts left",
        "First breath ↓ PVR dramatically; cord clamping ↑ SVR → parallel → series circulation",
        "Ductus arteriosus closes with ↑ PaO₂ and ↓ PGE₂; PGE₁ keeps it open in duct-dependent lesions",
        "Pre-post ductal SpO₂ gradient >5% suggests persistent right-to-left ductal shunting",
      ]} />

      <QuizSection questions={foetalCirculationQuestions} />
      <ReferencesList topicId="foetal-circulation" />

      <SeeAlso topicId="foetal-circulation" />
        <TopicCompletionToggle topicId="foetal-circulation" topicTitle="Foetal Circulation" />
    </SectionLayout>
  );
};

export default FoetalCirculationTopic;
