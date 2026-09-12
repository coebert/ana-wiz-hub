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
  {
    id: "neuro",
    title: "Neurocritical care and seizures",
    blurb:
      "Anticonvulsants, osmotherapy and calcium channel blockade — where metabolism and monitoring dominate safe use.",
    drugs: [
      {
        drug: "Lorazepam",
        slug: "lorazepam",
        drugClass: "Intermediate-acting benzodiazepine",
        pharmacodynamics:
          "GABA_A positive allosteric modulator (benzodiazepine site), increasing chloride channel opening frequency to raise the seizure threshold and terminate status epilepticus, with anxiolysis, amnesia and sedation. Longer duration of anticonvulsant effect than midazolam or diazepam because of high receptor affinity and limited redistribution out of the brain, making it first-line IV therapy for convulsive status epilepticus (0.1 mg/kg, repeated once).",
        metabolism:
          "Less lipophilic than diazepam, Vd ~1.3 L/kg, 90% protein bound. Hepatic glucuronidation only (phase II, UGT2B7) to an inactive glucuronide — no CYP involvement and no active metabolites, so it is comparatively safe in hepatic impairment and the elderly, though the glucuronide accumulates in renal failure. Elimination half-life 10–20 h; onset 2–3 min IV with clinical effect lasting 6–12 h.",
        adverseEffects:
          "Respiratory depression and apnoea (particularly with opioids or after repeated doses in status), hypotension, over-sedation with delayed neurological assessment, delirium in the elderly, paradoxical agitation, tolerance and withdrawal seizures. Propylene glycol in the IV preparation can cause lactic acidosis, hyperosmolarity and renal dysfunction with high-dose prolonged infusions. Flumazenil reversal risks seizures.",
        topicIds: ["benzodiazepines", "neurointensive-care"],
      },
      {
        drug: "Levetiracetam",
        slug: "levetiracetam",
        drugClass: "Pyrrolidone anticonvulsant (SV2A ligand)",
        pharmacodynamics:
          "Binds synaptic vesicle protein 2A, modulating vesicle exocytosis and reducing presynaptic neurotransmitter release; also inhibits N-type calcium currents and negative allosteric effects on GABA/glycine current inhibition. Broad-spectrum anticonvulsant used as second-line therapy in status epilepticus (ESETT showed equivalence to phenytoin and valproate) and for seizure prophylaxis after traumatic brain injury, with the practical advantages of no enzyme induction, no need for cardiac monitoring during loading and no serum level requirement.",
        metabolism:
          "Nearly 100% oral bioavailability, <10% protein bound, small Vd (~0.6 L/kg). Two-thirds is excreted unchanged in the urine and the remainder undergoes non-hepatic enzymatic hydrolysis to an inactive carboxylic acid metabolite — so there are essentially no CYP interactions, but the dose must be reduced in renal impairment and supplemented after haemodialysis. Half-life 6–8 h (longer in renal failure).",
        adverseEffects:
          "Behavioural and psychiatric effects are the main problem — irritability, agitation, aggression, mood disturbance, psychosis and suicidality, which may be mistaken for ICU delirium; also somnolence, dizziness, headache, asthenia and thrombocytopenia or leucopenia. Rare severe cutaneous reactions including DRESS and Stevens–Johnson syndrome. Accumulation causes excess sedation in undiagnosed renal impairment.",
        topicIds: ["neurointensive-care", "anticonvulsants"],
      },
      {
        drug: "Phenytoin",
        slug: "phenytoin",
        drugClass: "Hydantoin anticonvulsant (class Ib antiarrhythmic activity)",
        pharmacodynamics:
          "Use-dependent blockade of voltage-gated sodium channels in their inactivated state, prolonging recovery and preventing high-frequency repetitive firing without impairing normal transmission — anticonvulsant in status epilepticus (20 mg/kg load) and in seizure prophylaxis. Also shortens the action potential in Purkinje tissue (used historically in digoxin-induced arrhythmia).",
        metabolism:
          "90% protein bound to albumin — free (active) fraction rises in hypoalbuminaemia, uraemia, pregnancy and with displacement by valproate or salicylates, so total levels mislead in ICU patients (correct with the Sheiner–Tozer equation or measure free phenytoin; therapeutic total range 10–20 mg/L). Hepatic CYP2C9/2C19 hydroxylation is saturable: kinetics are zero-order at therapeutic concentrations, so small dose increases cause large, unpredictable rises in level. A potent inducer of CYP3A4 and P-glycoprotein, reducing the effect of many drugs. Fosphenytoin is a water-soluble prodrug with less infusion-site toxicity.",
        adverseEffects:
          "Infusion-related: hypotension, bradycardia and arrhythmia if infused faster than 50 mg/min (propylene glycol diluent) — cardiac monitoring mandatory; 'purple glove syndrome' and severe tissue injury on extravasation (the solution is strongly alkaline, pH ~12). Dose-related: nystagmus, ataxia, dysarthria, sedation and coma. Idiosyncratic: rash, DRESS, Stevens–Johnson syndrome and toxic epidermal necrolysis (HLA-B*15:02), hepatitis, agranulocytosis and aplastic anaemia. Chronic: gingival hyperplasia, hirsutism, coarse facies, cerebellar atrophy, megaloblastic anaemia (folate), osteomalacia and teratogenicity.",
        topicIds: ["neurointensive-care", "anticonvulsants"],
      },
      {
        drug: "Hypertonic saline 2.7–5%",
        slug: "hypertonic-saline",
        drugClass: "Hyperosmolar crystalloid osmotherapy",
        pharmacodynamics:
          "Raises plasma osmolality and, because sodium has a high reflection coefficient at an intact blood–brain barrier, draws water from the cerebral interstitium and cells into the intravascular compartment, reducing brain water and ICP within minutes. Unlike mannitol it also expands intravascular volume and raises MAP, so cerebral perfusion pressure improves — an advantage in the hypovolaemic or hypotensive patient. Additional effects include improved rheology and microcirculatory flow, and immunomodulation. Also the specific treatment of symptomatic hyponatraemia (3% boluses).",
        metabolism:
          "Not metabolised: sodium and chloride distribute through the extracellular fluid and are excreted renally. The effect is monitored with serum sodium (target commonly 145–155 mmol/L) and osmolality; a functioning kidney is needed to excrete the load. Boluses of 2.7–5% may be given peripherally in most protocols, whereas concentrations above 5% are given centrally.",
        adverseEffects:
          "Hypernatraemia and hyperchloraemic metabolic acidosis; fluid overload and pulmonary oedema in cardiac or renal failure; phlebitis and (with high concentrations) tissue necrosis; hypokalaemia; coagulopathy and platelet dysfunction at high volumes; rebound intracranial hypertension when stopped abruptly; and osmotic demyelination syndrome if chronic hyponatraemia is corrected faster than 8–10 mmol/L in 24 h. Renal impairment occurs with sustained sodium >160 mmol/L.",
        topicIds: ["neurointensive-care", "traumatic-brain-injury"],
      },
      {
        drug: "Mannitol 20%",
        slug: "mannitol",
        drugClass: "Osmotic diuretic (six-carbon sugar alcohol)",
        pharmacodynamics:
          "Osmotically active and largely excluded from cells and the intact blood–brain barrier, creating an osmotic gradient that removes water from brain tissue and reduces ICP within 15–30 min for 2–6 h; there is also an early rheological effect (reduced blood viscosity and haematocrit with reflex cerebral vasoconstriction) and free-radical scavenging. In the nephron it remains in the tubular lumen, obliging water excretion — an osmotic diuresis with loss of sodium, potassium and magnesium. Transient plasma volume expansion precedes the diuresis.",
        metabolism:
          "Given IV only; minimally metabolised (<10% hepatic to glycogen). Freely filtered by the glomerulus and not reabsorbed, so elimination depends entirely on renal function — half-life 0.5–2.5 h, markedly prolonged in acute kidney injury, when accumulation causes hyperosmolar hyponatraemia. It crystallises at low temperature (warm and use a filter) and its effect is monitored with serum osmolality and the osmolar gap (stop if osmolality >320 mOsm/kg or gap >55).",
        adverseEffects:
          "Hypovolaemia and hypotension from brisk diuresis, with reduced cerebral perfusion pressure if not replaced; hypernatraemia, hypokalaemia, hypomagnesaemia; initially dilutional hyponatraemia and (in renal failure) hyperkalaemia; acute pulmonary oedema during the volume-expansion phase in cardiac failure; osmotic nephrosis and acute kidney injury; rebound raised ICP with repeated dosing or a disrupted blood–brain barrier; tissue necrosis on extravasation. Avoid in anuria, established severe AKI and hypovolaemia.",
        topicIds: ["neurointensive-care", "diuretics"],
      },
      {
        drug: "Nimodipine",
        slug: "nimodipine",
        drugClass: "Dihydropyridine calcium channel blocker with cerebral selectivity",
        pharmacodynamics:
          "Blocks L-type voltage-gated calcium channels in vascular smooth muscle, and its high lipophilicity gives preferential cerebral vascular action. In aneurysmal subarachnoid haemorrhage it improves neurological outcome and reduces delayed cerebral ischaemia — the benefit is neuroprotective rather than simply angiographic (it does not reliably reverse large-vessel vasospasm), probably through effects on the microcirculation, cortical spreading depolarisation and calcium-mediated neuronal injury. Standard therapy is 60 mg orally/NG 4-hourly for 21 days.",
        metabolism:
          "Well absorbed but subject to extensive first-pass CYP3A4 metabolism, giving an oral bioavailability of only 5–15%; >95% protein bound. Metabolised to inactive dehydronimodipine and other metabolites, excreted in bile and urine; half-life 1–2 h (biphasic terminal up to 9 h). Interactions are important — CYP3A4 inhibitors (macrolides, azoles, grapefruit juice) markedly raise concentrations and inducers (rifampicin, phenytoin, carbamazepine) abolish the effect. IV administration is used where enteral access fails; the oral solution must never be injected.",
        adverseEffects:
          "Hypotension is the dose-limiting effect and may threaten cerebral perfusion pressure — reduce to 30 mg 2-hourly rather than omitting doses, and support with vasopressors/fluid. Also headache, flushing, reflex tachycardia, peripheral oedema, nausea, ileus, deranged liver enzymes and thrombocytopenia. Potentiates other antihypertensives and, with IV β-blockers, can cause profound hypotension.",
        topicIds: ["neurointensive-care", "subarachnoid-haemorrhage"],
      },
    ],
  },
  {
    id: "coagulation",
    title: "Haemostasis and anticoagulation",
    blurb:
      "Antifibrinolytics, heparins, factor concentrates and reversal agents — pharmacology defined by the coagulation cascade step each drug touches.",
    drugs: [
      {
        drug: "Tranexamic acid",
        slug: "tranexamic-acid",
        drugClass: "Synthetic lysine analogue antifibrinolytic",
        pharmacodynamics:
          "Competitively blocks the lysine-binding (kringle) sites on plasminogen and plasmin, preventing their attachment to fibrin so fibrinolysis cannot proceed; clot is stabilised rather than newly formed. Mortality benefit in trauma (CRASH-2) and in post-partum haemorrhage (WOMAN) is time-critical — within 3 h of injury or bleeding onset — and it reduces surgical blood loss and mortality in isolated head injury given early (CRASH-3). No effect on platelet function or the coagulation factors themselves.",
        metabolism:
          "Oral bioavailability ~45%; minimal protein binding (~3%, to plasminogen), Vd ~0.4 L/kg with good tissue penetration including CSF. Barely metabolised — more than 90% is excreted unchanged in the urine by glomerular filtration, so the dose must be reduced substantially in renal impairment. Half-life 2–3 h.",
        adverseEffects:
          "Hypotension, flushing and nausea with rapid IV injection; visual disturbance and colour-vision change; seizures at high dose (glycine-receptor antagonism) especially in cardiac surgery and renal failure; and a theoretical thrombotic risk — the large trials did not show excess venous thromboembolism, but avoid in active intravascular coagulation or known DIC with thrombosis. Fatal outcomes have followed inadvertent intrathecal administration — a critical drug-error risk near neuraxial procedures.",
        topicIds: ["transfusion-coagulation", "major-haemorrhage"],
      },
      {
        drug: "Enoxaparin",
        slug: "enoxaparin",
        drugClass: "Low molecular weight heparin",
        pharmacodynamics:
          "Binds antithrombin III via its pentasaccharide sequence, accelerating inhibition of factor Xa (with an anti-Xa:anti-IIa ratio of about 3–4:1 because the shorter chains cannot bridge to thrombin). Used for venous thromboembolism prophylaxis and treatment and in acute coronary syndrome; a more predictable dose–response than unfractionated heparin means routine monitoring is unnecessary, though anti-Xa levels can be checked in renal failure, pregnancy and extremes of body weight.",
        metabolism:
          "Given subcutaneously with ~90% bioavailability; peak anti-Xa activity at 3–5 h. Partly depolymerised in the liver but predominantly cleared by the kidney, giving a half-life of 4–7 h that is significantly prolonged in renal impairment — reduce the dose when eGFR <30 mL/min or use unfractionated heparin. Absorption is unreliable in shock and marked oedema.",
        adverseEffects:
          "Bleeding — including epidural/spinal haematoma, hence strict neuraxial timing intervals (12 h after a prophylactic and 24 h after a treatment dose before a block; 4 h after catheter removal before the next dose); heparin-induced thrombocytopenia (much less common than with unfractionated heparin but still possible — monitor platelets); hyperkalaemia from aldosterone suppression; injection-site bruising; transaminitis; and osteoporosis with prolonged use. Only partially reversed by protamine (approximately 60%); consider andexanet is not indicated — use protamine and supportive measures.",
        topicIds: ["transfusion-coagulation", "venous-thromboembolism"],
      },
      {
        drug: "Unfractionated heparin",
        slug: "unfractionated-heparin",
        drugClass: "Indirect thrombin inhibitor (glycosaminoglycan mixture)",
        pharmacodynamics:
          "Binds antithrombin III and induces a conformational change that accelerates its inhibition of thrombin (IIa) and factor Xa by around 1000-fold, and additionally IXa, XIa and XIIa; long chains bridge antithrombin to thrombin, giving an anti-Xa:anti-IIa ratio of 1:1. Used where rapid onset and offset or reversibility matter — ACS, extracorporeal circuits, CRRT, and in severe renal failure. Monitored by APTT ratio (1.5–2.5) or anti-Xa, and by ACT in cardiopulmonary bypass and ECMO.",
        metabolism:
          "IV or subcutaneous (erratic absorption); highly protein bound with a large negative charge. Saturable, dose-dependent clearance — rapid reticuloendothelial and endothelial uptake and depolymerisation at low doses, and slower renal elimination at higher doses — so the half-life rises from ~30 min to over 2 h with increasing dose. Effect is reduced in antithrombin deficiency (a common cause of 'heparin resistance' in sepsis and after cardiac surgery, treated with antithrombin concentrate or FFP) and by high factor VIII and fibrinogen levels.",
        adverseEffects:
          "Bleeding; heparin-induced thrombocytopenia type II — an IgG antibody against platelet factor 4–heparin complexes causing a fall in platelets after 5–10 days with paradoxical arterial and venous thrombosis (use the 4Ts score, stop all heparin including flushes and switch to argatroban, danaparoid or bivalirudin — never warfarin alone or platelets); hyperkalaemia; osteoporosis and alopecia with long-term use; transaminitis; hypersensitivity. Reversal is with protamine 1 mg per 100 units of heparin given in the preceding hour — which itself can cause hypotension, bradycardia, anaphylaxis and pulmonary hypertension.",
        topicIds: ["transfusion-coagulation", "renal-replacement-therapy"],
      },
      {
        drug: "Prothrombin complex concentrate",
        slug: "prothrombin-complex-concentrate",
        drugClass: "Plasma-derived concentrate of vitamin K-dependent factors (II, VII, IX, X plus protein C/S and heparin)",
        pharmacodynamics:
          "Directly replaces the vitamin K-dependent clotting factors, restoring thrombin generation within 10–30 min — far faster and in a much smaller volume than fresh frozen plasma. First-line, with intravenous vitamin K 5–10 mg, for warfarin reversal in major or intracranial bleeding (dose 25–50 units/kg by INR and weight), and used for factor Xa inhibitor-associated life-threatening bleeding where andexanet alfa is unavailable, and in liver disease-associated bleeding guided by viscoelastic testing.",
        metabolism:
          "Given IV; the factors follow the pharmacokinetics of their native counterparts — factor VII has the shortest half-life (4–6 h), while factor II persists 60–72 h. This mismatch is why vitamin K must always be co-administered for warfarin reversal: otherwise the INR rebounds as factor VII falls. Virally inactivated and heparin-containing (avoid in known HIT).",
        adverseEffects:
          "Thromboembolism — myocardial infarction, stroke, venous thrombosis and DIC — particularly with repeated or high doses and in patients with active thrombotic risk; hypersensitivity and anaphylaxis; heparin-induced thrombocytopenia from the heparin content; theoretical transmission of infection despite viral inactivation; and a falsely reassuring INR after administration that does not reflect ongoing haemostatic failure. Recheck INR and clinical bleeding 30 min after dosing.",
        topicIds: ["transfusion-coagulation", "major-haemorrhage"],
      },
      {
        drug: "Andexanet alfa / idarucizumab",
        slug: "andexanet-idarucizumab",
        drugClass: "Targeted anticoagulant reversal agents — recombinant decoy factor Xa and a humanised monoclonal antibody fragment",
        pharmacodynamics:
          "Andexanet alfa is a modified, catalytically inactive recombinant factor Xa that acts as a high-affinity decoy, sequestering apixaban and rivaroxaban (and, indirectly, low molecular weight heparin/fondaparinux via antithrombin binding) so anti-Xa activity falls within minutes; it is given as a bolus followed by a 2-hour infusion because rebound occurs. Idarucizumab is a Fab fragment with an affinity for dabigatran some 350 times that of thrombin, binding free and thrombin-bound drug and neutralising it almost completely within minutes after 5 g IV; it has no intrinsic procoagulant activity.",
        metabolism:
          "Both are proteins given intravenously. Andexanet has an initial half-life of ~1 h and anti-Xa inhibition returns towards baseline within 2 h of stopping the infusion. Idarucizumab is cleared renally and by proteolytic catabolism with a half-life of ~45 min; because dabigatran redistributes from tissue, a plasma rebound can occur at 12–24 h, sometimes needing a second dose. Neither requires dose adjustment for renal function, though dabigatran itself accumulates markedly in renal failure (and is dialysable).",
        adverseEffects:
          "Andexanet alfa: thrombotic events (ischaemic stroke, myocardial infarction, venous thromboembolism) in around 10% — anticoagulation should be restarted as soon as clinically safe; infusion reactions; and interference with heparin-based anticoagulation, so it must not be given before cardiopulmonary bypass. Idarucizumab: thromboembolism from the unopposed underlying prothrombotic condition, hypersensitivity, and caution in hereditary fructose intolerance (sorbitol excipient). Both are extremely expensive and use is protocolised — confirm significant drug levels and life-threatening bleeding first.",
        topicIds: ["transfusion-coagulation", "major-haemorrhage"],
      },
      {
        drug: "Regional citrate (CRRT)",
        slug: "regional-citrate-anticoagulation",
        drugClass: "Regional (circuit-limited) anticoagulant — calcium chelator",
        pharmacodynamics:
          "Citrate infused into the pre-filter limb chelates ionised calcium, lowering post-filter iCa to 0.25–0.35 mmol/L; because calcium is an essential cofactor for the tenase and prothrombinase complexes, coagulation is arrested inside the circuit only. Calcium is replaced systemically to keep patient iCa at 1.1–1.3 mmol/L, so there is no systemic anticoagulation — the KDIGO-recommended first-line strategy for continuous renal replacement therapy, giving longer filter life and less bleeding than heparin.",
        metabolism:
          "Citrate that returns to the patient is rapidly metabolised in the mitochondrial Krebs cycle of liver, skeletal muscle and renal cortex, generating bicarbonate (each mmol yields ~3 mmol) — hence a mild metabolic alkalosis is expected. Metabolism is impaired in severe hepatic failure, shock with tissue hypoperfusion and profound lactic acidosis, when citrate accumulates. Monitoring is by patient ionised calcium, total calcium, the total:ionised calcium ratio and acid–base status.",
        adverseEffects:
          "Citrate accumulation ('citrate lock') — a rising total:ionised calcium ratio >2.5, worsening metabolic acidosis, an increasing anion gap and falling ionised calcium despite rising calcium replacement, requiring reduction or cessation of citrate; metabolic alkalosis with over-delivery; hypocalcaemia or hypercalcaemia from mis-set replacement; hypomagnesaemia (also chelated); hypernatraemia and hyperglycaemia from the citrate solution's sodium and dextrose load. Relative contraindications are severe liver failure and refractory shock with lactate >8 mmol/L.",
        topicIds: ["renal-replacement-therapy", "acid-base-balance"],
      },
    ],
  },
  {
    id: "metabolic-gi",
    title: "Metabolic, endocrine and gastrointestinal",
    blurb:
      "Hormones, electrolytes, antidotes and acid suppression — mechanisms that explain both the therapeutic effect and the monitoring required.",
    drugs: [
      {
        drug: "Insulin (soluble)",
        slug: "insulin",
        drugClass: "Endogenous polypeptide hormone (recombinant human short-acting)",
        pharmacodynamics:
          "Binds the insulin receptor, a transmembrane tyrosine kinase; autophosphorylation recruits IRS proteins and activates PI3K/Akt, causing GLUT4 translocation to the membrane of skeletal muscle and adipocytes (glucose uptake), glycogen synthesis, lipogenesis, protein synthesis, and inhibition of gluconeogenesis, glycogenolysis, lipolysis and ketogenesis. Also drives potassium, phosphate and magnesium intracellularly via Na⁺/K⁺-ATPase stimulation — the basis of its use in hyperkalaemia with glucose — and it is the cornerstone of DKA/HHS management, where suppression of ketogenesis matters more than glucose lowering.",
        metabolism:
          "Given IV in critical illness (or subcutaneously); the IV half-life is only 5–10 min, so an infusion is required and the effect stops soon after cessation — a common cause of rebound ketosis in DKA if the infusion is stopped before ketones clear. Degraded by insulin-degrading enzyme and glutathione insulin transhydrogenase in the liver (~50% first pass), kidney and muscle; requirements fall in renal and hepatic failure. Adsorbs to plastic — flush the giving set. Sensitivity is reduced by catecholamines, steroids, sepsis and obesity.",
        adverseEffects:
          "Hypoglycaemia is the major hazard — masked by sedation, so hourly glucose monitoring is essential and severe hypoglycaemia carries increased mortality (NICE-SUGAR); hypokalaemia, hypophosphataemia and hypomagnesaemia (especially during DKA treatment and refeeding); rebound hyperglycaemia and ketosis if stopped abruptly; fluid retention and weight gain; local lipohypertrophy or allergy with subcutaneous use. Cerebral oedema risk in DKA is compounded by rapid osmolar shifts; use a fixed-rate weight-based infusion with glucose once the level falls below 14 mmol/L.",
        topicIds: ["icu-endocrine-emergencies", "electrolyte-disorders"],
      },
      {
        drug: "Calcium gluconate 10%",
        slug: "calcium-gluconate",
        drugClass: "Divalent cation salt — membrane stabiliser and inotrope",
        pharmacodynamics:
          "Raises extracellular ionised calcium, restoring the transmembrane gradient so the cardiac resting potential and threshold potential separate again — this reverses the ECG changes and arrhythmia risk of hyperkalaemia within minutes without lowering potassium. Calcium is also an essential cofactor for excitation–contraction coupling (positive inotropy), for vascular smooth muscle tone (raising SVR) and for coagulation factors, and it antagonises magnesium toxicity, calcium channel blocker overdose and hydrofluoric acid burns. 10 mL of 10% calcium gluconate provides 2.2 mmol of calcium — roughly a third of the equivalent volume of calcium chloride.",
        metabolism:
          "Given IV; the gluconate salt requires hepatic metabolism to liberate calcium, so calcium chloride is preferred in severe hepatic dysfunction and cardiac arrest, though gluconate is less irritant and safer peripherally. Ionised calcium is regulated by parathyroid hormone, vitamin D and calcitonin, with renal excretion and bone buffering; effect duration is 30–60 min, so definitive potassium-lowering therapy must follow.",
        adverseEffects:
          "Bradycardia and arrhythmia with rapid injection; severe tissue necrosis and calcinosis on extravasation; hypercalcaemia with confusion, nausea, arrhythmia and renal impairment; precipitation with bicarbonate and phosphate in the same line; and — importantly — potentiation of digoxin toxicity, so calcium is avoided in digoxin-related hyperkalaemia. It does not treat the total body potassium load and can mask ongoing hyperkalaemia if repeated without addressing the cause.",
        topicIds: ["electrolyte-disorders", "icu-arrhythmias"],
      },
      {
        drug: "Potassium chloride",
        slug: "potassium-chloride",
        drugClass: "Electrolyte replacement",
        pharmacodynamics:
          "Restores the extracellular potassium concentration and hence the resting membrane potential of excitable tissue, reducing the arrhythmia risk, muscle weakness and ileus of hypokalaemia and correcting the potassium losses of diuretics, diarrhoea, DKA treatment, refeeding and renal replacement therapy. Because 98% of body potassium is intracellular, serum concentration is a poor guide to total deficit — a fall of 1 mmol/L may represent a 200–400 mmol deficit — and magnesium must be replaced concurrently or renal potassium wasting continues.",
        metabolism:
          "Given by central infusion for concentrated preparations (peripheral lines tolerate up to 40 mmol/L) at a rate usually limited to 10 mmol/h without cardiac monitoring, or up to 20 mmol/h with monitoring in critical hypokalaemia. Not metabolised; ~90% is excreted by the kidney under aldosterone control, with the rest in stool. Excretion is impaired in renal failure, hypoaldosteronism, and with ACE inhibitors, ARBs, potassium-sparing diuretics, trimethoprim and heparin, all of which greatly increase the risk of iatrogenic hyperkalaemia.",
        adverseEffects:
          "Hyperkalaemia with peaked T waves, broad QRS, sine-wave pattern and asystole — the commonest severe iatrogenic error, with fatal outcomes from concentrated ampoules given as a bolus (never give undiluted potassium); phlebitis and pain on peripheral infusion; tissue necrosis on extravasation; nausea and gastrointestinal ulceration with oral preparations. Check magnesium, renal function and urine output before and during replacement, and recheck potassium after each 20–40 mmol.",
        topicIds: ["electrolyte-disorders", "icu-arrhythmias"],
      },
      {
        drug: "Pantoprazole / omeprazole",
        slug: "proton-pump-inhibitors",
        drugClass: "Proton pump inhibitors (substituted benzimidazoles)",
        pharmacodynamics:
          "Lipophilic prodrugs that concentrate in the acidic secretory canaliculus of the gastric parietal cell, where they are protonated to a reactive sulfenamide that covalently and irreversibly binds cysteine residues on the H⁺/K⁺-ATPase, abolishing acid secretion until new pumps are synthesised. This gives profound, prolonged acid suppression (raising intragastric pH above 4) used for stress ulcer prophylaxis in high-risk ventilated or coagulopathic patients, for treatment of upper GI bleeding after endoscopy, and for reflux and peptic ulcer disease.",
        metabolism:
          "Acid-labile so given as enteric-coated oral formulations or IV. Extensively hepatically metabolised by CYP2C19 and CYP3A4; CYP2C19 polymorphism produces poor and ultra-rapid metabolisers, and omeprazole inhibits CYP2C19, reducing the activation of clopidogrel (pantoprazole is preferred in patients on clopidogrel) and raising phenytoin, diazepam and warfarin levels. Plasma half-life is only 1–2 h but the pharmacodynamic effect lasts 24–48 h because inhibition is irreversible. No dose adjustment in renal failure; reduce in severe hepatic impairment.",
        adverseEffects:
          "Increased risk of Clostridioides difficile infection, hospital-acquired and ventilator-associated pneumonia (loss of the gastric acid barrier); hypomagnesaemia (with secondary hypokalaemia and hypocalcaemia) with prolonged use; hyponatraemia; interstitial nephritis; hypergastrinaemia and rebound acid hypersecretion on withdrawal; B12, iron and calcium malabsorption with fracture risk; diarrhoea, headache and rash; microscopic colitis; and masking of gastric malignancy. Review the indication daily — stress ulcer prophylaxis should stop when enteral feeding is established and risk factors resolve.",
        topicIds: ["gi-bleeding", "icu-nutrition"],
      },
      {
        drug: "Terlipressin",
        slug: "terlipressin",
        drugClass: "Synthetic vasopressin analogue (V₁-selective prodrug of lysine-vasopressin)",
        pharmacodynamics:
          "Relatively V₁-selective agonist causing splanchnic arteriolar vasoconstriction, which reduces portal venous inflow and portal pressure — controlling variceal haemorrhage — and improves effective arterial volume, raising renal perfusion pressure in hepatorenal syndrome-acute kidney injury (used with albumin). Systemic vasoconstriction also raises MAP, and V₂ activity is much weaker than native vasopressin, though not absent.",
        metabolism:
          "Given IV as boluses or infusion; it is a prodrug slowly cleaved by endothelial peptidases to release lysine-vasopressin over hours, which is why intermittent 4–6 hourly dosing is possible (half-life ~50 min for the parent, with a sustained effect). Cleared by peptidases in liver and kidney; no specific dose adjustment but caution in severe cardiovascular disease and reduce or stop for ischaemic complications.",
        adverseEffects:
          "Ischaemic events are the key concern — digital, skin, bowel and myocardial ischaemia, and peripheral gangrene; hyponatraemia, sometimes profound and rapid (a residual V₂ effect — monitor sodium daily); bradycardia and arrhythmia; abdominal cramps and diarrhoea; hypertension; and respiratory failure/fluid overload, which drove increased mortality signals in hepatorenal syndrome trials (CONFIRM) when albumin was given liberally. Avoid in severe ischaemic heart or peripheral vascular disease and in significant hypoxaemia.",
        topicIds: ["acute-liver-failure", "gi-bleeding"],
      },
      {
        drug: "N-acetylcysteine",
        slug: "n-acetylcysteine",
        drugClass: "Sulfhydryl-donating antidote and mucolytic",
        pharmacodynamics:
          "Provides cysteine for glutathione synthesis, replenishing the hepatic glutathione that conjugates and detoxifies NAPQI — the CYP2E1-generated reactive metabolite of paracetamol — and it can also directly conjugate NAPQI and act as a sulfate precursor. Beyond this it improves microcirculatory flow, oxygen delivery and mitochondrial function through free-radical scavenging and nitric oxide effects, which is why it also benefits non-paracetamol acute liver failure. As a mucolytic it cleaves disulfide bridges in mucus, and it is used in preventing contrast nephropathy (evidence negative) and in acetaminophen-independent oxidative injury.",
        metabolism:
          "IV (or oral, with extensive first-pass metabolism giving ~10–30% bioavailability). Rapidly deacetylated to cysteine and incorporated into glutathione, protein and sulfate; plasma half-life ~5–6 h with mostly renal excretion of metabolites. Efficacy is time-dependent — maximal if started within 8 h of paracetamol ingestion, still worthwhile beyond 24 h and in established hepatotoxicity. The SNAP 12-hour two-bag regimen (100 mg/kg over 2 h then 200 mg/kg over 10 h) causes fewer adverse reactions than the traditional three-bag regimen.",
        adverseEffects:
          "Non-immune anaphylactoid reactions in 10–20% — flushing, urticaria, bronchospasm, hypotension and nausea, concentration- and rate-dependent (commoner in asthmatics and with low paracetamol levels); managed by pausing the infusion, giving an antihistamine and restarting at a slower rate rather than abandoning treatment. Also nausea and vomiting, a slight prolongation of INR (~1.3) through interference with factor assays that can be mistaken for hepatic failure, hyponatraemia if made up in excess 5% dextrose in children, and rarely seizures with dosing errors. It is not a treatment for the airway alone — nebulised use can cause bronchospasm.",
        topicIds: ["toxicology-poisoning", "acute-liver-failure"],
      },
      {
        drug: "Thiamine (Pabrinex)",
        slug: "thiamine",
        drugClass: "Water-soluble vitamin B1 (co-formulated B and C vitamins)",
        pharmacodynamics:
          "Thiamine pyrophosphate is the essential cofactor for pyruvate dehydrogenase, α-ketoglutarate dehydrogenase, branched-chain ketoacid dehydrogenase and transketolase. Without it pyruvate cannot enter the Krebs cycle, so aerobic metabolism fails and lactate accumulates (type B lactic acidosis) and cerebral energy failure occurs — hence treatment and prevention of Wernicke's encephalopathy (confusion, ophthalmoplegia, ataxia), wet and dry beriberi and refeeding syndrome. Stores last only 2–3 weeks, and requirements rise with carbohydrate load, so it must precede glucose administration in the at-risk patient.",
        metabolism:
          "Absorbed in the jejunum by an active saturable process (limiting oral repletion to a few mg per dose — the reason IV therapy is required in Wernicke's); given IV/IM as Pabrinex. Not protein bound, distributes to tissues where it is phosphorylated to the active pyrophosphate; excess is freely excreted in urine, so overdose is not a concern and half-life is short (~1.5 h for the parent). Depleted by alcohol excess, malnutrition, hyperemesis, bariatric surgery, prolonged parenteral nutrition without supplementation, diuretic therapy and renal replacement therapy.",
        adverseEffects:
          "Very well tolerated. Rare anaphylaxis with IV administration (give over 10 min or more with resuscitation facilities available); local pain, phlebitis and skin reactions; nausea; discoloured urine. Under-treatment is the real risk — high-dose regimens (e.g. 500 mg IV three times daily) are needed for suspected Wernicke's, and giving glucose before thiamine in the at-risk patient may precipitate encephalopathy.",
        topicIds: ["icu-nutrition", "icu-endocrine-emergencies"],
      },
    ],
  },
  {
    id: "infection",
    title: "Antimicrobials and immunity",
    blurb:
      "Cell-wall, ribosomal and nucleic-acid targets, plus the pharmacokinetic/pharmacodynamic index — time above MIC, peak:MIC or AUC:MIC — that dictates dosing in critical illness.",
    drugs: [
      {
        drug: "Piperacillin–tazobactam",
        slug: "piperacillin-tazobactam",
        drugClass: "Ureidopenicillin plus β-lactamase inhibitor",
        pharmacodynamics:
          "Piperacillin binds penicillin-binding proteins, inhibiting the transpeptidase cross-linking of peptidoglycan so the bacterial cell wall fails and autolysis follows — bactericidal against Gram-negatives including Pseudomonas, streptococci, enterococci and anaerobes. Tazobactam irreversibly inhibits many class A β-lactamases, restoring activity against β-lactamase-producing organisms (but not AmpC hyperproducers, ESBL reliably, or carbapenemases). Killing is time-dependent, so the goal is time above MIC — favouring extended (4-hourly or 4-hour) infusions in septic shock and in patients with augmented renal clearance.",
        metabolism:
          "IV only; low protein binding (~30%) and a small Vd (~0.2 L/kg) that expands substantially with oedema and capillary leak, causing sub-therapeutic early concentrations in sepsis. Minimal hepatic metabolism — 70–80% is excreted unchanged in the urine by glomerular filtration and tubular secretion; half-life ~1 h, prolonged in renal impairment (dose interval extension needed) and shortened in augmented renal clearance and CRRT (where doses often need increasing).",
        adverseEffects:
          "Hypersensitivity and anaphylaxis (cross-reactivity with other penicillins; ~1–2% with cephalosporins); rash and drug fever; Clostridioides difficile and antibiotic-associated diarrhoea; interstitial nephritis; an association with acute kidney injury when combined with vancomycin; hypokalaemia and metabolic alkalosis from the sodium load; thrombocytopenia, neutropenia and platelet dysfunction; deranged liver enzymes; seizures at very high concentrations in renal failure; and false-positive galactomannan assays. Review de-escalation daily and take cultures before the first dose.",
        topicIds: ["sepsis", "antimicrobial-stewardship"],
      },
      {
        drug: "Meropenem",
        slug: "meropenem",
        drugClass: "Carbapenem β-lactam",
        pharmacodynamics:
          "Binds PBP2 and PBP3 with high affinity, inhibiting peptidoglycan cross-linking; the fused β-lactam ring resists most β-lactamases including ESBL and AmpC, giving very broad activity against Gram-positive, Gram-negative and anaerobic organisms (but not MRSA, Enterococcus faecium, Stenotrophomonas or Legionella, and not carbapenemase producers). Time-dependent killing means extended or continuous infusion improves target attainment (MERCY and pharmacokinetic data) in critically ill patients with high MICs.",
        metabolism:
          "IV; only 2% protein bound with a Vd of ~0.25 L/kg. Partly hydrolysed by renal dehydropeptidase-1 to an inactive metabolite (unlike imipenem it does not need cilastatin), with ~70% excreted unchanged in the urine. Half-life ~1 h, requiring dose reduction in renal impairment and increased doses in augmented renal clearance, CRRT and ECMO; it is readily removed by dialysis so dose after the session. Excellent tissue and CSF penetration, hence its use in meningitis.",
        adverseEffects:
          "Lower seizure risk than imipenem but still epileptogenic (GABA_A antagonism) in renal failure, high doses and CNS pathology; hypersensitivity and rash; Clostridioides difficile colitis; thrombocytopenia and neutropenia; deranged liver enzymes and cholestasis; and — importantly — it reduces valproate concentrations markedly, risking seizures. Ecological harm through carbapenem resistance selection makes stewardship and de-escalation essential.",
        topicIds: ["sepsis", "antimicrobial-stewardship"],
      },
      {
        drug: "Vancomycin",
        slug: "vancomycin",
        drugClass: "Glycopeptide antibiotic",
        pharmacodynamics:
          "Binds the D-alanyl-D-alanine terminus of peptidoglycan precursors, sterically preventing transglycosylation and transpeptidation — a different step from the β-lactams — giving slow, concentration-independent bactericidal activity against Gram-positive organisms including MRSA, coagulase-negative staphylococci and (orally, for C. difficile, where it is not absorbed) Clostridioides difficile. Efficacy tracks the AUC₂₄:MIC ratio (target 400–600 for MRSA), which is why AUC-guided dosing is replacing trough-only monitoring; resistance occurs through D-ala-D-lac substitution (VRE).",
        metabolism:
          "IV for systemic infection (negligible oral absorption); ~50% protein bound, Vd ~0.7 L/kg, poor penetration of CSF, lung and bone. Almost entirely eliminated unchanged by glomerular filtration, so the half-life of 4–6 h extends to days in renal failure and dosing must be level-guided; loading doses (25–30 mg/kg) are based on actual body weight and are unaffected by renal function. Cleared by CRRT and high-flux dialysis.",
        adverseEffects:
          "Nephrotoxicity, particularly with troughs >20 mg/L, prolonged courses and co-administration of piperacillin–tazobactam, aminoglycosides or NSAIDs; ototoxicity and vestibular toxicity; vancomycin infusion reaction ('red man syndrome') — a rate-dependent, direct mast-cell histamine release causing flushing, pruritus and hypotension, prevented by infusing over at least 60 min (500 mg/h) and treated with antihistamine; neutropenia and thrombocytopenia; DRESS and linear IgA bullous dermatosis; phlebitis; and rare anaphylaxis. Monitor levels, renal function and daily need.",
        topicIds: ["sepsis", "antimicrobial-stewardship"],
      },
      {
        drug: "Ceftriaxone",
        slug: "ceftriaxone",
        drugClass: "Third-generation cephalosporin",
        pharmacodynamics:
          "Inhibits penicillin-binding proteins and hence peptidoglycan cross-linking, with a broad Gram-negative spectrum, good activity against Streptococcus pneumoniae, Neisseria meningitidis and Haemophilus influenzae, and excellent CSF penetration when the meninges are inflamed — hence first-line for community-acquired bacterial meningitis (with amoxicillin for Listeria in the over-50s or immunosuppressed, and dexamethasone) and for community-acquired pneumonia, pyelonephritis and gonorrhoea. Poor activity against Pseudomonas, MRSA, enterococci and anaerobes. Time-dependent killing, but a long half-life allows once-daily dosing.",
        metabolism:
          "IV/IM; unusually high protein binding (85–95%, concentration-dependent) and a half-life of 6–9 h. Dual elimination — 40–60% unchanged in the urine and the rest in bile as unchanged drug and inactive metabolites — so no dose reduction is needed in isolated mild-to-moderate renal or hepatic impairment, though the dose is capped when both fail. Displaces bilirubin from albumin, which is critical in neonates.",
        adverseEffects:
          "Hypersensitivity including anaphylaxis and cross-reactivity with penicillins; Clostridioides difficile colitis (a high-risk agent) and selection of ESBL organisms; biliary sludge/pseudolithiasis with abdominal pain, especially in children and with high doses; immune haemolytic anaemia (occasionally fatal), neutropenia and thrombocytopenia; interstitial nephritis and, in children, renal precipitation with calcium; encephalopathy and seizures in renal failure. Contraindicated in neonates receiving IV calcium (fatal calcium–ceftriaxone precipitation) and in jaundiced neonates (kernicterus risk).",
        topicIds: ["sepsis", "cns-infection"],
      },
      {
        drug: "Co-trimoxazole",
        slug: "co-trimoxazole",
        drugClass: "Trimethoprim–sulfamethoxazole (sequential folate pathway inhibitor)",
        pharmacodynamics:
          "Sulfamethoxazole is a structural analogue of para-aminobenzoic acid and inhibits dihydropteroate synthase, while trimethoprim inhibits dihydrofolate reductase — sequential blockade of bacterial folate synthesis that is synergistic and bactericidal. Human cells use preformed folate and have a far lower affinity target, giving selectivity. It is the treatment of choice for Pneumocystis jirovecii pneumonia (high dose 120 mg/kg/day in divided doses, with corticosteroids if PaO₂ <9.3 kPa) and its prophylaxis, and is used for Nocardia, Stenotrophomonas, Listeria and MRSA soft-tissue infection.",
        metabolism:
          "Excellent oral bioavailability (>90%) with IV available; trimethoprim is more lipophilic with a large Vd and good tissue/lung penetration, sulfamethoxazole is more protein bound (~65%). Sulfamethoxazole is acetylated and glucuronidated hepatically (slow acetylators are at higher risk of hypersensitivity), trimethoprim is partly metabolised and largely renally excreted; both need dose reduction when eGFR falls below 30 mL/min. Half-lives 8–12 h allow 6–12 hourly dosing.",
        adverseEffects:
          "Hyperkalaemia — trimethoprim blocks the distal tubular epithelial sodium channel like amiloride, a very common problem at PCP treatment doses; a rise in creatinine from inhibited tubular secretion without true GFR change; myelosuppression, megaloblastic anaemia and agranulocytosis (folinic acid rescue, never folic acid, in PCP); severe cutaneous reactions including Stevens–Johnson syndrome, toxic epidermal necrolysis and DRESS; hepatitis and cholestasis; aseptic meningitis; hyponatraemia; crystalluria and interstitial nephritis; and haemolysis in G6PD deficiency. Interactions with methotrexate, warfarin, phenytoin, ACE inhibitors and potassium-sparing diuretics are clinically important. Avoid in pregnancy (first and third trimester).",
        topicIds: ["immunology-intensivists", "sepsis"],
      },
      {
        drug: "Aciclovir",
        slug: "aciclovir",
        drugClass: "Acyclic guanosine nucleoside analogue antiviral",
        pharmacodynamics:
          "A prodrug selectively phosphorylated by viral thymidine kinase to aciclovir monophosphate, then by cellular kinases to the triphosphate, which competitively inhibits viral DNA polymerase and is incorporated into the growing DNA chain causing termination. This dual dependence on a viral enzyme gives high selectivity and low host toxicity. Active against herpes simplex 1 and 2 and varicella zoster (weakly against EBV/CMV — ganciclovir is required for CMV). Empirical high-dose IV therapy (10 mg/kg 8-hourly) is started in suspected HSV encephalitis before PCR results, since delay worsens outcome.",
        metabolism:
          "Poor oral bioavailability (10–20%; valaciclovir is the better-absorbed prodrug), low protein binding (~15%) and a Vd near total body water with good CSF penetration (~50% of plasma). Minimal hepatic metabolism to 9-carboxymethoxymethylguanine; 60–90% is excreted unchanged in the urine by filtration and tubular secretion, so the half-life of 2–3 h rises markedly in renal impairment and the dose interval must be extended. Well dialysed. Doses in obesity are based on ideal or adjusted body weight to limit toxicity.",
        adverseEffects:
          "Crystal nephropathy and acute kidney injury from intratubular precipitation — prevented by slow infusion over at least 1 h and generous hydration; neurotoxicity with confusion, hallucinations, tremor, myoclonus and seizures (from the CMMG metabolite, especially with renal impairment and high doses, and often mistaken for the encephalitis being treated); phlebitis and local irritation with extravasation injury; nausea and vomiting; deranged liver enzymes; thrombocytopenia and neutropenia; and rare thrombotic thrombocytopenic purpura at very high doses in the immunocompromised. Monitor renal function daily during high-dose therapy.",
        topicIds: ["cns-infection", "immunology-intensivists"],
      },
    ],
  },
];

export const icuDrugMechanismCount = icuDrugMechanismGroups.reduce((n, g) => n + g.drugs.length, 0);
