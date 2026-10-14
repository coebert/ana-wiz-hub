import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "./LessonSources";
import { topicReferences } from "@/data/references";

const T = "metabolic-alkalosis";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const Check = ({ question, children }: { question: string; children: ReactNode }) => <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: {question}</summary><p className="mt-2">{children}</p></details>;
const wrap = "space-y-4 text-sm text-muted-foreground leading-relaxed";

// Reuse verified excerpt records rather than maintaining another quotation copy.
const ReviewQuote = ({ label }: { label: string }) => {
  const ref = topicReferences[T]?.find(item => item.label === label);
  if (!ref?.excerpt) return null;
  return <blockquote className="border-l-2 border-primary pl-4 text-foreground"><p>“{ref.excerpt}”<R label={label} /></p></blockquote>;
};

export function AcidBaseAlkalosisTeaching() {
  return <div className={wrap}>
    <p>Park and Sidebotham's <em>Metabolic alkalosis and mixed acid–base disturbance in anaesthesia and critical care</em> (BJA Education, 2023;23:128–135) is available in full through <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10028421/" target="_blank" rel="noopener noreferrer" className="text-primary underline">its freely readable archived copy</a>. The short quotations below are the authors' wording; the accompanying explanations are teaching synthesis.</p>
    <H>Recognise the process, not just the pH</H>
    <ReviewQuote label="BJA 2023 definition" />
    <p>Metabolic alkalosis is the non-respiratory alkalinising process. Read pH, bicarbonate and PaCO₂ together: a raised bicarbonate may instead be compensation for chronic respiratory acidosis. Mixed disorders can leave the measured pH normal or low; compare previous gases and assess the anion gap, albumin and clinical history rather than excluding alkalosis from pH alone.<R label="BJA 2023 mixed disorders" /></p>
    <H>Separate generation from maintenance</H>
    <ReviewQuote label="BJA 2023 maintenance" />
    <p>Vomiting or gastric drainage removes acid and chloride; diuretics promote renal electrolyte losses; bicarbonate or metabolised precursors can add alkali. Ask separately why the kidney has not removed it: volume/chloride depletion, potassium deficiency and impaired renal function can maintain the disturbance after the original cause stops. Volume depletion activates the renin–angiotensin–aldosterone system (RAAS), favouring sodium retention and hydrogen/potassium loss.<R label="BJA 2023 alkali gain" /><R label="Core 2022 potassium" /></p>
    <H>Check the clinical setting before choosing treatment</H>
    <ReviewQuote label="BJA 2023 treatment" />
    <p>Review gastric losses, diuretic and alkali exposure, volume status, blood pressure, chloride, potassium, magnesium and kidney function. Urine chloride can help classify the mechanism, but active diuretics and the examination matter; it is not an automatic instruction to give fluid.<R label="Core 2022 assessment" /><R label="Core 2022 urine chloride" /></p>
    <ReviewQuote label="BJA 2023 chloride" />
    <p>For a genuinely volume-depleted patient able to receive fluid, chloride-rich replacement can restore renal bicarbonate excretion. Potassium chloride addresses concomitant hypokalaemia; replacement needs local protocols, renal assessment and repeat measurements. A fluid-overloaded or mineralocorticoid-driven patient needs a different, cause-led strategy—not indiscriminate saline.<R label="BJA 2023 potassium" /><R label="BJA 2023 volume expansion" /></p>
    <H>Post-hypercapnic alkalosis and treatment limits</H>
    <p>When ventilation rapidly lowers chronically elevated PaCO₂, renal adaptation can persist, revealing metabolic alkalosis. Review previous gases, ventilation goals and chloride/potassium deficits; this is not a reason to deliberately hypoventilate. Acetazolamide may lower bicarbonate, but biochemical improvement is not evidence of faster weaning:<R label="BJA 2023 posthypercapnia" /></p>
    <ReviewQuote label="BJA 2023 acetazolamide" />
    <p>Alkalaemia can lower ionised calcium through increased albumin binding. Symptomatic or worsening disturbance requires senior assessment of the patient, ECG, electrolytes, gas trend and fluid balance; this is clinical safety synthesis, not an automatic pH-based treatment rule.<R label="BJA 2023 calcium" /></p>
    <Check question="vomiting has stopped but bicarbonate stays high with low chloride and potassium. What should you explain?">The generating event has ended, but renal maintenance persists. Assess volume status, kidney function and electrolyte deficits, stop ongoing contributors and replace losses appropriately. A normal pH would not exclude a concurrent alkalosis if another acidifying process were present.</Check>
    <p><Link to="/intensive-care/metabolic-alkalosis" className="text-primary underline">Metabolic Alkalosis: detailed assessment, causes, treatment and learning checks</Link></p>
    <LessonSources topicId={T} labels={["BJA 2023 definition", "BJA 2023 maintenance", "BJA 2023 mixed disorders", "BJA 2023 treatment", "BJA 2023 chloride", "BJA 2023 potassium", "BJA 2023 volume expansion", "BJA 2023 posthypercapnia", "BJA 2023 acetazolamide", "BJA 2023 calcium", "BJA 2023 alkali gain", "Core 2022 assessment", "Core 2022 potassium", "Core 2022 urine chloride"]} />
  </div>;
}

