import type { CaseBank } from "./types";

const s = {
  cardiacCycle: { label: "BJA Educ: the cardiac cycle", href: "https://doi.org/10.1093/bjaceaccp/mki024" },
  electrophysiology: { label: "BJA Educ: cardiac electrophysiology", href: "https://doi.org/10.1093/bjaceaccp/mkm013" },
  vaughanWilliams: { label: "Vaughan Williams classification", href: "https://doi.org/10.1016/0306-039X(75)90019-7" },
  vq: { label: "BJA Educ: ventilation–perfusion relationships", href: "https://doi.org/10.1183/09031936.00037014" },
  proseva: { label: "PROSEVA 2013", href: "https://doi.org/10.1056/NEJMoa1214103" },
  lungMechanics: { label: "BJA Educ: respiratory mechanics", href: "https://doi.org/10.1093/bjaceaccp/mkr054" },
  stressStrain: { label: "Crit Care Med: stress and strain", href: "https://doi.org/10.1097/CCM.0b013e31827417a6" },
  renal: { label: "BJA Educ: renal physiology", href: "https://doi.org/10.1093/bjaceaccp/mku047" },
  aki: { label: "KDIGO AKI guideline", href: "https://kdigo.org/guidelines/acute-kidney-injury/" },
  nmj: { label: "BJA Educ: neuromuscular junction", href: "https://doi.org/10.1016/j.bjae.2018.02.003" },
  nmbGuideline: { label: "Assoc Anaesth 2023: neuromuscular blockade", href: "https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/10.1111/anae.16114" },
  autonomic: { label: "BJA Educ: autonomic nervous system", href: "https://doi.org/10.1093/bjaceaccp/mkm023" },
  bradycardia: { label: "BJA Educ: perioperative bradycardia", href: "https://doi.org/10.1016/j.bjae.2021.05.001" },
};

