import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { haematologyImmunityQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const HaematologyImmunityTopic = () => {
  return (
    <SectionLayout title="Haematology & Immunity" subtitle="FRCA Primary & Final — Physiology" backPath="/physiology" backLabel="Physiology" accentColor="text-physiology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Coagulation Cascade</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Haemostasis involves primary (platelet plug) and secondary (fibrin clot) phases. The cell-based model describes initiation (TF + VIIa → Xa), amplification (thrombin activates platelets + V, VIII, XI), and propagation (burst of thrombin → fibrin).</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Pathway</th>
                <th className="text-left py-2 text-foreground font-semibold">Factors</th>
                <th className="text-left py-2 text-foreground font-semibold">Test</th>
                <th className="text-left py-2 text-foreground font-semibold">Clinical</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Extrinsic</td><td>TF + VII</td><td>PT / INR</td><td>Warfarin monitoring; earliest to prolong in liver failure (VII t½ = 6h)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Intrinsic</td><td>XII, XI, IX, VIII</td><td>APTT</td><td>Heparin monitoring; haemophilia A (VIII) and B (IX)</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Common</td><td>X, V, II, I (fibrinogen)</td><td>TT (thrombin time)</td><td>Final common pathway → fibrin crosslinked by XIII</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Blood Groups & Transfusion</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>ABO system</strong>: Group O = universal donor (no A/B antigens); Group AB = universal recipient. Naturally occurring IgM antibodies → immediate haemolytic reaction if mismatched</li>
            <li><strong>Rhesus system</strong>: D antigen most important. Rh− patients develop anti-D IgG after sensitisation → delayed reaction. Anti-D prophylaxis in Rh− mothers</li>
            <li><strong>Transfusion reactions</strong>: acute haemolytic (ABO mismatch, most dangerous), febrile non-haemolytic (WBC antibodies), allergic (IgA deficiency), TRALI (donor anti-HLA antibodies), TACO (fluid overload)</li>
            <li><strong>Massive transfusion</strong>: &gt;10 units RBC in 24h or &gt;1 blood volume. Complications: hypocalcaemia (citrate), hyperkalaemia, hypothermia, coagulopathy (dilutional). Use 1:1:1 RBC:FFP:platelets ratio</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Immunity & Inflammation</h2>
          <div className="space-y-3">
            {[
              { title: "Innate Immunity", desc: "Non-specific, immediate. Physical barriers (skin, mucosa), complement cascade (classical, alternative, lectin pathways), phagocytes (neutrophils, macrophages), NK cells. Pattern recognition receptors (TLRs) detect PAMPs/DAMPs." },
              { title: "Adaptive Immunity", desc: "Specific, delayed (days). T cells: CD4⁺ helper (Th1 → cell-mediated, Th2 → humoral), CD8⁺ cytotoxic. B cells → plasma cells → antibodies (IgM first, then IgG class switch). Memory cells for secondary response." },
              { title: "Hypersensitivity", desc: "Type I (IgE, immediate — anaphylaxis): mast cell degranulation → histamine, tryptase. Type II (IgG/IgM — transfusion reactions). Type III (immune complex — SLE). Type IV (delayed, T-cell — contact dermatitis)." },
              { title: "SIRS & Sepsis", desc: "Systemic inflammation (↑ TNF-α, IL-1, IL-6) → vasodilation, capillary leak, coagulopathy. SIRS criteria now replaced by SOFA/qSOFA in Sepsis-3." },
            ].map(item => (
              <div key={item.title} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Cell-based coagulation model: initiation (TF+VIIa), amplification (thrombin activates platelets), propagation (thrombin burst)",
        "PT/INR = extrinsic (VII, warfarin). APTT = intrinsic (XII, XI, IX, VIII, heparin). TT = common pathway",
        "ABO mismatch causes acute haemolytic transfusion reaction (IgM) — most dangerous transfusion complication",
        "Type I hypersensitivity (anaphylaxis): IgE-mediated mast cell degranulation. Measure serum tryptase",
        "Massive transfusion complications: hypocalcaemia (citrate), hyperkalaemia, hypothermia, dilutional coagulopathy",
      ]} />
      <QuizSection questions={haematologyImmunityQuestions} />
      <ReferencesList topicId="haematology-immunity" />
      <TopicCompletionToggle topicId="haematology-immunity" topicTitle="Haematology &amp; Immunity" />
    </SectionLayout>
  );
};

export default HaematologyImmunityTopic;
