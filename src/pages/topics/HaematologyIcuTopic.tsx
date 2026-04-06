import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";

const HaematologyIcuTopic = () => {
  return (
    <SectionLayout title="Haematological & Immunological Disorders" subtitle="FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        {/* Introduction */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Haematological and immunological emergencies in ICU carry high mortality if not recognised early. Thrombotic thrombocytopenic purpura (TTP) and haemophagocytic lymphohistiocytosis (HLH) are rare but rapidly fatal conditions requiring urgent specific therapy alongside organ support.
          </p>
        </div>

        {/* TTP */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Thrombotic Thrombocytopenic Purpura (TTP)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            TTP is a thrombotic microangiopathy (TMA) caused by severe deficiency of ADAMTS13 — a metalloproteinase that cleaves ultra-large von Willebrand factor (vWF) multimers. Without ADAMTS13, uncleaved vWF multimers cause platelet aggregation in the microvasculature, leading to thrombocytopenia, microangiopathic haemolytic anaemia (MAHA), and organ ischaemia.
          </p>

          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Pathophysiology</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Acquired TTP (95%):</strong> IgG autoantibodies against ADAMTS13 → activity &lt;10%. <strong>Congenital TTP (Upshaw-Schulman):</strong> Inherited ADAMTS13 deficiency (autosomal recessive). Triggers include pregnancy, infection, surgery, drugs (quinine, ticlopidine, clopidogrel).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Classic Pentad (full pentad in &lt;5%)</p>
              <p className="text-sm text-muted-foreground mt-1">
                1. <strong>Thrombocytopenia</strong> (often &lt;30 × 10⁹/L) — 2. <strong>MAHA</strong> (schistocytes, ↑LDH, ↑bilirubin, ↓haptoglobin, DAT negative) — 3. <strong>Neurological features</strong> (confusion, seizures, focal deficits) — 4. Renal impairment — 5. Fever. Most patients present with thrombocytopenia + MAHA ± neurological signs.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <h3 className="font-semibold text-foreground mb-3">PLASMIC Score — Predicting ADAMTS13 Deficiency</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Criterion</th>
                    <th className="text-left py-2 text-foreground font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2"><strong>P</strong>latelets &lt;30 × 10⁹/L</td><td className="py-2">1</td></tr>
                  <tr className="border-b border-border"><td className="py-2">Haemo<strong>l</strong>ysis (reticulocyte &gt;2.5%, haptoglobin undetectable, or indirect bilirubin &gt;34)</td><td className="py-2">1</td></tr>
                  <tr className="border-b border-border"><td className="py-2">No <strong>a</strong>ctive cancer</td><td className="py-2">1</td></tr>
                  <tr className="border-b border-border"><td className="py-2">No <strong>s</strong>tem cell or organ transplant</td><td className="py-2">1</td></tr>
                  <tr className="border-b border-border"><td className="py-2"><strong>M</strong>CV &lt;90 fL</td><td className="py-2">1</td></tr>
                  <tr className="border-b border-border"><td className="py-2"><strong>I</strong>NR &lt;1.5</td><td className="py-2">1</td></tr>
                  <tr><td className="py-2"><strong>C</strong>reatinine &lt;177 µmol/L</td><td className="py-2">1</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Score ≥6: high probability of ADAMTS13 &lt;10% — start plasma exchange empirically.</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <h3 className="font-semibold text-foreground mb-3">Management of TTP</h3>
            <div className="space-y-3">
              {[
                { step: "1", action: "Therapeutic Plasma Exchange (TPE)", detail: "1–1.5× plasma volume daily. Removes anti-ADAMTS13 antibodies and ultra-large vWF multimers; replaces ADAMTS13. Continue until platelets >150 × 10⁹/L for ≥2 days + normalising LDH" },
                { step: "2", action: "Corticosteroids", detail: "Methylprednisolone 1 g IV daily × 3 days, then prednisolone 1 mg/kg. Suppresses autoantibody production" },
                { step: "3", action: "Caplacizumab", detail: "Anti-vWF nanobody — blocks vWF-platelet interaction. Reduces time to platelet recovery and relapse rate. Given alongside TPE. Risk of bleeding" },
                { step: "4", action: "Rituximab", detail: "Anti-CD20 monoclonal antibody for refractory/relapsing TTP. 375 mg/m² weekly × 4 weeks. Depletes B-cells producing autoantibodies" },
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

          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <p className="text-sm font-semibold text-destructive">⚠ Do NOT Transfuse Platelets in TTP</p>
            <p className="text-sm text-muted-foreground mt-1">
              Platelet transfusion is contraindicated — it provides substrate for microvascular thrombosis ("fuel on the fire"). Exception: life-threatening haemorrhage or essential invasive procedures.
            </p>
          </div>
        </div>

        {/* Differentiating TMAs */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Differentiating Thrombotic Microangiopathies</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left py-2 text-foreground font-semibold">TTP</th>
                  <th className="text-left py-2 text-foreground font-semibold">HUS</th>
                  <th className="text-left py-2 text-foreground font-semibold">DIC</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Mechanism</td>
                  <td className="py-2">ADAMTS13 deficiency</td>
                  <td className="py-2">Shiga toxin (typical) / complement (atypical)</td>
                  <td className="py-2">Systemic coagulation activation</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Predominant organ</td>
                  <td className="py-2">Brain</td>
                  <td className="py-2">Kidney</td>
                  <td className="py-2">Multi-organ</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Coagulation</td>
                  <td className="py-2">Normal PT/APTT</td>
                  <td className="py-2">Normal PT/APTT</td>
                  <td className="py-2">Prolonged PT/APTT, ↓fibrinogen</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Schistocytes</td>
                  <td className="py-2">+++</td>
                  <td className="py-2">++</td>
                  <td className="py-2">+</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Key treatment</td>
                  <td className="py-2">Plasma exchange</td>
                  <td className="py-2">Supportive / eculizumab (aHUS)</td>
                  <td className="py-2">Treat underlying cause</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* HLH */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Haemophagocytic Lymphohistiocytosis (HLH)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            HLH is a syndrome of pathological immune activation characterised by uncontrolled proliferation of activated lymphocytes and macrophages, with excessive cytokine release ("cytokine storm"). It results in multi-organ failure with a mortality of 50–90% if untreated.
          </p>

          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Primary (Familial) HLH</p>
              <p className="text-sm text-muted-foreground mt-1">
                Autosomal recessive mutations in genes controlling cytotoxic granule function (perforin, Munc13-4). Presents in infancy/childhood. Requires haematopoietic stem cell transplant for cure.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Secondary (Acquired) HLH — More Relevant to Adult ICU</p>
              <p className="text-sm text-muted-foreground mt-1">
                Triggers: <strong>Infection</strong> (EBV most common, also CMV, HIV, TB) — <strong>Malignancy</strong> (lymphoma, leukaemia) — <strong>Autoimmune</strong> (SLE, adult-onset Still's disease — termed "macrophage activation syndrome" / MAS). Often presents as unexplained multi-organ failure with extreme hyperferritinaemia.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <h3 className="font-semibold text-foreground mb-3">HLH-2004 Diagnostic Criteria (≥5 of 8)</h3>
            <div className="space-y-2">
              {[
                "Fever ≥38.5°C",
                "Splenomegaly",
                "Cytopenias (≥2 lineages): Hb <90 g/L, platelets <100 × 10⁹/L, neutrophils <1.0 × 10⁹/L",
                "Hypertriglyceridaemia (fasting ≥3.0 mmol/L) AND/OR hypofibrinogenaemia (≤1.5 g/L)",
                "Haemophagocytosis on bone marrow, spleen, or lymph node biopsy",
                "Low/absent NK cell activity",
                "Ferritin ≥500 µg/L (often >10,000 in active HLH)",
                "Elevated soluble CD25 (sIL-2Rα) ≥2,400 U/mL",
              ].map((criterion, i) => (
                <div key={i} className="flex gap-2">
                  <span className="shrink-0 text-primary font-bold text-sm">{i + 1}.</span>
                  <p className="text-sm text-muted-foreground">{criterion}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <h3 className="font-semibold text-foreground mb-3">HScore — Probability of HLH in Adults</h3>
            <p className="text-sm text-muted-foreground mb-3">
              The HScore is a validated clinical tool for adult secondary HLH. Score &gt;169 gives &gt;93% probability of HLH. Variables include:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Variable</th>
                    <th className="text-left py-2 text-foreground font-semibold">Key Thresholds</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2">Temperature</td><td className="py-2">&lt;38.4°C (0), 38.4–39.4°C (33), &gt;39.4°C (49)</td></tr>
                  <tr className="border-b border-border"><td className="py-2">Organomegaly</td><td className="py-2">None (0), hepato- or splenomegaly (23), both (38)</td></tr>
                  <tr className="border-b border-border"><td className="py-2">Cytopenias</td><td className="py-2">1 lineage (24), 2 lineages (34), 3 lineages (44)</td></tr>
                  <tr className="border-b border-border"><td className="py-2">Ferritin</td><td className="py-2">&lt;2000 (0), 2000–6000 (35), &gt;6000 (50)</td></tr>
                  <tr className="border-b border-border"><td className="py-2">Triglycerides</td><td className="py-2">&lt;1.5 (0), 1.5–4.0 (44), &gt;4.0 (64)</td></tr>
                  <tr className="border-b border-border"><td className="py-2">Fibrinogen</td><td className="py-2">&gt;2.5 (0), ≤2.5 (30)</td></tr>
                  <tr className="border-b border-border"><td className="py-2">AST</td><td className="py-2">&lt;30 (0), ≥30 (19)</td></tr>
                  <tr><td className="py-2">Haemophagocytosis on marrow</td><td className="py-2">No (0), Yes (35)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <h3 className="font-semibold text-foreground mb-3">Management of HLH</h3>
            <div className="space-y-3">
              {[
                { step: "1", action: "Treat the trigger", detail: "Antimicrobials for infection, chemotherapy for malignancy. This is the most important step — HLH will not resolve without addressing the underlying cause" },
                { step: "2", action: "Immunosuppression — HLH-94/2004 protocol", detail: "Dexamethasone 10 mg/m² + etoposide 150 mg/m² biweekly. Dexamethasone preferred over other steroids (better CNS penetration)" },
                { step: "3", action: "Anakinra (IL-1 receptor antagonist)", detail: "Increasingly used in adult secondary HLH/MAS. 2–10 mg/kg/day SC/IV. Advantages: rapid onset, short half-life, steroid-sparing" },
                { step: "4", action: "Ruxolitinib (JAK1/2 inhibitor)", detail: "Emerging evidence for refractory HLH. Blocks downstream cytokine signalling (IFN-γ, IL-6)" },
                { step: "5", action: "Organ support", detail: "ICU supportive care: ventilation, RRT, vasopressors, blood product support. Monitor ferritin trend as marker of disease activity" },
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

          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <p className="text-sm font-semibold text-destructive">⚠ Ferritin &gt;10,000 µg/L</p>
            <p className="text-sm text-muted-foreground mt-1">
              A ferritin &gt;10,000 µg/L has ~90% sensitivity and 96% specificity for HLH. In any ICU patient with unexplained multi-organ failure, check ferritin early — it may be the clue to diagnosis.
            </p>
          </div>
        </div>

        {/* ICU Considerations */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICU Considerations Common to Both</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Issue</th>
                  <th className="text-left py-2 text-foreground font-semibold">TTP</th>
                  <th className="text-left py-2 text-foreground font-semibold">HLH</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Vascular access</td>
                  <td className="py-2">Large-bore dialysis catheter for TPE (Vascath)</td>
                  <td className="py-2">Standard CVC; coagulopathy may complicate insertion</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Transfusion</td>
                  <td className="py-2">Avoid platelets; RBC as needed</td>
                  <td className="py-2">All products as needed; transfusion-dependent pancytopenia common</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Neurological monitoring</td>
                  <td className="py-2">Stroke, seizures — consider MRI brain</td>
                  <td className="py-2">Encephalopathy, seizures — CSF may show haemophagocytosis</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Infection risk</td>
                  <td className="py-2">Immunosuppression from rituximab/steroids</td>
                  <td className="py-2">Profound immunosuppression — etoposide causes neutropenia; infection is leading cause of death</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Monitoring response</td>
                  <td className="py-2">Platelet count, LDH, ADAMTS13 activity</td>
                  <td className="py-2">Ferritin trend (falling = responding), sCD25, cytopenia recovery</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <KeyLearningPoints points={[
          "TTP: ADAMTS13 <10% → uncleaved vWF multimers → microvascular thrombosis; DO NOT transfuse platelets",
          "PLASMIC score ≥6: start plasma exchange empirically before ADAMTS13 result returns",
          "TTP treatment triad: plasma exchange + steroids + caplacizumab; rituximab for refractory/relapsing disease",
          "Normal PT/APTT with MAHA + thrombocytopenia distinguishes TTP/HUS from DIC",
          "HLH: pathological immune activation with cytokine storm — ferritin >10,000 has ~90% sensitivity",
          "HScore >169 gives >93% probability of HLH in adults — use to guide empirical treatment",
          "HLH management: treat the trigger + dexamethasone/etoposide (HLH-2004); anakinra increasingly used in adult MAS/HLH",
          "Falling ferritin is the best bedside marker of treatment response in HLH"
        ]} />
      </section>

      <TopicCompletionToggle topicId="haematology-icu" topicTitle="Haematological & Immunological Disorders" />
    </SectionLayout>
  );
};

export default HaematologyIcuTopic;
