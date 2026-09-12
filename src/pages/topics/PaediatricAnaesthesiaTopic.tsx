import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { ExamSection } from "@/components/exam/ExamSection";
import PaediatricSurgicalProceduresDiagram from "@/components/diagrams/clinical/PaediatricSurgicalProceduresDiagram";
import CaudalBlockDiagram from "@/components/diagrams/clinical/CaudalBlockDiagram";
import CaudalSurfaceAnatomyDiagram from "@/components/diagrams/clinical/CaudalSurfaceAnatomyDiagram";
import { PaediatricPhysiologyDiagram } from "@/components/diagrams/clinical/PaediatricPhysiologyDiagram";
import PaediatricEquipmentSizer from "@/components/diagrams/clinical/PaediatricEquipmentSizer";
import { DiagramSection } from "@/components/topic/DiagramSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { paediatricAnaesthesiaQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocItems = [
  { id: "physiology", label: "Physiological differences", group: "Foundations" },
  { id: "equipment", label: "Equipment & emergency drugs", group: "Foundations" },
  { id: "scenarios", label: "Common scenarios", group: "Clinical" },
  { id: "procedures", label: "Key surgical procedures", group: "Clinical" },
  { id: "tiva", label: "Paediatric TIVA & remi-mix", group: "Technique" },
  { id: "analgesia", label: "PCA, NCA & caudal block", group: "Technique" },
  { id: "fluids", label: "Fluid management", group: "Clinical" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

// SEO-targeted FAQ — answers the highest-volume UK paediatric-anaesthesia
// question keywords (paediatric RSI, ETT sizing, TIVA, remi-prop, caudal block,
// pyloric stenosis, laryngospasm, PRIS, fluid management).
// Rendered as accordion + FAQPage JSON-LD for rich-result eligibility.
const paediatricFaqs: Array<[string, string]> = [
  [
    "How is paediatric airway anatomy different from adults?",
    "Children have several anatomical differences that make airway management more challenging: a relatively large head and tongue; a high anterior larynx at C3–C4 (adult: C4–C5); a long, floppy epiglottis; a narrowest airway at the subglottic cricoid ring (cylindrical) rather than the glottis; and a short trachea (4–5 cm in neonates). These features explain why straight blades (Miller) are preferred in infants, why uncuffed endotracheal tubes were traditionally used under age 8 (though modern cuffed tubes are now accepted from ~3 kg), and why neonates desaturate rapidly after apnoea due to high oxygen consumption (6–8 mL/kg/min) and low functional reserve capacity.",
  ],
  [
    "What is the correct ETT size for a child?",
    "For children over 1 year, use the age-based formulas: uncuffed ETT size (mm) = age/4 + 4; cuffed ETT size = age/4 + 3.5. Oral insertion depth (cm at lips) = age/2 + 12. For a 4-year-old: uncuffed 5.0 mm, cuffed 4.5 mm, depth 14 cm. Neonates and infants: 3.0–3.5 mm (uncuffed) or 3.0 mm (cuffed) for term neonates, at 9–10 cm depth. Always have one size smaller and one size larger immediately available. Cuffed tubes are now accepted in most paediatric centres because they reduce re-intubation rates and improve ventilation dynamics, provided the cuff pressure is monitored and kept <20–25 cmH₂O.",
  ],
  [
    "What is the WETFLAG emergency drug dose framework?",
    "WETFLAG is a paediatric emergency checklist used to rapidly estimate weight and calculate critical drug doses and equipment sizes: W (Weight = (age + 4) × 2 kg), E (Energy for defibrillation = 4 J/kg), T (Tube size = age/4 + 4 mm uncuffed), F (Fluids = 10–20 mL/kg bolus), L (Length of ETT at lips = age/2 + 12 cm), A (Adrenaline = 10 µg/kg IV/IO for cardiac arrest; 0.1 µg/kg/min for infusion), G (Glucose = 2 mL/kg of 10% dextrose for hypoglycaemia). This ensures standardised, rapid preparation during paediatric emergencies and arrests.",
  ],
  [
    "How do you manage laryngospasm in a child?",
    "Laryngospasm is the most common paediatric airway emergency. Management follows a graded approach: (1) apply 100% oxygen with continuous positive airway pressure (CPAP) via a tight-fitting face mask; (2) perform jaw thrust and head tilt; (3) apply firm bilateral pressure at Larson's notch (the depression just behind the lobule of the ear, anterior to the mastoid) — this can break the reflex arc; (4) if not resolving, deepen anaesthesia with propofol 0.5–1 mg/kg IV; (5) if still persistent or desaturating, give suxamethonium 0.5–1 mg/kg IV (or 4 mg/kg IM if no IV access); (6) if bradycardia develops, give atropine 20 µg/kg IV. Prevention is key: avoid extubation during light planes of anaesthesia, ensure adequate depth before airway instrumentation, and treat secretions/blood in the airway promptly.",
  ],
  [
    "What is remi-prop (remifol) and how is it used in paediatric TIVA?",
    "Remi-prop (or remifol) is the colloquial name for a single-syringe mixture of propofol and remifentanil used for total intravenous anaesthesia in children. The mixture is named by its remifentanil concentration in micrograms per millilitre of 1% propofol: Remi 5 = 5 µg remifentanil per ml of 10 mg/ml propofol (the default workhorse mix for dental, MRI, day-case surgery). Preparation: reconstitute 1 mg remifentanil in 10 ml water (100 µg/ml), draw up 2.5 ml (250 µg) and add to 50 ml of 1% propofol → 5 µg/ml remifentanil. A maintenance rate of 10 ml/hr per 10 kg delivers ~10 mg/kg/hr propofol + ~0.08 µg/kg/min remifentanil. Advantages: one pump, one line, no differential disconnection risk, simpler in MRI bores. Cautions: loss of independent titration, unlicensed mixing requiring local SOP, boluses from the running syringe risk bradycardia and chest-wall rigidity.",
  ],
  [
    "What is propofol infusion syndrome (PRIS) and how do you prevent it?",
    "Propofol infusion syndrome (PRIS) is a rare but potentially fatal metabolic complication of prolonged propofol infusion, characterised by metabolic acidosis, rhabdomyolysis, hyperkalaemia, lipaemia, cardiac arrhythmias and heart failure. Risk rises sharply with infusions >4 mg/kg/hr for >48 hours, particularly in critically ill, septic, or steroid/catecholamine-treated children. Prevention: keep propofol <4 mg/kg/hr, limit duration, avoid in septic or mitochondrial disorder patients, and monitor lactate, creatine kinase and triglycerides if infusion exceeds 24 hours. In PICU, use dexmedetomidine or midazolam-based sedation instead of prolonged propofol.",
  ],
  [
    "How do you anaesthetise a child with pyloric stenosis?",
    "Pyloric stenosis presents with projectile vomiting leading to a hypochloraemic, hypokalaemic metabolic alkalosis. It is a MEDICAL emergency, not a surgical one — the alkalosis must be corrected before theatre because post-operative apnoea is common if HCO₃ >26 mmol/L. Resuscitate with 0.9% saline 10–20 ml/kg boluses to restore intravascular volume, then 0.45% saline + 5% dextrose with 20 mmol/L KCl at 1.5 × maintenance. Targets before surgery: Na ≥135, K ≥3.5, Cl ≥100, HCO₃ ≤26, and adequate urine output. In theatre, use a modified RSI (full stomach) with ketamine or propofol and rocuronium, maintain normothermia, and monitor glucose closely.",
  ],
  [
    "What is a caudal block and when is it used in children?",
    "A caudal block is a single-shot epidural injection via the sacral hiatus that provides analgesia for sub-umbilical surgery. It is the commonest paediatric regional technique because the sacral cornua are easily palpable in young children and the sacrococcygeal membrane gives a definite 'pop'. Use the Armitage volume regimen with 0.25% bupivacaine or 0.2% ropivacaine: 0.5 ml/kg for sacral spread (circumcision), 1.0 ml/kg for high lumbar/low thoracic (orchidopexy, hernia), and 1.25 ml/kg for mid-thoracic (maximum — motor block and local anaesthetic toxicity risk). Always use a test dose with adrenaline 0.5 µg/kg to detect intravascular placement. Adjuncts like clonidine 1–2 µg/kg extend duration by 50–100%. Contraindications: local infection, coagulopathy, raised ICP, spina bifida at the hiatus, sacral abnormalities.",
  ],
  [
    "What fluids should be used for paediatric maintenance and resuscitation?",
    "For maintenance, use the Holliday-Segar 4-2-1 rule: 4 ml/kg/hr for the first 10 kg, 2 ml/kg/hr for the next 10 kg, and 1 ml/kg/hr for each kg thereafter. Use isotonic balanced crystalloids (Plasmalyte, Hartmann's) — AVOID hypotonic solutions (0.45% saline, 0.18% saline/4% glucose) because they carry a significant risk of iatrogenic hyponatraemia and cerebral oedema. For resuscitation, give 10–20 ml/kg boluses of warmed isotonic crystalloid and reassess after each bolus. For blood replacement, estimate maximum allowable blood loss (MABL) = EBV × (Hct_start − Hct_min) / Hct_start, where neonatal estimated blood volume = 80 ml/kg.",
  ],
  [
    "What is the difference between PCA and NCA in children?",
    "PCA (patient-controlled analgesia) is suitable from approximately 5–6 years of age, when the child can understand the cause-and-effect relationship of pressing the button for pain relief. NCA (nurse-controlled analgesia) uses the same pump and safety architecture but the bolus is delivered by a trained nurse based on protocolised pain assessment (FLACC score, Wong-Baker faces), and is used in children under 5 or those with developmental delay who cannot operate the handset. Both typically use morphine 1 mg/kg in 50 ml (20 µg/kg/ml): bolus 20 µg/kg, lockout 5 min (PCA) or 20–30 min (NCA), with an optional background infusion. Safety essentials include one-way anti-syphon valves, continuous SpO₂ monitoring, hourly nursing observations, and naloxone at the bedside.",
  ],
];

const objectives = [
  "Identify key anatomical and physiological differences between neonates, infants and adults",
  "Use the WETFLAG framework to size airway equipment and emergency drug doses",
  "Recognise and manage paediatric airway emergencies (laryngospasm, epiglottitis)",
  "Plan paediatric TIVA (remi-prop) and recognise propofol infusion syndrome (PRIS)",
  "Choose between PCA, NCA and caudal analgesia for paediatric postoperative pain",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Pyloric stenosis — fluid and electrolyte resuscitation first",
    scenario:
      "A 5-week-old infant presents with projectile vomiting, weight loss and a palpable olive. Bloods: Na 132, K 2.9, Cl 88, HCO₃ 34, pH 7.52. Is he ready for theatre?",
    working:
      "Classic hypochloraemic, hypokalaemic metabolic alkalosis from prolonged vomiting of gastric HCl.\nThis is a MEDICAL emergency, not a surgical one — uncorrected alkalosis causes post-op apnoea (compensatory hypoventilation perpetuated under anaesthesia).\nResuscitate: 0.9% saline 10–20 ml/kg bolus to restore intravascular volume, then 0.45% saline + 5% dextrose with KCl 20 mmol/L at 1.5 × maintenance.\nTargets before theatre: Na ≥135, K ≥3.5, Cl ≥100, HCO₃ ≤26, normal urine output.\nThen RSI (modified — full stomach), maintain normothermia and glucose monitoring.",
    answer:
      "Not yet. Correct the alkalosis and electrolyte deficit (Cl ≥100, HCO₃ ≤26, K ≥3.5) over 24–48 h before theatre, then proceed with modified RSI.",
    cites: ["BJA Educ 2019"],
  },
  {
    title: "ETT and emergency drug doses for a 4-year-old",
    scenario:
      "Calculate uncuffed ETT size, weight estimate, adrenaline arrest dose and defibrillation energy for a 4-year-old.",
    working:
      "Weight (APLS): (age + 4) × 2 = 16 kg.\nUncuffed ETT: age/4 + 4 = 5.0 mm; cuffed: age/4 + 3.5 = 4.5 mm.\nETT length (oral): age/2 + 12 = 14 cm at the lips.\nAdrenaline (cardiac arrest): 10 µg/kg = 160 µg = 1.6 ml of 1:10,000.\nDefibrillation: 4 J/kg = 64 J (round to 70 J on biphasic).\nFluid bolus (trauma/shock): 10 ml/kg = 160 ml of warmed crystalloid.",
    answer:
      "Weight 16 kg; uncuffed ETT 5.0 mm at 14 cm; adrenaline 160 µg (1.6 ml 1:10,000); defibrillate at ~70 J; fluid bolus 160 ml.",
    cites: ["APAGBI 2020"],
  },
];

const PaediatricAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Paediatric Anaesthesia"
      subtitle="FRCA / FFICM — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="paediatric-anaesthesia"
      topicTitle="Paediatric Anaesthesia"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={paediatricAnaesthesiaQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2019",
          "Sury et al.",
          "APAGBI 2020",
        ],
        keyPoints: [
          "BJA Educ 2019",
          "Sury et al.",
          "APAGBI 2020",
        ],
        workedExamples: ["BJA Educ 2019", "APAGBI 2020"],
      }}
      keyPoints={[
        { text: "Neonatal cardiac output is rate-dependent — bradycardia is a haemodynamic emergency", cites: ["Sury et al."] },
        { text: "High O₂ consumption + low FRC = rapid desaturation; pre-oxygenation essential", cites: ["BJA Educ 2019"] },
        { text: "ETT size: uncuffed = age/4 + 4; cuffed = age/4 + 3.5", cites: ["APAGBI 2020"] },
        { text: "Pyloric stenosis: correct the alkalosis first — it is a medical, not surgical, emergency", cites: ["Sury et al."] },
        { text: "Use isotonic balanced crystalloids for maintenance — never hypotonic solutions in children", cites: ["BJA Educ 2019"] },
        { text: "'Remi-prop' TIVA is ideal for shared-airway, MRI and MH-susceptible children — keep propofol <4 mg/kg/hr to avoid PRIS", cites: ["APAGBI 2020"] },
        { text: "PCA from ~5 yr; below that use NCA. Never codeine <12 yr; never tramadol post-tonsillectomy for OSA", cites: ["Sury et al."] },
        { text: "Caudal block: Armitage 0.5/1.0/1.25 ml/kg of 0.25% bupivacaine for sacral/lumbar/thoracic spread; always test-dose for intravascular placement", cites: ["BJA Educ 2019"] },
      ]}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />

          <ExamSection id="physiology" exams={[Exam.FINAL]} className="scroll-mt-24">
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                  Anatomical & Physiological Differences
                  <InlineRef topicId="paediatric-anaesthesia" refLabel="BJA Educ 2019" />
                  <InlineRef topicId="paediatric-anaesthesia" refLabel="APAGBI 2020" />
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Children are not small adults: differences in airway anatomy, respiratory mechanics, rate-dependent cardiac output, thermoregulation, and drug handling all translate into distinct anaesthetic priorities. The table below summarises the system-by-system contrasts that drive equipment choice, monitoring, and emergency response in paediatric practice. Quantitative values (O₂ consumption, larynx level, FRC, BSA:weight ratio) are textbook paediatric physiology data summarised in Engelhardt's BJA Education review and APAGBI good-practice guidance.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-foreground font-semibold">System</th>
                        <th className="text-left py-2 text-foreground font-semibold">Neonate/Infant</th>
                        <th className="text-left py-2 text-foreground font-semibold">Clinical Relevance</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Airway</td><td>Large head/tongue, high anterior larynx (C3-4), narrow subglottis</td><td>Straight blade (Miller), uncuffed ETT &lt;8y (traditional), cuffed now accepted &gt;3kg</td></tr>
                      <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Resp</td><td>High O₂ consumption (6-8 ml/kg/min), low FRC, high closing capacity</td><td>Rapid desaturation, prone to atelectasis</td></tr>
                      <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CVS</td><td>Rate-dependent cardiac output, immature baroreflexes</td><td>Bradycardia = haemodynamic emergency, atropine 20 µg/kg</td></tr>
                      <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Metabolism</td><td>High BSA:weight ratio, limited glycogen stores</td><td>Hypothermia risk, hypoglycaemia risk — check glucose</td></tr>
                      <tr><td className="py-2 font-medium text-foreground">Pharmacology</td><td>↑ Volume of distribution, immature hepatic metabolism, ↓ protein binding</td><td>Higher weight-based doses of water-soluble drugs, prolonged duration of some agents</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </ExamSection>

          <ExamSection id="equipment" exams={[Exam.FINAL]}>
            <DiagramSection
              title="Paediatric Physiology vs Adult — Interactive Comparison"
              intro={
                <p>
                  Click a system on the infant silhouette (or a chip below) to see neonate, infant and child values side-by-side with the adult reference. Use this to internalise <em>which</em> values change <em>when</em> — and the practical anaesthetic implication for each system.
                </p>
              }
            >
              <PaediatricPhysiologyDiagram />
            </DiagramSection>

            <DiagramSection
              title="Paediatric Equipment Sizer + Emergency Drug Doses"
              intro={
                <p>
                  An interactive WETFLAG-extended tool: enter age <em>or</em> measured weight and get every airway tube, supraglottic
                  device, drainage catheter, vascular access size, defibrillator setting and emergency drug dose recalculated live.
                  Use it to brief the team before paediatric induction or at the start of any resus. Weight estimates, fluid boluses
                  (10 mL/kg post-FEAST), defibrillation energies and arrest drug doses follow <InlineRef topicId="paediatric-anaesthesia" refLabel="APLS 2021" />;
                  drug doses cross-checked against <InlineRef topicId="paediatric-anaesthesia" refLabel="BNFc" />; equipment sizing aligned with{" "}
                  <InlineRef topicId="paediatric-anaesthesia" refLabel="APAGBI 2020" />.
                </p>
              }
            >
              <PaediatricEquipmentSizer />
            </DiagramSection>
          </ExamSection>

          <ExamSection id="scenarios" exams={[Exam.FINAL]}>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Common Paediatric Scenarios</h2>
              <div className="space-y-3">
                {[
                  { scenario: "Laryngospasm", management: "Most common paediatric airway emergency. Apply CPAP with 100% O₂, jaw thrust. If not resolving: propofol 0.5 mg/kg or suxamethonium 0.5–1 mg/kg IV/IM. Larson's notch pressure." },
                  { scenario: "Epiglottitis", management: "Now rare (Hib vaccine). Do NOT examine throat. Gaseous induction in theatre with ENT standby. IV access after induction. Tracheostomy rarely needed." },
                  { scenario: "Pyloric Stenosis", management: "Hypochloraemic, hypokalaemic metabolic alkalosis. Medical emergency, NOT surgical. Correct electrolytes and dehydration first. RSI with modified approach." },
                  { scenario: "Tonsillectomy Bleeding", management: "Assume full stomach and hypovolaemia. Resuscitate with 20 ml/kg crystalloid. RSI with head-down, left lateral position. Suction before induction." },
                ].map((s) => (
                  <div key={s.scenario} className="p-3 rounded-lg bg-secondary/30 border border-border">
                    <p className="font-semibold text-foreground text-sm">{s.scenario}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.management}</p>
                  </div>
                ))}
              </div>
            </div>
          </ExamSection>

          <ExamSection id="procedures" exams={[Exam.FINAL]}>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Paediatric Surgical Procedures</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Five exam-favourite paediatric procedures, each illustrating a different anaesthetic principle — sepsis & coagulopathy (NEC), correcting electrolytes before surgery (pyloric stenosis), shared & ductal-dependent airway physiology (TOF), time-critical theatre access (testicular torsion), and spontaneous-ventilation airway management (inhaled foreign body). Click each site on the diagram below to explore.
              </p>
              <PaediatricSurgicalProceduresDiagram />
            </div>
          </ExamSection>

          <ExamSection id="tiva" exams={[Exam.FINAL]}>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Paediatric TIVA — Including "Remi-Prop" / "Remifol"</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                TIVA in children offers a smooth, non-emetic recovery, avoids volatiles in MH-susceptible patients, and is invaluable for shared-airway and remote-site work (MRI, radiotherapy, bronchoscopy). The combination of propofol and remifentanil — colloquially "remi-prop" or <em>remifol</em> — is the workhorse paediatric TIVA technique because both agents are titratable, rapidly cleared (remifentanil by non-specific tissue/plasma esterases, independent of age beyond the neonatal period) and produce minimal accumulation.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Propofol — paediatric TCI</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong className="text-foreground">Kataria</strong> or <strong className="text-foreground">Paedfusor</strong> models (children 1–16 yr, &gt;5 kg). Higher Vd and clearance per kg than adults — paediatric models target larger doses to achieve equivalent plasma levels. Typical maintenance Cp 3–6 µg/ml. Manual: induction 4 mg/kg, then 15-13-11-10-9 mg/kg/hr stepped down (Roberts/McFarlan-style regimen).
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Remifentanil</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Context-sensitive half-time ~3 min regardless of infusion duration. Manual: 0.1–0.5 µg/kg/min (intubation/strong stimulus up to 1 µg/kg/min). Minto TCI not validated &lt;12 yr — use weight-based manual infusion in younger children. Always co-administer simple analgesia (paracetamol, NSAID, regional) before stopping the infusion to avoid pain on emergence.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border mb-3">
                <p className="font-semibold text-foreground text-sm mb-1">Single-syringe propofol + remifentanil ("Remi-mix")</p>
                <p className="text-sm text-muted-foreground mt-1 mb-2">
                  A practical paediatric variant in which remifentanil is reconstituted and added directly into the propofol syringe so both drugs are delivered through one pump and one cannula. Widely used in UK paediatric centres (Bristol, GOSH, Alder Hey) for short-to-medium cases — particularly MRI, dental, ophthalmic and shared-airway lists where a second pump and second line are awkward. The mixture is named for the remifentanil concentration in micrograms per millilitre of 1% propofol: <strong className="text-foreground">Remi&nbsp;5</strong> = 5&nbsp;µg remifentanil per ml of 10&nbsp;mg/ml propofol. Practical preparation: reconstitute a 1&nbsp;mg remifentanil vial in 10&nbsp;ml water (→ 100&nbsp;µg/ml), draw up <strong className="text-foreground">2.5&nbsp;ml (250&nbsp;µg)</strong> and add to a 50&nbsp;ml syringe of 1% propofol → 250&nbsp;µg remi in 50&nbsp;ml = 5&nbsp;µg/ml remi alongside 10&nbsp;mg/ml propofol. (For Remi&nbsp;10 add 5&nbsp;ml = 500&nbsp;µg; for Remi&nbsp;2 add 1&nbsp;ml = 100&nbsp;µg.) Stable physico-chemically for at least 6&nbsp;hr at room temperature.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-1.5 text-foreground font-semibold">Mix</th>
                        <th className="text-left py-1.5 text-foreground font-semibold">Remi (µg/ml)</th>
                        <th className="text-left py-1.5 text-foreground font-semibold">Propofol (mg/ml)</th>
                        <th className="text-left py-1.5 text-foreground font-semibold">Typical use</th>
                        <th className="text-left py-1.5 text-foreground font-semibold">Effective ratio</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border"><td className="py-1.5 font-medium text-foreground">Remi 2</td><td>2</td><td>10</td><td>Sedation / non-stimulating MRI, sedated cardiac cath, infants where a lower opioid load is wanted</td><td>1 µg remi : 5 mg propofol</td></tr>
                      <tr className="border-b border-border"><td className="py-1.5 font-medium text-foreground">Remi 5</td><td>5</td><td>10</td><td><strong className="text-foreground">Default workhorse mix</strong> — dental, strabismus, MRI under GA, tonsillectomy, day-case general surgery</td><td>1 µg remi : 2 mg propofol</td></tr>
                      <tr className="border-b border-border"><td className="py-1.5 font-medium text-foreground">Remi 10</td><td>10</td><td>10</td><td>Stimulating shared-airway work — microlaryngoscopy, rigid bronchoscopy, adenotonsillectomy with OSA</td><td>1 µg remi : 1 mg propofol</td></tr>
                      <tr><td className="py-1.5 font-medium text-foreground">Remi 20</td><td>20</td><td>10</td><td>Brief, very stimulating procedures (laser airway, rigid oesophagoscopy) where opioid demand exceeds propofol demand</td><td>2 µg remi : 1 mg propofol</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Practical dosing: after induction, a maintenance rate of <strong className="text-foreground">10&nbsp;ml/hr per 10&nbsp;kg</strong> of Remi&nbsp;5 delivers ~10&nbsp;mg/kg/hr propofol + ~0.08&nbsp;µg/kg/min remifentanil — a sensible starting point, then titrated to clinical effect (movement, HR, RR, BIS if used).
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div className="p-4 rounded-lg border border-border bg-secondary/20">
                  <p className="font-semibold text-foreground text-sm mb-1">Advantages of the single-syringe technique</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                    <li><strong className="text-foreground">One pump, one line</strong> — simpler in MRI bores, on transfers and on small children with limited venous access</li>
                    <li><strong className="text-foreground">No risk of differential disconnection</strong> — propofol and remifentanil cannot become uncoupled mid-case, so the child cannot inadvertently receive opioid without hypnotic (or vice versa)</li>
                    <li>No dead-space or back-flow problems from a Y-connector — both drugs travel together in the same lumen at the same rate</li>
                    <li>Faster set-up and lower kit cost — useful on remote-site and emergency lists</li>
                    <li>Reduced drug-error opportunity at programming (a single rate, single drug-name field)</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border-l-4 border-amber-500 bg-amber-500/5">
                  <p className="font-semibold text-foreground text-sm mb-1">Drawbacks & cautions</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                    <li><strong className="text-foreground">Loss of independent titration</strong> — cannot increase opioid for a stimulating moment without also increasing hypnotic (and vice versa). Choose the mix to match the expected stimulus profile <em>before</em> starting</li>
                    <li><strong className="text-foreground">Unlicensed / off-label</strong> mixing — must be prepared by the anaesthetist with a clear local SOP, two-person check and bold syringe labelling stating both drugs and their concentrations</li>
                    <li>TCI models cannot be used — the pump only "knows" propofol, so manual rate-based dosing is mandatory; depth-of-anaesthesia monitoring (BIS/Entropy) is therefore strongly recommended</li>
                    <li>Bolus doses give a paired remifentanil bolus — risk of <strong className="text-foreground">bradycardia, chest-wall rigidity and hypotension</strong>, especially in neonates and small infants. Avoid rescue boluses from the running syringe; give separate small propofol boluses instead</li>
                    <li>Wastage if the case is shorter than expected; the mixed syringe cannot be re-used for another patient</li>
                    <li>Not suitable for prolonged ICU sedation or for cases where opioid requirement is likely to fall sharply (e.g. once a regional block is sited)</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-border bg-background/60 mb-3">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">Key references — Remi-mix technique</p>
                <ol className="text-xs text-muted-foreground list-decimal list-inside space-y-1">
                  <li>
                    Nimmo AF, Absalom AR, Bagshaw O, et&nbsp;al. <em>Guidelines for the safe practice of total intravenous anaesthesia (TIVA)</em>. Joint AAGBI/SIVA guidelines. <strong className="text-foreground">Anaesthesia 2019;74:211–24.</strong>{" "}
                    <a href="https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/full/10.1111/anae.14428" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">doi:10.1111/anae.14428</a>{" "}
                    — defines safe practice for TIVA, including admixed propofol-remifentanil where local SOPs exist.
                  </li>
                  <li>
                    Bagshaw O, Stack S, Wolf AR. <em>The safety profile and effectiveness of propofol-remifentanil mixtures for total intravenous anesthesia in children</em>. <strong className="text-foreground">Pediatr Anaesth 2020;30:1331–9.</strong>{" "}
                    <a href="https://onlinelibrary.wiley.com/doi/10.1111/pan.14018" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">doi:10.1111/pan.14018</a>{" "}
                    — large UK paediatric series supporting Remi 2 / Remi 5 / Remi 10 / Remi 20 mixtures and their typical clinical use.
                  </li>
                  <li>
                    Shankey-Smith G, Lönnqvist P-A, Bagshaw O, et&nbsp;al. <em>The use of propofol-remifentanil mixture for TIVA in pediatric anesthesia — an opinion from a group of pediatric anesthetists</em>. <strong className="text-foreground">Pediatr Anaesth 2021;31:262–4.</strong>{" "}
                    <a href="https://onlinelibrary.wiley.com/doi/10.1111/pan.14135" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">doi:10.1111/pan.14135</a>{" "}
                    — concentration-rationale rationale for naming the mixtures by remi µg/ml.
                  </li>
                  <li>
                    Donnelly RF. <em>The effect of concentration, reconstitution solution and pH on the stability of a remifentanil hydrochloride and propofol admixture for simultaneous co-infusion</em>. <strong className="text-foreground">BMC Anesthesiol 2020;20:284.</strong>{" "}
                    <a href="https://bmcanesthesiol.biomedcentral.com/articles/10.1186/s12871-020-01194-5" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">doi:10.1186/s12871-020-01194-5</a>{" "}
                    — chemical/physical stability data: remifentanil + propofol admixtures are stable for ≥24&nbsp;hr at room temperature when reconstituted in water for injection (NOT 0.9% saline at high pH).
                  </li>
                  <li>
                    O'Connor S, Zhang Y-L, Lynch MJ, et&nbsp;al. <em>Remifentanil and propofol undergo separation and layering when mixed in the same syringe for total intravenous anesthesia</em>. <strong className="text-foreground">Pediatr Anaesth 2016;26:703–9.</strong>{" "}
                    <a href="https://onlinelibrary.wiley.com/doi/10.1111/pan.12917" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">doi:10.1111/pan.12917</a>{" "}
                    — drawback: visible separation/layering if syringes left static; agitate before use and re-mix periodically.
                  </li>
                  <li>
                    Anderson BJ, Bagshaw O. <em>Practicalities of total intravenous anesthesia and target-controlled infusion in children</em>. <strong className="text-foreground">Anesthesiology 2019;131:164–85.</strong>{" "}
                    <a href="https://pubs.asahq.org/anesthesiology/article/131/1/164/18717" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">doi:10.1097/ALN.0000000000002657</a>{" "}
                    — paediatric TIVA review: TCI models, manual regimens and the rationale for fixed remi:propofol ratios.
                  </li>
                  <li>
                    Coppens MJ, Eleveld DJ, Proost JH, et&nbsp;al. <em>Principles of total intravenous anaesthesia: basic pharmacokinetics and model descriptions</em>. <strong className="text-foreground">BJA Education 2018;18(3):92–7.</strong>{" "}
                    <a href="https://www.bjaed.org/article/S2058-5349(17)30085-9/fulltext" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">bjaed.org</a>{" "}
                    — BJA Education primer on TIVA pharmacokinetics underpinning fixed-ratio admixture rates.
                  </li>
                  <li>
                    NHS Greater Glasgow &amp; Clyde Paediatric Anaesthesia. <em>Total Intravenous Anaesthesia (TIVA): a guide to using propofol and remifentanil mixed in the same syringe</em>. NHSGGC Clinical Guideline.{" "}
                    <a href="https://clinicalguidelines.scot.nhs.uk/ggc-paediatric-guidelines/ggc-paediatric-guidelines/anaesthetics/total-intravenous-anaesthesia-tiva-a-guide-to-using-propofol-and-remifentanil-mixed-in-the-same-syringe/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">clinicalguidelines.scot.nhs.uk</a>{" "}
                    — worked preparation instructions for Remi 2 / Remi 5 / Remi 10 in 50 ml of 1% propofol with two-person check.
                  </li>
                </ol>
              </div>

              <div className="p-4 rounded-lg bg-secondary/30 border border-border mb-3">
                <p className="font-semibold text-foreground text-sm mb-1">Indications & advantages</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                  <li>Shared airway (microlaryngoscopy, rigid bronchoscopy, tonsillectomy with suspected OSA)</li>
                  <li>MH-susceptible / strong family history</li>
                  <li>Remote-site anaesthesia (MRI, radiotherapy, cath lab)</li>
                  <li>High PONV risk (&gt;3 yr, squint surgery, previous PONV)</li>
                  <li>Neurosurgery — preserves CO₂ reactivity and lowers ICP</li>
                  <li>Avoids environmental volatile pollution</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-destructive bg-destructive/5">
                <p className="font-semibold text-foreground text-sm">Propofol Infusion Syndrome (PRIS)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Risk rises sharply with <strong className="text-foreground">infusions &gt;4 mg/kg/hr for &gt;48 hr</strong>, especially in critically ill or septic children receiving steroids/catecholamines. Presents with metabolic acidosis, rhabdomyolysis, hyperkalaemia, lipaemia, cardiac failure. Avoid prolonged propofol sedation in PICU; use dexmedetomidine or midazolam-based regimens. Monitor lactate, CK, triglycerides if propofol must continue beyond 24 hr.
                </p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="analgesia" exams={[Exam.FINAL]}>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Paediatric PCA &amp; NCA</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong className="text-foreground">PCA (patient-controlled analgesia)</strong> is suitable from approximately <strong className="text-foreground">5–6 years</strong>, when the child can reliably understand cause-and-effect ("press the button → less pain"). Below this age, or when developmental delay/severe pain prevents the child operating the handset, <strong className="text-foreground">NCA (nurse-controlled analgesia)</strong> is used — the same pump and safety architecture but the bolus is delivered by a trained nurse using protocolised pain assessment (FLACC, Wong-Baker faces).
              </p>
              <div className="overflow-x-auto mb-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                      <th className="text-left py-2 text-foreground font-semibold">Morphine PCA (≥5 yr)</th>
                      <th className="text-left py-2 text-foreground font-semibold">Morphine NCA (&lt;5 yr / unable)</th>
                      <th className="text-left py-2 text-foreground font-semibold">Fentanyl NCA (renal failure / morphine intolerance)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Concentration</td><td>1 mg/kg in 50 ml (max 50 mg) → 20 µg/kg/ml</td><td>1 mg/kg in 50 ml → 20 µg/kg/ml</td><td>10 µg/kg in 50 ml → 0.2 µg/kg/ml</td></tr>
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Bolus</td><td>20 µg/kg (1 ml)</td><td>20 µg/kg (1 ml)</td><td>0.2 µg/kg (1 ml)</td></tr>
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Lockout</td><td>5 min</td><td>20–30 min</td><td>20–30 min</td></tr>
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Background</td><td>Optional 4 µg/kg/hr (controversial — increases respiratory events)</td><td>Routine 10–20 µg/kg/hr</td><td>0.1–0.2 µg/kg/hr</td></tr>
                    <tr><td className="py-2 font-medium text-foreground">4-hr max</td><td>~300 µg/kg</td><td>~300 µg/kg</td><td>~3 µg/kg</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Safety essentials</p>
                  <p className="text-sm text-muted-foreground mt-1">One-way anti-syphon and anti-reflux valves on a dedicated IV line. Continuous SpO₂ ± capnography for NCA or PCA with background. Hourly nursing observations including sedation score (UMSS) and respiratory rate. Naloxone (10 µg/kg) and oxygen at the bedside.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Special situations</p>
                  <p className="text-sm text-muted-foreground mt-1">Avoid morphine in renal impairment (M6G accumulation) — use fentanyl. Codeine is contraindicated &lt;12 yr (MHRA, 2013) due to unpredictable CYP2D6 ultra-rapid metabolism. Tramadol contraindicated &lt;12 yr post-tonsillectomy for OSA. Always combine with multimodal analgesia (paracetamol, ibuprofen, regional).</p>
                </div>
              </div>
            </div>

            <DiagramSection
              title="Caudal Epidural Block"
              intro={
                <>
                  <p>
                    The caudal block is the commonest paediatric regional technique — a single-shot epidural via the sacral hiatus that provides reliable analgesia for any sub-umbilical surgery (circumcision, hypospadias, orchidopexy, inguinal hernia, lower-limb procedures). It is technically easier in young children because the cornua are easily palpable, the sacrococcygeal membrane gives a definite "pop", and ossification of the sacrum is incomplete until the late teens. Landmarks become unreliable after about 7 years, so older children increasingly receive ultrasound-guided caudal or alternative regional blocks.
                  </p>
                </>
              }
            >
              <CaudalSurfaceAnatomyDiagram />
              <CaudalBlockDiagram />
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Armitage volume regimen (0.25% bupivacaine or 0.2% ropivacaine)</p>
                  <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-0.5">
                    <li><strong className="text-foreground">0.5 ml/kg</strong> — sacral block (circumcision)</li>
                    <li><strong className="text-foreground">1.0 ml/kg</strong> — high lumbar / low thoracic (orchidopexy, hernia)</li>
                    <li><strong className="text-foreground">1.25 ml/kg</strong> — mid-thoracic (max — risk of motor block / LA toxicity)</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">Max bupivacaine 2 mg/kg; max ropivacaine 3 mg/kg.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Adjuncts — mechanism, dose &amp; safety <InlineRef topicId="paediatric-anaesthesia" refLabel="Anaesthesia 2021 Paed Regional" /></p>
                  <p className="text-xs text-muted-foreground mt-1">A single-shot caudal with plain local anaesthetic lasts only 4–6 h. Adjuncts extend this by roughly 50–100% and are the main alternative to a catheter technique in day-case surgery.</p>
                  <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside space-y-1">
                    <li><strong className="text-foreground">Clonidine</strong> 1–2 µg/kg — α₂ agonist acting on dorsal-horn α₂ adrenoceptors (and by local vasoconstriction/spinal noradrenergic inhibition of substance P release); best-evidenced adjunct, extends analgesia by 2–4 h. Dose-dependent sedation, bradycardia and hypotension; avoid &gt;2 µg/kg and avoid in neonates and ex-preterm infants because of apnoea risk.</li>
                    <li><strong className="text-foreground">Dexmedetomidine</strong> 1 µg/kg — more selective α₂ agonist with similar or slightly longer prolongation and less hypotension than clonidine, plus a lower incidence of emergence agitation; still off-licence for neuraxial use.</li>
                    <li><strong className="text-foreground">Ketamine</strong> (preservative-free S-ketamine) 0.5 mg/kg — NMDA-receptor antagonism in the dorsal horn gives the longest prolongation of any adjunct, but preservative-containing preparations and animal neuro-apoptosis data have led most UK centres to abandon it.</li>
                    <li><strong className="text-foreground">Morphine</strong> (preservative-free) 30 µg/kg — µ-opioid action on dorsal-horn receptors gives 12–24 h analgesia, but its hydrophilicity permits rostral spread with <em>delayed</em> respiratory depression up to 12–24 h; also pruritus, nausea and urinary retention. Requires HDU-level respiratory monitoring and is therefore unsuitable for day cases.</li>
                    <li><strong className="text-foreground">Adrenaline</strong> 1:200,000 (5 µg/ml) — used chiefly as a marker of intravascular injection in the test dose; only modest prolongation of block.</li>
                    <li><strong className="text-foreground">Avoid</strong> midazolam, neostigmine and tramadol neuraxially — the evidence is weak, they are unlicensed by this route, and preservative-related neurotoxicity is a real concern.</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">General safety rules: use preservative-free preparations only, calculate the total local anaesthetic dose against the mg/kg maximum <em>before</em> adding volume, and document the adjunct and dose so ward staff know what monitoring is required.</p>
                </div>

              </div>
              <div className="p-4 rounded-lg border-l-4 border-destructive bg-destructive/5 mt-3">
                <p className="font-semibold text-foreground text-sm">Complications &amp; cautions</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Dural puncture (dura ends as low as S3–S4 in neonates), intravascular injection (always use a test dose with adrenaline 0.5 µg/kg — look for ↑HR, T-wave changes), intra-osseous injection, total spinal, urinary retention, transient motor block. Absolute contraindications: parental refusal, local infection, coagulopathy, raised ICP, spina bifida overlying the hiatus, sacral abnormalities (e.g. dimple, hairy patch).
                </p>
              </div>
            </DiagramSection>
          </ExamSection>

          <ExamSection id="fluids" exams={[Exam.FINAL]}>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fluid Management</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Maintenance fluids: 4-2-1 rule (Holliday-Segar). Use isotonic balanced solutions (Hartmann's/Plasmalyte). Avoid hypotonic solutions — risk of hyponatraemia.
              </p>
              <div className="p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">4-2-1 Rule:</strong> 4 ml/kg/hr for first 10 kg, 2 ml/kg/hr for next 10 kg, 1 ml/kg/hr for each kg thereafter.
                  <br /><strong className="text-foreground">Replacement:</strong> 10 ml/kg isotonic crystalloid boluses. Reassess after each bolus.
                  <br /><strong className="text-foreground">Blood:</strong> Maximum allowable blood loss = EBV × (Hct_start − Hct_min) / Hct_start. Neonatal EBV = 80 ml/kg.
                </p>
              </div>
            </div>
          </ExamSection>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Neonates are obligate nose-breathers, have a high O₂ consumption (~6 mL/kg/min), large head and short trachea — desaturate quickly.",
              "Fluid maintenance (Holliday-Segar): 4-2-1 mL/kg/h; resuscitation bolus 10–20 mL/kg isotonic crystalloid.",
              "Avoid hypotonic maintenance fluids in children — use 0.9% saline or balanced solution with 5% glucose where needed (NICE/APAGBI).",
              "ETT size: uncuffed = age/4 + 4; cuffed = age/4 + 3.5; length (oral) = age/2 + 12.",
              "Laryngospasm: 100% O₂, CPAP, deepen anaesthesia, Larson's manoeuvre, suxamethonium 1–2 mg/kg IV (or 4 mg/kg IM) if persistent.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Paediatric Anaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Concise, evidence-based answers to the questions trainees and candidates most often ask about paediatric airway anatomy, ETT sizing, emergency drug doses, laryngospasm management, TIVA and remi-mix, PRIS, pyloric stenosis, caudal blocks, and fluid management.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {paediatricFaqs.map(([q, a], i) => (
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
            <title>Paediatric Anaesthesia — ETT Sizing, TIVA, Caudal &amp; Fluids</title>
            <meta
              name="description"
              content="Paediatric anaesthesia explained for FRCA and FFICM: airway anatomy differences, ETT sizing and WETFLAG emergency drugs, laryngospasm management, remi-prop TIVA, propofol infusion syndrome, pyloric stenosis, caudal block and paediatric fluid management."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: paediatricFaqs.map(([name, acceptedAnswer]) => ({
                "@type": "Question",
                name,
                acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
              })),
            })}</script>
          </Helmet>
        </>
      }
    />
  );
};

export default PaediatricAnaesthesiaTopic;
