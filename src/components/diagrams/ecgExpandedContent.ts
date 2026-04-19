import type { EcgExpandedContent } from "@/components/diagrams/ExpandableEcgCard";

/**
 * Per-diagram teaching content for the Expand & Learn modal.
 * Kept separate from the diagrams so the wrapper stays generic and the
 * rhythm-strip components don't bloat further.
 */

export const bradyContent: EcgExpandedContent = {
  title: "Bradyarrhythmias — annotated reference",
  summary:
    "Sinus brady, junctional escape, idioventricular and asystole — recognise the escape, find the cause, and decide who needs pacing.",
  annotations: [
    { label: "Sinus bradycardia", value: "Rate 40–59", description: "Upright P in II/III/aVF before every QRS, fixed PR. Common with β-blockers, dexmedetomidine, opioids, raised ICP, athletic conditioning." },
    { label: "Junctional escape", value: "Rate 40–60", description: "Narrow QRS, absent or inverted retrograde P (just before, buried in, or just after the QRS). Emerges when SA node fails or AV block develops." },
    { label: "Idioventricular escape", value: "Rate 20–40", description: "Wide QRS (>120 ms), no P wave dependence. The last-resort escape when both SA node and AV junction are silenced — patient is haemodynamically vulnerable." },
    { label: "Sinus pause / arrest", value: "Pause >3 s", description: "No P, no QRS — flat baseline. >3 s on telemetry triggers RCUK 'risk of asystole' criteria → atropine, isoprenaline, transcutaneous pacing." },
    { label: "Asystole", description: "True flat line in ≥2 leads (rule out lead disconnection in one lead). Non-shockable; CPR + adrenaline 1 mg q3–5 min, search 4 Hs / 4 Ts." },
  ],
  comparison: {
    columns: [
      { key: "rate", label: "Rate" },
      { key: "pWave", label: "P wave" },
      { key: "qrs", label: "QRS" },
      { key: "key", label: "Distinguishing feature" },
    ],
    rows: [
      { label: "Sinus brady", rate: "40–59", pWave: "Upright II, before each QRS", qrs: "Narrow", key: "PR fixed; responds to atropine" },
      { label: "Junctional escape", rate: "40–60", pWave: "Inverted / absent / retrograde", qrs: "Narrow", key: "AV dissociation common; rate fixed by AV junction" },
      { label: "Idioventricular", rate: "20–40", pWave: "Absent or unrelated", qrs: "Wide >120 ms", key: "Last-resort escape — pace urgently" },
      { label: "Sinus arrest", rate: "Variable", pWave: "Absent during pause", qrs: "Absent during pause", key: "Pause >3 s = asystole risk" },
      { label: "SSS / tachy-brady", rate: "Alternates", pWave: "Variable", qrs: "Narrow", key: "AF on telemetry then long pause on conversion" },
    ],
  },
  pitfalls: [
    { mistake: "Calling fine baseline artefact 'asystole'", reality: "Lead disconnection mimics flat-line in one lead.", tip: "Always confirm asystole in ≥2 leads + check pulse before declaring." },
    { mistake: "Giving atropine for Mobitz II / complete heart block", reality: "Block is infranodal — atropine paradoxically worsens it by speeding sinus rate without AV conduction.", tip: "Skip straight to transcutaneous pacing / adrenaline infusion; arrange transvenous wire." },
    { mistake: "Missing hyperkalaemia as the cause", reality: "K⁺ >7 produces sine-wave bradycardia that looks like idioventricular rhythm.", tip: "VBG before any antiarrhythmic in unexplained brady — calcium gluconate first if K⁺ high." },
  ],
  vignettes: [
    { scenario: "76-year-old, 4 h post-inferior STEMI, suddenly bradycardic at 38 bpm with BP 75/40.", ecgFinding: "Narrow-complex sinus brady, ST↑ II/III/aVF, V4R also elevated.", diagnosis: "RCA-territory MI affecting AV nodal artery + RV involvement.", management: "Atropine 500 µg → fluids (RV preload-dependent) → percutaneous pacing pads on; cath lab. Avoid nitrates/morphine." },
    { scenario: "Day-2 ICU patient on dexmedetomidine + remifentanil infusion drops to HR 32, asymptomatic.", ecgFinding: "Sinus bradycardia, normal PR, no ST changes.", diagnosis: "Drug-induced sinus brady.", management: "Pause sedation, glycopyrrolate 200 µg if symptomatic; rarely needs more." },
  ],
};

