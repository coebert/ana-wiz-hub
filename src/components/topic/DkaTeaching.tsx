import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "./LessonSources";
import { topicReferences } from "@/data/references";

const T = "dka";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const Check = ({ question, children }: { question: string; children: ReactNode }) => <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: {question}</summary><p className="mt-2">{children}</p></details>;
const wrap = "space-y-4 text-sm text-muted-foreground leading-relaxed";

// Reuse verified excerpt records rather than maintaining another quotation copy.
const Quote = ({ label }: { label: string }) => {
  const ref = topicReferences[T]?.find(item => item.label === label);
  if (!ref?.excerpt) return null;
  return <blockquote className="border-l-2 border-primary pl-4 text-foreground"><p>&ldquo;{ref.excerpt}&rdquo;<R label={label} /></p></blockquote>;
};

export function DkaDiagnosisTeaching() {
  return <div className={wrap}>
    <p>This page adopts the UK Joint British Diabetes Societies (JBDS) 2023 adult guideline as its primary framework, with the 2024 international consensus report (Umpierrez et al., <em>Diabetologia</em>) quoted where the two differ. Quotations are the sources' own wording; the surrounding explanation is teaching synthesis.</p>
    <H>Diagnose on ketones and acidosis, not glucose alone</H>
    <Quote label="JBDS DKA 2023" />
    <p>All three elements matter: ketonaemia above 3.0 mmol/L, hyperglycaemia above 11.0 mmol/L <em>or known diabetes</em>, and acidosis (venous bicarbonate under 15.0 mmol/L and/or venous pH under 7.3). A patient with known diabetes can meet criteria without marked hyperglycaemia — the basis of euglycaemic DKA, covered in the special-situations lesson.</p>
    <H>Measure blood ketones, not urine ketones</H>
    <Quote label="Jung 2019 ketones" />
    <p>Capillary or venous blood beta-hydroxybutyrate is the preferred measurement: urine dipsticks detect acetoacetate, lag behind the blood picture and can paradoxically appear to worsen as treatment converts beta-hydroxybutyrate to acetoacetate. Track the blood ketone trend during treatment rather than urine results.</p>
    <H>Assess severity and look for the trigger</H>
    <p>Severity follows the degree of acidosis, ketonaemia, dehydration and conscious level. Always search for a precipitant — missed insulin, infection, myocardial ischaemia, new diagnosis, SGLT2 inhibitor use, pregnancy, pancreatitis or drugs. Treating the ketoacidosis without treating the trigger invites relapse. This assessment sequence is teaching synthesis, not a quoted guideline passage.</p>
    <Check question="a patient with type 1 diabetes has glucose 9 mmol/L, blood ketones 4.2 mmol/L and venous pH 7.24. Is this DKA?">Yes. The JBDS criteria accept known diabetes in place of glucose above 11.0 mmol/L; ketonaemia above 3.0 mmol/L with pH under 7.3 completes the diagnosis. A normal-ish glucose does not exclude DKA.</Check>
    <LessonSources topicId={T} labels={["JBDS DKA 2023", "Jung 2019 ketones"]} />
  </div>;
}

export function DkaFluidsTeaching() {
  return <div className={wrap}>
    <H>Restore circulating volume first</H>
    <p>DKA involves substantial water and sodium depletion. Initial resuscitation uses crystalloid boluses guided by blood pressure, perfusion and comorbidity, followed by a structured replacement schedule with regular reassessment. The specific volumes and rates come from the JBDS guideline and local protocols; the teaching point is that fluid restoration itself lowers glucose and improves perfusion before insulin has its full effect.</p>
    <H>Which crystalloid? The balanced-vs-saline evidence</H>
    <Quote label="SMART/SALT-ED DKA 2020" />
    <p>In this subgroup analysis of the SMART and SALT-ED cluster-randomised trials, adults with DKA randomised to balanced crystalloids reached resolution faster than those given saline (median 13.0 vs 16.9 hours). This is a subgroup analysis, not a dedicated DKA trial, so it supports — but does not mandate — balanced solutions; JBDS 2023 still describes 0.9% saline as the standard initial fluid. Present both honestly: the evidence favours balanced crystalloids for speed of resolution, while UK practice per the guideline remains saline-based.</p>
    <H>Add glucose once blood glucose falls</H>
    <Quote label="DKA glucose support 2024" />
    <p>Insulin must continue until ketonaemia clears, so once glucose falls (the consensus threshold is 13.9 mmol/L; JBDS uses 14 mmol/L), dextrose is added to the fluids and the insulin rate is reduced — typically to 0.05 units/kg/h — rather than stopped. Stopping insulin because glucose has normalised, while ketones remain high, is a classic and dangerous error.</p>
    <Check question="glucose has fallen to 12 mmol/L but ketones are still 2.8 mmol/L. What should happen to the insulin infusion?">Continue it — add dextrose-containing fluid and reduce the rate (consensus: 0.05 units/kg/h) rather than stopping. The insulin is treating the ketosis, not just the glucose.</Check>
    <LessonSources topicId={T} labels={["SMART/SALT-ED DKA 2020", "DKA glucose support 2024"]} />
  </div>;
}

