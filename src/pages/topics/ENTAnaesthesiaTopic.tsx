import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { entAnaesthesiaQuestions } from "@/data/quizzes";
import LaryngectomyAirwayHandoverDiagram from "@/components/diagrams/LaryngectomyAirwayHandoverDiagram";
import LeFortFractureDiagram from "@/components/diagrams/LeFortFractureDiagram";

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
        objectives: { exams: ["final"], curriculumCodes: ["EN_BK_03"] },
        diagrams: { exams: ["final"] },
        workedExamples: { exams: ["final"] },
        keyPoints: { exams: ["final"] },
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
          <LeFortFractureDiagram />
        </>
      }
      coreConcepts={
        <>
          <ExamSection exams={["final"]} curriculumCodes={["EN_BK_03"]}>
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

          <ExamSection exams={["final"]} curriculumCodes={["EN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Tonsillectomy</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Population</strong>: predominantly children. Commonly associated with OSA — assess severity (sleep study, history of desaturations)</li>
              <li><strong>Anaesthetic</strong>: south-facing RAE, spontaneous or controlled ventilation. TIVA avoids volatile in OSA children (↑ sensitivity to respiratory depression)</li>
              <li><strong>Analgesia</strong>: paracetamol, NSAIDs (ibuprofen — no longer contraindicated per Cochrane evidence), dexamethasone (↓ PONV, ↓ oedema). Avoid codeine in children (FDA black box — CYP2D6 ultra-rapid metabolisers → fatal respiratory depression)</li>
              <li><strong>Post-tonsillectomy bleeding</strong>: primary (&lt;24h, 0.5–2%) or secondary (5–10 days, 2–4%). Emergency — assume full stomach + hypovolaemia. Resuscitate first, then RSI with head-down tilt and suction. Two large-bore IV access. Cross-match blood</li>
              <li><strong>RSI for bleeding tonsil</strong>: experienced surgeon scrubbed. Left lateral head-down for induction if massive bleeding. Have surgical airway equipment available</li>
            </ul>
          </ExamSection>

          <ExamSection exams={["final"]} curriculumCodes={["EN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Microlaryngoscopy & Laser Surgery</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Microlaryngoscopy tube (MLT)</strong>: small ID (5.0–6.0 mm) to maximise surgical view. Increased airway resistance — monitor closely</li>
              <li><strong>Jet ventilation</strong>: supraglottic (Sanders injector) or subglottic/transtracheal. Provides ventilation without tube in surgical field. Risks: barotrauma, air trapping, gastric insufflation, pneumothorax</li>
              <li><strong>Laser safety</strong>: CO₂ laser most common for airway. Laser-resistant tubes (e.g., Laser-Flex, Bivona). FiO₂ ≤0.3 (avoid &gt;0.4), avoid N₂O (supports combustion). Use air/O₂ mixture</li>
              <li><strong>Airway fire</strong>: stop ventilation, remove tube, flood field with saline, re-intubate, bronchoscopy to assess damage. Prevention: laser-safe tube, saline-soaked pledgets, minimal FiO₂, eye protection for all</li>
            </ul>
          </ExamSection>

          <ExamSection exams={["final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Nasal Surgery</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Septoplasty/rhinoplasty/FESS</strong>: oral RAE or reinforced tube. Topical vasoconstrictors (xylometazoline, cocaine 5–10%) + infiltration with adrenaline</li>
              <li><strong>Cocaine</strong>: max dose 1.5 mg/kg topically. Sympathomimetic — inhibits noradrenaline reuptake → ↑ HR, ↑ BP. Avoid with halothane (arrhythmias). Caution with other vasopressors</li>
              <li><strong>Controlled hypotension</strong>: may reduce surgical bleeding. 15° head-up, remifentanil, TCI propofol, beta-blockers. Target MAP 55–65 mmHg (if no contraindications)</li>
              <li><strong>PONV</strong>: high incidence after nasal surgery (blood swallowing). Multimodal prophylaxis: ondansetron + dexamethasone ± cyclizine</li>
            </ul>
          </ExamSection>

          <ExamSection exams={["final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Middle Ear Surgery</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>N₂O</strong>: avoid — diffuses into non-compliant middle ear cavity 34× faster than N₂ leaves. ↑ middle ear pressure → tympanic membrane graft displacement, disruption of ossicular reconstruction</li>
              <li><strong>TIVA preferred</strong>: avoids N₂O, provides bloodless field (remifentanil-based controlled hypotension)</li>
              <li><strong>Facial nerve monitoring</strong>: avoid or limit neuromuscular blockade (no maintenance paralysis). TOF monitoring essential. Short-acting NMBA for intubation only</li>
              <li><strong>PONV</strong>: very high incidence (vestibular stimulation). Aggressive prophylaxis: dexamethasone + ondansetron + consider TIVA (propofol is antiemetic)</li>
            </ul>
          </ExamSection>

          <ExamSection exams={["final"]} curriculumCodes={["EN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Airway Obstruction & Stridor</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Causes</strong>: epiglottitis, croup, foreign body, tumour (laryngeal/pharyngeal), Ludwig's angina, post-operative haematoma (thyroid/neck surgery), anaphylaxis, burns</li>
              <li><strong>Assessment</strong>: severity — stridor at rest is severe (&gt;50% obstruction). Inspiratory stridor = supraglottic; biphasic = glottic/subglottic; expiratory = intrathoracic</li>
              <li><strong>Management principles</strong>: keep patient calm and upright. Heliox (70:30 He:O₂) reduces turbulent flow resistance. Nebulised adrenaline (5 ml 1:1000) for oedema. Dexamethasone IV</li>
              <li><strong>Inhalational induction</strong>: for paediatric epiglottitis/croup — sevoflurane in 100% O₂, spontaneous ventilation, maintain until airway secured. ENT surgeon scrubbed for emergency tracheostomy. Never paralyse until airway secured</li>
            </ul>
          </ExamSection>

          <ExamSection exams={["final"]} curriculumCodes={["EN_BK_03"]}>
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
