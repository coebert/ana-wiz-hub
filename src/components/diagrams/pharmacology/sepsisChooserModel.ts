/**
 * Empirical sepsis antibiotic chooser — decision model.
 *
 * ADULTS (16+) WHO ARE NOT PREGNANT only. Paediatric (NICE NG254) and
 * pregnancy (NICE NG255) pathways are not modelled.
 *
 * Every active recommendation is quoted from, and linked to, the exact
 * supporting recommendation of an adult guideline: NICE NG250 (2025) tables 1
 * and 3 for community- and hospital-acquired pneumonia, NICE CG151 for
 * neutropenic sepsis, and ATS/IDSA 2019 for the MRSA/hospital-acquired
 * pneumonia risk-factor statements.
 *
 * Any selection this review could not trace to such a recommendation is HELD:
 * it returns no dose, no regimen and no alternative, and the figure shows the
 * sources to consult instead. Held selections are the intra-abdominal, urinary,
 * meningitic and skin/soft-tissue indications, every renal-impairment
 * selection, the hospital-acquired-pneumonia MRSA path and the neutropenic
 * penicillin-allergy path.
 *
 * Educational tool only — local antibiogram, allergy assessment, microbiology
 * advice and the product SmPC always supersede.
 */

export type SourceKey = "cap" | "hap" | "ia" | "uro" | "meningitis" | "neutropenic" | "ssti";

export type Severity = "mild" | "severe";
export type Renal = "normal" | "impaired"; // CrCl <30 ml/min
export type Allergy = "none" | "non-severe" | "anaphylaxis";

export interface ChooserInput {
  severity: Severity;
  allergy: Allergy;
  renal: Renal;
  mrsa: boolean;
  recentAbx: boolean;
}

export interface SourceCitation {
  /** Short source label, e.g. "NICE NG250 (2025), table 1". */
  label: string;
  /** The exact recommendation the active regimen is quoted from. */
  recommendation: string;
  href: string;
}

export type ChooserOutcome =
  | {
      held: true;
      /** Why this selection is held. */
      reason: string;
      /** Teaching that does not depend on the held regimen. */
      teaching: string[];
      /** Where to go instead. */
      consult: string[];
    }
  | {
      held: false;
      firstLine: string;
      rationale: string;
      alternatives: { trigger: string; regimen: string }[];
      pearls: string[];
      reviewAt: string;
      citation: SourceCitation;
    };

export interface SourceDefinition {
  key: SourceKey;
  label: string;
  shortLabel: string;
  bugs: string;
  build: (input: ChooserInput) => ChooserOutcome;
}

const NG250_URL = "https://www.nice.org.uk/guidance/ng250/chapter/Recommendations";
const CG151_URL = "https://www.nice.org.uk/guidance/cg151/chapter/Recommendations";

const CONSULT = [
  "Your local antimicrobial policy and local resistance data",
  "The local microbiologist or infectious diseases service",
  "The product SmPC for whichever agent your local policy selects",
];

const heldRenal = (indication: string): ChooserOutcome => ({
  held: true,
  reason: `No renal dose adjustment is generated for ${indication}. NICE NG250 directs renal dosing to the BNF without giving figures, and this tool holds no traceable monograph for any of these agents — so the standard adult dose is not shown as though it applied at CrCl < 30 ml/min.`,
  teaching: [],
  consult: CONSULT,
});

const heldIndication = (indication: string, teaching: string[]): ChooserOutcome => ({
  held: true,
  reason: `${indication} was previously shown here as a teaching example compiled from standard UK practice. It could not be traced to a primary guideline or a traceable monograph in this review, so no dose, regimen or alternative is generated for this selection.`,
  teaching,
  consult: CONSULT,
});

