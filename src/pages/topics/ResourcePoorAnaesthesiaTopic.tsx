import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { resourcePoorAnaesthesiaQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Describe the WHO–WFSA International Standards for a Safe Practice of Anaesthesia and how they apply when capacity is constrained",
  "Plan a safe general anaesthetic when only a draw-over vaporiser, room air and intermittent oxygen are available",
  "Prioritise spinal, ketamine-based and regional techniques to deliver surgery without reliable theatre infrastructure",
  "Anticipate and mitigate the impact of intermittent oxygen, blood, electricity and trained assistance on the perioperative pathway",
  "Apply Lifebox pulse oximetry, the WHO Surgical Safety Checklist and SAFE-style training principles to improve outcomes",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Emergency caesarean section with no reliable cylinder oxygen",
    scenario:
      "A district hospital in sub-Saharan Africa: 24-year-old G3P2 with obstructed labour and fetal distress. Mains electricity is intermittent, the single oxygen concentrator is shared with paediatrics, no piped gas, no opioids except pethidine, and one ampoule of phenylephrine in the cupboard. The only anaesthetic provider is a non-physician anaesthetist. How do you proceed?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step approach</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Default to spinal anaesthesia.</strong> Hyperbaric bupivacaine 0.5% 2–2.2 mL gives a reliable T4 block, avoids airway management, preserves uterine tone and removes dependence on continuous oxygen and a ventilator.</li>
          <li><strong>Pre-load and co-load.</strong> 10 mL/kg crystalloid; left lateral tilt or manual uterine displacement; vasopressor drawn up — phenylephrine 100 µg or ephedrine 6 mg boluses titrated to maternal SBP ≥ 100 mmHg.</li>
          <li><strong>Plan for failure of spinal.</strong> If failed/inadequate or contraindicated: ketamine 1–2 mg/kg IV induction with cricoid pressure, suxamethonium 1.5 mg/kg, intubate, maintain on draw-over halothane/isoflurane in air with O₂ enrichment from the concentrator (target SpO₂ ≥ 94%, accept lower briefly if concentrator fails).</li>
          <li><strong>Lifebox oximeter.</strong> Battery-powered, mandatory under WHO–WFSA standards — apply before induction.</li>
          <li><strong>Uterotonics.</strong> Oxytocin 5 IU slow IV after delivery; misoprostol 800 µg sublingual if oxytocin cold-chain has failed.</li>
          <li><strong>Analgesia.</strong> Intrathecal morphine 100 µg (if available and trained monitoring exists) OR wound infiltration + paracetamol + diclofenac + pethidine PRN.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Spinal first — ketamine GA only if spinal fails or refused; awake fibreoptic and TIVA pumps are not realistic.</li>
          <li>Confirm the concentrator works on the generator before induction; have a self-inflating bag (Ambu/Laerdal) at the head of the bed.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Using high-dose volatile in air without O₂ enrichment — SpO₂ falls quickly, especially in anaemic obstetric patients.</li>
            <li>Forgetting that ergometrine is contraindicated in pre-eclampsia — common in late presenters.</li>
            <li>Allowing the only working pulse oximeter to be moved to recovery before the patient is reversed.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Single-shot spinal with hyperbaric bupivacaine, phenylephrine/ephedrine support and Lifebox oximetry is the safest default. Reserve ketamine RSI with draw-over volatile in O₂-enriched air for failed/contraindicated spinal. Plan uterotonics around the available cold chain.",
   cites: ["WFSA Update Anaesth"],
  },
  {
    title: "Open tibial fracture in a rural hospital with intermittent power",
    scenario:
      "A 30-year-old man presents with an open tibial fracture 12 h after a road traffic crash. The hospital has a draw-over vaporiser (EMO/Diamedica), one functioning oxygen concentrator (5 L/min), no nerve stimulator, no ultrasound, ketamine, suxamethonium, lidocaine 2% plain, and bupivacaine 0.5% heavy. Generator runs 6 h/day. Plan the anaesthetic.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step approach</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Choose regional first.</strong> Spinal anaesthesia with hyperbaric bupivacaine 2.5–3 mL gives 2–3 h surgical time and avoids airway management entirely.</li>
          <li><strong>If spinal contraindicated</strong> (sepsis at puncture site, refusal, severe hypovolaemia): landmark sciatic + femoral block using lidocaine 2% with adrenaline (1:200 000), max 7 mg/kg — accept slower onset without nerve stimulator.</li>
          <li><strong>Backup GA plan.</strong> Ketamine 1.5 mg/kg + midazolam 0.05 mg/kg, spontaneous ventilation via face mask with draw-over halothane 0.5–1% in O₂-enriched air. Avoid suxamethonium unless intubation truly required (limited monitoring of K⁺).</li>
          <li><strong>Power and oxygen contingency.</strong> Concentrator fails when generator is off — keep self-inflating bag and a full E-cylinder in theatre. Do the case during generator hours where possible.</li>
          <li><strong>Tetanus and antibiotics.</strong> Tetanus toxoid + immunoglobulin if status unknown; benzylpenicillin + metronidazole + gentamicin (Gustilo III). Wash-out is the analgesic intervention with the largest survival impact.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Single-injection spinal is the highest-yield, lowest-risk choice when surgical time fits.</li>
          <li>Prefer halothane or isoflurane via draw-over over TIVA — pumps drain batteries and ampoules of propofol are scarce.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Using ketamine alone without a benzodiazepine — high incidence of emergence phenomena in awake adults.</li>
            <li>Forgetting that draw-over vaporisers deliver lower concentrations at high minute volumes — consider supplementary IV agent if patient is light.</li>
            <li>Running concentrator and ventilator from the same socket on a generator switchover — both fail simultaneously.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Spinal anaesthesia is the default. Backup is landmark femoral + sciatic block; if both unsuitable, ketamine sedation with draw-over halothane in O₂-enriched air. Plan around the generator, keep a self-inflating bag and cylinder oxygen ready, and give tetanus prophylaxis and broad-spectrum antibiotics.",
   cites: ["Lifebox"],
  },
];

const ResourcePoorAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Anaesthesia in Resource-Poor Settings"
      subtitle="Safe practice when oxygen, electricity, drugs and trained assistance cannot be assumed"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="resource-poor-anaesthesia"
      topicTitle="Anaesthesia in Resource-Poor Settings"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={resourcePoorAnaesthesiaQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["WHO-WFSA Standards 2018", "WFSA Update Anaesth", "Lifebox"],
        workedExamples: ["WHO-WFSA Standards 2018", "WFSA Update Anaesth", "AAGBI Global 2009"],
        keyPoints: ["WHO-WFSA Standards 2018", "Lifebox", "AAGBI Global 2009"],
      }}
      keyPoints={[
        { text: "WHO–WFSA International Standards (2018) define HIGHLY RECOMMENDED minimums: trained anaesthesia provider, pulse oximeter, oxygen, suction, self-inflating bag, emergency drugs", cites: ["WHO-WFSA Standards 2018"] },
        { text: "Pulse oximetry is the single highest-impact monitor — Lifebox provides robust, battery-powered oximeters specifically for low-resource theatres", cites: ["WFSA Update Anaesth"] },
        { text: "Default to regional/spinal anaesthesia when surgical access allows — independence from oxygen, electricity and ventilators", cites: ["Lifebox"] },
        { text: "Ketamine is the workhorse induction/maintenance agent: preserves airway reflexes, supports BP, runs without infusion pumps; combine with benzodiazepine to attenuate emergence phenomena", cites: ["AAGBI Global 2009"] },
        { text: "Draw-over vaporisers (EMO, Diamedica DPA) deliver volatile in air ± O₂ enrichment from a concentrator — independent of compressed gas", cites: ["Lancet Commission GS 2015"] },
        { text: "Always have a self-inflating bag (Ambu/Laerdal), Magill forceps and a working laryngoscope — these are non-negotiable even in austere settings", cites: ["WHO Checklist 2009"] },
        { text: "WHO Surgical Safety Checklist reduces mortality by ~40% — adopt regardless of resource level; SAFE Obstetrics & Paediatrics courses build local capacity", cites: ["WHO-WFSA Standards 2018"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="standards" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="WHO–WFSA International Standards" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Updated 2018, the WHO–WFSA International Standards for a Safe Practice of Anaesthesia stratify requirements as <strong>HIGHLY RECOMMENDED</strong>, <strong>RECOMMENDED</strong> and <strong>SUGGESTED</strong>. The HIGHLY RECOMMENDED level is the irreducible minimum below which anaesthesia should not proceed.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Provider</strong>: trained anaesthesia provider physically present from induction to recovery handover</li>
              <li><strong>Monitoring</strong>: continuous pulse oximetry, intermittent NIBP, continuous clinical observation; capnography wherever a tracheal tube or supraglottic device is used</li>
              <li><strong>Oxygen</strong>: a reliable supply — cylinder, concentrator or piped — with a backup; means to deliver positive-pressure ventilation (self-inflating bag)</li>
              <li><strong>Drugs &amp; equipment</strong>: emergency drugs (adrenaline, atropine, suxamethonium, induction agent), suction, laryngoscope, range of tubes, IV access, fluids</li>
              <li><strong>Recovery</strong>: dedicated area with oxygen, suction and oximetry until patient is awake and stable</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="techniques" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Anaesthetic Techniques of Choice">
            <div className="space-y-3">
              {[
                { area: "Spinal anaesthesia", detail: "Workhorse for caesarean section, lower limb, perineal and lower abdominal surgery. Independent of oxygen and ventilators. Hyperbaric bupivacaine 0.5% is the standard agent. Always have phenylephrine/ephedrine and IV fluid running." },
                { area: "Ketamine ± benzodiazepine", detail: "1–2 mg/kg IV (or 5–10 mg/kg IM) for induction; 0.5 mg/kg IV top-ups for maintenance. Preserves airway and ventilation, supports BP. Combine with midazolam 0.03–0.05 mg/kg to reduce emergence phenomena." },
                { area: "Draw-over volatile anaesthesia", detail: "EMO (ether/halothane), Diamedica DPA, Oxford Miniature Vaporiser. Patient inspiration draws room air through the vaporiser; O₂ is enriched from a concentrator. Works with no compressed gas, no electricity for the vaporiser itself." },
                { area: "Landmark regional blocks", detail: "Femoral, sciatic, brachial plexus (axillary/supraclavicular) using anatomical landmarks. Lidocaine with adrenaline extends duration and raises maximum dose to ~7 mg/kg. Ultrasound and nerve stimulators improve safety where available." },
                { area: "Local infiltration / field blocks", detail: "Wound infiltration, TAP, ilio-inguinal blocks for hernia. Reduces opioid requirement when none is available." },
              ].map(item => (
                <div key={item.area} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.area}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="oxygen-power" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Oxygen, Power and Equipment Realities">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Oxygen concentrators</strong>: deliver 90–96% O₂ at up to 5–10 L/min, require electricity. Useful for enrichment of draw-over circuits and recovery. Vulnerable to dust, humidity and intermittent power.</li>
              <li><strong>Cylinder oxygen</strong>: scarce and expensive. Reserve for transport, induction, intubation and emergencies. Maintain a full E-cylinder backup in theatre at all times.</li>
              <li><strong>Self-inflating bag</strong> (Ambu/Laerdal): mandatory — provides positive-pressure ventilation independent of any gas supply. Reservoir bag attached to O₂ source delivers ≥ 85% FiO₂.</li>
              <li><strong>Power</strong>: most LMIC hospitals run intermittent grid + diesel generator + UPS only for theatres. Plan elective lists around generator hours; identify which sockets are on UPS before induction.</li>
              <li><strong>Lifebox pulse oximeter</strong>: WHO-WFSA endorsed, battery-powered, designed to survive humidity, dust and rough handling. Distributed with structured training in oximetry interpretation.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="workforce-systems" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Workforce, Training and Systems">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Non-physician anaesthesia providers</strong> deliver the majority of anaesthesia in many LMICs (clinical officers, nurse anaesthetists, anaesthetic medical officers). Lancet Commission on Global Surgery (2015) target: ≥ 20 surgical/anaesthetic/obstetric specialists per 100 000 population.</li>
              <li><strong>WHO Surgical Safety Checklist</strong>: simple, no-cost intervention reducing mortality and complications by ~30–40% across all settings.</li>
              <li><strong>SAFE courses</strong> (Safer Anaesthesia From Education — Obstetric, Paediatric, OR) deliver context-appropriate refresher training; run jointly by AAGBI/WFSA with national societies.</li>
              <li><strong>Mentorship and equipment</strong>: donations should match local capacity to repair/maintain — 'graveyards' of unused equipment are a common harm. Standardise to a small number of robust, repairable devices (e.g., Glostavent® anaesthetic machine).</li>
              <li><strong>Ethics</strong>: visiting teams should support local services, not substitute for them; long-term partnerships and capacity building outperform short missions.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="emergencies" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Emergencies When Resources Fail">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Concentrator/power failure mid-case</strong>: switch to cylinder O₂, hand-ventilate with self-inflating bag, complete or pause surgery as clinical priority dictates.</li>
              <li><strong>No blood available</strong>: tranexamic acid 1 g (CRASH-2 evidence within 3 h of trauma); permissive hypotension until surgical control; cell salvage where ethically/practically possible.</li>
              <li><strong>LA toxicity without lipid emulsion</strong>: airway, ventilation, anticonvulsant (benzodiazepine), prolonged CPR — most centres now stock 20% Intralipid as part of the LAST kit; advocate for this provision.</li>
              <li><strong>Difficult airway, no fibreoptic</strong>: prioritise awake intubation under ketamine sedation + topical lidocaine; surgical airway via cricothyroidotomy must be a trained, drilled skill.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "WHO–WFSA International Standards define minimum safe practice — pulse oximetry is mandatory worldwide.",
              "Draw-over vaporisers (e.g. EMO, Diamedica) use ambient air ± supplemental O₂ — robust, low maintenance, no compressed gases needed.",
              "Ketamine: maintains airway reflexes, supports BP — workhorse where monitoring and ventilation are limited.",
              "Spinal-first practice for caesarean and lower-limb surgery reduces airway and equipment requirements.",
              "Lifebox pulse oximetry and SAFE courses (obstetric, paediatric) build capacity and standardise safe practice.",
            ]}
          />
        </>
      }
    />
  );
};

export default ResourcePoorAnaesthesiaTopic;
