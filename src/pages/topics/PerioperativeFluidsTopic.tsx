import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { ExamSection } from "@/components/exam/ExamSection";
import { perioperativeFluidsQuestions } from "@/data/quizzes";
import { DiagramSection } from "@/components/topic/DiagramSection";
import GlycocalyxDiagram from "@/components/diagrams/physiology/GlycocalyxDiagram";
import { GlycocalyxSheddingCascadeDiagram } from "@/components/diagrams/perioperative/GlycocalyxSheddingCascadeDiagram";
import { Exam } from "@/data/curriculum";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";

const tocItems = [
  { id: "section-fluid-compartments", label: "Fluid Compartments", group: "Core" },
  { id: "section-gdft", label: "Goal-Directed Fluid Therapy", group: "Core" },
  { id: "section-glycocalyx", label: "Glycocalyx & Revised Starling", group: "Core" },
  { id: "section-key-fluid-trials", label: "Key Fluid Trials", group: "Evidence" },
];

const perioperativeFluidsFaqs: Array<[string, string]> = [
  ["Why are balanced crystalloids preferred over 0.9% saline for perioperative resuscitation?", "Large volumes of 0.9% saline cause hyperchloraemic metabolic acidosis and are associated with increased acute kidney injury and adverse renal events (SMART, SALT-ED). Balanced crystalloids (Hartmann's, Plasma-Lyte) have a more physiological chloride content."],
  ["How is fluid responsiveness assessed in a mechanically ventilated patient?", "With dynamic indices such as stroke volume variation or pulse pressure variation >12–13%, in sinus rhythm with tidal volume ≥8 mL/kg; if these conditions are not met, use a passive leg-raise manoeuvre or a 250 mL fluid challenge with stroke-volume reassessment."],
  ["When are starch-based colloids contraindicated?", "Hydroxyethyl starches should be avoided in sepsis and critical illness (CHEST, 6S — increased AKI and mortality) and are not licensed for ICU use in the UK or EU."],
];

