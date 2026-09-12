import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { haematologyImmunityQuestions } from "@/data/quizzes";
import { DiagramSection } from "@/components/topic/DiagramSection";
import ImmuneResponseTimelineDiagram from "@/components/diagrams/physiology/ImmuneResponseTimelineDiagram";
import AntibodyKineticsDiagram from "@/components/diagrams/physiology/AntibodyKineticsDiagram";
import HypersensitivityComparisonDiagram from "@/components/diagrams/physiology/HypersensitivityComparisonDiagram";
import VaccineTypesDiagram from "@/components/diagrams/physiology/VaccineTypesDiagram";
import AsplenicVaccinationFlowchart from "@/components/diagrams/physiology/AsplenicVaccinationFlowchart";
import ImmuneCellLineageDiagram from "@/components/diagrams/physiology/ImmuneCellLineageDiagram";
import { Exam } from "@/data/curriculum";
import { InlineRef } from "@/components/references/InlineRef";

const haematologyImmunityFaqs: Array<[string, string]> = [
  [
    "Outline the coagulation cascade in the cell-based model.",
    "Three overlapping phases: 1) Initiation — tissue factor exposed at injury site activates factor VII → small thrombin burst on TF-bearing cells. 2) Amplification — thrombin activates platelets, V, VIII, XI on the platelet surface. 3) Propagation — large-scale thrombin generation on activated platelets converts fibrinogen to fibrin. The classical extrinsic/intrinsic pathway model is a useful bedside framework but the cell-based model better reflects in-vivo coagulation."
  ],
  [
    "What are the indications and ratios for major haemorrhage protocol?",
    "Activate for ongoing bleeding requiring ≥4 units RBC in <1 h, or anticipated need. Initial pack: 4 units RBC + 4 units FFP + 1 pool platelets (1:1:1 ratio, replicates whole blood). Add cryoprecipitate when fibrinogen <1.5 g/L (or <2.0 g/L in obstetric haemorrhage). Tranexamic acid 1 g within 3 h (CRASH-2, WOMAN, MATTERs). Calcium 1 g for every 4 units (citrate chelation). Aim platelets >50, fibrinogen >1.5, INR <1.5, Ca >1.0, T >36, pH >7.2."
  ],
  [
    "What is the difference between innate and adaptive immunity?",
    "Innate — non-specific, immediate (mins–hrs), no memory. Components: physical barriers, neutrophils, macrophages, NK cells, complement, cytokines. Recognises pathogen-associated molecular patterns (PAMPs) via pattern-recognition receptors (e.g. TLRs). Adaptive — specific, delayed (days), generates memory. Components: T cells (cellular) and B cells/antibodies (humoral). Anaesthesia and surgery transiently impair both arms — clinically relevant in immunocompromised and cancer patients."
  ]
];

