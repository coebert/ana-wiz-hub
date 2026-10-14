import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const R = ({ label }: { label: string }) => <InlineRef topicId="icu-endocrine-emergencies" refLabel={label} />;

export function HyperglycaemicEmergenciesTeaching() {
  return <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-5">
    <h3 className="text-lg font-semibold text-foreground">DKA: treat insulin deficiency, not just the glucose</h3>
    <p>Insulin stops lipolysis and hepatic ketone production. A falling glucose does not prove that ketoacidosis has resolved: continue insulin with glucose supplementation when needed, and continue the usual long-acting basal insulin. Use blood β-hydroxybutyrate rather than urine ketones to follow recovery; urine ketones can remain positive during conversion of β-hydroxybutyrate to acetoacetate. Confirm the diagnosis and look for infection, insulin omission, infarction, pregnancy or a drug precipitant while treatment proceeds.<R label="JBDS-IP DKA 2023 (ABCD)" /></p>
    <p><strong className="text-foreground">Potassium is a separate safety decision.</strong> Osmotic diuresis depletes total-body potassium even when the admission result is high. Insulin moves potassium intracellularly. The JBDS replacement table specifies no potassium above 5.5 mmol/L, 40 mmol/L of replacement fluid at 3.5–5.5 mmol/L, and senior review with additional replacement below 3.5 mmol/L. The treatment target is 4.0–5.5 mmol/L: a replacement threshold is not the same as the desired range. Severe hypokalaemia requires urgent monitored correction and a senior insulin plan, not automatic use of a standard bag or an unsupervised concentrated infusion. Renal failure and oliguria also change replacement safety.<R label="JBDS DKA potassium 2023" /></p>
    <p><strong className="text-foreground">An inadequate biochemical response is a troubleshooting problem.</strong> Track hourly glucose and blood ketones; a ketone fall of 0.5 mmol/L/h, bicarbonate rise of 3 mmol/L/h or glucose fall of 3 mmol/L/h are JBDS response targets. Before increasing insulin, inspect the prescription, concentration, pump, cannula and connections; reassess perfusion and the precipitant. Add 10% glucose when glucose falls below 14 mmol/L; consider reducing insulin to 0.05 units/kg/h under the JBDS pathway to reduce hypoglycaemia and hypokalaemia while maintaining ketone clearance.<R label="JBDS-IP DKA 2023 (ABCD)" /></p>
    <p><strong className="text-foreground">Resolution is ketones &lt;0.6 mmol/L and venous pH &gt;7.3.</strong> Do not require bicarbonate normalisation at this stage: chloride-rich fluid can leave a non-ketotic acidosis. Conversely, normal glucose with persistent ketones is not recovery. Once resolved and able to eat, arrange subcutaneous insulin with the prescribed overlap before stopping IV insulin; if not eating, a variable-rate regimen may be needed. The diabetes team should address the cause, injection technique, sick-day rules and access to insulin before discharge.<R label="JBDS DKA resolution 2023" /></p>
    <h3 className="text-lg font-semibold text-foreground">HHS: follow osmolality and perfusion together</h3>
    <p>Use measured sodium in calculated osmolality: 2 × sodium + glucose + urea, with all concentrations in mmol/L. As glucose falls, water moves back into cells and measured sodium may rise. <strong className="text-foreground">That rise alone is not a reason to switch to hypotonic fluid.</strong> Assess the osmolality trajectory, fluid balance and clinical perfusion. JBDS aims for an osmolality fall of 3–8 mOsm/kg/h, glucose fall no faster than 5 mmol/L/h and sodium fall no faster than 10 mmol/L in 24 hours. Consider 0.45% sodium chloride only if osmolality is not declining despite adequate replacement with 0.9% sodium chloride and positive fluid balance.<R label="JBDS HHS sodium 2023" /></p>
    <p>In HHS without significant ketosis, start with isotonic fluid and reassessment, adapting the rate for heart failure, renal disease and frailty. Start insulin at 0.05 units/kg/h once osmolality stops falling with fluid replacement alone; earlier insulin can worsen circulatory collapse and osmotic shifts. Significant ketonaemia changes the pathway: insulin then starts alongside IV fluids, and mixed DKA/HHS with acidosis needs the DKA insulin regimen rather than a blanket delayed-insulin rule. Start 5% or 10% glucose once blood glucose is below 14 mmol/L, alongside the insulin infusion. Use prophylactic anticoagulation unless contraindicated, not therapeutic anticoagulation merely because the HHS is severe.<R label="JBDS HHS sodium 2023" /></p>
    <p>HHS recovery is holistic: osmolality below 300 mOsm/kg, correction of hypovolaemia with urine output at least 0.5 mL/kg/h, glucose below 15 mmol/L and cognition back to the premorbid state. Persistent confusion requires reassessment for stroke, infection, medication effects or another diagnosis, rather than assuming that normalising glucose has completed treatment.<R label="JBDS HHS sodium 2023" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: sodium rises while glucose falls in HHS. Must the fluid change?</summary><p className="mt-2">No. Review calculated osmolality, volume replacement and perfusion. A rising sodium is expected as hyperglycaemia corrects. The indication for 0.45% saline is failure of osmolality to decline despite adequate isotonic replacement, not sodium alone. Do not accelerate correction simply to normalise a single number.</p></details>
    <LessonSources topicId="icu-endocrine-emergencies" labels={["JBDS-IP DKA 2023 (ABCD)", "JBDS DKA potassium 2023", "JBDS DKA resolution 2023", "JBDS HHS sodium 2023"]} />
  </div>;
}

