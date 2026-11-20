import { useState, useMemo } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Empirical sepsis antibiotic chooser.
 * Pick suspected source + patient factors → suggested empirical regimen for
 * ADULTS (16+) WHO ARE NOT PREGNANT, drawing on NICE NG253 (adults), NG254 (under-16s), NG255 (pregnancy)
 * — only the adult NG253 pathway is modelled — NICE NG250 (pneumonia), NICE CG151 (neutropenic sepsis),
 * the BNF and ATS/IDSA 2019 (CAP risk factors).
 *
 * Paediatric (NG254) and pregnancy (NG255) pathways are not modelled here.
 * Educational tool only — local antibiogram, allergy testing and microbiology
 * advice always supersede.
 */

type SourceKey =
  | "cap"
  | "hap"
  | "ia"
  | "uro"
  | "meningitis"
  | "neutropenic"
  | "ssti";

type Severity = "mild" | "severe";
type Renal = "normal" | "impaired"; // CrCl <30 ml/min
type Allergy = "none" | "non-severe" | "anaphylaxis";

interface Recommendation {
  firstLine: string;
  rationale: string;
  alternatives: { trigger: string; regimen: string }[];
  pearls: string[];
  reviewAt: string;
}

interface Source {
  key: SourceKey;
  label: string;
  shortLabel: string;
  bugs: string;
  build: (opts: {
    severity: Severity;
    allergy: Allergy;
    renal: Renal;
    mrsa: boolean;
    recentAbx: boolean;
  }) => Recommendation;
}

