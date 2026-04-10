import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { ventilationPerfusionQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";


const VentilationPerfusionTopic = () => {
  return (
    <SectionLayout title="Ventilation-Perfusion & Gas Exchange" subtitle="FRCA Primary & Final — Physiology" backPath="/physiology" backLabel="Physiology" accentColor="text-physiology">
      <section className="space-y-6 mb-10">
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
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">West's Zones</h2>
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

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Dead Space</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Anatomical</strong>: conducting airways (~150 mL). Measured by Fowler's method (N₂ washout)</li>
            <li><strong>Alveolar</strong>: ventilated but unperfused alveoli (V/Q = ∞). Normally ~negligible</li>
            <li><strong>Physiological</strong> = anatomical + alveolar dead space</li>
            <li>Increased by: ↓ CO, PE, excessive PEEP, anaesthesia (↓ FRC), ageing</li>
          </ul>
        </div>

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
              <p className="font-semibold text-foreground text-sm mb-2">Step 1 — Define the two compartments of each breath</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Each tidal volume (<strong>VT</strong>) is divided into two fractions:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li><strong>VD</strong> = dead space volume (gas that does not participate in gas exchange → contains inspired/negligible CO₂)</li>
                <li><strong>VA</strong> = alveolar volume (gas that reaches perfused alveoli → equilibrates with pulmonary capillary blood)</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">Therefore: <strong>VT = VD + VA</strong>, and so <strong>VA = VT − VD</strong></p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Step 2 — Apply conservation of CO₂ mass</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The total CO₂ in expired gas must equal the sum of CO₂ from the dead space and alveolar compartments:
              </p>
              <div className="mt-2 p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                VT × FĒCO₂ = (VD × FICO₂) + (VA × FACO₂)
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Where: <strong>FĒCO₂</strong> = mixed expired CO₂ fraction, <strong>FICO₂</strong> = inspired CO₂ fraction, <strong>FACO₂</strong> = alveolar CO₂ fraction
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Step 3 — Simplify: inspired CO₂ ≈ 0</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Atmospheric CO₂ is negligible (FICO₂ ≈ 0), so the dead space term drops out:
              </p>
              <div className="mt-2 p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                VT × FĒCO₂ = (VT − VD) × FACO₂
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Step 4 — Expand and rearrange</p>
              <div className="space-y-2 mt-2 text-sm text-muted-foreground">
                <p>Expand the right side:</p>
                <div className="p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                  VT·FĒCO₂ = VT·FACO₂ − VD·FACO₂
                </div>
                <p>Rearrange to isolate VD:</p>
                <div className="p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                  VD·FACO₂ = VT·FACO₂ − VT·FĒCO₂
                </div>
                <p>Factor out VT on the right:</p>
                <div className="p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                  VD·FACO₂ = VT(FACO₂ − FĒCO₂)
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Step 5 — Solve for VD/VT</p>
              <div className="mt-2 p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                VD/VT = (FACO₂ − FĒCO₂) / FACO₂
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Since fractional concentrations are proportional to partial pressures (F = P/PB), we can substitute partial pressures:
              </p>
              <div className="mt-2 p-4 bg-primary/10 rounded-lg border border-primary/30 font-mono text-base text-foreground text-center font-bold">
                VD/VT = (PACO₂ − PĒCO₂) / PACO₂
              </div>
              <p className="text-xs text-muted-foreground mt-2">This is the <strong>original Bohr equation</strong> using alveolar PCO₂.</p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Step 6 — The Enghoff Modification</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In clinical practice, <strong>PACO₂ is replaced by PaCO₂</strong> (arterial PCO₂), since alveolar CO₂ cannot be easily measured:
              </p>
              <div className="mt-2 p-4 bg-primary/10 rounded-lg border border-primary/30 font-mono text-base text-foreground text-center font-bold">
                VD/VT = (PaCO₂ − PĒCO₂) / PaCO₂
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                This assumes PaCO₂ ≈ PACO₂, which is valid in healthy lungs because CO₂ diffuses rapidly across the alveolar membrane (20× more soluble than O₂). In disease with significant V/Q mismatch, PaCO₂ may exceed true PACO₂, causing the Enghoff modification to <strong>overestimate</strong> dead space (it includes a "shunt component").
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">Normal VD/VT</p>
                <p className="font-semibold text-foreground text-sm">~0.3 (30%) — increases with age, anaesthesia, and positive pressure ventilation</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">PĒCO₂ measurement</p>
                <p className="font-semibold text-foreground text-sm">Requires collection of all expired gas (Douglas bag or metabolic cart) to obtain true mixed expired CO₂</p>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Fowler's Method (Anatomical Dead Space)</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Distinct from the Bohr equation, Fowler's method measures <strong>anatomical dead space only</strong> using a single-breath nitrogen washout. After a breath of 100% O₂, the expired N₂ concentration is plotted against volume. The anatomical dead space is the volume at which the expired N₂ concentration reaches the midpoint of the transition between pure dead space gas and alveolar gas (equal areas either side of the vertical line). Normal value ~150 mL (~2 mL/kg).
              </p>
            </div>
          </div>
          </CollapsibleContent>
        </Collapsible>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Shunt</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>True shunt</strong> (V/Q = 0): blood passes through non-ventilated lung (atelectasis, consolidation, ARDS). Does NOT respond to supplemental O₂</li>
            <li><strong>Physiological shunt</strong>: bronchial circulation (~1-2% CO) + Thebesian veins → normal ~2-5% shunt</li>
            <li><strong>HPV</strong> (hypoxic pulmonary vasoconstriction): low alveolar PO₂ → local pulmonary artery constriction → diverts blood to better-ventilated regions. Inhibited by volatile agents, vasodilators, sepsis</li>
          </ul>
        </div>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full group">
            <h2 className="text-2xl font-serif font-bold text-foreground">Shunt Equation — Derivation</h2>
            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
          <p className="text-muted-foreground leading-relaxed mb-4">
            The shunt equation quantifies the fraction of cardiac output that bypasses gas exchange (Qs/Qt). It is derived from the principle of <strong>conservation of mass</strong> — specifically, the total oxygen carried in arterial blood must equal the sum of oxygen from the shunted and non-shunted fractions.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Step 1 — Define the two blood streams</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Total cardiac output (<strong>Qt</strong>) is divided into two components:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li><strong>Qs</strong> = shunted blood (bypasses ventilated alveoli, carries mixed-venous O₂ content)</li>
                <li><strong>Qc</strong> = non-shunted blood (passes through ventilated alveoli, equilibrates to end-capillary O₂ content)</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">Therefore: <strong>Qt = Qs + Qc</strong>, and so <strong>Qc = Qt − Qs</strong></p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Step 2 — Apply the Fick principle (conservation of oxygen mass)</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The total O₂ delivered to the arterial system must equal the O₂ contributed by each stream:
              </p>
              <div className="mt-2 p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                Qt × CaO₂ = (Qs × CvO₂) + (Qc × CcO₂)
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Where: <strong>CaO₂</strong> = arterial O₂ content, <strong>CvO₂</strong> = mixed venous O₂ content, <strong>CcO₂</strong> = pulmonary end-capillary O₂ content
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Step 3 — Substitute Qc = Qt − Qs</p>
              <div className="mt-2 p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                Qt × CaO₂ = (Qs × CvO₂) + (Qt − Qs) × CcO₂
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Step 4 — Expand and rearrange</p>
              <div className="space-y-2 mt-2 text-sm text-muted-foreground">
                <p>Expand the right side:</p>
                <div className="p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                  Qt·CaO₂ = Qs·CvO₂ + Qt·CcO₂ − Qs·CcO₂
                </div>
                <p>Move Qt terms to the left:</p>
                <div className="p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                  Qt·CaO₂ − Qt·CcO₂ = Qs·CvO₂ − Qs·CcO₂
                </div>
                <p>Factor out Qt on the left and Qs on the right:</p>
                <div className="p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                  Qt(CaO₂ − CcO₂) = Qs(CvO₂ − CcO₂)
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Step 5 — Solve for Qs/Qt</p>
              <div className="mt-2 p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                Qs/Qt = (CaO₂ − CcO₂) / (CvO₂ − CcO₂)
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                By convention, we multiply top and bottom by −1 to express as:
              </p>
              <div className="mt-2 p-4 bg-primary/10 rounded-lg border border-primary/30 font-mono text-base text-foreground text-center font-bold">
                Qs/Qt = (CcO₂ − CaO₂) / (CcO₂ − CvO₂)
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Step 6 — Calculating CcO₂ (end-capillary O₂ content)</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                CcO₂ cannot be measured directly. It is <strong>calculated</strong> by assuming that end-capillary blood equilibrates fully with alveolar gas:
              </p>
              <div className="mt-2 p-3 bg-secondary/30 rounded font-mono text-sm text-foreground text-center">
                CcO₂ = (Hb × 1.34 × ScO₂) + (0.023 × PAO₂)
              </div>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc list-inside">
                <li><strong>PAO₂</strong> is derived from the alveolar gas equation</li>
                <li><strong>ScO₂</strong> is assumed to be 1.0 (100%) when PAO₂ is high (FiO₂ &gt; 0.21)</li>
                <li><strong>1.34</strong> = Hüfner's constant (mL O₂ per gram Hb when fully saturated)</li>
                <li><strong>0.023</strong> = solubility coefficient of O₂ in plasma (mL/dL/kPa)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">Normal Qs/Qt</p>
                <p className="font-semibold text-foreground text-sm">~2–5% (anatomical shunt from bronchial and Thebesian veins)</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">Clinical significance</p>
                <p className="font-semibold text-foreground text-sm">&gt;15% = significant; &gt;30% = refractory hypoxaemia (FiO₂ has minimal effect)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Iso-shunt Lines</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Iso-shunt diagrams plot PaO₂ against FiO₂ for various fixed shunt fractions. Key clinical insight: at <strong>&gt;30% shunt</strong>, increasing FiO₂ has minimal effect on PaO₂ — this defines refractory hypoxaemia. At these levels, treatment must focus on recruiting shunted lung (PEEP, prone positioning) rather than increasing FiO₂.
              </p>
            </div>
          </div>
          </CollapsibleContent>
        </Collapsible>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Control of Ventilation</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Central chemoreceptors", value: "Medullary surface. Respond to ↑ CSF H⁺ (from CO₂ crossing BBB). Main driver of ventilation. Slow response (~minutes)." },
              { label: "Peripheral chemoreceptors", value: "Carotid bodies (CN IX) > aortic bodies (CN X). Respond to ↓ PaO₂ (<8 kPa), ↑ PaCO₂, ↓ pH. Fast response (~seconds). Only receptors detecting hypoxia." },
              { label: "Brainstem centres", value: "DRG (inspiratory), VRG (expiratory), pneumotaxic centre (limits inspiration), apneustic centre. Pre-Bötzinger complex generates rhythm." },
              { label: "Lung receptors", value: "Stretch (Hering-Breuer reflex), irritant (cough, bronchoconstriction), J receptors (pulmonary congestion → rapid shallow breathing)." },
            ].map(item => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Normal V̇/Q̇ ≈ 0.8. Apex has highest V/Q (~3.3, dead space-like), base has lowest (~0.6, shunt-like)",
        "West's Zones: Zone 1 (PA > Pa > Pv) — dead space; Zone 3 (Pa > Pv > PA) — continuous flow",
        "Dead space measured by Bohr equation: VD/VT = (PaCO₂ − PĒCO₂)/PaCO₂. Normal ~30%",
        "True shunt does NOT respond to supplemental O₂. At >30% shunt, ↑ FiO₂ has minimal effect on PaO₂",
        "HPV diverts blood from hypoxic alveoli — inhibited by volatiles, vasodilators, sepsis",
        "Central chemoreceptors (CO₂ via H⁺) are the main ventilatory drive; peripheral chemoreceptors detect hypoxia",
      ]} />
      <QuizSection questions={ventilationPerfusionQuestions} />
      <ReferencesList topicId="ventilation-perfusion" />
      <SeeAlso topicId="ventilation-perfusion" />
        <TopicCompletionToggle topicId="ventilation-perfusion" topicTitle="Ventilation-Perfusion &amp; Gas Exchange" />
    </SectionLayout>
  );
};

export default VentilationPerfusionTopic;
