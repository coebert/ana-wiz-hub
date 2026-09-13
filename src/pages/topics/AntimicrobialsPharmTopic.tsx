import { useState } from "react";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { antimicrobialsQuiz } from "@/data/quizzes";
import AntibioticTargetsDiagram from "@/components/diagrams/pharmacology/AntibioticTargetsDiagram";
import AntifungalTargetsDiagram from "@/components/diagrams/pharmacology/AntifungalTargetsDiagram";
import AntiviralCycleDiagram from "@/components/diagrams/pharmacology/AntiviralCycleDiagram";
import GramNegativeEnvelopeDiagram from "@/components/diagrams/pharmacology/GramNegativeEnvelopeDiagram";
import MDRGramNegativeSelector from "@/components/diagrams/pharmacology/MDRGramNegativeSelector";
import BetaLactamaseClassificationTable from "@/components/diagrams/pharmacology/BetaLactamaseClassificationTable";
import AntibioticPKPDPrimer from "@/components/diagrams/pharmacology/AntibioticPKPDPrimer";
import EmpiricalSepsisChooser from "@/components/diagrams/pharmacology/EmpiricalSepsisChooser";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const antimicrobialsPharmFaqs: Array<[string, string]> = [
  [
    "When should surgical antibiotic prophylaxis be given?",
    "Within 60 min before knife-to-skin (within 120 min for vancomycin or fluoroquinolones — slow infusions). Re-dose intra-operatively if procedure exceeds 2 × antibiotic half-life or blood loss >1500 mL. Single dose usually sufficient; continuing beyond 24 h does not reduce SSI but selects for resistance. Allergy: cefuroxime is safe in penicillin allergy unless anaphylaxis (cross-reactivity <1 %); use clindamycin or teicoplanin if severe."
  ],
  [
    "What are the indications for vancomycin therapeutic drug monitoring?",
    "Narrow therapeutic index; nephrotoxic and ototoxic. Target AUC₂₄ 400–600 mg·h/L (preferred) or trough 15–20 mg/L for serious infections. Monitor pre-4th dose, daily in unstable renal function, every 3–4 days when stable. Loading dose 25–30 mg/kg (actual body weight, max 3 g) gives faster therapeutic levels. Slow infusion ≥1 g/h reduces red-man syndrome (histamine release)."
  ],
  [
    "What is the difference between concentration-dependent and time-dependent killing?",
    "Concentration-dependent (aminoglycosides, fluoroquinolones, metronidazole) — efficacy correlates with Cmax/MIC ratio; give large doses at extended intervals (once-daily gentamicin). Time-dependent (β-lactams, vancomycin) — efficacy correlates with time above MIC; give frequent doses or extended/continuous infusion (e.g. piperacillin-tazobactam continuous infusion in severe sepsis). Aminoglycoside post-antibiotic effect supports once-daily dosing."
  ]
];

type Tab = "antibiotics" | "antifungals" | "antivirals";

