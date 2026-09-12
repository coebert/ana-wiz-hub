import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import TTPPathophysiologyDiagram from "@/components/diagrams/intensive-care/TTPPathophysiologyDiagram";
import HUSPathophysiologyDiagram from "@/components/diagrams/intensive-care/HUSPathophysiologyDiagram";
import DICPathophysiologyDiagram from "@/components/diagrams/intensive-care/DICPathophysiologyDiagram";
import HLHPathophysiologyDiagram from "@/components/diagrams/intensive-care/HLHPathophysiologyDiagram";
import HITPathophysiologyDiagram from "@/components/diagrams/intensive-care/HITPathophysiologyDiagram";
import HITAssessmentBlock from "@/components/clinical/HITAssessmentBlock";
import RebalancedHaemostasisDiagram from "@/components/diagrams/intensive-care/RebalancedHaemostasisDiagram";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";

const haematologyIcuFaqs: Array<[string, string]> = [
  ["What restrictive transfusion threshold is recommended in ICU?", "Transfuse RBC when Hb <70 g/L in stable ICU patients (TRICC, TRISS); use a 80 g/L threshold in acute coronary syndromes or active bleeding."],
  ["How is HIT diagnosed and managed?", "Use the 4Ts score (thrombocytopenia, timing, thrombosis, other causes); if intermediate–high (≥4), stop heparin, send PF4 ELISA and confirm with serotonin release assay, and start a non-heparin anticoagulant (argatroban, danaparoid or fondaparinux)."],
  ["What is the approach to thrombotic microangiopathies (TTP/HUS) in ICU?", "MAHA + thrombocytopenia + organ dysfunction → urgent ADAMTS13 level; while awaiting, start plasma exchange (TTP), caplacizumab where available, and high-dose steroids; avoid platelet transfusion unless life-threatening bleed."],
];

const objectives = [
  "Differentiate the thrombotic microangiopathies (TTP, HUS, DIC) using ADAMTS13 activity, coagulation screen, and PLASMIC score.",
  "Recognise and manage HLH/MAS using HLH-2004 criteria and the HScore, with timely immunosuppression and trigger control.",
  "Apply the 4Ts score to investigate suspected HIT, stop all heparin, and initiate a non-heparin anticoagulant.",
  "Select appropriate anticoagulation for CRRT, ECMO, and acute liver failure, recognising the limitations of conventional coagulation tests.",
  "Discuss the concept of rebalanced haemostasis in liver failure and the role of TEG/ROTEM in critically ill patients.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "TTP — first 30 minutes in resus",
    scenario: (
      <>
        A 34-year-old woman presents with confusion, fever, petechiae, platelets 12 × 10⁹/L,
        Hb 75 g/L with schistocytes, normal PT/APTT, creatinine 180 µmol/L, LDH 2400 U/L.
        PLASMIC score is 7. What is your initial management while awaiting ADAMTS13 result?
      </>
    ),
    working: (
      <>
        PLASMIC ≥6 has a positive predictive value &gt;90% for severe ADAMTS13 deficiency —
        do <strong>not</strong> wait for the assay (turnaround often 24–72 h). The triad of MAHA +
        thrombocytopenia + normal coagulation screen distinguishes TTP from DIC. Mortality without
        plasma exchange (TPE) is ~90%, falling to &lt;20% with prompt treatment. Platelet transfusion
        is contraindicated unless life-threatening bleeding — it fuels microvascular thrombosis.
      </>
    ),
    answer: (
      <>
        Take ADAMTS13 sample <em>before</em> any plasma product. Insert a vascath (large-bore
        dual-lumen). Start <strong>TPE 1.5× plasma volume</strong> with FFP/octaplas as soon as
        available. Give <strong>methylprednisolone 1 g IV</strong>. Add <strong>caplacizumab</strong>{" "}
        (anti-vWF nanobody) — reduces time to platelet recovery and exacerbations (HERCULES, NEJM
        2019). Avoid platelet transfusion. Daily TPE until platelets &gt;150 × 10⁹/L for 2 days.
      </>
    ),
    cites: ["BJA Educ HIT 2018"],
  },
  {
    title: "Citrate accumulation on CRRT",
    scenario: (
      <>
        A patient with acute liver failure on regional citrate CVVHDF develops total Ca²⁺ 2.9
        mmol/L, ionised Ca²⁺ 0.92 mmol/L (ratio 3.15), pH 7.28, base excess −7. What is happening
        and how do you correct it?
      </>
    ),
    working: (
      <>
        Total:ionised Ca²⁺ ratio &gt;2.5 with metabolic acidosis is the hallmark of{" "}
        <strong>citrate accumulation</strong>. Citrate is normally metabolised to bicarbonate via
        the Krebs cycle (mainly hepatic). In liver failure, shock, or severe muscle wasting,
        metabolism fails and chelated calcium-citrate complexes accumulate, lowering ionised Ca²⁺
        while raising total Ca²⁺ — and the unmetabolised citrate fails to generate bicarbonate,
        producing acidosis.
      </>
    ),
    answer: (
      <>
        Reduce citrate dose by 25–50%, increase calcium replacement, and consider stopping citrate.
        Switch to <strong>no anticoagulation with saline flushes</strong> (the patient is already
        coagulopathic) or low-dose UFH if filter life inadequate. Monitor ratio every 4 h until
        normalised.
      </>
    ),
    cites: ["BJA Educ HIT 2008"],
  },
];

