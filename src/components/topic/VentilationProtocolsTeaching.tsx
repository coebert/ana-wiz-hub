import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { sectionAnchorId } from "@/lib/sectionAnchor";

const T = "ventilation-protocols";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const Q = ({ children }: { children: ReactNode }) => <blockquote className="border-l-2 border-border pl-4 italic">{children}</blockquote>;
const Reasoning = ({ children }: { children: ReactNode }) => (
  <p><strong className="text-foreground">Teaching reasoning (not a quoted guideline):</strong> {children}</p>
);
const Check = ({ question, children }: { question: string; children: ReactNode }) => (
  <details className="border-l-2 border-primary pl-4">
    <summary className="cursor-pointer font-semibold text-foreground">Learning check: {question}</summary>
    <div className="mt-2 space-y-2">{children}</div>
  </details>
);
const wrap = "space-y-4 text-muted-foreground leading-relaxed";
const link = "text-primary underline";
const weaningHref = `/intensive-care/mechanical-ventilation#${sectionAnchorId("7. ICU Weaning: Readiness & Spontaneous Breathing Trials")}`;

export function AdmissionProtocolTeaching() {
  return (
    <div className={wrap}>
      <H>Why admission settings are standardised</H>
      <p>The ARDS Network trial compared tidal volumes of 6 and 12 ml/kg predicted body weight in acute lung injury and ARDS, with plateau pressure limits in the low-volume arm.</p>
      <Q>The trial was stopped after the enrollment of 861 patients because mortality was lower in the group treated with lower tidal volumes than in the group treated with traditional tidal volumes (31.0 percent vs. 39.8 percent, P=0.007), and the number of days without ventilator use during the first 28 days after randomization was greater in this group (mean [+/-SD], 12+/-11 vs. 10+/-11; P=0.007).<R label="ARDSNet 2000 mortality" /></Q>
      <Q>The mean tidal volumes on days 1 to 3 were 6.2+/-0.8 and 11.8+/-0.8 ml per kilogram of predicted body weight (P&lt;0.001), respectively, and the mean plateau pressures were 25+/-6 and 33+/-8 cm of water (P&lt;0.001), respectively.<R label="ARDSNet 2000 settings" /></Q>
      <Reasoning>a written admission protocol makes the low-volume start automatic rather than dependent on who is on call. A typical unit checklist: measure height, calculate predicted body weight, set the initial tidal volume from it, set PEEP and FiO₂ from the unit table, document target SpO₂ and pH, and check plateau pressure once the patient is settled. The trial was in ARDS; using the same start for every ventilated adult is common practice, not a trial finding. PEEP choice is covered on the <Link to="/intensive-care/peep-management" className={link}>PEEP Management</Link> page.</Reasoning>
      <H>Predicted body weight: worked numbers</H>
      <p>Arithmetic using the ARDS Network formula (not quoted from the abstract): male PBW = 50 + 0.91 × (height in cm − 152.4); female PBW = 45.5 + 0.91 × (height in cm − 152.4). A man 180 cm tall: 50 + 0.91 × 27.6 ≈ 75 kg, so 6 ml/kg ≈ 450 ml, whatever his actual weight.</p>
      <Check question="a 160 cm woman weighs 110 kg. What tidal volume is 6 ml/kg PBW?">
        <p>PBW = 45.5 + 0.91 × 7.6 ≈ 52 kg, so 6 ml/kg ≈ 310 ml. Using her actual weight would give 660 ml, more than double. (Arithmetic; teaching reasoning, not an individual prescription.)</p>
      </Check>
      <LessonSources topicId={T} labels={["ARDSNet 2000 mortality", "ARDSNet 2000 settings"]} />
    </div>
  );
}

