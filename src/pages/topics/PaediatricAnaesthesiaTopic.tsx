import { SectionLayout } from "@/components/SectionLayout";
import PaediatricSurgicalProceduresDiagram from "@/components/diagrams/PaediatricSurgicalProceduresDiagram";
import CaudalBlockDiagram from "@/components/diagrams/CaudalBlockDiagram";
import { DiagramSection } from "@/components/DiagramSection";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { paediatricAnaesthesiaQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const PaediatricAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="Paediatric Anaesthesia" subtitle="FRCA / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anatomical & Physiological Differences</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Children are not small adults: differences in airway anatomy, respiratory mechanics, rate-dependent cardiac output, thermoregulation, and drug handling all translate into distinct anaesthetic priorities. The table below summarises the system-by-system contrasts that drive equipment choice, monitoring, and emergency response in paediatric practice.
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

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ETT Size & Drug Doses</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">ETT Sizing</p>
              <p className="text-sm text-muted-foreground mt-1">Uncuffed: age/4 + 4. Cuffed: age/4 + 3.5. Length (oral): age/2 + 12 cm. Neonate: 3.0–3.5 mm (term).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Key Drug Doses</p>
              <p className="text-sm text-muted-foreground mt-1">Propofol: 3–5 mg/kg (neonates need more per kg). Suxamethonium: 2 mg/kg IV (children have ↑Vd). Atropine: 20 µg/kg. Adrenaline: 10 µg/kg (cardiac arrest).</p>
            </div>
          </div>
        </div>

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

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Paediatric Surgical Procedures</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Five exam-favourite paediatric procedures, each illustrating a different anaesthetic principle — sepsis & coagulopathy (NEC), correcting electrolytes before surgery (pyloric stenosis), shared & ductal-dependent airway physiology (TOF), time-critical theatre access (testicular torsion), and spontaneous-ventilation airway management (inhaled foreign body). Click each site on the diagram below to explore.
          </p>
          <PaediatricSurgicalProceduresDiagram />
        </div>

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
              <p className="font-semibold text-foreground text-sm">Adjuncts (extend duration ~50–100%)</p>
              <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-0.5">
                <li><strong className="text-foreground">Clonidine</strong> 1–2 µg/kg — most evidence; risk of sedation/hypotension</li>
                <li><strong className="text-foreground">Dexmedetomidine</strong> 1 µg/kg — emerging evidence, less hypotension</li>
                <li><strong className="text-foreground">Ketamine</strong> (preservative-free) 0.5 mg/kg — concerns over neurotoxicity, falling out of favour</li>
                <li><strong className="text-foreground">Morphine</strong> (preservative-free) 30 µg/kg — long duration but late respiratory depression; HDU monitoring required</li>
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-lg border-l-4 border-destructive bg-destructive/5 mt-3">
            <p className="font-semibold text-foreground text-sm">Complications &amp; cautions</p>
            <p className="text-sm text-muted-foreground mt-1">
              Dural puncture (dura ends as low as S3–S4 in neonates), intravascular injection (always use a test dose with adrenaline 0.5 µg/kg — look for ↑HR, T-wave changes), intra-osseous injection, total spinal, urinary retention, transient motor block. Absolute contraindications: parental refusal, local infection, coagulopathy, raised ICP, spina bifida overlying the hiatus, sacral abnormalities (e.g. dimple, hairy patch).
            </p>
          </div>
        </DiagramSection>

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
      </section>

      <KeyLearningPoints points={[
        "Neonatal cardiac output is rate-dependent — bradycardia is a haemodynamic emergency",
        "High O₂ consumption + low FRC = rapid desaturation; pre-oxygenation essential",
        "ETT size: uncuffed = age/4 + 4; cuffed = age/4 + 3.5",
        "Pyloric stenosis: correct the alkalosis first — it is a medical, not surgical, emergency",
        "Use isotonic balanced crystalloids for maintenance — never hypotonic solutions in children",
        "'Remi-prop' TIVA is ideal for shared-airway, MRI and MH-susceptible children — keep propofol <4 mg/kg/hr to avoid PRIS",
        "PCA from ~5 yr; below that use NCA. Never codeine <12 yr; never tramadol post-tonsillectomy for OSA",
        "Caudal block: Armitage 0.5/1.0/1.25 ml/kg of 0.25% bupivacaine for sacral/lumbar/thoracic spread; always test-dose for intravascular placement",
      ]} />

      <QuizSection questions={paediatricAnaesthesiaQuestions} />
      <ReferencesList topicId="paediatric-anaesthesia" />

      <SeeAlso topicId="paediatric-anaesthesia" />
        <TopicCompletionToggle topicId="paediatric-anaesthesia" topicTitle="Paediatric Anaesthesia" />
    </SectionLayout>
  );
};

export default PaediatricAnaesthesiaTopic;
