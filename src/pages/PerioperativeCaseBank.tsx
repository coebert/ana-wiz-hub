import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpenCheck, Search, ShieldCheck, X } from "lucide-react";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressiveCase, type CaseCategory, type DetailedAnswerSection, type PerioperativeCase } from "@/components/perioperative/ProgressiveCase";

const sources = {
  steroid: { label: "Association of Anaesthetists 2020", href: "https://doi.org/10.1111/anae.14963" },
  phaeo: { label: "BJA Education: phaeochromocytoma", href: "https://doi.org/10.1093/bjaed/mkv051" },
  crash2: { label: "CRASH-2", href: "https://doi.org/10.1016/S0140-6736(10)60835-5" },
  woman: { label: "WOMAN trial", href: "https://doi.org/10.1016/S0140-6736(17)30638-4" },
  poise3: { label: "POISE-3", href: "https://doi.org/10.1056/NEJMoa2201171" },
};

const detailedAnswers: Record<string, DetailedAnswerSection[]> = {
  "steroid-colectomy": [
    { title: "Clinical reasoning", content: "Prednisolone 10 mg daily is above the dose at which clinically important HPA-axis suppression should be assumed after sustained use. Open colectomy produces major stress, while omission of her normal dose adds withdrawal risk. Antiemetic dexamethasone has glucocorticoid activity but does not by itself constitute a documented perioperative replacement plan." },
    { title: "Management and monitoring", content: "Continue the usual steroid, give hydrocortisone 100 mg IV at induction, then 200 mg over 24 hours or 50 mg six-hourly while major stress persists. Monitor pressure, glucose, sodium and potassium, and restore oral treatment when absorption is reliable. Refractory hypotension, hypoglycaemia or electrolyte disturbance should trigger immediate adrenal-crisis treatment alongside a search for bleeding, sepsis and cardiac causes." },
    { title: "Exam pitfall", content: "Do not delay rescue hydrocortisone for cortisol testing, and do not stop supplementation abruptly after major surgery. State the steroid route, timing, postoperative continuation and plan to return to baseline treatment." },
  ],
  "steroid-inhaled": [
    { title: "Clinical reasoning", content: "HPA suppression depends on cumulative systemic exposure, not whether a patient currently takes tablets. High-dose fluticasone, repeated oral rescue courses, topical preparations and injections all matter. Features such as Cushingoid appearance, a steroid emergency card or recent withdrawal increase concern." },
    { title: "Management and monitoring", content: "Continue inhaled therapy and optimise asthma. If moderate-stress surgery proceeds with credible suppression risk, give hydrocortisone 50 mg IV at induction followed by 25 mg eight-hourly for 24 hours, then resume the established regimen. Observe haemodynamics, glucose and electrolytes and treat unexplained shock promptly." },
    { title: "Exam pitfall", content: "A normal-looking medication list can conceal recent systemic exposure. Ask specifically about every route, dose, duration and cessation date rather than accepting ‘no steroid tablets’." },
  ],
  "steroid-addisons": [
    { title: "Clinical reasoning", content: "Known primary adrenal insufficiency, missed replacement, vomiting, infection, hypotension, hypoglycaemia and hyponatraemia make adrenal crisis the working diagnosis. The immediate mortality risk comes from glucocorticoid deficiency and severe volume depletion; treatment precedes biochemical confirmation." },
    { title: "Management and monitoring", content: "Give hydrocortisone 100 mg IV immediately, rapid 0.9% saline and IV glucose, then hydrocortisone 200 mg per 24 hours or 50 mg six-hourly. Correct electrolytes, give antibiotics and obtain source control. Taper only as illness resolves and oral absorption returns; hydrocortisone above 50 mg daily supplies adequate mineralocorticoid effect, so fludrocortisone is usually temporarily unnecessary." },
    { title: "Exam pitfall", content: "Blood sampling is optional if it delays treatment. Persistent shock still requires evaluation for sepsis, haemorrhage and cardiogenic causes rather than attributing every abnormality to Addison’s disease." },
  ],
  "steroid-joint": [
    { title: "Clinical reasoning", content: "HPA recovery after long-term glucocorticoids is variable and may take months. Repeated intra-articular injections can add meaningful systemic exposure, while fatigue and postural symptoms strengthen concern but are not diagnostic. Testing is useful only when time and clinical stability permit." },
    { title: "Management and monitoring", content: "For major revision arthroplasty with credible suppression, continue or replace the baseline requirement, give hydrocortisone 100 mg IV at induction and 200 mg over the first 24 hours. Monitor haemodynamics and glucose, then agree a taper and formal endocrine assessment rather than making an unplanned stop." },
    { title: "Exam pitfall", content: "‘Stopped two months ago’ does not prove recovery. Discharge reconciliation should cover oral, inhaled, topical and injected steroids and provide sick-day and emergency advice." },
  ],
  "phaeo-prep": [
    { title: "Clinical reasoning", content: "Catecholamine-driven vasoconstriction causes hypertension and contracted circulating volume. Alpha blockade reduces vascular tone; beta blockade is added only after alpha control because isolated beta blockade leaves unopposed alpha vasoconstriction. Preparation is judged by pressure control, tolerable postural change, rhythm and end-organ effects rather than one clinic value." },
    { title: "Management and monitoring", content: "Titrate phenoxybenzamine or a selective alpha-1 blocker such as doxazosin for roughly 10–14 days, then add beta blockade only for persistent tachycardia after adequate alpha blockade. Encourage salt and fluid intake where safe. Plan arterial monitoring, large-bore access, short-acting vasodilators, vasopressors, glucose monitoring and postoperative critical-care observation with an experienced multidisciplinary team." },
    { title: "Exam pitfall", content: "Do not chase a perfectly normal seated pressure at the cost of disabling orthostasis, and never describe beta blockade before alpha blockade." },
  ],
  "phaeo-beta": [
    { title: "Clinical reasoning", content: "Propranolol removes beta-2 vasodilation and limits cardiac compensation while catecholamine-stimulated alpha receptors continue intense vasoconstriction. The result may be malignant hypertension, myocardial injury and pulmonary oedema. This is a pharmacological crisis, not simple undertreated tachycardia." },
    { title: "Management and monitoring", content: "Escalate to critical care, establish invasive arterial monitoring and control vascular tone with titratable vasodilation or alpha blockade. Treat pulmonary oedema and myocardial complications and avoid further isolated beta blockade. A short-acting beta blocker is considered only after alpha-mediated hypertension is controlled. Definitive resection is normally deferred until blockade and volume restoration are complete." },
    { title: "Exam pitfall", content: "Giving more beta blocker for the persistent tachycardia can worsen the crisis. Explain receptor physiology and treatment sequence explicitly." },
  ],
  "phaeo-handling": [
    { title: "Clinical reasoning", content: "Tumour handling can release a sudden catecholamine load, producing severe hypertension and tachyarrhythmia. The anaesthetist must communicate with the surgeon, pause manipulation and exclude amplifiers such as hypercarbia, hypoxia and inadequate anaesthesia while treating immediately." },
    { title: "Management and monitoring", content: "Use short-acting, titratable agents such as nitroprusside, glyceryl trinitrate or phentolamine according to local practice; magnesium offers vasodilation and may reduce catecholamine release. Use esmolol only after vasoconstriction is controlled. Before adrenal-vein ligation, stop vasodilators, prepare vasopressors and assess preload because abrupt catecholamine withdrawal can cause profound hypotension. Check glucose for rebound hypoglycaemia." },
    { title: "Exam pitfall", content: "Long-acting antihypertensives may turn the predictable post-ligation pressure fall into prolonged shock. Link each drug choice to the rapidly changing surgical phase." },
  ],
  "phaeo-recovery": [
    { title: "Clinical reasoning", content: "Post-resection hypotension is often multifactorial: catecholamine withdrawal, residual alpha blockade, vasoplegia and depleted volume coexist, but bleeding must be excluded. Hypoglycaemia occurs because removal of catecholamine-mediated insulin suppression permits rebound insulin release." },
    { title: "Management and monitoring", content: "Give IV glucose, repeat measurements frequently and assess haemorrhage, preload and cardiac function. Use judicious fluid and titrated vasopressor support for persistent vasodilation. Continue high-acuity pressure, rhythm, urine-output, lactate and glucose monitoring. Bilateral adrenalectomy or uncertain residual function requires a clear steroid replacement plan." },
    { title: "Exam pitfall", content: "Do not treat drowsiness as residual anaesthesia without checking glucose. Handover must state the specific risks of recurrent hypotension and hypoglycaemia." },
  ],
  "txa-trauma": [
    { title: "Clinical reasoning", content: "TXA inhibits plasminogen activation and limits fibrin breakdown. In significant traumatic haemorrhage, survival benefit is time dependent and greatest with early administration; viscoelastic results are not required before the first dose. Beyond three hours after injury, routine CRASH-2 treatment should not be initiated because benefit is lost and harm is possible." },
    { title: "Management and monitoring", content: "Give 1 g IV over 10 minutes followed by 1 g over eight hours while continuing definitive haemorrhage control, balanced blood-component resuscitation, warming and calcium replacement. Use ROTEM or TEG to guide subsequent fibrinogen, plasma and platelet therapy and track temperature, pH, ionised calcium and lactate." },
    { title: "Exam pitfall", content: "TXA is an adjunct, not a reason to delay theatre, interventional radiology or damage-control resuscitation. Always state the injury-to-dose interval." },
  ],
  "txa-pph": [
    { title: "Clinical reasoning", content: "Postpartum haemorrhage activates fibrinolysis early, so TXA should be given promptly once PPH is diagnosed and within three hours of bleeding onset. It reduces death from bleeding but does not correct uterine atony, retained tissue, trauma or coagulopathy by itself." },
    { title: "Management and monitoring", content: "Give TXA 1 g IV as soon as possible; repeat 1 g if bleeding continues after 30 minutes or restarts within 24 hours, following local protocol. Continue uterotonics, surgical or radiological control and major-haemorrhage resuscitation. Measure fibrinogen early, warm the patient and products, and monitor platelets, coagulation, pH and ionised calcium." },
    { title: "Exam pitfall", content: "Do not postpone TXA until laboratory results return, but also do not let it distract from the four causes of PPH and definitive control. Record bleeding onset and dose times." },
  ],
  "txa-elective": [
    { title: "Clinical reasoning", content: "In major non-cardiac surgery, TXA lowers bleeding, but POISE-3 did not prove non-inferiority for its composite cardiovascular safety outcome. Decision-making therefore combines procedural blood-loss risk with active or previous thrombosis, vascular disease, anticoagulation and renal function. A remote provoked DVT is not the same as active thrombosis." },
    { title: "Management and monitoring", content: "Use the procedure-specific local regimen rather than a trauma dose. Reduce exposure in renal impairment because TXA is predominantly renally cleared, and avoid repeated high doses where accumulation raises seizure risk. Keep ampoules and syringes physically separated from neuraxial drugs and perform explicit route checks. Restart standard VTE prophylaxis when haemostasis permits." },
    { title: "Exam pitfall", content: "The catastrophic route error is intrathecal TXA. Mention storage, labelling and checking systems as well as pharmacology and thrombosis assessment." },
  ],
  "txa-dic": [
    { title: "Clinical reasoning", content: "Septic DIC simultaneously activates coagulation, consumes platelets and factors and alters fibrinolysis. Raised D-dimer shows fibrin turnover but does not establish dominant hyperfibrinolysis. Empirical antifibrinolysis can worsen microvascular thrombosis when coagulation activation predominates." },
    { title: "Management and monitoring", content: "Treat infection and restore perfusion first. For clinically important bleeding, replace platelets, fibrinogen and plasma according to serial laboratory and viscoelastic assessment; common pragmatic targets include platelets above 50 ×10⁹/L and fibrinogen above 1.5 g/L, individualised to the bleeding site. Consider TXA only for exceptional life-threatening bleeding with demonstrated predominant hyperfibrinolysis and specialist input." },
    { title: "Exam pitfall", content: "Bleeding plus a high D-dimer is not an automatic TXA indication. State the DIC phenotype, evidence of fibrinolysis and the risk of worsening thrombosis." },
  ],
  "steroid-dental": [
    { title: "Clinical reasoning", content: "A minor procedure under local anaesthesia usually produces little physiological stress. A patient taking a stable physiological replacement dose should continue it; indiscriminate high-dose hydrocortisone adds hyperglycaemia, infection and wound-healing harms without clear benefit." },
    { title: "Management and monitoring", content: "Confirm adherence, recent illness and ability to take oral medication. Continue the usual morning hydrocortisone, use effective local anaesthesia and analgesia, and give written sick-day advice. Escalate only if the procedure becomes prolonged, the patient cannot absorb oral medication or haemodynamic features suggest crisis." },
    { title: "Exam pitfall", content: "Steroid cover is proportional to surgical stress and baseline replacement. ‘Any steroid history means 100 mg hydrocortisone’ is not a defensible rule." },
  ],
  "steroid-pituitary": [
    { title: "Clinical reasoning", content: "Pituitary disease may cause secondary adrenal insufficiency without hyperkalaemia because aldosterone is largely preserved. Fasting, vomiting and omission of hydrocortisone can still precipitate hypotension and hypoglycaemia during major surgery." },
    { title: "Management and monitoring", content: "Continue replacement, give hydrocortisone 100 mg IV at induction and 200 mg over 24 hours for major stress, then taper toward baseline as recovery permits. Monitor sodium, glucose, pressure and fluid balance; account for coexisting diabetes insipidus or hypothyroidism." },
    { title: "Exam pitfall", content: "Normal potassium does not exclude secondary adrenal crisis. Replace glucocorticoid before starting or increasing thyroxine in untreated combined pituitary deficiency." },
  ],
  "phaeo-pregnancy": [
    { title: "Clinical reasoning", content: "Phaeochromocytoma in pregnancy threatens both maternal and fetal circulation. Episodic hypertension, headache, sweating and palpitations that predate pre-eclampsia should prompt metanephrine testing and MRI without gadolinium." },
    { title: "Management and monitoring", content: "Coordinate endocrine, obstetric, anaesthetic, neonatal and surgical care. Establish alpha blockade before any beta blocker, restore volume carefully and use invasive monitoring for surgery or delivery. Timing of adrenalectomy and delivery depends on gestation, tumour anatomy and control." },
    { title: "Exam pitfall", content: "Do not treat tachycardia first with isolated beta blockade, and do not assume all hypertension after 20 weeks is pre-eclampsia." },
  ],
  "phaeo-incidental": [
    { title: "Clinical reasoning", content: "An adrenal incidentaloma with biochemical catecholamine excess creates risk even when symptoms are mild. Elective unrelated surgery can trigger crisis through induction, intubation, surgical stress or interacting drugs." },
    { title: "Management and monitoring", content: "Postpone non-urgent surgery, confirm biochemistry and imaging, assess end-organ effects and establish alpha blockade with volume restoration. If emergency surgery cannot wait, use an arterial line, senior multidisciplinary input and prepared short-acting vasodilator and vasopressor infusions." },
    { title: "Exam pitfall", content: "Do not dismiss an asymptomatic tumour or proceed after simply adding a beta blocker. Explain why the unrelated operation should usually be deferred." },
  ],
  "txa-renal": [
    { title: "Clinical reasoning", content: "TXA is eliminated predominantly unchanged by the kidney. Advanced renal impairment prolongs exposure, so repeated or high dosing increases accumulation and seizure risk; the indication and local renal-adjustment protocol must be explicit." },
    { title: "Management and monitoring", content: "Verify current renal function, indication, timing and cumulative dose. Use the lowest evidence-based renal-adjusted regimen in consultation with local guidance, avoid accidental repeat dosing and monitor neurological recovery. New myoclonus or seizures require drug review and supportive seizure management." },
    { title: "Exam pitfall", content: "Do not copy a normal-renal-function regimen into advanced kidney disease. Separate efficacy evidence from dosing safety." },
  ],
  "txa-cardiac": [
    { title: "Clinical reasoning", content: "Cardiac surgery activates fibrinolysis and often benefits from antifibrinolysis, but cardiopulmonary bypass, renal dysfunction and high cumulative TXA exposure all increase postoperative seizure risk." },
    { title: "Management and monitoring", content: "Use the unit’s weight- and renal-function-adjusted protocol, document all loading, bypass-prime and infusion doses, and coordinate blood conservation with surgical haemostasis, cell salvage and point-of-care coagulation testing. Protect against medication-route errors." },
    { title: "Exam pitfall", content: "More TXA is not automatically better. State the trade-off between reduced transfusion and dose-related neurological toxicity." },
  ],
};

