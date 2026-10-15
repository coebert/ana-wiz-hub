import type { ReactNode } from "react";
import InlineRef from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "antimicrobials-pharm";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const Q = ({ children }: { children: ReactNode }) => <blockquote className="border-l-2 border-border pl-4 italic">{children}</blockquote>;
const Reasoning = ({ children }: { children: ReactNode }) => (
  <p><strong className="text-foreground">Teaching reasoning (not a quoted guideline):</strong> {children}</p>
);

/** Source-led stewardship lesson: course length and biomarker-guided stopping. */
export function StewardshipTrialsTeaching() {
  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      <H>Shorter courses after source control: STOP-IT</H>
      <p>STOP-IT randomised adults with complicated intra-abdominal infection, after adequate source control, to a fixed course of about 4 days or to treatment until the physiological abnormalities resolved.</p>
      <Q>Surgical-site infection, recurrent intraabdominal infection, or death occurred in 56 of 257 patients in the experimental group (21.8%), as compared with 58 of 260 patients in the control group (22.3%) (absolute difference, -0.5 percentage point; 95% confidence interval [CI], -7.0 to 8.0; P=0.92).<R label="STOP-IT 2015 outcome" /></Q>
      <Q>The median duration of antibiotic therapy was 4.0 days (interquartile range, 4.0 to 5.0) in the experimental group, as compared with 8.0 days (interquartile range, 5.0 to 10.0) in the control group<R label="STOP-IT 2015 duration" /></Q>
      <Reasoning>the result applies only after the source has been drained or removed. Without source control, more antibiotic days do not replace an operation or a drain.</Reasoning>
      <H>Stopping with procalcitonin: SAPS and ADAPT-Sepsis</H>
      <p>Procalcitonin (PCT) rises more in bacterial infection than in most other inflammation. Two large ICU trials tested using falling PCT levels to stop antibiotics earlier.</p>
      <Q>Median duration of treatment was 5 days (3-9) in the procalcitonin-guided group and 7 days (4-11) in the standard-of-care group (between-group absolute difference 1·22, 0·65-1·78, p&lt;0·0001).<R label="SAPS 2016 duration" /></Q>
      <Q>Mortality at 28 days was 149 (20%) of 761 patients in the procalcitonin-guided group and 196 (25%) of 785 patients in the standard-of-care group (between-group absolute difference 5·4%, 95% CI 1·2-9·5, p=0·0122)<R label="SAPS 2016 mortality" /></Q>
      <Q>Care guided by measurement of PCT reduces antibiotic duration safely compared with standard care, but CRP does not. All-cause mortality for CRP was inconclusive.<R label="ADAPT-Sepsis 2025" /></Q>
      <Reasoning>SAPS (Dutch, open-label) found fewer deaths, but the larger UK ADAPT-Sepsis trial showed only that PCT-guided stopping was non-inferior for mortality, with a smaller cut in antibiotic days. The safest exam answer: PCT helps you stop safely; it does not prove that stopping saves lives, and CRP should not be used for this purpose.</Reasoning>
      <details className="border-l-2 border-primary pl-4">
        <summary className="cursor-pointer font-semibold text-foreground">Learning check: what did STOP-IT show, and when does it apply?</summary>
        <div className="mt-2 space-y-2"><p>About 4 days of antibiotics gave the same rate of wound infection, recurrent infection or death as about 8 days (21.8% vs 22.3%), halving antibiotic exposure. It applies only once the source of infection has been adequately controlled.</p></div>
      </details>
      <details className="border-l-2 border-primary pl-4">
        <summary className="cursor-pointer font-semibold text-foreground">Learning check: in SAPS, how many antibiotic days were saved per 100 patients?</summary>
        <div className="mt-2 space-y-2"><p>The between-group difference was 1.22 days, about 122 days per 100 patients. (Arithmetic from the quoted figure; teaching reasoning.)</p></div>
      </details>
      <LessonSources topicId={T} labels={["STOP-IT 2015 outcome", "STOP-IT 2015 duration", "SAPS 2016 duration", "SAPS 2016 mortality", "ADAPT-Sepsis 2025"]} />
    </div>
  );
}