export function DkaInsulinPotassiumTeaching() {
  return <div className={wrap}>
    <H>Fixed-rate insulin, weight-based</H>
    <p>JBDS 2023 recommends a fixed-rate intravenous insulin infusion at 0.1 units/kg/hour (quoted in the diagnosis lesson). Fixed-rate regimens replaced sliding scales because the insulin requirement is driven by the ketosis and acidosis, not the bedside glucose. If the patient was already on a basal analogue, continuing it alongside the infusion simplifies transition later — follow local protocol.</p>
    <H>Potassium: the number that can kill</H>
    <Quote label="DKA potassium safety 2024" />
    <p>Total-body potassium is depleted in DKA even when the measured value is normal or high, because acidosis and insulin deficiency shift potassium out of cells. Insulin and fluid both drive it back in, so the measured value falls during treatment. If potassium is low at presentation, replace it first and delay insulin — giving insulin to a hypokalaemic patient risks arrhythmia and respiratory-muscle weakness.</p>
    <H>The treatment target</H>
    <Quote label="JBDS DKA potassium 2023" />
    <p>Potassium is added to the replacement fluid according to the measured value, with regular monitoring — at least hourly to two-hourly early on per local protocol. The JBDS target band is 4.0-5.5 mmol/L. Renal failure and anuria change the risk profile completely: seek senior and renal input early.</p>
    <Check question="admission potassium is 3.1 mmol/L with ketones 5.0 mmol/L and pH 7.18. What comes first?">Potassium replacement at around 10 mmol/h, with insulin delayed until potassium exceeds 3.5 mmol/L (2024 consensus). Starting insulin first would drive potassium intracellularly and risk life-threatening arrhythmia.</Check>
    <LessonSources topicId={T} labels={["DKA potassium safety 2024", "JBDS DKA potassium 2023"]} />
  </div>;
}

export function DkaResolutionTeaching() {
  return <div className={wrap}>
    <H>Resolution is biochemical, not symptomatic</H>
    <Quote label="JBDS DKA resolution 2023" />
    <p>The UK definition requires ketones below 0.6 mmol/L <em>and</em> venous pH above 7.3 — and explicitly warns against using bicarbonate as the marker at this stage. The 2024 international consensus words it slightly differently:</p>
    <Quote label="DKA resolution consensus 2024" />
    <p>The two definitions are close but not identical — the consensus accepts bicarbonate at or above 18 mmol/L as an alternative to pH, while JBDS tells you not to use bicarbonate. This page adopts the JBDS wording for UK practice; know that exam questions and overseas protocols may use the consensus version.</p>
    <H>Safe transition off the infusion</H>
    <p>Once resolution criteria are met and the patient is eating and drinking, convert to subcutaneous insulin: give the first subcutaneous dose (or confirm basal insulin is running) and continue the intravenous infusion for an overlap period before stopping it — stopping IV insulin before subcutaneous insulin is active causes immediate relapse. The exact overlap is a local-protocol detail; the principle is never to leave an insulin-dependent patient with no active insulin.</p>
    <H>Bicarbonate and phosphate: not routine</H>
    <p>Neither bicarbonate nor phosphate replacement is routine in DKA. Bicarbonate has not shown outcome benefit in trials and carries risks (paradoxical CSF acidosis, hypokalaemia); consider it only in life-threatening acidosis with senior input. Phosphate falls during treatment but routine replacement has no proven benefit and can cause hypocalcaemia. This summarises the JBDS 2023 position; see the linked guideline for the detail.</p>
    <Check question="after 18 hours of treatment, ketones are 0.4 mmol/L and venous pH 7.32. Has DKA resolved by JBDS criteria?">Yes — ketones below 0.6 mmol/L and pH above 7.3 both met. Do not wait for bicarbonate to normalise; JBDS explicitly says not to use it as the resolution marker.</Check>
    <LessonSources topicId={T} labels={["JBDS DKA resolution 2023", "DKA resolution consensus 2024"]} />
  </div>;
}

export function DkaSpecialTeaching() {
  return <div className={wrap}>
    <H>Euglycaemic DKA</H>
    <Quote label="DKA euglycaemia consensus 2024" />
    <p>Roughly one in ten DKA presentations has glucose below 11.1 mmol/L. Triggers include SGLT2 inhibitors, pregnancy, prolonged fasting and partial insulin treatment. The management is the same — fluid, potassium, fixed-rate insulin — but dextrose is needed earlier because there is less glucose headroom, and the diagnosis is easily missed if you anchor on glucose.</p>
    <H>SGLT2 inhibitors and the perioperative period</H>
    <p>SGLT2 inhibitors promote urinary glucose loss and can precipitate euglycaemic DKA during fasting, surgery or acute illness. The CPOC/JBDS 2023 perioperative guideline advises stopping dapagliflozin, empagliflozin and canagliflozin 3 days before surgery and ertugliflozin 4 days before.<R label="CPOC-JBDS Diabetes 2023" /> Check blood ketones in any sick or fasting patient on one of these drugs, whatever the glucose.</p>
    <H>Escalation and the ICU</H>
    <p>Features warranting critical-care involvement include severe acidosis, reduced conscious level, shock, hypokalaemia, renal failure and failure to improve on ward-based care. Cerebral oedema is the feared complication — predominantly in children and young adults; treat deterioration in conscious level during treatment as an emergency with senior review. This escalation framing is teaching synthesis; thresholds follow local policy.</p>
    <p>Related pages: <Link to="/intensive-care/icu-endocrine-emergencies" className="text-primary underline">Endocrine Emergencies</Link> (HHS, thyroid storm, adrenal crisis) and <Link to="/intensive-care/acid-base" className="text-primary underline">Acid-Base Disorders</Link> (anion gap interpretation).</p>
    <Check question="a fasting postoperative patient on empagliflozin has glucose 10.2 mmol/L, ketones 3.8 mmol/L and pH 7.28. What is the likely diagnosis and first drug action?">Euglycaemic DKA precipitated by the SGLT2 inhibitor. Stop the empagliflozin, and manage as DKA with fluid, potassium-guided replacement and fixed-rate insulin — dextrose will be needed early given the near-normal glucose.</Check>
    <LessonSources topicId={T} labels={["DKA euglycaemia consensus 2024", "CPOC-JBDS Diabetes 2023"]} />
  </div>;
}
