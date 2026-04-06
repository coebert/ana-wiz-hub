import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { ardsQuestions } from "@/data/quizzes";
import ECMOCircuitDiagram from "@/components/diagrams/ECMOCircuitDiagram";

const ARDSTopic = () => {
  return (
    <SectionLayout title="ARDS & Lung Injury" subtitle="FRCA Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Berlin Definition (2012)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Severity</th>
                  <th className="text-left py-2 text-foreground font-semibold">PaO₂/FiO₂</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mortality</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Mild</td><td>200-300 mmHg</td><td>~27%</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Moderate</td><td>100-200 mmHg</td><td>~32%</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Severe</td><td>&lt;100 mmHg</td><td>~45%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            All with: onset within 7 days, bilateral opacities on CXR/CT, not fully explained by cardiac failure/fluid overload, PEEP ≥5 cmH₂O.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Management Strategy</h2>
          <div className="space-y-3">
            {[
              { level: "Foundation", items: "Lung-protective ventilation (VT 6 ml/kg IBW, Pplat ≤30), conservative fluid strategy, treat underlying cause" },
              { level: "Moderate ARDS", items: "Higher PEEP strategy, prone positioning for ≥16 hours/day (PROSEVA — mortality benefit), neuromuscular blockade in first 48h (ACURASYS/ROSE)" },
              { level: "Severe / Rescue", items: "VV-ECMO (EOLIA — referral for PaO₂/FiO₂ <80 despite optimisation), inhaled nitric oxide (↑V/Q matching, no mortality benefit), recruitment manoeuvres (caution — ART trial)" },
            ].map((l) => (
              <div key={l.level} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{l.level}</p>
                <p className="text-sm text-muted-foreground mt-1">{l.items}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Prone Positioning</h2>
          <p className="text-muted-foreground leading-relaxed">
            PROSEVA trial (2013): prone positioning ≥16h/day in moderate-severe ARDS (P/F &lt;150) reduced 28-day mortality from 32.8% to 16.0% (NNT = 6). Mechanism: improved V/Q matching, recruitment of dorsal lung, reduced transpulmonary pressure gradient, improved drainage of secretions. Contraindications: spinal instability, open abdomen, raised ICP.
          </p>
        </div>
      </section>

      {/* ECMO Section */}
      <ECMOCircuitDiagram />

      <section className="space-y-6 mb-10">
        {/* ECMO Indications & Referral */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ECMO — Indications & Referral Criteria</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">VV-ECMO — Refractory Hypoxaemia</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>EOLIA criteria:</strong> PaO₂/FiO₂ &lt;80 mmHg for &gt;6 hours, OR PaO₂/FiO₂ &lt;50 for &gt;3 hours, OR pH &lt;7.25 + PaCO₂ ≥60 mmHg for &gt;6 hours — despite optimal conventional management (prone, PEEP, NMB). Refer early to ECMO centre. UK: 5 designated centres (Glenfield, Royal Papworth, St Thomas', Aberdeen, GICU).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">VA-ECMO — Cardiogenic Shock</p>
              <p className="text-sm text-muted-foreground mt-1">
                Refractory cardiogenic shock despite inotropes/IABP. Indications: massive MI, fulminant myocarditis, post-cardiotomy shock, cardiac arrest (eCPR), bridge to LVAD/transplant, pulmonary embolism with RV failure. Also bridge to decision in hypothermic cardiac arrest.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ Contraindications to ECMO</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Absolute:</strong> Irreversible condition with no plan (bridge to nowhere), advanced directives refusing. <strong>Relative:</strong> Prolonged MV &gt;10 days, severe immunosuppression, uncontrolled bleeding, severe aortic regurgitation (VA-ECMO), aortic dissection.
              </p>
            </div>
          </div>
        </div>

        {/* Key ECMO Parameters */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Adjustable ECMO Parameters</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                  <th className="text-left py-2 text-foreground font-semibold">Controls</th>
                  <th className="text-left py-2 text-foreground font-semibold">Clinical Effect</th>
                  <th className="text-left py-2 text-foreground font-semibold">Typical Range</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Blood flow rate (RPM)</td>
                  <td className="py-2">Oxygenation (primary)</td>
                  <td className="py-2">↑ flow = ↑ O₂ delivery. In VA-ECMO also ↑ cardiac output support</td>
                  <td className="py-2">3–6 L/min (60–80 ml/kg/min)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Sweep gas flow</td>
                  <td className="py-2">CO₂ removal (primary)</td>
                  <td className="py-2">↑ sweep = ↑ CO₂ clearance. Independent of blood flow. Very efficient — even low flows clear CO₂</td>
                  <td className="py-2">1–10 L/min (start 1:1 with blood flow)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">FdO₂ (sweep gas FiO₂)</td>
                  <td className="py-2">Oxygenation</td>
                  <td className="py-2">Fraction of O₂ in sweep gas. Usually kept at 1.0 initially, can wean as lung recovers</td>
                  <td className="py-2">0.21–1.0</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Temperature (heater)</td>
                  <td className="py-2">Patient temperature</td>
                  <td className="py-2">Heat exchanger integrated into circuit. Can actively warm or cool (TTM post-arrest)</td>
                  <td className="py-2">33–37°C</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Ventilator settings</td>
                  <td className="py-2">Lung rest</td>
                  <td className="py-2">"Rest settings" to minimise VILI: FiO₂ 0.3, PEEP 10, RR 10, Pplat &lt;25. Lungs kept open but not stressed</td>
                  <td className="py-2">Ultra-protective: TV 3–4 ml/kg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Oxygenation Troubleshooting</p>
              <p className="text-xs text-muted-foreground mt-1">
                Low SpO₂ on ECMO: ↑ blood flow rate → ↑ FdO₂ → check for recirculation (VV) → check haemoglobin (aim Hb &gt;70–80 g/L) → check oxygenator function (pre/post-oxygenator gases) → consider native lung recruitment.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">CO₂ Troubleshooting</p>
              <p className="text-xs text-muted-foreground mt-1">
                High PaCO₂: ↑ sweep gas flow (most effective). Low PaCO₂: ↓ sweep gas flow. <strong>Caution:</strong> Rapid CO₂ correction can cause cerebral vasoconstriction → seizures. Reduce PaCO₂ slowly (&lt;10 mmHg/hr).
              </p>
            </div>
          </div>
        </div>

        {/* Anticoagulation */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anticoagulation on ECMO</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The extracorporeal circuit activates the coagulation cascade on contact with foreign surfaces. Anticoagulation is essential to prevent circuit thrombosis but must be balanced against bleeding risk — the leading cause of morbidity on ECMO.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                  <th className="text-left py-2 text-foreground font-semibold">Monitoring</th>
                  <th className="text-left py-2 text-foreground font-semibold">Target</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Unfractionated Heparin (UFH)</td>
                  <td className="py-2">AT-III dependent thrombin/Xa inhibition</td>
                  <td className="py-2">APTT, anti-Xa, ACT</td>
                  <td className="py-2">APTT 50–70s or anti-Xa 0.3–0.5 IU/mL (ACT 180–220s)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Bivalirudin</td>
                  <td className="py-2">Direct thrombin inhibitor (AT-III independent)</td>
                  <td className="py-2">APTT, ECT, ACT</td>
                  <td className="py-2">APTT 50–80s. No antidote (short t½ ~25 min). Dose: 0.05–0.2 mg/kg/hr</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Argatroban</td>
                  <td className="py-2">Direct thrombin inhibitor</td>
                  <td className="py-2">APTT</td>
                  <td className="py-2">APTT 1.5–3× baseline. Used in HIT. Hepatic metabolism — caution in liver failure</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">No anticoagulation</td>
                  <td className="py-2">—</td>
                  <td className="py-2">Close circuit inspection</td>
                  <td className="py-2">Considered in active bleeding, recent surgery, DIC. Higher blood flows (&gt;3.5 L/min) + heparin-bonded circuits reduce clotting risk</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Heparin-Induced Thrombocytopenia (HIT) on ECMO</p>
              <p className="text-sm text-muted-foreground mt-1">
                HIT is a clinical diagnosis on ECMO — thrombocytopenia is common from consumption, haemodilution, and circuit sequestration. 4Ts score is unreliable. If suspected: stop all heparin (including flushes and heparin-bonded lines), send HIT antibodies + SRA, switch to <strong>bivalirudin</strong> or <strong>argatroban</strong>. Do NOT use LMWH (cross-reactivity).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Acquired Von Willebrand Syndrome (AVWS)</p>
              <p className="text-sm text-muted-foreground mt-1">
                High shear stress in centrifugal pump cleaves large vWF multimers → acquired type 2A vWD. Causes mucosal bleeding (GI, pulmonary, surgical sites). Occurs in nearly all ECMO patients. Management: DDAVP, vWF concentrate, reduce pump speed if possible. Monitor: vWF activity/antigen ratio.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Practical Anticoagulation Strategy</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Initiation:</strong> UFH bolus 50–100 IU/kg at cannulation → infusion 10–20 IU/kg/hr. <strong>Monitoring:</strong> APTT 4–6 hourly initially. Anti-Xa more reliable in critical illness (less affected by factor depletion). <strong>AT-III:</strong> If APTT unresponsive to heparin escalation → check AT-III levels → supplement if &lt;60% (AT-III concentrate). <strong>Bleeding:</strong> Most centres accept lower targets (APTT 40–50s) or withhold anticoagulation with high blood flows.
              </p>
            </div>
          </div>
        </div>

        {/* ECMO Complications */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ECMO Complications</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "Bleeding", detail: "Most common complication (30–50%). Surgical sites, cannulation sites, GI, intracranial. Manage: reduce anticoagulation, transfuse, surgical control, consider AVWS." },
              { title: "Circuit thrombosis", detail: "Oxygenator clot (↑ transmembrane pressure gradient, ↓ gas exchange) → exchange oxygenator. Pump head thrombus. Cannula thrombus." },
              { title: "Haemolysis", detail: "Shear stress from pump, kinking, high RPM. Monitor: plasma-free Hb, LDH, haptoglobin. Manage: ↓ RPM, check circuit for kinks, exchange pump head." },
              { title: "Limb ischaemia (VA)", detail: "Femoral artery cannulation → distal ischaemia. Prevented by distal perfusion cannula (6–8 Fr). Monitor: NIRS, pulse oximetry on ipsilateral foot, hourly limb checks." },
              { title: "Air embolism", detail: "Catastrophic — air enters drainage side (negative pressure). Prevention: secure all connections, avoid access proximal to drainage. Emergency: clamp circuit, Trendelenburg, aspirate air." },
              { title: "Infection", detail: "Cannula-related bloodstream infection. Daily inspection, aseptic technique. Empiric treatment as per local protocol if septic. Circuit is NOT routinely changed." },
            ].map((c) => (
              <div key={c.title} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{c.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weaning */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ECMO Weaning & Decannulation</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">VV-ECMO Weaning</p>
              <p className="text-sm text-muted-foreground mt-1">
                Evidence of lung recovery: improving CXR, compliance, native gas exchange. <strong>Sweep-off trial:</strong> Reduce sweep gas to 0 (blood still flowing) → assess native gas exchange on "rest" ventilator settings. If PaO₂ &gt;60 mmHg and PaCO₂ &lt;50 mmHg on FiO₂ ≤0.5 and PEEP ≤10 for 4–6 hours → decannulate. Do NOT reduce blood flow (clotting risk).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">VA-ECMO Weaning</p>
              <p className="text-sm text-muted-foreground mt-1">
                Evidence of cardiac recovery: improving EF on echo, ↑ pulse pressure, ↑ aortic VTI. <strong>Turndown trial:</strong> Gradually reduce flow (by 0.5 L/min every few hours) to minimum (1–1.5 L/min) while monitoring haemodynamics. Assess: MAP, CVP, lactate, echo (LV function, filling). If stable at minimum flow → decannulate. Ensure adequate anticoagulation during low flows.
              </p>
            </div>
          </div>
        </div>

        {/* Key Evidence */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key ECMO Evidence</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Trial</th>
                  <th className="text-left py-2 text-foreground font-semibold">Population</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key Finding</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">CESAR (2009)</td>
                  <td className="py-2">Severe ARDS (Murray ≥3)</td>
                  <td className="py-2">Transfer to ECMO centre improved survival (63% vs 47%), but not all received ECMO — benefit may be centre expertise</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">EOLIA (2018)</td>
                  <td className="py-2">Very severe ARDS (P/F &lt;80)</td>
                  <td className="py-2">60-day mortality 35% vs 46% (p=0.09). Not significant but 28% crossover. Bayesian post-hoc: ~88% probability of benefit. Changed practice despite failing primary endpoint.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">ELSO Registry</td>
                  <td className="py-2">Global ECMO data</td>
                  <td className="py-2">Adult respiratory ECMO survival ~60%. Cardiac ~40%. eCPR ~30%. COVID-era survival lower (~48% respiratory).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Berlin definition: mild (P/F 200-300), moderate (100-200), severe (<100) with PEEP ≥5",
        "Lung-protective ventilation: VT 6 ml/kg IBW, Pplat ≤30, driving pressure ≤15",
        "Prone positioning ≥16h/day reduces mortality in moderate-severe ARDS (PROSEVA)",
        "VV-ECMO: respiratory support only — ↑ blood flow = ↑ oxygenation, ↑ sweep = ↑ CO₂ removal",
        "VA-ECMO: cardiac + respiratory — risk of Harlequin syndrome (monitor R radial SpO₂) and LV distension",
        "UFH is first-line anticoagulation: target APTT 50–70s or anti-Xa 0.3–0.5 IU/mL; bivalirudin for HIT",
        "AVWS occurs in nearly all ECMO patients — high shear cleaves vWF multimers → mucosal bleeding",
        "VV weaning: sweep-off trial (NOT flow-off). VA weaning: gradual flow reduction with echo assessment",
        "EOLIA: VV-ECMO for P/F <80 — non-significant but practice-changing (28% crossover, Bayesian benefit ~88%)",
      ]} />

      <QuizSection questions={ardsQuestions} />
      <TopicCompletionToggle topicId="ards" topicTitle="ARDS &amp; Lung Injury" />
    </SectionLayout>
  );
};

export default ARDSTopic;