export function AlkalosisMechanismsTeaching() {
  return <div className={wrap}>
    <H>Alkalosis is a process; alkalaemia is the measured state</H>
    <p>Metabolic alkalosis is an acid–base process that tends to increase pH through a non-respiratory mechanism. Alkalaemia means the measured blood pH is above 7.45. These are not interchangeable: metabolic alkalosis can coexist with metabolic or respiratory acidosis, leaving the final pH normal or even low. An increased bicarbonate concentration alone can also represent compensation for chronic respiratory acidosis rather than a separate primary disorder.<R label="BJA 2023 definition" /><R label="BJA 2023 mixed disorders" /></p>
    <H>Generation and maintenance are different questions</H>
    <p><strong className="text-foreground">Generation</strong> asks where acid was lost or alkali gained. Vomiting or nasogastric suction removes gastric acid and chloride; diuretics increase distal sodium delivery, favouring potassium and hydrogen-ion loss; administered bicarbonate and metabolised bicarbonate precursors can add alkali. <strong className="text-foreground">Maintenance</strong> asks why the kidneys have not excreted the excess bicarbonate. Volume depletion, chloride deficiency, potassium deficiency and impaired filtration may prevent correction even after vomiting or diuretic administration has stopped.<R label="BJA 2023 maintenance" /><R label="Core 2022 potassium" /></p>
    <p>Volume depletion activates the renin–angiotensin–aldosterone system, encouraging sodium retention and distal potassium/hydrogen-ion loss. Chloride depletion limits bicarbonate secretion through the collecting-duct chloride–bicarbonate exchanger, pendrin. Potassium deficiency promotes renal ammonium production and bicarbonate retention: hypokalaemia is not merely a coincidental blood-test abnormality, but a mechanism sustaining the alkalosis.<R label="BJA 2023 maintenance" /><R label="Core 2022 potassium" /></p>
    <H>The Stewart description identifies the same clinical problems</H>
    <p>A relative chloride deficit compared with sodium increases the strong ion difference and has an alkalinising effect. Reduced total weak acids, particularly hypoalbuminaemia, also produce an alkalinising component. This can conceal the pH effect of concurrent lactate or other unmeasured-anion acidosis. A low albumin level is not, by itself, an indication to give albumin solely to correct pH.<R label="BJA 2023 albumin" /> The last sentence is clinical interpretation, not a treatment recommendation quoted from the review.</p>
    <Check question="vomiting has stopped, but bicarbonate remains high with low chloride and potassium. Why?">The generating event has ended, but chloride/potassium depletion and volume-related renal retention can maintain the disorder. Treating the precipitant alone may therefore be insufficient.</Check>
    <LessonSources topicId={T} labels={["BJA 2023 definition", "BJA 2023 mixed disorders", "BJA 2023 maintenance", "Core 2022 potassium", "BJA 2023 albumin"]} />
  </div>;
}

