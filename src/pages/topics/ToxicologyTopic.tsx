import { TopicTemplate } from "@/components/TopicTemplate";
import { toxicologyQuestions } from "@/data/quizzes";
import ParacetamolNomogramDiagram from "@/components/diagrams/ParacetamolNomogramDiagram";
import ToxidromeComparatorDiagram from "@/components/diagrams/ToxidromeComparatorDiagram";
import type { WorkedExample } from "@/components/WorkedExamples";

const objectives = [
  "Apply the ABCDE approach to acute poisoning and identify when to escalate to NPIS/TOXBASE.",
  "Select decontamination and enhanced-elimination strategies appropriately, including the EXTRIP-supported indications for haemodialysis.",
  "Recognise the five core toxidromes (anticholinergic, cholinergic, sympathomimetic, opioid, sedative-hypnotic) on clinical assessment.",
  "Use the UK 100 mg/L paracetamol treatment-line nomogram and decide when to commence NAC.",
  "Manage tricyclic antidepressant overdose with sodium bicarbonate guided by QRS width.",
  "Recall the indication, dose, and pitfalls of intralipid 20% in local anaesthetic systemic toxicity.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Paracetamol — single timed ingestion",
    scenario: (
      <>
        22-year-old, 60 kg, single ingestion of paracetamol 4 h ago. 4-hour level returns at
        130 mg/L. No history of staggered ingestion. Asymptomatic. Decision?
      </>
    ),
    working: (
      <>
        UK MHRA 100 mg/L treatment line at 4 h sits at 100 mg/L. Patient level 130 mg/L is{" "}
        <strong>above the treatment line</strong>. Treatment is indicated regardless of
        symptoms, INR or LFTs.
      </>
    ),
    answer: (
      <>
        Start <strong>IV N-acetylcysteine</strong> (SNAP 12-h regimen: 100 mg/kg over 2 h, then
        200 mg/kg over 10 h). Send baseline INR, ALT, U&E, paracetamol, salicylate, VBG. Repeat
        ALT and INR at end of NAC; continue NAC if ALT &gt;2× ULN, INR &gt;1.3, or paracetamol
        still detectable.
      </>
    ),
  },
  {
    title: "Tricyclic antidepressant overdose",
    scenario: (
      <>
        35-year-old found unresponsive 1 h after amitriptyline ingestion. GCS 8, BP 90/50, HR
        130, ECG: sinus tachycardia, QRS 145 ms, R wave in aVR 4 mm. Next steps?
      </>
    ),
    working: (
      <>
        Toxidrome = anticholinergic + cardiotoxic. Wide QRS (&gt;120 ms) and tall R in aVR
        (&gt;3 mm) reflect <strong>fast Na⁺ channel blockade</strong> — risk of VT/VF. Sodium
        bicarbonate overcomes this by sodium loading and alkalinisation (target pH 7.45–7.55).
      </>
    ),
    answer: (
      <>
        Intubate for airway protection. Give <strong>NaHCO₃ 8.4% 1–2 mmol/kg IV bolus</strong>{" "}
        (≈ 50–100 mL) and repeat until QRS &lt;120 ms or pH 7.55. Avoid class Ia/Ic
        antiarrhythmics, flumazenil, and physostigmine. Treat hypotension with fluids then
        noradrenaline. Seizures → benzodiazepines.
      </>
    ),
  },
  {
    title: "Lithium toxicity — when to dialyse",
    scenario: (
      <>
        Bipolar patient on long-term lithium presents with tremor, ataxia and confusion after
        starting an ACE inhibitor. Lithium 3.2 mmol/L, creatinine 180 µmol/L, GCS 13. Renal
        function previously normal. Should you dialyse?
      </>
    ),
    working: (
      <>
        EXTRIP recommends haemodialysis when lithium &gt;4 mmol/L OR &gt;2.5 mmol/L with renal
        impairment / reduced consciousness / seizures. This patient meets the &gt;2.5 + renal
        impairment + altered consciousness criteria. Lithium has low Vd (0.7 L/kg), no protein
        binding, MW 7 — ideal for HD.
      </>
    ),
    answer: (
      <>
        Start <strong>intermittent haemodialysis</strong>; expect rebound from intracellular
        redistribution → either prolong session (≥6 h) or follow with CVVHDF and recheck level
        6 h after stopping. Stop lithium and the ACE inhibitor. Aggressive IV crystalloid to
        restore renal perfusion.
      </>
    ),
  },
  {
    title: "Local anaesthetic systemic toxicity (LAST)",
    scenario: (
      <>
        70-year-old having an interscalene block with 30 mL bupivacaine 0.5%. Two minutes
        after injection: tinnitus, then tonic-clonic seizure followed by VF cardiac arrest.
        Manage.
      </>
    ),
    working: (
      <>
        AAGBI Lipid Rescue 2010/2023: stop injection, call for help, ALS with adrenaline at
        reduced dose (≤1 µg/kg), avoid lidocaine and vasopressin. Lipid emulsion acts as a{" "}
        <strong>lipid sink</strong> sequestering lipophilic LA + provides metabolic substrate.
      </>
    ),
    answer: (
      <>
        Intralipid 20%: <strong>1.5 mL/kg bolus</strong> over 1 min (≈ 100 mL in a 70 kg adult),
        then <strong>15 mL/kg/h infusion</strong>. Repeat bolus up to 2× and double infusion if
        still arrested. Maximum cumulative dose 12 mL/kg. Continue CPR &gt;1 h — recovery
        documented after prolonged arrest. Report to{" "}
        <a href="https://www.lipidrescue.org" className="text-primary underline">lipidrescue.org</a>.
      </>
    ),
  },
];