export function ThyroidEmergenciesTeaching() {
  return <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-5">
    <h3 className="text-lg font-semibold text-foreground">Thyroid storm: a clinical syndrome, not a hormone cutoff</h3>
    <p>Storm is systemic decompensation in a thyrotoxic patient: fever, arrhythmia or heart failure, central nervous system disturbance and gastrointestinal/hepatic dysfunction. Thyroid hormone concentrations alone do not distinguish storm from uncomplicated thyrotoxicosis. Sepsis can both precipitate storm and mimic it, so investigate and treat both when appropriate. A Burch–Wartofsky score supports, but does not replace, judgement: ATA recommends aggressive treatment at a score of at least 45; scores of 25–44 require clinical assessment rather than automatic reassurance or diagnosis.<R label="ATA 2016" /></p>
    <p><strong className="text-foreground">Treat several mechanisms in parallel.</strong> Thionamides block synthesis, iodide blocks release, corticosteroids reduce peripheral conversion and cover adrenal insufficiency, and cooling, respiratory support and treatment of the trigger address organ failure. Under the ATA regimen, iodide follows the thionamide by at least one hour. Do not wait for a β-blocker to work before beginning the other treatments. PTU also reduces conversion of T4 to T3; methimazole is an alternative, and liver injury, route availability and specialist advice affect the choice.<R label="ATA 2016" /></p>
    <p><strong className="text-foreground">Tachycardia is not always safe to suppress immediately.</strong> Assess perfusion and cardiac function. In low-output failure or shock, an abrupt reduction in sympathetic support can cause collapse. If β-blockade is appropriate, titrate with close monitoring; a short-acting agent permits reassessment but is not harmless. Propranolol at high doses reduces T4-to-T3 conversion; esmolol should not be credited with the same conversion effect. Persistent organ failure despite treatment warrants joint endocrine/ICU review for rescue measures, rather than simply escalating a long-acting β-blocker.<R label="ATA 2016" /></p>
    <h3 className="text-lg font-semibold text-foreground">Myxoedema coma: support breathing and replace cortisol first</h3>
    <p>Profound hypothyroidism impairs ventilatory drive, cardiac output and water excretion; coma is not required for the diagnosis. Hypothermia can conceal infection. Protect ventilation, assess glucose and sodium, seek the precipitant and give empiric IV glucocorticoid coverage before thyroid hormone. A low or normal TSH does not exclude central hypothyroidism.<R label="ATA myxoedema 2014" /></p>
    <p>ATA recommends IV levothyroxine initially: a loading dose of 200–400 micrograms, reduced for smaller or older patients and those with coronary disease or arrhythmia. Subsequent replacement is weight based, with the IV dose reduced to 75% of the equivalent oral dose. IV liothyronine may be added selectively, but high doses should be avoided; this is not an interchangeable fixed-dose T3-or-T4 recipe. Follow mental state, cardiac and pulmonary function as well as thyroid tests. The recommendations are strong but supported by low-quality evidence because this emergency is rare.<R label="ATA myxoedema 2014" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: why not reflexively give propranolol to a shocked patient with storm?</summary><p className="mt-2">The tachycardia may be sustaining output in severe cardiac dysfunction. Assess haemodynamics and cardiac function, obtain senior input and titrate only when appropriate. Begin the other storm treatments and organ support without waiting for rate control.</p></details>
    <LessonSources topicId="icu-endocrine-emergencies" labels={["ATA 2016", "ATA myxoedema 2014"]} />
  </div>;
}