const antibioticClasses = [
  {
    group: "Cell Wall Synthesis Inhibitors",
    agents: [
      { name: "Penicillins", mech: "Bind penicillin-binding proteins (PBPs), inhibiting transpeptidation of peptidoglycan cross-links. Bactericidal, time-dependent killing.", examples: "Benzylpenicillin, amoxicillin, flucloxacillin, piperacillin/tazobactam, co-amoxiclav", spectrum: "Narrow (benzylpenicillin) to broad (piperacillin/tazobactam). Flucloxacillin: anti-staphylococcal.", adverse: "Hypersensitivity (0.7–10%), anaphylaxis (0.01–0.05%), seizures at high doses, C. difficile, interstitial nephritis" },
      { name: "Cephalosporins", mech: "Same mechanism as penicillins (β-lactam ring binds PBPs). Classified by generation (1st–5th) with progressively broader Gram-negative cover.", examples: "Cefalexin (1st), cefuroxime (2nd), ceftriaxone (3rd), ceftazidime (3rd, anti-pseudomonal), ceftaroline (5th, anti-MRSA)", spectrum: "1st: Gram-positive. 3rd: Gram-negative including CNS penetration. 5th: MRSA.", adverse: "Cross-reactivity with penicillin allergy (~1–2%), biliary sludging (ceftriaxone), C. difficile" },
      { name: "Carbapenems", mech: "Broadest-spectrum β-lactams. Resistant to most β-lactamases. Bind PBPs with high affinity. Reserved for resistant organisms.", examples: "Meropenem, imipenem/cilastatin, ertapenem, doripenem", spectrum: "Very broad: Gram-positive, Gram-negative, anaerobes. NOT MRSA. Ertapenem: no Pseudomonas.", adverse: "Seizures (especially imipenem), C. difficile, resistance selection. Cilastatin inhibits renal dehydropeptidase." },
      { name: "Glycopeptides", mech: "Bind D-Ala-D-Ala terminus of peptidoglycan precursors, preventing transglycosylation and transpeptidation. Too large to penetrate Gram-negative outer membrane.", examples: "Vancomycin, teicoplanin", spectrum: "Gram-positive only including MRSA. Vancomycin-resistant enterococci (VRE) are increasing.", adverse: "Red man syndrome (histamine release — slow infusion), nephrotoxicity, ototoxicity. Monitor trough levels (15–20 mg/L for serious infections)." },
    ],
  },
  {
    group: "Protein Synthesis Inhibitors",
    agents: [
      { name: "Aminoglycosides", mech: "Bind 30S ribosomal subunit irreversibly, causing misreading of mRNA. Bactericidal, concentration-dependent killing with post-antibiotic effect. Require aerobic transport — ineffective against anaerobes.", examples: "Gentamicin, amikacin, tobramycin, streptomycin", spectrum: "Gram-negative aerobes. Synergy with β-lactams for Gram-positive (e.g., endocarditis).", adverse: "Nephrotoxicity (reversible), ototoxicity (irreversible — vestibular and cochlear), neuromuscular blockade potentiation. Once-daily dosing reduces toxicity." },
      { name: "Macrolides", mech: "Bind 50S ribosomal subunit, inhibiting translocation. Bacteriostatic (bactericidal at high concentrations). Excellent tissue penetration, intracellular activity.", examples: "Erythromycin, clarithromycin, azithromycin", spectrum: "Gram-positive, atypicals (Mycoplasma, Legionella, Chlamydia). Azithromycin: some Gram-negatives.", adverse: "GI upset, QT prolongation, hepatotoxicity. Erythromycin: potent CYP3A4 inhibitor and prokinetic agent." },
      { name: "Tetracyclines", mech: "Bind 30S ribosomal subunit reversibly, blocking aminoacyl-tRNA binding. Bacteriostatic. Broad-spectrum.", examples: "Doxycycline, tetracycline, tigecycline (glycylcycline)", spectrum: "Broad: Gram-positive, Gram-negative, atypicals, Rickettsia. Tigecycline: MRSA, VRE, ESBL.", adverse: "Photosensitivity, dental staining in children, oesophageal ulceration, teratogenic" },
      { name: "Lincosamides", mech: "Bind 50S ribosomal subunit (same site as macrolides). Bacteriostatic. Excellent bone penetration.", examples: "Clindamycin, lincomycin", spectrum: "Gram-positive cocci, anaerobes. Good for bone/joint and dental infections.", adverse: "Strong association with C. difficile colitis. Used in penicillin allergy." },
      { name: "Oxazolidinones", mech: "Bind 50S subunit at an early stage, preventing formation of the 70S initiation complex. Bacteriostatic. 100% oral bioavailability.", examples: "Linezolid, tedizolid", spectrum: "Gram-positive only: MRSA, VRE, multi-resistant pneumococci.", adverse: "Thrombocytopenia (monitor FBC weekly), serotonin syndrome (MAO inhibitor), peripheral neuropathy, lactic acidosis (mitochondrial toxicity)" },
    ],
  },
  {
    group: "DNA/RNA Synthesis Inhibitors",
    agents: [
      { name: "Fluoroquinolones", mech: "Inhibit DNA gyrase (topoisomerase II) and topoisomerase IV, preventing DNA supercoiling and replication. Bactericidal, concentration-dependent.", examples: "Ciprofloxacin, levofloxacin, moxifloxacin", spectrum: "Cipro: Gram-negatives, Pseudomonas. Levo/Moxi: respiratory pathogens including atypicals.", adverse: "Tendon rupture (especially with steroids), QT prolongation, CNS effects, aortic aneurysm risk, C. difficile" },
      { name: "Nitroimidazoles", mech: "Reduced intracellularly to reactive intermediates that damage DNA. Only active in anaerobic/microaerophilic organisms (require low redox potential for activation). Bactericidal.", examples: "Metronidazole, tinidazole", spectrum: "Anaerobes (Bacteroides, Clostridium), protozoa (Giardia, Entamoeba, Trichomonas).", adverse: "Disulfiram-like reaction with alcohol, metallic taste, peripheral neuropathy (prolonged use)" },
      { name: "Rifamycins", mech: "Inhibit bacterial DNA-dependent RNA polymerase, blocking transcription. Bactericidal. Potent CYP450 inducer.", examples: "Rifampicin, rifabutin, rifaximin", spectrum: "Mycobacteria (TB), staphylococci (used in combination for prosthetic infections), Legionella.", adverse: "Orange discolouration of body fluids, hepatotoxicity, potent CYP inducer (reduces efficacy of warfarin, OCP, steroids, antiretrovirals)" },
      { name: "Trimethoprim / Sulfonamides", mech: "Sequential blockade of folate synthesis: sulfonamides inhibit dihydropteroate synthase; trimethoprim inhibits dihydrofolate reductase. Bacteriostatic individually, bactericidal in combination.", examples: "Co-trimoxazole (trimethoprim + sulfamethoxazole), trimethoprim alone", spectrum: "UTIs, PCP (Pneumocystis jirovecii), Nocardia, Stenotrophomonas.", adverse: "Hyperkalaemia (trimethoprim blocks ENaC), bone marrow suppression, Stevens-Johnson syndrome (sulfonamides), renal impairment" },
    ],
  },
  {
    group: "Cell Membrane Agents",
    agents: [
      { name: "Polymyxins", mech: "Bind lipopolysaccharide (LPS) in the Gram-negative outer membrane, disrupting membrane integrity. Bactericidal. Last-resort agents for MDR Gram-negatives.", examples: "Colistin (polymyxin E), polymyxin B", spectrum: "MDR Gram-negatives: Pseudomonas, Acinetobacter, Klebsiella (including carbapenem-resistant).", adverse: "Nephrotoxicity (dose-limiting), neurotoxicity, bronchospasm (nebulised)" },
      { name: "Daptomycin", mech: "Lipopeptide that inserts into the Gram-positive cell membrane, forming ion channels causing depolarisation. Rapidly bactericidal, concentration-dependent.", examples: "Daptomycin", spectrum: "Gram-positive: MRSA, VRE. NOT for pneumonia (inactivated by surfactant).", adverse: "Myopathy (monitor CK weekly), eosinophilic pneumonia" },
    ],
  },
];

