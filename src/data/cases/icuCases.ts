import type { CaseBank } from "./types";

const s = {
  acidBase: { label: "BJA Educ: acid–base interpretation", href: "https://doi.org/10.1093/bjaed/mkx008" },
  stewart: { label: "Stewart approach to acid–base", href: "https://doi.org/10.1186/cc3927" },
  ards: { label: "Berlin definition of ARDS", href: "https://doi.org/10.1001/jama.2012.5669" },
  proseva: { label: "PROSEVA 2013", href: "https://doi.org/10.1056/NEJMoa1214103" },
  ardsnet: { label: "ARDSNet low tidal volume trial", href: "https://doi.org/10.1056/NEJM200005043421801" },
  asthma: { label: "BJA Educ: severe asthma in critical care", href: "https://doi.org/10.1016/j.bjae.2019.10.004" },
  copd: { label: "BJA Educ: COPD and ventilation", href: "https://doi.org/10.1093/bjaed/mkr054" },
  sepsis3: { label: "Sepsis-3 definitions", href: "https://doi.org/10.1001/jama.2016.0287" },
  ssc: { label: "Surviving Sepsis Campaign 2021", href: "https://doi.org/10.1097/CCM.0000000000005337" },
  immunology: { label: "BJA Educ: immunology for intensivists", href: "https://doi.org/10.1016/j.bjae.2020.02.003" },
};