export function AdrenalPituitaryEmergenciesTeaching() {
  return <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-5">
    <h3 className="text-lg font-semibold text-foreground">Adrenal crisis: distinguish cortisol from aldosterone loss</h3>
    <p>Cortisol deficiency impairs vascular responsiveness and glucose production and increases vasopressin-mediated water retention. Both primary and secondary insufficiency can cause shock, hyponatraemia and hypoglycaemia. Primary adrenal failure additionally loses aldosterone and can produce salt wasting and hyperkalaemia. In glucocorticoid-induced or pituitary insufficiency, aldosterone is usually preserved: absence of hyperkalaemia does not exclude crisis, and its presence needs assessment for renal failure or another cause.<R label="SfE adrenal emergency 2016" /></p>
    <p>If feasible, take cortisol and ACTH before treatment, but do not wait for results or a stimulation test. Give hydrocortisone 100 mg IV or IM immediately, followed by 200 mg over 24 hours by infusion or 50 mg every six hours, alongside isotonic fluid resuscitation and correction of hypoglycaemia. Reassess for fluid overload in older patients or renal impairment. Treat infection, missed replacement or another trigger; ongoing hypotension also requires evaluation for bleeding, cardiogenic shock and other causes.<R label="SfE adrenal emergency 2016" /></p>
    <p>High-dose hydrocortisone provides sufficient mineralocorticoid activity during crisis. Introduce fludrocortisone when hydrocortisone falls below 50 mg/day <strong className="text-foreground">only in primary adrenal insufficiency</strong>; it is not routinely needed in steroid-induced or pituitary disease. Reduce stress replacement with clinical recovery under endocrine advice, rather than applying a universal daily-halving rule. Before discharge, arrange sick-day advice, a steroid emergency card, an emergency injection kit where indicated and a plan for vomiting or inability to take oral treatment.<R label="SfE adrenal emergency 2016" /></p>
    <h3 className="text-lg font-semibold text-foreground">Pituitary apoplexy: endocrine resuscitation and visual assessment</h3>
    <p>Sudden severe headache with visual impairment, ophthalmoplegia or altered consciousness should raise suspicion of haemorrhage or infarction in a pituitary tumour, even without a previous diagnosis. Exclude subarachnoid haemorrhage and meningitis where appropriate. MRI is the investigation of choice; a reassuring routine CT does not rule out apoplexy. Assess visual acuity and fields, haemodynamics and electrolytes while contacting endocrine and neurosurgical teams.<R label="SfE apoplexy emergency 2016" /></p>
    <p>The emergency guidance identifies haemodynamic instability, altered consciousness, reduced visual acuity or severe visual field defects as indications for empiric steroids. Take endocrine samples if doing so does not delay resuscitation. Urgent referral is not the same as automatic surgery: severe or persistent visual deficits and deteriorating consciousness support decompression after medical stabilisation, while selected stable patients can be managed conservatively with close specialist review. Replace deficient cortisol before thyroxine, and monitor urine output and sodium for evolving water-balance disorders.<R label="SfE apoplexy emergency 2016" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: does a normal potassium exclude steroid-induced adrenal crisis?</summary><p className="mt-2">No. Aldosterone is usually preserved in secondary insufficiency. Cortisol deficiency alone can produce life-threatening shock, hyponatraemia and hypoglycaemia. Treat promptly when suspected; fludrocortisone is not routinely required for this form of insufficiency.</p></details>
    <LessonSources topicId="icu-endocrine-emergencies" labels={["SfE adrenal emergency 2016", "SfE apoplexy emergency 2016"]} />
  </div>;
}

