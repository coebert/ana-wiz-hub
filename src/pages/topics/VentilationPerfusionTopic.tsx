import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ventilationPerfusionQuestions } from "@/data/quizzes";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Exam } from "@/data/curriculum";
import { WestZonesDiagram } from "@/components/diagrams/physiology/WestZonesDiagram";
import { InlineRef } from "@/components/references/InlineRef";

const ventilationPerfusionFaqs: Array<[string, string]> = [
  [
    "What are the West zones of the lung?",
    "Zone 1 (apex) — alveolar pressure > arterial > venous; no flow (alveolar dead space). Zone 2 — arterial > alveolar > venous; flow driven by arterial − alveolar pressure ('waterfall'). Zone 3 (base) — arterial > venous > alveolar; flow driven by arterial − venous (continuous). Zone 1 normally absent but appears with hypotension, PEEP overshoot, or PE."
  ],
  [
    "Define shunt and V/Q mismatch, and how does 100 % oxygen distinguish them?",
    "Shunt — perfused but not ventilated (V/Q = 0); blood bypasses gas exchange entirely (pneumonia, atelectasis, ARDS, intracardiac). 100 % O₂ does NOT correct shunt (>30 % shunt: PaO₂ ceiling). V/Q mismatch — areas of low V/Q ratio; partial gas exchange occurs; 100 % O₂ corrects hypoxaemia by filling poorly ventilated alveoli with O₂. Differentiating the two guides therapy (PEEP/recruitment for shunt vs bronchodilators for mismatch)."
  ],
  [
    "What is hypoxic pulmonary vasoconstriction and why does it matter for one-lung ventilation?",
    "HPV — pulmonary arteriolar constriction in response to low alveolar O₂; diverts blood from poorly ventilated alveoli to better-ventilated regions, reducing shunt. Volatile anaesthetics ≥1 MAC blunt HPV (~20 % attenuation). For one-lung ventilation during thoracic surgery, TIVA preserves HPV better and may improve oxygenation; CPAP to the non-ventilated lung or PEEP to the dependent lung are rescue strategies."
  ]
];

const objectives = [
  "Describe the regional V/Q distribution from apex to base in the upright lung.",
  "Define West's zones and predict their behaviour with PEEP and shock.",
  "Distinguish anatomical, alveolar and physiological dead space; derive the Bohr equation.",
  "Derive the shunt equation and explain why true shunt is refractory to supplemental O₂.",
  "Explain hypoxic pulmonary vasoconstriction and the agents that inhibit it.",
  "Describe the central and peripheral control of ventilation and the chemoreceptor response curves.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Calculating shunt fraction in ARDS",
    scenario: (
      <p>
        FiO₂ 1.0, PaO₂ 9 kPa (67 mmHg), Hb 100 g/L. Assume PAO₂ 90 kPa, mixed venous SO₂ 65%.
        Calculate the shunt fraction.
      </p>
    ),
    working: (
      <ul className="list-disc pl-5 space-y-1">
        <li>CcO₂ ≈ Hb × 1.34 × 1.0 + 0.023 × 90 / 7.5 = 13.4 + 0.28 ≈ <strong>13.68 mL/dL</strong>.</li>
        <li>CaO₂ ≈ Hb × 1.34 × ~0.90 = <strong>12.06 mL/dL</strong> (PaO₂ 9 kPa → SaO₂ ~90%).</li>
        <li>CvO₂ ≈ Hb × 1.34 × 0.65 = <strong>8.71 mL/dL</strong>.</li>
        <li>Qs/Qt = (CcO₂ − CaO₂) / (CcO₂ − CvO₂) = (13.68 − 12.06) / (13.68 − 8.71) = 1.62 / 4.97 ≈ <strong>33%</strong>.</li>
      </ul>
    ),
    answer: (
      <p>
        Shunt &gt;30% = refractory hypoxaemia. Increasing FiO₂ further is futile — recruit (PEEP, prone),
        consider neuromuscular blockade and ECMO referral.
      </p>
    ),
    cites: ["BJA Educ 2018"],
  },
  {
    title: "Bohr dead space in suspected PE",
    scenario: (
      <p>
        Vt 500 mL, RR 14, EtCO₂ 2.5 kPa, PaCO₂ 5.5 kPa. Estimate physiological dead space and
        comment on the EtCO₂–PaCO₂ gap.
      </p>
    ),
    working: (
      <ul className="list-disc pl-5 space-y-1">
        <li>VD/VT (Enghoff) ≈ (PaCO₂ − PĒCO₂)/PaCO₂. Using EtCO₂ as a proxy: (5.5 − 2.5)/5.5 = <strong>0.55</strong>.</li>
        <li>Physiological VD ≈ 0.55 × 500 = <strong>275 mL</strong> (vs normal 150 mL).</li>
        <li>EtCO₂–PaCO₂ gap = 3.0 kPa (normal &lt;0.7 kPa) — strongly suggests alveolar dead space.</li>
      </ul>
    ),
    answer: <p>Markedly raised dead-space fraction with widened gap → urgent CTPA for PE.</p>,
    cites: ["Nunn Ch.8"],
  },
  {
    title: "One-lung ventilation — preserving HPV",
    scenario: (
      <p>
        Patient for right thoracotomy. Pre-induction SpO₂ 99% on air. Five minutes after collapse of the right
        lung on FiO₂ 0.5 / sevoflurane 1.5%, SpO₂ falls to 89%. What is happening and what helps?
      </p>
    ),
    working: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Collapsed lung still perfused → true shunt.</li>
        <li>HPV normally diverts 50% of flow away within minutes; sevoflurane &gt;1 MAC blunts HPV.</li>
        <li>Strategies: ↑FiO₂ (limit by absorption atelectasis), CPAP to non-ventilated lung, PEEP to ventilated lung,
            switch to TIVA, ensure DLT position.</li>
      </ul>
    ),
    answer: (
      <p>
        Inhibited HPV is contributing. Switch to TIVA, recruit and apply 5 cmH₂O PEEP to the dependent lung,
        2–5 cmH₂O CPAP to the operative lung if surgery permits.
      </p>
    ),
    cites: ["West Ch.5"],
  },
];