export const SOURCES: SourceDefinition[] = [
  {
    key: "cap",
    label: "Community-acquired pneumonia (CAP)",
    shortLabel: "CAP",
    bugs: "Strep pneumoniae, H. influenzae, Mycoplasma, Legionella, Chlamydophila, Moraxella",
    build: ({ severity, allergy, renal, mrsa, recentAbx }) => {
      if (renal === "impaired") return heldRenal("community-acquired pneumonia");

      const alternatives: { trigger: string; regimen: string }[] = [];
      if (mrsa) {
        alternatives.push({
          trigger: "MRSA risk with locally validated risk factors",
          regimen:
            "Add MRSA cover (vancomycin or linezolid) only when locally validated risk factors are present — ATS/IDSA 2019. No dose is generated here; use local policy or the product SmPC.",
        });
      }
      if (recentAbx) {
        alternatives.push({
          trigger: "Recent broad-spectrum antibiotics or hospitalisation",
          regimen:
            "Not an automatic indication for broad-spectrum escalation: review recent microbiology and local resistance data with the antimicrobial policy or microbiologist. ATS/IDSA 2019 abandoned the former HCAP pattern because it increased broad-spectrum use without improving outcomes.",
        });
      }

      if (severity === "mild") {
        const penicillinAllergy = allergy !== "none";
        return {
          held: false,
          firstLine: penicillinAllergy
            ? "Doxycycline 200 mg PO on day 1, then 100 mg PO once a day for 4 days (5-day course in total)"
            : "Amoxicillin 500 mg PO three times a day for 5 days (higher doses can be used)",
          rationale: penicillinAllergy
            ? "NG250 lists doxycycline as the low-severity oral alternative for penicillin allergy. The guideline does not separate a rash-only reaction from anaphylaxis, so the allergy history and local advice decide whether a β-lactam is still appropriate — this tool does not make that call."
            : "Strep pneumoniae remains the dominant pathogen and amoxicillin covers it. NG250 adds a macrolide only when atypical pathogens are suspected.",
          alternatives,
          pearls: [
            "Use CRB-65 in primary care and CURB-65 in hospital to grade severity.",
            "NG250: consider stopping antibiotics after 5 days unless the patient is not clinically stable or microbiology suggests a longer course.",
          ],
          reviewAt:
            "Review at 5 days with cultures and clinical status — NG250 stops treatment then if the patient is stable.",
          citation: {
            label: penicillinAllergy
              ? "NICE NG250 (2025), table 1 — low-severity disease: alternative oral antibiotics for penicillin allergy"
              : "NICE NG250 (2025), table 1 — low-severity disease: first-line oral antibiotic",
            recommendation: penicillinAllergy
              ? "Doxycycline: 200 mg on first day, then 100 mg once a day for 4 days (5-day course in total)."
              : "Amoxicillin: 500 mg three times a day (higher doses can be used; see the BNF) for 5 days.",
            href: NG250_URL,
          },
        };
      }

      const penicillinAllergy = allergy !== "none";
      return {
        held: false,
        firstLine: penicillinAllergy
          ? "Levofloxacin 500 mg PO/IV twice a day for 5 days — consult a local microbiologist if a fluoroquinolone is not appropriate"
          : "Co-amoxiclav 1.2 g IV three times a day + clarithromycin 500 mg IV twice a day, for 5 days",
        rationale: penicillinAllergy
          ? "NG250's high-severity alternative for penicillin allergy is levofloxacin. It does not separate a rash-only reaction from anaphylaxis, and the MHRA advises restricting fluoroquinolones to people in whom other commonly recommended antibiotics are inappropriate — so the allergy history and microbiology advice come first."
          : "A β-lactam covers Strep pneumoniae and a macrolide adds atypical cover (Legionella, Mycoplasma) in severe disease.",
        alternatives,
        pearls: [
          "Use CURB-65 in hospital to grade severity.",
          "NG250: send urine for pneumococcal and Legionella antigen in moderate- or high-severity disease.",
          "NG250: consider stopping antibiotics after 5 days unless the patient is not clinically stable or microbiology suggests a longer course.",
        ],
        reviewAt:
          "48 h with cultures and biomarker trend — narrow per sensitivities; NG250 stops treatment at 5 days if the patient is stable.",
        citation: {
          label: penicillinAllergy
            ? "NICE NG250 (2025), table 1 — high-severity disease: alternative antibiotic for penicillin allergy"
            : "NICE NG250 (2025), table 1 — high-severity disease: first-line antibiotics",
          recommendation: penicillinAllergy
            ? "High-severity disease: alternative antibiotic for penicillin allergy (consult a local microbiologist if fluoroquinolone not appropriate). Levofloxacin: 500 mg twice a day orally or intravenously for 5 days."
            : "Co-amoxiclav: 500/125 mg three times a day orally or 1.2 g three times a day intravenously for 5 days, with clarithromycin 500 mg twice a day orally or intravenously for 5 days.",
          href: NG250_URL,
        },
      };
    },
  },
  {
    key: "hap",
    label: "Hospital-acquired / ventilator-associated pneumonia (HAP/VAP)",
    shortLabel: "HAP/VAP",
    bugs: "Pseudomonas, Klebsiella, E. coli, Enterobacter, Acinetobacter, Staph aureus (incl. MRSA)",
    build: ({ severity, allergy, renal, mrsa, recentAbx }) => {
      if (renal === "impaired") return heldRenal("hospital-acquired pneumonia");
      if (mrsa) {
        return {
          held: true,
          reason:
            "NICE NG250 table 3 includes additional treatment for suspected or confirmed MRSA infection. This risk-factor toggle cannot establish that indication or select a suitable agent and monitoring plan. No regimen is generated for this selection; consult table 3 and local microbiology advice.",
          teaching: [
            "NG250 1.7.3: base the choice on severity, days in hospital before onset, local ward resistance data, recent antibiotics and recent microbiology — including colonisation with multidrug-resistant bacteria.",
            "NG250 1.7.5: review treatment after a total of 5 days and consider stopping if clinically stable.",
          ],
          consult: CONSULT,
        };
      }

      const higherResistance = severity === "severe" || recentAbx;
      const alternatives: { trigger: string; regimen: string }[] = [];
      if (recentAbx && severity !== "severe") {
        alternatives.push({
          trigger: "Recent broad-spectrum antibiotics (< 90 days)",
          regimen:
            "NG250 1.7.2 treats recent broad-spectrum antibiotic use as a higher risk of resistance, so the higher-resistance row of table 3 applies rather than a switch to a carbapenem on its own.",
        });
      }

      if (allergy !== "none") {
        return {
          held: false,
          firstLine: higherResistance
            ? "Levofloxacin 500 mg IV once or twice a day (higher dose if severe infection) — only if other first-line antibiotics are unsuitable; off-label for hospital-acquired pneumonia"
            : "Doxycycline 200 mg PO on day 1, then 100 mg PO once a day for 4 days (5-day course), then review",
          rationale:
            "NG250 table 3 bases the oral penicillin-allergy options on specialist microbiological advice and local resistance data. For severe disease or a higher risk of resistance its fluoroquinolone option is restricted to people in whom other first-line antibiotics are unsuitable, and the MHRA advises avoiding coadministration with a corticosteroid.",
          alternatives,
          pearls: [
            "NG250 table 3 lists oral options including doxycycline, cefalexin (caution in penicillin allergy), co-trimoxazole and levofloxacin — the last only when switching from intravenous levofloxacin.",
            "NG250 1.7.3: base the choice on severity, local ward resistance data, recent antibiotics and recent microbiology.",
            "NG250 1.7.5: review treatment after a total of 5 days and consider stopping if clinically stable.",
          ],
          reviewAt:
            "48–72 h with respiratory cultures — narrow to a single agent on sensitivities; NG250 reviews the total course at 5 days.",
          citation: {
            label: higherResistance
              ? "NICE NG250 (2025), table 3 — severe symptoms or higher risk of resistance: first-line intravenous antibiotics"
              : "NICE NG250 (2025), table 3 — non-severe, not at higher risk of resistance: alternative oral antibiotics for penicillin allergy",
            recommendation: higherResistance
              ? "Levofloxacin (only if other first-line antibiotics are unsuitable; off-label use): 500 mg once or twice a day (use higher dosage if severe infection)."
              : "Options include: doxycycline 200 mg on first day, then 100 mg once a day for 4 days (5-day course) then review.",
            href: NG250_URL,
          },
        };
      }

      return {
        held: false,
        firstLine: higherResistance
          ? "Piperacillin/tazobactam 4.5 g IV three times a day (increased to 4.5 g four times a day if severe infection)"
          : "Co-amoxiclav 500/125 mg PO three times a day for 5 days, then review",
        rationale: higherResistance
          ? "NG250 table 3 bases the intravenous choice on specialist microbiological advice and local resistance data; it lists ceftazidime, ceftriaxone, cefuroxime, meropenem, ceftazidime with avibactam and levofloxacin as alternatives to piperacillin/tazobactam."
          : "Non-severe hospital-acquired pneumonia without a higher risk of resistance is treated with oral co-amoxiclav and reviewed at 5 days.",
        alternatives,
        pearls: [
          "NG250 1.7.3: base the choice on severity, local ward resistance data, recent antibiotics and recent microbiology.",
          "NG250 table 3 also lists ceftazidime, ceftriaxone, cefuroxime, meropenem and ceftazidime with avibactam for severe disease or a higher risk of resistance.",
          "NG250 1.7.5: review treatment after a total of 5 days and consider stopping if clinically stable.",
        ],
        reviewAt:
          "48–72 h with respiratory cultures — narrow to a single agent on sensitivities; NG250 reviews the total course at 5 days.",
        citation: {
          label: higherResistance
            ? "NICE NG250 (2025), table 3 — severe symptoms or higher risk of resistance: first-line intravenous antibiotics"
            : "NICE NG250 (2025), table 3 — non-severe, not at higher risk of resistance: first-line oral antibiotic",
          recommendation: higherResistance
            ? "Options include piperacillin with tazobactam: 4.5 g three times a day (increased to 4.5 g four times a day if severe infection)."
            : "Co-amoxiclav: 500/125 mg three times a day for 5 days then review.",
          href: NG250_URL,
        },
      };
    },
  },
  {
    key: "ia",
    label: "Intra-abdominal sepsis",
    shortLabel: "Intra-abdominal",
    bugs: "E. coli, Klebsiella, Enterococcus, Bacteroides fragilis, anaerobes",
    build: () =>
      heldIndication("Intra-abdominal sepsis", [
        "Likely organisms are polymicrobial — Enterobacterales plus anaerobes.",
        "Source control (surgical or radiological drainage) is the priority; antibiotics buy time only.",
      ]),
  },
  {
    key: "uro",
    label: "Urosepsis / pyelonephritis",
    shortLabel: "Urosepsis",
    bugs: "E. coli (>70%), Klebsiella, Proteus, Enterococcus, Pseudomonas (catheter/recurrent)",
    build: () =>
      heldIndication("Urosepsis and pyelonephritis", [
        "E. coli dominates. Send urine and blood cultures before the first dose.",
        "Image within 24 h if there is no clinical improvement — look for obstruction or abscess.",
      ]),
  },
  {
    key: "meningitis",
    label: "Bacterial meningitis",
    shortLabel: "Meningitis",
    bugs: "S. pneumoniae, N. meningitidis, Listeria (>50 y, immunocompromised, pregnant), H. influenzae",
    build: () =>
      heldIndication("Bacterial meningitis", [
        "Do not delay antibiotics for lumbar puncture or imaging.",
        "Take blood cultures before antibiotics, but do not wait for them, and notify Public Health urgently for meningococcal disease.",
        "Listeria cover is needed in people over 50, pregnant or immunocompromised — cephalosporins do not cover Listeria.",
      ]),
  },
  {
    key: "neutropenic",
    label: "Neutropenic sepsis (febrile neutropenia)",
    shortLabel: "Neutropenic sepsis",
    bugs: "Gram-negatives (incl. Pseudomonas), CoNS, viridans Strep, Candida (prolonged neutropenia)",
    build: ({ allergy, renal }) => {
      if (renal === "impaired") return heldRenal("neutropenic sepsis");
      if (allergy !== "none") {
        return {
          held: true,
          reason:
            "NICE CG151 names piperacillin/tazobactam as the initial empiric β-lactam and gives no allergy alternative, only 'unless there are patient-specific or local microbiological contraindications' (1.4.3.1). No substitute regimen is generated for this selection.",
          teaching: [
            "Treat suspected neutropenic sepsis as an acute medical emergency and offer empiric antibiotic therapy immediately (CG151 1.4.1.1).",
            "Do not offer an aminoglycoside for initial empiric treatment unless there are patient-specific or local microbiological indications (CG151 1.4.3.2).",
            "Do not offer empiric glycopeptide antibiotics to patients with central venous access devices unless there are patient-specific or local microbiological indications (CG151 1.4.3.3).",
          ],
          consult: CONSULT,
        };
      }
      return {
        held: false,
        firstLine:
          "Piperacillin/tazobactam as initial empiric β-lactam monotherapy, offered immediately. CG151 specifies the agent, not the dose — use the dose in your local policy.",
        rationale:
          "NICE CG151 recommends β-lactam monotherapy with piperacillin/tazobactam unless there are patient-specific or local microbiological contraindications. Routine aminoglycoside and routine glycopeptide cover are both explicitly not recommended without such indications.",
        alternatives: [],
        pearls: [
          "CG151 1.4.1.1: treat suspected neutropenic sepsis as an acute medical emergency and offer empiric antibiotic therapy immediately.",
          "CG151 1.4.3.2: do not offer an aminoglycoside, as monotherapy or dual therapy, for initial empiric treatment unless there are patient-specific or local microbiological indications.",
          "CG151 1.4.3.3: do not offer empiric glycopeptides to patients with central venous access devices unless there are patient-specific or local microbiological indications.",
          "NICE NG253 times antibiotics from the first NEWS2 score on initial assessment in the emergency department or on ward deterioration: within 1 hour only for adults at high risk of severe illness or death from sepsis (recommendation 1.8.3), up to 3 hours at medium risk (1.8.17) and up to 6 hours at low risk (1.8.23). Those are maxima — once the decision to treat is made, do not delay further. Suspected neutropenic sepsis is separate: NICE CG151 requires empiric therapy immediately.",
        ],
        reviewAt:
          "Reassess with cultures and local microbiology advice; CG151 sets no fixed duration in this tool — confirm it against local policy.",
        citation: {
          label: "NICE CG151, recommendation 1.4.3.1",
          recommendation:
            "Offer beta lactam monotherapy with piperacillin with tazobactam as initial empiric antibiotic therapy to patients with suspected neutropenic sepsis who need intravenous treatment unless there are patient-specific or local microbiological contraindications.",
          href: CG151_URL,
        },
      };
    },
  },
  {
    key: "ssti",
    label: "Skin & soft tissue infection (incl. necrotising fasciitis)",
    shortLabel: "Skin/soft tissue",
    bugs: "Group A Strep, Staph aureus (incl. MRSA), Gram-negatives & anaerobes (necrotising)",
    build: () =>
      heldIndication("Skin and soft-tissue infection, including necrotising fasciitis", [
        "Necrotising fasciitis is a surgical emergency: pain out of proportion to the skin findings, crepitus, rapid spread or systemic toxicity needs urgent surgical exploration.",
        "Mark the leading edge of cellulitis and expect around 24 h before regression.",
        "The LRINEC score has poor sensitivity — do not use it to exclude necrotising fasciitis.",
      ]),
  },
];

export const buildRecommendation = (key: SourceKey, input: ChooserInput): ChooserOutcome => {
  const source = SOURCES.find((s) => s.key === key);
  if (!source) throw new Error(`Unknown sepsis chooser source: ${key}`);
  return source.build(input);
};
