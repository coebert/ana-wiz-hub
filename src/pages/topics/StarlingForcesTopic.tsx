import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { WorkedExample } from "@/components/WorkedExamples";
import { starlingForcesQuestions } from "@/data/quizzes";
import StarlingForcesDiagram from "@/components/diagrams/StarlingForcesDiagram";
import GlycocalyxDiagram from "@/components/diagrams/GlycocalyxDiagram";
import { DiagramSection } from "@/components/DiagramSection";
import { Exam } from "@/data/curriculum";

const starlingForcesFaqs: Array<[string, string]> = [
  [
    "State the Starling equation in its modern form.",
    "Jv = Kf × [(Pc − Pi) − σ(πp − πg)], where Jv = net filtration; Kf = filtration coefficient; Pc/Pi = capillary/interstitial hydrostatic pressure; πp/πg = plasma/subglycocalyx oncotic pressure; σ = reflection coefficient (1 = impermeable to protein, 0 = freely permeable). The endothelial glycocalyx is the true semi-permeable barrier — not the endothelial cell membrane (revised Starling principle, Levick & Michel 2010)."
  ],
  [
    "What is the endothelial glycocalyx and why is it clinically important?",
    "Gel-like layer of proteoglycans and glycoproteins on the luminal endothelial surface, ~0.5–1 µm thick. Excludes plasma proteins from contact with the endothelial barrier, generates the effective oncotic gradient, regulates leucocyte adhesion and coagulation. Damaged by sepsis, hyperglycaemia, ischaemia–reperfusion, atrial natriuretic peptide (released by fluid loading). Glycocalyx loss → capillary leak — explains why fluid overload worsens oedema."
  ],
  [
    "Why does hypoalbuminaemia cause oedema less than predicted by classical Starling?",
    "Compensatory mechanisms: increased lymphatic drainage, dilution of interstitial protein (reducing πi), and the glycocalyx-protected subglycocalyx space maintains a large oncotic gradient even at low plasma albumin. Oedema only becomes clinically apparent when these are overwhelmed (albumin typically <20 g/L plus increased capillary pressure or permeability)."
  ]
];

const objectives = [
  "State the Starling equation and define each term, including the reflection coefficient (σ).",
  "Contrast the classical (1896) Starling model with the revised Starling–Levick (2010) model.",
  "Describe the structure and functions of the endothelial glycocalyx and the consequences of its shedding.",
  "Explain context-sensitive volume kinetics and the rational use of crystalloid vs colloid in resuscitation.",
  "Apply Starling physiology to interstitial oedema, sepsis, and goal-directed fluid therapy.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Calculating net filtration in a normal capillary",
    scenario: (
      <>
        At the arteriolar end of a systemic capillary: Pc = 32 mmHg, Pi = −2 mmHg, πc = 25 mmHg, πsg ≈ 0
        mmHg, σ ≈ 0.9. Calculate the net filtration pressure under the revised Starling model.
      </>
    ),
    working: (
      <>
        <strong>NFP = (Pc − Pi) − σ(πc − πsg)</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Hydrostatic gradient = 32 − (−2) = <strong>+34 mmHg</strong> (out)</li>
          <li>Effective oncotic gradient = 0.9 × (25 − 0) = <strong>22.5 mmHg</strong> (in)</li>
          <li>NFP = 34 − 22.5 = <strong>+11.5 mmHg</strong> outward (filtration)</li>
        </ul>
        Crucially, in the revised model πsg ≈ 0 throughout the capillary length, so net filtration is
        positive even at the venular end — there is no reabsorption. Returned fluid leaves via lymphatics.
      </>
    ),
    answer: (
      <>
        Net outward filtration ≈ 11.5 mmHg. All filtered fluid (~8 L/day net of lymph return) must drain via
        lymphatics — explaining why lymphatic obstruction (post-axillary clearance, filariasis) causes oedema
        even with normal Starling forces.
      </>
    ),
    cites: ["Woodcock & Woodcock 2012"],
  },
  {
    title: "Why a 1 L crystalloid bolus in septic shock under-performs",
    scenario: (
      <>
        A 70 kg patient in septic shock receives a 1 L 0.9% saline bolus over 15 min. CVP rises by 1 mmHg
        and MAP by 5 mmHg, lasting 20 min. Why is the response so transient compared with the same bolus in
        a fasted hypovolaemic elective patient?
      </>
    ),
    working: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Sepsis sheds the glycocalyx (syndecan-1, heparan sulphate detectable in plasma) → ↑ Kf and ↓ σ →
            crystalloid filters into the interstitium more rapidly.
          </li>
          <li>
            Bolus raises CVP → atrial stretch releases ANP → directly cleaves glycocalyx → further increases
            permeability — a self-perpetuating cycle.
          </li>
          <li>
            In the fasted, normovolaemic-but-depleted elective patient: glycocalyx intact, Pc lower, σ
            preserved → much higher fraction stays intravascular for ~1 h.
          </li>
        </ul>
      </>
    ),
    answer: (
      <>
        In sepsis only a small fraction of the bolus (often cited as ~5%) may remain intravascular at 1 h; the rest
        becomes interstitial oedema. Use small (≤4 mL/kg) titrated boluses with dynamic monitoring, and start
        vasopressors early rather than chasing MAP with repeated crystalloid — consistent with the Surviving Sepsis
        Campaign 2021 recommendation to give an initial 30 mL/kg crystalloid over 3 h and then guide further fluids
        with dynamic measures.
      </>
    ),
    cites: ["Levick & Michel 2010", "Surviving Sepsis 2021", "Woodcock & Woodcock 2012"],
  },
];