const VentilationPerfusionTopic = () => {
  return (
    <TopicTemplate
      title="Ventilation-Perfusion & Gas Exchange"
      subtitle="FRCA Primary & Final — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="ventilation-perfusion"
      topicTitle="Ventilation-Perfusion & Gas Exchange"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={ventilationPerfusionQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RC_BK_02"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["RC_BK_02", "RC_BK_03"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RC_BK_02"] },
      }}
      sectionSources={{
        objectives: [
          "West Ch.5",
          "Nunn Ch.8",
          "BJA Educ 2018",
        ],
        keyPoints: [
          "West Ch.5",
          "Nunn Ch.8",
          "BJA Educ 2018",
        ],
        workedExamples: ["BJA Educ 2018", "Nunn Ch.8", "West Ch.5"],
      }}
      keyPoints={[
        { text: "Normal V̇/Q̇ ≈ 0.8. Apex has highest V/Q (~3.3, dead space-like), base has lowest (~0.6, shunt-like)", cites: ["BJA Educ 2018"] },
        { text: "West's Zones: Zone 1 (PA > Pa > Pv) — dead space; Zone 3 (Pa > Pv > PA) — continuous flow", cites: ["Nunn Ch.8"] },
        { text: "Dead space measured by Bohr equation: VD/VT = (PaCO₂ − PĒCO₂)/PaCO₂. Normal ~30%", cites: ["West Ch.5"] },
        { text: "True shunt does NOT respond to supplemental O₂. At >30% shunt, ↑ FiO₂ has minimal effect on PaO₂", cites: ["BJA Educ 2018"] },
        { text: "HPV diverts blood from hypoxic alveoli — inhibited by volatiles, vasodilators, sepsis", cites: ["Nunn Ch.8"] },
        { text: "Central chemoreceptors (CO₂ via H⁺) are the main ventilatory drive; peripheral chemoreceptors detect hypoxia", cites: ["West Ch.5"] },
      ]}
      coreConcepts={
        <>
        <section className="space-y-6">
          <ExamSection id="vq-matching" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_02"]}>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">V/Q Matching</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Ideal gas exchange requires matched ventilation (V̇) and perfusion (Q̇). Normal overall V̇/Q̇ ≈ 0.8 (V̇ ~4 L/min, Q̇ ~5 L/min). V/Q ratio varies from apex to base in the upright lung due to gravity.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead><tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Region</th>
                    <th className="text-left py-2 text-foreground font-semibold">V̇/Q̇</th>
                    <th className="text-left py-2 text-foreground font-semibold">PaO₂</th>
                    <th className="text-left py-2 text-foreground font-semibold">PaCO₂</th>
                    <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                  </tr></thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Apex (Zone 1)</td><td>~3.3</td><td>~132 mmHg</td><td>~28 mmHg</td><td>High V/Q: over-ventilated, under-perfused → wasted ventilation (dead space)</td></tr>
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Mid zone</td><td>~0.8</td><td>~100 mmHg</td><td>~40 mmHg</td><td>Optimal matching</td></tr>
                    <tr><td className="py-2 font-medium text-foreground">Base (Zone 3)</td><td>~0.6</td><td>~89 mmHg</td><td>~42 mmHg</td><td>Low V/Q: under-ventilated, over-perfused → venous admixture</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-5 rounded-lg border border-border p-4">
                <h3 className="font-serif font-semibold text-foreground">Measuring V/Q mismatch</h3>
                <p className="mt-2 text-sm text-foreground/85 leading-relaxed">Direct measurement is complex and remains largely a research technique; at the bedside V/Q mismatch is inferred rather than measured.</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                  <li><strong>MIGET (multiple inert gas elimination technique)</strong>: an infusion of six inert gases of widely differing blood solubility (e.g. SF₆, ethane, cyclopropane, enflurane, ether, acetone) reaches steady state, then arterial, mixed venous and expired concentrations are measured. Poorly soluble gases are excreted almost entirely from high-V/Q units, while highly soluble gases are retained in low-V/Q units, so the pattern of retention and excretion can be inverted mathematically into a continuous distribution of blood flow and ventilation against V/Q ratio, including true shunt and true dead space. It is the gold standard but is invasive, slow and confined to research <InlineRef topicId="ventilation-perfusion" refLabel="West Ch.5" /></li>
                  <li><strong>Clinical surrogates</strong>: the PaO₂ response to supplemental oxygen (mismatch corrects, true shunt does not), the A–a gradient and PaO₂/FiO₂ ratio, the shunt fraction from the shunt equation, the arterial-to-end-tidal CO₂ gradient for alveolar dead space, and imaging or electrical impedance tomography for regional distribution.</li>
                </ul>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="west-zones" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_02"]}>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">West's Zones</h2>
              <div className="mb-4 p-4 rounded-lg border border-border bg-muted/30">
                <WestZonesDiagram />
              </div>
              <div className="space-y-3">
                {[
                  { zone: "Zone 1", eq: "PA > Pa > Pv", desc: "Alveolar pressure exceeds arterial. No flow in diastole. Normally absent in health but occurs with ↓ CO, ↑ PEEP, haemorrhage. Dead space ventilation." },
                  { zone: "Zone 2", eq: "Pa > PA > Pv", desc: "Flow determined by arterial-alveolar pressure difference ('Starling resistor'). Pulsatile, intermittent flow. PA catheter tip should be here." },
                  { zone: "Zone 3", eq: "Pa > Pv > PA", desc: "Continuous flow determined by arterio-venous gradient. Most of the lung in normal conditions. Recruitment increases Zone 3 area." },
                  { zone: "Zone 4", eq: "Pa > Pi > Pv > PA", desc: "Interstitial pressure compresses extra-alveolar vessels at the base. Seen with pulmonary oedema or very low lung volumes." },
                ].map(z => (
                  <div key={z.zone} className="p-4 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{z.zone} <span className="font-mono text-xs text-muted-foreground ml-2">{z.eq}</span></p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{z.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ExamSection>

          <ExamSection id="dead-space" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_02"]}>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Dead Space</h2>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                <li><strong>Anatomical</strong>: conducting airways (~150 mL). Measured by Fowler's method (N₂ washout)</li>
                <li><strong>Alveolar</strong>: ventilated but unperfused alveoli (V/Q = ∞). Normally ~negligible</li>
                <li><strong>Physiological</strong> = anatomical + alveolar dead space</li>
                <li>Increased by: ↓ CO, PE, excessive PEEP, anaesthesia (↓ FRC), ageing</li>
              </ul>
              <div className="mt-4 rounded-lg border border-border p-4 text-sm text-foreground/85">
                <h3 className="font-semibold text-foreground">Fowler’s single-breath nitrogen washout</h3>
                <ol className="mt-2 list-decimal pl-5 space-y-1"><li>The subject takes one vital-capacity breath of 100% O₂, replacing N₂ in the conducting airways.</li><li>Slow expiration is measured simultaneously for volume and nitrogen concentration.</li><li><strong>Phase I:</strong> N₂-free anatomical dead-space gas; <strong>Phase II:</strong> rapid rise as dead-space and alveolar gas mix; <strong>Phase III:</strong> alveolar plateau.</li><li>An equal-area line through phase II is positioned so the areas above and below the curve are equal; exhaled volume to that line is anatomical dead space.</li></ol>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="alveolar-gas-equation" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_02"]}>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Alveolar Gas Equation and A–a Gradient</h2>
              <div className="rounded-lg border border-border bg-secondary/20 p-4 text-center font-mono text-sm text-foreground">P<sub>A</sub>O₂ = FiO₂ × (P<sub>atm</sub> − P<sub>H₂O</sub>) − (PaCO₂ / R)</div>
              <p className="mt-3 text-sm text-foreground/85">At sea level, P<sub>atm</sub> is 760 mmHg, saturated water-vapour pressure at 37°C is 47 mmHg, and respiratory quotient R is usually 0.8. On air (FiO₂ 0.21) with PaCO₂ 40 mmHg: P<sub>A</sub>O₂ = 0.21 × (760 − 47) − 40/0.8 ≈ <strong>100 mmHg</strong> <InlineRef topicId="ventilation-perfusion" refLabel="West Ch.5" />.</p>
              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm"><div className="rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">Definition and normal value</h3><p className="mt-1 text-foreground/80">A–a gradient = P<sub>A</sub>O₂ − PaO₂. If PaO₂ is 90 mmHg in the example, the gradient is 10 mmHg. An approximate expected upper value on air is age/4 + 4 mmHg; it rises with age and inspired oxygen.</p></div><div className="rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">Clinical interpretation</h3><p className="mt-1 text-foreground/80">Hypoxaemia with a normal gradient suggests hypoventilation or low inspired PO₂. A raised gradient indicates V/Q mismatch, shunt or diffusion limitation. The equation therefore separates inadequate alveolar oxygen from impaired alveolar-to-arterial transfer.</p></div></div>
            </div>
          </ExamSection>

          <ExamSection id="bohr-derivation" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RC_BK_02"]}>
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full group">
                <h2 className="text-2xl font-serif font-bold text-foreground">Bohr Equation — Derivation</h2>
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Bohr equation calculates the ratio of dead space to tidal volume (VD/VT). Like the shunt equation, it is derived from <strong>conservation of mass</strong> — here applied to CO₂ rather than O₂.
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <p className="font-semibold text-foreground text-sm mb-2">Step 1 — Define the two compartments</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">VT = VD + VA, so VA = VT − VD.</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <p className="font-semibold text-foreground text-sm mb-2">Step 2 — Conservation of CO₂ mass</p>
                    <div className="mt-2 p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                      VT × FĒCO₂ = (VD × FICO₂) + (VA × FACO₂)
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <p className="font-semibold text-foreground text-sm mb-2">Step 3 — Inspired CO₂ ≈ 0; rearrange</p>
                    <div className="mt-2 p-4 bg-primary/10 rounded-lg border border-primary/30 font-mono text-base text-foreground text-center font-bold">
                      VD/VT = (PACO₂ − PĒCO₂) / PACO₂
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Original Bohr equation.</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <p className="font-semibold text-foreground text-sm mb-2">Enghoff Modification</p>
                    <div className="mt-2 p-4 bg-primary/10 rounded-lg border border-primary/30 font-mono text-base text-foreground text-center font-bold">
                      VD/VT = (PaCO₂ − PĒCO₂) / PaCO₂
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">PaCO₂ replaces PACO₂ clinically — overestimates dead space when V/Q mismatch is large.</p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </ExamSection>

          <ExamSection id="shunt" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_02"]}>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Shunt</h2>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                <li><strong>True shunt</strong> (V/Q = 0): blood passes through non-ventilated lung (atelectasis, consolidation, ARDS). Does NOT respond to supplemental O₂</li>
                <li><strong>Physiological shunt</strong>: bronchial circulation (~1-2% CO) + Thebesian veins → normal ~2-5% shunt</li>
                <li><strong>HPV</strong>: low alveolar PO₂ → local pulmonary artery constriction → diverts blood to better-ventilated regions. Inhibited by volatile agents, vasodilators, sepsis</li>
              </ul>
            </div>
          </ExamSection>

          <ExamSection id="shunt-derivation" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_02"]}>
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full group">
                <h2 className="text-2xl font-serif font-bold text-foreground">Shunt Equation — Derivation</h2>
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Derived from conservation of mass for oxygen across two parallel blood streams (Qs + Qc = Qt).
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <p className="font-semibold text-foreground text-sm mb-2">Fick principle</p>
                    <div className="mt-2 p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                      Qt × CaO₂ = (Qs × CvO₂) + (Qc × CcO₂)
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <p className="font-semibold text-foreground text-sm mb-2">Solve for Qs/Qt</p>
                    <div className="mt-2 p-4 bg-primary/10 rounded-lg border border-primary/30 font-mono text-base text-foreground text-center font-bold">
                      Qs/Qt = (CcO₂ − CaO₂) / (CcO₂ − CvO₂)
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <p className="font-semibold text-foreground text-sm mb-2">CcO₂ calculation</p>
                    <div className="mt-2 p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                      CcO₂ = (Hb × 1.34 × ScO₂) + (0.023 × PAO₂)
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">PAO₂ from alveolar gas equation; ScO₂ assumed 1.0 at high FiO₂.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">Normal Qs/Qt</p>
                      <p className="font-semibold text-foreground text-sm">~2–5%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">Clinical significance</p>
                      <p className="font-semibold text-foreground text-sm">&gt;15% significant; &gt;30% refractory hypoxaemia</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/20">
                    <p className="font-semibold text-foreground text-sm mb-2">Iso-shunt Lines</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      At &gt;30% shunt, increasing FiO₂ has minimal effect on PaO₂ — focus on recruitment (PEEP, prone) rather than FiO₂.
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </ExamSection>

          <ExamSection id="control" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RC_BK_01"]}>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Control of Ventilation</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "Central chemoreceptors", value: "Medullary surface. Respond to ↑ CSF H⁺ (from CO₂ crossing BBB). Main driver of ventilation. Slow response (~minutes)." },
                  { label: "Peripheral chemoreceptors", value: "Carotid bodies (CN IX) > aortic bodies (CN X). Respond to ↓ PaO₂ (<8 kPa), ↑ PaCO₂, ↓ pH. Fast response (~seconds). Only receptors detecting hypoxia." },
                  { label: "Brainstem centres", value: "DRG (inspiratory), VRG (expiratory), pneumotaxic centre, apneustic centre. Pre-Bötzinger complex generates rhythm." },
                  { label: "Lung receptors", value: "Stretch (Hering-Breuer), irritant (cough, bronchoconstriction), J receptors (pulmonary congestion → rapid shallow breathing)." },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </ExamSection>

          <ExamSection id="synthesis" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_02"]}>
            <SynthesisBlock
              title="V/Q Matching — Clinical Translation"
              subtitle="What changes in V/Q look like at the bedside, and how to fix them."
              variant="summary"
            >
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li><strong>Shunt (V/Q = 0)</strong>: pneumonia, atelectasis, ARDS. Hypoxaemia <em>not</em> corrected by 100% O₂. Treat: PEEP, recruitment, prone.</li>
                <li><strong>Dead space (V/Q = ∞)</strong>: PE, ↓CO, high PEEP, emphysema. ↑PaCO₂ and ↑PetCO₂–PaCO₂ gradient.</li>
                <li><strong>HPV</strong>: redirects blood — abolished by volatile agents, Ca²⁺-channel blockers, vasodilators.</li>
                <li><strong>West zones</strong>: zone 1 prevented by PEEP; zone 3 dominant in ICU patients.</li>
                <li><strong>OLV</strong>: shunt 20–30%; preserve HPV with TIVA, avoid prolonged high FiO₂.</li>
              </ul>
            </SynthesisBlock>
            <div className="mt-5 rounded-lg border border-border p-4">
              <h3 className="font-serif font-semibold text-foreground">Prone Positioning in ARDS</h3>
              <p className="mt-2 text-sm text-foreground/85 leading-relaxed">In supine ARDS, oedematous dorsal lung is compressed by gravity, the mediastinum and abdominal contents. These collapsed regions remain preferentially perfused, creating shunt. Proning makes dorsal units non-dependent and recruits them, while the heart rests on the sternum and no longer compresses the left lower lobe. Perfusion remains relatively dorsal, so it is redirected through newly ventilated units. Ventilation, stress and strain become more homogeneous, reducing shunt and improving oxygenation <InlineRef topicId="ventilation-perfusion" refLabel="Intensive Care Med 2020 Prone" />.</p>
            </div>
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>Shunt vs V/Q mismatch</strong>: shunt fails to correct with 100% O₂; V/Q mismatch does — single most tested point.</>,
              <><strong>Volatile agents abolish HPV</strong> at high doses — TIVA preferred for one-lung ventilation when oxygenation marginal.</>,
              <><strong>PEEP overshoot</strong>: too much PEEP creates West zone 1, increasing dead space and dropping cardiac output.</>,
              <><strong>EtCO₂–PaCO₂ gradient widens</strong> with dead space — useful bedside marker of PE, low CO or air trapping.</>,
              <><strong>Supine + GA</strong>: FRC falls below closing capacity in the elderly and obese — atelectasis-driven hypoxaemia, mitigated by PEEP and recruitment.</>,
            ]}
          />
        </section>
        <TopicFaqs faqs={ventilationPerfusionFaqs} />
        </>
      }
    />
  );
};

export default VentilationPerfusionTopic;
