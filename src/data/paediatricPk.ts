/**
 * Paediatric pharmacokinetics for the PICU formulary.
 *
 * `cardSlug` matches the mechanism/safety/drug-card slug used in
 * src/data/icuDrugMechanisms.ts so rows can deep-link to the full drug card,
 * safety page and withdrawal guide. Drugs without a card page omit it.
 *
 * Values are typical population estimates for revision — clearance in
 * mL/kg/min (or stated units), Vd in L/kg, half-life in hours unless stated.
 * Always dose from BNFc, the SPC and local PICU guidance.
 */

export type PaedPkGroup =
  | "Sedation & analgesia"
  | "Neuromuscular blockers"
  | "Cardiovascular"
  | "Neuro & anticonvulsants"
  | "Antimicrobials & other";

export interface PaedPkBand {
  /** Age band label, e.g. "Neonate (term, 0-28 d)". */
  band: string;
  /** Clearance with units. */
  clearance: string;
  /** Volume of distribution, L/kg. */
  vd: string;
  /** Elimination half-life. */
  halfLife: string;
  /** Practical dosing consequence of the numbers in this band. */
  implication: string;
}

export interface PaedPkDrug {
  name: string;
  slug: string;
  group: PaedPkGroup;
  /** Card/safety/mechanism slug where a full drug card exists. */
  cardSlug?: string;
  /** Route/clearance pathway summary. */
  route: string;
  /** One-line maturation story. */
  maturation: string;
  bands: PaedPkBand[];
  /** Weight/size scaling and monitoring advice. */
  scaling: string;
  /** Relevance to weaning and withdrawal. */
  withdrawal?: string;
}