type CaseSeed = Omit<PerioperativeCase, "detailedAnswer">;

const caseSeeds: CaseSeed[] = [
  {
    id: "steroid-colectomy", title: "Chronic prednisolone before colectomy", category: "Steroid cover", difficulty: "Foundation",
    patient: "A 64-year-old woman takes prednisolone 10 mg daily for polymyalgia rheumatica and is listed for open right hemicolectomy.",
    presentation: "She is stable at pre-assessment. The surgical team has omitted all morning medicines and asks whether dexamethasone for nausea is enough steroid cover.",
    stages: [
      { title: "Assess suppression and surgical stress", prompt: "What determines whether she needs supplementation?", answer: ["Prednisolone at or above 5 mg daily for more than four weeks makes HPA-axis suppression likely.", "Open colectomy is major surgical stress.", "Continue her usual glucocorticoid dose; do not create an additional withdrawal stress."] },
      { title: "Write the prescription", prompt: "Prescribe a practical major-surgery regimen.", answer: ["Give hydrocortisone 100 mg IV at induction.", "Continue hydrocortisone 200 mg over 24 hours, or 50 mg IV six-hourly where an infusion is impractical.", "Return towards the usual oral regimen as recovery permits, guided by clinical progress."] },
      { title: "Manage the postoperative risk", prompt: "She becomes hypotensive and hypoglycaemic six hours after surgery. What do you do?", answer: ["Treat adrenal crisis without waiting for confirmatory testing: hydrocortisone 100 mg IV immediately.", "Give rapid 0.9% saline, correct hypoglycaemia with IV glucose and check sodium, potassium and acid–base status.", "Continue hydrocortisone 200 mg per 24 hours and investigate simultaneous causes of shock."] },
    ],
    takeHome: "Major surgery in a patient with likely HPA suppression requires the usual steroid plus hydrocortisone at induction and continued replacement; dexamethasone used for antiemesis is not a substitute for a planned regimen.", sourceLinks: [sources.steroid],
  },
  {
    id: "steroid-inhaled", title: "The overlooked inhaled steroid", category: "Steroid cover", difficulty: "Intermediate",
    patient: "A 49-year-old man with severe asthma uses high-dose inhaled fluticasone and has received three oral prednisolone courses this year. He is listed for laparoscopic cholecystectomy.",
    presentation: "He denies taking any ‘regular steroid tablets’ and the initial assessment records no risk of adrenal suppression.",
    stages: [
      { title: "Identify hidden exposure", prompt: "Why should the steroid history be revisited?", answer: ["High-dose inhaled steroids and repeated systemic courses can suppress the HPA axis.", "Ask about dose, duration, recent oral courses, steroid emergency card, Cushingoid features and previous perioperative problems.", "If uncertainty cannot be resolved before surgery, a safe supplementation plan is preferable to an unrecognised crisis."] },
      { title: "Plan moderate-stress cover", prompt: "How would you manage a patient judged at risk?", answer: ["Continue usual inhaled therapy and optimise asthma control.", "For moderate surgical stress, give hydrocortisone 50 mg IV at induction followed by 25 mg IV eight-hourly for 24 hours.", "Monitor glucose, blood pressure, sodium and potassium; resume the normal regimen promptly."] },
      { title: "Differentiate postoperative hypotension", prompt: "What features make adrenal crisis more likely?", answer: ["Hypotension that responds poorly to fluid and vasopressors, especially with hypoglycaemia, hyponatraemia or hyperkalaemia.", "Treat immediately with hydrocortisone 100 mg IV and fluids while also excluding bleeding, sepsis, anaphylaxis and cardiac causes."] },
    ],
    takeHome: "A steroid history includes inhaled, topical, injected and recently stopped treatment—not just current tablets.", sourceLinks: [sources.steroid],
  },
  {
    id: "steroid-addisons", title: "Primary adrenal insufficiency and emergency laparotomy", category: "Steroid cover", difficulty: "Advanced",
    patient: "A 36-year-old woman with Addison’s disease presents with perforated appendicitis, vomiting and fever. BP is 84/48 mmHg, glucose 3.1 mmol/L and sodium 126 mmol/L.",
    presentation: "She has been unable to take hydrocortisone or fludrocortisone for 24 hours.",
    stages: [
      { title: "Recognise crisis", prompt: "What is the immediate diagnosis and priority?", answer: ["This is adrenal crisis until proved otherwise, precipitated by infection, vomiting and missed replacement.", "Do not delay treatment for cortisol measurement; draw blood first only if it causes no delay.", "Give hydrocortisone 100 mg IV immediately, rapid isotonic saline and IV glucose."] },
      { title: "Prepare for theatre", prompt: "How should replacement continue?", answer: ["Continue hydrocortisone 200 mg per 24 hours by infusion, or 50 mg IV six-hourly.", "Correct volume, glucose and electrolyte abnormalities and start source-control antibiotics.", "Use invasive monitoring according to haemodynamic response and operative severity."] },
      { title: "Step down safely", prompt: "What matters after source control?", answer: ["Continue stress dosing while severely unwell, then taper according to recovery and endocrine advice.", "Restart oral glucocorticoid replacement when absorption is reliable.", "Fludrocortisone is generally unnecessary while hydrocortisone exceeds 50 mg daily because mineralocorticoid activity is adequate."] },
    ],
    takeHome: "Known adrenal insufficiency plus acute illness, vomiting and shock is a treatment-first emergency: hydrocortisone, saline, glucose and definitive management of the trigger.", sourceLinks: [sources.steroid],
  },
  {
    id: "steroid-joint", title: "Recent joint injections before arthroplasty", category: "Steroid cover", difficulty: "Intermediate",
    patient: "A 72-year-old man is scheduled for revision knee arthroplasty. He stopped prednisolone two months ago and has also had repeated intra-articular steroid injections.",
    presentation: "He reports fatigue and postural dizziness but has no formal diagnosis of adrenal insufficiency.",
    stages: [
      { title: "Build the risk picture", prompt: "Which details change your plan?", answer: ["Recent cessation of long-term oral therapy does not guarantee HPA recovery; suppression may persist.", "Repeated intra-articular injections add systemic exposure.", "Symptoms, treatment records and time available determine whether endocrine testing is useful; urgent surgery should not await testing when risk is credible."] },
      { title: "Cover major surgery", prompt: "What is a defensible perioperative plan?", answer: ["Document likely suppression and give hydrocortisone 100 mg IV at induction.", "Continue 200 mg over 24 hours initially, alongside close haemodynamic and glucose monitoring.", "Agree the taper and longer-term assessment with endocrinology or the treating team."] },
      { title: "Avoid the common error", prompt: "What should not happen at discharge?", answer: ["Do not abruptly stop glucocorticoid cover without a recovery plan.", "Provide clear written sick-day advice and arrange assessment of ongoing replacement need.", "Reconcile every steroid route in the discharge medicines."] },
    ],
    takeHome: "Recently stopped oral steroids and repeated injections can remain clinically relevant; route and current prescription alone do not define HPA-axis risk.", sourceLinks: [sources.steroid],
  },
  {
    id: "phaeo-prep", title: "Preparing an adrenal phaeochromocytoma", category: "Phaeochromocytoma", difficulty: "Foundation",
    patient: "A 43-year-old woman has an adrenal mass, raised plasma metanephrines and episodic headache, sweating and palpitations.",
    presentation: "She is referred for laparoscopic adrenalectomy with a seated BP of 168/96 mmHg and pulse 104 min⁻¹.",
    stages: [
      { title: "Sequence preoperative treatment", prompt: "How should blockade be introduced?", answer: ["Start alpha blockade first, commonly phenoxybenzamine or doxazosin, and titrate over about 10–14 days.", "Only add beta blockade after adequate alpha blockade if troublesome tachycardia persists.", "Never beta block first because unopposed alpha vasoconstriction can provoke a hypertensive crisis."] },
      { title: "Restore circulating volume", prompt: "Why are salt and fluid important?", answer: ["Chronic catecholamine-mediated vasoconstriction leaves the patient intravascularly depleted.", "Encourage salt and fluid intake after alpha blockade, while individualising for cardiac or renal disease.", "Look for controlled seated BP with tolerable postural reduction rather than simply a normal clinic reading."] },
      { title: "Confirm readiness", prompt: "What should the multidisciplinary review cover?", answer: ["Blood-pressure and rhythm control, postural symptoms, ECG/cardiac effects and glucose.", "Availability of experienced endocrine surgery, anaesthesia, critical care and appropriate postoperative monitoring.", "A plan for invasive monitoring and rapidly acting vasoactive drugs."] },
    ],
    takeHome: "Successful preparation is alpha blockade followed—if needed—by beta blockade, together with volume expansion and an experienced multidisciplinary plan.", sourceLinks: [sources.phaeo],
  },
  {
    id: "phaeo-beta", title: "Beta blocker before diagnosis", category: "Phaeochromocytoma", difficulty: "Advanced",
    patient: "A 51-year-old man with an undiagnosed phaeochromocytoma receives propranolol in the emergency department for tachycardia.",
    presentation: "Minutes later he develops severe headache, chest pain and BP 246/132 mmHg with pulmonary oedema.",
    stages: [
      { title: "Explain the deterioration", prompt: "What mechanism has caused this crisis?", answer: ["Beta blockade removed beta-mediated vasodilation and cardiac compensation while alpha receptors remained intensely stimulated.", "Unopposed alpha vasoconstriction caused abrupt hypertension and acute cardiac afterload.", "This presentation should trigger urgent specialist help and consideration of catecholamine excess."] },
      { title: "Stabilise the crisis", prompt: "What are the immediate principles?", answer: ["Use titratable vasodilator or alpha-blocking therapy with invasive arterial pressure monitoring in a critical-care setting.", "Treat pulmonary oedema and myocardial complications while avoiding further isolated beta blockade.", "Once alpha control is established, a short-acting beta blocker may be considered for persistent tachyarrhythmia."] },
      { title: "Plan definitive care", prompt: "Should surgery proceed immediately?", answer: ["If the acute emergency can be stabilised, defer tumour resection until adequate alpha blockade and volume restoration are achieved.", "Emergency surgery is reserved for an uncontrollable complication and requires an expert team with vasoactive support ready."] },
    ],
    takeHome: "In suspected phaeochromocytoma, beta blockade before alpha blockade can be catastrophic; control vasoconstriction first.", sourceLinks: [sources.phaeo],
  },
  {
    id: "phaeo-handling", title: "Hypertension during tumour handling", category: "Phaeochromocytoma", difficulty: "Advanced",
    patient: "During laparoscopic adrenalectomy, BP rises from 124/72 to 228/118 mmHg and HR to 142 min⁻¹ as the surgeon mobilises the tumour.",
    presentation: "An arterial line is in place. Anaesthetic depth is adequate and ventilation is unchanged.",
    stages: [
      { title: "Recognise the phase", prompt: "What is the likely cause and what should be communicated?", answer: ["Tumour manipulation has released catecholamines.", "Ask the surgeon to stop handling temporarily and announce the haemodynamic crisis clearly.", "Exclude contributing hypoxia, hypercarbia, light anaesthesia and drug error without delaying treatment."] },
      { title: "Control the surge", prompt: "Which treatment principles apply?", answer: ["Use rapid, titratable vasodilator or alpha-blocking treatment such as sodium nitroprusside, glyceryl trinitrate or phentolamine according to local practice.", "Magnesium can reduce catecholamine release and provide vasodilation; esmolol is reserved for tachycardia after vasoconstriction is controlled.", "Avoid long-acting treatment that will worsen the predictable post-ligation hypotension."] },
      { title: "Prepare for vein ligation", prompt: "What happens next?", answer: ["After venous ligation, catecholamine concentration falls abruptly and profound vasodilation/hypotension may follow.", "Stop vasodilators, communicate timing, restore preload judiciously and use titrated vasopressor support.", "Check glucose because rebound insulin release can cause hypoglycaemia."] },
    ],
    takeHome: "Phaeochromocytoma surgery has two opposing haemodynamic phases: a manipulation surge and post-ligation collapse; short-acting, titratable drugs are essential.", sourceLinks: [sources.phaeo],
  },
  {
    id: "phaeo-recovery", title: "Post-adrenalectomy collapse", category: "Phaeochromocytoma", difficulty: "Intermediate",
    patient: "Two hours after phaeochromocytoma resection, a patient is drowsy, clammy and hypotensive despite initial fluid. Capillary glucose is 2.6 mmol/L.",
    presentation: "The intraoperative record documents difficult tumour mobilisation followed by a marked pressure drop after vein ligation.",
    stages: [
      { title: "Frame the differential", prompt: "Which expected complications coexist here?", answer: ["Hypotension can reflect residual alpha blockade, vasodilation, catecholamine withdrawal, hypovolaemia or bleeding.", "Hypoglycaemia follows loss of catecholamine-mediated insulin suppression and rebound insulin secretion.", "Also consider adrenal insufficiency after bilateral surgery and conventional postoperative causes of shock."] },
      { title: "Treat immediately", prompt: "What should happen now?", answer: ["Give IV glucose and recheck frequently.", "Assess bleeding and fluid responsiveness, then use titrated vasopressor support where vasodilation persists.", "Continue high-acuity monitoring of blood pressure, rhythm, urine output, lactate and glucose."] },
      { title: "Set the recovery plan", prompt: "What must handover include?", answer: ["Explicit risks of recurrent hypotension and hypoglycaemia with scheduled observations.", "A steroid replacement plan when bilateral adrenal tissue has been removed or adrenal function is uncertain.", "Endocrine follow-up and biochemical surveillance for persistent or recurrent disease."] },
    ],
    takeHome: "Post-resection care is active: anticipate hypotension and hypoglycaemia rather than waiting for routine ward observations to detect them.", sourceLinks: [sources.phaeo],
  },
  {
    id: "txa-trauma", title: "Trauma inside the three-hour window", category: "Antifibrinolytics", difficulty: "Foundation",
    patient: "A 29-year-old arrives 70 minutes after a road collision with pelvic disruption, BP 82/46 mmHg and ongoing haemorrhage.",
    presentation: "The major haemorrhage protocol is active. A colleague asks whether TXA should wait for ROTEM.",
    stages: [
      { title: "Make the time-critical decision", prompt: "Should TXA be delayed?", answer: ["No. Significant traumatic bleeding within three hours is an indication for early TXA; benefit is greatest when given promptly.", "Give 1 g IV over 10 minutes followed by 1 g over eight hours.", "Do not delay haemorrhage control, balanced resuscitation, warming or calcium replacement."] },
      { title: "Use viscoelastic testing", prompt: "What role does ROTEM play after initial treatment?", answer: ["ROTEM/TEG guides fibrinogen, plasma and platelet therapy and can identify ongoing hyperfibrinolysis.", "It complements rather than replaces immediate evidence-based TXA in early major trauma.", "Trend physiology: temperature, pH, ionised calcium, lactate and surgical control."] },
      { title: "Avoid the timing trap", prompt: "What if the patient arrived four hours after injury?", answer: ["Routine CRASH-2 trauma TXA should not be started beyond three hours because benefit is absent and harm is possible.", "Management remains urgent haemorrhage control and goal-directed resuscitation."] },
    ],
    takeHome: "For bleeding trauma, TXA is a time-dependent adjunct: 1 g then 1 g over eight hours, started as early as possible and within three hours.", sourceLinks: [sources.crash2],
  },
  {
    id: "txa-pph", title: "Postpartum haemorrhage after caesarean birth", category: "Antifibrinolytics", difficulty: "Intermediate",
    patient: "A 34-year-old develops uterine atony and 1.4 L blood loss 25 minutes after caesarean delivery.",
    presentation: "Uterotonics and surgical measures are underway. She remains tachycardic with brisk ongoing bleeding.",
    stages: [
      { title: "Add antifibrinolytic treatment", prompt: "What is the TXA plan?", answer: ["Give TXA 1 g IV as soon as possible and within three hours of bleeding onset.", "If bleeding continues after 30 minutes or restarts within 24 hours, a second 1 g dose may be given according to the WOMAN regimen and local protocol.", "TXA does not replace uterotonics, surgical control or activation of the obstetric major-haemorrhage pathway."] },
      { title: "Resuscitate in parallel", prompt: "Which targets deserve repeated attention?", answer: ["Assess fibrinogen early because it can fall rapidly in obstetric haemorrhage.", "Warm patient and products; monitor ionised calcium, acid–base status, platelets and coagulation.", "Use blood products and fibrinogen replacement according to clinical bleeding, laboratory or viscoelastic results and local protocol."] },
      { title: "Communicate the endpoint", prompt: "What should the team document?", answer: ["Time of bleeding onset and each TXA dose, cumulative blood loss, interventions and response.", "Thrombosis risk assessment later remains important, but appropriate TXA for active PPH is not a reason to withhold indicated prophylaxis indefinitely."] },
    ],
    takeHome: "In postpartum haemorrhage, give TXA early alongside—never instead of—uterotonic, surgical and transfusion management.", sourceLinks: [sources.woman],
  },
  {
    id: "txa-elective", title: "Tranexamic acid in high-risk non-cardiac surgery", category: "Antifibrinolytics", difficulty: "Advanced",
    patient: "A 76-year-old with remote provoked DVT is scheduled for major multilevel spine surgery with high anticipated blood loss.",
    presentation: "The team is weighing reduced bleeding against perioperative vascular risk.",
    stages: [
      { title: "Balance benefit and uncertainty", prompt: "How should the evidence be framed?", answer: ["TXA reduces major bleeding in non-cardiac surgery.", "POISE-3 did not establish non-inferiority for the composite cardiovascular safety outcome, so individual thrombotic and bleeding risks still matter.", "A remote provoked DVT is not automatically equivalent to active thrombosis; review timing, recurrence, anticoagulation and local guidance."] },
      { title: "Choose and prescribe deliberately", prompt: "What safeguards belong in the plan?", answer: ["Use the procedure-specific local dose rather than importing a trauma regimen.", "Adjust or avoid repeated high dosing in significant renal impairment because TXA is renally cleared.", "Avoid accidental neuraxial administration: separate storage, label syringes and use route-specific checks."] },
      { title: "Monitor relevant harms", prompt: "What postoperative surveillance is appropriate?", answer: ["Continue standard VTE prevention once haemostasis permits.", "Investigate clinical signs of venous or arterial thrombosis rather than using TXA exposure alone as a diagnosis.", "Recognise that seizures are associated particularly with high exposure and renal accumulation."] },
    ],
    takeHome: "Elective perioperative TXA requires procedure-specific dosing and an individual bleeding–thrombosis assessment; renal function and route safety are practical exam points.", sourceLinks: [sources.poise3],
  },
  {
    id: "txa-dic", title: "Septic DIC with line-site bleeding", category: "Antifibrinolytics", difficulty: "Advanced",
    patient: "A 67-year-old in septic shock has platelets 42 ×10⁹/L, PT prolonged by 8 seconds, fibrinogen 0.9 g/L and markedly raised D-dimer.",
    presentation: "There is oozing from cannula sites. A request is made for empirical TXA because ‘the patient is bleeding’.",
    stages: [
      { title: "Diagnose the coagulopathy", prompt: "How should the results be interpreted?", answer: ["The combination is consistent with overt DIC in the correct clinical context.", "Treating the septic source and restoring perfusion are the central interventions.", "Replace platelets, fibrinogen and plasma for clinically significant bleeding using laboratory and viscoelastic guidance—not the D-dimer alone."] },
      { title: "Decide on TXA", prompt: "Is empirical TXA appropriate?", answer: ["No. DIC may be thrombosis-predominant, and suppressing fibrinolysis can worsen microvascular thrombosis.", "Reserve antifibrinolytic treatment for exceptional severe bleeding where predominant hyperfibrinolysis is demonstrated, ideally with specialist and ROTEM/TEG input.", "An elevated D-dimer does not by itself prove that TXA will help."] },
      { title: "Set measurable targets", prompt: "What should guide replacement?", answer: ["Aim for haemostasis appropriate to active bleeding: commonly platelets above 50 ×10⁹/L and fibrinogen above 1.5 g/L, individualised to site and procedure.", "Trend clotting, fibrinogen, platelets, temperature, pH and ionised calcium while treating infection and organ failure."] },
    ],
    takeHome: "Bleeding is not synonymous with an indication for TXA. In DIC, correct the cause and replace deficient components; use antifibrinolytics only for demonstrated dominant hyperfibrinolysis.", sourceLinks: [sources.crash2],
  },
  {
    id: "steroid-dental", title: "Minor procedure on replacement hydrocortisone", category: "Steroid cover", difficulty: "Foundation",
    patient: "An adult with stable primary adrenal insufficiency is listed for a short dental extraction under local anaesthesia.", presentation: "They are well, have taken their usual morning hydrocortisone and ask whether an injection is mandatory.",
    stages: [
      { title: "Grade the stress", prompt: "Does every procedure require parenteral stress dosing?", answer: ["No: supplementation should reflect procedural stress, illness and ability to absorb usual treatment.", "A short uncomplicated procedure under effective local anaesthesia is minor stress.", "Confirm emergency steroid and sick-day plans."] },
      { title: "Make a proportionate plan", prompt: "What would you do today?", answer: ["Continue the usual oral replacement.", "Use effective local anaesthesia, analgesia and minimise fasting.", "Escalate if the procedure becomes prolonged, oral medication is missed or systemic illness develops."] },
      { title: "Recognise deterioration", prompt: "What if vomiting and hypotension develop?", answer: ["Treat suspected adrenal crisis immediately with hydrocortisone 100 mg IV or IM.", "Give isotonic fluid and glucose where required and seek urgent care.", "Do not wait for cortisol testing."] },
    ], takeHome: "Match glucocorticoid supplementation to physiological stress; continue baseline replacement and retain a clear rescue plan.", sourceLinks: [sources.steroid],
  },
  {
    id: "steroid-pituitary", title: "Pituitary insufficiency before major surgery", category: "Steroid cover", difficulty: "Intermediate",
    patient: "An adult with panhypopituitarism takes hydrocortisone and levothyroxine and is listed for open abdominal surgery.", presentation: "They have fasted, omitted morning medicines and have glucose 3.5 mmol/L with normal potassium.",
    stages: [
      { title: "Interpret the pattern", prompt: "Does normal potassium exclude adrenal risk?", answer: ["No. Secondary adrenal insufficiency often preserves aldosterone and potassium.", "Missed glucocorticoid, fasting and major stress create crisis risk.", "Review diabetes insipidus and other pituitary replacement."] },
      { title: "Provide major-stress cover", prompt: "What regimen is appropriate?", answer: ["Give hydrocortisone 100 mg IV at induction.", "Continue 200 mg over 24 hours or 50 mg six-hourly initially.", "Correct hypoglycaemia and monitor sodium, glucose and fluid balance."] },
      { title: "Sequence endocrine treatment", prompt: "What endocrine ordering matters?", answer: ["Ensure glucocorticoid replacement before initiating or escalating thyroid hormone in combined deficiency.", "Taper toward baseline when stable and absorbing orally.", "Seek endocrine input for complex fluid or sodium disturbance."] },
    ], takeHome: "Secondary adrenal insufficiency can present without hyperkalaemia; major stress still requires timely glucocorticoid replacement.", sourceLinks: [sources.steroid],
  },
  {
    id: "phaeo-pregnancy", title: "Catecholamine symptoms in pregnancy", category: "Phaeochromocytoma", difficulty: "Advanced",
    patient: "A pregnant adult at 24 weeks has episodic hypertension, headache, sweating and palpitations.", presentation: "Urine protein is absent and symptoms began early in pregnancy; plasma metanephrines are markedly elevated.",
    stages: [
      { title: "Differentiate the diagnosis", prompt: "Why is this not automatically pre-eclampsia?", answer: ["Paroxysmal symptoms and early onset suggest catecholamine excess.", "Confirm biochemistry and localise with pregnancy-appropriate imaging, commonly MRI without gadolinium.", "Assess maternal cardiac and fetal effects."] },
      { title: "Prepare safely", prompt: "What is the pharmacological sequence?", answer: ["Establish alpha blockade first and restore circulating volume cautiously.", "Add beta blockade only after adequate alpha control for persistent tachycardia.", "Coordinate a specialist multidisciplinary plan."] },
      { title: "Plan definitive care", prompt: "How is timing decided?", answer: ["Balance gestation, tumour location, haemodynamic control and maternal-fetal risk.", "Use invasive monitoring and short-acting vasoactive drugs for surgery or delivery.", "Agree neonatal and postoperative critical-care provision."] },
    ], takeHome: "Phaeochromocytoma in pregnancy requires early recognition, alpha-before-beta blockade and coordinated maternal-fetal planning.", sourceLinks: [sources.phaeo],
  },
  {
    id: "phaeo-incidental", title: "Adrenal incidentaloma before elective surgery", category: "Phaeochromocytoma", difficulty: "Intermediate",
    patient: "An adult awaiting elective joint replacement has an adrenal incidentaloma and elevated metanephrines.", presentation: "They report few symptoms and the surgical team asks whether the unrelated operation can proceed.",
    stages: [
      { title: "Assess hidden risk", prompt: "Can an asymptomatic patient still develop crisis?", answer: ["Yes. Anaesthesia, intubation and surgical stress can trigger catecholamine release.", "Review biochemical certainty, imaging and end-organ effects.", "Do not equate few symptoms with low perioperative risk."] },
      { title: "Prioritise procedures", prompt: "What happens to elective surgery?", answer: ["Postpone non-urgent surgery for endocrine evaluation and preparation.", "Institute alpha blockade and volume restoration before definitive management.", "Avoid isolated beta blockade."] },
      { title: "Handle an emergency exception", prompt: "What if unrelated surgery cannot wait?", answer: ["Use senior multidisciplinary planning and invasive arterial monitoring.", "Prepare titratable vasodilators, vasopressors and postoperative critical care.", "Avoid known catecholamine-provoking drugs where alternatives exist."] },
    ], takeHome: "Biochemically active phaeochromocytoma makes unrelated elective anaesthesia unsafe until appropriately prepared.", sourceLinks: [sources.phaeo],
  },
  {
    id: "txa-renal", title: "Tranexamic acid in advanced kidney disease", category: "Antifibrinolytics", difficulty: "Advanced",
    patient: "An adult with stage 4 chronic kidney disease is listed for revision arthroplasty with anticipated major blood loss.", presentation: "A standard repeated-dose TXA regimen has been copied onto the chart.",
    stages: [
      { title: "Identify accumulation risk", prompt: "Why must the prescription be reconsidered?", answer: ["TXA is predominantly renally eliminated.", "Reduced clearance increases exposure from repeated or high dosing.", "High exposure is associated with postoperative seizures."] },
      { title: "Prescribe safely", prompt: "What practical safeguards are required?", answer: ["Confirm current renal function and follow the local renal-adjusted protocol.", "Document timing and cumulative dose to prevent repetition.", "Use blood conservation and haemostatic measures in parallel."] },
      { title: "Respond to neurological signs", prompt: "What if postoperative myoclonus occurs?", answer: ["Consider TXA accumulation among metabolic and neurological causes.", "Stop further TXA, correct reversible factors and treat seizures promptly.", "Escalate monitoring and specialist review."] },
    ], takeHome: "Renal impairment changes TXA exposure: use an evidence-based adjusted regimen and monitor cumulative dose and neurological toxicity.", sourceLinks: [sources.poise3],
  },
  {
    id: "txa-cardiac", title: "High-dose TXA during cardiac surgery", category: "Antifibrinolytics", difficulty: "Advanced",
    patient: "An older adult with impaired renal function undergoes complex redo valve surgery with cardiopulmonary bypass.", presentation: "Several TXA doses are planned in the loading dose, pump prime and infusion.",
    stages: [
      { title: "Balance benefit and harm", prompt: "Why is careful cumulative dosing important?", answer: ["Antifibrinolysis can reduce bleeding and transfusion in cardiac surgery.", "Bypass, renal dysfunction and high cumulative exposure increase seizure risk.", "Benefit does not justify untracked dose escalation."] },
      { title: "Coordinate blood conservation", prompt: "What belongs in the complete plan?", answer: ["Use a weight- and renal-adjusted institutional regimen.", "Record every loading, prime and infusion dose.", "Combine surgical haemostasis, cell salvage and point-of-care coagulation guidance."] },
      { title: "Plan postoperative surveillance", prompt: "What should handover emphasise?", answer: ["State cumulative TXA exposure and renal function.", "Distinguish seizure from delayed emergence, shivering and embolic stroke.", "Maintain route separation so TXA cannot enter a neuraxial pathway."] },
    ], takeHome: "In cardiac surgery, TXA should be protocolised and dose-accounted; renal function and seizure risk constrain exposure.", sourceLinks: [sources.poise3],
  },
];