export function EndocrinePerioperativeTeaching() {
  return <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-5">
    <h3 className="text-lg font-semibold text-foreground">SGLT2 inhibitors: glucose can conceal ketoacidosis</h3>
    <p>Glycosuria lowers glucose while fasting, illness and relative insulin deficiency promote ketogenesis. An unwell patient taking an SGLT2 inhibitor needs blood ketones and a blood gas even with near-normal glucose. Do not attribute a high-anion-gap acidosis to fasting without evaluating DKA, lactate, renal failure and other causes. Treat confirmed ketoacidosis with insulin plus appropriate glucose, electrolyte replacement and resuscitation; a normal glucose is not a reason to stop ketone-clearing insulin.<R label="JBDS-IP DKA 2023 (ABCD)" /></p>
    <p>MHRA's March 2020 advice is to interrupt SGLT2 treatment during hospitalisation for major surgery or acute serious illness, monitor blood rather than urine ketones, and restart only when ketones are normal and the patient's condition is stable. <strong className="text-foreground">That notice does not specify a three-day elective cessation interval.</strong> Use the current local perioperative pathway for elective timing; do not delay life-saving surgery merely to complete a drug-free interval. Following an episode of DKA, restarting needs diabetes-specialist review of the cause and recurrence risk.<R label="MHRA SGLT2 interruption 2020" /></p>
    <p>A safe handover identifies the last SGLT2 dose, usual basal insulin and steroid replacement, ketone/pH/potassium trends, fluid balance and the next scheduled tests. Hormone replacement and insulin are time-critical medicines: an omitted dose during a move to theatre or ICU can undo initial treatment. Clinical deterioration should trigger reassessment of both the endocrine diagnosis and coexisting infection, bleeding or cardiac disease.<R label="JBDS-IP DKA 2023 (ABCD)" /><R label="SfE adrenal emergency 2016" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: glucose is 8.5 mmol/L, ketones 4.2 and pH 7.18 on empagliflozin. Is DKA excluded?</summary><p className="mt-2">No. This is compatible with euglycaemic DKA. Stop the drug, begin the DKA pathway with glucose support as required, assess potassium and volume status, and seek diabetes/critical-care input. Track ketones and pH rather than glucose alone.</p></details>
    <LessonSources topicId="icu-endocrine-emergencies" labels={["MHRA SGLT2 interruption 2020", "JBDS-IP DKA 2023 (ABCD)", "SfE adrenal emergency 2016"]} />
  </div>;
}
export function HyponatraemiaCorrectionTeaching() {
  const S = () => <InlineRef topicId="icu-endocrine-emergencies" refLabel="SALSA 2021" />;
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border">
    <h3 className="text-lg font-serif font-bold text-foreground">Giving Hypertonic Saline: Bolus or Infusion? (SALSA)</h3>
    <p>SALSA randomised 178 adults with symptomatic hyponatraemia (mean sodium 118.2 mmol/L, mean age 73) to rapid intermittent boluses or a slow continuous infusion of hypertonic saline.<S /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Overcorrection (primary outcome):</strong> 17.2% with boluses vs 24.2% with infusion. The difference was not statistically significant (P = 0.26).<S /></li>
      <li><strong className="text-foreground">Re-lowering treatment</strong> was needed less often with boluses (41.4% vs 57.1%; number needed to treat 6.3), and more bolus patients reached the target rise within 1 hour (32.2% vs 17.6%).<S /></li>
      <li><strong className="text-foreground">Symptoms and overall sodium rise</strong> did not differ between groups.<S /></li>
      <li><strong className="text-foreground">Practice point:</strong> both methods worked, and about one patient in five overcorrected either way. Frequent sodium checks and a plan to re-lower are essential whichever method is chosen.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: did SALSA show that boluses cause less overcorrection?</summary><p className="mt-2">No. Overcorrection was 17.2% vs 24.2%, which was not significant. Boluses did reduce the need for re-lowering treatment.</p></details>
    <LessonSources topicId="icu-endocrine-emergencies" labels={["SALSA 2021"]} />
  </div>;
}

