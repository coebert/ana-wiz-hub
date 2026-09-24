import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface SiteData {
  label: string;
  icon: string;
  color: string;
  organisms: { name: string; note: string }[];
  empiric: string;
}

const sites: SiteData[] = [
  {
    label: "Lungs",
    icon: "🫁",
    color: "hsl(200, 70%, 50%)",
    organisms: [
      { name: "S. pneumoniae", note: "Most common CAP organism" },
      { name: "Legionella pneumophila", note: "Intracellular — hyponatraemia, confusion, diarrhoea" },
      { name: "S. aureus", note: "Post-influenza, MRSA in HAP/VAP" },
      { name: "Pseudomonas aeruginosa", note: "HAP/VAP, CF, structural lung disease" },
      { name: "Klebsiella pneumoniae", note: "HAP, ESBL risk, 'red-currant jelly' sputum" },
      { name: "Aspergillus fumigatus", note: "IPA in immunosuppressed; halo sign on CT" },
      { name: "Pneumocystis jirovecii", note: "PJP — bilateral GGO, HIV/immunosuppression" },
      { name: "Influenza / SARS-CoV-2", note: "Viral ARDS, secondary bacterial infection" },
    ],
    empiric: "CAP: co-amoxiclav + macrolide. VAP: anti-pseudomonal β-lactam ± aminoglycoside",
  },
  {
    label: "CNS",
    icon: "🧠",
    color: "hsl(280, 60%, 55%)",
    organisms: [
      { name: "N. meningitidis", note: "Purpuric rash, notifiable, chemoprophylaxis for contacts" },
      { name: "S. pneumoniae", note: "Most common cause of bacterial meningitis in adults" },
      { name: "Listeria monocytogenes", note: "Elderly, immunosuppressed, pregnancy — add amoxicillin" },
      { name: "HSV-1", note: "Temporal lobe encephalitis — IV aciclovir empirically" },
      { name: "Cryptococcus neoformans", note: "HIV/immunosuppressed — raised ICP, India ink +" },
      { name: "M. tuberculosis", note: "TB meningitis — basal meningeal enhancement, low CSF glucose" },
    ],
    empiric: "Ceftriaxone 2 g BD + dexamethasone ± amoxicillin (Listeria) ± aciclovir (encephalitis)",
  },
  {
    label: "Urinary Tract",
    icon: "🫘",
    color: "hsl(35, 80%, 50%)",
    organisms: [
      { name: "E. coli", note: "Most common UTI/urosepsis organism (~70%)" },
      { name: "Klebsiella", note: "ESBL-producing strains increasing" },
      { name: "Proteus mirabilis", note: "Staghorn calculi, alkaline urine (urease producer)" },
      { name: "Pseudomonas", note: "Catheter-associated, hospital-acquired" },
      { name: "Enterococcus", note: "Intrinsic cephalosporin resistance" },
      { name: "Candida", note: "Candiduria — usually colonisation; treat if symptomatic/neutropenic" },
    ],
    empiric: "Piperacillin-tazobactam or gentamicin + amoxicillin. ESBL risk: meropenem. Source control essential.",
  },
  {
    label: "Abdomen",
    icon: "🔴",
    color: "hsl(15, 70%, 50%)",
    organisms: [
      { name: "E. coli", note: "Peritonitis, cholangitis, diverticular abscess" },
      { name: "Bacteroides fragilis", note: "Obligate anaerobe — below the diaphragm" },
      { name: "Enterococcus", note: "Biliary and post-operative infections" },
      { name: "Klebsiella", note: "Liver abscess (esp. K1/K2 hypervirulent strains)" },
      { name: "Candida", note: "Tertiary peritonitis, post-operative, TPN" },
      { name: "C. difficile", note: "Toxin-mediated colitis — oral vancomycin first-line" },
    ],
    empiric: "Piperacillin-tazobactam or meropenem + metronidazole. Source control is the priority.",
  },
  {
    label: "Skin & Soft Tissue",
    icon: "🦠",
    color: "hsl(340, 65%, 50%)",
    organisms: [
      { name: "Group A Streptococcus", note: "Nec fasc type II, toxic shock, cellulitis" },
      { name: "S. aureus (inc. MRSA)", note: "Abscess, wound infection, nec fasc" },
      { name: "Clostridium perfringens", note: "Gas gangrene — crepitus, rapid tissue necrosis" },
      { name: "Mixed aerobes/anaerobes", note: "Nec fasc type I — post-op, Fournier's gangrene" },
      { name: "Vibrio vulnificus", note: "Seawater exposure, liver disease — haemorrhagic bullae" },
    ],
    empiric: "Pip-taz or meropenem + clindamycin (toxin suppression) + vancomycin. Emergency surgical debridement.",
  },
  {
    label: "Bloodstream",
    icon: "🩸",
    color: "hsl(0, 70%, 50%)",
    organisms: [
      { name: "Coagulase-neg Staphylococci", note: "CLABSI — most common line organism" },
      { name: "S. aureus", note: "Always requires echo + ≥2 weeks IV Abx. High mortality." },
      { name: "E. coli", note: "Most common Gram-negative bacteraemia" },
      { name: "Candida spp.", note: "Remove all lines. Echinocandin empirically. C. auris emerging MDR threat." },
      { name: "Enterococcus", note: "VRE increasing — linezolid or daptomycin" },
      { name: "Pseudomonas", note: "Anti-pseudomonal β-lactam. Often line-related." },
    ],
    empiric: "Vancomycin + piperacillin-tazobactam. Remove/exchange suspected lines. Paired blood cultures.",
  },
];

const InfectionSiteMapDiagram = () => {
  const [selected, setSelected] = useState<number>(0);
  const active = sites[selected];

  return (
    <DiagramFigure
      id="infection-site-map-diagram"
      title="Infection site MAP"
      description="Infection site MAP: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
                  <div className="my-8">
        <h3 className="text-xl font-serif font-bold text-foreground mb-4">Organisms by Infection Site</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Tap a body site to see the common causative organisms, key clinical pearls, and empiric antibiotic guidance.
        </p>
  
        {/* Site selector */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
          {sites.map((site, i) => (
            <button
              key={site.label}
              onClick={() => setSelected(i)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all text-center ${
                selected === i
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border hover:border-primary/40 bg-card"
              }`}
            >
              <span className="text-2xl">{site.icon}</span>
              <span className={`text-xs font-semibold ${selected === i ? "text-primary" : "text-foreground"}`}>
                {site.label}
              </span>
            </button>
          ))}
        </div>
  
        {/* Detail panel */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{ backgroundColor: `${active.color}20`, borderBottom: `2px solid ${active.color}` }}
          >
            <span className="text-xl">{active.icon}</span>
            <h4 className="font-bold text-foreground">{active.label} Infections</h4>
          </div>
  
          <div className="divide-y divide-border">
            {active.organisms.map((org) => (
              <div key={org.name} className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3">
                <span className="text-sm font-semibold text-foreground italic whitespace-nowrap">{org.name}</span>
                <span className="text-xs text-muted-foreground">{org.note}</span>
              </div>
            ))}
          </div>
  
          <div className="px-4 py-3 bg-secondary/30 border-t border-border">
            <p className="text-xs font-semibold text-foreground mb-0.5">Empiric Therapy</p>
            <p className="text-xs text-muted-foreground">{active.empiric}</p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default InfectionSiteMapDiagram;
