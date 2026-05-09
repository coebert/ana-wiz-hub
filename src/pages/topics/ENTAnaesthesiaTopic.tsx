import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { entAnaesthesiaQuestions } from "@/data/quizzes";
import LaryngectomyAirwayHandoverDiagram from "@/components/diagrams/LaryngectomyAirwayHandoverDiagram";
import LeFortFractureDiagram from "@/components/diagrams/LeFortFractureDiagram";
import LaserAirwayDiagram from "@/components/diagrams/LaserAirwayDiagram";
import JetVentilationDiagram from "@/components/diagrams/JetVentilationDiagram";
import JetVentilationCycleAnimation from "@/components/diagrams/JetVentilationCycleAnimation";
import { Exam } from "@/data/curriculum";

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
        diagrams: { exams: [Exam.FINAL] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2017 ENT", "DAS 2015"],
        diagrams: ["NTSP 2014", "BJA Educ 2017 ENT"],
        workedExamples: ["DAS 2015", "BJA Educ 2015 Laser", "NAP4 2011"],
        keyPoints: ["DAS 2015", "NTSP 2014", "BJA Educ 2015 Laser", "BJA Educ 2017 ENT"],
      }}
      diagrams={
        <>
          <LaryngectomyAirwayHandoverDiagram />
          <LaserAirwayDiagram />
          <JetVentilationDiagram />
          <JetVentilationCycleAnimation />
          <LeFortFractureDiagram />
        </>
      }
      coreConcepts={
        <>
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Shared Airway</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              ENT and maxillofacial anaesthesia is defined by sharing the airway with the surgeon. Success depends on clear communication, deliberate tube and ventilation choices, and a pre-agreed plan for managing intra-operative airway loss — particularly during laryngeal, tonsillar, and post-tracheostomy procedures.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Core challenge</strong>: surgeon and anaesthetist share the airway. Communication, planning, and a robust difficult airway strategy are essential</li>
              <li><strong>Tube options</strong>: south-facing RAE (oral), north-facing RAE (nasal), reinforced/flexometallic, microlaryngoscopy tubes (5.0–6.0 mm ID)</li>
              <li><strong>Nasal intubation</strong>: often required for oral/dental/maxillofacial surgery. Risks: epistaxis (use vasoconstrictor preparation), adenoid damage, submucosal passage. Contraindicated in base-of-skull fracture, severe coagulopathy</li>
              <li><strong>Throat pack</strong>: prevents blood/debris entering larynx/stomach. Must be documented (insertion/removal) — retained pack is a never event</li>
            </ul>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Tonsillectomy</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Population</strong>: predominantly children. Commonly associated with OSA — assess severity (sleep study, history of desaturations)</li>
              <li><strong>Anaesthetic</strong>: south-facing RAE, spontaneous or controlled ventilation. TIVA avoids volatile in OSA children (↑ sensitivity to respiratory depression)</li>
              <li><strong>Analgesia</strong>: paracetamol, NSAIDs (ibuprofen — no longer contraindicated per Cochrane evidence), dexamethasone (↓ PONV, ↓ oedema). Avoid codeine in children (FDA black box — CYP2D6 ultra-rapid metabolisers → fatal respiratory depression)</li>
              <li><strong>Post-tonsillectomy bleeding</strong>: primary (&lt;24h, 0.5–2%) or secondary (5–10 days, 2–4%). Emergency — assume full stomach + hypovolaemia. Resuscitate first, then RSI with head-down tilt and suction. Two large-bore IV access. Cross-match blood</li>
              <li><strong>RSI for bleeding tonsil</strong>: experienced surgeon scrubbed. Left lateral head-down for induction if massive bleeding. Have surgical airway equipment available</li>
            </ul>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Microlaryngoscopy & Laser Surgery</h2>
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
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Nasal Surgery</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Septoplasty/rhinoplasty/FESS</strong>: oral RAE or reinforced tube. Topical vasoconstrictors (xylometazoline, cocaine 5–10%) + infiltration with adrenaline</li>
              <li><strong>Cocaine</strong>: max dose 1.5 mg/kg topically. Sympathomimetic — inhibits noradrenaline reuptake → ↑ HR, ↑ BP. Avoid with halothane (arrhythmias). Caution with other vasopressors</li>
              <li><strong>Controlled hypotension</strong>: may reduce surgical bleeding. 15° head-up, remifentanil, TCI propofol, beta-blockers. Target MAP 55–65 mmHg (if no contraindications)</li>
              <li><strong>PONV</strong>: high incidence after nasal surgery (blood swallowing). Multimodal prophylaxis: ondansetron + dexamethasone ± cyclizine</li>
            </ul>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Middle Ear Surgery</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>N₂O</strong>: avoid — diffuses into non-compliant middle ear cavity 34× faster than N₂ leaves. ↑ middle ear pressure → tympanic membrane graft displacement, disruption of ossicular reconstruction</li>
              <li><strong>TIVA preferred</strong>: avoids N₂O, provides bloodless field (remifentanil-based controlled hypotension)</li>
              <li><strong>Facial nerve monitoring</strong>: avoid or limit neuromuscular blockade (no maintenance paralysis). TOF monitoring essential. Short-acting NMBA for intubation only</li>
              <li><strong>PONV</strong>: very high incidence (vestibular stimulation). Aggressive prophylaxis: dexamethasone + ondansetron + consider TIVA (propofol is antiemetic)</li>
            </ul>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Airway Obstruction & Stridor</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Causes</strong>: epiglottitis, croup, foreign body, tumour (laryngeal/pharyngeal), Ludwig's angina, post-operative haematoma (thyroid/neck surgery), anaphylaxis, burns</li>
              <li><strong>Assessment</strong>: severity — stridor at rest is severe (&gt;50% obstruction). Inspiratory stridor = supraglottic; biphasic = glottic/subglottic; expiratory = intrathoracic</li>
              <li><strong>Management principles</strong>: keep patient calm and upright. Heliox (70:30 He:O₂) reduces turbulent flow resistance. Nebulised adrenaline (5 ml 1:1000) for oedema. Dexamethasone IV</li>
              <li><strong>Inhalational induction</strong>: for paediatric epiglottitis/croup — sevoflurane in 100% O₂, spontaneous ventilation, maintain until airway secured. ENT surgeon scrubbed for emergency tracheostomy. Never paralyse until airway secured</li>
            </ul>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Tracheostomy & Laryngectomy</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Surgical vs percutaneous</strong>: percutaneous dilatational (PDT) at bedside in ICU is most common. Surgical preferred if abnormal anatomy, paediatric, or emergency</li>
              <li><strong>Anaesthetic</strong>: GA with existing ETT. Withdraw ETT under direct vision (fibreoptic) to just above stoma site before tracheostomy insertion. FiO₂ 1.0 during procedure</li>
              <li><strong>Stomal transition at laryngectomy</strong>: surgeon inserts an armoured cuffed tube into the divided distal trachea; you connect a sterile circuit off the field. Confirm bilateral ventilation and ETCO₂ before removing the oral tube</li>
              <li><strong>Neck-breather safety</strong>: post-laryngectomy there is <strong>no connection</strong> between mouth/nose and trachea. Bag-mask via face will not work — ventilate via the stoma. NTSP red emergency board mandatory</li>
              <li><strong>Le Fort fractures</strong>: I (maxilla), II (pyramidal — maxilla + nasal bridge), III (craniofacial disjunction). Risks CSF leak and airway compromise — nasal intubation contraindicated in II/III</li>
              <li><strong>Free flap surgery</strong>: long procedures (8–12h). Avoid α-agonist boluses (flap vasospasm); use noradrenaline by infusion, MAP ≥70 mmHg, normothermia, Hb 80–100 g/L</li>
            </ul>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intra-operative Nerve Monitoring</h2>
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
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["EN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Post-thyroidectomy Bleeding & Neck Swelling — Emergency Management</h2>
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
              <li><strong>S — Steri-strips off, Sit up:</strong> sit the patient upright (improves venous drainage, reduces work of breathing) and call for senior anaesthetic, ENT/general surgical and theatre help simultaneously. 100% O₂ via non-rebreathe; large-bore IV access; bloods including crossmatch, coagulation.</li>
              <li><strong>C — Cut sutures / Clips out:</strong> at the bedside, open <em>both</em> skin and the deeper strap-muscle layer using a stitch cutter or the suture-removal scissors kept on every post-thyroidectomy patient ('thyroid emergency box': scissors, clip-remover, gloves). Evacuate clot manually. This is a nursing/medical bedside skill — do not wait for the surgeon.</li>
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
              <li><strong>Check calcium</strong> (parathyroid disturbance) and <strong>vocal cord function</strong> (RLN injury) postoperatively — both can compound airway risk after extubation.</li>
              <li>Critical incident review and bedside emergency-box restock; ensure all post-thyroidectomy patients are nursed in an area trained and equipped to perform bedside wound decompression.</li>
            </ul>
          </ExamSection>
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
        },
      ]}
      keyPoints={[
        "Shared airway: communication is key. Document throat pack insertion/removal — retained pack is a never event",
        "Post-tonsillectomy bleed: assume full stomach + hypovolaemia. Resuscitate before RSI. Avoid codeine in children (CYP2D6 risk)",
        "Laser airway surgery: FiO₂ ≤0.3, avoid N₂O, laser-safe tube. Airway fire protocol: stop gas, remove tube, flood with saline",
        "Middle ear surgery: avoid N₂O (middle ear pressure). TIVA preferred. Avoid maintenance paralysis (facial nerve monitoring)",
        "Stridor at rest = >50% obstruction. Inspiratory = supraglottic, biphasic = glottic. Heliox reduces turbulent flow resistance",
        "Laryngectomy: post-op the patient is a neck-breather — bag-mask via face will not work, ventilate via the stoma (NTSP red board)",
      ]}
    />
  );
};

export default ENTAnaesthesiaTopic;
