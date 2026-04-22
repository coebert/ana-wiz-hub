import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { nsaidsParacetamolQuestions } from "@/data/quizzes";

const objectives = [
  "Compare COX-1 vs COX-2 selectivity and predict the GI / CV / renal trade-offs of common NSAIDs",
  "Recognise contraindications to perioperative NSAIDs (renal impairment, hypovolaemia, AKI risk, asthma, anticoagulation)",
  "Describe paracetamol metabolism, NAPQI formation, and the role of glutathione",
  "Apply the Rumack-Matthew nomogram and N-acetylcysteine treatment to paracetamol overdose",
  "Identify patients at increased risk of paracetamol hepatotoxicity (enzyme induction, malnutrition, low body weight)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "NSAID risk-benefit after a knee replacement",
    scenario:
      "A 72-year-old man (eGFR 55 mL/min, on ramipril and apixaban) has a primary TKR. The orthopaedic team request ibuprofen 400 mg TDS for postoperative analgesia. How do you respond?",
    working:
      "NSAIDs reduce afferent arteriolar PGE₂ → ↓ GFR. Combined with an ACE inhibitor (efferent dilation) and any perioperative hypovolaemia, the 'triple whammy' (NSAID + ACEi + diuretic-or-hypovolaemia) markedly increases AKI risk.\nApixaban + NSAID also raises GI and surgical-site bleeding risk.\nMultimodal alternatives: paracetamol + local infiltration analgesia (LIA) ± single-shot adductor-canal block + PRN oxycodone.",
    answer:
      "Avoid routine NSAIDs in this patient. Use paracetamol, regional analgesia (adductor canal / LIA), and short-course low-dose opioids. Reserve NSAIDs for younger, well-hydrated patients with normal renal function and no anticoagulant — and document a clear stop date.",
  },
  {
    title: "Staggered paracetamol overdose",
    scenario:
      "A 25-year-old woman (50 kg, on phenytoin, malnourished) presents 14 h after a 'staggered' paracetamol overdose totalling 12 g over 6 h. Plasma paracetamol level is 'below the treatment line' on the Rumack-Matthew nomogram. Do you treat?",
    working:
      "The Rumack-Matthew nomogram is only valid for a single acute ingestion at a known time. It cannot be used for staggered overdoses.\nRisk factors here: enzyme induction (phenytoin → ↑ CYP2E1 → ↑ NAPQI), malnutrition (↓ glutathione), and low body weight — all push the toxicity threshold lower (75 mg/kg or even 50 mg/kg for high-risk patients).\nUK MHRA guidance: treat any staggered overdose ≥ 75 mg/kg in 24 h with NAC regardless of level.",
    answer:
      "Treat with N-acetylcysteine immediately — do not rely on the nomogram for staggered overdoses or high-risk patients. Use the standard 21-h IV NAC regimen (or the simplified SNAP protocol) and monitor LFTs, INR, creatinine, lactate and pH at 24 h to guide continuation.",
  },
];

