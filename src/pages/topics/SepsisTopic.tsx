import { TopicTemplate } from "@/components/TopicTemplate";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { sepsisQuestions } from "@/data/quizzes";
import SepsisManagementDiagram from "@/components/diagrams/SepsisManagementDiagram";
import SepsisBiomarkerKineticsDiagram from "@/components/diagrams/SepsisBiomarkerKineticsDiagram";
import SepsisHostResponseDiagram from "@/components/diagrams/SepsisHostResponseDiagram";
import SepsisScoreCalculator from "@/components/diagrams/SepsisScoreCalculator";
import LactateCRTTool from "@/components/diagrams/LactateCRTTool";
import VasopressorLadderTool from "@/components/diagrams/VasopressorLadderTool";
import AlbuminFluidShiftDiagram from "@/components/diagrams/AlbuminFluidShiftDiagram";
import type { WorkedExample } from "@/components/WorkedExamples";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Apply Sepsis-3 definitions and use SOFA / qSOFA / NEWS2 to recognise sepsis and septic shock.",
  "Deliver the SSC Hour-1 bundle and justify antibiotic, fluid and vasopressor choices.",
  "Titrate noradrenaline, vasopressin, adrenaline and hydrocortisone for catecholamine-resistant shock.",
  "Interpret lactate, CRP, procalcitonin and presepsin trends to guide resuscitation and antibiotic stewardship.",
  "Compare SSC 2021, NICE NG51 and IDSA 2024 guidance on antibiotic timing, fluids and steroids.",
  "Plan source control and de-escalation, including PCT-guided antibiotic stop rules.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Recognising septic shock at the bedside",
    scenario: (
      <>
        72-year-old with urinary sepsis. After 30 mL/kg Hartmann's: BP 82/40 (MAP 54), HR 118,
        lactate 3.6 mmol/L, RR 26, GCS 14. Noradrenaline started. Does this meet septic shock
        criteria?
      </>
    ),
    working: (
      <>
        Sepsis-3 septic shock = sepsis + <strong>vasopressor required for MAP ≥65</strong> AND
        <strong> lactate &gt;2 mmol/L</strong> after adequate fluid. Both true here. qSOFA
        (RR ≥22 ✓, altered mentation ✓, SBP ≤100 ✓) = 3.
      </>
    ),
    answer: (
      <>
        <strong>Septic shock confirmed.</strong> Hospital mortality ~40%. Escalate: titrate
        noradrenaline to MAP ≥65, recheck lactate at 2 h, add vasopressin 0.03 U/min if NA
        &gt;0.25–0.5 µg/kg/min, hydrocortisone 200 mg/day if vasopressor-dependent &gt;4 h, urgent
        source control (CT KUB ± nephrostomy).
      </>
    ),
   cites: ["Sepsis-3 2016"],
  },
  {
    title: "Fluid resuscitation calculation",
    scenario: (
      <>
        85 kg patient with septic shock. What initial crystalloid volume does SSC 2021 recommend,
        and what fluid would you choose?
      </>
    ),
    working: (
      <>
        SSC: 30 mL/kg balanced crystalloid within 3 h → 30 × 85 ={" "}
        <strong>2 550 mL</strong>. Avoid 0.9% saline (hyperchloraemic acidosis, AKI signal in
        SMART/SALT-ED), starches (VISEP/CHEST — AKI/death), gelatins.
      </>
    ),
    answer: (
      <>
        Give ~2.5 L Hartmann's or Plasma-Lyte. Reassess <em>dynamically</em> after each 250–500
        mL bolus (PLR, stroke volume variation, IVC, capillary refill — ANDROMEDA-SHOCK). IDSA
        2024 cautions against rigidly chasing 30 mL/kg if not fluid-responsive — switch to
        vasopressors and consider albumin if &gt;60–80 mL/kg given.
      </>
    ),
    cites: ["SSC 2021"],
  },
  {
    title: "PCT-guided antibiotic stewardship",
    scenario: (
      <>
        Day 5 of meropenem for community-acquired pneumonia with bacteraemia. Patient afebrile,
        off vasopressors. PCT peaked at 18 ng/mL on day 2, now 2.0 ng/mL. Stop antibiotics?
      </>
    ),
    working: (
      <>
        PCT-guided de-escalation rules (PRORATA / SAPS): stop antibiotics if PCT{" "}
        <strong>&lt;0.5 ng/mL</strong> OR <strong>≥80% decline from peak</strong>. 2.0 / 18.0 =
        89% decline ✓. Clinical resolution ✓.
      </>
    ),
    answer: (
      <>
        <strong>Yes — stop antibiotics.</strong> Document source control adequate, no ongoing
        organ dysfunction. PCT-guided de-escalation reduces antibiotic days by 2–3 with no
        mortality penalty (SSC 2021 endorses). If PCT failed to decline → think inadequate
        source control, resistant organism, or alternative diagnosis.
      </>
    ),
    cites: ["Sepsis-3 2016"],
  },
];

