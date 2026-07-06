import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { burnsPlasticsQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { BurnDepthDiagram } from "@/components/diagrams/BurnDepthDiagram";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocItems = [
  { id: "intro", label: "Introduction", group: "Core" },
  { id: "assessment", label: "Assessment & classification", group: "Core" },
  { id: "pathophysiology", label: "Pathophysiology", group: "Core" },
  { id: "fluids", label: "Fluid resuscitation", group: "Management" },
  { id: "airway", label: "Airway & inhalation injury", group: "Emergency" },
  { id: "pharmacology", label: "Pharmacological considerations", group: "Management" },
  { id: "surgery", label: "Burns surgery", group: "Procedures" },
  { id: "plastics", label: "Plastic & reconstructive", group: "Procedures" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const burnsFaqs: Array<[string, string]> = [
  [
    "How is burn size estimated and why does it matter?",
    "Total body surface area (TBSA) is estimated using the Wallace Rule of Nines in adults: head 9%, each arm 9%, anterior trunk 18%, posterior trunk 18%, each leg 18%, perineum 1%. The Lund & Browder chart is more accurate, especially in children where the head is proportionally larger (18% in infants) and the legs smaller. The patient's palm (including fingers) ≈ 1% TBSA — useful for small or scattered burns. Accurate TBSA estimation determines whether formal fluid resuscitation is required (>15% TBSA in adults, >10% in children), guides referral to a burns unit, and predicts mortality. Burns >40% TBSA in adults carry significant mortality and require critical care.",
  ],
  [
    "What is the Parkland formula and how is it applied?",
    "The Parkland formula calculates fluid requirement for the first 24 hours post-burn: 4 mL × body weight (kg) × %TBSA of Hartmann's (Ringer's lactate). Half the total is given over the first 8 hours from the time of burn (not from hospital arrival), and the second half over the remaining 16 hours. For example, an 80 kg adult with 30% TBSA burns requires 4 × 80 × 30 = 9,600 mL total; 4,800 mL in the first 8 hours, then 4,800 mL over the next 16 hours. The formula provides a starting point — fluids must be titrated to physiological endpoints: urine output 0.5–1 mL/kg/h in adults (1–2 mL/kg/h in children), adequate peripheral perfusion, and mental status. Over-resuscitation ('fluid creep') causes abdominal compartment syndrome, limb compartment syndrome, and pulmonary oedema.",
  ],
  [
    "Why is suxamethonium contraindicated after major burns?",
    "Burn injury upregulates extra-junctional (immature) nicotinic acetylcholine receptors throughout skeletal muscle, peaking at 1–3 weeks post-injury and persisting until full wound healing and re-epithelialisation (often 6–12 months, sometimes up to 2 years). Depolarisation by suxamethonium activates these widespread receptors, causing massive potassium efflux from muscle cells → acute hyperkalaemia and potentially fatal cardiac arrest. Suxamethonium is safe within the first 24 hours post-burn before receptor upregulation occurs. For rapid sequence induction after 24 hours, use rocuronium 1.0–1.2 mg/kg (dose may need to be increased due to NMBA resistance in burns) with sugammadex available for reversal.",
  ],
  [
    "What are the indications for early intubation in burn patients?",
    "Early intubation is indicated in any burn patient with signs of airway or inhalational injury because airway oedema peaks at 12–24 hours and can transform a patent airway into a critical obstruction. Specific indications include: facial or neck burns; singed nasal hairs or eyebrows; soot in the mouth, nose, or sputum; hoarseness, stridor, or drooling; respiratory distress; reduced consciousness from smoke inhalation or CO poisoning; and burns >40% TBSA (large fluid resuscitation causes significant facial and airway oedema even without direct thermal injury). Use an uncut endotracheal tube to allow for facial swelling, and secure it carefully because ECG pads and tape may not adhere to burned skin. Cricoid pressure may be technically difficult due to facial oedema.",
  ],
  [
    "How does carbon monoxide poisoning present and how is it treated?",
    "Carbon monoxide (CO) binds to haemoglobin with 240× the affinity of oxygen, forming carboxyhaemoglobin (COHb) and shifting the oxyhaemoglobin dissociation curve to the left. This causes tissue hypoxia despite normal PaO₂. Crucially, standard pulse oximetry cannot distinguish oxyhaemoglobin from COHb and may read falsely normal — co-oximetry (multi-wavelength pulse oximetry or blood gas analysis) is mandatory. Clinical features include headache, dizziness, nausea, confusion, and cherry-red skin (rare). Severe poisoning causes seizures, coma, and myocardial ischaemia. Treatment is 100% oxygen via a tight-fitting non-rebreather mask, which reduces COHb half-life from ~250 minutes (on room air) to ~40–90 minutes. Hyperbaric oxygen is indicated for COHb >25%, neurological impairment, pregnancy (fetal haemoglobin has higher CO affinity), or evidence of myocardial ischaemia.",
  ],
  [
    "What is cyanide poisoning and how is it recognised in burn patients?",
    "Cyanide (CN⁻) is released from the combustion of synthetic materials (plastics, wool, silk, polyurethane). It inhibits mitochondrial cytochrome c oxidase, preventing cellular oxygen utilisation and causing cellular hypoxia despite adequate oxygen delivery. This produces a high anion-gap metabolic acidosis with a markedly elevated lactate (>10 mmol/L is highly suggestive) and a normal or elevated mixed venous oxygen saturation (tissues cannot extract oxygen). Treatment is hydroxocobalamin (Cyanokit) 70 mg/kg IV up to 5 g — it binds cyanide to form cyanocobalamin (vitamin B12), which is renally excreted. Sodium thiosulfate is an alternative but slower-acting adjunct. High-flow oxygen and sodium bicarbonate for acidosis are supportive measures. Suspect cyanide poisoning in any patient from an enclosed-space fire with altered consciousness and profound lactic acidosis.",
  ],
  [
    "What are the phases of burn pathophysiology?",
    "Major burns (>20% TBSA) trigger a biphasic physiological response. Phase 1 — Acute/Ebb phase (0–48 hours): thermal injury causes direct capillary damage and release of inflammatory mediators (histamine, prostaglandins, cytokines), producing massive capillary leak and third-space fluid loss. Cardiac output falls due to myocardial depressant factors. Systemic vascular resistance rises initially. The patient is cold, oliguric, and hypotensive — this is hypovolaemic shock requiring aggressive fluid resuscitation. Phase 2 — Hypermetabolic/Flow phase (48 hours to months): cardiac output rises to 1.5–2× normal (hyperdynamic circulation), oxygen consumption increases dramatically, and protein catabolism accelerates. Core temperature is typically 38–39 °C (reset hypothalamus). Nutritional support is critical: caloric requirements may reach 1.5× basal metabolic rate.",
  ],
  [
    "How do burns alter drug pharmacokinetics?",
    "Burns alter drug handling through multiple mechanisms that change over time. In the acute phase (first 48 hours): hypovolaemia and reduced cardiac output decrease drug distribution; albumin loss increases free fraction of protein-bound drugs; and renal and hepatic hypoperfusion reduce clearance. In the hypermetabolic phase: increased cardiac output and capillary recruitment increase drug delivery and clearance; hypoalbuminaemia (↑ free fraction) and altered α-1-acid glycoprotein affect binding; increased volume of distribution for hydrophilic drugs; and hepatic enzyme induction may increase metabolism. Specific drug considerations: non-depolarising NMBAs show resistance (increased receptor number and altered pharmacodynamics) requiring higher doses; succinylcholine is contraindicated after 24 hours; opioids require increased doses due to tolerance; and antibiotic dosing may need adjustment for increased renal clearance.",
  ],
  [
    "What are the anaesthetic considerations for burns debridement and grafting?",
    "Burns surgery involves repeated procedures (often weekly) over months. Key considerations include: (1) Blood loss — tangential excision causes approximately 1 mL blood loss per cm² excised; use topical adrenaline-soaked dressings (1:100,000–1:400,000), tourniquets for limb surgery, and tumescent techniques to reduce bleeding. (2) Hypothermia — burned skin cannot thermoregulate; maintain theatre temperature at 28–30 °C, use forced-air warming over unburned areas, warm all IV fluids, and consider radiant warmers. (3) Difficult monitoring — ECG electrodes may not adhere to burned skin; use needle electrodes, surgical staples, or limb leads on unburned areas. (4) Vascular access — may be extremely challenging; consider central venous access, intraosseous, or ultrasound-guided peripheral cannulation through unburned skin. (5) Pain management — opioid tolerance develops rapidly; use multimodal analgesia (ketamine, clonidine, gabapentinoids, regional techniques where feasible). (6) Positioning — prone and lateral positions for posterior grafting require meticulous pressure-area care.",
  ],
  [
    "What is tumescent anaesthesia and what are its risks?",
    "Tumescent anaesthesia involves infiltration of large volumes of dilute local anaesthetic (typically lidocaine 0.05–0.1% with adrenaline 1:1,000,000) into subcutaneous fat. It is primarily used for liposuction and some dermatological procedures. The large tissue volume and vasoconstrictor effect of adrenaline slow systemic absorption dramatically, allowing much higher total lidocaine doses than standard guidelines — up to 35–55 mg/kg has been reported safely (compared to the standard maximum of 7 mg/kg with adrenaline). However, risks include: delayed local anaesthetic systemic toxicity (LAST) due to gradual absorption over 12–18 hours; fluid overload from the large volumes injected (up to several litres); hypothermia from cold infiltration fluid; and lidocaine toxicity if adrenaline effect wears off before absorption is complete. Postoperative monitoring for at least 12 hours is essential. Treatment of LAST follows standard lipid emulsion protocols.",
  ],
];

const BurnsPlasticsTopic = () => {
  return (
    <TopicTemplate
      title="Burns & Plastic Surgery Anaesthesia"
      subtitle="FRCA Final — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="burns-plastics"
      topicTitle="Burns & Plastic Surgery Anaesthesia"
      objectives={[
        "Estimate burn extent and depth using Wallace's Rule of Nines and Lund & Browder",
        "Apply the Parkland formula and titrate fluid resuscitation to urine output",
        "Recognise indications for early intubation in airway/inhalational injury",
        "Explain the contraindication of suxamethonium from 24 h to ~2 years post-burn",
        "Plan anaesthesia for burns debridement, grafting and free-flap reconstruction",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "Bittner 2015",
          "NICE NG12",
          "BBA EMSB",
          "BJA Educ 2019",
        ],
        keyPoints: [
          "Bittner 2015",
          "NICE NG12",
          "BBA EMSB",
          "BJA Educ 2019",
        ],
        workedExamples: ["BBA EMSB", "NICE NG12"],
      }}
      keyPoints={[
        { text: "Burns >15% TBSA in adults (>10% in children) require formal fluid resuscitation — Parkland: 4 mL × kg × %TBSA in 24 h, half in the first 8 h from time of burn", cites: ["Bittner 2015"] },
        { text: "Suxamethonium is contraindicated from 24 h to ~2 years post-major burn (extra-junctional ACh receptor upregulation → hyperkalaemic arrest)", cites: ["BJA Educ 2019"] },
        { text: "Carbon monoxide poisoning gives a falsely normal SpO₂ — co-oximetry mandatory; treat with 100% O₂ (COHb half-life 250 → 40 min)", cites: ["BBA EMSB"] },
        { text: "Intubate early in airway burns — oedema peaks at 12–24 h; use an uncut ETT to allow for facial swelling", cites: ["NICE NG12"] },
        { text: "Major burns produce a biphasic response: initial hypovolaemic shock then a hypermetabolic / hyperdynamic phase with ↑CO, ↑VO₂ and catabolism", cites: ["Bittner 2015"] },
      ]}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />

          <div id="intro" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Introduction" defaultOpen>
                <p className="text-muted-foreground leading-relaxed">
                  Burns and plastic surgery anaesthesia encompasses the acute resuscitation of major thermal injury, management of inhalational trauma, and the complex reconstructive surgery that follows. Major burns (&gt;20% TBSA) trigger a profound systemic inflammatory response with capillary leak, hypovolaemic shock, and a prolonged hypermetabolic state. Anaesthetic management spans emergency airway control, massive fluid resuscitation, repeated surgical procedures under challenging conditions, and optimisation of free-flap perfusion for reconstruction.
                </p>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="assessment" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Burns Assessment & Classification">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Total body surface area (TBSA) is estimated using the <strong className="text-foreground">Wallace Rule of Nines</strong> (adult) or the <strong className="text-foreground">Lund & Browder chart</strong> (more accurate, especially in children where head surface area is proportionally larger). The patient's palm (including fingers) ≈ 1% TBSA — useful for small or scattered burns.
                </p>
                <div className="bg-card border border-border rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-foreground mb-2">Burn Depth Classification</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Superficial (epidermal)</strong> — erythema, painful, no blistering (e.g. sunburn). Heals in 3–7 days without scarring</li>
                    <li><strong className="text-foreground">Superficial partial thickness</strong> — blisters, moist, very painful, brisk capillary refill. Heals in 14–21 days</li>
                    <li><strong className="text-foreground">Deep partial thickness</strong> — mottled, reduced sensation, sluggish capillary refill. May need grafting; heals 3–8 weeks with scarring</li>
                    <li><strong className="text-foreground">Full thickness</strong> — waxy/leathery, painless, no blanching, no capillary refill. Requires excision and grafting</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-3">
                  <BurnDepthDiagram />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Referral criteria", value: ">10% TBSA partial-thickness in children, >15% in adults; full-thickness >5%; burns to face, hands, feet, perineum; inhalation injury; chemical/electrical burns; circumferential burns; comorbidities" },
                    { label: "Mortality predictors", value: "Age >60 years, >40% TBSA, and inhalation injury each increase mortality significantly. The revised Baux score (age + %TBSA + 17 if inhalation injury) estimates mortality" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="pathophysiology" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Burns Pathophysiology">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Burns &gt;20% TBSA trigger a <strong className="text-foreground">systemic inflammatory response</strong> with massive capillary leak, third-spacing, and hypovolaemic shock. The response is biphasic and profoundly alters physiology.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Acute Phase (0–48 h)</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>↓ Cardiac output from circulating myocardial depressant factors</li>
                      <li>↑ Capillary permeability → massive oedema and third-space losses</li>
                      <li>↑ SVR initially as compensatory vasoconstriction</li>
                      <li>Haemoconcentration (fluid loss exceeds RBC loss)</li>
                      <li>Risk of compartment syndrome in circumferential burns</li>
                      <li>Renal hypoperfusion → acute kidney injury risk</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Hypermetabolic Phase (48 h–months)</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>↑ Cardiac output to 1.5–2× normal (hyperdynamic circulation)</li>
                      <li>↑ O₂ consumption and CO₂ production → ↑ minute ventilation</li>
                      <li>Core temperature reset to 38–39 °C</li>
                      <li>Profound protein catabolism and muscle wasting</li>
                      <li>Impaired immune function and infection susceptibility</li>
                      <li>Altered drug pharmacokinetics (↑ Vd, protein binding changes)</li>
                    </ul>
                  </div>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="fluids" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Fluid Resuscitation">
                <div className="bg-card border border-border rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-foreground mb-2">Parkland Formula</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong className="text-foreground">4 mL × body weight (kg) × %TBSA</strong> of Hartmann's in the first 24 hours from time of burn
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>First half over 8 h <em>from time of burn</em> (not from hospital arrival)</li>
                    <li>Second half over the remaining 16 h</li>
                    <li>Titrate to urine output: 0.5–1 mL/kg/h adults, 1–2 mL/kg/h children</li>
                    <li>Colloid may be added after 8–24 h when capillary leak subsides</li>
                    <li>Beware <strong className="text-foreground">"fluid creep"</strong> — excessive resuscitation causes abdominal and limb compartment syndrome</li>
                  </ul>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Adult threshold", value: ">15% TBSA partial- or full-thickness burns require formal IV fluid resuscitation" },
                    { label: "Paediatric threshold", value: ">10% TBSA; use Parkland with added maintenance fluid (Dextrose-Saline or Hartmann's with glucose)" },
                    { label: "Endpoints", value: "Urine output 0.5–1 mL/kg/h, HR <120, MAP >65 mmHg, warm peripheries, clear sensorium" },
                    { label: "Fluid creep", value: "Excessive resuscitation >150% Parkland → abdominal compartment syndrome, limb compartment syndrome, pulmonary oedema" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
                  <p className="text-xs text-muted-foreground">
                    The Parkland formula gives a starting volume, but the endpoint is physiological. A common exam scenario: a patient arrives 2 hours after burn with inadequate fluids — calculate the remaining volume to be delivered in the shortened time window.
                  </p>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="airway" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Airway Burns & Inhalational Injury">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Inhalational injury triples mortality in burn patients. Direct thermal injury is usually supraglottic (the larynx is an effective heat exchanger). Chemical injury from smoke and toxin inhalation affects the lower airways and alveoli.
                </p>
                <div className="bg-card border border-border rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-foreground mb-2">Indications for Early Intubation</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Facial or neck burns; singed nasal hairs or eyebrows</li>
                    <li>Soot in mouth, nose, or sputum; carbonaceous sputum</li>
                    <li>Hoarseness, stridor, drooling, or respiratory distress</li>
                    <li>Enclosed-space fire or explosion</li>
                    <li>Reduced consciousness from smoke inhalation or CO poisoning</li>
                    <li>Burns &gt;40% TBSA (large fluid resuscitation → facial oedema)</li>
                  </ul>
                  <p className="text-sm mt-2 text-amber-400 font-medium">
                    ⚠ Intubate early — oedema peaks at 12–24 h. Use an uncut ETT to allow for facial swelling. Secure carefully as tape may not adhere.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "CO poisoning", value: "Falsely normal SpO₂. Co-oximetry mandatory. Treat with 100% O₂ (COHb half-life 250→40 min). Hyperbaric if COHb >25% or neurological symptoms" },
                    { label: "Cyanide poisoning", value: "From plastic combustion. Cellular hypoxia with high lactate (>10 mmol/L). Treat with hydroxocobalamin 70 mg/kg (Cyanokit)" },
                    { label: "Upper airway", value: "Direct thermal injury to supraglottic structures. Oedema peaks 12–24 h. Early intubation before airway compromise" },
                    { label: "Lower airway", value: "Chemical injury to bronchi and alveoli → ARDS risk. Bronchoscopy may show carbonaceous material and airway oedema" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="pharmacology" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Pharmacological Considerations">
                <div className="bg-card border border-border rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-foreground mb-2">Suxamethonium & Burns</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Contraindicated from 24 h to ~2 years post-major burn.</strong> Burn injury causes proliferation of extra-junctional (immature) nicotinic acetylcholine receptors across the entire body. Depolarisation by suxamethonium causes massive K⁺ efflux, fatal hyperkalaemia, and cardiac arrest. Safe within the first 24 h before receptor changes occur.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Non-depolarising NMBAs", value: "Resistance develops — increased receptor number and altered pharmacodynamics. May need 1.5–2× normal dose of rocuronium/vecuronium" },
                    { label: "Opioids", value: "Tolerance develops rapidly due to upregulation and altered pharmacokinetics. Multimodal analgesia essential (ketamine, clonidine, gabapentinoids)" },
                    { label: "Propofol / thiopentone", value: "↑ Volume of distribution and altered protein binding change dosing requirements. Titrate carefully" },
                    { label: "Albumin", value: "↓ Levels increase free fraction of highly protein-bound drugs (benzodiazepines, bupivacaine, thiopentone)" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
                  <ul className="list-disc list-inside text-foreground text-sm">
                    <li>Using suxamethonium for RSI in a burn patient admitted 48 hours ago — risk of fatal hyperkalaemia.</li>
                    <li>Under-dosing rocuronium because of resistance — use increased doses (1.0–1.2 mg/kg) with sugammadex available.</li>
                    <li>Not adjusting for increased opioid requirements — under-treatment leads to distress, hypertension, and catecholamine-mediated vasoconstriction.</li>
                  </ul>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="surgery" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Anaesthesia for Burns Surgery">
                <div className="bg-card border border-border rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-foreground mb-2">Debridement & Grafting</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Tangential excision can cause massive blood loss (≈1 mL/cm² excised)</li>
                    <li>Topical adrenaline (1:100,000–1:400,000), tourniquets, and tumescent technique reduce bleeding</li>
                    <li>Hypothermia is a major risk — warm theatre to 28–30 °C, forced-air warming, warm IV fluids</li>
                    <li>Repeated procedures (often weekly) — vascular access becomes increasingly challenging</li>
                    <li>Monitoring: ECG pads may not stick — use needle electrodes, surgical staples, or limb leads on unburned skin</li>
                    <li>Positioning: prone and lateral positions for posterior grafting require meticulous pressure care</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Escharotomy & Fasciotomy</h3>
                  <p className="text-sm text-muted-foreground">
                    Circumferential full-thickness burns cause constriction → distal ischaemia (limbs) or respiratory compromise (chest). Escharotomy is an emergency bedside procedure releasing the constricting eschar through the burnt skin into subcutaneous fat. Fasciotomy is needed if compartment pressures remain elevated after escharotomy. Longitudinal incisions are made along the mid-axial lines of limbs and along the costal margins for thoracic constriction. Bleeding can be significant — coordinate with surgical team.
                  </p>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="plastics" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Plastic & Reconstructive Considerations">
                <div className="bg-card border border-border rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-foreground mb-2">Free Flap Surgery in Burns Reconstruction</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Optimise flap perfusion — normothermia, normovolaemia, adequate MAP (≥65 mmHg)</li>
                    <li>Avoid vasopressors where possible; low-dose noradrenaline preferred over phenylephrine/metaraminol</li>
                    <li>Avoid excessive crystalloid — tissue oedema impairs flap perfusion and venous drainage</li>
                    <li>Target Hb &gt;80 g/L to maintain oxygen delivery</li>
                    <li>Prolonged cases (8–16 h): meticulous pressure care, DVT prophylaxis, temperature management</li>
                    <li>Some evidence supports TIVA over volatile for microvascular outcomes</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Tumescent Anaesthesia</h3>
                  <p className="text-sm text-muted-foreground">
                    Large volumes of dilute LA (lidocaine 0.05–0.1% with adrenaline 1:1,000,000) infiltrated subcutaneously. Used for liposuction. Maximum lidocaine dose with tumescence: up to 35 mg/kg (vs standard 7 mg/kg with adrenaline) due to slow absorption from adipose tissue. Risk of delayed LAST — monitor for up to 18 h post-procedure.
                  </p>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Parkland: 4 mL/kg/%TBSA Hartmann's over 24 h, half in first 8 h from time of burn — titrate to urine output 0.5 mL/kg/h.",
              "Suspect airway burn with facial burns, singed nasal hairs, soot, stridor or hoarseness — intubate early; oedema rises rapidly.",
              "Suxamethonium safe in first 24 h, dangerous after 24–48 h to ~12 months due to upregulated extrajunctional ACh receptors → hyperkalaemia.",
              "Carbon monoxide poisoning: pulse oximetry reads falsely normal — use co-oximetry; treat with 100% O₂ ± hyperbaric.",
              "Cyanide poisoning in house fires: treat with hydroxocobalamin; lactate >10 mmol/L raises suspicion.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Burns & Plastic Surgery Anaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Evidence-based answers to the questions FRCA Final candidates most often ask about burn size estimation, Parkland formula, suxamethonium contraindication, airway management, carbon monoxide and cyanide poisoning, burn pathophysiology, drug pharmacokinetics, burns surgery, and tumescent anaesthesia.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {burnsFaqs.map(([q, a], i) => (
                <AccordionItem key={q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <Helmet>
            <title>Burns & Plastic Surgery Anaesthesia — Parkland, airway & CO | FRCA</title>
            <meta
              name="description"
              content="Burns and plastic surgery anaesthesia for FRCA Final: burn assessment and Parkland fluid resuscitation, airway and inhalational injury, carbon monoxide and cyanide poisoning, suxamethonium contraindication, and burns surgery."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: burnsFaqs.map(([name, acceptedAnswer]) => ({
                "@type": "Question",
                name,
                acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
              })),
            })}</script>
          </Helmet>
        </>
      }
      workedExamples={[
        {
          title: "Parkland fluid prescription",
          scenario:
            "An 80 kg adult sustains 30% TBSA partial-thickness burns at 10:00. He arrives in your ED at 12:00. Calculate the first 24 h fluid requirement and the rate for the next 6 hours.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Parkland formula: <strong>4 mL × 80 kg × 30% = 9,600 mL</strong> Hartmann's over 24 h from time of burn (10:00).</li>
                <li>First half (4,800 mL) over 8 h from 10:00 — i.e. by 18:00. Two hours have already elapsed (10:00→12:00), so 4,800 mL must run over the remaining 6 h = <strong>800 mL/h</strong>.</li>
                <li>Second half (4,800 mL) over 16 h (18:00 → 10:00 next day) = <strong>300 mL/h</strong>.</li>
                <li>Titrate to urine output 0.5–1 mL/kg/h (40–80 mL/h). If urine output is inadequate, increase rate by 20–30%; if excessive, reduce similarly.</li>
                <li>Beware "fluid creep" — excessive resuscitation causes abdominal compartment syndrome and limb compartment syndrome.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Calculating from arrival time rather than time of burn — leads to under-resuscitation.</li>
                  <li>Not accounting for fluids already given by paramedics.</li>
                  <li>Continuing at the initial high rate beyond 8 hours — causes fluid overload.</li>
                </ul>
              </div>
            </div>
          ),
          answer:
            "9.6 L Hartmann's over the first 24 h from time of burn. From 12:00, run at 800 mL/h until 18:00, then 300 mL/h until 10:00 the next day, titrating to urine output.",
          cites: ["BBA EMSB"],
        },
        {
          title: "Suxamethonium safety after a major burn",
          scenario:
            "A 35-year-old man with 40% TBSA burns sustained 6 weeks ago needs urgent return to theatre for graft revision. Is suxamethonium safe?",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li><strong>No — suxamethonium is contraindicated.</strong> Burn injury upregulates extra-junctional (immature) nicotinic acetylcholine receptors throughout skeletal muscle<InlineRef topicId="burns-plastics" refLabel="BJA Educ 2019" />.</li>
                <li>These receptors peak from ~24 h post-burn and persist until full re-epithelialisation — often 6–12 months, sometimes up to 2 years.</li>
                <li>Depolarisation by suxamethonium activates these widespread receptors, causing massive K⁺ efflux → acute hyperkalaemia and potentially fatal cardiac arrest.</li>
                <li><strong>Alternative:</strong> Use rocuronium for RSI. Burns patients often show resistance to non-depolarising NMBAs — use rocuronium 1.0–1.2 mg/kg. Sugammadex should be available for reversal if needed.</li>
                <li>Suxamethonium remains safe within the first 24 h post-burn (before receptor upregulation occurs) and after full healing (re-epithelialisation complete).</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Assuming suxamethonium is safe because the acute burn phase has passed.</li>
                  <li>Using standard rocuronium doses (0.6 mg/kg) — burns patients may need higher doses due to resistance.</li>
                  <li>Forgetting that denervation injuries (spinal cord injury, stroke) cause similar upregulation and suxamethonium risk.</li>
                </ul>
              </div>
            </div>
          ),
          answer:
            "No. Suxamethonium is contraindicated from 24 h to ~2 years post-major burn. Use high-dose rocuronium for RSI and reverse with sugammadex.",
          cites: ["NICE NG12"],
        },
      ]}
    />
  );
};

export default BurnsPlasticsTopic;