const PerioperativeFluidsTopic = () => {
  return (
    <TopicTemplate
      title="Perioperative Fluid Therapy"
      subtitle="FRCA / FFICM — Perioperative Medicine"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-perioperative"
      topicId="perioperative-fluids"
      quizQuestions={perioperativeFluidsQuestions}
      objectives={[
        "Describe body fluid compartments and the distribution of crystalloids and colloids.",
        "Compare common IV fluids by composition and clinical effect.",
        "Apply goal-directed fluid therapy principles using stroke volume and dynamic indices.",
        "Explain the revised Starling equation and the role of the endothelial glycocalyx.",
        "Use major trial evidence (SMART, RELIEF, BaSICS) to choose a fluid strategy.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["PO_BK_06"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["NICE CG174", "BJA Educ 2017"],
        workedExamples: ["BJA Educ 2019", "NICE CG174", "SMART 2018", "RELIEF 2018", "BJA Educ GDFT 2016"],
        keyPoints: ["BJA Educ 2017", "NICE CG174", "BJA Educ 2019", "SMART 2018", "BJA Educ GDFT 2016", "RELIEF 2018", "Chappell 2019 (Glycocalyx)"],
      }}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />
          <ExamSection id="section-fluid-compartments" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]}>
            <CollapsibleSubsection title="Fluid Compartments" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Total body water (TBW) = ~60% body weight. ICF 40%, ECF 20% (interstitial 15%, plasma 5%). Only 25% of crystalloid remains intravascular — the rest distributes to the interstitium.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Fluid</th>
                    <th className="text-left py-2 text-foreground font-semibold">Na⁺ (mmol/L)</th>
                    <th className="text-left py-2 text-foreground font-semibold">Cl⁻ (mmol/L)</th>
                    <th className="text-left py-2 text-foreground font-semibold">Osmolality</th>
                    <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">0.9% NaCl</td><td>154</td><td>154</td><td>308</td><td>Hyperchloraemic acidosis. Not "normal".</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Hartmann's</td><td>131</td><td>111</td><td>278</td><td>Contains lactate 29 mmol/L (metabolised to HCO₃⁻). Balanced.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Plasmalyte</td><td>140</td><td>98</td><td>294</td><td>Most physiological. Acetate + gluconate as buffers.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">5% Albumin</td><td>148</td><td>128</td><td>300</td><td>Colloid. Better intravascular expansion. SAFE trial: equivalent to saline in general ICU.</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-gdft" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]}>
            <CollapsibleSubsection title="Goal-Directed Fluid Therapy (GDFT)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Individualised fluid administration guided by haemodynamic monitoring to optimise stroke volume and tissue oxygen delivery. Reduces complications after major surgery.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Stroke Volume Optimisation</p>
                <p className="text-sm text-muted-foreground mt-1">250 ml fluid challenges. Measure SV response with oesophageal Doppler, LiDCO, or FloTrac. If SV rises by ≥10% → fluid responsive → repeat. If {'<'}10% → stop fluids.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Dynamic Parameters</p>
                <p className="text-sm text-muted-foreground mt-1">PPV, SVV (arterial waveform analysis). Reliable only in sinus rhythm + controlled ventilation + VT ≥8 ml/kg. PLR test for spontaneous breathing.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-glycocalyx" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Glycocalyx & Revised Starling">
            <DiagramSection
              title="Glycocalyx — Intact vs Shed"
              intro={<p>Cross-section of the endothelial surface layer (ESL): proteoglycan / GAG mesh that excludes plasma proteins, and the consequences of its shedding by ANP, inflammation and crystalloid overload.</p>}
            >
              <GlycocalyxDiagram />
            </DiagramSection>
            <GlycocalyxSheddingCascadeDiagram />
            <p className="text-muted-foreground leading-relaxed mb-3 mt-4">
              The endothelial glycocalyx is a carbohydrate-rich layer lining the vascular endothelium. It regulates vascular permeability, prevents leucocyte adhesion, and modulates coagulation.
            </p>
            <div className="p-4 rounded-lg border border-border mb-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Revised Starling:</strong> Fluid filtration occurs across the glycocalyx, not at the capillary level. The sub-glycocalyx oncotic pressure (not interstitial) opposes filtration. There is no venous reabsorption in most tissues — lymphatic drainage returns filtered fluid.
                <br /><br />
                <strong className="text-foreground">Clinical implication:</strong> Fluid overload, inflammation, ANP, and surgical stress damage the glycocalyx → increased permeability → oedema. Avoid hypervolaemia — it sheds the glycocalyx via ANP release.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-key-fluid-trials" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Key Fluid Trials">
            <div className="space-y-2">
              {[
                { trial: "SAFE (2004)", result: "4% albumin vs 0.9% NaCl in ICU — no difference in 28-day mortality. Albumin harmful in TBI (SAFE-TBI subgroup)." },
                { trial: "SPLIT (2015)", result: "Balanced crystalloid (Plasmalyte) vs 0.9% NaCl in ICU — no difference in AKI. But underpowered." },
                { trial: "SMART (2018)", result: "Balanced crystalloids vs 0.9% NaCl — balanced crystalloids reduced composite of death, new RRT, or persistent renal dysfunction (MAKE30)." },
                { trial: "BaSICS (2021)", result: "Balanced vs saline AND slow vs fast infusion in ICU — no difference in 90-day mortality." },
                { trial: "RELIEF (2018)", result: "Restrictive vs liberal IV fluid regimen in major abdominal surgery — restrictive increased AKI. Liberal (but not excessive) approach preferred." },
              ].map((t) => (
                <div key={t.trial} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{t.trial}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.result}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Balanced crystalloids (Plasma-Lyte, Hartmann's) preferred over 0.9% saline — large volumes of saline cause hyperchloraemic acidosis and AKI (SMART, SALT-ED).",
              'Avoid HES/starch colloids in critically ill and septic patients (CHEST, 6S) — increased AKI and mortality.',
              'Maintenance: 1–2 mL/kg/h in adults; 4-2-1 rule in paediatrics with isotonic fluid (NICE CG174) — hypotonic fluids cause hyponatraemia.',
              'Goal-directed fluid therapy using dynamic indices (SVV, PPV, stroke-volume response) outperforms CVP — CVP is a poor predictor of fluid responsiveness.',
              'Restrictive vs liberal: RELIEF trial showed restrictive regimens increase AKI — aim for zero-balance / modestly positive intraoperatively.',
              'Albumin 4–5% reasonable for cirrhotic SBP and large-volume paracentesis; avoid in TBI (SAFE — increased mortality).',
            ]}
          />
          <TopicFaqs faqs={perioperativeFluidsFaqs} />
        </>
      }
      workedExamples={[
        {
          title: "Fluid challenge in a hypotensive post-op patient",
          scenario: "A 70 kg man, day 1 after major colorectal surgery, is hypotensive (MAP 58 mmHg), HR 105, urine output 0.3 ml/kg/h. Lactate 3.1. He is in sinus rhythm and ventilated VT 8 ml/kg.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Assess fluid responsiveness using a dynamic index — PPV/SVV from arterial line. PPV &gt;13% suggests responsiveness.</li>
                <li>Give a 250 ml balanced crystalloid (Hartmann's/Plasmalyte) bolus over &lt;10 min — avoid 0.9% NaCl (SMART: ↑MAKE30).</li>
                <li>Reassess SV/MAP/lactate after 10–15 min. If SV rises ≥10% → responsive → repeat. If &lt;10% → stop fluids; consider noradrenaline.</li>
                <li>Aim for cumulative balance avoiding excess (RELIEF: overly restrictive ↑AKI; overly liberal ↑ileus, oedema).</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>PPV/SVV unreliable in spontaneous breathing, AF, or VT &lt;8 ml/kg — use PLR instead.</li>
                  <li>Repeated 0.9% NaCl boluses → hyperchloraemic acidosis, masking true lactate trend.</li>
                  <li>Chasing CVP — static pressures poorly predict fluid responsiveness.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Balanced crystalloid 250 ml challenge guided by SV/PPV; switch to noradrenaline once not fluid-responsive.",
          cites: ["SMART 2018", "RELIEF 2018", "BJA Educ GDFT 2016"],
        },
      ]}
      keyPoints={[
        { text: "Only 25% of crystalloid stays intravascular — colloids have better volume expansion", cites: ["BJA Educ 2017"] },
        { text: "0.9% NaCl causes hyperchloraemic acidosis — balanced crystalloids preferred (SMART trial)", cites: ["SMART 2018", "NICE CG174"] },
        { text: "GDFT: SV optimisation with 250ml challenges — stop when SV rise <10%", cites: ["BJA Educ GDFT 2016"] },
        { text: "Glycocalyx damage (inflammation, hypervolaemia, ANP) increases vascular permeability", cites: ["BJA Educ 2017"] },
        { text: "RELIEF trial: overly restrictive fluids increase AKI — aim for individualised, goal-directed approach", cites: ["RELIEF 2018"] },
      
      ]}
    />
  );
};

export default PerioperativeFluidsTopic;