export function PhaeochromocytomaPreparationTeaching() {
  const G = () => <InlineRef topicId="icu-endocrine-emergencies" refLabel="Endocrine Society PPGL 2014" />;
  const P = () => <InlineRef topicId="icu-endocrine-emergencies" refLabel="PRESCRIPT 2020" />;
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border">
    <h3 className="text-lg font-serif font-bold text-foreground">Preparing for Phaeochromocytoma Surgery: Guideline and PRESCRIPT</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Diagnosis:</strong> initial testing should be plasma free or urinary fractionated metanephrines; CT is suggested for first imaging.<G /></li>
      <li><strong className="text-foreground">Preparation:</strong> every patient with a functional tumour should have preoperative blockade, with a high-sodium diet and fluid intake to prevent hypotension after removal.<G /></li>
      <li><strong className="text-foreground">Surgery:</strong> minimally invasive adrenalectomy for most phaeochromocytomas; open resection for most paragangliomas.<G /></li>
      <li><strong className="text-foreground">Which α-blocker? PRESCRIPT:</strong> 134 patients in 9 Dutch centres were randomised to phenoxybenzamine or doxazosin for 2–3 weeks before surgery. Time outside blood pressure targets (SBP &gt;160 or MAP &lt;60 mmHg) did not differ: 11.1% vs 12.2% (P = .75).<P /></li>
      <li><strong className="text-foreground">Secondary results:</strong> phenoxybenzamine gave a lower haemodynamic instability score (38.0 vs 50.0, P = .02). 30-day cardiovascular complications were 8.8% vs 6.9% (P = .68), with no deaths. Whether the steadier course improves outcome could not be established.<P /></li>
      <li><strong className="text-foreground">Anaesthetic point:</strong> expect surges on induction and tumour handling, and hypotension after the veins are tied. Both α-blockers are reasonable; the trial was open-label and too small to compare complications.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: in PRESCRIPT, did phenoxybenzamine reduce time outside blood pressure targets compared with doxazosin?</summary><p className="mt-2">No — 11.1% vs 12.2% (P = .75). It did lower the instability score, a secondary measure.</p></details>
    <LessonSources topicId="icu-endocrine-emergencies" labels={["Endocrine Society PPGL 2014", "PRESCRIPT 2020"]} />
  </div>;
}

export function PhaeochromocytomaCrisisTeaching() {
  const W = () => <InlineRef topicId="icu-endocrine-emergencies" refLabel="Whitelaw 2014 (Phaeo crisis)" />;
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border">
    <h3 className="text-lg font-serif font-bold text-foreground">Phaeochromocytoma Crisis: Not Only Hypertension</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Evidence base:</strong> crisis is an endocrine emergency with significant mortality, and there is little published guidance; this clinical practice update draws on published cases and proposes a classification.<W /></li>
      <li><strong className="text-foreground">Alpha-blockade:</strong> it is strongly associated with surviving a crisis.<W /></li>
      <li><strong className="text-foreground">Shock:</strong> for sustained hypotension, mechanical circulatory support such as an intra-aortic balloon pump or ECMO is strongly recommended. Do not assume the crisis will look like hypertension.<W /></li>
      <li><strong className="text-foreground">Timing of surgery:</strong> defer it until the patient is medically stable; emergency adrenalectomy in a crisis is not the default.<W /></li>
      <li><strong className="text-foreground">Limits:</strong> this is a review of case reports and series, not trials, so the associations may reflect who was well enough to be treated.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: a patient in phaeochromocytoma crisis has sustained hypotension despite treatment. What does the review strongly recommend?</summary><p className="mt-2">Mechanical circulatory support (e.g. intra-aortic balloon pump or ECMO), with surgery deferred until medical stabilisation.</p></details>
    <LessonSources topicId="icu-endocrine-emergencies" labels={["Whitelaw 2014 (Phaeo crisis)"]} />
  </div>;
}