export function AlkalosisAssessmentTeaching() {
  return <div className={wrap}>
    <H>Read the gas and the clinical context together</H>
    <p>Establish pH, PaCO₂ and bicarbonate, then assess whether the respiratory response fits the metabolic process. Hypoventilation can compensate for metabolic alkalosis, but lung disease, respiratory muscle dysfunction and controlled ventilation can limit that response. An unexpectedly high or low PaCO₂ warrants consideration of a second respiratory disturbance, not simply a label of “poor compensation”. Compare with earlier gases when chronic hypercapnia is possible.<R label="BJA 2023 mixed disorders" /></p>
    <p>Review sodium, chloride, potassium, magnesium and renal function, with albumin and lactate to expose mixed disorders. Ask about vomiting, gastric drainage, diuretic timing, administered bicarbonate/alkali precursors, endocrine disease and medications. Assess circulating volume, oedema, blood pressure, fluid balance and ongoing losses; oedema does not guarantee adequate intravascular volume.<R label="Core 2022 assessment" /><R label="BJA 2023 maintenance" /></p>
    <H>Urine chloride is a clue, not an automatic fluid order</H>
    <p>The AJKD Core Curriculum review—not the BJA article—classifies metabolic alkalosis using <strong className="text-foreground">urine chloride below 20 mmol/L</strong> versus <strong className="text-foreground">above 20 mmol/L</strong>, alongside blood pressure and clinical assessment. Low urine chloride supports renal chloride conservation, often with gastric losses or previous diuretic exposure. High urine chloride suggests ongoing renal chloride loss or mineralocorticoid-related disease; it does not prove the patient is volume expanded.<R label="Core 2022 urine chloride" /></p>
    <p>Interpret the sample in relation to active diuretic treatment: a drug causing urinary chloride loss can change the result while it is acting. A borderline result around 20 mmol/L, recent treatment or a result inconsistent with the examination should prompt reassessment rather than a rigid binary decision. This is a clinical synthesis of the renal-loss mechanism and diagnostic framework, not a urine-test caveat quoted from BJA.<R label="Core 2022 urine chloride" /></p>
    <H>Look for the concealed second disorder</H>
    <p>A normal pH does not exclude serious metabolic disturbances. Concurrent sepsis-related acidosis, renal failure, ketoacidosis, diuretic-associated alkalosis and hypoalbuminaemia can offset one another. Use the albumin-corrected anion gap and the wider acid–base assessment rather than declaring a normal pH “normal acid–base balance”.<R label="BJA 2023 mixed disorders" /><R label="BJA 2023 albumin" /></p>
    <Check question="urine chloride is 35 mmol/L soon after a loop diuretic. Does this prove mineralocorticoid excess?">No. Active renal chloride loss from the diuretic can explain the result. Interpret blood pressure, volume status, medication timing and persistence; investigate endocrine causes when the overall pattern warrants it.</Check>
    <LessonSources topicId={T} labels={["BJA 2023 mixed disorders", "Core 2022 assessment", "Core 2022 urine chloride", "BJA 2023 maintenance", "BJA 2023 albumin"]} />
  </div>;
}

