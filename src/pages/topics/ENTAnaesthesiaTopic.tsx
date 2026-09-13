import { Helmet } from "react-helmet-async";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { entAnaesthesiaQuestions } from "@/data/quizzes";
import LaryngectomyAirwayHandoverDiagram from "@/components/diagrams/clinical/LaryngectomyAirwayHandoverDiagram";
import LeFortFractureDiagram from "@/components/diagrams/clinical/LeFortFractureDiagram";
import LaserAirwayDiagram from "@/components/diagrams/clinical/LaserAirwayDiagram";
import JetVentilationDiagram from "@/components/diagrams/clinical/JetVentilationDiagram";
import JetVentilationCycleAnimation from "@/components/diagrams/clinical/JetVentilationCycleAnimation";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocItems = [
  { id: "shared-airway", label: "Shared airway", group: "Core" },
  { id: "tonsillectomy", label: "Tonsillectomy", group: "Core" },
  { id: "laser", label: "Microlaryngoscopy & laser surgery", group: "Core" },
  { id: "nasal", label: "Nasal surgery", group: "Specialty" },
  { id: "middle-ear", label: "Middle ear surgery", group: "Specialty" },
  { id: "paediatric-ent", label: "Other paediatric ENT", group: "Specialty" },
  { id: "stridor", label: "Airway obstruction & stridor", group: "Emergency" },
  { id: "tracheostomy", label: "Tracheostomy & laryngectomy", group: "Airway" },
  { id: "ionm", label: "Intra-operative nerve monitoring", group: "Monitoring" },
  { id: "thyroid-bleed", label: "Post-thyroidectomy bleeding", group: "Emergency" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const entFaqs: Array<[string, string]> = [
  [
    "What is the airway fire drill during laser laryngoscopy?",
    "If an airway fire occurs during laser surgery, the anaesthetist must simultaneously call out 'Airway fire', stop ventilation, disconnect the breathing circuit, and remove the endotracheal tube. The surgeon turns off the laser and removes any burning material. The field is flooded with saline. Once the fire is extinguished, the patient is ventilated with 100% oxygen via face mask, then re-intubated with a fresh laser-safe tube. Rigid bronchoscopy is performed to assess airway burns. The patient is admitted to ICU with humidified oxygen, dexamethasone for oedema, and a low threshold for tracheostomy if significant thermal injury is found. Prevention is paramount: keep FiO₂ ≤0.30 with air/oxygen mix, never use N₂O, use saline-soaked pledgets at the glottis, and ensure all staff have rehearsed the drill before starting.",
  ],
  [
    "How do you prevent an airway fire during laser laryngoscopy?",
    "Prevention relies on removing two sides of the fire triangle: oxidiser and fuel. Keep FiO₂ at or below 0.30 using an air/oxygen mix; never use N₂O, which supports combustion. Use a wavelength-matched laser-resistant tube (e.g., Mallinckrodt Laser-Flex for CO₂/KTP; Bivona Fome-Cuf for Nd:YAG). Inflate the cuff with saline tinted with methylene blue — a laser strike produces a visible blue leak and self-quenches. Place saline-soaked pledgets around the tube at the glottis. Wet drapes surround the face. All theatre staff wear wavelength-specific protective eyewear. A designated Laser Protection Supervisor controls access, and a verbal 'laser on / laser off' protocol is enforced.",
  ],
  [
    "What is the safest anaesthetic technique for microlaryngoscopy and laser airway surgery?",
    "Total intravenous anaesthesia (TIVA) with propofol and remifentanil is preferred because it avoids the combustion risk of volatile agents and provides a stable, bloodless surgical field. Neuromuscular blockade is used to prevent patient movement. For cases requiring an unobstructed glottic view, three ventilation strategies exist: (1) a small-bore microlaryngoscopy tube (MLT, 5.0–6.0 mm ID) with a laser-resistant wrap; (2) supraglottic or subglottic jet ventilation, which removes the tube from the field but introduces barotrauma risk; and (3) THRIVE (transnasal humidified rapid-insufflation ventilatory exchange) — tubeless apnoeic oxygenation with high-flow nasal cannulae at 70 L/min, suitable for short procedures in selected patients but incompatible with open laser ignition.",
  ],
  [
    "How is jet ventilation performed safely for laryngeal surgery?",
    "Jet ventilation delivers high-pressure oxygen pulses that entrain room air via the Venturi effect. Safety requires: a dedicated jet ventilator with an upper pressure-limit alarm; starting at 1 bar driving pressure and titrating to visible chest rise; an I:E ratio of at least 1:2 (low-frequency) or 1:3 (high-frequency) to allow complete exhalation and prevent breath stacking; auscultation of both sides between breath sets; and a rescue ETT pre-loaded. Stop immediately if the chest fails to fall between breaths, SpO₂ drops, or surgical emphysema appears. Gastric insufflation, mucosal drying, and pneumothorax are the main hazards. TIVA must be used because volatile cannot be delivered.",
  ],
  [
    "What is THRIVE and when is it used in ENT surgery?",
    "THRIVE (Transnasal Humidified Rapid-Insufflation Ventilatory Exchange) uses high-flow nasal oxygen at 70 L/min in adults to maintain oxygenation and partially clear CO₂ during apnoeic periods, giving the surgeon an unobstructed laryngeal view without an ETT or jet catheter. It combines classical apnoeic oxygenation with flow-dependent CO₂ clearance via turbulent supraglottic gas exchange. Safe apnoea times of 30 minutes with SpO₂ ≥90% are reproducible in elective adults with normal BMI. Contraindications include base-of-skull fracture, active epistaxis, bullous lung disease, raised ICP, pulmonary hypertension, full stomach, and any open laser ignition source. Hypercapnia is the time-limiter, not hypoxia.",
  ],
  [
    "How should post-tonsillectomy bleeding be managed?",
    "Post-tonsillectomy bleeding is an emergency occurring in 0.5–2% within 24 hours (primary) or 2–4% at 5–10 days (secondary). The patient is hypovolaemic with a full stomach of swallowed blood. Management: resuscitate first with large-bore IV access, fluids, and cross-matched blood before airway intervention. Perform a rapid sequence induction in left lateral head-down tilt with experienced surgical help scrubbed. Use a south-facing RAE tube. Have suction, a difficult airway trolley, and surgical airway equipment immediately available. Avoid codeine in children due to CYP2D6 ultra-rapid metabolism causing fatal respiratory depression. Post-op admission to a high-dependency area is mandatory.",
  ],
  [
    "What are the key principles of anaesthesia for middle ear surgery?",
    "Nitrous oxide must be avoided because it diffuses into the non-compliant middle ear cavity 34 times faster than nitrogen leaves, raising middle ear pressure and risking tympanic membrane graft displacement or ossicular reconstruction disruption. TIVA with propofol and remifentamil is preferred because it avoids N₂O and provides a bloodless surgical field via controlled hypotension. Facial nerve monitoring is commonly used, so maintenance neuromuscular blockade should be avoided after intubation — use a short-acting agent for intubation only and keep TOF monitoring. PONV incidence is very high due to vestibular stimulation; use aggressive multimodal prophylaxis with dexamethasone, ondansetron, and TIVA rather than volatile.",
  ],
  [
    "How do you manage a patient with post-thyroidectomy neck haematoma?",
    "Post-thyroidectomy haematoma occurs in 1–2%, most often within 6 hours. It is a time-critical airway emergency because expanding blood under the strap muscles obstructs venous and lymphatic return, producing laryngeal oedema that persists even after clot evacuation. Use the SCOOP sequence: (S) Sit the patient upright, 100% oxygen, call senior help; (C) Cut sutures and open the wound at the bedside to evacuate clot manually — do not wait for the surgeon; (O) Oxygenate and give nebulised adrenaline 1 mg and IV dexamethasone 8 mg as a bridge; (O) Transfer to theatre immediately; (P) Plan the airway — anticipate a difficult intubation due to oedema and distorted anatomy. Awake fibreoptic intubation is safest if time permits; otherwise use an inhalational induction in the sitting position maintaining spontaneous ventilation. Avoid supine RSI with paralysis.",
  ],
  [
    "What nerve monitoring is used in thyroid and parotid surgery, and how does it affect anaesthesia?",
    "The recurrent laryngeal nerve (RLN) is monitored in thyroid and parathyroid surgery using an EMG endotracheal tube with surface electrodes at the level of the vocal cords. A single intubating dose of suxamethonium or low-dose rocuronium (0.3 mg/kg) is used, with sugammadex reversal before nerve dissection if needed. Maintenance non-depolarising neuromuscular blockade must be avoided because it abolishes the evoked EMG response. The facial nerve (CN VII) is monitored in parotid and middle ear surgery using needle electrodes in orbicularis oculi and orbicularis oris; again, relaxant-free maintenance is required. Quantitative neuromuscular monitoring (acceleromyography) is mandatory whenever intra-operative nerve monitoring is in use.",
  ],
  [
    "What are the considerations for tracheostomy and laryngectomy airway management?",
    "For surgical tracheostomy under general anaesthesia, the existing endotracheal tube is withdrawn under direct vision to just above the stoma before tracheostomy tube insertion, with FiO₂ 1.0 throughout. At total laryngectomy, the surgeon places an armoured cuffed tube into the divided distal trachea; the anaesthetist connects a sterile circuit and confirms bilateral ventilation and ETCO₂ before removing the oral tube. Post-laryngectomy, the patient is a permanent neck-breather — there is no connection between mouth/nose and trachea, so bag-mask ventilation via the face will not work. Emergency ventilation must be via the stoma. The National Tracheostomy Safety Project (NTSP) red emergency board and colour-coded bedhead signs are mandatory. For percutaneous dilatational tracheostomy (PDT) in ICU, bronchoscopic guidance reduces paratracheal misplacement risk.",
  ],
];

const ENTAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="ENT & Maxillofacial Anaesthesia"
      subtitle="FRCA Final — Clinical"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="ent-anaesthesia"
      quizQuestions={entAnaesthesiaQuestions}
      objectives={[
        "Plan airway management for shared-airway and laser surgery including fire prevention.",
        "Manage post-tonsillectomy bleeding emergencies in children.",
        "Recognise stridor severity and apply DAS guidelines for the difficult airway.",
        "Perform safe stomal handover at total laryngectomy and recognise the neck-breather.",
        "Anaesthetise for Le Fort facial trauma with secured airway and CSF leak risk.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["EN_BK_03"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["BJA Educ ENT 2017", "DAS 2015"],
        workedExamples: ["DAS 2015", "BJA Educ Laser 2015", "NAP4 2011"],
        keyPoints: ["DAS 2015", "NTSP 2014", "BJA Educ Laser 2015", "BJA Educ ENT 2017", "NAP4 2011"],
      }}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />

          <div id="shared-airway" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <CollapsibleSubsection title="Shared Airway" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              ENT and maxillofacial anaesthesia is defined by sharing the airway with the surgeon. Success depends on clear communication, deliberate tube and ventilation choices, and a pre-agreed plan for managing intra-operative airway loss — particularly during laryngeal, tonsillar, and post-tracheostomy procedures.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Core challenge</strong>: surgeon and anaesthetist share the airway. Communication, planning, and a robust difficult airway strategy are essential</li>
              <li><strong>Tube options</strong>: south-facing RAE (oral), north-facing RAE (nasal), reinforced/flexometallic, microlaryngoscopy tubes (5.0–6.0 mm ID)</li>
              <li><strong>Nasal intubation</strong>: often required for oral/dental/maxillofacial surgery. Risks: epistaxis (use vasoconstrictor preparation), adenoid damage, submucosal passage. Contraindicated in base-of-skull fracture, severe coagulopathy</li>
              <li><strong>Throat pack</strong>: prevents blood/debris entering larynx/stomach. Must be documented (insertion/removal) — retained pack is a never event</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="tonsillectomy" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <CollapsibleSubsection title="Tonsillectomy">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Population</strong>: predominantly children. Commonly associated with OSA — assess severity (sleep study, history of desaturations)</li>
              <li><strong>Anaesthetic</strong>: south-facing RAE, spontaneous or controlled ventilation. TIVA avoids volatile in OSA children (↑ sensitivity to respiratory depression)</li>
              <li><strong>Analgesia</strong>: paracetamol, NSAIDs (ibuprofen — no longer contraindicated per Cochrane evidence), dexamethasone (↓ PONV, ↓ oedema). Avoid codeine in children (FDA black box — CYP2D6 ultra-rapid metabolisers → fatal respiratory depression)</li>
            </ul>
            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Post-tonsillectomy bleeding — detailed management</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Incidence and risk factors</strong>: primary (&lt;24 h, 0.5–2%) usually reflects inadequate surgical haemostasis and hot (diathermy/coblation) dissection; secondary (5–10 days, 2–4%) follows slough separation and local infection. Other risk factors are older child/adult, tonsillitis as the indication, quinsy, undiagnosed coagulopathy or von Willebrand disease, and NSAID use is <em>not</em> a significant contributor<InlineRef topicId="ent-anaesthesia" refLabel="Ravi 2007 Paed ENT" /></li>
              <li><strong>Assessing severity</strong>: swallowed blood hides losses — look for repeated swallowing, haematemesis, pallor, cool peripheries, capillary refill &gt;2 s, tachycardia, narrow pulse pressure, postural hypotension, reduced urine output and agitation. In children, hypotension is a very late sign; tachycardia and prolonged capillary refill come first. Check FBC, coagulation, group and crossmatch</li>
              <li><strong>Resuscitation targets before induction</strong>: two large-bore cannulae (or intraosseous if access fails), 10–20 mL/kg warmed balanced crystalloid boluses, then blood (10 mL/kg) if still tachycardic; aim to normalise heart rate and capillary refill, restore age-appropriate blood pressure, and have crossmatched blood in theatre. Empty the stomach with a wide-bore orogastric tube only once the airway is secured</li>
              <li><strong>Induction agents</strong>: ketamine 1–2 mg/kg preserves sympathetic tone and is the agent of choice in the shocked child; a reduced dose of thiopentone or propofol (25–50% of normal) is acceptable in the resuscitated patient but risks profound hypotension. Rocuronium 1 mg/kg or suxamethonium 1.5 mg/kg gives rapid, reliable relaxation; have vasopressor drawn up</li>
              <li><strong>Airway management</strong>: two working suckers, a range of tube sizes, videolaryngoscope, and the experienced surgeon scrubbed. Classic options are RSI with cricoid pressure in the supine position, or induction in the head-down left lateral 'tonsil position' when bleeding is torrential so blood drains away from the larynx. Anticipate a soiled view and be ready for a bougie or a smaller tube</li>
              <li><strong>Paediatric specifics</strong>: relatively large blood volume loss for the body weight (circulating volume 70–80 mL/kg), rapid desaturation, frightened and uncooperative child, and a second anaesthetic within days — involve senior help early, warm the child, use weight-based drug and fluid doses, and extubate awake in the lateral position with full suction. Consider PICU/HDU observation after significant transfusion<InlineRef topicId="ent-anaesthesia" refLabel="Ravi 2007 Paed ENT" /></li>
              <li><strong>After haemostasis</strong>: repeat FBC and coagulation, exclude an inherited bleeding disorder if bleeding recurs, continue analgesia and antibiotics for secondary bleeds, and document estimated losses and transfusion</li>
            </ul>

            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="laser" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <CollapsibleSubsection title="Microlaryngoscopy & Laser Surgery">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Laser airway work is the highest-risk shared-airway scenario in anaesthesia: the surgeon's energy source sits millimetres from the ETT, the cuff and the patient's eyes, and the gas mixture flowing through the tube is itself a potential oxidiser. Safety relies on three parallel disciplines — a <strong>laser-resistant tube</strong> matched to the wavelength in use, an <strong>oxygen strategy</strong> that denies the fire its oxidiser, and <strong>ocular protection</strong> for both patient and theatre team.
            </p>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Laser physics in the airway</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>CO₂ laser (10 600 nm)</strong> — workhorse for laryngeal lesions; absorbed by water in surface tissue, so injury is shallow but precise. Reflects off polished metal — the principle exploited by stainless-steel ETT wraps.</li>
              <li><strong>Nd:YAG (1064 nm)</strong> — deep tissue penetration (3–5 mm), used for tracheobronchial debulking. Invisible near-IR — particularly dangerous to the unprotected retina.</li>
              <li><strong>KTP / Argon (532 / 488–514 nm)</strong> — selectively absorbed by haemoglobin (vascular lesions, papillomata). Visible green/blue, but bright reflections still cause photochemical retinal injury.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Tube selection</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Microlaryngoscopy tube (MLT)</strong>: small ID (5.0–6.0 mm) to maximise surgical view. Increased airway resistance — monitor closely. Standard PVC MLTs are <em>not</em> laser-safe.</li>
              <li><strong>Mallinckrodt Laser-Flex</strong>: corrugated stainless-steel shaft with twin distal saline-filled cuffs. Approved for CO₂ and KTP only.</li>
              <li><strong>Bivona Fome-Cuf (laser variant)</strong>: aluminium-foil-wrapped silicone with a self-inflating foam cuff vented to atmosphere. The only widely available tube approved for both CO₂ and Nd:YAG.</li>
              <li><strong>Sheridan Laser-Trach</strong>: copper-foil-wrapped red rubber inside a saline-soakable Merocel sponge envelope. Twin methylene-blue saline cuffs.</li>
              <li><strong>Jet ventilation</strong>: supraglottic (Sanders injector) or subglottic/transtracheal — eliminates the tube from the surgical field altogether but introduces barotrauma, air trapping, gastric insufflation and pneumothorax risk.</li>
              <li><strong>Cuff inflation</strong>: saline + methylene blue dye (see below). A laser strike causes a visible blue leak, simultaneously alerting the surgeon and self-quenching the burn.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Jet ventilation — set-up & safety</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When the surgeon needs an unobstructed view of the glottis, jet ventilation lets the anaesthetist remove the ETT from the surgical field altogether. All forms work the same way: a small bore cannula or catheter delivers a pulse of high-pressure O₂ that entrains room air (Venturi effect) and inflates the lungs, with passive elastic recoil providing exhalation. The price of that small cross-section is the loss of two safety nets — a sealed cuff and a defined expiratory pathway — so technique discipline is everything.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Modalities</strong>: <em>supraglottic</em> (Sanders injector through the operating laryngoscope, low-frequency 10–20 min⁻¹); <em>subglottic</em> (Hunsaker or laser-jet catheter sited below the cords with distal pressure & CO₂ monitoring, high-frequency 100–150 min⁻¹, HFJV); <em>transtracheal</em> (14 G cannula through the cricothyroid membrane in CICO — bridge to a definitive airway).</li>
              <li><strong>Set-up checklist</strong>: dedicated jet ventilator with <strong>upper pressure-limit alarm</strong>; pressure regulator on the wall O₂ outlet (start at 1 bar, titrate up); pre-jet shared briefing of "rate / pressure / I:E / who calls stop"; TIVA running (no scavenging in the open airway); SpO₂, ECG and capnography (where the catheter allows distal sampling); stethoscope on the chest for every set; rescue ETT pre-loaded.</li>
              <li><strong>Driving pressure & rate</strong>: lowest pressure that produces visible chest rise (typically 1–3 bar adult, 0.5–1 bar paediatric). Rate slow enough to allow full exhalation — I:E ≥ 1:2 for low-frequency, ≥ 1:3 for HFJV. The longer the inspiratory time and the higher the rate, the greater the risk of breath stacking.</li>
              <li><strong>Minimising barotrauma & pneumothorax</strong>: <em>verify</em> the expiratory pathway is patent <em>before</em> every series of jet breaths — chest must fall fully between insufflations. Auto-PEEP develops silently in obstructive lung disease, fixed glottic stenoses, foreign bodies and intratracheal lesions; if expiration is incomplete, stop, allow passive exhalation, lower the rate and reduce the driving pressure. Use a jet ventilator that interlocks on overpressure rather than a manual Sanders for prolonged work. Auscultate both sides between sets — a unilateral pneumothorax presents as silent ipsilateral chest with hypoxia and rising peak inspiratory pressures, and tensions within minutes if jetting continues.</li>
              <li><strong>Other hazards & how to mitigate</strong>: <em>gastric insufflation</em> (mis-aimed supraglottic jet) — confirm jet axis, use a subglottic catheter when in doubt; <em>mucosal drying / cold-gas tracheitis</em> — humidify when feasible, limit total jet time; <em>aspiration</em> — anti-sialogogue and gentle suction, no positive-pressure mask seal during apnoeic intervals; <em>haemodynamic instability</em> — high intrathoracic pressure during stacking reduces venous return and causes hypotension that resolves within seconds of stopping the jet; <em>awareness</em> — TIVA depth must be maintained, no volatile delivery is possible.</li>
              <li><strong>Stop the jet immediately if</strong>: chest fails to fall between breaths, peak airway pressure rises, SpO₂ drops, surgical emphysema appears in the neck, or the patient becomes unstable. Disconnect, allow passive exhalation, decompress any suspected pneumothorax (needle thoracocentesis → chest drain), and convert to an ETT.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">High-flow nasal oxygen (HFNO / THRIVE) for tubeless airway surgery</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              High-flow nasal oxygen — used in this context as <strong>THRIVE</strong> (Transnasal Humidified Rapid-Insufflation Ventilatory Exchange, Patel & Nouraei, <em>Anaesthesia</em> 2015) — gives the surgeon a completely empty laryngotracheal field while the patient receives 100% O₂ through nasal prongs alone. It exploits two mechanisms: classical <em>apnoeic oxygenation</em> (mass flow of O₂ down a falling alveolar gas concentration gradient, ~250 mL · min⁻¹) and a <strong>flow-dependent CO₂ clearance</strong> created by turbulent supraglottic gas exchange that slows the rise of PaCO₂ to roughly 0.15 kPa · min⁻¹ — about a third of the rate seen with conventional apnoea.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Why it suits ENT/airway surgery</strong>: no ETT, no jet catheter, no insufflating gas in the surgical field — ideal for microlaryngoscopy, vocal-cord lesion excision, suspension laryngoscopy, paediatric airway endoscopy, papillomatosis debulking and stent insertion. The surgeon has an unobstructed 360° view of the glottis.</li>
              <li><strong>Set-up</strong>: dedicated high-flow generator (Optiflow / AIRVO / equivalent) with active humidification (37 °C, ~44 mg H₂O · L⁻¹) and the largest tolerated nasal cannulae. Pre-oxygenation 100% FiO₂ at 30–40 L · min⁻¹ for ≥ 3 min (or until end-tidal O₂ &gt; 0.85 if the patient is still breathing). Once apnoeic, increase to <strong>70 L · min⁻¹</strong> (adult) — children scaled to age (typically 2 L · kg⁻¹ · min⁻¹ up to age-specific maxima).</li>
              <li><strong>Airway position during apnoea</strong>: <em>jaw thrust + mouth closed</em> creates a near-CPAP supraglottic reservoir; if the surgeon is operating, the suspension laryngoscope itself maintains a patent column. The cords should be open or paralysed — closed cords (laryngospasm, residual tone) abolish the CO₂-clearance benefit and make this a pure apnoeic-oxygenation technique only.</li>
              <li><strong>Expected apnoea times</strong>: in elective adults with normal BMI, <strong>safe apnoea of 30 min</strong> with SpO₂ ≥ 90% is reproducible (Patel & Nouraei median 14 min, max 65 min). Obstetric, obese (BMI &gt; 35), high O₂-consumption, severe lung disease and difficult-airway patients <em>desaturate sooner</em> — assume conventional pre-oxygenation/apnoea-time limits in those groups.</li>
              <li><strong>Hypercapnia is the time-limiter, not hypoxia</strong>: PaCO₂ climbs ~0.15 kPa · min⁻¹ (≈ 1.1 mmHg · min⁻¹). Plan total apnoea time so end-procedure PaCO₂/pH stay safe — discuss the upper limit you will accept (commonly PaCO₂ ≤ 12–15 kPa, pH ≥ 7.15) before starting, and check an ABG if approaching the threshold or in any patient with raised ICP, severe pulmonary hypertension or arrhythmogenic cardiac disease.</li>
              <li><strong>Anaesthetic technique</strong>: TIVA (propofol + remifentanil) with neuromuscular blockade — volatile cannot be delivered. Maintain depth with processed-EEG monitoring (no capnography during apnoea). Continuous SpO₂, ECG, invasive or non-invasive BP, and a clock visible to the team marking elapsed apnoea time.</li>
              <li><strong>Safety / contraindications</strong>: base-of-skull fracture, recent transsphenoidal surgery, active epistaxis or severe nasal obstruction (risk of pneumocephalus / barotrauma); bullous lung disease; severely raised ICP; pulmonary hypertension intolerant of hypercapnia; full stomach without secured airway (no airway protection from aspiration). Avoid in the presence of <strong>any open ignition source in the airway</strong> — 100% O₂ + laser is a fire risk identical to that with a non-laser-safe ETT, so HFNO is generally <em>incompatible with laser surgery</em> unless the laser is paused, FiO₂ reduced and the field flooded.</li>
              <li><strong>Rescue plan</strong>: a guaranteed exit strategy is mandatory because there is no tube. Surgeon scrubbed and ready, suspension laryngoscope in situ, fibreoptic scope and cricothyroidotomy kit immediately available. If SpO₂ falls or surgery is paused, return to mask ventilation, insert an LMA, or intubate via the surgeon's view; abandon the tubeless plan early if conditions deteriorate.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Eye protection — patient and staff</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Why the patient is at greatest risk</strong>: an anaesthetised patient cannot blink, avert their gaze or report pain. The eyes lie in the direct line of fire of any reflected beam from instruments, retractors or wet mucosa, and the protective blink reflex (~200 ms) is abolished. Lids must be <strong>taped closed</strong>, lubricated, covered with <strong>saline-soaked gauze</strong>, and overlaid with a <strong>wet-cloth-wrapped metal eye shield</strong>. The face is then draped with damp surgical drapes that absorb stray photons before they reach skin or eye.</li>
              <li><strong>Why staff are at risk</strong>: invisible CO₂ and Nd:YAG beams give no visual cue; a single stray reflection from a polished instrument can deliver focal retinal energy faster than the blink reflex can react. KTP/Argon beams are visible but the resulting glare itself is disabling.</li>
              <li><strong>Wavelength-specific eyewear</strong>: protective filters are matched to the laser in use and are <em>not</em> interchangeable. CO₂ → clear polycarbonate/glass safety spectacles with side shields (OD ≥ 5 @ 10 600 nm — ordinary glass blocks CO₂). Nd:YAG → green/blue-green tinted goggles (OD ≥ 5 @ 1064 nm). KTP → orange/amber wavelength-specific goggles (OD ≥ 4 @ 532 nm). CO₂ glasses give <em>zero</em> protection from Nd:YAG.</li>
              <li><strong>Theatre controls</strong>: designated Laser Protection Supervisor, door warning signage, windows covered, matt-finish instruments where possible, key-switch interlock, and verbal "laser on / laser off" call-outs by the surgeon.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Fire prevention & airway-fire drill</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Prevention (the fire triangle)</strong>: ignition (laser) is unavoidable, so eliminate fuel and oxidiser. FiO₂ ≤ 0.30 with air/O₂ mix, <strong>never N₂O</strong> (supports combustion); saline-soaked pledgets at the glottis; saline syringe primed on the airway trolley; wet drapes around the face; surgeon and anaesthetist agree the laser-fire drill before draping.</li>
              <li><strong>If a fire occurs</strong>: call out "Airway fire" → <strong>stop ventilation, disconnect circuit, remove the tube</strong> simultaneously → flood the field with saline → surgeon turns the laser off and removes any burning material → mask-ventilate with 100% O₂ once the fire is out → re-intubate with a fresh laser-safe tube → <strong>rigid bronchoscopy</strong> to assess airway burns → ICU admission, humidified O₂, dexamethasone, low threshold for tracheostomy.</li>
            </ul>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <LaserAirwayDiagram />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <JetVentilationDiagram />
              </div>
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <JetVentilationCycleAnimation />
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="nasal" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Nasal Surgery">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Pre-operative assessment</strong>: nasal obstruction frequently coexists with <strong>OSA</strong> (screen with STOP-BANG; plan opioid-sparing analgesia and post-operative monitoring) and with <strong>asthma</strong> in aspirin-exacerbated respiratory disease (Samter&apos;s triad: nasal polyposis, asthma, NSAID sensitivity) — avoid NSAIDs in that group. Check antiplatelet/anticoagulant use, and ask about cocaine or decongestant abuse before giving further sympathomimetics<InlineRef topicId="ent-anaesthesia" refLabel="BJA Educ ENT 2017" /></li>
              <li><strong>Septoplasty/rhinoplasty/FESS</strong>: oral RAE or reinforced tube (or a flexible LMA for short septal work in selected patients), throat pack documented on the WHO checklist and on a visible label, eyes taped, and 10–15° head-up. Topical vasoconstrictors (xylometazoline, cocaine 5–10%) + infiltration with adrenaline</li>
              <li><strong>Topical preparations</strong>: <strong>Moffett&apos;s solution</strong> is the classic mixture — 2 mL cocaine 8% (or 5–10%), 1 mL adrenaline 1:1000 and 2 mL sodium bicarbonate 8.4%, made up to about 10 mL with saline and instilled with the head positioned to reach the sphenoethmoidal recess. Alternatives are cocaine paste on ribbon gauze, or a cocaine-free combination of lidocaine 5% with phenylephrine or xylometazoline</li>
              <li><strong>Cocaine</strong>: max dose 1.5 mg/kg topically. Sympathomimetic — inhibits noradrenaline reuptake → ↑ HR, ↑ BP, coronary vasospasm and arrhythmias. Avoid with halothane, avoid in pre-eclampsia and uncontrolled hypertension, and use with great caution alongside other vasopressors or in patients on MAOIs/tricyclics</li>
              <li><strong>Adrenaline limits</strong>: keep infiltrated adrenaline to roughly <strong>200 µg (20 mL of 1:100 000) in any 20-minute period</strong> in a normotensive adult on volatile anaesthesia; expect transient hypertension and dysrhythmia after injection and treat with deepening anaesthesia rather than reflex beta-blockade</li>
              <li><strong>Controlled hypotension</strong>: reduces bleeding and improves the endoscopic view. Combine 15° head-up tilt, remifentanil TCI (0.1–0.25 µg/kg/min) or a bolus-sparing infusion, propofol TIVA, and a short-acting beta-blocker (esmolol, labetalol) or clonidine if tachycardic. Target MAP 55–65 mmHg (or no more than 20–25% below baseline) only in fit patients with normal cerebral and renal reserve; avoid in the elderly, cerebrovascular disease, uncontrolled hypertension or renal impairment</li>
              <li><strong>Emergence and PONV</strong>: high PONV incidence from swallowed blood — multimodal prophylaxis (ondansetron + dexamethasone ± cyclizine), suction the pharynx and confirm pack removal, and extubate smoothly in the head-up or lateral position. Warn about post-nasal drip; recurrent bleeding after splints or FESS may need re-exploration, and re-bleeding presents as a full stomach with a compromised nasal airway</li>

            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="middle-ear" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Middle Ear Surgery">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Tympanoplasty, myringoplasty, ossiculoplasty, stapedectomy and mastoid surgery share four anaesthetic goals: a bloodless microscopic field, an immobile patient, preserved facial nerve responses, and a smooth emergence with aggressive PONV prophylaxis<InlineRef topicId="ent-anaesthesia" refLabel="Liang 2010 Middle Ear" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>N₂O — why it is contraindicated</strong>: nitrous oxide is 34× more soluble than nitrogen, so it diffuses into the closed middle-ear cavity faster than nitrogen leaves. Pressure rises within minutes (up to 20–40 cmH₂O when the Eustachian tube is blocked), displacing a tympanic membrane graft or a newly positioned ossicular prosthesis; on discontinuation the reverse gradient produces negative pressure, serous effusion and PONV. Omit it entirely for grafting procedures, or stop at least 15–30 minutes before graft placement</li>
              <li><strong>Bloodless field</strong>: 10–15° head-up tilt to improve venous drainage, mild controlled hypotension (MAP 60–70 mmHg in fit patients) with a remifentanil-based TIVA technique, normocapnia (hypercapnia causes vasodilatation and oozing), infiltration with local anaesthetic plus adrenaline, avoidance of coughing and straining, and smooth ventilation without high airway pressures</li>
              <li><strong>Facial nerve monitoring</strong>: commonly used in mastoid, stapes and cholesteatoma surgery — avoid maintenance neuromuscular blockade, use a short-acting relaxant for intubation only (or intubate under propofol/remifentanil), and confirm recovery with quantitative TOF before the surgeon stimulates</li>
              <li><strong>Emergence</strong>: coughing, bucking and Valsalva can displace a graft — deep extubation or LMA removal, IV lidocaine 1–1.5 mg/kg, gentle suction under adequate depth, and instructions to avoid nose-blowing postoperatively</li>
              <li><strong>PONV</strong>: incidence up to 60–80% because of vestibular stimulation — combine dexamethasone, ondansetron and cyclizine (an antihistamine covers the vestibular component), use propofol TIVA, avoid N₂O, keep the patient well hydrated and provide opioid-sparing analgesia</li>
              <li><strong>Absolute immobility and ventilation mode</strong>: microscopic graft placement and stapes work require a completely still patient. Either controlled ventilation with deep neuromuscular blockade (acceptable only when facial nerve monitoring is not being used, or before the surgeon starts stimulating) or a remifentanil-based technique with spontaneous or pressure-support ventilation, which preserves nerve responses but risks movement if too light. Controlled ventilation with normocapnia is generally preferred because it stabilises the field; keep peak airway pressures low so venous congestion does not obscure the view</li>
              <li><strong>Post-operative course</strong>: beyond PONV expect <strong>vertigo</strong> (labyrinthine stimulation, especially after stapedectomy or mastoid surgery) — prescribe cyclizine or prochlorperazine, mobilise cautiously and warn about falls. Pain is usually mild-to-moderate: paracetamol plus NSAID with a great-auricular or local infiltration block is generally sufficient; escalating pain or a facial nerve deficit needs urgent surgical review</li>
              <li><strong>Other practicalities</strong>: microscope means limited access with the head turned and taped; secure the tube on the non-operative side, protect the eyes, and use a reinforced or oral RAE tube. Position the head carefully — excessive rotation risks cervical strain and venous obstruction</li>

            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="paediatric-ent" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <CollapsibleSubsection title="Other Paediatric ENT Procedures">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Children make up most ENT lists. Beyond tonsillectomy, the recurring themes are a shared airway, very short procedures, rapid desaturation and a low threshold for senior help<InlineRef topicId="ent-anaesthesia" refLabel="Ravi 2007 Paed ENT" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Adenoidectomy</strong>: usually an LMA (flexible/reinforced) or south-facing RAE with a throat pack; risks are bleeding into the nasopharynx, pack dislodgement or retention (always document insertion and removal), and laryngospasm on emergence from blood at the cords. Extubate/remove the LMA awake in the lateral head-down position and observe for at least 4 h; children with severe OSA need overnight monitoring</li>
              <li><strong>Myringotomy and grommets</strong>: very short (5–10 minutes) day-case procedure — inhalational or IV induction, LMA with spontaneous ventilation on a volatile agent, and paracetamol plus ibuprofen given early. No neuromuscular blockade needed. Avoid N₂O when a graft or tympanoplasty is performed; brief exposure for simple grommet insertion is generally accepted but many avoid it routinely</li>
              <li><strong>Laryngoscopy and bronchoscopy (diagnostic)</strong>: discuss the airway plan with the surgeon first. Options are spontaneous ventilation on sevoflurane or propofol/remifentanil TIVA with topical lidocaine (max 3 mg/kg) to the larynx, intermittent apnoea with reoxygenation between passes, apnoeic oxygenation/high-flow nasal oxygen, or jet ventilation via the rigid scope. Keep the child deep to avoid laryngospasm and monitor CO₂ and saturation continuously</li>
              <li><strong>Inhaled foreign body</strong>: a genuinely high-risk case — complete obstruction can occur on instrumentation or if a ball-valve object moves. Keep the child calm and upright, avoid instrumentation outside theatre, use inhalational induction with maintained spontaneous ventilation, have an experienced ENT surgeon with a rigid bronchoscope and a range of optical forceps immediately available, and be prepared to push a distal obstruction back into a main bronchus to restore ventilation. Steroids and nebulised adrenaline for post-procedure oedema; observe for pneumothorax and post-obstructive pulmonary oedema</li>
              <li><strong>General paediatric points</strong>: weight-based dosing, temperature management, avoid codeine, prescribe regular paracetamol and NSAID, involve parents in induction and recovery, and use age-appropriate fasting (6 h food, 1 h clear fluids)</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>


          <div id="stridor" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <CollapsibleSubsection title="Airway Obstruction & Stridor">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Causes</strong>: epiglottitis, croup, foreign body, tumour (laryngeal/pharyngeal), Ludwig's angina, post-operative haematoma (thyroid/neck surgery), anaphylaxis, burns</li>
              <li><strong>Assessment</strong>: severity — stridor at rest is severe (&gt;50% obstruction). Inspiratory stridor = supraglottic; biphasic = glottic/subglottic; expiratory = intrathoracic</li>
              <li><strong>Never</strong> send an obstructing airway to a remote location, sedate the patient, or lie them flat for imaging without an airway plan in place</li>
            </ul>
            <h4 className="text-base font-semibold text-foreground mt-5 mb-2">A structured approach to acute upper airway obstruction</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">1. Immediate assessment and stabilisation</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Call for help early and by name: senior anaesthetist, <strong>ENT surgeon in the room</strong>, and skilled assistance with the difficult-airway trolley. Sit the patient up, keep them calm (agitation and crying worsen turbulent flow, particularly in children), and give high-flow humidified oxygen. Assess ABCDE while a second person takes a rapid history: onset and rate of progression, voice change, drooling, dysphagia, fever, trauma, previous surgery or radiotherapy, and any prior difficult intubation. Look for the danger signs — stridor at rest (&gt; 50% narrowing), accessory muscle use and tracheal tug, inability to swallow saliva, inability to lie flat, exhaustion and a falling respiratory rate, and rising CO₂ with a falling conscious level. Move to a theatre with an ENT surgeon rather than to a scanner. Nasendoscopy in the sitting position, and a CT only if the patient is stable enough.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">2. Medical management to buy time</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc pl-4">
                  <li><strong>Nebulised adrenaline</strong> 5 mL of 1:1000 (5 mg), repeatable — mucosal vasoconstriction reduces oedema within minutes but wears off in 1–2 hours, so it is a bridge, not a treatment. Watch for rebound.</li>
                  <li><strong>Dexamethasone</strong> 8 mg IV (0.15 mg/kg in children) for oedema of any cause; onset takes hours, so give it early and do not rely on it acutely.</li>
                  <li><strong>Heliox 70:30 helium:oxygen</strong> — helium&apos;s low density lowers the Reynolds number, converting turbulent flow back towards laminar flow and reducing the work of breathing across a fixed narrowing. The trade-off is a maximum FiO₂ of 0.3, so it is useless in the hypoxaemic patient and is a temporising measure while definitive plans are made.</li>
                  <li><strong>Cause-specific therapy</strong>: intramuscular adrenaline and the anaphylaxis algorithm; antibiotics for epiglottitis, Ludwig&apos;s angina and abscess; immediate release of a post-thyroidectomy haematoma at the bedside; steroids and radiotherapy referral for tumour; magnet/foreign-body removal in theatre.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">3. Airway intervention strategy</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc pl-4">
                  <li><strong>Prepare fully first</strong>: difficult-airway trolley, videolaryngoscope, range of small (5.0–6.0 mm) and microlaryngeal tubes, rigid and flexible scopes, bougies, FONA set opened, ENT surgeon scrubbed with a tracheostomy set, and a verbalised plan A–D that every team member has heard.</li>
                  <li><strong>Inhalational induction</strong> with sevoflurane in 100% oxygen, maintaining spontaneous ventilation, in the sitting or semi-recumbent position — the classical choice for paediatric epiglottitis or croup and for supraglottic obstruction. Strengths: preserved airway tone and the option to lighten if things deteriorate. Weaknesses: slow and unpredictable induction with a narrowed airway, risk of laryngospasm and of complete obstruction at a light plane, and the practical difficulty of a struggling child or adult.</li>
                  <li><strong>Intravenous induction / RSI</strong>: appropriate where obstruction is below the larynx or the anatomy is known and the airway is likely to be intubatable, or in bleeding trauma. Strengths: fast and controlled. Weakness: loss of muscle tone and spontaneous ventilation can turn partial obstruction into complete obstruction with no rescue — so only choose it with a surgeon ready for immediate front-of-neck access.</li>
                  <li><strong>Awake fibreoptic or awake videolaryngoscopic intubation</strong>: the technique of choice where obstruction is at or above the glottis and the patient can co-operate — topicalisation with lidocaine (total ≤ 9 mg/kg), remifentanil-only sedation, high-flow nasal oxygen, patient sitting up. Beware the &quot;cork in a bottle&quot; effect in a critically narrow airway, and complete failure of topicalisation with blood or pus.</li>
                  <li><strong>Awake tracheostomy under local anaesthesia</strong>: the safest primary plan when obstruction is severe, the anatomy is grossly distorted, or a tumour makes intubation implausible. Choosing it early is a mark of good judgement, not failure.</li>
                  <li><strong>CICO plan</strong>: if intubation and oxygenation both fail, declare CICO, deliver a final attempt at oxygenation while the FONA set is opened, and proceed immediately to <strong>scalpel–bougie–tube cricothyroidotomy</strong> (size 6.0 cuffed tube) or surgical tracheostomy by the ENT surgeon. In subglottic or tracheal tumour, cricothyroidotomy may be below or through the lesion — rigid bronchoscopy or ECMO-supported airway intervention should be considered in advance for such patients.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">4. After the airway is secured</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Confirm with waveform capnography, secure the tube meticulously and document its size, depth and the technique used. Treat the cause, continue steroids and antibiotics, admit to critical care, and plan extubation as a separate deliberate event — cuff-leak assessment, airway re-examination, difficult-airway team and surgeon present, and a re-intubation plan. Issue an airway alert.
                </p>
              </div>
            </div>


            <h4 className="text-base font-semibold text-foreground mt-5 mb-2">Ludwig&apos;s angina</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              A rapidly spreading polymicrobial cellulitis of the submandibular, sublingual and submental spaces, usually from a lower molar dental infection. Anaerobes and streptococci predominate. Induration of the floor of the mouth elevates and retrodisplaces the tongue, so obstruction develops above the larynx and can progress over a few hours<InlineRef topicId="ent-anaesthesia" refLabel="NAP4 2011" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Clinical features</strong>: brawny, tender, non-fluctuant bilateral neck swelling; raised oedematous floor of mouth; trismus; dysphonia (&quot;hot potato&quot; voice); drooling and inability to swallow saliva; the patient sits forward and will not lie flat. Fever and sepsis are common, with mediastinitis and necrotising fasciitis the feared complications</li>
              <li><strong>Why standard induction is dangerous</strong>: trismus and tongue displacement make laryngoscopy and face-mask ventilation unreliable, the sniffing position is often impossible and unsafe, and supraglottic devices seat poorly. Loss of tone after IV induction and paralysis can convert partial to complete obstruction with no rescue route — a recurring &quot;can&apos;t intubate, can&apos;t oxygenate&quot; pattern in NAP4</li>
              <li><strong>Airway plan of choice</strong>: <strong>awake fibreoptic intubation</strong>, usually nasal. Prepare with an antisialagogue (glycopyrronium 200–400 µg), nasal vasoconstrictor, careful topicalisation (co-phenylcaine spray, nebulised 4% lidocaine, spray-as-you-go; keep total lidocaine ≤9 mg/kg) and remifentanil-only sedation (TCI 1–3 ng/mL, or 0.05–0.1 µg/kg/min) titrated to keep the patient co-operative and self-ventilating. Avoid propofol or midazolam boluses, sit the patient up, give high-flow nasal oxygen throughout, and use a 6.0–7.0 mm tube</li>
              <li><strong>Rescue plan</strong>: <strong>awake tracheostomy under local anaesthesia</strong> with the ENT surgeon scrubbed and the neck prepped from the start — this becomes the primary plan when swelling distorts the airway beyond fibreoptic access or topicalisation fails. Neck induration often makes front-of-neck access difficult, so commit to the surgical airway early rather than as a last resort</li>
              <li><strong>Wider management</strong>: broad-spectrum IV antibiotics (e.g. co-amoxiclav plus metronidazole, or clindamycin), dexamethasone to reduce oedema, fluids and a sepsis bundle, urgent surgical drainage and dental clearance. Keep the tube in and ventilate in critical care until swelling settles; extubate only after a cuff-leak assessment with the difficult-airway team present</li>
            </ul>

            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="tracheostomy" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <CollapsibleSubsection title="Tracheostomy & Laryngectomy">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Surgical vs percutaneous</strong>: percutaneous dilatational (PDT) at bedside in ICU is most common. Surgical preferred if abnormal anatomy, paediatric, or emergency</li>
              <li><strong>Anaesthetic</strong>: GA with existing ETT. Withdraw ETT under direct vision (fibreoptic) to just above stoma site before tracheostomy insertion. FiO₂ 1.0 during procedure</li>
              <li><strong>PDT contraindications</strong>: an emergency airway (needs a surgical airway), unfavourable anatomy (morbid obesity with a short thick neck, high or large goitre, previous neck surgery or radiotherapy, fixed cervical flexion, tracheal deviation), uncorrected coagulopathy (aim platelets &gt;50 × 10⁹/L, INR &lt;1.5), high ventilatory requirement (FiO₂ &gt;0.6 or PEEP &gt;10 cmH₂O), raised ICP that will not tolerate hypercapnia, and infection at the puncture site. Ultrasound of the anterior neck identifies aberrant vessels and the correct interspace<InlineRef topicId="ent-anaesthesia" refLabel="NTSP 2014" /></li>
              <li><strong>Pre-procedure checklist</strong>: two competent operators plus an airway-trained anaesthetist, bronchoscope and skilled bronchoscopist, difficult-airway trolley and re-intubation plan, capnography, suction, surgical standby agreed, consent and coagulation checked, feed stopped, sedation and paralysis prescribed, and correct tube size/type selected (cuffed, non-fenestrated initially)</li>
              <li><strong>Anaesthesia for PDT</strong>: deep sedation or GA (propofol ± remifentanil/opioid) with <strong>full neuromuscular blockade</strong> to abolish coughing and prevent tracheal injury; FiO₂ 1.0, volume- or pressure-controlled ventilation, and neck extension with a shoulder roll unless contraindicated</li>
              <li><strong>Ciaglia Blue Rhino technique</strong>: identify the space between the 1st–2nd or 2nd–3rd tracheal rings, infiltrate local anaesthetic with adrenaline, make a small transverse incision, puncture midline with a fluid-filled needle aspirating air, pass the J-tipped guidewire caudally, use the introducer then a single tapered dilator over the wire, railroad the loaded tracheostomy tube, remove the dilator/wire and inflate the cuff. Guidewire dilating forceps (Griggs) is the main alternative</li>
              <li><strong>Role of bronchoscopy</strong>: confirms the needle is midline and at the right interspace, shows the ETT/cuff has been withdrawn clear of the puncture, guards against posterior tracheal wall puncture and paratracheal placement, and confirms the final tube sits above the carina. It costs some hypercapnia because of partial obstruction of the ETT lumen</li>
              <li><strong>Complications</strong>: early — bleeding (anterior jugular veins, thyroid isthmus), loss of the airway during tube exchange, posterior tracheal wall perforation, false passage or paratracheal placement, pneumothorax, pneumomediastinum, surgical emphysema, cuff puncture and hypoxaemia. Late — stomal infection, tracheal stenosis, tracheo-oesophageal fistula and (rarely) tracheo-innominate artery fistula presenting as sentinel bleeding</li>
              <li><strong>Immediately after</strong>: confirm ventilation with waveform capnography and bilateral air entry, secure the tube with sutures plus tapes, document tube type/size and insertion depth, complete an NTSP bedside emergency algorithm sign, check pressures and cuff pressure (20–30 cmH₂O), and request a chest radiograph if there was difficulty or suspicion of pneumothorax. Keep the first tube change to experienced staff after 5–7 days</li>
              <li><strong>Stomal transition at laryngectomy</strong>: surgeon inserts an armoured cuffed tube into the divided distal trachea; you connect a sterile circuit off the field. Confirm bilateral ventilation and ETCO₂ before removing the oral tube</li>
              <li><strong>Neck-breather safety</strong>: post-laryngectomy there is <strong>no connection</strong> between mouth/nose and trachea. Bag-mask via face will not work — ventilate via the stoma. NTSP red emergency board mandatory</li>
              <li><strong>Le Fort fractures</strong>: I (maxilla), II (pyramidal — maxilla + nasal bridge), III (craniofacial disjunction). Risks CSF leak and airway compromise — nasal intubation contraindicated in II/III. See the expanded management notes below</li>
              <li><strong>Free flap surgery</strong>: long procedures (8–12h). Avoid α-agonist boluses (flap vasospasm); use noradrenaline by infusion, MAP ≥70 mmHg, normothermia, Hb 80–100 g/L</li>
            </ul>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <LaryngectomyAirwayHandoverDiagram />
              </div>
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <LeFortFractureDiagram />
              </div>
            </div>
            <h4 className="text-base font-semibold text-foreground mt-5 mb-2">Anaesthetic management of Le Fort and mid-face fractures</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              These are usually high-energy injuries in young patients, and the airway, the associated injuries and the bleeding are all more dangerous than the fracture itself<InlineRef topicId="ent-anaesthesia" refLabel="BJA Educ Maxillofacial 2018" />.
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">1. Airway assessment</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Look for trismus (which may be mechanical from a displaced fracture and will not resolve with paralysis, or pain-related and will), gross facial and pharyngeal oedema that progresses over hours, expanding sublingual or retropharyngeal haematoma, mobile mid-face fragments and disordered dental occlusion, blood, teeth, secretions and vomit in the pharynx, and a posteriorly displaced maxilla obstructing the nasopharynx. A cribriform plate breach is suggested by CSF rhinorrhoea, panda eyes, subconjunctival haemorrhage and anosmia — this makes <strong>nasal instrumentation of any kind (tube, NG tube, airway) contraindicated in Le Fort II and III</strong>. Assess the neck at the same time: a hard collar and immobilisation greatly restrict mouth opening and laryngoscopy.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">2. Choosing an intubation technique</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc pl-4">
                  <li><strong>Rapid sequence induction with manual in-line stabilisation</strong>: appropriate for the bleeding, uncooperative or obtunded patient, or for airway compromise now. Advantages: fast, protects against aspiration. Disadvantages: apnoea in a potentially unintubatable airway, loss of tone allowing the mid-face to fall back, and worse laryngoscopic view with a collar — so have a videolaryngoscope, a bougie, a second operator and a FONA plan ready, and a surgeon prepared for a surgical airway.</li>
                  <li><strong>Videolaryngoscopy</strong>: usually the first-line device — a better view around blood-stained, oedematous anatomy with less neck movement, though a hyperangulated blade needs a stylet or bougie and blood on the lens can blind it. Have a Macintosh blade available as backup.</li>
                  <li><strong>Awake flexible fibreoptic intubation (oral route in Le Fort II/III)</strong>: ideal for the stable, cooperative patient with predicted difficulty and no urgent bleeding. Challenges are blood and secretions obscuring the view, trismus limiting oral passage, poor topicalisation of a traumatised airway, and the risk of coughing and further bleeding. It is a poor choice in the actively bleeding or agitated patient.</li>
                  <li><strong>Submental intubation</strong>: an orotracheal tube is redirected through a submental incision into the floor of the mouth, giving the surgeon a free oral cavity and intact dental occlusion for fixation without a tracheostomy. Used for panfacial fractures needing intermaxillary fixation where nasal intubation is contraindicated; complications include infection, scarring and salivary fistula.</li>
                  <li><strong>Retromolar intubation</strong>: the tube is passed behind the last molar in the retromolar space, an alternative where that space exists (more often in children) and the surgeon needs the occlusion checked.</li>
                  <li><strong>Elective tracheostomy</strong>: indicated for panfacial injury with severe swelling, an anticipated need for prolonged ventilation, associated head or cervical injury, planned long-term intermaxillary fixation, or where the surgical field and airway cannot be separated. Best done at the start of surgery, under controlled conditions, rather than as a rescue at 3 a.m.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">3. Associated injuries</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Treat these as multiply-injured trauma patients until proved otherwise: cervical spine injury (up to 10% in high-energy mid-face fracture), traumatic brain injury and base-of-skull fracture, ocular injury including retrobulbar haematoma and globe rupture (needs urgent decompression), thoracic and abdominal trauma, and long-bone fracture. Complete a full trauma assessment with a CT trauma series and formal cervical spine clearance before positioning for facial surgery, and remember alcohol, drugs and safeguarding issues in the history.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">4. Haemorrhage control</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Mid-face fractures can bleed torrentially from the maxillary artery, sphenopalatine and greater palatine vessels and pterygoid venous plexus, and much of the loss is swallowed and hidden. Manage as major haemorrhage: large-bore access, group-specific or emergency blood, activate the major-haemorrhage protocol with early plasma and platelets, tranexamic acid 1 g IV, viscoelastic-guided correction, calcium replacement and active warming. Temporising measures include anterior and posterior nasal packing, bite blocks and manual reduction of the mid-face, a Foley catheter tamponade in the nasopharynx, and definitive control by surgical packing, ligation or interventional radiological embolisation of the maxillary artery. Protect the airway before packing a bleeding nasopharynx.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">5. Intermaxillary fixation (IMF) and extubation</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Wired jaws mean the patient cannot open the mouth, vomit safely or be reintubated orally. <strong>Wire cutters must accompany the patient at all times</strong> — on the bed, in recovery and on the ward — and staff must know how to use them. Give aggressive multimodal antiemesis (dexamethasone plus ondansetron, avoid nitrous oxide, consider a nasogastric tube placed orally to empty the stomach where nasal routes are barred), suction the pharynx thoroughly under direct vision, and remove throat packs with a documented check. Extubate only a fully awake patient with airway reflexes restored, swelling stable or improving, and adequate gas exchange; consider a staged approach with an airway exchange catheter or elective postoperative ventilation if there is significant oedema or bleeding. Nurse head-up, keep dexamethasone going, and have the difficult-airway trolley and the surgeon available at extubation.
                </p>
              </div>
            </div>

            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="ionm" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <CollapsibleSubsection title="Intra-operative Nerve Monitoring">
            <p className="text-foreground/90 leading-relaxed mb-3">
              Several head and neck procedures rely on intra-operative nerve monitoring (IONM) to identify motor nerves
              at risk and to prognosticate function. The anaesthetic technique must preserve the motor response that the
              surgeon needs to elicit — this fundamentally constrains the choice and timing of neuromuscular blockade and
              the position of any surface or endotracheal-tube electrodes.
            </p>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Recurrent laryngeal nerve (thyroid, parathyroid, anterior cervical spine, mediastinal)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
              <li><strong>Why monitor?</strong> RLN injury rate ≈1–2% in primary thyroid surgery, up to 20% in re-do or malignant cases. Bilateral palsy → adducted cords and immediate post-extubation airway obstruction; unilateral → hoarseness and aspiration risk.</li>
              <li><strong>Technique:</strong> EMG endotracheal tube (NIM, Medtronic / Dräger) with paired surface electrodes contacting both vocal cords. The surgeon stimulates vagus and RLN with a hand-held probe (1–2 mA); evoked EMG is displayed on a screen with audible feedback.</li>
              <li><strong>Tube placement is critical:</strong> mid-electrode at the level of the cords on direct/video laryngoscopy. Confirm contact <em>after</em> final neck positioning (extension rotates the tube). Lubricants and sprays insulate the electrodes — use saline only.</li>
              <li><strong>NMB strategy:</strong> a single intubating dose of <strong>suxamethonium 1 mg·kg⁻¹</strong> or low-dose <strong>rocuronium 0.3 mg·kg⁻¹</strong> with sugammadex reversal before nerve dissection. Avoid maintenance non-depolarisers. If paralysis is required, target TOF count ≥2 (some centres ≥4) before stimulation; sugammadex 2 mg·kg⁻¹ is the rescue.</li>
              <li><strong>Maintenance:</strong> TIVA or volatile both acceptable — neither abolishes EMG. Avoid topical lidocaine to the cords (blocks the response).</li>
              <li><strong>Loss of signal protocol:</strong> check tube position (rotation/depth), confirm not paralysed (TOF), troubleshoot equipment <em>before</em> attributing to nerve injury. Persistent loss of signal on the first side may prompt the surgeon to <strong>stage</strong> the contralateral lobectomy to avoid bilateral palsy.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Facial nerve (parotidectomy, mastoid/middle ear, vestibular schwannoma, parotid abscess)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
              <li><strong>Why monitor?</strong> CN VII runs through the parotid and the temporal bone; identification preserves facial symmetry, eye closure and quality of life. Permanent palsy ≈1–3% with monitoring vs &gt;5% without in parotid surgery.</li>
              <li><strong>Technique:</strong> needle electrodes in orbicularis oculi and orbicularis oris (and frontalis/mentalis depending on system); surgeon-held monopolar stimulator. Visible twitch at low currents (0.05–0.5 mA) confirms proximity.</li>
              <li><strong>NMB strategy:</strong> intubate with sux or low-dose rocuronium and then run <strong>relaxant-free</strong> — TIVA with remifentanil ± deep volatile is ideal to keep the patient still without abolishing the EMG. If movement is unacceptable, use a remifentanil infusion to deepen rather than re-paralyse.</li>
              <li><strong>Other considerations:</strong> avoid long-acting opioids that cloud post-op cranial nerve assessment in posterior fossa surgery; head-up tilt and controlled normocapnia reduce venous bleeding in the surgical field; eye protection on the contralateral side because the monitored side is open for stimulation.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Other nerves frequently monitored in head and neck</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
              <li><strong>Spinal accessory (CN XI)</strong> — neck dissection: trapezius EMG.</li>
              <li><strong>Hypoglossal (CN XII)</strong> — submandibular and skull-base surgery: tongue EMG.</li>
              <li><strong>Glossopharyngeal & vagus (CN IX, X)</strong> — skull-base / jugular foramen tumours: pharyngeal and vocal-cord electrodes.</li>
              <li><strong>Brachial plexus / phrenic</strong> — extensive neck dissection or thoracic outlet surgery: free-running EMG.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">General anaesthetic principles for IONM</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>Communicate early</strong> — confirm with the surgeon which nerves will be monitored and when stimulation will occur, before drawing up paralysis.</li>
              <li><strong>Quantitative neuromuscular monitoring</strong> (acceleromyography) is mandatory whenever IONM is in use — clinical signs are unreliable at low TOF counts.</li>
              <li><strong>Avoid:</strong> long-acting non-depolarisers, magnesium boluses, repeated lidocaine spray to the cords, oily lubricants on EMG electrodes, and unnecessary head-of-bed turns after tube positioning.</li>
              <li><strong>Plan for sugammadex availability</strong> if rocuronium is used — rapid restoration of EMG transmission allows surgery to continue without delay.</li>
              <li><strong>Document</strong> baseline and final stimulation thresholds and any loss-of-signal events; these influence the plan for staging, extubation and post-op cord/facial assessment.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="thyroid-bleed" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <CollapsibleSubsection title="Post-thyroidectomy Bleeding & Neck Swelling — Emergency Management">
            <p className="text-foreground/90 leading-relaxed mb-3">
              Post-thyroidectomy haemorrhage is a time-critical airway emergency occurring in 1–2% of cases, most often
              within the first 6 hours but described up to 24 hours postoperatively. The key insight is that the airway
              compromise is <strong>not relieved by simply re-opening the wound to drain the haematoma</strong>:
              expanding blood under the strap muscles obstructs venous and lymphatic return, producing supraglottic
              and laryngeal oedema that <em>persists</em> after evacuation. Definitive management requires both wound
              decompression and a secured airway.
            </p>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Recognition</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
              <li>Tense, swollen neck with overlying bruising; rapidly filling drain (or a drain that has stopped because it is clotted — falsely reassuring).</li>
              <li>Stridor, dyspnoea, agitation, dysphagia, voice change, "I can't breathe lying flat".</li>
              <li>Falling SpO₂ and rising respiratory rate are <strong>late</strong> signs — act before they appear.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Immediate bedside management — the SCOOP sequence</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-3">
              <li><strong>S — Steri-strips off, Sit up:</strong> sit the patient upright (improves venous drainage, reduces work of breathing) and <strong>call for help simultaneously, not sequentially</strong> — senior anaesthetist, ENT/general surgeon, theatre coordinator and a second pair of hands; state clearly "post-thyroidectomy neck haematoma, airway at risk". 100% O₂ via non-rebreathe; large-bore IV access; bloods including crossmatch and coagulation<InlineRef topicId="ent-anaesthesia" refLabel="Iliff 2022 Haematoma" /></li>
              <li><strong>C — Cut sutures / Clips out:</strong> at the bedside open <em>every</em> layer — skin sutures or clips <em>and</em> the deeper strap-muscle/platysma layer — then evacuate clot bluntly with a gloved finger or forceps; blood may be deep to the strap muscles, so removing skin clips alone does not decompress the airway. Every post-thyroidectomy patient should have a <strong>thyroid emergency box</strong> at the bedside: clip remover, stitch cutter, suture scissors, forceps, gloves and a face shield. Perform this immediately as a nurse or doctor at the bedside — <strong>do not wait for the surgeon or for transfer to theatre</strong><InlineRef topicId="ent-anaesthesia" refLabel="Iliff 2022 Haematoma" /></li>

              <li><strong>O — Oxygenate:</strong> continue 100% O₂; consider nebulised adrenaline 1 mg in 5 mL and IV dexamethasone 8 mg for laryngeal oedema as a temporising bridge.</li>
              <li><strong>O — Operating theatre:</strong> transfer immediately for definitive haemostasis and airway control. Take the suture-removal kit and a senior with the patient.</li>
              <li><strong>P — Plan the airway:</strong> see below.</li>
            </ol>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Securing the airway in theatre</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
              <li><strong>Anticipate a difficult airway</strong> regardless of the original intubation grade — distorted anatomy, oedema, blood and a frightened patient. Have ENT scrubbed and a tracheostomy set open before induction.</li>
              <li><strong>Patient awake and cooperative, time available:</strong> awake fibreoptic intubation (sitting up, topicalised) or awake videolaryngoscopy is the safest plan.</li>
              <li><strong>Patient deteriorating, not safe to wait:</strong> evacuate the haematoma at the bedside or on transfer, then perform a careful inhalational induction in the sitting/semi-recumbent position with sevoflurane in 100% O₂, maintaining spontaneous ventilation. Direct or video laryngoscopy when deep, with a smaller-than-predicted ETT (6.0 / 5.5 / 5.0) and bougie ready.</li>
              <li><strong>Avoid</strong> a standard supine RSI with rocuronium-only paralysis: paralysis abolishes the small remaining airway tone, supine position worsens venous engorgement, and a failed first-pass intubation in a bloody, oedematous neck is rapidly catastrophic.</li>
              <li><strong>Have a surgical airway plan:</strong> tracheostomy in theatre is the rescue; cricothyroidotomy may be very difficult through a swollen, distorted neck — surgeon should be scrubbed and ready.</li>
            </ul>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">After haemostasis</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
              <li>Continue intubated and ventilated until laryngeal oedema settles — typically 24–48 h. Cuff-leak test, fibreoptic look at the cords, and dexamethasone before any extubation attempt.</li>
              <li><strong>Decompression does not always relieve the obstruction</strong>: venous and lymphatic congestion causes laryngeal and supraglottic oedema that persists after the clot has been evacuated, so a patient may still obstruct with an open wound. Keep the definitive airway plan (theatre, tracheostomy-ready surgeon) active until the airway is demonstrably safe<InlineRef topicId="ent-anaesthesia" refLabel="Iliff 2022 Haematoma" /></li>

              <li><strong>Check calcium</strong> (parathyroid disturbance) and <strong>vocal cord function</strong> (RLN injury) postoperatively — both can compound airway risk after extubation.</li>
              <li>Critical incident review and bedside emergency-box restock; ensure all post-thyroidectomy patients are nursed in an area trained and equipped to perform bedside wound decompression.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Shared airway — communicate continuously with the surgeon; have a plan for sudden loss of airway access.",
              "Tonsillectomy bleeding: hypovolaemic + swallowed blood + full stomach — RSI in left lateral head-down, large-bore IV, blood available.",
              "Laser airway surgery: FiO₂ <30%, no N₂O, laser-resistant tube, saline-filled cuff, wet swabs, eye protection.",
              "Le Fort fractures and nasal/middle-third trauma — avoid nasal intubation (risk of cribriform plate breach).",
              "Tracheostomy emergencies (NTSP): patent vs blocked, cuff up/down — algorithm by colour-coded bedhead signs.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              ENT & Maxillofacial Anaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Evidence-based answers to the questions FRCA Final candidates most often ask about airway fires, laser surgery safety, jet ventilation, THRIVE, post-tonsillectomy bleeding, middle ear surgery, post-thyroidectomy haematoma, intra-operative nerve monitoring, and tracheostomy management.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {entFaqs.map(([q, a], i) => (
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
            <title>ENT & Maxillofacial Anaesthesia — laser airway, shared airway & stridor</title>
            <meta
              name="description"
              content="ENT and maxillofacial anaesthesia for FRCA Final: shared airway principles, laser airway surgery and fire prevention, jet ventilation and THRIVE, tonsillectomy and post-tonsillectomy bleeding, middle ear surgery, stridor management, tracheostomy and laryngectomy, intra-operative nerve monitoring, and post-thyroidectomy emergency management."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: entFaqs.map(([name, acceptedAnswer]) => ({
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
          title: "Airway fire during laser laryngoscopy",
          scenario: "During CO₂ laser excision of a vocal cord lesion you notice a flame at the tip of the laser-resistant tube. FiO₂ has crept to 0.5 because of desaturation.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Call out "Airway fire". <strong>Stop ventilation, disconnect circuit, remove the tube</strong> simultaneously.</li>
                <li><strong>Flood the field with saline</strong>; surgeon turns off the laser and removes the burning material.</li>
                <li>Ventilate the patient by face mask on <strong>air, FiO₂ 0.21</strong> until smoke clears, then 100% O₂ via face mask.</li>
                <li>Re-intubate with a fresh laser-safe tube; perform <strong>rigid bronchoscopy</strong> to assess airway burns.</li>
                <li>Plan ICU admission, humidified O₂, steroids for oedema, antibiotics if soiled. Refer to NAP4 / DAS 2015.</li>
                <li>Prevention review: keep <strong>FiO₂ ≤0.3</strong>, avoid N₂O, use saline-soaked pledgets, deflate cuff with saline-tinted methylene blue.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Continuing to ventilate fans the fire — disconnect first.</li>
                  <li>Reaching for the gas tap before removing the tube — slows extinction.</li>
                  <li>Running FiO₂ &gt;0.3 'just in case' — single biggest preventable factor.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Stop gas, remove tube, flood with saline, ventilate on air, re-intubate, bronchoscopy, ICU.",
          cites: ["NAP4 2011"],
        },
      ]}
      keyPoints={[
        { text: "Shared airway: communication is key. Document throat pack insertion/removal — retained pack is a never event", cites: ["DAS 2015"] },
        { text: "Post-tonsillectomy bleed: assume full stomach + hypovolaemia. Resuscitate before RSI. Avoid codeine in children (CYP2D6 risk)", cites: ["BJA Educ Laser 2015"] },
        { text: "Laser airway surgery: FiO₂ ≤0.3, avoid N₂O, laser-safe tube. Airway fire protocol: stop gas, remove tube, flood with saline", cites: ["BJA Educ ENT 2017"] },
        { text: "Middle ear surgery: avoid N₂O (middle ear pressure). TIVA preferred. Avoid maintenance paralysis (facial nerve monitoring)", cites: ["NTSP 2014"] },
        { text: "Stridor at rest = >50% obstruction. Inspiratory = supraglottic, biphasic = glottic. Heliox reduces turbulent flow resistance", cites: ["NAP4 2011"] },
        { text: "Laryngectomy: post-op the patient is a neck-breather — bag-mask via face will not work, ventilate via the stoma (NTSP red board)", cites: ["DAS 2015"] },
      ]}
    />
  );
};

export default ENTAnaesthesiaTopic;
