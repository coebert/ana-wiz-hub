import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { ExamSection } from "@/components/exam/ExamSection";
import { antimicrobialsIcuQuestions } from "@/data/quizzes";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { DiagramSection } from "@/components/topic/DiagramSection";
import AntibioticPKPDPrimer from "@/components/diagrams/pharmacology/AntibioticPKPDPrimer";
import { InlineRef } from "@/components/references/InlineRef";

const antimicrobialsIcuFaqs: Array<[string, string]> = [
  ["Why does volume of distribution change for hydrophilic antibiotics in sepsis?", "Capillary leak and aggressive fluid resuscitation expand Vd for β-lactams, aminoglycosides and glycopeptides, often requiring loading doses (e.g. meropenem 2 g, vancomycin 25–30 mg/kg) to reach therapeutic levels."],
  ["When should antibiotic infusions be used over bolus dosing?", "Time-dependent agents (β-lactams) benefit from extended (3–4 h) or continuous infusion when MICs are high or patient is critically ill (BLING-III, MERCY trials suggest mortality benefit in severe sepsis)."],
  ["How is antibiotic de-escalation safely performed?", "Review at 48–72 h with cultures and biomarkers (procalcitonin trend); narrow spectrum, stop empirical cover not supported by cultures, and limit duration to 5–7 days for most infections (8 days for HAP/VAP — PneumA trial)."],
];

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
    cites: ["NICE NG51"],
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
    cites: ["BJA Educ 2016"],
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
        { text: "β-lactams are time-dependent — prolonged or continuous infusions improve fT>MIC in critical illness", cites: ["SSC 2021 Antimicrobials"] },
        { text: "Vancomycin: AUC24/MIC 400–600 (ASHP/IDSA 2020) and a loading dose of 25–30 mg/kg are essential in ICU", cites: ["NICE NG51"] },
        { text: "MERINO trial: pip-taz inferior to meropenem for ESBL E. coli/Klebsiella bacteraemia even when in vitro sensitive", cites: ["BJA Educ 2016"] },
        { text: "Start Smart Then Focus: empiric broad-spectrum within 1 h of sepsis recognition → de-escalate at 48–72 h on cultures", cites: ["SSC 2021 Antimicrobials"] },
        { text: "Procalcitonin-guided de-escalation safely reduces antibiotic exposure (PRORATA, SAPS) without increased mortality", cites: ["NICE NG51"] },
        { text: "Source control is non-negotiable — no antibiotic regimen can compensate for a missed abscess or infected line", cites: ["BJA Educ 2016"] },
        { text: "Augmented renal clearance (CrCl >130 mL/min) is common in young trauma/sepsis patients and causes under-dosing of hydrophilic antibiotics", cites: ["SSC 2021 Antimicrobials"] },
      ]}
      topicId="antimicrobials-icu"
      topicTitle="Antimicrobials in ICU"
      quizQuestions={antimicrobialsIcuQuestions}
      sectionSources={{
        objectives: ["SSC 2021 Antimicrobials", "BJA Educ 2016", "NICE NG51"],
        workedExamples: ["BJA Educ 2016", "NICE NG51"],
        keyPoints: ["SSC 2021 Antimicrobials", "BJA Educ 2016", "NICE NG51"],
        
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 4.7", "EDIC 5.3"] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
        <>
          <ExamSection
            id="pkpd"
            exams={[Exam.FFICM, Exam.EDIC]}
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

          <DiagramSection
            id="pkpd-killing-patterns"
            title="Antibiotic PK/PD Killing Patterns"
            intro="Three killing patterns drive ICU dosing decisions. Time-dependent agents (β-lactams) need prolonged or continuous infusion to maximise %fT>MIC; concentration-dependent agents (aminoglycosides) need high once-daily peaks; AUC-dependent agents (vancomycin, fluoroquinolones) need TDM-guided 24-h exposure targets."
          >
            <AntibioticPKPDPrimer />
          </DiagramSection>

          <ExamSection
            id="key-agents"
            exams={[Exam.FFICM, Exam.EDIC]}
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
            exams={[Exam.FFICM, Exam.EDIC]}
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
            id="resistance-mechanisms"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 4.7"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Mechanisms of Antimicrobial Resistance</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Four core mechanisms account for almost all clinically important resistance on the ICU, and organisms frequently combine several at once <InlineRef topicId="antimicrobials-icu" refLabel="Nat Rev Microbiol 2015 (Resistance mechanisms)" />.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Enzymatic degradation</p>
                <p className="text-xs text-muted-foreground mt-1">β-lactamases hydrolyse the β-lactam ring. Extended-spectrum β-lactamases (ESBLs) confer resistance to penicillins and cephalosporins but spare carbapenems; carbapenemases (KPC, NDM-1, OXA-48) additionally destroy carbapenems. This is why β-lactamase inhibitors (tazobactam, avibactam) are co-administered and why carbapenem-sparing strategies matter — indiscriminate carbapenem use selects for carbapenemase-producing organisms with few remaining options. Aminoglycoside-modifying enzymes (acetyltransferases, phosphotransferases) inactivate gentamicin/amikacin similarly.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Target-site modification</p>
                <p className="text-xs text-muted-foreground mt-1"><em>mecA</em>-encoded PBP2a in MRSA has low affinity for all β-lactams; mutations in DNA gyrase/topoisomerase IV reduce fluoroquinolone binding; 23S rRNA methylation (erm genes) blocks macrolide binding to the ribosome; <em>vanA</em> replaces the D-Ala-D-Ala peptidoglycan terminus with D-Ala-D-Lac, abolishing glycopeptide binding in VRE.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Reduced permeability</p>
                <p className="text-xs text-muted-foreground mt-1">Loss or downregulation of outer-membrane porin channels (e.g. OprD loss in <em>Pseudomonas aeruginosa</em> conferring carbapenem resistance, porin loss in <em>Klebsiella</em>) limits drug entry. The Gram-negative outer membrane is intrinsically far less permeable than the Gram-positive cell wall, which is one reason Gram-negative MDR organisms are harder to treat than Gram-positive ones.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Active efflux</p>
                <p className="text-xs text-muted-foreground mt-1">Efflux pumps such as MexAB-OprM in <em>Pseudomonas</em> actively export tetracyclines, macrolides and fluoroquinolones out of the cell faster than they accumulate, keeping intracellular concentration below the therapeutic threshold despite adequate dosing.</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-3">
              These mechanisms are not mutually exclusive: a single carbapenem-resistant <em>Klebsiella</em> isolate may carry a carbapenemase, porin loss and an efflux pump simultaneously, producing very high MICs. Resistance genes spread horizontally between organisms via plasmids and transposons (not just vertically by clonal expansion), which explains rapid outbreak spread of CPE/ESBL organisms on ICUs and the rationale for contact precautions and screening in addition to antibiotic stewardship <InlineRef topicId="antimicrobials-icu" refLabel="Nat Rev Microbiol 2015 (Resistance mechanisms)" />.
            </p>
          </ExamSection>

          <ExamSection
            id="stewardship"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 4.7"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Antimicrobial Stewardship</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Effective stewardship combines the "Start Smart Then Focus" principles below with structural programme elements <InlineRef topicId="antimicrobials-icu" refLabel="NICE NG15" />: formulary restriction, prospective audit and feedback, antibiogram-driven guidelines, systematic de-escalation, consumption/resistance surveillance and prescriber education.
            </p>
            <div className="space-y-2">
              {[
                { principle: "Start Smart", detail: "Take cultures before antibiotics (do NOT delay first dose >45 min in septic shock). Empiric broad-spectrum within 1 h of sepsis recognition (SSC 2021). Follow local guidelines and antibiogram." },
                { principle: "Then Focus (48–72 h review)", detail: "Mandatory review at 48–72 h: stop, switch (IV→PO), de-escalate (narrower spectrum), continue, or refer. Document the decision and review date." },
                { principle: "Duration", detail: "Shorter is safer: CAP 5 days (NICE), HAP/VAP 7 days (PneumA), uncomplicated Gram-neg bacteraemia 7 days (Yahav 2019), intra-abdominal 4 days post-source control (STOP-IT). Procalcitonin-guided de-escalation reduces exposure further." },
                { principle: "MDR organisms", detail: "ESBL: meropenem (MERINO). MRSA: vancomycin/linezolid/daptomycin. VRE: linezolid/daptomycin. CPE: ceftazidime-avibactam, meropenem-vaborbactam, cefiderocol. C. difficile: oral vancomycin/fidaxomicin (NOT metronidazole first-line). Always consult microbiology." },
                { principle: "Route & TDM", detail: "Switch to oral when tolerating diet, afebrile 24 h, falling inflammatory markers, no high-risk infection (endocarditis, CNS, prosthetic). TDM mandatory: vancomycin, gentamicin, voriconazole; consider for β-lactams in ARC or CRRT." },
                { principle: "Formulary restriction & pre-authorisation", detail: "Protected/restricted agents (carbapenems, linezolid, ceftazidime-avibactam, daptomycin) require prior microbiology or infectious diseases approval before or shortly after the first dose, preventing unnecessary broad-spectrum use and preserving agents for MDR infection." },
                { principle: "Prospective audit and feedback", detail: "Daily multidisciplinary review by an ICU pharmacist and microbiologist of every patient on antimicrobials, with real-time recommendations on choice, dose, route and duration fed back directly to the prescribing team." },
                { principle: "Guidelines, bundles and local antibiograms", detail: "Empiric choice is driven by locally agreed guidelines, sepsis care bundles and the unit's own antibiogram (which reflects local resistance patterns) rather than generic national guidance alone." },
                { principle: "Surveillance and feedback", detail: "Unit-level antimicrobial consumption (expressed as defined daily doses, DDDs) and resistance rates are tracked and fed back to clinicians to detect drift towards broader-spectrum prescribing and emerging resistance." },
                { principle: "Prescriber education", detail: "Ongoing education of medical and nursing staff on stewardship principles, local guidelines and the harms of unnecessary or prolonged antimicrobial exposure (C. difficile, resistance selection, toxicity)." },
              ].map((p) => (
                <div key={p.principle} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{p.principle}</p>
                  <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Empiric therapy guided by local antibiogram, suspected source and patient risk factors — narrow once cultures back.",
              "β-lactams are time-dependent — consider extended/continuous infusion in severe sepsis.",
              "Aminoglycosides and fluoroquinolones are concentration-dependent — once-daily dosing maximises peak:MIC.",
              "Therapeutic drug monitoring for vancomycin (target AUC24/MIC 400–600 mg·h/L; ASHP/IDSA 2020), aminoglycosides, voriconazole and β-lactams in critical illness.",
              "Stewardship: stop date on prescription, de-escalation, procalcitonin-guided cessation, antifungal/antiviral input.",
            ]}
          />
        </>
          <TopicFaqs faqs={antimicrobialsIcuFaqs} />
        </>
      }
    />
  );
};

export default AntimicrobialsIcuTopic;