const objectives = [
  "Describe the cell-based model of coagulation (initiation, amplification, propagation) and the laboratory tests of each pathway.",
  "Outline the ABO/Rh blood group systems and recognise acute and delayed transfusion reactions.",
  "Distinguish innate from adaptive immunity, naming key cellular and humoral effectors.",
  "Explain the kinetics of primary vs secondary antibody responses and their relevance to vaccination.",
  "Classify hypersensitivity reactions (Types I–IV) with anaesthetic correlates, including anaphylaxis management.",
  "Describe the immunological consequences of asplenia and the BSH vaccination/prophylaxis bundle.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Suspected anaphylaxis on induction — confirming the diagnosis",
    scenario: (
      <>
        A 45-year-old woman develops hypotension (BP 60/30), bronchospasm and a truncal flush 3 minutes
        after IV rocuronium and propofol. You manage with adrenaline 50 µg IV boluses, fluids, and
        chlorphenamine/hydrocortisone. What investigations confirm anaphylaxis and identify the trigger?
      </>
    ),
    working: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Type I hypersensitivity: pre-formed IgE on mast cells/basophils cross-linked by allergen →
            tryptase, histamine, leukotrienes, PAF release within minutes.
          </li>
          <li>
            <strong>Mast cell tryptase</strong> peaks 1–2 h post-event; obtain three samples (immediately
            after resuscitation, 1–2 h, &gt;24 h baseline). A rise of ≥20% + 2 ng/mL above baseline
            confirms mast cell activation (NAP6, AAGBI 2018).
          </li>
          <li>
            Refer to a specialist allergy clinic (UK: 3–6 weeks post-event) for skin prick + intradermal
            testing and specific IgE — rocuronium and suxamethonium are the leading NMBA culprits in NAP6.
          </li>
          <li>
            Document on anaesthetic chart, MedicAlert, GP letter, and yellow-card report to MHRA.
          </li>
        </ul>
      </>
    ),
    answer: (
      <>
        Triple tryptase + specialist allergy referral. NAP6 (2018): NMBAs (60%), antibiotics (15%), and
        chlorhexidine (9%) are the top three perioperative anaphylaxis triggers in the UK; latex now rare.
      </>
    ),
    cites: ["Stavnezer Annu Rev 2008"],
  },
  {
    title: "Massive obstetric haemorrhage — the 1:1:1 ratio",
    scenario: (
      <>
        A primiparous woman has a 4 L PPH following caesarean section. The MTP is activated. Why is the
        empirical 1:1:1 ratio (RBC:FFP:platelets) preferred over crystalloid + RBC alone in the early
        phase, and what biochemical complications must you anticipate?
      </>
    ),
    working: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Trauma/PPH-induced coagulopathy is established within minutes — endothelial activation,
            hyperfibrinolysis (TXA target), consumption of factors V, VIII, fibrinogen and platelets.
          </li>
          <li>
            Crystalloid + RBC alone causes <strong>dilutional coagulopathy</strong> — clinically relevant
            after 1.5–2 blood volumes. PROPPR trial (2015): 1:1:1 reduced 24-h mortality from haemorrhage
            vs 1:1:2 in trauma; obstetric guidance extrapolates.
          </li>
          <li>
            Adjuncts: TXA 1 g within 3 h (WOMAN trial), early cryoprecipitate or fibrinogen concentrate
            (target fibrinogen &gt;2 g/L in obstetrics), ROTEM/TEG-guided correction.
          </li>
          <li>
            <strong>Complications</strong>: hypocalcaemia (citrate chelates Ca²⁺ — give 10 mL 10% calcium
            chloride after every 4 units), hyperkalaemia (stored RBC), hypothermia (warm all fluids),
            acidosis, TRALI, TACO.
          </li>
        </ul>
      </>
    ),
    answer: (
      <>
        Activate MTP early (1:1:1), give TXA, target fibrinogen &gt;2 g/L, monitor ionised Ca²⁺ and K⁺
        every 30 min, keep core temp &gt;36 °C. Switch to viscoelastic-guided component therapy as soon as
        ROTEM/TEG available.
      </>
    ),
    cites: ["Crotty Immunity 2014"],
  },
];

