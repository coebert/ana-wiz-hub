import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="antimicrobials-icu" refLabel={label} />;

export function AntimicrobialEvidenceTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Trial Evidence on Antibiotic Duration and Carbapenem-Sparing</h2>
    <p>Two questions come up on every ICU ward round: how long to treat, and whether a carbapenem is really needed. This lesson sets out the randomised evidence behind the duration and drug-choice advice on this page, including the groups the trials excluded.</p>

    <h3 className="text-lg font-semibold text-foreground">Ventilator-associated pneumonia: 8 versus 15 days (Chastre 2003)</h3>
    <p>In 51 French ICUs, 401 patients with VAP proven by quantitative bronchoscopic culture, who had already received appropriate empirical therapy, were randomised to 8 or 15 days of antibiotics. At 28 days, 8 days was not worse for mortality (18.8% vs 17.2%) or recurrence (28.9% vs 26.0%), and patients had more antibiotic-free days (13.1 vs 8.7). <strong className="text-foreground">The key caveat:</strong> VAP caused by non-fermenting Gram-negative bacilli, including <em>Pseudomonas aeruginosa</em>, recurred more often with 8 days (40.6% vs 25.4%), although outcomes were not worse.<R label="Chastre 2003 VAP Duration" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: who was the 8-day result tested in?</summary><p className="mt-2">Patients whose VAP was proven microbiologically and whose first empirical antibiotics were already appropriate. The result should not be applied blindly to undiagnosed "possible VAP" or to a failing empirical regimen. With non-fermenters, expect more recurrence and watch for it.</p></details>

    <h3 className="text-lg font-semibold text-foreground">Bloodstream infection: 7 versus 14 days (BALANCE 2025)</h3>
    <p>BALANCE randomised 3,608 hospitalised patients with bloodstream infection (55% in ICU) across 74 hospitals in seven countries. By 90 days, 14.5% had died in the 7-day group and 16.1% in the 14-day group (difference −1.6 percentage points), so 7 days was shown to be non-inferior. Infections came mostly from the urinary tract, abdomen and lung. <strong className="text-foreground">Excluded:</strong> <em>Staphylococcus aureus</em> bacteraemia, severe immunosuppression, infection sites needing prolonged treatment, and single positive cultures that could be contaminants. Of note, 23.1% of the 7-day group were treated for longer than assigned.<R label="BALANCE 2025" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: does BALANCE support 7 days for <em>S. aureus</em> bacteraemia?</summary><p className="mt-2">No. <em>S. aureus</em> was excluded, as were infections needing prolonged treatment (for example endocarditis or undrained collections). The 7-day result applies to the Gram-negative-dominated, controlled-source population that was actually studied.</p></details>

    <h3 className="text-lg font-semibold text-foreground">ESBL bacteraemia: piperacillin–tazobactam versus meropenem (MERINO 2018)</h3>
    <p>MERINO tested whether piperacillin–tazobactam could be used to spare carbapenems as definitive treatment for bloodstream infection with ceftriaxone-non-susceptible <em>E. coli</em> or <em>Klebsiella</em> that tested susceptible to piperacillin–tazobactam. 30-day mortality was 12.3% (23/187) with piperacillin–tazobactam versus 3.7% (7/191) with meropenem, so non-inferiority was not shown. The practical result is that <strong className="text-foreground">meropenem remains the definitive treatment for serious ESBL bloodstream infection</strong>, even when the lab reports susceptibility to piperacillin–tazobactam.<R label="MERINO 2018" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: why does MERINO matter for stewardship?</summary><p className="mt-2">It shows that carbapenem-sparing has to be backed by outcome evidence, not just lab susceptibility. Stewardship here means using a carbapenem for proven serious ESBL bacteraemia, while shortening courses (Chastre, BALANCE) and de-escalating promptly elsewhere.</p></details>

    <LessonSources topicId="antimicrobials-icu" labels={["Chastre 2003 VAP Duration", "BALANCE 2025", "MERINO 2018"]} />
  </div>;
}