const antifungalClasses = [
  { name: "Polyenes", mech: "Bind ergosterol in the fungal cell membrane, creating pores that cause leakage of intracellular contents. Fungicidal.", examples: "Amphotericin B (deoxycholate and liposomal), nystatin", spectrum: "Broadest spectrum: Candida, Aspergillus, Cryptococcus, Mucor. Nystatin: topical only.", adverse: "Nephrotoxicity (dose-limiting — distal RTA, Mg²⁺/K⁺ wasting), rigors, hypotension. Liposomal formulation reduces toxicity. Pre-treat with paracetamol/hydrocortisone.", pk: "IV only (not absorbed orally). Lipid formulations improve therapeutic index." },
  { name: "Azoles", mech: "Inhibit lanosterol 14α-demethylase (CYP51), blocking ergosterol synthesis. Fungistatic (fluconazole) or fungicidal (voriconazole vs Aspergillus).", examples: "Fluconazole, voriconazole, itraconazole, posaconazole, isavuconazole", spectrum: "Fluconazole: Candida (not C. krusei or C. glabrata), Cryptococcus. Voriconazole: Aspergillus (first-line). Posaconazole: Mucor.", adverse: "Hepatotoxicity, QT prolongation, visual disturbances (voriconazole), potent CYP inhibitors (drug interactions with midazolam, ciclosporin, warfarin).", pk: "Good oral bioavailability. Voriconazole: non-linear PK, TDM recommended (trough 1–5.5 mg/L)." },
  { name: "Echinocandins", mech: "Inhibit β-(1,3)-D-glucan synthase, disrupting cell wall synthesis. Fungicidal against Candida, fungistatic against Aspergillus.", examples: "Caspofungin, micafungin, anidulafungin", spectrum: "Candida (including azole-resistant species), Aspergillus. NOT Cryptococcus or Mucor.", adverse: "Well tolerated. Histamine-like reactions, hepatotoxicity (rare). No renal dose adjustment.", pk: "IV only. Not absorbed orally. Highly protein-bound. Hepatic metabolism." },
  { name: "Flucytosine (5-FC)", mech: "Prodrug converted to 5-fluorouracil inside fungal cells, inhibiting DNA and RNA synthesis. Always used in combination (prevents resistance).", examples: "Flucytosine", spectrum: "Cryptococcal meningitis (with amphotericin B), some Candida.", adverse: "Bone marrow suppression (monitor FBC), hepatotoxicity. TDM: peak 25–50 mg/L.", pk: "Excellent oral bioavailability. Good CSF penetration." },
  { name: "Terbinafine", mech: "Inhibits squalene epoxidase, blocking ergosterol synthesis at an earlier step than azoles. Fungicidal.", examples: "Terbinafine", spectrum: "Dermatophytes (Trichophyton, Microsporum). First-line for onychomycosis.", adverse: "GI upset, taste disturbance, hepatotoxicity (rare), Stevens-Johnson syndrome (rare).", pk: "Oral, accumulates in skin/nails. Long half-life in tissues." },
];

