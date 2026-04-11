import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { acidBaseQuestions } from "@/data/quizzes";
import StewartAcidBaseDiagram from "@/components/diagrams/StewartAcidBaseDiagram";
import AcidBaseInterpretationDiagram from "@/components/diagrams/AcidBaseInterpretationDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const AcidBaseTopic = () => {
  return (
    <SectionLayout title="Acid-Base Disorders" subtitle="Primary / Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <StewartAcidBaseDiagram />
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Systematic ABG Interpretation</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Assess oxygenation: P/F ratio, A-a gradient</li>
            <li>Identify the primary disorder (pH + PaCO₂ + HCO₃⁻)</li>
            <li>Calculate compensation (Winter's formula for metabolic acidosis: expected PaCO₂ = 1.5 × [HCO₃⁻] + 8 ± 2)</li>
            <li>Calculate anion gap: Na⁺ − (Cl⁻ + HCO₃⁻). Normal 8-12 mEq/L</li>
            <li>If HAGMA: calculate delta ratio (ΔAG/ΔHCO₃⁻) to detect hidden disorders</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">High Anion Gap Metabolic Acidosis</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Mnemonic: <strong>MUDPILES</strong>
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { letter: "M", cause: "Methanol" },
              { letter: "U", cause: "Uraemia" },
              { letter: "D", cause: "Diabetic ketoacidosis" },
              { letter: "P", cause: "Propylene glycol / Paracetamol" },
              { letter: "I", cause: "Isoniazid / Iron" },
              { letter: "L", cause: "Lactic acidosis" },
              { letter: "E", cause: "Ethylene glycol" },
              { letter: "S", cause: "Salicylates" },
            ].map((item) => (
              <div key={item.letter} className="flex items-center gap-2 p-2 rounded border border-border">
                <span className="font-bold text-primary text-sm">{item.letter}</span>
                <span className="text-sm text-muted-foreground">{item.cause}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Stewart Approach</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The physicochemical (Stewart) approach identifies 3 independent variables that determine pH. Unlike the Henderson-Hasselbalch approach, HCO₃⁻ is a <strong>dependent</strong> variable — it changes as a consequence of the independent variables, not as a cause.
          </p>
          <div className="space-y-3">
            {[
              { var: "PaCO₂", detail: "Respiratory component. Regulated by ventilation. Acts as an independent variable that directly influences water dissociation and thus [H⁺]." },
              { var: "Total weak acids (Atot)", detail: "Mainly albumin and phosphate. These partially dissociate and contribute to [H⁺]. ↓Albumin → metabolic alkalosis (each 10 g/L decrease ↑ base excess by ~2.5 mEq/L). Common in ICU patients — 'occult alkalosis' masks concurrent acidosis." },
            ].map((v) => (
              <div key={v.var} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{v.var}</p>
                <p className="text-sm text-muted-foreground mt-1">{v.detail}</p>
              </div>
            ))}
          </div>

          {/* Expanded SID section */}
          <div className="mt-4 p-5 rounded-lg border-2 border-primary/20 bg-primary/5">
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Strong Ion Difference (SID)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Strong ions are those that are <strong>fully dissociated</strong> at physiological pH. They do not participate in buffering reactions — their charges are fixed. The difference between strong cations and strong anions determines the electrochemical environment in which water dissociates, and therefore [H⁺].
            </p>

            <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-3">
              <p className="text-sm font-semibold text-foreground mb-1">Apparent SID (SIDa)</p>
              <p className="text-sm text-muted-foreground font-mono">
                SIDa = [Na⁺ + K⁺ + Ca²⁺ + Mg²⁺] − [Cl⁻ + lactate⁻]
              </p>
              <p className="text-sm text-muted-foreground mt-1">Normal: <strong>38–42 mEq/L</strong></p>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-3">
              <p className="text-sm font-semibold text-foreground mb-1">Effective SID (SIDe)</p>
              <p className="text-sm text-muted-foreground font-mono">
                SIDe = 2.46 × 10⁻⁸ × PaCO₂ / [H⁺] + [albumin charge] + [phosphate charge]
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Represents the charge balance required by CO₂ and weak acids. In health, SIDa ≈ SIDe.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-4">
              <p className="text-sm font-semibold text-foreground mb-1">Strong Ion Gap (SIG)</p>
              <p className="text-sm text-muted-foreground font-mono">
                SIG = SIDa − SIDe
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Normal: <strong>0–2 mEq/L</strong>. A raised SIG indicates unmeasured strong anions (e.g. ketoacids, sulphates, toxins) — analogous to anion gap but corrected for albumin and phosphate.
              </p>
            </div>

            <p className="text-sm font-semibold text-foreground mb-2">How SID determines pH</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Water dissociates to maintain electrical neutrality. When SID is large (more cations than anions), [OH⁻] increases to balance charge → pH rises (alkalosis). When SID is small, [H⁺] increases → pH falls (acidosis). This is governed by the law of electrical neutrality and the dissociation constant of water.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Change</th>
                    <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                    <th className="text-left py-2 text-foreground font-semibold">Effect on pH</th>
                    <th className="text-left py-2 text-foreground font-semibold">Clinical Example</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">↓ SID</td>
                    <td>Excess strong anion relative to cation</td>
                    <td>Acidosis</td>
                    <td>0.9% NaCl infusion (↑Cl⁻), lactic acidosis (↑lactate⁻), hyperchloraemia</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">↑ SID</td>
                    <td>Relative excess of strong cations</td>
                    <td>Alkalosis</td>
                    <td>Vomiting (loss of Cl⁻), Hartmann's/PlasmaLyte (metabolised anions ↑ SID), diuretics</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">↑ SIG</td>
                    <td>Unmeasured strong anions present</td>
                    <td>Acidosis</td>
                    <td>DKA (β-hydroxybutyrate), uraemia (sulphate), toxins (formate, glycolate)</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-foreground">Free water excess</td>
                    <td>Dilutes Na⁺ more than Cl⁻ → ↓ SID</td>
                    <td>Acidosis</td>
                    <td>Dilutional acidosis (large volume 5% dextrose)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
              <p className="text-sm font-semibold text-amber-400 mb-1">⚠ Exam Pearl — 0.9% NaCl & SID</p>
              <p className="text-sm text-muted-foreground">
                0.9% NaCl has SID = 0 (Na⁺ 154, Cl⁻ 154). Plasma SID ≈ 40. Large-volume 0.9% NaCl infusion reduces plasma SID toward zero → hyperchloraemic metabolic acidosis. This is why balanced crystalloids (Hartmann's SID = 29, PlasmaLyte SID = 50) cause less acid-base disturbance. The SPLIT, SALT-ED, and SMART trials demonstrated reduced AKI and mortality with balanced solutions in ICU patients.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Comparing Approaches to Acid-Base Analysis</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Three frameworks exist for interpreting acid-base disorders. They use the same blood gas data but differ in which variables they consider primary (independent) versus secondary (dependent). All reach the same clinical conclusions in most cases — the differences are conceptual.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left py-2 text-foreground font-semibold">Henderson-Hasselbalch</th>
                  <th className="text-left py-2 text-foreground font-semibold">Base Excess (Copenhagen)</th>
                  <th className="text-left py-2 text-foreground font-semibold">Stewart</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Core equation</td>
                  <td>pH = pKa + log([HCO₃⁻] / 0.03 × PaCO₂)</td>
                  <td>BE = deviation from normal buffer base</td>
                  <td>pH determined by SID, PaCO₂, Atot</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Key metabolic variable</td>
                  <td>[HCO₃⁻] and anion gap</td>
                  <td>Standard base excess (SBE)</td>
                  <td>SID, SIG, Atot</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">HCO₃⁻ status</td>
                  <td>Independent — drives pH</td>
                  <td>Contributor to buffer base</td>
                  <td><strong>Dependent</strong> — consequence, not cause</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Unmeasured anions</td>
                  <td>Anion gap ± albumin correction</td>
                  <td>Not directly quantified</td>
                  <td>SIG — inherently albumin-corrected</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Albumin handling</td>
                  <td>Requires manual AG correction</td>
                  <td>Not accounted for</td>
                  <td>Integral (Atot)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Chloride</td>
                  <td>Inferred from normal-AG acidosis</td>
                  <td>Not addressed</td>
                  <td>Directly quantified in SID</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Mixed disorders</td>
                  <td>Delta ratio (ΔAG / ΔHCO₃⁻)</td>
                  <td>SBE partitioning (less systematic)</td>
                  <td>SID + SIG + Atot separates chloride, unmeasured anion, and albumin effects</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Strengths</td>
                  <td>Simple, widely taught, fast bedside use</td>
                  <td>Single number, easy to trend</td>
                  <td>Mechanistic, quantitative, best for complex ICU patients</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Limitations</td>
                  <td>AG unreliable without albumin correction</td>
                  <td>Cannot distinguish cause of metabolic disturbance</td>
                  <td>Complex, not proven to improve outcomes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Henderson-Hasselbalch</p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Steps:</strong> pH → primary disorder → compensation (Winter's) → AG → albumin-corrected AG → delta ratio. <br />
                <strong>Best for:</strong> Rapid bedside assessment. Most FRCA Primary questions use this framework.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Base Excess (Copenhagen)</p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>SBE:</strong> Standardised at Hb 50 g/L for whole-body buffering. Normal 0 ± 2 mEq/L. Negative = metabolic acidosis. <br />
                <strong>Best for:</strong> Quick trending. Popular in European / Scandinavian practice.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Stewart (Physicochemical)</p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Steps:</strong> SIDa → SIDe → SIG → Atot assessment. <br />
                <strong>Best for:</strong> Complex ICU patients with hypoalbuminaemia, renal/liver failure, massive transfusion. SIG may have prognostic value in sepsis and trauma.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <p className="text-sm font-semibold text-amber-400 mb-1">⚠ Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              Be prepared to use <strong>all three approaches</strong>. Henderson-Hasselbalch dominates FRCA Primary questions. Stewart is increasingly examined in the Final and FFICM — particularly SID, SIG, the role of albumin as a weak acid, and why 0.9% NaCl causes acidosis using the Stewart framework.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Lactic Acidosis</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Type A (hypoxic)</p>
              <p className="text-sm text-muted-foreground mt-1">Tissue hypoperfusion: shock, cardiac arrest, regional ischaemia, severe anaemia</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Type B (non-hypoxic)</p>
              <p className="text-sm text-muted-foreground mt-1">Metformin, liver failure, malignancy, thiamine deficiency, propofol infusion syndrome</p>
            </div>
          </div>
        </div>
      </section>

      <AcidBaseInterpretationDiagram />

      <KeyLearningPoints points={[
        "Systematic approach: oxygenation → primary disorder → compensation → anion gap → delta ratio",
        "HAGMA: MUDPILES. Normal AG acidosis: renal tubular acidosis, diarrhoea, saline excess",
        "Stewart: pH determined by SID, PaCO₂, and Atot (albumin). ↓SID = acidosis",
        "0.9% NaCl causes hyperchloraemic acidosis by reducing SID",
        "Type A lactate = tissue hypoxia; Type B = metabolic (metformin, liver failure, PRIS)",
      ]} />

      <QuizSection questions={acidBaseQuestions} />
      <ReferencesList topicId="acid-base" />

      <SeeAlso topicId="acid-base" />
        <TopicCompletionToggle topicId="acid-base" topicTitle="Acid-Base Disorders" />
    </SectionLayout>
  );
};

export default AcidBaseTopic;