export function DkaFluidChoiceTeaching() {
  const S = () => <InlineRef topicId="icu-endocrine-emergencies" refLabel="SMART/SALT-ED DKA 2020" />;
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border mt-5">
    <h3 className="text-lg font-serif font-bold text-foreground">Which Fluid in DKA? Balanced Crystalloid vs Saline</h3>
    <p>Saline can cause hyperchloraemic acidosis, which can slow the fall in acidosis that defines DKA recovery. This analysis took the 172 adults with DKA from two Nashville cluster-randomised trials (SALT-ED and SMART): 94 received balanced crystalloid (Hartmann's-type or Plasma-Lyte) and 78 saline.<S /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Resolution:</strong> median time to DKA resolution was 13.0 h with balanced crystalloid vs 16.9 h with saline (adjusted HR 1.68, 95% CI 1.18–2.38).<S /></li>
      <li><strong className="text-foreground">Insulin:</strong> the insulin infusion was stopped sooner — median 9.8 h vs 13.4 h (adjusted HR 1.45).<S /></li>
      <li><strong className="text-foreground">Limits:</strong> a secondary subgroup analysis from one US centre, young patients (median age 29), using US resolution criteria; it was not designed to show differences in harm or death.</li>
      <li><strong className="text-foreground">UK practice point:</strong> the JBDS pathway above remains the local standard. This evidence explains why bicarbonate may lag behind ketone clearance with saline, and why resolution is judged on ketones and pH.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what was the median time to DKA resolution with balanced crystalloid vs saline?</summary><p className="mt-2">13.0 h vs 16.9 h, in a secondary analysis of two cluster-randomised trials.</p></details>
    <LessonSources topicId="icu-endocrine-emergencies" labels={["SMART/SALT-ED DKA 2020"]} />
  </div>;
}

export function PituitaryApoplexyGuidelineTeaching() {
  const U = () => <InlineRef topicId="icu-endocrine-emergencies" refLabel="UK pituitary apoplexy 2011" />;
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border mt-5">
    <h3 className="text-lg font-serif font-bold text-foreground">Pituitary Apoplexy: What the UK Guideline Can and Cannot Say</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Emergency:</strong> classical apoplexy is a medical emergency, and rapid hydrocortisone replacement may be life-saving.<U /></li>
      <li><strong className="text-foreground">Syndrome:</strong> sudden headache, vomiting, visual impairment and reduced consciousness from haemorrhage or infarction of the gland, with or without palsies of cranial nerves II, III, IV and VI.<U /></li>
      <li><strong className="text-foreground">Team:</strong> refer to a multidisciplinary team including a neurosurgeon and an endocrinologist.<U /></li>
      <li><strong className="text-foreground">Surgery or not:</strong> surgery is indicated when neurological symptoms are worsening. For most other patients it is unclear whether conservative or surgical management gives the better outcome, and the guideline calls for trials.<U /></li>
      <li><strong className="text-foreground">ICU point:</strong> give steroids first and watch vision and consciousness closely; a change in either moves the patient into the surgical group.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: which apoplexy patients does the UK guideline clearly say need surgery?</summary><p className="mt-2">Those with worsening neurological symptoms. For most others the best approach is uncertain.</p></details>
    <LessonSources topicId="icu-endocrine-emergencies" labels={["UK pituitary apoplexy 2011"]} />
  </div>;
}
