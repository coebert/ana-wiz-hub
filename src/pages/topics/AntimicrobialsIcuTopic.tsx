import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { antimicrobialsIcuQuestions } from "@/data/quizzes";
import type { WorkedExample } from "@/components/WorkedExamples";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Apply PK/PD principles (time-, concentration-, AUC/MIC-dependent killing) to antimicrobial dosing in critical illness.",
  "Select empiric antimicrobials for common ICU syndromes (sepsis of unknown source, VAP, intra-abdominal sepsis, line infection).",
  "Use therapeutic drug monitoring (vancomycin AUC/MIC, aminoglycoside trough, voriconazole) to individualise therapy.",
  "Implement Start Smart Then Focus stewardship: 48–72 h review, de-escalation, IV→PO switch, course shortening.",
  "Recognise and manage MDR organisms (ESBL, MRSA, CPE, C. difficile, invasive Candida) using guideline-directed therapy.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Vancomycin AUC/MIC dosing in septic shock",
    scenario: (
      <>
        82-kg patient with MRSA bacteraemia and septic shock on noradrenaline. CrCl 70 mL/min.
        How would you load and maintain vancomycin, and what is the monitoring target?
      </>
    ),
    working: (
      <>
        ICU patients have an expanded volume of distribution (capillary leak, fluids); a loading
        dose is essential or therapeutic levels are delayed by 24–48 h. Loading dose:{" "}
        <strong>25–30 mg/kg IBW</strong> (max ~3 g) → ~2.25 g IV over 2 h. Maintenance:{" "}
        15–20 mg/kg q12h adjusted to AUC<sub>24</sub>/MIC. Modern guidance (ASHP/IDSA 2020) targets{" "}
        <strong>AUC<sub>24</sub> 400–600 mg·h/L</strong> rather than trough alone — better
        efficacy, lower nephrotoxicity. Use Bayesian software or two-level estimation.
      </>
    ),
    answer: (
      <>
        Load 2.25 g over 2 h, then 1.5 g q12h. Recheck early (level pre-3rd dose) and titrate to
        AUC<sub>24</sub> 400–600. Daily creatinine; consider switching to{" "}
        <strong>daptomycin 8–10 mg/kg</strong> if AKI develops or MIC creep is suspected (note:
        not for pneumonia — surfactant inactivation).
      </>
    ),
  },
  {
    title: "ESBL E. coli bacteraemia — MERINO decision",
    scenario: (
      <>
        70-year-old man with ascending cholangitis, blood cultures grow ESBL E. coli sensitive to
        piperacillin-tazobactam (MIC 4) and meropenem. Source controlled by ERCP. Which agent and
        for how long?
      </>
    ),
    working: (
      <>
        The MERINO RCT (JAMA 2018) randomised ESBL E. coli/Klebsiella bacteraemia to pip-taz vs
        meropenem and was stopped early for inferior 30-day mortality with pip-taz (12.3% vs
        3.7%). Even when in vitro sensitive, pip-taz under-performs because of inoculum effect
        and PK variability in critical illness.
      </>
    ),
    answer: (
      <>
        <strong>Meropenem 1 g q8h</strong> (consider prolonged 3-h infusion to optimise{" "}
        fT&gt;MIC). With effective source control, 7 days total is non-inferior to 14 days
        (Yahav, CID 2019). Step down to oral ciprofloxacin or co-trimoxazole if susceptible to
        complete the course where appropriate.
      </>
    ),
  },
];