export function MonitoringProtocolTeaching() {
  return (
    <div className={wrap}>
      <H>Plateau pressure and driving pressure</H>
      <p>Plateau pressure is measured with an inspiratory hold and reflects alveolar pressure at the end of the breath. Driving pressure (ΔP) is plateau pressure minus PEEP, which equals tidal volume divided by respiratory system compliance.</p>
      <Q>A 1-SD increment in ΔP (approximately 7 cm of water) was associated with increased mortality (relative risk, 1.41; 95% confidence interval [CI], 1.31 to 1.51; P&lt;0.001), even in patients receiving "protective" plateau pressures and VT (relative risk, 1.36; 95% CI, 1.17 to 1.58; P&lt;0.001).<R label="Amato 2015 driving pressure" /></Q>
      <Reasoning>Amato pooled earlier trials and found an association; no trial has yet proven that targeting a set ΔP improves survival. A monitoring protocol should still record plateau pressure, PEEP and ΔP at set times (for example each shift and after any setting change), with an escalation route when they rise. A hold manoeuvre needs a relaxed, passive patient; active breathing makes the number unreliable.</Reasoning>
      <H>A practical monitoring round</H>
      <ul className="list-disc pl-5 space-y-2">
        <li>Tidal volume per kg PBW, plateau pressure, PEEP and ΔP</li>
        <li>Oxygenation and blood gas against the documented targets</li>
        <li>Intrinsic PEEP with an expiratory hold where airflow obstruction is possible</li>
        <li>Sedation score against target, and daily screening for a sedation break and breathing trial</li>
      </ul>
      <p className="text-sm">The list above is teaching synthesis, not a quoted protocol.</p>
      <Check question="plateau 28 cmH₂O, PEEP 10 cmH₂O, tidal volume 420 ml. What are ΔP and compliance?">
        <p>ΔP = 28 − 10 = 18 cmH₂O. Compliance = 420 ÷ 18 ≈ 23 ml/cmH₂O. The plateau is under 30, but ΔP is high, the situation Amato linked to higher mortality even with "protective" settings. (Arithmetic; teaching reasoning.)</p>
      </Check>
      <LessonSources topicId={T} labels={["Amato 2015 driving pressure"]} />
    </div>
  );
}

export function WeaningProtocolTeaching() {
  return (
    <div className={wrap}>
      <H>Pairing sedation breaks with breathing trials: the ABC trial</H>
      <p>The Awakening and Breathing Controlled trial paired a daily spontaneous awakening trial (stopping sedation) with a spontaneous breathing trial, compared with breathing trials alone under usual sedation.</p>
      <Q>Patients in the intervention group spent more days breathing without assistance during the 28-day study period than did those in the control group (14.7 days vs 11.6 days; mean difference 3.1 days, 95% CI 0.7 to 5.6; p=0.02)<R label="ABC 2008 outcomes" /></Q>
      <Q>More patients in the intervention group self-extubated than in the control group (16 patients vs six patients; 6.0% difference, 95% CI 0.6% to 11.8%; p=0.03)<R label="ABC 2008 self-extubation" /></Q>
      <H>Do written weaning protocols help?</H>
      <Q>The total geometric mean duration of mechanical ventilation in the protocolized weaning group was on average reduced by 26% compared with the usual care group (N = 14 trials, 95% confidence interval (CI) 13% to 37%, P = 0.0002). Reductions were most likely to occur in medical, surgical and mixed ICUs, but not in neurosurgical ICUs.<R label="Blackwood 2014 Cochrane" /></Q>
      <Q>Automated closed-loop systems probably result in little to no difference in mortality compared with non-automated weaning methods (risk ratio [RR] 0.94, 95% CI 0.82 to 1.07; I2 = 0%; 38 RCTs, 3620 participants, 618 events; moderate-certainty evidence).<R label="Cochrane 2025 closed-loop" /></Q>
      <Reasoning>protocols help most where weaning would otherwise wait for a daily round; they shorten ventilation rather than reduce deaths. Neurosurgical patients often have reasons other than lung function for staying intubated. Readiness criteria and how to run the breathing trial are in the <Link to={weaningHref} className={link}>ICU weaning lesson</Link> on Mechanical Ventilation. A protocol prompts a decision; it does not make the extubation decision on its own.</Reasoning>
      <Check question="what was the main safety signal in the ABC trial, and how should a protocol handle it?">
        <p>More self-extubations (16 vs 6). Sedation breaks need nurse presence, restraint and safety screening, and a clear plan for when to restart sedation.</p>
      </Check>
      <LessonSources topicId={T} labels={["ABC 2008 outcomes", "ABC 2008 self-extubation", "Blackwood 2014 Cochrane", "Cochrane 2025 closed-loop"]} />
    </div>
  );
}