export function AlkalosisCausesTeaching() {
  return <div className={wrap}>
    <H>Match the mechanism to the history</H>
    <ul className="list-disc pl-5 space-y-3">
      <li><strong className="text-foreground">Vomiting and gastric drainage:</strong> acid and chloride loss generate the disorder, while volume contraction and potassium depletion can maintain it. Quantify ongoing losses and consider why drainage remains necessary.<R label="BJA 2023 maintenance" /><R label="BJA 2023 treatment" /></li>
      <li><strong className="text-foreground">Loop/thiazide diuretics:</strong> renal chloride loss and distal sodium delivery favour alkalosis. Review the need for continued diuresis as well as the electrolyte deficit; a fluid-overloaded patient cannot automatically receive the same fluid strategy as a depleted patient.<R label="BJA 2023 treatment" /><R label="Core 2022 potassium" /></li>
      <li><strong className="text-foreground">Mineralocorticoid activity:</strong> persistent hypertension and hypokalaemia with renal potassium/hydrogen-ion loss suggest an endocrine cause, including primary aldosteronism. Volume depletion can also activate aldosterone physiologically; not every aldosterone-mediated alkalosis is Conn's syndrome.<R label="BJA 2023 maintenance" /><R label="Core 2022 urine chloride" /></li>
      <li><strong className="text-foreground">Alkali loading:</strong> examine bicarbonate administration, nutrition and metabolised sodium salts. Citrate that is successfully metabolised can create an alkalinising load.<R label="BJA 2023 alkali gain" /> For the separate problem of citrate accumulation and its monitoring, see the <Link to="/intensive-care/acid-base#section-citrate" className="text-primary underline">citrate anticoagulation lesson</Link>.</li>
      <li><strong className="text-foreground">Hypoalbuminaemia:</strong> reduced weak-acid content creates an alkalinising component even when chloride is not low. Consider what other acidifying processes it may be concealing.<R label="BJA 2023 albumin" /></li>
    </ul>
    <H>Post-hypercapnic alkalosis after ventilation starts</H>
    <p>In chronic respiratory acidosis, renal adaptation raises bicarbonate and alters chloride handling. When ventilation lowers PaCO₂, the respiratory component changes faster than the renal adaptation reverses. Persistent metabolic alkalosis can therefore become apparent, sometimes with severe alkalaemia; the BJA review describes renal resolution over <strong className="text-foreground">3–5 days</strong>. Concurrent diuretic use and chloride/potassium depletion can prolong the problem.<R label="BJA 2023 posthypercapnia" /><R label="Core 2022 potassium" /></p>
    <p>Compare the previous PaCO₂/bicarbonate pattern with the current gas and review the ventilation goals and electrolyte/volume deficits. The interval is a physiological description, not a reason to wait passively when the patient is deteriorating, or an instruction to deliberately create hypoventilation.<R label="BJA 2023 posthypercapnia" /> This is bedside teaching synthesis.</p>
    <Check question="bicarbonate remains high after PaCO₂ falls rapidly during ventilation of a chronically hypercapnic patient. What mechanism should you consider?">Post-hypercapnic metabolic alkalosis: the renal adaptation outlasts the fall in PaCO₂. Also look for concurrent diuretics, chloride depletion and potassium deficiency rather than assuming a single cause.</Check>
    <LessonSources topicId={T} labels={["BJA 2023 maintenance", "BJA 2023 treatment", "Core 2022 potassium", "Core 2022 urine chloride", "BJA 2023 albumin", "BJA 2023 posthypercapnia", "BJA 2023 alkali gain"]} />
  </div>;
}

export function AlkalosisTreatmentTeaching() {
  return <div className={wrap}>
    <H>Remove the cause and the factors maintaining it</H>
    <p>The review prioritises identifying the mechanism and stopping the precipitant. Address ongoing gastric losses, unnecessary alkali administration and diuretic exposure where clinically appropriate, while correcting the associated electrolyte/volume problem. Treatment aims are individualised; a normal bicarbonate value alone is not the whole endpoint.<R label="BJA 2023 treatment" /></p>
    <H>Chloride-responsive, volume-depleted alkalosis</H>
    <p>Where volume contraction is present and fluid administration is appropriate, <strong className="text-foreground">0.9% saline</strong> supplies chloride and restores circulating volume, allowing renal bicarbonate excretion. Potassium chloride also supplies chloride without a sodium load and addresses concomitant hypokalaemia. Reassess perfusion, fluid balance, renal function and electrolyte response rather than prescribing a fixed volume for every patient.<R label="BJA 2023 chloride" /><R label="BJA 2023 potassium" /></p>
    <p>Potassium replacement requires an approved local protocol, consideration of renal function and repeat measurements. Intravenous concentration, rate, access and monitoring requirements are safety-critical; this lesson intentionally does not convert the review's monitored example into a universal infusion prescription. Check magnesium alongside potassium and the wider biochemical profile.<R label="Core 2022 assessment" /><R label="Core 2022 potassium" /></p>
    <H>Volume expansion, endocrine disease or continued need for diuresis</H>
    <p>A patient with volume expansion or excess mineralocorticoid activity is less likely to benefit from chloride-rich fluid alone. The BJA review discusses acetazolamide and potassium-sparing diuretics such as spironolactone. Choose an approach that addresses the underlying disease, potassium status, renal function and continuing fluid-management needs; do not infer that all patients labelled “chloride resistant” need the same drug or saline in addition.<R label="BJA 2023 volume expansion" /><R label="Core 2022 urine chloride" /></p>
    <H>Biochemical improvement is not proof of faster liberation from ventilation</H>
    <p>Acetazolamide promotes renal bicarbonate loss and can improve the biochemical alkalosis. However, the BJA review reports that the cited clinical trial in mechanically ventilated hypercapnic respiratory failure <strong className="text-foreground">did not show a shorter duration of mechanical ventilation</strong>. Do not promise a weaning benefit merely because bicarbonate falls.<R label="BJA 2023 acetazolamide" /></p>
    <Check question="a fluid-overloaded patient has alkalosis during necessary diuresis. Should every low chloride result trigger saline?">No. Determine the circulating-volume context and cause. Consider the need for continued diuresis, potassium/chloride replacement and clinician-selected alternatives; biochemical correction and weaning outcomes are separate questions.</Check>
    <LessonSources topicId={T} labels={["BJA 2023 treatment", "BJA 2023 chloride", "BJA 2023 potassium", "Core 2022 assessment", "Core 2022 potassium", "Core 2022 urine chloride", "BJA 2023 acetazolamide", "BJA 2023 volume expansion"]} />
  </div>;
}

