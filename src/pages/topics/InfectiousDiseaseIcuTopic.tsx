import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { infectiousDiseaseIcuQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import InfectionSiteMapDiagram from "@/components/diagrams/InfectionSiteMapDiagram";

const InfectiousDiseaseIcuTopic = () => {
  return (
    <SectionLayout title="Infectious Disease in ICU" subtitle="FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <InfectionSiteMapDiagram />
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

        {/* ---- PVL Pneumonia ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">PVL-Positive <em>Staphylococcus aureus</em> Pneumonia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Panton-Valentine Leukocidin (PVL) is a pore-forming cytotoxin produced by certain strains of <em>S. aureus</em> (both MSSA and MRSA). PVL-positive necrotising pneumonia is a rare but devastating condition, predominantly affecting previously healthy young adults, often preceded by influenza-like illness or skin infection.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Pathophysiology</p>
              <p className="text-xs text-muted-foreground mt-1">PVL forms pores in neutrophil and macrophage membranes → massive neutrophil lysis → release of proteolytic enzymes → necrotising tissue destruction and haemorrhagic alveolar necrosis. The toxin-mediated damage is disproportionate to bacterial load.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Clinical Presentation</p>
              <p className="text-xs text-muted-foreground mt-1">Preceding flu-like prodrome or skin boils. Rapid deterioration: high fever, haemoptysis, leucopenia (paradoxical — WCC often &lt;2 × 10⁹/L despite severe sepsis), multilobar cavitating consolidation, pleural effusions. Shock and ARDS develop within hours. Mortality 50–75%.</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Key Diagnostic Clues", detail: "Young, previously healthy patient with rapidly progressive pneumonia + leucopenia + haemoptysis. History of recurrent skin abscesses (boils/furunculosis) in patient or close contacts. CXR/CT: multilobar consolidation with necrosis/cavitation. Blood cultures often positive. Send isolate for PVL gene testing (PCR for lukS-PV and lukF-PV genes)." },
              { label: "Antimicrobial Therapy", detail: "CRITICAL: Suppress toxin production. IV linezolid (inhibits toxin synthesis at ribosomal level) + IV clindamycin (also inhibits toxin production). Add IV flucloxacillin or vancomycin (if MRSA) for bactericidal activity. Rifampicin may be added for synergy. IVIG 2 g/kg (neutralises circulating PVL toxin) — give early. Avoid sole use of β-lactams at sub-inhibitory concentrations as this may paradoxically increase toxin production." },
              { label: "ICU Management", detail: "Early intubation and lung-protective ventilation — ARDS is almost universal. Prone positioning. Consider VV-ECMO early given the high mortality and young patient demographic. Aggressive haemodynamic resuscitation with vasopressors. Surgical debridement of necrotic lung (lobectomy/pneumonectomy) may be life-saving in refractory cases." },
              { label: "Infection Control & Contacts", detail: "PHE (UKHSA) guidelines: screen household contacts for PVL carriage (nasal, axillary, groin swabs). Decolonisation of patient and carriers: nasal mupirocin + chlorhexidine body washes × 5 days. Recurrent skin infections in close contacts is a red flag. Not routinely airborne — standard and contact precautions." },
              { label: "Skin & Soft Tissue PVL Disease", detail: "PVL-positive S. aureus more commonly causes recurrent boils, abscesses, and cellulitis. Necrotising pneumonia is the rare but most severe manifestation. Always consider PVL testing in young patients with recurrent staphylococcal skin infections." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Gram-Positive vs Gram-Negative Sepsis ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Gram-Positive vs Gram-Negative Sepsis</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The distinction between Gram-positive and Gram-negative organisms is fundamental to understanding sepsis pathophysiology, empiric antibiotic selection, and clinical presentation. While the final common pathway of septic shock is similar, the initiating mechanisms and clinical nuances differ.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left py-2 text-foreground font-semibold">Gram-Positive Sepsis</th>
                  <th className="text-left py-2 text-foreground font-semibold">Gram-Negative Sepsis</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Cell wall structure</td>
                  <td>Thick peptidoglycan layer, lipoteichoic acid (LTA), teichoic acids. No outer membrane. Crystal violet retention on Gram stain.</td>
                  <td>Thin peptidoglycan, outer membrane containing lipopolysaccharide (LPS/endotoxin). Periplasmic space. Pink/red on Gram stain.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Primary toxin / PAMP</td>
                  <td>Lipoteichoic acid, peptidoglycan fragments, superantigens (TSST-1, PVL, streptococcal pyrogenic exotoxins). Recognised by TLR-2.</td>
                  <td>LPS (endotoxin) — lipid A component is the primary immunostimulant. Recognised by TLR-4 via MD-2/CD14 complex. Extremely potent — nanogram quantities trigger systemic inflammation.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Immune activation</td>
                  <td>TLR-2 → MyD88 → NF-κB → pro-inflammatory cytokines. Superantigens bypass normal antigen processing → polyclonal T-cell activation → cytokine storm (toxic shock syndromes).</td>
                  <td>LPS–TLR-4 → MyD88 and TRIF pathways → NF-κB + IRF3 → TNF-α, IL-1β, IL-6 + type I interferons. Complement activation. Endotoxin also activates coagulation cascade directly.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Common organisms</td>
                  <td><em>S. aureus</em> (MSSA/MRSA), <em>S. pneumoniae</em>, <em>Streptococcus pyogenes</em> (GAS), <em>Enterococcus</em> spp., coagulase-negative <em>Staphylococci</em></td>
                  <td><em>E. coli</em> (most common), <em>Klebsiella</em>, <em>Pseudomonas</em>, <em>Acinetobacter</em>, <em>Neisseria meningitidis</em>, <em>Bacteroides</em> (anaerobe)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Common sources</td>
                  <td>Skin/soft tissue, intravascular devices (CLABSI), endocarditis, bone/joint, post-surgical wound infections</td>
                  <td>Urinary tract (most common), intra-abdominal (biliary, perforated viscus), respiratory (HAP/VAP), meningitis</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Haemodynamic pattern</td>
                  <td>Vasodilatory shock similar to Gram-negative. Superantigen-mediated toxic shock: profound capillary leak, erythroderma, desquamation.</td>
                  <td>Classic 'warm shock' → vasodilatory with high cardiac output initially. Endotoxin is the most potent trigger of distributive shock. DIC more commonly associated with Gram-negative bacteraemia.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">DIC association</td>
                  <td>Less common but occurs (especially meningococcal-like purpura fulminans with GAS). <em>S. aureus</em> bacteraemia can cause DIC in severe cases.</td>
                  <td>Strongly associated — LPS directly activates tissue factor and coagulation cascade. Meningococcal sepsis is the archetype. Symmetrical peripheral gangrene.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Empiric antibiotics</td>
                  <td>Flucloxacillin (MSSA), vancomycin (MRSA risk), linezolid or daptomycin for resistant organisms. Clindamycin added for toxin suppression in necrotising/toxic shock.</td>
                  <td>Piperacillin-tazobactam, ceftriaxone, or meropenem (if ESBL/CRE risk). Gentamicin for synergy in severe sepsis. Anti-pseudomonal cover if HAP/VAP or immunocompromised.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Special considerations</td>
                  <td><em>S. aureus</em> bacteraemia: always requires echocardiography, repeat cultures at 48–72 h, minimum 2 weeks IV therapy (4–6 weeks if endocarditis). PVL-positive strains → necrotising pneumonia risk.</td>
                  <td>Jarisch-Herxheimer-like reactions possible with high-burden bacteraemia (endotoxin release on bacterial lysis). Source control is paramount (drain collections, relieve obstruction). Monitor for AKI (endotoxin-mediated).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Toxic Shock Syndromes</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Staphylococcal Toxic Shock (TSS)</p>
              <p className="text-xs text-muted-foreground mt-1">TSST-1 superantigen (or enterotoxins B/C). Classic: fever &gt;38.9°C, diffuse macular erythroderma, desquamation (1–2 weeks later), hypotension, ≥3 organ systems involved. Historically associated with tampon use but now more common with wound infections. Treatment: source control + flucloxacillin + clindamycin (toxin suppression) + IVIG.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Streptococcal Toxic Shock (STSS)</p>
              <p className="text-xs text-muted-foreground mt-1">Group A <em>Streptococcus</em> pyrogenic exotoxins (SpeA, SpeC). More severe than staphylococcal TSS — mortality 30–70%. Often associated with necrotising fasciitis or puerperal sepsis. Pain out of proportion. Treatment: surgical debridement + benzylpenicillin + clindamycin + IVIG (INSTINCT trial).</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Endotoxin & the Sepsis Cascade</h3>
          <div className="space-y-2">
            {[
              { label: "LPS Structure", detail: "Lipid A (toxic moiety, conserved) + core oligosaccharide + O-antigen (variable, determines serotype). LPS is released on bacterial lysis or during growth. Detected by Limulus amebocyte lysate (LAL) assay — basis of endotoxin activity assay (EAA)." },
              { label: "Signalling Cascade", detail: "LPS binds LBP (LPS-binding protein) → transfers to CD14 → presented to TLR-4/MD-2 complex → intracellular signalling via MyD88 (early) and TRIF (late) → NF-κB activation → TNF-α, IL-1β, IL-6, IL-8 release → systemic inflammatory response." },
              { label: "Clinical Implications", detail: "Antibiotic-induced endotoxin release may cause transient deterioration (especially with bactericidal agents in high-burden Gram-negative sepsis). This underpinned historical interest in polymyxin B haemoperfusion (EUPHRATES trial — no overall benefit but signal in high-EAA subgroup). Endotoxin tolerance: repeated exposure → attenuated response (immunoparalysis in prolonged sepsis)." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
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

        {/* ---- Drug-Resistant Organisms ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Drug-Resistant Organisms</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Antimicrobial resistance (AMR) is a critical challenge in ICU. Prolonged antibiotic courses, immunosuppression, invasive devices, and cross-contamination drive selection and transmission of multi-drug resistant organisms (MDROs).
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Gram-Positive Resistant Organisms</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Organism</th>
                  <th className="text-left py-2 text-foreground font-semibold">Resistance Mechanism</th>
                  <th className="text-left py-2 text-foreground font-semibold">Treatment Options</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">MRSA</td>
                  <td><em>mecA</em> gene → altered PBP2a with low β-lactam affinity. Community-associated (CA-MRSA) often PVL-positive — necrotising pneumonia, skin abscesses.</td>
                  <td>Vancomycin (trough 15–20 mg/L for serious infections) or teicoplanin. Linezolid for pneumonia (better lung penetration). Daptomycin for bacteraemia (inactivated by surfactant — not for pneumonia). Decolonisation: nasal mupirocin + chlorhexidine washes.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">VRE</td>
                  <td><em>vanA</em> (high-level, transferable) or <em>vanB</em> genes. <em>E. faecium</em> more commonly resistant than <em>E. faecalis</em>. Intrinsically resistant to cephalosporins.</td>
                  <td>Linezolid (oral bioavailability ~100%) or daptomycin. Tigecycline for intra-abdominal/soft tissue. Contact isolation essential.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Penicillin-resistant <em>S. pneumoniae</em></td>
                  <td>Altered PBPs. MIC-dependent: intermediate vs high-level resistance. More common in certain serotypes.</td>
                  <td>High-dose ceftriaxone (2 g BD) for meningitis. Vancomycin added empirically for CNS infection. Respiratory infections often still respond to high-dose amoxicillin.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Gram-Negative Resistant Organisms</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Organism / Mechanism</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key Features</th>
                  <th className="text-left py-2 text-foreground font-semibold">Treatment Options</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">ESBL producers</td>
                  <td>Extended-spectrum β-lactamases hydrolyse 3rd-generation cephalosporins. Common in <em>E. coli</em>, <em>Klebsiella</em>. Risk factors: prior antibiotics, travel to endemic areas, recurrent UTIs.</td>
                  <td>Carbapenems (meropenem) are first-line for serious infections. Piperacillin-tazobactam may be adequate for UTIs (MERINO trial suggests inferiority for bacteraemia). Fosfomycin for uncomplicated UTI.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">AmpC producers</td>
                  <td>Chromosomal or plasmid-mediated AmpC β-lactamases. The 'ESCAPPM' organisms (<em>Enterobacter, Serratia, Citrobacter, Aeromonas, Proteus vulgaris, Providencia, Morganella</em>). Risk of inducible resistance on 3rd-gen cephalosporins.</td>
                  <td>Carbapenems or cefepime (stable to AmpC). Avoid ceftriaxone/ceftazidime — risk of selecting resistant mutants during therapy.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Carbapenem-resistant Enterobacterales (CRE)</td>
                  <td>Carbapenemases: KPC, NDM, OXA-48, VIM, IMP. NDM and OXA-48 prevalent in South Asia and Middle East. Plasmid-mediated — horizontal gene transfer. Mortality 40–50%.</td>
                  <td>Ceftazidime-avibactam (KPC, OXA-48). Meropenem-vaborbactam (KPC). Cefiderocol (NDM, all carbapenemases). Colistin (nephrotoxic — last resort). Combination therapy often used. Infectious diseases input essential.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">MDR <em>Pseudomonas aeruginosa</em></td>
                  <td>Multiple mechanisms: efflux pumps, porin loss, AmpC, metallo-β-lactamases. Biofilm formation on devices. Intrinsically resistant to many antibiotics.</td>
                  <td>Anti-pseudomonal β-lactams (piperacillin-tazobactam, ceftazidime, meropenem) based on sensitivities. Ceftolozane-tazobactam for MDR strains. Nebulised colistin as adjunct in VAP. Combination therapy for severe infections.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">MDR <em>Acinetobacter baumannii</em></td>
                  <td>Intrinsically resistant to many antibiotics. OXA-type carbapenemases. Survives on environmental surfaces for weeks — outbreaks in ICU. Associated with VAP, wound infections, bacteraemia.</td>
                  <td>High-dose ampicillin-sulbactam (sulbactam has intrinsic activity). Colistin ± meropenem (if MIC ≤8). Tigecycline for non-bacteraemic infections. Environmental decontamination critical.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Drug-Resistant Fungi</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm"><em>Candida auris</em></p>
              <p className="text-xs text-muted-foreground mt-1">Emerging multidrug-resistant yeast. Often resistant to fluconazole; variable echinocandin and amphotericin B susceptibility. Persists on skin and environmental surfaces. Difficult to identify — requires MALDI-TOF or molecular methods. Outbreaks in ICUs worldwide. Contact isolation + enhanced environmental cleaning essential.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Azole-resistant <em>Aspergillus fumigatus</em></p>
              <p className="text-xs text-muted-foreground mt-1">TR34/L98H and TR46/Y121F/T289A mutations — linked to environmental azole fungicide use. Voriconazole resistance → liposomal amphotericin B first-line. Susceptibility testing essential. Increasing prevalence in Europe.</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Drug-Resistant Tuberculosis</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">MDR-TB</p>
              <p className="text-xs text-muted-foreground mt-1">Resistant to rifampicin AND isoniazid. Requires 9–18 month regimens with second-line agents: bedaquiline, linezolid, levofloxacin, clofazimine. Specialist TB centre referral. Airborne precautions with negative-pressure isolation.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">XDR-TB</p>
              <p className="text-xs text-muted-foreground mt-1">MDR-TB + resistance to fluoroquinolones AND ≥1 injectable agent (or bedaquiline/linezolid per 2021 WHO definition). Extremely limited treatment options. Mortality high without access to newer agents. GeneXpert MTB/RIF for rapid rifampicin resistance detection.</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">ICU Strategies for Managing MDROs</h3>
          <div className="space-y-2">
            {[
              { label: "Screening & Surveillance", detail: "Admission screening for MRSA, CPE, VRE in high-risk patients (recent hospitalisation, travel to endemic areas, prior MDROs). Rectal swabs for CPE/VRE, nasal swabs for MRSA. Active surveillance cultures." },
              { label: "Contact Precautions", detail: "Single-room isolation or cohorting. Dedicated equipment. Gowns and gloves for all contact. Enhanced terminal cleaning with hydrogen peroxide vapour or UV-C for CPE and C. auris." },
              { label: "Antibiotic Stewardship", detail: "Empiric broad-spectrum → de-escalate at 48–72 h based on cultures. Carbapenem-sparing strategies where possible. Procalcitonin-guided duration. Regular antibiogram review. Restrict fluoroquinolones and carbapenems." },
              { label: "Novel Agents & Approaches", detail: "Ceftazidime-avibactam, meropenem-vaborbactam, cefiderocol, ceftolozane-tazobactam, eravacycline. Phage therapy (experimental). Faecal microbiota transplant for recurrent C. difficile. Pipeline agents in clinical trials." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Leptospirosis ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Leptospirosis</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            <em>Leptospira interrogans</em> is a spirochaete transmitted through contact with water or soil contaminated by infected animal urine (rats, cattle, dogs). Occupational risk in farmers, sewer workers, and military personnel. Incubation 2–30 days. Endemic in tropical regions but occurs worldwide — consider in travellers returning with fever and multi-organ dysfunction.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Anicteric Leptospirosis (90%)</p>
              <p className="text-xs text-muted-foreground mt-1">Biphasic illness: acute bacteraemic phase (fever, myalgia, conjunctival suffusion, headache) followed by immune phase. Usually self-limiting. Suffusion without purulent discharge is a distinguishing feature.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Weil's Disease (severe, ~10%)</p>
              <p className="text-xs text-muted-foreground mt-1">Triad of jaundice, AKI, and haemorrhage. Jaundice is due to hepatocellular dysfunction but hepatic failure is rare — transaminases only modestly elevated (unlike viral hepatitis). Thrombocytopenia common. Mortality 5–15%.</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Renal Involvement", detail: "Non-oliguric AKI with hypokalaemia (unique — most AKI causes hyperkalaemia). Direct tubular toxicity and interstitial nephritis. Usually recovers with supportive care ± RRT. Hypokalaemia may require aggressive replacement." },
              { label: "Pulmonary Haemorrhage", detail: "Diffuse alveolar haemorrhage is the most feared complication — can cause rapidly fatal respiratory failure. Haemoptysis, bilateral infiltrates, falling haemoglobin. May require intubation and lung-protective ventilation. Consider pulsed methylprednisolone (evidence limited but used in severe cases)." },
              { label: "Cardiac Involvement", detail: "Myocarditis, arrhythmias, and cardiovascular collapse. ECG changes include ST-segment abnormalities and conduction defects. Troponin elevation common." },
              { label: "Diagnosis", detail: "MAT (microscopic agglutination test) — gold standard but takes 7–10 days. IgM ELISA for rapid screening. PCR on blood (first week) or urine (second week). Dark-field microscopy (low sensitivity). Blood cultures in EMJH medium (slow — weeks)." },
              { label: "Treatment", detail: "Mild: oral doxycycline 100 mg BD or amoxicillin. Severe (Weil's): IV benzylpenicillin 1.2 g QDS or ceftriaxone 1 g OD. Early antibiotics reduce duration and complications. Jarisch-Herxheimer reaction may occur (treat supportively). Doxycycline 200 mg weekly for prophylaxis in high-risk exposure." },
              { label: "ICU Management", detail: "Organ support: RRT for AKI, mechanical ventilation for pulmonary haemorrhage/ARDS, vasopressors for shock. Correct coagulopathy and thrombocytopenia. Monitor for myocarditis. Notifiable disease in the UK." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
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
        "CRE: ceftazidime-avibactam for KPC/OXA-48; cefiderocol for NDM — always involve microbiology/ID",
        "ESCAPPM organisms risk inducible AmpC resistance on 3rd-gen cephalosporins — use carbapenems or cefepime",
        "Candida auris is an emerging MDR yeast requiring MALDI-TOF identification, contact isolation, and enhanced environmental cleaning",
      ]} />

      <QuizSection questions={infectiousDiseaseIcuQuestions} />
      <ReferencesList topicId="infectious-disease-icu" />
      <SeeAlso topicId="infectious-disease-icu" />
      <TopicCompletionToggle topicId="infectious-disease-icu" topicTitle="Infectious Disease in ICU" />
    </SectionLayout>
  );
};

export default InfectiousDiseaseIcuTopic;
