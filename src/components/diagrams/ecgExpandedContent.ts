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

export const wellensContent: EcgExpandedContent = {
  title: "Wellens syndrome — proximal LAD warning",
  summary:
    "Biphasic or deeply inverted T waves in V2–V3 captured during a pain-free window after recent unstable angina. Signals critical proximal LAD stenosis and high risk of imminent anterior MI — refer for early angiography, do not stress test.",
  annotations: [
    { label: "Pattern A", value: "≈ 25%", description: "Biphasic T wave in V2–V3 — initial small positive deflection then sharp symmetric negative deflection. Subtle and easily overlooked on quick eyeballing." },
    { label: "Pattern B", value: "≈ 75%", description: "Deeply (≥ 2 mm) and symmetrically inverted T waves in V2–V3, often spilling into V1 and V4. Striking morphology in an otherwise reassuring (pain-free) patient." },
    { label: "ST segment", value: "Isoelectric or < 1 mm ↑", description: "Crucially the patient is NOT having a STEMI at the moment of the ECG — there is no significant ST elevation. Hence the trap: troponin is often normal too." },
    { label: "R-wave progression", description: "Preserved precordial R waves — there are no Q waves and no loss of R wave height. If Q waves are present, the infarct has already happened." },
    { label: "Clinical context", description: "Recent typical anginal chest pain, now resolved spontaneously or with GTN. ECG is taken in the pain-free interval — pattern can normalise transiently if pain returns ('pseudonormalisation')." },
  ],
  comparison: {
    columns: [
      { key: "twave", label: "T wave V2–V3" },
      { key: "st", label: "ST segment" },
      { key: "rwave", label: "R-wave progression" },
      { key: "key", label: "Implication" },
    ],
    rows: [
      { label: "Wellens A", twave: "Biphasic (+/–)", st: "Isoelectric or < 1 mm", rwave: "Preserved", key: "Critical proximal LAD — early angio" },
      { label: "Wellens B", twave: "Deep symmetric inv ≥ 2 mm", st: "Isoelectric or < 1 mm", rwave: "Preserved", key: "Critical proximal LAD — early angio", highlight: true },
      { label: "Anterior STEMI", twave: "Hyperacute or upright", st: "ST↑ ≥ 2 mm", rwave: "Loss of R wave evolving", key: "Activate cath lab now" },
      { label: "NSTEMI / strain", twave: "Asymmetric T inv", st: "ST↓ horizontal/downsloping", rwave: "Often preserved", key: "Risk-stratify, troponin trend" },
      { label: "Pseudonormalisation", twave: "Reverts to upright when pain returns", st: "May rise during pain", rwave: "Preserved", key: "Re-occlusion — emergency angio" },
      { label: "Persistent juvenile T inv", twave: "Inverted V1–V3, no symptoms", st: "Isoelectric", rwave: "Preserved", key: "Benign — unchanged on serial ECGs" },
    ],
  },
  pitfalls: [
    { mistake: "Stress-testing a pain-free patient with biphasic V2–V3 T waves", reality: "Provoking ischaemia in a critical proximal LAD lesion can precipitate the very anterior MI you were trying to predict.", tip: "Pattern recognition first — if Wellens criteria met, go straight to coronary angiography." },
    { mistake: "Reassuring on the basis of a normal troponin", reality: "Troponin is normal or only minimally elevated in classic Wellens because no infarct has yet occurred — it is a pre-infarction warning sign.", tip: "Treat the ECG pattern + history as the diagnosis; do not wait for troponin to rise." },
    { mistake: "Missing 'pseudonormalisation'", reality: "T waves can transiently revert to upright when pain returns (active ischaemia) — a sign of re-occlusion, not improvement.", tip: "Repeat ECG during pain; compare with the pain-free baseline tracing." },
    { mistake: "Calling V2–V3 T inversion 'old' or 'non-specific'", reality: "Classic Wellens is often mis-coded by triage as a non-specific T-wave abnormality.", tip: "Any new T inversion in V2–V3 with a recent angina history needs cardiology review before discharge." },
  ],
  vignettes: [
    { scenario: "58-year-old man, two days of intermittent central chest pain, last episode 4 h ago. Now pain-free. ED triage ECG.", ecgFinding: "Deep symmetric T inversions V2–V4, isoelectric ST, preserved R waves. Initial troponin 18 ng/L (just above URL).", diagnosis: "Wellens syndrome — pattern B.", management: "Admit, dual antiplatelet + fulvarinox-anticoagulation per local ACS protocol, in-patient coronary angiography within 24 h. Avoid stress test. Cath shows 95% proximal LAD stenosis → PCI with DES." },
    { scenario: "47-year-old female, atypical chest pain at rest, GTN-responsive, now asymptomatic in observation unit.", ecgFinding: "Biphasic T waves V2–V3 (positive then negative), no ST elevation, troponin negative ×2.", diagnosis: "Wellens pattern A — risk of imminent anterior MI.", management: "Cardiology referral for inpatient angiography; do NOT discharge home and do NOT do a treadmill test. Symptom-limited mobilisation only until cath." },
    { scenario: "Patient on the cardiac ward with known Wellens pattern B, suddenly develops chest pain.", ecgFinding: "Repeat ECG — T waves now upright in V2–V3 with 1 mm ST elevation appearing.", diagnosis: "Pseudonormalisation — proximal LAD re-occlusion.", management: "Activate primary PCI pathway immediately; treat as evolving anterior STEMI." },
  ],
};
  title: "EEG patterns — sedation, seizures and post-arrest",
  summary:
    "Recognise the dominant rhythm by frequency band (β/α/θ/δ), spot suppression and ictal patterns, and use the same scaffold for processed-EEG depth monitoring and post-arrest prognostication.",
  annotations: [
    { label: "Beta (β)", value: "13–30 Hz", description: "Awake, alert, eyes open. Also seen with benzodiazepine 'beta buzz' over the frontal leads." },
    { label: "Alpha (α)", value: "8–13 Hz", description: "Posterior dominant rhythm with eyes closed. 'Alpha coma' (anteriorised, non-reactive) is a poor post-arrest sign." },
    { label: "Theta (θ)", value: "4–8 Hz", description: "Drowsiness, light sleep, moderate sedation; appears under propofol / volatile MAC ~0.5." },
    { label: "Delta (δ)", value: "0.5–4 Hz", description: "Deep sleep, deep anaesthesia, encephalopathy. Generalised δ in a non-sedated patient = worry." },
    { label: "Burst-suppression", description: "Bursts of mixed activity separated by ≥1 s of suppression (<5 µV). Targeted in refractory status epilepticus and seen with deep anaesthesia, hypothermia, severe HIE." },
    { label: "Generalised periodic discharges (GPDs)", description: "Stereotyped epileptiform discharges at fixed intervals. After cardiac arrest, GPDs at >2 Hz on a continuous background may be ictal — treat and reassess." },
    { label: "Highly malignant patterns (post-arrest)", description: "Suppression (<10 µV all channels), burst-suppression with identical bursts, suppression + periodic discharges. ESICM/ERC class as 'highly malignant' — strong predictor of poor outcome at ≥24 h." },
  ],
  comparison: {
    columns: [
      { key: "rate", label: "Frequency / pattern" },
      { key: "key", label: "Clinical context" },
    ],
    rows: [
      { label: "β buzz", rate: "13–30 Hz, frontal", key: "Benzodiazepine effect; light sedation" },
      { label: "α posterior dominant", rate: "8–13 Hz, occipital", key: "Awake, eyes closed" },
      { label: "α coma", rate: "8–13 Hz, anterior, non-reactive", key: "Poor post-arrest sign", highlight: true },
      { label: "θ slowing", rate: "4–8 Hz", key: "Light–moderate sedation, mild encephalopathy" },
      { label: "δ slowing", rate: "0.5–4 Hz", key: "Deep anaesthesia or severe encephalopathy" },
      { label: "Burst-suppression", rate: "Bursts + ≥1 s flat", key: "Deep anaesthesia, RSE target, severe HIE", highlight: true },
      { label: "Status epilepticus", rate: "Continuous spike-wave / rhythmic >2.5 Hz", key: "Treat as seizure; load AED" },
      { label: "Suppressed background", rate: "<10 µV all channels", key: "Highly malignant post-arrest" },
    ],
  },
  pitfalls: [
    { mistake: "Calling burst-suppression 'good news' post-arrest", reality: "Identical-burst burst-suppression at ≥24 h is highly malignant; only heterogeneous bursts on a continuous background are reactive.", tip: "Look at burst morphology and reactivity to stimulation before prognosticating." },
    { mistake: "Diagnosing seizures from frontal EMG artefact on processed EEG", reality: "Shivering / frontalis EMG inflates BIS and SEF, mimicking arousal.", tip: "Look at the raw EEG / DSA, not just BIS number; use forehead muscle relaxation if shivering." },
    { mistake: "Stopping sedation while paralysed", reality: "Awareness with NMB is catastrophic; BIS alone has poor sensitivity in TIVA.", tip: "Use processed EEG + clinical context (HR, lacrimation) and avoid prolonged paralysis without confirmed sedation depth." },
    { mistake: "Prognosticating before 72 h off sedation", reality: "Sedatives, hypothermia and renal/hepatic impairment delay clearance and confound EEG.", tip: "ERC: multimodal prognostication ≥72 h post-ROSC after sedation washout." },
  ],
  vignettes: [
    { scenario: "Day-1 post-VF arrest, TTM 36 °C, intubated on propofol + remifentanil. cEEG shows continuous, reactive δ–θ background with no epileptiform activity.", ecgFinding: "Continuous reactive background, no GPDs.", diagnosis: "Benign post-arrest pattern.", management: "Continue current TTM; defer prognostication to ≥72 h, multimodal." },
    { scenario: "Day-2 post-arrest, off sedation 24 h. cEEG shows identical bursts every 6 s on a flat background, no reactivity.", ecgFinding: "Identical-burst burst-suppression, unreactive.", diagnosis: "Highly malignant pattern.", management: "Combine with NSE (>60 µg/L), bilaterally absent N20 SSEP, MRI DWI lesions; family discussion ≥72 h." },
    { scenario: "Theatre case under TIVA, BIS 60 → 90 with HR up; surgeon says diathermy is on.", ecgFinding: "BIS spike with high SQI; raw EEG unchanged.", diagnosis: "Diathermy artefact.", management: "Confirm raw EEG, ignore BIS spike; do not bolus propofol on artefact alone." },
  ],
};

