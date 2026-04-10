import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { entAnaesthesiaQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const ENTAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="ENT & Maxillofacial Anaesthesia" subtitle="FRCA Final — Clinical" backPath="/clinical" backLabel="Clinical" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Shared Airway</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Core challenge</strong>: surgeon and anaesthetist share the airway. Communication, planning, and a robust difficult airway strategy are essential</li>
            <li><strong>Tube options</strong>: south-facing RAE (oral), north-facing RAE (nasal), reinforced/flexometallic, microlaryngoscopy tubes (5.0–6.0 mm ID)</li>
            <li><strong>Nasal intubation</strong>: often required for oral/dental/maxillofacial surgery. Risks: epistaxis (use vasoconstrictor preparation), adenoid damage, submucosal passage. Contraindicated in base-of-skull fracture, severe coagulopathy</li>
            <li><strong>Throat pack</strong>: prevents blood/debris entering larynx/stomach. Must be documented (insertion/removal) — retained pack is a never event</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Tonsillectomy</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Population</strong>: predominantly children. Commonly associated with OSA — assess severity (sleep study, history of desaturations)</li>
            <li><strong>Anaesthetic</strong>: south-facing RAE, spontaneous or controlled ventilation. TIVA avoids volatile in OSA children (↑ sensitivity to respiratory depression)</li>
            <li><strong>Analgesia</strong>: paracetamol, NSAIDs (ibuprofen — no longer contraindicated per Cochrane evidence), dexamethasone (↓ PONV, ↓ oedema). Avoid codeine in children (FDA black box — CYP2D6 ultra-rapid metabolisers → fatal respiratory depression)</li>
            <li><strong>Post-tonsillectomy bleeding</strong>: primary (&lt;24h, 0.5–2%) or secondary (5–10 days, 2–4%). Emergency — assume full stomach + hypovolaemia. Resuscitate first, then RSI with head-down tilt and suction. Two large-bore IV access. Cross-match blood</li>
            <li><strong>RSI for bleeding tonsil</strong>: experienced surgeon scrubbed. Left lateral head-down for induction if massive bleeding. Have surgical airway equipment available</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Microlaryngoscopy & Laser Surgery</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Microlaryngoscopy tube (MLT)</strong>: small ID (5.0–6.0 mm) to maximise surgical view. Increased airway resistance — monitor closely</li>
            <li><strong>Jet ventilation</strong>: supraglottic (Sanders injector) or subglottic/transtracheal. Provides ventilation without tube in surgical field. Risks: barotrauma, air trapping, gastric insufflation, pneumothorax</li>
            <li><strong>Laser safety</strong>: CO₂ laser most common for airway. Laser-resistant tubes (e.g., Laser-Flex, Bivona). FiO₂ ≤0.3 (avoid &gt;0.4), avoid N₂O (supports combustion). Use air/O₂ mixture</li>
            <li><strong>Airway fire</strong>: stop ventilation, remove tube, flood field with saline, re-intubate, bronchoscopy to assess damage. Prevention: laser-safe tube, saline-soaked pledgets, minimal FiO₂, eye protection for all</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Nasal Surgery</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Septoplasty/rhinoplasty/FESS</strong>: oral RAE or reinforced tube. Topical vasoconstrictors (xylometazoline, cocaine 5–10%) + infiltration with adrenaline</li>
            <li><strong>Cocaine</strong>: max dose 1.5 mg/kg topically. Sympathomimetic — inhibits noradrenaline reuptake → ↑ HR, ↑ BP. Avoid with halothane (arrhythmias). Caution with other vasopressors</li>
            <li><strong>Controlled hypotension</strong>: may reduce surgical bleeding. 15° head-up, remifentanil, TCI propofol, beta-blockers. Target MAP 55–65 mmHg (if no contraindications)</li>
            <li><strong>PONV</strong>: high incidence after nasal surgery (blood swallowing). Multimodal prophylaxis: ondansetron + dexamethasone ± cyclizine</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Middle Ear Surgery</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>N₂O</strong>: avoid — diffuses into non-compliant middle ear cavity 34× faster than N₂ leaves. ↑ middle ear pressure → tympanic membrane graft displacement, disruption of ossicular reconstruction</li>
            <li><strong>TIVA preferred</strong>: avoids N₂O, provides bloodless field (remifentanil-based controlled hypotension)</li>
            <li><strong>Facial nerve monitoring</strong>: avoid or limit neuromuscular blockade (no maintenance paralysis). TOF monitoring essential. Short-acting NMBA for intubation only</li>
            <li><strong>PONV</strong>: very high incidence (vestibular stimulation). Aggressive prophylaxis: dexamethasone + ondansetron + consider TIVA (propofol is antiemetic)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Airway Obstruction & Stridor</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Causes</strong>: epiglottitis, croup, foreign body, tumour (laryngeal/pharyngeal), Ludwig's angina, post-operative haematoma (thyroid/neck surgery), anaphylaxis, burns</li>
            <li><strong>Assessment</strong>: severity — stridor at rest is severe (&gt;50% obstruction). Inspiratory stridor = supraglottic; biphasic = glottic/subglottic; expiratory = intrathoracic</li>
            <li><strong>Management principles</strong>: keep patient calm and upright. Heliox (70:30 He:O₂) reduces turbulent flow resistance. Nebulised adrenaline (5 ml 1:1000) for oedema. Dexamethasone IV</li>
            <li><strong>Inhalational induction</strong>: for paediatric epiglottitis/croup — sevoflurane in 100% O₂, spontaneous ventilation, maintain until airway secured. ENT surgeon scrubbed for emergency tracheostomy. Never paralyse until airway secured</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Tracheostomy</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Surgical vs percutaneous</strong>: percutaneous dilatational (PDT) at bedside in ICU is most common. Surgical preferred if abnormal anatomy, paediatric, or emergency</li>
            <li><strong>Anaesthetic</strong>: GA with existing ETT. Withdraw ETT under direct vision (fibreoptic) to just above stoma site before tracheostomy insertion. FiO₂ 1.0 during procedure</li>
            <li><strong>Complications</strong>: haemorrhage, pneumothorax, false passage, tube displacement, tracheal stenosis (late), tracheo-innominate fistula (rare, catastrophic — weeks post-procedure)</li>
            <li><strong>Emergency algorithm</strong>: NTSP (National Tracheostomy Safety Project) — assess patency, remove inner cannula, pass suction catheter, deflate cuff, remove tracheostomy if blocked, cover stoma and manage as standard airway</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Maxillofacial Trauma & Surgery</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Le Fort fractures</strong>: I (maxilla only), II (pyramidal — maxilla + nasal bridge), III (craniofacial disjunction). All risk CSF leak, massive haemorrhage, airway compromise</li>
            <li><strong>Airway management</strong>: nasal intubation contraindicated in Le Fort II/III and base-of-skull fractures. Options: oral intubation, submental intubation, tracheostomy</li>
            <li><strong>IMF (intermaxillary fixation)</strong>: jaws wired shut post-op. Wire cutters must accompany patient at all times. Risk of aspiration if vomiting — antiemetics essential</li>
            <li><strong>Free flap surgery</strong>: long procedures (8–12h). Avoid hypotension/vasopressors (flap perfusion). Maintain normothermia, Hb &gt;80 g/L, adequate hydration. Flap monitoring post-op</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Shared airway: communication is key. Document throat pack insertion/removal — retained pack is a never event",
        "Post-tonsillectomy bleed: assume full stomach + hypovolaemia. Resuscitate before RSI. Avoid codeine in children (CYP2D6 risk)",
        "Laser airway surgery: FiO₂ ≤0.3, avoid N₂O, laser-safe tube. Airway fire protocol: stop gas, remove tube, flood with saline",
        "Middle ear surgery: avoid N₂O (middle ear pressure). TIVA preferred. Avoid maintenance paralysis (facial nerve monitoring)",
        "Stridor at rest = >50% obstruction. Inspiratory = supraglottic, biphasic = glottic. Heliox reduces turbulent flow resistance",
      ]} />
      <QuizSection questions={entAnaesthesiaQuestions} />
      <ReferencesList topicId="ent-anaesthesia" />
      <SeeAlso topicId="ent-anaesthesia" />
        <TopicCompletionToggle topicId="ent-anaesthesia" topicTitle="ENT & Maxillofacial Anaesthesia" />
    </SectionLayout>
  );
};

export default ENTAnaesthesiaTopic;
