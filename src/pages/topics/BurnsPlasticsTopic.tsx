import { SectionLayout } from "@/components/SectionLayout";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { ReferencesList } from "@/components/ReferencesList";
import { burnsPlasticsQuestions } from "@/data/quizzes";

const keyPoints = [
  "Burns >15% TBSA in adults (>10% in children) require formal fluid resuscitation — use the Parkland formula: 4 ml × kg × %TBSA of crystalloid in 24 h, half in the first 8 h from time of burn",
  "Suxamethonium is contraindicated from 24 hours to ≈2 years post-major burn due to upregulation of extra-junctional acetylcholine receptors causing life-threatening hyperkalaemia",
  "Carbon monoxide poisoning presents with normal SpO₂ readings — co-oximetry is required; treat with 100% O₂ (half-life of COHb reduces from 250 min to 40 min)",
  "Airway burns should prompt early intubation before oedema peaks at 12–24 hours — look for singed nasal hairs, soot in sputum, hoarseness, and stridor",
  "Major burns produce a biphasic haemodynamic response: initial hypovolaemic shock (capillary leak, third-spacing) followed by a hypermetabolic/hyperdynamic phase with ↑CO, ↑O₂ consumption, and ↑catabolism",
];

const references = [
  { text: "ATLS: Advanced Trauma Life Support — Chapter on Thermal Injuries, 10th Edition, ACS (2018)" },
  { text: "Bittner EA et al. Acute and perioperative care of the burn-injured patient. Anesthesiology 2015; 122(2): 448–64" },
  { text: "NICE Clinical Guideline: Burns and Scalds (NG12), 2020 update" },
  { text: "British Burns Association: Emergency Management of Severe Burns (EMSB) Course Manual" },
];

