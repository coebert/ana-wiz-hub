import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { burnsPlasticsQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Estimate burn extent and depth using Wallace's Rule of Nines and Lund & Browder",
  "Apply the Parkland formula and titrate fluid resuscitation to urine output",
  "Recognise indications for early intubation in airway/inhalational injury",
  "Explain the contraindication of suxamethonium from 24 h to ~2 years post-burn",
  "Plan anaesthesia for burns debridement, grafting and free-flap reconstruction",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Parkland fluid prescription",
    scenario:
      "An 80 kg adult sustains 30% TBSA partial-thickness burns at 10:00. He arrives in your ED at 12:00. Calculate the first 24 h fluid requirement and the rate for the next 6 hours.",
    working:
      "Parkland: 4 ml × 80 kg × 30% = 9,600 ml Hartmann's in 24 h from time of burn.\nFirst half (4,800 ml) over 8 h from 10:00 — i.e. by 18:00. Two hours have already elapsed, so 4,800 ml must run over the remaining 6 h = 800 ml/h.\nSecond half (4,800 ml) over 16 h (18:00 → 10:00 next day) = 300 ml/h.\nTitrate to urine output 0.5–1 ml/kg/h (40–80 ml/h) and watch for fluid creep / compartment syndrome.",
    answer:
      "9.6 L Hartmann's over the first 24 h from time of burn. From 12:00, run at 800 ml/h until 18:00, then 300 ml/h until 10:00 the next day, titrating to urine output.",
  },
  {
    title: "Suxamethonium safety after a major burn",
    scenario:
      "A 35-year-old man with 40% TBSA burns sustained 6 weeks ago needs urgent return to theatre for graft revision. Is suxamethonium safe?",
    working:
      "Burn injury upregulates extra-junctional (immature) nicotinic acetylcholine receptors throughout the body, peaking from ~24 h post-burn and persisting until full re-epithelialisation (often up to 2 years). Depolarisation by suxamethonium causes massive K⁺ efflux → hyperkalaemic cardiac arrest.\nUse rocuronium (often at increased dose due to NMBA resistance) with sugammadex available; if a rapid sequence is essential, modified RSI with rocuronium 1.2 mg/kg.",
    answer:
      "No. Suxamethonium is contraindicated from 24 h to ~2 years post-major burn. Use high-dose rocuronium for RSI and reverse with sugammadex.",
  },
];

