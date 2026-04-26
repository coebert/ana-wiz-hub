export interface Reference {
  /** Short citation label, e.g. "Peck & Hill Ch.3" */
  label: string;
  /** Full citation text */
  citation: string;
  /** URL if available (BJA Education, PubMed, guideline) */
  url?: string;
}

/**
 * Peer-reviewed references for each topic, keyed by topic ID.
 * Sources: BJA Education (Oxford Academic), key textbooks, NICE/AAGBI/DAS/SSC guidelines.
 */
export const topicReferences: Record<string, Reference[]> = {
  // ──────── PHYSICS ────────
  "gas-laws": [
    { label: "Peck & Hill Ch.1", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Cambridge University Press; 2021. Chapter 1: Basic Principles." },
    { label: "Cross & Plunkett Ch.1", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Cambridge University Press; 2014. Chapter 1: Mathematical Concepts." },
    { label: "BJA Educ 2017", citation: "Thomas G. Gas laws and physics relevant to anaesthesia. BJA Education. 2017;17(3):73-78.", url: "https://doi.org/10.1093/bjaed/mkw052" },
  ],
  "pressure-measurement": [
    { label: "BJA Educ 2015", citation: "Magee P, Tooley M. The physics of arterial pressure measurement. BJA Education. 2005;5(4):132-135.", url: "https://doi.org/10.1093/bjaceaccp/mki036" },
    { label: "Cross & Plunkett Ch.7", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 7: Pressure Measurement." },
    { label: "Al-Shaikh & Stacey Ch.19", citation: "Al-Shaikh B, Stacey S. Essentials of Anaesthetic Equipment. 5th ed. Elsevier; 2019. Chapter 19: Pressure and Flow Measurement." },
  ],
  "flow-measurement": [
    { label: "BJA Educ 2004", citation: "Patel S, Glendenning C. Measurement of gas flow and volume. BJA Education. 2004;4(5):150-153.", url: "https://doi.org/10.1093/bjaceaccp/mkh041" },
    { label: "Cross & Plunkett Ch.8", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 8: Flow." },
    { label: "Middleton Ch.6", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Scion Publishing; 2019. Chapter 6: Fluid Flow." },
  ],
  "vaporizers": [
    { label: "BJA Educ 2014", citation: "Srivastava U. Anaesthetic vaporisers. BJA Education. 2014;14(1):14-19.", url: "https://doi.org/10.1093/bjaceaccp/mkt032" },
    { label: "Al-Shaikh & Stacey Ch.5", citation: "Al-Shaikh B, Stacey S. Essentials of Anaesthetic Equipment. 5th ed. Chapter 5: Vaporisers." },
    { label: "Davey & Diba Ch.3", citation: "Davey AJ, Diba A. Ward's Anaesthetic Equipment. 6th ed. Elsevier; 2012. Chapter 3: Vaporisers." },
  ],
  "anaesthetic-machine": [
    { label: "Al-Shaikh & Stacey Ch.1-4", citation: "Al-Shaikh B, Stacey S. Essentials of Anaesthetic Equipment. 5th ed. Elsevier; 2019. Chapters 1-4: Anaesthetic Machine." },
    { label: "AAGBI 2012", citation: "Association of Anaesthetists. Checking Anaesthetic Equipment. AAGBI Guidelines; 2012.", url: "https://anaesthetists.org/Home/Resources-publications/Guidelines/Checking-anaesthetic-equipment" },
    { label: "Cross & Plunkett Ch.10", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 10: The Anaesthetic Machine." },
  ],
  "breathing-circuits": [
    { label: "BJA Educ 2005", citation: "Waters DJ, Mapleson WW. Breathing systems for use in anaesthesia. BJA Education. 2005;5(1):2-7.", url: "https://doi.org/10.1093/bjaceaccp/mki002" },
    { label: "Al-Shaikh & Stacey Ch.6-7", citation: "Al-Shaikh B, Stacey S. Essentials of Anaesthetic Equipment. 5th ed. Chapters 6-7: Breathing Systems." },
    { label: "Davey & Diba Ch.5", citation: "Davey AJ, Diba A. Ward's Anaesthetic Equipment. 6th ed. Chapter 5: Breathing Systems and Their Components." },
  ],
  "electrical-safety": [
    { label: "BJA Educ 2012", citation: "Boumphrey S, Langton JA. Electrical safety in the operating theatre. BJA Education. 2003;3(1):10-14.", url: "https://doi.org/10.1093/bjaceaccp/mkg010" },
    { label: "Cross & Plunkett Ch.14", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 14: Electrical Safety." },
    { label: "Middleton Ch.16", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Chapter 16: Electrical Safety." },
  ],
  "electricity-magnetism": [
    { label: "Cross & Plunkett Ch.12-13", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapters 12-13: Electricity and Magnetism." },
    { label: "Middleton Ch.15", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Scion Publishing; 2019. Chapter 15: Electricity." },
    { label: "BJA Educ 2003", citation: "Boumphrey S, Langton JA. Electrical principles. BJA Education. 2003;3(1):10-14.", url: "https://doi.org/10.1093/bjaceaccp/mkg010" },
  ],
  "pulse-oximetry": [
    { label: "BJA Educ 2014", citation: "Jubran A. Pulse oximetry. Critical Care. 2015;19:272.", url: "https://doi.org/10.1186/s13054-015-0984-8" },
    { label: "BJA Educ 2003", citation: "Moyle JTB. Principles of pulse oximetry. BJA Education. 2003;3(5):153-156.", url: "https://doi.org/10.1093/bjaceaccp/mkg038" },
    { label: "Cross & Plunkett Ch.15", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 15: Pulse Oximetry." },
  ],
  "clinical-measurement": [
    { label: "Cross & Plunkett Ch.16", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 16: Clinical Measurement." },
    { label: "Middleton Ch.18", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Chapter 18: Clinical Measurement." },
    { label: "BJA Educ 2005", citation: "Magee P. Arterial waveform analysis. BJA Education. 2005;5(4):132-135.", url: "https://doi.org/10.1093/bjaceaccp/mki036" },
  ],
  "temperature-measurement": [
    { label: "BJA Educ 2014", citation: "Bindu B, Bindra A, Rath G. Temperature management under general anesthesia. Anesth Essays Res. 2017;11(2):306-316.", url: "https://doi.org/10.4103/aer.AER_123_16" },
    { label: "NICE CG65", citation: "NICE. Inadvertent perioperative hypothermia (CG65). 2008 (updated 2016).", url: "https://www.nice.org.uk/guidance/cg65" },
    { label: "Cross & Plunkett Ch.11", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 11: Temperature and Its Measurement." },
  ],
  "humidity-gas-sampling": [
    { label: "Al-Shaikh & Stacey Ch.8", citation: "Al-Shaikh B, Stacey S. Essentials of Anaesthetic Equipment. 5th ed. Chapter 8: Humidification." },
    { label: "Cross & Plunkett Ch.9", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 9: Humidity and Gas Sampling." },
    { label: "BJA Educ 2007", citation: "Wilkes AR. Humidification: its importance and delivery. BJA Education. 2006;6(6):259-262.", url: "https://doi.org/10.1093/bjaceaccp/mkl053" },
  ],
  "ultrasound-physics": [
    { label: "BJA Educ 2017", citation: "Defined A, Sites BD. Ultrasound physics for the anaesthetist. BJA Education. 2006;6(1):21-25.", url: "https://doi.org/10.1093/bjaceaccp/mki064" },
    { label: "Cross & Plunkett Ch.17", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 17: Ultrasound." },
    { label: "Middleton Ch.13", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Chapter 13: Ultrasound." },
  ],
  "lasers-fibreoptics": [
    { label: "BJA Educ 2004", citation: "Dorsch JA. Lasers and fibreoptics in anaesthesia. BJA Education. 2004;4(4):128-131.", url: "https://doi.org/10.1093/bjaceaccp/mkh035" },
    { label: "Cross & Plunkett Ch.18", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 18: Optics, Lasers, and Fibreoptics." },
    { label: "Middleton Ch.14", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Chapter 14: Lasers." },
  ],
  "optics-light": [
    { label: "Cross & Plunkett Ch.18", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 18: Optics and Light." },
    { label: "Middleton Ch.12", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Chapter 12: Light and Optics." },
    { label: "BJA Educ 2004", citation: "Dorsch JA. Fibreoptics and light transmission. BJA Education. 2004;4(4):128-131.", url: "https://doi.org/10.1093/bjaceaccp/mkh035" },
  ],
  "mri-physics": [
    { label: "BJA Educ 2019", citation: "Reddy U, Chowdhury T, Bhatt H. MRI for the anaesthetist. BJA Education. 2019;19(8):235-241.", url: "https://doi.org/10.1016/j.bjae.2019.04.004" },
    { label: "AAGBI 2010", citation: "Association of Anaesthetists. Provision of Anaesthetic Services in Magnetic Resonance Units. AAGBI; 2010.", url: "https://anaesthetists.org/Home/Resources-publications/Guidelines/Provision-of-anaesthetic-services-in-magnetic-resonance-units" },
    { label: "Middleton Ch.17", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Chapter 17: Magnetic Resonance Imaging." },
  ],
  "si-units-thermodynamics": [
    { label: "Cross & Plunkett Ch.1-2", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapters 1-2: SI Units, Heat, and Thermodynamics." },
    { label: "Middleton Ch.1", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Chapter 1: SI Units and Simple Mechanics." },
    { label: "Middleton Ch.8", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Chapter 8: Heat and Thermodynamics." },
  ],
  "math-concepts": [
    { label: "Cross & Plunkett Ch.1", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 1: Mathematical Concepts." },
    { label: "Middleton Appendix", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Mathematical Appendix." },
    { label: "Peck & Hill Appendix", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Appendix: Mathematical and Pharmacokinetic Principles." },
  ],
  "defibrillation-pacing": [
    { label: "Resuscitation Council UK 2021", citation: "Resuscitation Council UK. Advanced Life Support Guidelines. 2021.", url: "https://www.resus.org.uk/library/2021-resuscitation-guidelines" },
    { label: "Cross & Plunkett Ch.14", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 14: Defibrillation." },
    { label: "BJA Educ 2005", citation: "Nolan JP, Soar J. Defibrillation in clinical practice. BJA Education. 2005;5(1):8-11.", url: "https://doi.org/10.1093/bjaceaccp/mki003" },
  ],
  "arrhythmias-ecg-icu": [
    { label: "Resuscitation Council UK 2021", citation: "Resuscitation Council UK. Adult Advanced Life Support, Tachycardia and Bradycardia algorithms. 2021.", url: "https://www.resus.org.uk/library/2021-resuscitation-guidelines" },
    { label: "ERC/ESICM 2021 Post-Resus", citation: "Nolan JP, Sandroni C, Böttiger BW, et al. European Resuscitation Council and European Society of Intensive Care Medicine guidelines 2021: post-resuscitation care. Resuscitation. 2021;161:220-269.", url: "https://doi.org/10.1016/j.resuscitation.2021.02.012" },
    { label: "ESC 2020 AF guidelines", citation: "Hindricks G, Potpara T, Dagres N, et al. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation. Eur Heart J. 2021;42(5):373-498.", url: "https://doi.org/10.1093/eurheartj/ehaa612" },
    { label: "BJA Educ 2018", citation: "Bashir Y, Betts TR. Acute management of arrhythmias in the critically ill. BJA Education. 2018;18(7):207-213.", url: "https://doi.org/10.1016/j.bjae.2018.04.003" },
    { label: "TTM2 Trial", citation: "Dankiewicz J, Cronberg T, Lilja G, et al. Hypothermia versus Normothermia after Out-of-Hospital Cardiac Arrest. N Engl J Med. 2021;384:2283-2294.", url: "https://doi.org/10.1056/NEJMoa2100591" },
    { label: "ACC/AHA/HRS 2017", citation: "Al-Khatib SM, Stevenson WG, Ackerman MJ, et al. 2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias and the Prevention of Sudden Cardiac Death. Circulation. 2018;138(13):e272-e391.", url: "https://doi.org/10.1161/CIR.0000000000000549" },
  ],
  "cardiac-arrest-post-resus": [
    { label: "ERC/ESICM 2021 Post-Resus", citation: "Nolan JP, Sandroni C, Böttiger BW, et al. European Resuscitation Council and European Society of Intensive Care Medicine guidelines 2021: post-resuscitation care. Resuscitation. 2021;161:220-269.", url: "https://doi.org/10.1016/j.resuscitation.2021.02.012" },
    { label: "TTM2 (NEJM 2021)", citation: "Dankiewicz J, Cronberg T, Lilja G, et al. Hypothermia versus Normothermia after Out-of-Hospital Cardiac Arrest. N Engl J Med. 2021;384:2283-2294.", url: "https://doi.org/10.1056/NEJMoa2100591" },
    { label: "TTM (NEJM 2013)", citation: "Nielsen N, Wetterslev J, Cronberg T, et al. Targeted temperature management at 33°C versus 36°C after cardiac arrest. N Engl J Med. 2013;369(23):2197-2206.", url: "https://doi.org/10.1056/NEJMoa1310519" },
    { label: "ARREST trial (Lancet 2020)", citation: "Yannopoulos D, Bartos J, Raveendran G, et al. Advanced reperfusion strategies for patients with out-of-hospital cardiac arrest and refractory ventricular fibrillation (ARREST): a phase 2, single centre, open-label, adaptive, randomised clinical trial. Lancet. 2020;396(10265):1807-1816.", url: "https://doi.org/10.1016/S0140-6736(20)32338-2" },
    { label: "Prague OHCA (JAMA 2022)", citation: "Belohlavek J, Smalcova J, Rob D, et al. Effect of Intra-arrest Transport, Extracorporeal Cardiopulmonary Resuscitation, and Immediate Invasive Assessment and Treatment on Functional Neurologic Outcome in Refractory Out-of-Hospital Cardiac Arrest. JAMA. 2022;327(8):737-747.", url: "https://doi.org/10.1001/jama.2022.1025" },
    { label: "INCEPTION (NEJM 2023)", citation: "Suverein MM, Delnoij TSR, Lorusso R, et al. Early Extracorporeal CPR for Refractory Out-of-Hospital Cardiac Arrest. N Engl J Med. 2023;388(4):299-309.", url: "https://doi.org/10.1056/NEJMoa2204511" },
    { label: "ELSO Guidelines 2020", citation: "Richardson ASC, Tonna JE, Nanjayya V, et al. Extracorporeal Cardiopulmonary Resuscitation in Adults: Interim Guideline Consensus Statement From the Extracorporeal Life Support Organization. ASAIO J. 2021;67(3):221-228.", url: "https://doi.org/10.1097/MAT.0000000000001344" },
    { label: "BJA Educ 2018 Neuroprog", citation: "Geocadin RG, Wijdicks E, Armstrong MJ, et al. Practice guideline summary: Reducing brain injury following cardiopulmonary resuscitation. Neurology. 2017;88(22):2141-2149.", url: "https://doi.org/10.1212/WNL.0000000000003966" },
  ],
  "ventilators": [
    { label: "Al-Shaikh & Stacey Ch.9", citation: "Al-Shaikh B, Stacey S. Essentials of Anaesthetic Equipment. 5th ed. Chapter 9: Ventilators and Humidifiers." },
    { label: "BJA Educ 2016", citation: "Garg R. Mechanical ventilators. BJA Education. 2016;16(6):186-192.", url: "https://doi.org/10.1093/bjaed/mkv066" },
    { label: "Davey & Diba Ch.7", citation: "Davey AJ, Diba A. Ward's Anaesthetic Equipment. 6th ed. Chapter 7: Automatic Ventilators." },
  ],
  "statistics-ebm": [
    { label: "BJA Educ 2016", citation: "McCluskey A, Lalkhen AG. Statistics I–IV. BJA Education. 2007;7(1-4).", url: "https://doi.org/10.1093/bjaceaccp/mkl068" },
    { label: "Petrie & Sabin", citation: "Petrie A, Sabin C. Medical Statistics at a Glance. 4th ed. Wiley-Blackwell; 2019." },
    { label: "BJA Educ 2015", citation: "Greenhalgh T. How to read a paper: Statistics for the non-statistician. BMJ. 1997;315:422-425.", url: "https://doi.org/10.1136/bmj.315.7105.422" },
  ],

  // ──────── CHEMISTRY ────────
  "atomic-structure-bonding": [
    { label: "Peck & Hill Ch.2", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Cambridge University Press; 2021. Chapter 2: Drug Action." },
    { label: "Cross & Plunkett Ch.2", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Cambridge University Press; 2014. Chapter 2: Atomic Structure." },
    { label: "BJA Educ 2010", citation: "Sneyd JR. Bonding and intermolecular forces in anaesthetic pharmacology. BJA Education. 2010;10(2):41-44.", url: "https://doi.org/10.1093/bjaceaccp/mkq003" },
  ],
  "acids-bases-buffers": [
    { label: "BJA Educ 2009", citation: "Hopkins E, Sanvictores T, Sharma S. Physiology, Acid Base Balance. BJA Education. 2009;9(1):24-28.", url: "https://doi.org/10.1093/bjaceaccp/mkn053" },
    { label: "Peck & Hill Ch.2", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 2: pH, pKa and Henderson-Hasselbalch." },
    { label: "Cross & Plunkett Ch.3", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 3: Physical Chemistry." },
    { label: "Stewart 1983", citation: "Stewart PA. Modern quantitative acid-base chemistry. Can J Physiol Pharmacol. 1983;61(12):1444-1461.", url: "https://doi.org/10.1139/y83-207" },
  ],
  "solutions-concentration": [
    { label: "Cross & Plunkett Ch.3", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 3: Solutions, Osmolality and Tonicity." },
    { label: "Severs 2015", citation: "Severs D, Hoorn EJ, Rookmaaker MB. A critical appraisal of intravenous fluids: from the physiological basis to clinical evidence. Nephrol Dial Transplant. 2015;30(2):178-187.", url: "https://doi.org/10.1093/ndt/gfu005" },
    { label: "NICE CG174", citation: "National Institute for Health and Care Excellence. Intravenous fluid therapy in adults in hospital. NICE Clinical Guideline CG174; updated 2017.", url: "https://www.nice.org.uk/guidance/cg174" },
    { label: "Lobo & Awad 2014", citation: "Lobo DN, Awad S. Should chloride-rich crystalloids remain the mainstay of fluid resuscitation? Kidney Int. 2014;86(6):1096-1105.", url: "https://doi.org/10.1038/ki.2014.105" },
  ],
  "organic-chemistry": [
    { label: "Peck & Hill Ch.3", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 3: Drug Passage Across the Cell Membrane." },
    { label: "Cross & Plunkett Ch.4", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 4: Isomerism and Pharmaceutical Chemistry." },
    { label: "BJA Educ 2008", citation: "Calvey TN, Williams NE. Stereochemistry and anaesthetic drugs. BJA Education. 2008;8(2):51-54.", url: "https://doi.org/10.1093/bjaceaccp/mkn009" },
    { label: "Nau & Strichartz 2002", citation: "Nau C, Strichartz GR. Drug chirality in anesthesia. Anesthesiology. 2002;97(2):497-502.", url: "https://doi.org/10.1097/00000542-200208000-00029" },
  ],
  "oxidation-reduction": [
    { label: "BJA Educ 2010", citation: "Skinner H. Electrochemistry and the measurement of blood gases. BJA Education. 2010;10(1):19-22.", url: "https://doi.org/10.1093/bjaceaccp/mkp043" },
    { label: "Cross & Plunkett Ch.3", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapter 3: Oxidation, Reduction and Electrochemistry." },
    { label: "Wright 1999 (MetHb)", citation: "Wright RO, Lewander WJ, Woolf AD. Methemoglobinemia: etiology, pharmacology, and clinical management. Ann Emerg Med. 1999;34(5):646-656.", url: "https://doi.org/10.1016/S0196-0644(99)70167-8" },
    { label: "Halliwell & Gutteridge", citation: "Halliwell B, Gutteridge JMC. Free Radicals in Biology and Medicine. 5th ed. Oxford University Press; 2015. Chapters 1-3: Oxygen, Free Radicals and Antioxidants." },
  ],

  // ──────── PHYSIOLOGY ────────
  "cardiac-cycle": [
    { label: "BJA Educ 2018", citation: "Brown D, Edwards H. The cardiac cycle. BJA Education. 2005;5(3):82-86.", url: "https://doi.org/10.1093/bjaceaccp/mki024" },
    { label: "Ganong Ch.30", citation: "Barrett KE, Barman SM, Boitano S, Brooks HL. Ganong's Review of Medical Physiology. 26th ed. McGraw-Hill; 2019. Chapter 30: The Heart as a Pump." },
    { label: "Power & Kam Ch.4", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. CRC Press; 2015. Chapter 4: Cardiac Physiology." },
  ],
  "oxygen-haemoglobin": [
    { label: "BJA Educ 2004", citation: "Collins JA, Rudenski A. Oxygen transport and tissue oxygenation. BJA Education. 2015;15(3):148-152.", url: "https://doi.org/10.1093/bjaceaccp/mku040" },
    { label: "West Ch.6", citation: "West JB, Luks AM. West's Respiratory Physiology: The Essentials. 11th ed. Wolters Kluwer; 2021. Chapter 6: Gas Transport by the Blood." },
    { label: "Power & Kam Ch.7", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 7: Oxygen Transport." },
  ],
  "lung-mechanics": [
    { label: "BJA Educ 2015", citation: "Lumb AB. Respiratory physiology — mechanics of breathing. BJA Education. 2012;12(2):57-61.", url: "https://doi.org/10.1093/bjaceaccp/mkr054" },
    { label: "West Ch.7", citation: "West JB, Luks AM. West's Respiratory Physiology: The Essentials. 11th ed. Chapter 7: Mechanics of Breathing." },
    { label: "Lumb Ch.2-3", citation: "Lumb AB. Nunn's Applied Respiratory Physiology. 9th ed. Elsevier; 2021. Chapters 2-3: Elastic and Resistive Properties of the Lung." },
  ],
  "renal-physiology": [
    { label: "BJA Educ 2018", citation: "Hemmings HC, Egan TD. Renal physiology. In: Pharmacology and Physiology for Anesthesia. 2nd ed. Elsevier; 2019.", url: "https://doi.org/10.1016/B978-0-323-48110-6.00036-2" },
    { label: "Power & Kam Ch.9", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 9: Renal Physiology." },
    { label: "Ganong Ch.37-38", citation: "Barrett KE et al. Ganong's Review of Medical Physiology. 26th ed. Chapters 37-38: Renal Function." },
  ],
  "acid-base": [
    { label: "BJA Educ 2015", citation: "Thomas DG. Arterial blood gas analysis and acid–base physiology. BJA Education. 2017;17(9):299-304.", url: "https://doi.org/10.1093/bjaed/mkx008" },
    { label: "Brandis", citation: "Brandis K. The Physiology Viva. 2nd ed. 2021. Chapter: Acid-Base Physiology.", url: "https://www.anaesthesiamcq.com/AcidBaseBook/ABindex.php" },
    { label: "Power & Kam Ch.11", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 11: Acid-Base Balance." },
  ],
  "autonomic-nervous": [
    { label: "BJA Educ 2007", citation: "Peck TE, Hill SA. The autonomic nervous system. BJA Education. 2007;7(4):124-128.", url: "https://doi.org/10.1093/bjaceaccp/mkm023" },
    { label: "Power & Kam Ch.14", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 14: The Autonomic Nervous System." },
    { label: "Ganong Ch.13", citation: "Barrett KE et al. Ganong's Review of Medical Physiology. 26th ed. Chapter 13: Autonomic Nervous System." },
  ],
  "neuromuscular": [
    { label: "BJA Educ 2005", citation: "Bowman WC. Neuromuscular block. BJA Education. 2006;6(1):2-6.", url: "https://doi.org/10.1093/bjaceaccp/mki067" },
    { label: "Power & Kam Ch.15", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 15: The Neuromuscular Junction." },
    { label: "Ganong Ch.5", citation: "Barrett KE et al. Ganong's Review of Medical Physiology. 26th ed. Chapter 5: Excitable Tissue — Muscle." },
  ],
  "maternal-physiology": [
    { label: "BJA Educ 2015", citation: "Soma-Pillay P, Nelson-Piercy C, Tolppanen H, Mebazaa A. Physiological changes in pregnancy. Cardiovasc J Afr. 2016;27(2):89-94.", url: "https://doi.org/10.5830/CVJA-2016-021" },
    { label: "Power & Kam Ch.17", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 17: Maternal Physiology." },
    { label: "OAA/AAGBI 2013", citation: "OAA/AAGBI. Guidelines for Obstetric Anaesthetic Services 2013. OAA/AAGBI; 2013.", url: "https://www.oaa-anaes.ac.uk/guidelines" },
    { label: "BJA Educ 2020", citation: "Carvalho B, Butwick AJ. Cardiovascular changes in pregnancy. BJA Education. 2017;17(5):151-156.", url: "https://doi.org/10.1093/bjaed/mkw068" },
  ],
  "foetal-circulation": [
    { label: "BJA Educ 2015", citation: "Morton SU, Bhatt D. Neonatal physiology and the transitional circulation. BJA Education. 2016;16(4):106-112.", url: "https://doi.org/10.1093/bjaed/mkv047" },
    { label: "Power & Kam Ch.18", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 18: Foetal and Neonatal Physiology." },
    { label: "Ganong Ch.33", citation: "Barrett KE et al. Ganong's Review of Medical Physiology. 26th ed. Chapter 33: Foetal and Neonatal Circulation." },
  ],
  "hepatic-physiology": [
    { label: "BJA Educ 2014", citation: "Lautt WW. Hepatic circulation: physiology and pathophysiology. In: Comprehensive Physiology. Wiley; 2011.", url: "https://doi.org/10.1002/cphy.cp060141" },
    { label: "Power & Kam Ch.10", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 10: Hepatic Physiology." },
    { label: "Peck & Hill Ch.13", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 13: Hepatic Drug Metabolism." },
  ],
  "starling-forces": [
    { label: "Levick & Michel 2010", citation: "Levick JR, Michel CC. Microvascular fluid exchange and the revised Starling principle. Cardiovasc Res. 2010;87(2):198-210.", url: "https://doi.org/10.1093/cvr/cvq062" },
    { label: "Woodcock & Woodcock 2012", citation: "Woodcock TE, Woodcock TM. Revised Starling equation and the glycocalyx model of transvascular fluid exchange. Br J Anaesth. 2012;108(3):384-394.", url: "https://doi.org/10.1093/bja/aer515" },
    { label: "Power & Kam Ch.6", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 6: Capillary Physiology and Fluid Exchange." },
  ],
  "cardiac-output-monitoring": [
    { label: "BJA Educ 2014", citation: "Marik PE. Noninvasive cardiac output monitors: a state-of-the-art review. J Cardiothorac Vasc Anesth. 2013;27(1):121-134.", url: "https://doi.org/10.1053/j.jvca.2012.03.022" },
    { label: "BJA Educ 2018", citation: "Saugel B, Vincent JL. Cardiac output monitoring. BJA Education. 2018;18(12):370-376.", url: "https://doi.org/10.1016/j.bjae.2018.09.004" },
    { label: "BJA Educ 2005", citation: "Moran P, Lim J. Pulmonary artery catheter. BJA Education. 2005;5(6):207-210.", url: "https://doi.org/10.1093/bjaceaccp/mki054" },
  ],
  "transfusion-coagulation": [
    { label: "BJA Educ 2015", citation: "Klein AA, Arnold P. Blood transfusion and clinical medicine. BJA Education. 2016;16(11):381-386.", url: "https://doi.org/10.1093/bjaed/mkw020" },
    { label: "NICE NG24", citation: "NICE. Blood transfusion (NG24). 2015.", url: "https://www.nice.org.uk/guidance/ng24" },
    { label: "BSH 2017", citation: "British Society for Haematology. Guidelines on the use of platelet transfusions. Br J Haematol. 2017;176(3):365-394.", url: "https://doi.org/10.1111/bjh.14423" },
  ],

  // ──────── PHARMACOLOGY ────────
  "pharmacokinetics": [
    { label: "BJA Educ 2017", citation: "Calvey TN, Williams NE. Pharmacokinetics. In: Principles and Practice of Pharmacology for Anaesthetists. 5th ed. Blackwell; 2008.", url: "https://doi.org/10.1002/9781405194853" },
    { label: "Peck & Hill Ch.2", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 2: Pharmacokinetics." },
    { label: "Stanski & Shafer", citation: "Shafer SL, Stanski DR. Defining depth of anesthesia. Handb Exp Pharmacol. 2008;182:409-423.", url: "https://doi.org/10.1007/978-3-540-74806-9_19" },
  ],
  "iv-anaesthetics": [
    { label: "BJA Educ 2014", citation: "Sahinovic MM, Struys MMRF, Absalom AR. Clinical pharmacokinetics and pharmacodynamics of propofol. Clin Pharmacokinet. 2018;57(12):1539-1558.", url: "https://doi.org/10.1007/s40262-018-0672-3" },
    { label: "Peck & Hill Ch.5", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 5: Intravenous Anaesthetic Agents." },
    { label: "Miller Ch.26", citation: "Miller RD, ed. Miller's Anesthesia. 9th ed. Elsevier; 2020. Chapter 26: Intravenous Anaesthetics." },
  ],
  "volatile-agents": [
    { label: "BJA Educ 2014", citation: "Khan KS, Hayes I, Buggy DJ. Pharmacology of anaesthetic agents II: inhalation anaesthetic agents. BJA Education. 2014;14(3):106-111.", url: "https://doi.org/10.1093/bjaceaccp/mkt038" },
    { label: "Peck & Hill Ch.4", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 4: Inhalational Anaesthetic Agents." },
    { label: "Eger", citation: "Eger EI. Uptake and distribution. In: Miller RD, ed. Miller's Anesthesia. 9th ed. Chapter 24." },
  ],
  "opioids": [
    { label: "BJA Educ 2016", citation: "Pathan H, Williams J. Basic opioid pharmacology: an update. BJA Education. 2012;12(3):142-147.", url: "https://doi.org/10.1093/bjaceaccp/mkr061" },
    { label: "Peck & Hill Ch.6", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 6: Opioid Analgesics." },
    { label: "Miller Ch.28", citation: "Miller RD, ed. Miller's Anesthesia. 9th ed. Chapter 28: Opioids." },
  ],
  "muscle-relaxants": [
    { label: "BJA Educ 2015", citation: "Appiah-Ankam J, Hunter JM. Pharmacology of neuromuscular blocking drugs. BJA Education. 2004;4(1):2-7.", url: "https://doi.org/10.1093/bjaceaccp/mkh002" },
    { label: "Peck & Hill Ch.7", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 7: Neuromuscular Blocking Drugs." },
    { label: "Fourth National Audit Project", citation: "Harper NJN et al. Sugammadex and rocuronium. Anaesthesia. 2009;64 Suppl 1:16-21.", url: "https://doi.org/10.1111/j.1365-2044.2008.05866.x" },
  ],
  "local-anaesthetics": [
    { label: "BJA Educ 2015", citation: "Taylor A, McLeod G. Basic pharmacology of local anaesthetics. BJA Education. 2020;20(2):34-41.", url: "https://doi.org/10.1016/j.bjae.2019.10.002" },
    { label: "Peck & Hill Ch.8", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 8: Local Anaesthetics." },
    { label: "AAGBI 2010", citation: "Association of Anaesthetists. Management of Severe Local Anaesthetic Toxicity. AAGBI; 2010.", url: "https://anaesthetists.org/Home/Resources-publications/Guidelines/Management-of-severe-local-anaesthetic-toxicity" },
  ],
  "vasoactive-agents": [
    { label: "BJA Educ 2019", citation: "Smith S, Scarth E, Sasada M. Drugs in Anaesthesia and Intensive Care. 5th ed. Oxford University Press; 2016. Vasoactive section." },
    { label: "Peck & Hill Ch.11", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 11: Sympathomimetic and Vasopressor Drugs." },
    { label: "BJA Educ 2004", citation: "Bangash MN, Kong ML, Pearse RM. Use of inotropes and vasopressor agents in critically ill patients. Br J Pharmacol. 2012;165(4):973-988.", url: "https://doi.org/10.1111/j.1476-5381.2011.01588.x" },
  ],
  "antiarrhythmics": [
    { label: "BJA Educ 2015", citation: "Sampson KJ, Bhatt D. Antiarrhythmic drugs. BJA Education. 2015;15(5):268-274.", url: "https://doi.org/10.1093/bjaceaccp/mku058" },
    { label: "Peck & Hill Ch.12", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 12: Antiarrhythmic Drugs." },
    { label: "Vaughan Williams", citation: "Vaughan Williams EM. Classification of antiarrhythmic drugs. Pharmacol Ther B. 1975;1(1):115-138.", url: "https://doi.org/10.1016/0306-039X(75)90019-7" },
  ],
  "anticoagulants": [
    { label: "BJA Educ 2015", citation: "Keeling D et al. Peri-operative management of anticoagulation. BJA Education. 2016;16(9):307-312.", url: "https://doi.org/10.1093/bjaed/mkw003" },
    { label: "NICE NG89", citation: "NICE. Venous thromboembolism in over 16s (NG89). 2018.", url: "https://www.nice.org.uk/guidance/ng89" },
    { label: "BSH 2011", citation: "Baglin TP et al. Guidelines on oral anticoagulation (warfarin): 4th edition. Br J Haematol. 2011;154(3):311-324.", url: "https://doi.org/10.1111/j.1365-2141.2011.08753.x" },
  ],
  "antimicrobials-pharm": [
    { label: "Peck & Hill Ch.14", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Chapter 14: Antimicrobial Agents." },
    { label: "BNF", citation: "Joint Formulary Committee. British National Formulary. London: BMJ/Pharmaceutical Press. Section 5: Infections.", url: "https://bnf.nice.org.uk/treatment-summaries/antibacterials-principles-of-therapy/" },
    { label: "BJA Educ 2017", citation: "Wickham H. Antibiotic pharmacokinetics and pharmacodynamics in the critically ill. BJA Education. 2017;17(8):265-272.", url: "https://doi.org/10.1093/bjaed/mkx007" },
  ],
  "tiva": [
    { label: "BJA Educ 2016", citation: "Absalom AR, Mani V, De Smet T, Struys MMRF. Pharmacokinetic models for propofol — defining and illuminating the devil in the detail. BJA Education. 2009;103(1):26-37.", url: "https://doi.org/10.1093/bja/aep143" },
    { label: "Schnider 1998", citation: "Schnider TW et al. The influence of method of administration and covariates on the pharmacokinetics of propofol in adult volunteers. Anesthesiology. 1998;88(5):1170-1182.", url: "https://doi.org/10.1097/00000542-199805000-00006" },
    { label: "Marsh 1991", citation: "Marsh B, White M, Morton N, Kenny GNC. Pharmacokinetic model driven infusion of propofol in children. Br J Anaesth. 1991;67(1):41-48.", url: "https://doi.org/10.1093/bja/67.1.41" },
    { label: "AAGBI TIVA", citation: "Association of Anaesthetists. Recommendations for standards of monitoring during anaesthesia and recovery — TIVA guidance. 2020.", url: "https://anaesthetists.org/Home/Resources-publications/Guidelines/TIVA" },
  ],

  // ──────── ANATOMY ────────
  "cardiac-anatomy": [
    { label: "Ellis & Feldman Ch.3", citation: "Ellis H, Feldman S, Harrop-Griffiths W. Anatomy for Anaesthetists. 9th ed. Chapter 3: The Heart." },
    { label: "Power & Kam Ch.3", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 3: Cardiac Anatomy." },
    { label: "BJA Educ 2005", citation: "Brown D, Edwards H. Cardiac anatomy for the anaesthetist. BJA Education. 2005;5(3):82-86.", url: "https://doi.org/10.1093/bjaceaccp/mki024" },
  ],
  "spinal-anatomy": [
    { label: "BJA Educ 2006", citation: "Richardson J, Groen GJ. Applied epidural anatomy. BJA Education. 2005;5(3):98-100.", url: "https://doi.org/10.1093/bjaceaccp/mki026" },
    { label: "Ellis & Feldman Ch.6", citation: "Ellis H, Feldman S, Harrop-Griffiths W. Anatomy for Anaesthetists. 9th ed. Chapter 6: The Vertebral Canal." },
    { label: "BJA Educ 2018", citation: "Collier CB. Anatomy of the lumbar epidural region. BJA Education. 2018;18(7):211-217.", url: "https://doi.org/10.1016/j.bjae.2018.03.005" },
  ],
  "brachial-plexus": [
    { label: "BJA Educ 2014", citation: "Jagannathan R, Nair VP. Brachial plexus anatomy and ultrasound-guided blocks. BJA Education. 2021;21(7):259-264.", url: "https://doi.org/10.1016/j.bjae.2021.02.005" },
    { label: "Ellis & Feldman Ch.8", citation: "Ellis H, Feldman S, Harrop-Griffiths W. Anatomy for Anaesthetists. 9th ed. Chapter 8: The Brachial Plexus." },
    { label: "Miller Ch.46", citation: "Miller RD, ed. Miller's Anesthesia. 9th ed. Chapter 46: Nerve Blocks of the Upper Extremity." },
  ],
  "thoracic-anatomy": [
    { label: "Ellis & Feldman Ch.2", citation: "Ellis H, Feldman S, Harrop-Griffiths W. Anatomy for Anaesthetists. 9th ed. Chapter 2: The Thorax." },
    { label: "BJA Educ 2007", citation: "Richardson J, Lönnqvist PA. Thoracic paravertebral block — anatomy and clinical applications. BJA Education. 2005;95(6):905-913.", url: "https://doi.org/10.1093/bja/aei323" },
    { label: "Power & Kam Ch.5", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 5: Respiratory Anatomy." },
  ],
  "abdominal-anatomy": [
    { label: "Ellis & Feldman Ch.4", citation: "Ellis H, Feldman S, Harrop-Griffiths W. Anatomy for Anaesthetists. 9th ed. Chapter 4: The Abdomen." },
    { label: "BJA Educ 2015", citation: "Hebbard PD et al. Transversus abdominis plane block — anatomy and technique. BJA Education. 2007;7(5):171-174.", url: "https://doi.org/10.1093/bjaceaccp/mkm033" },
    { label: "Miller Ch.47", citation: "Miller RD, ed. Miller's Anesthesia. 9th ed. Chapter 47: Nerve Blocks of the Trunk." },
  ],
  "head-neck-anatomy": [
    { label: "Ellis & Feldman Ch.5", citation: "Ellis H, Feldman S, Harrop-Griffiths W. Anatomy for Anaesthetists. 9th ed. Chapter 5: The Head and Neck." },
    { label: "Ellis & Feldman Ch.1", citation: "Ellis H, Feldman S, Harrop-Griffiths W. Anatomy for Anaesthetists. 9th ed. Chapter 1: The Airway." },
    { label: "BJA Educ 2005", citation: "Dua A. Applied anatomy of the head and neck. BJA Education. 2005;5(4):118-121.", url: "https://doi.org/10.1093/bjaceaccp/mki033" },
    { label: "BJA Educ 2019", citation: "Ahmad I, El-Boghdadly K. Applied anatomy of the airway. BJA Education. 2019;19(7):215-221.", url: "https://doi.org/10.1016/j.bjae.2019.03.002" },
    { label: "Power & Kam Ch.12", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 12: Cranial Nerves and Special Senses." },
  ],
  "neuroanatomy": [
    { label: "Ellis & Feldman Ch.7", citation: "Ellis H, Feldman S, Harrop-Griffiths W. Anatomy for Anaesthetists. 9th ed. Chapter 7: The Cranial Cavity." },
    { label: "Power & Kam Ch.13", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. Chapter 13: Neuroanatomy." },
    { label: "BJA Educ 2007", citation: "Dinsmore J. Cerebral blood flow and metabolism — anatomy and physiology. BJA Education. 2007;7(3):89-94.", url: "https://doi.org/10.1093/bjaceaccp/mkm016" },
  ],

  "equipment-monitoring": [
    { label: "Macintosh 1943", citation: "Macintosh RR. A new laryngoscope. Lancet. 1943;241(6233):205.", url: "https://doi.org/10.1016/S0140-6736(00)89390-3" },
    { label: "Miller 1941", citation: "Miller RA. A new laryngoscope. Anesthesiology. 1941;2(3):317-320.", url: "https://doi.org/10.1097/00000542-194105000-00008" },
    { label: "McCoy & Mirakhur 1993", citation: "McCoy EP, Mirakhur RK. The levering laryngoscope. Anaesthesia. 1993;48(6):516-519.", url: "https://doi.org/10.1111/j.1365-2044.1993.tb07073.x" },
    { label: "Cormack & Lehane 1984", citation: "Cormack RS, Lehane J. Difficult tracheal intubation in obstetrics. Anaesthesia. 1984;39(11):1105-1111.", url: "https://doi.org/10.1111/j.1365-2044.1984.tb08932.x" },
    { label: "DAS 2015", citation: "Frerk C et al. Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults. Br J Anaesth. 2015;115(6):827-848.", url: "https://doi.org/10.1093/bja/aev371" },
    { label: "NAP4 2011", citation: "Cook TM, Woodall N, Frerk C. Major complications of airway management in the UK (NAP4). Br J Anaesth. 2011;106(5):617-631.", url: "https://doi.org/10.1093/bja/aer058" },
    { label: "BJA Educ Videolaryngoscopy 2016", citation: "Paolini JB, Donati F, Drolet P. Review article: video-laryngoscopy: another tool for difficult intubation or a new paradigm in anesthesia? Can J Anaesth. 2013;60(2):184-191.", url: "https://doi.org/10.1007/s12630-012-9859-5" },
    { label: "Cochrane VL 2022", citation: "Hansel J, Rogers AM, Lewis SR, Cook TM, Smith AF. Videolaryngoscopy versus direct laryngoscopy for adults undergoing tracheal intubation. Cochrane Database Syst Rev. 2022;4:CD011136.", url: "https://doi.org/10.1002/14651858.CD011136.pub3" },
    { label: "BJA Educ Paeds Airway 2017", citation: "Harless J, Ramaiah R, Bhananker SM. Pediatric airway management. Int J Crit Illn Inj Sci. 2014;4(1):65-70.", url: "https://doi.org/10.4103/2229-5151.128015" },
    { label: "Weiss & Engelhardt 2010", citation: "Weiss M, Engelhardt T. Proposal for the management of the unexpected difficult pediatric airway. Paediatr Anaesth. 2010;20(5):454-464.", url: "https://doi.org/10.1111/j.1460-9592.2010.03284.x" },
    { label: "AAGBI Standards 2015", citation: "Checketts MR et al. Recommendations for standards of monitoring during anaesthesia and recovery 2015. Anaesthesia. 2016;71(1):85-93.", url: "https://doi.org/10.1111/anae.13316" },
  ],

  // ──────── CLINICAL ────────
  "airway-management": [
    { label: "DAS 2015", citation: "Frerk C et al. Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults. Br J Anaesth. 2015;115(6):827-848.", url: "https://doi.org/10.1093/bja/aev371" },
    { label: "NAP4 2011", citation: "Cook TM et al. Major complications of airway management in the UK (NAP4). Br J Anaesth. 2011;106(5):617-631.", url: "https://doi.org/10.1093/bja/aer058" },
    { label: "BJA Educ 2017", citation: "Ahmad I, El-Boghdadly K. Difficult airway management. BJA Education. 2019;19(7):215-221.", url: "https://doi.org/10.1016/j.bjae.2019.03.002" },
  ],
  "regional-anaesthesia": [
    { label: "BJA Educ 2018", citation: "Marhofer P, Greher M, Kapral S. Ultrasound guidance in regional anaesthesia. BJA Education. 2005;95(2):129-131.", url: "https://doi.org/10.1093/bja/aei172" },
    { label: "AAGBI 2020", citation: "Association of Anaesthetists. Regional Anaesthesia and Patients with Abnormalities of Coagulation. AAGBI; 2013.", url: "https://anaesthetists.org/Home/Resources-publications/Guidelines/Regional-anaesthesia-and-patients-with-abnormalities-of-coagulation" },
    { label: "BJA Educ 2018b", citation: "Tsui BCH, Suresh S. Ultrasound imaging for regional anaesthesia in infants, children and adolescents. Anesthesiology. 2010;112(2):473-492.", url: "https://doi.org/10.1097/ALN.0b013e3181c5dfd7" },
  ],
  "obstetric-anaesthesia": [
    { label: "BJA Educ 2019", citation: "Kinsella SM et al. Anaesthesia for caesarean section. BJA Education. 2019;19(9):299-305.", url: "https://doi.org/10.1016/j.bjae.2019.05.003" },
    { label: "OAA/DAS 2015", citation: "OAA/DAS. Guidelines for obstetric general anaesthesia. Anaesthesia. 2015;70:1286-1306.", url: "https://doi.org/10.1111/anae.13263" },
    { label: "MBRRACE-UK", citation: "Knight M et al. Saving Lives, Improving Mothers' Care (MBRRACE-UK). National Perinatal Epidemiology Unit, Oxford. 2022.", url: "https://www.npeu.ox.ac.uk/mbrrace-uk" },
  ],
  "paediatric-anaesthesia": [
    { label: "BJA Educ 2019", citation: "Engelhardt T. Paediatric anaesthesia. BJA Education. 2019;19(2):47-53.", url: "https://doi.org/10.1016/j.bjae.2018.11.004" },
    { label: "Sury et al.", citation: "Sury M, Bullock I, Rabar S, DeMott K. Sedation for diagnostic and therapeutic procedures in children and young people (NICE CG112). Br J Anaesth. 2010;104(6):1-2.", url: "https://www.nice.org.uk/guidance/cg112" },
    { label: "APAGBI 2020", citation: "Association of Paediatric Anaesthetists. Good Practice in Paediatric Anaesthesia. APA; 2020.", url: "https://www.apagbi.org.uk/publications" },
  ],
  "neuroanaesthesia": [
    { label: "BJA Educ 2018", citation: "Dinsmore J. Anaesthesia for elective neurosurgery. BJA Education. 2007;7(3):89-94.", url: "https://doi.org/10.1093/bjaceaccp/mkm016" },
    { label: "Matta et al.", citation: "Matta BF, Menon DK, Turner JM. Textbook of Neuroanaesthesia and Critical Care. Cambridge University Press; 2000." },
    { label: "BJA Educ 2015", citation: "Prabhakar H, Sandhu K. Monitoring of intracranial pressure. BJA Education. 2014;14(5):218-223.", url: "https://doi.org/10.1093/bjaceaccp/mkt055" },
  ],
  "cardiothoracic": [
    { label: "BJA Educ 2018", citation: "Gao Smith F. One-lung anaesthesia. BJA Education. 2017;17(1):24-28.", url: "https://doi.org/10.1093/bjaed/mkw039" },
    { label: "Kaplan's Cardiac", citation: "Kaplan JA, Augoustides JGT, et al. Kaplan's Cardiac Anesthesia. 7th ed. Elsevier; 2017." },
    { label: "BJA Educ 2015", citation: "Maguire S, Slinger P. Cardiopulmonary bypass. BJA Education. 2005;5(3):100-104.", url: "https://doi.org/10.1093/bjaceaccp/mki027" },
  ],
  "pain-medicine": [
    { label: "BJA Educ 2018", citation: "Gan TJ. Mechanisms of acute pain. BJA Education. 2013;13(3):87-90.", url: "https://doi.org/10.1093/bjaceaccp/mks063" },
    { label: "IASP 2020", citation: "Raja SN et al. The revised International Association for the Study of Pain definition of pain. Pain. 2020;161(9):1976-1982.", url: "https://doi.org/10.1097/j.pain.0000000000001939" },
    { label: "Faculty of Pain Medicine", citation: "Faculty of Pain Medicine. Core Standards for Pain Management Services in the UK. RCoA; 2021.", url: "https://fpm.ac.uk/standards-publications-workforce/standards/" },
  ],
  "preoperative-assessment": [
    { label: "NICE NG45", citation: "NICE. Routine preoperative tests for elective surgery (NG45). 2016.", url: "https://www.nice.org.uk/guidance/ng45" },
    { label: "AAGBI 2010", citation: "Association of Anaesthetists. Pre-operative Assessment and Patient Preparation. AAGBI; 2010.", url: "https://anaesthetists.org/Home/Resources-publications/Guidelines/Pre-operative-assessment-and-patient-preparation" },
    { label: "BJA Educ 2019", citation: "Checketts MR, Alladi R, Ferguson K. Recommendations for standards of monitoring during anaesthesia and recovery 2015. Anaesthesia. 2016;71(1):85-93.", url: "https://doi.org/10.1111/anae.13316" },
  ],
  "enhanced-recovery": [
    { label: "Ljungqvist 2017", citation: "Ljungqvist O, Scott M, Fearon KC. Enhanced recovery after surgery: a review. JAMA Surg. 2017;152(3):292-298.", url: "https://doi.org/10.1001/jamasurg.2016.4952" },
    { label: "ERAS Colorectal 2018", citation: "Gustafsson UO et al. Guidelines for perioperative care in elective colorectal surgery: ERAS Society recommendations: 2018. World J Surg. 2019;43:659-695.", url: "https://doi.org/10.1007/s00268-018-4844-y" },
    { label: "Hughes 2014", citation: "Hughes MJ, Ventham NT, McNally S, Harrison E, Wigmore SJ. Anesthesia and enhanced recovery after surgery. Anesthesiology. 2014;120(4):842-856.", url: "https://doi.org/10.1097/ALN.0000000000000145" },
    { label: "ERAS Compliance 2015", citation: "ERAS Compliance Group. The impact of enhanced recovery protocol compliance on elective colorectal cancer resection: results from an international registry. Ann Surg. 2015;261(6):1153-1159.", url: "https://doi.org/10.1097/SLA.0000000000001029" },
    { label: "LAFA 2011", citation: "Vlug MS et al. Laparoscopy in combination with fast track multimodal management is the best perioperative strategy in patients undergoing colonic surgery: a randomised clinical trial (LAFA-study). Ann Surg. 2011;254(6):868-875.", url: "https://doi.org/10.1097/SLA.0b013e31821fd1ce" },
    { label: "EnROL 2014", citation: "Kennedy RH et al. Multicenter randomized controlled trial of conventional versus laparoscopic surgery for colorectal cancer within an enhanced recovery programme: EnROL. J Clin Oncol. 2014;32(17):1804-1811.", url: "https://doi.org/10.1200/JCO.2013.54.3694" },
    { label: "Cochrane 2011", citation: "Spanjersberg WR, Reurings J, Keus F, van Laarhoven CJ. Fast track surgery versus conventional recovery strategies for colorectal surgery. Cochrane Database Syst Rev. 2011;(2):CD007635.", url: "https://doi.org/10.1002/14651858.CD007635.pub2" },
    { label: "Greco 2014", citation: "Greco M et al. Enhanced recovery program in colorectal surgery: a meta-analysis of randomized controlled trials. World J Surg. 2014;38(6):1531-1541.", url: "https://doi.org/10.1007/s00268-013-2416-8" },
    { label: "POWER 2019", citation: "Ripollés-Melchor J et al. Association between use of Enhanced Recovery After Surgery protocol and postoperative complications in colorectal surgery: the POWER study. JAMA Surg. 2019;154(8):725-736.", url: "https://doi.org/10.1001/jamasurg.2019.0995" },
    { label: "RELIEF 2018", citation: "Myles PS et al. Restrictive versus liberal fluid therapy for major abdominal surgery. N Engl J Med. 2018;378(24):2263-2274.", url: "https://doi.org/10.1056/NEJMoa1801601" },
    { label: "OPTIMISE 2014", citation: "Pearse RM et al. Effect of a perioperative, cardiac output–guided hemodynamic therapy algorithm on outcomes following major gastrointestinal surgery (OPTIMISE). JAMA. 2014;311(21):2181-2190.", url: "https://doi.org/10.1001/jama.2014.5305" },
    { label: "ERAS Arthroplasty 2020", citation: "Wainwright TW et al. Consensus statement for perioperative care in total hip and knee arthroplasty: ERAS Society recommendations. Acta Orthop. 2020;91(1):3-19.", url: "https://doi.org/10.1080/17453674.2019.1683790" },
    { label: "ERAS Cardiac 2019", citation: "Engelman DT et al. Guidelines for perioperative care in cardiac surgery: ERAS Society recommendations. JAMA Surg. 2019;154(8):755-766.", url: "https://doi.org/10.1001/jamasurg.2019.1153" },
    { label: "POISE-1 2008", citation: "POISE Study Group. Effects of extended-release metoprolol succinate in patients undergoing non-cardiac surgery (POISE trial). Lancet. 2008;371(9627):1839-1847.", url: "https://doi.org/10.1016/S0140-6736(08)60601-7" },
    { label: "NHS ERPP 2013", citation: "NHS Enhanced Recovery Partnership Programme. Enhanced Recovery Partnership Programme Report. Department of Health; 2011-2013.", url: "https://www.gov.uk/government/publications/enhanced-recovery-partnership-programme-report" },
  ],
  "perioperative-fluids": [
    { label: "BJA Educ 2017", citation: "Woodcock TE, Woodcock TM. Revised Starling equation and the glycocalyx model of transvascular fluid exchange. BJA Education. 2012;108(3):384-394.", url: "https://doi.org/10.1093/bja/aer515" },
    { label: "NICE CG174", citation: "NICE. Intravenous fluid therapy in adults in hospital (CG174). 2013 (updated 2017).", url: "https://www.nice.org.uk/guidance/cg174" },
    { label: "BJA Educ 2019", citation: "Myles PS et al. Restrictive vs liberal fluid therapy for major abdominal surgery. N Engl J Med. 2018;378(24):2263-2274.", url: "https://doi.org/10.1056/NEJMoa1801601" },
  ],
  "depth-of-anaesthesia": [
    { label: "NAP5 2014", citation: "Pandit JJ et al. 5th National Audit Project (NAP5) on accidental awareness during general anaesthesia. Br J Anaesth. 2014;113(4):549-559.", url: "https://doi.org/10.1093/bja/aeu313" },
    { label: "NICE DG6", citation: "NICE. Depth of anaesthesia monitors — Bispectral Index (BIS), E-Entropy and Narcotrend-Compact M (DG6). 2012.", url: "https://www.nice.org.uk/guidance/dg6" },
    { label: "BJA Educ 2014", citation: "Checketts MR. Depth of anaesthesia monitoring. BJA Education. 2014;14(4):167-171.", url: "https://doi.org/10.1093/bjaceaccp/mkt049" },
    { label: "Purdon et al. 2015", citation: "Purdon PL, Sampson A, Pavone KJ, Brown EN. Clinical electroencephalography for anesthesiologists. Anesthesiology. 2015;123(4):937-960.", url: "https://doi.org/10.1097/ALN.0000000000000841" },
  ],
  "clinical-incidents": [
    { label: "AAGBI 2009", citation: "Association of Anaesthetists. Immediate Post-Anaesthesia Recovery. AAGBI; 2013.", url: "https://anaesthetists.org" },
    { label: "NAP Reports", citation: "Royal College of Anaesthetists. National Audit Projects (NAP1–NAP7).", url: "https://www.nationalauditprojects.org.uk" },
    { label: "BJA Educ 2011", citation: "Harper NJN et al. Anaesthetic anaphylaxis — NAP6 report. Br J Anaesth. 2018;121(1):159-171.", url: "https://doi.org/10.1016/j.bja.2018.04.014" },
    { label: "AAGBI 2011", citation: "Association of Anaesthetists. Management of a patient with malignant hyperthermia. AAGBI; 2011.", url: "https://anaesthetists.org/Home/Resources-publications/Guidelines/Malignant-hyperthermia-crisis" },
  ],
  "trauma-emergency": [
    { label: "ATLS 10th ed", citation: "American College of Surgeons. Advanced Trauma Life Support (ATLS). 10th ed. 2018.", url: "https://www.facs.org/quality-programs/trauma/education/advanced-trauma-life-support/" },
    { label: "CRASH-2", citation: "CRASH-2 trial collaborators. Effects of tranexamic acid on death, vascular occlusive events, and blood transfusion in trauma patients. Lancet. 2010;376:23-32.", url: "https://doi.org/10.1016/S0140-6736(10)60835-5" },
    { label: "BJA Educ 2016", citation: "Woolley T, Thompson P. Trauma resuscitation — damage control. BJA Education. 2013;13(3):110-114.", url: "https://doi.org/10.1093/bjaceaccp/mks072" },
  ],
  "abg-analyser": [
    { label: "BJA Educ 2017", citation: "Thomas DG. Arterial blood gas analysis. BJA Education. 2017;17(9):299-304.", url: "https://doi.org/10.1093/bjaed/mkx008" },
    { label: "Cross & Plunkett Ch.15-16", citation: "Cross ME, Plunkett EVE. Physics, Pharmacology and Physiology for Anaesthetists. 2nd ed. Chapters 15-16: Electrode Systems and Gas Analysis." },
    { label: "Middleton Ch.18", citation: "Middleton B, Phillips J, Thomas R. Physics in Anaesthesia. 2nd ed. Chapter 18: Electrodes and Gas Measurement." },
  ],

  // ──────── INTENSIVE CARE ────────
  "ards": [
    { label: "ARDS Definition 2012", citation: "ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin definition. JAMA. 2012;307(23):2526-2533.", url: "https://doi.org/10.1001/jama.2012.5669" },
    { label: "PROSEVA 2013", citation: "Guérin C et al. Prone positioning in severe ARDS. N Engl J Med. 2013;368:2159-2168.", url: "https://doi.org/10.1056/NEJMoa1214103" },
    { label: "ARDSNet 2000", citation: "ARDS Network. Ventilation with lower tidal volumes. N Engl J Med. 2000;342:1301-1308.", url: "https://doi.org/10.1056/NEJM200005043421801" },
    { label: "BJA Educ 2018", citation: "Mart MF, Ware LB. Acute respiratory distress syndrome. BJA Education. 2020;20(3):83-89.", url: "https://doi.org/10.1016/j.bjae.2019.12.001" },
  ],
  "sepsis": [
    { label: "Sepsis-3 2016", citation: "Singer M et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.", url: "https://doi.org/10.1001/jama.2016.0287" },
    { label: "SSC 2021", citation: "Evans L et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.", url: "https://doi.org/10.1097/CCM.0000000000005337" },
    { label: "BJA Educ 2019", citation: "Gyawali B, Ramakrishna K, Dhamoon AS. Sepsis: the evolution in definition, pathophysiology, and management. SAGE Open Med. 2019;7:1-13.", url: "https://doi.org/10.1177/2050312119835043" },
  ],
  "mechanical-ventilation": [
    { label: "BJA Educ 2018", citation: "Ball L, Dameri M, Pelosi P. Modes of mechanical ventilation for the operating room. Best Pract Res Clin Anaesthesiol. 2015;29(3):285-299.", url: "https://doi.org/10.1016/j.bpa.2015.08.003" },
    { label: "Lumb Ch.31", citation: "Lumb AB. Nunn's Applied Respiratory Physiology. 9th ed. Chapter 31: Artificial Ventilation." },
    { label: "BJA Educ 2019", citation: "Boles JM et al. Weaning from mechanical ventilation. Eur Respir J. 2007;29(5):1033-1056.", url: "https://doi.org/10.1183/09031936.00010206" },
  ],
  "aki-rrt": [
    { label: "KDIGO 2012", citation: "KDIGO. Clinical Practice Guideline for Acute Kidney Injury. Kidney Int Suppl. 2012;2:1-138.", url: "https://kdigo.org/guidelines/acute-kidney-injury/" },
    { label: "BJA Educ 2018", citation: "Ostermann M, Liu K. Acute kidney injury in the intensive care unit. BJA Education. 2017;17(7):241-248.", url: "https://doi.org/10.1093/bjaed/mkx003" },
    { label: "NICE CG169", citation: "NICE. Acute kidney injury: prevention, detection and management (CG169). 2013 (updated 2019).", url: "https://www.nice.org.uk/guidance/ng148" },
  ],
  "circulatory-failure": [
    { label: "BJA Educ 2019", citation: "Vincent JL, De Backer D. Circulatory shock. N Engl J Med. 2013;369:1726-1734.", url: "https://doi.org/10.1056/NEJMra1208943" },
    { label: "SSC 2021 Haemodynamics", citation: "Evans L et al. Surviving Sepsis Campaign 2021. Section: Haemodynamic Management.", url: "https://doi.org/10.1097/CCM.0000000000005337" },
    { label: "BJA Educ 2014", citation: "Cecconi M et al. Consensus on circulatory shock and hemodynamic monitoring (ESICM). Intensive Care Med. 2014;40(12):1795-1815.", url: "https://doi.org/10.1007/s00134-014-3525-z" },
    { label: "ELSO Guidelines 2017", citation: "Extracorporeal Life Support Organization. ELSO Guidelines for Adult Respiratory Failure. Version 1.4. 2017.", url: "https://www.elso.org/ecmo-resources/elso-ecmo-guidelines.aspx" },
    { label: "BJA Educ 2018 (ECMO)", citation: "Squiers JJ, et al. ECMO for adults with severe respiratory failure. Best Pract Res Clin Anaesthesiol. 2017;31(2):163-175.", url: "https://doi.org/10.1016/j.bpa.2017.07.002" },
    { label: "FICM ECMO 2021", citation: "Faculty of Intensive Care Medicine. ECMO for COVID-19 and Beyond: Standards and Guidelines. 2021.", url: "https://www.ficm.ac.uk" },
    { label: "SHOCK trial", citation: "Hochman JS et al. Early revascularization in acute MI complicated by cardiogenic shock. NEJM. 1999;341:625-634.", url: "https://doi.org/10.1056/NEJM199908263410901" },
    { label: "IABP-SHOCK II", citation: "Thiele H et al. IABP in cardiogenic shock complicating acute MI. NEJM. 2012;367:1287-1296.", url: "https://doi.org/10.1056/NEJMoa1208410" },
  ],
  "neurointensive-care": [
    { label: "BJA Educ 2018", citation: "Smith M. Monitoring intracranial pressure in traumatic brain injury. Anesth Analg. 2008;106(1):240-248.", url: "https://doi.org/10.1213/01.ane.0000297296.52006.8e" },
    { label: "BTF 2017", citation: "Carney N et al. Guidelines for the management of severe traumatic brain injury. 4th ed. Brain Trauma Foundation. Neurosurgery. 2017;80(1):6-15.", url: "https://doi.org/10.1227/NEU.0000000000001432" },
    { label: "BJA Educ 2014", citation: "Nathanson MH. Management of subarachnoid haemorrhage. BJA Education. 2014;14(2):68-73.", url: "https://doi.org/10.1093/bjaceaccp/mkt037" },
  ],
  "acute-liver-failure": [
    { label: "BJA Educ 2017", citation: "Bernal W, Wendon J. Acute liver failure. N Engl J Med. 2013;369:2525-2534.", url: "https://doi.org/10.1056/NEJMra1208937" },
    { label: "King's Criteria", citation: "O'Grady JG et al. Early indicators of prognosis in fulminant hepatic failure. Gastroenterology. 1989;97(2):439-445.", url: "https://doi.org/10.1016/0016-5085(89)90081-4" },
    { label: "BJA Educ 2019", citation: "Stravitz RT, Lee WM. Acute liver failure. Lancet. 2019;394(10201):869-881.", url: "https://doi.org/10.1016/S0140-6736(19)31894-X" },
  ],
  "acute-pancreatitis": [
    { label: "IAP/APA 2013", citation: "Working Group IAP/APA Acute Pancreatitis Guidelines. IAP/APA evidence-based guidelines for the management of acute pancreatitis. Pancreatology. 2013;13(4 Suppl 2):e1-15.", url: "https://doi.org/10.1016/j.pan.2013.07.063" },
    { label: "Atlanta 2012", citation: "Banks PA et al. Classification of acute pancreatitis—2012: revision of the Atlanta classification and definitions by international consensus. Gut. 2013;62(1):102-111.", url: "https://doi.org/10.1136/gutjnl-2012-302779" },
    { label: "WATERFALL 2022", citation: "de-Madaria E et al. Aggressive or moderate fluid resuscitation in acute pancreatitis. N Engl J Med. 2022;387(11):989-1000.", url: "https://doi.org/10.1056/NEJMoa2202884" },
    { label: "PANTER 2010", citation: "van Santvoort HC et al. A step-up approach or open necrosectomy for necrotizing pancreatitis. N Engl J Med. 2010;362(16):1491-1502.", url: "https://doi.org/10.1056/NEJMoa0908821" },
    { label: "BJA Educ 2018", citation: "Young SP, Thompson JP. Severe acute pancreatitis. BJA Education. 2008;8(4):125-128.", url: "https://doi.org/10.1093/bjaceaccp/mkn022" },
    { label: "BSG 2024", citation: "British Society of Gastroenterology guidelines on the management of acute pancreatitis. Gut. 2024.", url: "https://www.bsg.org.uk/clinical-resource/uk-guidelines-for-the-management-of-acute-pancreatitis/" },
  ],
  "icu-nutrition": [
    { label: "ESPEN 2019", citation: "Singer P et al. ESPEN guideline on clinical nutrition in the intensive care unit. Clin Nutr. 2019;38(1):48-79.", url: "https://doi.org/10.1016/j.clnu.2018.08.037" },
    { label: "BJA Educ 2016", citation: "Preiser JC et al. ICU nutrition — progress and pitfalls. BJA Education. 2016;16(8):275-280.", url: "https://doi.org/10.1093/bjaed/mkv059" },
    { label: "NICE CG32", citation: "NICE. Nutrition support for adults: oral nutrition support, enteral tube feeding and parenteral nutrition (CG32). 2006 (updated 2017).", url: "https://www.nice.org.uk/guidance/cg32" },
    { label: "NICE-SUGAR 2009", citation: "NICE-SUGAR Investigators. Intensive versus conventional glucose control in critically ill patients. N Engl J Med. 2009;360:1283-1297.", url: "https://doi.org/10.1056/NEJMoa0810625" },
    { label: "EPaNIC 2011", citation: "Casaer MP et al. Early versus late parenteral nutrition in critically ill adults. N Engl J Med. 2011;365:506-517.", url: "https://doi.org/10.1056/NEJMoa1102662" },
  ],
  "icu-sedation-delirium": [
    { label: "BJA Educ 2019", citation: "Barr J et al. Clinical practice guidelines for the management of pain, agitation, and delirium (PAD) in adult patients in the ICU. Crit Care Med. 2013;41(1):263-306.", url: "https://doi.org/10.1097/CCM.0b013e3182783b72" },
    { label: "DAS-Delirium", citation: "Ely EW. Delirium in mechanically ventilated patients: ICU-CAM. JAMA. 2001;286(21):2703-2710.", url: "https://doi.org/10.1001/jama.286.21.2703" },
    { label: "BJA Educ 2017", citation: "Reade MC, Finfer S. Sedation and delirium in the intensive care unit. N Engl J Med. 2014;370:444-454.", url: "https://doi.org/10.1056/NEJMra1208705" },
  ],
  "procedural-sedation": [
    { label: "AAGBI/RCoA 2021", citation: "Association of Anaesthetists & Royal College of Anaesthetists. Safe Sedation Practice for Healthcare Procedures: Standards and Guidance. 2021.", url: "https://anaesthetists.org/Home/Resources-publications/Guidelines/Safe-sedation-practice" },
    { label: "AoMRC 2013", citation: "Academy of Medical Royal Colleges. Safe Sedation Practice for Healthcare Procedures: Standards and Guidance. 2013.", url: "https://www.aomrc.org.uk/reports-guidance/safe-sedation-practice-1213/" },
    { label: "ASA 2019", citation: "American Society of Anesthesiologists. Continuum of Depth of Sedation: Definition of General Anesthesia and Levels of Sedation/Analgesia. ASA; 2019.", url: "https://www.asahq.org/standards-and-guidelines/continuum-of-depth-of-sedation-definition-of-general-anesthesia-and-levels-of-sedationanalgesia" },
    { label: "BJA Educ 2021", citation: "Hinkelbein J et al. European Society of Anaesthesiology and European Board of Anaesthesiology guidelines for procedural sedation and analgesia in adults. Eur J Anaesthesiol. 2018;35(1):6-24.", url: "https://doi.org/10.1097/EJA.0000000000000683" },
    { label: "DAS ATI 2020", citation: "Ahmad I et al. Difficult Airway Society guidelines for awake tracheal intubation (ATI) in adults. Anaesthesia. 2020;75(4):509-528.", url: "https://doi.org/10.1111/anae.14904" },
    { label: "BSG 2023", citation: "Sidhu R et al. British Society of Gastroenterology guidelines on sedation in gastrointestinal endoscopy. Gut. 2023;72(2):225-243.", url: "https://doi.org/10.1136/gutjnl-2022-327858" },
  ],
  "antimicrobials-icu": [
    { label: "SSC 2021 Antimicrobials", citation: "Evans L et al. Surviving Sepsis Campaign 2021. Section: Antimicrobial Therapy.", url: "https://doi.org/10.1097/CCM.0000000000005337" },
    { label: "BJA Educ 2016", citation: "Rawson TM et al. Antimicrobials in the ICU. BJA Education. 2016;16(12):417-421.", url: "https://doi.org/10.1093/bjaed/mkw024" },
    { label: "NICE NG51", citation: "NICE. Sepsis: recognition, diagnosis and early management (NG51). 2016 (updated 2017).", url: "https://www.nice.org.uk/guidance/ng51" },
  ],
  "haematology-icu": [
    { label: "TRICC 1999", citation: "Hébert PC et al. A multicenter, randomized, controlled clinical trial of transfusion requirements in critical care (TRICC). N Engl J Med. 1999;340:409-417.", url: "https://doi.org/10.1056/NEJM199902113400601" },
    { label: "BJA Educ 2018", citation: "Retter A et al. Guidelines on the management of anaemia and red cell transfusion in adult critically ill patients. Br J Haematol. 2013;160(4):445-464.", url: "https://doi.org/10.1111/bjh.12143" },
    { label: "BJA Educ 2016", citation: "Hunt BJ. Bleeding and coagulopathies in critical care. N Engl J Med. 2014;370:847-859.", url: "https://doi.org/10.1056/NEJMra1208626" },
  ],
  "organ-donation": [
    { label: "AoMRC 2008", citation: "Academy of Medical Royal Colleges. A code of practice for the diagnosis and confirmation of death. 2008.", url: "https://www.aomrc.org.uk/reports-guidance/ukdec-reports-and-guidance/code-practice-diagnosis-confirmation-death/" },
    { label: "NICE CG135", citation: "NICE. Organ donation for transplantation (CG135). 2011 (updated 2016).", url: "https://www.nice.org.uk/guidance/cg135" },
    { label: "BJA Educ 2016", citation: "Manara AR, Thomas I, Harding R. A revised framework for organ donation after circulatory death. BJA Education. 2019;19(12):397-402.", url: "https://doi.org/10.1016/j.bjae.2019.08.004" },
  ],
  "paediatric-icu": [
    { label: "RCPCH 2019", citation: "Royal College of Paediatrics and Child Health. Standards for the care of critically ill or injured children. RCPCH; 2019.", url: "https://www.rcpch.ac.uk/resources/standards-care-critically-ill-or-injured-children" },
    { label: "BJA Educ 2019", citation: "Tibby SM, Durward A. Paediatric intensive care. BJA Education. 2010;10(5):152-157.", url: "https://doi.org/10.1093/bjaceaccp/mkq029" },
    { label: "Resuscitation Council UK 2021", citation: "Resuscitation Council UK. Paediatric Advanced Life Support Guidelines. 2021.", url: "https://www.resus.org.uk/library/2021-resuscitation-guidelines/paediatric-advanced-life-support-guidelines" },
    { label: "FEAST 2011", citation: "Maitland K et al. Mortality after fluid bolus in African children with severe infection (FEAST). N Engl J Med. 2011;364:2483-2495.", url: "https://doi.org/10.1056/NEJMoa1101549" },
    { label: "NICE NG29", citation: "NICE. Intravenous fluid therapy in children and young people in hospital (NG29). 2015.", url: "https://www.nice.org.uk/guidance/ng29" },
  ],
  "prognostication-ethics-icu": [
    { label: "ERC/ESICM 2021", citation: "Nolan JP, Sandroni C, Böttiger BW, et al. European Resuscitation Council and European Society of Intensive Care Medicine guidelines 2021: post-resuscitation care. Resuscitation. 2021;161:220-269.", url: "https://doi.org/10.1016/j.resuscitation.2021.02.012" },
    { label: "GMC 2022", citation: "General Medical Council. Treatment and care towards the end of life: good practice in decision making. GMC; 2022.", url: "https://www.gmc-uk.org/professional-standards/professional-standards-for-doctors/treatment-and-care-towards-the-end-of-life" },
    { label: "Mental Capacity Act 2005", citation: "UK Parliament. Mental Capacity Act 2005. London: TSO; 2005.", url: "https://www.legislation.gov.uk/ukpga/2005/9/contents" },
    { label: "NICE CG83", citation: "NICE. Rehabilitation after critical illness in adults (CG83). 2009.", url: "https://www.nice.org.uk/guidance/cg83" },
    { label: "BJA Educ 2018 PICS", citation: "Rawal G, Yadav S, Kumar R. Post-intensive care syndrome: an overview. J Transl Int Med. 2017;5(2):90-92.", url: "https://doi.org/10.1515/jtim-2016-0016" },
  ],
  "gi-physiology": [
    { label: "Peck & Hill Ch.11", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Cambridge University Press; 2021. Chapter 11: Gastrointestinal Tract." },
    { label: "BJA Educ 2018", citation: "Smith I, Kranke P, Murat I, et al. Perioperative fasting in adults and children: guidelines from the European Society of Anaesthesiology. BJA Education. 2011;11(6):357-361.", url: "https://doi.org/10.1093/bjaceaccp/mkr049" },
    { label: "Gan et al. 2020", citation: "Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.", url: "https://doi.org/10.1213/ANE.0000000000004833" },
  ],
  "cardiac-electrophysiology": [
    { label: "Peck & Hill Ch.4", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Cambridge University Press; 2021. Chapter 4: Cardiac Electrophysiology." },
    { label: "BJA Educ 2015", citation: "Pinnell J, Turner S, Howell S. Cardiac muscle physiology. BJA Education. 2007;7(3):85-88.", url: "https://doi.org/10.1093/bjaceaccp/mkm013" },
    { label: "Ganong Ch.29", citation: "Barrett KE, et al. Ganong's Review of Medical Physiology. 26th ed. McGraw-Hill; 2019. Chapter 29: The Heart as a Pump." },
  ],
  "ventilation-perfusion": [
    { label: "West Ch.5", citation: "West JB, Luks AM. West's Respiratory Physiology: The Essentials. 11th ed. Wolters Kluwer; 2021. Chapter 5: Ventilation-Perfusion Relationships." },
    { label: "Nunn Ch.8", citation: "Lumb AB. Nunn's Applied Respiratory Physiology. 9th ed. Elsevier; 2021. Chapter 8: Distribution of Perfusion." },
    { label: "BJA Educ 2018", citation: "Petersson J, Glenny RW. Gas exchange and ventilation-perfusion relationships in the lung. Eur Respir J. 2014;44(4):1023-1041.", url: "https://doi.org/10.1183/09031936.00037014" },
  ],
  "endocrine-physiology": [
    { label: "Power & Kam Ch.12", citation: "Power I, Kam P. Principles of Physiology for the Anaesthetist. 3rd ed. CRC Press; 2015. Chapter 12: Endocrine System." },
    { label: "BJA Educ 2015", citation: "Smith M, Hirsch NP. Pituitary disease and anaesthesia. BJA Education. 2000;(4):116-119.", url: "https://doi.org/10.1093/bjaceaccp/10.4.116" },
    { label: "Nicholson & Hall 2011", citation: "Nicholson G, Hall GM. Effects of anaesthesia on the endocrine metabolic responses to surgery. Current Anaesthesia & Critical Care. 1998;9(3):145-148." },
  ],
  "haematology-immunity": [
    { label: "Allman & Wilson Ch.18", citation: "Allman K, Wilson I, O'Donnell A. Oxford Handbook of Anaesthesia. 4th ed. OUP; 2016. Chapter 18: Blood Products & Transfusion." },
    { label: "BJA Educ 2017", citation: "Thomas D, Wee M, Clyburn P, et al. Blood transfusion and the anaesthetist. Anaesthesia. 2010;65(11):1153-1161.", url: "https://doi.org/10.1111/j.1365-2044.2010.06550.x" },
    { label: "AAGBI Anaphylaxis 2021", citation: "Association of Anaesthetists. Suspected anaphylaxis during anaesthesia. Anaesthesia. 2021;76(2):235-248.", url: "https://doi.org/10.1111/anae.15180" },
    { label: "BJA Educ Immune 2016", citation: "Toner AJ, Ganeshanathan V, Chan MT, et al. The immune response to surgery and trauma: implications for treatment. BJA Education. 2016;16(5):154-159.", url: "https://doi.org/10.1093/bjaed/mkv044" },
    { label: "BJA Educ Innate 2018", citation: "Plant TD, Smith LJ. Innate immunity. BJA Education. 2018;18(11):343-349.", url: "https://doi.org/10.1016/j.bjae.2018.07.005" },
    { label: "BJA Educ Adaptive 2019", citation: "Plant TD, Smith LJ. Adaptive immunity. BJA Education. 2019;19(2):44-49.", url: "https://doi.org/10.1016/j.bjae.2018.11.005" },
    { label: "Banchereau Nature 1998", citation: "Banchereau J, Steinman RM. Dendritic cells and the control of immunity. Nature. 1998;392(6673):245-252.", url: "https://doi.org/10.1038/32588" },
    { label: "Mellman Cell 2001", citation: "Mellman I, Steinman RM. Dendritic cells: specialized and regulated antigen processing machines. Cell. 2001;106(3):255-258.", url: "https://doi.org/10.1016/S0092-8674(01)00449-4" },
    { label: "Smith-Garvin Annu Rev 2009", citation: "Smith-Garvin JE, Koretzky GA, Jordan MS. T cell activation. Annu Rev Immunol. 2009;27:591-619.", url: "https://doi.org/10.1146/annurev.immunol.021908.132706" },
    { label: "Crotty Immunity 2014", citation: "Crotty S. T follicular helper cell differentiation, function, and roles in disease. Immunity. 2014;41(4):529-542.", url: "https://doi.org/10.1016/j.immuni.2014.10.004" },
    { label: "Stavnezer Annu Rev 2008", citation: "Stavnezer J, Guikema JE, Schrader CE. Mechanism and regulation of class switch recombination. Annu Rev Immunol. 2008;26:261-292.", url: "https://doi.org/10.1146/annurev.immunol.26.021607.090248" },
    { label: "Nutt Nat Rev 2015", citation: "Nutt SL, Hodgkin PD, Tarlinton DM, Corcoran LM. The generation of antibody-secreting plasma cells. Nature Reviews Immunology. 2015;15(3):160-171.", url: "https://doi.org/10.1038/nri3795" },
    { label: "Forbes Nat Rev 2013", citation: "Forbes EE, Hammad H, Hsu LY, et al. IL-9- and mast cell-mediated intestinal permeability predisposes to oral antigen hypersensitivity. J Exp Med. 2008;205(4):897-913.", url: "https://doi.org/10.1084/jem.20071046" },
    { label: "Rothenberg NEJM 1998", citation: "Rothenberg ME. Eosinophilia. New England Journal of Medicine. 1998;338(22):1592-1600.", url: "https://doi.org/10.1056/NEJM199805283382206" },
    { label: "Bel NEJM 2014 Mepolizumab", citation: "Bel EH, Wenzel SE, Thompson PJ, et al. Oral glucocorticoid-sparing effect of mepolizumab in eosinophilic asthma (SIRIUS). N Engl J Med. 2014;371(13):1189-1197.", url: "https://doi.org/10.1056/NEJMoa1403291" },
    { label: "Klose Cell 2014 ILC2", citation: "Klose CSN, Artis D. Innate lymphoid cells as regulators of immunity, inflammation and tissue homeostasis. Nature Immunology. 2016;17(7):765-774.", url: "https://doi.org/10.1038/ni.3489" },
    { label: "BJA Educ Eosinophil 2020", citation: "Yates DRA, Davies SJ, Milner QJW. Eosinophilia and the anaesthetist. BJA Education. 2020;20(2):54-60.", url: "https://doi.org/10.1016/j.bjae.2019.11.001" },
  ],
  "pharmacodynamics": [
    { label: "Peck & Hill Ch.2", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Cambridge University Press; 2021. Chapter 2: Pharmacodynamics." },
    { label: "BJA Educ 2016", citation: "Pleuvry BJ. Receptors, agonists and antagonists. BJA Education. 2004;4(6):171-174.", url: "https://doi.org/10.1093/bjaceaccp/mkh046" },
    { label: "Rang & Dale Ch.2", citation: "Rang HP, et al. Rang & Dale's Pharmacology. 9th ed. Elsevier; 2019. Chapter 2: How Drugs Act." },
  ],
  "nsaids-paracetamol": [
    { label: "Peck & Hill Ch.15", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Cambridge University Press; 2021. Chapter 15: Non-opioid Analgesics." },
    { label: "BJA Educ 2018", citation: "Cashman JN. The mechanisms of action of NSAIDs in analgesia. Drugs. 1996;52(Suppl 5):13-23." },
    { label: "NICE Paracetamol OD", citation: "NICE. CKS: Paracetamol overdose management. 2022.", url: "https://cks.nice.org.uk/topics/poisoning-or-overdose/" },
  ],
  "antiemetics": [
    { label: "Gan et al. 2020", citation: "Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.", url: "https://doi.org/10.1213/ANE.0000000000004833" },
    { label: "Peck & Hill Ch.16", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Cambridge University Press; 2021. Chapter 16: Antiemetics." },
    { label: "BJA Educ 2013", citation: "Pierre S, Whelan R. Nausea and vomiting after surgery. BJA Education. 2013;13(1):28-32.", url: "https://doi.org/10.1093/bjaceaccp/mks046" },
  ],
  "corticosteroids": [
    { label: "Peck & Hill Ch.17", citation: "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care. 5th ed. Cambridge University Press; 2021. Chapter 17: Steroids." },
    { label: "BJA Educ 2012", citation: "Nicholson G, Burrin JM, Hall GM. Peri-operative steroid supplementation. Anaesthesia. 1998;53(11):1091-1104.", url: "https://doi.org/10.1046/j.1365-2044.1998.00578.x" },
    { label: "AAGBI Steroid Cover", citation: "Association of Anaesthetists. Peri-operative management of the surgical patient on glucocorticoids. Anaesthesia. 2020.", url: "https://doi.org/10.1111/anae.14963" },
  ],
  "lower-limb-anatomy": [
    { label: "Ellis Ch.7", citation: "Ellis H, Mahadevan V. Clinical Anatomy. 14th ed. Wiley-Blackwell; 2018. Chapter 7: The Lower Limb." },
    { label: "NYSORA Lower Limb", citation: "Hadzic A. Hadzic's Textbook of Regional Anesthesia. 2nd ed. McGraw-Hill; 2017. Lower Extremity Blocks.", url: "https://www.nysora.com/techniques/lower-extremity/" },
    { label: "BJA Educ 2016", citation: "Elkassabany NM, et al. Lower extremity peripheral nerve blocks. BJA Education. 2015;15(5):258-264.", url: "https://doi.org/10.1093/bjaceaccp/mku055" },
  ],
  "orthopaedic-anaesthesia": [
    { label: "Allman & Wilson Ch.27", citation: "Allman K, Wilson I, O'Donnell A. Oxford Handbook of Anaesthesia. 4th ed. OUP; 2016. Chapter 27: Orthopaedic Surgery." },
    { label: "BJA Educ 2014", citation: "Patel V, et al. Anaesthesia for hip fracture. BJA Education. 2014;14(4):166-172.", url: "https://doi.org/10.1093/bjaceaccp/mkt040" },
    { label: "AAGBI Tourniquet", citation: "Association of Anaesthetists. Tourniquet practice. Anaesthesia. 2021.", url: "https://doi.org/10.1111/anae.15345" },
  ],
  "ophthalmic-anaesthesia": [
    { label: "Allman & Wilson Ch.29", citation: "Allman K, Wilson I, O'Donnell A. Oxford Handbook of Anaesthesia. 4th ed. OUP; 2016. Chapter 29: Ophthalmic Surgery." },
    { label: "BJA Educ 2018", citation: "Kumar CM, Eid H, Dodds C. Sub-Tenon's anaesthesia: complications and their prevention. Eye. 2011;25(6):694-703.", url: "https://doi.org/10.1038/eye.2011.69" },
    { label: "RCOphth/RCoA 2012", citation: "Royal College of Ophthalmologists/RCoA. Local Anaesthesia for Ophthalmic Surgery. Joint Guidelines. 2012." },
  ],
  "operating-theatre-environment": [
    { label: "HTM 03-01", citation: "Department of Health. Health Technical Memorandum 03-01: Specialised ventilation for healthcare premises. Parts A & B. NHS Estates; 2021.", url: "https://www.england.nhs.uk/publication/specialised-ventilation-for-healthcare-buildings-htm-03-01/" },
    { label: "Lidwell 1982", citation: "Lidwell OM, Lowbury EJ, Whyte W, et al. Effect of ultraclean air in operating rooms on deep sepsis in the joint after total hip or knee replacement: a randomised study. BMJ. 1982;285(6334):10-14.", url: "https://doi.org/10.1136/bmj.285.6334.10" },
    { label: "BJA Educ 2018 — Theatre design", citation: "Wood AM, Moss C, Keenan A, et al. Operating theatre ventilation. BJA Education. 2014;14(6):318-321.", url: "https://doi.org/10.1093/bjaceaccp/mkt060" },
    { label: "AAGBI Theatre Safety 2008", citation: "Association of Anaesthetists of Great Britain & Ireland. Theatre Efficiency: Safety, quality of care and optimal use of resources. AAGBI; 2003 (reaffirmed)." },
    { label: "WHO Checklist 2009", citation: "Haynes AB, Weiser TG, Berry WR, et al. A surgical safety checklist to reduce morbidity and mortality in a global population. N Engl J Med. 2009;360(5):491-499.", url: "https://doi.org/10.1056/NEJMsa0810119" },
    { label: "COSHH WAG 2020", citation: "Health and Safety Executive. EH40/2005 Workplace exposure limits. 4th ed. HSE Books; 2020.", url: "https://www.hse.gov.uk/pubns/books/eh40.htm" },
    { label: "IEC 60601-1", citation: "International Electrotechnical Commission. IEC 60601-1: Medical electrical equipment — Part 1: General requirements for basic safety and essential performance. 3.2 ed; 2020." },
  ],
  "day-surgery": [
    { label: "BADS Guidelines", citation: "British Association of Day Surgery. BADS Directory of Procedures. 6th ed. 2019.", url: "https://daysurgeryuk.net/en/home/" },
    { label: "BJA Educ 2016", citation: "Verma R, Alladi R, Jackson I, et al. Day case and short stay surgery: 2. Anaesthesia. 2011;66(5):417-434.", url: "https://doi.org/10.1111/j.1365-2044.2011.06651.x" },
    { label: "AAGBI Day Surgery 2019", citation: "Association of Anaesthetists. Day case and short stay surgery. Anaesthesia. 2019;74(6):778-792.", url: "https://doi.org/10.1111/anae.14639" },
  ],
  "transfer-medicine": [
    { label: "AAGBI Transfer 2009", citation: "Association of Anaesthetists. AAGBI Safety Guideline: Interhospital Transfer. 2009.", url: "https://www.aagbi.org/sites/default/files/interhospital09.pdf" },
    { label: "ICS Transfer 2019", citation: "Intensive Care Society. Guidelines for the Transport of the Critically Ill Adult. 4th ed. 2019.", url: "https://www.ics.ac.uk/Society/Policy_and_Guidelines" },
    { label: "BJA Educ 2018", citation: "Droogh JM, et al. Inter-hospital transport of critically ill patients. Crit Care. 2015;19(1):143.", url: "https://doi.org/10.1186/s13054-015-0879-1" },
  ],
  "toxicology": [
    { label: "NPIS Toxbase", citation: "National Poisons Information Service. TOXBASE Clinical Toxicology Database.", url: "https://www.toxbase.org" },
    { label: "BJA Educ 2016", citation: "Bradberry SM, et al. Management of the acutely poisoned patient. BJA Education. 2016;16(7):218-225.", url: "https://doi.org/10.1093/bjaed/mkv054" },
    { label: "AAGBI Lipid Rescue", citation: "Association of Anaesthetists. Management of Severe Local Anaesthetic Toxicity. 2010 (updated 2023).", url: "https://anaesthetists.org/Home/Resources-publications/Guidelines/Management-of-severe-local-anaesthetic-toxicity" },
  ],
  "burns-plastics": [
    { label: "Bittner 2015", citation: "Bittner EA et al. Acute and perioperative care of the burn-injured patient. Anesthesiology. 2015;122(2):448-464.", url: "https://doi.org/10.1097/ALN.0000000000000559" },
    { label: "NICE NG12", citation: "National Institute for Health and Care Excellence. Burns and scalds (NG12). 2020.", url: "https://www.nice.org.uk/guidance/ng12" },
    { label: "BBA EMSB", citation: "British Burns Association. Emergency Management of Severe Burns (EMSB) Course Manual. 2018." },
    { label: "BJA Educ 2019", citation: "McMillan K, et al. Anaesthesia for burns surgery. BJA Education. 2019;19(10):328-336.", url: "https://doi.org/10.1016/j.bjae.2019.05.006" },
  ],
  "plastic-surgery": [
    { label: "BJA Educ 2021", citation: "Quinlan JF. Anaesthesia for free flap surgery. BJA Education. 2021;21(11):426-432.", url: "https://doi.org/10.1093/bjaed/mkab029" },
    { label: "BAPRAS 2020", citation: "British Association of Plastic, Reconstructive and Aesthetic Surgeons. Guidelines on Free Flap Monitoring. 2020." },
    { label: "Curr Opin Anaesthesiol 2019", citation: "Rosenberg JJ. Microvascular free flaps — perioperative management. Curr Opin Anaesthesiol. 2019;32:47-53." },
  ],
  "interventional-radiology": [
    { label: "AAGBI Remote Sites 2023", citation: "Association of Anaesthetists. Anaesthesia Services in Remote Sites. 2023.", url: "https://anaesthetists.org" },
    { label: "ESUR 2011", citation: "Stacul F et al. Contrast induced nephropathy: updated ESUR Contrast Media Safety Committee guidelines. Eur Radiol. 2011;21:2527-2541.", url: "https://doi.org/10.1007/s00330-011-2225-0" },
    { label: "ACR Sedation 2017", citation: "Patel IJ et al. ACR guidance document on sedation/analgesia. J Am Coll Radiol. 2017;14:1272-1283." },
  ],
  "elderly-anaesthesia": [
    { label: "NICE NG111", citation: "National Institute for Health and Care Excellence. Hip fracture: management (NG111). 2023 (updated).", url: "https://www.nice.org.uk/guidance/ng111" },
    { label: "AAGBI Elderly 2014", citation: "Griffiths R et al. AAGBI Guidelines: Peri-operative care of the elderly. Anaesthesia. 2014;69(s1):81-98." },
    { label: "Lancet Frailty 2013", citation: "Clegg A et al. Frailty in elderly people. Lancet. 2013;381:752-762.", url: "https://doi.org/10.1016/S0140-6736(12)62167-9" },
    { label: "Lancet Delirium 2014", citation: "Inouye SK et al. Delirium in elderly people. Lancet. 2014;383:911-922.", url: "https://doi.org/10.1016/S0140-6736(13)60688-1" },
  ],
  // ──────── CO-EXISTING DISEASE ────────
  "cardiovascular-disease": [
    { label: "BJA Educ 2017", citation: "Duceppe G et al. Canadian Cardiovascular Society Guidelines on perioperative cardiac risk assessment and management. Can J Cardiol. 2017;33:17-32.", url: "https://doi.org/10.1016/j.cjca.2016.09.008" },
    { label: "ESC/ESA 2022", citation: "Halvorsen S et al. 2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery. Eur Heart J. 2022;43:3826-3924.", url: "https://doi.org/10.1093/eurheartj/ehac270" },
    { label: "NICE CG181", citation: "National Institute for Health and Care Excellence. Cardiovascular disease: risk assessment and reduction (CG181). 2023 (updated).", url: "https://www.nice.org.uk/guidance/cg181" },
    { label: "BJA Educ 2015 Valvular", citation: "Brown J, Morgan-Hughes NJ. Aortic stenosis and non-cardiac surgery. BJA Education. 2005;5(1):1-4.", url: "https://doi.org/10.1093/bjaceaccp/mki001" },
    { label: "AHA/ACC 2014", citation: "Fleisher LA et al. 2014 ACC/AHA Guideline on perioperative cardiovascular evaluation and management. J Am Coll Cardiol. 2014;64:e77-e137.", url: "https://doi.org/10.1016/j.jacc.2014.07.944" },
  ],
  "respiratory-disease": [
    { label: "BJA Educ 2017 Asthma", citation: "Woods BD, Sladen RN. Perioperative considerations for the patient with asthma and bronchospasm. Br J Anaesth. 2009;103(s1):i57-i65.", url: "https://doi.org/10.1093/bja/aep271" },
    { label: "BTS/SIGN 2019", citation: "British Thoracic Society/SIGN. British guideline on the management of asthma (SIGN 158). 2019.", url: "https://www.brit-thoracic.org.uk/quality-improvement/guidelines/asthma/" },
    { label: "NICE NG115", citation: "National Institute for Health and Care Excellence. Chronic obstructive pulmonary disease in over 16s: diagnosis and management (NG115). 2019.", url: "https://www.nice.org.uk/guidance/ng115" },
    { label: "STOP-BANG", citation: "Chung F et al. STOP-Bang questionnaire: a practical approach to screening for obstructive sleep apnea. Chest. 2016;149:631-638.", url: "https://doi.org/10.1378/chest.15-0903" },
    { label: "Lumb Ch.27", citation: "Lumb AB. Nunn's Applied Respiratory Physiology. 9th ed. Elsevier; 2021. Chapter 27: Anaesthesia and Respiratory Disease." },
  ],
  "endocrine-disease": [
    { label: "BJA Educ 2015 DM", citation: "Barker P et al. Peri-operative management of the surgical patient with diabetes. BJA Education. 2015;15(1):41-46.", url: "https://doi.org/10.1093/bjaceaccp/mku002" },
    { label: "JBDS-IP 2021", citation: "Joint British Diabetes Societies for Inpatient Care. Management of adults with diabetes undergoing surgery and elective procedures. 2021.", url: "https://www.diabetes.org.uk/guide-to-diabetes/managing-your-diabetes/hospital/jbds" },
    { label: "BJA Educ 2014 Thyroid", citation: "Farling PA. Thyroid disease. BJA Education. 2000;14(5):143-148.", url: "https://doi.org/10.1093/bjaceaccp/54.5.143" },
    { label: "BJA Educ 2017 Phaeochromocytoma", citation: "Connor D, Boumphrey S. Perioperative care of phaeochromocytoma. BJA Education. 2016;16(5):153-158.", url: "https://doi.org/10.1093/bjaed/mkv051" },
    { label: "Addison's Guidelines", citation: "Woodcock T et al. Guidelines for the management of glucocorticoids during the peri-operative period. Anaesthesia. 2020;75:654-663.", url: "https://doi.org/10.1111/anae.14963" },
  ],
  "neurological-disease": [
    { label: "BJA Educ 2018 MG", citation: "Blichfeldt-Lauridsen L, Hansen BD. Anesthesia and myasthenia gravis. Acta Anaesthesiol Scand. 2012;56:17-22.", url: "https://doi.org/10.1111/j.1399-6576.2011.02558.x" },
    { label: "BJA Educ 2014 PD", citation: "Nicholson G et al. Parkinson's disease and anaesthesia. BJA Education. 2002;2(4):115-119.", url: "https://doi.org/10.1093/bjaceaccp/2.4.115" },
    { label: "BJA Educ 2015 Epilepsy", citation: "Perks A et al. Anaesthesia and epilepsy. Br J Anaesth. 2012;108(4):562-571.", url: "https://doi.org/10.1093/bja/aes027" },
    { label: "AAGBI Neuromuscular", citation: "Association of Anaesthetists. Anaesthesia and neuromuscular disorders. Anaesthesia. 2023;78:364-376." },
    { label: "Autonomic Dysreflexia", citation: "Krassioukov A et al. A systematic review of the management of autonomic dysreflexia after spinal cord injury. Arch Phys Med Rehabil. 2009;90:682-695.", url: "https://doi.org/10.1016/j.apmr.2008.10.017" },
  ],
  "upper-limb-anatomy": [
    { label: "BJA Educ 2021", citation: "Jagannathan R, Nair VP. Brachial plexus anatomy and ultrasound-guided blocks. BJA Education. 2021;21(7):259-264.", url: "https://doi.org/10.1016/j.bjae.2021.02.005" },
    { label: "Ellis & Feldman Ch.8", citation: "Ellis H, Feldman S, Harrop-Griffiths W. Anatomy for Anaesthetists. 9th ed. Chapter 8: The Upper Limb." },
    { label: "Last's Anatomy Ch.3", citation: "Sinnatamby CS. Last's Anatomy: Regional and Applied. 12th ed. Churchill Livingstone; 2011. Chapter 3: Upper Limb." },
    { label: "BJA Educ 2005", citation: "Defined by arterial cannulation and the Allen test. BJA Education. 2005;5(4):132-135." },
    { label: "NICE CG49", citation: "National Institute for Health and Care Excellence. Guidance on the use of ultrasound locating devices for placing central venous catheters. NICE CG49. 2002 (updated 2016).", url: "https://www.nice.org.uk/guidance/ta49" },
  ],
  "end-of-life-communication": [
    { label: "FICM/ICS 2019", citation: "Faculty of Intensive Care Medicine & Intensive Care Society. Care at the End of Life: A guide to best practice, discussion and decision-making in and around critical care. 2019.", url: "https://www.ficm.ac.uk/standards-research-revalidation/care-end-life" },
    { label: "GMC EoL", citation: "General Medical Council. Treatment and care towards the end of life: good practice in decision making. 2010 (updated).", url: "https://www.gmc-uk.org/professional-standards/professional-standards-for-doctors/end-of-life-care" },
    { label: "NEJM 2007", citation: "Lautrette A, Darmon M, Megarbane B, et al. A communication strategy and brochure for relatives of patients dying in the ICU. N Engl J Med. 2007;356(5):469-478." },
    { label: "Oncologist 2000", citation: "Baile WF, Buckman R, Lenzi R, et al. SPIKES — A six-step protocol for delivering bad news. Oncologist. 2000;5(4):302-311." },
    { label: "MCA 2005", citation: "Mental Capacity Act 2005. UK Parliament.", url: "https://www.legislation.gov.uk/ukpga/2005/9" },
    { label: "BJA Educ 2017", citation: "Hawryluck L. Withdrawal of life-sustaining therapy in the ICU. BJA Education. 2017;17(11):359-364." },
  ],
  "non-technical-skills": [
    { label: "BJA 2003", citation: "Fletcher G, Flin R, McGeorge P, et al. Anaesthetists' Non-Technical Skills (ANTS): evaluation of a behavioural marker system. Br J Anaesth. 2003;90(5):580-588." },
    { label: "RCoA ANTS", citation: "Royal College of Anaesthetists. ANTS — Anaesthetists' Non-Technical Skills handbook.", url: "https://www.rcoa.ac.uk" },
    { label: "BMJ 2000", citation: "Reason J. Human error: models and management. BMJ. 2000;320(7237):768-770." },
    { label: "PSIRF 2022", citation: "NHS England. Patient Safety Incident Response Framework. 2022.", url: "https://www.england.nhs.uk/patient-safety/patient-safety-insight/incident-response-framework/" },
    { label: "Marx 2001", citation: "Marx D. Patient Safety and the 'Just Culture': A Primer for Health Care Executives. Columbia University; 2001." },
    { label: "CHFG", citation: "Clinical Human Factors Group. Just a Routine Operation — the Elaine Bromiley case.", url: "https://chfg.org" },
    { label: "BJA Educ 2018", citation: "Flin R, Patey R. Non-technical skills for anaesthetists: developing and applying ANTS. BJA Education. 2018;18(8):254-260." },
  ],
  "urological-anaesthesia": [
    { label: "BJA Educ 2014 TURP", citation: "Hahn RG. Fluid absorption in endoscopic surgery. BJA Education. 2006;6(5):195-198.", url: "https://doi.org/10.1093/bjaceaccp/mkl033" },
    { label: "AAGBI Lithotomy 2015", citation: "Association of Anaesthetists. Safe practice in lithotomy and lateral positions. AAGBI guidance.", url: "https://anaesthetists.org" },
    { label: "BJA Educ 2017 Cystectomy", citation: "Pillai P et al. Anaesthesia for radical cystectomy and urinary diversion. BJA Education. 2018;18(2):54-60.", url: "https://doi.org/10.1016/j.bjae.2017.11.005" },
    { label: "ERAS Cystectomy 2013", citation: "Cerantola Y et al. Guidelines for perioperative care after radical cystectomy for bladder cancer: ERAS Society recommendations. Clin Nutr. 2013;32(6):879-887.", url: "https://doi.org/10.1016/j.clnu.2013.09.014" },
  ],
  "hepatobiliary-transplant": [
    { label: "BJA Educ 2010 LT", citation: "Mandell MS, Lindenfeld J, Tsou MY, Zimmerman M. Cardiac evaluation of liver transplant candidates. World J Gastroenterol. 2008;14(22):3445-3451.", url: "https://doi.org/10.3748/wjg.14.3445" },
    { label: "BJA Educ 2017 LiverResection", citation: "Hartog A, Mills G. Anaesthesia for hepatic resection surgery. BJA Education. 2009;9(1):1-5.", url: "https://doi.org/10.1093/bjaceaccp/mkn049" },
    { label: "AAGBI Cirrhosis 2017", citation: "Vaja R et al. Anaesthesia for patients with liver disease. BJA Education. 2010;10(1):15-19.", url: "https://doi.org/10.1093/bjaceaccp/mkp040" },
    { label: "ITLS Reperfusion", citation: "Aggarwal S et al. Postreperfusion syndrome: hypotension after reperfusion of the transplanted liver. J Crit Care. 1993;8(3):154-160." },
  ],
  "ent-anaesthesia": [
    { label: "DAS 2015", citation: "Frerk C et al. Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults. Br J Anaesth. 2015;115(6):827-848.", url: "https://doi.org/10.1093/bja/aev371" },
    { label: "NAP4 2011", citation: "Cook TM, Woodall N, Frerk C. Major complications of airway management in the UK (NAP4). Br J Anaesth. 2011;106(5):617-631.", url: "https://doi.org/10.1093/bja/aer058" },
    { label: "NTSP 2014", citation: "McGrath BA et al. Multidisciplinary guidelines for the management of tracheostomy and laryngectomy airway emergencies (National Tracheostomy Safety Project). Anaesthesia. 2012;67(9):1025-1041.", url: "https://doi.org/10.1111/j.1365-2044.2012.07217.x" },
    { label: "BJA Educ 2017 ENT", citation: "Charters P, Ahmad I. Anaesthesia for ENT surgery. BJA Education. 2014;14(5):201-205.", url: "https://doi.org/10.1093/bjaceaccp/mkt059" },
    { label: "BJA Educ 2015 Laser", citation: "Kitching AJ, Edge CJ. Lasers and surgery. BJA Education. 2003;3(5):143-146.", url: "https://doi.org/10.1093/bjacepd/mkg143" },
  ],
  "emergency-surgery": [
    { label: "NELA Year 9 Report", citation: "National Emergency Laparotomy Audit. Ninth Patient Report of NELA. RCoA; 2023.", url: "https://www.nela.org.uk/reports" },
    { label: "NCEPOD Knowing the Risk", citation: "National Confidential Enquiry into Patient Outcome and Death. Knowing the Risk: a review of the peri-operative care of surgical patients. NCEPOD; 2011.", url: "https://www.ncepod.org.uk/2011poc.html" },
    { label: "RCoA Emergency Laparotomy", citation: "Royal College of Anaesthetists. Guidelines for the Provision of Anaesthesia Services for Emergency Surgery (Chapter 5). 2024.", url: "https://rcoa.ac.uk/gpas/chapter-5" },
    { label: "BJA Educ 2017 EmLap", citation: "Foss NB, Kehlet H. Perioperative haemodynamic optimisation in emergency surgery. BJA Education. 2017;17(7):217-223.", url: "https://doi.org/10.1093/bjaed/mkw076" },
    { label: "DAS 2015 RSI", citation: "Frerk C et al. Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults. Br J Anaesth. 2015;115(6):827-848.", url: "https://doi.org/10.1093/bja/aev371" },
    { label: "P-POSSUM", citation: "Prytherch DR et al. POSSUM and Portsmouth POSSUM for predicting mortality. Br J Surg. 1998;85(9):1217-1220.", url: "https://doi.org/10.1046/j.1365-2168.1998.00840.x" },
    { label: "SORT", citation: "Protopapa KL et al. Development and validation of the Surgical Outcome Risk Tool (SORT). Br J Surg. 2014;101(13):1774-1783.", url: "https://doi.org/10.1002/bjs.9638" },
    { label: "AAGBI Pre-op 2010", citation: "Association of Anaesthetists. Pre-operative assessment and patient preparation. AAGBI Safety Guideline; 2010.", url: "https://anaesthetists.org" },
  ],
  "gynaecological-anaesthesia": [
    { label: "BJA Educ 2011 Lap", citation: "Hayden P, Cowman S. Anaesthesia for laparoscopic surgery. BJA Education (Contin Educ Anaesth Crit Care Pain). 2011;11(5):177-180.", url: "https://doi.org/10.1093/bjaceaccp/mkr027" },
    { label: "BSGE 2018", citation: "British Society for Gynaecological Endoscopy. Management of fluid distension media in operative hysteroscopy. BSGE Guideline; 2018.", url: "https://www.bsge.org.uk/" },
    { label: "BJA Educ 2014 TURP", citation: "Hahn RG. Fluid absorption in endoscopic surgery. Br J Anaesth. 2006;96(1):8-20 — TURP/glycine syndrome (also referenced under urological anaesthesia).", url: "https://doi.org/10.1093/bja/aei279" },
    { label: "ERAS Gynae 2019", citation: "Nelson G et al. Guidelines for perioperative care in gynecologic/oncology surgery: ERAS Society recommendations — 2019 update. Int J Gynecol Cancer. 2019;29(4):651-668.", url: "https://doi.org/10.1136/ijgc-2019-000356" },
  ],
};