export const postArrestProgContent: EcgExpandedContent = {
  title: "Post-cardiac-arrest neuroprognostication timeline",
  summary:
    "ERC 2021 multimodal framework: combine clinical exam, EEG, SSEP, biomarkers and MRI from ≥72 h post-ROSC, after sedation washout and normothermia.",
  annotations: [
    { label: "0–24 h", description: "Stabilise (TTM, MAP, SpO₂, normocapnia). NO prognostication — too many confounders. Manage seizures aggressively." },
    { label: "24–48 h", description: "NSE day 1 baseline. Rising trend over 48–72 h is more predictive than absolute value. cEEG to detect non-convulsive seizures." },
    { label: "48–72 h", description: "Bilaterally absent pupillary + corneal reflexes off sedation, status myoclonus, NSE >60 µg/L at 48–72 h all carry FPR <5% for poor outcome (when combined)." },
    { label: "≥72 h (multimodal)", description: "ERC algorithm: 2 of {bilaterally absent N20 SSEP, highly malignant EEG, diffuse MRI DWI lesions, NSE >60 at 48–72 h, status myoclonus, no pupil/corneal reflexes} — robust prediction of poor neurological outcome." },
    { label: "Confounders to exclude first", description: "Sedation, NMB, hypothermia, severe metabolic derangement, hypotension, hepatic/renal failure — all delay or mimic poor exam findings." },
  ],
  comparison: {
    columns: [
      { key: "rate", label: "Earliest reliable timing" },
      { key: "key", label: "Cut-off / interpretation" },
    ],
    rows: [
      { label: "Pupillary + corneal reflexes", rate: "≥72 h, off sedation", key: "Bilaterally absent — strong predictor", highlight: true },
      { label: "Status myoclonus", rate: "<48 h, persistent", key: "Combine with EEG (Lance–Adams reactive ≠ poor)" },
      { label: "EEG (highly malignant)", rate: "≥24 h, ideally ≥72 h", key: "Suppression / identical burst-suppression / suppression + periodic discharges" },
      { label: "SSEP N20", rate: "24–72 h", key: "Bilaterally absent N20 — robust predictor when no confounders", highlight: true },
      { label: "NSE", rate: "48 + 72 h trend", key: ">60 µg/L at 48–72 h or rising trend (haemolysis falsely elevates)" },
      { label: "MRI DWI", rate: "2–7 days", key: "Diffuse cortical + deep grey matter restriction" },
    ],
  },
  pitfalls: [
    { mistake: "Prognosticating at 24 h on clinical exam alone", reality: "Hypothermia + sedatives confound; FPR is unacceptable.", tip: "Wait ≥72 h, off sedation, normothermic." },
    { mistake: "Using a single modality", reality: "Each test has FPR 0–10%; combining ≥2 brings FPR <1%.", tip: "Always multimodal; document every test before discussing withdrawal." },
    { mistake: "Calling Lance–Adams 'status myoclonus'", reality: "Lance–Adams is post-anoxic action myoclonus with preserved consciousness — survivors recover function.", tip: "Status myoclonus = generalised, continuous, comatose patient; needs EEG to differentiate." },
    { mistake: "Treating elevated NSE as definitive", reality: "Haemolysis (sample handling, ECMO), neuroendocrine tumours falsely elevate NSE.", tip: "Always trend over 48–72 h and combine with other modalities; reject haemolysed samples." },
  ],
  vignettes: [
    { scenario: "OHCA, downtime 12 min, ROSC after 25 min CPR. Day 3 off sedation 48 h: GCS M1, absent pupil + corneal reflexes, NSE 95 → 120 µg/L, identical-burst BS on EEG, bilaterally absent N20.", ecgFinding: "≥4 unfavourable modalities concordant.", diagnosis: "Poor neurological outcome highly likely.", management: "MDT + family meeting; consider WLST and organ donation pathway." },
    { scenario: "Day 3 post-arrest, TTM 36 °C complete. NSE 38 µg/L, EEG continuous reactive background, SSEP N20 present bilaterally, GCS M4 to pain.", ecgFinding: "All favourable modalities.", diagnosis: "Recovery possible — continue active care.", management: "Wean sedation, daily SAT/SBT, intensive neuro-rehab planning." },
  ],
};