export function AlkalosisSafetyTeaching() {
  return <div className={wrap}>
    <H>Why clinically important alkalaemia matters</H>
    <p>Alkalaemia increases calcium binding to albumin, reducing ionised calcium. The review associates this with neuromuscular excitability and impaired cardiac function; accompanying hypokalaemia can further increase arrhythmia risk. Total calcium alone may therefore miss the physiologically important reduction.<R label="BJA 2023 calcium" /><R label="Core 2022 potassium" /></p>
    <p>The review also describes cerebral vasoconstriction, neurological disturbance, impaired oxygen unloading and compensatory hypoventilation. Severe illness and accompanying volume/electrolyte derangements confound associations between high pH and mortality: an observational association is not proof that correcting pH alone improves survival.<R label="BJA 2023 calcium" /><R label="BJA 2023 definition" /></p>
    <H>Escalate the patient, not just the number</H>
    <p>Marked or worsening alkalaemia with arrhythmia, altered consciousness, neuromuscular symptoms, respiratory compromise or major electrolyte disturbance requires urgent senior assessment. Review the gas trend, ECG, potassium, magnesium, ionised calcium, renal function and volume status; reassess delivered ventilation when mechanically ventilated. This is a practical safety synthesis, not a trial-derived escalation threshold.<R label="Core 2022 assessment" /><R label="BJA 2023 calcium" /></p>
    <p>Refractory cases need critical-care/nephrology input to address ongoing losses, renal limitations and competing fluid goals. The BJA review notes reports of hydrochloric acid use but explicitly says it is <strong className="text-foreground">not recommended routinely</strong>. This page provides no acid-infusion recipe or automatic dialysis trigger; specialist therapies require an established protocol and close monitoring.<R label="BJA 2023 acid caution" /></p>
    <H>Rehabilitation of the physiology needs repeated reassessment</H>
    <p>Confirm whether pH and bicarbonate improve alongside correction of potassium/chloride deficits, cessation of losses and an appropriate fluid balance. A repeat gas must still be interpreted for mixed disorders: resolving one alkalinising process may expose an underlying acidosis previously hidden by it.<R label="BJA 2023 mixed disorders" /><R label="BJA 2023 treatment" /></p>
    <Check question="total calcium is normal but a severely alkalaemic patient develops tetany. Which calcium measurement matters?">Measure ionised calcium. Increased albumin binding in alkalaemia can lower ionised calcium despite a normal total calcium concentration; assess the patient and accompanying electrolyte abnormalities urgently.</Check>
    <LessonSources topicId={T} labels={["BJA 2023 calcium", "Core 2022 potassium", "BJA 2023 definition", "Core 2022 assessment", "BJA 2023 acid caution", "BJA 2023 mixed disorders", "BJA 2023 treatment"]} />
  </div>;
}