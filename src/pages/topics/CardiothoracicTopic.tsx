import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { cardiothoracicQuestions } from "@/data/quizzes";
import CPBCircuitDiagram from "@/components/diagrams/CPBCircuitDiagram";
import DLTInsertionDiagram from "@/components/diagrams/DLTInsertionDiagram";
import OLVTroubleshootingDiagram from "@/components/diagrams/OLVTroubleshootingDiagram";
import CardiacArrestPostCardiacSurgeryDiagram from "@/components/diagrams/CardiacArrestPostCardiacSurgeryDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import { TopicTableOfContents } from "@/components/TopicTableOfContents";

const tocItems = [
  { id: "cpb-overview", label: "CPB circuit & anticoagulation", group: "Cardiac surgery" },
  { id: "cpb-physiology", label: "Physiological effects of CPB", group: "Cardiac surgery" },
  { id: "cardiac-considerations", label: "Key cardiac procedures", group: "Cardiac surgery" },
  { id: "opcab", label: "On-pump vs off-pump (OPCAB)", group: "Cardiac surgery" },
  { id: "dhca", label: "Deep hypothermic circulatory arrest", group: "Cardiac surgery" },
  { id: "cals", label: "Cardiac arrest after cardiac surgery", group: "Cardiac surgery" },
  { id: "olv", label: "One-lung ventilation", group: "Thoracic surgery" },
  { id: "analgesia", label: "Post-operative analgesia", group: "Post-operative" },
];

