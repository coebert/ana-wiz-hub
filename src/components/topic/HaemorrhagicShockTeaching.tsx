import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "haemorrhagic-shock";
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

export function ShockRecognitionTeaching() {
  return (
    <div className={wrap}>
      <H>Why the textbook shock classes mislead</H>
      <p>The ATLS table links estimated blood loss to heart rate, blood pressure and conscious level in four neat classes. Registry data show that real patients rarely fit those boxes:</p>
      <Q>A retrospective analysis of data derived from the TraumaRegister DGU(®) indicated that only 9.3% of all trauma patients could be allocated into one of the ATLS(®) shock classes when a combination of the three vital signs heart rate, systolic blood pressure and Glasgow Coma Scale was assessed.<R label="Mutschler 2014 ATLS" /></Q>
      <Reasoning>compensation hides blood loss. Sympathetic vasoconstriction and tachycardia hold systolic pressure up until late, so a "normal" blood pressure does not exclude major bleeding. Older patients, beta-blocked patients and athletes may not become tachycardic. Treat the trend and the mechanism, not a single number.</Reasoning>
      <H>Shock index: a bedside ratio</H>
      <p>Shock index (SI) is heart rate divided by systolic blood pressure. The German trauma registry study grouped 21,853 patients as follows:</p>
      <Q>group I, SI &lt;0.6; group II, SI ≥0.6 to &lt;1.0; group III, SI ≥1.0 to &lt;1.4; and group IV, SI ≥1.4<R label="Mutschler 2013 SI groups" /></Q>
      <Q>Worsening of SI was associated with increasing injury severity scores from 19.3 (± 12) in group I to 37.3 (± 16.8) in group IV, while mortality increased from 10.9% to 39.8%.<R label="Mutschler 2013 Shock Index" /></Q>
      <Q>Of patients, 31% in group III and 57% in group IV required ≥10 blood units until ICU admission.<R label="Mutschler 2013 transfusion" /></Q>
      <H>Lactate and base deficit</H>
      <Q>We recommend blood lactate as a sensitive test to estimate and monitor the extent of bleeding and tissue hypoperfusion; in the absence of lactate measurements, base deficit may represent a suitable alternative (Grade 1B).<R label="Rossaint 2023 lactate" /></Q>
      <H>The lethal triad</H>
      <Q>Damage control resuscitation is not one technique, but, rather, a group of strategies which address the lethal triad of coagulopathy, acidosis, and hypothermia.<R label="Leibner 2020 lethal triad" /></Q>
      <Reasoning>each part worsens the others. Hypoperfusion produces lactic acidosis; acidosis and cold slow the clotting enzymes; ongoing bleeding deepens the shock. Warming, early blood products and early bleeding control break the cycle together. The trauma page covers the <Link to="/clinical/trauma-emergency#section-the-lethal-triad" className={link}>lethal triad in more detail</Link>.</Reasoning>
      <Check question="a patient has heart rate 120 and systolic BP 100 mmHg. What is the shock index and which group is it?">
        <p>120 ÷ 100 = 1.2, which is group III (SI ≥1.0 to &lt;1.4). In the registry, 31% of group III patients needed 10 or more blood units before ICU admission, even though the systolic pressure is still 100 mmHg. (Arithmetic; teaching reasoning, not a patient-specific prediction.)</p>
      </Check>
      <LessonSources topicId={T} labels={["Mutschler 2014 ATLS", "Mutschler 2013 SI groups", "Mutschler 2013 Shock Index", "Mutschler 2013 transfusion", "Rossaint 2023 lactate", "Leibner 2020 lethal triad"]} />
    </div>
  );
}

