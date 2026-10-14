import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="bariatric-anaesthesia" refLabel={label} />;

export function BariatricEvidenceTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Evidence Behind Obesity Anaesthesia: Guidance, Screening, Dosing and Positioning</h2>
    <p>Much of what is taught about anaesthesia for obese patients is expert consensus. This lesson separates the parts that rest on validation studies or trials from the parts that are agreed good practice.</p>

    <h3 className="text-lg font-semibold text-foreground">UK guidance: what it is, and what it is based on</h3>
    <p>The 2015 joint guideline from the Association of Anaesthetists and the Society for Obesity and Bariatric Anaesthesia (SOBA) sets out organisational and clinical perioperative care for obese patients. It is explicit that its advice "is based on previously published advice, clinical studies and expert opinion". In a viva, present its recommendations as authoritative UK consensus, not as trial-proven interventions.<R label="AAGBI SOBA 2015" /></p>

    <h3 className="text-lg font-semibold text-foreground">Screening for obstructive sleep apnoea: where STOP-Bang came from</h3>
    <p>The STOP questionnaire (snoring, tiredness, observed apnoea, high blood pressure) was developed and validated in surgical pre-assessment clinics. 2,467 patients completed it, and 177 had sleep studies for validation. Used alone, its sensitivity for an apnoea–hypopnoea index above 5, 15 and 30 was 65.6%, 74.3% and 79.5%. Adding BMI, age, neck circumference and sex (the "Bang") raised sensitivity to 83.6%, 92.9% and 100%.<R label="Chung 2008 STOP" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: why is a high STOP-Bang score a prompt rather than a diagnosis?</summary><p className="mt-2">It was designed for high sensitivity, so few patients with significant sleep apnoea are missed. The price is that many people who score high do not have it. A high score means: assume OSA, plan opioid-sparing anaesthesia and monitored recovery, and consider referral. It does not confirm the diagnosis.</p></details>

    <h3 className="text-lg font-semibold text-foreground">Drug dosing scalars</h3>
    <p>Dosing by total body weight risks overdose, while dosing by ideal body weight can under-dose. Ingrande and Lemmens' review concluded that, "with the exception of neuromuscular antagonists, lean body weight is the optimal dosing scalar for most drugs used in anaesthesia including opioids and anaesthetic induction agents". They also highlight that obstructive sleep apnoea and fat around the pharynx and chest wall make these patients more sensitive to the respiratory effects of anaesthetic drugs.<R label="Ingrande 2010 Dosing" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: which weight would you use for a propofol induction dose in a 160 kg patient?</summary><p className="mt-2">Lean body weight, titrated to effect. Total body weight would give a large overdose and severe hypotension. A maintenance infusion is a different question: it is often based on an adjusted weight, because clearance is higher. Always state the drug, and whether you mean induction or maintenance, before naming a scalar.</p></details>

    <h3 className="text-lg font-semibold text-foreground">Ramped positioning with a videolaryngoscope</h3>
    <p>Ramping (ear level with the sternal notch) is recommended mainly for direct laryngoscopy, and to improve oxygen reserve and the time before desaturation. A 2025 meta-analysis of four RCTs (341 adults) compared ramped and sniffing positions when using a <em>videolaryngoscope</em>. It found no significant difference in intubation time, first-attempt success (RR 1.03) or glottic view. The trials were small and varied widely, and they were not limited to obese patients.<R label="Samagh 2025 Ramped VL" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: if a videolaryngoscope removes the need for alignment, why still ramp an obese patient?</summary><p className="mt-2">Because head-up, ramped positioning improves functional residual capacity and slows desaturation. It also helps mask ventilation and makes rescue with direct laryngoscopy or front-of-neck access easier. The meta-analysis addressed only intubation mechanics with a videolaryngoscope, not oxygenation or rescue.</p></details>

    <LessonSources topicId="bariatric-anaesthesia" labels={["AAGBI SOBA 2015", "Chung 2008 STOP", "Ingrande 2010 Dosing", "Samagh 2025 Ramped VL"]} />
  </div>;
}
