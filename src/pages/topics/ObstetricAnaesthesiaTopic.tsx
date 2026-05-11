import { TopicTemplate } from "@/components/TopicTemplate";
import { obstetricAnaesthesiaQuestions } from "@/data/quizzes";
import PlacentalDrugTransferDiagram from "@/components/diagrams/PlacentalDrugTransferDiagram";
import PregnancyPhysiologyDiagram from "@/components/diagrams/PregnancyPhysiologyDiagram";
import PostpartumLegWeaknessDecisionTree from "@/components/diagrams/PostpartumLegWeaknessDecisionTree";
import { Cat1RSIAnimation } from "@/components/diagrams/Cat1RSIAnimation";
import { DiagramSection } from "@/components/DiagramSection";
import { Exam } from "@/data/curriculum";

const ObstetricAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Obstetric Anaesthesia"
      subtitle="FRCA / FFICM — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="obstetric-anaesthesia"
      topicTitle="Obstetric Anaesthesia"
      quizQuestions={obstetricAnaesthesiaQuestions}
      objectives={[
        "Describe the major physiological changes of pregnancy and their anaesthetic implications",
        "Plan a safe spinal, epidural top-up, or RSI GA for caesarean section using appropriate doses and targets",
        "Recognise and manage major obstetric emergencies (PPH, severe pre-eclampsia, AFE, failed intubation)",
        "Apply OAA/AAGBI 2020 principles to GA for Cat 1 LSCS (pre-ox, RSI, MAC, awareness prevention)",
        "Triage postpartum leg weakness — distinguish neuraxial red flags from intrinsic obstetric nerve palsies",
      ]}
      keyPoints={[
        "Pregnancy: ↑CO 40%, ↓FRC 20%, ↑O₂ consumption — rapid desaturation on apnoea",
        "Spinal for CS: heavy bupivacaine + fentanyl + diamorphine, target T4, phenylephrine infusion",
        "PPH: commonest cause is uterine atony — oxytocin → ergometrine → carboprost → surgical",
        "Pre-eclampsia: MgSO₄ 4g bolus for seizure prophylaxis; definitive treatment is delivery",
        "PIEB epidural technique provides better analgesia and satisfaction than continuous infusion",
        "Cat 1 GA: target ≥1.0 MAC pre-delivery + processed EEG — obstetric GA is highest awareness-risk group (NAP5)",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CL_BK_07"] },
        diagrams: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CL_BK_07"] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CL_BK_07"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2019", "OAA/DAS 2015", "MBRRACE-UK"],
        diagrams: ["BJA Educ 2019", "OAA/DAS 2015"],
        keyPoints: ["BJA Educ 2019", "OAA/DAS 2015", "MBRRACE-UK"],
      }}
      coreConcepts={
        <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Physiological Changes of Pregnancy</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Pregnancy alters virtually every organ system, and the resulting changes shape every aspect of obstetric anaesthetic practice — from rapid desaturation on apnoea to exaggerated hypotension after neuraxial blockade and reduced local anaesthetic dose requirements. The table below summarises the changes by system alongside their anaesthetic implications.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">System</th>
                  <th className="text-left py-2 text-foreground font-semibold">Change</th>
                  <th className="text-left py-2 text-foreground font-semibold">Anaesthetic Implication</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CVS</td><td>CO ↑40% (↑SV &amp; HR), SVR ↓, aortocaval compression from ~20 wk</td><td>Left lateral tilt 15°; rapid hypotension with neuraxial; supine hypotensive syndrome</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Resp</td><td>FRC ↓20% (diaphragmatic splinting), O₂ consumption ↑20%, MV ↑50% (driven by ↑V<sub>T</sub>, RR ~unchanged)</td><td>Rapid desaturation on apnoea; <strong>compensated respiratory alkalosis</strong> — PaCO₂ ~4.0 kPa, HCO₃⁻ ~20 mmol/L, pH ~7.44 (target normocapnia for pregnant baseline, not 5.3 kPa)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Airway</td><td>Mucosal oedema, capillary engorgement, full dentition, breast enlargement</td><td>Higher Mallampati grade, smaller ETT (6.0–7.0), short-handle laryngoscope; failed intubation ~1:300</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">GI</td><td>Reduced LOS tone (progesterone), gastric emptying preserved in pregnancy but <strong>delayed in labour/with opioids</strong>, ↑gastric acid</td><td>Full-stomach precautions for any pregnant woman ≥16–18 wk; aspiration prophylaxis &amp; RSI for GA caesarean</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Haem</td><td>Plasma vol ↑45% &gt; RBC ↑20% → dilutional anaemia. Hypercoagulable: ↑fibrinogen, ↑factors VII/VIII/X, ↓protein S, ↓fibrinolysis. Physiological leucocytosis.</td><td>VTE prophylaxis throughout pregnancy and 6 wk post-partum; raised WCC alone does not imply infection</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Renal / Hepatic</td><td>GFR ↑50% (↓urea, ↓creatinine — "normal" Cr in pregnancy &lt;75 µmol/L). ↓Albumin → ↑free fraction of bound drugs. ALP ↑ (placental).</td><td>Renally cleared drugs (e.g. magnesium, low-MW heparins) cleared faster; "normal" adult Cr may signal AKI in pregnancy</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Pharmacology</td><td><strong>Plasma cholinesterase activity ↓25–30%</strong> but Vd ↑ → suxamethonium duration <strong>clinically unchanged</strong>. ↓MAC ~30%. ↑Sensitivity to LA (~30%).</td><td>Standard sux dose (1.5 mg/kg) remains effective; reduce LA neuraxial doses; risk of awareness if MAC mis-targeted</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Neuro</td><td>Engorged epidural veins (↓epidural space volume), ↓CSF volume, ↑progesterone &amp; β-endorphins</td><td>Lower spinal/epidural doses (~30–40% reduction), higher intravascular catheter / bloody tap risk</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <DiagramSection
          title="Pregnancy Physiology — Interactive Summary"
          intro="Click a system on the silhouette (or the chip row) to see direction, magnitude and the key anaesthetic implication for each major change."
        >
          <PregnancyPhysiologyDiagram />
        </DiagramSection>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthesia for Caesarean Section</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Spinal (Gold Standard)</p>
              <p className="text-sm text-muted-foreground mt-1">Heavy bupivacaine 0.5% 2.2–2.6 ml + fentanyl 15 µg + diamorphine 0.3 mg. Target block T4. Left lateral tilt 15°. Phenylephrine infusion to prevent hypotension.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">General Anaesthesia</p>
              <p className="text-sm text-muted-foreground mt-1">Reserved for failed/contraindicated neuraxial, time-critical Cat 1, or maternal refusal. RSI with cricoid pressure. Significant airway and aspiration risk — failed intubation ~1:300, awareness 1:670 (NAP5).</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">GA for Category 1 LSCS — Step-by-Step Conduct</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Category 1 caesarean = immediate threat to maternal/fetal life; decision-to-delivery interval (DDI) target &lt;30 min, with most units aiming for &lt;15 min. GA is chosen when there is no functioning epidural and there is insufficient time for spinal, when neuraxial is contraindicated (coagulopathy, sepsis at site, severe maternal cardiac disease, refusal), or when neuraxial has failed. The OAA/AAGBI 2020 guideline and MBRRACE reports emphasise team-based preparation and meticulous airway management.
          </p>

          <div className="mb-4">
            <Cat1RSIAnimation />
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">1 · Preparation (in parallel with transfer)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Call for senior help; declare Cat 1; brief team (WHO, allergies, weight, airway).</li>
                <li>Two large-bore IVs, group &amp; save / crossmatch, FBC, coag, point-of-care Hb/lactate.</li>
                <li>Aspiration prophylaxis: <strong>30 ml 0.3M sodium citrate PO</strong>, ranitidine 50 mg IV (or omeprazole 40 mg IV), metoclopramide 10 mg IV if time allows.</li>
                <li>Difficult-airway trolley, videolaryngoscope, second-generation SAD, bougie, smaller ETTs (6.0–6.5).</li>
                <li>Pre-drawn drug tray: induction agent, sux, phenylephrine 100 µg/ml, oxytocin 5 IU, ephedrine, atropine, magnesium, antibiotic.</li>
                <li>Position: 15° left lateral tilt or manual uterine displacement, ramped (HELP) position for obese patients.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">2 · Pre-oxygenation</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Tight-fitting mask, 100% O₂ for 3 min OR 8 vital-capacity breaths if extreme urgency. Target end-tidal O₂ &gt;90%.</li>
                <li>Consider <strong>HFNO/THRIVE</strong> as adjunct (does not replace standard pre-ox in obstetrics; evidence still emerging — OptimISE trial).</li>
                <li>Surgeon scrubbed, prepped and draped <em>before</em> induction — knife on skin only after intubation confirmed.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">3 · Induction (RSI)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Induction agent: <strong>thiopentone 5–7 mg/kg</strong> or <strong>propofol 2–2.5 mg/kg</strong> (see evidence section below).</li>
                <li>Neuromuscular blocker: <strong>suxamethonium 1.5 mg/kg</strong> (use actual body weight); <strong>rocuronium 1.0–1.2 mg/kg</strong> with sugammadex 16 mg/kg available is an accepted alternative (faster intubating conditions, longer duration; useful if sux contraindicated).</li>
                <li>Cricoid pressure: 10 N awake → 30 N at loss of consciousness; release if view is poor or if vomiting occurs.</li>
                <li>Cuffed ETT 6.5–7.0 (mucosal oedema), confirm with ETCO₂ and bilateral auscultation.</li>
                <li>Follow DAS obstetric failed-intubation algorithm; declare early, prioritise oxygenation, decide whether to wake or proceed based on maternal/fetal status.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">4 · Maintenance &amp; intra-operative targets</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>O₂/air (FiO₂ 0.5) + volatile, OR TIVA (see below).</li>
                <li><strong>Target MAC:</strong> remember pregnancy ↓ MAC by ~30%.</li>
                <li>Maintain normocapnia (ETCO₂ ~4.0 kPa — pregnant baseline), normothermia, normotension.</li>
                <li>Use <strong>processed EEG (BIS/E-Entropy) — strongly recommended</strong> (NAP5: obstetric GA is highest awareness-risk population).</li>
                <li>Phenylephrine infusion 25–50 µg/min titrated to baseline SBP; avoid prolonged hypotension.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">5 · After delivery</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Slow IV oxytocin 5 IU (or 3 IU per MBRRACE/cardiac patients), then infusion 10 IU/h.</li>
                <li>Now safe to give <strong>opioids</strong> (fentanyl 1–2 µg/kg, morphine 0.1–0.15 mg/kg) — no longer concerned about neonatal depression.</li>
                <li>Antibiotics (co-amoxiclav or cefuroxime + metronidazole) if not pre-induction.</li>
                <li>Consider TAP / quadratus lumborum block or wound catheter for analgesia.</li>
                <li>Extubate awake, lateral position, full reversal confirmed (TOF ratio &gt;0.9).</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Target MAC at Different Phases</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            MAC requirement falls by ~25–40% in pregnancy (progesterone, β-endorphins). However, awareness risk is greatest in the brief pre-delivery period when opioids are usually withheld. The compromise is to run <strong>≥1.0 age-adjusted MAC of volatile from induction until delivery</strong>, accepting some uterine relaxation, then deepen further once the baby is out.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Phase</th>
                  <th className="text-left py-2 text-foreground font-semibold">Target end-tidal MAC</th>
                  <th className="text-left py-2 text-foreground font-semibold">Rationale</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Induction → uterine incision</td><td>≥1.0 MAC sevoflurane (~2%) or iso ~1.2%</td><td>Prevent awareness; brief volatile exposure has minimal neonatal effect.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Uterine incision → delivery</td><td>0.75–1.0 MAC</td><td>Limit uterine relaxation/PPH risk; keep BIS 40–60.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">After delivery</td><td>0.5–0.75 MAC + opioid + N₂O 50% (if used)</td><td>Reduce volatile to support uterine tone; opioids now safe.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Major PPH</td><td>↓ volatile to ≤0.5 MAC, switch to TIVA / midazolam top-ups</td><td>Volatile worsens atony; maintain anaesthesia with IV agents + scalp/processed EEG.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">MAC values quoted are age-adjusted; reduce further for elderly, frail, severe pre-eclampsia, magnesium therapy, or shock.</p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Propofol vs Thiopentone — Evidence</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Thiopentone was the historical default but global supply issues and familiarity have driven a shift to propofol in many UK units. The OAA/AAGBI 2020 guideline accepts <strong>either agent</strong>, provided the anaesthetist is experienced with the dose used.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Aspect</th>
                  <th className="text-left py-2 text-foreground font-semibold">Thiopentone 5–7 mg/kg</th>
                  <th className="text-left py-2 text-foreground font-semibold">Propofol 2–2.5 mg/kg</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Onset / intubating conditions</td><td>~30 s, predictable</td><td>~30 s, equivalent</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Awareness risk</td><td>Higher with under-dosing (NAP5 — most reported obstetric awareness cases used thiopentone, often &lt;5 mg/kg)</td><td>Lower at equipotent dose; titration easier</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Haemodynamics</td><td>Less hypotension; useful in haemorrhage</td><td>More hypotension &amp; cardiac depression — caution in shock/severe PET</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Neonatal Apgar / cord gases</td><td>No clinically significant difference (Cochrane 2020)</td><td>Equivalent neonatal outcomes</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Practical</td><td>Reconstitution required, syringe swap risk (Wrong drug — NAP5)</td><td>Ready-mixed, familiar from non-obstetric practice; allows seamless TIVA</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Anaphylaxis</td><td>~1:30,000</td><td>~1:60,000; fewer cross-reactions</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>Bottom line:</strong> No outcome difference for mother or baby in head-to-head RCTs (Lucas 2013; Houthoff Khemlani 2018; Cochrane 2020). Choose the drug you can dose confidently. If using propofol, use ≥2 mg/kg (lean body weight, not actual) — under-dosing is the dominant awareness mechanism.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">TIVA for Emergency LSCS</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            TIVA (propofol + remifentanil TCI) is increasingly used for obstetric GA when volatile is undesirable — major PPH (uterine atony exacerbated by volatile), malignant hyperthermia susceptibility, severe asthma/bronchospasm, transfer/MRI environments, or anaesthetist preference.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Advantages</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Preserves uterine tone — useful in PPH/atony.</li>
                <li>Smooth haemodynamics with TCI titration.</li>
                <li>Reduced PONV; reliable after-delivery analgesia with remifentanil.</li>
                <li>Avoids OT pollution; usable in MRI/remote sites.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Disadvantages / cautions</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Awareness risk</strong> (NAP5 highlighted TIVA + NMB in obstetrics) — processed EEG mandatory.</li>
                <li>Pharmacokinetic models (Marsh, Schnider) <em>not validated in pregnancy</em> — Vd and clearance altered.</li>
                <li>Remifentanil crosses placenta → transient neonatal respiratory depression (usually short-lived; have neonatologist present).</li>
                <li>IV access reliability: backup line essential.</li>
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-secondary/30 border border-border mt-3">
            <p className="font-semibold text-foreground text-sm">Suggested regimen</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li><strong>Induction:</strong> propofol 2–2.5 mg/kg + sux 1.5 mg/kg (RSI). Some use remifentanil bolus 0.5–1 µg/kg pre-induction — see opioid section.</li>
              <li><strong>Maintenance:</strong> propofol TCI (Schnider) Ce 4–6 µg/ml + remifentanil TCI (Minto) Ce 3–5 ng/ml. Titrate to BIS 40–60.</li>
              <li><strong>After delivery:</strong> add long-acting opioid (morphine/fentanyl), reduce remifentanil, give oxytocin.</li>
              <li>Always run <strong>BIS or Entropy</strong>; consider isolated forearm technique if very high awareness risk.</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Opioids on Induction — Pros &amp; Cons</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Traditional UK practice has been to <em>withhold</em> opioids until after delivery to avoid neonatal respiratory depression. However, omission causes exaggerated hypertensive response to laryngoscopy — particularly dangerous in pre-eclampsia, cardiac disease, or raised ICP.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Advantages</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Blunts pressor response — protects against intracranial haemorrhage in severe PET (NICE/MBRRACE).</li>
                <li>Reduces awareness risk by smoothing induction depth.</li>
                <li>Allows lower induction-agent dose (less maternal hypotension).</li>
                <li>Specific indications: severe pre-eclampsia, aortic disease, intracranial pathology, cardiac disease, phaeochromocytoma.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Disadvantages</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Placental transfer → <strong>transient neonatal respiratory depression</strong> (especially fentanyl/morphine; remifentanil shortest-lived).</li>
                <li>Need experienced neonatal team at delivery, ready to support ventilation / give naloxone.</li>
                <li>Maternal chest-wall rigidity with high-dose remifentanil bolus — can impair ventilation pre-intubation.</li>
                <li>Maternal bradycardia / hypotension.</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>Practical doses:</strong> alfentanil 10 µg/kg, fentanyl 1–2 µg/kg, or remifentanil 0.5–1 µg/kg over 30 s pre-induction. Always <em>warn the neonatal team</em>. Increasingly endorsed by OAA/AAGBI 2020 for high-risk groups.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Rapid Sequence Spinal (RSS)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Described by <strong>Kinsella (2010)</strong> and now incorporated into OAA guidance, RSS is a streamlined spinal technique for Cat 1 LSCS where neuraxial is feasible but every minute matters. The aim is to avoid GA without significantly extending DDI.
          </p>
          <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="font-semibold text-foreground text-sm">Key elements</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>No-touch technique, <strong>single attempt</strong> — convert to GA if unsuccessful.</li>
              <li>Limit/omit aseptic drape time; consider chlorhexidine spray + sterile gloves only.</li>
              <li>Pre-prepared spinal pack and drug syringe.</li>
              <li>Allow <strong>surgical start before full block height confirmed</strong> (with consent / clear pre-brief).</li>
              <li>Omit intrathecal opioid if it will delay; can give IV/epidural opioid later.</li>
              <li>Vasopressor running before injection.</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong>Evidence:</strong> Kinsella's case series (n=25) and subsequent UK audits show RSS achieves anaesthesia in 5–7 min with high success and no documented intra-operative pain when applied to selected patients. <strong>Kathirgamanathan 2013</strong> and the <strong>RSS Delphi consensus (Mushambi/Kinsella 2017)</strong> support its use as a recognised technique. No RCT vs GA exists; choice should be patient- and team-specific.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Suggested Neuraxial Doses by Indication</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Doses below are typical UK practice for an average-sized parturient; titrate down for short stature, severe pre-eclampsia, or cardiac disease. Always check local protocols.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Indication</th>
                  <th className="text-left py-2 text-foreground font-semibold">Spinal (intrathecal)</th>
                  <th className="text-left py-2 text-foreground font-semibold">Epidural top-up (existing labour catheter)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border align-top">
                  <td className="py-2 font-medium text-foreground">Emergency LSCS (Cat 1/2)</td>
                  <td>Heavy bupivacaine 0.5% <strong>2.2–2.6 ml</strong> + fentanyl <strong>15 µg</strong> + diamorphine <strong>300 µg</strong> (or morphine 100 µg). Target T4.</td>
                  <td><strong>2% lidocaine 20 ml + 1:200,000 adrenaline (100 µg) + fentanyl 100 µg + 8.4% bicarbonate 2 ml</strong> — onset 5–8 min. Alt: 0.5% levobupivacaine 15–20 ml (slower, 10–15 min). Always test dose; titrate in 5 ml aliquots.</td>
                </tr>
                <tr className="border-b border-border align-top">
                  <td className="py-2 font-medium text-foreground">Instrumental delivery (forceps/ventouse)</td>
                  <td>Heavy bupivacaine 0.5% <strong>1.5–2.0 ml</strong> + fentanyl 15 µg (saddle/low spinal). Target T10.</td>
                  <td>0.25% levobupivacaine or bupivacaine <strong>10–15 ml</strong> ± fentanyl 50–100 µg. Sit upright if perineal block needed.</td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 font-medium text-foreground">Repair of perineal tear / retained products</td>
                  <td>Heavy bupivacaine 0.5% <strong>1.0–1.5 ml</strong> (saddle block) + fentanyl 10–15 µg. Target S2–L1.</td>
                  <td>0.25% levobupivacaine <strong>10 ml</strong> with patient sitting, or low-volume 2% lidocaine 10 ml + fentanyl 50 µg.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Always: aspirate before injection, give as fractionated dose, monitor BP/HR continuously, have vasopressor and induction drugs immediately available, and confirm block height with cold/pinprick to T4 (or appropriate target) before incision. For epidural top-up the "<strong>20:20</strong> rule" — 20 ml lidocaine mix taking ~20 min — is a useful aide-mémoire; use 2% lidocaine + adrenaline + bicarbonate for fastest onset.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Obstetric Emergencies</h2>
          <div className="space-y-3">
            {[
              { emergency: "Major Obstetric Haemorrhage", key: "Antepartum (placenta praevia, abruption) or postpartum (uterine atony — commonest cause). Massive transfusion protocol. Uterotonic escalation: oxytocin → ergometrine → carboprost → misoprostol. Surgical: B-Lynch suture, balloon tamponade, hysterectomy." },
              { emergency: "Pre-eclampsia / Eclampsia", key: "BP ≥140/90 + proteinuria after 20 weeks. Severe: BP ≥160/110, HELLP syndrome. IV MgSO₄ (4g bolus, 1g/hr) for seizure prophylaxis. Labetalol/hydralazine for BP. Definitive treatment: delivery." },
              { emergency: "Amniotic Fluid Embolism", key: "Sudden cardiovascular collapse + hypoxia + DIC during labour or CS. Incidence ~1:40,000. Mortality 20–60%. Treatment: supportive — intubation, vasopressors, blood products for DIC." },
              { emergency: "Category 1 Caesarean Section", key: "Decision-to-delivery interval <30 minutes (ideally <15 min). If no existing epidural, spinal preferred if feasible. GA if time-critical. Pre-prepared drug trays essential." },
            ].map((e) => (
              <div key={e.emergency} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{e.emergency}</p>
                <p className="text-sm text-muted-foreground mt-1">{e.key}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Obstetric Medicine &amp; Labour Management for the Anaesthetist</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            A working knowledge of antenatal medicine and the obstetric conduct of labour underpins safe anaesthetic decision-making — it dictates timing of neuraxial blockade, choice of induction agent, vasopressor strategy, transfusion thresholds and post-partum disposition. The summary below is curated from MBRRACE-UK reports, NICE NG121/NG133/NG3, RCOG Green-top guidelines and the OAA/AAGBI guidance.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Antenatal conditions with anaesthetic implications</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Condition</th>
                  <th className="text-left py-2 text-foreground font-semibold">Obstetric management</th>
                  <th className="text-left py-2 text-foreground font-semibold">Anaesthetic relevance</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Pre-eclampsia / HELLP</td><td>Labetalol/nifedipine/hydralazine; MgSO₄ 4 g load + 1 g/h for severe PET or eclampsia; aim BP &lt;140/90; deliver by 37 wk (earlier if severe).</td><td>Early epidural (improves placental flow, avoids GA airway); platelets ≥75 ×10⁹/L &amp; normal coag for neuraxial; obtund pressor response at GA induction (remi/alfentanil); MgSO₄ potentiates NMBs; avoid ergometrine (severe HTN).</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Gestational / pre-existing diabetes</td><td>Insulin infusion in labour to maintain CBG 4–7 mmol/L; planned delivery 37–38⁺⁶ wk if on therapy.</td><td>Avoid glucose-containing co-load; continue VRIII intra-op; macrosomia → shoulder dystocia / instrumental risk; neonatal hypoglycaemia.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cardiac disease (mWHO II–IV)</td><td>MDT planning, joint cardiac-obstetric clinic, controlled vaginal delivery usually preferred over CS; assisted second stage to avoid Valsalva.</td><td>Slow-titrated epidural (avoid spinal hypotension); invasive monitoring for severe lesions; avoid ergometrine (pulmonary HTN, HOCM); careful fluid balance — cardiac output peaks immediately post-partum from auto-transfusion.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">VTE / thromboprophylaxis</td><td>RCOG GTG-37a risk-score; LMWH antenatal &amp; for 6 wk post-partum if intermediate/high risk.</td><td>Neuraxial timing: 12 h after prophylactic, 24 h after therapeutic LMWH; remove catheter ≥12 h after last dose, next dose ≥4 h post-removal.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Obstetric sepsis</td><td>Sepsis-6 within 1 h; broad-spectrum antibiotics (e.g. piperacillin-tazobactam ± gentamicin); deliver if intrauterine source.</td><td>Coagulopathy &amp; bacteraemia may preclude neuraxial; consider GA or remifentanil PCA; vasopressor + invasive monitoring; leading direct cause of maternal death (MBRRACE).</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Obstetric cholestasis / AFLP</td><td>UDCA; deliver 37–38 wk for ICP; immediate delivery for AFLP.</td><td>Coagulopathy in AFLP — check INR/fibrinogen before neuraxial; hypoglycaemia.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Placenta praevia / accreta spectrum</td><td>Elective CS 36–37 wk; MDT with interventional radiology; cell salvage available.</td><td>Large-bore access × 2, group-and-save / cross-match 4 units, activate MHP pathway; regional feasible but convert to GA early if massive haemorrhage.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Mental health / substance misuse</td><td>Perinatal mental health team; opioid substitution continued through labour.</td><td>Leading <strong>indirect</strong> cause of maternal death (MBRRACE); higher analgesic requirements; naloxone caution in opioid-dependent women.</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mt-5 mb-2">Conduct &amp; stages of labour</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">First stage (latent → active)</p>
              <p className="text-sm text-muted-foreground mt-1">Latent: irregular contractions, cervix &lt;4 cm. Active: regular contractions, ≥4 cm dilatation, expected ~0.5 cm/h (nullip) / 1 cm/h (multip). Intermittent auscultation for low-risk; continuous CTG for high-risk. Anaesthetic: site epidural early once active labour established and woman requests; review any high-risk plan.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Second stage</p>
              <p className="text-sm text-muted-foreground mt-1">Full dilatation → delivery. Passive (descent) then active (pushing). Prolonged: &gt;2 h nullip / &gt;1 h multip with epidural add 1 h. Anaesthetic: top-up for instrumental delivery (lidocaine 2% + adrenaline ± bicarbonate, or low-dose CSE); avoid dense motor block early.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Third stage &amp; active management</p>
              <p className="text-sm text-muted-foreground mt-1">Delivery of placenta. <strong>Active management</strong> (oxytocin 10 IU IM / 5 IU slow IV at delivery, controlled cord traction, uterine massage) reduces PPH by ~60%. Ergometrine 500 µg IM <strong>contraindicated</strong> in HTN/PET/cardiac disease. Carboprost (250 µg IM, max 8) avoid in asthma; misoprostol 800 µg PR adjunct.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Induction &amp; augmentation</p>
              <p className="text-sm text-muted-foreground mt-1">Indications: post-dates ≥41 wk, PROM, diabetes, IUGR, IUD. Methods: membrane sweep → vaginal prostaglandin (dinoprostone) or oral misoprostol → ARM → oxytocin infusion (start 1–4 mU/min, titrate). Anaesthetic: oxytocin causes vasodilatation and tachycardia; <strong>bolus &gt;5 IU</strong> can precipitate severe hypotension — give 3 IU slow IV at CS (NICE).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Fetal monitoring</p>
              <p className="text-sm text-muted-foreground mt-1">CTG (DR-C-BRA-VADO): Baseline 110–160, variability 5–25, accelerations reassuring, decelerations classified (early/variable/late). Pathological CTG → fetal blood sampling (pH ≥7.25 normal; ≤7.20 deliver). Anaesthetic should anticipate Cat-1 CS when CTG deteriorates.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Categories of caesarean (RCOG)</p>
              <p className="text-sm text-muted-foreground mt-1"><strong>Cat 1</strong>: immediate threat to life — DDI &lt;30 min (audit standard); GA or rapid spinal/epidural top-up. <strong>Cat 2</strong>: maternal/fetal compromise not immediately life-threatening — DDI &lt;75 min. <strong>Cat 3</strong>: needs early delivery, no compromise. <strong>Cat 4</strong>: elective.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Instrumental delivery</p>
              <p className="text-sm text-muted-foreground mt-1">Ventouse / forceps in theatre if mid-cavity or rotational ("trial"). Anaesthetic provides regional top-up to T10 (perineal block) — failed instrumental converts to CS, so plan for higher block.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Post-partum haemorrhage (PPH)</p>
              <p className="text-sm text-muted-foreground mt-1">≥500 ml vaginal / ≥1000 ml CS; major ≥1000 ml or ongoing. <strong>4 Ts</strong>: Tone (80%), Trauma, Tissue, Thrombin. Bundle: uterotonics ladder (oxytocin → ergometrine → carboprost → misoprostol), TXA 1 g within 3 h (WOMAN trial), bimanual compression, balloon tamponade, B-Lynch, IR embolisation, hysterectomy. Activate MHP; aim fibrinogen &gt;2 g/L (ROTEM-guided).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Immediate post-natal period</p>
              <p className="text-sm text-muted-foreground mt-1">Auto-transfusion ↑CO ~60–80% in first 10 min — risk of pulmonary oedema in cardiac/PET. Continue MgSO₄ 24 h post-delivery in severe PET. Restart LMWH 6–12 h post-delivery (later after PPH or epidural removal). Early mobilisation; analgesia ladder paracetamol + NSAID (avoid in severe PET / renal impairment) + opioid PRN.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Labour Analgesia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Epidural analgesia is the gold standard for labour pain. Low-dose combined spinal-epidural (CSE) provides rapid onset with minimal motor block. Remifentanil PCA is the principal IV alternative when neuraxial analgesia is contraindicated, declined or has failed.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Epidural</p>
              <p className="text-sm text-muted-foreground mt-1">Low-dose bupivacaine 0.1% + fentanyl 2 µg/ml. PIEB (programmed intermittent epidural bolus) superior to continuous infusion — better spread, less motor block, higher satisfaction.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Remifentanil PCA</p>
              <p className="text-sm text-muted-foreground mt-1">Bolus 30–40 µg, lockout 2 min, no background infusion. Requires 1:1 midwifery, continuous SpO₂ + capnography (or apnoea alarm), supplemental O₂ available, and naloxone at the bedside.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Remifentanil PCA for Labour Analgesia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Remifentanil is an ultra-short-acting μ-opioid agonist metabolised by non-specific plasma and tissue esterases (context-sensitive half-time ~3–4 min, independent of duration). Its rapid onset (≈30–60 s) and offset match the temporal profile of a uterine contraction better than any other systemic opioid, making it the preferred IV labour analgesic when an epidural is not possible. The RemiPCA SAFE Network registry and the UK <em>RESPITE</em> RCT (Wilson 2018) have defined contemporary practice.
          </p>

          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Standard regimen</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Bolus 30–40 µg</strong> on demand (some units titrate 20 → 40 µg)</li>
                <li><strong>Lockout 2 min</strong>; <strong>no background infusion</strong></li>
                <li>Dedicated IV cannula with anti-reflux/one-way valve</li>
                <li>Press button at start of contraction (peak effect ≈ peak pain)</li>
                <li>Stop ≥10 min before delivery if possible (neonatal safety)</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Mandatory monitoring (RCoA / OAA)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>1:1 midwifery</strong> for the entire duration</li>
                <li>Continuous <strong>SpO₂</strong> ± <strong>capnography / apnoea alarm</strong></li>
                <li>Supplemental O₂ and suction immediately available</li>
                <li><strong>Naloxone</strong> drawn up at the bedside</li>
                <li>Anaesthetist immediately contactable; sedation score, RR, pain score every 30 min</li>
                <li>CTG (remifentanil reduces fetal heart-rate variability)</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Indications</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Maternal refusal of epidural / needle phobia</li>
                <li>Coagulopathy or therapeutic anticoagulation (e.g. LMWH within window)</li>
                <li>Thrombocytopenia below local epidural threshold (typically platelets &lt; 70–80 ×10⁹/L)</li>
                <li>Severe spinal pathology, previous spinal surgery, or anatomy precluding neuraxial</li>
                <li>Failed or inadequate epidural where re-siting is not feasible</li>
                <li>Local sepsis at the back, raised ICP, or other neuraxial contraindication</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Advantages</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Rapid onset/offset matched to contraction cycle</li>
                <li>No motor block — woman remains mobile, can push effectively</li>
                <li>No risk of dural puncture, epidural haematoma/abscess or maternal hypotension</li>
                <li>Esterase metabolism — safe in renal and hepatic failure</li>
                <li>Useful when neuraxial declined, contraindicated or has failed</li>
                <li>Superior to pethidine (RESPITE trial: ~halves conversion to epidural)</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Contraindications &amp; cautions</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Inability to provide 1:1 midwifery and continuous SpO₂/capnography</li>
                <li>Recent long-acting opioid (e.g. pethidine, morphine, diamorphine within 4 h) — additive respiratory depression</li>
                <li>Maternal opioid sensitivity, severe OSA or respiratory compromise</li>
                <li>Inability to understand and operate the PCA handset</li>
                <li>Known remifentanil allergy</li>
                <li><strong>Caution:</strong> magnesium therapy (potentiates sedation), morbid obesity, pre-existing fetal compromise</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Adverse effects &amp; complications</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Maternal respiratory depression / apnoea</strong> and desaturation — most serious risk; case reports of cardiac arrest</li>
                <li>Sedation, nausea, vomiting, pruritus</li>
                <li>Reduced fetal heart-rate variability (usually transient, no Apgar effect)</li>
                <li>Transient neonatal respiratory depression if given close to delivery</li>
                <li>Often supplementary epidural still required (~30–40% conversion)</li>
                <li>Analgesic efficacy inferior to a working epidural</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Remifentanil PCA vs Epidural Analgesia</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left py-2 text-foreground font-semibold">Remifentanil PCA</th>
                  <th className="text-left py-2 text-foreground font-semibold">Epidural / CSE</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Analgesic efficacy</td><td>Moderate; pain scores ~30–40% reduction; declines in late first stage</td><td>Superior — gold standard, near-complete pain relief possible</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Onset / titration</td><td>30–60 s; self-titrated to each contraction</td><td>10–20 min for surgical block; PIEB maintenance</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Motor block / mobility</td><td>None — fully mobile, effective pushing</td><td>Low-dose mix preserves most motor function but mobility reduced</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Maternal haemodynamics</td><td>Minimal hypotension</td><td>Sympathetic block → hypotension; needs IV access + vasopressor</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Maternal respiratory risk</td><td><strong>Significant</strong> — apnoea/desaturation; needs 1:1 + SpO₂/capnography</td><td>Negligible respiratory depression at labour doses</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Neuraxial complications</td><td>None</td><td>PDPH (~1%), haematoma/abscess (rare), high block, LA toxicity</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fetal/neonatal effects</td><td>↓ FHR variability; transient neonatal respiratory depression near delivery</td><td>Minimal direct fetal effect; secondary effects of maternal hypotension</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Use for instrumental / CS</td><td>Cannot be converted — requires separate spinal/GA</td><td>Top-up provides surgical anaesthesia for instrumental delivery or CS</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Use in coagulopathy / anticoagulation</td><td>Safe</td><td>Contraindicated</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Staffing / resource</td><td>Dedicated 1:1 midwife, anaesthetic oversight</td><td>Anaesthetist required for siting and top-ups</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Evidence: <em>RESPITE</em> (Wilson, Lancet 2018) — remifentanil PCA halved epidural conversion vs pethidine but did not match epidural for pain relief; RemiPCA SAFE Network reports rare but real maternal apnoea events, all preventable with strict monitoring (Stocki 2014; Van de Velde 2016).</p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Labour &amp; Delivery After Intra-Uterine Fetal Death</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Intra-uterine fetal death (IUFD) is defined as fetal death in utero from ≥24 weeks' gestation (UK; WHO ≥28 weeks). It complicates ~1 in 200 UK pregnancies (MBRRACE). Vaginal delivery — usually after mifepristone priming and misoprostol induction — is preferred wherever maternally safe; caesarean is reserved for maternal indications (placenta praevia, prior classical CS, severe pre-eclampsia, sepsis with failed induction). The anaesthetist's priorities are <strong>compassionate analgesia</strong>, screening for the maternal complications that an in-utero death may herald (sepsis, DIC, pre-eclampsia, abruption), and safe neuraxial decision-making despite a possibly evolving coagulopathy.
          </p>

          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Why IUFD is a high-risk anaesthetic encounter</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Sepsis</strong> — chorioamnionitis may be the cause or the consequence of IUFD; risk rises sharply with retained fetus &gt; 48 h and with prolonged ruptured membranes</li>
                <li><strong>Coagulopathy / DIC</strong> — release of fetal thromboplastins from a retained dead fetus; risk ≈ 10% at 4 weeks, &gt;30% at 5 weeks of retention; accelerated by abruption or sepsis</li>
                <li><strong>Pre-eclampsia / HELLP</strong> — may be the precipitant of fetal demise; reassess BP, urinalysis, platelets, LFTs, urate on admission</li>
                <li><strong>Placental abruption / antepartum haemorrhage</strong> — concealed bleeding may be substantial; couvelaire uterus and DIC</li>
                <li><strong>Amniotic fluid embolism</strong> — rare but reported during induction of labour for IUFD</li>
                <li><strong>Psychological distress</strong> — bereaved, exhausted, often declining intervention; affects consent and cooperation</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Mandatory work-up on admission</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>FBC, coagulation screen (PT/APTT/<strong>fibrinogen</strong>), U&amp;E, LFTs, urate, group &amp; save (cross-match if bleeding/sepsis)</li>
                <li>CRP, lactate, blood cultures, MSU, HVS if any sepsis features; ViEWS/MEOWS observations</li>
                <li><strong>ROTEM/TEG</strong> if available — earliest detector of evolving DIC</li>
                <li>Repeat coag &amp; fibrinogen <strong>every 6–12 h</strong> while awaiting delivery (sooner if bleeding, sepsis, abruption, or retention &gt; 48 h)</li>
                <li>BP, urinalysis, platelets, LFTs to exclude pre-eclampsia/HELLP</li>
                <li>Anti-D if Rh-negative; VTE risk assessment (IUFD itself confers high VTE risk — LMWH unless imminent delivery / coagulopathy)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Coagulopathy of Retained Dead Fetus</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            A consumptive coagulopathy driven by tissue thromboplastin release from the dead fetus and placenta. Clinically silent in the first days, then progressive: ↓ fibrinogen, ↓ platelets, ↑ PT/APTT, ↑ D-dimer, micro-angiopathic film. <strong>Fibrinogen is the most sensitive single marker</strong> — in pregnancy "normal" fibrinogen is 4–6 g/L; a value of 2 g/L is already significantly low. Sepsis or abruption can collapse the timeline from weeks to hours. Correct with cryoprecipitate or fibrinogen concentrate (target &gt; 2 g/L), FFP for prolonged PT/APTT, platelets if &lt; 50 ×10⁹/L (or &lt; 75 prior to neuraxial), and tranexamic acid 1 g if active bleeding.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Sepsis Considerations</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Maternal sepsis remains a leading direct cause of UK maternal death (MBRRACE). In IUFD, suspect sepsis with maternal pyrexia, tachycardia, uterine tenderness, offensive liquor or rising CRP/lactate. Apply the <strong>Sepsis Six</strong> within 1 h, take cultures (including HVS and placental swabs at delivery), and give broad-spectrum antibiotics covering Group A Streptococcus, anaerobes and Gram-negatives (e.g. piperacillin–tazobactam ± gentamicin; add clindamycin if streptococcal toxic-shock features). Sepsis worsens DIC and is a relative contraindication to neuraxial blockade until source control and resuscitation are achieved.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Analgesia &amp; Anaesthesia</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Modality</th>
                  <th className="text-left py-2 text-foreground font-semibold">Considerations in IUFD</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Epidural / CSE</td>
                  <td>Preferred if coagulation, platelets and clinical picture permit. <strong>Check coag &amp; platelets within ~6 h before siting</strong> and again before catheter removal. Conventional thresholds: platelets ≥ 75–80 ×10⁹/L (and stable/rising), normal PT/APTT, fibrinogen ≥ 2 g/L, no clinical bleeding, no untreated bacteraemia.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Remifentanil PCA</td>
                  <td>Excellent fall-back when neuraxial is contraindicated by coagulopathy or sepsis — no fetal-compromise concerns now constrain dosing. Standard 1:1 midwifery + SpO₂/capnography monitoring still mandatory.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Systemic opioids (morphine, diamorphine, pethidine)</td>
                  <td>Useful — concerns about neonatal respiratory depression no longer apply. Combine with antiemetic; avoid pethidine in renal impairment.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Paracetamol ± NSAID</td>
                  <td>Paracetamol routinely. NSAID only if no bleeding, pre-eclampsia, renal impairment or coagulopathy.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">General anaesthesia (for CS)</td>
                  <td>Default if coagulopathic or septic. Standard obstetric RSI, but pre-induction opioid for haemodynamic stability is now appropriate (no viable fetus). Anticipate uterine atony, transfusion and DIC; activate the major-haemorrhage pathway early.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Conduct of Induced Labour</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4 leading-relaxed">
            <li><strong>Mifepristone 200 mg PO</strong> (priming, 24–48 h before) followed by <strong>misoprostol</strong> per RCOG Green-top 55 (dose tapers with gestation: 100 µg 6-hourly &gt; 27 wk; 25–50 µg 4-hourly at term)</li>
            <li>Reduce misoprostol dose and use mechanical methods (Foley) cautiously in women with previous CS — uterine rupture risk</li>
            <li>Continuous maternal observations; <strong>do not</strong> use routine CTG; bedside maternal monitoring (MEOWS), temperature 4-hourly</li>
            <li>Active third-stage management; have <strong>oxytocin, ergometrine, carboprost, tranexamic acid and a major-haemorrhage pathway primed</strong> — atony and PPH risk are high after prolonged induction and with coagulopathy</li>
            <li>Send placenta for histology and microbiology; cord blood, fetal samples and post-mortem per local bereavement pathway</li>
            <li>Bereavement care: dedicated midwife, quiet room, memory-making, chaplaincy as wished; clear documentation of consents</li>
          </ul>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Postnatal Anaesthetic Issues</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 leading-relaxed">
            <li><strong>VTE prophylaxis</strong>: IUFD is an independent VTE risk factor — restart LMWH as soon as coagulation permits and continue for at least 6 weeks post-partum (RCOG Green-top 37a)</li>
            <li>Ongoing surveillance for delayed PPH, endometritis, retained products and secondary DIC</li>
            <li>Lactation suppression (cabergoline 1 mg PO single dose) discussed sensitively</li>
            <li><strong>Psychological follow-up</strong>: bereavement midwife, perinatal mental-health team; document for future pregnancy planning</li>
            <li>Anaesthetic debrief and a clear plan for any subsequent pregnancy (high-risk clinic referral)</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">Sources: RCOG Green-top Guideline 55 (Late Intrauterine Fetal Death and Stillbirth); MBRRACE-UK Saving Lives, Improving Mothers' Care; OAA guidance on anaesthesia for the obstetric patient with coagulopathy.</p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Placental Drug Transfer</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The placenta is a lipid bilayer; drugs cross by passive diffusion governed by Fick's law. Four physicochemical properties determine transfer — molecular weight, lipid solubility, protein binding and degree of ionisation. The interactive plot below shows where common anaesthetic drugs sit.
          </p>
          <PlacentalDrugTransferDiagram />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postpartum Bladder, Bowel & Lower-Limb Neurological Symptoms After Neuraxial Block</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            New neurological symptoms after labour are common (transient deficits ~1 in 100–200 deliveries) but persistent neuraxial injury is rare (~1 in 24,000–50,000 per NAP3). Most postpartum nerve injuries are <strong>obstetric</strong> (compression/stretch from the fetal head, instrumental delivery, or lithotomy positioning) rather than caused by the epidural or spinal itself. The anaesthetist's role is structured assessment, exclusion of time-critical neuraxial pathology, and onward neurology/obstetric referral.
          </p>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Red flags — exclude cord/cauda equina pathology urgently</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Vertebral canal haematoma and epidural abscess are surgical emergencies — irreversible damage occurs within ~8 h of cord compression. Suspect and image (urgent MRI within 4 h of suspicion) if any of:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
            <li><strong>Block that fails to regress</strong> by 4 h after last epidural top-up (or by expected duration of spinal)</li>
            <li><strong>Recurrence</strong> of dense motor/sensory block after initial recovery</li>
            <li><strong>Bilateral</strong> leg weakness, saddle anaesthesia, painless urinary retention with overflow, faecal incontinence, loss of anal tone</li>
            <li><strong>Severe back pain</strong> with fever, raised inflammatory markers, or progressive neurology (abscess); coagulopathy, recent LMWH or difficult/bloody insertion (haematoma)</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Action: stop epidural infusion, neurological examination (power, sensation, reflexes, perianal sensation, anal tone, post-void residual), check coagulation, urgent MRI whole spine, contact on-call neurosurgery. Do <em>not</em> wait for neurology opinion before imaging.
          </p>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Postpartum bladder dysfunction</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Covert postpartum urinary retention affects up to 15% of women; overt retention 1–5%. Risk factors: epidural/spinal, prolonged second stage, instrumental delivery, episiotomy, primiparity, large baby, perineal trauma. Mechanism is multifactorial — bladder over-distension, parasympathetic disruption, perineal pain, and (for neuraxial) residual block of S2–S4.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
            <li><strong>Routine practice</strong>: document spontaneous void within 6 h of delivery or epidural removal; if not, bladder scan and in/out catheterise if &gt;500 ml</li>
            <li><strong>Persistent retention</strong> (residual &gt;150 ml after void, or unable to void): indwelling catheter for 24–48 h with free drainage, then trial without catheter; refer urogynaecology if fails</li>
            <li><strong>Suspect neuraxial cause</strong> if accompanied by saddle anaesthesia, leg weakness, or painless retention — image urgently as above</li>
          </ul>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Postpartum bowel dysfunction</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
            <li><strong>Constipation</strong>: extremely common — opioids (PCA, neuraxial diamorphine), iron, dehydration, perineal pain. Treat with laxatives, fluids, mobilisation</li>
            <li><strong>Faecal incontinence / urgency</strong>: usually due to <em>obstetric anal sphincter injury (OASI)</em> — third/fourth-degree tear, instrumental delivery, large baby. Refer perineal clinic</li>
            <li><strong>Loss of anal tone with saddle anaesthesia</strong>: cauda equina until proven otherwise — urgent MRI</li>
          </ul>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Lower-limb neurological symptoms — obstetric vs neuraxial</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Distribution and timing are key. <strong>Neuraxial injury</strong> tends to be bilateral, follows a dermatomal/myotomal pattern matching the level of insertion, and is present immediately on block resolution. <strong>Intrinsic obstetric palsies</strong> are typically unilateral, follow a peripheral nerve distribution, and are noticed when the woman first stands or mobilises.
          </p>

          <div className="overflow-x-auto -mx-4 px-4 mb-4">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left p-2 border-b border-border">Nerve / lesion</th>
                  <th className="text-left p-2 border-b border-border">Mechanism</th>
                  <th className="text-left p-2 border-b border-border">Motor</th>
                  <th className="text-left p-2 border-b border-border">Sensory</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="p-2 font-semibold text-foreground">Lumbosacral trunk (L4–L5)</td>
                  <td className="p-2">Compression by fetal head against pelvic brim — cephalopelvic disproportion, prolonged/obstructed labour, instrumental delivery. Most common intrinsic obstetric palsy.</td>
                  <td className="p-2">Foot drop (tibialis anterior, peronei); weak hip abduction</td>
                  <td className="p-2">Lateral calf, dorsum of foot</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-semibold text-foreground">Common peroneal</td>
                  <td className="p-2">External compression at fibular head from prolonged lithotomy / leg-rest pressure (often bilateral)</td>
                  <td className="p-2">Foot drop, weak eversion (inversion preserved — distinguishes from L5)</td>
                  <td className="p-2">Lateral calf, dorsum of foot</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-semibold text-foreground">Femoral</td>
                  <td className="p-2">Prolonged hyperflexion/abduction in lithotomy — compression under inguinal ligament</td>
                  <td className="p-2">Weak quadriceps (knee gives way), absent knee jerk; iliopsoas spared</td>
                  <td className="p-2">Anterior thigh, medial calf (saphenous)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-semibold text-foreground">Lateral cutaneous of thigh (meralgia paraesthetica)</td>
                  <td className="p-2">Compression at ASIS during lithotomy or by retractors at CS</td>
                  <td className="p-2">None (pure sensory)</td>
                  <td className="p-2">Burning/numbness over anterolateral thigh</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-semibold text-foreground">Obturator</td>
                  <td className="p-2">Compression in obturator canal by fetal head or forceps</td>
                  <td className="p-2">Weak hip adduction</td>
                  <td className="p-2">Medial thigh</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-semibold text-foreground">Sciatic</td>
                  <td className="p-2">Prolonged sitting on bedpan, malpositioning, hard surface</td>
                  <td className="p-2">Hamstrings + all below-knee weakness</td>
                  <td className="p-2">Posterior thigh, lower leg, foot</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-foreground">Pubic symphysis / SI joint dysfunction</td>
                  <td className="p-2">Relaxin-mediated ligamentous laxity, vaginal delivery</td>
                  <td className="p-2">Antalgic gait, painful weight-bearing — <em>not</em> true weakness</td>
                  <td className="p-2">Pelvic / groin pain, no sensory loss</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Features pointing to obstetric (not neuraxial) cause</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
            <li><strong>Unilateral</strong> deficit — neuraxial complications are usually bilateral or symmetrical</li>
            <li>Distribution matches a <strong>peripheral nerve</strong> rather than a dermatome/myotome</li>
            <li>Risk factors present: prolonged second stage &gt;2 h, instrumental delivery, lithotomy &gt;2 h, cephalopelvic disproportion, short stature, large baby</li>
            <li>Symptoms first noted on <strong>standing/mobilising</strong> rather than as the block wears off</li>
            <li>Block recovered fully and normally before symptoms appeared</li>
            <li>No back pain, no fever, no sphincter involvement</li>
          </ul>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Investigation & follow-up</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
            <li><strong>Bedside</strong>: detailed motor/sensory map, reflexes, perianal sensation, anal tone, bladder scan</li>
            <li><strong>Imaging</strong>: MRI spine if any red flag; MRI pelvis/lumbosacral plexus if persistent peripheral palsy</li>
            <li><strong>Nerve conduction / EMG</strong>: useful from ~3 weeks (allows Wallerian degeneration to develop) to localise lesion and prognosticate</li>
            <li><strong>Most obstetric palsies recover fully in 6–8 weeks</strong>; arrange neurology / obstetric anaesthesia follow-up and document on OAA Postpartum Neurological Symptom pathway</li>
            <li>Refer to physiotherapy; foot-drop splint if needed; safeguarding for falls/driving</li>
          </ul>

          <p className="text-muted-foreground leading-relaxed text-sm italic">
            Reference: OAA/RCoA <em>Management of postpartum nerve injuries</em> (2023); NAP3 (RCoA, 2009); Wong et al., <em>Anesthesiology</em> 2003 — incidence of postpartum nerve injury 0.92%.
          </p>
        </div>

        <DiagramSection
          title="Interactive: Postpartum Leg Weakness Decision Tree"
          intro="Use the 5-step walkthrough below to triage postpartum leg weakness or sensory disturbance — the tool flags time-critical neuraxial pathology requiring urgent MRI versus the much commoner intrinsic obstetric nerve palsies and musculoskeletal causes."
        >
          <PostpartumLegWeaknessDecisionTree />
        </DiagramSection>
        </section>
      }
    />
  );
};

export default ObstetricAnaesthesiaTopic;
