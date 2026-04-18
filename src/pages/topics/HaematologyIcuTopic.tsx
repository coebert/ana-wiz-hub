import { SectionLayout } from "@/components/SectionLayout";
import { StickyTOC } from "@/components/StickyTOC";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const tocItems = [
  { id: "toc-ttp", label: "TTP" },
  { id: "toc-tma", label: "TMAs" },
  { id: "toc-hus", label: "HUS" },
  { id: "toc-hlh", label: "HLH" },
  { id: "toc-icu-common", label: "ICU Care" },
  { id: "toc-hit", label: "HIT" },
  { id: "toc-anticoag", label: "Anticoagulation" },
  { id: "toc-synthesis", label: "Synthesis" },
];

const HaematologyIcuTopic = () => {
  return (
    <SectionLayout title="Haematological & Immunological Disorders" subtitle="FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <StickyTOC items={tocItems} />
      <section className="space-y-6 mb-10">
        {/* Introduction */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Haematological and immunological emergencies in ICU carry high mortality if not recognised early. Thrombotic thrombocytopenic purpura (TTP) and haemophagocytic lymphohistiocytosis (HLH) are rare but rapidly fatal conditions requiring urgent specific therapy alongside organ support.
          </p>
        </div>

        {/* TTP */}
        <div id="toc-ttp" className="scroll-mt-24">
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

        {/* HUS */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Haemolytic Uraemic Syndrome (HUS)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            HUS is a thrombotic microangiopathy characterised by the triad of MAHA, thrombocytopenia, and acute kidney injury. Unlike TTP, the predominant target organ is the kidney. Two major forms exist with fundamentally different pathophysiology and management.
          </p>

          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Typical HUS (STEC-HUS / Diarrhoea-associated)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Caused by Shiga toxin-producing <em>E. coli</em> (STEC), most commonly O157:H7. Toxin binds to Gb3 receptors on glomerular endothelium → endothelial damage → platelet activation → microvascular thrombosis. Accounts for ~90% of HUS in children. Typically follows bloody diarrhoea by 5–10 days. <strong>Antibiotics are contraindicated</strong> — may increase Shiga toxin release and worsen HUS.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Atypical HUS (aHUS / Complement-mediated)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Caused by uncontrolled activation of the alternative complement pathway due to genetic mutations (Factor H, Factor I, MCP, C3, Factor B) or acquired autoantibodies (anti-Factor H). Chronic relapsing course. Affects all ages. No preceding diarrhoea. Carries higher mortality and ESRD risk than typical HUS. <strong>Plasma exchange alone is insufficient</strong> — requires complement blockade.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Clinical Features & Diagnosis</h3>
          <div className="space-y-2 mb-4">
            {[
              { feature: "Diagnostic triad", detail: "MAHA (schistocytes, ↑LDH, ↓haptoglobin, DAT negative) + thrombocytopenia + AKI. Coagulation screen (PT/APTT) is normal — distinguishes from DIC." },
              { feature: "Renal involvement", detail: "Oliguria/anuria, haematuria, proteinuria. Often severe AKI requiring RRT. Cortical necrosis may occur in severe cases. Renal biopsy shows thrombotic microangiopathy." },
              { feature: "Extra-renal manifestations", detail: "CNS involvement in ~20% of aHUS (seizures, encephalopathy, stroke). Cardiac: cardiomyopathy, myocardial infarction. GI: pancreatitis, hepatitis. Multi-organ involvement suggests aHUS rather than typical." },
              { feature: "Key investigations", detail: "Blood film (schistocytes), LDH, haptoglobin, DAT (negative), ADAMTS13 activity (>10% excludes TTP), complement levels (C3 often low in aHUS), stool culture and PCR for STEC, genetic complement panel." },
            ].map((f) => (
              <div key={f.feature} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{f.feature}</p>
                <p className="text-sm text-muted-foreground">{f.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Typical HUS vs Atypical HUS</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left py-2 text-foreground font-semibold">Typical (STEC-HUS)</th>
                  <th className="text-left py-2 text-foreground font-semibold">Atypical (aHUS)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cause</td><td>Shiga toxin (E. coli O157:H7)</td><td>Complement dysregulation (genetic/acquired)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Age</td><td>Children (peak 6 months – 5 years)</td><td>Any age</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Prodrome</td><td>Bloody diarrhoea (5–10 days before)</td><td>No diarrhoeal prodrome (or non-bloody)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Complement C3</td><td>Usually normal</td><td>Often low</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Recurrence</td><td>Rare ({'<'}3%)</td><td>Frequent (up to 50%)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ESRD risk</td><td>~5%</td><td>~50% without treatment</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Key treatment</td><td>Supportive (RRT, fluids, NO antibiotics)</td><td>Eculizumab (complement blockade)</td></tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <h3 className="font-semibold text-foreground mb-3">Management of HUS</h3>
            <div className="space-y-3">
              {[
                { step: "1", action: "Supportive care (both forms)", detail: "IV fluids (early volume expansion improves renal outcomes). RRT for severe AKI (often required). Avoid platelet transfusion unless life-threatening bleeding. Red cell transfusion as needed. Strict fluid balance and electrolyte monitoring." },
                { step: "2", action: "Typical HUS — avoid antibiotics", detail: "Antibiotics are contraindicated in STEC-HUS — may increase Shiga toxin release from dying bacteria. Anti-motility agents also avoided. Most children recover with supportive care alone (mortality <5%). Monitor for CNS and cardiac complications." },
                { step: "3", action: "Atypical HUS — Eculizumab", detail: "Anti-C5 monoclonal antibody that blocks terminal complement activation. First-line for aHUS. Dramatic improvement in outcomes: reduces ESRD from ~50% to <10%. Must vaccinate against N. meningitidis (ideally ≥2 weeks before, or give prophylactic antibiotics). Lifelong treatment often required — relapse on cessation." },
                { step: "4", action: "Ravulizumab", detail: "Long-acting anti-C5 antibody (8-weekly dosing vs 2-weekly for eculizumab). Non-inferior efficacy with improved convenience and compliance. Increasingly used as first-line for aHUS." },
                { step: "5", action: "Plasma exchange", detail: "May be used as a bridge while awaiting ADAMTS13 results (to exclude TTP). In aHUS, plasma exchange alone is insufficient — complement blockade is required. May be beneficial for anti-Factor H antibody-mediated aHUS." },
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

          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 mb-4">
            <p className="text-sm font-semibold text-destructive">⚠ Meningococcal Risk with Eculizumab</p>
            <p className="text-sm text-muted-foreground mt-1">
              Eculizumab blocks C5 → cannot form membrane attack complex (MAC) → dramatically increased risk of <em>Neisseria meningitidis</em> infection. All patients must receive meningococcal vaccination (ACWY + B). If treatment cannot wait ≥2 weeks for vaccine response, give prophylactic ciprofloxacin or penicillin V until vaccinated.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              The key diagnostic step in any TMA is ADAMTS13 activity: {'<'}10% = TTP (plasma exchange), {'>'}10% = consider HUS. For HUS, distinguish typical (diarrhoeal prodrome, supportive care, NO antibiotics) from atypical (complement-mediated, eculizumab). Remember: normal coagulation screen distinguishes TTP/HUS from DIC. Platelet transfusion is contraindicated in both TTP and HUS.
            </p>
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

        {/* HIT */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Heparin-Induced Thrombocytopenia (HIT)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            HIT is a prothrombotic immune-mediated adverse drug reaction caused by antibodies against complexes of platelet factor 4 (PF4) and heparin. Despite causing thrombocytopenia, the dominant clinical risk is <strong>thrombosis</strong> (not bleeding) — HIT is a paradoxical prothrombotic thrombocytopenia.
          </p>

          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">HIT Type I (Non-immune)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Mild, transient platelet fall within first 2 days of heparin exposure. Due to direct platelet activation by heparin. Platelets rarely {'<'}100 × 10⁹/L. Self-limiting, clinically insignificant. No antibody involvement. Heparin can be continued.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">HIT Type II (Immune-mediated) — The Clinically Important Form</p>
              <p className="text-sm text-muted-foreground mt-1">
                IgG antibodies form against PF4-heparin complexes → Fc receptor-mediated platelet activation → massive thrombin generation → thrombosis + consumptive thrombocytopenia. Onset typically day 5–10 of heparin exposure (or earlier if prior heparin exposure within 100 days). Incidence: ~1–5% with UFH, ~0.1% with LMWH. Risk: surgical {'>'} medical; UFH {'>'} LMWH {'>'} fondaparinux.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <h3 className="font-semibold text-foreground mb-3">4Ts Score — Pre-Test Probability of HIT</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Category</th>
                    <th className="text-left py-2 text-foreground font-semibold">2 Points</th>
                    <th className="text-left py-2 text-foreground font-semibold">1 Point</th>
                    <th className="text-left py-2 text-foreground font-semibold">0 Points</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Thrombocytopenia</td>
                    <td className="py-2">Fall {'>'} 50% AND nadir ≥20</td>
                    <td className="py-2">Fall 30–50% OR nadir 10–19</td>
                    <td className="py-2">Fall {'<'} 30% OR nadir {'<'}10</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Timing of fall</td>
                    <td className="py-2">Day 5–10 OR ≤1 day if heparin within 30 days</td>
                    <td className="py-2">Consistent with day 5–10 but unclear; or {'>'} day 10</td>
                    <td className="py-2">{'<'} day 4 with no recent exposure</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Thrombosis or other sequelae</td>
                    <td className="py-2">Confirmed new thrombosis, skin necrosis, or acute systemic reaction</td>
                    <td className="py-2">Progressive or recurrent thrombosis; erythematous skin lesions; suspected thrombosis not confirmed</td>
                    <td className="py-2">None</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-foreground">oTher cause of thrombocytopenia</td>
                    <td className="py-2">No other cause evident</td>
                    <td className="py-2">Possible other cause</td>
                    <td className="py-2">Definite other cause present</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 grid sm:grid-cols-3 gap-2">
              {[
                { score: "0–3", risk: "Low", prob: "<5% probability", action: "HIT unlikely — consider other causes" },
                { score: "4–5", risk: "Intermediate", prob: "~14% probability", action: "Send immunoassay; consider stopping heparin" },
                { score: "6–8", risk: "High", prob: "~64% probability", action: "Stop ALL heparin; start alternative anticoagulant immediately" },
              ].map((r) => (
                <div key={r.score} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{r.score}: {r.risk} risk</p>
                  <p className="text-xs text-muted-foreground mt-1">{r.prob}. {r.action}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Diagnostic Pathway</h3>
          <div className="space-y-2 mb-4">
            {[
              { step: "1. Clinical suspicion + 4Ts score", detail: "Calculate 4Ts score. If intermediate or high (≥4), stop all heparin (including flushes, coated lines, LMWH) and send laboratory testing. Do NOT wait for results before stopping heparin." },
              { step: "2. Immunoassay (ELISA)", detail: "Detects anti-PF4/heparin IgG antibodies. High sensitivity (~97%) but moderate specificity (~74%). High negative predictive value — a negative ELISA effectively excludes HIT. Optical density (OD) >1.0 strongly suggestive." },
              { step: "3. Functional assay (gold standard)", detail: "Serotonin release assay (SRA) or heparin-induced platelet activation (HIPA) test. Detects platelet-activating antibodies. Specificity >95%. Not widely available — send to reference lab. Results may take days." },
              { step: "4. Interpretation", detail: "4Ts low + ELISA negative = HIT excluded. 4Ts intermediate/high + ELISA positive + functional assay positive = HIT confirmed. High clinical suspicion + positive ELISA = treat as HIT pending functional assay." },
            ].map((s) => (
              <div key={s.step} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{s.step}</p>
                <p className="text-sm text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Management</h3>
          <div className="space-y-3 mb-4">
            {[
              { step: "1", action: "Stop ALL heparin immediately", detail: "Including UFH infusions, LMWH prophylaxis, heparin flushes, heparin-coated catheters. LMWH must NOT be substituted — ~90% cross-reactivity with HIT antibodies" },
              { step: "2", action: "Start alternative anticoagulant", detail: "Therapeutic-dose anticoagulation is required even without overt thrombosis — ~50% of patients will develop thrombosis if left untreated" },
              { step: "3", action: "Screen for thrombosis", detail: "Bilateral lower limb duplex USS (50% have subclinical DVT). CT pulmonary angiography if clinical suspicion. Consider arterial thrombosis (limb ischaemia, stroke, MI)" },
              { step: "4", action: "Avoid warfarin until platelets recover", detail: "Warfarin is contraindicated in acute HIT — depletes protein C faster than procoagulant factors → risk of venous limb gangrene and skin necrosis. Start warfarin only when platelets >150 × 10⁹/L with overlap of alternative anticoagulant ≥5 days" },
              { step: "5", action: "Avoid platelet transfusion", detail: "Theoretical risk of worsening thrombosis (providing substrate). Only transfuse for life-threatening haemorrhage or essential procedures" },
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

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Alternative Anticoagulants for HIT</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Drug</th>
                  <th className="text-left py-2 text-foreground font-semibold">Class</th>
                  <th className="text-left py-2 text-foreground font-semibold">Route</th>
                  <th className="text-left py-2 text-foreground font-semibold">Monitoring</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key Points</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Argatroban</td>
                  <td>Direct thrombin inhibitor</td>
                  <td>IV infusion</td>
                  <td>APTT (target 1.5–3× baseline)</td>
                  <td>Hepatic metabolism — dose reduce in liver disease. Short half-life (45 min). First-line in UK ICU. Prolongs INR — complicates warfarin transition</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Bivalirudin</td>
                  <td>Direct thrombin inhibitor</td>
                  <td>IV infusion</td>
                  <td>APTT or ACT</td>
                  <td>Enzymatic metabolism (not hepatic/renal). Very short half-life (25 min). Used for HIT in cardiac surgery/PCI. Dose-adjusted in renal impairment</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Fondaparinux</td>
                  <td>Indirect Xa inhibitor (synthetic pentasaccharide)</td>
                  <td>SC</td>
                  <td>Anti-Xa levels (rarely needed)</td>
                  <td>No cross-reactivity with HIT antibodies. Used off-label for HIT. Renal clearance — avoid in severe AKI. Long half-life (17h). Cannot be reversed</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Danaparoid</td>
                  <td>Heparinoid (Xa {'>'} IIa inhibitor)</td>
                  <td>IV/SC</td>
                  <td>Anti-Xa levels</td>
                  <td>~10% cross-reactivity with HIT antibodies (test before use). Long half-life. Limited availability. Previously first-line but now largely replaced by argatroban</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">DOACs</td>
                  <td>Direct Xa inhibitors (rivaroxaban, apixaban)</td>
                  <td>PO</td>
                  <td>None routinely</td>
                  <td>Emerging evidence for stable HIT (post-acute phase). Not for acute HIT with active thrombosis in ICU. Convenient for outpatient transition</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 mb-4">
            <p className="text-sm font-semibold text-destructive">⚠ HIT in Cardiac Surgery</p>
            <p className="text-sm text-muted-foreground mt-1">
              Patients with HIT requiring cardiopulmonary bypass present a critical challenge — CPB requires systemic anticoagulation. Options: (1) <strong>Bivalirudin</strong> (most evidence for CPB in HIT), (2) delay surgery until HIT antibodies negative (typically 3 months) then use heparin briefly, (3) argatroban (less evidence for CPB). Consult haematology urgently.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              HIT is a favourite FRCA/FFICM exam topic. Know the 4Ts score cold (especially timing: day 5–10 or ≤1 day with recent exposure). Remember: HIT is a prothrombotic condition — the risk is clotting, not bleeding. LMWH cannot substitute for UFH (cross-reactivity). Warfarin is contraindicated acutely (protein C depletion → limb gangrene). Argatroban is first-line in UK ICU.
            </p>
          </div>
        </div>

        {/* Anticoagulation in Special ICU Populations */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anticoagulation in Special ICU Populations</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Anticoagulation in ICU is complicated by organ dysfunction, extracorporeal circuits, coagulopathy, and bleeding risk. Three common scenarios require specific approaches: renal replacement therapy (RRT), extracorporeal membrane oxygenation (ECMO), and acute liver failure.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Anticoagulation for Renal Replacement Therapy (RRT)</h3>
          <p className="text-muted-foreground text-sm mb-3">
            All extracorporeal circuits activate coagulation via contact with artificial surfaces. Without anticoagulation, filter life is shortened by clotting. The choice of anticoagulant depends on bleeding risk, metabolic status, and local expertise.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Strategy</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                  <th className="text-left py-2 text-foreground font-semibold">Advantages</th>
                  <th className="text-left py-2 text-foreground font-semibold">Disadvantages</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Regional citrate (first-line)</td>
                  <td>Citrate chelates ionised Ca²⁺ in the circuit → prevents coagulation. Calcium re-infused post-filter to restore systemic iCa²⁺</td>
                  <td>No systemic anticoagulation → low bleeding risk. Longer filter life vs heparin. KDIGO recommended first-line for CRRT</td>
                  <td>Risk of citrate accumulation (liver failure, shock) → metabolic alkalosis, ↓iCa²⁺, ↑total:ionised Ca²⁺ ratio {'>'} 2.5. Requires protocol and frequent iCa²⁺ monitoring</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Systemic UFH</td>
                  <td>AT-III mediated inhibition of thrombin and Xa</td>
                  <td>Familiar, cheap, reversible with protamine. Short half-life. Widely available</td>
                  <td>Systemic bleeding risk. HIT risk (~1–5%). Requires APTT monitoring. Unpredictable pharmacokinetics in critical illness (AT-III depletion)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">No anticoagulation</td>
                  <td>Saline flushes (100–250 mL/h pre-filter) to maintain circuit patency</td>
                  <td>No bleeding risk. Suitable for coagulopathic patients (DIC, liver failure, post-surgery)</td>
                  <td>Shorter filter life. Frequent circuit changes. Higher costs. Interrupts RRT delivery</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Regional heparin-protamine</td>
                  <td>Heparin pre-filter, protamine post-filter to neutralise</td>
                  <td>Regional anticoagulation without systemic effect (in theory)</td>
                  <td>Protamine rebound risk. Complex to manage. HIT risk remains. Largely replaced by citrate</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 mb-6">
            <p className="text-sm font-semibold text-destructive">⚠ Citrate Accumulation</p>
            <p className="text-sm text-muted-foreground mt-1">
              Suspect citrate toxicity if: rising total calcium with falling ionised calcium (total:ionised Ca²⁺ ratio {'>'} 2.5), metabolic acidosis (citrate is metabolised to bicarbonate — accumulation prevents this), worsening haemodynamics. Risk factors: liver failure, shock (impaired citrate metabolism). Management: reduce citrate infusion rate, increase calcium replacement, consider switching to no anticoagulation or heparin.
            </p>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Anticoagulation for ECMO</h3>
          <p className="text-muted-foreground text-sm mb-3">
            ECMO circuits have a large artificial surface area and generate high shear stress, creating a strongly prothrombotic environment. Systemic anticoagulation is required but must be balanced against the significant bleeding risk inherent to ECMO patients (acquired von Willebrand syndrome, thrombocytopenia, consumptive coagulopathy).
          </p>
          <div className="space-y-2 mb-4">
            {[
              { agent: "Unfractionated heparin (standard)", detail: "Most widely used. Bolus 50–100 units/kg at cannulation, then infusion 10–20 units/kg/hr. Monitor: APTT (target 1.5–2× baseline), anti-Xa (target 0.3–0.7 IU/mL), ACT (180–220 seconds). Anti-Xa is the most reliable — APTT is affected by lupus anticoagulant, factor deficiencies, and high fibrinogen." },
              { agent: "Bivalirudin (HIT or heparin resistance)", detail: "Direct thrombin inhibitor. 0.05–0.5 mg/kg/hr infusion (no bolus for ECMO). Monitor: APTT or ACT. Enzymatic metabolism — not organ-dependent. Very short half-life (25 min). First-line for ECMO in HIT. Stagnant blood in circuit can clot (no AT-III dependent activity)." },
              { agent: "Argatroban (HIT alternative)", detail: "Direct thrombin inhibitor. Hepatic metabolism — dose reduce in liver dysfunction. Longer half-life than bivalirudin. Prolongs INR. Used in some centres for ECMO in HIT, though bivalirudin more commonly preferred." },
              { agent: "Acquired von Willebrand syndrome", detail: "High shear stress in ECMO circuits cleaves large vWF multimers → acquired vWD type 2A. Contributes to mucosal bleeding (epistaxis, GI haemorrhage). Diagnose: ↓vWF:RCo/vWF:Ag ratio. May need DDAVP or vWF-containing concentrates if severe bleeding." },
            ].map((a) => (
              <div key={a.agent} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{a.agent}</p>
                <p className="text-sm text-muted-foreground">{a.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {[
              { label: "APTT target", value: "1.5–2× baseline" },
              { label: "Anti-Xa target", value: "0.3–0.7 IU/mL" },
              { label: "ACT target", value: "180–220 seconds" },
            ].map((m) => (
              <div key={m.label} className="p-3 rounded-lg bg-secondary/30 border border-border text-center">
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="font-semibold text-foreground text-sm mt-1">{m.value}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Anticoagulation in Acute Liver Failure</h3>
          <p className="text-muted-foreground text-sm mb-3">
            Liver failure creates a complex haemostatic state often described as "rebalanced haemostasis" — conventional coagulation tests (PT/INR) are misleading because they reflect only procoagulant factor depletion, not the parallel loss of anticoagulant factors (protein C, protein S, antithrombin).
          </p>
          <div className="space-y-2 mb-4">
            {[
              { principle: "Rebalanced haemostasis", detail: "Both procoagulant and anticoagulant factors are reduced in proportion. The INR does NOT reflect bleeding risk. Patients with liver failure may be prothrombotic (portal vein thrombosis occurs in 10–25% of cirrhotics). Thromboelastography (TEG/ROTEM) provides a more accurate functional assessment of haemostasis." },
              { principle: "VTE prophylaxis", detail: "Liver failure patients are NOT auto-anticoagulated despite elevated INR. Pharmacological thromboprophylaxis (LMWH or UFH) should be given unless actively bleeding or platelets <50 × 10⁹/L. The elevated INR should not be used as a reason to withhold prophylaxis." },
              { principle: "Anticoagulation for RRT in liver failure", detail: "Regional citrate is relatively contraindicated (impaired citrate metabolism → accumulation). Options: no anticoagulation (with saline flushes) in coagulopathic patients, or low-dose UFH if not coagulopathic. Monitor total:ionised Ca²⁺ ratio if citrate used cautiously." },
              { principle: "Therapeutic anticoagulation", detail: "If indicated (e.g. portal vein thrombosis, Budd-Chiari), use UFH (titratable, reversible) or LMWH with anti-Xa monitoring. APTT is unreliable in liver failure (baseline prolongation). DOACs are hepatically metabolised — generally avoided in severe liver disease (Child-Pugh C)." },
              { principle: "Procedure-related haemostasis", detail: "Do NOT correct INR prophylactically with FFP — causes volume overload, transiently corrects INR, and obscures prognostic value of INR in ALF (King's College criteria). Use TEG/ROTEM to guide targeted component therapy. Fibrinogen replacement (cryoprecipitate or fibrinogen concentrate) if fibrinogen <1.5 g/L." },
            ].map((p) => (
              <div key={p.principle} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{p.principle}</p>
                <p className="text-sm text-muted-foreground">{p.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <h3 className="font-semibold text-foreground mb-3">Summary: Anticoagulation by Clinical Scenario</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Scenario</th>
                    <th className="text-left py-2 text-foreground font-semibold">First-line</th>
                    <th className="text-left py-2 text-foreground font-semibold">Alternative</th>
                    <th className="text-left py-2 text-foreground font-semibold">Monitor</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CRRT (standard)</td><td>Regional citrate</td><td>UFH or no anticoagulation</td><td>iCa²⁺ (citrate); APTT (heparin)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CRRT + liver failure</td><td>No anticoagulation (saline flushes)</td><td>Low-dose UFH; cautious citrate with monitoring</td><td>Total:ionised Ca²⁺ ratio</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CRRT + HIT</td><td>Argatroban (dose reduce if liver impairment)</td><td>Regional citrate; fondaparinux</td><td>APTT</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">VA/VV-ECMO</td><td>UFH infusion</td><td>Bivalirudin</td><td>Anti-Xa (preferred); APTT; ACT</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ECMO + HIT</td><td>Bivalirudin</td><td>Argatroban</td><td>APTT or ACT</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Liver failure (VTE prophylaxis)</td><td>LMWH or UFH (despite raised INR)</td><td>Mechanical prophylaxis if bleeding</td><td>Anti-Xa for LMWH</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              Regional citrate for CRRT is the most examined anticoagulation topic: know the mechanism (Ca²⁺ chelation), monitoring (ionised calcium, total:ionised ratio), and contraindication (liver failure → citrate accumulation). For ECMO, anti-Xa is the most reliable monitoring tool. In liver failure, remember: elevated INR ≠ auto-anticoagulation — the concept of rebalanced haemostasis is heavily tested.
            </p>
          </div>
        </div>

        <SynthesisBlock
          title="ICU Haematology — Diagnosis & Action Matrix"
          subtitle="The high-yield differential of thrombocytopenia, microangiopathy, and bleeding in the critically ill — with the single defining test and first action for each."
          variant="table"
        >
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left p-2 text-foreground font-semibold">Condition</th>
                <th className="text-left p-2 text-foreground font-semibold">Defining Test</th>
                <th className="text-left p-2 text-foreground font-semibold">First Action</th>
              </tr>
            </thead>
            <tbody className="text-foreground/90">
              {[
                ["TTP", "ADAMTS13 activity <10%", "Plasma exchange — DO NOT transfuse platelets"],
                ["HIT (type II)", "4Ts ≥4 → ELISA → SRA confirmation", "Stop heparin; start non-heparin anticoagulant (argatroban/bivalirudin)"],
                ["DIC", "↑PT/APTT, ↓fibrinogen, ↑D-dimer, ↓platelets", "Treat underlying cause; supportive blood products"],
                ["HUS (atypical)", "Schistocytes + AKI + low ADAMTS13 ruled out", "Eculizumab; supportive care"],
                ["Massive haemorrhage", "Clinical + dynamic Hb / lactate", "Activate MHP — 1:1:1 ratio; TXA <3 h (CRASH-2)"],
                ["Liver failure coagulopathy", "Rebalanced haemostasis (TEG/ROTEM)", "Avoid prophylactic FFP; correct only for procedure/bleeding"],
                ["CRRT anticoagulation", "iCa²⁺ post-filter 0.25–0.35 mmol/L", "Regional citrate (1st line); UFH if liver failure"],
              ].map(([condition, test, action]) => (
                <tr key={condition as string} className="border-b border-border/50">
                  <td className="p-2 font-medium">{condition}</td>
                  <td className="p-2 text-muted-foreground">{test}</td>
                  <td className="p-2 text-muted-foreground">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SynthesisBlock>

        <KeyLearningPoints points={[
          "TTP: ADAMTS13 <10% → microvascular thrombosis; DO NOT transfuse platelets; PLASMIC ≥6 → start plasma exchange",
          "Normal PT/APTT with MAHA + thrombocytopenia distinguishes TTP/HUS from DIC",
          "HIT: prothrombotic thrombocytopenia — 4Ts score, stop ALL heparin, argatroban first-line (UK)",
          "Warfarin contraindicated in acute HIT — protein C depletion → venous limb gangrene",
          "Regional citrate is first-line for CRRT anticoagulation (KDIGO) — contraindicated in liver failure (accumulation risk)",
          "Citrate toxicity: rising total Ca²⁺ with falling ionised Ca²⁺ (ratio >2.5), metabolic acidosis",
          "ECMO anticoagulation: UFH standard, anti-Xa most reliable monitor (target 0.3–0.7 IU/mL)",
          "ECMO + HIT: bivalirudin first-line (enzymatic metabolism, very short half-life)",
          "Liver failure: elevated INR ≠ auto-anticoagulation — rebalanced haemostasis; still needs VTE prophylaxis",
          "TEG/ROTEM is superior to PT/INR for assessing haemostasis in liver failure — do NOT correct INR with FFP prophylactically",
          "HLH: ferritin >10,000 ~90% sensitivity; treat trigger + dexamethasone/etoposide; anakinra for MAS/HLH",
        ]} />
      </section>

      <ReferencesList topicId="haematology-icu" />

      <SeeAlso topicId="haematology-icu" />
        <TopicCompletionToggle topicId="haematology-icu" topicTitle="Haematological & Immunological Disorders" />
    </SectionLayout>
  );
};

export default HaematologyIcuTopic;
