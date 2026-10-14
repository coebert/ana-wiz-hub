import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="sepsis" refLabel={label} />;

export function SepsisBetaLactamInfusionTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Continuous or Prolonged β-Lactam Infusions in Sepsis</h2>
    <p>β-lactams kill in a time-dependent way: what matters is how long the free drug concentration stays above the organism's MIC (fT&gt;MIC), not the peak. Giving the same daily dose as a continuous or extended infusion keeps concentrations above the MIC for longer. That matters most in sepsis, where augmented renal clearance and a larger volume of distribution can leave intermittent-bolus troughs below the MIC.</p>
    <h3 className="text-lg font-semibold text-foreground">BLING III (JAMA 2024)</h3>
    <p>This open-label trial ran in 104 ICUs in seven countries. It randomised critically ill adults with sepsis who were receiving piperacillin–tazobactam or meropenem to the same 24-hour dose by continuous infusion (n = 3,498) or intermittent infusion (n = 3,533).<R label="Dulhunty 2024 BLING III" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">90-day mortality:</strong> 24.9% vs 26.8% (absolute difference −1.9%, 95% CI −4.9% to 1.1%; OR 0.91, 0.81–1.01; P = 0.08). The result was not statistically significant.<R label="Dulhunty 2024 BLING III" /></li>
      <li><strong className="text-foreground">Clinical cure by day 14:</strong> 55.7% vs 50.0% (difference 5.7%, 2.4–9.1%). Acquisition of multiresistant organisms or C. difficile, ICU mortality and in-hospital mortality did not differ significantly.<R label="Dulhunty 2024 BLING III" /></li>
      <li><strong className="text-foreground">Authors' reading:</strong> the confidence interval includes both no important effect and a clinically important benefit.<R label="Dulhunty 2024 BLING III" /></li>
    </ul>
    <h3 className="text-lg font-semibold text-foreground">The accompanying meta-analysis</h3>
    <p>Abdul-Aziz and colleagues pooled 18 RCTs (9,108 critically ill adults with sepsis or septic shock), including BLING III. Seventeen trials (9,014 participants) reported 90-day mortality. Prolonged (continuous or extended) infusion was associated with lower 90-day mortality: RR 0.86 (95% credible interval 0.72–0.98; high certainty), with a 99.1% posterior probability of benefit. ICU mortality was also lower (RR 0.84, 0.70–0.97) and clinical cure higher (RR 1.16, 1.07–1.31; moderate certainty). The authors concluded that clinicians can consider prolonged infusions a standard of care.<R label="Abdul-Aziz 2024 meta-analysis" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Practice point:</strong> give a loading dose first, so the target concentration is reached without delay. Then start the continuous or extended infusion. Check compatibility and stability (for example, meropenem degrades in solution at room temperature), and make sure a dedicated line or lumen is available.</li>
      <li><strong className="text-foreground">Exam trap:</strong> BLING III alone was neutral on its primary outcome. The mortality signal comes from the pooled analysis, and the primary analysis used a Bayesian approach.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: which pharmacodynamic index explains why prolonged infusion should help with β-lactams?</summary><p className="mt-2">The time the free drug concentration stays above the MIC (fT&gt;MIC). Spreading the same daily dose over a longer infusion increases this time. Aminoglycosides behave differently: their killing depends on peak concentration, so they are given as a once-daily dose.</p></details>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: did BLING III show a significant reduction in 90-day mortality?</summary><p className="mt-2">No: 24.9% vs 26.8%, P = 0.08. Clinical cure was higher, and the meta-analysis including BLING III found lower 90-day mortality (RR 0.86).</p></details>
    <LessonSources topicId="sepsis" labels={["Dulhunty 2024 BLING III", "Abdul-Aziz 2024 meta-analysis"]} />
  </div>;
}