export const heartBlockContent: EcgExpandedContent = {
  title: "AV block — first, second and third degree",
  summary:
    "PR-interval pattern locates the lesion: nodal blocks tolerate observation, infranodal blocks need pacing.",
  annotations: [
    { label: "1° AV block", value: "PR >200 ms, fixed", description: "Every P conducts but slowly. Usually nodal, benign in isolation. Watch with new BBB (trifascicular risk)." },
    { label: "2° Mobitz I (Wenckebach)", value: "PR lengthens → drop", description: "Progressive PR prolongation until a P fails to conduct, then the cycle resets. Nodal, often vagal/inferior MI, usually benign." },
    { label: "2° Mobitz II", value: "PR fixed → sudden drop", description: "Constant PR with intermittent non-conducted Ps. Infranodal — high risk of progression to complete block. Pace early." },
    { label: "2:1 AV block", value: "Every other P drops", description: "Cannot distinguish I vs II from a 2:1 strip alone. Use QRS width (narrow → likely nodal, wide → likely infranodal) and exercise/atropine response." },
    { label: "3° (complete) AV block", description: "Total AV dissociation — atrial rate independent of ventricular. Escape may be junctional (narrow, 40–60) or ventricular (wide, 20–40)." },
  ],
  comparison: {
    columns: [
      { key: "pWave", label: "P–QRS relation" },
      { key: "qrs", label: "QRS width" },
      { key: "key", label: "Site & implication" },
    ],
    rows: [
      { label: "1°", pWave: "1:1, PR >200 ms", qrs: "Narrow", key: "AV node — observe; risk if combined with BBB" },
      { label: "Mobitz I", pWave: "PR lengthens, then P drops", qrs: "Narrow", key: "AV node — usually benign, atropine works" },
      { label: "Mobitz II", pWave: "Fixed PR, sudden dropped P", qrs: "Often wide (BBB)", key: "Infranodal — pace urgently, will progress", highlight: true },
      { label: "2:1", pWave: "Alternate P conducts", qrs: "Narrow or wide", key: "Ambiguous — width hints at site" },
      { label: "3°", pWave: "Independent atrial & vent rates", qrs: "Narrow (junctional) or wide (vent)", key: "Pace; assess underlying ischaemia" },
    ],
  },
  pitfalls: [
    { mistake: "Treating Mobitz II with atropine", reality: "Speeds sinus rate but block is below the AV node — ratio worsens.", tip: "Pads on, isoprenaline/adrenaline infusion, transvenous wire." },
    { mistake: "Calling a junctional escape 'CHB'", reality: "AV dissociation can occur without block (e.g. accelerated junctional rhythm faster than sinus).", tip: "In CHB the atrial rate exceeds the ventricular rate and Ps march through QRSs at a different cycle length." },
    { mistake: "Missing inferior MI as the cause of new high-grade block", reality: "RCA supplies AV node in 90% — any new AV block plus inferior ST↑ = activate cath lab.", tip: "Check V4R for RV involvement before fluids." },
  ],
  vignettes: [
    { scenario: "Post-TAVI day 1, patient becomes pre-syncopal on standing.", ecgFinding: "Pre-existing RBBB now with new LAFD and PR 280 ms.", diagnosis: "Trifascicular block — high risk of CHB.", management: "Continuous monitoring, pads on; cardiology review for permanent pacemaker." },
    { scenario: "Septic patient, K⁺ 6.4, HR 35, BP 80/45.", ecgFinding: "Wide QRS, slow regular escape, no clear P waves.", diagnosis: "Hyperkalaemic conduction block masquerading as CHB.", management: "10 mL 10% calcium gluconate IV STAT, insulin–dextrose, salbutamol; recheck rhythm in 5 min before pacing." },
  ],
};

