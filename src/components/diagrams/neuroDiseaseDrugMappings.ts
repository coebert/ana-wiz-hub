import { MechanismNode } from "@/components/diagrams/perioperative/PathophysDrugMapper";

export const mgMechanisms: MechanismNode[] = [
  {
    id: "achr-loss",
    label: "Postsynaptic AChR loss",
    detail:
      "Antibody-mediated destruction of nicotinic ACh receptors reduces the safety margin at the NMJ.",
    links: [
      {
        drug: "Non-depolarising NMBAs (rocuronium, atracurium)",
        effect: "Marked sensitivity — small doses produce profound block.",
        caution: "Use 10–50% of normal dose; titrate with quantitative TOF monitoring.",
        impact: "caution",
      },
      {
        drug: "Suxamethonium",
        effect: "Resistance — fewer functional receptors raise ED₉₅ ≈ 2.6× normal; phase II block possible.",
        caution: "Avoid where feasible — use rocuronium + sugammadex; reserve sux for true RSI need.",
        impact: "avoid",
      },
      {
        drug: "Sugammadex",
        effect: "Encapsulates rocuronium without cholinergic interaction.",
        caution: "Preferred reversal agent — avoids neostigmine/pyridostigmine interaction.",
        impact: "preferred",
      },
    ],
  },
  {
    id: "anti-che",
    label: "Chronic anticholinesterase therapy",
    detail:
      "Pyridostigmine prolongs ACh action but alters NMBA pharmacodynamics and plasma cholinesterase activity.",
    links: [
      {
        drug: "Mivacurium / suxamethonium",
        effect: "Plasma cholinesterase inhibition prolongs duration unpredictably.",
        caution: "Avoid mivacurium; use sux only if essential and monitor block.",
        impact: "avoid",
      },
      {
        drug: "Neostigmine",
        effect: "Risk of cholinergic crisis on top of background pyridostigmine.",
        caution: "Prefer sugammadex; if neostigmine needed, titrate and watch for over-reversal.",
        impact: "caution",
      },
    ],
  },
  {
    id: "bulbar-resp",
    label: "Bulbar / respiratory weakness",
    detail:
      "Reduced cough, swallow, and vital capacity raise risk of postoperative ventilatory failure.",
    links: [
      {
        drug: "Opioids & benzodiazepines",
        effect: "Synergistic respiratory depression on already-weak muscles.",
        caution: "Use short-acting (remifentanil), regional/multimodal analgesia, plan HDU.",
        impact: "caution",
      },
      {
        drug: "Regional anaesthesia",
        effect: "Avoids NMBAs and central respiratory depression.",
        caution: "Preferred where surgical site allows.",
        impact: "preferred",
      },
    ],
  },
];

export const epilepsyMechanisms: MechanismNode[] = [
  {
    id: "threshold",
    label: "Lowered seizure threshold",
    detail:
      "Imbalance between glutamatergic excitation and GABAergic inhibition predisposes to seizure activity.",
    links: [
      {
        drug: "Enflurane, pethidine, tramadol",
        effect: "Pro-convulsant — can precipitate intra- or postoperative seizures.",
        caution: "Avoid; choose sevoflurane/isoflurane and morphine/fentanyl instead.",
        impact: "avoid",
      },
      {
        drug: "Propofol, thiopentone, sevoflurane",
        effect: "Anticonvulsant or seizure-neutral at clinical doses.",
        caution: "Preferred induction/maintenance choices.",
        impact: "preferred",
      },
      {
        drug: "Ketamine, methohexitone, high-dose remifentanil",
        effect: "Variable epileptogenic potential; case reports of seizure activity.",
        caution: "Use with caution, especially in poorly controlled epilepsy.",
        impact: "caution",
      },
    ],
  },
  {
    id: "enzyme-induction",
    label: "Hepatic enzyme induction",
    detail:
      "Carbamazepine, phenytoin, and phenobarbital induce CYP enzymes and accelerate clearance.",
    links: [
      {
        drug: "Rocuronium / vecuronium",
        effect: "Faster clearance — shorter duration, possible resistance.",
        caution: "Anticipate higher dose requirements; monitor with TOF.",
        impact: "caution",
      },
      {
        drug: "Opioids (fentanyl, alfentanil)",
        effect: "Reduced plasma concentrations for a given dose.",
        caution: "Titrate to effect rather than weight-based dosing.",
        impact: "caution",
      },
    ],
  },
  {
    id: "valproate",
    label: "Sodium valproate effects",
    detail: "Impairs platelet function and may cause thrombocytopenia or hyperammonaemia.",
    links: [
      {
        drug: "Neuraxial techniques",
        effect: "Bleeding risk if platelet dysfunction present.",
        caution: "Check FBC ± coagulation/platelet function before regional block.",
        impact: "caution",
      },
    ],
  },
];

