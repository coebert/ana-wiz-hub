import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import WETFLAGDiagram from "@/components/diagrams/WETFLAGDiagram";

const PaediatricIcuTopic = () => {
  return (
    <SectionLayout title="Paediatric Intensive Care" subtitle="FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        {/* Introduction */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Paediatric intensive care (PIC) requires understanding of age-specific physiology, pharmacology, and disease patterns. Children are not small adults — differences in airway anatomy, cardiovascular reserve, thermoregulation, and drug handling demand a tailored approach. Key conditions include bronchiolitis, sepsis, status epilepticus, congenital heart disease, and traumatic brain injury.
          </p>
        </div>

        {/* Age-Specific Physiological Differences */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Age-Specific Physiological Differences</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">System</th>
                  <th className="text-left py-2 text-foreground font-semibold">Neonate / Infant</th>
                  <th className="text-left py-2 text-foreground font-semibold">Clinical Implication</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Airway</td>
                  <td className="py-2">Large head/tongue, anterior larynx, funnel-shaped (cricoid narrowest point &lt;8 yrs)</td>
                  <td className="py-2">Uncuffed ETT traditionally used &lt;8 yrs; modern cuffed tubes now acceptable from neonates</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Respiratory</td>
                  <td className="py-2">Higher metabolic rate (O₂ consumption 6–8 ml/kg/min vs 3–4 adult), low FRC, obligate nasal breathers &lt;6 months</td>
                  <td className="py-2">Rapid desaturation during apnoea; high-flow nasal oxygen critical during intubation</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Cardiovascular</td>
                  <td className="py-2">Heart rate-dependent cardiac output (limited stroke volume reserve), higher resting HR</td>
                  <td className="py-2">Bradycardia = near-arrest event; treat with atropine 20 mcg/kg. Hypotension is a LATE sign</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Renal</td>
                  <td className="py-2">Immature GFR until ~2 years; limited concentrating ability</td>
                  <td className="py-2">Prone to fluid overload and electrolyte disturbance; adjust drug dosing</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Thermoregulation</td>
                  <td className="py-2">Large BSA:weight ratio, limited fat stores, non-shivering thermogenesis (brown fat)</td>
                  <td className="py-2">Hypothermia develops rapidly — active warming essential</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Pharmacology</td>
                  <td className="py-2">Higher Vd for water-soluble drugs, immature hepatic metabolism (CYP enzymes), reduced protein binding</td>
                  <td className="py-2">Weight-based dosing essential; some drugs have higher mg/kg requirement (e.g. propofol)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Paediatric Airway & Ventilation */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Airway & Ventilation in PICU</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">ETT Sizing</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Uncuffed:</strong> Age/4 + 4 (ID mm). <strong>Cuffed:</strong> Age/4 + 3.5. <strong>Depth (oral):</strong> Age/2 + 12 cm (or ID × 3). Neonates: 3.0–3.5 mm ID.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Ventilation Strategies</p>
              <p className="text-sm text-muted-foreground mt-1">
                Lung-protective ventilation applies: TV 5–8 ml/kg IBW, plateau pressure &lt;28 cmH₂O. Higher respiratory rates (age-appropriate). PEEP 5–8 cmH₂O. Permissive hypercapnia acceptable (pH &gt;7.25). Consider HFOV earlier than adults — better tolerated in smaller lungs.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Non-Invasive Support</p>
              <p className="text-sm text-muted-foreground mt-1">
                High-flow nasal cannula (HFNC) at 2 ml/kg/min widely used for bronchiolitis. CPAP/BiPAP via nasal prongs or face mask. NIV increasingly first-line for moderate respiratory failure.
              </p>
            </div>
          </div>
        </div>

        {/* Paediatric Sepsis & Shock */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Paediatric Sepsis & Shock</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Paediatric septic shock differs from adults in presentation and management. Children more commonly present with <strong>cold shock</strong> (vasoconstricted, poor perfusion, delayed CRT) rather than the warm, vasodilated picture typical of adults.
          </p>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-3">Fluid Resuscitation — Key Differences</h3>
            <div className="space-y-3">
              {[
                { step: "1", action: "10–20 ml/kg crystalloid boluses", detail: "Given over 5–10 minutes (NOT 30 ml/kg as in adults). Reassess after each bolus — up to 40–60 ml/kg in first hour if needed" },
                { step: "2", action: "Assess for fluid responsiveness", detail: "CRT, HR, mental status, urine output. Hepatomegaly = sign of fluid overload in children" },
                { step: "3", action: "Early vasoactive support", detail: "If fluid-refractory after 40 ml/kg — start peripheral adrenaline (cold shock) or noradrenaline (warm shock)" },
                { step: "4", action: "Consider hydrocortisone", detail: "Catecholamine-resistant shock: stress-dose hydrocortisone 2 mg/kg bolus (max 100 mg), then 1–2 mg/kg/day" },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{s.step}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{s.action}</p>
                    <p className="text-sm text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <p className="text-sm font-semibold text-destructive">⚠ FEAST Trial (2011)</p>
            <p className="text-sm text-muted-foreground mt-1">
              In resource-limited settings (sub-Saharan Africa), fluid boluses increased 48-hour mortality in febrile children with impaired perfusion. This does NOT apply to UK PICU practice but is frequently examined. UK guidelines still recommend judicious fluid boluses with reassessment.
            </p>
          </div>
        </div>

        {/* Paediatric Cardiac ICU */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Post-Cardiac Surgery & Congenital Heart Disease</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Single Ventricle Physiology</p>
              <p className="text-sm text-muted-foreground mt-1">
                Parallel circulation with Qp:Qs balance is critical. Saturations of 75–85% are target (NOT 100%). Excessive oxygen → pulmonary vasodilation → systemic steal → low cardiac output. Manage with subambient FiO₂ or CO₂ addition if needed.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Post-CPB Management</p>
              <p className="text-sm text-muted-foreground mt-1">
                Low cardiac output syndrome (LCOS) peaks 6–18 hours post-bypass. Management: milrinone infusion (loading 50 mcg/kg, maintenance 0.25–0.75 mcg/kg/min), maintain preload, avoid hypothermia. Delayed sternal closure common in neonates to reduce cardiac compression.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Pulmonary Hypertensive Crisis</p>
              <p className="text-sm text-muted-foreground mt-1">
                Acute ↑PVR → RV failure. Triggers: pain, hypoxia, acidosis, hypothermia, suction. Management: sedate/paralyse, FiO₂ 1.0, alkalosis (pH 7.45–7.50), inhaled nitric oxide (iNO) 10–20 ppm, IV sildenafil, avoid disconnection from ventilator.
              </p>
            </div>
          </div>
        </div>

        {/* Paediatric Neurocritical Care */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Paediatric Neurocritical Care</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Condition</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key Management Points</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Traumatic Brain Injury</td>
                  <td className="py-2">CPP targets age-dependent (40–50 mmHg infant, 50–60 child). ICP threshold &gt;20 mmHg. Hypertonic saline (3%) preferred over mannitol in children. Decompressive craniectomy earlier threshold.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Status Epilepticus</td>
                  <td className="py-2">APLS algorithm: Lorazepam 0.1 mg/kg IV (max 4 mg) × 2 → Phenytoin 20 mg/kg over 20 min → RSI + thiopentone/midazolam infusion. Dextrose check essential — hypoglycaemia common cause.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Diabetic Ketoacidosis</td>
                  <td className="py-2">Cerebral oedema risk highest in children — limit fluid to 10 ml/kg bolus, rehydrate over 48 hours. Insulin 0.05–0.1 units/kg/hr. Do NOT correct Na+ rapidly. GCS monitoring hourly.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Non-Accidental Injury</td>
                  <td className="py-2">Consider in unexplained injuries, retinal haemorrhages, subdural haematomas in infants. Mandatory safeguarding referral. Skeletal survey + ophthalmology review.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sedation & Analgesia */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sedation & Analgesia in PICU</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Assessment Tools</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>COMFORT-B scale</strong> (validated for PICU, ages 0–18): assesses alertness, calmness, respiratory response, movement, muscle tone, facial tension. Target 11–17 for adequate sedation. <strong>FLACC</strong> for pain in pre-verbal children.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Common Agents</p>
              <p className="text-sm text-muted-foreground mt-1">
                Morphine infusion 10–40 mcg/kg/hr. Midazolam 1–4 mcg/kg/min. Dexmedetomidine 0.2–1.4 mcg/kg/hr (increasingly popular — less respiratory depression). Clonidine enteral for weaning. <strong>Propofol infusion syndrome (PRIS)</strong> — AVOID prolonged propofol infusions (&gt;48h) in children; risk of metabolic acidosis, rhabdomyolysis, cardiac failure.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Iatrogenic Withdrawal</p>
              <p className="text-sm text-muted-foreground mt-1">
                Risk after &gt;5 days of opioid/benzodiazepine infusion. Features: agitation, tachycardia, sweating, diarrhoea, seizures. Use WAT-1 (Withdrawal Assessment Tool) scoring. Wean by 10–20% per day; convert to enteral equivalent before stopping.
              </p>
            </div>
          </div>
        </div>

        {/* Fluid, Electrolytes & Nutrition */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fluids, Electrolytes & Nutrition</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Maintenance Fluids</p>
              <p className="text-sm text-muted-foreground mt-1">
                Holliday-Segar formula: 4 ml/kg/hr (first 10 kg) + 2 ml/kg/hr (10–20 kg) + 1 ml/kg/hr (each kg &gt;20). Use isotonic fluids (0.9% NaCl + dextrose) — hypotonic fluids cause iatrogenic hyponatraemia, which can be fatal in children.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Hypoglycaemia</p>
              <p className="text-sm text-muted-foreground mt-1">
                Neonates and infants have limited glycogen stores. Glucose &lt;2.6 mmol/L is abnormal. Treatment: 2 ml/kg 10% dextrose IV bolus (NOT 50% dextrose — osmolality too high, risk of extravasation injury).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Nutrition</p>
              <p className="text-sm text-muted-foreground mt-1">
                Enteral feeding within 24–48 hours. Energy requirements vary by age (neonates 110–120 kcal/kg/day, infants 90–100, children 70–80). Breast milk preferred in infants. PN if enteral not possible by day 5–7. Avoid overfeeding — increases CO₂ production and ventilator days.
              </p>
            </div>
          </div>
        </div>

        {/* Safeguarding & Ethics */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Safeguarding & Ethical Considerations</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Safeguarding</p>
              <p className="text-sm text-muted-foreground mt-1">
                All PICU staff must have Level 3 safeguarding training. Low threshold for referral — unexplained injuries, inconsistent histories, delayed presentations. Document carefully. Involve named safeguarding lead early.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">End-of-Life & Withdrawal of Treatment</p>
              <p className="text-sm text-muted-foreground mt-1">
                Parents cannot demand futile treatment but should be central to decision-making. Best interests framework applies. Palliative care team involvement early. Brainstem death testing in children: &gt;2 months, performed by 2 consultants, 2 sets of tests. Under 37 weeks corrected gestational age — brainstem death testing is NOT applicable.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Family-Centred Care</p>
              <p className="text-sm text-muted-foreground mt-1">
                Open visiting, parental presence during procedures and resuscitation where possible, play specialists, psychological support, clear and honest communication. Bereavement support after death.
              </p>
            </div>
          </div>
        </div>

        {/* Paediatric Resuscitation */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Paediatric Resuscitation Key Points</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                  <th className="text-left py-2 text-foreground font-semibold">Infant (&lt;1 yr)</th>
                  <th className="text-left py-2 text-foreground font-semibold">Child (1–puberty)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Compression rate</td>
                  <td className="py-2">100–120/min</td>
                  <td className="py-2">100–120/min</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Compression depth</td>
                  <td className="py-2">⅓ AP diameter (~4 cm)</td>
                  <td className="py-2">⅓ AP diameter (~5 cm)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Compression:ventilation</td>
                  <td className="py-2">15:2 (healthcare provider)</td>
                  <td className="py-2">15:2 (healthcare provider)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Defibrillation</td>
                  <td className="py-2">4 J/kg</td>
                  <td className="py-2">4 J/kg</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Adrenaline</td>
                  <td className="py-2">10 mcg/kg (0.1 ml/kg of 1:10,000)</td>
                  <td className="py-2">10 mcg/kg (0.1 ml/kg of 1:10,000)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Amiodarone</td>
                  <td className="py-2">5 mg/kg</td>
                  <td className="py-2">5 mg/kg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <p className="text-sm font-semibold text-destructive">⚠ Key Difference from Adults</p>
            <p className="text-sm text-muted-foreground mt-1">
              Paediatric cardiac arrest is most commonly caused by <strong>respiratory failure or shock</strong> (not primary cardiac arrhythmia). Initial management should focus on oxygenation and ventilation — 5 rescue breaths before starting compressions.
            </p>
          </div>
        </div>

        <KeyLearningPoints points={[
          "Children have HR-dependent cardiac output — bradycardia is a pre-arrest sign; treat with atropine 20 mcg/kg",
          "Paediatric septic shock: 10–20 ml/kg boluses with reassessment; adrenaline for cold shock, noradrenaline for warm shock",
          "Single ventricle physiology: target SpO₂ 75–85%; excessive O₂ causes pulmonary overcirculation and systemic steal",
          "PRIS (propofol infusion syndrome) — avoid prolonged propofol infusions (>48h) in children",
          "Isotonic maintenance fluids only — hypotonic fluids can cause fatal hyponatraemia in children",
          "Paediatric cardiac arrest is usually respiratory in origin — 5 rescue breaths first, defibrillation 4 J/kg",
          "Brainstem death testing in children: >2 months, NOT applicable <37 weeks corrected gestational age",
          "FEAST trial: fluid boluses increased mortality in resource-limited settings — does NOT change UK practice"
        ]} />
      </section>

      <ReferencesList topicId="paediatric-icu" />

      <SeeAlso topicId="paediatric-icu" />
        <TopicCompletionToggle topicId="paediatric-icu" topicTitle="Paediatric Intensive Care" />
    </SectionLayout>
  );
};

export default PaediatricIcuTopic;