export const bbbContent: EcgExpandedContent = {
  title: "Bundle branch & fascicular block",
  summary:
    "Wide QRS with characteristic morphology localises the conduction defect. Matters for STEMI diagnosis (Sgarbossa) and pacing decisions.",
  annotations: [
    { label: "RBBB", value: "QRS >120 ms", description: "rSR' ('M' shape) in V1, broad slurred S in I and V6. Normal axis. Often benign; consider PE if new + sinus tachy." },
    { label: "LBBB", value: "QRS >120 ms", description: "Broad notched R ('M' shape) in I, V5, V6; deep QS in V1. Always abnormal — masks STEMI; apply Sgarbossa." },
    { label: "Left anterior fascicular block (LAFB)", description: "Left axis deviation (–45° to –90°), qR in I/aVL, rS in II/III/aVF, narrow QRS." },
    { label: "Left posterior fascicular block (LPFB)", description: "Right axis deviation (+90° to +180°), rS in I/aVL, qR in II/III/aVF — diagnose only after excluding RVH and lateral MI." },
    { label: "Bifascicular block", description: "RBBB + LAFB (most common) or RBBB + LPFB. Add 1° AV block → 'trifascicular' — high CHB risk." },
  ],
  comparison: {
    columns: [
      { key: "qrs", label: "QRS pattern" },
      { key: "key", label: "Diagnostic clue" },
    ],
    rows: [
      { label: "RBBB", qrs: "rSR' V1, slurred S in I/V6", key: "M-shape in V1, W-shape in V6" },
      { label: "LBBB", qrs: "Broad R in I/V5/V6, QS V1", key: "W-shape V1, M-shape V6 ('WiLLiaM')", highlight: true },
      { label: "LAFB", qrs: "Narrow, LAD –45° to –90°", key: "qR in I/aVL, rS in inferior leads" },
      { label: "LPFB", qrs: "Narrow, RAD +90° to +180°", key: "Diagnosis of exclusion (no RVH, no lateral MI)" },
      { label: "Bifascicular", qrs: "RBBB + LAFB (or LPFB)", key: "Watch for 1° AV block = trifascicular" },
    ],
  },
  pitfalls: [
    { mistake: "Diagnosing STEMI from ST changes in LBBB", reality: "LBBB causes appropriate discordance — ST opposite to QRS.", tip: "Use modified Sgarbossa: concordant ST↑ ≥1 mm (5 pts), concordant ST↓ V1–V3 (3 pts), discordant ST↑ ≥25% of S-wave depth (2 pts) — ≥3 = STEMI." },
    { mistake: "Calling new RBBB 'benign'", reality: "New RBBB in a hypoxic patient = think PE; in an MI patient = septal/proximal LAD lesion — both bad prognostic signs.", tip: "Compare with old ECG; check D-dimer / TTE if PE suspected." },
    { mistake: "Missing LPFB by anchoring on RAD = COPD", reality: "True LPFB needs RAD without RVH or lateral MI.", tip: "Look at lateral leads (lateral MI gives Q waves) and TTE for RV size." },
  ],
  vignettes: [
    { scenario: "65-year-old, central chest pain 2 h, HR 90, BP 140/85.", ecgFinding: "New LBBB, concordant ST↑ 2 mm in V5–V6.", diagnosis: "STEMI-equivalent (Sgarbossa positive).", management: "Activate PPCI pathway; aspirin 300 mg + ticagrelor + heparin per local protocol." },
    { scenario: "Hypoxic post-op patient, sudden tachycardia and hypotension.", ecgFinding: "New RBBB, S1Q3T3, sinus tachy 120.", diagnosis: "Acute pulmonary embolism with right heart strain.", management: "CTPA (if stable) or bedside TTE (if unstable); thrombolysis if massive PE." },
  ],
};

