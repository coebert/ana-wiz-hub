import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { infectiousDiseaseIcuQuestions } from "@/data/quizzes";
import InfectionSiteMapDiagram from "@/components/diagrams/InfectionSiteMapDiagram";
import PCPHRCTDiagram from "@/components/diagrams/PCPHRCTDiagram";
import PCPManagementFlowchart from "@/components/diagrams/PCPManagementFlowchart";
import { WorkedExample } from "@/components/WorkedExamples";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Differentiate the causative organisms, severity scoring and empiric therapy for CAP, HAP and VAP",
  "Recognise high-mortality syndromes (Legionella, PVL-positive S. aureus, necrotising fasciitis, Weil's disease) and their distinctive features",
  "Compare Gram-positive and Gram-negative sepsis: pathophysiology, clinical pattern and antibiotic implications",
  "Identify multi-drug-resistant organisms (MRSA, VRE, ESBL, AmpC, CRE, MDR Pseudomonas/Acinetobacter, C. auris) and select appropriate therapy",
  "Apply infection-control bundles (CLABSI prevention, ventilator bundle, isolation, stewardship) on the ICU",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Severe CAP with multi-organ failure",
    scenario:
      "55-year-old returning from a hotel stay, presents with high fever, dry cough, confusion, diarrhoea. Na⁺ 122, CK 1500, lymphopenia, deranged LFTs. CXR: progressive RLL consolidation. CURB-65 = 4.",
    working:
      "Hyponatraemia + dry cough + diarrhoea + raised CK + LFT derangement + recent hotel stay → suspect Legionella pneumophila. Send urinary antigen (rapid; ~80% sensitivity for serogroup 1) and respiratory PCR. β-lactams alone are ineffective — Legionella is intracellular. Empiric severe CAP: co-amoxiclav + macrolide; in suspected Legionella escalate macrolide-based or fluoroquinolone-based therapy (azithromycin or levofloxacin). Notifiable disease — inform Public Health.",
    answer:
      "Severe Legionella pneumonia. Treat with IV levofloxacin or high-dose azithromycin (± combination if critically ill); add empiric β-lactam for atypical-CAP cover until Legionella confirmed; supportive ICU care, RRT if AKI; notify Public Health.",
  },
  {
    title: "Necrotising fasciitis with toxic shock",
    scenario:
      "Previously well 38-year-old, 24 h history of severe leg pain after minor scratch. BP 80/40, HR 130, lactate 5.2, WCC 22, CK 6000, sodium 128, creatinine 220. Erythema with disproportionate pain; LRINEC = 9.",
    working:
      "LRINEC ≥6 strongly suggests necrotising soft-tissue infection. Most likely Type II monomicrobial (Group A Streptococcus) given previously well patient and rapid course. Streptococcal toxic shock often coexists. Surgical debridement is the single most important intervention — must not be delayed for imaging. Antibiotics: piperacillin-tazobactam OR meropenem (broad cover) + clindamycin (toxin suppression — Eagle effect; β-lactams alone less effective at high inoculum) + vancomycin if MRSA risk. Consider IVIG for streptococcal TSS (INSTINCT-style data).",
    answer:
      "Emergency theatre for radical debridement (anticipate relooks at 24–48 h); antibiotics = pip-tazo/meropenem + clindamycin + vancomycin; IVIG if streptococcal TSS confirmed; ICU for vasopressors, AKI/RRT, anticipate ARDS and DIC.",
  },
];