export const dsaSpectrogramContent: EcgExpandedContent = {
  title: "Density spectral array (DSA) — anaesthetic depth at a glance",
  summary:
    "DSA plots EEG power vs frequency over time as a heat map. Pattern recognition (frontal α band, slow waves, burst-suppression) is more robust than any single index value.",
  annotations: [
    { label: "X axis", value: "Time", description: "Last ~10 min scrolling left → right. Lets you see drift before the BIS number does." },
    { label: "Y axis", value: "0–30 Hz", description: "Power per frequency bin. Lower = δ/θ, mid = α, upper = β. Different anaesthetics have signature patterns." },
    { label: "Colour intensity", description: "Red/yellow = high power, blue = low power. A clean horizontal red band at 8–12 Hz = strong frontal α (adequate propofol/volatile depth)." },
    { label: "Frontal α band (8–12 Hz)", value: "Adequate depth", description: "Strong continuous α band on DSA = unconsciousness with propofol or sevoflurane. Loss of α suggests light plane OR very deep / burst-suppression." },
    { label: "Slow-δ band (<1 Hz)", description: "Co-exists with α at maintenance depth. Increases relative to α as depth increases." },
    { label: "Burst-suppression on DSA", description: "Vertical multi-frequency stripes separated by near-blue (silent) gaps — looks like a 'bar code'. Avoid in elderly / frail unless targeting RSE." },
    { label: "Ketamine pattern", description: "Loss of α, prominent β/γ activity → DSA shows shift to higher frequencies even at deep planes." },
    { label: "Dexmedetomidine pattern", description: "Resembles natural sleep — slow-wave activity dominates with preserved spindles." },
  ],
  comparison: {
    columns: [
      { key: "key", label: "DSA signature" },
      { key: "rhythm", label: "Clinical implication" },
    ],
    rows: [
      { label: "Strong frontal α + slow-δ", key: "Continuous red band 8–12 Hz", rhythm: "Adequate propofol / volatile depth" },
      { label: "Loss of α", key: "Power collapses below 8 Hz", rhythm: "Light plane → risk of awareness", highlight: true },
      { label: "Burst-suppression", key: "Bar-code stripes with blue gaps", rhythm: "Too deep — ↑ delirium / mortality risk in elderly" },
      { label: "Isoelectric", key: "Uniformly blue", rhythm: "Profound suppression — wake the patient up" },
      { label: "Ketamine pattern", key: "High β/γ, no α band", rhythm: "Adequate dissociative depth — BIS unreliable" },
      { label: "Dexmedetomidine", key: "Slow-wave dominant, spindles", rhythm: "Sleep-like sedation, easily rousable" },
    ],
  },
  pitfalls: [
    { mistake: "Trusting BIS over DSA in elderly patients", reality: "Brain ageing reduces α power → BIS reads low even at adequate depth, prompting harmful overdose.", tip: "Look at DSA for α-band presence; titrate to pattern, not a number." },
    { mistake: "Calling burst-suppression 'good depth'", reality: "BS exposure increases delirium and 1-year mortality in elderly.", tip: "Aim for continuous α + δ; reduce dose if BS appears unintentionally." },
    { mistake: "Using DSA / BIS alone to detect awareness on TIVA + NMB", reality: "DSA lag is 30–60 s; awareness can occur before pattern changes.", tip: "Combine processed EEG with end-tidal anaesthetic / TIVA TCI targeting and clinical signs." },
    { mistake: "Ignoring electrode artefact", reality: "Diathermy, EMG, and dried gel produce broadband colour that mimics arousal.", tip: "Check signal quality index; re-prep skin if SQI <80%." },
  ],
  vignettes: [
    { scenario: "82-year-old, hip fracture under TIVA. BIS 38, surgeon happy. DSA shows bar-code burst-suppression for 20 min.", ecgFinding: "Bar-code BS on DSA despite 'normal' BIS.", diagnosis: "Inadvertent over-sedation in a vulnerable brain.", management: "Reduce propofol TCI by 0.5 µg/mL, watch DSA recover continuous α + δ; document to mitigate POD risk." },
    { scenario: "Young trauma patient on ketamine + propofol TIVA. BIS reads 70, you panic.", ecgFinding: "DSA shows shift to β/γ, no α band — typical ketamine pattern.", diagnosis: "Ketamine confounds BIS; depth is adequate.", management: "Trust the pattern, avoid bolus propofol on BIS alone; clinical signs (BP, HR, lacrimation) more useful." },
  ],
};