export function BloodPressureMonitoringTeaching() {
  return (
    <div className={wrap}>
      <H>Cuffs over-read in shock</H>
      <p>Automated cuffs work out pressure from oscillations in the cuff. In low-flow, vasoconstricted states those oscillations are small and the reading becomes unreliable. A study comparing cuff and arterial line readings in 30 hypotensive emergency patients found:</p>
      <Q>Oscillometric MAP was markedly higher than invasive MAP with a mean of the differences of 13 ± 15 mmHg (oscillometric-invasive), 95% limits of agreement - 16 to 41 mmHg, percentage error was 76%. In 64% of readings, values obtained by the upper arm cuff were not able to detect hypotension.<R label="Meidert 2021 cuff" /></Q>
      <Q>Oscillometric blood pressure measurement is not able to reliably detect hypotension in emergency patients. Therefore, direct measurement of blood pressure should be established as soon as possible in patients suffering from shock.<R label="Meidert 2021 conclusion" /></Q>
      <Reasoning>the study was small (75 paired readings) and done in the emergency department, so the size of the error should not be applied to every patient. The direction matters most: a cuff can look reassuring while the true pressure is dangerously low. An arterial line also gives beat-to-beat readings during induction and blood sampling, but placing one must not delay bleeding control.</Reasoning>
      <H>Which number to target</H>
      <Q>In the initial phase following trauma, we recommend the use of a restricted volume replacement strategy with a target systolic blood pressure of 80–90 mmHg (mean arterial pressure 50–60 mmHg) until major bleeding has been stopped without clinical evidence of brain injury (Grade 1B). In patients with severe TBI (GCS ≤ 8), we recommend that a mean arterial pressure ≥ 80 mmHg be maintained (Grade 1C)<R label="Rossaint 2023 BP target" /></Q>
      <Q>If a restricted volume replacement strategy does not achieve the target blood pressure, we recommend the administration of noradrenaline in addition to fluids to maintain target arterial pressure (Grade 1C).<R label="Rossaint 2023 vasopressor" /></Q>
      <p>UK guidance gives no number in hospital. NICE NG39 asks for a restrictive approach while bleeding continues:</p>
      <Q>For patients with active bleeding use a restrictive approach to volume resuscitation until definitive early control of bleeding has been achieved.<R label="NG39 restrictive" /></Q>
      <Q>if haemorrhagic shock is the dominant condition, continue restrictive volume resuscitation or if traumatic brain injury is the dominant condition, use a less restrictive volume resuscitation approach to maintain cerebral perfusion.<R label="NG39 TBI and shock" /></Q>
      <Reasoning>MAP is the pressure that drives flow to organs and is what an arterial line measures most accurately, while systolic pressure is easier to estimate by palpation in the field. Permissive hypotension buys time to reach theatre or interventional radiology; it is not a treatment in itself. For pulse and bolus details, see the trauma lesson on <Link to="/clinical/trauma-emergency#section-fluid-boluses-and-blood-pressure-targets" className={link}>fluid boluses and blood pressure targets</Link>.</Reasoning>
      <Check question="a bleeding patient's cuff reads MAP 68 mmHg. Why might you still place an arterial line early?">
        <p>In the Meidert study, cuff MAP was on average 13 mmHg higher than the arterial line, and 64% of cuff readings missed hypotension. A cuff MAP of 68 could hide a true MAP near 55. (Arithmetic from the mean difference; teaching reasoning, not a correction factor for an individual.)</p>
      </Check>
      <LessonSources topicId={T} labels={["Meidert 2021 cuff", "Meidert 2021 conclusion", "Rossaint 2023 BP target", "Rossaint 2023 vasopressor", "NG39 restrictive", "NG39 TBI and shock"]} />
    </div>
  );
}

