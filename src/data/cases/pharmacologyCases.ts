import type { CaseBank } from "./types";

const s = {
  pk: { label: "BJA Educ: pharmacokinetics", href: "https://doi.org/10.1093/bjaceaccp/mkr061" },
  tci: { label: "BJA Educ: target-controlled infusion", href: "https://doi.org/10.1093/bjaceaccp/mkh046" },
  tivaGuideline: { label: "Assoc Anaesth/SIVA TIVA guideline 2019", href: "https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/10.1111/anae.14428" },
  opioids: { label: "BJA Educ: opioid pharmacology", href: "https://doi.org/10.1093/bjaceaccp/mkt038" },
  ketamine: { label: "Ketamine and opioid tolerance", href: "https://doi.org/10.1097/ALN.0000000000002238" },
  pd: { label: "BJA Educ: pharmacodynamics", href: "https://doi.org/10.1093/bjaceaccp/mkm016" },
  volatiles: { label: "BJA Educ: inhalational agents", href: "https://doi.org/10.1093/bjaceaccp/mkg002" },
  mh: { label: "AAGBI/MHAUS malignant hyperthermia guideline", href: "https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/10.1111/anae.14257" },
  nmbGuideline: { label: "Assoc Anaesth 2023: neuromuscular blockade", href: "https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/10.1111/anae.16114" },
  vasopressor: { label: "BJA Educ: vasoactive drugs", href: "https://doi.org/10.1093/bjaed/mkw066" },
  antimicrobial: { label: "Antimicrobial PK/PD in critical illness", href: "https://doi.org/10.1007/s00134-020-06050-1" },
};

