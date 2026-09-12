export interface DrugMechanism {
  /** Must match the `drug` field in icuDrugDoses.ts so the two pages cross-reference. */
  drug: string;
  slug: string;
  drugClass: string;
  /** Receptor / channel / enzyme target and the resulting physiological effect. */
  pharmacodynamics: string;
  /** Absorption, distribution, metabolism, elimination and organ-failure handling. */
  metabolism: string;
  /** Clinically important adverse effects, toxicity and monitoring. */
  adverseEffects: string;
  /** Related topic ids for further reading (route segments). */
  topicIds?: string[];
}

export interface DrugMechanismGroup {
  /** Matches the group id used in icuDrugDoses.ts. */
  id: string;
  title: string;
  blurb: string;
  drugs: DrugMechanism[];
}

/**
 * Pharmacodynamics, metabolism and adverse effects for the adult ICU formulary
 * mirrored in icuDrugDoses.ts. Written for FFICM / EDIC / FRCA Final revision —
 * always check doses against the BNF and local critical care guidelines.
 */
export const icuDrugMechanismGroups: DrugMechanismGroup[] = [
  {
    id: "sedation-analgesia",
    title: "Sedation, analgesia and delirium",
    blurb:
      "GABAergic hypnotics, opioids, α₂ agonists and antipsychotics — the drugs whose pharmacokinetics determine how quickly a patient can be woken and extubated.",
    drugs: [
      {
        drug: "Propofol 1–2%",
        slug: "propofol",
        drugClass: "Alkylphenol IV hypnotic (2,6-diisopropylphenol) in a lipid emulsion",
        pharmacodynamics:
          "Positive allosteric modulator at the β-subunit of the GABA_A receptor, increasing chloride channel opening duration and producing dose-dependent hypnosis, amnesia and anticonvulsant activity; also inhibits NMDA and voltage-gated sodium channels. Reduces CMRO₂, cerebral blood flow and ICP while preserving flow–metabolism coupling, and is antiemetic and antipruritic. Causes arterial and venous vasodilatation with direct myocardial depression and blunting of the baroreceptor reflex, so MAP falls; it does not obtund the sympathetic response to laryngoscopy as reliably as opioids.",
        metabolism:
          "Highly lipophilic, ~98% protein bound, Vd 4 L/kg with rapid redistribution (t½α 2–4 min) giving a short duration after a bolus. Extensive hepatic glucuronidation and hydroxylation by CYP2B6/2C9 plus significant extrahepatic (renal, pulmonary) clearance — total clearance exceeds hepatic blood flow. Inactive glucuronides are renally excreted. Context-sensitive half-time lengthens with prolonged infusion but remains shorter than midazolam; clearance is well preserved in renal and moderate hepatic impairment, though the elderly and shocked need substantially lower rates.",
        adverseEffects:
          "Hypotension and bradycardia (especially with concurrent β-blockade or hypovolaemia); apnoea; pain on injection; involuntary movements; green urine; hypertriglyceridaemia and a 1.1 kcal/mL lipid calorie load; rare anaphylaxis and pancreatitis. Propofol-related infusion syndrome (PRIS) — refractory bradyarrhythmia, lactic acidosis, rhabdomyolysis, hyperkalaemia, hepatomegaly, cardiac failure and acute kidney injury — is associated with doses >4 mg/kg/h beyond 48 h, catecholamine or steroid co-administration, low carbohydrate intake and young age. Monitor lactate, CK, triglycerides and daily dose; the egg-lecithin/soya emulsion supports bacterial growth so lines and syringes are changed 12-hourly.",
        topicIds: ["intravenous-anaesthetics", "icu-sedation-delirium"],
      },
      {
        drug: "Fentanyl",
        slug: "fentanyl",
        drugClass: "Synthetic phenylpiperidine opioid, potent μ agonist (~100× morphine)",
        pharmacodynamics:
          "Full agonist at μ (MOP) receptors — G_i-coupled, reducing cAMP, closing voltage-gated calcium channels presynaptically and opening potassium channels postsynaptically, hyperpolarising neurons in the dorsal horn, periaqueductal grey and rostral ventromedial medulla. Produces analgesia, cough suppression, ventilator tolerance and dose-dependent respiratory depression (reduced hypercapnic drive, right-shifted CO₂ response curve). Haemodynamically stable — minimal histamine release — with bradycardia from central vagal stimulation.",
        metabolism:
          "Very lipophilic (octanol:water ~800), rapid CNS penetration with peak effect at 3–5 min. Vd ~4 L/kg, 80–85% protein bound (α₁-acid glycoprotein). Hepatic N-dealkylation by CYP3A4 to inactive norfentanyl; <10% excreted unchanged. Elimination half-life 3–4 h but the context-sensitive half-time lengthens dramatically with prolonged infusion because of saturation of peripheral fat compartments. No active metabolites, so it is preferred to morphine in renal failure; clearance falls with hepatic dysfunction, low cardiac output and CYP3A4 inhibitors (e.g. fluconazole, clarithromycin).",
        adverseEffects:
          "Respiratory depression and apnoea; sedation; chest-wall/glottic rigidity with rapid high-dose boluses; bradycardia; gastroparesis, ileus and constipation; urinary retention; miosis; nausea; tolerance and opioid-induced hyperalgesia; iatrogenic withdrawal after >5–7 days requiring a structured wean; delirium risk when used as a substitute for sedation. Accumulation in obesity and prolonged infusions delays weaning; naloxone reverses but risks withdrawal, hypertension and pulmonary oedema.",
        topicIds: ["opioids", "icu-sedation-delirium"],
      },
      {
        drug: "Morphine",
        slug: "morphine",
        drugClass: "Naturally occurring phenanthrene opioid, μ agonist",
        pharmacodynamics:
          "μ (and weaker κ/δ) receptor agonism with the same G_i-coupled spinal and supraspinal mechanisms as fentanyl, producing analgesia, euphoria, sedation, respiratory depression, cough suppression and relief of dyspnoea in end-of-life care. Being relatively hydrophilic it has slow CNS entry (peak effect 15–20 min) and a longer duration. Histamine release causes vasodilatation, flushing, pruritus and occasionally bronchospasm; venodilatation reduces preload — historically useful in acute pulmonary oedema.",
        metabolism:
          "Low lipid solubility, only 20–35% protein bound, Vd 3–4 L/kg. Extensive first-pass metabolism (oral bioavailability ~30%). Hepatic glucuronidation by UGT2B7 to morphine-3-glucuronide (~70%, inactive/neuroexcitatory) and morphine-6-glucuronide (~10%, a more potent μ agonist than morphine itself), both renally cleared. Elimination half-life 2–3 h; M6G accumulates in renal impairment causing delayed, profound sedation and respiratory depression — switch to fentanyl or alfentanil when eGFR falls.",
        adverseEffects:
          "Respiratory depression, sedation, hypotension (histamine-mediated), nausea and vomiting, pruritus, ileus and constipation, urinary retention, biliary spasm, miosis, myoclonus with M3G accumulation, tolerance, dependence and withdrawal. Caution in asthma (histamine), hepatic failure and renal failure. Neonates and the elderly are markedly more sensitive.",
        topicIds: ["opioids", "end-of-life-care"],
      },
      {
        drug: "Alfentanil",
        slug: "alfentanil",
        drugClass: "Short-acting phenylpiperidine opioid, μ agonist (~25× morphine)",
        pharmacodynamics:
          "μ receptor agonist with the fastest onset of the fentanyl family (peak effect 60–90 s) because a low pKa (6.5) leaves ~90% un-ionised at pH 7.4 despite lower lipid solubility, giving a very high diffusible fraction. Excellent for obtunding the pressor response to laryngoscopy and for short painful procedures; haemodynamically stable with vagally mediated bradycardia.",
        metabolism:
          "Small Vd (0.4–1 L/kg) and high protein binding (~90%) give a short elimination half-life of 90–110 min and a flat context-sensitive half-time, making it the opioid of choice for infusions in renal failure. Hepatic CYP3A4 metabolism to inactive noralfentanil and N-phenylpropionamide; negligible renal excretion of active drug. Clearance is reduced in cirrhosis and by CYP3A4 inhibitors; the un-ionised fraction rises in acidosis, increasing effect.",
        adverseEffects:
          "Respiratory depression, apnoea and chest-wall rigidity (more common than with fentanyl at equipotent boluses), bradycardia, hypotension in the hypovolaemic, nausea, gastroparesis, tolerance and withdrawal. Prolonged sedation is uncommon but accumulation occurs in severe liver disease.",
        topicIds: ["opioids", "icu-sedation-delirium"],
      },
      {
        drug: "Midazolam",
        slug: "midazolam",
        drugClass: "Imidazobenzodiazepine",
        pharmacodynamics:
          "Binds the benzodiazepine site between α and γ subunits of the GABA_A receptor, increasing the frequency of chloride channel opening — anxiolysis, amnesia (marked anterograde), hypnosis, anticonvulsant and central muscle relaxant effects. Ceiling effect on respiratory depression when given alone, but profound synergy with opioids. Mild vasodilatation and reduced sympathetic tone; useful in status epilepticus and in the haemodynamically unstable where propofol is not tolerated.",
        metabolism:
          "Water-soluble at acid pH in the ampoule; the ring closes at physiological pH making it lipid soluble, hence rapid CNS entry (peak 2–3 min). 96% protein bound, Vd 1–1.5 L/kg. Hepatic CYP3A4 hydroxylation to 1-hydroxymidazolam, which is conjugated to 1-hydroxymidazolam glucuronide — an active metabolite that accumulates in renal failure. Elimination half-life 2–4 h in health but severely prolonged in critical illness, obesity, hepatic dysfunction, the elderly and with CYP3A4 inhibitors, so the context-sensitive half-time after days of infusion may be many hours.",
        adverseEffects:
          "Prolonged over-sedation and delayed extubation from parent drug and active metabolite accumulation; a strong independent association with ICU delirium (PADIS recommends propofol or dexmedetomidine in preference); respiratory depression and apnoea with opioids; hypotension in the shocked; paradoxical agitation (elderly, children); tolerance within days; iatrogenic withdrawal syndrome with agitation, tremor, sweating and seizures after abrupt cessation. Flumazenil reverses but can precipitate seizures in chronic use.",
        topicIds: ["benzodiazepines", "icu-sedation-delirium"],
      },
      {
        drug: "Dexmedetomidine",
        slug: "dexmedetomidine",
        drugClass: "Highly selective α₂-adrenoceptor agonist (α₂:α₁ ≈ 1600:1)",
        pharmacodynamics:
          "Agonist at presynaptic α₂A receptors in the locus coeruleus, reducing noradrenaline release and producing 'cooperative' sedation resembling non-REM sleep, plus analgesia sparing opioids and sympatholysis via spinal and central mechanisms. No GABAergic action, hence minimal respiratory depression and less delirium than benzodiazepines. Biphasic haemodynamics: peripheral α₂B-mediated vasoconstriction with transient hypertension on loading, then bradycardia and hypotension from central sympatholysis and vagomimetic effect. Also attenuates shivering and reduces the incidence of emergence agitation.",
        metabolism:
          "Vd ~1.3–2 L/kg, 94% protein bound. Almost complete hepatic metabolism — direct N-glucuronidation and CYP2A6-mediated hydroxylation to inactive metabolites excreted in urine (95%) and faeces. Elimination half-life 2–3 h with a context-sensitive half-time of ~4 h after 12 h of infusion; clearance falls by up to 50% in hepatic impairment (reduce dose) but is unchanged in renal failure, although metabolites accumulate.",
        adverseEffects:
          "Bradycardia (occasionally requiring atropine or drug cessation, and sinus arrest has been reported), hypotension, transient hypertension during loading, dry mouth, nausea, hyperglycaemia, fever and rebound hypertension/agitation after abrupt withdrawal of prolonged infusions. It cannot produce deep sedation or tolerate neuromuscular blockade — not suitable when a RASS of −4 to −5 is required. Avoid in advanced heart block or profound bradycardia.",
        topicIds: ["icu-sedation-delirium", "autonomic-nervous-system"],
      },
      {
        drug: "Clonidine",
        slug: "clonidine",
        drugClass: "Partial α₂ agonist (α₂:α₁ ≈ 200:1) and imidazoline receptor agonist",
        pharmacodynamics:
          "Central α₂ agonism in the medulla and locus coeruleus reduces sympathetic outflow, causing sedation, anxiolysis, analgesia, reduced heart rate and blood pressure, and suppression of opioid, benzodiazepine, nicotine and alcohol withdrawal. Spinal α₂ receptors mediate analgesia used in neuraxial adjuncts; it also reduces MAC, attenuates the stress response and reduces shivering.",
        metabolism:
          "Well absorbed orally (bioavailability 75–95%), 20–40% protein bound, lipid soluble with good CNS penetration. Around 50% is hepatically metabolised (dealkylation) and 40–60% excreted unchanged in the urine, giving an elimination half-life of 8–12 h that is prolonged in renal impairment — a common cause of unexpected bradycardia and hypotension in ICU patients. Available oral, IV, transdermal and neuraxially.",
        adverseEffects:
          "Sedation, dry mouth, bradycardia, hypotension (and initial hypertension with rapid IV administration through α₁ activity), constipation, and — importantly — severe rebound hypertension, tachycardia and agitation if stopped abruptly after prolonged use. Accumulates in renal failure; caution with β-blockers, digoxin and other bradycardic agents.",
        topicIds: ["icu-sedation-delirium", "antihypertensives"],
      },
      {
        drug: "Ketamine",
        slug: "ketamine",
        drugClass: "Phencyclidine derivative; NMDA receptor antagonist (racemic or S(+) enantiomer)",
        pharmacodynamics:
          "Non-competitive antagonist at the phencyclidine site within the NMDA receptor channel, producing dissociative anaesthesia with profound analgesia and amnesia; additional actions at opioid, monoaminergic, muscarinic (antagonist) and voltage-gated sodium channels. Central sympathetic stimulation with inhibition of noradrenaline reuptake raises heart rate, blood pressure and cardiac output — although direct myocardial depression is unmasked in catecholamine-depleted shock. Bronchodilates, preserves respiratory drive and airway reflexes, and reduces opioid tolerance and hyperalgesia; useful for procedural sedation, severe asthma, and analgesia in the opioid-tolerant. Cerebral effects are pressure-neutral when ventilation is controlled.",
        metabolism:
          "Lipid soluble, only 25% protein bound, Vd ~3 L/kg with rapid onset (30–60 s IV) and redistribution-limited duration of 10–15 min. Hepatic CYP3A4/2B6 N-demethylation to norketamine (approximately one-third potency, contributing to prolonged analgesia), then hydroxylation and glucuronidation with renal excretion. Elimination half-life 2–3 h; oral bioavailability ~20% due to extensive first pass, and clearance falls in hepatic disease.",
        adverseEffects:
          "Emergence phenomena — vivid dreams, hallucinations, delirium (attenuated by benzodiazepines and lower doses); hypersalivation; nystagmus and diplopia; tachycardia, hypertension and increased myocardial oxygen demand (avoid in severe ischaemic heart disease and uncontrolled hypertension); raised intraocular pressure; nausea and vomiting; increased skeletal muscle tone. Long-term or repeated use causes ulcerative cystitis and cholangiopathy; tolerance develops rapidly. Contraindicated in phaeochromocytoma.",
        topicIds: ["intravenous-anaesthetics", "icu-sedation-delirium"],
      },
      {
        drug: "Haloperidol",
        slug: "haloperidol",
        drugClass: "Butyrophenone typical antipsychotic",
        pharmacodynamics:
          "High-affinity dopamine D₂ receptor antagonist in mesolimbic and mesocortical pathways, reducing positive psychotic symptoms and agitation; also blocks D₂ receptors in the chemoreceptor trigger zone (antiemetic), the nigrostriatal pathway (extrapyramidal effects) and the tuberoinfundibular pathway (hyperprolactinaemia). Weak α₁ antagonism causes mild hypotension. It treats the symptoms of hyperactive delirium but does not shorten delirium duration or reduce mortality (MIND-USA, Hope-ICU), so non-pharmacological prevention comes first.",
        metabolism:
          "90% protein bound, lipid soluble, Vd ~20 L/kg. Extensive hepatic metabolism by CYP3A4 and CYP2D6 with glucuronidation; the reduced metabolite is partly active and can be back-converted. Long elimination half-life of 14–36 h (longer for the decanoate depot), so accumulation occurs with repeated dosing; dose reduction is needed in hepatic impairment.",
        adverseEffects:
          "QTc prolongation and torsade de pointes (ECG and electrolyte monitoring mandatory, especially IV); extrapyramidal effects — acute dystonia, akathisia, parkinsonism and, with chronic use, tardive dyskinesia; neuroleptic malignant syndrome (hyperthermia, rigidity, autonomic instability, raised CK); lowered seizure threshold; hypotension; hyperprolactinaemia; increased mortality in elderly patients with dementia. Avoid in Parkinson's disease and Lewy body dementia (use quetiapine); avoid combining with other QT-prolonging drugs.",
        topicIds: ["icu-sedation-delirium"],
      },
    ],
  },
  {
    id: "neuromuscular-blockade",
    title: "Neuromuscular blockade",
    blurb:
      "Depolarising and non-depolarising blockers — chosen by organ function, speed of onset and how they are eliminated.",
    drugs: [
      {
        drug: "Rocuronium",
        slug: "rocuronium",
        drugClass: "Aminosteroid non-depolarising neuromuscular blocker",
        pharmacodynamics:
          "Competitive antagonist at the α subunits of the postjunctional nicotinic acetylcholine receptor, preventing depolarisation of the motor end-plate; a fade pattern on train-of-four reflects additional prejunctional effects. Onset is the fastest of the non-depolarisers (60–90 s at 1 mg/kg) because low potency means more molecules diffuse to the junction. No histamine release and minimal cardiovascular effect (mild vagolytic tachycardia at high dose). Duration 30–40 min at intubating dose, prolonged in the elderly and with volatile agents, hypothermia, hypermagnesaemia, acidosis and aminoglycosides.",
        metabolism:
          "Water soluble, Vd ~0.25 L/kg, ~30% protein bound. Largely unchanged hepatic uptake and biliary excretion (~70%), with 10–30% renal elimination and minor metabolism to 17-desacetylrocuronium (weakly active). Elimination half-life 1–2 h; accumulates in hepatic dysfunction and, to a lesser degree, renal failure. Fully and rapidly reversed by sugammadex (2 mg/kg at reappearance of T2, 4 mg/kg at post-tetanic count 1–2, 16 mg/kg for immediate reversal) which encapsulates the molecule in plasma.",
        adverseEffects:
          "Awareness if given without adequate sedation; prolonged block and residual weakness (always monitor with a peripheral nerve stimulator and confirm TOF ratio >0.9 before extubation); anaphylaxis — rocuronium and suxamethonium are the commonest culprits in perioperative anaphylaxis; critical-illness-associated ICU-acquired weakness with prolonged infusion; corneal abrasion and pressure injury from loss of protective movement; masking of seizures and of pain/awareness. Contraindicated as the sole agent in the unsedated patient.",
        topicIds: ["neuromuscular-blockers", "neuromuscular-junction"],
      },
      {
        drug: "Atracurium / cisatracurium",
        slug: "atracurium-cisatracurium",
        drugClass: "Benzylisoquinolinium non-depolarising neuromuscular blockers",
        pharmacodynamics:
          "Competitive nicotinic acetylcholine receptor antagonism at the neuromuscular junction, onset 2–3 min, duration 20–35 min. Atracurium causes dose-dependent histamine release with flushing, hypotension and bronchospasm; cisatracurium (the 1R-cis 1'R-cis isomer, ~3–4× more potent) is essentially free of histamine release and cardiovascular effect, which is why it is the infusion of choice in severe ARDS and in multi-organ failure.",
        metabolism:
          "Organ-independent elimination is the key property: ~⅔ by ester hydrolysis via non-specific plasma esterases and ⅓ by spontaneous, temperature- and pH-dependent Hofmann elimination (accelerated by alkalosis and warmth, slowed by acidosis and hypothermia). Products are laudanosine and a monoquaternary acrylate; laudanosine is hepatically cleared, crosses the blood–brain barrier and is epileptogenic in animals at concentrations well above clinical exposure — far less of a concern with cisatracurium. Elimination half-life ~20 min, unchanged in renal or hepatic failure.",
        adverseEffects:
          "Atracurium: histamine-mediated hypotension, tachycardia, flushing, bronchospasm — avoid in asthma and cardiovascular instability. Both: prolonged neuromuscular blockade, ICU-acquired weakness with infusions beyond 48 h, awareness if sedation is inadequate, and the same requirement for nerve-stimulator monitoring. Not reversible by sugammadex — neostigmine (with glycopyrronium) is used, and only once spontaneous recovery has begun. Laudanosine accumulation is theoretical but relevant in prolonged high-dose atracurium infusions with hepatic failure.",
        topicIds: ["neuromuscular-blockers", "ards"],
      },
      {
        drug: "Suxamethonium",
        slug: "suxamethonium",
        drugClass: "Depolarising neuromuscular blocker (two joined acetylcholine molecules)",
        pharmacodynamics:
          "Nicotinic acetylcholine receptor agonist that produces sustained depolarisation of the motor end-plate, with initial fasciculation then flaccid paralysis (phase I block, no fade on train-of-four, potentiated by anticholinesterases). Onset 30–60 s and duration 3–8 min make it the fastest-offset agent for rapid sequence induction and for the can't-intubate scenario where return of spontaneous ventilation is desirable. Muscarinic stimulation causes bradycardia — especially with repeat doses and in children — and it raises intraocular, intragastric and intracranial pressure.",
        metabolism:
          "Rapid hydrolysis in plasma by butyrylcholinesterase (plasma/pseudocholinesterase) to succinylmonocholine then succinic acid and choline; only ~10% reaches the neuromuscular junction. No hepatic or renal elimination of the parent drug. Duration is prolonged by reduced enzyme quantity (pregnancy, liver disease, malnutrition, cardiac failure, plasmapheresis), inhibition (neostigmine, metoclopramide, ecothiopate, organophosphates, lithium) or inherited atypical butyrylcholinesterase — heterozygotes 20–30 min, homozygotes 2–4 h of paralysis requiring continued ventilation and sedation, then dibucaine-number testing and family counselling.",
        adverseEffects:
          "Hyperkalaemia — a rise of ~0.5 mmol/L normally, but life-threatening in burns (from 24–48 h to ~1 year), denervation and spinal cord injury, prolonged immobility, critical illness myopathy and neuromuscular disease because of extrajunctional receptor upregulation; malignant hyperthermia trigger; suxamethonium apnoea; myalgia; masseter spasm; bradycardia and arrhythmia; raised ICP/IOP (avoid in penetrating eye injury); anaphylaxis; myoglobinuria and rhabdomyolysis in undiagnosed myopathy. Contraindicated in these settings — rocuronium with sugammadex is the alternative.",
        topicIds: ["neuromuscular-blockers", "rapid-sequence-induction"],
      },
    ],
  },
  {
    id: "vasoactive",
    title: "Vasopressors and inotropes",
    blurb:
      "Adrenoceptor, vasopressin-receptor and phosphodiesterase pharmacology — the receptor profile predicts both the haemodynamic effect and the adverse effect.",
    drugs: [
      {
        drug: "Noradrenaline",
        slug: "noradrenaline",
        drugClass: "Endogenous catecholamine; potent α₁ with modest β₁ activity",
        pharmacodynamics:
          "α₁ agonism activates G_q → phospholipase C → IP₃/DAG → intracellular calcium release in vascular smooth muscle, causing arterial and venous constriction that raises SVR, MAP and venous return; modest β₁ agonism (G_s → cAMP → protein kinase A → increased calcium entry) maintains contractility so cardiac output usually rises or is preserved. First-line vasopressor in septic, neurogenic and most other vasodilatory shock, and increases coronary and (once MAP is restored) renal perfusion pressure. Reflex bradycardia may occur as MAP rises.",
        metabolism:
          "Given by continuous IV infusion only (inactive orally, first-pass metabolism). Very short plasma half-life of 1–2 min. Neuronal reuptake (uptake-1) terminates most of the effect; enzymatic degradation is by monoamine oxidase and catechol-O-methyltransferase to normetanephrine and vanillylmandelic acid, excreted renally. Effect is attenuated by acidosis, hypocalcaemia, corticosteroid deficiency and receptor downregulation; MAO inhibitors and tricyclics exaggerate the response.",
        adverseEffects:
          "Digital, splanchnic, renal and cutaneous ischaemia at high doses; reflex bradycardia; arrhythmia (less than adrenaline); increased myocardial oxygen demand and afterload with the risk of pulmonary oedema in the failing ventricle; hyperglycaemia; severe tissue necrosis on extravasation — treat with phentolamine or topical glyceryl trinitrate and use a central line where possible; anxiety and headache. High requirements should prompt a search for hypovolaemia, acidosis, hypocalcaemia, adrenal insufficiency, tamponade and untreated source of sepsis.",
        topicIds: ["vasoactive-agents", "sepsis"],
      },
      {
        drug: "Adrenaline",
        slug: "adrenaline",
        drugClass: "Endogenous catecholamine, non-selective α and β agonist",
        pharmacodynamics:
          "Dose-dependent receptor profile: at low dose β₁ and β₂ predominate (increased contractility, heart rate and conduction; bronchodilatation; vasodilatation in skeletal muscle so SVR may fall), while at higher doses α₁ vasoconstriction dominates and MAP rises steeply. Stabilises mast cells and reverses bronchospasm and mucosal oedema — hence first-line in anaphylaxis — and is the vasopressor of cardiac arrest, restoring coronary and cerebral perfusion pressure during CPR. Also used in cold/low-output shock and paediatric septic shock.",
        metabolism:
          "IV, IM, IO, nebulised or endotracheal; plasma half-life ~2 min. Uptake-1 and uptake-2, then MAO and COMT metabolism to metanephrine and vanillylmandelic acid, renally excreted. Effects blunted by acidosis and by β-blockade (unopposed α effect); potentiated by MAO inhibitors, tricyclics and cocaine.",
        adverseEffects:
          "Tachyarrhythmia including VF, myocardial ischaemia and stress cardiomyopathy; severe hypertension (particularly if a 1:1000 ampoule is given IV in error); lactic acidosis from β₂-mediated glycolysis (a benign but confusing rise in lactate); hyperglycaemia and hypokalaemia (β₂-mediated intracellular potassium shift); splanchnic and digital ischaemia; tremor, anxiety and headache; extravasation necrosis. Drug-error risk — always state concentration (1:1000 = 1 mg/mL IM; 1:10,000 = 100 microgram/mL IV).",
        topicIds: ["vasoactive-agents", "anaphylaxis"],
      },
      {
        drug: "Vasopressin",
        slug: "vasopressin",
        drugClass: "Endogenous nonapeptide antidiuretic hormone analogue",
        pharmacodynamics:
          "V₁ receptor agonism on vascular smooth muscle (G_q, calcium release) produces vasoconstriction independent of adrenoceptors — preserved in acidosis and catecholamine downregulation, hence its role as a catecholamine-sparing second-line agent in septic shock (VASST, VANISH). V₂ receptors in the renal collecting duct insert aquaporin-2 channels, causing water retention (the basis of its use in diabetes insipidus); V₃ receptors promote ACTH release. Constricts splanchnic vessels, reducing portal pressure in variceal bleeding, and causes relatively less pulmonary vasoconstriction than catecholamines.",
        metabolism:
          "Peptide — given IV (or intranasally/subcutaneously as desmopressin). Very short half-life of 10–20 min, degraded by hepatic and renal vasopressinases (and placental vasopressinase in pregnancy). Endogenous secretion from the posterior pituitary is depleted early in prolonged septic shock, which is part of the rationale for replacement.",
        adverseEffects:
          "Reduced cardiac output through pure vasoconstriction without inotropy (avoid as sole agent in cardiogenic shock); digital, splanchnic and mesenteric ischaemia — bowel ischaemia and skin necrosis are recognised; coronary vasoconstriction with ischaemia and bradycardia; hyponatraemia and fluid retention via V₂ receptors; hypertension; and rebound hypotension if stopped abruptly rather than weaned. Do not use for cardiac arrest routinely in current guidelines.",
        topicIds: ["vasoactive-agents", "sepsis"],
      },
      {
        drug: "Dobutamine",
        slug: "dobutamine",
        drugClass: "Synthetic catecholamine, predominantly β₁ agonist with some β₂ and weak α₁ activity",
        pharmacodynamics:
          "β₁ stimulation raises cAMP and intracellular calcium, increasing contractility (inotropy), heart rate (chronotropy) and conduction velocity; β₂-mediated vasodilatation reduces SVR and afterload, so cardiac output rises while MAP may fall. Improves ventricular–arterial coupling in cardiogenic shock, right ventricular failure and low-output states, and is used pharmacologically for stress echocardiography. Also lusitropic (improves diastolic relaxation) but at the cost of increased myocardial oxygen demand.",
        metabolism:
          "IV infusion only; half-life ~2 min. Metabolised by COMT to 3-O-methyldobutamine and conjugated, with renal excretion. Tachyphylaxis develops within 24–72 h from β-receptor downregulation. Effect is antagonised by β-blockers (consider milrinone or levosimendan instead).",
        adverseEffects:
          "Tachycardia and tachyarrhythmias (atrial fibrillation, ventricular ectopy), myocardial ischaemia from increased oxygen demand, hypotension from β₂ vasodilatation, hypokalaemia, headache, tremor, and increased intrapulmonary shunt with a fall in PaO₂. Long-term use is associated with increased mortality in chronic heart failure; avoid in hypertrophic obstructive cardiomyopathy and severe aortic stenosis, and correct hypovolaemia first.",
        topicIds: ["vasoactive-agents", "cardiac-failure"],
      },
      {
        drug: "Milrinone",
        slug: "milrinone",
        drugClass: "Phosphodiesterase-3 inhibitor (bipyridine) — 'inodilator'",
        pharmacodynamics:
          "Inhibits PDE-3, preventing cAMP breakdown in cardiac myocytes (increased calcium entry and sarcoplasmic reticulum uptake — inotropy and lusitropy) and in vascular smooth muscle (vasodilatation with reduced SVR and, notably, pulmonary vascular resistance). Because the action is downstream of the β-receptor, it works despite β-blockade or receptor downregulation, and is favoured in right ventricular failure, pulmonary hypertension and post-cardiotomy low cardiac output.",
        metabolism:
          "IV infusion; ~70% protein bound, Vd ~0.3 L/kg. Elimination half-life 2–4 h — much longer than catecholamines, so adverse effects persist after stopping. Around 80% is excreted unchanged in the urine with the remainder glucuronidated; the dose must be reduced substantially in renal impairment, where accumulation causes refractory hypotension.",
        adverseEffects:
          "Hypotension (frequently requiring concurrent noradrenaline), atrial and ventricular arrhythmia, thrombocytopenia, headache, hypokalaemia, and increased long-term mortality when used chronically in heart failure (OPTIME-CHF). Its long half-life makes it unsuitable when rapid titration is needed; avoid in severe hypovolaemia and in severe aortic or mitral stenosis.",
        topicIds: ["vasoactive-agents", "pulmonary-hypertension"],
      },
      {
        drug: "Metaraminol",
        slug: "metaraminol",
        drugClass: "Synthetic non-catecholamine sympathomimetic — direct α₁ agonist with indirect action",
        pharmacodynamics:
          "Predominantly direct α₁ agonism causing arterial and venous vasoconstriction, with an indirect component through displacement of noradrenaline from presynaptic vesicles. Raises SVR and MAP with reflex (baroreceptor-mediated) bradycardia and a possible fall in cardiac output; useful for short-term treatment of vasodilatory hypotension — for example after induction or neuraxial block — and can be given peripherally while central access is obtained.",
        metabolism:
          "Not a catechol, so it resists COMT and MAO degradation — hence a longer duration of action (20–60 min) than the catecholamines. Predominantly hepatic metabolism with renal excretion of metabolites. Because part of the effect is indirect, tachyphylaxis occurs as noradrenaline stores deplete, and the response is reduced in patients on reserpine, in chronic catecholamine depletion and in prolonged critical illness.",
        adverseEffects:
          "Reflex bradycardia, reduced cardiac output and increased afterload in the failing ventricle, hypertension, peripheral and splanchnic ischaemia, extravasation necrosis, headache and reduced uteroplacental flow. Exaggerated pressor response with MAO inhibitors and tricyclics. It masks rather than treats hypovolaemia — assess volume status.",
        topicIds: ["vasoactive-agents", "autonomic-nervous-system"],
      },
      {
        drug: "Hydrocortisone",
        slug: "hydrocortisone",
        drugClass: "Synthetic glucocorticoid with intrinsic mineralocorticoid activity (cortisol)",
        pharmacodynamics:
          "Binds cytosolic glucocorticoid receptors; the complex translocates to the nucleus altering gene transcription (genomic effect over hours) — inhibition of NF-κB and AP-1 reduces cytokine, COX-2 and adhesion molecule expression, while annexin-1 induction inhibits phospholipase A₂. Restores vascular responsiveness to catecholamines by upregulating adrenoceptors and reducing nitric oxide synthase induction, hence its use in vasopressor-dependent septic shock (APROCCHSS, ADRENAL) and in adrenal crisis, where mineralocorticoid activity also supports sodium and water retention. Rapid non-genomic membrane effects contribute within minutes in anaphylaxis and adrenal crisis.",
        metabolism:
          "IV, IM or oral (bioavailability ~95%); >90% protein bound to corticosteroid-binding globulin and albumin. Hepatic metabolism by 11β-hydroxysteroid dehydrogenase and CYP3A4 with conjugation and renal excretion; plasma half-life 1.5–2 h but biological effect lasts 8–12 h, hence 6-hourly or infusion dosing in shock. Clearance is increased by enzyme inducers (rifampicin, phenytoin) and reduced in liver failure.",
        adverseEffects:
          "Hyperglycaemia (very common — often requires insulin), sodium and water retention with hypertension and oedema, hypokalaemia and metabolic alkalosis, immunosuppression with secondary infection and impaired wound healing, ICU-acquired weakness and myopathy, gastrointestinal bleeding (with NSAIDs), psychosis and delirium, hypothalamic–pituitary–adrenal suppression with adrenal crisis if stopped abruptly after >3 weeks, and with prolonged use osteoporosis, avascular necrosis and adrenal atrophy. It suppresses the short synacthen test — take a random cortisol before the first dose if the diagnosis matters (or use dexamethasone).",
        topicIds: ["icu-endocrine-emergencies", "sepsis"],
      },
    ],
  },
  {
    id: "cardiac-rhythm",
    title: "Antiarrhythmics and cardiovascular drugs",
    blurb:
      "Channel, receptor and pump targets mapped to the Vaughan-Williams classes — with the organ-specific toxicities that follow from them.",
    drugs: [
      {
        drug: "Amiodarone",
        slug: "amiodarone",
        drugClass: "Class III antiarrhythmic (potassium channel blocker) with class I, II and IV actions",
        pharmacodynamics:
          "Blocks voltage-gated potassium channels, prolonging phase 3 repolarisation, the action potential duration and the refractory period in atrial, nodal and ventricular tissue (hence QT prolongation). Additional sodium channel blockade (class I), non-competitive α/β blockade (class II) and calcium channel blockade (class IV) slow conduction and sinus rate. Effective in atrial fibrillation, ventricular tachycardia and as the antiarrhythmic of shock-refractory VF/pulseless VT, with less negative inotropy than most alternatives.",
        metabolism:
          "Extremely lipophilic with a huge Vd (~60–70 L/kg) and 96% protein binding; oral bioavailability is erratic (~50%), and loading takes days to weeks. Hepatic CYP3A4/2C8 metabolism to desethylamiodarone, an active metabolite that accumulates in tissues; biliary/faecal excretion with negligible renal clearance. Terminal half-life 25–110 days, so adverse effects persist for months and interactions are prolonged — it inhibits CYP3A4, CYP2C9 and P-glycoprotein, raising digoxin (halve the dose), warfarin and statin concentrations.",
        adverseEffects:
          "Acute: hypotension and bradycardia with rapid IV administration (solvent-related), phlebitis (give centrally for infusions), QT prolongation and torsade, and heart block. Chronic: thyroid dysfunction — both hypo- and hyperthyroidism from its 37% iodine content (type I iodine-induced and type II destructive thyroiditis); pulmonary fibrosis and pneumonitis; hepatitis and cirrhosis; corneal microdeposits; optic neuropathy; slate-grey photosensitive skin pigmentation; peripheral neuropathy and tremor. Monitor TFTs and LFTs 6-monthly, and check for interstitial change.",
        topicIds: ["antiarrhythmics", "icu-arrhythmias"],
      },
      {
        drug: "Magnesium sulfate",
        slug: "magnesium-sulfate",
        drugClass: "Divalent cation; physiological calcium antagonist and NMDA receptor antagonist",
        pharmacodynamics:
          "Blocks calcium entry through voltage-gated channels and competes with calcium intracellularly, stabilising excitable membranes: it suppresses torsade de pointes and other arrhythmias, relaxes vascular and bronchial smooth muscle (vasodilatation, bronchodilatation), reduces acetylcholine release at the neuromuscular junction (potentiating non-depolarising blockers), and antagonises NMDA receptors giving anticonvulsant and analgesic/anti-hyperalgesic effects. It is the treatment of choice in eclampsia (prevention of seizure recurrence and fetal neuroprotection), torsade, severe asthma and hypomagnesaemic arrhythmias.",
        metabolism:
          "Given IV/IM; not metabolised. Distributes into the extracellular space, bone and cells; almost entirely eliminated unchanged by glomerular filtration, so the dose must be reduced and levels monitored in renal impairment. Only ~1% of total body magnesium is extracellular, so serum levels correlate poorly with total stores; therapeutic range in eclampsia is 2–3.5 mmol/L.",
        adverseEffects:
          "Dose-related toxicity — flushing, nausea and warmth, then loss of deep tendon reflexes (~4–5 mmol/L), respiratory depression (~5–6.5), bradycardia, heart block and hypotension, and cardiac arrest (>12 mmol/L). Prolongs neuromuscular blockade; potentiates calcium channel blockers causing profound hypotension; masks hypocalcaemia. Monitor patellar reflexes, respiratory rate and urine output; treat toxicity with 10% calcium gluconate 10 mL IV and stop the infusion.",
        topicIds: ["electrolyte-disorders", "icu-arrhythmias"],
      },
      {
        drug: "Digoxin",
        slug: "digoxin",
        drugClass: "Cardiac glycoside — Na⁺/K⁺-ATPase inhibitor",
        pharmacodynamics:
          "Inhibits the sarcolemmal Na⁺/K⁺-ATPase, raising intracellular sodium and so reducing calcium extrusion by the Na⁺/Ca²⁺ exchanger; the resulting rise in intracellular calcium increases contractility (positive inotropy) without increasing heart rate. Increased vagal tone and reduced sympathetic outflow slow AV nodal conduction and prolong its refractory period, controlling ventricular rate in atrial fibrillation — particularly useful in the hypotensive patient in whom β-blockers are unsafe, though it is less effective in high adrenergic states.",
        metabolism:
          "Oral bioavailability 60–80% (tablet), 20–30% protein bound, large Vd (~5–7 L/kg) so a loading dose is required. Little hepatic metabolism — 60–80% is excreted unchanged by the kidney (with tubular secretion via P-glycoprotein), giving a half-life of 36–48 h that lengthens to several days in renal failure. Numerous interactions: amiodarone, verapamil, quinidine, macrolides and spironolactone raise levels; therapeutic range 0.8–2 microgram/L (aim lower, 0.5–0.9, in heart failure).",
        adverseEffects:
          "Narrow therapeutic index. Toxicity is potentiated by hypokalaemia, hypomagnesaemia, hypercalcaemia, hypothyroidism, hypoxia and renal impairment: nausea, vomiting and anorexia; xanthopsia and blurred vision; confusion; and arrhythmias — ventricular ectopy and bigeminy, bidirectional VT, atrial tachycardia with block, and any bradyarrhythmia. ECG shows down-sloping ST depression with T inversion ('reverse tick'). Treat with correction of potassium and magnesium, atropine or pacing for bradycardia, and digoxin-specific antibody fragments (DigiFab) for life-threatening arrhythmia or K⁺ >5.5 mmol/L; avoid calcium.",
        topicIds: ["antiarrhythmics", "cardiac-failure"],
      },
      {
        drug: "Esmolol",
        slug: "esmolol",
        drugClass: "Ultra-short-acting cardioselective β₁ antagonist (class II antiarrhythmic)",
        pharmacodynamics:
          "Competitive β₁ blockade reduces cAMP in cardiac myocytes and nodal tissue, lowering heart rate, contractility, AV conduction and myocardial oxygen demand — used for rate control in atrial fibrillation and sinus tachycardia, for aortic dissection and thyroid storm, and to blunt the pressor response to laryngoscopy or in phaeochromocytoma after α-blockade. Cardioselectivity is relative and lost at high doses.",
        metabolism:
          "IV only; onset within 1–2 min, offset within 10–20 min. Rapidly hydrolysed by red-cell esterases (not plasma cholinesterase) to an inactive acid metabolite and methanol, with renal excretion; half-life ~9 min, so it is independent of hepatic and renal function and ideal when β-blockade may need to be withdrawn abruptly.",
        adverseEffects:
          "Hypotension (common — often rate-limiting), bradycardia and heart block, precipitation of decompensation in poor systolic function, bronchospasm in asthma/COPD at higher doses, masking of hypoglycaemia in diabetes, fatigue, and unopposed α-mediated hypertension if given before α-blockade in phaeochromocytoma or cocaine toxicity. Caution with verapamil/diltiazem (profound bradycardia and asystole) and in decompensated heart failure.",
        topicIds: ["antiarrhythmics", "beta-blockers"],
      },
      {
        drug: "Glyceryl trinitrate",
        slug: "glyceryl-trinitrate",
        drugClass: "Organic nitrate — nitric oxide donor",
        pharmacodynamics:
          "Denitrated within vascular smooth muscle (mitochondrial aldehyde dehydrogenase-2) to nitric oxide, which activates soluble guanylyl cyclase → cGMP → protein kinase G → myosin light chain dephosphorylation and relaxation. Predominantly venodilatation at low doses (reduced preload, LV wall tension and myocardial oxygen demand — hence relief of ischaemia and pulmonary oedema), with arterial and coronary dilatation at higher doses reducing afterload and relieving coronary spasm. Also relaxes oesophageal, biliary and uterine smooth muscle.",
        metabolism:
          "Extensive first-pass metabolism means it is given sublingually, transdermally or by IV infusion. Half-life 1–4 min; hepatic and vascular denitration by glutathione-dependent organic nitrate reductase to dinitrates (weakly active) and inorganic nitrite, excreted renally. Tolerance develops within 24–48 h through depletion of sulfhydryl groups, ALDH-2 desensitisation and neurohumoral activation — a nitrate-free period or dose escalation is needed; the IV preparation adsorbs to PVC giving-sets.",
        adverseEffects:
          "Headache (very common), hypotension and reflex tachycardia, flushing, dizziness, and a fall in PaO₂ from increased intrapulmonary shunt. Profound, refractory hypotension with phosphodiesterase-5 inhibitors (sildenafil, tadalafil) — an absolute contraindication. Avoid in aortic stenosis, hypertrophic obstructive cardiomyopathy, right ventricular infarction and raised ICP, and in tamponade, where preload reduction is dangerous. Methaemoglobinaemia occurs with very high doses.",
        topicIds: ["antihypertensives", "acute-coronary-syndrome"],
      },
      {
        drug: "Labetalol",
        slug: "labetalol",
        drugClass: "Combined α₁ and non-selective β antagonist (β:α ≈ 7:1 IV, 3:1 oral)",
        pharmacodynamics:
          "α₁ blockade reduces systemic vascular resistance while concurrent β blockade prevents the reflex tachycardia, so blood pressure falls with little change in cardiac output or cerebral blood flow — hence its use in hypertensive emergency, aortic dissection, pre-eclampsia and phaeochromocytoma (only ever after adequate α-blockade, because the β effect predominates), and in controlled hypotension. There is also weak β₂ partial agonism and membrane-stabilising activity.",
        metabolism:
          "Oral bioavailability ~25% due to first-pass metabolism; 50% protein bound. Hepatic glucuronidation to inactive metabolites, with <5% excreted unchanged in the urine; elimination half-life 4–6 h (longer orally), prolonged in hepatic impairment. Onset 2–5 min IV with a peak at 5–15 min — long enough that repeated boluses can stack and cause delayed hypotension.",
        adverseEffects:
          "Postural hypotension, bradycardia and heart block, bronchospasm (non-selective β blockade — avoid in asthma), fluid retention, scalp tingling, fatigue and dizziness, masked hypoglycaemia, and hepatotoxicity ranging from transaminitis to fatal hepatic necrosis. Neonatal bradycardia and hypoglycaemia after use in pregnancy. Its long duration is a disadvantage where rapid titration is needed — use esmolol or GTN instead.",
        topicIds: ["antihypertensives", "beta-blockers"],
      },
    ],
  },
];
