import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { toxicologyQuestions } from "@/data/quizzes";
import ParacetamolNomogramDiagram from "@/components/diagrams/intensive-care/ParacetamolNomogramDiagram";
import ToxidromeComparatorDiagram from "@/components/diagrams/intensive-care/ToxidromeComparatorDiagram";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const toxicologyFaqs: Array<[string, string]> = [
  ["When is haemodialysis indicated in poisoning?", "For low-Vd, low-protein-bound, water-soluble toxins: salicylates (≥7.2 mmol/L or AKI), methanol/ethylene glycol, lithium (>4 mmol/L acute), valproate (severe), metformin-associated lactic acidosis, and theophylline."],
  ["How is lipid emulsion used in local anaesthetic toxicity?", "20% Intralipid 1.5 mL/kg bolus followed by 0.25 mL/kg/min infusion, repeat boluses up to 3 doses and double the infusion if circulation not restored (AAGBI 2010); maximum 12 mL/kg in 30 min."],
  ["What is the antidote and threshold for paracetamol overdose?", "N-acetylcysteine using the 21-h SNAP/IV regimen; treat if plasma paracetamol crosses the single 100 mg/L at 4 h treatment line, with staggered ingestion or unknown timing, or in established hepatotoxicity."],
];

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
    cites: ["BJA Educ 2016"],
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
    cites: ["NPIS Toxbase"],
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
    cites: ["AAGBI Lipid Rescue"],
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
        Intralipid 20% (Association of Anaesthetists 2023, weight-banded): if <strong>&gt;70 kg</strong>,
        a fixed <strong>100 mL bolus</strong> over 2–3 min then an infusion at{" "}
        <strong>1000 mL/hr</strong>; if <strong>&lt;70 kg</strong>, <strong>1.5 mL/kg bolus</strong> then{" "}
        <strong>15 mL/kg/hr</strong>. Up to <strong>two repeat boluses</strong> at 5-min intervals (three
        boluses in total) and the infusion may be doubled if circulation is not restored. Maximum cumulative dose 12 mL/kg. Continue CPR &gt;1 h — recovery
        documented after prolonged arrest. Report to{" "}
        <a href="https://www.lipidrescue.org" className="text-primary underline">lipidrescue.org</a>.
      </>
    ),
    cites: ["BJA Educ 2016"],
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
        { text: "Stabilise (ABCDE) before identifying the toxin — call NPIS/TOXBASE early", cites: ["NPIS Toxbase"] },
        { text: "Activated charcoal: best if <1 h post-ingestion; useless for hydrocarbons, metals, alcohols, acids/alkalis", cites: ["AAGBI Lipid Rescue"] },
        { text: "Five core toxidromes: anticholinergic, cholinergic, sympathomimetic, opioid, sedative — pattern recognition guides empirical therapy", cites: ["BJA Educ 2016"] },
        { text: "Paracetamol: UK 100 mg/L treatment line, NAC most effective <8 h. Treat empirically if staggered or unknown timing", cites: ["NPIS Toxbase"] },
        { text: "TCA toxicity: wide QRS >120 ms or R in aVR >3 mm → IV NaHCO₃ 1–2 mmol/kg, target pH 7.45–7.55", cites: ["AAGBI Lipid Rescue"] },
        { text: "Salicylate: respiratory alkalosis → mixed → metabolic acidosis. Urinary alkalinisation, dialyse if level >700 mg/L or severe", cites: ["BJA Educ 2016"] },
        { text: "EXTRIP HD criteria: low Vd (<1 L/kg), low protein binding, MW <500 Da — methanol, ethylene glycol, lithium, salicylates, valproate, metformin", cites: ["NPIS Toxbase"] },
        { text: "TCAs, digoxin, CCBs, β-blockers (most), iron and phenytoin are NOT effectively dialysed — use specific antidotes", cites: ["AAGBI Lipid Rescue"] },
        { text: "Intralipid 20% for LAST (AoA 2023): >70 kg — 100 mL bolus then 1000 mL/hr; <70 kg — 1.5 mL/kg bolus then 15 mL/kg/hr; up to 2 repeat boluses (3 total), max 12 mL/kg", cites: ["AAGBI Lipid Rescue"] },
        { text: "Naloxone: titrate to respiratory rate, not GCS; short t½ — anticipate re-narcotisation, consider infusion", cites: ["NPIS Toxbase"] },
      ]}
      topicId="toxicology"
      topicTitle="Toxicology & Poisoning"
      quizQuestions={toxicologyQuestions}
      sectionSources={{
        objectives: ["BJA Educ 2016", "NPIS Toxbase"],
        workedExamples: ["AAGBI Lipid Rescue", "NPIS Toxbase", "BJA Educ 2016"],
        keyPoints: ["BJA Educ 2016", "AAGBI Lipid Rescue", "NPIS Toxbase"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC], curriculumCodes: ["CC1.10", "11A04"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
        <>
          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["CC1.10"]}>
            <CollapsibleSubsection title="General Principles" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Poisoning management on the ICU follows a small set of principles: stabilise with ABCDE, identify the toxin (with NPIS/TOXBASE support), decontaminate where appropriate, enhance elimination when an effective modality exists, and recognise the toxidrome patterns that often arrive before a confirmed history.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>ABCDE approach</strong>: stabilise first, identify toxin second. Contact National Poisons Information Service (NPIS/TOXBASE)</li>
              <li><strong>Decontamination</strong>: activated charcoal (1 g/kg) within 1 h of ingestion (most effective &lt;30 min). Not for hydrocarbons, metals, alcohols, acids/alkalis</li>
              <li><strong>Enhanced elimination</strong>: urinary alkalinisation (salicylates, methotrexate), haemodialysis (methanol, ethylene glycol, salicylates, lithium), haemoperfusion (rarely used)</li>
              <li><strong>Toxidromes</strong>: see the comparator below — pattern recognition narrows the differential before a tox screen returns</li>
            </ul>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <ToxidromeComparatorDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Specific Antidotes">
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
                  <tr><td className="py-2 font-medium text-foreground">Local anaesthetic toxicity</td><td>Intralipid 20%</td><td>&gt;70 kg: 100 mL bolus then 1000 mL/hr. &lt;70 kg: 1.5 mL/kg bolus then 15 mL/kg/hr (AoA 2023). Acts as 'lipid sink' + metabolic support</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <ParacetamolNomogramDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="High-Dose Insulin Euglycaemia Therapy (HIET)">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Mechanism</strong>: direct positive inotropy, shifts myocardial metabolism from free fatty acids to carbohydrate substrate, and improves myocardial and peripheral glucose uptake in the insulin-resistant, hypoinsulinaemic state of severe CCB/beta-blocker toxicity</li>
              <li><strong>Indication</strong>: refractory cardiogenic shock in beta-blocker and calcium-channel-blocker overdose; increasingly used as a first-line agent (alongside calcium and fluids) in CCB toxicity rather than a rescue therapy</li>
              <li><strong>Protocol</strong>: short-acting (Actrapid) insulin 1 unit/kg IV bolus, then infusion 0.5–2 units/kg/h; give 50 mL of 50% glucose bolus alongside, followed by 10% glucose infusion titrated to keep glucose &gt;5.5 mmol/L</li>
              <li><strong>Monitoring</strong>: capillary glucose hourly (reducing to 2-hourly once stable), potassium 2–4 hourly with supplementation as it falls intracellularly; use central venous access given large glucose/insulin volumes and risk of hyponatraemia from free water load</li>
              <li><strong>Titration and weaning</strong>: titrate insulin infusion to haemodynamic effect (may take 30–60 min to see benefit); wean gradually over 12–24 h once haemodynamics recover, and continue glucose monitoring for several hours after stopping because of the risk of delayed hypoglycaemia</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-2">
              <InlineRef topicId="toxicology" refLabel="BJA Educ 2021 Cardiotox" />
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Tricyclic Antidepressant OD">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Mechanism of toxicity</strong>: Na⁺ channel blockade (→ wide QRS, arrhythmias), anticholinergic effects, α₁ blockade (→ hypotension), serotonin/noradrenaline reuptake inhibition</li>
              <li><strong>ECG features</strong>: sinus tachycardia, QRS &gt;100 ms (risk of seizures), QRS &gt;160 ms (risk of VT/VF). Right axis deviation of terminal 40 ms (R in aVR &gt;3 mm)</li>
              <li><strong>Treatment</strong>: IV sodium bicarbonate 8.4% (50–100 mL) for QRS &gt;120 ms or R in aVR &gt;3 mm, or for arrhythmias. Target pH 7.45–7.55. Overcomes Na⁺ channel block. Avoid class Ia antiarrhythmics</li>
              <li><strong>Hypotension is multifactorial</strong>: α₁ blockade causes both venodilatation (reduced preload) and arteriolar dilatation (reduced afterload), while Na⁺-channel blockade reduces myocardial contractility and cardiac output. Treat with an initial IV fluid bolus, then noradrenaline as the vasopressor of choice; ensure adequate sodium bicarbonate (QRS &gt;120 ms or R in aVR, target pH 7.45–7.55) is running concurrently as it also improves inotropy and reverses hypotension</li>
              <li><strong>Refractory shock</strong>: consider methylene blue 1–2 mg/kg (caution in serotonin syndrome/serotonergic co-ingestion — risk of precipitating it), lipid emulsion therapy, and mechanical circulatory support (e.g. VA-ECMO) as a bridge to toxin clearance</li>
              <li><strong>Antiarrhythmic caution</strong>: avoid class Ia and Ic (further Na⁺-channel blockade) and class III agents (further QT prolongation); use magnesium for torsade de pointes</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-2">
              <InlineRef topicId="toxicology" refLabel="BJA Educ 2021 Cardiotox" />
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Salicylate Poisoning">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>Early: respiratory alkalosis (central stimulation) → mixed metabolic acidosis + respiratory alkalosis → late: metabolic acidosis predominates</li>
              <li>Other features: tinnitus, hypoglycaemia (children), hyperthermia, non-cardiogenic pulmonary oedema, coagulopathy</li>
              <li><strong>Treatment</strong>: activated charcoal (if &lt;1 h), urinary alkalinisation (NaHCO₃ to pH 7.5–8.5), haemodialysis (level &gt;700 mg/L, renal failure, pulmonary oedema, seizures)</li>
              <li><strong>Urinary alkalinisation protocol</strong>: 8.4% sodium bicarbonate 1–2 mmol/kg IV bolus, then a 1.26% infusion (or 150 mmol NaHCO₃ in 1 L 5% glucose) titrated to a urine pH of 7.5–8.5, while keeping serum pH ≤7.55 to avoid iatrogenic alkalaemia</li>
              <li>Correct <strong>hypokalaemia</strong> aggressively — the kidney preferentially reabsorbs K⁺ and secretes H⁺ when hypokalaemic, which prevents effective urinary alkalinisation despite bicarbonate administration</li>
              <li>Use urinary alkalinisation with caution (or avoid) in pulmonary or cerebral oedema, heart failure and renal failure, where volume/sodium load is poorly tolerated and haemodialysis should be considered instead</li>
              <li><strong>Haemodialysis indications</strong>: level &gt;700 mg/L (or &gt;500 mg/L with renal impairment), altered consciousness, seizures, refractory metabolic acidosis, or pulmonary oedema</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-2">
              <InlineRef topicId="toxicology" refLabel="NPIS Toxbase" /> <InlineRef topicId="toxicology" refLabel="BJA Educ 2016" />
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Extracorporeal Removal of Toxins">
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
                  <tr><td className="py-2 font-medium text-foreground">Haemoperfusion</td><td>Adsorption onto activated charcoal or resin cartridge</td><td>Protein-bound or lipophilic toxins (theophylline, carbamazepine) not well cleared by HD</td><td>Limited availability, cartridge saturation, thrombocytopenia, hypocalcaemia, hypoglycaemia. Largely replaced by high-flux HD</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Charcoal haemoperfusion clears protein-bound and lipophilic toxins more effectively than haemodialysis and remains an EXTRIP-recommended treatment for severe theophylline poisoning (seizures, life-threatening ventricular arrhythmias, refractory hypotension) and for carbamazepine toxicity refractory to standard supportive care. Its use is constrained by limited availability, cartridge saturation with time, thrombocytopenia, hypocalcaemia and hypoglycaemia. <InlineRef topicId="toxicology" refLabel="EXTRIP Theophylline" />
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 2.6"]}>
            <CollapsibleSubsection title="Ricin">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Ricin is a 64-kDa lectin toxin (A + B chain) extracted from <em>Ricinus communis</em> (castor bean). The B-chain
              binds galactose residues on cell surfaces; the A-chain is internalised and depurinates 28S rRNA, irreversibly
              halting protein synthesis and causing apoptosis. It is a Schedule 1 chemical weapon and a CDC Category B
              bioterror agent (1978 Markov "umbrella" assassination, 2013 US ricin letters).
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Routes &amp; clinical syndromes</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><strong>Inhalation</strong> (lethal dose ~1–10 µg/kg): 4–8 h latency → fever, cough, dyspnoea, ARDS, refractory hypoxaemia, shock; death within 36–72 h.</li>
                  <li><strong>Ingestion</strong> (lethal dose ~1–20 mg/kg, requires chewing seeds): haemorrhagic gastroenteritis, hepatic and renal failure, multi-organ failure over days.</li>
                  <li><strong>Injection / dart</strong> (Markov, 0.5 mg pellet): local pain and induration → fever, hypotension, vascular collapse, MOF in 24–72 h.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Diagnosis</p>
                <p className="text-sm text-muted-foreground">Clinical (cluster of casualties + epidemiology). Confirmation by ELISA, PCR for castor-bean DNA, mass spectrometry on serum/nasal swabs/environmental samples — via the UK Health Security Agency (UKHSA, formerly PHE Porton Down).</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Management</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><strong>No specific antidote.</strong> Vaccines (RiVax, RVEc) are in trials only.</li>
                  <li><strong>Decontamination</strong>: remove and double-bag clothing; wash skin with soap and water (not for primary protection — toxin is not dermally active in intact skin); standard PPE protects staff (not volatile, not contagious).</li>
                  <li><strong>Supportive ICU care</strong>: protective lung ventilation for ARDS, vasopressors, RRT for AKI, blood products for haemorrhagic colitis, nutritional support, NAC and antioxidants empirically.</li>
                  <li><strong>Notify</strong> UKHSA, police (CT-SFO), HART team, HAZMAT; secure scene; counsel staff (no person-to-person spread).</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 2.6"]}>
            <CollapsibleSubsection title="Novichok & Organophosphate Nerve Agents">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Novichok ("newcomer") agents are fourth-generation organophosphate (OP) nerve agents developed by the Soviet Foviet-1 programme
              (A-230, A-232, A-234). They are 5–8× more potent than VX, can be delivered as a binary (two relatively safe precursors mixed
              on use), and persist as oily liquids at room temperature (Salisbury 2018; Navalny 2020). Mechanism is identical to other OPs —
              irreversible inhibition of acetylcholinesterase causing cholinergic crisis — but ageing of the enzyme–OP bond is rapid, making
              early oxime therapy critical.
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Toxidrome — DUMBELS &amp; killer Bs</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><strong>Muscarinic (DUMBELS)</strong>: Diarrhoea, Urination, Miosis, Bronchorrhoea/Bronchospasm, Emesis, Lacrimation, Salivation.</li>
                  <li><strong>Killer Bs</strong>: <em>B</em>radycardia, <em>B</em>ronchorrhoea, <em>B</em>ronchospasm — the proximate causes of death.</li>
                  <li><strong>Nicotinic</strong>: muscle fasciculation → flaccid paralysis, tachycardia, hypertension.</li>
                  <li><strong>Central</strong>: agitation → coma, seizures, central apnoea.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Decontamination &amp; staff protection</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><strong>PPE</strong>: full Powered Respirator Protective Suit (PRPS / Level A) for primary responders; standard contact + droplet precautions in resus once decontaminated. <em>Off-gassing</em> is a real risk for healthcare staff.</li>
                  <li><strong>Disrobe + dry decontamination</strong> removes ~90 % of agent; then wet decontamination with soap and water, eyes irrigated; secure clothing as evidence.</li>
                  <li>Trigger HART, HAZMAT, UKHSA CBRN team; declare a CBRN major incident; police lead crime scene.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Resuscitation &amp; antidotes</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><strong>Atropine</strong> 1.2–2 mg IV doubling every 3–5 min until secretions dry and bronchospasm resolves (mydriasis and tachycardia are <em>not</em> end-points). Doses of 50–100+ mg in 24 h are not unusual; run as infusion (0.02–0.08 mg/kg/h).</li>
                  <li><strong>Pralidoxime (2-PAM)</strong> 30 mg/kg IV bolus then 8 mg/kg/h infusion — must be given <em>before</em> ageing of the AChE–OP complex. Novichok ages within minutes to hours; benefit may be limited and is debated, but give it.</li>
                  <li><strong>Benzodiazepines</strong> (midazolam 10 mg IM / IV, repeat) — first-line anticonvulsant and reduces central toxicity; give empirically with severe exposure.</li>
                  <li><strong>Airway</strong>: RSI for secretions, bronchospasm or coma. <em>Avoid suxamethonium</em> — metabolised by plasma cholinesterase (also inhibited) → prolonged paralysis (hours). Use rocuronium with sugammadex on standby.</li>
                  <li><strong>Ventilation</strong>: lung-protective; suction copious secretions; expect prolonged mechanical ventilation (Skripals: weeks; Navalny: weeks).</li>
                  <li><strong>Adjuncts</strong>: glycopyrronium for ongoing secretions; magnesium for bronchospasm and reduced ACh release; consider intralipid for refractory cardiotoxicity (case reports only).</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Confirmation &amp; reporting</p>
                <p className="text-sm text-muted-foreground">Plasma and red-cell cholinesterase activity (suppressed; RBC AChE more reliable for chronic monitoring). Definitive identification by mass spectrometry at the OPCW-designated laboratory (Defence Science and Technology Laboratory, Porton Down). Report immediately to UKHSA and police; OPCW notification through the Foreign, Commonwealth and Development Office.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic mt-3">
              Both ricin and novichok are Schedule 1 agents under the Chemical Weapons Convention. Suspected intentional exposure is a
              counter-terrorism event — preserve scene, documentation and clinical samples for the chain of evidence.
            </p>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "ABC first, then specific antidote; consult TOXBASE.",
              "Paracetamol — NAC by nomogram (140 mg/kg load); opioid — naloxone titrated (start 100–400 µg IV); β-blocker/CCB — glucagon, high-dose insulin euglycaemia.",
              "TCA overdose: wide QRS + hypotension → sodium bicarbonate 1–2 mmol/kg; treat seizures and arrhythmias.",
              "LAST: 20% Intralipid — >70 kg 100 mL bolus then 1000 mL/hr; <70 kg 1.5 mL/kg bolus then 15 mL/kg/hr (= 0.25 mL/kg/min); up to 2 repeat boluses, max 12 mL/kg.",
              "Toxidromes: cholinergic (DUMBELS — atropine + pralidoxime), anticholinergic (hot/dry/mad), sympathomimetic, opioid, sedative.",
            ]}
          />
        </>
          <TopicFaqs faqs={toxicologyFaqs} />
        </>
      }
    />
  );
};

export default ToxicologyTopic;