const StarlingForcesTopic = () => {
  return (
    <TopicTemplate
      title="Starling Forces & Fluid Exchange"
      subtitle="FRCA Primary & Final — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="starling-forces"
      topicTitle="Starling Forces & Fluid Exchange"
      quizQuestions={starlingForcesQuestions}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["CR_BK_05"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["CR_BK_05", "OA_BK_06"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["Levick & Michel 2010", "Woodcock & Woodcock 2012"],
        workedExamples: ["Levick & Michel 2010", "Woodcock & Woodcock 2012", "SSC 2021"],
        keyPoints: ["Levick & Michel 2010", "Power & Kam Ch.6", "Woodcock & Woodcock 2012"],
      }}
      keyPoints={[
        { text: "Revised Starling model: glycocalyx is the barrier, not endothelial junctions — no venular reabsorption", cites: ["Power & Kam Ch.6"] },
        { text: "Fluid return depends entirely on lymphatic drainage, not reabsorption at the venular end", cites: ["Woodcock & Woodcock 2012"] },
        { text: "Sub-glycocalyx oncotic pressure (πsg) ≈ 0 in health — this is why colloids don't stay intravascular as long as predicted", cites: ["Levick & Michel 2010"] },
        { text: "Glycocalyx damage (sepsis, surgery, hypervolaemia) increases permeability and worsens oedema", cites: ["Power & Kam Ch.6"] },
        { text: "Context-sensitive volume kinetics: crystalloid is retained better in hypovolaemia (↓ Pc) than normovolaemia", cites: ["Woodcock & Woodcock 2012"] },
        { text: "ANP release from fluid overload directly damages glycocalyx — iatrogenic oedema is self-perpetuating", cites: ["Levick & Michel 2010"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_05"]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Transcapillary fluid exchange is governed by the balance of hydrostatic and oncotic pressures
              across the capillary wall. Ernest Starling's original 1896 hypothesis has been refined by the
              revised Starling–Levick model, which incorporates the glycocalyx layer as the primary barrier
              to protein filtration — fundamentally changing our understanding of fluid therapy.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="equation" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_05"]}>
            <CollapsibleSubsection title="The Starling Equation">
            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-mono text-sm text-foreground text-center mb-3">
                Jv = Kf × [(Pc − Pi) − σ(πc − πi)]
              </p>
              <div className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div><strong>Jv</strong> = net fluid movement (positive = filtration)</div>
                <div><strong>Kf</strong> = filtration coefficient (permeability × surface area)</div>
                <div><strong>Pc</strong> = capillary hydrostatic pressure</div>
                <div><strong>Pi</strong> = interstitial hydrostatic pressure</div>
                <div><strong>σ</strong> = reflection coefficient (0–1; 1 = impermeable to protein)</div>
                <div><strong>πc</strong> = capillary oncotic pressure</div>
                <div><strong>πi</strong> = interstitial oncotic pressure</div>
              </div>
            </div>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <StarlingForcesDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="classic-vs-revised" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_05"]}>
            <CollapsibleSubsection title="Classic vs Revised Model">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                    <th className="text-left py-2 text-foreground font-semibold">Classic (1896)</th>
                    <th className="text-left py-2 text-foreground font-semibold">Revised (Levick & Michel, 2010)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Barrier</td>
                    <td>Endothelial cell junctions</td>
                    <td>Endothelial glycocalyx layer</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Venular reabsorption</td>
                    <td>Yes — fluid reabsorbed at venular end</td>
                    <td>No — filtration occurs along entire length</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">πi in equation</td>
                    <td>Interstitial oncotic pressure</td>
                    <td>Sub-glycocalyx oncotic pressure (πsg ≈ 0)</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-foreground">Fluid return</td>
                    <td>Venular reabsorption + lymphatics</td>
                    <td>Lymphatic drainage only</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="glycocalyx" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_06"]}>
            <CollapsibleSubsection title="The Endothelial Glycocalyx">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>A gel-like layer on the luminal surface of endothelial cells: ~0.5–1 µm thick in capillaries, up to ~4 µm in larger arteries</li>
              <li>Composed of proteoglycans, glycosaminoglycans (heparan sulphate, hyaluronic acid), and glycoproteins</li>
              <li>Acts as a <strong>molecular sieve</strong> — excludes plasma proteins, creating a protein-free sub-glycocalyx space</li>
              <li>Functions: vascular permeability barrier, mechanotransduction (shear stress), anti-inflammatory, anticoagulant</li>
              <li><strong>Damaged by</strong>: sepsis, ischaemia-reperfusion, hyperglycaemia, surgery, excessive IV fluid (particularly &gt;2L crystalloid bolus)</li>
              <li>Damage releases syndecan-1 and heparan sulphate into plasma (measurable biomarkers)</li>
              <li>Glycocalyx shedding → ↑ permeability → ↑ interstitial protein → oedema (explains why crystalloid boluses in sepsis are poorly retained)</li>
            </ul>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <GlycocalyxDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="fluid-therapy" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_06"]}>
            <CollapsibleSubsection title="Clinical Implications for Fluid Therapy">
            <div className="space-y-3">
              {[
                { title: "Colloid vs Crystalloid Debate", desc: "The revised model explains why colloids don't stay intravascular as long as predicted by the classic model. With an intact glycocalyx, both crystalloid and colloid filtrate at similar rates. In glycocalyx damage (sepsis), colloid advantage is further diminished." },
                { title: "Context-Sensitive Volume Kinetics", desc: "Hypovolaemia reduces Pc → reduces filtration → crystalloid stays intravascular longer. Normovolaemia has higher Pc → faster filtration → bolus poorly retained. This is why fluid resuscitation is more effective in the depleted patient." },
                { title: "Hypervolaemia and ANP", desc: "Volume expansion triggers ANP release → directly damages glycocalyx → ↑ permeability → fluid shifts to interstitium → oedema. Iatrogenic fluid overload is self-perpetuating." },
                { title: "Goal-Directed Fluid Therapy", desc: "Titrated small boluses (3-4 mL/kg) with dynamic monitoring avoid glycocalyx damage from excessive administration. The 'fluid challenge' approach respects Starling physiology." },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="oedema" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_05"]}>
            <CollapsibleSubsection title="Oedema Formation">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Oedema occurs when the rate of capillary filtration exceeds lymphatic drainage capacity. Under the revised
              Starling–Levick model, the principal safety factors against oedema are:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Rising interstitial hydrostatic pressure</strong>: as fluid accumulates, Pi rises and reduces the outward filtration gradient (Pc − Pi)</li>
              <li><strong>Substantial lymphatic reserve</strong>: lymph flow can increase ~10–50× before being overwhelmed</li>
              <li><strong>Preserved sub-glycocalyx oncotic gradient</strong>: an intact glycocalyx keeps πsg low, sustaining the effective oncotic pull σ(πc − πsg)</li>
              <li>Estimated total safety factor ≈ 17 mmHg — Pc must rise by approximately this amount before clinical oedema develops</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>Glycocalyx is fragile</strong>: damaged by hypervolaemia, sepsis, ischaemia–reperfusion and surgical inflammation — drives capillary leak.</>,
              <><strong>Albumin's oncotic pull</strong> is overstated by the classic equation — the revised model emphasises the subglycocalyx space, hence "less is more" with crystalloid.</>,
              <><strong>Pulmonary oedema</strong>: low protein interstitium + high pulmonary lymphatic capacity → larger Pc safety margin than systemic capillaries, but once breached deteriorates rapidly.</>,
              <><strong>Hypoalbuminaemia</strong> alone rarely causes oedema unless other Starling forces are deranged.</>,
              <><strong>Goal-directed fluid therapy</strong> minimises both hypovolaemia and the glycocalyx injury of over-resuscitation.</>,
            ]}
          />
          <TopicFaqs faqs={starlingForcesFaqs} />

        </>
      }
    />
  );
};

export default StarlingForcesTopic;