export function TransfusionRatioTeaching() {
  return (
    <div className={wrap}>
      <H>Ratios in hospital</H>
      <p>PROPPR compared 1:1:1 with 1:1:2 plasma, platelets and red cells. The trauma page explains the NICE 1:1 recommendation in its <Link to="/clinical/trauma-emergency#section-blood-transfusion-ratios-and-haemoglobin-thresholds" className={link}>transfusion ratios lesson</Link>; the key numbers are:</p>
      <Q>No significant differences were detected in mortality at 24 hours (12.7% in 1:1:1 group vs 17.0% in 1:1:2 group; difference, -4.2% [95% CI, -9.6% to 1.1%]; P = .12) or at 30 days (22.4% vs 26.1%, respectively; difference, -3.7% [95% CI, -10.2% to 2.7%]; P = .26).<R label="PROPPR 2015 outcomes" /></Q>
      <Q>In the initial management of patients with expected massive haemorrhage, we recommend one of the two following strategies: Fibrinogen concentrate or cryoprecipitate and pRBC (Grade 1C) FFP or pathogen-inactivated FFP in a FFP/pRBC ratio of at least 1:2 as needed (Grade 1C) In addition, we suggest a high platelet/pRBC ratio (Grade 2B).<R label="Rossaint 2023 initial products" /></Q>
      <Q>If erythrocyte transfusion is necessary, we recommend a target haemoglobin of 70–90 g/L (Grade 1C).<R label="Rossaint 2023 haemoglobin" /></Q>
      <H>Blood before hospital: two trials, two answers</H>
      <Q>Mortality at 30 days was significantly lower in the plasma group than in the standard-care group (23.2% vs. 33.0%; difference, -9.8 percentage points; 95% confidence interval, -18.6 to -1.0%; P=0.03).<R label="PAMPer 2018" /></Q>
      <Q>The composite primary outcome occurred in 128 (64%) of 199 participants randomly assigned to PRBC-LyoPlas and 136 (65%) of 210 randomly assigned to 0·9% sodium chloride (adjusted risk difference -0·025% [95% CI -9·0 to 9·0], p=0·996).<R label="RePHILL 2022" /></Q>
      <Reasoning>PAMPer (US air ambulance, thawed plasma) found a mortality benefit; RePHILL (UK, red cells plus freeze-dried plasma vs saline) found no benefit on its composite outcome of death or poor lactate clearance. The trials differed in setting, transport time, product and outcome, so neither settles the question alone. UK exams expect you to know both.</Reasoning>
      <H>Tranexamic acid: timing is everything</H>
      <Q>Early treatment (≤1 h from injury) significantly reduced the risk of death due to bleeding (198/3747 [5.3%] events in tranexamic acid group vs 286/3704 [7.7%] in placebo group; relative risk [RR] 0.68, 95% CI 0.57-0.82; p&lt;0.0001).<R label="CRASH-2 timing 2011" /></Q>
      <Q>Treatment given after 3 h seemed to increase the risk of death due to bleeding (144/3272 [4.4%] vs 103/3362 [3.1%]; RR 1.44, 1.12-1.84; p=0.004).<R label="CRASH-2 late harm 2011" /></Q>
      <H>Calcium and test-guided therapy</H>
      <Q>We recommend that ionised calcium levels be monitored and maintained within the normal range following major trauma and especially during massive transfusion (Grade 1C). We recommend the administration of calcium chloride to correct hypocalcaemia (Grade 1C).<R label="Rossaint 2023 calcium" /></Q>
      <Q>At 24 h, there was no difference in the proportion of patients who were alive and free of massive transfusion (VHA: 67%, CCT: 64%, OR 1.15, 95% CI 0.76-1.73). 28-day mortality was not different overall (VHA: 25%, CCT: 28%, OR 0.84, 95% CI 0.54-1.31)<R label="ITACTIC 2021" /></Q>
      <Reasoning>citrate in stored blood binds calcium, so ionised calcium falls during rapid transfusion and weakens clotting and heart contraction. ITACTIC found that adding viscoelastic tests (ROTEM/TEG) to a ratio-based protocol did not change overall outcomes, so these tests guide product choice rather than replace an early fixed-ratio start.</Reasoning>
      <Check question="TXA is first given 4 hours after injury. What does CRASH-2 suggest?">
        <p>After 3 hours, death due to bleeding was 4.4% with tranexamic acid vs 3.1% with placebo (RR 1.44): it seemed to increase risk. Before 1 hour, risk fell from 7.7% to 5.3%. Give it as early as possible; late first doses may harm.</p>
      </Check>
      <Check question="how many deaths from bleeding were prevented per 100 patients treated within 1 hour?">
        <p>7.7% − 5.3% = 2.4 per 100, so about 1 for every 42 treated. (Arithmetic from the quoted figures; not a quoted number needed to treat.)</p>
      </Check>
      <LessonSources topicId={T} labels={["PROPPR 2015 outcomes", "Rossaint 2023 initial products", "Rossaint 2023 haemoglobin", "PAMPer 2018", "RePHILL 2022", "CRASH-2 timing 2011", "CRASH-2 late harm 2011", "Rossaint 2023 calcium", "ITACTIC 2021"]} />
    </div>
  );
}