const BurnsPlasticsTopic = () => {
  return (
    <SectionLayout
      title="Burns & Plastic Surgery Anaesthesia"
      subtitle="Burn pathophysiology, fluid resuscitation, airway management, and reconstructive surgery considerations"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
    >
      <div className="space-y-8">
        <KeyLearningPoints points={keyPoints} />

        {/* Burns Assessment */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Burns Assessment & Classification</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Total body surface area (TBSA) is estimated using the <strong className="text-foreground">Wallace Rule of Nines</strong> (adult) or the <strong className="text-foreground">Lund & Browder chart</strong> (more accurate, especially in children where head surface area is proportionally larger). The patient's palm (including fingers) ≈ 1% TBSA — useful for small or scattered burns.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Burn Depth Classification</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Superficial (epidermal)</strong> — erythema, painful, no blistering (e.g. sunburn). Heals in 7 days</li>
                <li><strong className="text-foreground">Superficial partial thickness</strong> — blisters, moist, very painful, blanches. Heals in 14 days</li>
                <li><strong className="text-foreground">Deep partial thickness</strong> — mottled, reduced sensation, sluggish capillary refill. May need grafting</li>
                <li><strong className="text-foreground">Full thickness</strong> — waxy/leathery, painless, no blanching. Requires excision and grafting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pathophysiology */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Burns Pathophysiology</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Burns &gt;20% TBSA trigger a <strong className="text-foreground">systemic inflammatory response</strong> with massive capillary leak, third-spacing, and hypovolaemic shock. The response is biphasic:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Acute Phase (0–48 h)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>↓ Cardiac output (myocardial depressant factors)</li>
                  <li>↑ Capillary permeability → massive oedema</li>
                  <li>↑ SVR initially</li>
                  <li>Haemoconcentration (fluid loss exceeds RBC loss)</li>
                  <li>Risk of compartment syndrome in circumferential burns</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Hypermetabolic Phase (48 h–months)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>↑ Cardiac output (hyperdynamic circulation)</li>
                  <li>↑ O₂ consumption (up to 2× normal)</li>
                  <li>↑ CO₂ production → ↑ minute ventilation</li>
                  <li>Protein catabolism, muscle wasting</li>
                  <li>Altered pharmacokinetics (↑ Vd, ↑ protein binding changes)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Fluid Resuscitation */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fluid Resuscitation</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Parkland Formula</h3>
              <p className="text-sm mb-2">
                <strong className="text-foreground">4 ml × body weight (kg) × %TBSA</strong> of Hartmann's solution in the first 24 hours
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>First half given over 8 hours <em>from time of burn</em> (not from hospital arrival)</li>
                <li>Second half over the remaining 16 hours</li>
                <li>Titrate to urine output: 0.5–1 ml/kg/h adults, 1–2 ml/kg/h children</li>
                <li>Colloid may be added after 8–24 hours when capillary leak subsides</li>
                <li>Beware "fluid creep" — excessive resuscitation causes abdominal/limb compartment syndrome</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Airway Management */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Airway Burns & Inhalational Injury</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Inhalational injury triples mortality in burn patients. Direct thermal injury is usually supraglottic (the larynx is an effective heat exchanger). Chemical injury from smoke/toxin inhalation affects the lower airways and parenchyma.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Indications for Early Intubation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Facial/neck burns, singed nasal hairs, eyebrows</li>
                <li>Soot in mouth/sputum, carbonaceous sputum</li>
                <li>Hoarseness, stridor, or respiratory distress</li>
                <li>Enclosed space fire, reduced consciousness</li>
                <li>Burns &gt;40% TBSA (will require significant fluid resuscitation → facial oedema)</li>
              </ul>
              <p className="text-sm mt-2 text-foreground font-medium">
                ⚠ Intubate early — oedema peaks at 12–24 h and can make subsequent intubation impossible. Use an uncut ETT to allow for facial swelling.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Carbon Monoxide & Cyanide Poisoning</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">CO poisoning</strong>: COHb shifts ODC left, SpO₂ reads falsely normal. Treat with 100% O₂ (consider hyperbaric if COHb &gt;25%, neurological symptoms, or pregnancy)</li>
                <li><strong className="text-foreground">Cyanide poisoning</strong>: from combustion of plastics/synthetics. Causes lactic acidosis despite adequate O₂. Treat with hydroxocobalamin (Cyanokit) 70 mg/kg IV</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pharmacological Considerations */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pharmacological Considerations</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Suxamethonium & Burns</h3>
              <p className="text-sm">
                <strong className="text-foreground">Contraindicated from 24 hours to ~2 years post-major burn.</strong> Burn injury causes proliferation of extra-junctional (immature, fetal-type) nicotinic acetylcholine receptors across the entire body — not just the burned area. Depolarisation of these receptors by suxamethonium causes massive K⁺ efflux, potentially fatal hyperkalaemia, and cardiac arrest. Safe within the first 24 hours before receptor changes occur.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Other Pharmacological Changes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Non-depolarising NMBAs</strong>: resistance develops — increased doses required (receptor upregulation)</li>
                <li><strong className="text-foreground">Opioids</strong>: tolerance develops rapidly; increased requirements. Consider multimodal analgesia and ketamine</li>
                <li><strong className="text-foreground">Propofol/thiopentone</strong>: ↑ Vd and ↑ protein binding changes → altered doses</li>
                <li><strong className="text-foreground">Albumin</strong>: ↓ levels increase free drug fraction of highly protein-bound drugs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Surgical Considerations */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthesia for Burns Surgery</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Debridement & Grafting</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Tangential excision can cause massive blood loss (estimate 1 ml/cm² excised)</li>
                <li>Topical adrenaline (1:100,000–1:400,000), tourniquets, and tumescent technique reduce bleeding</li>
                <li>Hypothermia is a major risk — warm theatre to 28–30°C, use forced-air warming, warm IV fluids</li>
                <li>Repeated procedures (often weekly) — vascular access may be challenging</li>
                <li>Monitoring: ECG pads may not stick — use needle electrodes or staples</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Escharotomy & Fasciotomy</h3>
              <p className="text-sm">
                Circumferential full-thickness burns cause constriction → distal ischaemia (limbs) or respiratory compromise (chest). Escharotomy (incision through eschar) is an emergency procedure that may be performed at the bedside. Fasciotomy is needed if compartment pressures remain elevated.
              </p>
            </div>
          </div>
        </section>

        {/* Plastic Surgery */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthesia for Plastic & Reconstructive Surgery</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Free Flap Surgery</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Goal: optimise flap perfusion — maintain normothermia, normovolaemia, and adequate MAP</li>
                <li>Avoid vasopressors where possible (microvascular vasoconstriction) — noradrenaline preferred if needed</li>
                <li>Avoid excessive crystalloid (tissue oedema impairs flap perfusion)</li>
                <li>Target Hb &gt;80 g/L to maintain oxygen delivery</li>
                <li>Prolonged cases (8–16 h): pressure area care, DVT prophylaxis, temperature management</li>
                <li>Some evidence supports TIVA over volatile for flap outcomes (vasodilation, anti-inflammatory)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Tumescent Anaesthesia</h3>
              <p className="text-sm">
                Large volumes of dilute local anaesthetic (typically lidocaine 0.05–0.1% with adrenaline 1:1,000,000) are infiltrated subcutaneously. Used for liposuction and extensive skin procedures. Maximum lidocaine dose with tumescence: up to 35 mg/kg (vs standard 7 mg/kg with adrenaline) due to slow absorption from adipose tissue. Risk of delayed LAST — monitor for up to 18 hours.
              </p>
            </div>
          </div>
        </section>

        <QuizSection questions={burnsPlasticsQuestions} />

        <ReferencesList references={references} />

        <TopicCompletionToggle topicId="burns-plastics" topicTitle="Burns & Plastic Surgery Anaesthesia" />
      </div>
    </SectionLayout>
  );
};

export default BurnsPlasticsTopic;
