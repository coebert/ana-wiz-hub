import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "fluid-balance";
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

export function TonicityTeaching() {
  return (
    <div className={wrap}>
      <H>Osmolarity in the bag versus tonicity in the patient</H>
      <p>Osmolarity counts every dissolved particle. Tonicity counts only the particles that cannot freely cross cell membranes, so it decides whether water moves into or out of cells. Sodium and chloride stay mainly outside cells and are "effective" osmoles. Glucose behaves the same way only until it enters cells and is metabolised; urea crosses membranes and adds osmolality without adding tonicity.</p>
      <Reasoning>a fluid is best classified by what it does to plasma sodium and cell volume after infusion, not only by the osmolarity printed on the bag. Glucose 5% is close to plasma osmolarity in the bag, but once the glucose is taken up it delivers free water and behaves as a hypotonic fluid. This is why glucose-containing maintenance fluids can lower plasma sodium.</Reasoning>
      <H>Three working groups</H>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="text-left font-semibold text-foreground mb-2">Classification by effective tonicity (teaching synthesis)</caption>
          <thead><tr className="border-b border-border"><th className="p-2">Group</th><th className="p-2">Examples</th><th className="p-2">Where the water goes</th><th className="p-2">Main use</th></tr></thead>
          <tbody>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">Isotonic</th><td className="p-2">0.9% sodium chloride; balanced crystalloids</td><td className="p-2">Stays outside cells, distributing across plasma and interstitium</td><td className="p-2">Resuscitation and replacement</td></tr>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">Hypotonic</th><td className="p-2">Glucose 5%; 0.18% sodium chloride in 4% glucose</td><td className="p-2">Free water moves into cells as well</td><td className="p-2">Water replacement and some adult maintenance regimens</td></tr>
            <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">Hypertonic</th><td className="p-2">3% sodium chloride</td><td className="p-2">Draws water out of cells, including brain cells</td><td className="p-2">Severe symptomatic hyponatraemia; osmotic therapy under specialist protocols</td></tr>
          </tbody>
        </table>
      </div>
      <p>Arithmetic, not a quotation: 0.9% sodium chloride is 9 g/L. Dividing by the molar mass of sodium chloride (58.44 g/mol) gives about 154 mmol/L each of sodium and chloride, which is why saline carries more chloride than plasma and can cause the hyperchloraemic acidosis discussed in the <Link to="/intensive-care/acid-base#section-saline-balanced-fluids-and-outcome" className="text-primary underline">saline vs balanced fluids lesson</Link>.<R label="SMART 2018" /></p>
      <Check question="why does glucose 5% count as hypotonic?">
        <p>Because glucose is metabolised after infusion, leaving free water that spreads into cells. Its effect on plasma sodium is that of water, even though its bag osmolarity is near plasma.</p>
      </Check>
      <LessonSources topicId={T} labels={["SMART 2018"]} />
    </div>
  );
}

export function IsotonicTeaching() {
  return (
    <div className={wrap}>
      <H>Resuscitation uses sodium-rich crystalloid</H>
      <p>NICE recommends that adult resuscitation fluid falls in a narrow sodium band and is given as a defined, reassessed bolus:</p>
      <Q>"If patients need IV fluid resuscitation, use crystalloids that contain sodium in the range 130 to 154 mmol/l, with a bolus of 500 ml over less than 15 minutes."<R label="NICE CG174 resuscitation" /></Q>
      <p>For children and young people, NICE gives a weight-based bolus and requires glucose-free fluid:</p>
      <Q>"use glucose‑free crystalloids that contain sodium in the range 131–154 mmol/litre, with a bolus of 10 ml/kg over less than 10 minutes."<R label="NICE NG29 resuscitation" /></Q>
      <H>Saline or balanced crystalloid?</H>
      <p>Both sit inside the NICE sodium band. The difference is chloride. In SMART (15,802 adults), a major adverse kidney event within 30 days occurred in 14.3% with balanced fluid and 15.4% with saline; in the blinded multicentre PLUS trial (5,037 patients), 90-day death was 21.8% v 22.0%.<R label="SMART 2018" /><R label="PLUS 2022" /> The full trial discussion lives in the <Link to="/intensive-care/acid-base#section-saline-balanced-fluids-and-outcome" className="text-primary underline">Saline, Balanced Fluids and Outcome lesson on Acid-Base Disorders</Link>.</p>
      <Reasoning>isotonic fluid is not "free" fluid. Each bolus should answer a clinical question (is perfusion improving?), and continued boluses without response add oedema rather than benefit. The NICE "500 ml over less than 15 minutes" wording sets a unit for reassessment, not a total volume.</Reasoning>
      <Check question="a 20 kg child needs fluid resuscitation. What does NICE's bolus wording give?">
        <p>10 ml/kg × 20 kg = <strong>200 ml</strong> of glucose-free crystalloid with sodium 131–154 mmol/litre, over less than 10 minutes, then reassess.<R label="NICE NG29 resuscitation" /></p>
      </Check>
      <LessonSources topicId={T} labels={["NICE CG174 resuscitation", "NICE NG29 resuscitation", "SMART 2018", "PLUS 2022"]} />
    </div>
  );
}

