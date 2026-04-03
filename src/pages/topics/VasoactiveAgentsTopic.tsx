import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { vasoactiveAgentsQuiz } from "@/data/quizzes";
import VasoactiveReceptorDiagram from "@/components/diagrams/VasoactiveReceptorDiagram";
import VasoactiveStructures from "@/components/diagrams/VasoactiveStructures";

const VasoactiveAgentsTopic = () => {
  return (
    <SectionLayout
      title="Vasoactive Agents"
      subtitle="FRCA Primary & Final — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Vasoactive agents are drugs that alter vascular tone and/or cardiac function. They are essential in the management
            of haemodynamic instability during anaesthesia and critical care. Understanding their receptor pharmacology,
            mechanisms, and clinical applications is fundamental to FRCA and FFICM examinations.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Classification</h2>
          <p className="text-foreground/90 leading-relaxed">
            Vasoactive agents can be classified by their primary mechanism of action:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="px-4 py-2 text-left text-foreground font-semibold border-b border-border">Category</th>
                  <th className="px-4 py-2 text-left text-foreground font-semibold border-b border-border">Examples</th>
                  <th className="px-4 py-2 text-left text-foreground font-semibold border-b border-border">Primary Action</th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">Catecholamines</td>
                  <td className="px-4 py-2">Adrenaline, noradrenaline, dopamine</td>
                  <td className="px-4 py-2">Adrenoreceptor agonism</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">Synthetic sympathomimetics</td>
                  <td className="px-4 py-2">Phenylephrine, dobutamine, isoprenaline</td>
                  <td className="px-4 py-2">Selective receptor agonism</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">Phosphodiesterase inhibitors</td>
                  <td className="px-4 py-2">Milrinone, enoximone</td>
                  <td className="px-4 py-2">↑ cAMP → inodilation</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">Vasopressin analogues</td>
                  <td className="px-4 py-2">Vasopressin, terlipressin</td>
                  <td className="px-4 py-2">V1 receptor agonism</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">Calcium sensitisers</td>
                  <td className="px-4 py-2">Levosimendan</td>
                  <td className="px-4 py-2">↑ Ca²⁺ sensitivity of troponin C</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Vasodilators</td>
                  <td className="px-4 py-2">GTN, SNP, hydralazine</td>
                  <td className="px-4 py-2">NO donors / direct smooth muscle relaxation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Adrenoreceptor Pharmacology</h2>
          <p className="text-foreground/90 leading-relaxed">
            Most vasoactive agents act via adrenoreceptors. Understanding receptor subtypes and their downstream effects is essential:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="px-4 py-2 text-left text-foreground font-semibold border-b border-border">Receptor</th>
                  <th className="px-4 py-2 text-left text-foreground font-semibold border-b border-border">Location</th>
                  <th className="px-4 py-2 text-left text-foreground font-semibold border-b border-border">G-protein</th>
                  <th className="px-4 py-2 text-left text-foreground font-semibold border-b border-border">Effect</th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">α₁</td>
                  <td className="px-4 py-2">Vascular smooth muscle</td>
                  <td className="px-4 py-2">Gq → ↑ IP₃/DAG</td>
                  <td className="px-4 py-2">Vasoconstriction</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">α₂</td>
                  <td className="px-4 py-2">Presynaptic nerve terminals, CNS</td>
                  <td className="px-4 py-2">Gi → ↓ cAMP</td>
                  <td className="px-4 py-2">↓ NA release, sedation, analgesia</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">β₁</td>
                  <td className="px-4 py-2">Heart (SA node, myocardium)</td>
                  <td className="px-4 py-2">Gs → ↑ cAMP</td>
                  <td className="px-4 py-2">↑ HR, ↑ contractility, ↑ conduction</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-medium">β₂</td>
                  <td className="px-4 py-2">Bronchial, uterine, vascular smooth muscle</td>
                  <td className="px-4 py-2">Gs → ↑ cAMP</td>
                  <td className="px-4 py-2">Bronchodilation, vasodilation, tocolysis</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">β₃</td>
                  <td className="px-4 py-2">Adipose tissue, bladder</td>
                  <td className="px-4 py-2">Gs → ↑ cAMP</td>
                  <td className="px-4 py-2">Lipolysis, bladder relaxation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Adrenaline (Epinephrine)</h2>
          <p className="text-foreground/90 leading-relaxed">
            Endogenous catecholamine released from the adrenal medulla (80% adrenaline, 20% noradrenaline). Acts on all
            adrenoreceptors with <strong>dose-dependent selectivity</strong>:
          </p>
          <ul className="text-foreground/90 space-y-1">
            <li><strong>Low dose (0.01–0.05 µg/kg/min):</strong> β₂ predominance → vasodilation, bronchodilation, ↑ HR</li>
            <li><strong>Moderate dose (0.05–0.2 µg/kg/min):</strong> β₁ predominance → ↑ inotropy, ↑ chronotropy</li>
            <li><strong>High dose (&gt;0.2 µg/kg/min):</strong> α₁ predominance → vasoconstriction, ↑ SVR, ↑ MAP</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Key clinical uses:</strong> cardiac arrest (1 mg IV every 3–5 min), anaphylaxis (0.5 mg IM),
            low cardiac output states, added to local anaesthetics (1:200,000 = 5 µg/mL) to prolong block and reduce toxicity.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-2">
            <strong>Metabolism:</strong> COMT and MAO in the liver, lungs, and kidneys. Very short half-life (~2 min).
            Metabolised to metanephrine and VMA (urinary markers for phaeochromocytoma).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Noradrenaline (Norepinephrine)</h2>
          <p className="text-foreground/90 leading-relaxed">
            Primary neurotransmitter at postganglionic sympathetic nerve terminals. <strong>Predominantly α₁ agonist</strong> with
            some β₁ activity but minimal β₂ effect.
          </p>
          <ul className="text-foreground/90 space-y-1">
            <li><strong>Dose range:</strong> 0.01–1.0 µg/kg/min (typically 0.05–0.3 µg/kg/min)</li>
            <li><strong>Haemodynamic effect:</strong> ↑ SVR, ↑ MAP, ↑ diastolic BP. Reflex bradycardia may occur</li>
            <li><strong>First-line vasopressor</strong> in septic shock (Surviving Sepsis Campaign 2021)</li>
            <li><strong>Must be given via central venous access</strong> — extravasation causes tissue necrosis</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mt-2">
            Unlike adrenaline, noradrenaline has minimal β₂ effect → no vasodilation, no bronchodilation,
            no significant hyperglycaemia or hypokalaemia.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Phenylephrine</h2>
          <p className="text-foreground/90 leading-relaxed">
            Synthetic <strong>pure α₁ agonist</strong>. No β-receptor activity. Causes predictable vasoconstriction without
            direct cardiac stimulation. Reflex bradycardia is common.
          </p>
          <ul className="text-foreground/90 space-y-1">
            <li><strong>Bolus:</strong> 50–100 µg IV for acute hypotension (e.g., spinal-induced)</li>
            <li><strong>Infusion:</strong> 0.25–1.0 µg/kg/min</li>
            <li><strong>Advantages:</strong> predictable response, no tachycardia, safe in peripheral IV</li>
            <li><strong>Obstetric use:</strong> preferred vasopressor for spinal hypotension in caesarean section (↓ fetal acidosis vs ephedrine)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Dopamine</h2>
          <p className="text-foreground/90 leading-relaxed">
            Endogenous catecholamine precursor to noradrenaline. Dose-dependent receptor selectivity (though the traditional
            "renal-dose dopamine" concept is now largely abandoned):
          </p>
          <ul className="text-foreground/90 space-y-1">
            <li><strong>Low dose (1–3 µg/kg/min):</strong> D₁ receptors → renal/mesenteric vasodilation (no proven renal protection)</li>
            <li><strong>Moderate (3–10 µg/kg/min):</strong> β₁ → ↑ cardiac output</li>
            <li><strong>High (&gt;10 µg/kg/min):</strong> α₁ → vasoconstriction</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mt-2">
            More arrhythmogenic than noradrenaline. Associated with worse outcomes in septic shock compared to noradrenaline
            (SOAP II trial). Now second-line agent.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Dobutamine</h2>
          <p className="text-foreground/90 leading-relaxed">
            Synthetic catecholamine. Predominantly <strong>β₁ agonist</strong> with some β₂ and minimal α₁ activity.
            An <strong>inodilator</strong> — increases cardiac contractility while reducing afterload.
          </p>
          <ul className="text-foreground/90 space-y-1">
            <li><strong>Dose:</strong> 2.5–20 µg/kg/min</li>
            <li><strong>Primary indication:</strong> low cardiac output states (cardiogenic shock, post-cardiac surgery)</li>
            <li><strong>Haemodynamics:</strong> ↑ CO, ↓ PCWP, ↓/= SVR. May ↓ MAP due to β₂ vasodilation</li>
            <li><strong>Tachyphylaxis</strong> develops with prolonged use (β-receptor downregulation)</li>
            <li>Racemic mixture: (+) isomer = β₁ agonist, (−) isomer = α₁ agonist</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Vasopressin & Terlipressin</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Vasopressin</strong> (ADH) is a nonapeptide hormone acting on V₁ (vascular smooth muscle → vasoconstriction),
            V₂ (collecting duct → water reabsorption), and V₃/V1b (anterior pituitary → ACTH release) receptors.
          </p>
          <ul className="text-foreground/90 space-y-1">
            <li><strong>Dose in septic shock:</strong> 0.01–0.04 units/min (added to noradrenaline, not first-line)</li>
            <li>Catecholamine-sparing effect — particularly useful in catecholamine-refractory shock</li>
            <li>Causes vasoconstriction via V₁ receptors even in acidotic states (unlike catecholamines)</li>
            <li><strong>VASST trial:</strong> no mortality benefit overall but possible benefit in less severe septic shock</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mt-2">
            <strong>Terlipressin</strong> is a synthetic vasopressin analogue with greater V₁ selectivity. Used in variceal
            haemorrhage (splanchnic vasoconstriction) and hepatorenal syndrome (CONFIRM trial 2021).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Phosphodiesterase III Inhibitors</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Milrinone</strong> and <strong>enoximone</strong> inhibit PDE III, preventing breakdown of cAMP.
            This produces <strong>inodilation</strong>: ↑ contractility (cardiac muscle) and vasodilation (vascular smooth muscle).
          </p>
          <ul className="text-foreground/90 space-y-1">
            <li>Bypass the β-receptor → effective even in β-blocked or downregulated patients</li>
            <li><strong>Milrinone dose:</strong> loading 50 µg/kg (often omitted), infusion 0.375–0.75 µg/kg/min</li>
            <li>Reduce PVR — useful in right heart failure and pulmonary hypertension</li>
            <li>Risk of hypotension (vasodilation) and arrhythmias</li>
            <li>Renal excretion (milrinone) — reduce dose in renal impairment</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Levosimendan</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Calcium sensitiser</strong> — binds to troponin C and stabilises the calcium-troponin C complex,
            enhancing contractile force without increasing intracellular calcium or myocardial oxygen demand.
          </p>
          <ul className="text-foreground/90 space-y-1">
            <li>Also opens K<sub>ATP</sub> channels → vasodilation and cardioprotection</li>
            <li>Also has PDE III inhibitor activity</li>
            <li>Active metabolite OR-1896 has 75-hour half-life → effects persist for days after stopping</li>
            <li>Used in acute decompensated heart failure, post-cardiac surgery low CO</li>
            <li><strong>LEVO-CTS trial (2017):</strong> no benefit over placebo in cardiac surgery</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Vasodilators</h2>
          <h3 className="text-lg font-semibold text-foreground mt-4">Glyceryl Trinitrate (GTN)</h3>
          <ul className="text-foreground/90 space-y-1">
            <li>Organic nitrate → releases NO → ↑ cGMP → smooth muscle relaxation</li>
            <li><strong>Predominantly venodilator</strong> at low doses → ↓ preload → ↓ LVEDP</li>
            <li>Higher doses → arteriolar dilation → ↓ afterload</li>
            <li>Dose: 0.5–10 µg/kg/min. Tolerance develops within 24–48 hours</li>
            <li>Uses: myocardial ischaemia, acute heart failure, controlled hypotension</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">Sodium Nitroprusside (SNP)</h3>
          <ul className="text-foreground/90 space-y-1">
            <li>Direct NO donor → balanced arterial and venous dilation</li>
            <li>Extremely rapid onset and offset (1–2 min). Dose: 0.5–8 µg/kg/min</li>
            <li><strong>Cyanide toxicity:</strong> SNP releases 5 CN⁻ ions per molecule. Metabolised by rhodanase to thiocyanate (needs thiosulphate)</li>
            <li>Signs of toxicity: tachyphylaxis, lactic acidosis, arrhythmias. Treat with hydroxocobalamin or sodium thiosulphate</li>
            <li>Protect from light (photodegradation). Maximum duration 72 hours, max dose 1.5 mg/kg</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Ephedrine & Metaraminol</h2>
          <h3 className="text-lg font-semibold text-foreground mt-4">Ephedrine</h3>
          <ul className="text-foreground/90 space-y-1">
            <li><strong>Indirect sympathomimetic</strong> — displaces noradrenaline from vesicles + weak direct α and β agonism</li>
            <li>Mixed α and β effects → ↑ HR, ↑ BP, bronchodilation</li>
            <li>Bolus: 3–6 mg IV. Duration 10–15 min. Tachyphylaxis with repeated doses</li>
            <li>Crosses placenta → traditionally used in obstetric hypotension (now largely replaced by phenylephrine)</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">Metaraminol</h3>
          <ul className="text-foreground/90 space-y-1">
            <li>Predominantly indirect sympathomimetic with direct α₁ agonism</li>
            <li>Bolus: 0.5–1 mg IV. Infusion: 0.5–5 mg/hr</li>
            <li>Acts as a false transmitter — displaces NA but is a weaker agonist → tachyphylaxis</li>
            <li>Longer acting than phenylephrine (15–20 min). Causes reflex bradycardia</li>
          </ul>
        </section>

        <div className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Interactive Receptor Diagram</h2>
          <VasoactiveReceptorDiagram />
        </div>

        <KeyLearningPoints
          points={[
            "Adrenaline has dose-dependent receptor selectivity: low-dose β₂, moderate β₁, high-dose α₁",
            "Noradrenaline is first-line vasopressor in septic shock (α₁ predominant with some β₁)",
            "Phenylephrine is a pure α₁ agonist — preferred vasopressor for obstetric spinal hypotension",
            "Dobutamine is an inodilator (β₁ > β₂ > α₁) — first-line inotrope in cardiogenic shock",
            "PDE III inhibitors (milrinone) bypass β-receptors — effective in β-blocked patients",
            "Vasopressin acts via V₁ receptors — works even in acidosis when catecholamines fail",
            "GTN is predominantly a venodilator (↓ preload); SNP is a balanced arteriovenous dilator",
            "SNP releases cyanide — toxicity causes lactic acidosis; treat with hydroxocobalamin",
            "Levosimendan sensitises troponin C to calcium — no increase in myocardial O₂ demand",
            "Ephedrine is an indirect sympathomimetic — tachyphylaxis occurs with repeated doses",
          ]}
        />

        <TopicCompletionToggle topicId="vasoactive-agents" topicTitle="Vasoactive Agents" />

        <QuizSection questions={vasoactiveAgentsQuiz} />
      </div>
    </SectionLayout>
  );
};

export default VasoactiveAgentsTopic;