const ToxicologyTopic = () => {
  return (
    <TopicTemplate
      title="Toxicology & Poisoning"
      subtitle="FRCA Final / FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        "Stabilise (ABCDE) before identifying the toxin — call NPIS/TOXBASE early",
        "Activated charcoal: best if <1 h post-ingestion; useless for hydrocarbons, metals, alcohols, acids/alkalis",
        "Five core toxidromes: anticholinergic, cholinergic, sympathomimetic, opioid, sedative — pattern recognition guides empirical therapy",
        "Paracetamol: UK 100 mg/L treatment line, NAC most effective <8 h. Treat empirically if staggered or unknown timing",
        "TCA toxicity: wide QRS >120 ms or R in aVR >3 mm → IV NaHCO₃ 1–2 mmol/kg, target pH 7.45–7.55",
        "Salicylate: respiratory alkalosis → mixed → metabolic acidosis. Urinary alkalinisation, dialyse if level >700 mg/L or severe",
        "EXTRIP HD criteria: low Vd (<1 L/kg), low protein binding, MW <500 Da — methanol, ethylene glycol, lithium, salicylates, valproate, metformin",
        "TCAs, digoxin, CCBs, β-blockers (most), iron and phenytoin are NOT effectively dialysed — use specific antidotes",
        "Intralipid 20% for LAST: 1.5 mL/kg bolus then 15 mL/kg/h; max 12 mL/kg",
        "Naloxone: titrate to respiratory rate, not GCS; short t½ — anticipate re-narcotisation, consider infusion",
      ]}
      topicId="toxicology"
      topicTitle="Toxicology & Poisoning"
      quizQuestions={toxicologyQuestions}
      sectionSources={{
        objectives: ["BJA Educ 2016", "NPIS Toxbase"],
        diagrams: ["BJA Educ 2016", "NPIS Toxbase"],
        workedExamples: ["AAGBI Lipid Rescue", "NPIS Toxbase"],
        keyPoints: ["BJA Educ 2016", "AAGBI Lipid Rescue"],
      }}
      diagrams={
        <>
          <ToxidromeComparatorDiagram />
          <ParacetamolNomogramDiagram />
        </>
      }
      coreConcepts={
        <>
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">General Principles</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Poisoning management on the ICU follows a small set of principles: stabilise with ABCDE, identify the toxin (with NPIS/TOXBASE support), decontaminate where appropriate, enhance elimination when an effective modality exists, and recognise the toxidrome patterns that often arrive before a confirmed history.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>ABCDE approach</strong>: stabilise first, identify toxin second. Contact National Poisons Information Service (NPIS/TOXBASE)</li>
              <li><strong>Decontamination</strong>: activated charcoal (1 g/kg) within 1 h of ingestion (most effective &lt;30 min). Not for hydrocarbons, metals, alcohols, acids/alkalis</li>
              <li><strong>Enhanced elimination</strong>: urinary alkalinisation (salicylates, methotrexate), haemodialysis (methanol, ethylene glycol, salicylates, lithium), haemoperfusion (rarely used)</li>
              <li><strong>Toxidromes</strong>: see the comparator below — pattern recognition narrows the differential before a tox screen returns</li>
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
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Paracetamol</td><td>N-acetylcysteine (NAC)</td><td>Replenishes glutathione. Most effective &lt;8 h. Use UK 100 mg/L nomogram. Anaphylactoid reaction common</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Opioids</td><td>Naloxone</td><td>Competitive μ-antagonist. Short t½ (~30–70 min) — may need repeat/infusion. Titrate to respiratory rate, not consciousness</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Benzodiazepines</td><td>Flumazenil</td><td>Competitive antagonist. Risk of seizures in chronic BZD use or mixed OD. Rarely used in ED</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Beta-blockers</td><td>Glucagon (+ high-dose insulin)</td><td>Glucagon: ↑ cAMP via non-adrenergic pathway. High-dose insulin-euglycaemia therapy (1–2 U/kg/h)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Organophosphates</td><td>Atropine + pralidoxime</td><td>Atropine (large doses, titrate to secretions). Pralidoxime reactivates AChE if given early (&lt;24 h)</td></tr>
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
              <li><strong>ECG features</strong>: sinus tachycardia, QRS &gt;100 ms (risk of seizures), QRS &gt;160 ms (risk of VT/VF). Right axis deviation of terminal 40 ms (R in aVR &gt;3 mm)</li>
              <li><strong>Treatment</strong>: IV sodium bicarbonate 8.4% (50–100 mL) for QRS &gt;120 ms or arrhythmias. Target pH 7.45–7.55. Overcomes Na⁺ channel block. Avoid class Ia antiarrhythmics</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Salicylate Poisoning</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>Early: respiratory alkalosis (central stimulation) → mixed metabolic acidosis + respiratory alkalosis → late: metabolic acidosis predominates</li>
              <li>Other features: tinnitus, hypoglycaemia (children), hyperthermia, non-cardiogenic pulmonary oedema, coagulopathy</li>
              <li><strong>Treatment</strong>: activated charcoal (if &lt;1 h), urinary alkalinisation (NaHCO₃ to pH 7.5–8.5), haemodialysis (level &gt;700 mg/L, renal failure, pulmonary oedema, seizures)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Extracorporeal Removal of Toxins</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Extracorporeal techniques (haemodialysis, haemofiltration, haemoperfusion) can remove toxins that meet specific pharmacokinetic criteria. The <strong>EXTRIP</strong> (Extracorporeal Treatments in Poisoning) workgroup provides evidence-based recommendations.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Characteristics Favouring Extracorporeal Removal</h3>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside leading-relaxed mb-4">
              <li><strong>Low molecular weight</strong> (&lt;500 Da for HD; up to ~20 000 Da for haemofiltration)</li>
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
                  <tr className="border-b border-border/50"><td className="py-2 font-medium text-foreground">Methanol</td><td>Haemodialysis (HD)</td><td>32 Da / 0.6 L/kg / 0%</td><td>pH &lt;7.15, visual symptoms, renal failure, level &gt;500 mg/L, deterioration despite fomepizole</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 font-medium text-foreground">Ethylene glycol</td><td>HD</td><td>62 Da / 0.8 L/kg / 0%</td><td>pH &lt;7.1, renal failure, level &gt;500 mg/L, deterioration despite fomepizole</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 font-medium text-foreground">Salicylates</td><td>HD</td><td>138 Da / 0.2 L/kg / 90% (↓ in OD)</td><td>Level &gt;700 mg/L, pH &lt;7.2, cerebral/pulmonary oedema, renal failure, clinical deterioration</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 font-medium text-foreground">Lithium</td><td>HD (or prolonged CVVHDF)</td><td>7 Da / 0.7 L/kg / 0%</td><td>Level &gt;4 mmol/L, level &gt;2.5 + renal impairment, seizures, reduced consciousness. Rebound common — prolonged or repeat HD</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 font-medium text-foreground">Metformin</td><td>HD (or CVVHDF)</td><td>129 Da / 1–5 L/kg / 0%</td><td>Severe lactic acidosis (pH &lt;7.1, lactate &gt;20), haemodynamic instability. Large Vd limits clearance but HD corrects acidosis</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 font-medium text-foreground">Valproate</td><td>HD (or CVVHDF)</td><td>144 Da / 0.1–0.5 L/kg / 80–95% (saturable)</td><td>Level &gt;850 mg/L, cerebral oedema, haemodynamic instability. Protein binding saturates in OD → more free drug → more dialysable</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 font-medium text-foreground">Theophylline</td><td>HD (or haemoperfusion)</td><td>180 Da / 0.5 L/kg / 40%</td><td>Level &gt;100 mg/L (acute) or &gt;60 mg/L (chronic), seizures, arrhythmias, haemodynamic instability</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 font-medium text-foreground">Carbamazepine</td><td>Haemoperfusion or HD</td><td>236 Da / 1.4 L/kg / 75%</td><td>Refractory seizures, life-threatening toxicity. Less efficient than above agents (higher Vd & PB)</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 font-medium text-foreground">Dabigatran</td><td>HD</td><td>628 Da / 0.7 L/kg / 35%</td><td>Life-threatening bleeding when idarucizumab unavailable. Moderate clearance by HD</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Methotrexate</td><td>HD / high-flux CVVHDF</td><td>454 Da / 0.4–0.8 L/kg / 50%</td><td>High-dose MTX with renal failure and delayed clearance. Glucarpidase preferred if available</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Toxins NOT Effectively Removed</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              The following are <strong>poorly dialysable</strong> due to high Vd, high protein binding, or large molecular weight:
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside leading-relaxed mb-3">
              <li><strong>Digoxin</strong> (Vd 5–7 L/kg, 25% PB) — use Fab fragments instead</li>
              <li><strong>Tricyclic antidepressants</strong> (Vd 10–50 L/kg, &gt;90% PB) — tissue-bound</li>
              <li><strong>Benzodiazepines</strong> (Vd 1–3 L/kg, &gt;85% PB) — use flumazenil if indicated</li>
              <li><strong>Calcium channel blockers</strong> (Vd 2–8 L/kg, &gt;90% PB) — high-dose insulin therapy</li>
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
                  <tr className="border-b border-border/50"><td className="py-2 font-medium text-foreground">Intermittent HD</td><td>Diffusion across semipermeable membrane (concentration gradient)</td><td>Small, water-soluble, low Vd toxins (methanol, ethylene glycol, lithium, salicylates)</td><td>Rebound after session if large Vd. Haemodynamic instability</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 font-medium text-foreground">CVVH / CVVHDF</td><td>Convection (haemofiltration) ± diffusion. Continuous</td><td>Haemodynamically unstable patients. Lithium (rebound prevention). Larger molecules up to ~20 kDa</td><td>Lower clearance per unit time vs intermittent HD. Prolonged treatment needed</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Haemoperfusion</td><td>Adsorption onto activated charcoal or resin cartridge</td><td>Protein-bound or lipophilic toxins (theophylline, carbamazepine). Now rarely used</td><td>Cartridge saturation, thrombocytopenia, hypocalcaemia. Largely replaced by high-flux HD</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      }
    />
  );
};

export default ToxicologyTopic;