export const msMechanisms: MechanismNode[] = [
  {
    id: "demyelination",
    label: "CNS demyelination",
    detail:
      "Loss of myelin slows or blocks saltatory conduction; demyelinated axons are vulnerable to local irritants and heat.",
    links: [
      {
        drug: "Spinal anaesthesia (high-concentration LA)",
        effect: "Demyelinated cord exposed to high LA concentration — possible relapse trigger.",
        caution: "Use lowest effective concentration; epidural often preferred over spinal.",
        impact: "caution",
      },
      {
        drug: "Epidural anaesthesia",
        effect: "Lower LA concentration in CSF — safer profile in case series.",
        caution: "Generally considered acceptable; document baseline deficits.",
        impact: "preferred",
      },
    ],
  },
  {
    id: "denervation",
    label: "Motor denervation",
    detail:
      "Chronic upper motor neuron lesions cause extra-junctional AChR upregulation in affected muscle groups.",
    links: [
      {
        drug: "Suxamethonium",
        effect: "Risk of hyperkalaemic cardiac arrest if significant motor deficit.",
        caution: "Avoid in patients with established weakness.",
        impact: "avoid",
      },
    ],
  },
  {
    id: "pyrexia",
    label: "Heat sensitivity (Uhthoff)",
    detail: "Even small rises in core temperature can unmask or worsen neurological deficits.",
    links: [
      {
        drug: "Strict normothermia / active cooling",
        effect: "Even small core-temperature rises can unmask deficits (Uhthoff phenomenon).",
        caution: "Forced-air warming titrated to normothermia; treat fever aggressively (paracetamol, cooling).",
        impact: "preferred",
      },
    ],
  },
];

export const pdMechanisms: MechanismNode[] = [
  {
    id: "dopamine-loss",
    label: "Nigrostriatal dopamine deficit",
    detail:
      "Loss of dopaminergic neurons in substantia nigra disinhibits cholinergic basal ganglia output.",
    links: [
      {
        drug: "Levodopa / co-careldopa",
        effect: "Withdrawal precipitates rigidity, NMS-like syndrome, aspiration.",
        caution: "Continue up to surgery; restart ASAP via NG if needed.",
        impact: "preferred",
      },
      {
        drug: "Metoclopramide, droperidol, prochlorperazine, haloperidol",
        effect: "Central D₂ blockade worsens parkinsonism, can precipitate crisis.",
        caution: "Avoid entirely; use ondansetron or domperidone for PONV.",
        impact: "avoid",
      },
    ],
  },
  {
    id: "autonomic",
    label: "Autonomic dysfunction",
    detail:
      "Lewy body deposition affects autonomic ganglia → orthostatic hypotension, gastroparesis, sialorrhoea.",
    links: [
      {
        drug: "Induction agents (propofol, thiopentone)",
        effect: "Exaggerated hypotension on induction.",
        caution: "Reduce dose, slow titration, vasopressors prepared.",
        impact: "caution",
      },
      {
        drug: "Aspiration prophylaxis (ranitidine/PPI ± RSI)",
        effect: "Counters gastroparesis-related aspiration risk without D₂ blockade.",
        caution: "Preferred prophylactic strategy; treat as full stomach if symptomatic. Avoid metoclopramide.",
        impact: "preferred",
      },
    ],
  },
  {
    id: "rigidity",
    label: "Rigidity & dyskinesia",
    detail: "Basal ganglia output imbalance produces tremor, rigidity, and drug-induced dyskinesia.",
    links: [
      {
        drug: "Propofol",
        effect: "May provoke transient dyskinesia or, less often, suppress tremor.",
        caution: "Generally safe; warn about possible brief involuntary movements.",
        impact: "caution",
      },
      {
        drug: "Remifentanil + rocuronium",
        effect: "Predictable, short-acting — minimal interference with PD therapy.",
        caution: "Useful TIVA combination for elderly PD patients.",
        impact: "preferred",
      },
    ],
  },
];

