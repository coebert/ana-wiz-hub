import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { antimicrobialsIcuQuestions } from "@/data/quizzes";

const AntimicrobialsIcuTopic = () => {
  return (
    <SectionLayout title="Antimicrobials in ICU" subtitle="FRCA / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">PK/PD Principles in Critical Illness</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Critical illness dramatically alters antimicrobial pharmacokinetics: increased Vd (capillary leak, fluid resuscitation), altered protein binding, augmented or reduced renal clearance.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Time-dependent</p>
              <p className="text-xs text-muted-foreground mt-1">β-lactams, carbapenems, vancomycin. Efficacy linked to time above MIC (fT{'>'} MIC). Use prolonged/continuous infusions.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Concentration-dependent</p>
              <p className="text-xs text-muted-foreground mt-1">Aminoglycosides, daptomycin. Efficacy linked to Cmax/MIC ratio. Give high doses, extended intervals.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">AUC/MIC dependent</p>
              <p className="text-xs text-muted-foreground mt-1">Fluoroquinolones, vancomycin (AUC/MIC target 400–600). TDM essential for vancomycin in ICU.</p>
            </div>
          </div>
        </div>

        <div>
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
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Piperacillin-Tazobactam</td><td>Broad-spectrum β-lactam + BLI</td><td>Prolonged infusion (4h) improves outcomes. MERINO trial: inferior to meropenem for ESBL bacteraemia.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Meropenem</td><td>Carbapenem — broadest β-lactam</td><td>Reserve for ESBL, serious infections. Prolonged infusion beneficial. Seizure risk (lower than imipenem).</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Vancomycin</td><td>MRSA, C. difficile (oral)</td><td>AUC/MIC-guided dosing (target 400–600). Nephrotoxic — monitor levels. Loading dose essential in ICU.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Gentamicin</td><td>Gram-negatives</td><td>Once-daily dosing (7 mg/kg). Hartford nomogram. Nephro/ototoxic — limit duration. Synergy for endocarditis.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Antifungals</td><td>Candida, Aspergillus</td><td>Fluconazole (Candida), echinocandins (empiric — IDSA guidelines), voriconazole (Aspergillus — TDM essential).</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Antimicrobial Stewardship</h2>
          <div className="space-y-2">
            {[
              { principle: "Start Smart", detail: "Take cultures before antibiotics. Empiric broad-spectrum within 1 hour of sepsis recognition. Follow local guidelines." },
              { principle: "Then Focus", detail: "Review at 48–72 hours. De-escalate based on cultures and sensitivities. Switch IV to oral when criteria met." },
              { principle: "Duration", detail: "Shorter courses preferred: CAP 5 days (NICE), VAP 7 days, bacteraemia 7–14 days. Procalcitonin-guided de-escalation reduces antibiotic exposure." },
              { principle: "MDR organisms", detail: "ESBL: meropenem (MERINO). MRSA: vancomycin/linezolid. CPE: ceftazidime-avibactam, meropenem-vaborbactam. Consult microbiology." },
            ].map((p) => (
              <div key={p.principle} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{p.principle}</p>
                <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "β-lactams are time-dependent — prolonged/continuous infusions improve fT>MIC in critically ill patients",
        "Vancomycin: AUC/MIC-guided dosing (target 400–600), loading dose essential in ICU",
        "MERINO trial: pip-taz inferior to meropenem for ESBL E. coli/Klebsiella bacteraemia",
        "Start Smart Then Focus: empiric broad-spectrum → de-escalate at 48–72h based on cultures",
        "Procalcitonin-guided de-escalation safely reduces antibiotic duration in ICU",
      ]} />

      <QuizSection questions={antimicrobialsIcuQuestions} />
      <TopicCompletionToggle topicId="antimicrobials-icu" topicTitle="Antimicrobials in ICU" />
    </SectionLayout>
  );
};

export default AntimicrobialsIcuTopic;
