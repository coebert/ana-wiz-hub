import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="icu-nutrition" refLabel={label} />;

export function ProteinCalorieTrialsTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Protein and Calorie Targets: What the Trials Actually Showed</h2>
    <p>
      Guidance sets protein targets of 1.2–2.0 g/kg/day, but the largest randomised trial of deliberately <em>higher</em> protein
      dosing found no benefit — and a possible signal of harm. The lesson for the exam is that "more nutrition" is not
      automatically better; timing and phase matter.
    </p>
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">EFFORT Protein (Lancet 2023) — higher protein is not better</h3>
      <p className="text-sm mb-2">
        1,301 critically ill patients at high nutritional risk were randomised to high protein (≥2.2 g/kg/day) or usual care
        (≤1.2 g/kg/day). The primary outcome — time to discharge alive within 90 days — did not differ (HR 0.91, 95% CI 0.77–1.07;
        P = 0.27). <strong className="text-foreground">90-day mortality was 34.6% with high protein versus 32.1% with usual
        protein</strong> (RR 1.08, 95% CI 0.92–1.26), and fewer patients were discharged alive by day 60 (46.1% vs 50.1%).
        Enrolment was stopped early for a signal of harm in the higher-protein group.<R label="EFFORT Protein 2023" />
      </p>
    </div>
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">NUTRIREA-2 (Lancet 2018) — route matters less than you think in shock</h3>
      <p className="text-sm mb-2">
        2,410 ventilated patients with shock were randomised to early enteral or early parenteral nutrition. Day-28 mortality was
        <strong className="text-foreground"> 35.2% (enteral) versus 34.0% (parenteral)</strong> — no difference (P = 0.33). Enteral
        feeding caused more digestive complications (vomiting, diarrhoea and rare bowel ischaemia). The take-home is that in
        shock, the gut is not the magic organ some teaching suggests; EN remains first-line, but PN is a legitimate early
        alternative when the gut fails.<R label="NUTRIREA-2 2018" />
      </p>
    </div>
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">NUTRIREA-3 (Lancet 2022) — less may be more in the acute phase</h3>
      <p className="text-sm mb-2">
        3,044 ventilated patients with shock were randomised to low (≈6 kcal/kg/day) or standard (≈25 kcal/kg/day) calorie
        delivery. There was <strong className="text-foreground">no difference in 28-day mortality (27.9% vs 28.9%)</strong>, but
        more patients in the low-calorie group were alive and discharged from ICU by day 8 (72.9% vs 66.3%; P &lt; 0.0001), with
        fewer digestive complications and less insulin requirement. The trial concluded that calorie restriction should be
        considered during the acute phase of critical illness.<R label="NUTRIREA-3 2022" />
      </p>
    </div>
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">TARGET (NEJM 2019) — energy density does not rescue underfeeding</h3>
      <p className="text-sm mb-2">
        3,959 patients were randomised to energy-dense (1.5 kcal/mL) or standard (1.0 kcal/mL) enteral feed. 90-day mortality was
        <strong className="text-foreground"> 26.8% versus 26.2%</strong> (RR 1.03, 95% CI 0.92–1.15; P = 0.60) — no difference.
        The denser feed increased vomiting and gastric residual problems. Higher energy delivery per se does not improve
        outcomes.<R label="TARGET 2019" />
      </p>
    </div>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Synthesis:</strong> in the acute phase, start low, deliver protein progressively rather than aggressively, and accept hypocaloric feeding while the patient is shocked. Escalate towards full targets as the catabolic phase resolves.</li>
      <li><strong className="text-foreground">Exam framing:</strong> protein remains the most important macronutrient to <em>monitor and aim to deliver</em> — but EFFORT Protein shows that exceeding usual targets by protocol is not the answer. The target range (1.2–2.0 g/kg/day) is a range to track towards, not a threshold to overshoot.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what did EFFORT Protein show about higher protein dosing?</summary><p className="mt-2">High protein (≥2.2 g/kg/day) did not improve time to discharge alive, with 90-day mortality 34.6% vs 32.1% (not significant) and fewer patients discharged alive by day 60; the trial was stopped early for a harm signal.</p></details>
    <LessonSources topicId="icu-nutrition" labels={["EFFORT Protein 2023", "NUTRIREA-2 2018", "NUTRIREA-3 2022", "TARGET 2019"]} />
  </div>;
}