const SepsisTopic = () => {
  return (
    <TopicTemplate
      title="Sepsis & Septic Shock"
      subtitle="FRCA Final / FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "Sepsis-3: infection + organ dysfunction (SOFA ≥2). Septic shock: vasopressors needed + lactate >2", cites: ["BJA Educ 2019"] },
        { text: "Hour-1 bundle: lactate, cultures, antibiotics, fluids (30 ml/kg), vasopressors", cites: ["SSC 2021"] },
        { text: "Noradrenaline is the first-line vasopressor; vasopressin is second-line", cites: ["Sepsis-3 2016"] },
        { text: "Each hour delay in antibiotics increases mortality by approximately 7%", cites: ["BJA Educ 2019"] },
        { text: "Source control is critical — drain, debride, or remove infected sources early", cites: ["SSC 2021"] },
        { text: "PCT-guided de-escalation reduces antibiotic duration by 2–3 days without increasing mortality", cites: ["Sepsis-3 2016"] },
        { text: "Lactate >4 mmol/L carries 30–40% mortality; serial clearance guides resuscitation adequacy", cites: ["BJA Educ 2019"] },
        { text: "No single biomarker diagnoses sepsis — trends are more informative than single values", cites: ["SSC 2021"] },
        { text: "IDSA 2024 challenges rigid 1h antibiotic + 30 mL/kg fluid targets in undifferentiated sepsis", cites: ["Sepsis-3 2016"] },
      ]}
      topicId="sepsis"
      topicTitle="Sepsis & Septic Shock"
      quizQuestions={sepsisQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
    <>
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Sepsis is a life-threatening organ dysfunction caused by a dysregulated host response to infection (Sepsis-3, 2016). It remains the leading cause of mortality in ICU. Early recognition, source control, and protocolised resuscitation are the cornerstones of management.
          </p>
        </div>

        <div>
          <SepsisHostResponseDiagram />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sepsis-3 Definitions</h2>
          <div className="space-y-3">
            {[
              { term: "Sepsis", def: "Infection + organ dysfunction (SOFA score ≥2 points above baseline). qSOFA ≥2 at bedside (RR ≥22, altered mentation, SBP ≤100)." },
              { term: "Septic Shock", def: "Sepsis + vasopressors required to maintain MAP ≥65 mmHg AND lactate >2 mmol/L despite adequate fluid resuscitation." },
            ].map((item) => (
              <div key={item.term} className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">{item.term}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.def}</p>
              </div>
            ))}
          </div>
        </div>

        <SepsisScoreCalculator />

        <LactateCRTTool />

        <VasopressorLadderTool />

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hour-1 Bundle (SSC 2021)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Surviving Sepsis Campaign recommends initiating ALL elements within 1 hour of sepsis recognition:
          </p>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-3">
              {[
                { step: "1", action: "Measure lactate", detail: "Re-measure if initial lactate >2 mmol/L" },
                { step: "2", action: "Obtain blood cultures", detail: "Before antibiotics, from 2 separate sites" },
                { step: "3", action: "Administer broad-spectrum antibiotics", detail: "Within 1 hour. Each hour delay increases mortality ~7%" },
                { step: "4", action: "Begin rapid IV fluid resuscitation", detail: "30 ml/kg crystalloid for hypotension or lactate ≥4 mmol/L" },
                { step: "5", action: "Apply vasopressors", detail: "If hypotensive during or after fluid resuscitation. Target MAP ≥65 mmHg" },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{s.step}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{s.action}</p>
                    <p className="text-sm text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Vasopressor Therapy</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                  <th className="text-left py-2 text-foreground font-semibold">Receptor</th>
                  <th className="text-left py-2 text-foreground font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2">Noradrenaline</td><td>α₁ &gt; β₁</td><td>1st-line vasopressor</td></tr>
                <tr className="border-b border-border"><td className="py-2">Vasopressin</td><td>V₁</td><td>2nd-line (catecholamine-sparing, 0.03 U/min)</td></tr>
                <tr className="border-b border-border"><td className="py-2">Adrenaline</td><td>α₁, β₁, β₂</td><td>If cardiac dysfunction/inadequate response</td></tr>
                <tr><td className="py-2">Dobutamine</td><td>β₁ &gt; β₂</td><td>If myocardial dysfunction (↓CO despite adequate filling)</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Source Control</h2>
          <p className="text-muted-foreground leading-relaxed">
            Identify and control the source of infection as rapidly as possible. Drainage of abscesses, debridement of infected tissue, removal of infected devices. Delay in source control is independently associated with increased mortality. Consider CT imaging early if source unclear.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Human Albumin Solution — the evidence</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Albumin (4–5% iso-oncotic or 20% hyper-oncotic) is the only colloid that retains a place in sepsis resuscitation
            after starches and gelatins were withdrawn for harm. Its theoretical appeal is sustained intravascular expansion
            with less interstitial oedema, plus binding/transport, antioxidant and endothelial-glycocalyx effects. The
            randomised evidence is more nuanced.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Trial</th>
                  <th className="text-left py-2 text-foreground font-semibold">Population & intervention</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key result</th>
                  <th className="text-left py-2 text-foreground font-semibold">Take-home</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 align-top font-medium text-foreground">SAFE (NEJM 2004, n≈7000)</td>
                  <td className="py-2 align-top">General ICU; 4% albumin vs 0.9% saline for resuscitation.</td>
                  <td className="py-2 align-top">No overall mortality difference (RR 0.99). Pre-specified sepsis subgroup: trend to <em>lower</em> mortality with albumin (OR 0.87, 95% CI 0.74–1.02).</td>
                  <td className="py-2 align-top">Albumin is <strong>safe</strong> in sepsis; signal of possible benefit (hypothesis-generating).</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 align-top font-medium text-foreground">SAFE TBI subgroup (NEJM 2007)</td>
                  <td className="py-2 align-top">Traumatic brain injury subgroup of SAFE.</td>
                  <td className="py-2 align-top">Increased 24-month mortality with albumin (RR 1.63).</td>
                  <td className="py-2 align-top"><strong>Avoid albumin in TBI</strong> — even when sepsis coexists.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 align-top font-medium text-foreground">ALBIOS (NEJM 2014, n=1818)</td>
                  <td className="py-2 align-top">Severe sepsis / septic shock; 20% albumin to keep serum albumin ≥30 g/L + crystalloid vs crystalloid alone, for 28 days.</td>
                  <td className="py-2 align-top">No 28- or 90-day mortality difference. Better haemodynamics (higher MAP, lower fluid balance, faster vasopressor weaning). Post-hoc: ↓ mortality in the septic-shock subgroup (RR 0.87).</td>
                  <td className="py-2 align-top">Albumin <strong>improves haemodynamics</strong> but no proven survival benefit overall; possible benefit in established septic shock.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 align-top font-medium text-foreground">CRISTAL (JAMA 2013)</td>
                  <td className="py-2 align-top">Hypovolaemic shock (incl. sepsis); colloids (mostly albumin/HES) vs crystalloids.</td>
                  <td className="py-2 align-top">No 28-day mortality difference; lower 90-day mortality with colloids (secondary outcome).</td>
                  <td className="py-2 align-top">Hypothesis-generating only — heterogeneous colloid mix limits conclusions for albumin specifically.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 align-top font-medium text-foreground">Meta-analyses (Patel 2014, Xu 2014, Cochrane 2018)</td>
                  <td className="py-2 align-top">Pooled RCTs of albumin vs other fluids in sepsis.</td>
                  <td className="py-2 align-top">No clear all-cause mortality benefit; signal toward reduced mortality when compared specifically to <em>saline</em> rather than balanced crystalloids.</td>
                  <td className="py-2 align-top">Effect size — if real — is small and may largely reflect avoidance of saline-related hyperchloraemia.</td>
                </tr>
                <tr>
                  <td className="py-2 align-top font-medium text-foreground">CHEST (2012) & 6S (2012)</td>
                  <td className="py-2 align-top">Comparator trials of HES vs crystalloid in ICU/sepsis.</td>
                  <td className="py-2 align-top">HES caused increased AKI / RRT and (6S) increased mortality.</td>
                  <td className="py-2 align-top">Established that <strong>synthetic colloids are harmful</strong>, leaving albumin as the only colloid still considered in sepsis.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Guideline positions</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
            <li><strong>Surviving Sepsis Campaign 2021</strong> — <em>weak recommendation</em> for albumin in patients who have received <strong>large volumes of crystalloid</strong> (e.g. &gt;60–80 mL/kg) for sepsis or septic shock; balanced crystalloid remains first-line. Not recommended as the initial resuscitation fluid.</li>
            <li><strong>NICE NG51</strong> — crystalloid first; <strong>do not use</strong> tetrastarch; albumin not routinely recommended but may be considered in ongoing large-volume resuscitation.</li>
            <li><strong>IDSA 2024</strong> — emphasises individualised, dynamic fluid assessment over fixed volumes; reserves albumin for the same large-volume scenario, noting absence of robust mortality benefit.</li>
            <li><strong>Avoid</strong> albumin in <strong>traumatic brain injury</strong> (SAFE TBI signal of harm) and use cautiously in decompensated heart failure (volume load).</li>
          </ul>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Mechanistic rationale & caveats</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
            <li><strong>Oncotic pressure:</strong> albumin contributes ~75–80% of plasma colloid osmotic pressure; iso-oncotic 4–5% expands plasma volume by ~80% of the volume infused vs ~20–25% for crystalloid.</li>
            <li><strong>Glycocalyx in sepsis</strong> is shed → increased capillary leak. The classical "colloid stays intravascular" advantage is <em>attenuated</em>, which may explain why trials show smaller volume-sparing effects than predicted.</li>
            <li><strong>Non-oncotic effects:</strong> antioxidant (binds free radicals, NO carrier), drug/bilirubin transport, possible glycocalyx-stabilising actions — biologically plausible but not proven to translate to survival.</li>
            <li><strong>Hyperchloraemia avoidance:</strong> apparent "albumin benefit" vs saline is attenuated when balanced crystalloid (Hartmann's, Plasma-Lyte) is the comparator (SMART, BaSICS).</li>
            <li><strong>Cost & supply:</strong> albumin is ~30–50× the cost of crystalloid — a key reason routine first-line use is not endorsed despite a favourable safety profile.</li>
          </ul>

          <div className="mb-3 animate-fade-in">
            <AlbuminFluidShiftDiagram />
          </div>

          <div className="rounded-lg border border-border bg-card p-4 text-sm space-y-3 mb-3">
            <p className="font-semibold text-foreground">Practical dosing — when and how to give albumin in sepsis</p>
            <div>
              <p className="font-semibold text-foreground mb-1">When to consider it</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Trigger:</strong> persistent hypotension or ongoing vasopressor requirement <em>after</em> ~30 mL/kg balanced crystalloid (SSC 2021 initial bolus), and especially once cumulative crystalloid approaches <strong>60–80 mL/kg</strong> in the first 24 h.</li>
                <li><strong>Goal:</strong> reduce further crystalloid load (limit interstitial oedema, hyperchloraemia and abdominal pressure) while maintaining MAP ≥65 mmHg and adequate end-organ perfusion.</li>
                <li><strong>Avoid</strong> in traumatic brain injury (SAFE TBI). Use cautiously in decompensated heart failure and oliguric AKI with established fluid overload.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">4–5% (iso-oncotic) — for ongoing volume replacement</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Use when</strong> the primary aim is plasma-volume expansion in a fluid-responsive patient who has already had substantial crystalloid.</li>
                <li><strong>Dose:</strong> 250–500 mL boluses (≈ 5 mL/kg) over 15–30 min, reassessing fluid responsiveness (passive leg raise, stroke-volume variation, lactate trend) between boluses. Typical 24-h ceiling 1–2 L.</li>
                <li><strong>Effect:</strong> ~80% of the infused volume retained intravascularly (vs ~20–25% for crystalloid).</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">20% (hyper-oncotic) — for hypoalbuminaemia / oedematous patient</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Use when</strong> serum albumin is low (typically &lt;25–30 g/L), the patient is already fluid-overloaded/oedematous, or further large crystalloid boluses are undesirable. This is the ALBIOS strategy — top up to keep serum albumin ≥30 g/L.</li>
                <li><strong>Dose:</strong> 100 mL of 20% (= 20 g albumin) over 30–60 min, repeated 1–2× daily as needed. Some units give up to 200 mL/day in divided doses while titrating to serum albumin ≥30 g/L.</li>
                <li><strong>Caution:</strong> pulls fluid into the intravascular space — risk of acute pulmonary oedema if the patient is not fluid-deplete; pair with diuresis if total body fluid overload exists.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Monitoring & stop rules</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Reassess MAP, lactate, urine output and dynamic indices after each bolus; stop if no haemodynamic response (non-responder) or if signs of pulmonary oedema appear.</li>
                <li>Do not chase serum albumin above 30–35 g/L — there is no evidence of benefit and cost/supply is significant.</li>
                <li>Document clearly that synthetic colloids (HES, gelatins) are <strong>not</strong> to be used.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">
            <p className="font-semibold mb-1">Practical viva-ready summary</p>
            <p className="text-muted-foreground">
              "Balanced crystalloid is first-line in sepsis. Human albumin (4–5%) is safe (SAFE) and can be added once
              large volumes of crystalloid have been given (SSC 2021, weak recommendation), with ALBIOS showing better
              haemodynamics and a possible benefit in septic shock but no overall mortality reduction. Synthetic colloids
              (HES, gelatins) are contraindicated. Avoid albumin in traumatic brain injury."
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Corticosteroids</h2>
          <p className="text-muted-foreground leading-relaxed">
            IV hydrocortisone 200 mg/day (50 mg QDS or continuous infusion) if haemodynamic instability persists despite adequate fluid resuscitation and vasopressor therapy. ADRENAL and APROCCHSS trials support use in refractory septic shock for faster shock reversal but no mortality benefit is definitively proven.
          </p>
        </div>

        {/* ---- Sepsis Biomarkers ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sepsis Biomarkers</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            No single biomarker is diagnostic of sepsis. Biomarkers support diagnosis, guide antibiotic duration, prognosticate, and monitor treatment response. Understanding their kinetics and limitations is essential.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Biomarker</th>
                  <th className="text-left py-2 text-foreground font-semibold">Source & Kinetics</th>
                  <th className="text-left py-2 text-foreground font-semibold">Clinical Utility</th>
                  <th className="text-left py-2 text-foreground font-semibold">Limitations</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">CRP</td>
                  <td>Hepatic acute-phase protein. Rises 6–8 h, peaks 36–50 h. Half-life ~19 h. Triggered by IL-6.</td>
                  <td>Widely available, inexpensive. Tracks trends and treatment response. Values &gt;100 mg/L suggest significant bacterial infection but not diagnostic.</td>
                  <td>Non-specific — elevated post-surgery, trauma, autoimmune disease, malignancy. Slow kinetics. Poor bacterial vs viral discrimination. Low in hepatic failure.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Procalcitonin (PCT)</td>
                  <td>Calcitonin precursor. Extra-thyroidal production induced by endotoxin and TNF-α/IL-6. Rises 2–4 h, peaks 12–24 h, half-life 24–30 h.</td>
                  <td><strong>Best evidence for guiding antibiotic duration</strong> (PRORATA, SAPS trials). SSC 2021 recommends PCT-guided de-escalation. &lt;0.1 ng/mL: bacterial infection unlikely. &gt;0.5 ng/mL: systemic bacterial infection likely. 80% decline from peak supports stopping antibiotics.</td>
                  <td>Elevated post-surgery, burns, cardiogenic shock, renal failure. Not reliably raised in localised infections. Cost higher than CRP. Viral infections generally suppress PCT (helps differentiate).</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Lactate</td>
                  <td>Anaerobic glycolysis end-product. Normal &lt;2 mmol/L. In sepsis: tissue hypoperfusion AND β₂-adrenergic aerobic glycolysis. Rapid point-of-care assay.</td>
                  <td><strong>Prognostic marker and resuscitation target</strong>. Lactate &gt;2 mmol/L defines septic shock (+ vasopressors). Clearance &gt;20% in 2 h → improved outcomes. Part of Hour-1 bundle. Serial measurements guide resuscitation.</td>
                  <td>Non-specific: seizures, mesenteric ischaemia, liver failure, β₂-agonists, metformin, thiamine deficiency. Type A (hypoperfusion) vs Type B (non-hypoperfusion) distinction important. Hepatic impairment reduces clearance.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Presepsin (sCD14-ST)</td>
                  <td>Soluble fragment of CD14 (monocyte LPS receptor). Rises within 2 h (faster than PCT), peaks 3 h. Half-life 1–3 h — very rapid kinetics.</td>
                  <td>Emerging biomarker with fastest kinetics. &gt;600 pg/mL suggests sepsis. May have superior diagnostic accuracy to PCT for early bacterial sepsis in some studies. Rising levels predict worse prognosis.</td>
                  <td>Not widely available — requires specific immunoassay. Elevated in renal failure. Limited evidence vs PCT/CRP — few large RCTs. Not yet in SSC guidelines. Assay standardisation evolving.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Endotoxin Activity Assay (EAA)</td>
                  <td>Measures LPS-induced neutrophil oxidative burst. Reflects circulating endotoxin. Results &lt;30 min. Scale 0–1: low (&lt;0.4), intermediate (0.4–0.59), high (≥0.6).</td>
                  <td>Specific for Gram-negative sepsis. High EAA (≥0.6) → worse outcomes. Guided polymyxin B haemoperfusion in EUPHRATES trial (post-hoc benefit in EAA 0.6–0.89 subgroup). May differentiate Gram-negative vs Gram-positive source.</td>
                  <td>Gram-negative only — normal in Gram-positive/fungal sepsis. EUPHRATES failed primary endpoint. Limited availability. Does not distinguish viable bacteria from LPS fragments. Antibiotic-induced endotoxin release may confound.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SepsisBiomarkerKineticsDiagram />

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Practical Approach</h3>
          <div className="space-y-2">
            {[
              { label: "Diagnosis", detail: "No biomarker replaces clinical assessment. PCT >0.5 ng/mL with compatible clinical picture supports bacterial sepsis. Presepsin may add value in early detection but availability is limited." },
              { label: "Antibiotic Stewardship", detail: "PCT-guided algorithms reduce antibiotic duration by 2–3 days without increasing mortality (multiple RCTs). SSC 2021 recommends daily PCT for de-escalation. PCT that fails to decline suggests inadequate source control, resistant organism, or non-infectious cause." },
              { label: "Prognostication", detail: "Lactate >4 mmol/L: mortality ~30–40%. Persistently elevated lactate despite resuscitation is the strongest predictor of poor outcome. Rising PCT/CRP despite treatment suggests treatment failure." },
              { label: "Serial Monitoring", detail: "Trends are more informative than single values. Lactate 2–4 hourly during resuscitation, CRP daily, PCT 24–48 hourly. Declining trajectory supports current management; plateau or rise mandates reassessment." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guideline comparison */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Major Guideline Comparison</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Side-by-side summary of the three contemporary sepsis guidelines on the four big management decisions.
            Where they differ matters in vivas — particularly antibiotic timing windows.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-xs min-w-[720px]">
              <thead>
                <tr className="bg-secondary/40 text-foreground">
                  <th className="text-left p-2 font-semibold border-b border-border">Topic</th>
                  <th className="text-left p-2 font-semibold border-b border-border">Surviving Sepsis Campaign 2021</th>
                  <th className="text-left p-2 font-semibold border-b border-border">NICE NG51 (UK, updated 2024)</th>
                  <th className="text-left p-2 font-semibold border-b border-border">IDSA 2024 (sepsis position statement)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground align-top">
                {[
                  {
                    topic: "Antibiotic timing",
                    ssc: "Septic shock or definite sepsis: within 1h. Possible sepsis without shock: investigate and give within 3h if sepsis confirmed.",
                    nice: "High-risk criteria with suspected sepsis: within 1h of identification. Otherwise senior review and source-specific assessment.",
                    idsa: "Disagrees with rigid 1h target for all — argues 1h is appropriate for septic shock but causes diagnostic over-treatment in undifferentiated patients. Recommends rapid assessment, with timing tailored to certainty of diagnosis (within 1h for shock, within 3h for probable sepsis).",
                  },
                  {
                    topic: "Initial fluids",
                    ssc: "30 mL/kg balanced crystalloid within 3h for sepsis-induced hypoperfusion or septic shock. Reassess dynamically. Albumin if large volumes needed.",
                    nice: "IV crystalloid bolus 500 mL over <15 min if hypotensive or lactate >2 — repeat to max 30 mL/kg with senior review. Avoid starches and gelatins.",
                    idsa: "Critical of fixed 30 mL/kg target — recommends individualised, dynamic assessment (CLASSIC, CLOVERS trials). Restrictive strategy non-inferior in many. Use balanced crystalloid; avoid 0.9% saline in large volumes.",
                  },
                  {
                    topic: "Vasopressor choice & target",
                    ssc: "Noradrenaline first line. Target MAP ≥65. Add vasopressin (0.03 U/min) if NA dose rising — start at NA 0.25–0.5 µg/kg/min. Adrenaline if still inadequate. Dobutamine for cardiac dysfunction.",
                    nice: "Noradrenaline first line in critical care for MAP ≥65. Peripheral noradrenaline acceptable short-term while CVC sited.",
                    idsa: "Endorses noradrenaline first line, MAP ≥65 (higher target 80–85 only in chronic hypertension — SEPSISPAM). Earlier vasopressin addition supported. Methylene blue for refractory vasoplegia.",
                  },
                  {
                    topic: "Corticosteroids",
                    ssc: "Suggest IV hydrocortisone 200 mg/day in septic shock with ongoing vasopressor requirement (NA/adrenaline ≥0.25 µg/kg/min for ≥4h). Weak recommendation.",
                    nice: "Consider hydrocortisone in septic shock not responding to fluid + vasopressors; refer to critical care.",
                    idsa: "Supports hydrocortisone 200 mg/day in vasopressor-dependent septic shock (APROCCHSS, ADRENAL meta-analysis — faster shock reversal, possible mortality benefit). Add fludrocortisone 50 µg/day per APROCCHSS.",
                  },
                  {
                    topic: "Lactate-guided resuscitation",
                    ssc: "Suggest using serial lactate to guide resuscitation in patients with elevated lactate.",
                    nice: "Lactate >2 = high risk; >4 = very high risk. Use to escalate care.",
                    idsa: "Lactate clearance useful but not superior to dynamic measures (capillary refill — ANDROMEDA-SHOCK). Avoid chasing lactate with more fluid in non-fluid-responsive patients.",
                  },
                  {
                    topic: "Source control",
                    ssc: "As soon as possible — within 6–12h where logistically feasible.",
                    nice: "Identify and control source urgently; involve relevant specialty.",
                    idsa: "Earliest feasible — recognises 6–12h is operational rather than evidence-based; emphasises minimally invasive options first.",
                  },
                ].map((row) => (
                  <tr key={row.topic} className="border-b border-border last:border-b-0 hover:bg-secondary/20">
                    <td className="p-2 font-semibold text-foreground">{row.topic}</td>
                    <td className="p-2">{row.ssc}</td>
                    <td className="p-2">{row.nice}</td>
                    <td className="p-2">{row.idsa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-1">Where they all agree</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Antibiotics within 1h for septic shock</li>
                <li>Noradrenaline first-line vasopressor; MAP target ≥65 mmHg</li>
                <li>Balanced crystalloid over 0.9% saline; avoid starches and gelatins</li>
                <li>Hydrocortisone 200 mg/day in vasopressor-dependent septic shock</li>
                <li>Urgent source control</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-1">Where they differ</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong>1h antibiotic target</strong>: SSC/NICE strict for high-risk; IDSA 2024 pushes back — risk of over-treatment in undifferentiated patients</li>
                <li><strong>30 mL/kg fluid bolus</strong>: SSC mandates; IDSA prefers individualised approach (CLASSIC/CLOVERS)</li>
                <li><strong>Steroid recommendation strength</strong>: SSC weak; IDSA stronger, with added fludrocortisone per APROCCHSS</li>
                <li><strong>Lactate clearance</strong>: SSC endorses; IDSA notes capillary refill (ANDROMEDA-SHOCK) equally valid and avoids fluid overload</li>
              </ul>
            </div>
          </div>
        </div>

      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Synthesis — Sepsis Management Algorithm</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Putting it all together: the integrated bundle from recognition through resuscitation, source control, vasopressor titration and de-escalation.
        </p>
        <SepsisManagementDiagram />
      </section>

      <SynthesisBlock
        title="Sepsis — Hour-1 Bundle Synthesis"
        subtitle="The Surviving Sepsis 2021 bundle distilled to the actions that change outcome."
        variant="summary"
      >
        <ul className="space-y-2 list-disc list-inside text-sm">
          <li><strong>Measure lactate</strong>; remeasure if &gt;2 mmol/L.</li>
          <li><strong>Blood cultures × 2</strong> before antibiotics (don't delay antibiotics &gt;45 min).</li>
          <li><strong>Broad-spectrum antibiotics within 1 h</strong> (septic shock); within 3 h (sepsis without shock if uncertain).</li>
          <li><strong>30 ml/kg balanced crystalloid</strong> if hypotensive or lactate ≥4 mmol/L — reassess fluid responsiveness.</li>
          <li><strong>Vasopressors for MAP ≥65</strong> if hypotensive after fluid (or alongside) — noradrenaline first-line; add vasopressin / hydrocortisone if catecholamine-resistant.</li>
          <li><strong>Source control</strong> as soon as anatomically feasible — drainage, debridement, removal of infected device.</li>
        </ul>
      </SynthesisBlock>

          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Sepsis = life-threatening organ dysfunction from dysregulated host response; SOFA increase ≥2 defines it; qSOFA is a screen, not diagnostic.",
              "Hour-1 bundle: lactate, blood cultures, broad-spectrum antibiotics, 30 mL/kg crystalloid for hypotension/lactate ≥4, vasopressors to MAP ≥65.",
              "Noradrenaline is first-line vasopressor; add vasopressin 0.03 U/min then hydrocortisone 200 mg/day in catecholamine-resistant shock.",
              "Source control within 6–12 h where feasible — undrained pus, infected lines, necrotic tissue.",
              "Balanced crystalloids preferred over 0.9% saline (BaSICS, SMART trials); albumin if large volumes needed.",
            ]}
          />
    </>
      }
    />
  );
};

export default SepsisTopic;