export const icuCaseBank: CaseBank = {
  slug: "intensive-care",
  path: "/intensive-care/case-bank",
  title: "Intensive Care Case Bank",
  subtitle: "Progressive critical care scenarios covering acid–base interpretation, ventilation strategy, sepsis and immune compromise.",
  metaDescription: "Six progressive intensive care cases on DKA and lactate, mixed COPD acid–base disease, ARDS and proning, asthma auto-PEEP, neutropenic sepsis and asplenic infection.",
  backPath: "/intensive-care",
  backLabel: "Intensive Care",
  accentColor: "text-icu",
  categories: ["Acid–base", "Ventilation", "Infection & immunity"],
  cases: [
    {
      id: "icu-hagma-dka",
      title: "High anion gap acidosis in diabetic ketoacidosis",
      category: "Acid–base",
      difficulty: "Intermediate",
      summary: "Anion gap, ketones versus lactate and the effect of large-volume saline on chloride.",
      topicIds: ["acid-base", "diabetes-emergencies", "abg-analysis", "perioperative-fluids", "aki-rrt"],
      patient: "A young adult presents with pH 7.08, bicarbonate 6 mmol/L, PaCO₂ 2.4 kPa, glucose 28 mmol/L, ketones 6.2 mmol/L, lactate 3.1 mmol/L, sodium 133 mmol/L, chloride 96 mmol/L.",
      presentation: "After 4 L of 0.9% sodium chloride and an insulin infusion, ketones fall to 1.0 mmol/L but pH is still 7.20 with bicarbonate 14 mmol/L and chloride 116 mmol/L.",
      stages: [
        {
          title: "Interpret the first gas",
          prompt: "Describe the disorder quantitatively.",
          answer: [
            "Severe metabolic acidosis with appropriate respiratory compensation: expected PaCO₂ is close to the measured value, so there is no additional respiratory disorder.",
            "Anion gap is raised at about 31 mmol/L, consistent with ketoacidosis; the modest lactate rise reflects hypovolaemia and catecholamine-driven glycolysis.",
            "Delta ratio confirms a pure high anion gap picture rather than a mixed acidosis at presentation.",
          ],
        },
        {
          title: "Explain the second gas",
          prompt: "Why is the patient still acidotic after ketones have cleared?",
          answer: [
            "The anion gap has normalised while a hyperchloraemic, normal anion gap acidosis has appeared from large-volume 0.9% sodium chloride.",
            "In Stewart terms, the infused fluid has a strong ion difference of zero, so it reduces plasma strong ion difference and lowers pH independently of ketones.",
            "Bicarbonate regeneration also lags behind ketone clearance because ketoanions were excreted rather than metabolised.",
          ],
        },
        {
          title
: "Manage from here",
          prompt: "What do you change?",
          answer: [
            "Switch to a balanced crystalloid, continue fixed-rate insulin with glucose-containing fluid once glucose falls below about 14 mmol/L, and replace potassium aggressively.",
            "Do not give bicarbonate for a resolving ketoacidosis; treat the cause and monitor ketone clearance rather than pH alone.",
            "Look for the precipitant — infection, non-adherence, myocardial infarction, pregnancy — and monitor for cerebral oedema in younger patients.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Two acidoses appear in sequence here: an organic high anion gap acidosis from ketoacid production, then an iatrogenic hyperchloraemic acidosis from resuscitation with saline. Only anion gap and chloride tracking reveals the switch; following pH or bicarbonate alone suggests treatment failure and risks unnecessary bicarbonate or insulin escalation. Ketone measurement, not glucose, defines resolution." },
        { title: "Management and monitoring", content: "Use fixed-rate weight-based insulin, balanced crystalloid, early and generous potassium replacement, hourly ketone and glucose measurement, and regular electrolyte and gas review. Add glucose-containing fluid to permit continued insulin. Watch for hypokalaemia, hypoglycaemia, hypophosphataemia, fluid overload and, especially in adolescents, cerebral oedema. Address the precipitant and involve the diabetes team before discharge." },
        { title: "Exam pitfall", content: "Do not attribute persistent acidosis to ongoing ketosis without recalculating the anion gap, and do not reach for bicarbonate. Show the compensation calculation and name hyperchloraemia explicitly." },
      ],
      takeHome: "Recalculate the anion gap: persistent acidosis after ketone clearance is usually saline-induced hyperchloraemia, treated by changing fluid, not giving bicarbonate.",
      sourceLinks: [s.acidBase, s.stewart],
    },
    {
      id: "icu-copd-mixed",
      title: "Confusing gas in acute-on-chronic respiratory failure",
      category: "Acid–base",
      difficulty: "Advanced",
      summary: "Chronic compensation, acute deterioration and the limits of oxygen-driven diagnosis.",
      topicIds: ["acid-base", "abg-analysis", "bronchospastic-failure", "mechanical-ventilation", "respiratory-disease"],
      patient: "A patient with severe COPD on long-term oxygen presents drowsy after three days of increasing breathlessness. Gas on 60% oxygen: pH 7.22, PaCO₂ 9.8 kPa, PaO₂ 9.0 kPa, bicarbonate 32 mmol/L, lactate 1.2 mmol/L.",
      presentation: "The referring team says the gas is 'normal for him'.",
      stages: [
        {
          title: "Interpret the gas",
          prompt: "Is this chronic or acute?",
          answer: [
            "Bicarbonate of 32 mmol/L indicates established renal compensation for chronic hypercapnia, which takes days.",
            "The pH of 7.22 is far too low for fully compensated chronic retention, so there is an acute rise in PaCO₂ on top of a chronic state.",
            "Uncontrolled high-concentration oxygen has probably worsened hypercapnia by increasing dead space through reversal of hypoxic pulmonary vasoconstriction, the Haldane effect and reduced ventilatory drive.",
          ],
        },
        {
          title: "Treat immediately",
          prompt: "What do you do first?",
          answer: [
            "Titrate oxygen to a target saturation of 88–92% using a controlled delivery device, and repeat the gas within 30–60 minutes.",
            "Give bronchodilators, corticosteroid, antibiotics if infection is suspected, and treat any coexisting heart failure.",
            "Start non-invasive ventilation for persistent respiratory acidosis, with a documented escalation plan.",
          ],
        },
        {
          title: "Plan escalation",
          prompt: "When would you intubate, and what ventilator settings?",
          answer: [
            "Intubate for failure of non-invasive ventilation, exhaustion, reduced consciousness, inability to protect the airway or haemodynamic instability, taking prior function and patient wishes into account.",
            "Set a long expiratory time with low rate, tidal volume 6–8 mL/kg predicted body weight, and permissive hypercapnia targeting pH rather than normal PaCO₂.",
            "Monitor intrinsic PEEP with an expiratory hold and watch for barotrauma and haemodynamic compromise from hyperinflation.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Chronic hypercapnia with renal bicarbonate retention shifts the baseline, so pH — not PaCO₂ — indicates acuity. A patient in whom pH is markedly reduced with a raised bicarbonate has an acute-on-chronic picture demanding intervention. Excess oxygen contributes through several mechanisms, of which increased physiological dead space is the dominant one, so controlled oxygen therapy is treatment, not restraint." },
        { title: "Management and monitoring", content: "Controlled oxygen, bronchodilation, steroid, treatment of infection and early non-invasive ventilation form the bundle. Reassess gases serially, monitor conscious level and work of breathing, and agree ceilings of treatment early with the patient and family. If invasive ventilation is needed, prioritise expiratory time, accept hypercapnia, avoid dynamic hyperinflation and check intrinsic PEEP." },
        { title: "Exam pitfall", content: "Do not accept 'this is his normal gas' when pH is low, and do not remove oxygen entirely. Quote the 88–92% target and the pH-based interpretation of chronicity." },
      ],
      takeHome: "Judge acuity by pH, not PaCO₂: acute-on-chronic hypercapnia needs controlled oxygen at 88–92% and early non-invasive ventilation.",
      sourceLinks: [s.copd, s.acidBase],
    },
    {
      id: "icu-ards-proning",
      title: "Refractory hypoxaemia in ARDS",
      category: "Ventilation",
      difficulty: "Advanced",
      summary: "Berlin criteria, lung-protective ventilation and the evidence for prone positioning.",
      topicIds: ["ards", "mechanical-ventilation", "ventilation-perfusion", "lung-mechanics", "sepsis"],
      patient: "A patient ventilated for pneumonia has a PaO₂/FiO₂ ratio of 12 kPa on PEEP 12 cmH₂O, bilateral infiltrates and no evidence of cardiac failure.",
      presentation: "Tidal volume is 9 mL/kg predicted body weight with plateau pressure 32 cmH₂O and driving pressure 20 cmH₂O.",
      stages: [
        {
          title: "Make the diagnosis",
          prompt: "Does this meet ARDS criteria?",
          answer: [
            "Yes: acute onset within one week, bilateral infiltrates not fully explained by effusion or collapse, no primary cardiogenic cause, and hypoxaemia on at least 5 cmH₂O PEEP.",
            "A PaO₂/FiO₂ ratio of 12 kPa (roughly 90 mmHg over FiO₂ 1.0 equivalents) falls in the moderate-to-severe range.",
            "Severity is graded by this ratio and guides therapies such as proning and neuromuscular blockade.",
          ],
        },
        {
          title: "Correct the ventilation",
          prompt: "What immediate changes are needed?",
          answer: [
            "Reduce tidal volume to 6 mL/kg predicted body weight, keep plateau pressure below 30 cmH₂O and driving pressure below about 15 cmH₂O.",
            "Titrate PEEP to oxygenation and compliance, accept permissive hypercapnia while pH is tolerable, and use conservative fluid management once shock has resolved.",
            "Optimise sedation and consider neuromuscular blockade for severe dyssynchrony.",
          ],
        },
        {
          title: "Escalate",
          prompt: "What next if hypoxaemia persists?",
          answer: [
            "Prone for at least 16 hours per day when the PaO₂/FiO₂ ratio remains below about 20 kPa: PROSEVA showed a substantial mortality reduction in severe ARDS.",
            "Treat the cause with source control and appropriate antimicrobials, and exclude a superimposed pneumothorax or effusion.",
            "Refer early for extracorporeal support if hypoxaemia or hypercapnic acidosis is refractory despite optimal ventilation and proning.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "ARDS is a heterogeneous, inflammatory lung injury in which the aerated compartment is small; delivering normal tidal volumes to a 'baby lung' produces high strain, ventilator-induced injury and biotrauma. Driving pressure captures tidal strain on the aerated lung and correlates with mortality. Proning improves outcome by making transpulmonary pressure and ventilation more homogeneous, recruiting dorsal lung and improving ventilation–perfusion matching." },
        { title: "Management and monitoring", content: "Deliver the ARDSNet strategy consistently: 6 mL/kg predicted body weight, plateau under 30 cmH₂O, individualised PEEP, permissive hypercapnia and conservative fluids. Monitor plateau and driving pressure with inspiratory holds, follow gases and compliance trends, and prone with a trained team and a checklist for line, tube and pressure-area safety. Escalate to extracorporeal membrane oxygenation early rather than after prolonged injurious ventilation." },
        { title: "Exam pitfall", content: "Do not use actual body weight for tidal volume, and do not chase a normal PaCO₂. State the Berlin criteria and quote PROSEVA's 16-hour minimum." },
      ],
      takeHome: "ARDS management is protective ventilation by predicted body weight plus early prolonged proning in severe disease, not higher volumes or normal CO₂.",
      sourceLinks: [s.ards, s.ardsnet, s.proseva],
    },
    {
      id: "icu-asthma-autopeep",
      title: "Hypotension after intubating life-threatening asthma",
      category: "Ventilation",
      difficulty: "Advanced",
      summary: "Dynamic hyperinflation, intrinsic PEEP and the ventilator settings that reverse it.",
      topicIds: ["bronchospastic-failure", "mechanical-ventilation", "lung-mechanics", "shock-states", "inotropes-vasopressors"],
      patient: "A patient with life-threatening asthma is intubated after failing to respond to nebulisers and magnesium.",
      presentation: "Minutes later the pressure falls to 70/40 mmHg with rising peak pressures, a rate of 22 breaths per minute, tidal volume 8 mL/kg and no audible wheeze.",
      stages: [
        {
          title: "Generate a differential",
          prompt: "What are the causes and how do you distinguish them?",
          answer: [
            "Dynamic hyperinflation with intrinsic PEEP is commonest: incomplete exhalation raises intrathoracic pressure and impedes venous return.",
            "Tension pneumothorax must be excluded urgently by examination and ultrasound.",
            "Also consider induction drug vasodilation, hypovolaemia, sedation-related sympatholysis and anaphylaxis as a precipitant.",
          ],
        },
        {
          title: "Confirm and relieve hyperinflation",
          prompt: "What do you do at the bedside?",
          answer: [
            "Disconnect the circuit briefly and allow prolonged exhalation, watching for haemodynamic improvement — a diagnostic and therapeutic manoeuvre.",
            "Measure intrinsic PEEP with an expiratory hold and inspect the expiratory flow waveform for failure to return to baseline.",
            "Give fluid and vasopressor while reducing the ventilatory load.",
          ],
        },
        {
          title: "Set the ventilator",
          prompt: "What settings and drugs follow?",
          answer: [
            "Low rate (about 8–12 breaths per minute), tidal volume 6 mL/kg predicted body weight, high inspiratory flow to maximise expiratory time, and permissive hypercapnia targeting pH rather than PaCO₂.",
            "Continue inhaled beta-2 agonist and ipratropium through the circuit, systemic corticosteroid and magnesium; consider intravenous salbutamol, aminophylline or ketamine as adjuncts.",
            "Use deep sedation with or without neuromuscular blockade to abolish dyssynchrony, and monitor for barotrauma and myopathy.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Severe expiratory flow limitation means each breath begins before the previous one is complete, so alveolar volume and pressure accumulate. The resulting intrinsic PEEP raises right atrial pressure, reduces venous return and can mimic tamponade or tension pneumothorax; it also increases the trigger threshold, producing dyssynchrony. A silent chest indicates minimal airflow, not improvement." },
        { title: "Management and monitoring", content: "Treat hyperinflation by giving time to exhale: reduce rate and minute ventilation, shorten inspiratory time, and tolerate hypercapnia. Confirm with an expiratory hold and flow-waveform inspection, and exclude pneumothorax with ultrasound or chest radiograph. Continue maximal bronchodilation and steroid, provide adequate sedation, and monitor pH, potassium and lactate — the latter two are commonly deranged by high-dose beta-2 agonists." },
        { title: "Exam pitfall", content: "Do not increase the respiratory rate to correct hypercapnia in acute severe asthma, and do not interpret a silent chest as resolution. Name the disconnection test and the expiratory hold measurement." },
      ],
      takeHome: "Hypotension after intubating asthma is usually dynamic hyperinflation: disconnect, slow the rate, allow long expiration and accept hypercapnia.",
      sourceLinks: [s.asthma, s.copd],
    },
    {
      id: "icu-neutropenic-sepsis",
      title: "Neutropenic sepsis after chemotherapy",
      category: "Infection & immunity",
      difficulty: "Intermediate",
      summary: "Innate immune failure, empirical broad-spectrum therapy and the Sepsis-3 framework.",
      topicIds: ["sepsis", "immunology-intensivists", "antimicrobials", "haematology-immunity", "shock-states"],
      patient: "Ten days after chemotherapy a patient presents with temperature 38.6 °C, heart rate 124 beats per minute, blood pressure 88/50 mmHg, neutrophils 0.2 × 10⁹/L and lactate 3.4 mmol/L.",
      presentation: "There is no localising sign, and a tunnelled central line is in situ.",
      stages: [
        {
          title: "Define the problem",
          prompt: "How do you classify this presentation?",
          answer: [
            "Sepsis under Sepsis-3: suspected infection with life-threatening organ dysfunction, indicated by hypotension and raised lactate.",
            "Neutropenia means the innate cellular response is absent, so classical inflammatory signs and pus formation may be minimal.",
            "Rapid deterioration is expected, and gram-negative bacteraemia carries particular risk.",
          ],
        },
        {
          title: "Act within the first hour",
          prompt: "What do you do immediately?",
          answer: [
            "Take blood cultures including from each line lumen, then give empirical broad-spectrum antipseudomonal beta-lactam without waiting for results.",
            "Give balanced crystalloid for hypoperfusion, measure lactate serially, and start vasopressor if hypotension persists after initial resuscitation.",
            "Escalate to critical care early, and look actively for line, chest, perianal, oral and skin sources.",
          ],
        },
        {
          title: "Continue and refine",
          prompt: "What happens over the next 48 hours?",
          answer: [
            "Review cultures and de-escalate or broaden accordingly, adding antifungal cover for persistent fever with prolonged neutropenia and considering resistant organisms by local ecology.",
            "Consider line removal for tunnel infection, persistent bacteraemia or specific organisms, and discuss growth factor support with haematology.",
            "Reassess daily for the need for imaging, source control and antimicrobial stewardship.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Neutrophils provide phagocytosis, oxidative killing and pus formation; without them, infection progresses with few local signs and the systemic response may be the only clue. Innate recognition through pattern-recognition receptors still triggers cytokine release, so fever remains a critical warning sign that mandates immediate empirical therapy rather than observation." },
        { title: "Management and monitoring", content: "Follow the sepsis bundle: cultures, antimicrobials within one hour, lactate measurement, fluid resuscitation for hypoperfusion and vasopressor to a mean arterial pressure of about 65 mmHg. Monitor for progressive organ failure with serial lactate, urine output, gases and coagulation. Coordinate with haematology and microbiology on antimicrobial choice, line management, antifungal and antiviral cover, and consider immunoglobulin or growth factor only on specialist advice." },
        { title: "Exam pitfall", content: "Do not wait for cultures or a localising source before giving antibiotics, and do not be reassured by the absence of inflammation. State the one-hour target and the antipseudomonal requirement." },
      ],
      takeHome: "In neutropenia, fever is an emergency: culture, give antipseudomonal cover within the hour, resuscitate, and hunt the line and mucosal sources.",
      sourceLinks: [s.sepsis3, s.ssc, s.immunology],
    },
    {
      id: "icu-asplenic-infection",
      title: "Fulminant sepsis in an asplenic patient",
      category: "Infection & immunity",
      difficulty: "Advanced",
      summary: "Loss of splenic immune function, encapsulated organisms and complement-dependent defence.",
      topicIds: ["immunology-intensivists", "sepsis", "haematology-immunity", "antimicrobials", "shock-states"],
      patient: "A patient who had a splenectomy after trauma years ago presents with a few hours of fever, vomiting and a purpuric rash. Blood pressure is 75/40 mmHg with lactate 6 mmol/L.",
      presentation: "Coagulation is deranged and the platelet count is falling.",
      stages: [
        {
          title: "Explain the immunology",
          prompt: "Why is this patient so vulnerable?",
          answer: [
            "The spleen filters encapsulated organisms poorly opsonised elsewhere, and hosts marginal-zone B cells that generate T-independent IgM against polysaccharide capsules.",
            "Loss of splenic macrophages and reduced IgM impair complement-mediated opsonisation, so Streptococcus pneumoniae, Haemophilus influenzae type b and Neisseria meningitidis can multiply unchecked.",
            "The result is overwhelming post-splenectomy infection, which can progress to purpura fulminans and death within hours.",
          ],
        },
        {
          title: "Resuscitate and treat",
          prompt: "What are your immediate priorities?",
          answer: [
            "Give an immediate third-generation cephalosporin such as ceftriaxone after taking cultures, without waiting for investigations.",
            "Resuscitate with balanced crystalloid and vasopressor, correct coagulopathy and involve critical care and microbiology urgently.",
            "Isolate and give meningococcal prophylaxis to close contacts if meningococcal disease is confirmed or strongly suspected.",
          ],
        },
        {
          title: "Prevent recurrence",
          prompt: "What long-term measures should have been in place?",
          answer: [
            "Vaccination against pneumococcus, Haemophilus influenzae type b, meningococcal serogroups and annual influenza, with documented boosters.",
            "Lifelong or at least risk-period antibiotic prophylaxis, usually penicillin, plus a rescue supply and clear written advice.",
            "A patient-held alert card, education about urgent presentation with fever, and travel and animal-bite advice.",
          ],
        },
      ],
      detailedAnswer: [
        { title: "Clinical reasoning", content: "Splenic function is central to defence against encapsulated bacteria: capsules resist phagocytosis unless opsonised by antibody and complement, and the spleen provides both the antibody-producing marginal-zone B cells and the filtering macrophage population. The classical and alternative complement pathways then permit opsonophagocytosis and membrane attack complex formation; asplenia removes the essential first step, which is why disease is fulminant rather than gradual." },
        { title: "Management and monitoring", content: "Time to antibiotic is the dominant determinant of survival. Give ceftriaxone immediately, resuscitate, and support organ failure in critical care with attention to disseminated intravascular coagulation, adrenal haemorrhage and limb ischaemia from purpura fulminans. Long-term prevention combines vaccination, prophylactic antibiotics, an alert card and patient education; check vaccination status whenever an asplenic patient is encountered for any reason." },
        { title: "Exam pitfall", content: "Do not delay antibiotics for lumbar puncture or imaging, and do not describe complement in vague terms — name the opsonisation and membrane attack functions and the encapsulated organisms." },
      ],
      takeHome: "Asplenia removes antibody- and complement-dependent defence against encapsulated bacteria: give ceftriaxone immediately and ensure lifelong vaccination and prophylaxis.",
      sourceLinks: [s.immunology, s.ssc],
    },
  ],
};
