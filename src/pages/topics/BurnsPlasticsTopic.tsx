import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { burnsPlasticsQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { BurnDepthDiagram } from "@/components/diagrams/clinical/BurnDepthDiagram";
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
  { id: "special", label: "Special types of burns", group: "Emergency" },
  { id: "plastics", label: "Plastic & reconstructive", group: "Procedures" },
  { id: "free-flap", label: "Free flap surgery", group: "Procedures" },

  { id: "faq", label: "FAQ", group: "Reference" },
];

const burnsFaqs: Array<[string, string]> = [
  [
    "How is burn size estimated and why does it matter?",
    "Total body surface area (TBSA) is estimated using the Wallace Rule of Nines in adults: head 9%, each arm 9%, anterior trunk 18%, posterior trunk 18%, each leg 18%, perineum 1%. The Lund & Browder chart is more accurate, especially in children where the head is proportionally larger (18% in infants) and the legs smaller. The patient's palm (including fingers) ≈ 1% TBSA — useful for small or scattered burns. Accurate TBSA estimation determines whether formal fluid resuscitation is required (>15% TBSA in adults, >10% in children), guides referral to a burns unit, and predicts mortality. Burns >40% TBSA in adults carry significant mortality and require critical care.",
  ],
  [
    "What is the Parkland formula and how is it applied?",
    "Traditional Parkland estimates a starting volume for the first 24 hours post-burn: 4 mL × body weight (kg) × %TBSA of Hartmann's (Ringer's lactate). Half the total is given over the first 8 hours from the time of burn (not from hospital arrival), and the second half over the remaining 16 hours. For example, an 80 kg adult with 30% TBSA burns requires 4 × 80 × 30 = 9,600 mL total; 4,800 mL in the first 8 hours, then 4,800 mL over the next 16 hours. The 2024 ABA guidance for adults with burns ≥20% TBSA recommends starting at 2 mL/kg/%TBSA to reduce fluid creep; follow local protocols. All formulae are starting points — fluids must be titrated to physiological endpoints: urine output 0.5–1 mL/kg/h in adults (1–2 mL/kg/h in children), adequate peripheral perfusion, and mental status. Over-resuscitation ('fluid creep') causes abdominal compartment syndrome, limb compartment syndrome, and pulmonary oedema.",
  ],
  [
    "Why is suxamethonium contraindicated after major burns?",
    "Major burns upregulate extra-junctional nicotinic acetylcholine receptors throughout skeletal muscle. After about 24 hours, suxamethonium can cause massive potassium efflux and fatal hyperkalaemic arrest; avoid it until wounds have healed and receptor changes resolve, which may take many months. The burn-related risk is not yet established in the first 24 hours, but other contraindications still apply. Use an alternative such as rocuronium for rapid sequence induction with neuromuscular monitoring and reversal when indicated.",
  ],
  [
    "What are the indications for early intubation in burn patients?",
    "Assess the airway repeatedly and intubate early for progressive swelling, stridor, respiratory failure, reduced consciousness or a high-risk airway before transfer. Large burns with substantial resuscitation raise concern for later oedema. Facial burns, singed hairs or soot warrant urgent assessment but are not, in isolation, automatic indications for intubation. Involve the burns/airway team and consider nasendoscopy when available. Secure the endotracheal tube carefully because tape may not adhere to burned skin.",
  ],
  [
    "How does carbon monoxide poisoning present and how is it treated?",
    "Carbon monoxide (CO) binds strongly to haemoglobin, forming carboxyhaemoglobin (COHb) and shifting the oxyhaemoglobin dissociation curve left. Tissue hypoxia occurs despite normal PaO₂. Standard pulse oximetry may read falsely normal: measure COHb on a blood gas with co-oximetry. Symptoms range from headache and confusion to seizures, coma and myocardial ischaemia. Give 100% oxygen; discuss possible hyperbaric oxygen with a specialist for serious neurological or cardiac findings, pregnancy, severe acidosis or high COHb. A COHb number alone does not determine treatment, and benefit from hyperbaric oxygen remains debated.",
  ],
  [
    "What is cyanide poisoning and how is it recognised in burn patients?",
    "Cyanide (CN⁻) can be released when nitrogen-containing materials burn, especially in enclosed-space fires. It inhibits mitochondrial cytochrome c oxidase, causing cellular hypoxia and marked lactic acidosis; lactate >10 mmol/L increases suspicion but is not diagnostic. Treat suspected severe smoke-inhalation cyanide poisoning promptly with 100% oxygen and hydroxocobalamin (Cyanokit): adults 5 g IV over 15 minutes, repeat once if indicated (maximum 10 g); children 70 mg/kg IV (maximum 5 g per dose), repeat once if indicated (maximum 140 mg/kg or 10 g total). Seek poison-centre advice; do not delay antidote treatment for confirmatory tests.",
  ],
  [
    "What are the phases of burn pathophysiology?",
    "Major burns (>20% TBSA) trigger a biphasic response. In the acute ebb phase (roughly the first 48 hours), capillary leak and fluid loss reduce circulating volume and cardiac output; resuscitate to physiological endpoints rather than an arbitrary high volume. From approximately 2–5 days, a hyperdynamic, hypermetabolic phase develops with increased cardiac output, oxygen consumption and protein catabolism. Ongoing nutritional support is important.",
  ],
  [
    "How do burns alter drug pharmacokinetics?",
    "Burns alter drug handling through multiple mechanisms that change over time. In the acute phase (first 48 hours): hypovolaemia and reduced cardiac output decrease drug distribution; albumin loss increases free fraction of protein-bound drugs; and renal and hepatic hypoperfusion reduce clearance. In the hypermetabolic phase: increased cardiac output and capillary recruitment increase drug delivery and clearance; hypoalbuminaemia (↑ free fraction) and altered α-1-acid glycoprotein affect binding; increased volume of distribution for hydrophilic drugs; and hepatic enzyme induction may increase metabolism. Specific drug considerations: non-depolarising NMBAs show resistance (increased receptor number and altered pharmacodynamics) requiring higher doses; succinylcholine is contraindicated after 24 hours; opioids require increased doses due to tolerance; and antibiotic dosing may need adjustment for increased renal clearance.",
  ],
  [
    "What are the anaesthetic considerations for burns debridement and grafting?",
    "Burns surgery may require repeated procedures. Tangential excision can produce substantial blood loss; prepare blood products and use surgeon-selected haemostatic measures. Burned skin and extensive exposure increase hypothermia risk: warm the theatre and fluids and use appropriate active warming. Monitoring and vascular access can be difficult when unburned skin is limited. Plan multimodal analgesia, assess tolerance to prior analgesics and protect pressure areas during prolonged or prone surgery.",
  ],
  [
    "What is tumescent anaesthesia and what are its risks?",
    "Tumescent anaesthesia uses dilute lidocaine with adrenaline in subcutaneous fat, particularly for liposuction. Absorption is delayed, but high doses are not universally safe: one small pharmacokinetic study estimated conservative maxima of 28 mg/kg without liposuction and 45 mg/kg with liposuction under local anaesthesia. These estimates cannot simply be applied to burn debridement or patients having general anaesthesia. Count all local anaesthetic sources and follow specialist/local dosing and observation protocols. Risks include delayed local anaesthetic systemic toxicity (LAST), fluid overload and hypothermia; have 20% lipid emulsion available.",
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
        "Explain why suxamethonium must be avoided after the first 24 h until major burns have healed",
        "Plan anaesthesia for burns debridement, grafting and free-flap reconstruction",
        "Explain the stages of free-flap transfer, donor-site choice and combined mastectomy–reconstruction pathways",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "Bittner 2015",
          "BBA Referral 2012",
          "BBA EMSB",
          "BJA Educ Burns 2022",
          "Free Flap Review 2022",
          "ERAS Breast 2017",
        ],
        keyPoints: [
          "Bittner 2015",
          "BBA Referral 2012",
          "BBA EMSB",
          "BJA Educ Burns 2022",
        ],
        workedExamples: ["BBA EMSB", "ABA Fluids 2024", "BJA Educ Burns 2022"],
      }}
      keyPoints={[
        { text: "Major burns need formal fluid resuscitation titrated to response. Parkland (4 mL/kg/%TBSA in 24 h) is a traditional calculation; ABA 2024 recommends starting at 2 mL/kg/%TBSA in adults with ≥20% TBSA burns to reduce fluid creep", cites: ["BBA EMSB", "ABA Fluids 2024"] },
        { text: "Avoid suxamethonium after the first 24 h of a major burn until neuromuscular changes have resolved and wounds have healed (extra-junctional ACh receptor upregulation → hyperkalaemic arrest)", cites: ["BJA Educ Burns 2022"] },
        { text: "Carbon monoxide poisoning gives a falsely normal SpO₂ — co-oximetry mandatory; treat with 100% O₂ (COHb half-life 250 → 40 min)", cites: ["BBA EMSB"] },
        { text: "Reassess suspected inhalation injury urgently: progressive swelling, stridor or respiratory failure favour early intubation; facial burns or singed hairs alone do not mandate it", cites: ["ABA Referral 2022", "Airway Signs 2022"] },
        { text: "Major burns produce a biphasic response: initial hypovolaemic shock then a hypermetabolic / hyperdynamic phase with ↑CO, ↑VO₂ and catabolism", cites: ["Bittner 2015"] },
        { text: "Free-flap donor selection is dictated by the defect (bone, skin, volume and reach), the donor's vascular anatomy and morbidity, and whether harvest can proceed alongside resection", cites: ["Head Neck Donor Sites 2023", "Donor Morbidity 2022"] },
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
                    { label: "Referral criteria", value: "Seek burn-service advice for significant partial-thickness burns, any deep/full-thickness burn, special-site or circumferential burns, suspected inhalation injury, chemical/electrical injury or important comorbidity. Use regional UK referral guidance for thresholds." },
                    { label: "Mortality predictors", value: "Increasing age, TBSA and inhalation injury increase risk. The revised Baux score (age + %TBSA + 17 if inhalation injury) is a risk score, not a mortality percentage." },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm mb-1">Prognostic scoring — the Baux score</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    The Baux score is a quick bedside risk stratification tool; it is not a standalone mortality probability.
                  </p>
                  <div className="rounded-md bg-muted/40 p-3 font-mono text-xs text-foreground mb-2 space-y-1">
                    <p>Classic Baux = age (years) + %TBSA</p>
                    <p>Revised Baux = age (years) + %TBSA + 17 (if inhalation injury)</p>
                  </div>
                  <ul className="text-xs text-muted-foreground leading-relaxed space-y-1 list-disc pl-4">
                     <li><strong>Interpretation</strong>: the revised score is an input to a calibrated prediction model; it must not be read as a percentage risk. Case mix and outcomes differ between cohorts and over time<InlineRef topicId="burns-plastics" refLabel="Osler Baux 2010" />.</li>
                    <li><strong>Worked example</strong>: a 45-year-old with a 30% TBSA flame burn and confirmed inhalation injury scores 45 + 30 + 17 = <strong>92</strong>. This is <em>not</em> 92% predicted mortality; use a validated calculator and specialist assessment for prognosis.</li>
                    <li><strong>Uses and limits</strong>: useful for population benchmarking, but it is not an individual prediction, and it ignores comorbidity, frailty, burn depth, delay to resuscitation and non-burn trauma. Never use it alone to withhold treatment; other validated models may add refinement.</li>
                  </ul>
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
                    <strong className="text-foreground">4 mL × body weight (kg) × %TBSA</strong> of Hartmann's in the first 24 hours from time of burn (traditional Parkland starting estimate; not a fixed prescription)<InlineRef topicId="burns-plastics" refLabel="ABA Fluids 2024" />
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>First half over 8 h <em>from time of burn</em> (not from hospital arrival)</li>
                    <li>Second half over the remaining 16 h</li>
                    <li>Titrate to urine output: 0.5–1 mL/kg/h adults, 1–2 mL/kg/h children</li>
                    <li>For adults with ≥20% TBSA burns, ABA 2024 recommends starting at 2 mL/kg/%TBSA; albumin can be considered, particularly with larger burns. Follow local burns-centre protocol and titrate to response.</li>
                    <li>Beware <strong className="text-foreground">"fluid creep"</strong> — excessive resuscitation causes abdominal and limb compartment syndrome</li>
                  </ul>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Adult threshold", value: ">15% TBSA partial- or full-thickness burns require formal IV fluid resuscitation" },
                    { label: "Paediatric threshold", value: ">10% TBSA; use Parkland with added maintenance fluid (Dextrose-Saline or Hartmann's with glucose)" },
                    { label: "Endpoints", value: "Urine output 0.5–1 mL/kg/h, HR <120, MAP >65 mmHg, warm peripheries, clear sensorium" },
                    { label: "Fluid creep", value: "Excessive fluid can cause abdominal/limb compartment syndrome and pulmonary oedema; reassess often and adjust to physiological endpoints." },
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
                    <li>Progressive facial, neck or oropharyngeal swelling; stridor or airway obstruction</li>
                    <li>Facial burns, singed hairs or soot prompt urgent evaluation but are not sufficient alone to mandate intubation</li>
                    <li>Hoarseness, stridor, drooling, or respiratory distress</li>
                    <li>Enclosed-space fire or explosion with evidence of evolving airway injury or a high-risk transfer</li>
                    <li>Reduced consciousness from smoke inhalation or CO poisoning</li>
                     <li>Extensive burns needing substantial resuscitation increase concern for later airway oedema; assess the airway individually</li>
                  </ul>
                  <p className="text-sm mt-2 text-amber-400 font-medium">
                    ⚠ Reassess repeatedly; intubate before progressive oedema obstructs the airway. Secure the tube carefully as tape may not adhere.<InlineRef topicId="burns-plastics" refLabel="Airway Signs 2022" />
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "CO poisoning", value: "Falsely normal SpO₂. Co-oximetry mandatory. Treat with 100% O₂ (COHb half-life 250→40 min). Discuss hyperbaric treatment for serious neurological/cardiac findings or pregnancy; COHb alone is not decisive" },
                    { label: "Cyanide poisoning", value: "From smoke in enclosed-space fires. Cellular hypoxia with high lactate (>10 mmol/L). Treat with hydroxocobalamin: adults 5 g IV; children 70 mg/kg (max 5 g/dose)" },
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
                    <strong className="text-foreground">Avoid from about 24 h after a major burn until wounds heal and receptor changes resolve.</strong> Extra-junctional nicotinic acetylcholine receptor upregulation makes suxamethonium-associated hyperkalaemic arrest possible for many months. The burn-specific risk is not yet established during the first 24 h; assess other contraindications.
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
                  <h3 className="font-semibold text-foreground mb-2">Escharotomy &amp; Fasciotomy</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong className="text-foreground">Escharotomy</strong> is incision of the inelastic, full-thickness burnt eschar to relieve the tourniquet effect it exerts as tissue oedema develops. <strong className="text-foreground">Fasciotomy</strong> is incision of the deep investing fascia to decompress a muscle compartment, and is a separate, deeper operation<InlineRef topicId="burns-plastics" refLabel="BBA EMSB" />.
                  </p>
                  <p className="text-sm font-semibold text-foreground mb-1">Indications</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-2">
                    <li>Escharotomy: circumferential or near-circumferential full-thickness limb burn with progressive pain, tense woody swelling, reduced capillary refill, loss of Doppler signal or pulse, paraesthesia or cool distal limb; circumferential chest or abdominal burn causing rising airway pressures, poor chest expansion or hypoventilation; and circumferential digital burns threatening perfusion</li>
                    <li>Fasciotomy: compartment pressure &gt;30 mmHg (or within 30 mmHg of diastolic) persisting after escharotomy, high-voltage electrical injury with deep muscle necrosis, associated crush or fracture, or rising creatine kinase with myoglobinuria</li>
                  </ul>
                  <p className="text-sm font-semibold text-foreground mb-1">Incision and depth</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-2">
                    <li>Longitudinal incisions along the <strong className="text-foreground">mid-medial and mid-lateral axial lines</strong> of the limb, crossing joints with care and avoiding superficial nerves (ulnar at the elbow, common peroneal at the fibular neck) and vessels</li>
                    <li>Chest: bilateral anterior axillary line incisions joined by a transverse incision along the costal margin (a "shield" pattern); abdominal decompression may also be required for burn-related intra-abdominal hypertension</li>
                    <li>Depth: incise <strong className="text-foreground">through eschar into subcutaneous fat only</strong> — the wound edges should spring apart. Deliberately deeper dissection through fascia constitutes a fasciotomy and should be a considered decision, not an accident</li>
                    <li>Reassess perfusion (pulses, Doppler, compartment pressure, airway pressures) immediately after release and repeatedly thereafter — incomplete release is a common reason for failure</li>
                  </ul>
                  <p className="text-sm font-semibold text-foreground mb-1">Anaesthetic considerations at the bedside</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Often performed in the emergency department or ICU as a time-critical procedure. Full monitoring, oxygen, suction, resuscitation drugs and a trained assistant are mandatory — treat it as an anaesthetic in a remote site</li>
                    <li>Analgesia and sedation: <strong className="text-foreground">ketamine</strong> (0.25–0.5 mg/kg IV increments, or 1–2 mg/kg for dissociative anaesthesia) is the agent of choice because it preserves airway reflexes, respiratory drive and blood pressure in a hypovolaemic patient; combine with an opioid (fentanyl 0.5–1 µg/kg) and small midazolam doses if needed, and add an antisialogogue. Propofol titration is an alternative in the intubated, haemodynamically stable patient. Many patients are already ventilated and simply need bolus opioid, sedation and neuromuscular blockade</li>
                    <li>Airway: reassess for evolving swelling or inhalational injury — if intubation is likely, secure the airway before deterioration. After about 24 h from a major burn, avoid suxamethonium until healing is complete</li>
                    <li><strong className="text-foreground">Bleeding</strong> can be substantial and diffuse from the burn wound edges: have blood available and cross-matched for large releases, use diathermy and adrenaline-soaked packs, keep the patient warm, and correct coagulopathy — hypothermia and dilutional coagulopathy compound the loss</li>
                    <li><strong className="text-foreground">Reperfusion and metabolic monitoring</strong>: releasing an ischaemic compartment washes out potassium, hydrogen ions, lactate and myoglobin. Watch for hyperkalaemia and arrhythmia, acidosis, sudden hypotension and pigmented urine; check ABG, potassium, calcium, lactate and creatine kinase before and after release, maintain generous fluid resuscitation with urine output 1–2 mL/kg/h if myoglobinuria is present, and treat hyperkalaemia promptly with calcium, insulin–dextrose and bicarbonate</li>
                    <li>Afterwards: escharotomy wounds are dressed and later grafted; plan continued analgesia (regional techniques where the burn permits), tetanus cover, and repeat compartment assessment</li>
                  </ul>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="special" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Special Types of Burns">
                <div className="bg-card border border-border rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-foreground mb-2">Electrical Injury</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Low voltage (&lt;1000 V, domestic 240 V)</strong>: small entry/exit wounds, tetanic muscle contraction that may prevent the victim letting go, and a real risk of arrhythmia because alternating current at 50 Hz is highly arrhythmogenic. Tissue damage is usually limited but may be locally deep</li>
                    <li><strong className="text-foreground">High voltage (≥1000 V, overhead cables, railway lines)</strong>: extensive deep tissue destruction, associated flash and flame burns, blast injury and falls (spinal and long-bone fractures) — manage as major trauma</li>
                    <li><strong className="text-foreground">"Tip of the iceberg" phenomenon</strong>: current follows the path of least resistance along nerves, blood vessels and muscle, so cutaneous entry and exit wounds grossly underestimate the deep muscle necrosis beneath intact-looking skin. Never estimate resuscitation needs from surface area alone in high-voltage injury, and expect progressive necrosis requiring repeated debridement<InlineRef topicId="burns-plastics" refLabel="Bittner 2015" /></li>
                    <li><strong className="text-foreground">Cardiac</strong>: obtain an immediate 12-lead ECG. Arrhythmias include VF or asystole at the scene, atrial fibrillation, and conduction abnormalities; troponin may rise. Continuous cardiac monitoring for at least 24 hours is indicated after high-voltage injury, loss of consciousness, an abnormal initial ECG, transthoracic current path or documented arrhythmia; an asymptomatic low-voltage injury with a normal ECG generally does not need admission for monitoring</li>
                    <li><strong className="text-foreground">Rhabdomyolysis, myoglobinuria and AKI</strong>: dark tea-coloured urine, creatine kinase often in the tens of thousands, hyperkalaemia, hyperphosphataemia, hypocalcaemia and metabolic acidosis. Give generous crystalloid targeting urine output <strong>1–2 mL/kg/h</strong> (higher than the standard 0.5 mL/kg/h burn target), monitor potassium and CK serially, consider urinary alkalinisation, and involve critical care early — renal replacement therapy may be needed</li>
                    <li><strong className="text-foreground">Compartment syndrome</strong>: deep muscle oedema within intact fascia. Look for pain out of proportion, tense compartments and pain on passive stretch, measure compartment pressures, and proceed to fasciotomy (not just escharotomy) early</li>
                    <li>Also consider: cataracts and neurological sequelae (delayed peripheral neuropathy, myelopathy), tympanic membrane rupture, oral commissure burns in children biting cables (delayed labial artery haemorrhage), and safeguarding/incident reporting</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Chemical Injury</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">General principle — copious irrigation</strong>: remove contaminated clothing, brush off dry powder first, then irrigate with running water for at least 20–30 minutes (longer, often 1–2 hours, for alkalis, which saponify fat and penetrate deeply). Protect staff with gloves, apron and eye protection, contain run-off, and check the safety data sheet or contact the national poisons service. Alkali burns are typically deeper and progress for longer than acid burns; check surface pH to guide when irrigation is adequate</li>
                    <li><strong className="text-foreground">Hydrofluoric acid</strong>: fluoride ion chelates calcium and magnesium, causing severe pain out of proportion to the visible burn plus <em>systemic</em> hypocalcaemia, hypomagnesaemia, hyperkalaemia and fatal arrhythmias. Treat with topical <strong>calcium gluconate 2.5% gel</strong> massaged in, then intradermal/subcutaneous infiltration of 5% calcium gluconate (0.5 mL/cm²), intra-arterial or intravenous regional calcium gluconate for digital or extensive exposure, nebulised 2.5% calcium gluconate for inhalation, and aggressive IV calcium with continuous ECG monitoring and repeated ionised calcium and magnesium measurement</li>
                    <li><strong className="text-foreground">Phenol</strong>: poorly water-soluble and readily absorbed, causing systemic toxicity (arrhythmia, seizures, hepatic and renal injury) and a white coagulum locally. Decontaminate with <strong>polyethylene glycol (PEG 300/400)</strong> — or 50% isopropyl alcohol if PEG is unavailable — followed by water irrigation, as water alone can increase dermal absorption</li>
                    <li><strong className="text-foreground">Cement (wet concrete)</strong>: calcium oxide is a strong alkali that causes insidious, painless, progressive full-thickness injury, classically to the knees and ankles of kneeling workers hours after exposure. Remove all clothing and cement debris and <strong>irrigate copiously with water</strong>, then reassess repeatedly because the depth evolves over 12–24 hours</li>
                    <li><strong className="text-foreground">Exceptions — do not irrigate with water first</strong>: <em>elemental sodium, potassium and lithium</em> ignite explosively with water — cover with mineral oil and remove particles mechanically; dry lime and other dry powders should be brushed off before any water is used; elemental phosphorus is kept wet and debrided under water or covered in oil to prevent ignition (copper sulphate identification is now discouraged because of systemic toxicity)</li>
                    <li>All chemical injuries: full trauma and eye assessment (irrigate eyes separately with an eyelid speculum and topical anaesthetic), analgesia, tetanus cover, monitor electrolytes and acid–base status, and refer to a burns centre for anything more than a trivial, fully decontaminated superficial injury<InlineRef topicId="burns-plastics" refLabel="BJA Educ Burns 2022" /></li>
                  </ul>
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
                    <li>Treat hypotension while avoiding excess fluid; judicious titrated noradrenaline is acceptable when indicated</li>
                    <li>Avoid excessive crystalloid — tissue oedema impairs flap perfusion and venous drainage</li>
                    <li>Individualise transfusion to blood loss, oxygen delivery and patient factors; no universal flap-specific Hb threshold</li>
                    <li>Prolonged cases (8–16 h): meticulous pressure care, DVT prophylaxis, temperature management</li>
                    <li>No anaesthetic maintenance technique has conclusively improved flap survival; select TIVA or volatile according to the patient and PONV risk</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Tumescent Anaesthesia</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Large volumes of very dilute local anaesthetic with adrenaline are infiltrated into the subcutaneous fat until the tissue is firm and blanched ("tumescent"). It is used for liposuction and may be used to reduce bleeding during other procedures; dosing evidence from liposuction must not be generalised to burn debridement<InlineRef topicId="burns-plastics" refLabel="Tumescent PK 2016" />.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Example dilute solution</strong>: up to 1 g lidocaine, 1 mg adrenaline and 10 mL of 8.4% sodium bicarbonate (10 mmol) added to 1 L of 0.9% sodium chloride. Check the final concentration, total dose and local protocol rather than treating this as a universal prescription<InlineRef topicId="burns-plastics" refLabel="Tumescent PK 2016" />.</li>
                    <li><strong className="text-foreground">Dose</strong>: because absorption from vasoconstricted fat is so slow, doses of <strong>28 mg/kg without liposuction and 45 mg/kg with liposuction</strong> were conservative estimates in a small pharmacokinetic study of tumescent local anaesthesia, not general safety limits. The 55 mg/kg figure derives from selected liposuction practice and must not be extrapolated to burn surgery or general anaesthesia. Account for all local anaesthetic and individual risk factors<InlineRef topicId="burns-plastics" refLabel="Tumescent PK 2016" /></li>
                    <li><strong className="text-foreground">Delayed absorption</strong>: plasma lidocaine peaks late — several hours after infiltration (often around 12–14 h, but variable) — so toxicity can emerge after leaving theatre<InlineRef topicId="burns-plastics" refLabel="Tumescent PK 2016" /></li>
                    <li><strong className="text-foreground">Risks</strong>: delayed local anaesthetic systemic toxicity (perioral tingling, tinnitus, agitation, seizures, arrhythmia, cardiac arrest — treat with 20% lipid emulsion per the AAGBI LAST protocol); fluid overload and pulmonary oedema from litres of infiltrate plus reabsorbed fluid and IV crystalloid; hypothermia from cold infiltration fluid (always warm it); methaemoglobinaemia with prilocaine-containing solutions; and adrenaline effects (tachycardia, hypertension, arrhythmia)</li>
                    <li><strong className="text-foreground">Monitoring</strong>: individualise postoperative observation according to dose, procedure, co-anaesthetics and local policy; consider prolonged cardiorespiratory monitoring after high-dose or large-volume infiltration, because peak plasma levels may occur late. Record the total lidocaine dose in mg/kg on the anaesthetic chart, keep a strict fluid balance including the infiltrate volume, and ensure lipid emulsion is immediately available</li>
                  </ul>
                </div>

              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="free-flap" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Free Flap Surgery — Planning, Harvest and Transfer">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Unlike a pedicled flap, a free flap is detached with its feeding artery and draining vein, transferred to a distant defect and revascularised by microvascular anastomosis. Reconstruction may follow cancer resection, trauma or burn debridement. Match the tissue required to the recipient vessels, anticipated radiation, donor function and patient preferences; the largest flap is not necessarily the best flap<InlineRef topicId="burns-plastics" refLabel="Free Flap Review 2022" /><InlineRef topicId="burns-plastics" refLabel="Head Neck Donor Sites 2023" />.
                </p>
                <h3 className="font-semibold text-foreground mb-2">Operative stages and anaesthetic priorities</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground mb-5">
                  <li><strong className="text-foreground">Plan:</strong> agree defect, donor and recipient vessels, airway, positioning, two-team access and expected blood loss. Check vascular disease, smoking, previous surgery/radiotherapy, haemoglobin and VTE risk. Site cannulae, lines, warming and pressure protection away from harvest and anastomosis fields.</li>
                  <li><strong className="text-foreground">Resection and harvest:</strong> teams may work simultaneously; record donor limb and preserve its inflow/outflow. Maintain normothermia and oxygenation; replace actual losses while avoiding both hypovolaemia and fluid overload. Reassess access and pressure points when arms or legs are moved.</li>
                  <li><strong className="text-foreground">Pedicle division and transfer:</strong> the flap has a period of ischaemia after division. Communicate the clamp time, prepare the recipient bed and coordinate hand-off; do not delay revascularisation for a non-essential task. Bone and muscle-bearing flaps are less tolerant of prolonged ischaemia than skin-only flaps.</li>
                  <li><strong className="text-foreground">Anastomosis and inset:</strong> connect artery and vein, confirm flow and inspect for kinking, tension, compression or haematoma. Maintain adequate perfusion pressure; if hypotensive, evaluate bleeding and fluid responsiveness, then use a titrated vasopressor rather than giving repeated unneeded fluid boluses.</li>
                  <li><strong className="text-foreground">Closure and handover:</strong> protect the pedicle from dressings or position change, document flap baseline colour, refill and Doppler site, and agree a monitoring and urgent re-exploration plan. Arrange analgesia for <em>both</em> donor and recipient sites and a postoperative airway plan for head-and-neck cases<InlineRef topicId="burns-plastics" refLabel="Free Flap Review 2022" />.</li>
                </ol>
                <h3 className="font-semibold text-foreground mb-2">Choosing a donor flap</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full min-w-[620px] text-sm border-collapse text-left">
                    <thead><tr className="border-b border-border text-foreground"><th className="p-2">Donor / tissue</th><th className="p-2">Why choose it?</th><th className="p-2">Donor and anaesthetic considerations</th></tr></thead>
                    <tbody className="text-muted-foreground align-top">
                      <tr className="border-b border-border"><td className="p-2">Fibula: long bone ± skin paddle</td><td className="p-2">Segmental mandibular defects; long vascularised bone can be shaped and may support dental rehabilitation.</td><td className="p-2">Assess leg vessels if peripheral vascular disease or injury is suspected; preserve ankle stability, plan leg analgesia and mobilisation.</td></tr>
                      <tr className="border-b border-border"><td className="p-2">Radial forearm: thin pliable skin/fascia</td><td className="p-2">Tongue, oral lining and small complex defects where a supple flap is more useful than bulk.</td><td className="p-2">Confirm adequate ulnar collateral hand circulation before sacrificing the radial artery; donor skin graft and tendon exposure risk.</td></tr>
                      <tr className="border-b border-border"><td className="p-2">Anterolateral thigh (ALT): skin/fat ± fascia/muscle</td><td className="p-2">Larger soft-tissue defects; adjustable thickness, useful pedicle and two-team head-and-neck access.</td><td className="p-2">Perforator anatomy and fat thickness vary; assess suitable side and positioning; donor-site closure may need a graft.</td></tr>
                      <tr className="border-b border-border"><td className="p-2">Scapular / parascapular: bone + versatile skin</td><td className="p-2">Composite head-and-neck defects needing substantial soft tissue and shaped bone; alternative if leg vessels are unsuitable.</td><td className="p-2">Harvest may require lateral positioning and interrupt simultaneous two-team work; protect shoulder and pressure areas.</td></tr>
                      <tr className="border-b border-border"><td className="p-2">Iliac crest (DCIA): curved vascularised bone</td><td className="p-2">Mandibular contour and bone height when implant-bearing reconstruction is planned.</td><td className="p-2">Abdominal wall weakness, hernia and gait symptoms are important donor-site trade-offs.</td></tr>
                      <tr><td className="p-2">DIEP: lower abdominal skin/fat, rectus preserved</td><td className="p-2">Autologous breast volume after mastectomy; natural tissue without harvesting the rectus muscle, if abdominal tissue and perforators are suitable.</td><td className="p-2">Previous abdominal surgery, perforator anatomy, abdominal wound/hernia risk, bilateral harvest and two separate pain sites affect planning.</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mb-5">Donor-site decisions are individual: availability of recipient vessels, defect size and function, prior scars, body habitus, vessel disease and expected donor morbidity all matter<InlineRef topicId="burns-plastics" refLabel="Bone Flaps Review 2025" /><InlineRef topicId="burns-plastics" refLabel="Donor Morbidity 2022" />.</p>
                <h3 className="font-semibold text-foreground mb-2">Combined procedure: mastectomy with immediate free-flap reconstruction</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  In one anaesthetic the breast team performs mastectomy (± axillary surgery) and prepares recipient vessels, often internal mammary vessels, while the reconstructive team raises a DIEP flap. After pedicle division and chest transfer, the microvascular anastomoses are completed, the flap is shaped and inset, and the abdominal donor wound is closed. Later radiotherapy plans, prior abdominal surgery, implant alternatives and patient preference influence whether immediate autologous reconstruction is appropriate<InlineRef topicId="burns-plastics" refLabel="ERAS Breast 2017" />.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-2">
                  <li><strong className="text-foreground">Before induction:</strong> confirm laterality, unilateral/bilateral flap plan, vessel and perforator mapping, anticipated axillary dissection, blood availability, postoperative bed and whether both teams need simultaneous access. Avoid IVs and cuffs on operative/at-risk arms when the team requests it.</li>
                  <li><strong className="text-foreground">During surgery:</strong> keep the chest and abdomen accessible, protect both arms and maintain warmth; communicate when harvest, pedicle division and anastomosis start. Replace blood loss without flooding the flap, and treat persistent hypotension rather than accepting poor perfusion.</li>
                  <li><strong className="text-foreground">Recovery:</strong> multimodal opioid-sparing analgesia for chest and abdominal wounds (e.g. pectoral/serratus and abdominal wall blocks where suitable), PONV prevention, VTE prophylaxis balanced against bleeding, early feeding and mobilisation, and a documented flap observation/re-exploration pathway<InlineRef topicId="burns-plastics" refLabel="ERAS Breast 2017" /><InlineRef topicId="burns-plastics" refLabel="DIEP ERAS 2025" />.</li>
                </ul>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Parkland is the traditional 4 mL/kg/%TBSA starting estimate; ABA 2024 starts at 2 mL/kg/%TBSA for adults ≥20% TBSA. Titrate to physiology and local protocol.",
              "Facial burns or singed hairs alone do not mandate intubation; reassess urgently and intubate for progressive oedema, stridor or respiratory failure.",
              "After the first 24 h of a major burn, avoid suxamethonium until wounds heal and receptor changes resolve; hyperkalaemic arrest can occur months later.",
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
            "An 80 kg adult sustains 30% TBSA partial-thickness burns at 10:00 and arrives at 12:00. Calculate the traditional Parkland starting estimate, assuming no fluid has yet been given. How should this be adapted clinically?",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Traditional Parkland: <strong>4 mL × 80 kg × 30% = 9,600 mL</strong> Hartmann's starting estimate over 24 h from time of burn (10:00). ABA 2024 recommends a lower 2 mL/kg/%TBSA starting estimate for adults with ≥20% TBSA burns.</li>
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
            "Traditional Parkland calculation: 9.6 L Hartmann's in 24 h from injury; at 12:00, the theoretical rates are 800 mL/h to 18:00 then 300 mL/h to 10:00 next day, assuming no fluid has yet been given. In practice subtract fluid already delivered, follow local burns guidance and titrate to physiology; ABA 2024 suggests a lower initial estimate for adults ≥20% TBSA.",
          cites: ["BBA EMSB", "ABA Fluids 2024"],
        },
        {
          title: "Suxamethonium safety after a major burn",
          scenario:
            "A 35-year-old man with 40% TBSA burns sustained 6 weeks ago needs urgent return to theatre for graft revision. Is suxamethonium safe?",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li><strong>No — suxamethonium is contraindicated.</strong> Burn injury upregulates extra-junctional (immature) nicotinic acetylcholine receptors throughout skeletal muscle<InlineRef topicId="burns-plastics" refLabel="BJA Educ Burns 2022" />.</li>
                <li>Receptor changes begin after about 24 h and may persist for many months until wounds have healed; the period varies with burn extent and ongoing injury.</li>
                <li>Depolarisation by suxamethonium activates these widespread receptors, causing massive K⁺ efflux → acute hyperkalaemia and potentially fatal cardiac arrest.</li>
                <li><strong>Alternative:</strong> Use rocuronium for RSI. Burns patients often show resistance to non-depolarising NMBAs — use rocuronium 1.0–1.2 mg/kg. Sugammadex should be available for reversal if needed.</li>
                <li>The burn-related hyperkalaemia risk is not yet established in the first 24 h; later, avoid suxamethonium until healing and recovery are confirmed. Other contraindications still apply.</li>
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
            "No. Avoid suxamethonium from around 24 h after a major burn until wounds have healed and receptor changes resolve. Use rocuronium for RSI, monitor neuromuscular recovery and reverse when indicated.",
          cites: ["BJA Educ Burns 2022"],
        },
      ]}
    />
  );
};

export default BurnsPlasticsTopic;