const InfectiousDiseaseIcuTopic = () => {
  return (
    <TopicTemplate
      title="Infectious Disease in ICU"
      subtitle="FFICM — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      topicId="infectious-disease-icu"
      topicTitle="Infectious Disease in ICU"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={infectiousDiseaseIcuQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 4.7", "EDIC 5.7"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      keyPoints={[
        "Pneumonia is the commonest infection requiring ICU admission — categorise CAP/HAP/VAP and tailor empirical cover to local antibiogram",
        "Legionella: hyponatraemia + dry cough + GI symptoms + raised CK — treat with macrolide or fluoroquinolone (β-lactams ineffective)",
        "PVL-positive S. aureus necrotising pneumonia: leucopenia + haemoptysis in young patient → linezolid + clindamycin + IVIG, consider VV-ECMO",
        "Source control (drainage/debridement) is paramount in intra-abdominal sepsis and necrotising fasciitis — antibiotics alone are insufficient",
        "S. aureus bacteraemia always requires echocardiography, repeat cultures at 48–72 h, and minimum 2 weeks IV therapy",
        "ESBL bacteraemia: meropenem first-line — MERINO showed pip-tazo inferior",
        "C. difficile: oral vancomycin first-line; fidaxomicin for recurrence; FMT for refractory disease",
        "Antimicrobial stewardship: start smart, then focus — de-escalate at 48–72 h; procalcitonin can shorten duration",
      ]}
      coreConcepts={
        <>
          <ExamSection id="overview" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Infection is the dominant driver of organ failure on the modern ICU. The site map below previews the anatomical organisation of the topic — from respiratory and bloodstream infections through to fungal, viral, and multi-drug-resistant organisms — with an emphasis on source identification, empirical antimicrobial choice, and infection control.
            </p>
            <InfectionSiteMapDiagram />
          </ExamSection>

          <ExamSection id="respiratory" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.7"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Respiratory Infections</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Pneumonia is the most common infection requiring ICU admission. Causative organisms differ between community-acquired (CAP), hospital-acquired (HAP) and ventilator-associated (VAP) pneumonia.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Type</th>
                    <th className="text-left py-2 text-foreground font-semibold">Common Organisms</th>
                    <th className="text-left py-2 text-foreground font-semibold">Key Points</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CAP (severe)</td><td><em>S. pneumoniae</em>, <em>S. aureus</em>, <em>Legionella</em>, influenza, SARS-CoV-2</td><td>CURB-65 / PSI for severity. Empiric: co-amoxiclav + macrolide or β-lactam + respiratory fluoroquinolone.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">HAP / VAP</td><td><em>Pseudomonas</em>, <em>S. aureus</em> (MRSA), <em>Klebsiella</em>, <em>Acinetobacter</em></td><td>VAP: &gt;48 h after intubation. Quantitative BAL. Anti-pseudomonal β-lactam ± aminoglycoside.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Aspiration</td><td>Anaerobes, <em>Streptococci</em>, Gram-negatives</td><td>Chemical pneumonitis → secondary infection. Co-amoxiclav or pip-tazo.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Immunocompromised</td><td><em>Pneumocystis jirovecii</em>, CMV, <em>Aspergillus</em></td><td>PJP: bilateral ground-glass, high-dose co-trimoxazole ± steroids. Aspergillus: voriconazole first-line.</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="legionella" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Legionella Pneumonia</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <em>Legionella pneumophila</em> (serogroup 1) causes ~5% of severe CAP. Intracellular Gram-negative rod from contaminated water systems — no person-to-person transmission.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Clinical Features</p>
                <p className="text-xs text-muted-foreground mt-1">High fever, dry cough, confusion, diarrhoea, hyponatraemia (SIADH), raised CK, lymphopenia, deranged LFTs.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Diagnosis</p>
                <p className="text-xs text-muted-foreground mt-1">Urinary antigen (rapid, ~80% sens for serogroup 1). PCR on respiratory samples. Notifiable disease.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Treatment</p>
                <p className="text-xs text-muted-foreground mt-1">Macrolide (azithromycin) or fluoroquinolone (levofloxacin). 7–14 days (21 if immunocompromised). β-lactams ineffective.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">ICU Relevance</p>
                <p className="text-xs text-muted-foreground mt-1">Rapidly progressive respiratory failure, MOF, rhabdomyolysis, AKI. Mortality 10–30% in ICU.</p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="pvl" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">PVL-Positive <em>Staphylococcus aureus</em> Pneumonia</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Panton-Valentine Leukocidin is a pore-forming cytotoxin (MSSA or MRSA). Necrotising pneumonia in previously healthy young adults, often after influenza or skin infection. Mortality 50–75%.
            </p>
            <div className="space-y-2">
              {[
                { label: "Diagnostic Clues", detail: "Young, previously healthy, rapidly progressive pneumonia + leucopenia (paradoxical, often <2 ×10⁹/L) + haemoptysis. Multilobar cavitating consolidation. PCR for lukS-PV/lukF-PV genes." },
                { label: "Antimicrobial Therapy", detail: "Suppress toxin: linezolid + clindamycin (both inhibit toxin synthesis). Add flucloxacillin or vancomycin (if MRSA). IVIG 2 g/kg neutralises circulating toxin. Avoid sub-inhibitory β-lactams (paradoxical ↑ toxin)." },
                { label: "ICU Management", detail: "Early intubation, lung-protective ventilation, prone positioning. Consider VV-ECMO early. Aggressive vasopressor support. Surgical debridement of necrotic lung in refractory cases." },
                { label: "Infection Control & Contacts", detail: "UKHSA: screen household contacts (nasal, axilla, groin). Decolonisation: nasal mupirocin + chlorhexidine washes ×5 days. Recurrent skin abscesses in close contacts is a red flag." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="sepsis" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Gram-Positive vs Gram-Negative Sepsis</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The distinction is fundamental to sepsis pathophysiology, empiric antibiotic selection, and clinical presentation.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                    <th className="text-left py-2 text-foreground font-semibold">Gram-Positive</th>
                    <th className="text-left py-2 text-foreground font-semibold">Gram-Negative</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cell wall</td><td>Thick peptidoglycan, lipoteichoic acid; no outer membrane.</td><td>Outer membrane with LPS (endotoxin); thin peptidoglycan.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">PAMP / receptor</td><td>LTA, peptidoglycan, superantigens (TSST-1, PVL); TLR-2.</td><td>LPS lipid A; TLR-4 via MD-2/CD14. Nanogram quantities trigger systemic inflammation.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Common organisms</td><td><em>S. aureus</em>, <em>S. pneumoniae</em>, GAS, <em>Enterococcus</em>, CoNS</td><td><em>E. coli</em>, <em>Klebsiella</em>, <em>Pseudomonas</em>, <em>Acinetobacter</em>, <em>Neisseria</em>, <em>Bacteroides</em></td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Common sources</td><td>Skin/soft tissue, intravascular devices, endocarditis, bone/joint, surgical wounds</td><td>UTI (most common), intra-abdominal, HAP/VAP, meningitis</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">DIC association</td><td>Less common but occurs (purpura fulminans-like with GAS)</td><td>Strongly associated — LPS activates tissue factor. Meningococcal sepsis is the archetype.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Empiric antibiotics</td><td>Flucloxacillin (MSSA), vancomycin (MRSA risk), clindamycin for toxin suppression</td><td>Pip-tazo, ceftriaxone, or meropenem (ESBL/CRE risk). Anti-pseudomonal cover for HAP/VAP.</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Toxic Shock Syndromes</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Staphylococcal TSS</p>
                <p className="text-xs text-muted-foreground mt-1">TSST-1 superantigen. Fever, diffuse erythroderma, desquamation, hypotension, ≥3 organ systems. Treatment: source control + flucloxacillin + clindamycin + IVIG.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Streptococcal TSS</p>
                <p className="text-xs text-muted-foreground mt-1">Group A Strep pyrogenic exotoxins. Mortality 30–70%. Often with necrotising fasciitis. Pain out of proportion. Surgical debridement + benzylpenicillin + clindamycin + IVIG.</p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="urosepsis" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Urosepsis</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              UTIs are the second commonest source of ICU sepsis. Obstruction (calculi, BPH) is a common precipitant requiring urgent source control.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Common Organisms</p>
                <p className="text-xs text-muted-foreground mt-1"><em>E. coli</em>, <em>Klebsiella</em>, <em>Proteus</em>, <em>Pseudomonas</em>, <em>Enterococcus</em>.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Source Control</p>
                <p className="text-xs text-muted-foreground mt-1">Urgent imaging. Nephrostomy/stent for obstructed pyelonephritis. Remove/replace catheters.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Empiric Therapy</p>
                <p className="text-xs text-muted-foreground mt-1">Pip-tazo or gentamicin + amoxicillin. Meropenem if previous ESBL.</p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="cns" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">CNS Infections</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              CNS infection is a time-critical emergency: every hour of antibiotic delay in pneumococcal meningitis increases mortality. Anaesthetists and intensivists are involved early for airway, seizure control, raised ICP management and source control around lumbar puncture, neurosurgery and post-operative care.
            </p>

            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Overview by syndrome</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Condition</th>
                    <th className="text-left py-2 text-foreground font-semibold">Organisms</th>
                    <th className="text-left py-2 text-foreground font-semibold">Management</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Bacterial meningitis</td><td><em>N. meningitidis</em>, <em>S. pneumoniae</em>, <em>Listeria</em>, <em>H. influenzae</em>, GBS (neonates)</td><td>Ceftriaxone 2 g BD + dexamethasone 10 mg QDS. Add amoxicillin 2 g 4-hrly if &gt;50 y or immunocompromised (Listeria). Vancomycin if pneumococcal resistance suspected.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Viral encephalitis</td><td>HSV-1, VZV, enterovirus, arboviruses, JCV (PML)</td><td>IV aciclovir 10 mg/kg TDS empirically until HSV PCR negative. MRI: medial temporal/limbic in HSV. CSF PCR.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Brain abscess</td><td>Mixed anaerobes, viridans Streptococci, <em>S. aureus</em>, Gram-negatives (post-op/trauma)</td><td>Ceftriaxone + metronidazole (add vancomycin if MRSA/post-op). Stereotactic aspiration if &gt;2.5 cm or diagnostic uncertainty. 6–8 wk IV.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Subdural empyema / epidural abscess</td><td>Streptococci, anaerobes, <em>S. aureus</em></td><td>Surgical drainage is definitive — neurosurgical emergency. Same antibiotics as brain abscess. Watch for cord compression in spinal epidural abscess.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fungal meningitis</td><td><em>Cryptococcus neoformans</em>, <em>Candida</em>, <em>Aspergillus</em></td><td>Liposomal amphotericin B + flucytosine ×2 wk → fluconazole. Serial LPs / EVD for ↑ICP. Treat HIV.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">TB meningitis</td><td><em>M. tuberculosis</em></td><td>RIPE × 2 mo → RI × 10 mo. Adjuvant dexamethasone (Thwaites regimen) reduces mortality. Hydrocephalus common — EVD.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Healthcare-associated (post-neurosurgical, EVD, shunt)</td><td>Coag-neg staph, <em>S. aureus</em>, Gram-negatives, <em>Cutibacterium acnes</em></td><td>Vancomycin + meropenem or ceftazidime. Remove/exchange device. Intraventricular vancomycin/gentamicin for resistant cases.</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Presentation</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Meningitis</p>
                <p className="text-xs text-muted-foreground mt-1">Classic triad (fever, neck stiffness, altered mental state) present in only ~45%; ≥2 of triad + headache in &gt;95%. Photophobia, Kernig/Brudzinski signs. Non-blanching petechial rash → meningococcaemia. Septic shock and DIC may dominate. In elderly/immunocompromised: confusion or fever alone.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Encephalitis</p>
                <p className="text-xs text-muted-foreground mt-1">Altered consciousness &gt;24 h, personality/behavioural change, focal neurology, seizures (often temporal lobe in HSV), fever. Meningoencephalitis if both meningism and parenchymal signs.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Brain abscess / empyema</p>
                <p className="text-xs text-muted-foreground mt-1">Subacute headache, focal deficit, seizures; fever in only ~50%. Source: contiguous (sinus, ear, dental), haematogenous (endocarditis, lung), or post-traumatic/operative.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Raised ICP features</p>
                <p className="text-xs text-muted-foreground mt-1">Reducing GCS, pupillary asymmetry, Cushing reflex (hypertension + bradycardia + irregular respiration), papilloedema, posturing. Demands urgent imaging and ICP-directed care.</p>
              </div>
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Indications for critical care admission</h3>
            <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-4">
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>GCS ≤ 12, rapidly falling GCS, or inability to protect the airway</li>
                <li>Status epilepticus or recurrent seizures</li>
                <li>Septic shock / haemodynamic instability requiring vasopressors</li>
                <li>Respiratory failure (aspiration, ARDS, neuromuscular weakness)</li>
                <li>Clinical or radiological raised ICP / impending herniation requiring osmotherapy, EVD or decompression</li>
                <li>Need for invasive monitoring (ICP, EEG, intra-arterial BP) or neurosurgical intervention</li>
                <li>DIC, purpura fulminans, multi-organ failure (often meningococcal)</li>
                <li>Post-neurosurgical / shunt infection requiring device removal</li>
              </ul>
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Work-up</h3>
            <div className="space-y-2 mb-4">
              {[
                { step: "Immediate (do not delay antibiotics)", detail: "Blood cultures ×2, FBC, U&E, LFT, CRP, coagulation, lactate, glucose (paired with CSF), meningococcal/pneumococcal PCR (whole blood), HIV test. Give empiric antibiotics within 1 h of suspicion — ideally after blood cultures but before LP if LP delayed." },
                { step: "Empiric antimicrobials", detail: "Community: ceftriaxone 2 g IV BD + dexamethasone 10 mg IV QDS (start with or before first antibiotic dose — improves outcome in pneumococcal disease, GRADE 1A). Add amoxicillin 2 g 4-hrly if >50 y, pregnant, alcohol, immunocompromised (Listeria). Add aciclovir 10 mg/kg TDS if encephalitis features. Add vancomycin if recent travel/PRSP risk." },
                { step: "Imaging before LP", detail: "CT head before LP if: GCS <13, focal neurology, new seizure, immunocompromised, papilloedema, age >60. CT does NOT exclude raised ICP — clinical judgement remains. MRI superior for HSV (medial temporal), abscess (DWI restriction with ring enhancement), TB (basal meningitis, tuberculomas)." },
                { step: "Lumbar puncture", detail: "Opening pressure (raised >25 cmH₂O in bacterial/cryptococcal). Send: cell count + differential, protein, glucose (with paired serum), Gram stain, culture, viral PCR (HSV, VZV, enterovirus), meningococcal/pneumococcal PCR, lactate. Add cryptococcal antigen, AFB/TB PCR, India ink, cytology if relevant." },
                { step: "CSF interpretation", detail: "Bacterial: neutrophils ↑↑ (>1000), protein ↑↑ (>1 g/L), glucose ↓↓ (<40% serum), lactate >3.5 mmol/L. Viral: lymphocytes, protein ↑, glucose normal. TB/fungal: lymphocytes, protein ↑↑, glucose ↓, opening pressure ↑↑. Traumatic tap: correct WCC by 1 per 700 RBC." },
                { step: "Specialist tests", detail: "EEG (HSV: temporal lobe periodic discharges; non-convulsive status). Autoimmune panel (NMDAR, LGI1, GABA-B) if immunotherapy considered. HIV, syphilis serology. Echocardiogram if abscess/embolic phenomena (endocarditis source)." },
              ].map((s) => (
                <div key={s.step} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{s.step}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.detail}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">ICU management bundles</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Airway & ventilation</p>
                <p className="text-xs text-muted-foreground mt-1">Intubate for GCS ≤8, status epilepticus, refractory shock or airway soiling. Neuro-protective induction: optimise haemodynamics, blunt laryngoscopy response. Avoid hypercapnia (worsens ICP); target PaCO₂ 4.5–5.0 kPa, PaO₂ &gt;13 kPa. Head-up 30°.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Haemodynamics</p>
                <p className="text-xs text-muted-foreground mt-1">Balanced crystalloid + early noradrenaline to MAP target preserving CPP &gt;60 mmHg. Avoid hypotension absolutely. Steroids do NOT preclude vasopressor use. Treat DIC with platelets/FFP/cryoprecipitate as needed.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Raised ICP / seizures</p>
                <p className="text-xs text-muted-foreground mt-1">Sedation, analgesia, normocapnia, normothermia, normonatraemia (avoid hyponatraemia — Na⁺ 140–145). Osmotherapy: mannitol 0.5–1 g/kg or hypertonic saline 2.7–3% bolus. EVD for hydrocephalus. Levetiracetam first-line for seizures; cEEG if persistent altered consciousness.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Source control & adjuncts</p>
                <p className="text-xs text-muted-foreground mt-1">Neurosurgery for abscess &gt;2.5 cm, empyema, infected shunt/EVD removal. Dexamethasone for first 4 days in suspected pneumococcal meningitis (stop if not pneumococcal). Public health notification + chemoprophylaxis (ciprofloxacin/rifampicin) for meningococcal contacts. VTE prophylaxis after 24 h if no haemorrhage.</p>
              </div>
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Duration of adjunctive dexamethasone</h3>
            <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                Based on the De Gans &amp; van de Beek RCT (NEJM 2002) and endorsed by ESCMID 2016, IDSA and NICE NG240 (2024):
              </p>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li><strong>Dose &amp; timing:</strong> dexamethasone 10 mg IV every 6 h, started <em>with or before</em> the first dose of antibiotic (within 4 h at the latest — no benefit if given after antibiotics in adults).</li>
                <li><strong>Duration:</strong> continue for <strong>4 days total</strong> if CSF/blood culture confirms <em>S. pneumoniae</em> (or <em>H. influenzae</em> in children).</li>
                <li><strong>Stop early</strong> if cultures/PCR identify a non-pneumococcal organism (e.g. <em>N. meningitidis</em>, <em>Listeria</em>, Gram-negatives) — no mortality benefit and possible harm in <em>Listeria</em> meningitis.</li>
                <li><strong>Stop early</strong> if an alternative diagnosis is established or bacterial meningitis is excluded.</li>
                <li><strong>Do not start</strong> if &gt;4 h have elapsed since the first antibiotic dose, in septic shock alone without meningitis, or in post-neurosurgical meningitis (no evidence of benefit).</li>
                <li><strong>TB meningitis:</strong> separate, longer regimen — dexamethasone 0.3–0.4 mg/kg/day IV tapered over <strong>6–8 weeks</strong> (Thwaites NEJM 2004).</li>
                <li><strong>Cover:</strong> add PPI for GI prophylaxis; monitor glucose; steroids may reduce CSF vancomycin penetration — use higher doses + TDM if pneumococcal resistance suspected.</li>
              </ul>
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Complications</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">System</th>
                    <th className="text-left py-2 text-foreground font-semibold">Complication</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Neurological</td><td>Cerebral oedema, herniation, infarction (vasculitis), venous sinus thrombosis, sensorineural deafness (esp. pneumococcal — early audiology), cranial nerve palsies, cognitive impairment, abscess formation. <em>(Seizures &amp; hydrocephalus — see below.)</em></td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cardiovascular</td><td>Septic shock, myocardial dysfunction, purpura fulminans / limb ischaemia (meningococcal), Waterhouse–Friderichsen syndrome (adrenal haemorrhage). <em>(DIC — see below.)</em></td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Respiratory</td><td>Aspiration pneumonia, ARDS, neurogenic pulmonary oedema.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Endocrine / metabolic</td><td>Cerebral salt wasting, diabetes insipidus, hyperglycaemia (steroids). <em>(SIADH — see below.)</em></td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Long-term</td><td>Epilepsy, focal deficits, cognitive/behavioural sequelae, deafness, hydrocephalus requiring shunt; psychiatric morbidity in survivors and families.</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Targeted monitoring &amp; immediate treatment for key complications</h3>
            <div className="space-y-3 mb-4">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Seizures / status epilepticus</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Monitor:</strong> hourly GCS, pupils and limb tone; capillary glucose; Na⁺ 6-hrly; continuous EEG if persistently obtunded, paralysed, or refractory status (non-convulsive status occurs in ~25% of comatose meningitis patients); urgent CT to exclude haemorrhage/herniation.</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Immediate Tx:</strong> ABC + O₂, correct glucose/Na⁺. <em>1st</em> lorazepam 4 mg IV (or midazolam 10 mg IM/buccal) — repeat once at 5 min. <em>2nd</em> levetiracetam 60 mg/kg (max 4.5 g) <em>or</em> phenytoin 20 mg/kg <em>or</em> sodium valproate 40 mg/kg over 10 min (ESETT). <em>3rd</em> RSI with thiopentone/propofol, intubate, midazolam or propofol infusion to burst suppression on cEEG; involve neurology. Continue levetiracetam prophylaxis ≥7 days after a single seizure.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Hydrocephalus / raised ICP</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Monitor:</strong> hourly GCS &amp; pupils; watch for Cushing reflex (hypertension + bradycardia); fundoscopy / optic nerve sheath US (&gt;5 mm suggestive); urgent CT for ventricular dilatation; ICP monitor or EVD for objective measurement; CPP target &gt;60 mmHg.</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Immediate Tx:</strong> head-up 30°, neutral neck, loosen ETT ties; sedate &amp; analgese; PaCO₂ 4.5–5.0 kPa, PaO₂ &gt;13 kPa, Na⁺ 140–145, temp ≤37 °C. Osmotherapy: <strong>hypertonic saline 2.7–3% 250 mL</strong> or <strong>mannitol 0.5–1 g/kg</strong> over 15 min (check serum osmolality &lt;320). Urgent neurosurgical referral for <strong>EVD insertion</strong> in obstructive/communicating hydrocephalus; decompressive craniectomy for refractory ICP. Brief hyperventilation (PaCO₂ ≈4.0 kPa) only as a bridge to definitive treatment.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">DIC / purpura fulminans</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Monitor:</strong> 6-hrly FBC, PT/APTT, fibrinogen, D-dimer; ISTH DIC score; serial lactate; hourly limb perfusion checks (capillary refill, pulses, mottling) — photograph &amp; mark advancing purpura; arterial line; urine output.</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Immediate Tx:</strong> aggressive source control (antibiotics within 1 h) and shock resuscitation — DIC will not resolve until sepsis is controlled. Transfuse <em>only if bleeding or pre-procedure</em>: platelets to &gt;50 (×10⁹/L), FFP 15 mL/kg if PT/APTT ratio &gt;1.5, cryoprecipitate if fibrinogen &lt;1.5 g/L. Vitamin K 10 mg IV. Consider <strong>protein C concentrate</strong> in meningococcal purpura fulminans. Avoid heparin in active bleeding/purpura. Discuss limb ischaemia with vascular/plastics early; do not amputate prematurely (demarcation takes weeks). Hydrocortisone 200 mg/day if vasopressor-dependent (consider Waterhouse–Friderichsen).</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">SIADH (vs cerebral salt wasting / DI)</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Monitor:</strong> Na⁺ 6-hrly initially; paired serum &amp; urine osmolality and urinary Na⁺; hourly fluid balance &amp; urine output; daily weights; fluid status (CVP, passive leg raise). SIADH = euvolaemic hyponatraemia with urine osm &gt;100 mosm/kg, urine Na⁺ &gt;30 mmol/L, low serum urate.</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Immediate Tx:</strong> if symptomatic (seizures, GCS drop) give <strong>hypertonic saline 2.7% 150 mL over 10 min</strong>, repeat × up to 3 until Na⁺ rises 4–6 mmol/L; then stop. Asymptomatic: <strong>fluid restrict to 800–1000 mL/24 h</strong>; correct Na⁺ no faster than <strong>8–10 mmol/L per 24 h</strong> (risk of osmotic demyelination). Treat the cause. Tolvaptan only with endocrine input. <em>Distinguish from CSW</em> (hypovolaemic, high urine output, high urine Na⁺) — give isotonic saline, never restrict. <em>Distinguish from DI</em> (polyuria &gt;3 mL/kg/h, dilute urine, rising Na⁺) — give desmopressin 1–2 µg IV.</p>
              </div>
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Prognosis</h3>
            <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-4">
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li><strong>Pneumococcal meningitis:</strong> mortality 20–30% (up to 50% with septic shock); ~30% of survivors have neurological sequelae (deafness, cognitive deficit).</li>
                <li><strong>Meningococcal disease:</strong> overall mortality 5–10%; up to 40% with fulminant septicaemia / purpura fulminans. Survivors may have limb loss, scarring, hearing loss.</li>
                <li><strong>Listeria meningoencephalitis:</strong> mortality 20–30%, higher in elderly/immunocompromised.</li>
                <li><strong>HSV encephalitis:</strong> untreated mortality &gt;70%; with timely aciclovir mortality ~20%, but ~50% of survivors have long-term cognitive/behavioural sequelae.</li>
                <li><strong>TB meningitis:</strong> mortality 20–50%; worse with HIV co-infection or stage III disease (coma, focal deficit).</li>
                <li><strong>Brain abscess:</strong> mortality now &lt;15% with imaging + neurosurgery; epilepsy in ~30% of survivors.</li>
                <li><strong>Cryptococcal meningitis (HIV):</strong> 10-week mortality 20–40% even with optimal therapy; raised ICP is the strongest modifiable predictor.</li>
                <li>Key prognostic factors: time to first antibiotic dose, GCS at presentation, age, septic shock, seizures, CSF lactate, and need for mechanical ventilation.</li>
              </ul>
            </div>
          </ExamSection>

          <ExamSection id="abdo" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intra-abdominal Sepsis</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              ~20% of ICU sepsis. Source control (surgery or drainage) is the critical intervention.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Common Sources</p>
                <p className="text-xs text-muted-foreground mt-1">Perforated viscus, anastomotic leak, cholangitis, diverticular abscess, infected pancreatic necrosis.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Organisms</p>
                <p className="text-xs text-muted-foreground mt-1"><em>E. coli</em>, <em>Bacteroides</em>, <em>Enterococcus</em>, <em>Klebsiella</em>. Tertiary peritonitis: <em>Candida</em>, <em>E. faecium</em>, MDR Gram-negatives.</p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="necfasc" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Necrotising Fasciitis</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Rapidly progressive fascial-plane infection. Mortality 20–40%. Early surgical debridement is the single most important intervention.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Type I (Polymicrobial)</p>
                <p className="text-xs text-muted-foreground mt-1">Mixed aerobes + anaerobes. Post-op or perineal (Fournier's). Risk: diabetes, immunosuppression, PVD.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Type II (Monomicrobial)</p>
                <p className="text-xs text-muted-foreground mt-1">Group A Strep, S. aureus, Clostridium. Healthy patients. STSS in ~50%.</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Clinical Features", detail: "Pain out of proportion, rapidly spreading erythema, crepitus, bullae, necrosis, systemic toxicity. LRINEC ≥6." },
                { label: "Surgical Management", detail: "Emergency radical debridement — 'finger test' at fascial plane. Multiple relooks. Possible amputation. VAC for open wounds." },
                { label: "Medical", detail: "Pip-tazo or meropenem + clindamycin (toxin suppression) + vancomycin (MRSA risk). IVIG for STSS." },
                { label: "ICU Considerations", detail: "Massive fluid requirements, vasopressors, anticipate DIC/AKI/ARDS. Early intubation if cervicofacial spread." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="bloodstream" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bloodstream & Line Infections</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              CLABSI is a major preventable cause of ICU morbidity. 'Matching Michigan' bundles have reduced rates significantly.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Organisms</p>
                <p className="text-xs text-muted-foreground mt-1">CoNS, S. aureus, Candida, Enterococcus, Gram-negatives. S. aureus bacteraemia: always echo + prolonged therapy.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Prevention Bundle</p>
                <p className="text-xs text-muted-foreground mt-1">Hand hygiene, full barrier, chlorhexidine prep, avoid femoral, daily review, aseptic technique.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Management</p>
                <p className="text-xs text-muted-foreground mt-1">Remove/exchange line. Paired cultures (differential time to positivity). Empiric vancomycin + Gram-negative cover.</p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="fungal" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fungal Infections in ICU</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Invasive fungal infections carry 30–60% mortality. Risk: broad-spectrum antibiotics, central lines, TPN, immunosuppression.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Organism</th>
                    <th className="text-left py-2 text-foreground font-semibold">Presentation</th>
                    <th className="text-left py-2 text-foreground font-semibold">Diagnosis & Treatment</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground"><em>Candida</em> spp.</td><td>Candidaemia, intra-abdominal, candiduria. C. auris emerging MDR.</td><td>Cultures (~50% sens), 1,3-β-D-glucan. Empiric echinocandin (IDSA). Remove lines.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground"><em>Aspergillus</em></td><td>IPA: halo/air-crescent. CAPA in COVID.</td><td>Galactomannan. Voriconazole + TDM (1–5.5 mg/L). Isavuconazole or L-AmB alternatives.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground"><em>Pneumocystis</em></td><td>Bilateral GGO, hypoxaemia, ↑LDH. HIV / non-HIV immunosuppression.</td><td>High-dose co-trimoxazole + steroids if PaO₂ &lt;9.3 kPa. 14–21 days.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground"><em>Cryptococcus</em></td><td>Meningoencephalitis in immunosuppressed. ↑ICP.</td><td>Amphotericin B + flucytosine → fluconazole. Serial LPs.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Mucormycosis</td><td>Rhinocerebral/pulmonary in DKA, haematological malignancy. Angioinvasive.</td><td>Surgical debridement + L-AmB. Correct risk factors.</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2"><em>Pneumocystis jirovecii</em> pneumonia (PJP/PCP)</h3>
            <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
              Opportunistic fungal pneumonia (formerly <em>P. carinii</em>). Two distinct populations: <strong>HIV with CD4 &lt;200</strong> (subacute, lower mortality but higher organism burden) and <strong>non-HIV immunosuppressed</strong> — solid-organ/HSCT recipients, high-dose steroids (≥20 mg prednisolone &gt;4 wk), biologics (rituximab, anti-TNF), haematological malignancy, congenital immunodeficiency. Non-HIV PCP is more fulminant, with higher ICU mortality (30–60%).
            </p>

            <div className="mb-3">
              <PCPHRCTDiagram />
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Presentation</p>
                <p className="text-xs text-muted-foreground mt-1">Subacute (days–weeks in HIV; days in non-HIV) progressive dyspnoea, dry cough, low-grade fever. Profound exertional desaturation; clear chest on auscultation despite marked hypoxaemia. Type 1 respiratory failure → ARDS. Pneumothorax in ~10% (cyst rupture).</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Diagnosis</p>
                <p className="text-xs text-muted-foreground mt-1">HRCT: bilateral perihilar ground-glass opacification ± upper-zone cysts; sparing of subpleural regions. CXR may be normal early. Confirm on <strong>induced sputum</strong> (sens ~50–90% in HIV, lower in non-HIV) or <strong>BAL</strong> (sens &gt;95%) — silver/Giemsa/immunofluorescence stain or <strong>PCR</strong> (very sensitive but can detect colonisation; interpret with β-D-glucan and clinical picture). Markedly raised serum <strong>LDH</strong> and <strong>(1,3)-β-D-glucan</strong> (sens ~95%, useful negative predictor); negative HIV test does NOT exclude PCP.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Work-up</p>
                <p className="text-xs text-muted-foreground mt-1">ABG (A–a gradient stratifies severity), FBC/U&amp;E/LFT/G6PD (before high-dose co-trimoxazole), HIV test + CD4 + viral load, β-D-glucan, LDH, blood cultures, CMV PCR, respiratory virus PCR, HRCT, urgent BAL if safe. Screen for co-pathogens (CMV, bacterial, TB, fungal). Document immunosuppression history.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Severity grading</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Mild:</strong> PaO₂ &gt;11 kPa or A–a &lt;4.7 kPa on air. <strong>Moderate:</strong> PaO₂ 8–11 kPa or A–a 4.7–6 kPa. <strong>Severe:</strong> PaO₂ &lt;8 kPa (60 mmHg) or A–a &gt;6 kPa (35 mmHg) — adjuvant steroids indicated.</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-3">
              <p className="font-semibold text-foreground text-sm mb-1">Management</p>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li><strong>1st line:</strong> co-trimoxazole (TMP–SMX) <strong>15–20 mg/kg/day of TMP component IV in 3–4 divided doses</strong>, switch to oral when stable. Total course <strong>21 days</strong> (HIV) or 14–21 days (non-HIV).</li>
                <li><strong>Adjuvant steroids</strong> (mortality benefit if PaO₂ &lt;9.3 kPa / 70 mmHg or A–a &gt;4.7 kPa, especially HIV): prednisolone 40 mg BD × 5 d → 40 mg OD × 5 d → 20 mg OD × 11 d (or equivalent IV methylprednisolone). Start with or before first dose of co-trimoxazole. Benefit in non-HIV PCP less clear but commonly used.</li>
                <li><strong>2nd line / intolerance / sulfa allergy:</strong> IV pentamidine 4 mg/kg/day (nephrotoxic, hypoglycaemia, QT, pancreatitis); clindamycin + primaquine (check G6PD); atovaquone (mild–moderate only); dapsone + trimethoprim.</li>
                <li><strong>Supportive ICU care:</strong> targeted O₂ (SpO₂ 92–96%), <strong>HFNO or awake proning</strong> first; lung-protective ventilation (V<sub>T</sub> 6 mL/kg PBW, P<sub>plat</sub> ≤30, driving pressure &lt;15) if intubated; high incidence of pneumothorax — low PEEP escalation, low threshold for chest drain; consider <strong>ECMO</strong> for refractory hypoxaemia in selected patients.</li>
                <li><strong>Immune reconstitution:</strong> in HIV, start ART within 2 weeks of PCP treatment (ACTG A5164). In non-HIV, taper immunosuppression where possible in discussion with the parent team.</li>
                <li><strong>Monitor:</strong> daily FBC (myelosuppression), U&amp;E (hyperkalaemia, AKI), LFT, glucose, lactate; rising LDH suggests treatment failure or alternative diagnosis. Reassess at 5–7 days — clinical deterioration is common in the first 3–5 days even on effective therapy (steroids mitigate this).</li>
                <li><strong>Secondary prophylaxis:</strong> co-trimoxazole 480–960 mg OD (or 960 mg three-times weekly) until CD4 &gt;200 for &gt;3 months on ART, or until immunosuppression resolved.</li>
              </ul>
            </div>

            <h4 className="text-base font-serif font-semibold text-foreground mt-4 mb-2">ICU management flowchart</h4>
            <div className="mb-3">
              <PCPManagementFlowchart />
            </div>

            <div className="p-3 rounded-lg bg-secondary/30 border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Prognosis</p>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li><strong>HIV-PCP:</strong> overall mortality ~10–20%; ICU/ventilated 30–50%; better since ART era.</li>
                <li><strong>Non-HIV PCP:</strong> mortality 30–60%; worse outcomes despite lower organism burden — driven by exuberant inflammatory response and delayed diagnosis.</li>
                <li>Adverse prognostic factors: age, need for mechanical ventilation, pneumothorax, low albumin, high LDH, delayed treatment (&gt;5 days), co-infection (CMV, bacterial), comorbid lung disease, lack of adjuvant steroids when indicated.</li>
                <li>Survivors: ~20% have persistent restrictive/diffusion defect; recurrence is common without effective prophylaxis.</li>
              </ul>
            </div>

            <h4 className="text-base font-serif font-semibold text-foreground mt-4 mb-2">Distinguishing PCP from look-alikes</h4>
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                    <th className="text-left py-2 text-foreground font-semibold">PCP</th>
                    <th className="text-left py-2 text-foreground font-semibold">Bacterial pneumonia</th>
                    <th className="text-left py-2 text-foreground font-semibold">Viral pneumonitis (e.g. CMV, influenza, COVID)</th>
                    <th className="text-left py-2 text-foreground font-semibold">Other ARDS (sepsis, aspiration, TRALI)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Host</td>
                    <td>HIV (CD4 &lt;200), steroids ≥20 mg &gt;4 wk, biologics (rituximab), HSCT/SOT, haematological malignancy</td>
                    <td>Any host; comorbidities (COPD, alcohol, diabetes); often community</td>
                    <td>Immunocompromised (CMV) or community outbreak (influenza, COVID, RSV)</td>
                    <td>Usually identifiable extrapulmonary insult: shock, trauma, pancreatitis, transfusion, gastric content</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Tempo</td>
                    <td>Subacute days–weeks (HIV); days (non-HIV)</td>
                    <td>Acute hours–days; rigors, productive cough</td>
                    <td>Acute–subacute days; prodromal viral symptoms</td>
                    <td>Acute &lt;7 days from insult (Berlin criteria)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Cough/sputum</td>
                    <td>Dry, non-productive</td>
                    <td>Productive, purulent</td>
                    <td>Dry; coryzal symptoms</td>
                    <td>Variable; depends on cause</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Examination</td>
                    <td>Strikingly clear chest despite hypoxia; profound exertional desaturation</td>
                    <td>Focal crackles/bronchial breathing/dullness</td>
                    <td>Diffuse fine crackles; often clear chest</td>
                    <td>Diffuse crackles ± features of underlying cause</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">CXR</td>
                    <td>Often normal early; later bilateral perihilar reticular/GGO</td>
                    <td>Lobar/segmental consolidation ± effusion</td>
                    <td>Bilateral interstitial infiltrates</td>
                    <td>Bilateral diffuse infiltrates not explained by cardiac failure</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">HRCT</td>
                    <td><strong>Bilateral perihilar GGO with subpleural sparing; upper-zone thin-walled cysts; pneumothorax in ~10%</strong>; effusion/lymphadenopathy rare</td>
                    <td>Lobar consolidation, air bronchograms, parapneumonic effusion ± cavitation</td>
                    <td>Patchy multifocal GGO ± consolidation; tree-in-bud (CMV); peripheral GGO with crazy paving (COVID); often no cysts</td>
                    <td>Diffuse dependent consolidation/atelectasis; gravitational gradient; no cysts</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Inflammatory markers</td>
                    <td>CRP modestly raised; <strong>LDH ↑↑</strong> (typically &gt;500 U/L); WCC variable; lymphopenia common</td>
                    <td>CRP/PCT markedly raised; neutrophilia</td>
                    <td>CRP modest; PCT typically low; lymphopenia (esp. influenza, COVID)</td>
                    <td>Reflects underlying cause; SIRS biomarkers</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Specific tests</td>
                    <td><strong>(1,3)-β-D-glucan ↑↑</strong>, BAL/induced sputum PCR + silver/IF stain, HIV/CD4</td>
                    <td>Blood &amp; sputum cultures, urinary pneumococcal/Legionella antigen, PCT</td>
                    <td>Respiratory virus PCR (NPA/BAL), CMV viraemia + BAL PCR, SARS-CoV-2 PCR</td>
                    <td>Source-directed work-up; echo (cardiogenic vs ARDS); BAL if non-resolving</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">β-D-glucan / galactomannan</td>
                    <td>β-D-glucan very high; galactomannan negative</td>
                    <td>Both negative</td>
                    <td>Both negative</td>
                    <td>Both negative (positive galactomannan suggests Aspergillus co-infection)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Pleural effusion / lymphadenopathy</td>
                    <td>Rare — if present, reconsider diagnosis</td>
                    <td>Common (parapneumonic)</td>
                    <td>Uncommon</td>
                    <td>Common (depends on cause)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Response to empirical antibiotics</td>
                    <td>None — deteriorates without co-trimoxazole</td>
                    <td>Improves within 48–72 h</td>
                    <td>None — needs antiviral or supportive care</td>
                    <td>None — needs source control / lung-protective ventilation</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-foreground">Key red flags</td>
                    <td>Hypoxia disproportionate to CXR; recent steroids/biologics; bilateral GGO + cysts</td>
                    <td>Lobar consolidation + high PCT + focal signs</td>
                    <td>Outbreak setting, lymphopenia, multifocal GGO without cysts</td>
                    <td>Identifiable insult, P/F &lt;300, bilateral infiltrates, not cardiac</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Pearl:</strong> in an immunosuppressed patient with disproportionate hypoxia, dry cough, raised LDH and β-D-glucan, and bilateral perihilar GGO on HRCT, treat empirically for PCP while awaiting BAL — do not wait for confirmation. Co-infection (CMV, bacterial, Aspergillus) is common and worsens prognosis, so screen for it in parallel.
            </p>

            <h4 className="text-base font-serif font-semibold text-foreground mt-4 mb-2">Sources &amp; further reading</h4>
            <div className="p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground space-y-3">
              <div>
                <p className="font-semibold text-foreground mb-1">Comparison table (PCP vs bacterial / viral / ARDS)</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Salzer HJF, et al. <em>Clinical, diagnostic, and treatment disparities between HIV-infected and non-HIV-infected immunocompromised patients with Pneumocystis jirovecii pneumonia.</em> Respiration 2018;96:52–65.</li>
                  <li>Cooley L, et al. <em>Consensus guidelines for diagnosis, prophylaxis and management of Pneumocystis jirovecii pneumonia.</em> Intern Med J 2014;44:1350–63 (ANZ Mycology Interest Group).</li>
                  <li>Kanne JP, et al. <em>Pneumocystis jiroveci pneumonia: high-resolution CT findings in patients with and without HIV infection.</em> AJR Am J Roentgenol 2012;198:W555–61.</li>
                  <li>ARDS Definition Task Force. <em>Acute Respiratory Distress Syndrome: the Berlin Definition.</em> JAMA 2012;307:2526–33.</li>
                  <li>Cilloniz C, Torres A, Niederman MS. <em>Management of pneumonia in critically ill patients.</em> BMJ 2021;375:e065871.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">ICU management flowchart &amp; guidance</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>NIH/CDC/IDSA. <em>Guidelines for the Prevention and Treatment of Opportunistic Infections in Adults and Adolescents with HIV</em> (2024 update) — co-trimoxazole dosing, steroid criteria, secondary prophylaxis.</li>
                  <li>Maertens JA, et al. <em>ECIL guidelines for treatment of Pneumocystis jirovecii pneumonia in non-HIV haematology patients.</em> J Antimicrob Chemother 2016;71:2397–404.</li>
                  <li>Limper AH, et al. <em>An official ATS statement: treatment of fungal infections in adult pulmonary and critical care patients.</em> Am J Respir Crit Care Med 2011;183:96–128.</li>
                  <li>Bos LDJ, Ware LB. <em>Acute respiratory distress syndrome: causes, pathophysiology, and phenotypes.</em> Lancet 2022;400:1145–56 — lung-protective ventilation principles applied to PCP-ARDS.</li>
                  <li>Combes A, et al. <em>Extracorporeal membrane oxygenation for severe ARDS (EOLIA).</em> N Engl J Med 2018;378:1965–75 — ECMO referral thresholds.</li>
                  <li>ESCMID/ECMM/ERS. <em>Guideline for the diagnosis and management of Pneumocystis jirovecii pneumonia.</em> 2024.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">BJA Education / CEACCP — exam-aligned reviews</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Thomas M, Rutman M. <em>Pneumocystis jirovecii pneumonia in the intensive care unit.</em> BJA Educ 2021;21(7):242–8.</li>
                  <li>Wilson J, Rhodes A. <em>The immunocompromised patient on the ICU.</em> BJA Educ 2019;19(10):319–25.</li>
                  <li>Patel BV, et al. <em>Severe pneumonia in the critically ill.</em> BJA Educ 2020;20(11):385–91.</li>
                  <li>Camporota L, et al. <em>Mechanical ventilation and ECMO in ARDS.</em> BJA Educ 2022;22(2):66–72.</li>
                  <li>NICE NG139 (2019, updated 2023). <em>Pneumonia (community-acquired): antimicrobial prescribing</em> — empirical-antibiotic comparator pathways.</li>
                </ul>
              </div>
              <p className="italic">All citations corroborate the diagnostic cut-offs (PaO₂ &lt;8 kPa, A–a &gt;4.7 kPa), the 21-day co-trimoxazole course, the 40 mg BD → 40 mg OD → 20 mg OD prednisolone taper, and the EOLIA-derived ECMO criteria used in the flowchart above.</p>
            </div>
          </ExamSection>

          <ExamSection id="endocarditis" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Infective Endocarditis</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Modified Duke criteria. <em>S. aureus</em> (acute, IVDU), Streptococci (subacute), Enterococcus, HACEK group. ICU for septic shock, heart failure, embolic complications.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Medical</p>
                <p className="text-xs text-muted-foreground mt-1">Empiric: flucloxacillin + gentamicin (native) or vancomycin + gentamicin + rifampicin (prosthetic). 4–6 weeks IV.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Surgical Indications</p>
                <p className="text-xs text-muted-foreground mt-1">Heart failure, uncontrolled infection, abscess, recurrent emboli, large vegetations (&gt;10 mm).</p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="cdiff" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3"><em>Clostridioides difficile</em> Infection</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Toxin-mediated colitis after antibiotics (fluoroquinolones, cephalosporins, clindamycin).
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Mild–Moderate</p>
                <p className="text-xs text-muted-foreground mt-1">Oral vancomycin 125 mg QDS × 10–14 d. Fidaxomicin for recurrence.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Severe / Fulminant</p>
                <p className="text-xs text-muted-foreground mt-1">Oral vancomycin 500 mg QDS + IV metronidazole. Toxic megacolon → subtotal colectomy. FMT for recurrence.</p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="viral" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Viral Infections in ICU</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Virus</th>
                    <th className="text-left py-2 text-foreground font-semibold">Presentation</th>
                    <th className="text-left py-2 text-foreground font-semibold">Treatment</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Influenza</td><td>ARDS, myocarditis, secondary bacterial pneumonia</td><td>Oseltamivir (even if &gt;48 h in ICU).</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">SARS-CoV-2</td><td>ARDS, VTE, cytokine storm</td><td>Dexamethasone (RECOVERY), tocilizumab, baricitinib. Prone, anticoagulation.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">HSV / VZV</td><td>Encephalitis, hepatitis, disseminated</td><td>IV aciclovir 10 mg/kg TDS. Hydration to prevent crystalluria.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">CMV</td><td>Reactivation in immunosuppressed</td><td>Ganciclovir or valganciclovir. Monitor for myelosuppression.</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="mdr" exams={[Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.7"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Drug-Resistant Organisms</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              AMR is a critical ICU challenge. Prolonged antibiotics, immunosuppression, devices, and cross-contamination drive MDRO selection and transmission.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Gram-Positive Resistant Organisms</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Organism</th>
                    <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                    <th className="text-left py-2 text-foreground font-semibold">Treatment</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">MRSA</td><td><em>mecA</em> → altered PBP2a. CA-MRSA often PVL+.</td><td>Vancomycin (trough 15–20), teicoplanin. Linezolid for pneumonia. Daptomycin for bacteraemia.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">VRE</td><td><em>vanA/vanB</em> genes. <em>E. faecium</em> common.</td><td>Linezolid or daptomycin. Tigecycline for soft tissue. Contact isolation.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">PRSP</td><td>Altered PBPs.</td><td>High-dose ceftriaxone (2 g BD) for meningitis + vancomycin empiric.</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Gram-Negative Resistant Organisms</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Organism</th>
                    <th className="text-left py-2 text-foreground font-semibold">Key Features</th>
                    <th className="text-left py-2 text-foreground font-semibold">Treatment</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ESBL</td><td>Hydrolyse 3rd-gen cephalosporins. Common <em>E. coli</em>, <em>Klebsiella</em>.</td><td>Meropenem first-line (MERINO showed pip-tazo inferior for bacteraemia). Fosfomycin for UTI.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">AmpC (ESCAPPM)</td><td>Inducible resistance on 3rd-gen cephalosporins.</td><td>Carbapenem or cefepime. Avoid ceftriaxone/ceftazidime.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CRE</td><td>KPC, NDM, OXA-48, VIM, IMP. Mortality 40–50%.</td><td>Ceftazidime-avibactam (KPC, OXA-48), meropenem-vaborbactam, cefiderocol, colistin (last resort).</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">MDR <em>Pseudomonas</em></td><td>Efflux pumps, porin loss, AmpC, MBLs.</td><td>Anti-pseudomonal β-lactam by sensitivities. Ceftolozane-tazobactam. Nebulised colistin.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">MDR <em>Acinetobacter</em></td><td>OXA-type carbapenemases. Environmental persistence.</td><td>Sulbactam, colistin ± meropenem (if MIC ≤8). Tigecycline.</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Drug-Resistant Fungi</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm"><em>Candida auris</em></p>
                <p className="text-xs text-muted-foreground mt-1">Often fluconazole-resistant; variable echinocandin/AmB susceptibility. Persists on skin/surfaces. ICU outbreaks. Contact isolation + enhanced cleaning.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Azole-resistant <em>A. fumigatus</em></p>
                <p className="text-xs text-muted-foreground mt-1">TR34/L98H, TR46/Y121F/T289A — environmental azole fungicide use. Switch to L-AmB. Susceptibility testing essential.</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">ICU Strategies for Managing MDROs</h3>
            <div className="space-y-2">
              {[
                { label: "Screening & Surveillance", detail: "Admission screening for MRSA, CPE, VRE in high-risk patients. Active surveillance cultures." },
                { label: "Contact Precautions", detail: "Single-room/cohorting. Dedicated equipment. Enhanced terminal cleaning (H₂O₂ vapour or UV-C) for CPE and C. auris." },
                { label: "Antibiotic Stewardship", detail: "Empiric → de-escalate at 48–72 h. Carbapenem-sparing where possible. Procalcitonin-guided duration." },
                { label: "Novel Agents", detail: "Ceftazidime-avibactam, meropenem-vaborbactam, cefiderocol, ceftolozane-tazobactam, eravacycline. Phage therapy (experimental). FMT for recurrent C. difficile." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="leptospirosis" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Leptospirosis</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <em>Leptospira interrogans</em> spirochaete via animal urine-contaminated water/soil. Occupational risk (farmers, sewer workers). Endemic in tropics — consider in returning travellers with fever + multi-organ dysfunction.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Anicteric (90%)</p>
                <p className="text-xs text-muted-foreground mt-1">Biphasic: bacteraemic phase (fever, myalgia, conjunctival suffusion) then immune phase. Usually self-limiting.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Weil's Disease (10%, severe)</p>
                <p className="text-xs text-muted-foreground mt-1">Triad of jaundice, AKI, haemorrhage. Mortality 5–15%. Pulmonary haemorrhage is the most feared complication.</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Renal", detail: "Non-oliguric AKI with hypokalaemia (unique). Direct tubular toxicity + interstitial nephritis. Recovers with supportive ± RRT." },
                { label: "Pulmonary Haemorrhage", detail: "Diffuse alveolar haemorrhage — rapidly fatal. Lung-protective ventilation. Pulsed methylprednisolone in severe cases." },
                { label: "Diagnosis", detail: "MAT (gold standard, slow). IgM ELISA. PCR (blood week 1, urine week 2). Notifiable disease." },
                { label: "Treatment", detail: "Mild: oral doxycycline or amoxicillin. Severe (Weil's): IV benzylpenicillin or ceftriaxone. Jarisch-Herxheimer may occur." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="control" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Infection Control & Prevention</h2>
            <div className="space-y-2">
              {[
                { label: "Hand Hygiene", detail: "WHO 5 moments. Soap and water for C. difficile and norovirus (spore-forming)." },
                { label: "Ventilator Bundle", detail: "Head-of-bed 30–45°, daily sedation holds, oral chlorhexidine, peptic ulcer + VTE prophylaxis, daily extubation assessment." },
                { label: "Isolation Precautions", detail: "Contact (MRSA, VRE, C. difficile), droplet (influenza, meningococcus), airborne (TB, measles, VZV — negative pressure)." },
                { label: "Antimicrobial Stewardship", detail: "Start smart, then focus. De-escalate at 48–72 h. Procalcitonin-guided duration. Audit and feedback." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default InfectiousDiseaseIcuTopic;