const CardiothoracicTopic = () => {
  return (
    <SectionLayout title="Cardiothoracic Anaesthesia" subtitle="FRCA / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <TopicTableOfContents items={tocItems} />
      <p className="text-muted-foreground leading-relaxed mb-6">
        Cardiothoracic anaesthesia is built around two distinct domains. <strong>Cardiac surgery</strong> centres on cardiopulmonary bypass — its circuit, its physiological consequences, and the specific demands of valve, coronary, and aortic-arch procedures. <strong>Thoracic surgery</strong> centres on lung isolation and the management of one-lung ventilation. The topic below follows that order: cardiac fundamentals first, then thoracic.
      </p>

      <section className="space-y-6 mb-10">
        {/* ───────── Cardiac surgery ───────── */}
        <div id="cpb-overview" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cardiopulmonary Bypass (CPB)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            CPB allows the heart and lungs to be bypassed during cardiac surgery. Understanding the circuit and physiological derangements is essential.
          </p>
          <CPBCircuitDiagram />
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">CPB Circuit Components</p>
              <p className="text-sm text-muted-foreground mt-1">Venous cannula (RA/SVC/IVC) → venous reservoir → pump (roller/centrifugal) → oxygenator/heat exchanger → arterial filter → arterial cannula (aorta). Prime volume ~1.5 L (haemodilution).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Anticoagulation</p>
              <p className="text-sm text-muted-foreground mt-1">Heparin 300–400 units/kg before cannulation. Target ACT &gt;480 seconds. Reverse with protamine 1 mg per 100 units heparin. Protamine reactions: hypotension, bronchospasm, pulmonary hypertension.</p>
            </div>
          </div>
        </div>

        <div id="cpb-physiology" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Physiological Effects of CPB</h2>
          <div className="space-y-2">
            {[
              { effect: "SIRS", detail: "Blood contact with circuit surfaces activates complement, cytokines, and coagulation cascades — systemic inflammatory response." },
              { effect: "Haemodilution", detail: "Prime volume reduces Hct to ~25%. Acceptable — improves rheology. Transfuse if Hct <20% on bypass." },
              { effect: "Hypothermia", detail: "Intentional cooling to 28–32°C (moderate) or 18–20°C (deep — circulatory arrest). Reduces metabolic rate ~7% per 1°C." },
              { effect: "Non-pulsatile flow", detail: "Roller pumps provide non-pulsatile flow. May impair microcirculation and organ perfusion. Centrifugal pumps provide some pulsatility." },
              { effect: "Coagulopathy", detail: "Platelet dysfunction, consumption of factors, heparin rebound, fibrinolysis. Give TXA (ATACAS trial)." },
            ].map((e) => (
              <div key={e.effect} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{e.effect}</span>
                <span className="text-sm text-muted-foreground">{e.detail}</span>
              </div>
            ))}
          </div>
        </div>


        <div id="cardiac-considerations" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Cardiac Surgery Considerations</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Aortic Valve Replacement</p>
              <p className="text-sm text-muted-foreground mt-1">Aortic stenosis: maintain SVR, avoid tachycardia, maintain sinus rhythm. Dangerous triad: hypotension → coronary hypoperfusion → further hypotension. Phenylephrine for BP support.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">CABG</p>
              <p className="text-sm text-muted-foreground mt-1">On-pump vs off-pump (OPCAB). Maintain haemodynamic stability during grafting. TOE to assess wall motion abnormalities. ATACAS trial: TXA reduces bleeding without increasing thrombotic events.</p>
            </div>
          </div>
        </div>

        <div id="opcab" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">On-Pump vs Off-Pump Cardiac Surgery (OPCAB)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Coronary artery bypass grafting (CABG) can be performed with cardiopulmonary bypass (on-pump) or on the beating heart (off-pump / OPCAB). Each approach has distinct anaesthetic challenges.
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold w-1/4">Feature</th>
                  <th className="text-left py-2 text-primary font-semibold">On-Pump (CPB)</th>
                  <th className="text-left py-2 font-semibold" style={{ color: "hsl(140, 50%, 48%)" }}>Off-Pump (OPCAB)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { feature: "Heart", onPump: "Arrested (cardioplegia) — motionless, bloodless field", offPump: "Beating throughout — stabiliser devices used on target coronary territory" },
                  { feature: "Lungs", onPump: "Ventilation stopped during CPB", offPump: "Ventilation continues — may need adjustments during posterior grafts" },
                  { feature: "Anticoagulation", onPump: "Full heparinisation (ACT >480s)", offPump: "Lower-dose heparin (ACT 250–350s); some centres use full dose" },
                  { feature: "Myocardial protection", onPump: "Cold blood/crystalloid cardioplegia ± topical cooling", offPump: "No cardioplegia — ischaemia managed by shunts, brief coronary occlusion" },
                  { feature: "Haemodynamic management", onPump: "Pump controls flow & pressure; MAP target 50–70 mmHg on bypass", offPump: "Must maintain native CO; position changes (Trendelenburg, right tilt) to expose coronary targets → haemodynamic instability" },
                  { feature: "SIRS / Inflammation", onPump: "Significant — blood–circuit contact activates complement, cytokines", offPump: "Reduced — no circuit contact; less coagulopathy and transfusion" },
                  { feature: "Coagulopathy", onPump: "Platelet dysfunction, factor consumption, fibrinolysis; protamine reversal", offPump: "Less platelet dysfunction; lower transfusion requirements" },
                  { feature: "Neurological injury", onPump: "Aortic cannulation/cross-clamp → risk of embolism, stroke (1–3%)", offPump: "Reduced aortic manipulation → potentially less stroke (partial clamp or 'no-touch' aortic technique)" },
                  { feature: "Renal effects", onPump: "Non-pulsatile flow + haemodilution may impair renal perfusion", offPump: "Pulsatile native flow maintained; may reduce AKI in high-risk patients" },
                  { feature: "Graft completeness", onPump: "Full revascularisation easier on still heart", offPump: "Posterior/lateral targets technically challenging → incomplete revascularisation risk" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 font-medium text-foreground">{row.feature}</td>
                    <td className="py-2">{row.onPump}</td>
                    <td className="py-2">{row.offPump}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* On-pump process */}
          <div className="mb-4">
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">On-Pump Process (Step by Step)</h3>
            <div className="space-y-1.5">
              {[
                "Heparin 300–400 units/kg IV → confirm ACT >480 seconds",
                "Aortic cannulation (ascending aorta) and venous cannulation (RA ± bicaval)",
                "Initiate CPB — pump takes over circulation; ventilation stopped",
                "Apply aortic cross-clamp → heart isolated from systemic circulation",
                "Deliver cardioplegia (cold blood/crystalloid) → myocardial arrest and protection",
                "Cool to target temperature (32°C moderate / 18–20°C deep hypothermic circulatory arrest)",
                "Perform surgical repair/grafting on still, bloodless field",
                "Rewarm to 37°C — de-air heart chambers (TOE guided)",
                "Remove aortic cross-clamp → heart reperfuses → defibrillate if needed",
                "Wean from CPB — optimise preload, HR/rhythm, contractility, afterload",
                "Decannulate → protamine reversal of heparin (1 mg per 100 units) → haemostasis",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded border border-border">
                  <span className="text-xs font-bold text-primary w-5 text-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* OPCAB challenges */}
          <div className="mb-4">
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">OPCAB — Anaesthetic Challenges</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Haemodynamic Instability</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Heart displacement to access posterior vessels (LAD easy, RCA moderate, circumflex/OM difficult) causes ↓ ventricular filling, ↓ CO, hypotension. Managed with Trendelenburg, right lateral tilt, volume loading, and vasopressor/inotrope support. Stabiliser compression may reduce CO by 10–30%.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Ischaemia During Grafting</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Temporary coronary occlusion (snare) during distal anastomosis causes regional ischaemia. Use intracoronary shunts when possible. Monitor ST segments continuously (5-lead ECG, V5 most sensitive). Have GTN, inotropes, and CPB on standby (conversion rate 2–15%).
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Arrhythmias</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Cardiac manipulation → VT/VF, bradycardia, heart block. External pacing must be available. Surgeon may temporarily lift heart away if arrhythmia occurs. Brief periods of haemodynamic compromise are expected and tolerated.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Conversion to On-Pump</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Must always be prepared for emergency conversion (2–15% of OPCAB cases). Reasons: intractable ischaemia, haemodynamic collapse, malignant arrhythmia, poor target vessel quality. Heparin and cannulation equipment must be immediately available.
                </p>
              </div>
            </div>
          </div>

          {/* Key trials */}
          <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <p className="text-sm font-semibold text-amber-400 mb-2">Key Evidence — Exam Relevant</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">ROOBY (2012):</strong> Off-pump had worse composite outcome at 1 year (death, MI, revascularisation) and lower graft patency vs on-pump in VA population.</p>
              <p><strong className="text-foreground">CORONARY (2012):</strong> No significant difference in 30-day death, MI, stroke, or renal failure between on- and off-pump at 5 years. Off-pump had higher repeat revascularisation rate.</p>
              <p><strong className="text-foreground">GOPCABE (2013):</strong> In elderly patients (&gt;75yr), no benefit of off-pump for 30-day or 12-month outcomes.</p>
              <p><strong className="text-foreground">Current consensus:</strong> On-pump remains the standard for most patients. OPCAB may benefit select high-risk patients (heavily calcified aorta, CKD, previous stroke). Surgeon expertise is a major determinant of outcomes.</p>
            </div>
          </div>
        </div>

        {/* Deep hypothermic circulatory arrest */}
        <div id="dhca" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Deep Hypothermic Circulatory Arrest (DHCA)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            DHCA is a controlled period of complete circulatory arrest performed under profound hypothermia (classically 14–20 °C nasopharyngeal). Cooling slows cerebral metabolism (~6–7% per °C, Q₁₀ ≈ 2–3) and provides a finite "safe" window of organ ischaemia in which the surgeon can operate on a bloodless, cannula-free aortic arch or great vessels. It is an inherently high-risk technique reserved for cases where conventional CPB cannot provide adequate exposure or distal perfusion.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">Indications — procedures potentially requiring DHCA</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Aortic arch surgery</p>
                  <p className="text-sm text-muted-foreground mt-1">Acute type A aortic dissection repair, aneurysm of the ascending aorta extending into the arch, total/hemi-arch replacement, elephant-trunk and frozen elephant-trunk procedures.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Great vessel & complex aortic work</p>
                  <p className="text-sm text-muted-foreground mt-1">Reconstruction of innominate/carotid origins, traumatic aortic transection, redo aortic surgery where safe cross-clamping is impossible.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Pulmonary endarterectomy</p>
                  <p className="text-sm text-muted-foreground mt-1">Chronic thromboembolic pulmonary hypertension (CTEPH) — bronchial back-bleeding obscures the dissection plane; brief DHCA periods (≤20 min) provide a bloodless field.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Other</p>
                  <p className="text-sm text-muted-foreground mt-1">Resection of renal/IVC tumours with intracardiac extension, complex congenital cardiac surgery (e.g. Norwood), select neurosurgical giant basilar aneurysms.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">Conduct of DHCA — step-by-step</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground pl-2">
                <li><strong>Preparation.</strong> Large-bore IV access, arterial line (right radial — assesses antegrade cerebral perfusion if innominate is cannulated), CVC/PAC, TOE, processed EEG (BIS) and bilateral cerebral oximetry (NIRS), nasopharyngeal + bladder/oesophageal temperature probes, urinary catheter, forced-air + water-mattress warming for rewarming. Cross-matched blood and clotting products immediately available.</li>
                <li><strong>Neuroprotection bundle.</strong> Pack the head in ice, give methylprednisolone 15 mg/kg or dexamethasone, mannitol 0.5 g/kg ± thiopentone 5–10 mg/kg or propofol bolus to achieve EEG burst-suppression before arrest. Maintain normoglycaemia (4–8 mmol/L); insulin infusion as required.</li>
                <li><strong>Heparinise & cannulate.</strong> Heparin 300–400 u/kg, ACT &gt;480 s. Arterial cannulation site chosen to allow selective cerebral perfusion (right axillary or innominate preferred over femoral, which risks retrograde embolisation in dissection).</li>
                <li><strong>Cooling on CPB.</strong> Cool slowly (gradient ≤10 °C between arterial blood and patient) over 20–30 min to target nasopharyngeal temperature: <em>profound</em> 14–20 °C, <em>deep</em> 20–25 °C, <em>moderate</em> 25–28 °C (most contemporary practice with adjunct cerebral perfusion). Confirm electrocerebral silence on EEG before arrest.</li>
                <li><strong>Acid–base strategy.</strong> Use <strong>pH-stat</strong> during cooling (CO₂ added to maintain pH 7.4 corrected for temperature) — promotes cerebral vasodilation and uniform brain cooling. Switch to <strong>α-stat</strong> during rewarming to preserve cerebral autoregulation. Maintain Hct ≈ 25–30%.</li>
                <li><strong>Initiate arrest.</strong> Stop the pump, drain venous blood to the reservoir, place patient head-down (Trendelenburg) to reduce air-embolism risk, and clamp arterial line. Note the precise arrest time.</li>
                <li><strong>Cerebral protection adjunct.</strong> Where feasible, use <strong>antegrade selective cerebral perfusion (ASCP)</strong> via the innominate/right axillary at 10 mL/kg/min targeting right-radial pressure 50–70 mmHg, or <strong>retrograde cerebral perfusion (RCP)</strong> via the SVC at ≤500 mL/min (CVP ≤25 mmHg). ASCP allows safe arrest times of 60–90 min vs ~30 min with hypothermia alone.</li>
                <li><strong>Surgical period.</strong> Document arrest duration continuously; aim for &lt;30 min without adjunct, &lt;45 min with RCP, &lt;60–90 min with ASCP. Beyond 40 min without selective perfusion, neurological injury rises sharply.</li>
                <li><strong>Reperfusion & rewarming.</strong> De-air the arch meticulously (TOE-guided), resume CPB, rewarm slowly with arterial-blood gradient ≤10 °C and never &gt;37 °C (hyperthermia is profoundly neurotoxic). Allow 1–2 °C/5 min rewarming; full rewarm typically 60–90 min.</li>
                <li><strong>Separation from CPB.</strong> Restore sinus rhythm (defibrillate as needed), pace as required, optimise haemodynamics with inotropes/vasopressors. Reverse heparin with protamine. Anticipate coagulopathy — give platelets, FFP, cryoprecipitate, fibrinogen concentrate guided by ROTEM/TEG. Tranexamic acid throughout (ATACAS).</li>
                <li><strong>Post-op.</strong> ICU admission ventilated; delayed neurological assessment; maintain normoglycaemia, normocapnia, MAP &gt;70 mmHg, and strict normothermia (avoid pyrexia for 48 h).</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">Complications</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Neurological</p>
                  <p className="text-sm text-muted-foreground mt-1">Stroke (5–10%), <strong>temporary neurological dysfunction</strong> (delirium, agitation — up to 30%), seizures, long-term cognitive decline. Risk rises steeply with arrest &gt;40 min without selective cerebral perfusion, hyperthermic rewarming, and increasing age.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Coagulopathy & bleeding</p>
                  <p className="text-sm text-muted-foreground mt-1">Hypothermia-induced platelet dysfunction, dilutional and consumptive coagulopathy, hyperfibrinolysis. Re-exploration for bleeding 5–15%. High transfusion requirement.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Cardiac</p>
                  <p className="text-sm text-muted-foreground mt-1">Myocardial stunning, low cardiac output syndrome, arrhythmias, prolonged inotrope requirement, occasionally need for IABP, VA-ECMO or temporary mechanical support.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Renal</p>
                  <p className="text-sm text-muted-foreground mt-1">AKI in 20–40% — multifactorial (low-flow CPB, haemoglobinuria, embolism, contrast). RRT required in 5–10%.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Respiratory</p>
                  <p className="text-sm text-muted-foreground mt-1">Prolonged ventilation, CPB-related lung injury (SIRS, capillary leak), pleural effusions, phrenic nerve injury from cold.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Systemic & metabolic</p>
                  <p className="text-sm text-muted-foreground mt-1">SIRS amplified by deep hypothermia, hyperglycaemia, hepatic dysfunction, splanchnic ischaemia, gas embolism, and rebound hyperthermia during rewarming.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
              <p className="text-sm font-semibold text-amber-400 mb-2">Key principles — exam pearls</p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Cerebral metabolic rate falls ~6–7% per °C; at 18 °C CMRO₂ is ~20% of baseline, giving ~30 min of "safe" arrest without adjunct.</li>
                <li>pH-stat during <em>cooling</em>, α-stat during <em>rewarming</em>.</li>
                <li>Antegrade selective cerebral perfusion (right axillary/innominate) is the modern gold-standard adjunct — has driven a shift from profound to moderate hypothermia (24–28 °C).</li>
                <li>Avoid hyperthermia on rewarming — never exceed 37 °C arterial blood; pyrexia in the first 24–48 h worsens neurological outcome.</li>
                <li>Always confirm electrocerebral silence (EEG burst-suppression) before circulatory arrest.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ───────── Thoracic surgery ───────── */}
        <div id="olv" className="scroll-mt-24 pt-4 border-t border-border">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">One-Lung Ventilation (OLV)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            One-lung ventilation underpins almost all thoracic surgery — lobectomy, pneumonectomy, oesophagectomy, thymectomy, lung volume reduction, and most VATS procedures. The aims are to deflate the operative lung for surgical access while maintaining adequate gas exchange through the dependent lung. Successful OLV requires the right device, confirmed correct position, and a clear plan for hypoxia.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Devices for lung isolation</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Double-Lumen Tube (DLT)</p>
              <p className="text-sm text-muted-foreground mt-1">Left-sided DLT preferred (right upper lobe anatomy variable). Confirm position with fibreoptic bronchoscopy. Sizes: 35–41 Fr (women 35–37, men 39–41). Allows independent ventilation, suction and CPAP to either lung.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Bronchial Blocker</p>
              <p className="text-sm text-muted-foreground mt-1">Alternative to DLT — passed through a single-lumen ETT. Useful in difficult airway, existing tracheostomy, or for postoperative ventilation. Slower deflation, less reliable isolation, no independent suction.</p>
            </div>
          </div>

          <div className="mt-4">
            <DLTInsertionDiagram />
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mt-6 mb-2">Physiology & hypoxia management</h3>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Hypoxic pulmonary vasoconstriction (HPV)</strong> diverts blood from the collapsed (non-dependent) lung, limiting shunt to ~20–30%. HPV is inhibited by volatiles &gt;1 MAC, vasodilators (GTN, SNP), hypothermia, and acidosis. Stepwise management of desaturation during OLV: ↑FiO₂ → check tube position with fibreoptic bronchoscope → recruitment to dependent lung → PEEP 5 cmH₂O to dependent lung → CPAP 5–10 cmH₂O to non-dependent lung → intermittent reinflation → if persistent, ask surgeon to clamp PA of operative lung (during pneumonectomy).
          </p>

          <div className="mt-4">
            <OLVTroubleshootingDiagram />
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "CPB: heparin 300-400 u/kg, target ACT >480s, reverse with protamine 1mg:100u ratio",
        "CPB activates SIRS — complement, cytokines, coagulopathy; TXA reduces bleeding (ATACAS)",
        "Left-sided DLT preferred for OLV; always confirm position with fibreoptic bronchoscopy",
        "HPV reduces shunt during OLV — inhibited by volatiles >1 MAC, vasodilators, and hypothermia",
        "Aortic stenosis: maintain SVR and sinus rhythm, avoid tachycardia and hypotension",
      ]} />

      <QuizSection questions={cardiothoracicQuestions} />
      <ReferencesList topicId="cardiothoracic" />

      <SeeAlso topicId="cardiothoracic" />
        <TopicCompletionToggle topicId="cardiothoracic" topicTitle="Cardiothoracic Anaesthesia" />
    </SectionLayout>
  );
};

export default CardiothoracicTopic;