const HaematologyImmunityTopic = () => {
  return (
    <TopicTemplate
      title="Haematology & Immunity"
      subtitle="FRCA Primary & Final — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="haematology-immunity"
      topicTitle="Haematology & Immunity"
      quizQuestions={haematologyImmunityQuestions}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["HI_BK_01"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["HI_BK_02", "OA_BK_07"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["Allman & Wilson Ch.18", "BJA Educ Adaptive 2019"],
        workedExamples: ["AAGBI Anaphylaxis 2021", "AAGBI Anaphylaxis 2021", "BJA Educ 2017", "BJA Educ 2017", "Stavnezer Annu Rev 2008", "Crotty Immunity 2014"],
        keyPoints: ["Allman & Wilson Ch.18", "BJA Educ Immune 2016", "Smith-Garvin Annu Rev 2009", "Mellman Cell 2001", "Banchereau Nature 1998", "BJA Educ Adaptive 2019", "BJA Educ Innate 2018", "AAGBI Anaphylaxis 2021", "BJA Educ 2017"],
      }}
      keyPoints={[
        { text: "Cell-based coagulation model: initiation (TF+VIIa), amplification (thrombin activates platelets), propagation (thrombin burst)", cites: ["Smith-Garvin Annu Rev 2009"] },
        { text: "PT/INR = extrinsic (VII, warfarin). APTT = intrinsic (XII, XI, IX, VIII, heparin). TT = common pathway", cites: ["Mellman Cell 2001"] },
        { text: "ABO mismatch causes acute haemolytic transfusion reaction (IgM) — most dangerous transfusion complication", cites: ["Banchereau Nature 1998"] },
        { text: "Type I hypersensitivity (anaphylaxis): IgE-mediated mast cell degranulation. Measure serum tryptase", cites: ["BJA Educ Adaptive 2019"] },
        { text: "Massive transfusion complications: hypocalcaemia (citrate), hyperkalaemia, hypothermia, dilutional coagulopathy", cites: ["BJA Educ Innate 2018"] },
        { text: "Bacterial infection: TLR/PAMP recognition → neutrophil + complement (alternative/lectin) → Th17/Th1 + B-cell IgM→IgG class switch over 7–14 days", cites: ["BJA Educ Immune 2016"] },
        { text: "Viral infection: type I IFN (IFN-α/β) + NK cells early; CD8⁺ CTLs (perforin/granzyme) + neutralising IgG dominate adaptive clearance", cites: ["AAGBI Anaphylaxis 2021"] },
        { text: "Secondary response: 100–1000× higher IgG titre within 1–3 days via memory B/T cells — the rationale for vaccination", cites: ["BJA Educ 2017"] },
        { text: "Asplenic patients lose rapid IgM response to encapsulated organisms (pneumococcus, meningococcus, Hib) — vaccinate + prophylaxis", cites: ["Allman & Wilson Ch.18"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="overview" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["HI_BK_01"]}>
            <CollapsibleSubsection title="Overview" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Haematology and immunity sit at the heart of perioperative medicine — from haemostasis at the surgical
              wound to the recognition of anaphylaxis on induction and the immune compromise of asplenic, transplant
              and septic patients. This topic moves from coagulation (the cellular response to vessel injury) through
              blood-group serology and transfusion, to the architecture of innate and adaptive immunity, finishing with
              the differential response to bacterial vs viral infection and the rationale for vaccination.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="coagulation" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["HI_BK_01"]}>
            <CollapsibleSubsection title="Coagulation Cascade">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="liver-haemostasis" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["HI_BK_01"]}>
            <CollapsibleSubsection title="Rebalanced Haemostasis in Liver Disease">
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">Liver disease reduces procoagulants (II, V, VII, IX, X, XI and sometimes fibrinogen) <em>and</em> endogenous anticoagulants (protein C, protein S and antithrombin). Thrombocytopenia reflects portal-hypertensive splenic sequestration and reduced thrombopoietin; platelet dysfunction coexists with increased von Willebrand factor. Fibrinolysis is also unstable because plasminogen falls while tPA clearance falls <InlineRef topicId="haematology-immunity" refLabel="ISTH Rebalanced Haemostasis 2021" />.</p>
              <p className="text-sm text-muted-foreground leading-relaxed">The new equilibrium is fragile and may tip towards bleeding or thrombosis. PT/INR measures selected procoagulants but not anticoagulant loss, platelets or fibrinolysis, so it does not predict procedural bleeding reliably. TEG/ROTEM provides a global dynamic assessment and can target fibrinogen, platelets or antifibrinolytic treatment rather than empirical FFP.</p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="blood-groups" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["HI_BK_02"]}>
            <CollapsibleSubsection title="Blood Groups & Transfusion">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>ABO system</strong>: Group O = universal donor (no A/B antigens); Group AB = universal recipient. Naturally occurring IgM antibodies → immediate haemolytic reaction if mismatched</li>
              <li><strong>Rhesus system</strong>: D antigen most important. Rh− patients develop anti-D IgG after sensitisation → delayed reaction. Anti-D prophylaxis in Rh− mothers</li>
              <li><strong>TRALI</strong>: a two-hit process — recipient neutrophils are primed by sepsis/surgery, then donor anti-HLA/HNA antibodies or biological response modifiers activate them, causing capillary leak and non-cardiogenic pulmonary oedema. Plasma-rich FFP and platelets carry greater risk.</li>
              <li><strong>TACO</strong>: rapid transfusion exceeds cardiac reserve, producing hydrostatic oedema; elderly patients and those with cardiac/renal failure are vulnerable. Hypertension, raised JVP and BNP support TACO rather than TRALI.</li>
              <li><strong>Febrile non-haemolytic reaction</strong>: recipient antibodies recognise donor leucocyte antigens, or storage cytokines trigger fever/rigors; universal UK leucodepletion reduces incidence.</li>
              <li><strong>Massive transfusion</strong>: citrate chelates ionised calcium (a common rule is 10 mL 10% calcium chloride or 30 mL 10% calcium gluconate per four units, guided by ionised Ca²⁺). Stored-cell K⁺ leakage makes rapid older-blood transfusion hazardous in neonates and renal failure. Also prevent hypothermia and dilutional coagulopathy.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="antifibrinolytics" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["HI_BK_02"]}>
            <CollapsibleSubsection title="Tranexamic Acid and Antifibrinolysis">
              <p className="text-sm text-muted-foreground leading-relaxed">Tranexamic acid is a synthetic lysine analogue that competitively occupies plasminogen lysine-binding sites, reducing binding to fibrin and conversion to plasmin. It is renally excreted, so reduce repeated dosing in renal impairment. High exposure, especially in cardiac surgery or renal failure, increases seizure risk.</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside"><li><strong>Trauma:</strong> CRASH-2 showed lower death from bleeding when TXA was given early; give 1 g IV over 10 min then 1 g over 8 h, within 3 h of injury <InlineRef topicId="haematology-immunity" refLabel="CRASH-2 2010" />.</li><li><strong>Postpartum haemorrhage:</strong> WOMAN reduced death due to bleeding; give 1 g IV promptly, repeating 1 g after 30 min if bleeding continues or within 24 h if it restarts <InlineRef topicId="haematology-immunity" refLabel="WOMAN 2017" />.</li><li><strong>Combat trauma:</strong> MATTERs associated TXA with improved survival in severely injured transfused casualties, while recognising its observational design <InlineRef topicId="haematology-immunity" refLabel="MATTERs 2012" />.</li></ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="immunity-overview" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["HI_BK_03"]}>
            <CollapsibleSubsection title="Immunity & Inflammation">
            <DiagramSection
              title="Immune Cell Lineages — Myeloid & Lymphoid Family Tree"
              intro="Click any cell to reveal its role, function and clinical relevance. Use the highlight chips to fade everything that isn't innate or adaptive — dendritic cells and NK cells stay lit because they bridge both arms."
            >
              <ImmuneCellLineageDiagram />
            </DiagramSection>
            <DiagramSection
              title="Hypersensitivity Reactions — Type I to IV"
              intro="Select a type to compare mechanism, time course, classic examples, diagnostic tests and the anaesthetic-specific correlates. The log-scale timeline strip overlays all four so you can see at a glance why Type I is a theatre emergency in minutes while Type IV contact dermatitis takes 48–72 h."
            >
              <HypersensitivityComparisonDiagram />
            </DiagramSection>
            <div className="space-y-3">
              {[
                { title: "Innate Immunity", desc: "Non-specific, immediate. Physical barriers (skin, mucosa), complement cascade (classical, alternative, lectin pathways), phagocytes (neutrophils, macrophages), NK cells. Pattern recognition receptors (TLRs) detect PAMPs/DAMPs." },
                { title: "Adaptive Immunity", desc: "Specific, delayed (days). T cells: CD4⁺ helper (Th1 → cell-mediated, Th2 → humoral), CD8⁺ cytotoxic. B cells → plasma cells → antibodies (IgM first, then IgG class switch). Memory cells for secondary response." },
                 { title: "Hypersensitivity", desc: "Type I: immediate IgE-mediated mast-cell degranulation. Type II: IgG/IgM targets cell-surface antigen; complement and phagocytes act within minutes–hours (ABO incompatibility, HIT). Type III: circulating immune complexes deposit and activate complement/neutrophils over about 3–8 h (drug vasculitis, post-streptococcal GN). Type IV: sensitised Th1/CTL cells release IFN-γ/TNF-α and recruit macrophages over 48–72 h (chlorhexidine contact dermatitis, non-IgE latex dermatitis, tuberculin test)." },
                { title: "SIRS & Sepsis", desc: "Systemic inflammation (↑ TNF-α, IL-1, IL-6) → vasodilation, capillary leak, coagulopathy. SIRS criteria now replaced by SOFA/qSOFA in Sepsis-3." },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mt-8 mb-2">Hypersensitivity Types II, III and IV in detail</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Type II — cytotoxic (antibody against cell-surface antigen)</p>
                <ul className="mt-1 list-disc list-inside space-y-1">
                  <li><strong>Mechanism:</strong> IgG or IgM binds a fixed antigen on the target cell membrane.</li>
                  <li><strong>Effectors:</strong> classical complement activation to the membrane attack complex, opsonisation with phagocytosis, or antibody-dependent cell-mediated cytotoxicity by NK cells.</li>
                  <li><strong>Onset:</strong> minutes to hours.</li>
                  <li><strong>Examples:</strong> ABO-mismatch haemolytic transfusion reaction, haemolytic disease of the newborn, drug-induced immune haemolysis, heparin-induced thrombocytopenia, Goodpasture&rsquo;s syndrome.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Type III — immune complex</p>
                <ul className="mt-1 list-disc list-inside space-y-1">
                  <li><strong>Mechanism:</strong> soluble antigen–antibody complexes deposit in vessel walls, synovium, skin and glomeruli.</li>
                  <li><strong>Effectors:</strong> complement activation with C5a-driven neutrophil recruitment, protease release and vasculitis.</li>
                  <li><strong>Onset:</strong> typically 3–8 h after antigen exposure.</li>
                  <li><strong>Examples:</strong> serum sickness, systemic lupus erythematosus, post-streptococcal glomerulonephritis, drug-induced vasculitis.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Type IV — delayed, T-cell mediated</p>
                <ul className="mt-1 list-disc list-inside space-y-1">
                  <li><strong>Mechanism:</strong> sensitised CD4⁺ Th1 cells and CD8⁺ cytotoxic T cells recognise antigen presented on MHC; no antibody involvement.</li>
                  <li><strong>Effectors:</strong> IFN-γ and TNF-α activate macrophages (granuloma formation); CTLs kill directly via perforin/granzyme and Fas.</li>
                  <li><strong>Onset:</strong> 48–72 h.</li>
                  <li><strong>Examples:</strong> tuberculin skin test, contact dermatitis (chlorhexidine, non-IgE latex), graft-versus-host disease, chronic transplant rejection.</li>
                </ul>
              </div>
              <p><InlineRef topicId="haematology-immunity" refLabel="Abbas Immunology 10e" /></p>
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mt-8 mb-2">Complement pathways</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All three pathways converge on cleavage of C3 into C3a and C3b, so they share the same effector output.
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>Classical:</strong> C1q binds antigen–antibody complexes (IgM &gt; IgG) → C1r/C1s → C4 and C2 → C3 convertase (C4b2a).</li>
              <li><strong>Alternative:</strong> spontaneous &ldquo;tick-over&rdquo; hydrolysis of C3 is amplified on bacterial surfaces (e.g. LPS, yeast cell wall) that lack host regulatory proteins such as factor H, CD55 and CD59.</li>
              <li><strong>Lectin:</strong> mannose-binding lectin or ficolins bind mannose residues on pathogen surfaces and activate MASP-1/2, mimicking the classical route without antibody.</li>
              <li><strong>Effector functions:</strong> opsonisation (C3b, iC3b), anaphylatoxins and chemotaxis (C3a, C5a — mast-cell degranulation, neutrophil recruitment), and lysis by the membrane attack complex (C5b-9), most important for Gram-negative organisms and <em>Neisseria</em>.</li>
              <li><strong>Clinical relevance:</strong> terminal-pathway or MBL deficiency predisposes to meningococcal disease; complement consumption occurs in sepsis, cardiopulmonary bypass and hereditary angioedema (C1-inhibitor deficiency). <InlineRef topicId="haematology-immunity" refLabel="Abbas Immunology 10e" /></li>
            </ul>

            <h3 className="text-lg font-serif font-bold text-foreground mt-8 mb-2">SIRS, Sepsis-3 and UK recognition</h3>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>SIRS criteria (≥2):</strong> temperature &lt;36 or &gt;38 °C, heart rate &gt;90 min⁻¹, respiratory rate &gt;20 min⁻¹ (or PaCO₂ &lt;4.3 kPa), white cell count &lt;4 or &gt;12 × 10⁹/L (or &gt;10% band forms).</li>
              <li><strong>Why superseded:</strong> poor specificity — SIRS is met in trauma, pancreatitis, burns and after surgery without infection, and around one in eight patients with infection-related organ failure is SIRS-negative.</li>
              <li><strong>Sepsis-3 (2016):</strong> sepsis is life-threatening organ dysfunction caused by a dysregulated host response to infection; organ dysfunction is an acute rise in total SOFA score of ≥2 points. Septic shock is sepsis with vasopressor-dependent hypotension (MAP target 65 mmHg) plus lactate &gt;2 mmol/L despite fluid resuscitation. <InlineRef topicId="haematology-immunity" refLabel="Sepsis-3 2016" /></li>
              <li><strong>qSOFA</strong> (respiratory rate ≥22 min⁻¹, altered mentation, systolic BP ≤100 mmHg) is a bedside prompt outside critical care, not a diagnostic test.</li>
              <li><strong>UK practice (NICE NG51):</strong> risk-stratify with red-flag features — objective altered mental state, systolic BP ≤90 mmHg (or &gt;40 mmHg below normal), heart rate &gt;130 min⁻¹, respiratory rate ≥25 min⁻¹, needing oxygen for SpO₂ ≥92%, non-blanching rash, lactate &gt;2 mmol/L, anuria for 18 h. Any red flag mandates senior review, blood cultures, lactate, IV antibiotics within one hour and fluid resuscitation; amber flags warrant urgent review in high-risk groups (very young, elderly, pregnant, immunosuppressed, recent surgery or indwelling lines). <InlineRef topicId="haematology-immunity" refLabel="NICE NG51 Sepsis" /></li>
            </ul>

            <h3 className="text-lg font-serif font-bold text-foreground mt-8 mb-2">Transfusion-related immunomodulation (TRIM)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              TRIM describes the altered — largely immunosuppressive — state that can follow allogeneic blood transfusion.
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>Proposed mechanisms:</strong> transfer of soluble mediators accumulating during storage (cytokines, free haemoglobin, bioactive lipids, microvesicles); direct interaction between residual donor leucocytes and recipient antigen-presenting cells with regulatory T-cell expansion; and apoptosis of recipient immune cells.</li>
              <li><strong>Clinical consequences:</strong> increased postoperative and nosocomial infection, and a debated association with earlier tumour recurrence after cancer surgery; effect size appears greater with longer-stored and non-leucodepleted units.</li>
              <li><strong>Evidence:</strong> complex and contested — universal UK leucodepletion (since 1999) attenuated but did not abolish the signal, and randomised storage-duration trials were largely neutral.</li>
              <li><strong>Relevance:</strong> supports patient blood management — treat anaemia preoperatively, use restrictive thresholds, single-unit transfusion with reassessment, cell salvage and tranexamic acid. <InlineRef topicId="haematology-immunity" refLabel="Remy TRIM 2018" /></li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="bacterial-response" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["HI_BK_03"]}>
            <CollapsibleSubsection title="Response to Bacterial Infection">
            <DiagramSection
              title="Interactive: Immune Response Timeline"
              intro="Toggle between bacterial vs viral pathogens and naïve vs re-exposed states. The pathogen-burden curve, swimlane phases and cellular players all redraw — re-exposure suppresses the burden curve almost entirely, illustrating why vaccination works."
            >
              <ImmuneResponseTimelineDiagram />
            </DiagramSection>
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="viral-response" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["HI_BK_03"]}>
            <CollapsibleSubsection title="Response to Viral Infection">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="primary-vs-secondary" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["HI_BK_03"]}>
            <CollapsibleSubsection title="Naïve vs Secondary Response — at a glance">
            <DiagramSection
              title="Antibody Kinetics — Primary vs Secondary"
              intro="Log-titre plot of IgM and IgG across a first exposure (day 0) and re-challenge (day 28). The secondary IgG response is faster (1–3 days), larger (100–1000× higher peak) and predominantly class-switched — the immunological basis of vaccination."
            >
              <AntibodyKineticsDiagram />
            </DiagramSection>
            <DiagramSection
              title="Vaccine Platforms — Which Immune Arm?"
              intro="Pick a platform (live, inactivated, subunit/conjugate, toxoid, mRNA, viral vector) to see which arms of the immune system it preferentially primes, the resulting memory profile and the perioperative implications."
            >
              <VaccineTypesDiagram />
            </DiagramSection>
            <DiagramSection
              title="Asplenic / Hyposplenic Patient — Immunisation Flowchart"
              intro="Select the clinical scenario (elective, emergency or established hyposplenism) to see the correct vaccination window, then click each of the four mandatory vaccine groups for agents, schedule and rationale."
            >
              <AsplenicVaccinationFlowchart />
            </DiagramSection>
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>Suspected anaphylaxis</strong>: mast cell tryptase at 1–2 h, 6–24 h and baseline; refer to specialist allergy clinic. Adrenaline IV bolus 50 µg titrated to response.</>,
              <><strong>Asplenic patients</strong> are at lifelong risk of overwhelming infection by encapsulated organisms — confirm pneumococcal, meningococcal ACWY+B and Hib vaccination plus penicillin prophylaxis.</>,
              <><strong>Liver disease coagulopathy</strong> is balanced — INR overestimates bleeding risk; use TEG/ROTEM and avoid empiric FFP.</>,
              <><strong>Massive transfusion</strong>: anticipate dilutional thrombocytopenia, hypocalcaemia (citrate), hyperkalaemia and hypothermia — give in 1:1:1 ratio.</>,
              <><strong>ABO incompatibility</strong> is almost always a clerical error — repeat ID checks at every step.</>,
            ]}
          />
          <TopicFaqs faqs={haematologyImmunityFaqs} />

        </>
      }
    />
  );
};

export default HaematologyImmunityTopic;