const AntimicrobialsIcuTopic = () => {
  return (
    <TopicTemplate
      title="Antimicrobials in ICU"
      subtitle="FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        "β-lactams are time-dependent — prolonged or continuous infusions improve fT>MIC in critical illness",
        "Vancomycin: AUC24/MIC 400–600 (ASHP/IDSA 2020) and a loading dose of 25–30 mg/kg are essential in ICU",
        "MERINO trial: pip-taz inferior to meropenem for ESBL E. coli/Klebsiella bacteraemia even when in vitro sensitive",
        "Start Smart Then Focus: empiric broad-spectrum within 1 h of sepsis recognition → de-escalate at 48–72 h on cultures",
        "Procalcitonin-guided de-escalation safely reduces antibiotic exposure (PRORATA, SAPS) without increased mortality",
        "Source control is non-negotiable — no antibiotic regimen can compensate for a missed abscess or infected line",
        "Augmented renal clearance (CrCl >130 mL/min) is common in young trauma/sepsis patients and causes under-dosing of hydrophilic antibiotics",
      ]}
      topicId="antimicrobials-icu"
      topicTitle="Antimicrobials in ICU"
      quizQuestions={antimicrobialsIcuQuestions}
      sectionSources={{
        objectives: ["SSC 2021 Antimicrobials", "BJA Educ 2016", "NICE NG51"],
        workedExamples: ["BJA Educ 2016"],
        keyPoints: ["SSC 2021 Antimicrobials", "BJA Educ 2016"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 4.7", "EDIC 5.3"] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
          <ExamSection
            id="pkpd"
            exams={["fficm", "edic"]}
            curriculumCodes={["FFICM 4.7"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">PK/PD Principles in Critical Illness</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Critical illness dramatically alters antimicrobial pharmacokinetics: increased Vd (capillary leak, fluid resuscitation), altered protein binding (low albumin), augmented or reduced renal clearance, and impaired hepatic metabolism. Standard ward doses frequently fail to achieve target exposure in the first 24–48 h.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Time-dependent</p>
                <p className="text-xs text-muted-foreground mt-1">β-lactams, carbapenems, vancomycin (vanco also AUC). Efficacy linked to time above MIC (fT&gt;MIC, target ≥50–100%). Use prolonged or continuous infusions.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Concentration-dependent</p>
                <p className="text-xs text-muted-foreground mt-1">Aminoglycosides, daptomycin, fluoroquinolones (also AUC). Efficacy linked to Cmax/MIC (≥10 for aminoglycosides). Give high doses, extended intervals.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">AUC/MIC dependent</p>
                <p className="text-xs text-muted-foreground mt-1">Vancomycin (AUC24/MIC 400–600), fluoroquinolones (AUC/MIC ≥125 Gram-neg, ≥40 Gram-pos), linezolid. TDM essential for vancomycin in ICU.</p>
              </div>
            </div>
          </ExamSection>

          <ExamSection
            id="key-agents"
            exams={["fficm", "edic"]}
            curriculumCodes={["FFICM 4.7"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key ICU Antimicrobials</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                    <th className="text-left py-2 text-foreground font-semibold">Spectrum</th>
                    <th className="text-left py-2 text-foreground font-semibold">ICU Considerations</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Piperacillin-Tazobactam</td><td>Broad β-lactam + BLI; Gram +/−, anaerobes, Pseudomonas</td><td>Prolonged 4-h infusion improves outcomes. MERINO: inferior to meropenem for ESBL bacteraemia. Avoid with vancomycin in AKI risk patients (TANGO controversy).</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Meropenem</td><td>Carbapenem — broadest β-lactam; covers ESBL, AmpC</td><td>Reserve for ESBL, severe sepsis, neutropenia. Prolonged infusion beneficial. Seizure risk lower than imipenem. No activity vs MRSA, VRE, atypicals.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Vancomycin</td><td>MRSA, MRSE, ampicillin-resistant enterococci, oral C. difficile</td><td>AUC24/MIC 400–600 (not trough alone). Loading dose 25–30 mg/kg. Nephro/ototoxic — daily creatinine. MIC creep &gt;1 → consider daptomycin/linezolid.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Gentamicin</td><td>Gram-negatives; synergy for endocarditis</td><td>Once-daily 5–7 mg/kg (Hartford nomogram). Trough &lt;1 mg/L. Limit to 48–72 h where possible. Nephro/ototoxic, especially with loop diuretics.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Linezolid</td><td>MRSA, VRE, complicated skin/soft tissue, MDR-TB</td><td>Excellent oral bioavailability (100%). Bone marrow suppression beyond 14 d; serotonin syndrome with SSRIs/MAOIs. Lactic acidosis with prolonged use.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Daptomycin</td><td>MRSA bacteraemia/endocarditis, VRE</td><td>Inactivated by pulmonary surfactant — NOT for pneumonia. Monitor CK weekly; stop statins. Dose 6–10 mg/kg in serious infection.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Antifungals</td><td>Candida, Aspergillus, mucormycosis</td><td>Echinocandin (caspofungin/anidulafungin) first-line for invasive candidiasis (IDSA). Voriconazole for Aspergillus — TDM (trough 1–5.5 mg/L). Liposomal amphotericin for mucor.</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection
            id="empirical"
            exams={["fficm", "edic"]}
            curriculumCodes={["FFICM 4.7", "EDIC 5.3"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Empiric Therapy by Syndrome</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Always check local antibiogram and trust guidelines — these are illustrative starting points.
            </p>
            <div className="space-y-2">
              {[
                { syndrome: "Sepsis, source unknown", regimen: "Piperacillin-tazobactam 4.5 g (4-h infusion) ± gentamicin 5 mg/kg single dose. Add vancomycin if MRSA risk (line, recent admission, IVDU). Antifungal cover for high-risk Candida (parenteral nutrition, abdominal surgery, prolonged broad-spectrum)." },
                { syndrome: "Hospital-acquired pneumonia / VAP", regimen: "Piperacillin-tazobactam OR meropenem (if ESBL risk). Add vancomycin/linezolid for MRSA. Cover Pseudomonas if late-onset (>5 d) or recent antibiotics. De-escalate on BAL/ETA cultures at 48 h. Duration 7 days if responding (PneumA, IDSA)." },
                { syndrome: "Intra-abdominal sepsis", regimen: "Piperacillin-tazobactam OR meropenem (if severe/ESBL). Add fluconazole or echinocandin for Candida if recurrent/post-op leak. Source control within 6–12 h critical (drain, surgery). Duration 4–7 days post-source control (STOP-IT)." },
                { syndrome: "Meningitis (community)", regimen: "Ceftriaxone 2 g BD + amoxicillin 2 g 4-hourly (Listeria cover if &gt;50 y or immunocompromised). Add vancomycin if pneumococcal resistance suspected. Dexamethasone 10 mg QDS pre/with first dose for pneumococcal." },
                { syndrome: "Necrotising fasciitis", regimen: "Surgical debridement is the antibiotic. Empiric: meropenem + clindamycin (toxin suppression) + vancomycin/linezolid. Add IVIG in streptococcal TSS (controversial). Repeat surgery every 24 h until clean." },
                { syndrome: "Catheter-related bloodstream infection", regimen: "Remove line if clinically septic, fungaemia, S. aureus, Pseudomonas, or persistent positive cultures &gt;72 h. Empiric vancomycin + anti-pseudomonal cover. Echocardiography in S. aureus bacteraemia (rule out endocarditis)." },
              ].map((s) => (
                <div key={s.syndrome} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{s.syndrome}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.regimen}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection
            id="stewardship"
            exams={["fficm", "edic"]}
            curriculumCodes={["FFICM 4.7"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Antimicrobial Stewardship</h2>
            <div className="space-y-2">
              {[
                { principle: "Start Smart", detail: "Take cultures before antibiotics (do NOT delay first dose >45 min in septic shock). Empiric broad-spectrum within 1 h of sepsis recognition (SSC 2021). Follow local guidelines and antibiogram." },
                { principle: "Then Focus (48–72 h review)", detail: "Mandatory review at 48–72 h: stop, switch (IV→PO), de-escalate (narrower spectrum), continue, or refer. Document the decision and review date." },
                { principle: "Duration", detail: "Shorter is safer: CAP 5 days (NICE), HAP/VAP 7 days (PneumA), uncomplicated Gram-neg bacteraemia 7 days (Yahav 2019), intra-abdominal 4 days post-source control (STOP-IT). Procalcitonin-guided de-escalation reduces exposure further." },
                { principle: "MDR organisms", detail: "ESBL: meropenem (MERINO). MRSA: vancomycin/linezolid/daptomycin. VRE: linezolid/daptomycin. CPE: ceftazidime-avibactam, meropenem-vaborbactam, cefiderocol. C. difficile: oral vancomycin/fidaxomicin (NOT metronidazole first-line). Always consult microbiology." },
                { principle: "Route & TDM", detail: "Switch to oral when tolerating diet, afebrile 24 h, falling inflammatory markers, no high-risk infection (endocarditis, CNS, prosthetic). TDM mandatory: vancomycin, gentamicin, voriconazole; consider for β-lactams in ARC or CRRT." },
              ].map((p) => (
                <div key={p.principle} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{p.principle}</p>
                  <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default AntimicrobialsIcuTopic;