export const tachyContent: EcgExpandedContent = {
  title: "Tachyarrhythmias — narrow vs wide, regular vs irregular",
  summary:
    "Bedside split: width separates SVT from VT, regularity narrows the differential further. RCUK 2021 algorithm.",
  annotations: [
    { label: "Sinus tachycardia", value: "100–180", description: "Upright P before every QRS, normal PR, narrow QRS. Always look for the cause: pain, hypovolaemia, sepsis, PE, hyperthyroid, drugs." },
    { label: "AVNRT", value: "150–220", description: "Narrow regular, no clear P (often buried, retrograde 'pseudo-R' in V1). Vagal then adenosine 6 → 12 → 18 mg." },
    { label: "Atrial flutter", value: "Atrial 250–350, vent 150 (2:1)", description: "Sawtooth flutter waves best seen in II, III, aVF. Suspect when narrow regular tachy is exactly 150 bpm — look for Ps in the ST segments." },
    { label: "Atrial fibrillation", value: "Irregularly irregular", description: "No P waves, fibrillatory baseline, irregular RR. Most common ICU arrhythmia. Treat trigger first (sepsis, electrolytes, fluid balance)." },
    { label: "Monomorphic VT", value: "Wide regular", description: "QRS >120 ms, identical morphology, AV dissociation, fusion / capture beats. Assume VT in any wide-complex tachy with structural heart disease." },
    { label: "Polymorphic VT / torsades", value: "Wide irregular", description: "Twisting QRS axis around baseline. Long QT trigger — magnesium 2 g IV, correct K⁺ and Mg²⁺, stop offending drugs." },
  ],
  comparison: {
    columns: [
      { key: "rate", label: "Rate" },
      { key: "rhythm", label: "Regularity" },
      { key: "qrs", label: "QRS width" },
      { key: "key", label: "Distinguishing feature" },
    ],
    rows: [
      { label: "Sinus tachy", rate: "100–180", rhythm: "Regular", qrs: "Narrow", key: "P before every QRS; treat the cause" },
      { label: "AVNRT", rate: "150–220", rhythm: "Regular", qrs: "Narrow", key: "Adenosine-responsive; pseudo-R in V1" },
      { label: "Flutter 2:1", rate: "~150", rhythm: "Regular", qrs: "Narrow", key: "Sawtooth in II/III/aVF — adenosine unmasks" },
      { label: "AF", rate: "Variable", rhythm: "Irregularly irregular", qrs: "Narrow", key: "No Ps, fibrillatory baseline" },
      { label: "VT", rate: "120–250", rhythm: "Regular", qrs: "Wide >120 ms", key: "AV dissociation, fusion/capture beats", highlight: true },
      { label: "Torsades", rate: "200–250", rhythm: "Irregular", qrs: "Wide, twisting", key: "Long QT trigger; Mg²⁺ 2 g IV" },
      { label: "SVT + aberrancy", rate: "150–200", rhythm: "Regular", qrs: "Wide (BBB shape)", key: "Typical RBBB/LBBB morphology, no AV dissociation" },
    ],
  },
  pitfalls: [
    { mistake: "Treating wide regular tachy as SVT with aberrancy", reality: "In ICU/structural heart disease, ~80% of wide regular tachy is VT.", tip: "If unstable: synchronised DCCV. If stable: amiodarone 300 mg over 20–60 min — works for both." },
    { mistake: "Giving AV-nodal blockers in pre-excited AF", reality: "Verapamil/diltiazem/digoxin/adenosine accelerate conduction down the accessory pathway → VF.", tip: "Wide irregular tachy in WPW = DCCV (or procainamide if stable)." },
    { mistake: "Adenosine for atrial flutter without warning the patient", reality: "Transient AV block reveals flutter waves but feels alarming and converts ~5% to AF.", tip: "Brief explanation, continuous 12-lead recording during push, recovery position." },
    { mistake: "Missing torsades on a 'normal' QTc", reality: "QTc creeps up slowly with sotalol, methadone, ondansetron, haloperidol, hypoMg²⁺.", tip: "Daily QTc check on QT-prolonging drugs; stop drug if QTc >500 ms or 60 ms increase from baseline." },
  ],
  vignettes: [
    { scenario: "Day-3 septic patient, BP drops from 110/70 to 80/45 with sudden HR 165.", ecgFinding: "Narrow irregularly irregular tachy, no P waves.", diagnosis: "New-onset AF in sepsis.", management: "Fix the trigger: K⁺ to 4.5, Mg²⁺ to 1.0, fluids if hypovolaemic; rate control with amiodarone 300 mg if HF, β-blocker otherwise; DCCV if persistently unstable." },
    { scenario: "70-year-old post-MI, sudden collapse on the ward.", ecgFinding: "Wide regular tachy 180, AV dissociation visible.", diagnosis: "Monomorphic VT.", management: "Pulse check → if pulseless, defibrillate; if pulse but unstable, synchronised DCCV under sedation; if stable, amiodarone 300 mg IV over 20–60 min." },
    { scenario: "ICU patient on amiodarone + ondansetron + IV erythromycin develops self-terminating syncopal episodes.", ecgFinding: "QTc 540 ms, runs of polymorphic VT with twisting axis.", diagnosis: "Drug-induced torsades de pointes.", management: "Stop all QT-prolonging drugs, magnesium 2 g IV, K⁺ to >4.5, isoprenaline or overdrive pacing to keep HR >90 (shortens QT)." },
  ],
};