export const paediatricPkDrugs: PaedPkDrug[] = [
  {
    name: "Propofol",
    slug: "propofol",
    cardSlug: "propofol",
    group: "Sedation & analgesia",
    route: "Hepatic glucuronidation (UGT) plus significant extrahepatic (pulmonary, renal) clearance",
    maturation: "Clearance per kg is highest in toddlers and falls towards adult values through childhood; neonatal clearance is immature.",
    bands: [
      {
        band: "Neonate (term, 0–28 d)",
        clearance: "≈ 10–20 mL/kg/min",
        vd: "Vd(ss) ≈ 5–10 L/kg",
        halfLife: "Terminal 6–12 h (context-sensitive half-time long)",
        implication: "Prolonged and unpredictable effect — bolus only for intubation, avoid infusions.",
      },
      {
        band: "Infant (1–12 months)",
        clearance: "≈ 30–45 mL/kg/min",
        vd: "Vd(ss) ≈ 8–10 L/kg",
        halfLife: "3–6 h",
        implication: "Larger induction dose per kg (3–4 mg/kg) because of the big central volume.",
      },
      {
        band: "Child (1–12 years)",
        clearance: "≈ 30–40 mL/kg/min",
        vd: "Vd(ss) ≈ 5–9 L/kg",
        halfLife: "2–4 h",
        implication: "Highest per-kg maintenance requirement; TCI models (Kataria, Paedfusor) are age-specific.",
      },
      {
        band: "Adolescent / adult",
        clearance: "≈ 20–30 mL/kg/min",
        vd: "Vd(ss) ≈ 4 L/kg",
        halfLife: "2–4 h",
        implication: "Approaching adult dosing — reduce per-kg rate as size increases.",
      },
    ],
    scaling: "Scale clearance allometrically (weight^0.75), not linearly; per-kg rates therefore fall as the child grows.",
    withdrawal: "Not used for prolonged PICU sedation (propofol infusion syndrome risk) — wean over hours, not days.",
  },
  {
    name: "Midazolam",
    slug: "midazolam",
    cardSlug: "midazolam",
    group: "Sedation & analgesia",
    route: "CYP3A4/5 to 1-hydroxymidazolam (active), then glucuronidation and renal excretion",
    maturation: "CYP3A activity is very low at birth and matures over the first 3–6 months, then exceeds adult activity per kg.",
    bands: [
      {
        band: "Preterm neonate",
        clearance: "≈ 1–2 mL/kg/min",
        vd: "≈ 1.0–1.5 L/kg",
        halfLife: "6–12 h (up to 22 h reported)",
        implication: "Accumulates rapidly; infusions cause prolonged sedation and hypotension.",
      },
      {
        band: "Term neonate",
        clearance: "≈ 1.8–3 mL/kg/min",
        vd: "≈ 1.0–1.5 L/kg",
        halfLife: "4–6 h",
        implication: "Use the lowest effective infusion rate and reassess daily.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 9–11 mL/kg/min",
        vd: "≈ 1.0–2.0 L/kg",
        halfLife: "1.5–3 h",
        implication: "Higher per-kg infusion rates needed than adults; tolerance develops within days.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 6–8 mL/kg/min",
        vd: "≈ 1.0–1.5 L/kg",
        halfLife: "2–4 h",
        implication: "Adult-like handling; renal failure allows the active metabolite to accumulate.",
      },
    ],
    scaling: "In renal failure 1-hydroxymidazolam glucuronide accumulates and prolongs sedation — reduce rate and use daily sedation holds if safe.",
    withdrawal: "After > 5 days expect withdrawal; taper by 10–20% of the peak dose daily, or convert to enteral diazepam/lorazepam and wean.",
  },
  {
    name: "Morphine",
    slug: "morphine",
    cardSlug: "morphine",
    group: "Sedation & analgesia",
    route: "Hepatic glucuronidation (UGT2B7) to M3G and active M6G; renal excretion of metabolites",
    maturation: "UGT2B7 matures over the first 3–6 months; clearance reaches adult per-kg values around 6–12 months.",
    bands: [
      {
        band: "Preterm neonate",
        clearance: "≈ 2–5 mL/kg/min",
        vd: "≈ 1.5–2.5 L/kg",
        halfLife: "7–10 h",
        implication: "Start 5–10 µg/kg/h; apnoea risk is high — continuous monitoring mandatory.",
      },
      {
        band: "Term neonate",
        clearance: "≈ 6–8 mL/kg/min",
        vd: "≈ 1.8–2.8 L/kg",
        halfLife: "6–8 h",
        implication: "Roughly one third of adult per-kg clearance — halve infusion rates.",
      },
      {
        band: "Infant (> 3 months)",
        clearance: "≈ 15–25 mL/kg/min",
        vd: "≈ 2.5–3.5 L/kg",
        halfLife: "2–4 h",
        implication: "Adult-like per-kg dosing; 10–40 µg/kg/h typical PICU infusion.",
      },
      {
        band: "Child / adolescent",
        clearance: "≈ 15–30 mL/kg/min",
        vd: "≈ 2.5–3.5 L/kg",
        halfLife: "2–3 h",
        implication: "Titrate to a validated pain score; add regional or paracetamol to spare opioid.",
      },
    ],
    scaling: "M6G accumulates in renal impairment — extend intervals and watch for late respiratory depression.",
    withdrawal: "Taper 10–20% of the peak daily dose every 24 h after > 5 days, or convert to enteral methadone; score with WAT-1.",
  },
  {
    name: "Fentanyl",
    slug: "fentanyl",
    cardSlug: "fentanyl",
    group: "Sedation & analgesia",
    route: "CYP3A4 to inactive norfentanyl; highly lipophilic with extensive tissue redistribution",
    maturation: "Clearance per kg is high in infants; context-sensitive half-time lengthens dramatically with infusion duration at any age.",
    bands: [
      {
        band: "Preterm neonate",
        clearance: "≈ 7–10 mL/kg/min",
        vd: "≈ 5–8 L/kg",
        halfLife: "6–32 h (very variable)",
        implication: "Chest-wall rigidity with rapid bolus; accumulates markedly with infusion.",
      },
      {
        band: "Term neonate",
        clearance: "≈ 10–15 mL/kg/min",
        vd: "≈ 5–8 L/kg",
        halfLife: "5–10 h",
        implication: "Raised intra-abdominal pressure reduces hepatic flow and clearance further.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 15–30 mL/kg/min",
        vd: "≈ 3–6 L/kg",
        halfLife: "2–5 h",
        implication: "Fast onset and short single-dose effect, but tolerance develops within 3–5 days.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 10–20 mL/kg/min",
        vd: "≈ 4 L/kg",
        halfLife: "3–6 h",
        implication: "Prolonged infusion saturates fat stores — offset is measured in hours to days.",
      },
    ],
    scaling: "Dose lipophilic opioids on lean body weight in obesity; after long infusions expect offset governed by the context-sensitive half-time, not the terminal half-life.",
    withdrawal: "Highest withdrawal risk of the opioids after 5–7 days; convert to morphine or methadone before weaning rather than stopping abruptly.",
  },
  {
    name: "Ketamine",
    slug: "ketamine",
    cardSlug: "ketamine",
    group: "Sedation & analgesia",
    route: "CYP3A4/CYP2B6 to norketamine (about one third potency), then glucuronidation",
    maturation: "Neonatal clearance is roughly half the older-child value; adult per-kg clearance reached by about 1 year.",
    bands: [
      {
        band: "Neonate",
        clearance: "≈ 10–15 mL/kg/min",
        vd: "≈ 3 L/kg",
        halfLife: "3–5 h",
        implication: "Prolonged effect; useful when haemodynamic stability matters.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 15–25 mL/kg/min",
        vd: "≈ 2–3 L/kg",
        halfLife: "2–3 h",
        implication: "IM bioavailability high (93%); oral/rectal routes have heavy first-pass loss.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 15–20 mL/kg/min",
        vd: "≈ 2–3 L/kg",
        halfLife: "2–3 h",
        implication: "Emergence phenomena more common — consider a benzodiazepine and quiet recovery.",
      },
    ],
    scaling: "Norketamine accumulates during long infusions and in renal impairment, prolonging sedation after stopping.",
    withdrawal: "Often used to cover opioid weans; taper over 24–48 h to avoid a rebound in distress.",
  },
  {
    name: "Dexmedetomidine",
    slug: "dexmedetomidine",
    cardSlug: "dexmedetomidine",
    group: "Sedation & analgesia",
    route: "Hepatic glucuronidation and CYP2A6; renal excretion of metabolites",
    maturation: "Clearance is around one third of adult per-kg values at birth and matures over the first year.",
    bands: [
      {
        band: "Neonate",
        clearance: "≈ 3–6 mL/kg/min",
        vd: "≈ 1.5–2.5 L/kg",
        halfLife: "3–4 h",
        implication: "Start at the lowest rate (0.2 µg/kg/h); bradycardia is the limiting effect.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 10–15 mL/kg/min",
        vd: "≈ 1.5–2.5 L/kg",
        halfLife: "1.5–2.5 h",
        implication: "0.2–1.4 µg/kg/h typical; useful for extubation and delirium-sparing sedation.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 8–12 mL/kg/min",
        vd: "≈ 1.3–2.5 L/kg",
        halfLife: "2–3 h",
        implication: "Loading doses cause transient hypertension then hypotension — usually omitted in PICU.",
      },
    ],
    scaling: "Hepatic impairment prolongs clearance substantially — reduce the rate; renal impairment matters less.",
    withdrawal: "After > 3 days abrupt cessation causes rebound tachycardia, hypertension and agitation — wean by 0.1–0.2 µg/kg/h every 6–12 h or bridge to clonidine.",
  },
  {
    name: "Clonidine",
    slug: "clonidine",
    cardSlug: "clonidine",
    group: "Sedation & analgesia",
    route: "50% hepatic metabolism, 50% renal excretion unchanged",
    maturation: "Neonatal clearance is reduced with a longer half-life; renal function drives the difference.",
    bands: [
      {
        band: "Neonate",
        clearance: "Reduced (≈ 2–4 mL/kg/min)",
        vd: "≈ 2–3 L/kg",
        halfLife: "10–24 h",
        implication: "Accumulation with regular dosing — extend intervals.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 5–8 mL/kg/min",
        vd: "≈ 2–5 L/kg",
        halfLife: "6–12 h",
        implication: "Oral 1–5 µg/kg 6-hourly is a standard withdrawal adjunct.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 3–5 mL/kg/min",
        vd: "≈ 2–4 L/kg",
        halfLife: "8–16 h",
        implication: "Watch for bradycardia and hypotension when combined with dexmedetomidine.",
      },
    ],
    scaling: "Reduce dose in renal impairment because half the drug is renally cleared unchanged.",
    withdrawal: "Stopping abruptly causes rebound hypertension — wean over 3–5 days once other sedatives are off.",
  },
  {
    name: "Lorazepam",
    slug: "lorazepam",
    cardSlug: "lorazepam",
    group: "Sedation & analgesia",
    route: "Direct glucuronidation (no CYP oxidation) to an inactive conjugate",
    maturation: "Conjugation is relatively spared in neonates, so handling is more predictable than midazolam.",
    bands: [
      {
        band: "Neonate",
        clearance: "≈ 0.6–1.0 mL/kg/min",
        vd: "≈ 1.0–1.5 L/kg",
        halfLife: "20–40 h",
        implication: "Very long-acting — single doses for seizures rather than infusions.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 1.2–1.8 mL/kg/min",
        vd: "≈ 1.0–1.5 L/kg",
        halfLife: "10–16 h",
        implication: "0.1 mg/kg (max 4 mg) for status epilepticus; useful enteral wean agent.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 1.0–1.5 mL/kg/min",
        vd: "≈ 1.3 L/kg",
        halfLife: "12–18 h",
        implication: "Propylene glycol accumulation with high-dose IV infusion — check osmolar gap and lactate.",
      },
    ],
    scaling: "Not dependent on CYP maturity, so predictable in liver disease; avoid prolonged IV infusions.",
    withdrawal: "Long half-life makes it a good bridge for midazolam weans — reduce by 10–20% every 24–48 h.",
  },
  {
    name: "Rocuronium",
    slug: "rocuronium",
    cardSlug: "rocuronium",
    group: "Neuromuscular blockers",
    route: "Largely unchanged biliary/hepatic elimination, small renal component",
    maturation: "Neonates have a larger extracellular volume and immature junction, so duration is prolonged despite similar dose.",
    bands: [
      {
        band: "Neonate",
        clearance: "≈ 3–4 mL/kg/min",
        vd: "≈ 0.4–0.6 L/kg",
        halfLife: "1.5–2.5 h",
        implication: "Onset faster and duration up to twice as long as in children.",
      },
      {
        band: "Infant",
        clearance: "≈ 4–5 mL/kg/min",
        vd: "≈ 0.3–0.5 L/kg",
        halfLife: "1.0–1.5 h",
        implication: "0.6 mg/kg gives 30–45 min of block; sugammadex reverses at any depth.",
      },
      {
        band: "Child / adolescent",
        clearance: "≈ 4–6 mL/kg/min",
        vd: "≈ 0.2–0.3 L/kg",
        halfLife: "0.7–1.2 h",
        implication: "Shortest duration of the paediatric age bands — redose or infuse to a train-of-four target.",
      },
    ],
    scaling: "Prolonged by hepatic dysfunction, hypothermia and acidosis; always monitor train-of-four during infusions.",
    withdrawal: "Stop paralysis first in any wean, confirm full reversal (TOF ratio > 0.9) before reducing sedation.",
  },
  {
    name: "Atracurium / cisatracurium",
    slug: "atracurium-cisatracurium",
    cardSlug: "atracurium-cisatracurium",
    group: "Neuromuscular blockers",
    route: "Organ-independent Hofmann elimination plus ester hydrolysis; laudanosine metabolite",
    maturation: "Hofmann elimination is temperature- and pH-dependent, not age-dependent — the most predictable relaxant in organ failure.",
    bands: [
      {
        band: "Neonate",
        clearance: "≈ 5–6 mL/kg/min",
        vd: "≈ 0.2–0.3 L/kg",
        halfLife: "20–25 min",
        implication: "Higher per-kg infusion rates than adults because of rapid clearance.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 6–8 mL/kg/min",
        vd: "≈ 0.15–0.2 L/kg",
        halfLife: "20–30 min",
        implication: "Cisatracurium 1–4 µg/kg/min typical; ideal in renal or hepatic failure.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 5–6 mL/kg/min",
        vd: "≈ 0.15 L/kg",
        halfLife: "20–30 min",
        implication: "Laudanosine accumulation is only a concern with very prolonged high-dose infusion.",
      },
    ],
    scaling: "Hypothermia and alkalosis slow Hofmann elimination and prolong block — recheck TOF after cooling or bicarbonate.",
  },
  {
    name: "Adrenaline",
    slug: "adrenaline",
    cardSlug: "adrenaline",
    group: "Cardiovascular",
    route: "COMT and MAO metabolism plus neuronal uptake; seconds-scale turnover",
    maturation: "Kinetics are essentially age-independent; the difference is receptor responsiveness and immature myocardial reserve.",
    bands: [
      {
        band: "Neonate",
        clearance: "Very high, flow-dependent",
        vd: "≈ 0.1–0.2 L/kg",
        halfLife: "1–3 min",
        implication: "Start 0.05–0.1 µg/kg/min; the immature myocardium is rate-dependent for cardiac output.",
      },
      {
        band: "Infant / child",
        clearance: "Very high, flow-dependent",
        vd: "≈ 0.1–0.2 L/kg",
        halfLife: "1–3 min",
        implication: "0.05–1 µg/kg/min titrated; effect is seen within 1–2 min of a rate change.",
      },
      {
        band: "Adolescent",
        clearance: "Very high",
        vd: "≈ 0.1–0.2 L/kg",
        halfLife: "1–3 min",
        implication: "Watch lactate and tachyarrhythmia as the dose climbs.",
      },
    ],
    scaling: "Because the half-life is minutes, steady state after each rate change arrives in about 5–10 min — titrate on that rhythm.",
    withdrawal: "Wean in 0.01–0.05 µg/kg/min steps every 15–30 min with continuous blood pressure and lactate monitoring.",
  },
  {
    name: "Noradrenaline",
    slug: "noradrenaline",
    cardSlug: "noradrenaline",
    group: "Cardiovascular",
    route: "COMT/MAO metabolism and neuronal reuptake",
    maturation: "No clinically relevant maturation of clearance; α-receptor responsiveness is lower in the newborn.",
    bands: [
      {
        band: "Neonate",
        clearance: "Very high, flow-dependent",
        vd: "≈ 0.1–0.2 L/kg",
        halfLife: "1–3 min",
        implication: "0.05–0.1 µg/kg/min start; higher doses may be needed for the same effect.",
      },
      {
        band: "Infant / child",
        clearance: "Very high",
        vd: "≈ 0.1–0.2 L/kg",
        halfLife: "1–3 min",
        implication: "0.05–1 µg/kg/min; central access preferred, extravasation risks necrosis.",
      },
      {
        band: "Adolescent",
        clearance: "Very high",
        vd: "≈ 0.1–0.2 L/kg",
        halfLife: "1–3 min",
        implication: "Titrate to age-appropriate mean arterial pressure, not an adult target.",
      },
    ],
    scaling: "Rapid offset means missed infusions cause immediate hypotension — always run a double-pumped changeover.",
    withdrawal: "Reduce in 0.02–0.05 µg/kg/min steps every 15–30 min once perfusion and lactate are improving.",
  },
  {
    name: "Dobutamine",
    slug: "dobutamine",
    cardSlug: "dobutamine",
    group: "Cardiovascular",
    route: "COMT metabolism and conjugation",
    maturation: "Clearance per kg is higher in infants, so per-kg rates are similar or greater than adults.",
    bands: [
      {
        band: "Neonate",
        clearance: "≈ 40–90 mL/kg/min",
        vd: "≈ 0.2 L/kg",
        halfLife: "1–3 min",
        implication: "2–10 µg/kg/min; less effective than in adults because of limited inotropic reserve.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 40–90 mL/kg/min",
        vd: "≈ 0.2 L/kg",
        halfLife: "2 min",
        implication: "5–20 µg/kg/min; tachycardia and vasodilatation limit the dose.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 40–60 mL/kg/min",
        vd: "≈ 0.2 L/kg",
        halfLife: "2 min",
        implication: "Adult titration; tolerance develops after 72 h of continuous infusion.",
      },
    ],
    scaling: "Steady state within 10 min of a rate change; assess with echo or cardiac output rather than heart rate alone.",
    withdrawal: "Wean by 1–2 µg/kg/min every 4–6 h; expect a transient fall in cardiac index as it comes off.",
  },
  {
    name: "Milrinone",
    slug: "milrinone",
    cardSlug: "milrinone",
    group: "Cardiovascular",
    route: "80–85% renal excretion unchanged",
    maturation: "Neonatal clearance is roughly half the older child's, tracking glomerular filtration maturation.",
    bands: [
      {
        band: "Preterm neonate",
        clearance: "≈ 1.5–3 mL/kg/min",
        vd: "≈ 0.4–0.6 L/kg",
        halfLife: "5–10 h",
        implication: "Accumulates readily — a loading dose is often omitted and the rate halved.",
      },
      {
        band: "Term neonate",
        clearance: "≈ 3–4 mL/kg/min",
        vd: "≈ 0.35–0.5 L/kg",
        halfLife: "3–5 h",
        implication: "0.25–0.5 µg/kg/min; common after cardiac surgery for low cardiac output.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 5–9 mL/kg/min",
        vd: "≈ 0.3–0.5 L/kg",
        halfLife: "2–4 h",
        implication: "0.25–0.75 µg/kg/min; higher per-kg clearance than adults.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 2–3 mL/kg/min",
        vd: "≈ 0.3 L/kg",
        halfLife: "2–3 h",
        implication: "Reduce in renal impairment; effect persists hours after stopping.",
      },
    ],
    scaling: "In acute kidney injury the half-life may double or triple — the long offset means hypotension can persist after stopping.",
    withdrawal: "Because the half-life is hours, wean in steps of 0.05–0.1 µg/kg/min every 6–12 h and expect delayed effects.",
  },
  {
    name: "Vasopressin",
    slug: "vasopressin",
    cardSlug: "vasopressin",
    group: "Cardiovascular",
    route: "Hepatic and renal vasopressinase metabolism",
    maturation: "Short half-life at all ages; neonatal use is mainly for refractory hypotension and pulmonary hypertension.",
    bands: [
      {
        band: "Neonate",
        clearance: "High",
        vd: "≈ 0.1–0.2 L/kg",
        halfLife: "10–20 min",
        implication: "0.0001–0.001 units/kg/min; watch sodium and urine output closely.",
      },
      {
        band: "Infant / child",
        clearance: "High",
        vd: "≈ 0.1–0.2 L/kg",
        halfLife: "10–20 min",
        implication: "0.0003–0.002 units/kg/min as a catecholamine-sparing agent.",
      },
      {
        band: "Adolescent",
        clearance: "High",
        vd: "≈ 0.1–0.2 L/kg",
        halfLife: "10–20 min",
        implication: "Fixed-rate infusions are common; digital and splanchnic ischaemia are the risks.",
      },
    ],
    scaling: "Effect is not titratable minute-to-minute like catecholamines — change the rate no more often than every 30 min.",
    withdrawal: "Wean last after catecholamines if hyponatraemia or rebound hypotension is a concern; taper over 12–24 h.",
  },
  {
    name: "Phenytoin",
    slug: "phenytoin",
    cardSlug: "phenytoin",
    group: "Neuro & anticonvulsants",
    route: "Saturable (zero-order) CYP2C9/2C19 hydroxylation; highly protein bound",
    maturation: "Clearance is slow in the first weeks, then per-kg clearance exceeds adults through childhood.",
    bands: [
      {
        band: "Neonate",
        clearance: "Slow, highly variable",
        vd: "≈ 1.0–1.2 L/kg",
        halfLife: "20–100 h (first week), falling to 20–30 h",
        implication: "Load 20 mg/kg then measure levels before regular dosing.",
      },
      {
        band: "Infant / child",
        clearance: "Higher per kg than adults",
        vd: "≈ 0.7–0.8 L/kg",
        halfLife: "10–20 h (dose-dependent)",
        implication: "Needs a larger mg/kg maintenance dose (often 8–10 mg/kg/day divided).",
      },
      {
        band: "Adolescent",
        clearance: "Approaching adult",
        vd: "≈ 0.6–0.7 L/kg",
        halfLife: "12–36 h",
        implication: "Zero-order kinetics — small dose increases can cause toxicity.",
      },
    ],
    scaling: "In hypoalbuminaemia or renal failure measure free phenytoin or correct the total level; infuse no faster than 1 mg/kg/min with ECG monitoring.",
  },
  {
    name: "Levetiracetam",
    slug: "levetiracetam",
    cardSlug: "levetiracetam",
    group: "Neuro & anticonvulsants",
    route: "66% renal excretion unchanged; remainder hydrolysed in blood (not CYP)",
    maturation: "Clearance follows glomerular filtration maturation — low in neonates, above adult per-kg values in children.",
    bands: [
      {
        band: "Neonate",
        clearance: "≈ 0.7–1.0 mL/kg/min",
        vd: "≈ 0.6–0.9 L/kg",
        halfLife: "8–18 h",
        implication: "Twice-daily dosing; 20–40 mg/kg/day usual after loading.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 1.5–2.5 mL/kg/min",
        vd: "≈ 0.5–0.7 L/kg",
        halfLife: "5–6 h",
        implication: "Higher mg/kg/day than adults (up to 60 mg/kg/day) because clearance is faster.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 1.0–1.5 mL/kg/min",
        vd: "≈ 0.5–0.7 L/kg",
        halfLife: "6–8 h",
        implication: "IV and oral doses are interchangeable; few interactions.",
      },
    ],
    scaling: "Reduce dose in renal impairment and give a supplementary dose after haemodialysis (about 50% of the daily dose).",
  },
  {
    name: "Vancomycin",
    slug: "vancomycin",
    cardSlug: "vancomycin",
    group: "Antimicrobials & other",
    route: "Almost entirely renal, glomerular filtration",
    maturation: "Clearance tracks postmenstrual age and creatinine clearance; neonatal intervals are much longer.",
    bands: [
      {
        band: "Preterm neonate",
        clearance: "≈ 0.6–1.0 mL/kg/min",
        vd: "≈ 0.6–0.7 L/kg",
        halfLife: "6–10 h",
        implication: "Dose 12–24 hourly by postmenstrual age; check a trough or AUC.",
      },
      {
        band: "Term neonate",
        clearance: "≈ 1.0–1.3 mL/kg/min",
        vd: "≈ 0.6–0.7 L/kg",
        halfLife: "4–7 h",
        implication: "8–12 hourly dosing; target AUC24/MIC 400–600.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 1.5–2.5 mL/kg/min",
        vd: "≈ 0.6–0.7 L/kg",
        halfLife: "2–4 h",
        implication: "Needs higher total mg/kg/day (60–80) than adults, 6-hourly.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 1.0–1.5 mL/kg/min",
        vd: "≈ 0.6–0.7 L/kg",
        halfLife: "4–8 h",
        implication: "Adult AUC-guided dosing; watch renal function with other nephrotoxins.",
      },
    ],
    scaling: "Sepsis, burns and ECMO increase Vd and clearance — use loading doses and therapeutic drug monitoring rather than fixed regimens.",
  },
  {
    name: "Gentamicin",
    slug: "gentamicin",
    group: "Antimicrobials & other",
    route: "Renal, glomerular filtration; no metabolism",
    maturation: "Larger extracellular volume in neonates raises Vd, and immature filtration prolongs the half-life.",
    bands: [
      {
        band: "Preterm neonate",
        clearance: "≈ 0.4–0.7 mL/kg/min",
        vd: "≈ 0.5–0.6 L/kg",
        halfLife: "8–12 h",
        implication: "Extended interval (36–48 h) dosing with pre-dose level monitoring.",
      },
      {
        band: "Term neonate",
        clearance: "≈ 0.8–1.2 mL/kg/min",
        vd: "≈ 0.45–0.55 L/kg",
        halfLife: "5–8 h",
        implication: "24–36 hourly; peak drives efficacy, trough drives toxicity.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 1.3–1.8 mL/kg/min",
        vd: "≈ 0.3–0.4 L/kg",
        halfLife: "2–3 h",
        implication: "7 mg/kg once daily typical; check trough before the third dose.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 1.0–1.5 mL/kg/min",
        vd: "≈ 0.25–0.3 L/kg",
        halfLife: "2–3 h",
        implication: "Once-daily dosing; cumulative nephro- and ototoxicity risk.",
      },
    ],
    scaling: "Oedema, ascites and cardiopulmonary bypass expand Vd and lower peaks — base dose on total body weight and adjust by levels.",
  },
  {
    name: "Paracetamol",
    slug: "paracetamol",
    group: "Antimicrobials & other",
    route: "Glucuronidation and sulfation, with a minor CYP2E1 route to NAPQI",
    maturation: "Neonates rely on sulfation rather than glucuronidation, giving a lower toxic-metabolite load but slower clearance.",
    bands: [
      {
        band: "Preterm neonate",
        clearance: "≈ 1.5–2.5 mL/kg/min",
        vd: "≈ 0.9–1.1 L/kg",
        halfLife: "5–11 h",
        implication: "IV 7.5 mg/kg 8-hourly (max 25 mg/kg/day) — reduced dose and interval.",
      },
      {
        band: "Term neonate",
        clearance: "≈ 3–5 mL/kg/min",
        vd: "≈ 0.8–1.0 L/kg",
        halfLife: "3–5 h",
        implication: "IV 10 mg/kg 6-hourly, max 30 mg/kg/day.",
      },
      {
        band: "Infant / child",
        clearance: "≈ 5–8 mL/kg/min",
        vd: "≈ 0.7–1.0 L/kg",
        halfLife: "2–3 h",
        implication: "15 mg/kg 6-hourly, max 60 mg/kg/day — the backbone of opioid-sparing analgesia.",
      },
      {
        band: "Adolescent",
        clearance: "≈ 4–5 mL/kg/min",
        vd: "≈ 0.9 L/kg",
        halfLife: "2–3 h",
        implication: "Cap at 4 g/day and at 60 mg/kg/day for patients under 50 kg.",
      },
    ],
    scaling: "Malnutrition, prolonged fasting and hepatic impairment deplete glutathione — reduce the daily maximum and review after 48–72 h.",
  },
];

export const paedPkGroups: PaedPkGroup[] = [
  "Sedation & analgesia",
  "Neuromuscular blockers",
  "Cardiovascular",
  "Neuro & anticonvulsants",
  "Antimicrobials & other",
];
