import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { burnsIcuQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import BurnResuscitationDiagram from "@/components/diagrams/intensive-care/BurnResuscitationDiagram";
import BurnShockPathophysiologyDiagram from "@/components/diagrams/intensive-care/BurnShockPathophysiologyDiagram";
import InhalationInjuryFlowchart from "@/components/diagrams/intensive-care/InhalationInjuryFlowchart";
import ParklandCalculator from "@/components/diagrams/intensive-care/ParklandCalculator";
import BurnsIcuCaseStepper from "@/components/diagrams/intensive-care/BurnsIcuCaseStepper";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const burnsIcuFaqs: Array<[string, string]> = [
  ["How is fluid resuscitation calculated for major burns?", "Modified Parkland: 3–4 mL/kg/%TBSA Hartmann's in the first 24 h, half in the first 8 h from time of burn; titrate to urine output 0.5 mL/kg/h (adults), 1 mL/kg/h (children) — avoid fluid creep."],
  ["What are the indications for early intubation in inhalational injury?", "Stridor, hoarseness, facial/oropharyngeal burns, soot in the airway, carbonaceous sputum, hypoxia, large body-surface burns (>30%) or anticipated transfer; the airway can swell rapidly after fluid resuscitation."],
  ["How is carbon monoxide poisoning managed in burns?", "100% oxygen via non-rebreather or ETT (reduces CO half-life from 5 h to ~80 min); consider hyperbaric oxygen if COHb >25%, loss of consciousness, neurological signs, pregnancy or persistent acidosis."],
];

const objectives = [
  "Recognise major-burn pathophysiology — early shock, SIRS, hypermetabolism and immune dysfunction",
  "Identify and manage suspected inhalation injury and airway burns, including indications for early intubation",
  "Calculate burn surface area (Wallace, Lund–Browder) and prescribe fluid resuscitation using Parkland / modified Brooke / ABA formulae with end-organ titration",
  "Anticipate and treat carbon monoxide and cyanide toxicity in enclosed-space fires",
  "Manage compartment syndrome, escharotomy and abdominal hypertension in circumferential and large-area burns",
  "Apply ICU principles of analgesia/sedation, nutrition, glycaemic control, ventilation and infection prevention specific to the burn-injured patient",
  "Apply UK referral criteria to a regional Burns Centre and understand the role of the Burns MDT",
];

const workedExamples: WorkedExample[] = [
  {
    title: "House fire victim — first hour in resus",
    scenario:
      "A 48-year-old man is rescued from a house fire. He has soot around his nostrils, a hoarse voice, deep dermal burns to his face, anterior chest, both arms (circumferential) and front of both thighs. Weight ~80 kg. SpO₂ 96% on 15 L NRB, RR 28, HR 122, BP 105/70, GCS 14, lactate 6.5, COHb 22%.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step approach</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Airway</strong>: high index of suspicion for inhalation injury — soot, hoarse voice, facial burns. Early intubation with a large-bore (≥8.0 mm) uncut tube before oedema obliterates the airway. Use ketamine or etomidate; suxamethonium is safe in the first 24 h (denervation hyperkalaemia risk emerges from day 5).</li>
          <li><strong>Breathing</strong>: 100% O₂ until COHb &lt; 5% (treats CO; half-life 4 h on air, 80 min on 100% O₂). Suspect cyanide if persistent acidosis + lactate &gt; 10 — give hydroxocobalamin 5 g IV. Bronchoscopy to grade injury.</li>
          <li><strong>Circulation</strong>: large-bore IV access through unburned skin if possible. Estimate %TBSA using Lund–Browder (more accurate than Wallace's "rule of nines" especially in children). Here ≈ face 4 + chest 9 + each arm 9 + front of each thigh 4.5 = ~40 % TBSA.</li>
          <li><strong>Fluids — Parkland</strong>: 4 mL × 80 kg × 40 = 12,800 mL Hartmann's in 24 h from time of burn; half (6,400 mL) in the first 8 h. Titrate to urine output 0.5 mL/kg/h in adults (1 mL/kg/h children, 1–2 mL/kg/h electrical / rhabdo). Avoid "fluid creep" — colloids and albumin from 12–24 h reduce total volume.</li>
          <li><strong>Burn-specific</strong>: keep warm (active warming, plastic clingfilm dressings, theatre 28–30 °C). Analgesia: opioid + ketamine. Tetanus prophylaxis. Photograph and use Burns Centre proforma.</li>
          <li><strong>Escharotomy</strong>: circumferential arms — assess perfusion, CRT, dopplerable radial pulse, compartment pressure. If compromised, escharotomy in mid-axial line within 4–6 h. Anterior chest eschar can restrict ventilation — chest escharotomy as needed.</li>
          <li><strong>Referral</strong>: meets UK Burns Centre criteria (TBSA &gt;20 %, face/airway involvement, circumferential, inhalation injury). Refer immediately via the National Burn Care Referral Pathway.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Delaying intubation in airway burns — fibreoptic intubation is much harder once oedema is established.</li>
            <li>Including superficial (erythema only) burns in TBSA — overestimates fluid requirements and worsens fluid creep.</li>
            <li>Chasing supranormal urine output — leads to abdominal compartment syndrome and pulmonary oedema.</li>
            <li>Using suxamethonium after day 5 in major burns — risk of life-threatening hyperkalaemia for up to 1–2 years.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Secure the airway early, give 100 % O₂ for CO, treat cyanide on suspicion, calculate %TBSA (Lund–Browder) excluding superficial burns, start Parkland (4 mL × kg × %TBSA, half in 8 h) titrated to UO 0.5 mL/kg/h, perform escharotomies for circumferential limb / chest burns, keep warm, give multimodal analgesia and refer to a Burns Centre.",
   cites: ["Parkland Formula"],
  },
  {
    title: "Day-7 ICU complications in a 35 % TBSA burn",
    scenario:
      "A 30-year-old (75 kg, 35 % TBSA flame burn) is on day 7 of ICU care, ventilated, sedated. Now febrile (38.9 °C), CRP 280, lactate 4.2, MAP 60 on noradrenaline 0.4 mcg/kg/min, urine output dropping, creatinine doubled, glucose 14 mmol/L, plateau pressure rising, IAP 22 mmHg. What is happening and how do you manage?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Differential</strong>: burn-wound sepsis, pneumonia (VAP — inhalation injury predisposes), line sepsis, toxic shock syndrome (Strep/Staph), abdominal compartment syndrome, AKI, ARDS.</li>
          <li><strong>Source control &amp; cultures</strong>: full septic screen including burn-wound biopsy/quantitative culture (&gt;10⁵ org/g = invasive infection), tracheal aspirate, blood and line cultures; remove and re-site lines through clean tissue if possible.</li>
          <li><strong>Empirical antibiotics</strong>: broad-spectrum following local burn-unit policy (e.g. piperacillin–tazobactam ± vancomycin) — cover Pseudomonas and MRSA. De-escalate on cultures. Consider toxic shock if early erythroderma → IVIG + clindamycin.</li>
          <li><strong>Abdominal compartment syndrome</strong>: IAP 22 mmHg with organ dysfunction = ACS. Decompress: NG drainage, sedation, neuromuscular blockade, drain ascites if present, consider decompressive laparotomy if &gt;25 mmHg with refractory dysfunction. Reassess fluids — escalate to colloid/albumin and reduce crystalloid volume.</li>
          <li><strong>Hypermetabolic response</strong>: burns produce a profound catabolic state for weeks–months. Manage with early enteral nutrition (within 24 h, 1.5–2 g/kg/day protein, 25–30 kcal/kg/day), tight glycaemic control (4–10 mmol/L), beta-blockade (propranolol) and oxandrolone in selected patients to attenuate catabolism.</li>
          <li><strong>Ventilation</strong>: lung-protective (Vt 6 mL/kg PBW, plateau &lt;30, driving pressure &lt;15). If ARDS — proning, neuromuscular blockade, consider ECMO referral.</li>
          <li><strong>Wound care</strong>: early excision and grafting reduces sepsis and mortality; coordinate with burns surgeons; expect intra-operative blood loss ~3–5 % blood volume per 1 % excised.</li>
        </ol>
      </div>
    ),
    answer:
      "Treat as burn-wound sepsis until proven otherwise: cultures (including wound biopsy), broad-spectrum antibiotics covering Pseudomonas/MRSA, source control with early excision and grafting. Decompress an established abdominal compartment syndrome, switch to colloid-sparing resuscitation, feed enterally with high protein, and apply lung-protective ventilation. The hypermetabolic state is treated, not waited out — propranolol, glycaemic control and aggressive nutrition.",
   cites: ["ISBI 2016"],
  },
];

const BurnsIcuTopic = () => {
  return (
    <TopicTemplate
      title="Burns Intensive Care"
      subtitle="Major-burn pathophysiology, airway and inhalation injury, fluid resuscitation, ICU management and burns-MDT referral"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      topicId="burns-icu"
      topicTitle="Burns Intensive Care"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={burnsIcuQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 2.7", "EDIC 5.7"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "BBA Referral 2020",
          "ISBI 2016",
          "EBA Burn 2017",
          "ABA ABLS",
        ],
        workedExamples: [
          "Pham 2008",
          "BJA Educ Burns 2017",
          "GPICS 3e",
        
          "Parkland Formula",
          "ISBI 2016",
        ],
        keyPoints: [
          "Herndon TBC 5e",
          "BJA Educ Inhalation 2019",
          "NICE NG107",
        
          "ABA Burn 2023",
          "BJA Educ Burns 2017",
          "Parkland Formula",
          "ISBI 2016",
        ],
      }}
      keyPoints={[
        { text: "Burn ‘shock’ is biphasic: 0–24 h fluid loss into the burn wound (low CO, high SVR), then a hyperdynamic hypermetabolic phase from 24–48 h lasting weeks.", cites: ["ABA Burn 2023"] },
        { text: "Suspect inhalation injury with: facial/neck burns, soot in nares/mouth, hoarseness, stridor, carbonaceous sputum, enclosed-space fire, ↓GCS, COHb >10 %.", cites: ["BJA Educ Burns 2017"] },
        { text: "Wallace’s rule of nines is a rapid pre-hospital estimate; Lund–Browder chart is more accurate, particularly in children. Exclude superficial (erythema only) burns from TBSA.", cites: ["Parkland Formula"] },
        { text: "Parkland formula: 4 mL × kg × %TBSA Hartmann’s in 24 h (half in first 8 h from burn). Modified Brooke: 2 mL × kg × %TBSA. Titrate to urine output, not the formula.", cites: ["ISBI 2016"] },
        { text: "CO competes with O₂ for haemoglobin (240× affinity); SpO₂ over-reads. Treat with 100 % O₂; consider HBO if COHb >25 %, neurology, pregnancy or persistent symptoms.", cites: ["ABA Burn 2023"] },
        { text: "Cyanide — suspect with persistent metabolic acidosis + lactate >10 mmol/L after enclosed-space fire. Treat empirically with hydroxocobalamin 5 g IV.", cites: ["BJA Educ Burns 2017"] },
        { text: "Suxamethonium is safe within 24 h of injury but contra-indicated from day 5 to ~12–24 months due to extra-junctional ACh receptors and lethal hyperkalaemia.", cites: ["Parkland Formula"] },
        { text: "Burn-wound sepsis is the leading cause of late mortality. Pseudomonas, MRSA and fungi predominate; quantitative wound biopsy >10⁵ org/g defines invasive infection.", cites: ["ISBI 2016"] },
        { text: "Hypermetabolism: rest energy expenditure 150–200 % predicted. Treat with early enteral nutrition, tight glycaemic control, propranolol and (in selected) oxandrolone.", cites: ["ABA Burn 2023"] },
        { text: "UK Burns Centre referral: ≥20 % TBSA adult / ≥10 % child, any face/hand/perineum/major joint, full-thickness, electrical, chemical, inhalation, or burn with comorbidity.", cites: ["BJA Educ Burns 2017"] },
      ]}
      coreConcepts={
        <>
        <>
          <ExamSection id="pathophysiology" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Pathophysiology of the Major Burn" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A burn injury is a profound systemic insult, not just a skin wound. Three concentric zones (Jackson) — coagulation,
              stasis and hyperaemia — surround every burn; preventing the zone of stasis from converting to necrosis through
              adequate resuscitation, warming and analgesia is a key goal of the first 24 h.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Burn shock (0–24 h)</strong>: capillary leak driven by histamine, bradykinin, prostaglandins and oxygen radicals. Plasma volume falls; CO is low; SVR is high; lactate rises.</li>
              <li><strong>Hyperdynamic / hypermetabolic phase (&gt; 24 h)</strong>: catecholamine surge, REE 150–200 %, insulin resistance, muscle wasting, immune dysfunction.</li>
              <li><strong>SIRS / immune paralysis</strong>: damaged skin barrier + circulating DAMPs predispose to invasive infection within days.</li>
              <li><strong>End-organ effects</strong>: ARDS, AKI (myoglobin, hypoperfusion), gut translocation, ileus, stress ulcers (Curling’s), cholestasis, encephalopathy.</li>
            </ul>
            <BurnShockPathophysiologyDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="airway-inhalation" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Airway & Inhalation Injury">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Three distinct injuries can co-exist: <strong>supraglottic thermal injury</strong>, <strong>chemical tracheobronchitis</strong> and <strong>systemic toxin inhalation</strong> (CO, cyanide).
            </p>
            <InhalationInjuryFlowchart />
            <BurnsIcuCaseStepper />
            <div className="space-y-3">
              {[
                { tool: "Indications for early intubation", detail: "Stridor / hoarse voice, deep facial or oropharyngeal burns, soot in posterior pharynx, ↓GCS, hypoxia not responsive to O₂, planned long transfer, &gt;30 % TBSA. Use a large-bore (≥ 8.0 mm) uncut tube and secure with tape, not ties (face oedema)." },
                { tool: "Carbon monoxide", detail: "Binds Hb with 240× O₂ affinity; SpO₂ is falsely normal. Treat with 100 % O₂ until COHb &lt; 5 % (½-life 4 h air, 80 min 100 % O₂, 25 min HBO). Consider HBO if COHb &gt; 25 %, LOC, neurology, pregnant, or persisting symptoms." },
                { tool: "Cyanide", detail: "Inhibits cytochrome a3 → cellular asphyxia. Suspect if persistent metabolic acidosis with lactate &gt; 10 mmol/L after enclosed-space fire. Empirical hydroxocobalamin 5 g IV (turns urine red). Avoid sodium nitrite if CO co-toxicity." },
                { tool: "Bronchoscopy", detail: "Grades inhalation injury (0–4). Useful for diagnosis, lavage and prognosis; severity correlates with mortality and ventilator days." },
                { tool: "Chemical tracheobronchitis", detail: "Mucosal sloughing, cast formation; manage with humidification, nebulised heparin (5,000 U) + N-acetylcysteine, lung-protective ventilation, bronchoscopic toilet." },
              ].map(t => (
                <div key={t.tool} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{t.tool}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t.detail}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="tbsa-fluids" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="TBSA Estimation & Fluid Resuscitation">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Get the denominator right — over- or underestimating %TBSA both kill. Exclude erythema-only (superficial epidermal) burns.
            </p>
            <BurnResuscitationDiagram />
            <ParklandCalculator />
            <div className="space-y-3">
              {[
                { tool: "Wallace’s Rule of Nines (adult)", detail: "Head 9 · each arm 9 · each leg 18 · anterior trunk 18 · posterior trunk 18 · perineum 1. Patient’s palm + fingers ≈ 1 % TBSA — useful for patchy burns." },
                { tool: "Lund–Browder", detail: "Age-adjusted body-segment percentages — preferred in children where the head is proportionally larger. The standard chart for documentation in UK Burns Centres." },
                { tool: "Parkland formula", detail: "4 mL × kg × %TBSA Hartmann’s in 24 h from time of burn. Half in first 8 h, half in next 16 h. Titrate to urine output 0.5 mL/kg/h adult, 1 mL/kg/h child, 1–2 mL/kg/h electrical / rhabdo." },
                { tool: "Modified Brooke / ABA consensus", detail: "2 mL × kg × %TBSA — increasing recognition that Parkland over-resuscitates (‘fluid creep’). ABA now recommends starting at 2 mL/kg/%TBSA and escalating only if UO inadequate." },
                { tool: "Colloid (12–24 h)", detail: "Once capillary leak settles, switch part of maintenance to 5 % albumin (e.g. 0.3–1 mL/kg/%TBSA over 24 h) to reduce total crystalloid load and oedema." },
                { tool: "Maintenance + insensible losses", detail: "Add maintenance fluid (e.g. 1.5 mL/kg/h with 5 % glucose) and dressings; insensible losses are huge (~ 4,000 mL/day in 50 % TBSA)." },
              ].map(t => (
                <div key={t.tool} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{t.tool}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic mt-3">
              ‘Fluid creep’ — excess crystalloid resuscitation — drives abdominal compartment syndrome, ARDS, peripheral compartment
              syndromes and ocular compartment syndrome. The formula is a starting point; the patient is the monitor.
            </p>
            </CollapsibleSubsection>
            <CollapsibleSubsection title="Monitoring Adequacy of Resuscitation">
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                <li><strong>Urine output</strong> (0.5 mL/kg/h adult, 1 mL/kg/h child): the mainstay end-point, but osmotic diuresis (glucose, myoglobin), diuretics or pre-existing renal disease can mislead it in either direction.</li>
                <li><strong>Heart rate</strong>: tachycardia is sensitive but non-specific — pain, anxiety, catecholamine surge and sepsis all confound it as a resuscitation marker.</li>
                <li><strong>Blood pressure</strong>: often preserved until late due to high SVR in the shock phase — a normal BP does not exclude under-resuscitation.</li>
                <li><strong>Lactate clearance and base deficit</strong>: better reflect global tissue perfusion than vital signs; failure to clear lactate or a worsening base deficit suggests ongoing under-resuscitation or occult injury.</li>
                <li><strong>Cardiac-output monitoring</strong> (PiCCO, LiDCO): increasingly used in large burns to guide fluid and vasopressor therapy objectively, particularly once capillary leak and oedema make clinical assessment unreliable.</li>
                <li><strong>Fluid creep</strong> is defined as crystalloid volumes exceeding 6 mL/kg/%TBSA or &gt; 250 mL/kg in the first 24 h above formula predictions; it is strongly associated with abdominal, orbital and limb compartment syndromes and should prompt review of resuscitation strategy (colloid, cardiac-output-guided titration).</li>
                <li><strong>Microdialysis</strong> is an experimental tissue-level monitoring tool that can demonstrate ongoing dermal/muscle hypoxia and metabolic derangement despite apparently adequate systemic resuscitation end-points <InlineRef topicId="burns-icu" refLabel="Burns Microdialysis 2007" />.</li>
              </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="surgical-icu" exams={[Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 2.7"]}>
            <CollapsibleSubsection title="Surgical & ICU Care of the Major Burn">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Escharotomy</strong> for circumferential limb / torso burns to relieve compartment pressures (CRT &gt; 4 s, absent doppler, ↑ peak airway pressures). Mid-axial limb incisions, transverse chest extension if respiratory restriction.</li>
              <li><strong>Early excision &amp; grafting</strong> within 5 days reduces sepsis, length of stay and mortality. Plan and book theatres early; expect ~ 3–5 % blood-volume loss per 1 % TBSA excised.</li>
              <li><strong>Analgesia &amp; sedation</strong>: distinguish <strong>background</strong>, <strong>breakthrough</strong>, <strong>procedural</strong> and <strong>neuropathic</strong> pain — each needs a different strategy.
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li><strong>Background pain</strong>: continuous opioid infusion (morphine or fentanyl) ± background ketamine infusion for its opioid-sparing and anti-hyperalgesic effect; regional techniques and donor-site nerve blocks reduce total opioid load where feasible.</li>
                  <li><strong>Breakthrough pain</strong>: PCA (morphine/fentanyl) titrated on top of the background infusion.</li>
                  <li><strong>Procedural pain</strong> (dressing changes, physiotherapy): pre-emptive analgesia before the procedure, short-acting agents (alfentanil, remifentanil) or dissociative/deep procedural sedation with propofol and/or ketamine.</li>
                  <li><strong>Neuropathic pain</strong>: common as burns heal and nerves regenerate — start gabapentinoids (gabapentin/pregabalin) or amitriptyline early rather than waiting for established neuropathic symptoms.</li>
                  <li><strong>Non-pharmacological adjuncts</strong>: virtual reality distraction, guided distraction techniques and hypnosis reduce procedural pain and anxiolytic/opioid requirements.</li>
                  <li>Expect rapid <strong>tolerance</strong> and escalating opioid requirements over days–weeks — anticipate and titrate proactively rather than chasing pain.</li>
                </ul>
              </li>
              <li><strong>Nutrition</strong>: enteral within 24 h via NG/NJ; 25–30 kcal/kg/day, protein 1.5–2 g/kg/day; supplement glutamine, vitamin C, zinc, selenium. Indirect calorimetry where available.</li>
              <li><strong>Glycaemic control</strong>: target 4–10 mmol/L with insulin infusion; hyperglycaemia worsens infection and graft loss.</li>
              <li><strong>Anti-catabolic therapy</strong>: propranolol 1–4 mg/kg/day attenuates the catecholamine-driven hypermetabolic response; oxandrolone in selected adults reduces lean-body-mass loss.</li>
              <li><strong>Infection prevention</strong>: meticulous wound care, topical antimicrobials (silver sulfadiazine, mafenide), reverse barrier nursing; surveillance cultures; treat invasive infection (&gt;10⁵ org/g on quantitative biopsy) with targeted IV antibiotics.</li>
              <li><strong>Thromboprophylaxis</strong>: high VTE risk — chemical and mechanical from day 1 if not actively bleeding. Heparin requirements often higher than predicted.</li>
              <li><strong>Temperature</strong>: ambient theatre 28–30 °C, warming blankets, fluid warmers; hypothermia worsens coagulopathy and graft survival.</li>
              <li><strong>Stress ulcer prophylaxis</strong>: Curling’s ulcer is the burn-specific equivalent — PPI from day 1.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="special-burns" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Special Burn Types">
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Electrical burns</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Divided into <strong>high-voltage</strong> (&gt;1000 V) and <strong>low-voltage</strong> injury; alternating current (AC) is more dangerous
                  than direct current (DC) at the same voltage because it induces tetanic muscle contraction and repetitive cardiac
                  depolarisation, precipitating <strong>VF or asystole</strong>. Lightning strike is a massive DC-like discharge that can produce
                  characteristic branching skin markings (<strong>Lichtenberg figures</strong>) which are not true burns and resolve spontaneously.
                  Surface burns are often deceptively modest while current tracks along vessels and nerves causing extensive
                  <strong> deep tissue injury</strong> — always suspect more damage than the skin suggests. <strong>Rhabdomyolysis and myoglobinuria</strong> are
                  common; resuscitate to a higher urine output target (1–2 mL/kg/h) rather than the standard 0.5 mL/kg/h, and consider
                  urinary alkalinisation. High risk of occult <strong>compartment syndrome</strong> — have a low threshold for fasciotomy/escharotomy and
                  serial compartment pressure checks. All patients need a <strong>12-lead ECG and 24 h continuous cardiac monitoring</strong> after
                  significant electrical exposure <InlineRef topicId="burns-icu" refLabel="BJA Educ Special Burns 2012" />.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Chemical burns</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  <strong>Acids</strong> cause coagulative necrosis — the resulting eschar tends to self-limit the depth of injury. <strong>Alkalis</strong> cause
                  liquefactive necrosis, allowing continued penetration and typically producing deeper, more extensive injury than
                  acids of a comparable exposure. Management is <strong>copious irrigation</strong> — running water, or a chelating/amphoteric
                  solution such as Diphoterine where available — continued for at least 20–30 minutes and re-assessed rather than
                  timed rigidly; remove contaminated clothing early. <strong>Hydrofluoric acid</strong> is a special case: the fluoride ion penetrates
                  deeply and chelates calcium and magnesium, causing severe local tissue destruction plus systemic
                  <strong> hypocalcaemia</strong> that can precipitate life-threatening cardiac arrhythmias even after small burns. Treat with topical
                  calcium gluconate gel, and intradermal, intra-arterial or IV calcium gluconate for deeper/larger exposures, with close
                  monitoring of serum calcium and cardiac rhythm. Any chemical burn with systemic absorption warrants monitoring for
                  wider systemic toxicity <InlineRef topicId="burns-icu" refLabel="BJA Educ Special Burns 2012" />.
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="haematological-management" exams={[Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Haematological Management">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Anaemia</strong> is near-universal in major burns — driven by burn-related haemolysis, repeated operative blood loss
                during excision and grafting, and inflammatory suppression of erythropoiesis. A <strong>restrictive transfusion trigger of
                ~70 g/L</strong> is appropriate outside of active bleeding or haemodynamic instability <InlineRef topicId="burns-icu" refLabel="ISBI 2016" />.</li>
              <li><strong>Biphasic coagulopathy</strong>: an early <strong>hypercoagulable</strong> phase (driven by the acute-phase response) increases VTE risk,
                followed later by a <strong>consumptive coagulopathy</strong> that emerges with sepsis and large-volume operative loss. <strong>Viscoelastic
                testing (ROTEM/TEG)</strong> helps target factor and platelet replacement during major excision surgery rather than
                transfusing empirically <InlineRef topicId="burns-icu" refLabel="BJA Educ Burns 2017" />.</li>
              <li><strong>VTE risk is very high</strong> in major burns — immobility, hypercoagulability, central lines and repeated surgery combine.
                Use both mechanical (compression devices, where limbs allow) and chemical prophylaxis from admission if not actively
                bleeding. LMWH dosing requirements are frequently increased above standard weight-based doses because of altered
                pharmacokinetics; <strong>anti-Xa level monitoring</strong> should be used to confirm adequate prophylactic effect
                <InlineRef topicId="burns-icu" refLabel="ISBI 2016" />.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="referral-mdt" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="UK Burn Care Network & Referral Criteria">
            <p className="text-muted-foreground leading-relaxed mb-3">
              UK burn services are tiered (Burns Facility · Burns Unit · Burns Centre). Major or complex burns must be discussed
              early with a regional Burns Centre via the National Burn Care Referral Pathway.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>Adult ≥ 20 % TBSA · child ≥ 10 % TBSA · any age &gt; 5 % full-thickness</li>
              <li>Burns of face, hands, feet, genitalia, perineum or major joints</li>
              <li>Inhalation injury, electrical (including lightning), chemical, or radiation burns</li>
              <li>Circumferential burns of limbs, neck or trunk</li>
              <li>Burns with concomitant trauma or significant comorbidity, extremes of age, pregnancy</li>
              <li>Suspected non-accidental injury — safeguarding referral mandatory</li>
            </ul>
            <p className="text-xs text-muted-foreground italic mt-3">
              Until transfer: stop the burning, cool the burn (10 °C running water for 20 min, within 3 h), warm the patient,
              cover with cling-film, analgesia, fluid resuscitation per Parkland, urinary catheter, NG tube, photographs, and
              full Burns Centre referral proforma.
            </p>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Parkland: 4 mL/kg/%TBSA Hartmann's over 24 h, half in first 8 h from injury — titrate to UO 0.5 mL/kg/h (1 mL/kg/h in children, electrical burns).",
              "Airway burn signs: facial burns, singed nasal hairs, soot, stridor, hoarseness — intubate early.",
              "Escharotomy for circumferential full-thickness burns of limbs (compartment syndrome) or chest (ventilation).",
              "Suxamethonium safe in first 24 h; avoid 24 h–12 months due to extrajunctional ACh receptor proliferation (hyperkalaemia).",
              "Nutrition: hypermetabolic state — early enteral feeding, high protein (1.5–2 g/kg/day), micronutrient supplementation.",
            ]}
          />
        </>
          <TopicFaqs faqs={burnsIcuFaqs} />
        </>
      }
    />
  );
};

export default BurnsIcuTopic;
