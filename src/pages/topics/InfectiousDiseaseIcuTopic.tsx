import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { infectiousDiseaseIcuQuestions } from "@/data/quizzes";
import InfectionSiteMapDiagram from "@/components/diagrams/InfectionSiteMapDiagram";
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
          <ExamSection id="overview" exams={["final", "fficm", "edic"]}>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Infection is the dominant driver of organ failure on the modern ICU. The site map below previews the anatomical organisation of the topic — from respiratory and bloodstream infections through to fungal, viral, and multi-drug-resistant organisms — with an emphasis on source identification, empirical antimicrobial choice, and infection control.
            </p>
            <InfectionSiteMapDiagram />
          </ExamSection>

          <ExamSection id="respiratory" exams={["final", "fficm", "edic"]} curriculumCodes={["FFICM 4.7"]}>
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

          <ExamSection id="legionella" exams={["final", "fficm", "edic"]}>
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

          <ExamSection id="pvl" exams={["final", "fficm", "edic"]}>
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

          <ExamSection id="sepsis" exams={["final", "fficm", "edic"]}>
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

          <ExamSection id="urosepsis" exams={["final", "fficm", "edic"]}>
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

          <ExamSection id="cns" exams={["final", "fficm", "edic"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">CNS Infections</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Condition</th>
                    <th className="text-left py-2 text-foreground font-semibold">Organisms</th>
                    <th className="text-left py-2 text-foreground font-semibold">Management</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Bacterial meningitis</td><td><em>N. meningitidis</em>, <em>S. pneumoniae</em>, <em>Listeria</em></td><td>Ceftriaxone 2 g BD + dexamethasone 10 mg QDS. Add amoxicillin if Listeria risk.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Viral encephalitis</td><td>HSV-1, VZV, enterovirus</td><td>IV aciclovir 10 mg/kg TDS. MRI: temporal lobe in HSV. CSF PCR.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Brain abscess</td><td>Mixed anaerobes, Streptococci, S. aureus</td><td>Ceftriaxone + metronidazole. Aspirate if &gt;2.5 cm.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Fungal meningitis</td><td><em>Cryptococcus neoformans</em></td><td>Amphotericin B + flucytosine then fluconazole. ICP control.</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="abdo" exams={["final", "fficm", "edic"]}>
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

          <ExamSection id="necfasc" exams={["final", "fficm", "edic"]}>
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

          <ExamSection id="bloodstream" exams={["final", "fficm", "edic"]}>
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

          <ExamSection id="fungal" exams={["final", "fficm", "edic"]}>
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
          </ExamSection>

          <ExamSection id="endocarditis" exams={["final", "fficm", "edic"]}>
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

          <ExamSection id="cdiff" exams={["final", "fficm", "edic"]}>
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

          <ExamSection id="viral" exams={["final", "fficm", "edic"]}>
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

          <ExamSection id="mdr" exams={["fficm", "edic"]} curriculumCodes={["FFICM 4.7"]}>
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

          <ExamSection id="leptospirosis" exams={["final", "fficm", "edic"]}>
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

          <ExamSection id="control" exams={["final", "fficm", "edic"]}>
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
