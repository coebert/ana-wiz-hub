import { useState } from "react";
import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { antimicrobialsQuiz } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import AntibioticTargetsDiagram from "@/components/diagrams/AntibioticTargetsDiagram";
import AntifungalTargetsDiagram from "@/components/diagrams/AntifungalTargetsDiagram";
import AntiviralCycleDiagram from "@/components/diagrams/AntiviralCycleDiagram";
import GramNegativeEnvelopeDiagram from "@/components/diagrams/GramNegativeEnvelopeDiagram";
import MDRGramNegativeSelector from "@/components/diagrams/MDRGramNegativeSelector";
import BetaLactamaseClassificationTable from "@/components/diagrams/BetaLactamaseClassificationTable";
import AntibioticPKPDPrimer from "@/components/diagrams/AntibioticPKPDPrimer";
import EmpiricalSepsisChooser from "@/components/diagrams/EmpiricalSepsisChooser";

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
  { name: "Nucleoside/Nucleotide Analogues", mech: "Phosphorylated intracellularly to active triphosphate form. Incorporated into viral DNA/RNA, causing chain termination. Require viral or cellular kinases for activation.", examples: "Aciclovir (HSV, VZV), ganciclovir (CMV), tenofovir (HIV, HBV), entecavir (HBV), sofosbuvir (HCV), remdesivir (SARS-CoV-2)", spectrum: "Aciclovir: HSV, VZV (activated by viral thymidine kinase — selective toxicity). Ganciclovir: CMV.", adverse: "Aciclovir: crystalluria (hydrate well), renal impairment. Ganciclovir: myelosuppression (neutropenia). Tenofovir: renal tubular toxicity, osteoporosis." },
  { name: "Neuraminidase Inhibitors", mech: "Block neuraminidase on the influenza viral surface, preventing release of new virions from infected cells. Must be given early (within 48h of symptoms).", examples: "Oseltamivir (oral), zanamivir (inhaled)", spectrum: "Influenza A and B.", adverse: "GI upset (oseltamivir), bronchospasm (zanamivir — avoid in asthma)." },
  { name: "Protease Inhibitors", mech: "Inhibit viral proteases required for cleavage of polyprotein precursors into functional viral proteins. Used in HIV, HCV, and COVID-19.", examples: "HIV: ritonavir, darunavir, atazanavir. HCV: simeprevir. COVID-19: nirmatrelvir/ritonavir (Paxlovid)", spectrum: "HIV (combined in ART regimens), HCV (direct-acting antivirals), SARS-CoV-2.", adverse: "Ritonavir: potent CYP3A4 inhibitor (used as PK booster), lipodystrophy, dyslipidaemia, hepatotoxicity." },
  { name: "Non-Nucleoside Reverse Transcriptase Inhibitors (NNRTIs)", mech: "Bind directly to HIV reverse transcriptase at an allosteric site, causing conformational change. Do not require phosphorylation.", examples: "Efavirenz, nevirapine, rilpivirine", spectrum: "HIV-1 only (not HIV-2).", adverse: "Efavirenz: CNS effects (vivid dreams, dizziness), rash. Nevirapine: hepatotoxicity, Stevens-Johnson. CYP inducers." },
  { name: "Integrase Strand Transfer Inhibitors (INSTIs)", mech: "Block HIV integrase, preventing insertion of viral DNA into the host genome. Now first-line in most HIV ART regimens.", examples: "Dolutegravir, raltegravir, bictegravir", spectrum: "HIV-1 and HIV-2.", adverse: "Generally well tolerated. Dolutegravir: insomnia, weight gain, neural tube defects (early pregnancy — now considered low risk)." },
  { name: "Direct-Acting Antivirals (DAAs) for HCV", mech: "Target specific HCV proteins: NS3/4A protease, NS5A, NS5B polymerase. Used in combination for cure rates >95%.", examples: "Sofosbuvir/velpatasvir, glecaprevir/pibrentasvir, ledipasvir/sofosbuvir", spectrum: "HCV genotypes 1–6 (pan-genotypic regimens).", adverse: "Generally well tolerated. Check for HBV co-infection (risk of reactivation). Drug interactions with CYP/P-gp." },
];