export const mndMechanisms: MechanismNode[] = [
  {
    id: "denervation",
    label: "LMN denervation supersensitivity",
    detail:
      "Lower motor neuron loss triggers spread of extra-junctional ACh receptors across the muscle membrane.",
    links: [
      {
        drug: "Suxamethonium",
        effect: "Massive K⁺ efflux from extra-junctional receptors → cardiac arrest.",
        caution: "Absolutely contraindicated.",
        impact: "avoid",
      },
      {
        drug: "Non-depolarising NMBAs",
        effect: "Increased sensitivity and prolonged duration.",
        caution: "Use reduced dose with quantitative TOF; sugammadex for rocuronium.",
        impact: "caution",
      },
    ],
  },
  {
    id: "bulbar",
    label: "Bulbar & respiratory weakness",
    detail:
      "Progressive UMN/LMN loss impairs cough, swallow, and ventilation; restrictive defect develops.",
    links: [
      {
        drug: "Opioids / sedatives",
        effect: "Risk of postoperative ventilatory failure.",
        caution: "Minimise; favour regional, plan NIV/HDU pathway.",
        impact: "caution",
      },
      {
        drug: "Regional anaesthesia",
        effect: "Avoids airway instrumentation and central depression.",
        caution: "Preferred where feasible; document deficits.",
        impact: "preferred",
      },
    ],
  },
];

export const mdMechanisms: MechanismNode[] = [
  {
    id: "membrane",
    label: "Sarcolemmal fragility (dystrophin loss)",
    detail:
      "Absent or abnormal dystrophin makes the muscle membrane leaky to K⁺ and CK during depolarising or volatile exposure.",
    links: [
      {
        drug: "Suxamethonium",
        effect: "Rhabdomyolysis, hyperkalaemia, cardiac arrest.",
        caution: "Contraindicated in all muscular dystrophies.",
        impact: "avoid",
      },
      {
        drug: "Volatile agents (sevo/iso/des)",
        effect: "MH-like rhabdomyolysis even without RYR1 mutation.",
        caution: "Use TIVA (propofol/remifentanil) as default.",
        impact: "avoid",
      },
    ],
  },
  {
    id: "myotonia",
    label: "Myotonia (DM1)",
    detail:
      "Persistent muscle contraction not relieved by NMBAs or regional block; triggered by depolarisation, cold, shivering, or diathermy.",
    links: [
      {
        drug: "Suxamethonium, neostigmine",
        effect: "Provoke generalised myotonic contracture — can prevent ventilation.",
        caution: "Avoid; reverse rocuronium with sugammadex instead.",
        impact: "avoid",
      },
      {
        drug: "Active warming",
        effect: "Hypothermia and shivering trigger myotonia.",
        caution: "Maintain strict normothermia throughout.",
        impact: "preferred",
      },
    ],
  },
  {
    id: "cardiomyopathy",
    label: "Cardiomyopathy & conduction disease",
    detail: "DMD develops dilated cardiomyopathy; DM1 develops conduction block and arrhythmia.",
    links: [
      {
        drug: "Myocardial depressants (high-dose volatile, propofol bolus)",
        effect: "Worsen ventricular dysfunction, may precipitate arrest.",
        caution: "Pre-op echo + ECG; titrate slowly, invasive monitoring as required.",
        impact: "caution",
      },
    ],
  },
];

export const sciMechanisms: MechanismNode[] = [
  {
    id: "denervation",
    label: "Denervation hyperkalaemia",
    detail:
      "Below the level of injury, extra-junctional ACh receptors proliferate from ~24 h post-injury.",
    links: [
      {
        drug: "Suxamethonium",
        effect: "Life-threatening hyperkalaemia from 24 h to ≥12 months (often longer).",
        caution: "Avoid after the first 24 h post-injury — use rocuronium + sugammadex.",
        impact: "avoid",
      },
    ],
  },
  {
    id: "dysreflexia",
    label: "Autonomic dysreflexia (≥T6)",
    detail:
      "Stimulus below the lesion → uninhibited sympathetic outflow → severe hypertension with reflex bradycardia above the lesion.",
    links: [
      {
        drug: "Light/inadequate anaesthesia",
        effect: "Surgical/visceral stimulation triggers crisis.",
        caution: "Use deep GA or dense neuraxial block; have GTN/nifedipine/labetalol ready.",
        impact: "caution",
      },
      {
        drug: "Spinal/epidural anaesthesia",
        effect: "Blocks the afferent limb of the dysreflexic reflex.",
        caution: "Preferred for lower-body surgery and obstetrics in chronic SCI.",
        impact: "preferred",
      },
    ],
  },
  {
    id: "thermo-resp",
    label: "Poikilothermia & respiratory loss",
    detail:
      "High lesions abolish sympathetic thermoregulation and intercostal/diaphragm function.",
    links: [
      {
        drug: "Forced-air warming + temperature monitoring",
        effect: "Patient cannot defend core temperature.",
        caution: "Active warming mandatory; monitor core T closely.",
        impact: "preferred",
      },
      {
        drug: "Long-acting opioids / residual NMB",
        effect: "Limited respiratory reserve in cervical/high-thoracic lesions.",
        caution: "Favour short-acting agents; ensure full reversal before extubation.",
        impact: "caution",
      },
    ],
  },
];