const antiviralClasses = [
  { name: "Nucleoside/Nucleotide Analogues", mech: "After intracellular activation, mimic nucleotides and inhibit viral polymerase, causing delayed or immediate chain termination.", examples: "Aciclovir (HSV/VZV), ganciclovir or valganciclovir (CMV disease in immunocompromised patients), remdesivir (selected hospitalised SARS-CoV-2 patients), tenofovir (HIV/HBV)", spectrum: "ICU use includes encephalitis, disseminated herpesvirus infection, CMV disease after transplantation and selected severe COVID-19.", adverse: "Aciclovir: crystalluria and AKI—hydrate and adjust for renal function. Ganciclovir: neutropenia and other marrow suppression. Remdesivir: transaminitis; check hepatic function." },
  { name: "Neuraminidase Inhibitors", mech: "Block influenza neuraminidase, preventing release of new virions. Start promptly, ideally within 48 h, but treat later in severe, hospitalised or immunocompromised patients when influenza is suspected.", examples: "Oseltamivir (oral/enteral), zanamivir (inhaled)", spectrum: "Influenza A and B; important during outbreaks and in critically ill or immunocompromised patients.", adverse: "GI upset (oseltamivir); bronchospasm with inhaled zanamivir—avoid in reactive airways disease." },
  { name: "Protease Inhibitors", mech: "Inhibit viral proteases required for cleavage of polyprotein precursors into functional viral proteins. Used in HIV, HCV, and COVID-19.", examples: "HIV: ritonavir, darunavir, atazanavir. HCV: simeprevir. COVID-19: nirmatrelvir/ritonavir (Paxlovid)", spectrum: "HIV (combined in ART regimens), HCV (direct-acting antivirals), SARS-CoV-2.", adverse: "Ritonavir: potent CYP3A4 inhibitor (used as PK booster), lipodystrophy, dyslipidaemia, hepatotoxicity." },
  { name: "Non-Nucleoside Reverse Transcriptase Inhibitors (NNRTIs)", mech: "Bind directly to HIV reverse transcriptase at an allosteric site, causing conformational change. Do not require phosphorylation.", examples: "Efavirenz, nevirapine, rilpivirine", spectrum: "HIV-1 only (not HIV-2).", adverse: "Efavirenz: CNS effects (vivid dreams, dizziness), rash. Nevirapine: hepatotoxicity, Stevens-Johnson. CYP inducers." },
  { name: "Integrase Strand Transfer Inhibitors (INSTIs)", mech: "Block HIV integrase, preventing insertion of viral DNA into the host genome. They are first-line anchors for most ART because of rapid viral suppression, good tolerability and a high barrier to resistance.", examples: "Dolutegravir, raltegravir, bictegravir", spectrum: "HIV-1 and HIV-2.", adverse: "Generally well tolerated; insomnia and weight gain can occur. Check interactions with polyvalent cations and avoid unplanned interruption of established ART." },
  { name: "Direct-Acting Antivirals (DAAs) for HCV", mech: "Target specific HCV proteins: NS3/4A protease, NS5A, NS5B polymerase. Used in combination for cure rates >95%.", examples: "Sofosbuvir/velpatasvir, glecaprevir/pibrentasvir, ledipasvir/sofosbuvir", spectrum: "HCV genotypes 1–6 (pan-genotypic regimens).", adverse: "Generally well tolerated. Check for HBV co-infection (risk of reactivation). Drug interactions with CYP/P-gp." },
];

const objectives = [
  "Classify antibacterials by mechanism (cell-wall, protein synthesis, DNA/RNA, cell membrane) and recall key agents in each",
  "Apply PK/PD principles (time- vs concentration-dependent killing, PAE, MIC) to dosing decisions in the critically ill",
  "Outline mechanisms and clinical use of major antifungals and antivirals relevant to anaesthesia and ICU",
  "Recognise major resistance mechanisms (β-lactamases, PBP2a, VanA/B, efflux, porin loss)",
  "Adjust antimicrobial dosing for augmented renal clearance, continuous β-lactam infusion and aminoglycoside ODD",
];

const keyPoints = [
  { text: "β-Lactams (penicillins, cephalosporins, carbapenems) are bactericidal, time-dependent — optimise with extended or continuous infusion", cites: ["BNF"] },
  { text: "Aminoglycosides are bactericidal, concentration-dependent with PAE — optimise with once-daily dosing and trough monitoring", cites: ["Peck & Hill Ch.14"] },
  { text: "Vancomycin targets D-Ala-D-Ala in peptidoglycan; monitor troughs (15–20 mg/L); red man syndrome is histamine-mediated, not allergy", cites: ["BJA Educ 2017"] },
  { text: "Amphotericin B binds ergosterol (fungicidal, broadest spectrum); liposomal form reduces nephrotoxicity", cites: ["BNF"] },
  { text: "Echinocandins inhibit β-(1,3)-D-glucan synthase — first-line for invasive candidiasis; IV only", cites: ["Peck & Hill Ch.14"] },
  { text: "Aciclovir is selectively activated by viral thymidine kinase — excellent safety profile due to selective toxicity", cites: ["BJA Educ 2017"] },
  { text: "Rifampicin is a potent CYP inducer — reduces levels of warfarin, OCP, midazolam, ciclosporin", cites: ["BNF"] },
  { text: "MRSA resistance: PBP2a (mecA gene); VRE resistance: D-Ala-D-Lac modification of vancomycin target", cites: ["Peck & Hill Ch.14"] },
];