export const pharmacologyCaseBank: CaseBank = {
  slug: "pharmacology",
  path: "/pharmacology/case-bank",
  title: "Pharmacology Case Bank",
  subtitle: "Progressive scenarios that apply kinetics, dynamics and drug-specific safety to real decisions.",
  metaDescription: "Six progressive pharmacology cases on TIVA and context-sensitive half-time, opioid tolerance and ketamine, malignant hyperthermia, reversal, vasopressor choice and antimicrobial dosing.",
  backPath: "/pharmacology",
  backLabel: "Pharmacology",
  accentColor: "text-pharmacology",
  categories: ["Kinetics & delivery", "Analgesia & anaesthetics", "Critical care drugs"],
  cases: [
    {
      id: "pharmacology-tiva-obesity",
      title: "Slow wake-up after long TIVA in obesity",
      category: "Kinetics & delivery",
      difficulty: "Intermediate",
      summary: "Context-sensitive half-time, compartment models and weight scalars in target-controlled infusion.",
      topicIds: ["pharmacokinetics", "intravenous-anaesthetics", "propofol", "bariatric-anaesthesia", "depth-of-anaesthesia-monitoring"],
      patient: "A patient weighing 145 kg (body mass index 46) has a five-hour propofol and remifentanil anaesthetic. Total body weight was entered into a Marsh model.",
      presentation: "Forty minutes after stopping the infusion the patient remains unresponsive with normal gases, temperature and glucose.",
      stages: [
        {
          title: "Explain the kinetics",
          prompt: "Why is recovery prolonged?",
          answer: [
            "Context-sensitive half-time rises with infusion duration because peripheral compartments are loaded and return drug to plasma after the infusion stops.",
            "Using total body weight in a model derived for lean patients overestimates volumes and delivers a larger absolute dose than intended.",
            "Propofol clearance scales closer to lean or adjusted body weight, so obesity worsens the mismatch between programmed target and actual effect-site concentration.",
          ],
        },
        {
          title: "Exclude other causes",
          prompt: "What else must you rule out?",
          answer: [
            "Residual neuromuscular block, opioid effect, hypoglycaemia, hypothermia, hypercapnia and electrolyte abnormality.",
            "Neurological events, including stroke and seizure, and drug errors such as inadvertent sedative administration.",
            "Confirm the infusion actually stopped and the cannula was patent throughout — a tissued line can cause both awareness and delayed bolus effect.",
          ],
        },
        {
          title: "Do it better next time",
          prompt: "How would you plan TIVA in this patient?",
          answer: [
            "Use a model validated in obesity (for example Eleveld) or an appropriate weight scalar, and target the effect-site concentration.",
            "Use processed EEG depth monitoring, especially where neuromuscular blockade masks clinical signs, and titrate to the lowest effective target.",
            "Follow national TIVA safety recommendations: a dedicated visible cannula with anti-reflux and anti-siphon protection, and a documented plan for pump failure.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Multi-compartment kinetics mean that plasma concentration after stopping an infusion depends on redistribution from peripheral compartments as well as clearance. Context-sensitive half-time therefore increases with infusion duration and is drug-specific: remifentanil stays short because of organ-independent esterase metabolism, whereas propofol lengthens progressively. Obesity increases total volume of distribution but not proportionately increases clearance, so weight scalar choice dominates dosing accuracy." },
        { title: "Management and monitoring", content: "Support the airway and ventilation while systematically excluding reversible causes; check a blood glucose, gas and neuromuscular monitoring reading before attributing delay to kinetics. For future cases, use an obesity-appropriate model, effect-site targeting, processed EEG and clear infusion-site checks. Document target concentrations and total dose to allow later interpretation." },
        { title: "Exam pitfall", content: "Do not say 'propofol has a short half-life so it should wear off'. Define context-sensitive half-time, state which weight scalar each model needs, and mention depth monitoring as a safety measure rather than an optional extra." },
      ],
      takeHome: "Long infusions and total-body-weight dosing both prolong recovery: choose an obesity-validated model, target effect site and monitor depth.",
      sourceLinks: [s.pk, s.tci, s.tivaGuideline],
    },
    {
      id: "pharmacology-opioid-tolerance",
      title: "Uncontrolled pain in a patient on high-dose opioids",
      category: "Analgesia & anaesthetics",
      difficulty: "Advanced",
      summary: "Tolerance, opioid-induced hyperalgesia and the role of ketamine in restoring receptor responsiveness.",
      topicIds: ["opioids", "ketamine", "pain-pathways", "chronic-pain", "acute-pain-management"],
      patient: "An adult taking 180 mg oral morphine equivalent daily has open abdominal surgery. Postoperative pain scores remain 9/10 despite large morphine boluses, and there is diffuse tenderness beyond the wound.",
      presentation: "The patient is sedated at times yet reports severe pain, with allodynia of the abdominal wall.",
      stages: [
        {
          title: "Explain the mechanisms",
          prompt: "Why is more morphine not working?",
          answer: [
            "Tolerance involves receptor desensitisation, phosphorylation by protein kinase C and G protein-coupled receptor kinases, arrestin recruitment and receptor internalisation, shifting the dose–response curve right.",
            "Opioid-induced hyperalgesia is a distinct pronociceptive state involving NMDA receptor activation and central sensitisation, producing pain that worsens as dose increases.",
            "Sedation with continued severe pain and diffuse allodynia suggests hyperalgesia rather than simple undertreatment.",
          ],
        },
        {
          title: "Plan analgesia",
          prompt: "What do you do?",
          answer: [
            "Continue the baseline opioid requirement, add a low-dose ketamine infusion (typically 0.1–0.2 mg/kg/h after a small loading dose) and use full multimodal analgesia with paracetamol, an NSAID where safe, and regional or neuraxial techniques.",
            "Consider lidocaine infusion, alpha-2 agonists and gabapentinoids case by case, and involve the acute and chronic pain services early.",
            "Stop escalating opioid dose blindly; reassess function, sleep and mobility rather than a single score.",
          ],
        },
        {
          title: "Justify the ketamine",
          prompt: "What is the evidence and mechanism?",
          answer: [
            "NMDA receptor antagonism reduces central sensitisation, interrupts the protein kinase C-mediated loop that desensitises mu receptors, and can restore opioid responsiveness.",
            "Trials and meta-analyses in opioid-tolerant surgical patients show reduced opioid consumption and pain scores with low-dose perioperative ketamine.",
            "Monitor for psychomimetic effects, tachycardia, hypertension, sedation and, with prolonged use, hepatobiliary and urinary effects.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Tolerance and opioid-induced hyperalgesia coexist and are mechanistically linked through NMDA-dependent central sensitisation. Increasing the opioid dose treats tolerance but aggravates hyperalgesia, producing the clinical picture of sedation without analgesia. Recognising diffuse allodynia outside the surgical field is the key discriminator at the bedside." },
        { title: "Management and monitoring", content: "Maintain the patient's baseline opioid to prevent withdrawal, then attack the sensitised state: low-dose ketamine, regional analgesia, non-opioid adjuncts and clear functional goals. Monitor sedation with a validated scale, respiratory rate and capnography where high-dose opioids continue, and document a de-escalation plan and discharge opioid dose to avoid long-term escalation." },
        { title: "Exam pitfall", content: "Do not conflate tolerance with addiction, and do not answer with dose escalation alone. Name the receptor-level mechanisms and be explicit that ketamine is used at sub-anaesthetic doses." },
      ],
      takeHome: "Sedation plus severe diffuse pain suggests hyperalgesia: hold baseline opioid, add low-dose ketamine and build a genuinely multimodal plan.",
      sourceLinks: [s.opioids, s.ketamine],
    },
    {
      id: "pharmacology-malignant-hyperthermia",
      title: "Rising CO₂ and rigidity after sevoflurane",
      category: "Analgesia & anaesthetics",
      difficulty: "Advanced",
      summary: "Volatile agent pharmacology, ryanodine receptor dysfunction and time-critical dantrolene treatment.",
      topicIds: ["volatile-agents", "malignant-hyperthermia", "muscle-relaxants", "temperature-measurement", "clinical-incidents"],
      patient: "A young adult receives sevoflurane and suxamethonium for emergency surgery. Masseter spasm is noted at induction.",
      presentation: "End-tidal CO₂ rises to 9 kPa despite increased minute ventilation, with tachycardia, generalised rigidity, temperature climbing 0.5 °C every ten minutes and mixed acidosis.",
      stages: [
        {
          title: "Recognise and declare",
          prompt: "What is happening and what are the first actions?",
          answer: [
            "This is malignant hyperthermia: unregulated calcium release through a defective skeletal muscle ryanodine receptor causes sustained contracture, hypermetabolism and heat production.",
            "Declare the emergency, call for help and the MH kit, stop all volatile agent and suxamethonium, and switch to a clean circuit with high-flow oxygen and total intravenous anaesthesia.",
            "Ask the surgeon to stop or expedite closure, and hyperventilate to manage CO₂.",
          ],
        },
        {
          title: "Give definitive treatment",
          prompt: "What drug and dose?",
          answer: [
            "Dantrolene 2.5 mg/kg intravenously, repeated as needed up to about 10 mg/kg, with several people reconstituting vials because preparation is the rate-limiting step.",
            "Cool actively, treat hyperkalaemia, acidosis and arrhythmias, and expect myoglobinuria requiring fluid to maintain urine output.",
            "Avoid calcium channel blockers with dantrolene, and continue monitoring in critical care for recrudescence and compartment syndrome.",
          ],
        },
        {
          title: "Follow up",
          prompt: "What happens after the acute episode?",
          answer: [
            "Continue creatine kinase, potassium, coagulation and renal monitoring in critical care for at least 24 hours.",
            "Refer the patient and family to an MH investigation unit for genetic and in vitro contracture testing, and document the reaction clearly.",
            "Plan future anaesthesia as trigger-free: vapour-free machine, total intravenous anaesthesia, non-depolarising relaxants and dantrolene availability.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Volatile agents and suxamethonium trigger uncontrolled sarcoplasmic calcium release in susceptible individuals, usually through RYR1 variants. Sustained actin–myosin activity and futile ATP consumption produce CO₂ generation, heat, oxygen debt, lactic acidosis, hyperkalaemia and rhabdomyolysis. The earliest and most sensitive sign is an unexplained rise in end-tidal CO₂ despite adequate ventilation; temperature rise is a later feature." },
        { title: "Management and monitoring", content: "Treatment is simultaneous rather than sequential: remove triggers, give dantrolene early, cool, and correct metabolic derangement while a dedicated person manages drug preparation. Monitor invasive pressure, core temperature, gases, potassium, creatine kinase and urine output. Distinguish MH from thyroid storm, sepsis, neuroleptic malignant syndrome, phaeochromocytoma and inadequate anaesthesia — all of which raise CO₂ or temperature but need different treatment." },
        { title: "Exam pitfall", content: "Do not wait for pyrexia before treating, and do not forget that masseter spasm after suxamethonium is a warning sign. Quote the dantrolene dose and state that vapour must be removed with a clean circuit, not just switched off." },
      ],
      takeHome: "Unexplained rising CO₂ with rigidity is malignant hyperthermia until proven otherwise: remove triggers, give dantrolene 2.5 mg/kg early and cool aggressively.",
      sourceLinks: [s.volatiles, s.mh],
    },
    {
      id: "pharmacology-reversal-choice",
      title: "Choosing reversal in a patient with renal failure",
      category: "Kinetics & delivery",
      difficulty: "Intermediate",
      summary: "Elimination pathways, sugammadex versus neostigmine and the consequences of drug choice in organ failure.",
      topicIds: ["muscle-relaxants", "neuromuscular", "rocuronium", "aki-rrt", "pharmacokinetics"],
      patient: "A dialysis-dependent patient needs urgent surgery. Rocuronium was given for a rapid sequence induction 25 minutes ago; the post-tetanic count is 1.",
      presentation: "Surgery finishes early and rapid, complete reversal is required.",
      stages: [
        {
          title: "Explain the elimination",
          prompt: "How do the relevant drugs behave in renal failure?",
          answer: [
            "Rocuronium is mainly hepatobiliary but has a renal component, so duration is prolonged in renal failure.",
            "Neostigmine and sugammadex are both renally cleared; the sugammadex–rocuronium complex depends on renal excretion for elimination.",
            "Atracurium and cisatracurium are independent of organ clearance because of Hofmann elimination and ester hydrolysis, which is why they are often preferred here.",
          ],
        },
        {
          title: "Choose reversal now",
          prompt: "What do you give at a post-tetanic count of 1?",
          answer: [
            "Neostigmine cannot reverse this depth of block; it requires at least two twitches on train-of-four and has a ceiling effect from acetylcholinesterase saturation.",
            "Give sugammadex 4 mg/kg for deep block (2 mg/kg once two twitches have returned), and confirm recovery quantitatively to a train-of-four ratio of 0.9 or more.",
            "Although sugammadex is not licensed in severe renal impairment, it is widely used with the caveat of delayed complex clearance; discuss the risk of recurarisation and monitor accordingly.",
          ],
        },
        {
          title: "Anticipate the pitfalls",
          prompt: "What complications should you plan for?",
          answer: [
            "Recurarisation, especially if surgery is short, dosing marginal or clearance impaired — keep monitoring after reversal.",
            "Sugammadex encapsulates aminosteroids only, so if further blockade is needed within 24 hours use a benzylisoquinolinium drug or a much larger rocuronium dose.",
            "Neostigmine requires an antimuscarinic to limit bradycardia, secretions and bronchospasm; sugammadex can cause bradycardia and rare anaphylaxis.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Reversal choice is a pharmacokinetic decision. Neostigmine increases synaptic acetylcholine but cannot overcome deep receptor occupancy, so its effect plateaus. Sugammadex forms a 1:1 complex with aminosteroid relaxants, creating a concentration gradient away from the junction and reversing any depth of block; because both free and complexed drug rely on glomerular filtration, renal failure prolongs elimination even though clinical reversal is still rapid." },
        { title: "Management and monitoring", content: "Use quantitative monitoring throughout, choose the sugammadex dose by measured depth, and continue observation in recovery for recurarisation. In dialysis-dependent patients, consider planning ahead with cisatracurium for maintenance where a rapid sequence induction is not required, and document the reversal drug and time because it affects subsequent relaxant choice." },
        { title: "Exam pitfall", content: "Do not offer neostigmine for deep block, and do not claim sugammadex removes the need for monitoring. Mention the 24-hour aminosteroid re-dosing problem." },
      ],
      takeHome: "Match reversal to measured depth and organ function: sugammadex reverses deep aminosteroid block, neostigmine cannot, and Hofmann-eliminated drugs avoid the issue.",
      sourceLinks: [s.nmbGuideline, s.pk],
    },
    {
      id: "pharmacology-vasopressor-choice",
      title: "Which vasoactive drug for refractory septic shock?",
      category: "Critical care drugs",
      difficulty: "Advanced",
      summary: "Receptor pharmacodynamics, dose-dependent effects and rational escalation of vasoactive support.",
      topicIds: ["pharmacodynamics", "inotropes-vasopressors", "sepsis", "shock-states", "cardiac-output-monitoring"],
      patient: "A patient with septic shock remains hypotensive at a mean arterial pressure of 55 mmHg on noradrenaline 0.4 micrograms/kg/min despite fluid resuscitation.",
      presentation: "Cardiac index is 4.2 L/min/m², lactate 4.1 mmol/L, echocardiography shows preserved contractility.",
      stages: [
        {
          title: "Interpret the haemodynamics",
          prompt: "Which problem are you treating?",
          answer: [
            "High cardiac index with low pressure indicates a vasodilatory, resistance problem rather than pump failure.",
            "Adding an inotrope would raise output without correcting the vasodilation and may worsen tachyarrhythmia and oxygen demand.",
            "Target mean arterial pressure of about 65 mmHg, individualised upwards in chronic hypertension.",
          ],
        },
        {
          title: "Choose the next agent",
          prompt: "How do you escalate?",
          answer: [
            "Add vasopressin (typically 0.03 units/min) to spare catecholamine dose, acting through V1 receptors independent of adrenergic pathways.",
            "Consider hydrocortisone for shock requiring ongoing vasopressor support, and reassess for source control, occult bleeding and acidosis limiting catecholamine responsiveness.",
            "Reserve adrenaline or an inotrope for genuine low-output states, guided by echocardiography or cardiac output monitoring.",
          ],
        },
        {
          title: "Explain the receptors",
          prompt: "Summarise the pharmacodynamics behind the choices.",
          answer: [
            "Noradrenaline acts mainly on alpha-1 receptors with modest beta-1 activity, raising resistance with limited chronotropy.",
            "Adrenaline is dose-dependent: beta effects predominate at low dose, alpha at high dose, with lactate generation through beta-2-mediated glycolysis.",
            "Dobutamine is a beta-1 agonist with beta-2 vasodilation; phenylephrine is a pure alpha-1 agonist that may reduce output through reflex bradycardia and increased afterload.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Vasoactive selection follows from the measured physiology: define whether the deficit is resistance, output, preload or rhythm, then choose the receptor profile that corrects it. Catecholamine responsiveness falls with acidosis, hypocalcaemia, hypoxia and receptor downregulation, so escalating dose alone is often ineffective; combining agents with different mechanisms is more effective and less arrhythmogenic than maximising one." },
        { title: "Management and monitoring", content: "Use invasive arterial monitoring, central administration, repeated echocardiography or cardiac output measurement, lactate trend and urine output. Correct calcium, acidosis and hypoxia; ensure source control and antimicrobial adequacy. Add vasopressin early as catecholamine-sparing, consider corticosteroid in vasopressor-dependent shock, and reassess for mechanisms such as tamponade, right ventricular failure or adrenal insufficiency when shock is refractory." },
        { title: "Exam pitfall", content: "Do not add an inotrope for a high-output vasodilated state, and do not describe 'renal-dose dopamine'. Give receptor targets and doses, and state the mean arterial pressure goal." },
      ],
      takeHome: "Treat the measured defect: vasodilatory shock needs vasopressors and catecholamine-sparing adjuncts, not inotropes for an already high cardiac output.",
      sourceLinks: [s.vasopressor, s.pd],
    },
    {
      id: "pharmacology-antimicrobial-dosing",
      title: "Antibiotic dosing in critical illness and renal replacement",
      category: "Critical care drugs",
      difficulty: "Intermediate",
      summary: "Time- versus concentration-dependent killing, volume of distribution and dose adjustment in organ support.",
      topicIds: ["antimicrobials", "sepsis", "aki-rrt", "pharmacokinetics", "pharmacodynamics"],
      patient: "A patient with abdominal sepsis on continuous veno-venous haemofiltration is prescribed meropenem and gentamicin. Serum albumin is 18 g/L and fluid balance is +6 L.",
      presentation: "The team asks whether doses should be reduced because of renal failure.",
      stages: [
        {
          title: "Classify the killing pattern",
          prompt: "Which pharmacodynamic target applies to each drug?",
          answer: [
            "Beta-lactams such as meropenem are time-dependent: efficacy tracks the fraction of the dosing interval that free drug exceeds the minimum inhibitory concentration.",
            "Aminoglycosides are concentration-dependent: efficacy tracks peak concentration relative to the minimum inhibitory concentration, with post-antibiotic effect permitting extended intervals.",
            "Vancomycin is best described by the ratio of 24-hour area under the curve to minimum inhibitory concentration.",
          ],
        },
        {
          title: "Adjust for the pathophysiology",
          prompt: "What happens to kinetics in this patient?",
          answer: [
            "Volume of distribution of hydrophilic drugs increases with oedema and fluid loading, so early underdosing is common; loading doses should not be reduced.",
            "Hypoalbuminaemia increases free fraction of highly protein-bound drugs and can increase clearance of unbound drug.",
            "Continuous renal replacement provides substantial clearance of small, water-soluble, poorly protein-bound drugs, so maintenance doses often need to be higher than for anuric patients not receiving filtration.",
          ],
        },
        {
          title: "Write the plan",
          prompt: "What is your practical prescription strategy?",
          answer: [
            "Give a full loading dose, then adjust maintenance to the measured clearance including filtration effluent rate, prolonging beta-lactam infusions to extend time above the minimum inhibitory concentration.",
            "Use therapeutic drug monitoring for aminoglycosides and vancomycin, and involve microbiology and pharmacy for dose individualisation.",
            "Take cultures, give antimicrobials within one hour of recognised sepsis, achieve source control and review de-escalation daily.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Critical illness alters both volume of distribution and clearance, often in opposite directions and over hours. Capillary leak, aggressive resuscitation and hypoalbuminaemia expand the distribution volume of hydrophilic antimicrobials, while augmented renal clearance in some patients and extracorporeal clearance in others increase elimination. Consequently dose reduction on the basis of a creatinine value alone frequently produces subtherapeutic exposure at the time when killing matters most." },
        { title: "Management and monitoring", content: "Separate loading from maintenance: loading depends on volume of distribution and should be full; maintenance depends on clearance including renal replacement effluent flow. Extended or continuous beta-lactam infusion improves target attainment, and therapeutic drug monitoring should guide aminoglycoside and vancomycin dosing. Reassess daily against culture results, clinical trajectory and source control, and document stop or review dates." },
        { title: "Exam pitfall", content: "Do not reduce the loading dose because of renal failure, and do not describe every antibiotic as if the same target applied. Name the specific pharmacodynamic index for each class." },
      ],
      takeHome: "Load fully, then adjust maintenance to real clearance: beta-lactams need time above MIC, aminoglycosides need peaks, and filtration removes drug.",
      sourceLinks: [s.antimicrobial, s.pk],
    },
  ],
};