const cases: PerioperativeCase[] = caseSeeds.map((caseData) => ({
  ...caseData,
  detailedAnswer: detailedAnswers[caseData.id] ?? [],
}));

const categories: Array<"All" | CaseCategory> = ["All", "Steroid cover", "Phaeochromocytoma", "Antifibrinolytics"];

const PerioperativeCaseBank = () => {
  const [category, setCategory] = useState<"All" | CaseCategory>("All");
  const visibleCases = useMemo(() => category === "All" ? cases : cases.filter((item) => item.category === category), [category]);

  return (
    <SectionLayout
      title="Perioperative Case Bank"
      subtitle="Eighteen progressive, exam-focused composite cases in steroid cover, phaeochromocytoma and antifibrinolytic therapy."
      metaDescription="Work through 18 progressive perioperative cases covering steroid cover, phaeochromocytoma and tranexamic acid for FRCA and FFICM revision."
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-perioperative"
      disableAutoTOC
    >
      <section className="border-y border-border py-5 mb-6">
        <div className="grid sm:grid-cols-[auto_1fr] gap-4 items-start">
          <BookOpenCheck className="h-8 w-8 text-perioperative" aria-hidden />
          <div>
            <h2 className="text-lg font-semibold text-foreground">How the cases work</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Pause at each stage, commit to an assessment or management plan, then reveal the model answer. Answers can be hidden again for re-testing, and each case has a shareable summary. Complete every stage to unlock a detailed second pass with the clinical reasoning, practical management and common pitfalls. The patients are fictionalised composites; no identifiable patient information is used.</p>
          </div>
        </div>
      </section>

      <div className="-mx-1 px-1 mb-6 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible" role="group" aria-label="Filter cases by subject">
        {categories.map((item) => (
          <Button key={item} type="button" size="sm" className="shrink-0" variant={category === item ? "primary" : "outline"} onClick={() => setCategory(item)} aria-pressed={category === item}>
            {item}
          </Button>
        ))}
      </div>


      <p className="text-sm text-muted-foreground mb-4">Showing {visibleCases.length} of {cases.length} cases</p>
      <div className="space-y-5">
        {visibleCases.map((caseData) => <ProgressiveCase key={caseData.id} caseData={caseData} />)}
      </div>

      <section className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-3 items-start">
          <ShieldCheck className="h-5 w-5 shrink-0 text-accent mt-0.5" aria-hidden />
          <p className="text-sm text-muted-foreground">These revision cases support structured reasoning but do not replace local protocols, senior advice or clinical judgement.</p>
        </div>
        <Button asChild variant="outline"><Link to="/perioperative">Return to topics</Link></Button>
      </section>
    </SectionLayout>
  );
};

export default PerioperativeCaseBank;