const antimicrobialsWorkedExamples: WorkedExample[] = [
  {
    title: "Dosing meropenem in septic AKI on CVVHDF",
    scenario:
      "A septic patient with AKI is on CVVHDF (effluent 25 mL/kg/h). The team asks how to dose meropenem to balance efficacy (T>MIC) and toxicity.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Meropenem is a time-dependent β-lactam — efficacy correlates with fT&gt;MIC (&gt;40–70% of dosing interval)</li>
          <li>CVVHDF removes drug substantially (sieving coefficient ~1, low protein binding) — under-dosing risk</li>
          <li>Give 1 g IV loading dose regardless of renal function to reach Cmax early</li>
          <li>Maintenance 1 g 8-hourly as extended (3 h) or continuous infusion to maximise T&gt;MIC at higher-MIC organisms (Pseudomonas)</li>
          <li>Use therapeutic drug monitoring if available; aim trough 2–4× MIC; reassess as renal function recovers</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Renal-dose adjustment based on creatinine clearance in AKI — overestimates clearance</li>
            <li>Bolus dosing in resistant gram-negative sepsis — inadequate fT&gt;MIC</li>
            <li>Forgetting nephrotoxic interactions (vancomycin + aminoglycosides) potentiated in AKI</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "1 g loading then 1 g 8-hourly by extended infusion on CVVHDF, with TDM if available. Do not reduce dose for AKI on full-dose CVVHDF.",
    cites: ["Peck & Hill Ch.14", "BNF", "BJA Educ 2017"],
  },
];