export const physiologyCaseBank: CaseBank = {
  slug: "physiology",
  path: "/physiology/case-bank",
  title: "Physiology Case Bank",
  subtitle: "Progressive scenarios that apply cardiovascular, respiratory, renal, neuromuscular and autonomic physiology at the bedside.",
  metaDescription: "Seven progressive physiology cases on aortic stenosis, long QT, one-lung ventilation, compliance, postoperative oliguria, residual block and autonomic dysreflexia.",
  backPath: "/physiology",
  backLabel: "Physiology",
  accentColor: "text-physiology",
  categories: ["Cardiovascular", "Respiratory", "Renal, neuromuscular & autonomic"],
  cases: [
    {
      id: "physiology-aortic-stenosis",
      title: "Spinal anaesthesia in severe aortic stenosis",
      category: "Cardiovascular",
      difficulty: "Intermediate",
      summary: "Pressure–volume relationships, coronary perfusion and why afterload must be defended.",
      topicIds: ["cardiac-cycle", "cardiac-anatomy", "cardiovascular-disease", "orthopaedic-anaesthesia", "elderly-anaesthesia"],
      patient: "An 82-year-old with severe aortic stenosis (peak gradient 70 mmHg, valve area 0.7 cm²) needs hemiarthroplasty after a hip fracture.",
      presentation: "A single-shot spinal is proposed. Ten minutes after injection the systolic pressure falls from 150 to 80 mmHg and the patient becomes confused.",
      stages: [
        {
          title: "Explain the physiology",
          prompt: "Why is this fall in pressure so dangerous?",
          answer: [
            "The concentrically hypertrophied ventricle is stiff: filling depends on atrial contraction and adequate diastolic time, so tachycardia and loss of sinus rhythm are poorly tolerated.",
            "Stroke volume is relatively fixed across the stenotic valve, so cardiac output cannot rise to compensate for vasodilation.",
            "Coronary perfusion of a hypertrophied ventricle occurs almost entirely in diastole and depends on aortic diastolic pressure minus left ventricular end-diastolic pressure — hypotension rapidly causes subendocardial ischaemia.",
          ],
        },
        {
          title: "Treat the hypotension",
          prompt: "What is your immediate management?",
          answer: [
            "Restore afterload early with a vasoconstrictor such as phenylephrine or metaraminol rather than relying on fluid alone.",
            "Maintain sinus rhythm and a controlled rate (roughly 60–80 beats per minute); treat new atrial fibrillation urgently.",
            "Give measured fluid to preserve preload, keep the patient in a head-down tilt if needed, and give oxygen while reassessing.",
          ],
        },
        {
          title: "Reconsider the technique",
          prompt: "How would you plan the anaesthetic for the next such patient?",
          answer: [
            "Either a carefully titrated technique with invasive arterial monitoring and vasopressor infusion prepared before block, or a general anaesthetic with slow induction and the same monitoring.",
            "Avoid rapid-onset sympathectomy and large-dose single-shot spinals in fixed-output lesions; consider incremental epidural or low-dose spinal plus nerve block for hip fracture.",
            "Escalate to senior and cardiology review, and do not delay hip fracture surgery unduly for investigations that will not change management.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Severe aortic stenosis converts a normally compliant, output-adaptable circulation into a fixed-output, pressure-dependent one. The ventricular pressure–volume loop is shifted left and steepened, so small volume changes cause large pressure changes; the transvalvular gradient means systolic ventricular pressure greatly exceeds aortic pressure, increasing wall stress and oxygen demand at the same time as diastolic perfusion pressure falls." },
        { title: "Management and monitoring", content: "Prepare invasive arterial monitoring and a vasopressor infusion before establishing any sympathectomy. Aim for sinus rhythm, adequate preload, normal-to-high systemic vascular resistance and avoidance of tachycardia. Treat hypotension immediately with a vasoconstrictor; if arrest occurs, resuscitation is often ineffective because cardiac massage cannot generate flow across a critically stenotic valve, so prevention is the whole strategy." },
        { title: "Exam pitfall", content: "Do not answer 'give fluid' alone, and do not describe ephedrine as first choice where tachycardia will shorten diastole. State the fixed stroke volume, the diastolic coronary perfusion argument and the rhythm target explicitly." },
      ],
      takeHome: "In severe aortic stenosis, output is fixed and coronary perfusion is diastolic: protect afterload, preload and sinus rhythm, and monitor invasively before you block.",
      sourceLinks: [s.cardiacCycle],
    },
    {
      id: "physiology-long-qt",
      title: "Torsades after ondansetron and vomiting",
      category: "Cardiovascular",
      difficulty: "Advanced",
      summary: "Repolarisation reserve, QT prolongation and treatment of polymorphic VT.",
      topicIds: ["cardiac-electrophysiology", "arrhythmias-ecg-icu", "antiemetics", "antiarrhythmics", "acid-base"],
      patient: "A young adult admitted with prolonged vomiting receives ondansetron and a macrolide. Potassium is 2.9 mmol/L and magnesium 0.5 mmol/L.",
      presentation: "The monitor shows a broad, twisting polymorphic tachycardia that self-terminates. QTc before the event was 510 ms.",
      stages: [
        {
          title: "Explain the mechanism",
          prompt: "Why has this rhythm occurred?",
          answer: [
            "Phase 3 repolarisation depends mainly on the delayed rectifier potassium currents IKr and IKs; blocking IKr prolongs the action potential and the QT interval.",
            "Prolonged repolarisation permits reactivation of L-type calcium current, producing early afterdepolarisations and triggered beats.",
            "Hypokalaemia and hypomagnesaemia reduce repolarisation reserve, so drug effects that are usually tolerated become arrhythmogenic.",
          ],
        },
        {
          title: "Treat the arrhythmia",
          prompt: "What is your immediate management?",
          answer: [
            "Give intravenous magnesium sulfate even if magnesium is normal, correct potassium towards the upper normal range and stop all QT-prolonging drugs.",
            "Treat sustained or pulseless episodes with defibrillation and follow advanced life support; consider overdrive pacing or isoprenaline for pause-dependent, bradycardia-related torsades.",
            "Avoid class Ia and class III antiarrhythmics, which prolong repolarisation further.",
          ],
        },
        {
          title: "Prevent recurrence",
          prompt: "What ongoing plan is needed?",
          answer: [
            "Review every drug on the chart against a QT-prolonging list, including antiemetics, antipsychotics, macrolides, antifungals and methadone.",
            "Monitor electrolytes and QTc repeatedly, especially with ongoing vomiting, diuretics or renal replacement.",
            "Refer for cardiology assessment and family screening if congenital long QT syndrome is suspected.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "The cardiac action potential's plateau and repolarisation reflect a balance between inward calcium and outward potassium currents. Repolarisation reserve is the redundancy in this system; congenital channel variants, electrolyte depletion, bradycardia and multiple IKr-blocking drugs erode it additively. Torsades de pointes is the clinical expression of triggered activity on a prolonged, heterogeneous repolarisation substrate." },
        { title: "Management and monitoring", content: "Magnesium suppresses early afterdepolarisations and is first-line even with normal levels. Keep potassium above 4.5 mmol/L in this setting, remove precipitating drugs, and maintain a heart rate that shortens repolarisation when torsades is pause-dependent. Continuous ECG monitoring with QTc measurement, defibrillator availability and a documented drug-avoidance list should follow the patient." },
        { title: "Exam pitfall", content: "Do not give amiodarone reflexively for a broad-complex tachycardia that is torsades. Distinguish polymorphic from monomorphic VT, and name IKr blockade and early afterdepolarisations rather than saying 'the QT was long'." },
      ],
      takeHome: "Torsades reflects lost repolarisation reserve: give magnesium, correct potassium, stop QT-prolonging drugs and avoid further class III agents.",
      sourceLinks: [s.electrophysiology, s.vaughanWilliams],
    },
    {
      id: "physiology-one-lung",
      title: "Hypoxaemia during one-lung ventilation",
      category: "Respiratory",
      difficulty: "Advanced",
      summary: "Shunt, hypoxic pulmonary vasoconstriction and gravity in the lateral position.",
      topicIds: ["ventilation-perfusion", "cardiothoracic", "lung-mechanics", "volatile-agents", "thoracic-anatomy"],
      patient: "A patient in the right lateral position for left thoracotomy desaturates to 86% ten minutes after starting one-lung ventilation of the dependent lung.",
      presentation: "Airway pressures are acceptable, the double-lumen tube position was confirmed, and the surgeon has begun dissection.",
      stages: [
        {
          title: "Describe the shunt",
          prompt: "Why does saturation fall and what limits the fall?",
          answer: [
            "The collapsed non-dependent lung is perfused but not ventilated, creating a true shunt that can approach 40–50% of cardiac output initially.",
            "Hypoxic pulmonary vasoconstriction diverts flow away from the hypoxic lung over 20–30 minutes, reducing shunt substantially.",
            "Gravity in the lateral position also favours perfusion of the dependent, ventilated lung, and shunt fraction cannot be corrected by increasing FiO₂ alone.",
          ],
        },
        {
          title: "Systematically exclude causes",
          prompt: "What do you check before accepting shunt as the cause?",
          answer: [
            "Recheck tube position with fibreoptic bronchoscopy — malposition is the commonest reversible cause.",
            "Exclude secretions, blood, kinking, low cardiac output, dynamic hyperinflation and inadequate FiO₂.",
            "Reassess the dependent lung for atelectasis, which increases shunt further.",
          ],
        },
        {
          title: "Escalate treatment",
          prompt: "How do you improve oxygenation?",
          answer: [
            "Increase FiO₂, recruit and apply PEEP of about 5 cmH₂O to the dependent lung, and use protective tidal volumes of roughly 4–6 mL/kg predicted body weight.",
            "Apply CPAP or intermittent insufflation to the operative lung, or clamp the appropriate pulmonary artery branch, in discussion with the surgeon.",
            "Avoid high concentrations of volatile agent if the inhibition of hypoxic pulmonary vasoconstriction becomes clinically relevant, and resume two-lung ventilation if hypoxaemia is refractory.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Oxygenation during one-lung ventilation is dominated by shunt fraction; because shunted blood never contacts alveolar gas, its contribution cannot be reversed by raising alveolar oxygen. Hypoxic pulmonary vasoconstriction is the main protective response, mediated by mitochondrial oxygen sensing and potassium-channel-dependent vasoconstriction in small pulmonary arteries; it is attenuated by vasodilators, high volatile concentrations, hypocapnia, alkalosis and very high or very low pulmonary artery pressures." },
        { title: "Management and monitoring", content: "Confirm tube position first, then optimise the dependent lung with recruitment, modest PEEP and protective volumes while avoiding both atelectasis and overdistension. Operative-lung CPAP or oxygen insufflation and surgical pulmonary artery clamping are effective adjuncts. Monitor with continuous oximetry, capnography, arterial gases and airway pressures, and communicate a clear plan for resuming two-lung ventilation." },
        { title: "Exam pitfall", content: "Do not say 'turn the oxygen up' as the whole answer; shunt is relatively refractory to FiO₂. Always place bronchoscopic confirmation of tube position before physiological manoeuvres." },
      ],
      takeHome: "One-lung hypoxaemia is mainly shunt: confirm tube position, optimise the dependent lung, support the operative lung and let hypoxic pulmonary vasoconstriction work.",
      sourceLinks: [s.vq, s.proseva],
    },
    {
      id: "physiology-laparoscopy-compliance",
      title: "Falling compliance during steep Trendelenburg laparoscopy",
      category: "Respiratory",
      difficulty: "Intermediate",
      summary: "Compliance, driving pressure and the effects of pneumoperitoneum on ventilation.",
      topicIds: ["lung-mechanics", "bariatric-anaesthesia", "gynaecological-anaesthesia", "urological-anaesthesia", "patient-positioning"],
      patient: "A patient with a body mass index of 38 has robotic pelvic surgery in steep head-down tilt with a 15 mmHg pneumoperitoneum.",
      presentation: "Plateau pressure rises from 18 to 30 cmH₂O, tidal volume is unchanged, and end-tidal CO₂ climbs to 6.8 kPa.",
      stages: [
        {
          title: "Interpret the pressures",
          prompt: "Which measurement tells you about the lung itself?",
          answer: [
            "Peak pressure reflects resistive plus elastic loads; plateau pressure reflects the elastic load after an inspiratory pause.",
            "Driving pressure (plateau minus PEEP) reflects tidal strain on the aerated lung and is the pressure that tracks harm.",
            "Here the change is elastic: reduced compliance from cephalad diaphragm displacement, abdominal insufflation and chest wall loading, not increased airway resistance.",
          ],
        },
        {
          title: "Separate lung from chest wall",
          prompt: "Why does this distinction matter?",
          answer: [
            "Total respiratory system compliance is the series combination of lung and chest wall compliance, so a stiff chest wall raises plateau pressure without proportionate alveolar overdistension.",
            "Transpulmonary pressure, not airway pressure, determines alveolar stress; oesophageal pressure measurement can estimate it when decisions are difficult.",
            "Accepting a somewhat higher plateau pressure may be safe if the rise is chest wall in origin.",
          ],
        },
        {
          title: "Adjust ventilation",
          prompt: "What do you change?",
          answer: [
            "Use 6–8 mL/kg predicted body weight, recruit and set PEEP of roughly 5–10 cmH₂O, and increase rate rather than volume to clear CO₂.",
            "Ask for the lowest workable insufflation pressure and the least tilt the surgery allows, and check for endobronchial tube migration in head-down position.",
            "Watch for facial and airway oedema, plan extubation after a cuff-leak and airway assessment, and expect atelectasis to require recruitment at the end of surgery.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Pneumoperitoneum and head-down positioning reduce functional residual capacity and compliance, promote basal atelectasis and increase both shunt and dead space; absorbed carbon dioxide adds to the CO₂ load. Because plateau pressure includes the chest wall contribution, a raised value in this setting does not automatically indicate injurious alveolar distension — driving pressure and, where measured, transpulmonary pressure are more informative." },
        { title: "Management and monitoring", content: "Protective volumes, individualised PEEP after recruitment, adequate neuromuscular blockade, and rate-based CO₂ control are the mainstays. Monitor plateau and driving pressure with inspiratory pauses, follow end-tidal CO₂ with arterial correlation in longer cases, and recheck tube depth after position change. At the end of surgery, deflate the abdomen, recruit and assess airway oedema before extubation." },
        { title: "Exam pitfall", content: "Do not treat a rising plateau pressure as automatic evidence of lung injury or bronchospasm; define compliance and driving pressure, and separate lung from chest wall mechanics." },
      ],
      takeHome: "Steep tilt and pneumoperitoneum reduce compliance through the chest wall: judge harm by driving pressure, use protective volumes and clear CO₂ with rate.",
      sourceLinks: [s.lungMechanics, s.stressStrain],
    },
    {
      id: "physiology-postop-oliguria",
      title: "Oliguria on the first postoperative night",
      category: "Renal, neuromuscular & autonomic",
      difficulty: "Foundation",
      summary: "Renal autoregulation, tubuloglomerular feedback and safe assessment of low urine output.",
      topicIds: ["renal-physiology", "aki-rrt", "perioperative-fluids", "postop-high-risk-icu", "nsaids-paracetamol"],
      patient: "After open colorectal surgery, an adult passes 15 mL of urine per hour for three hours. Mean arterial pressure is 65 mmHg, and the chart includes an ACE inhibitor and regular ibuprofen.",
      presentation: "The nurse asks for a fluid bolus. The patient looks comfortable, warm and peripherally well perfused.",
      stages: [
        {
          title: "Explain the renal physiology",
          prompt: "How does the kidney normally protect glomerular filtration?",
          answer: [
            "Autoregulation keeps renal blood flow and glomerular filtration rate near constant across a mean arterial pressure of roughly 80–180 mmHg through myogenic and tubuloglomerular feedback mechanisms.",
            "Afferent arteriolar dilation depends partly on prostaglandins; efferent tone depends on angiotensin II.",
            "NSAIDs blunt afferent dilation and ACE inhibitors blunt efferent constriction, so both together strip away autoregulatory reserve at low pressure.",
          ],
        },
        {
          title: "Assess before infusing",
          prompt: "How do you evaluate this oliguria?",
          answer: [
            "Exclude obstruction first: flush or replace a blocked catheter and examine for retention.",
            "Assess perfusion with capillary refill, lactate, pressure trend against the patient's baseline, and dynamic response to a small measured fluid challenge.",
            "Look for bleeding, sepsis, raised intra-abdominal pressure and drug causes; review nephrotoxins and check creatinine trend against KDIGO criteria.",
          ],
        },
        {
          title: "Treat proportionately",
          prompt: "What do you do?",
          answer: [
            "Stop the NSAID, withhold the ACE inhibitor and restore mean arterial pressure towards the patient's usual value using fluid where hypovolaemic and vasopressor where vasodilated.",
            "Avoid indiscriminate large-volume fluid loading, which causes venous congestion, oedema and worse outcomes without protecting kidneys.",
            "Recheck urine output, creatinine and electrolytes, and escalate for critical care review if oliguria persists or acidosis, hyperkalaemia or fluid overload develop.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Postoperative oliguria is often an appropriate neuroendocrine response to surgery — antidiuretic hormone and aldosterone conserve water and sodium — but it is also the first sign of hypoperfusion or nephrotoxicity. Because autoregulation depends on prostaglandin-mediated afferent dilation and angiotensin II-mediated efferent tone, combining an NSAID and a renin–angiotensin blocker at low perfusion pressure predictably reduces glomerular filtration." },
        { title: "Management and monitoring", content: "Work through obstruction, perfusion and nephrotoxins in order. Use small, repeated fluid challenges with a defined endpoint rather than open-ended boluses, and add vasopressor where vasodilation rather than hypovolaemia dominates. Track hourly urine output, creatinine, potassium, acid–base status and fluid balance; diuretics treat fluid overload but do not treat acute kidney injury or improve outcome." },
        { title: "Exam pitfall", content: "Do not give a reflex 500 mL bolus for every low urine output, and do not forget a blocked catheter. Frame the answer around autoregulation, KDIGO staging and drug review." },
      ],
      takeHome: "Assess obstruction, perfusion and nephrotoxins before infusing: NSAIDs plus renin–angiotensin blockade at low pressure remove renal autoregulatory reserve.",
      sourceLinks: [s.renal, s.aki],
    },
    {
      id: "physiology-residual-block",
      title: "Weak in recovery after rocuronium",
      category: "Renal, neuromuscular & autonomic",
      difficulty: "Intermediate",
      summary: "Safety margin at the neuromuscular junction, quantitative monitoring and reversal choice.",
      topicIds: ["neuromuscular", "muscle-relaxants", "rocuronium", "clinical-incidents", "airway-management"],
      patient: "An adult is extubated after laparoscopic surgery following neostigmine reversal judged on clinical signs alone. In recovery there is diplopia, weak grip, difficulty swallowing and oxygen saturation of 90%.",
      presentation: "Train-of-four monitoring is now applied and the ratio is 0.6 at the adductor pollicis.",
      stages: [
        {
          title: "Explain the physiology",
          prompt: "Why can a patient breathe yet still be significantly paralysed?",
          answer: [
            "There is a large safety margin: about 70–80% of postsynaptic nicotinic receptors can be occupied before twitch height falls, so tidal breathing returns long before full recovery.",
            "Fade during repetitive stimulation reflects presynaptic effects on acetylcholine mobilisation and is the sensitive indicator of residual block.",
            "Upper airway and pharyngeal muscles are more sensitive than the diaphragm, so aspiration risk and airway obstruction persist at a train-of-four ratio below 0.9.",
          ],
        },
        {
          title: "Manage the patient now",
          prompt: "What do you do immediately?",
          answer: [
            "Give oxygen, support the airway, sit the patient up and stay with them; do not sedate the agitation.",
            "Reverse residual block: sugammadex is effective for rocuronium and vecuronium even at deep levels, and can rescue inadequate neostigmine reversal.",
            "Continue quantitative monitoring until the train-of-four ratio is 0.9 or greater, and reassess swallowing before any oral intake.",
          ],
        },
        {
          title: "Prevent the recurrence",
          prompt: "What should have happened?",
          answer: [
            "Use quantitative neuromuscular monitoring whenever a neuromuscular blocking drug is given, from before induction until recovery.",
            "Recognise that neostigmine cannot reverse deep block and has a ceiling effect; give it only when at least two or more twitches are present, and prefer sugammadex for deep block or when rapid, complete reversal is needed.",
            "Consider potentiating factors: hypothermia, respiratory acidosis, hypokalaemia, hypermagnesaemia, aminoglycosides, renal or hepatic impairment and myasthenia.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Non-depolarising drugs are competitive antagonists at postsynaptic nicotinic receptors, but the junction's safety margin means clinical signs are insensitive. Fade reflects reduced acetylcholine mobilisation with repetitive stimulation and is why the train-of-four ratio, not twitch presence, defines adequate recovery. Residual block below a ratio of 0.9 is associated with impaired airway protection, hypoxaemia and postoperative pulmonary complications." },
        { title: "Management and monitoring", content: "Quantitative monitoring at the adductor pollicis is the standard; site the stimulator away from surgical fields and calibrate before relaxant administration. Sugammadex encapsulates aminosteroid relaxants in a 1:1 complex and works at any depth; neostigmine requires spontaneous recovery and is limited by acetylcholinesterase saturation. Document the recovery ratio before extubation and manage recovery-area weakness as an airway emergency." },
        { title: "Exam pitfall", content: "Do not accept head lift, tidal volume or a subjective train-of-four count as evidence of full reversal, and do not give neostigmine for deep block. Quote the 0.9 threshold and the receptor safety margin." },
      ],
      takeHome: "Clinical signs miss residual block: monitor quantitatively, reverse appropriately and only extubate at a train-of-four ratio of 0.9 or above.",
      sourceLinks: [s.nmj, s.nmbGuideline],
    },
    {
      id: "physiology-dysreflexia",
      title: "Severe hypertension in chronic spinal cord injury",
      category: "Renal, neuromuscular & autonomic",
      difficulty: "Advanced",
      summary: "Autonomic dysreflexia: loss of descending inhibition, reflex bradycardia and blockade of the afferent stimulus.",
      topicIds: ["autonomic-nervous", "urological-anaesthesia", "spinal-anatomy", "neurological-disease", "regional-anaesthesia"],
      patient: "An adult with a complete T4 spinal cord injury attends for cystoscopy. During bladder distension, blood pressure rises to 210/115 mmHg with pounding headache, flushing above the lesion and a heart rate of 48 beats per minute.",
      presentation: "No block or general anaesthetic has been given because the patient 'cannot feel anything below the chest'.",
      stages: [
        {
          title: "Explain the reflex",
          prompt: "Why does this happen in lesions above T6?",
          answer: [
            "Noxious stimuli below the lesion trigger unmodulated sympathetic outflow through the isolated cord, causing intense splanchnic vasoconstriction and severe hypertension.",
            "Descending inhibitory pathways cannot reach the sympathetic outflow below the injury, so the reflex is unopposed.",
            "Intact baroreceptor afferents drive vagal bradycardia and flushing above the lesion, giving the characteristic combination of hypertension with a low heart rate.",
          ],
        },
        {
          title: "Treat the episode",
          prompt: "What is the immediate management?",
          answer: [
            "Remove the stimulus: stop the procedure, drain the bladder and check for catheter blockage, faecal loading or pressure injury.",
            "Sit the patient up, and give a short-acting titratable vasodilator such as glyceryl trinitrate for persistent severe hypertension.",
            "Treat bradycardia only if it compromises output, and monitor for the complications of a hypertensive crisis, including intracranial haemorrhage, seizures and pulmonary oedema.",
          ],
        },
        {
          title: "Prevent it next time",
          prompt: "How should the anaesthetic be planned?",
          answer: [
            "Block the afferent limb: spinal or epidural anaesthesia is highly effective, and general anaesthesia of adequate depth is an alternative; local gel alone is not.",
            "Avoid suxamethonium in chronic injury because of denervation-related receptor upregulation and hyperkalaemia risk.",
            "Use invasive or close blood pressure monitoring, plan vasodilators and vasopressors in advance, and remember temperature dysregulation and impaired reflex compensation for blood loss.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Autonomic dysreflexia arises when a spinal reflex arc below a high lesion operates without descending modulation. The commonest triggers are bladder and bowel distension, followed by skin and surgical stimuli. The paradox of hypertension with bradycardia is diagnostic: sympathetic activity dominates below the injury while baroreflex-mediated vagal activity acts on the intact heart." },
        { title: "Management and monitoring", content: "Prevention is anaesthetic: block afferent transmission with neuraxial or general anaesthesia and monitor pressure closely. When a crisis occurs, stimulus removal is the definitive treatment, supported by short-acting vasodilation. Chronic spinal cord injury also brings restrictive respiratory function, poor cough, pressure-area vulnerability, osteoporosis and impaired thermoregulation, all of which belong in the anaesthetic plan." },
        { title: "Exam pitfall", content: "Do not assume that absent sensation means no anaesthesia is needed, and do not give a long-acting antihypertensive that will cause prolonged hypotension once the stimulus is removed. Explicitly mention suxamethonium avoidance." },
      ],
      takeHome: "Sensory loss does not prevent autonomic dysreflexia: block the afferent stimulus with neuraxial or general anaesthesia, and treat a crisis by removing the trigger.",
      sourceLinks: [s.autonomic, s.bradycardia],
    },
  ],
};