const SOURCES: Source[] = [
  {
    key: "cap",
    label: "Community-acquired pneumonia (CAP)",
    shortLabel: "CAP",
    bugs: "Strep pneumoniae, H. influenzae, Mycoplasma, Legionella, Chlamydophila, Moraxella",
    build: ({ severity, allergy, mrsa, recentAbx }) => {
      const macrolide = "clarithromycin 500 mg PO/IV BD";
      let firstLine: string;
      if (severity === "mild") {
        firstLine = allergy === "anaphylaxis"
          ? `Doxycycline 200 mg PO loading then 100 mg PO OD (CURB-65 0–1)`
          : `Amoxicillin 500 mg–1 g PO TDS (CURB-65 0–1)`;
      } else {
        firstLine = allergy === "anaphylaxis"
          ? "Levofloxacin 500 mg IV BD (severe — CURB-65 ≥ 3). NICE NG250 lists levofloxacin as the penicillin-allergy alternative; consult a local microbiologist if a fluoroquinolone is not appropriate"
          : `Co-amoxiclav 1.2 g IV TDS + ${macrolide} (severe — CURB-65 ≥ 3)`;
      }
      const alternatives: Recommendation["alternatives"] = [];
      if (allergy === "non-severe" && severity === "severe") {
        alternatives.push({
          trigger: "Non-severe penicillin allergy (rash only)",
          regimen: "NG250's high-severity penicillin-allergy alternative is levofloxacin 500 mg IV BD. A cephalosporin is not the NICE alternative — take local microbiology or antimicrobial policy advice before substituting one.",
        });
      }
      if (mrsa) {
        alternatives.push({
          trigger: "MRSA risk with locally validated risk factors (e.g. previous MRSA isolation)",
          regimen: "Add vancomycin (AUC₂₄-guided 400–600 mg·h/L) or linezolid 600 mg IV BD. ATS/IDSA 2019 advises covering MRSA only when locally validated risk factors are present.",
        });
      }
      if (recentAbx) {
        alternatives.push({
          trigger: "Recent broad-spectrum antibiotics or hospitalisation",
          regimen: "Not an automatic indication for broad-spectrum escalation: review recent microbiology and local resistance data with the antimicrobial policy or microbiologist. The former HCAP pattern was abandoned by ATS/IDSA 2019 because it increased broad-spectrum use without improving outcomes.",
        });
      }
      return {
        firstLine,
        rationale:
          "Strep pneumoniae remains the dominant pathogen — a β-lactam covers it. A macrolide adds atypical cover (Legionella, Mycoplasma) in severe disease; NG250 never combines a macrolide with a fluoroquinolone.",
        alternatives,
        pearls: [
          "Use CURB-65 (or CRB-65 in primary care) to grade severity.",
          "Send urine for pneumococcal + Legionella antigen if severe.",
          "NG250: stop antibiotics after 5 days unless the patient is not clinically stable or microbiology indicates a longer course.",
        ],
        reviewAt: "48 h with cultures and biomarker trend — narrow per sensitivities; NG250 stops treatment at 5 days if the patient is stable.",
      };
    },
  },
  {
    key: "hap",
    label: "Hospital-acquired / ventilator-associated pneumonia (HAP/VAP)",
    shortLabel: "HAP/VAP",
    bugs: "Pseudomonas, Klebsiella, E. coli, Enterobacter, Acinetobacter, Staph aureus (incl. MRSA)",
    build: ({ allergy, renal, mrsa, recentAbx }) => {
      const broadMRSA = mrsa || recentAbx;
      let firstLine: string;
      if (allergy === "anaphylaxis") {
        firstLine = `Levofloxacin 500 mg IV once or twice daily (higher dose if severe infection; off-label for HAP). NICE NG250 lists a fluoroquinolone only when other first-line antibiotics are unsuitable — confirm with a local microbiologist${broadMRSA ? " + vancomycin (AUC-guided) or linezolid 600 mg IV BD" : ""}`;
      } else {
        firstLine = `Piperacillin/tazobactam 4.5 g IV four times daily (NG250 gives 4.5 g three times daily, increased to four times daily if severe infection)${broadMRSA ? " + vancomycin (AUC-guided) or linezolid 600 mg IV BD" : ""}`;
      }
      const alternatives: Recommendation["alternatives"] = [
        {
          trigger: "Septic shock OR known ESBL/AmpC colonisation",
          regimen: "Meropenem 1 g IV three times daily (NG250: 0.5–1 g three times daily) + vancomycin or linezolid",
        },
      ];
      if (renal === "impaired") {
        alternatives.push({
          trigger: "CrCl < 30 ml/min",
          regimen: "Dose-reduce piperacillin/tazobactam to 4.5 g BD–TDS; meropenem 0.5–1 g BD; avoid aminoglycosides if possible",
        });
      }
      return {
        firstLine,
        rationale:
          "Empirical cover must include Pseudomonas (anti-pseudomonal β-lactam). MRSA cover added for ventilated, ICU or high-prevalence units. Extended infusion β-lactams optimise %fT>MIC for resistant organisms.",
        alternatives,
        pearls: [
          "Get a tracheal aspirate or BAL before starting whenever feasible.",
          "Combination Gram-negative cover (β-lactam + aminoglycoside or quinolone) only if septic shock or high MDR risk — does not improve outcomes routinely.",
          "Stop MRSA cover at 48 h if cultures negative.",
          "Total course typically 7 days (8 days for non-fermenters per IDSA/ATS 2016).",
        ],
        reviewAt: "48–72 h with respiratory cultures — narrow to a single agent based on sensitivities.",
      };
    },
  },
  {
    key: "ia",
    label: "Intra-abdominal sepsis",
    shortLabel: "Intra-abdominal",
    bugs: "E. coli, Klebsiella, Enterococcus, Bacteroides fragilis, anaerobes",
    build: ({ severity, allergy, recentAbx }) => {
      let firstLine: string;
      if (allergy === "anaphylaxis") {
        firstLine = "Ciprofloxacin 400 mg IV BD + metronidazole 500 mg IV TDS + vancomycin or amoxicillin (Enterococcus cover if biliary/post-op)";
      } else if (severity === "mild") {
        firstLine = "Co-amoxiclav 1.2 g IV TDS (community-acquired, source-controlled)";
      } else {
        firstLine = "Piperacillin/tazobactam 4.5 g IV QDS (severe / healthcare-associated)";
      }
      const alternatives: Recommendation["alternatives"] = [
        {
          trigger: "Septic shock OR ESBL risk OR recent broad-spectrum exposure",
          regimen: "Meropenem 1 g IV TDS ± vancomycin if Enterococcus suspected (post-op, biliary, immunocompromised)",
        },
      ];
      if (recentAbx) {
        alternatives.push({
          trigger: "Recent fluconazole / prolonged ICU stay",
          regimen: "Add anidulafungin or caspofungin if Candida likely (perforated upper GI, recurrent perforation, immunocompromised)",
        });
      }
      return {
        firstLine,
        rationale:
          "Polymicrobial — must cover Enterobacterales AND anaerobes. Co-amoxiclav and pip-tazo intrinsically cover both. Enterococcal cover is reserved for post-operative, biliary or immunocompromised patients.",
        alternatives,
        pearls: [
          "SOURCE CONTROL is the single most important intervention — antibiotics buy time only.",
          "Short courses (4 days post-source-control) are equivalent to longer courses (STOP-IT trial).",
          "Routine antifungal cover is NOT indicated for community-acquired peritonitis.",
        ],
        reviewAt: "After source control achieved — narrow per cultures, total 4–7 days.",
      };
    },
  },
  {
    key: "uro",
    label: "Urosepsis / pyelonephritis",
    shortLabel: "Urosepsis",
    bugs: "E. coli (>70%), Klebsiella, Proteus, Enterococcus, Pseudomonas (catheter/recurrent)",
    build: ({ severity, allergy, recentAbx }) => {
      let firstLine: string;
      if (allergy === "anaphylaxis") {
        firstLine = severity === "severe"
          ? "Gentamicin 5–7 mg/kg IV OD (Hartford) + vancomycin if Gram-positive suspected"
          : "Ciprofloxacin 500 mg PO BD (uncomplicated, no recent quinolone)";
      } else if (severity === "mild") {
        firstLine = "Co-amoxiclav 625 mg PO TDS or trimethoprim 200 mg PO BD (per local sensitivities)";
      } else {
        firstLine = "Co-amoxiclav 1.2 g IV TDS + gentamicin 5 mg/kg IV stat (then per levels)";
      }
      const alternatives: Recommendation["alternatives"] = [
        {
          trigger: "Septic shock, ESBL risk, or recent hospitalisation/abx",
          regimen: "Piperacillin/tazobactam 4.5 g IV QDS or meropenem 1 g IV TDS",
        },
      ];
      if (recentAbx) {
        alternatives.push({
          trigger: "Recurrent UTI / catheter / recent broad-spectrum exposure",
          regimen: "Avoid empirical quinolones (resistance >20% in UK) — use a carbapenem if ESBL likely",
        });
      }
      return {
        firstLine,
        rationale:
          "E. coli dominates — a β-lactam plus aminoglycoside gives synergy and excellent urinary concentration. Single-dose gentamicin minimises nephrotoxicity while achieving Cmax/MIC > 10.",
        alternatives,
        pearls: [
          "Send urine and blood cultures BEFORE the first dose.",
          "Image (CT KUB or USS) within 24 h if no clinical improvement — rule out obstruction or abscess.",
          "Total course 7 days IV/PO for pyelonephritis; 5 days if quinolone, 14 days if bacteraemic or abscess.",
        ],
        reviewAt: "48 h — switch to oral guided by sensitivities once stable.",
      };
    },
  },
  {
    key: "meningitis",
    label: "Bacterial meningitis",
    shortLabel: "Meningitis",
    bugs: "S. pneumoniae, N. meningitidis, Listeria (>50 y, immunocompromised, pregnant), H. influenzae",
    build: ({ allergy }) => {
      const listeriaCover = "amoxicillin 2 g IV 4-hourly (Listeria cover — age >50, pregnant, immunocompromised)";
      let firstLine: string;
      if (allergy === "anaphylaxis") {
        firstLine = `Chloramphenicol 25 mg/kg IV QDS + vancomycin (AUC-guided) + co-trimoxazole IV (replaces amoxicillin for Listeria) — discuss urgently with ID`;
      } else {
        firstLine = `Ceftriaxone 2 g IV BD + dexamethasone 10 mg IV QDS (for 4 days, given before/with first dose) ± ${listeriaCover}`;
      }
      return {
        firstLine,
        rationale:
          "Ceftriaxone covers pneumococcus, meningococcus and H. influenzae with excellent CSF penetration. Amoxicillin added for Listeria in at-risk groups (cephalosporins do NOT cover Listeria). Dexamethasone reduces neurological sequelae in pneumococcal meningitis.",
        alternatives: [
          {
            trigger: "Pneumococcal resistance (returning traveller, prior abx)",
            regimen: "Add vancomycin (target trough 15–20 or AUC₂₄ 400–600) — meningeal penetration is suboptimal so high-dose required",
          },
          {
            trigger: "Suspected viral aetiology pending PCR",
            regimen: "Add aciclovir 10 mg/kg IV TDS until HSV PCR negative",
          },
        ],
        pearls: [
          "DO NOT delay antibiotics waiting for LP or imaging — give within 1 h.",
          "Take blood cultures before, but do not wait for them.",
          "Check meningococcal PCR on EDTA blood — sensitive even after antibiotics.",
          "Notify Public Health URGENTLY for meningococcal disease.",
        ],
        reviewAt: "24–48 h with CSF culture and PCR — narrow per organism, total 7 days (meningococcus) to 21 days (Listeria).",
      };
    },
  },
  {
    key: "neutropenic",
    label: "Neutropenic sepsis (febrile neutropenia)",
    shortLabel: "Neutropenic sepsis",
    bugs: "Gram-negatives (incl. Pseudomonas), CoNS, viridans Strep, Candida (prolonged neutropenia)",
    build: ({ allergy, mrsa, recentAbx }) => {
      let firstLine: string;
      if (allergy === "anaphylaxis") {
        firstLine = "Meropenem 1 g IV TDS (covers most organisms; safe in non-IgE penicillin allergy under specialist supervision)";
      } else {
        firstLine = "Piperacillin/tazobactam 4.5 g IV TDS–QDS as initial β-lactam monotherapy, given immediately (NICE CG151 requires empiric therapy immediately in suspected neutropenic sepsis); NG253's 1-hour target applies to adults at high risk of severe illness or death from sepsis";
      }
      const alternatives: Recommendation["alternatives"] = [];
      if (mrsa || recentAbx) {
        alternatives.push({
          trigger: "Suspected line infection, mucositis, MRSA colonisation or haemodynamic instability",
          regimen: "Add vancomycin (AUC-guided) or teicoplanin",
        });
      }
      alternatives.push({
        trigger: "Persistent fever > 4–7 days despite broad-spectrum antibiotics",
        regimen: "Add empirical antifungal (caspofungin or liposomal amphotericin B); CT chest/sinuses for invasive aspergillosis",
      });
      return {
        firstLine,
        rationale:
          "Empirical anti-pseudomonal β-lactam monotherapy is standard (NICE CG151). Routine aminoglycoside and routine glycopeptide cover are both explicitly not recommended without patient-specific or local microbiological indications.",
        alternatives,
        pearls: [
          "NICE NG253 times antibiotics from the first NEWS2 score on initial assessment in the emergency department or on ward deterioration: within 1 hour only for adults at high risk of severe illness or death from sepsis (recommendation 1.8.3), up to 3 hours at medium risk (1.8.17) and up to 6 hours at low risk (1.8.23). Those are maxima — once the decision to treat is made, do not delay further. Suspected neutropenic sepsis is separate: NICE CG151 requires empiric therapy immediately.",
          "Use MASCC score to identify low-risk patients suitable for outpatient oral therapy.",
          "Continue until afebrile + neutrophils > 0.5 × 10⁹/L (typically 7–10 days).",
          "G-CSF only for high-risk febrile neutropenia per ASCO criteria.",
        ],
        reviewAt: "48 h with cultures — de-escalate if organism identified, persist if culture-negative until count recovery.",
      };
    },
  },
  {
    key: "ssti",
    label: "Skin & soft tissue infection (incl. necrotising fasciitis)",
    shortLabel: "Skin/soft tissue",
    bugs: "Group A Strep, Staph aureus (incl. MRSA), Gram-negatives & anaerobes (necrotising)",
    build: ({ severity, allergy, mrsa }) => {
      let firstLine: string;
      if (severity === "mild") {
        if (allergy === "anaphylaxis") {
          firstLine = mrsa
            ? "Doxycycline 100 mg PO BD or co-trimoxazole 960 mg PO BD"
            : "Clarithromycin 500 mg PO BD";
        } else {
          firstLine = mrsa
            ? "Doxycycline 100 mg PO BD (cover MRSA)"
            : "Flucloxacillin 500 mg–1 g PO QDS";
        }
      } else if (severity === "severe") {
        // Necrotising or septic
        if (allergy === "anaphylaxis") {
          firstLine = "Meropenem 1 g IV TDS + clindamycin 1.2 g IV QDS + vancomycin (AUC-guided) — SURGICAL EMERGENCY";
        } else {
          firstLine = "Piperacillin/tazobactam 4.5 g IV QDS + clindamycin 1.2 g IV QDS (toxin suppression) + vancomycin or linezolid (MRSA cover) — SURGICAL EMERGENCY";
        }
      } else {
        firstLine = "Flucloxacillin 1–2 g IV QDS";
      }
      const alternatives: Recommendation["alternatives"] = [];
      if (severity === "severe") {
        alternatives.push({
          trigger: "Confirmed Group A Strep / streptococcal toxic shock",
          regimen: "Benzylpenicillin 2.4 g IV 4-hourly + clindamycin 1.2 g IV QDS + IVIG 2 g/kg single dose",
        });
      }
      return {
        firstLine,
        rationale:
          "Most cellulitis is streptococcal — flucloxacillin covers both Strep and methicillin-sensitive Staph. Clindamycin in severe/necrotising disease suppresses exotoxin production (Eagle effect) AND penetrates ischaemic tissue where β-lactams fail.",
        alternatives,
        pearls: [
          "Necrotising fasciitis: pain OUT OF PROPORTION to skin findings, crepitus, rapid spread, systemic toxicity → urgent surgical exploration.",
          "Mark the leading edge of cellulitis; expect ~24 h before regression.",
          "Elevation, analgesia and treating tinea pedis prevent recurrence.",
          "LRINEC score has poor sensitivity — don't use to exclude necrotising fasciitis.",
        ],
        reviewAt: "48 h — failure to improve suggests deeper infection or resistant organism; consider surgical review.",
      };
    },
  },
];