const AntimicrobialsTopic = () => {
  const [tab, setTab] = useState<Tab>("antibiotics");

  return (
    <TopicTemplate
      title="Antimicrobials"
      subtitle="FRCA Primary / Final / FFICM — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="antimicrobials-pharm"
      topicTitle="Antimicrobials"
      workedExamples={antimicrobialsWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={antimicrobialsQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "Peck & Hill Ch.14",
          "BNF",
          "BJA Educ 2017",
        ],
        keyPoints: [
          "Peck & Hill Ch.14",
          "BNF",
          "BJA Educ 2017",
        ],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              A thorough understanding of antimicrobial pharmacology is essential for anaesthetists and intensivists. Surgical prophylaxis, treatment of sepsis, and management of hospital-acquired infections all require knowledge of mechanisms of action, spectrum, pharmacokinetics, and adverse effects. This topic covers the major classes of antibacterials, antifungals, and antivirals relevant to the FRCA and FFICM examinations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Pharmacological Principles</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Bactericidal vs Bacteriostatic", value: "Bactericidal: kills bacteria (β-lactams, aminoglycosides). Bacteriostatic: inhibits growth (macrolides, tetracyclines). Distinction matters in immunosuppression." },
                { label: "Time-Dependent Killing", value: "Efficacy depends on time above MIC (T>MIC). β-lactams, vancomycin. Optimised by frequent dosing or continuous infusion." },
                { label: "Concentration-Dependent Killing", value: "Efficacy depends on peak concentration/MIC ratio (Cmax/MIC). Aminoglycosides, fluoroquinolones. Optimised by high-dose, extended-interval dosing." },
                { label: "Post-Antibiotic Effect (PAE)", value: "Persistent suppression of bacterial growth after drug levels fall below MIC. Prolonged for aminoglycosides and fluoroquinolones." },
                { label: "MIC & MBC", value: "MIC: minimum inhibitory concentration. MBC: minimum bactericidal concentration. MBC/MIC ratio >4 suggests tolerance." },
                { label: "Surgical Prophylaxis", value: "Ideally within 60 min of incision (120 min for vancomycin). Repeat if surgery >2 half-lives. Usually single dose." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex gap-2 mb-5">
              {([
                { key: "antibiotics", label: "Antibacterials" },
                { key: "antifungals", label: "Antifungals" },
                { key: "antivirals", label: "Antivirals" },
              ] as { key: Tab; label: string }[]).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    tab === t.key
                      ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "antibiotics" && (
              <div className="space-y-6">
                <AntibioticTargetsDiagram />
                <AntibioticPKPDPrimer />
                <GramNegativeEnvelopeDiagram />
                <BetaLactamaseClassificationTable />
                <MDRGramNegativeSelector />
                <EmpiricalSepsisChooser />
                {antibioticClasses.map((group) => (
                  <div key={group.group}>
                    <h3 className="text-lg font-serif font-bold text-foreground mb-3">{group.group}</h3>
                    <div className="space-y-3">
                      {group.agents.map((a) => (
                        <div key={a.name} className="p-4 rounded-xl border border-border bg-card space-y-2">
                          <h4 className="font-bold text-foreground">{a.name}</h4>
                          <div className="space-y-1.5 text-sm">
                            <p className="text-muted-foreground"><span className="font-medium text-foreground">Mechanism:</span> {a.mech}</p>
                            <p className="text-muted-foreground"><span className="font-medium text-foreground">Examples:</span> {a.examples}</p>
                            <p className="text-muted-foreground"><span className="font-medium text-foreground">Spectrum:</span> {a.spectrum}</p>
                            <p className="text-muted-foreground"><span className="font-medium text-foreground">Adverse effects:</span> {a.adverse}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "antifungals" && (
              <div className="space-y-3">
                <AntifungalTargetsDiagram />
                {antifungalClasses.map((a) => (
                  <div key={a.name} className="p-4 rounded-xl border border-border bg-card space-y-2">
                    <h4 className="font-bold text-foreground">{a.name}</h4>
                    <div className="space-y-1.5 text-sm">
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Mechanism:</span> {a.mech}</p>
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Examples:</span> {a.examples}</p>
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Spectrum:</span> {a.spectrum}</p>
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Adverse effects:</span> {a.adverse}</p>
                      {a.pk && <p className="text-muted-foreground"><span className="font-medium text-foreground">PK note:</span> {a.pk}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "antivirals" && (
              <div className="space-y-3">
                <AntiviralCycleDiagram />
                {antiviralClasses.map((a) => (
                  <div key={a.name} className="p-4 rounded-xl border border-border bg-card space-y-2">
                    <h4 className="font-bold text-foreground">{a.name}</h4>
                    <div className="space-y-1.5 text-sm">
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Mechanism:</span> {a.mech}</p>
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Examples:</span> {a.examples}</p>
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Spectrum:</span> {a.spectrum}</p>
                      <p className="text-muted-foreground"><span className="font-medium text-foreground">Adverse effects:</span> {a.adverse}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Antibacterial Use in Pregnancy and Lactation</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The guiding principle is to balance maternal benefit against fetal or neonatal risk: untreated maternal sepsis is far more dangerous than almost any antibacterial, so effective therapy is never withheld, but agent choice should favour drugs with the longest safety record<InlineRef topicId="antimicrobials-pharm" refLabel="BJA Educ 2018 Pregnancy" />.
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40"><tr><th className="p-3 text-left">Category</th><th className="p-3 text-left">Agents</th><th className="p-3 text-left">Comment</th></tr></thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  <tr><td className="p-3 font-medium text-foreground">Generally safe</td><td className="p-3">Penicillins, cephalosporins, azithromycin (and erythromycin base), metronidazole after the first trimester, clindamycin</td><td className="p-3">Extensive human data; used routinely for obstetric sepsis and caesarean prophylaxis. Renal clearance rises in pregnancy, so avoid under-dosing.</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Use with caution</td><td className="p-3">Gentamicin and other aminoglycosides, vancomycin, nitrofurantoin (avoid at term), trimethoprim after the first trimester</td><td className="p-3">Aminoglycosides carry a theoretical fetal ototoxicity/nephrotoxicity risk — reserve for serious infection, use short courses with therapeutic drug monitoring. Nitrofurantoin near delivery risks neonatal haemolysis.</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Avoid</td><td className="p-3">Tetracyclines, fluoroquinolones, trimethoprim in the first trimester, chloramphenicol, sulfonamides near term</td><td className="p-3">Tetracyclines cause dental staining and affect fetal bone; quinolones cause arthropathy in animal studies; trimethoprim is a folate antagonist (neural tube risk); sulfonamides displace bilirubin (kernicterus).</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Lactation:</strong> most antibacterials appear in breast milk in small amounts and are compatible with feeding. Penicillins, cephalosporins and macrolides are well tolerated; tetracyclines, fluoroquinolones and chloramphenicol are usually avoided, and high-dose metronidazole may impart a bitter taste and cause infant loose stools. Check the BNF or a specialist source for individual agents<InlineRef topicId="antimicrobials-pharm" refLabel="BNF" />.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Antimicrobial Resistance Mechanisms</h2>
            <div className="space-y-3">
              {[
                { mech: "β-Lactamase Production", detail: "Enzymatic hydrolysis of the β-lactam ring. Extended-spectrum β-lactamases (ESBLs) hydrolyse 3rd-gen cephalosporins. Carbapenemases (e.g., NDM-1, KPC) hydrolyse carbapenems. Countered by inhibitors: clavulanate, tazobactam, avibactam." },
                { mech: "Altered Target Site", detail: "Mutation of the drug target reduces binding. PBP2a in MRSA (mecA gene), altered ribosomal binding sites (macrolide resistance), modified DNA gyrase (quinolone resistance)." },
                { mech: "Efflux Pumps", detail: "Active transport of antibiotic out of the cell. Common in Gram-negatives. Contributes to multidrug resistance in Pseudomonas and Acinetobacter." },
                { mech: "Reduced Permeability", detail: "Loss or modification of outer membrane porins (OmpF, OmpC) in Gram-negatives, reducing drug entry. Important for carbapenems and aminoglycosides." },
                { mech: "Target Modification (Vancomycin)", detail: "VanA/VanB gene clusters modify D-Ala-D-Ala to D-Ala-D-Lac, reducing vancomycin binding 1000-fold. Responsible for VRE." },
              ].map((r) => (
                <div key={r.mech} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{r.mech}</p>
                  <p className="text-sm text-muted-foreground mt-1">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICU-Specific Antimicrobial Considerations</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Augmented Renal Clearance", value: "Young, septic patients may have CrCl >130 ml/min, leading to sub-therapeutic levels of renally-cleared drugs. Consider TDM and extended/continuous infusions." },
                { label: "Continuous β-Lactam Infusion", value: "Maximises T>MIC. Evidence supports continuous or extended infusions of piperacillin/tazobactam and meropenem in critically ill patients." },
                { label: "Aminoglycoside Dosing", value: "Once-daily (Hartford nomogram) vs multiple daily dosing. ODD maximises Cmax/MIC and reduces nephrotoxicity. Monitor troughs (<1 mg/L for gentamicin)." },
                { label: "Antifungal Empirical Therapy", value: "Echinocandins first-line for invasive candidiasis. Voriconazole first-line for invasive aspergillosis. Consider in patients failing to respond to broad-spectrum antibacterials." },
                { label: "Antifungal Prophylaxis", value: "Consider only in locally defined high-risk groups: prolonged neutropenia, liver or other high-risk solid-organ transplantation, recurrent GI perforation/anastomotic leak, or multiple risks such as TPN, broad-spectrum antibiotics and CVCs. Fluconazole targets susceptible Candida; posaconazole adds mould cover; micafungin is an alternative. Follow local epidemiology and resistance guidance." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Therapeutic Drug Monitoring in the ICU</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Critical illness distorts antimicrobial pharmacokinetics: capillary leak and fluid loading expand the volume of distribution of hydrophilic drugs, hypoalbuminaemia raises the free fraction of highly bound agents, augmented renal clearance produces sub-therapeutic exposure, while acute kidney injury, renal replacement therapy and ECMO circuits move exposure in the opposite direction. Fixed dosing therefore predicts concentration poorly, and the 2020 ESICM/ESCMID position paper recommends routine monitoring of aminoglycosides, β-lactams, linezolid, teicoplanin, vancomycin and voriconazole in critically ill patients<InlineRef topicId="antimicrobials-pharm" refLabel="ESICM TDM 2020" />.
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40"><tr><th className="p-3 text-left">Drug</th><th className="p-3 text-left">Target</th><th className="p-3 text-left">Practical note</th></tr></thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  <tr><td className="p-3 font-medium text-foreground">Meropenem / piperacillin (β-lactams)</td><td className="p-3">Trough 2–4× MIC; aim for 100% fT&gt;MIC in severe infection</td><td className="p-3">Extended or continuous infusion makes the target achievable; sample at steady state (after ~4–5 doses).</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Vancomycin</td><td className="p-3">AUC₂₄/MIC 400–600 mg·h/L (trough 15–20 mg/L if AUC unavailable)</td><td className="p-3">AUC-guided dosing reduces nephrotoxicity compared with trough-only targets.</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Gentamicin (once daily)</td><td className="p-3">Peak 8–10× MIC; trough &lt;1 mg/L</td><td className="p-3">Concentration-dependent killing with a long post-antibiotic effect; the trough governs toxicity.</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Teicoplanin</td><td className="p-3">Trough 15–30 mg/L (higher for endocarditis or bone)</td><td className="p-3">Requires loading doses; check after loading is complete.</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Voriconazole</td><td className="p-3">Trough 1–5.5 mg/L</td><td className="p-3">Non-linear kinetics, CYP2C19 polymorphism; high troughs cause hepatotoxicity, visual and neurological toxicity.</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Linezolid</td><td className="p-3">Trough 2–8 mg/L</td><td className="p-3">High troughs predict thrombocytopenia; low troughs occur with augmented clearance.</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Barriers to implementation are practical rather than conceptual: assays for β-lactams and linezolid are available in few laboratories, turnaround time often exceeds the dosing interval, sampling errors (wrong timing, drawing from the infusion limb) invalidate results, and interpretation needs an MIC and a clinician or pharmacist able to act on it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Antimicrobial Stewardship</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Stewardship aims to optimise clinical outcome while minimising the unintended consequences of antimicrobial use — toxicity, <em>Clostridioides difficile</em> infection, selection of resistance and cost. The Surviving Sepsis Campaign requires daily reassessment of therapy for de-escalation, and supports biomarkers such as procalcitonin to help stop empirical antibiotics<InlineRef topicId="antimicrobials-pharm" refLabel="SSC 2013" />.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "The four Ds", value: "Right drug (guided by likely pathogen and local resistance), right dose (PK/PD-based, with TDM where available), right duration, and de-escalation once cultures return." },
                { label: "De-escalation", value: "Narrow the spectrum to the identified organism, stop redundant cover (double anaerobic or dual Gram-negative therapy), and switch intravenous to oral when absorption and clinical state allow." },
                { label: "Duration", value: "Use the shortest effective course with a documented stop or review date — 7 days for most ventilator-associated pneumonia and intra-abdominal sepsis with adequate source control." },
                { label: "Biomarkers", value: "Procalcitonin-guided cessation shortens courses without harm, but it rises in non-infective inflammation (surgery, trauma, cardiac arrest) and falls late in abscess or endocarditis — use trends alongside clinical judgement, never alone." },
                { label: "Source control", value: "Drainage, debridement or device removal achieves more than any escalation of spectrum; unexplained failure should prompt re-imaging rather than a broader antibiotic." },
                { label: "Multidisciplinary team", value: "Infection specialists, medical microbiologists and antimicrobial pharmacists on ward rounds improve compliance, prescribing quality and outcomes; audit and feedback sustain the gains." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <SynthesisBlock
            title="Antimicrobials — Class, Mechanism, ICU Pearl"
            subtitle="The headline drug classes you need to recognise on a viva."
            variant="table"
          >
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-2 text-foreground font-semibold">Class</th>
                  <th className="text-left p-2 text-foreground font-semibold">Mechanism</th>
                  <th className="text-left p-2 text-foreground font-semibold">ICU Pearl</th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                {[
                  ["β-lactams (penicillin, cephalosporin, carbapenem)", "Cell-wall synthesis (PBP)", "Time-dependent killing — extend infusion (4 h pip-tazo, meropenem) in critically ill"],
                  ["Aminoglycosides (gentamicin)", "30S ribosome — ↓ protein synthesis", "Concentration-dependent — once daily; therapeutic drug monitoring; nephro/ototoxic"],
                  ["Glycopeptides (vancomycin)", "Cell-wall (D-Ala-D-Ala)", "AUC₂₄/MIC 400–600 target (not trough alone); infusion-related reactions"],
                  ["Fluoroquinolones (cipro, levo)", "DNA gyrase / topoisomerase IV", "QT prolongation, tendinopathy, C. difficile risk; covers atypical pathogens"],
                  ["Macrolides (clari, azith)", "50S ribosome", "QT prolongation; CYP3A4 inhibitors → drug interactions"],
                  ["Oxazolidinones (linezolid)", "50S ribosome (initiation)", "VRE/MRSA cover; thrombocytopenia >14 d; serotonin syndrome with SSRI"],
                  ["Antifungals (echinocandins, azoles, AmB)", "β-glucan / ergosterol", "Caspofungin first-line invasive candidiasis; AmB nephrotoxic"],
                ].map(([cls, mech, pearl]) => (
                  <tr key={cls as string} className="border-b border-border/50">
                    <td className="p-2 font-medium">{cls}</td>
                    <td className="p-2 text-muted-foreground">{mech}</td>
                    <td className="p-2 text-muted-foreground">{pearl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SynthesisBlock>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "β-lactams: time-dependent killing — efficacy depends on T>MIC; consider extended/continuous infusion in severe sepsis.",
              "Aminoglycosides and fluoroquinolones: concentration-dependent killing — high peak: MIC ratio; once-daily dosing reduces nephro-/ototoxicity.",
              "Vancomycin: trough levels 15–20 mg/L for serious infection; red-man syndrome is histamine-mediated, not allergic — slow the infusion.",
              "Antibiotic prophylaxis: give within 60 min of incision (120 min for vancomycin/fluoroquinolones); redose for long cases or major blood loss.",
              "Beware drug interactions: rifampicin induces CYP; macrolides and azoles inhibit CYP3A4 — prolong QT and elevate calcineurin-inhibitor levels.",
            ]}
          />
        </section>
      </ExamSection>
          <TopicFaqs faqs={antimicrobialsPharmFaqs} />
        </>
      }
    />
  );
};

export default AntimicrobialsTopic;
