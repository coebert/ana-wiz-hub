import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { haematologyImmunityQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import { DiagramSection } from "@/components/DiagramSection";
import ImmuneResponseTimelineDiagram from "@/components/diagrams/ImmuneResponseTimelineDiagram";
import AntibodyKineticsDiagram from "@/components/diagrams/AntibodyKineticsDiagram";

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

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Response to Bacterial Infection</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Extracellular bacteria (e.g. <em>S. pneumoniae</em>, <em>E. coli</em>) are largely countered by the humoral arm; intracellular bacteria (e.g. <em>M. tuberculosis</em>, <em>Listeria</em>) require cell-mediated immunity (Th1/macrophage activation).
          </p>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Naïve exposure (first encounter)</h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside leading-relaxed">
            <li><strong>0–4 h — Barriers &amp; resident defence:</strong> skin/mucosa, lysozyme, antimicrobial peptides (defensins), commensal flora competition. Tissue macrophages recognise bacterial PAMPs (LPS, peptidoglycan, lipoteichoic acid, flagellin) via TLRs (TLR4 = LPS, TLR2 = Gram⁺, TLR5 = flagellin).</li>
            <li><strong>4–12 h — Acute inflammation:</strong> macrophages release TNF-α, IL-1, IL-6, IL-8, CXCL8 → endothelial activation (selectins, ICAM-1, VCAM-1) → neutrophil rolling, adhesion, diapedesis. Complement activated by alternative (spontaneous on bacterial surfaces) and lectin (MBL → mannose) pathways → C3b opsonisation, C5a chemotaxis, C5b-9 MAC lyses Gram-negatives.</li>
            <li><strong>12–96 h — Phagocyte killing:</strong> neutrophils ingest opsonised bacteria → respiratory burst (NADPH oxidase → O₂⁻, H₂O₂, HOCl), myeloperoxidase, NETs. Pus = dead neutrophils. Acute-phase response: hepatic CRP, fibrinogen, ferritin (driven by IL-6); fever from hypothalamic PGE₂.</li>
            <li><strong>3–7 days — Adaptive priming:</strong> dendritic cells migrate to draining lymph node carrying processed antigen on MHC-II. Naïve CD4⁺ T cells differentiate into Th1 (IFN-γ — intracellular pathogens) or Th17 (IL-17 — extracellular bacteria, neutrophil recruitment). B cells encounter antigen, receive T-cell help (CD40L–CD40), undergo germinal centre reaction.</li>
            <li><strong>7–14 days — Antibody response:</strong> IgM appears first (low affinity, pentameric, complement-fixing) then class-switches to IgG (high affinity, opsonising, crosses placenta) and IgA (mucosal). Plasma cells churn out antibody; memory B and T cells persist for years.</li>
            <li><strong>2–4 weeks — Resolution:</strong> apoptosis of effector cells, regulatory T cells dampen inflammation, tissue repair, scar/fibrosis if extensive. A small clone of memory lymphocytes is retained.</li>
          </ol>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-5">Re-exposure (secondary response)</h3>
          <div className="p-3 rounded-lg border border-border bg-secondary/20 text-sm text-muted-foreground leading-relaxed space-y-2">
            <p><strong>Faster:</strong> memory B cells produce antibody within 1–3 days (vs 7–14 days). <strong>Larger:</strong> 100–1000× higher antibody titre. <strong>Better:</strong> predominantly high-affinity, class-switched IgG (somatic hypermutation, affinity maturation has already occurred).</p>
            <p>Pre-formed circulating IgG opsonises bacteria immediately; complement is fixed via the <em>classical</em> pathway (Ag–Ab complex → C1q). Memory Th1/Th17 cells recruit and arm macrophages and neutrophils within hours. The pathogen is usually cleared subclinically — this is the basis of vaccination.</p>
            <p><strong>Anaesthetic relevance:</strong> functional/anatomical asplenia (sickle, post-splenectomy) loses the marginal-zone B cells that mount the rapid IgM response to encapsulated organisms (<em>S. pneumoniae</em>, <em>H. influenzae</em>, <em>N. meningitidis</em>) — vaccinate and consider penicillin prophylaxis.</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Response to Viral Infection</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Viruses replicate intracellularly, so the dominant defences are <strong>type I interferons</strong>, <strong>NK cells</strong> and <strong>CD8⁺ cytotoxic T lymphocytes</strong>. Antibodies neutralise free virions but cannot reach intracellular virus.
          </p>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Naïve exposure (first encounter)</h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside leading-relaxed">
            <li><strong>0–24 h — Intracellular sensing:</strong> viral nucleic acids detected by endosomal TLRs (TLR3 dsRNA, TLR7/8 ssRNA, TLR9 CpG DNA) and cytoplasmic sensors (RIG-I, MDA5, cGAS-STING) → infected cells secrete <strong>type I interferons (IFN-α/β)</strong>.</li>
            <li><strong>1–3 days — Antiviral state:</strong> IFN-α/β binds JAK-STAT receptors on neighbouring cells → upregulates PKR, OAS-RNase L (degrade viral RNA), MxA (block replication), ↑ MHC-I (display viral peptides). NK cells kill cells with absent/reduced MHC-I (the "missing-self" recognition) and release IFN-γ.</li>
            <li><strong>3–7 days — CTL priming:</strong> dendritic cells cross-present viral antigen on MHC-I → activate naïve CD8⁺ T cells in lymph node. CD4⁺ Th1 help via IL-2 and IFN-γ enhances CTL expansion.</li>
            <li><strong>7–14 days — Cytotoxic killing:</strong> effector CD8⁺ CTLs migrate to infected tissue, recognise viral peptide–MHC-I complex → release perforin + granzymes and engage Fas-FasL → induce apoptosis of infected cells. Concurrent B-cell response generates neutralising IgM → IgG against surface glycoproteins (haemagglutinin, spike, gp120).</li>
            <li><strong>2–4 weeks — Resolution:</strong> virus cleared, most effector cells undergo contraction by apoptosis. A long-lived pool of memory CTLs and memory B cells persists. Some viruses (HSV, VZV, CMV, EBV, HIV) establish latency.</li>
          </ol>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-5">Re-exposure (secondary response)</h3>
          <div className="p-3 rounded-lg border border-border bg-secondary/20 text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>Pre-existing <strong>neutralising IgG/IgA</strong> at mucosal surfaces blocks viral entry (binds receptor-binding domain → prevents attachment). If virus enters, memory CD8⁺ CTLs mount a response within 24–72 h — orders of magnitude faster than the naïve 7–14 day window — and clear infected cells before significant viraemia.</p>
            <p><strong>Antigenic drift</strong> (point mutations) and <strong>antigenic shift</strong> (reassortment, e.g. influenza) can escape neutralising antibody, producing recurrent epidemics despite memory. Latent viruses (e.g. VZV → shingles) reactivate when T-cell surveillance wanes (age, immunosuppression, steroids).</p>
            <p><strong>Anaesthetic relevance:</strong> surgery + GA cause transient cell-mediated immunosuppression (↓ NK activity, ↓ Th1, ↑ Th2 shift, IL-10) — opioids and volatiles contribute. Reactivation of HSV, VZV, CMV is well described post-op, particularly in the immunosuppressed.</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Naïve vs Secondary Response — at a glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                <th className="text-left py-2 text-foreground font-semibold">Primary (naïve)</th>
                <th className="text-left py-2 text-foreground font-semibold">Secondary (memory)</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Lag to antibody</td><td>5–10 days</td><td>1–3 days</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Peak titre</td><td>Low</td><td>100–1000× higher</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Predominant Ig</td><td>IgM (then IgG)</td><td>IgG (with IgA at mucosa)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Affinity</td><td>Low</td><td>High (somatic hypermutation)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cells responsible</td><td>Naïve B / T cells</td><td>Memory B / T cells</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Complement fixation</td><td>Alternative / lectin (innate)</td><td>Classical (Ag–Ab)</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Clinical correlate</td><td>Symptomatic illness</td><td>Often subclinical — basis of vaccination</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Cell-based coagulation model: initiation (TF+VIIa), amplification (thrombin activates platelets), propagation (thrombin burst)",
        "PT/INR = extrinsic (VII, warfarin). APTT = intrinsic (XII, XI, IX, VIII, heparin). TT = common pathway",
        "ABO mismatch causes acute haemolytic transfusion reaction (IgM) — most dangerous transfusion complication",
        "Type I hypersensitivity (anaphylaxis): IgE-mediated mast cell degranulation. Measure serum tryptase",
        "Massive transfusion complications: hypocalcaemia (citrate), hyperkalaemia, hypothermia, dilutional coagulopathy",
        "Bacterial infection: TLR/PAMP recognition → neutrophil + complement (alternative/lectin) → Th17/Th1 + B-cell IgM→IgG class switch over 7–14 days",
        "Viral infection: type I IFN (IFN-α/β) + NK cells early; CD8⁺ CTLs (perforin/granzyme) + neutralising IgG dominate adaptive clearance",
        "Secondary response: 100–1000× higher IgG titre within 1–3 days via memory B/T cells — the rationale for vaccination",
        "Asplenic patients lose rapid IgM response to encapsulated organisms (pneumococcus, meningococcus, Hib) — vaccinate + prophylaxis",
      ]} />
      <QuizSection questions={haematologyImmunityQuestions} />
      <ReferencesList topicId="haematology-immunity" />
      <SeeAlso topicId="haematology-immunity" />
        <TopicCompletionToggle topicId="haematology-immunity" topicTitle="Haematology &amp; Immunity" />
    </SectionLayout>
  );
};

export default HaematologyImmunityTopic;
