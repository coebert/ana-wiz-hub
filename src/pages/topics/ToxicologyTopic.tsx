import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { toxicologyQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const ToxicologyTopic = () => {
  return (
    <SectionLayout title="Toxicology & Poisoning" subtitle="FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">General Principles</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Poisoning management on the ICU follows a small set of principles: stabilise with ABCDE, identify the toxin (with NPIS/TOXBASE support), decontaminate where appropriate, enhance elimination when an effective modality exists, and recognise the toxidrome patterns that often arrive before a confirmed history.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>ABCDE approach</strong>: stabilise first, identify toxin second. Contact National Poisons Information Service (NPIS/TOXBASE)</li>
            <li><strong>Decontamination</strong>: activated charcoal (1g/kg) within 1h of ingestion (most effective &lt;30min). Not for hydrocarbons, metals, alcohols, acids/alkalis</li>
            <li><strong>Enhanced elimination</strong>: urinary alkalinisation (salicylates, methotrexate), haemodialysis (methanol, ethylene glycol, salicylates, lithium), haemoperfusion (rarely used)</li>
            <li><strong>Toxidromes</strong>: recognise patterns — anticholinergic (hot, dry, confused), cholinergic (SLUDGE), sympathomimetic (hypertension, tachycardia, hyperthermia), opioid (miosis, respiratory depression)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Specific Antidotes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Poison</th>
                <th className="text-left py-2 text-foreground font-semibold">Antidote</th>
                <th className="text-left py-2 text-foreground font-semibold">Key Points</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Paracetamol</td><td>N-acetylcysteine (NAC)</td><td>Replenishes glutathione. Most effective &lt;8h. Use nomogram (150mg/kg line). Anaphylactoid reaction common</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Opioids</td><td>Naloxone</td><td>Competitive μ-antagonist. Short t½ (~30-70min) — may need repeat/infusion. Titrate to respiratory rate, not consciousness</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Benzodiazepines</td><td>Flumazenil</td><td>Competitive antagonist. Risk of seizures in chronic BZD use or mixed OD. Rarely used in ED</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Beta-blockers</td><td>Glucagon (+ high-dose insulin)</td><td>Glucagon: ↑ cAMP via non-adrenergic pathway. High-dose insulin-euglycaemia therapy (1-2 U/kg/h)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Organophosphates</td><td>Atropine + pralidoxime</td><td>Atropine (large doses, titrate to secretions). Pralidoxime reactivates AChE if given early (&lt;24h)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Methanol / ethylene glycol</td><td>Fomepizole (or ethanol)</td><td>Inhibit alcohol dehydrogenase. Prevent toxic metabolite formation. Dialysis for severe cases</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Digoxin</td><td>Digoxin-specific Fab fragments</td><td>Binds free digoxin. Indicated for life-threatening arrhythmias or K⁺ &gt;5 mmol/L</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Local anaesthetic toxicity</td><td>Intralipid 20%</td><td>1.5 mL/kg bolus then 15 mL/kg/h infusion. Acts as 'lipid sink' + metabolic support</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Tricyclic Antidepressant OD</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Mechanism of toxicity</strong>: Na⁺ channel blockade (→ wide QRS, arrhythmias), anticholinergic effects, α₁ blockade (→ hypotension), serotonin/noradrenaline reuptake inhibition</li>
            <li><strong>ECG features</strong>: sinus tachycardia, ↑ QRS &gt;100ms (risk of seizures), ↑ QRS &gt;160ms (risk of VT/VF). Right axis deviation of terminal 40ms (R in aVR &gt;3mm)</li>
            <li><strong>Treatment</strong>: IV sodium bicarbonate 8.4% (50-100mL) for QRS &gt;120ms or arrhythmias. Target pH 7.45-7.55. Overcomes Na⁺ channel block. Avoid class Ia antiarrhythmics</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Salicylate Poisoning</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li>Early: respiratory alkalosis (central stimulation) → mixed metabolic acidosis + respiratory alkalosis → late: metabolic acidosis predominates</li>
            <li>Other features: tinnitus, hypoglycaemia (children), hyperthermia, non-cardiogenic pulmonary oedema, coagulopathy</li>
            <li><strong>Treatment</strong>: activated charcoal (if &lt;1h), urinary alkalinisation (NaHCO₃ to pH 7.5-8.5), haemodialysis (level &gt;700mg/L, renal failure, pulmonary oedema, seizures)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Extracorporeal Removal of Toxins</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Extracorporeal techniques (haemodialysis, haemofiltration, haemoperfusion) can remove toxins that meet specific pharmacokinetic criteria.
            The <strong>EXTRIP</strong> (Extracorporeal Treatments in Poisoning) workgroup provides evidence-based recommendations.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Characteristics Favouring Extracorporeal Removal</h3>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside leading-relaxed mb-4">
            <li><strong>Low molecular weight</strong> (&lt;500 Da for HD; up to ~20,000 Da for haemofiltration)</li>
            <li><strong>Low volume of distribution</strong> (Vd &lt;1 L/kg — toxin remains in plasma)</li>
            <li><strong>Low protein binding</strong> (free drug crosses membrane)</li>
            <li><strong>High water solubility</strong></li>
            <li><strong>Single-compartment kinetics</strong> (minimal redistribution/rebound)</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Toxins Amenable to Extracorporeal Removal</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Toxin</th>
                <th className="text-left py-2 text-foreground font-semibold">Preferred Modality</th>
                <th className="text-left py-2 text-foreground font-semibold">MW / Vd / PB</th>
                <th className="text-left py-2 text-foreground font-semibold">Indications for Extracorporeal Rx</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">Methanol</td>
                  <td>Haemodialysis (HD)</td>
                  <td>32 Da / 0.6 L/kg / 0%</td>
                  <td>pH &lt;7.15, visual symptoms, renal failure, level &gt;500 mg/L, deterioration despite fomepizole</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">Ethylene glycol</td>
                  <td>HD</td>
                  <td>62 Da / 0.8 L/kg / 0%</td>
                  <td>pH &lt;7.1, renal failure, level &gt;500 mg/L, deterioration despite fomepizole</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">Salicylates</td>
                  <td>HD</td>
                  <td>138 Da / 0.2 L/kg / 90% (↓ in OD)</td>
                  <td>Level &gt;700 mg/L, pH &lt;7.2, cerebral/pulmonary oedema, renal failure, clinical deterioration</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">Lithium</td>
                  <td>HD (or prolonged CVVHDF)</td>
                  <td>7 Da / 0.7 L/kg / 0%</td>
                  <td>Level &gt;4 mmol/L, level &gt;2.5 + renal impairment, seizures, reduced consciousness. Rebound common — prolonged or repeat HD</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">Metformin</td>
                  <td>HD (or CVVHDF)</td>
                  <td>129 Da / 1-5 L/kg / 0%</td>
                  <td>Severe lactic acidosis (pH &lt;7.1, lactate &gt;20), haemodynamic instability. Large Vd limits clearance but HD corrects acidosis</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">Valproate</td>
                  <td>HD (or CVVHDF)</td>
                  <td>144 Da / 0.1-0.5 L/kg / 80-95% (saturable)</td>
                  <td>Level &gt;850 mg/L, cerebral oedema, haemodynamic instability. Protein binding saturates in OD → more free drug → more dialysable</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">Theophylline</td>
                  <td>HD (or haemoperfusion)</td>
                  <td>180 Da / 0.5 L/kg / 40%</td>
                  <td>Level &gt;100 mg/L (acute) or &gt;60 mg/L (chronic), seizures, arrhythmias, haemodynamic instability</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">Carbamazepine</td>
                  <td>Haemoperfusion or HD</td>
                  <td>236 Da / 1.4 L/kg / 75%</td>
                  <td>Refractory seizures, life-threatening toxicity. Less efficient than above agents (higher Vd & PB)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">Dabigatran</td>
                  <td>HD</td>
                  <td>628 Da / 0.7 L/kg / 35%</td>
                  <td>Life-threatening bleeding when idarucizumab unavailable. Moderate clearance by HD</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Methotrexate</td>
                  <td>HD / high-flux CVVHDF</td>
                  <td>454 Da / 0.4-0.8 L/kg / 50%</td>
                  <td>High-dose MTX with renal failure and delayed clearance. Glucarpidase preferred if available</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Toxins NOT Effectively Removed</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            The following are <strong>poorly dialysable</strong> due to high Vd, high protein binding, or large molecular weight:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside leading-relaxed mb-3">
            <li><strong>Digoxin</strong> (Vd 5-7 L/kg, 25% PB) — use Fab fragments instead</li>
            <li><strong>Tricyclic antidepressants</strong> (Vd 10-50 L/kg, &gt;90% PB) — tissue-bound</li>
            <li><strong>Benzodiazepines</strong> (Vd 1-3 L/kg, &gt;85% PB) — use flumazenil if indicated</li>
            <li><strong>Calcium channel blockers</strong> (Vd 2-8 L/kg, &gt;90% PB) — high-dose insulin therapy</li>
            <li><strong>Beta-blockers</strong> (most, except atenolol which is dialysable) — glucagon, insulin</li>
            <li><strong>Paracetamol</strong> (Vd 0.9 L/kg, &lt;25% PB) — technically dialysable but NAC is effective; HD only if massive OD with metabolic acidosis and NAC failure</li>
            <li><strong>Iron</strong> — not dialysable; use desferrioxamine</li>
            <li><strong>Phenytoin</strong> (Vd 0.6 L/kg but &gt;90% PB) — highly protein-bound</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">HD vs Haemofiltration vs Haemoperfusion</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Modality</th>
                <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                <th className="text-left py-2 text-foreground font-semibold">Best For</th>
                <th className="text-left py-2 text-foreground font-semibold">Limitations</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">Intermittent HD</td>
                  <td>Diffusion across semipermeable membrane (concentration gradient)</td>
                  <td>Small, water-soluble, low Vd toxins (methanol, ethylene glycol, lithium, salicylates)</td>
                  <td>Rebound after session if large Vd. Haemodynamic instability</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium text-foreground">CVVH / CVVHDF</td>
                  <td>Convection (haemofiltration) ± diffusion. Continuous</td>
                  <td>Haemodynamically unstable patients. Lithium (rebound prevention). Larger molecules up to ~20kDa</td>
                  <td>Lower clearance per unit time vs intermittent HD. Prolonged treatment needed</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Haemoperfusion</td>
                  <td>Adsorption onto activated charcoal or resin cartridge</td>
                  <td>Protein-bound or lipophilic toxins (theophylline, carbamazepine). Now rarely used</td>
                  <td>Cartridge saturation, thrombocytopenia, hypocalcaemia. Largely replaced by high-flux HD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Activated charcoal: most effective <30min, up to 1h. Not for hydrocarbons, metals, acids/alkalis",
        "Paracetamol: NAC within 8h. Nomogram 150mg/kg treatment line. Zone 3 centrilobular necrosis",
        "TCA toxicity: Na⁺ channel blockade → wide QRS. Treat with IV NaHCO₃ if QRS >120ms. R in aVR >3mm is ominous",
        "Organophosphates: atropine (titrate to secretions, large doses) + pralidoxime (early, reactivates AChE)",
        "Salicylate: respiratory alkalosis → metabolic acidosis. Urinary alkalinisation. Dialysis if >700mg/L",
        "Intralipid 20%: 1.5mL/kg bolus for local anaesthetic toxicity (lipid sink mechanism)",
      ]} />
      <QuizSection questions={toxicologyQuestions} />
      <ReferencesList topicId="toxicology" />
      <SeeAlso topicId="toxicology" />
        <TopicCompletionToggle topicId="toxicology" topicTitle="Toxicology &amp; Poisoning" />
    </SectionLayout>
  );
};

export default ToxicologyTopic;
