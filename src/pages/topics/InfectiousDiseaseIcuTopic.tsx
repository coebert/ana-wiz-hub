import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { infectiousDiseaseIcuQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const InfectiousDiseaseIcuTopic = () => {
  return (
    <SectionLayout title="Infectious Disease in ICU" subtitle="FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-8 mb-10">

        {/* ---- Respiratory infections ---- */}
        <div>
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
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">CAP (severe)</td>
                  <td><em>S. pneumoniae</em>, <em>S. aureus</em>, <em>Legionella</em>, influenza, SARS-CoV-2</td>
                  <td>CURB-65 / PSI for severity. Empiric: co-amoxiclav + macrolide or β-lactam + respiratory fluoroquinolone.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">HAP / VAP</td>
                  <td><em>Pseudomonas</em>, <em>S. aureus</em> (MRSA), <em>Klebsiella</em>, <em>Acinetobacter</em></td>
                  <td>VAP: &gt;48 h after intubation. Diagnosis: new infiltrates + sepsis markers. Quantitative BAL cultures. Anti-pseudomonal β-lactam ± aminoglycoside.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Aspiration</td>
                  <td>Anaerobes, <em>Streptococci</em>, Gram-negatives</td>
                  <td>Chemical pneumonitis → secondary bacterial infection. Co-amoxiclav or piperacillin-tazobactam.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Immunocompromised</td>
                  <td><em>Pneumocystis jirovecii</em>, CMV, <em>Aspergillus</em></td>
                  <td>PJP: bilateral ground-glass, high-dose co-trimoxazole ± steroids. Aspergillus: voriconazole first-line.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- Legionella ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Legionella Pneumonia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            <em>Legionella pneumophila</em> (serogroup 1) causes ~5% of severe CAP admissions. It is an intracellular Gram-negative rod acquired from contaminated water systems — there is no person-to-person transmission.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Clinical Features</p>
              <p className="text-xs text-muted-foreground mt-1">High fever, dry cough, confusion, diarrhoea, hyponatraemia (SIADH), raised CK, lymphopenia, deranged LFTs. CXR: progressive consolidation (may lag behind clinical picture).</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Diagnosis</p>
              <p className="text-xs text-muted-foreground mt-1">Urinary antigen test (rapid, sensitivity ~80% for serogroup 1). PCR on respiratory samples. Culture on BCYE agar (slow). Notifiable disease — inform Public Health.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Treatment</p>
              <p className="text-xs text-muted-foreground mt-1">First-line: macrolide (azithromycin) or fluoroquinolone (levofloxacin). Severe: combination therapy. Duration 7–14 days (21 days if immunocompromised). β-lactams are ineffective — Legionella is intracellular.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">ICU Relevance</p>
              <p className="text-xs text-muted-foreground mt-1">Can cause rapidly progressive respiratory failure, multi-organ dysfunction, rhabdomyolysis, and renal failure. May require mechanical ventilation and RRT. Mortality 10–30% in ICU.</p>
            </div>
          </div>
        </div>

        {/* ---- Urosepsis ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Urosepsis</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Urinary tract infections are the second most common source of sepsis in ICU. Obstruction (calculi, BPH) is a common precipitant requiring urgent source control.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Common Organisms</p>
              <p className="text-xs text-muted-foreground mt-1"><em>E. coli</em> (most common), <em>Klebsiella</em>, <em>Proteus</em>, <em>Pseudomonas</em> (catheter-associated), <em>Enterococcus</em>.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Source Control</p>
              <p className="text-xs text-muted-foreground mt-1">Urgent imaging (CT/USS). Nephrostomy or ureteric stent for obstructed pyelonephritis. Remove/replace urinary catheters.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Empiric Therapy</p>
              <p className="text-xs text-muted-foreground mt-1">Piperacillin-tazobactam or gentamicin + amoxicillin. Consider ESBL risk: meropenem if previous ESBL colonisation. Follow local antibiogram.</p>
            </div>
          </div>
        </div>

        {/* ---- CNS Infections ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">CNS Infections</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Meningitis and encephalitis present with reduced consciousness, seizures and raised ICP — often requiring ICU for airway protection and ICP management.
          </p>
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
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Bacterial meningitis</td>
                  <td><em>N. meningitidis</em>, <em>S. pneumoniae</em>, <em>Listeria</em> (elderly/immunocompromised)</td>
                  <td>Ceftriaxone 2 g BD + dexamethasone 10 mg QDS (before or with first dose). Add amoxicillin if Listeria risk. LP when safe.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Viral encephalitis</td>
                  <td>HSV-1 (most common treatable), VZV, enterovirus</td>
                  <td>IV aciclovir 10 mg/kg TDS empirically. MRI: temporal lobe signal changes in HSV. CSF PCR for diagnosis.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Brain abscess</td>
                  <td>Mixed anaerobes, <em>Streptococci</em>, <em>S. aureus</em></td>
                  <td>Ceftriaxone + metronidazole. Neurosurgical aspiration/drainage if &gt;2.5 cm or midline shift.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Fungal meningitis</td>
                  <td><em>Cryptococcus neoformans</em> (HIV/immunosuppression)</td>
                  <td>Amphotericin B + flucytosine induction, then fluconazole. Raised ICP may require repeated LP or shunt.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- Intra-abdominal ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intra-abdominal Sepsis</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Abdominal sepsis accounts for ~20% of ICU sepsis. Source control (surgery or drainage) is the critical intervention — antibiotics alone are insufficient.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Common Sources</p>
              <p className="text-xs text-muted-foreground mt-1">Perforated viscus, anastomotic leak, cholangitis, diverticular abscess, pancreatitis with infected necrosis.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Organisms</p>
              <p className="text-xs text-muted-foreground mt-1"><em>E. coli</em>, <em>Bacteroides</em>, <em>Enterococcus</em>, <em>Klebsiella</em>. Tertiary peritonitis: <em>Candida</em>, <em>Enterococcus faecium</em>, MDR Gram-negatives.</p>
            </div>
          </div>
        </div>

        {/* ---- Necrotising Fasciitis ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Necrotising Fasciitis</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A rapidly progressive, life-threatening soft-tissue infection spreading along fascial planes. Mortality 20–40% even with treatment. Early surgical debridement is the single most important intervention.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Type I (Polymicrobial)</p>
              <p className="text-xs text-muted-foreground mt-1">Mixed aerobes + anaerobes. Typically post-operative or perineal (Fournier's gangrene). Risk factors: diabetes, immunosuppression, peripheral vascular disease.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Type II (Monomicrobial)</p>
              <p className="text-xs text-muted-foreground mt-1">Group A <em>Streptococcus</em> (most common), <em>S. aureus</em>, <em>Clostridium</em>. Can occur in healthy patients. Streptococcal toxic shock syndrome in ~50%.</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Clinical Features", detail: "Pain out of proportion to signs, rapidly spreading erythema, crepitus (gas gangrene), blistering, skin necrosis, systemic toxicity. LRINEC score ≥6 suggests necrotising infection." },
              { label: "Surgical Management", detail: "Emergency radical debridement — the 'finger test' at fascial plane. Often requires multiple returns to theatre (relook at 24–48 h). May require amputation. Vacuum-assisted closure for open wounds." },
              { label: "Medical Management", detail: "Broad-spectrum: piperacillin-tazobactam or meropenem + clindamycin (inhibits toxin production) + vancomycin (if MRSA risk). IVIG considered for streptococcal toxic shock. HDU/ICU for organ support." },
              { label: "ICU Considerations", detail: "Massive fluid requirements (capillary leak + third-spacing). Vasopressor support. Early intubation if spreading cervical/facial involvement. Anticipate DIC, AKI, ARDS." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Bloodstream / Line infections ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bloodstream & Line Infections</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Central line-associated bloodstream infections (CLABSIs) are a major preventable cause of ICU morbidity. The 'Matching Michigan' and similar bundles have reduced CLABSI rates significantly.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Organisms</p>
              <p className="text-xs text-muted-foreground mt-1">Coagulase-negative <em>Staphylococci</em>, <em>S. aureus</em>, <em>Candida</em>, <em>Enterococcus</em>, Gram-negatives. <em>S. aureus</em> bacteraemia: always requires echocardiography and prolonged treatment.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Prevention Bundle</p>
              <p className="text-xs text-muted-foreground mt-1">Hand hygiene, full barrier precautions, chlorhexidine skin prep, optimal site selection (avoid femoral), daily line necessity review, aseptic technique.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Management</p>
              <p className="text-xs text-muted-foreground mt-1">Remove/exchange line. Paired blood cultures (peripheral + line — differential time to positivity). Empiric vancomycin + Gram-negative cover. Duration depends on organism.</p>
            </div>
          </div>
        </div>

        {/* ---- Fungal Infections ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fungal Infections in ICU</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Invasive fungal infections carry high mortality (30–60%) and are increasing in prevalence. ICU patients are at risk due to broad-spectrum antibiotics, central lines, TPN, immunosuppression, and prolonged stay.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Organism</th>
                  <th className="text-left py-2 text-foreground font-semibold">Clinical Presentation</th>
                  <th className="text-left py-2 text-foreground font-semibold">Diagnosis & Treatment</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground"><em>Candida</em> spp.</td>
                  <td>Candidaemia, intra-abdominal candidiasis, candiduria. <em>C. albicans</em> most common but <em>C. auris</em> is an emerging MDR threat.</td>
                  <td>Blood cultures (sensitivity ~50%). 1,3-β-D-glucan. Empiric echinocandin (anidulafungin/caspofungin) — IDSA guidelines. Fluconazole step-down for sensitive species. Remove lines.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground"><em>Aspergillus</em></td>
                  <td>Invasive pulmonary aspergillosis (IPA). CT: halo sign, air-crescent sign. COVID-associated pulmonary aspergillosis (CAPA).</td>
                  <td>Galactomannan antigen (serum/BAL). Voriconazole first-line (TDM essential, target 1–5.5 mg/L). Isavuconazole or liposomal amphotericin B alternatives.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground"><em>Pneumocystis jirovecii</em></td>
                  <td>PJP: bilateral ground-glass opacities, hypoxaemia, high LDH. HIV and non-HIV immunosuppression (steroids, transplant).</td>
                  <td>High-dose co-trimoxazole (120 mg/kg/day in divided doses). Adjunctive steroids if PaO₂ &lt; 9.3 kPa. Duration 21 days (HIV) or 14 days (non-HIV).</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground"><em>Cryptococcus</em></td>
                  <td>Meningoencephalitis in HIV/immunosuppressed. Raised ICP, headache, confusion. India ink stain, cryptococcal antigen.</td>
                  <td>Amphotericin B + flucytosine induction (2 weeks) → fluconazole consolidation. Serial LPs for ICP management.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Mucormycosis</td>
                  <td>Rhinocerebral, pulmonary, or disseminated. Diabetes (esp. DKA), haematological malignancy. Angioinvasive — tissue necrosis.</td>
                  <td>Surgical debridement essential. Liposomal amphotericin B. Correct underlying risk factors (glycaemic control). High mortality.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- Endocarditis ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Infective Endocarditis</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Modified Duke criteria for diagnosis. Common organisms: <em>S. aureus</em> (acute, IVDU), <em>Streptococci</em> (subacute, native valve), <em>Enterococcus</em>, HACEK group. ICU admission for septic shock, heart failure, or embolic complications.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Medical Management</p>
              <p className="text-xs text-muted-foreground mt-1">Empiric: flucloxacillin + gentamicin (native valve) or vancomycin + gentamicin + rifampicin (prosthetic). Guided by cultures — prolonged course (4–6 weeks IV).</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Surgical Indications</p>
              <p className="text-xs text-muted-foreground mt-1">Heart failure from valvular destruction, uncontrolled infection, abscess formation, recurrent emboli, large vegetations (&gt;10 mm). Early surgery improves outcomes in selected patients.</p>
            </div>
          </div>
        </div>

        {/* ---- C. difficile ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3"><em>Clostridioides difficile</em> Infection</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Toxin-mediated colitis associated with antibiotic exposure (fluoroquinolones, cephalosporins, clindamycin). Severity ranges from mild diarrhoea to fulminant colitis with toxic megacolon.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Mild–Moderate</p>
              <p className="text-xs text-muted-foreground mt-1">Oral vancomycin 125 mg QDS (10–14 days). Fidaxomicin for recurrent episodes. Stop causative antibiotics if possible.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Severe / Fulminant</p>
              <p className="text-xs text-muted-foreground mt-1">Oral vancomycin 500 mg QDS + IV metronidazole. WCC &gt;15, creatinine rise, lactate &gt;2.2, toxic megacolon → surgical review for subtotal colectomy. Faecal microbiota transplantation for recurrence.</p>
            </div>
          </div>
        </div>

        {/* ---- Viral infections ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Viral Infections in ICU</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Virus</th>
                  <th className="text-left py-2 text-foreground font-semibold">ICU Presentation</th>
                  <th className="text-left py-2 text-foreground font-semibold">Treatment</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Influenza</td>
                  <td>ARDS, myocarditis, secondary bacterial pneumonia</td>
                  <td>Oseltamivir (even if &gt;48 h from onset in ICU patients). Suspect and treat early.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">SARS-CoV-2</td>
                  <td>ARDS, ARDS phenotypes, VTE, cytokine storm</td>
                  <td>Dexamethasone (RECOVERY trial), tocilizumab, baricitinib. Prone positioning. Anticoagulation.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">HSV / VZV</td>
                  <td>Encephalitis, hepatitis, disseminated in immunocompromised</td>
                  <td>IV aciclovir 10 mg/kg TDS. Adequate hydration to prevent crystalluria.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">CMV</td>
                  <td>Reactivation in immunosuppressed: pneumonitis, colitis, hepatitis</td>
                  <td>IV ganciclovir or oral valganciclovir. Monitor for myelosuppression.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- Infection control ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Infection Control & Prevention</h2>
          <div className="space-y-2">
            {[
              { label: "Hand Hygiene", detail: "WHO 5 moments. Alcohol gel for most situations; soap and water for C. difficile and norovirus (spore-forming)." },
              { label: "Ventilator Bundle", detail: "Head-of-bed elevation 30–45°, daily sedation holds, oral chlorhexidine, peptic ulcer prophylaxis, VTE prophylaxis, daily assessment of extubation readiness." },
              { label: "Isolation Precautions", detail: "Contact (MRSA, VRE, C. difficile), droplet (influenza, meningococcus), airborne (TB, measles, VZV — negative-pressure room)." },
              { label: "Antimicrobial Stewardship", detail: "Start smart, then focus. De-escalation at 48–72 h. Procalcitonin-guided duration. Audit and feedback. Restrict high-risk antibiotics." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <KeyLearningPoints points={[
        "Legionella is intracellular — β-lactams are ineffective; treat with macrolides or fluoroquinolones",
        "Necrotising fasciitis: pain out of proportion, crepitus, systemic toxicity — emergency surgical debridement is the priority",
        "Invasive candidiasis: echinocandins first-line empirically; remove all intravascular lines",
        "Invasive aspergillosis: voriconazole first-line with TDM; halo sign on CT is the classic early finding",
        "S. aureus bacteraemia always requires echocardiography and a minimum 2 weeks IV antibiotics",
        "C. difficile: oral vancomycin first-line; severe/fulminant cases need surgical review for colectomy",
        "Source control is the most important intervention in intra-abdominal sepsis and necrotising fasciitis",
      ]} />

      <QuizSection questions={infectiousDiseaseIcuQuestions} />
      <ReferencesList topicId="infectious-disease-icu" />
      <SeeAlso topicId="infectious-disease-icu" />
      <TopicCompletionToggle topicId="infectious-disease-icu" topicTitle="Infectious Disease in ICU" />
    </SectionLayout>
  );
};

export default InfectiousDiseaseIcuTopic;