export const twelveLeadContent: EcgExpandedContent = {
  title: "12-lead ECG & STEMI localisation",
  summary:
    "Each lead 'looks at' a region of LV supplied by a specific coronary artery. ST↑ in a territory + reciprocal ST↓ confirms the culprit vessel.",
  annotations: [
    { label: "Anterior leads (V1–V4)", value: "LAD territory", description: "ST↑ in V1–V4 = anterior STEMI. Proximal LAD also affects I, aVL, V5, V6 (anterolateral). Worst prognosis — watch for cardiogenic shock and new LBBB." },
    { label: "Inferior leads (II, III, aVF)", value: "RCA (85%) → PDA", description: "ST↑ + reciprocal ST↓ in I, aVL. Always check V4R for RV involvement (preload-dependent — fluids first, avoid nitrates)." },
    { label: "Lateral leads (I, aVL, V5, V6)", value: "LCx or D1", description: "High lateral (I, aVL) = proximal LCx or D1. Low lateral (V5–V6) = distal LCx or large OM. Reciprocal ST↓ in II, III, aVF." },
    { label: "Posterior leads (V7–V9)", value: "PDA (RCA) or LCx", description: "Tall R + ST↓ in V1–V3 are reciprocal — confirm with V7–V9 placed posteriorly. Often missed if not actively sought." },
    { label: "Right ventricular lead V4R", value: "Proximal RCA", description: "Mandatory in inferior STEMI. ST↑ ≥1 mm = RV infarct → preload-dependent; bolus crystalloid, avoid nitrates, morphine, diuretics." },
    { label: "aVR — the lead everyone ignores", description: "ST↑ in aVR > V1 with diffuse ST↓ = left main / triple-vessel disease until proven otherwise. High-risk presentation." },
  ],
  comparison: {
    columns: [
      { key: "key", label: "Leads with ST↑" },
      { key: "qrs", label: "Reciprocal ST↓" },
      { key: "rhythm", label: "Culprit artery & pearl" },
    ],
    rows: [
      { label: "Anterior", key: "V1–V4", qrs: "(none typical)", rhythm: "LAD — proximal: cardiogenic shock risk" },
      { label: "Anteroseptal", key: "V1–V3", qrs: "—", rhythm: "LAD septal perforators" },
      { label: "Anterolateral", key: "V3–V6, I, aVL", qrs: "II, III, aVF", rhythm: "Proximal LAD or large diagonal" },
      { label: "Inferior", key: "II, III, aVF", qrs: "I, aVL", rhythm: "RCA (85%) — check V4R for RV", highlight: true },
      { label: "Lateral", key: "I, aVL, V5, V6", qrs: "II, III, aVF", rhythm: "LCx or D1" },
      { label: "Posterior", key: "V7–V9 (ST↑); V1–V3 ST↓ + tall R", qrs: "V1–V3 (mirror)", rhythm: "PDA (RCA) or LCx" },
      { label: "Right ventricle", key: "V4R", qrs: "—", rhythm: "Proximal RCA — preload-dependent" },
      { label: "Left main / triple-vessel", key: "aVR > V1", qrs: "Diffuse ST↓", rhythm: "Activate cath lab; high mortality" },
    ],
  },
  pitfalls: [
    { mistake: "Calling ST↓ V1–V3 'anterior ischaemia'", reality: "Often the mirror image of posterior STEMI.", tip: "Place V7–V9; tall R in V1–V2 + upright T = posterior infarct." },
    { mistake: "Withholding nitrates / morphine in inferior STEMI without checking V4R", reality: "30–50% of inferior MIs have RV involvement.", tip: "V4R first — if ST↑, the patient is preload-dependent; load 250–500 mL crystalloid before any vasodilator." },
    { mistake: "Ignoring aVR", reality: "ST↑ in aVR with widespread ST↓ = left main or proximal LAD or triple-vessel disease.", tip: "This pattern carries the highest in-hospital mortality of any ACS — early cath, dual antiplatelet, mechanical support if shocked." },
    { mistake: "Diagnosing STEMI in LBBB by absolute ST↑", reality: "Appropriate discordance produces ST↑ in QS leads.", tip: "Use modified Sgarbossa (≥3 points) or Smith-modified rule." },
  ],
  vignettes: [
    { scenario: "Patient post-ROSC after VF arrest. 12-lead shows ST↑ 3 mm II, III, aVF; ST↓ I, aVL.", ecgFinding: "Inferior STEMI with reciprocal change.", diagnosis: "RCA territory; check V4R.", management: "V4R reveals 2 mm ST↑ — RV infarct. Fluid bolus, avoid nitrates/morphine, immediate PPCI." },
    { scenario: "65-year-old with central chest pain. 12-lead: ST↓ V1–V3 with tall R in V1, ST↑ <1 mm aVF.", ecgFinding: "Posterior + inferior MI pattern.", diagnosis: "PDA (RCA dominant) or LCx occlusion.", management: "Place V7–V9 — confirm posterior STEMI; activate cath lab." },
    { scenario: "Hypotensive patient post-MI with 12-lead showing ST↑ aVR, ST↓ across 8 leads.", ecgFinding: "Diffuse ST↓ + aVR ST↑.", diagnosis: "Left main / triple-vessel disease.", management: "Urgent angiography; consider IABP or Impella for cardiogenic shock; dual antiplatelet, heparin." },
  ],
};
