import { Link } from "react-router-dom";
import { Check, H, Reasoning, lessonWrap as wrap, makeQuote } from "./EndocrinePageShared";

const Quote = makeQuote("diabetes-management");
const link = "text-primary underline";

export function InsulinPhysiologyTeaching() {
  return <div className={wrap}>
    <p>Quotations come from the openly licensed OpenStax <em>Anatomy and Physiology</em> textbook and Polderman, Hermanides and Hulst's 2024 <em>BJA Education</em> review. Text marked teaching synthesis is standard teaching, not a quoted source. For the exact UK drug-omission timings, use the current Centre for Perioperative Care (CPOC) guideline.</p>
    <H>The islet and insulin release</H>
    <Quote label="OpenStax beta cell" />
    <p><Reasoning />glucose enters the beta cell by GLUT2, is metabolised to ATP, closes ATP-sensitive potassium channels, depolarises the cell and opens voltage-gated calcium channels, triggering insulin release. Sulfonylureas act at the same potassium channel, which is why they cause hypoglycaemia during fasting.</p>
    <H>How insulin moves glucose</H>
    <Quote label="OpenStax insulin transporters" />
    <p><Reasoning />this insulin-dependent transporter is GLUT4, found in muscle and fat. Insulin also suppresses liver glucose production, fat breakdown and ketone production. The surgical stress response (cortisol, catecholamines, glucagon, growth hormone) opposes insulin, so blood glucose rises even in people without diabetes.</p>
    <H>Type 1 versus type 2</H>
    <p><Reasoning />type 1 diabetes is absolute insulin deficiency: without any insulin, ketones build up within hours, so insulin must never be stopped completely. Type 2 diabetes is insulin resistance with failing secretion; some insulin remains, so ketoacidosis is less likely but hyperosmolar states occur.</p>
    <Check question="Why does a person with type 1 diabetes who is fasting for surgery still need insulin?">Basal insulin suppresses liver glucose output and ketone production. Without it, ketoacidosis develops even if no food is eaten.</Check>
  </div>;
}

export function DiabetesPreopTeaching() {
  return <div className={wrap}>
    <H>Assessment</H>
    <Quote label="BJA Educ HbA1c 2024" />
    <p><Reasoning />HbA1c reflects control over about 3 months. Assess end-organ disease too: ischaemic heart disease (often silent), kidney function, autonomic neuropathy (postural hypotension, delayed gastric emptying) and stiff joints that can make laryngoscopy difficult. Put people with diabetes early on the list to shorten fasting.</p>
    <H>Newer drugs with anaesthetic risks</H>
    <Quote label="BJA Educ GLP-1 gastric 2024" />
    <p><Reasoning />so the aspiration concern is greatest soon after starting or increasing a GLP-1 receptor agonist; assess aspiration risk and follow current local and national omission advice.</p>
    <Quote label="BJA Educ SGLT2 euDKA 2024" />
    <p><Reasoning />euglycaemic ketoacidosis can occur with near-normal glucose, so check ketones, not just glucose, in an unwell patient taking an SGLT2 inhibitor. Omission timings differ between guidelines; the <Link to="/intensive-care/dka" className={link}>DKA</Link> page sets out the CPOC/JBDS intervals.</p>
    <Check question="A patient on empagliflozin has a glucose of 9 mmol/L, pH 7.21 and blood ketones of 4.5 mmol/L after an emergency laparotomy. What is the diagnosis?">Euglycaemic diabetic ketoacidosis. Treat it as DKA with glucose given alongside the insulin infusion.</Check>
  </div>;
}

export function DiabetesIntraopTeaching() {
  return <div className={wrap}>
    <H>Variable-rate insulin infusion</H>
    <p><Reasoning />people expected to miss more than one meal, or with poor control, are usually managed with a variable-rate intravenous insulin infusion (VRIII) plus glucose-containing fluid, keeping their long-acting insulin going. Short procedures in well-controlled patients can often be managed by adjusting usual medicines.</p>
    <Quote label="BJA Educ VRIII glucose 2024" />
    <H>Hypoglycaemia</H>
    <Quote label="BJA Educ hypoglycaemia 2024" />
    <p><Reasoning />general anaesthesia hides the warning signs of hypoglycaemia, so check capillary glucose regularly (at least hourly during an insulin infusion) and treat low readings promptly.</p>
    <Check question="A patient's VRIII is still running in recovery but the glucose drip was stopped when the cannula tissued. What is the risk?">Severe hypoglycaemia. Insulin must never run without a glucose source; restart glucose or stop the infusion and recheck.</Check>
  </div>;
}

export function DiabetesPostopTeaching() {
  return <div className={wrap}>
    <H>After surgery</H>
    <Quote label="BJA Educ basal-bolus 2024" />
    <p><Reasoning />restart usual medicines once eating and drinking. Overlap long-acting subcutaneous insulin with the end of the VRIII so there is no gap, which is a common cause of rebound hyperglycaemia and DKA in type 1 diabetes.</p>
    <H>In the intensive care unit</H>
    <p><Reasoning />the NICE-SUGAR trial (2009) found that tight glucose control (4.5–6.0 mmol/L) increased mortality and severe hypoglycaemia compared with a target of 10 mmol/L or less, so moderate targets are now standard. This is a summary of the trial, not a quotation. Diabetic emergencies are covered on the <Link to="/intensive-care/dka" className={link}>DKA</Link> and <Link to="/intensive-care/icu-endocrine-emergencies" className={link}>Endocrine Emergencies</Link> pages.</p>
    <Check question="Why is a sliding scale alone discouraged after surgery?">It only reacts to high readings with short-acting insulin and provides no basal insulin, so glucose swings and ketosis can develop. A basal-bolus regimen covers both needs.</Check>
  </div>;
}