export function HypotonicTeaching() {
  return (
    <div className={wrap}>
      <H>Adult maintenance: small amounts of sodium, some glucose</H>
      <p>NICE sets the starting adult maintenance requirement as:</p>
      <Q>"25 to 30 ml/kg/day of water and approximately 1 mmol/kg/day of potassium, sodium and chloride and approximately 50 to 100 g/day of glucose to limit starvation ketosis."<R label="NICE CG174 maintenance" /></Q>
      <p>That sodium content is low relative to the water, so a typical adult maintenance regimen is hypotonic. NICE names one such regimen and attaches a hyponatraemia warning to it:</p>
      <Q>"consider using 25 to 30 ml/kg/day sodium chloride 0.18% in 4% glucose with 27 mmol/l potassium on day 1 (there are other regimens to achieve this). Prescribing more than 2.5 litres per day increases the risk of hyponatraemia."<R label="NICE CG174 hyponatraemia" /></Q>
      <H>Children: isotonic maintenance</H>
      <p>The paediatric guideline takes a different starting position:</p>
      <Q>"If children and young people need IV fluids for routine maintenance, initially use isotonic crystalloids that contain sodium in the range 131 to 154 mmol/litre."<R label="NICE NG29 maintenance" /></Q>
      <Reasoning>hospitalised patients often have non-osmotic antidiuretic hormone release (pain, nausea, surgery, stress), so they cannot excrete the free water in hypotonic fluid. Children have less brain space for swelling, which is why NICE uses isotonic maintenance for them. In adults, hypotonic regimens remain acceptable within limits, but plasma sodium must be monitored.</Reasoning>
      <Check question="what is the day-1 maintenance water for a 70 kg adult under NICE?">
        <p>25–30 ml/kg/day × 70 kg = <strong>1,750–2,100 ml/day</strong>, with roughly 70 mmol each of sodium, potassium and chloride.<R label="NICE CG174 maintenance" /> This stays below the 2.5 litres per day that NICE links to higher hyponatraemia risk.<R label="NICE CG174 hyponatraemia" /></p>
      </Check>
      <LessonSources topicId={T} labels={["NICE CG174 maintenance", "NICE CG174 hyponatraemia", "NICE NG29 maintenance"]} />
    </div>
  );
}

export function HypertonicTeaching() {
  return (
    <div className={wrap}>
      <H>3% saline for severe symptomatic hyponatraemia</H>
      <p>Hypertonic saline raises plasma tonicity, drawing water out of swollen brain cells. The European guideline gives a bolus-based protocol with explicit limits on the rate of rise:</p>
      <Q>"We recommend prompt i.v. infusion of 150 ml 3% hypertonic saline over 20 min. We suggest checking the serum sodium concentration after 20 min while repeating an infusion of 150 ml 3% hypertonic saline. We suggest aiming for a 5 mmol/l per 24-h increase in serum sodium concentration. We suggest limiting the increase in serum sodium concentration to 10 mmol/l during the first 24 h and 8 mmol/l during every 24 h thereafter."<R label="Spasovski 2014 Hyponatraemia" /></Q>
      <H>Bolus versus continuous infusion</H>
      <p>SALSA randomised 178 patients with symptomatic hyponatraemia to rapid intermittent boluses or slow continuous infusion of hypertonic saline:</p>
      <Q>"Overcorrection occurred in 15 of 87 (17.2%) and 22 of 91 (24.2%) patients in the RIB and SCI groups, respectively (absolute risk difference, -6.9% [95% CI, -18.8% to 4.9%]; P = .26)."<R label="SALSA 2021" /></Q>
      <p>Overcorrection was not significantly different, but fewer bolus-group patients needed treatment to lower sodium again (41.4% v 57.1%).<R label="SALSA 2021" /></p>
      <Reasoning>the danger of hypertonic saline is speed, not the fluid itself. Overly rapid correction of chronic hyponatraemia risks osmotic demyelination, so sodium is rechecked frequently and the 24-hour limit is treated as a ceiling. Hypertonic saline is given under a local protocol with senior and usually critical care involvement; this page does not set patient-specific orders.</Reasoning>
      <Check question="sodium was 118 mmol/L and is 126 mmol/L at 12 hours. Is there room to keep raising it today?">
        <p>126 − 118 = <strong>8 mmol/L</strong> already. The guideline limit is 10 mmol/L in the first 24 h, so only about 2 mmol/L remain for the next 12 hours; active hypertonic treatment would normally stop and sodium be monitored closely.<R label="Spasovski 2014 Hyponatraemia" /></p>
      </Check>
      <LessonSources topicId={T} labels={["Spasovski 2014 Hyponatraemia", "SALSA 2021"]} />
    </div>
  );
}