const BurnsPlasticsTopic = () => {
  return (
    <TopicTemplate
      title="Burns & Plastic Surgery Anaesthesia"
      subtitle="Burn pathophysiology, fluid resuscitation, airway management, and reconstructive surgery considerations"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="burns-plastics"
      topicTitle="Burns & Plastic Surgery Anaesthesia"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={burnsPlasticsQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      keyPoints={[
        "Burns >15% TBSA in adults (>10% in children) require formal fluid resuscitation — Parkland: 4 ml × kg × %TBSA in 24 h, half in the first 8 h from time of burn",
        "Suxamethonium is contraindicated from 24 h to ~2 years post-major burn (extra-junctional ACh receptor upregulation → hyperkalaemic arrest)",
        "Carbon monoxide poisoning gives a falsely normal SpO₂ — co-oximetry mandatory; treat with 100% O₂ (COHb half-life 250 → 40 min)",
        "Intubate early in airway burns — oedema peaks at 12–24 h; use an uncut ETT to allow for facial swelling",
        "Major burns produce a biphasic response: initial hypovolaemic shock then a hypermetabolic / hyperdynamic phase with ↑CO, ↑VO₂ and catabolism",
      ]}
      coreConcepts={
        <>
          <ExamSection id="assessment" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Burns Assessment & Classification</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Total body surface area (TBSA) is estimated using the <strong className="text-foreground">Wallace Rule of Nines</strong> (adult) or the <strong className="text-foreground">Lund & Browder chart</strong> (more accurate, especially in children where head surface area is proportionally larger). The patient's palm (including fingers) ≈ 1% TBSA — useful for small or scattered burns.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Burn Depth Classification</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Superficial (epidermal)</strong> — erythema, painful, no blistering (e.g. sunburn). Heals in 7 days</li>
                <li><strong className="text-foreground">Superficial partial thickness</strong> — blisters, moist, very painful, blanches. Heals in 14 days</li>
                <li><strong className="text-foreground">Deep partial thickness</strong> — mottled, reduced sensation, sluggish capillary refill. May need grafting</li>
                <li><strong className="text-foreground">Full thickness</strong> — waxy/leathery, painless, no blanching. Requires excision and grafting</li>
              </ul>
            </div>
          </ExamSection>

          <ExamSection id="pathophysiology" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Burns Pathophysiology</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Burns &gt;20% TBSA trigger a <strong className="text-foreground">systemic inflammatory response</strong> with massive capillary leak, third-spacing, and hypovolaemic shock. The response is biphasic:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Acute Phase (0–48 h)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>↓ Cardiac output (myocardial depressant factors)</li>
                  <li>↑ Capillary permeability → massive oedema</li>
                  <li>↑ SVR initially</li>
                  <li>Haemoconcentration (fluid loss exceeds RBC loss)</li>
                  <li>Risk of compartment syndrome in circumferential burns</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Hypermetabolic Phase (48 h–months)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>↑ Cardiac output (hyperdynamic circulation)</li>
                  <li>↑ O₂ consumption (up to 2× normal)</li>
                  <li>↑ CO₂ production → ↑ minute ventilation</li>
                  <li>Protein catabolism, muscle wasting</li>
                  <li>Altered pharmacokinetics (↑ Vd, protein binding changes)</li>
                </ul>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="fluids" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Fluid Resuscitation</h2>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Parkland Formula</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-foreground">4 ml × body weight (kg) × %TBSA</strong> of Hartmann's in the first 24 hours
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>First half over 8 h <em>from time of burn</em> (not from hospital arrival)</li>
                <li>Second half over the remaining 16 h</li>
                <li>Titrate to urine output: 0.5–1 ml/kg/h adults, 1–2 ml/kg/h children</li>
                <li>Colloid may be added after 8–24 h when capillary leak subsides</li>
                <li>Beware "fluid creep" — excessive resuscitation causes abdominal/limb compartment syndrome</li>
              </ul>
            </div>
          </ExamSection>

          <ExamSection id="airway" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Airway Burns & Inhalational Injury</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Inhalational injury triples mortality in burn patients. Direct thermal injury is usually supraglottic (the larynx is an effective heat exchanger). Chemical injury from smoke/toxin inhalation affects the lower airways and parenchyma.
            </p>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Indications for Early Intubation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Facial/neck burns, singed nasal hairs, eyebrows</li>
                <li>Soot in mouth/sputum, carbonaceous sputum</li>
                <li>Hoarseness, stridor, or respiratory distress</li>
                <li>Enclosed space fire, reduced consciousness</li>
                <li>Burns &gt;40% TBSA (large fluid resuscitation → facial oedema)</li>
              </ul>
              <p className="text-sm mt-2 text-foreground font-medium">
                ⚠ Intubate early — oedema peaks at 12–24 h. Use an uncut ETT to allow for facial swelling.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Carbon Monoxide & Cyanide Poisoning</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">CO poisoning</strong>: COHb shifts ODC left, SpO₂ reads falsely normal. Treat with 100% O₂ (consider hyperbaric if COHb &gt;25%, neurological symptoms, or pregnancy)</li>
                <li><strong className="text-foreground">Cyanide poisoning</strong>: from combustion of plastics. Causes lactic acidosis despite adequate O₂. Treat with hydroxocobalamin (Cyanokit) 70 mg/kg IV</li>
              </ul>
            </div>
          </ExamSection>

          <ExamSection id="pharmacology" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Pharmacological Considerations</h2>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Suxamethonium & Burns</h3>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Contraindicated from 24 h to ~2 years post-major burn.</strong> Burn injury causes proliferation of extra-junctional (immature) nicotinic acetylcholine receptors across the entire body. Depolarisation by suxamethonium causes massive K⁺ efflux, fatal hyperkalaemia, and cardiac arrest. Safe within the first 24 h before receptor changes occur.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Other Pharmacological Changes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Non-depolarising NMBAs</strong>: resistance — increased doses required</li>
                <li><strong className="text-foreground">Opioids</strong>: tolerance develops rapidly. Consider multimodal analgesia and ketamine</li>
                <li><strong className="text-foreground">Propofol/thiopentone</strong>: ↑ Vd and protein-binding changes alter dosing</li>
                <li><strong className="text-foreground">Albumin</strong>: ↓ levels increase free drug fraction of highly protein-bound drugs</li>
              </ul>
            </div>
          </ExamSection>

          <ExamSection id="surgery" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Anaesthesia for Burns Surgery</h2>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Debridement & Grafting</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Tangential excision can cause massive blood loss (≈1 ml/cm² excised)</li>
                <li>Topical adrenaline (1:100,000–1:400,000), tourniquets, tumescent technique reduce bleeding</li>
                <li>Hypothermia is a major risk — warm theatre to 28–30°C, forced-air warming, warm IV fluids</li>
                <li>Repeated procedures (often weekly) — vascular access challenging</li>
                <li>Monitoring: ECG pads may not stick — needle electrodes or staples</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Escharotomy & Fasciotomy</h3>
              <p className="text-sm text-muted-foreground">
                Circumferential full-thickness burns cause constriction → distal ischaemia (limbs) or respiratory compromise (chest). Escharotomy is an emergency procedure that may be done at the bedside. Fasciotomy is needed if compartment pressures remain elevated.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="plastics" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Anaesthesia for Plastic & Reconstructive Surgery</h2>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Free Flap Surgery</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Optimise flap perfusion — normothermia, normovolaemia, adequate MAP</li>
                <li>Avoid vasopressors where possible (microvascular vasoconstriction); noradrenaline preferred if needed</li>
                <li>Avoid excessive crystalloid (tissue oedema impairs flap perfusion)</li>
                <li>Target Hb &gt;80 g/L to maintain oxygen delivery</li>
                <li>Prolonged cases (8–16 h): pressure care, DVT prophylaxis, temperature management</li>
                <li>Some evidence supports TIVA over volatile for flap outcomes</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Tumescent Anaesthesia</h3>
              <p className="text-sm text-muted-foreground">
                Large volumes of dilute LA (lidocaine 0.05–0.1% with adrenaline 1:1,000,000) infiltrated subcutaneously. Used for liposuction. Maximum lidocaine dose with tumescence: up to 35 mg/kg (vs standard 7 mg/kg with adrenaline) due to slow absorption from adipose tissue. Risk of delayed LAST — monitor for up to 18 h.
              </p>
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default BurnsPlasticsTopic;