const AntimicrobialsTopic = () => {
  const [tab, setTab] = useState<Tab>("antibiotics");

  return (
    <SectionLayout title="Antimicrobials" subtitle="FRCA Primary / Final / FFICM — Pharmacology" backPath="/pharmacology" backLabel="Pharmacology" accentColor="text-pharmacology">
      <section className="space-y-8 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            A thorough understanding of antimicrobial pharmacology is essential for anaesthetists and intensivists. Surgical prophylaxis, treatment of sepsis, and management of hospital-acquired infections all require knowledge of mechanisms of action, spectrum, pharmacokinetics, and adverse effects. This topic covers the major classes of antibacterials, antifungals, and antivirals relevant to the FRCA and FFICM examinations.
          </p>
        </div>

        {/* Key Principles */}
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

        {/* Tab navigation */}
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

          {/* Antibiotics */}
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

          {/* Antifungals */}
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

          {/* Antivirals */}
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

        {/* Antimicrobial Resistance */}
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

        {/* ICU-Specific Considerations */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICU-Specific Antimicrobial Considerations</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Augmented Renal Clearance", value: "Young, septic patients may have CrCl >130 ml/min, leading to sub-therapeutic levels of renally-cleared drugs. Consider TDM and extended/continuous infusions." },
              { label: "Continuous β-Lactam Infusion", value: "Maximises T>MIC. Evidence supports continuous or extended infusions of piperacillin/tazobactam and meropenem in critically ill patients." },
              { label: "Aminoglycoside Dosing", value: "Once-daily (Hartford nomogram) vs multiple daily dosing. ODD maximises Cmax/MIC and reduces nephrotoxicity. Monitor troughs (<1 mg/L for gentamicin)." },
              { label: "Antifungal Empirical Therapy", value: "Echinocandins first-line for invasive candidiasis. Voriconazole first-line for invasive aspergillosis. Consider in patients failing to respond to broad-spectrum antibacterials." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              ["Oxazolidinones (linezolid)", "50S ribosome (initiation)", "VRE/MRSA cover; thrombocytopenia &gt;14 d; serotonin syndrome with SSRI"],
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

      <KeyLearningPoints points={[
        "β-Lactams (penicillins, cephalosporins, carbapenems) are bactericidal, time-dependent — optimise with extended or continuous infusion",
        "Aminoglycosides are bactericidal, concentration-dependent with PAE — optimise with once-daily dosing and trough monitoring",
        "Vancomycin targets D-Ala-D-Ala in peptidoglycan; monitor troughs (15–20 mg/L); red man syndrome is histamine-mediated, not allergy",
        "Amphotericin B binds ergosterol (fungicidal, broadest spectrum); liposomal form reduces nephrotoxicity",
        "Echinocandins inhibit β-(1,3)-D-glucan synthase — first-line for invasive candidiasis; IV only",
        "Aciclovir is selectively activated by viral thymidine kinase — excellent safety profile due to selective toxicity",
        "Rifampicin is a potent CYP inducer — reduces levels of warfarin, OCP, midazolam, ciclosporin",
        "MRSA resistance: PBP2a (mecA gene); VRE resistance: D-Ala-D-Lac modification of vancomycin target",
      ]} />

      <QuizSection questions={antimicrobialsQuiz} />
      <ReferencesList topicId="antimicrobials-pharm" />

      <SeeAlso topicId="antimicrobials-pharm" />
        <TopicCompletionToggle topicId="antimicrobials-pharm" topicTitle="Antimicrobials" />
    </SectionLayout>
  );
};

export default AntimicrobialsTopic;