const NSAIDsParacetamolTopic = () => {
  return (
    <TopicTemplate
      title="NSAIDs & Paracetamol"
      subtitle="COX selectivity, perioperative risks, and paracetamol toxicity"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="nsaids-paracetamol"
      topicTitle="NSAIDs & Paracetamol"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={nsaidsParacetamolQuestions}
      sectionExamMapping={{
        objectives: { exams: ["primary", "final"], curriculumCodes: ["RCoA Primary — Pharmacology", "RCoA Final — Pain Medicine"] },
        workedExamples: { exams: ["primary", "final"] },
        keyPoints: { exams: ["primary", "final"] },
      }}
      sectionSources={{
        workedExamples: [
          "MHRA guidance on paracetamol overdose (2012, updated)",
          "BJA Educ — Perioperative NSAIDs and AKI",
        ],
      }}
      keyPoints={[
        "COX-1 = constitutive (GI protection, platelets, renal). COX-2 = inducible (inflammation, pain, fever)",
        "Aspirin irreversibly inhibits COX — platelet effect lasts 7-10 days. All other NSAIDs are reversible",
        "NSAID renal toxicity: ↓ afferent arteriolar PGE₂ → ↓ GFR. High risk with hypovolaemia + ACEi/ARB ('triple whammy')",
        "Paracetamol toxicity: NAPQI → glutathione depletion → Zone 3 (centrilobular) hepatic necrosis",
        "NAC (N-acetylcysteine) replenishes glutathione — most effective within 8h of paracetamol overdose",
        "COX-2 selective drugs have ↓ GI risk but ↑ CV risk (prothrombotic: ↓PGI₂ without ↓TXA₂)",
        "Rumack-Matthew nomogram is invalid for staggered overdoses — treat empirically based on dose/risk factors",
      ]}
      coreConcepts={
        <>
          <ExamSection id="nsaid-mechanism" exams={["primary", "final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">NSAIDs — Mechanism of Action</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              NSAIDs inhibit cyclo-oxygenase (COX), blocking conversion of arachidonic acid to prostaglandins and thromboxanes.
              COX-1 is constitutive (GI protection, platelet TXA₂, renal PGE₂); COX-2 is inducible (inflammation, pain, fever).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Drug</th>
                  <th className="text-left py-2 text-foreground font-semibold">COX Selectivity</th>
                  <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                </tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Aspirin</td><td>Non-selective (irreversible)</td><td>Irreversibly acetylates COX → permanent platelet inhibition (7-10 days). Low dose: antiplatelet. High dose: analgesic</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Ibuprofen</td><td>Non-selective (reversible)</td><td>Shortest half-life, good safety profile. Competitive with aspirin for platelet COX-1 binding</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Diclofenac</td><td>Slightly COX-2 preferential</td><td>Good analgesic. ↑ CV risk (especially MI). Available PO, PR, IM, topical</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Ketorolac</td><td>Non-selective</td><td>Potent analgesic (IV/IM). Max 2 days use. ↑ GI bleeding risk</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Parecoxib/Celecoxib</td><td>COX-2 selective</td><td>↓ GI side effects but ↑ CV risk. Parecoxib = IV prodrug of valdecoxib</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="nsaid-adverse" exams={["primary", "final"]} curriculumCodes={["RCoA Final — Pain Medicine"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">NSAID Adverse Effects</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>GI</strong>: ↓ PGE₂/PGI₂ → ↓ mucosal protection → ulceration, bleeding. Risk factors: age, H. pylori, steroids, anticoagulants. COX-2 selective drugs have lower GI risk</li>
              <li><strong>Renal</strong>: ↓ afferent arteriolar PGE₂ → ↓ GFR. Risk in hypovolaemia, CKD, ACEi/ARB use. Can cause Na⁺/H₂O retention, hyperkalaemia, papillary necrosis</li>
              <li><strong>Cardiovascular</strong>: COX-2 inhibition ↓ PGI₂ (vasodilator, antiplatelet) without ↓ TXA₂ → prothrombotic state. All NSAIDs carry some CV risk (except aspirin and naproxen)</li>
              <li><strong>Respiratory</strong>: aspirin-exacerbated respiratory disease (AERD) — COX inhibition shunts arachidonic acid to lipoxygenase pathway → ↑ leukotrienes → bronchospasm</li>
              <li><strong>Platelet</strong>: ↓ TXA₂ → ↓ aggregation. Aspirin effect lasts platelet lifespan (7-10 days); others reverse when drug clears</li>
            </ul>
          </ExamSection>

          <ExamSection id="paracetamol" exams={["primary", "final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Paracetamol (Acetaminophen)</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Mechanism</strong>: not fully understood. Central COX inhibition (COX-3?), serotonergic descending pathways, endocannabinoid system (AM404 metabolite), TRPV1 activation. Weak peripheral anti-inflammatory effect</li>
              <li><strong>PK</strong>: oral bioavailability ~80%, hepatic metabolism (glucuronidation 60%, sulphation 30%, CYP2E1 5% → NAPQI). IV onset ~5 min, peak effect ~1h. Adult dose 1g QDS (max 4g/day)</li>
              <li><strong>Toxicity</strong>: NAPQI (toxic metabolite) normally conjugated by glutathione. Overdose → glutathione depletion → NAPQI binds hepatocytes → centrilobular necrosis (Zone 3)</li>
              <li><strong>Treatment</strong>: N-acetylcysteine (NAC) — replenishes glutathione. Most effective within 8h. Staggered overdoses are higher risk than single timepoint. Use Rumack-Matthew nomogram (150 mg/kg treatment line)</li>
              <li><strong>Risk factors for toxicity</strong>: enzyme inducers (phenytoin, rifampicin, alcohol), glutathione depletion (malnutrition, HIV, anorexia), low body weight (&lt;50kg — dose reduce)</li>
            </ul>
          </ExamSection>
        </>
      }
    />
  );
};

export default NSAIDsParacetamolTopic;