const EmpiricalSepsisChooser = () => {
  const [source, setSource] = useState<SourceKey>("cap");
  const [severity, setSeverity] = useState<Severity>("severe");
  const [allergy, setAllergy] = useState<Allergy>("none");
  const [renal, setRenal] = useState<Renal>("normal");
  const [mrsa, setMrsa] = useState(false);
  const [recentAbx, setRecentAbx] = useState(false);

  const activeSource = SOURCES.find((s) => s.key === source)!;
  const rec = useMemo(
    () => activeSource.build({ severity, allergy, renal, mrsa, recentAbx }),
    [activeSource, severity, allergy, renal, mrsa, recentAbx],
  );

  return (
    <DiagramFigure
      id="empirical-sepsis-chooser"
      title="Empirical sepsis chooser"
      description="Empirical sepsis antibiotic chooser for adults (16+) who are not pregnant. Pick suspected source + patient factors → suggested empirical regimen drawing on NICE NG250, NICE CG151, NICE NG253, the BNF and ATS/IDSA 2019."
    >
                  <div className="rounded-xl border border-border bg-card p-4 my-6">
        <h3 className="text-lg font-semibold text-foreground">
          Empirical sepsis antibiotic chooser
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Pick the suspected source and patient factors to see a suggested empirical regimen, with alternatives and clinical pearls. Sources are listed under the output — local antibiogram, allergy testing and microbiology advice always supersede.
        </p>
        <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-2.5 mb-4">
          <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">Scope</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            Adults aged 16 or over who are not pregnant. Paediatric (NICE NG254) and pregnancy (NICE NG255) pathways are
            not modelled here, and none of these adult doses is evidence for those groups. Doses are teaching examples from
            the cited adult guidance and the BNF; confirm them against local antimicrobial policy and the product SmPC.
          </p>
        </div>
  
        {/* Source selector */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wide font-semibold text-foreground mb-2">
            Suspected source
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
            {SOURCES.map((s) => (
              <button
                key={s.key}
                onClick={() => setSource(s.key)}
                className="text-[11px] px-2 py-1.5 rounded border text-center transition-all"
                style={{
                  backgroundColor: source === s.key ? "hsl(var(--primary) / 0.15)" : "hsl(var(--background))",
                  borderColor: source === s.key ? "hsl(var(--primary))" : "hsl(var(--border))",
                  color: source === s.key ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                  fontWeight: source === s.key ? 600 : 500,
                  borderWidth: source === s.key ? 2 : 1,
                }}
              >
                {s.shortLabel}
              </button>
            ))}
          </div>
        </div>
  
        {/* Patient factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {/* Severity */}
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1.5">Severity</p>
            <div className="flex gap-1.5">
              {(["mild", "severe"] as Severity[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSeverity(s)}
                  className="flex-1 text-xs px-2 py-1.5 rounded border transition-all capitalize"
                  style={{
                    backgroundColor: severity === s ? "hsl(var(--primary) / 0.15)" : "hsl(var(--card))",
                    borderColor: severity === s ? "hsl(var(--primary))" : "hsl(var(--border))",
                    color: severity === s ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    fontWeight: severity === s ? 600 : 500,
                  }}
                >
                  {s === "mild" ? "Mild / outpatient" : "Severe / septic shock"}
                </button>
              ))}
            </div>
          </div>
  
          {/* Penicillin allergy */}
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1.5">Penicillin allergy</p>
            <div className="flex gap-1.5">
              {(["none", "non-severe", "anaphylaxis"] as Allergy[]).map((a) => (
                <button
                  key={a}
                  onClick={() => setAllergy(a)}
                  className="flex-1 text-xs px-2 py-1.5 rounded border transition-all capitalize"
                  style={{
                    backgroundColor: allergy === a ? "hsl(var(--primary) / 0.15)" : "hsl(var(--card))",
                    borderColor: allergy === a ? "hsl(var(--primary))" : "hsl(var(--border))",
                    color: allergy === a ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    fontWeight: allergy === a ? 600 : 500,
                  }}
                >
                  {a === "none" ? "None" : a === "non-severe" ? "Rash only" : "Anaphylaxis"}
                </button>
              ))}
            </div>
          </div>
  
          {/* Renal */}
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1.5">Renal function</p>
            <div className="flex gap-1.5">
              {(["normal", "impaired"] as Renal[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRenal(r)}
                  className="flex-1 text-xs px-2 py-1.5 rounded border transition-all"
                  style={{
                    backgroundColor: renal === r ? "hsl(var(--primary) / 0.15)" : "hsl(var(--card))",
                    borderColor: renal === r ? "hsl(var(--primary))" : "hsl(var(--border))",
                    color: renal === r ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    fontWeight: renal === r ? 600 : 500,
                  }}
                >
                  {r === "normal" ? "Normal (CrCl ≥ 30)" : "Impaired (CrCl < 30)"}
                </button>
              ))}
            </div>
          </div>
  
          {/* Risk factor toggles */}
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1.5">Risk factors</p>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={mrsa}
                  onChange={(e) => setMrsa(e.target.checked)}
                  className="rounded border-border accent-primary"
                />
                <span className="text-foreground">MRSA risk (colonised, dialysis, recent MRSA infection)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={recentAbx}
                  onChange={(e) => setRecentAbx(e.target.checked)}
                  className="rounded border-border accent-primary"
                />
                <span className="text-foreground">Recent broad-spectrum antibiotics or hospitalisation (&lt; 90 days)</span>
              </label>
            </div>
          </div>
        </div>
  
        {/* Recommendation panel */}
        <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-4">
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
            <p className="text-xs uppercase tracking-wide font-semibold text-primary">
              Suggested empirical regimen — {activeSource.shortLabel}
            </p>
            <p className="text-[10px] text-muted-foreground italic">Likely organisms: {activeSource.bugs}</p>
          </div>
  
          <div className="rounded-md bg-background border border-primary/30 p-3">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1">First-line</p>
            <p className="text-sm font-semibold text-foreground leading-snug">{rec.firstLine}</p>
          </div>

          {renal === "impaired" && (
            <div className="mt-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-2.5">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">
                Renal impairment (CrCl &lt; 30 ml/min) — not verified here
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                {activeSource.key === "hap"
                  ? "The CrCl modification listed below is a BNF-derived teaching example, not a NICE NG250 statement."
                  : "The regimen above is the standard adult dose and is not renally adjusted in this tool."}{" "}
                Piperacillin/tazobactam, meropenem, co-amoxiclav, ciprofloxacin, vancomycin and gentamicin all need
                review against the BNF or SmPC before prescribing.
              </p>
            </div>
          )}
  
          <div className="mt-3 rounded-md bg-background/60 border border-border p-2.5">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">Rationale</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{rec.rationale}</p>
          </div>
  
          {rec.alternatives.length > 0 && (
            <div className="mt-3">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground mb-1.5">Modifications</p>
              <div className="space-y-1.5">
                {rec.alternatives.map((a, i) => (
                  <div key={i} className="rounded-md border-l-2 border-primary/50 bg-background/60 p-2.5">
                    <p className="text-[11px] font-semibold text-primary">{a.trigger}</p>
                    <p className="text-xs text-foreground mt-0.5 leading-snug">{a.regimen}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
  
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div className="rounded-md bg-background/60 border border-border p-2.5">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">Clinical pearls</p>
              <ul className="mt-1 space-y-1">
                {rec.pearls.map((pearl, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-snug flex gap-1.5">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{pearl}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md bg-background/60 border border-border p-2.5">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">Review point</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{rec.reviewAt}</p>
            </div>
          </div>
        </div>
  
        {/* Sepsis-6 reminder */}
        <div className="mt-3 rounded-md bg-destructive/10 border border-destructive/30 p-2.5">
          <p className="text-[11px] uppercase tracking-wide font-semibold text-destructive">
            Sepsis bundle — the antibiotic clock depends on risk
          </p>
          <p className="text-xs text-foreground mt-0.5 leading-snug">
            <span className="font-semibold">Take 3:</span> blood cultures · lactate · urine output ·
            <span className="font-semibold"> Give 3:</span> oxygen to a target saturation of 94–98% (88–92% if at risk of
            hypercapnic respiratory failure) · IV broad-spectrum antibiotics · IV fluid bolus. Antibiotics within 1 hour
            apply to adults at high risk of severe illness or death from sepsis, timed from the first NEWS2 score; medium
            risk allows up to 3 hours and low risk up to 6 hours, and suspected neutropenic sepsis is treated immediately.
            Source control as soon as feasible.
          </p>
        </div>

        {/* Source-specific provenance */}
        <div className="mt-3 rounded-md border border-border bg-background/60 p-2.5">
          <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">
            Sources for these outputs
          </p>
          <ul className="mt-1 space-y-1 text-xs text-muted-foreground leading-snug">
            <li>
              Community- and hospital-acquired pneumonia:{" "}
              <a
                className="underline"
                href="https://www.nice.org.uk/guidance/ng250/chapter/Recommendations"
                target="_blank"
                rel="noreferrer"
              >
                NICE NG250 (2025), tables 1 and 3
              </a>
              .
            </li>
            <li>
              Neutropenic sepsis:{" "}
              <a
                className="underline"
                href="https://www.nice.org.uk/guidance/cg151/chapter/Recommendations"
                target="_blank"
                rel="noreferrer"
              >
                NICE CG151
              </a>{" "}
              — β-lactam monotherapy with piperacillin/tazobactam; no routine aminoglycoside or glycopeptide.
            </li>
            <li>
              Antibiotic timing for adults aged 16 or over:{" "}
              <a
                className="underline"
                href="https://www.nice.org.uk/guidance/ng253/chapter/Antibiotic-therapy-intravenous-fluid-and-oxygen"
                target="_blank"
                rel="noreferrer"
              >
                NICE NG253
              </a>{" "}
              — within 1 hour of the first NEWS2 score for high risk of severe illness or death (1.8.3), up to 3 hours at
              medium risk (1.8.17), up to 6 hours at low risk (1.8.23); oxygen to 94–98% (1.10.1).
            </li>
            <li>
              MRSA/Pseudomonas risk in CAP (HCAP abandoned):{" "}
              <a
                className="underline"
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6812437/"
                target="_blank"
                rel="noreferrer"
              >
                ATS/IDSA 2019
              </a>
              .
            </li>
            <li>
              <strong className="text-foreground">Not source-backed here:</strong> the intra-abdominal, urinary, meningitic
              and skin/soft-tissue regimens, their allergy alternatives, and every renal dose adjustment except the
              hospital-acquired pneumonia one are teaching examples compiled from the BNF and standard UK practice. They are
              not quoted from NG250, CG151 or NG253 and were not re-verified against a primary guideline in this review —
              treat them as unverified selections and confirm with local antimicrobial policy or a microbiologist.
            </li>
          </ul>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default EmpiricalSepsisChooser;
