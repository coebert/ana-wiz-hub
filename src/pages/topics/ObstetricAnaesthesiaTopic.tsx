import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { obstetricAnaesthesiaQuestions } from "@/data/quizzes";
import PlacentalDrugTransferDiagram from "@/components/diagrams/PlacentalDrugTransferDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const ObstetricAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="Obstetric Anaesthesia" subtitle="FRCA / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
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
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CVS</td><td>CO ↑40%, SVR ↓, aortocaval compression</td><td>Left lateral tilt, rapid hypotension with neuraxial</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Resp</td><td>FRC ↓20%, O₂ consumption ↑20%, minute ventilation ↑50%</td><td>Rapid desaturation on apnoea, reduced respiratory alkalosis (PaCO₂ ~4 kPa)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">GI</td><td>Reduced LOS tone, delayed gastric emptying (labour)</td><td>Full stomach precautions, RSI for GA caesarean</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Haem</td><td>Dilutional anaemia, hypercoagulable state</td><td>VTE prophylaxis, physiological leucocytosis</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Neuro</td><td>Reduced LA requirement (30–40% less), engorged epidural veins</td><td>Lower spinal doses, higher epidural catheter migration risk</td></tr>
              </tbody>
            </table>
          </div>
        </div>

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
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Labour Analgesia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Epidural analgesia is the gold standard for labour pain. Low-dose combined spinal-epidural (CSE) provides rapid onset with minimal motor block.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Epidural</p>
              <p className="text-sm text-muted-foreground mt-1">Low-dose bupivacaine 0.1% + fentanyl 2 µg/ml. PIEB (programmed intermittent epidural bolus) superior to continuous infusion — better spread, less motor block, higher satisfaction.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Remifentanil PCA</p>
              <p className="text-sm text-muted-foreground mt-1">Alternative when epidural contraindicated. Bolus 30–40 µg, lockout 2 min. Requires 1:1 midwifery, continuous SpO₂ monitoring. Risk of respiratory depression.</p>
            </div>
          </div>
        </div>


        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Placental Drug Transfer</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The placenta is a lipid bilayer; drugs cross by passive diffusion governed by Fick's law. Four physicochemical properties determine transfer — molecular weight, lipid solubility, protein binding and degree of ionisation. The interactive plot below shows where common anaesthetic drugs sit.
          </p>
          <PlacentalDrugTransferDiagram />
        </div>
      </section>

      <KeyLearningPoints points={[
        "Pregnancy: ↑CO 40%, ↓FRC 20%, ↑O₂ consumption — rapid desaturation on apnoea",
        "Spinal for CS: heavy bupivacaine + fentanyl + diamorphine, target T4, phenylephrine infusion",
        "PPH: commonest cause is uterine atony — oxytocin → ergometrine → carboprost → surgical",
        "Pre-eclampsia: MgSO₄ 4g bolus for seizure prophylaxis; definitive treatment is delivery",
        "PIEB epidural technique provides better analgesia and satisfaction than continuous infusion",
      ]} />

      <QuizSection questions={obstetricAnaesthesiaQuestions} />
      <ReferencesList topicId="obstetric-anaesthesia" />

      <SeeAlso topicId="obstetric-anaesthesia" />
        <TopicCompletionToggle topicId="obstetric-anaesthesia" topicTitle="Obstetric Anaesthesia" />
    </SectionLayout>
  );
};

export default ObstetricAnaesthesiaTopic;
