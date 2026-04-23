import { TopicTemplate } from "@/components/TopicTemplate";
import { orthopaedicAnaesthesiaQuestions } from "@/data/quizzes";
import { DiagramSection } from "@/components/DiagramSection";
import { BlockAnalgesiaProfileDiagram } from "@/components/diagrams/BlockAnalgesiaProfileDiagram";
import { LowerLimbBlocksDiagram } from "@/components/diagrams/LowerLimbBlocksDiagram";

const OrthopaedicAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Orthopaedic Anaesthesia"
      subtitle="FRCA Final — Clinical"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="orthopaedic-anaesthesia"
      topicTitle="Orthopaedic Anaesthesia"
      quizQuestions={orthopaedicAnaesthesiaQuestions}
      objectives={[
        "Manage anaesthesia for hip fracture according to NICE/AAGBI standards",
        "Describe tourniquet physiology and the consequences of inflation and deflation",
        "Recognise, prevent, and treat bone cement implantation syndrome (BCIS)",
        "Plan a motor-sparing analgesic strategy for day-case lower-limb arthroplasty",
        "Identify high-risk patients for compartment syndrome and modify regional technique accordingly",
      ]}
      keyPoints={[
        "#NOF: surgery within 36h. Spinal anaesthesia recommended (NICE). Fascia iliaca / PENG block for analgesia",
        "Tourniquet: upper limb 50-100 mmHg above SBP. Safe limit ~2h. Deflation → ↓ pH, ↑ K⁺, ↑ CO₂, ↑ lactate",
        "BCIS: fat/marrow embolism during cement insertion → hypoxia, hypotension, ↓ consciousness. Warn before cementing",
        "Day-case TKA recipe: low-dose spinal + adductor canal + IPACK + LIA + multimodal oral analgesia (motor-sparing)",
        "Counsel patients about the 'block wear-off cliff' — start regular paracetamol/NSAID before pain returns; provide written plan",
        "Home perineural catheters (Ilfeld evidence) extend analgesia 48–72h but require 24/7 APS support and red-flag teaching",
        "Compartment syndrome in high-risk limbs: discuss with surgeon, use dilute LA (0.2% ropivacaine), avoid long adjuncts, treat escalating top-up demand as a red flag",
      ]}
      sectionExamMapping={{
        objectives: { exams: ["final"] },
        keyPoints: { exams: ["final"] },
      }}
      coreConcepts={
        <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hip Fracture (#NOF)</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Epidemiology</strong>: ~80,000/year in UK. 30-day mortality ~7%. NICE CG124 + NHFD standards</li>
            <li><strong>Timing</strong>: surgery within 36h unless medically unfit. Delay increases mortality, pressure sores, VTE</li>
            <li><strong>Anaesthetic</strong>: spinal anaesthesia recommended (NICE) — ↓ mortality, ↓ DVT vs GA. Avoid hypotension (MAP &gt;65 or ≥75% baseline). Low-dose spinal (e.g., 1.5-2ml 0.5% heavy bupivacaine)</li>
            <li><strong>Analgesia</strong>: fascia iliaca block (pre/intraoperative), paracetamol, avoid NSAIDs in elderly/renal impairment. Opioid-sparing approach</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Tourniquet</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Pressure</strong>: upper limb 50-100 mmHg above SBP; lower limb 100-150 mmHg above SBP</li>
            <li><strong>Time</strong>: safe limit ~2h. Deflation after 1.5h recommended. Rest 15min between inflations</li>
            <li><strong>Inflation effects</strong>: ↑ SVR, ↑ MAP, ↑ CVP. Tourniquet pain (C-fibres, poorly blocked by LA)</li>
            <li><strong>Deflation effects</strong>: ↓ MAP, ↑ CO₂ (washout), ↓ pH, ↑ K⁺, ↑ lactate, ↓ core temperature. Risk of PE from mobilised clot. Reactive hyperaemia</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bone Cement Implantation Syndrome (BCIS)</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li>Occurs during cemented arthroplasty (hip/knee). Incidence 1-28% (varying severity)</li>
            <li><strong>Mechanism</strong>: fat/marrow embolism → right heart strain + inflammatory mediator release → hypoxia, hypotension, ↓ consciousness</li>
            <li><strong>Risk factors</strong>: pathological fracture, pre-existing cardiopulmonary disease, poor femoral preparation</li>
            <li><strong>Prevention</strong>: high FiO₂, adequate hydration, communication with surgeon (warn before cementing), invasive monitoring if high-risk</li>
            <li><strong>Grading</strong>: Grade 1 (SpO₂ ↓, ↓ BP mild), Grade 2 (SpO₂ &lt;94%, ↓ BP requiring vasopressors), Grade 3 (cardiovascular collapse)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fat Embolism Syndrome</h2>
          <p className="text-muted-foreground leading-relaxed">Occurs 24-72h after long bone fractures. Classic triad: respiratory distress (earliest), neurological changes, petechial rash (pathognomonic, ~50%). Diagnosis clinical (Gurd's criteria). Treatment supportive: O₂, ventilation, haemodynamic support. Prevention: early fracture stabilisation.</p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Regional Anaesthesia for Post-op Analgesia &amp; Day Surgery</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Modern orthopaedic enhanced recovery (ERAS) and the British Orthopaedic Association / Get It Right First Time (GIRFT) day-case joint replacement programmes hinge on opioid-sparing, motor-sparing regional anaesthesia. The aim is excellent dynamic analgesia (pain on movement) without quadriceps weakness that prevents early mobilisation — the rate-limiting step for discharge.
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Procedure</th>
                  <th className="text-left py-2 text-foreground font-semibold">Preferred block(s)</th>
                  <th className="text-left py-2 text-foreground font-semibold">Evidence summary</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Total knee replacement (TKA)</td><td>Adductor canal block (ACB) ± IPACK (Interspace between Popliteal Artery &amp; Capsule of Knee) + LIA (local infiltration analgesia)</td><td>ACB provides equivalent analgesia to femoral block but <strong>preserves quadriceps strength</strong> (Jaeger 2013, Memtsoudis 2019). IPACK adds posterior capsule cover. Femoral nerve block now largely abandoned for day-case TKA due to fall risk.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Total hip replacement (THA)</td><td>PENG (pericapsular nerve group) block ± LIA; spinal anaesthesia</td><td>PENG (Girón-Arango 2018) targets articular branches of femoral, obturator and accessory obturator — motor-sparing alternative to fascia iliaca. RCT evidence (Aliste 2021) shows non-inferior analgesia with better quadriceps preservation vs supra-inguinal FICB.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Hip fracture (#NOF)</td><td>Fascia iliaca compartment block (FICB) — pre-op &amp; intra-op; PENG emerging</td><td>NICE/AAGBI recommend pre-op FICB. Reduces opioid requirement, delirium and time to mobilise. PENG vs FICB trials (Lin 2021, Mosaffa 2022) suggest equivalent analgesia with less motor block.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Shoulder arthroscopy / arthroplasty</td><td>Interscalene brachial plexus block (single-shot or catheter)</td><td>Gold standard — superior analgesia vs IV opioid (Hughes 2013 meta-analysis). Counsel re: ipsilateral phrenic palsy (~100% with traditional volumes; ~30–50% with low-volume 5–10 ml). Avoid in significant respiratory disease.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Forearm / hand</td><td>Supraclavicular, infraclavicular, axillary brachial plexus block</td><td>Reliable, opioid-free anaesthesia &amp; long-duration analgesia. WALANT (wide-awake local anaesthesia no tourniquet) increasingly used for hand surgery — avoids systemic anaesthesia altogether.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Foot &amp; ankle</td><td>Popliteal sciatic + saphenous (or ankle block for forefoot)</td><td>Single-shot popliteal lasts 12–18 h with bupivacaine; perineural dexamethasone extends to ~24 h. Allows day-case bunion / forefoot surgery with minimal opioid.</td></tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="font-semibold text-foreground text-sm">Adjuncts that prolong single-shot blocks</p>
            <p className="text-sm text-muted-foreground mt-1">
              <strong className="text-foreground">Perineural dexamethasone</strong> 4–8 mg (extends duration ~50%; IV dexamethasone 8 mg has similar effect — preferred to avoid neurotoxicity concerns), <strong className="text-foreground">dexmedetomidine</strong> 0.5–1 µg/kg, <strong className="text-foreground">clonidine</strong> 1 µg/kg. <strong className="text-foreground">Liposomal bupivacaine</strong> (Exparel) — RCT evidence is mixed; PROSPECT (2022) does <em>not</em> recommend routinely over plain bupivacaine for TKA.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">⚠️ Counselling for Breakthrough Pain — The "Block Wear-Off Cliff"</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            A successful single-shot block can mask the magnitude of the underlying surgical pain. When it wears off — typically <strong>12–24 h post-injection</strong>, often at home or overnight — patients can experience sudden severe ("rebound") pain. This is consistently cited as the dominant cause of unplanned readmission, ED attendance and patient dissatisfaction after day-case orthopaedic surgery.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Pre-op counselling (essential)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Explain the block is <strong>temporary</strong> and pain will return.</li>
                <li>Give an approximate wear-off time (e.g. "around 18 h" for a popliteal with bupivacaine).</li>
                <li>Instruct to take regular analgesia <strong>before</strong> the block wears off — not in response to pain.</li>
                <li>Warn that sleeping through the wear-off (overnight surgery) is when most patients are caught out.</li>
                <li>Provide written discharge information; PROSPECT/ESRA recommend a "block-wear-off plan" leaflet.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Take-home analgesia bundle (typical)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Regular <strong>paracetamol</strong> 1 g QDS.</li>
                <li>Regular <strong>NSAID</strong> (ibuprofen 400 mg TDS or naproxen 500 mg BD) unless contraindicated.</li>
                <li>Weak opioid (codeine 30–60 mg or dihydrocodeine) for breakthrough.</li>
                <li>Short course of strong opioid (oxycodone IR 5 mg PRN, ≤3-day supply) — kept for the wear-off window.</li>
                <li>Anti-emetic (cyclizine or ondansetron) and laxative (senna).</li>
                <li>24/7 hospital contact number; safety-net for inadequate analgesia or red flags.</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            <strong className="text-foreground">Evidence:</strong> Williams (2007), Sunderland (2016) and the PROSPECT TKA recommendations (2022) all stress that without a structured "transition analgesia" plan, day-case regional anaesthesia simply <em>delays</em> rather than reduces pain. Continuous catheters (see below) are one solution; pre-emptive multimodal oral analgesia is the other.
          </p>
        </div>

        <DiagramSection
          title="Single-shot vs Continuous Catheter — Analgesic Profile over 72 h"
          intro={
            <p>
              The two regional strategies produce very different pain trajectories. Hover the timeline to read pain scores at any timepoint, and click a phase chip (or band) to see what is happening pharmacologically and clinically. The single-shot curve illustrates the wear-off cliff and rebound peak that dominate day-case patient experience; the catheter curve shows the smoother profile that underpins ambulatory pump programmes.
            </p>
          }
        >
          <BlockAnalgesiaProfileDiagram />
        </DiagramSection>

        <DiagramSection
          title="Lower-Limb Regional Blocks — Coverage Map"
          intro={
            <p>
              Click a block (chip below or marker on the leg) to see its sensory and motor territory shaded on anterior + posterior leg silhouettes, the needle entry point and the clinical use-case. The "·MS" tag flags motor-sparing blocks that support early mobilisation and day-case pathways.
            </p>
          }
        >
          <LowerLimbBlocksDiagram />
        </DiagramSection>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Day-Case Joint Replacement — Evidence</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Day-case (23-hour) and ambulatory (same-day discharge) hip and knee replacement is now mainstream in selected patients. The British Association of Day Surgery (BADS) directory (2024), GIRFT and the Centre for Perioperative Care endorse same-day discharge as the default for ASA 1–2 patients with appropriate social support.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Outcomes evidence</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Hoffmann 2022</strong> (systematic review): day-case THA/TKA non-inferior for 90-day complications, readmission and mortality vs inpatient pathways in selected patients.</li>
                <li><strong>Gromov 2017</strong> (Danish registry, n&gt;1500): same-day discharge feasible in 15–20% of THA/TKA with no increase in 30-day readmission.</li>
                <li><strong>Hartog 2015</strong> meta-analysis: shorter LOS associated with <em>lower</em> 30-day mortality (selection bias acknowledged).</li>
                <li><strong>Husted 2010</strong> (Copenhagen): "fast-track" pathway with regional + LIA + early mobilisation reduces LOS to 1–2 days at scale.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Patient selection (BADS criteria)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>ASA 1–2 (selected, optimised ASA 3).</li>
                <li>BMI typically &lt;40.</li>
                <li>Motivated, with a responsible adult at home for ≥24 h.</li>
                <li>No OSA on CPAP, no significant cognitive impairment, no opioid tolerance.</li>
                <li>Lives within ~1 hr of the hospital with telephone access.</li>
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="font-semibold text-foreground text-sm">Anaesthetic recipe (typical day-case TKA)</p>
            <p className="text-sm text-muted-foreground mt-1">
              Pre-op paracetamol + NSAID + gabapentinoid (controversial — falling out of favour due to sedation/falls). <strong>Low-dose spinal</strong> (hyperbaric prilocaine 40–60 mg or chloroprocaine 40 mg — short-duration, motor-recovery within 90–120 min) ± light sedation, OR motor-sparing GA. <strong>Adductor canal + IPACK + surgeon-delivered LIA</strong> (typically 100–150 ml of 0.2% ropivacaine + adrenaline ± ketorolac). Tranexamic acid 1 g IV. Dexamethasone 8 mg IV (analgesia + PONV). Early mobilisation within 2–4 h.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Continuous Peripheral Nerve Catheters &amp; Ambulatory ("Take-Home") Catheters</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Perineural catheters with elastomeric pump infusions of 0.2% ropivacaine (typically 4–8 ml/h ± patient-controlled boluses) extend the analgesic window to 48–72 h, overcoming the wear-off cliff and supporting earlier discharge.
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Catheter site</th>
                  <th className="text-left py-2 text-foreground font-semibold">Common indications</th>
                  <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Adductor canal</td><td>TKA, ACL reconstruction</td><td>Motor-sparing — favoured for ambulatory pathways.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Interscalene</td><td>Shoulder arthroplasty / rotator-cuff repair</td><td>Most validated home-catheter site (Ilfeld series). Counsel re: phrenic palsy &amp; hoarseness.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Infraclavicular</td><td>Elbow / forearm / hand</td><td>Stable position; less catheter dislodgement than supraclavicular.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Popliteal sciatic</td><td>Foot &amp; ankle, Achilles repair, hindfoot fusion</td><td>Excellent for major foot reconstruction; analgesia for 48–72 h.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Lumbar plexus / fascia iliaca</td><td>Hip fracture (waiting for surgery), THA</td><td>Generally inpatient — bulky pump, motor block limits ambulation.</td></tr>
              </tbody>
            </table>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Evidence base</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Ilfeld</strong> (numerous RCTs, 2002–2020): home perineural infusions reduce pain scores, opioid use, sleep disturbance and hasten functional recovery vs single-shot blocks.</li>
                <li><strong>Cochrane 2016</strong>: continuous peripheral nerve blocks superior to opioid-only analgesia after major orthopaedic surgery.</li>
                <li><strong>Bingham 2012</strong> meta-analysis: catheters facilitate same-day discharge after major shoulder/knee surgery in selected patients.</li>
                <li>Recent <strong>cryoanalgesia</strong> and <strong>peripheral nerve stimulation</strong> (SPRINT) trials offer drug-free alternatives — emerging.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Practical / safety requirements for home catheters</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Patient &amp; carer education with written instructions and pump video.</li>
                <li>24/7 acute pain service phone line; daily phone follow-up.</li>
                <li>Clear instructions on how to <strong>stop the infusion and remove the catheter</strong> at home (or arrange community removal).</li>
                <li>Red-flag warnings: numbness ascending, weakness, signs of infection, LA toxicity (perioral tingling, tinnitus).</li>
                <li>Avoid in patients unable to self-monitor or contact help (cognitive impairment, lone living without phone).</li>
                <li>Risks: catheter dislodgement (~10–20%), leak, infection (&lt;1% at &lt;72 h), LAST, neurological injury.</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">⚠️ Compartment Syndrome &amp; Regional Analgesia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Acute compartment syndrome (ACS) is a surgical emergency — rising intra-compartmental pressure compromises tissue perfusion within an osseofascial space, causing ischaemia, myonecrosis and ultimately limb loss within 6–8 h. The cardinal sign is <strong>pain out of proportion to the injury, especially on passive stretch</strong>. Other "Ps" (pallor, paraesthesia, paralysis, pulselessness) are late and unreliable.
          </p>
          <div className="p-4 rounded-lg border-l-4 border-destructive bg-destructive/5 mb-3">
            <p className="font-semibold text-foreground text-sm">High-risk scenarios</p>
            <p className="text-sm text-muted-foreground mt-1">
              Tibial shaft fractures (~3–10%), forearm fractures (especially in children), high-energy crush injuries, prolonged limb ischaemia/reperfusion (e.g. tourniquet, vascular surgery), tight casts, anticoagulation. Young men with closed tibial fractures are the highest-risk group.
            </p>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-3">
            <strong>Does regional analgesia mask compartment syndrome?</strong> This has been debated for decades. Current expert consensus (<strong>ASRA / ESRA / AAGBI 2021 joint statement</strong>; <strong>Mar 2009</strong> review; <strong>Tran 2020</strong>) is that <em>well-conducted, low-concentration regional analgesia does <strong>not</strong> meaningfully delay diagnosis</em> — but specific cautions apply:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Arguments / evidence regional is safe</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>ACS pain is typically deep, ischaemic, on passive stretch — frequently <strong>"breaks through" a working block</strong>; the demand for top-ups is itself a warning sign.</li>
                <li>Multiple case series (Cometa 2011, Aguirre 2013) of forearm/tibial fractures with continuous catheters report no missed cases.</li>
                <li>IV opioid PCA arguably masks pain just as effectively as a low-dose block.</li>
                <li>Compartment pressure measurement, serial clinical exam and surgical vigilance are the diagnostic gold standards — not pain alone.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Arguments for caution</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Case reports (<strong>Mar 2009</strong>, <strong>Walker 2012</strong>) of delayed diagnosis attributed to dense neuraxial / continuous blocks.</li>
                <li>High-concentration LA + adjuncts (clonidine, dexamethasone) producing dense motor block can mask paraesthesia and weakness.</li>
                <li>Continuous epidural after tibial fracture has been the most commonly implicated technique.</li>
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="font-semibold text-foreground text-sm">Practical recommendations (ASRA/ESRA/AAGBI 2021)</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li><strong>Discuss with the surgical team</strong> before placing a block in a high-risk limb — joint decision, document.</li>
              <li>Prefer <strong>low-concentration LA</strong> (e.g. 0.2% ropivacaine) ± dilute infusion; avoid dense motor block.</li>
              <li><strong>Avoid long-acting adjuncts</strong> in high-risk patients.</li>
              <li>Hourly neurovascular observations (sensation, motor, pain on passive stretch, pulses, swelling, capillary refill) by trained staff.</li>
              <li><strong>Escalating analgesic requirement is a red flag</strong> — assume compartment syndrome until excluded; measure compartment pressures.</li>
              <li>Maintain a low threshold for fasciotomy; the limb (and the litigation) follows the surgeon's decision, not the anaesthetist's pain score.</li>
            </ul>
          </div>
        </div>
      </section>
      }
    />
  );
};

export default OrthopaedicAnaesthesiaTopic;
