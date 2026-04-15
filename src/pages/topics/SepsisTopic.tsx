import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { sepsisQuestions } from "@/data/quizzes";
import SepsisManagementDiagram from "@/components/diagrams/SepsisManagementDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const SepsisTopic = () => {
  return (
    <SectionLayout title="Sepsis & Septic Shock" subtitle="FRCA Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Sepsis is a life-threatening organ dysfunction caused by a dysregulated host response to infection (Sepsis-3, 2016). It remains the leading cause of mortality in ICU. Early recognition, source control, and protocolised resuscitation are the cornerstones of management.
          </p>
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

      </section>

      <SepsisManagementDiagram />

      <KeyLearningPoints points={[
        "Sepsis-3: infection + organ dysfunction (SOFA ≥2). Septic shock: vasopressors needed + lactate >2",
        "Hour-1 bundle: lactate, cultures, antibiotics, fluids (30 ml/kg), vasopressors",
        "Noradrenaline is the first-line vasopressor; vasopressin is second-line",
        "Each hour delay in antibiotics increases mortality by approximately 7%",
        "Source control is critical — drain, debride, or remove infected sources early",
        "PCT-guided de-escalation reduces antibiotic duration by 2–3 days without increasing mortality",
        "Lactate >4 mmol/L carries 30–40% mortality; serial clearance guides resuscitation adequacy",
        "No single biomarker diagnoses sepsis — trends are more informative than single values",
      ]} />

      <QuizSection questions={sepsisQuestions} />
      <ReferencesList topicId="sepsis" />

      <SeeAlso topicId="sepsis" />
        <TopicCompletionToggle topicId="sepsis" topicTitle="Sepsis &amp; Septic Shock" />
    </SectionLayout>
  );
};

export default SepsisTopic;
