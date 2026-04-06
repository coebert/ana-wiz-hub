import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { nsaidsParacetamolQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const NSAIDsParacetamolTopic = () => {
  return (
    <SectionLayout title="NSAIDs & Paracetamol" subtitle="FRCA Primary & Final — Pharmacology" backPath="/pharmacology" backLabel="Pharmacology" accentColor="text-pharmacology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">NSAIDs — Mechanism of Action</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">NSAIDs inhibit cyclo-oxygenase (COX), blocking conversion of arachidonic acid to prostaglandins and thromboxanes. COX-1 is constitutive (GI protection, platelet TXA₂, renal PGE₂); COX-2 is inducible (inflammation, pain, fever).</p>
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
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">NSAID Adverse Effects</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>GI</strong>: ↓ PGE₂/PGI₂ → ↓ mucosal protection → ulceration, bleeding. Risk factors: age, H. pylori, steroids, anticoagulants. COX-2 selective drugs have lower GI risk</li>
            <li><strong>Renal</strong>: ↓ afferent arteriolar PGE₂ → ↓ GFR. Risk in hypovolaemia, CKD, ACEi/ARB use. Can cause Na⁺/H₂O retention, hyperkalaemia, papillary necrosis</li>
            <li><strong>Cardiovascular</strong>: COX-2 inhibition ↓ PGI₂ (vasodilator, antiplatelet) without ↓ TXA₂ → prothrombotic state. All NSAIDs carry some CV risk (except aspirin and naproxen)</li>
            <li><strong>Respiratory</strong>: aspirin-exacerbated respiratory disease (AERD) — COX inhibition shunts arachidonic acid to lipoxygenase pathway → ↑ leukotrienes → bronchospasm</li>
            <li><strong>Platelet</strong>: ↓ TXA₂ → ↓ aggregation. Aspirin effect lasts platelet lifespan (7-10 days); others reverse when drug clears</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Paracetamol (Acetaminophen)</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Mechanism</strong>: not fully understood. Central COX inhibition (COX-3?), serotonergic descending pathways, endocannabinoid system (AM404 metabolite), TRPV1 activation. Weak peripheral anti-inflammatory effect</li>
            <li><strong>PK</strong>: oral bioavailability ~80%, hepatic metabolism (glucuronidation 60%, sulphation 30%, CYP2E1 5% → NAPQI). IV onset ~5 min, peak effect ~1h. Adult dose 1g QDS (max 4g/day)</li>
            <li><strong>Toxicity</strong>: NAPQI (toxic metabolite) normally conjugated by glutathione. Overdose → glutathione depletion → NAPQI binds hepatocytes → centrilobular necrosis (Zone 3)</li>
            <li><strong>Treatment</strong>: N-acetylcysteine (NAC) — replenishes glutathione. Most effective within 8h. Staggered overdoses are higher risk than single timepoint. Use Rumack-Matthew nomogram (150 mg/kg treatment line)</li>
            <li><strong>Risk factors for toxicity</strong>: enzyme inducers (phenytoin, rifampicin, alcohol), glutathione depletion (malnutrition, HIV, anorexia), low body weight (&lt;50kg — dose reduce)</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "COX-1 = constitutive (GI protection, platelets, renal). COX-2 = inducible (inflammation, pain, fever)",
        "Aspirin irreversibly inhibits COX — platelet effect lasts 7-10 days. All other NSAIDs are reversible",
        "NSAID renal toxicity: ↓ afferent arteriolar PGE₂ → ↓ GFR. High risk with hypovolaemia + ACEi/ARB",
        "Paracetamol toxicity: NAPQI → glutathione depletion → Zone 3 (centrilobular) hepatic necrosis",
        "NAC (N-acetylcysteine) replenishes glutathione — most effective within 8h of paracetamol overdose",
        "COX-2 selective drugs have ↓ GI risk but ↑ CV risk (prothrombotic: ↓PGI₂ without ↓TXA₂)",
      ]} />
      <QuizSection questions={nsaidsParacetamolQuestions} />
      <ReferencesList topicId="nsaids-paracetamol" />
      <TopicCompletionToggle topicId="nsaids-paracetamol" topicTitle="NSAIDs &amp; Paracetamol" />
    </SectionLayout>
  );
};

export default NSAIDsParacetamolTopic;