const HaematologyIcuTopic = () => {
  return (
    <TopicTemplate
      title="Haematological & Immunological Disorders"
      subtitle="FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "TTP: ADAMTS13 <10% → microvascular thrombosis; DO NOT transfuse platelets; PLASMIC ≥6 → start plasma exchange", cites: ["BJA Educ 2016"] },
        { text: "Normal PT/APTT with MAHA + thrombocytopenia distinguishes TTP/HUS from DIC", cites: ["BJA Educ 2018"] },
        { text: "HIT: prothrombotic thrombocytopenia — 4Ts score, stop ALL heparin, argatroban first-line (UK)", cites: ["TRICC 1999"] },
        { text: "Warfarin contraindicated in acute HIT — protein C depletion → venous limb gangrene", cites: ["Greinacher NEJM 2015"] },
        { text: "Regional citrate is first-line for CRRT anticoagulation (KDIGO) — contraindicated in liver failure (accumulation risk)", cites: ["Lo 4Ts 2006"] },
        { text: "Citrate toxicity: rising total Ca²⁺ with falling ionised Ca²⁺ (ratio >2.5), metabolic acidosis", cites: ["ASH HIT 2018"] },
        { text: "ECMO anticoagulation: UFH standard, anti-Xa most reliable monitor (target 0.3–0.7 IU/mL)", cites: ["BJA Educ HIT 2018"] },
        { text: "ECMO + HIT: bivalirudin first-line (enzymatic metabolism, very short half-life)", cites: ["BJA Educ HIT 2008"] },
        { text: "Liver failure: elevated INR ≠ auto-anticoagulation — rebalanced haemostasis; still needs VTE prophylaxis", cites: ["BJA Educ 2016"] },
        { text: "TEG/ROTEM is superior to PT/INR for assessing haemostasis in liver failure — do NOT correct INR with FFP prophylactically", cites: ["BJA Educ 2018"] },
        { text: "HLH: ferritin >10,000 ~90% sensitivity; treat trigger + dexamethasone/etoposide; anakinra for MAS/HLH", cites: ["TRICC 1999"] },
      ]}
      topicId="haematology-icu"
      topicTitle="Haematological & Immunological Disorders"
      quizQuestions={[
        {
          question: "A 34-year-old woman presents with fever, confusion, MAHA, thrombocytopenia (platelets 12), and AKI. PT and APTT are normal. What is the most appropriate immediate management?",
          options: [
            "Platelet transfusion to target >50 × 10⁹/L before line insertion",
            "Urgent plasma exchange and high-dose corticosteroids",
            "Empirical heparin infusion for presumed DIC",
            "Eculizumab as first-line therapy",
          ],
          correctIndex: 1,
          explanation: "Pentad with normal coagulation strongly suggests TTP (ADAMTS13 deficiency). PLASMIC ≥6 mandates urgent plasma exchange + steroids; platelet transfusion is contraindicated (fuels microvascular thrombosis). Eculizumab is reserved for atypical HUS.",
        },
        {
          question: "A patient on UFH for 7 days develops platelet drop from 240 to 80 × 10⁹/L and a new DVT. 4Ts score is 6. Which is the most appropriate next step?",
          options: [
            "Stop heparin and start warfarin immediately",
            "Continue heparin and add aspirin",
            "Stop ALL heparin (including flushes) and start argatroban",
            "Switch to LMWH at therapeutic dose",
          ],
          correctIndex: 2,
          explanation: "High-probability HIT requires cessation of all heparin (including line flushes) and a non-heparin anticoagulant — argatroban is first-line in the UK. Warfarin is contraindicated in acute HIT due to protein C depletion causing venous limb gangrene; LMWH cross-reacts with HIT antibodies.",
        },
        {
          question: "A patient on CRRT with regional citrate anticoagulation develops a rising total calcium with falling ionised calcium (ratio 2.8) and worsening metabolic acidosis. What is the diagnosis?",
          options: [
            "Hypercalcaemia of malignancy",
            "Citrate accumulation (citrate toxicity)",
            "Filter clotting from inadequate anticoagulation",
            "Hyperparathyroidism",
          ],
          correctIndex: 1,
          explanation: "A total:ionised Ca²⁺ ratio >2.5 with metabolic acidosis is the hallmark of citrate accumulation, typically in liver failure where citrate metabolism (Krebs cycle) is impaired. Reduce or stop citrate and consider switching anticoagulation strategy.",
        },
        {
          question: "An adult on VV-ECMO develops new HIT (4Ts 7, positive functional assay). Which anticoagulant is most appropriate?",
          options: [
            "Warfarin bridged with fondaparinux",
            "LMWH at therapeutic dose",
            "Bivalirudin infusion",
            "Apixaban",
          ],
          correctIndex: 2,
          explanation: "Bivalirudin is first-line in HIT-on-ECMO: enzymatic metabolism (independent of organ function), very short half-life (~25 min) allowing rapid titration, and no cross-reactivity with HIT antibodies. DOACs and warfarin are unsuitable in this acute, unstable setting.",
        },
        {
          question: "A patient with decompensated cirrhosis (INR 2.4, platelets 55) is bleeding from oesophageal varices. ROTEM shows normal EXTEM CT and MCF. What does this suggest?",
          options: [
            "Empirical FFP to correct INR is indicated",
            "Rebalanced haemostasis — avoid prophylactic FFP; treat the bleeding source",
            "Severe coagulopathy requiring 4-factor PCC",
            "Heparin-like effect from endogenous heparinoids",
          ],
          correctIndex: 1,
          explanation: "In liver failure, INR overestimates bleeding risk because procoagulant and anticoagulant factors fall in parallel ('rebalanced haemostasis'). Normal ROTEM confirms adequate global haemostasis; FFP causes volume overload and raises portal pressure. Treat the source (endoscopy, terlipressin, antibiotics).",
        },
        {
          question: "A 28-year-old develops fever, hepatosplenomegaly, pancytopenia, and ferritin 32,000 ng/mL after EBV infection. Triglycerides and LDH are markedly raised. What is the most appropriate initial therapy?",
          options: [
            "Broad-spectrum antibiotics alone and supportive care",
            "Treat trigger plus dexamethasone ± etoposide (HLH-94 protocol)",
            "Plasma exchange",
            "Rituximab monotherapy",
          ],
          correctIndex: 1,
          explanation: "Findings meet HLH-2004 criteria (ferritin >10,000 has ~90% sensitivity). Management is treat the trigger (EBV → consider rituximab) plus immunosuppression with dexamethasone ± etoposide (HLH-94). Anakinra is preferred for MAS-HLH in rheumatic disease.",
        },
      ]}
      sectionSources={{
        objectives: ["TRICC 1999", "BJA Educ 2018", "BJA Educ 2016"],
        workedExamples: ["BJA Educ 2016", "BJA Educ HIT 2018", "BJA Educ HIT 2008"],
        keyPoints: ["BJA Educ 2018", "BJA Educ 2016", "TRICC 1999", "Greinacher NEJM 2015", "Lo 4Ts 2006", "ASH HIT 2018", "BJA Educ HIT 2018", "BJA Educ HIT 2008"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 4.4", "EDIC 5.4"] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
        <>
          <ExamSection id="ttp" exams={[Exam.FFICM, Exam.EDIC]} curriculumCodes={["CC1.4"]} className="scroll-mt-24">
            <CollapsibleSubsection title="Thrombotic Thrombocytopenic Purpura (TTP)" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-4">
              TTP is a thrombotic microangiopathy (TMA) caused by severe deficiency of ADAMTS13 — a metalloproteinase that cleaves ultra-large von Willebrand factor (vWF) multimers. Without ADAMTS13, uncleaved vWF multimers cause platelet aggregation in the microvasculature, leading to thrombocytopenia, microangiopathic haemolytic anaemia (MAHA), and organ ischaemia.
            </p>
            <TTPPathophysiologyDiagram />
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
              <p className="text-sm text-muted-foreground">Score ≥6: high probability of ADAMTS13 &lt;10% — start plasma exchange empirically. Components: Platelets &lt;30, haemoLysis, no Active cancer, no Stem cell/organ transplant, MCV &lt;90, INR &lt;1.5, Creatinine &lt;177.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 mb-4">
              <h3 className="font-semibold text-foreground mb-3">Management of TTP</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li><strong>Therapeutic Plasma Exchange (TPE):</strong> 1–1.5× plasma volume daily. Continue until platelets &gt;150 × 10⁹/L for ≥2 days + normalising LDH.</li>
                <li><strong>Corticosteroids:</strong> Methylprednisolone 1 g IV daily × 3 days, then prednisolone 1 mg/kg.</li>
                <li><strong>Caplacizumab:</strong> Nanobody targeting the A1 domain of von Willebrand factor, blocking the vWF–platelet GPIb interaction and preventing further microthrombi formation while ADAMTS13 activity recovers; used alongside plasma exchange and immunosuppression (steroids ± rituximab) in acute immune TTP <InlineRef topicId="haematology-icu" refLabel="HERCULES 2019" />. Dosing: 10 mg IV before the first plasma exchange session, then 10 mg subcutaneously daily during plasma exchange and for at least 30 days afterwards, guided by ADAMTS13 activity recovery <InlineRef topicId="haematology-icu" refLabel="ISTH TTP 2020" />. Main adverse effect is mucocutaneous bleeding; it does not treat the underlying ADAMTS13 deficiency, so relapse can follow premature cessation.</li>
                <li><strong>Rituximab:</strong> Anti-CD20 mAb for refractory/relapsing TTP — 375 mg/m² weekly × 4.</li>
              </ol>
            </div>
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ Do NOT Transfuse Platelets in TTP</p>
              <p className="text-sm text-muted-foreground mt-1">
                Platelet transfusion is contraindicated — it provides substrate for microvascular thrombosis ("fuel on the fire"). Exception: life-threatening haemorrhage or essential invasive procedures.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="tma" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Differentiating TMAs (TTP / HUS / DIC)">
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
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Mechanism</td><td>ADAMTS13 deficiency</td><td>Shiga toxin / complement</td><td>Systemic coagulation activation</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Predominant organ</td><td>Brain</td><td>Kidney</td><td>Multi-organ</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Coagulation</td><td>Normal PT/APTT</td><td>Normal PT/APTT</td><td>↑PT/APTT, ↓fibrinogen</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Key treatment</td><td>Plasma exchange</td><td>Supportive / eculizumab</td><td>Treat underlying cause</td></tr>
                </tbody>
              </table>
            </div>
            <DICPathophysiologyDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="hus" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Haemolytic Uraemic Syndrome (HUS)">
            <p className="text-muted-foreground leading-relaxed mb-4">
              MAHA + thrombocytopenia + AKI. Two forms: <strong>Typical (STEC-HUS)</strong> from Shiga toxin–producing E. coli (O157:H7) — antibiotics contraindicated, supportive care; mortality &lt;5%. <strong>Atypical (aHUS)</strong> from complement dysregulation — requires <strong>eculizumab</strong> (anti-C5) which reduces ESRD from ~50% to &lt;10%. Vaccinate against N. meningitidis before starting (or give prophylactic antibiotics).
            </p>
            <HUSPathophysiologyDiagram />
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ Meningococcal Risk with Eculizumab</p>
              <p className="text-sm text-muted-foreground mt-1">
                C5 blockade prevents MAC formation → dramatically increased N. meningitidis risk. Vaccinate ACWY + B ≥2 weeks before, or cover with ciprofloxacin/penicillin V.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="hlh" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Haemophagocytic Lymphohistiocytosis (HLH)">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pathological immune activation with cytokine storm and multi-organ failure. Mortality 50–90% untreated. Triggers: infection (EBV most common), malignancy, autoimmune (MAS in adult-onset Still's, SLE).
            </p>
            <HLHPathophysiologyDiagram />
            <div className="rounded-xl border border-border bg-card p-5 mb-4">
              <h3 className="font-semibold text-foreground mb-2">HLH-2004 criteria (≥5 of 8)</h3>
              <p className="text-sm text-muted-foreground">Fever ≥38.5°C · splenomegaly · cytopenias (≥2 lineages) · hypertriglyceridaemia and/or hypofibrinogenaemia · haemophagocytosis on biopsy · low/absent NK activity · ferritin ≥500 µg/L (often &gt;10,000) · elevated sCD25.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 mb-4">
              <h3 className="font-semibold text-foreground mb-2">HScore</h3>
              <p className="text-sm text-muted-foreground">Validated for adult secondary HLH. Score &gt;169 gives &gt;93% probability of HLH. Variables include temperature, organomegaly, cytopenias, ferritin, triglycerides, fibrinogen, AST, marrow haemophagocytosis.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 mb-4">
              <h3 className="font-semibold text-foreground mb-2">Management</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Treat the trigger (antimicrobials, chemotherapy).</li>
                <li>HLH-94/2004: dexamethasone 10 mg/m² + etoposide 150 mg/m² biweekly.</li>
                <li>Anakinra (IL-1 RA) — increasingly used in adult MAS/HLH.</li>
                <li>Ruxolitinib (JAK1/2) for refractory disease.</li>
                <li>Organ support; track ferritin trend as marker of activity.</li>
              </ol>
            </div>
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ Ferritin &gt;10,000 µg/L</p>
              <p className="text-sm text-muted-foreground mt-1">
                ~90% sensitivity, 96% specificity for HLH. Check ferritin early in any unexplained multi-organ failure.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="hit" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Heparin-Induced Thrombocytopenia (HIT)">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Type II HIT is a paradoxical <strong>prothrombotic</strong> immune-mediated reaction: IgG vs PF4–heparin → Fc receptor platelet activation → thrombin generation. Onset day 5–10 (or ≤1 day if heparin in last 100 days). Risk: UFH (1–5%) &gt; LMWH (~0.1%).
            </p>
            <HITPathophysiologyDiagram />
            <HITAssessmentBlock>
              <div className="rounded-xl border border-border bg-card p-5 mb-4">
                <h3 className="font-semibold text-foreground mb-2">Management</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Stop ALL heparin — including flushes and heparin-coated lines. LMWH cross-reacts (~90%) — do not substitute.</li>
                  <li>Start non-heparin therapeutic anticoagulant — <strong>argatroban</strong> first-line in UK ICU; bivalirudin for ECMO/CPB.</li>
                  <li>Bilateral lower-limb duplex (50% subclinical DVT).</li>
                  <li>Avoid warfarin until platelets &gt;150 — protein C depletion → venous limb gangrene.</li>
                  <li>Avoid platelet transfusion unless life-threatening bleeding.</li>
                </ol>
              </div>
            </HITAssessmentBlock>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Drug</th>
                    <th className="text-left py-2 text-foreground font-semibold">Class</th>
                    <th className="text-left py-2 text-foreground font-semibold">Monitoring</th>
                    <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Argatroban</td><td>DTI</td><td>APTT 1.5–3×</td><td>Hepatic metabolism; t½ 45 min; first-line UK ICU</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Bivalirudin</td><td>DTI</td><td>APTT/ACT</td><td>Enzymatic metabolism; t½ 25 min; ECMO/CPB</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fondaparinux</td><td>Indirect Xa</td><td>Anti-Xa</td><td>No cross-reactivity; renal clearance; off-label</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Danaparoid</td><td>Heparinoid</td><td>Anti-Xa</td><td>~10% cross-reactivity; limited availability</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="anticoag" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Anticoagulation in CRRT, ECMO & Liver Failure">
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Regional citrate (CRRT first-line, KDIGO)</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Citrate chelates ionised Ca²⁺ in the circuit; calcium re-infused post-filter. Advantages: no systemic anticoagulation, longer filter life. Risks: <strong>citrate accumulation</strong> in liver failure/shock — total:ionised Ca²⁺ ratio &gt;2.5, metabolic acidosis. Reduce citrate, replace calcium, switch to no anticoagulation if needed.
            </p>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">ECMO anticoagulation</h3>
            <p className="text-muted-foreground text-sm mb-3">
              UFH first-line. Targets: APTT 1.5–2× baseline, anti-Xa 0.3–0.7 IU/mL (most reliable), ACT 180–220 s. Bivalirudin for HIT or heparin resistance. Acquired vWS (high shear cleaves vWF multimers) contributes to mucosal bleeding — DDAVP or vWF concentrates if severe.
            </p>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Liver failure — rebalanced haemostasis</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Procoagulant <em>and</em> anticoagulant factors fall in parallel. INR is misleading — patients are NOT auto-anticoagulated. Give VTE prophylaxis (LMWH/UFH) unless actively bleeding or platelets &lt;50. Use TEG/ROTEM for functional assessment. Do NOT correct INR with FFP prophylactically — volume overload, raises portal pressure, obscures prognostic value (King's College).
            </p>
            <RebalancedHaemostasisDiagram />
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Scenario</th>
                    <th className="text-left py-2 text-foreground font-semibold">First-line</th>
                    <th className="text-left py-2 text-foreground font-semibold">Monitor</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CRRT (standard)</td><td>Regional citrate</td><td>iCa²⁺</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CRRT + liver failure</td><td>No anticoagulation (saline flushes)</td><td>Total:iCa²⁺ ratio</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CRRT + HIT</td><td>Argatroban</td><td>APTT</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">VA/VV-ECMO</td><td>UFH infusion</td><td>Anti-Xa (preferred)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ECMO + HIT</td><td>Bivalirudin</td><td>APTT/ACT</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Liver failure VTE prophylaxis</td><td>LMWH or UFH despite raised INR</td><td>Anti-Xa for LMWH</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <SynthesisBlock
            title="ICU Haematology — Diagnosis & Action Matrix"
            subtitle="The single defining test and first action for the high-yield ICU bleeding/clotting differential."
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
                  ["HIT (type II)", "4Ts ≥4 → ELISA → SRA confirmation", "Stop heparin; start argatroban/bivalirudin"],
                  ["DIC", "↑PT/APTT, ↓fibrinogen, ↑D-dimer, ↓platelets", "Treat cause; supportive blood products"],
                  ["aHUS", "Schistocytes + AKI + ADAMTS13 ruled out", "Eculizumab; supportive care"],
                  ["Liver failure coagulopathy", "Rebalanced haemostasis (TEG/ROTEM)", "Avoid prophylactic FFP"],
                  ["CRRT anticoagulation", "iCa²⁺ post-filter 0.25–0.35 mmol/L", "Regional citrate (1st line)"],
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
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "TTP: pentad (MAHA, thrombocytopenia, neuro signs, fever, renal); ADAMTS13 <10% — urgent plasma exchange + steroids + caplacizumab.",
              "HLH/MAS: fever, splenomegaly, cytopenias, hyperferritinaemia (>500, often >10000), high triglycerides, low fibrinogen — HScore guides probability.",
              "PLASMIC score stratifies TTP vs other thrombotic microangiopathies before ADAMTS13 result.",
              "Plasma exchange: replaces ADAMTS13, removes inhibitor — 1.5× plasma volume daily until response.",
              "ICU immunosuppression: balance infection vs disease — steroids ± rituximab; opportunistic infection prophylaxis (PCP, fungal).",
            ]}
          />
        </>
          <TopicFaqs faqs={haematologyIcuFaqs} />
        </>
      }
    />
  );
};

export default HaematologyIcuTopic;
