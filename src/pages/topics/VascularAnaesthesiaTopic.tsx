import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { vascularAnaesthesiaQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const VascularAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Vascular Anaesthesia"
      subtitle="FRCA Final — Clinical"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="vascular-anaesthesia"
      topicTitle="Vascular Anaesthesia"
      quizQuestions={vascularAnaesthesiaQuestions}
      objectives={[
        "Compare anaesthetic management of open AAA, EVAR, and ruptured AAA repair",
        "Describe the haemodynamic and metabolic consequences of aortic cross-clamping and unclamping",
        "Plan anaesthesia for carotid endarterectomy with appropriate cerebral monitoring",
        "Apply spinal cord and renal protection strategies during major aortic surgery",
        "Risk-stratify vascular surgical patients using RCRI, METs, and CPET",
      ]}
      keyPoints={[
        { text: "Aortic cross-clamping: ↑ SVR/afterload above clamp; ischaemia below. Unclamp → ↓ SVR, acidosis, ↑ K⁺ — pre-load before release", cites: ["ESVS AAA 2019"] },
        { text: "Ruptured AAA: permissive hypotension (SBP 70–80) until aortic control. Massive transfusion protocol", cites: ["BJA Educ CEA 2015"] },
        { text: "CEA: GALA trial — no outcome difference GA vs regional; awake neurological exam under cervical plexus block remains the gold-standard cerebral monitor", cites: ["BJA Educ AAA 2016"] },
        { text: "CEA shunting: Cochrane (2014) found no benefit of routine over selective shunting — awake testing gives the lowest shunt rate (~10–15%)", cites: ["RCRI"] },
        { text: "Cervical plexus block: intermediate (sub-SCM, ultrasound-guided) now preferred over deep — equivalent surgical conditions with far fewer phrenic/RLN/intravertebral complications", cites: ["GALA 2008"] },
        { text: "Post-CEA: tight BP control (SBP <140–160) for days to prevent cerebral hyperperfusion syndrome — peaks days 3–7", cites: ["ESVS AAA 2019"] },
        { text: "Vascular patients have high cardiac risk — Lee's RCRI, CPET (AT <11 = high risk), continue statins/beta-blockers perioperatively", cites: ["BJA Educ CEA 2015"] },
        { text: "Ischaemia-reperfusion: K⁺ release, myoglobin, lactate washout can cause arrhythmias, AKI, ARDS", cites: ["BJA Educ AAA 2016"] },
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      coreConcepts={
        <ExamSection exams={[Exam.FINAL]} className="scroll-mt-24">
        <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Abdominal Aortic Aneurysm (AAA)</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Definitions</strong>: AAA = aortic diameter ≥3 cm (or 1.5× normal). Elective repair indicated at ≥5.5 cm (men) or ≥5.0 cm (women), or if growth &gt;1 cm/year</li>
            <li><strong>Open repair</strong>: supracoeliac or infrarenal cross-clamp. Massive haemodynamic changes — ↑ SVR and afterload on clamp, ↓ BP on unclamp (reperfusion). Cell salvage essential</li>
            <li><strong>EVAR (endovascular)</strong>: lower perioperative mortality (1–2% vs 4–6% open). GA or LA + sedation. Contrast nephropathy risk. Post-implantation syndrome (fever, ↑ CRP, ↑ WCC)</li>
            <li><strong>Ruptured AAA</strong>: 80% pre-hospital mortality. Permissive hypotension (SBP 70–80 mmHg) until aortic control. Massive transfusion protocol. Damage control surgery</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Aortic Cross-Clamping Physiology</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Above clamp</strong>: ↑ SVR (40–60%), ↑ MAP, ↑ cardiac preload, ↑ myocardial O₂ demand. Risk of LV failure/ischaemia. Magnitude depends on clamp level (supracoeliac &gt; infrarenal)</li>
            <li><strong>Below clamp</strong>: ↓ perfusion to kidneys, gut, spinal cord, lower limbs. Renal ischaemia (if suprarenal), gut mucosal ischaemia, lactic acidosis</li>
            <li><strong>Unclamping</strong>: ↓ SVR (vasodilatation, washout of metabolites), ↓ preload (blood pooling in lower body), metabolic acidosis, ↑ K⁺, ↑ lactate, myocardial depressant factors. Manage: volume loading pre-unclamp, slow/staged release, vasopressors</li>
            <li><strong>Spinal cord protection</strong>: CSF drainage (lumbar drain), MAP targets &gt;80 mmHg, avoid hypothermia, reimplant intercostal arteries (open TAAA repair)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Carotid Endarterectomy (CEA)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            CEA prevents stroke in patients with significant carotid stenosis but is itself a high-risk cardiovascular procedure performed on an elderly, atherosclerotic population. The dominant intra-operative anaesthetic challenges are (1) detecting cerebral ischaemia during cross-clamping of the internal carotid artery (ICA), (2) deciding whether to insert a temporary intraluminal shunt, and (3) maintaining tight haemodynamic control to balance cerebral perfusion against myocardial work. Indications: symptomatic stenosis ≥50% (NASCET) — operate within 2 weeks (NICE); asymptomatic ≥60–70% in selected patients.
          </p>

          {/* === Anaesthetic technique === */}
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Anaesthetic Technique</h3>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Technique</th>
                  <th className="text-left py-2 text-foreground font-semibold">Advantages</th>
                  <th className="text-left py-2 text-foreground font-semibold">Disadvantages</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground align-top">General anaesthesia (GA)</td>
                  <td className="align-top">Secure airway and immobile patient; allows precise CO₂ control; familiar for most teams; cerebral metabolic depression (volatile/propofol) may be neuroprotective; better for long/complex cases or anxious patients.</td>
                  <td className="align-top">Loss of the gold-standard awake neurological exam → must rely on surrogate cerebral monitors; higher haemodynamic lability at induction/emergence; greater myocardial oxygen demand; higher PONV; slower mobilisation.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground align-top">Regional (cervical plexus block — see below)</td>
                  <td className="align-top">Awake neurological monitoring is the most sensitive and specific test of cerebral ischaemia; allows selective shunting (lower shunt rate ~10–15% vs ~50% routine); better haemodynamic stability; less vasopressor use; faster recovery; lower opioid requirement; potentially less MI in observational data.</td>
                  <td className="align-top">Patient must be cooperative, able to lie flat with head turned, and tolerate drapes; surgical conversion to GA in 2–6% (ischaemia, agitation, block failure, airway compromise from haematoma); operator dependent; risks of the block itself (intravascular LA, phrenic palsy, recurrent laryngeal nerve block, intrathecal/epidural spread).</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground align-top">Local infiltration alone</td>
                  <td className="align-top">Minimally invasive, avoids deep block complications, useful in elderly/frail patients with respiratory compromise.</td>
                  <td className="align-top">Often inadequate analgesia for retraction and ICA dissection — frequent surgical top-ups; not reliable for routine practice.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* === Cervical plexus block === */}
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Cervical Plexus Block — Three Approaches</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The cervical plexus is formed by the anterior rami of C1–C4. The skin and subcutaneous tissues of the neck are supplied by the four <strong>superficial cervical plexus</strong> branches (lesser occipital, great auricular, transverse cervical, supraclavicular) which emerge at the posterior border of sternocleidomastoid (SCM). The deeper structures (sternomastoid, strap muscles, carotid sheath) receive sensory innervation from the <strong>deep cervical plexus</strong> running on the prevertebral fascia. The block can be performed at three planes — each with a different efficacy/risk profile.
          </p>
          <div className="grid lg:grid-cols-3 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Superficial (subcutaneous)</p>
              <p className="text-xs text-muted-foreground mb-2"><strong>Technique:</strong> 10–15 mL LA injected subcutaneously along the posterior border of SCM at its midpoint (level of C4 / cricoid).</p>
              <p className="text-xs text-muted-foreground"><strong>Pros:</strong> Very safe — extra-fascial, essentially no risk of phrenic / vertebral / intrathecal injection. Easy, fast, ultrasound rarely required.<br /><strong>Cons:</strong> Inadequate alone for deep dissection — supplemental surgical infiltration of carotid sheath usually needed.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Intermediate (sub-SCM / sub-platysmal)</p>
              <p className="text-xs text-muted-foreground mb-2"><strong>Technique:</strong> Ultrasound-guided injection deep to the investing layer of cervical fascia, beneath SCM but superficial to the prevertebral fascia (10–15 mL).</p>
              <p className="text-xs text-muted-foreground"><strong>Pros:</strong> Excellent surgical block quality close to that of a deep block, with a much lower complication profile. Now favoured in many UK centres.<br /><strong>Cons:</strong> Requires ultrasound and familiarity with cervical sonoanatomy; small risk of phrenic palsy if LA tracks deep.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Deep (paravertebral)</p>
              <p className="text-xs text-muted-foreground mb-2"><strong>Technique:</strong> Three-injection (Winnie) or single-injection at C3/C4 onto the transverse process, depositing LA within prevertebral fascia. Increasingly performed under ultrasound rather than landmark technique.</p>
              <p className="text-xs text-muted-foreground"><strong>Pros:</strong> Most complete sensory and motor block — lowest rate of supplementation.<br /><strong>Cons:</strong> Highest complication rate — <em>ipsilateral phrenic nerve palsy almost universal</em> (avoid bilateral blocks; caution in respiratory disease), recurrent laryngeal nerve block (hoarseness, contraindicated bilaterally), intravertebral artery injection (immediate seizure/CV collapse with even small LA volumes), intrathecal/epidural spread (high spinal), Horner's syndrome.</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-4">
            <p className="text-xs text-muted-foreground">
              <strong>Current UK practice:</strong> intermediate (or combined superficial + intermediate) block under ultrasound has largely replaced deep blocks for routine awake CEA — equivalent surgical conditions with markedly fewer complications (<em>Pandit, BJA 2007 systematic review and ESA recommendations</em>). LA choice is typically ropivacaine 0.5% or levobupivacaine 0.375–0.5% for ~6 hours of analgesia. Always have surgeon ready to infiltrate the carotid sheath.
            </p>
          </div>

          {/* === Cerebral perfusion monitoring === */}
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Intra-operative Cerebral Perfusion Monitoring</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            ICA cross-clamp produces ipsilateral hemispheric ischaemia in 5–15% of patients (depends on contralateral disease, circle of Willis competence, MAP). No single monitor is perfect — many centres combine modalities or use awake testing as the reference standard.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Modality</th>
                  <th className="text-left py-2 text-foreground font-semibold">What it Measures</th>
                  <th className="text-left py-2 text-foreground font-semibold">Pros</th>
                  <th className="text-left py-2 text-foreground font-semibold">Cons</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground align-top">Awake neurological exam (regional only)</td>
                  <td className="align-top">Direct assessment of contralateral motor power, speech, level of consciousness during a 3-min trial clamp.</td>
                  <td className="align-top">Gold standard — highest sensitivity and specificity for clinically relevant ischaemia. Allows truly selective shunting.</td>
                  <td className="align-top">Requires regional technique; sudden deterioration may demand emergent shunt or conversion to GA.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground align-top">Carotid stump pressure</td>
                  <td className="align-top">Mean back-pressure measured in the ICA distal to the cross-clamp via a needle/cannula.</td>
                  <td className="align-top">Cheap, readily available; correlates with collateral flow through circle of Willis.</td>
                  <td className="align-top">Only a single point in time; thresholds vary (commonly &lt;40–50 mmHg = inadequate); poor positive predictive value; affected by systemic BP and anaesthetic agents.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground align-top">Transcranial Doppler (TCD)</td>
                  <td className="align-top">MCA mean flow velocity ipsilateral to clamp; also detects emboli (HITS) during dissection, clamp release and shunt insertion.</td>
                  <td className="align-top">Continuous, dynamic; detects emboli and hyperperfusion post-op; can guide shunt insertion (commonly trigger if MCA velocity drops &gt;50% from baseline).</td>
                  <td className="align-top">Adequate temporal bone window absent in 10–20% (especially elderly women); operator-dependent; probe fixation difficult.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground align-top">Processed EEG / raw EEG</td>
                  <td className="align-top">Cortical electrical activity — ischaemia produces ipsilateral attenuation/slowing.</td>
                  <td className="align-top">Sensitive to cortical ischaemia; objective.</td>
                  <td className="align-top">Confounded by volatile anaesthesia, hypothermia, hypocapnia; misses subcortical/lacunar ischaemia; requires neurophysiologist for raw EEG interpretation.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground align-top">Somatosensory evoked potentials (SSEPs)</td>
                  <td className="align-top">Median nerve cortical response — ↓ amplitude or ↑ latency = ischaemia.</td>
                  <td className="align-top">Detects subcortical ischaemia (white matter); more specific than EEG.</td>
                  <td className="align-top">Specialist equipment, slow signal averaging (~minutes — late warning), affected by anaesthetics.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground align-top">Near-infrared spectroscopy (NIRS / rSO₂)</td>
                  <td className="align-top">Regional frontal-cortex tissue oxygen saturation; alarm if ↓ &gt;20% from baseline (or absolute &lt;50%).</td>
                  <td className="align-top">Non-invasive, continuous, easy to apply; works under GA or regional; useful trend monitor.</td>
                  <td className="align-top">Only frontal cortex sampled (may miss MCA territory ischaemia); extracranial contamination; poor evidence that NIRS-guided shunting reduces stroke.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground align-top">Jugular venous oxygen saturation (SjvO₂)</td>
                  <td className="align-top">Global cerebral oxygen extraction.</td>
                  <td className="align-top">Useful research tool.</td>
                  <td className="align-top">Invasive, global (not focal), rarely used routinely.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* === Shunt strategies === */}
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Intra-operative Surgical Shunts</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            A temporary intraluminal shunt (Pruitt-Inahara, Javid or Sundt) bridges blood from the common carotid to the distal ICA across the area being endarterectomised, restoring antegrade flow during the clamp period. Three philosophies exist:
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Routine shunting</p>
              <p className="text-xs text-muted-foreground"><strong>Pros:</strong> No need for monitoring; protects every patient from clamp ischaemia; reduces need for trial clamping under regional.<br /><strong>Cons:</strong> Shunt placement carries its own risks — embolisation of plaque/air, intimal dissection, ICA injury, technical difficulty in narrow vessels, restricted operative view → potentially longer/messier endarterectomy, and a small but measurable embolic stroke rate.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Selective shunting</p>
              <p className="text-xs text-muted-foreground"><strong>Pros:</strong> Lowest shunt utilisation (~10–15% with awake testing, ~30–50% with stump pressure/TCD/NIRS) → fewer shunt-related complications; restricts shunt risk to those who actually need it.<br /><strong>Cons:</strong> Relies on accurate monitoring; risk of false-negative leading to ischaemic stroke; learning curve.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Never shunt</p>
              <p className="text-xs text-muted-foreground"><strong>Pros:</strong> Avoids all shunt-related embolic/dissection risk; quickest, cleanest endarterectomy.<br /><strong>Cons:</strong> Absolutely depends on rapid surgery (clamp time &lt;20 min) and good collaterals; not safe in patients with contralateral ICA occlusion or recent stroke; relies on permissive hypertension during clamp to maintain collateral flow.</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-4">
            <p className="text-xs text-muted-foreground">
              <strong>Cochrane review (Chongruksut, 2014):</strong> insufficient evidence to recommend routine over selective shunting — no significant difference in stroke or death between strategies. Surgeon experience and consistency are likely more important than the shunt policy itself. Most UK vascular centres practise selective shunting guided by awake testing (under regional) or TCD/stump pressure (under GA).
            </p>
          </div>

          {/* === Haemodynamic & complications === */}
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Haemodynamic Management & Complications</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed mb-3">
            <li><strong>During cross-clamp:</strong> maintain MAP at or 20% above baseline (often phenylephrine/metaraminol/noradrenaline) to maximise collateral cerebral flow. Normocapnia (PaCO₂ 4.5–5 kPa) — both hyper- and hypocapnia worsen outcomes.</li>
            <li><strong>Carotid sinus reflex:</strong> surgical handling of the carotid bifurcation can trigger profound bradycardia/hypotension — request surgeon to infiltrate the bifurcation with 1% lidocaine; have atropine/glycopyrrolate drawn.</li>
            <li><strong>Post-op BP control:</strong> very tight target (e.g. SBP &lt;160 mmHg, often &lt;140 in high-risk) to prevent <strong>cerebral hyperperfusion syndrome</strong> (headache, seizures, intracerebral haemorrhage) — risk peaks days 3–7, particularly in patients with high-grade stenosis and impaired autoregulation.</li>
            <li><strong>Specific complications:</strong> stroke (1–3% in modern series, higher if symptomatic), MI (1–2%), cranial nerve injury (vagus, hypoglossal, marginal mandibular, recurrent laryngeal — in 5–10%, usually transient), neck haematoma (may obstruct airway — open in recovery if expanding), wound infection, hyperperfusion syndrome (~1% but devastating).</li>
          </ul>

          {/* === Evidence === */}
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Evidence Base — Which Technique?</h3>
          <div className="space-y-2 mb-2">
            {[
              { trial: "GALA (Lancet 2008, n=3526)", finding: "The largest RCT comparing GA vs LA/regional for CEA. NO significant difference in the composite of stroke, MI or death at 30 days (4.8% LA vs 4.5% GA). Awake monitoring did not translate into better hard outcomes — possibly because GA centres used surrogate monitors and shunting effectively. Conclusion: <strong>technique should be chosen by patient/surgeon/anaesthetist preference and local expertise</strong>, not dictated by evidence." },
              { trial: "Cochrane (Vaniyapong, 2013)", finding: "Pooled trial data including GALA — no difference in 30-day stroke or death between LA and GA. LA associated with less intraoperative shunting and modestly less hypotension/bradycardia." },
              { trial: "Cochrane shunting (Chongruksut, 2014)", finding: "Insufficient evidence to support routine vs selective shunting. No single monitoring modality (TCD, NIRS, stump pressure, EEG) clearly outperforms the others. Awake testing remains the only reference standard." },
              { trial: "ESVS Guidelines 2023", finding: "Recommend offering both GA and LA — choice individualised. Endorse selective shunting based on neurological monitoring. Strict perioperative BP control (Class I, Level B). CEA preferred over CAS for symptomatic ≥70% stenosis in patients fit for surgery." },
              { trial: "CREST (NEJM 2010)", finding: "Comparison of CEA vs carotid artery stenting (CAS): equal long-term composite outcomes, but CEA had fewer 30-day strokes (2.3% vs 4.1%) while CAS had fewer MIs (1.1% vs 2.3%). CEA favoured in older patients (&gt;70 yr); CAS in patients with hostile neck anatomy or prior radiotherapy." },
            ].map((e) => (
              <div key={e.trial} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{e.trial}</p>
                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: e.finding }} />
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Pearl</p>
            <p className="text-sm text-muted-foreground">
              GALA is the headline trial — it did NOT show superiority of either GA or regional, so the answer is "individualise". The unique advantage of regional (cervical plexus block) is <em>awake neurological monitoring</em>, which remains the gold-standard test of cerebral ischaemia and produces the lowest selective shunting rates. Under GA, no surrogate monitor (stump pressure, TCD, EEG, SSEP, NIRS) has been shown to reduce stroke when used in isolation — most centres combine two. Strict BP control and post-op vigilance for hyperperfusion syndrome matter more than the choice of technique.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Peripheral Vascular Surgery</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Lower limb bypass/angioplasty</strong>: patients often have widespread atherosclerosis, IHD, DM, CKD. High cardiac risk — Lee's RCRI assessment</li>
            <li><strong>Anaesthetic options</strong>: GA, neuraxial (spinal/epidural), peripheral nerve blocks, or combinations. Regional may improve graft flow (sympathectomy)</li>
            <li><strong>Amputation</strong>: often elderly, frail, comorbid. Sciatic + femoral nerve block or spinal anaesthesia. Phantom limb pain prevention: regional analgesia, gabapentinoids</li>
            <li><strong>Ischaemia-reperfusion injury</strong>: release of K⁺, lactate, myoglobin, inflammatory mediators from revascularised tissue. Can cause cardiac arrhythmias, renal failure, ARDS</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Preoperative Cardiac Risk Assessment</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Lee's RCRI</strong>: 6 predictors — high-risk surgery, IHD, CCF, CVA/TIA, DM (insulin), creatinine &gt;177 µmol/L. ≥3 points = high risk</li>
            <li><strong>CPET</strong>: AT &lt;11 ml/kg/min = high risk. VE/VCO₂ &gt;34 also associated with poor outcomes</li>
            <li><strong>Cardiac medications</strong>: continue statins, beta-blockers, aspirin. Withhold ACEi/ARBs on day of surgery (hypotension risk). Dual antiplatelet management — MDT discussion</li>
            <li><strong>Coronary stents</strong>: BMS — defer elective surgery 6 weeks; DES — defer 6–12 months (or 3 months with newer-generation DES). Continue aspirin perioperatively if possible</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intraoperative Monitoring & Management</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Arterial line</strong>: essential for open aortic surgery, recommended for CEA. Beat-to-beat BP and serial ABGs</li>
            <li><strong>Central venous access</strong>: consider for open aortic surgery (vasoactive drugs, volume assessment). Not always needed for EVAR or CEA</li>
            <li><strong>Cardiac output monitoring</strong>: goal-directed fluid therapy (oesophageal Doppler, PiCCO, FloTrac) improves outcomes in major vascular surgery</li>
            <li><strong>Temperature</strong>: active warming essential. Hypothermia worsens coagulopathy, cardiac morbidity, wound infection</li>
            <li><strong>Cell salvage</strong>: essential for open aortic surgery. Relative contraindication if concurrent malignancy (use leucocyte depletion filter)</li>
            <li><strong>Renal protection</strong>: maintain adequate MAP, avoid nephrotoxins, goal-directed fluid therapy. No proven benefit of renal-dose dopamine or mannitol</li>
          </ul>
        </div>
      </section>

      <SynthesisBlock
        title="Vascular Anaesthesia — Bottom Line"
        subtitle="Key risk-stratification, monitoring and protective strategies for major vascular surgery."
        variant="summary"
      >
        <ul className="space-y-2 list-disc list-inside text-sm">
          <li><strong>Preoperative cardiac risk</strong>: RCRI / METS score; CPET if available. Continue β-blockers and statins; stop ACEi/ARB on the morning of surgery.</li>
          <li><strong>EVAR vs open AAA</strong>: EVAR has lower 30-day mortality (EVAR-1) but no long-term survival benefit; open repair more durable in fit patients.</li>
          <li><strong>Aortic cross-clamp</strong>: profound ↑afterload + ↓ distal perfusion. Use vasodilators (GTN), titrated cardiac filling, and monitor end-organ perfusion.</li>
          <li><strong>Renal protection</strong>: maintain perfusion (MAP &gt;65), avoid nephrotoxins, judicious contrast — no benefit from mannitol or 'renal-dose' dopamine.</li>
          <li><strong>Spinal cord protection (TAAA)</strong>: CSF drainage, MAP ≥80, motor-evoked potential monitoring, intercostal artery reimplantation.</li>
          <li><strong>Carotid surgery</strong>: regional (deep + superficial cervical block) or GA with arterial line; awake testing during clamp gold standard for shunt decision.</li>
        </ul>
        </SynthesisBlock>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Open AAA: aortic cross-clamp increases afterload abruptly — afterload-reducing agents and reduced volatile pre-clamp, vasodilators ready for unclamping (reperfusion hypotension).",
              "Carotid endarterectomy: keep BP within 20% of baseline; awake regional (cervical plexus) allows continuous neuro assessment.",
              "EVAR is less haemodynamically stressful than open AAA but carries contrast nephropathy, embolic and endoleak risks.",
              "Vascular patients have a high prevalence of IHD, CKD and COPD — optimise statins, β-blockers and antiplatelets perioperatively.",
              "Spinal cord ischaemia after thoracic aortic surgery: CSF drainage, MAP >85 mmHg, intercostal artery reimplantation.",
            ]}
          />
        </ExamSection>
      }
    />
  );
};

export default VascularAnaesthesiaTopic;
