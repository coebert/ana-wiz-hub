import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="cardiac-arrest-post-resus" refLabel="Schmidt 2022 BOX oxygen" />;

export function PostArrestOxygenTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Oxygen Targets After Cardiac Arrest: the BOX Trial</h2>
    <p>BOX used a 2-by-2 factorial design in comatose adults after out-of-hospital cardiac arrest. Patients were randomised to a restrictive PaO₂ target of 9–10 kPa or a liberal target of 13–14 kPa, and separately to one of two blood-pressure targets (reported separately). In 789 patients, death or severe disability/coma within 90 days occurred in 32.0% vs 33.9% (HR 0.95, 95% CI 0.75–1.21; P = 0.69). 90-day mortality was 28.7% vs 31.1%, and median neuron-specific enolase at 48 h was similar (17 vs 18 µg/L).<R /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">What it means:</strong> within the range of 9–14 kPa, the exact target did not change outcome. Normoxaemia, rather than a specific number within that range, is a reasonable aim.<R /></li>
      <li><strong className="text-foreground">What it does not test:</strong> neither arm allowed hypoxaemia or marked hyperoxaemia. The trial therefore does not show that very high PaO₂ is safe, or that tolerating values below 9 kPa is.</li>
      <li><strong className="text-foreground">Practice point:</strong> after ROSC, titrate FiO₂ down from 1.0 once arterial gases or reliable SpO₂ are available, avoiding both extremes.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what PaO₂ ranges did BOX compare?</summary><p className="mt-2">9–10 kPa (restrictive) versus 13–14 kPa (liberal). The primary outcome did not differ.</p></details>
    <LessonSources topicId="cardiac-arrest-post-resus" labels={["Schmidt 2022 BOX oxygen"]} />
  </div>;
}
