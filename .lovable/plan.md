# Anaesthetics & Critical Care Drug Reference — standalone app

A dedicated, searchable drug library covering every drug in AnaesthesiaCore plus the commonly used agents currently missing. Built as its own app with its own look, its own address, and no dependency on the study-notes site.

## How the standalone app gets created

Lovable projects are created from your dashboard, so the build runs in two stages:

1. **Stage A (this project):** consolidate every scrap of drug information already scattered across the app into one clean, complete master dataset, and add the new fields (dilutions, blood-level testing, per-drug sources). This is where most of the real work sits — the information is currently spread across dosing tables, infusion recipes, mechanism notes, safety profiles, kinetics, withdrawal guides and paediatric data.
2. **Stage B (new project):** you create a blank project and say the word; the master dataset plus the library interface is carried over verbatim, and the new app is finished there — its own design, its own search, its own publish.

If you would rather not manage two projects, say so and Stage B instead becomes a self-contained library area inside this app.

## What each drug entry contains

- Name, alternative names, class, one-line indication
- Presentation (ampoule/vial strengths as supplied)
- Indications and contraindications
- Adult dose, paediatric dose, neonatal dose
- **Practical preparation:** standard dilutions, what to dilute in, resulting concentration, and rates expressed several ways — mcg/kg/min, mcg/kg/h, mg/h and mL/h at named weights — plus a weight box that recalculates every rate
- Mechanism of action; onset, duration, half-life, distribution, clearance, metabolism, active metabolites
- Adverse effects, interactions, monitoring
- Use in renal impairment, liver impairment and on filtration
- Withdrawal/tapering where relevant
- **Blood level testing** where the drug needs it: target range, when to take the sample relative to dosing, toxic thresholds and what to do about them, sampling practicalities (bottle, whether to hold the dose, turnaround, common errors), and how to adjust the dose from the result
- **Sources:** a per-drug reference list — BNF/BNFc monograph, the product SPC, and the relevant national guideline — each with a working link and access date

## Drugs covered

Everything currently in the app (critical care formulary, anaesthetic agents, existing library entries — roughly 100 drugs), then the gaps filled: antifungals, further antiepileptics, further antiarrhythmics and cardiology agents, further antibiotics, reversal and antidote agents, obstetric drugs, endocrine and electrolyte preparations.

Blood-level testing will be covered in full for: vancomycin, gentamicin, amikacin, teicoplanin, phenytoin, phenobarbital, levetiracetam (where used), digoxin, lithium, theophylline/aminophylline, ciclosporin, tacrolimus, sirolimus, methotrexate, paracetamol (overdose nomogram), salicylate, valproate, carbamazepine, voriconazole, posaconazole, flucytosine, unfractionated heparin (APTT/anti-Xa), argatroban and dabigatran-related assays.

## The library interface

- Instant search across name, alternative names, class and indication
- Filter by class, by broad category, and by "has blood level monitoring"
- A-Z index and recently viewed
- One drug per page, with a sticky section jump bar
- Fast on a phone: tables become cards, no horizontal scrolling
- Works offline once visited
- A prominent standing notice that it is a reference aid, not a prescribing authority; always check the BNF and local policy

## Build order

1. Master dataset assembled from existing app data, entry by entry, with gaps flagged
2. Dilution/rate model plus the weight-driven rate calculations
3. Blood level testing records for the drugs listed above
4. Per-drug source lists with verified links
5. Gap-filling drugs added
6. Library and drug pages, search, filters, mobile layout
7. Consistency checks: every drug has a source list, every monitored drug has a target range, every infusion's arithmetic verified
8. Hand-off to the new project and finish there

## Technical notes

- New unified type in `src/data/drugReference/` merging `icuDrugDoses`, `anaesthesiaDrugDoses`, `icuDrugMechanisms`, `icuDrugSafety`, `icuDrugInteractions`, `icuDrugWithdrawal`, `icuInfusions`, `pk/*`, `pd/*`, `paediatricPk` and the `drugs` table rows, keyed by slug.
- Adds `presentation`, `dilutions[]`, `rateTable`, `tdm` (targets, timing, toxicity, sampling, adjustment) and `sources[]` (title, publisher, url, accessed) to every record.
- A validation script (`scripts/check-drug-reference.mjs`) enforces: unique slugs, non-empty sources, TDM present where `requiresTdm`, and recomputes every mL/h figure from concentration and dose so no unit errors survive.
- Existing app pages keep working — they will read from the unified dataset via thin adapters rather than being rewritten.
- No database schema change needed in this project; the standalone app can ship the dataset as static TypeScript (fast, offline-capable) with an optional table sync later.