export const bisTrendContent: EcgExpandedContent = {
  title: "BIS trend — interpreting the index over time",
  summary:
    "BIS is a 0–100 dimensionless index from a proprietary algorithm. The trend line — and its agreement with the DSA — matters more than any one number.",
  annotations: [
    { label: "BIS 100", description: "Awake, eyes open, responsive." },
    { label: "BIS 80–90", description: "Light sedation; recall of auditory stimuli possible." },
    { label: "BIS 60–80", description: "Moderate–deep sedation; loss of explicit recall around 65." },
    { label: "BIS 40–60", value: "General anaesthesia target", description: "Recommended target range for general anaesthesia. Awareness rare but not zero (esp. with NMB on TIVA)." },
    { label: "BIS 20–40", description: "Deep hypnotic state; risk of burst-suppression." },
    { label: "BIS <20 / 0", description: "Burst-suppression or isoelectric — too deep; check DSA, reduce dose." },
    { label: "Signal quality index (SQI)", value: "Aim >80%", description: "Low SQI = artefact (sweat, EMG, electrode lift). Don't act on BIS values when SQI <50%." },
    { label: "Suppression ratio (SR)", description: "Percentage of time the EEG is suppressed in the last 63 s. SR >0% means burst-suppression — likely too deep." },
    { label: "EMG bar", description: "High EMG (frontalis activity) inflates BIS — common in light NMB or under-sedation. Always cross-check." },
  ],
  comparison: {
    columns: [
      { key: "rate", label: "BIS range" },
      { key: "key", label: "Clinical state" },
      { key: "rhythm", label: "Action" },
    ],
    rows: [
      { label: "Awake", rate: "100–90", key: "Eyes open, responsive", rhythm: "Pre-induction baseline" },
      { label: "Sedation", rate: "90–60", key: "Conscious sedation; recall possible >70", rhythm: "Procedural sedation target" },
      { label: "GA target", rate: "60–40", key: "Unconsciousness, no recall", rhythm: "Maintain; avoid drift", highlight: true },
      { label: "Deep hypnosis", rate: "40–20", key: "Risk of BS, especially elderly", rhythm: "Reduce dose unless RSE target" },
      { label: "Suppression", rate: "<20", key: "Burst-suppression / isoelectric", rhythm: "Wake up — ↑ POD / mortality" },
    ],
  },
  pitfalls: [
    { mistake: "Treating BIS as a stand-alone awareness monitor", reality: "B-Aware and B-Unaware trials show no clear advantage over end-tidal MAC monitoring; awareness still occurs at BIS 40–60.", tip: "Use BIS + ETMAC + DSA + clinical signs. NMB-paralysed TIVA is highest risk — never paralyse without confirmed depth." },
    { mistake: "Bolus propofol on a transient BIS spike", reality: "Diathermy, EMG, sudden movement, and warming blankets all spike BIS.", tip: "Check SQI, EMG bar, and DSA before reacting; transient spikes <30 s rarely reflect arousal." },
    { mistake: "Targeting BIS 40 in elderly to 'be safe'", reality: "Lower BIS targets increase BS exposure and POD without reducing awareness.", tip: "BIS 50–60 with continuous α on DSA is safer in >70-year-olds." },
    { mistake: "Ignoring suppression ratio", reality: "BIS may stay 40–50 while SR creeps up — depth is uneven.", tip: "Watch SR; >0% sustained = back off the propofol/volatile." },
  ],
  vignettes: [
    { scenario: "Maintenance sevoflurane 1.0 MAC, BIS 28, SR 18%. Patient is 78, ASA 3.", ecgFinding: "BIS too low, SR creeping, DSA shows bar-code BS.", diagnosis: "Excessive depth in vulnerable brain — POD risk.", management: "Reduce sevoflurane to 0.8 MAC, watch BIS trend up to 45–55 and SR fall to 0; document for handover." },
    { scenario: "Laparoscopy, sudden BIS jump 40 → 78 with high EMG bar; surgeon using diathermy.", ecgFinding: "Transient artefact spike during diathermy.", diagnosis: "Diathermy / EMG artefact, not arousal.", management: "Confirm with DSA (unchanged α band), don't bolus; if BIS stays high after diathermy off, then assess depth properly." },
    { scenario: "TIVA + rocuronium, BIS 65 sustained for 5 min, raw EEG flat-ish, no clinical signs.", ecgFinding: "BIS borderline with paralysed patient.", diagnosis: "Possible inadequate depth — high stakes with NMB.", management: "Increase propofol TCI by 0.5 µg/mL, recheck DSA for α band re-emergence; document and consider isolated forearm if persistent." },
  ],
};
