import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { arrhythmiasEcgIcuQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import TopicTableOfContents from "@/components/TopicTableOfContents";
import CardiacConductionDiagram from "@/components/diagrams/CardiacConductionDiagram";
import HeartBlockDiagram from "@/components/diagrams/HeartBlockDiagram";
import BundleBranchBlockDiagram from "@/components/diagrams/BundleBranchBlockDiagram";
import TachyarrhythmiaDiagram from "@/components/diagrams/TachyarrhythmiaDiagram";
import BradyarrhythmiaDiagram from "@/components/diagrams/BradyarrhythmiaDiagram";
import PacingDevicesDiagram from "@/components/diagrams/PacingDevicesDiagram";
import TwelveLeadEcgDiagram from "@/components/diagrams/TwelveLeadEcgDiagram";
import StemiLocalisationDiagram from "@/components/diagrams/StemiLocalisationDiagram";
import { CoronarySelectionProvider } from "@/components/diagrams/coronarySelectionContext";
import ExpandableEcgCard from "@/components/diagrams/ExpandableEcgCard";
import WellensSyndromeDiagram from "@/components/diagrams/WellensSyndromeDiagram";
import {
  bradyContent,
  heartBlockContent,
  bbbContent,
  tachyContent,
  twelveLeadContent,
  wellensContent,
} from "@/components/diagrams/ecgExpandedContent";

const tocItems = [
  { id: "ecg-approach", label: "Systematic ECG approach", group: "Interpretation" },
  { id: "12-lead", label: "12-lead schematic", group: "Interpretation" },
  { id: "wellens", label: "Wellens syndrome", group: "Interpretation" },
  { id: "bradys", label: "Bradyarrhythmias", group: "Rhythms" },
  { id: "heart-block", label: "Heart block", group: "Rhythms" },
  { id: "bbb", label: "Bundle branch block", group: "Rhythms" },
  { id: "tachys", label: "Tachyarrhythmias", group: "Rhythms" },
  { id: "peri-arrest", label: "Peri-arrest algorithms", group: "Management" },
  { id: "electrolytes", label: "Electrolytes & drugs", group: "Management" },
  { id: "pacing-devices", label: "Pacing & ICDs", group: "Management" },
  { id: "post-arrest", label: "Post-cardiac-arrest care", group: "Management" },
];

const ArrhythmiasEcgIcuTopic = () => {
  return (
    <SectionLayout
      title="Arrhythmias & ECG Interpretation"
      subtitle="FFICM / Final FRCA — Cardiovascular Critical Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
    >
      <TopicTableOfContents items={tocItems} />

      {/* ─────────── Systematic ECG approach ─────────── */}
      <section className="space-y-6 mb-10">
        <div id="ecg-approach" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">A Systematic ECG Approach in the ICU</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            ICU patients accumulate dozens of ECGs — most reviewed in seconds. A reproducible
            sequence catches the dangerous findings (ischaemia, electrolyte disturbance, drug
            toxicity, arrhythmia) before the haemodynamic collapse. Apply the same eight steps
            to every strip and full 12-lead.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { step: "1. Rate", detail: "300 / number of large squares between R waves (regular). Or count complexes in a 6 s strip × 10 (irregular). Brady < 60, tachy > 100." },
              { step: "2. Rhythm", detail: "Regular vs irregular vs irregularly irregular. Identify the underlying pacemaker (sinus, atrial, junctional, ventricular)." },
              { step: "3. P waves", detail: "Present? Uniform? One per QRS? Inverted (junctional / retrograde)? Sawtooth (flutter)? Absent / fibrillatory (AF)?" },
              { step: "4. PR interval", detail: "Normal 120–200 ms. Long → 1°/2° AV block. Short + delta wave → WPW." },
              { step: "5. QRS", detail: "Width (narrow ≤ 120 ms vs wide > 120 ms), morphology (RBBB/LBBB), axis. Wide QRS = ventricular origin OR aberrant supraventricular conduction." },
              { step: "6. ST/T", detail: "Elevation (STEMI, pericarditis, BER, LBBB), depression (ischaemia, posterior MI, digoxin), T inversion. Compare to old ECGs." },
              { step: "7. QT", detail: "Corrected QT (Bazett: QT/√RR). Prolonged > 500 ms = torsades risk. Drugs, ↓K⁺, ↓Mg²⁺, ↓Ca²⁺, congenital LQTS." },
              { step: "8. Compare", detail: "Always compare with a previous ECG. New changes are far more meaningful than absolute values in isolation." },
            ].map((s) => (
              <div key={s.step} className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">{s.step}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg border border-icu/30 bg-icu/5">
            <p className="text-sm font-semibold text-foreground mb-1">ICU red-flag patterns</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li><span className="font-medium text-foreground">Wide-complex tachycardia</span> — assume VT until proven otherwise (especially with structural heart disease).</li>
              <li><span className="font-medium text-foreground">New LBBB + chest pain or ROSC</span> — treat as STEMI equivalent; consider PPCI.</li>
              <li><span className="font-medium text-foreground">QTc &gt; 500 ms</span> — stop QT-prolonging drugs, replete K⁺ &gt; 4.5 and Mg²⁺ &gt; 1.0 mmol/L.</li>
              <li><span className="font-medium text-foreground">Peaked T waves + wide QRS</span> — hyperkalaemia, give 10 mL 10 % calcium gluconate <em>now</em>.</li>
              <li><span className="font-medium text-foreground">U waves + flat T + long QU</span> — hypokalaemia → torsades risk.</li>
            </ul>
          </div>
        </div>

        {/* ─────────── 12-lead schematic (linked to coronary territory) ─────────── */}
        <div id="12-lead" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">12-Lead Schematic & Coronary Territories</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Each lead "looks at" a region of the LV supplied by a specific coronary artery. Click a
            territory or a lead to see how ST changes localise the culprit vessel — vital for ROSC,
            STEMI activation, and post-thrombolysis ECGs.
          </p>
          <CoronarySelectionProvider initial="anterior">
            <ExpandableEcgCard content={twelveLeadContent}>
              {() => (
                <>
                  <TwelveLeadEcgDiagram />
                  <StemiLocalisationDiagram />
                </>
              )}
            </ExpandableEcgCard>
          </CoronarySelectionProvider>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Reciprocal change is your friend</p>
              <p className="text-xs text-muted-foreground mt-1">Inferior STEMI (II, III, aVF) often shows ST depression in I/aVL. Posterior STEMI shows tall R + ST depression in V1–V3 — confirm with V7–V9.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Right-sided leads</p>
              <p className="text-xs text-muted-foreground mt-1">Inferior STEMI: always do V4R. ST elevation = RV infarct → preload-dependent → cautious nitrates, fluid load, avoid β-blockers.</p>
        </div>

        {/* ─────────── Wellens syndrome ─────────── */}
        <div id="wellens" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Wellens Syndrome</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Wellens syndrome is a pre-infarction ECG pattern caused by a critical proximal LAD
            stenosis. The classic trap is that the patient is <span className="font-medium text-foreground">pain-free</span> at the time of the ECG, the
            <span className="font-medium text-foreground"> ST segment is isoelectric</span>, and the <span className="font-medium text-foreground">troponin is often normal</span> — yet without
            angiography they are at very high risk of an extensive anterior MI within days. Two
            morphologies are recognised in V2–V3: <span className="font-medium text-foreground">pattern A</span> (biphasic positive-then-negative T
            waves, ≈ 25%) and <span className="font-medium text-foreground">pattern B</span> (deep symmetrically inverted T waves, ≈ 75%, often spilling
            into V1 and V4). Recognise it, do not stress test, refer for early invasive coronary
            angiography.
          </p>
          <ExpandableEcgCard content={wellensContent}>
            {() => <WellensSyndromeDiagram />}
          </ExpandableEcgCard>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-3 rounded-lg border border-icu/30 bg-icu/5">
              <p className="font-semibold text-foreground text-sm">de Zwaan diagnostic criteria</p>
              <ul className="text-xs text-muted-foreground mt-1 space-y-0.5 leading-snug">
                <li>· Recent angina, now resolved</li>
                <li>· Biphasic or deeply inverted T in V2–V3 (± V1, V4)</li>
                <li>· Isoelectric or minimally elevated ST (&lt; 1 mm)</li>
                <li>· Preserved precordial R waves, no Q waves</li>
                <li>· Normal or only minimally elevated troponin</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Pseudonormalisation pitfall</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">
                The Wellens T waves can transiently revert to upright when chest pain returns —
                this represents <em>active re-occlusion</em> of the LAD, not improvement. A repeat
                ECG during pain that looks "more normal" than the pain-free baseline is a red flag
                for evolving STEMI: activate the primary PCI pathway.
              </p>
            </div>
          </div>
        </div>
          </div>
        </div>

        <CardiacConductionDiagram />

        {/* ─────────── Bradyarrhythmias ─────────── */}
        <div id="bradys" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bradyarrhythmias</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            In ICU, bradycardia is rarely "physiological". Look for <span className="font-medium text-foreground">drugs</span> (β-blockers,
            digoxin, dexmedetomidine, opioids, amiodarone), <span className="font-medium text-foreground">ischaemia</span> (inferior MI affects
            the SA/AV nodal supply via RCA), <span className="font-medium text-foreground">electrolytes</span> (hyperkalaemia, hypothermia),
            <span className="font-medium text-foreground"> raised ICP</span> (Cushing's reflex), and <span className="font-medium text-foreground">hypoxia/vagal</span> stimulation.
          </p>
          <ExpandableEcgCard content={bradyContent}>
            {() => <BradyarrhythmiaDiagram />}
          </ExpandableEcgCard>
        </div>

        {/* ─────────── Heart block ─────────── */}
        <div id="heart-block" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Heart Block</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The site of block predicts both the escape rhythm and the device choice. Nodal blocks
            (1°, Mobitz I) usually have a junctional escape and tolerate observation. Infranodal
            blocks (Mobitz II, complete) drop to a slow ventricular escape — early temporary pacing
            and definitive PPM.
          </p>
          <ExpandableEcgCard content={heartBlockContent}>
            {() => <HeartBlockDiagram />}
          </ExpandableEcgCard>
        </div>

        {/* ─────────── Bundle branch block ─────────── */}
        <div id="bbb" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bundle Branch & Fascicular Block</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Recognising bundle branch block matters in ICU because it complicates STEMI diagnosis
            (Sgarbossa criteria for new LBBB), masks underlying ischaemia, and warns of progression
            to complete heart block (e.g. bifascicular + 1° = trifascicular block — pace early).
          </p>
          <ExpandableEcgCard content={bbbContent}>
            {() => <BundleBranchBlockDiagram />}
          </ExpandableEcgCard>
        </div>

        {/* ─────────── Tachyarrhythmias ─────────── */}
        <div id="tachys" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Tachyarrhythmias</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The key bedside split: <span className="font-medium text-foreground">narrow vs wide</span>, then
            <span className="font-medium text-foreground"> regular vs irregular</span>. New-onset AF affects up to a third of ventilated
            septic patients and is often the first sign of evolving shock, fluid overload, or
            electrolyte derangement — treat the cause before reaching for amiodarone.
          </p>
          <ExpandableEcgCard content={tachyContent}>
            {() => <TachyarrhythmiaDiagram />}
          </ExpandableEcgCard>
        </div>

        {/* ─────────── Peri-arrest algorithms ─────────── */}
        <div id="peri-arrest" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Peri-arrest Algorithms (RCUK 2021)</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm mb-2">Tachycardia algorithm</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>1. <span className="font-medium text-foreground">Adverse features?</span> Shock · Syncope · Myocardial ischaemia · Heart failure → <span className="font-medium text-foreground">synchronised DCCV ×3</span> (sedate / GA), then amiodarone 300 mg over 10–20 min and re-shock.</li>
                <li>2. Stable + <span className="font-medium text-foreground">narrow regular</span>: vagal manoeuvres → adenosine 6 → 12 → 18 mg.</li>
                <li>3. Stable + <span className="font-medium text-foreground">narrow irregular</span>: probable AF → rate control (β-blocker / diltiazem; amiodarone if HF) ± anticoagulate.</li>
                <li>4. Stable + <span className="font-medium text-foreground">wide regular</span>: assume VT → amiodarone 300 mg IV over 20–60 min.</li>
                <li>5. Stable + <span className="font-medium text-foreground">wide irregular</span>: AF + BBB, polymorphic VT (Mg²⁺), pre-excited AF (DCCV — avoid AV nodal blockers).</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm mb-2">Bradycardia algorithm</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>1. <span className="font-medium text-foreground">Adverse features?</span> (as above) → <span className="font-medium text-foreground">atropine 500 mcg IV</span>, repeat to 3 mg.</li>
                <li>2. Risk factors for asystole: recent asystole, Mobitz II, complete block with broad QRS, ventricular pause &gt; 3 s.</li>
                <li>3. Interim: <span className="font-medium text-foreground">isoprenaline 5 µg/min</span>, <span className="font-medium text-foreground">adrenaline 2–10 µg/min</span>, <span className="font-medium text-foreground">glucagon</span> for β-blocker / CCB toxicity.</li>
                <li>4. <span className="font-medium text-foreground">Transcutaneous pacing</span> as a bridge — sedate; capture is mechanical (palpate pulse), not just electrical.</li>
                <li>5. Definitive: <span className="font-medium text-foreground">transvenous pacing wire</span> ± permanent device.</li>
              </ul>
            </div>
            <div className="md:col-span-2 p-4 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm mb-2">Cardiac arrest — shockable rhythms (VF / pulseless VT)</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Defibrillate immediately — biphasic 120–150 J first shock (manufacturer-specific), then 150–200 J.</li>
                <li>• 2 min CPR (30:2 if no advanced airway; continuous if intubated). Minimise hands-off time.</li>
                <li>• Adrenaline 1 mg IV after the 3rd shock, then every 3–5 min. Amiodarone 300 mg after the 3rd shock; further 150 mg after the 5th.</li>
                <li>• Search for the <span className="font-medium text-foreground">4 Hs and 4 Ts</span>: Hypoxia, Hypovolaemia, Hyper/hypokalaemia &amp; metabolic, Hypothermia · Tension pneumothorax, Tamponade, Toxins, Thrombosis.</li>
                <li>• <span className="font-medium text-foreground">eFAST + arterial line + ETCO₂</span> during CPR: ETCO₂ &lt; 10 mmHg suggests poor compressions or futility; sudden ↑ ETCO₂ heralds ROSC.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─────────── Electrolytes & drugs ─────────── */}
        <div id="electrolytes" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Electrolyte &amp; Drug-Induced Arrhythmias</h2>
          <div className="space-y-2">
            {[
              { label: "Hyperkalaemia (K⁺ > 6.0)", ecg: "Peaked T → loss of P → wide QRS → sine-wave → VF/asystole.", treatment: "10 mL 10 % calcium gluconate IV (membrane stabilisation), insulin–dextrose, salbutamol nebs, sodium bicarbonate (if acidotic), definitive removal (RRT). Treat the rhythm, not the number." },
              { label: "Hypokalaemia (K⁺ < 3.5)", ecg: "Flat / inverted T, prominent U wave, prolonged QU, ST depression.", treatment: "Replace cautiously (max 20 mmol/h peripherally, 40 mmol/h centrally with monitoring). Always replace Mg²⁺ alongside — refractory hypoK⁺ is often hypoMg²⁺." },
              { label: "Hypomagnesaemia (Mg²⁺ < 0.7)", ecg: "Prolonged QT, torsades de pointes, refractory hypoK⁺.", treatment: "2 g IV Mg²⁺ over 10 min for torsades, then infusion. Mandatory in suspected polymorphic VT even if Mg²⁺ is normal." },
              { label: "Hypocalcaemia (iCa²⁺ < 1.0)", ecg: "Prolonged QT (long ST segment), neuromuscular irritability.", treatment: "10 mL 10 % calcium gluconate IV (peripheral) or 10 mL 10 % calcium chloride centrally. Common after massive transfusion (citrate)." },
              { label: "Digoxin toxicity", ecg: "Reverse-tick / 'Salvador Dalí' ST depression, frequent VEs, slow AF, atrial tachycardia with block, bidirectional VT.", treatment: "Correct K⁺ (low K⁺ enhances toxicity), avoid DC shock if possible (refractory VF), Digibind (digoxin-specific Fab) for haemodynamic compromise." },
              { label: "Tricyclic / Na⁺-channel blocker overdose", ecg: "Wide QRS, R wave in aVR > 3 mm, terminal R aVR, sinus tachycardia, VT.", treatment: "Sodium bicarbonate 1–2 mmol/kg IV bolus until QRS narrows and pH 7.45–7.55; intubate and hyperventilate; magnesium and lipid emulsion for refractory cases." },
              { label: "Local anaesthetic systemic toxicity (LAST)", ecg: "Widening QRS, bradycardia, asystole, refractory VT/VF.", treatment: "Stop injection, 100 % O₂, 20 % Intralipid 1.5 mL/kg bolus then 0.25 mL/kg/min infusion, prolonged CPR — lipid sink rescues sodium channels." },
            ].map((e) => (
              <div key={e.label} className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">{e.label}</p>
                <p className="text-xs text-muted-foreground mt-1"><span className="font-medium text-foreground">ECG:</span> {e.ecg}</p>
                <p className="text-xs text-muted-foreground mt-0.5"><span className="font-medium text-foreground">Treatment:</span> {e.treatment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─────────── Pacing & defibrillation devices ─────────── */}
        <div id="pacing-devices" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pacing &amp; Defibrillator Devices in the ICU</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Recognise device, mode, and the patient's degree of pacing dependence on every ICU
            admission. For any ICU patient with a CIED: interrogate, document the magnet response,
            and have transcutaneous pacing pads on before procedures involving diathermy or
            defibrillation.
          </p>
          <PacingDevicesDiagram />
        </div>

        {/* ─────────── Post-cardiac-arrest care ─────────── */}
        <div id="post-arrest" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Post-cardiac-arrest Care &amp; ECG Surveillance</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Immediate post-ROSC</p>
              <p className="text-xs text-muted-foreground mt-1">12-lead within 10 min. STEMI / new LBBB → urgent PPCI. Aim SpO₂ 94–98 %, normocapnia (PaCO₂ 4.5–6.0 kPa), MAP ≥ 65 mmHg (often higher in chronic hypertension).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Targeted temperature management</p>
              <p className="text-xs text-muted-foreground mt-1">TTM2 trial: target 33–36 °C vs strict normothermia &lt; 37.7 °C; avoid fever for 72 h. Cooling can prolong QT and provoke bradyarrhythmias — monitor closely.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Recurrent arrhythmia prevention</p>
              <p className="text-xs text-muted-foreground mt-1">Replace K⁺ to 4.5 mmol/L, Mg²⁺ &gt; 1.0 mmol/L. Continue / start β-blocker once haemodynamics permit. Amiodarone infusion for refractory VT/VF (1 mg/min ×6 h, then 0.5 mg/min ×18 h).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">ICD considerations</p>
              <p className="text-xs text-muted-foreground mt-1">Survivors of VF/VT arrest without reversible cause meet secondary-prevention ICD criteria. Liaise with cardiology before discharge from ICU.</p>
            </div>
          </div>
        </div>
      </section>

      <KeyLearningPoints
        points={[
          "Apply the same 8-step ECG analysis (rate · rhythm · P · PR · QRS · ST/T · QT · compare) to every strip — speed comes from consistency, not shortcuts",
          "Wide-complex tachycardia in an ICU patient = VT until proven otherwise",
          "New-onset AF in ventilated sepsis is usually a marker of evolving shock, fluid overload, or electrolyte derangement — treat the trigger, not just the rhythm",
          "Site of AV block predicts the device: nodal (1°/Mobitz I) tolerate observation; infranodal (Mobitz II/complete) need urgent pacing",
          "Adverse features (shock, syncope, ischaemia, heart failure) drive the algorithm: synchronised DCCV for unstable tachy, atropine → pacing for unstable brady",
          "Always replace magnesium when replacing potassium — refractory hypoK⁺ is often hypoMg²⁺",
          "Hyperkalaemia: treat the rhythm with calcium first, the number afterwards",
          "Post-ROSC: 12-lead within 10 min, MAP ≥ 65 mmHg, SpO₂ 94–98 %, normocapnia, fever avoidance for 72 h",
        ]}
      />

      <QuizSection questions={arrhythmiasEcgIcuQuestions} />
      <ReferencesList topicId="arrhythmias-ecg-icu" />
      <SeeAlso topicId="arrhythmias-ecg-icu" />
      <TopicCompletionToggle topicId="arrhythmias-ecg-icu" topicTitle="Arrhythmias & ECG Interpretation" />
    </SectionLayout>
  );
};

export default ArrhythmiasEcgIcuTopic;
