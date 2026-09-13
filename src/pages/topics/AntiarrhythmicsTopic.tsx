import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { antiarrhythmicsQuiz } from "@/data/quizzes";
import VaughanWilliamsAPDiagram from "@/components/diagrams/pharmacology/VaughanWilliamsAPDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const antiarrhythmicsFaqs: Array<[string, string]> = [
  [
    "Outline the Vaughan-Williams classification with examples.",
    "Class I — Na⁺ channel blockers: Ia (procainamide, quinidine — moderate block, prolong AP), Ib (lidocaine — fast block, shortens AP, ventricular only), Ic (flecainide — strong block, no AP change). Class II — β-blockers (atenolol, esmolol). Class III — K⁺ channel blockers prolonging AP (amiodarone, sotalol). Class IV — Ca²⁺ channel blockers (verapamil, diltiazem). Adenosine and digoxin sit outside this classification."
  ],
  [
    "What is the management of unstable AF in theatre?",
    "Unstable (chest pain, hypotension, heart failure, syncope): synchronised DC cardioversion 120–200 J biphasic. Stable: rate control with β-blocker (esmolol, metoprolol) or calcium-channel blocker (avoid in heart failure); amiodarone 300 mg IV over 30 min if needs rhythm control or rate control fails. Anticoagulation considered if AF >48 h or known chronic. Look for and treat precipitants — hypoxia, electrolytes, sepsis, ischaemia, fluid overload."
  ],
  [
    "Why is amiodarone used despite its toxicity profile?",
    "Highly effective for both atrial and ventricular arrhythmias; minimal negative inotropy; safe in heart failure. Toxicity (often dose-/duration-related): pulmonary fibrosis, hepatotoxicity, thyroid dysfunction (contains iodine — both hyper- and hypo-), corneal microdeposits, photosensitivity, peripheral neuropathy. Long half-life ~50 days (huge Vd ~70 L/kg). IV: 5 mg/kg over 30 min via central line (peripheral causes thrombophlebitis); 300 mg push in cardiac arrest after 3rd shock."
  ]
];

const drugData = [
  { cls: "Ia", action: "Na⁺ block (intermediate dissociation) + ↑ APD", drugs: "Quinidine, Procainamide, Disopyramide", ecg: "↑ QT, widened QRS", notes: "Use-dependent block. Procainamide for VT & WPW. Risk of torsades." },
  { cls: "Ib", action: "Na⁺ block (fast dissociation), ↓ APD", drugs: "Lidocaine, Mexiletine, Phenytoin", ecg: "Minimal change", notes: "Selective for ischaemic/depolarised tissue. Lidocaine IV for VT." },
  { cls: "Ic", action: "Na⁺ block (slow dissociation), no change APD", drugs: "Flecainide, Propafenone", ecg: "Widened QRS, ↑ PR", notes: "Potent conduction slowing. Avoid post-MI (↑ mortality — CAST trial). Flecainide for SVT/AF with normal heart." },
  { cls: "II", action: "β-adrenoceptor blockade", drugs: "Atenolol, Metoprolol, Esmolol, Bisoprolol", ecg: "↓ HR, ↑ PR", notes: "↓ SA & AV node automaticity, ↓ cAMP. Esmolol ultra-short acting (t½ 9 min). Reduce mortality post-MI." },
  { cls: "III", action: "K⁺ channel blockade → ↑ APD & ERP", drugs: "Amiodarone, Sotalol, Dronedarone", ecg: "↑ QT", notes: "Sotalol is racemic: l-sotalol has non-selective β-blockade (class II), while both enantiomers block K⁺ channels (class III). Renally excreted; t½ ~12 h. Used for AF/flutter maintenance and ventricular arrhythmias. Dose-related torsades risk rises with hypokalaemia or renal failure; avoid in asthma, marked bradycardia, long-QT syndrome and severe renal failure." },
  { cls: "IV", action: "L-type Ca²⁺ channel blockade", drugs: "Verapamil, Diltiazem", ecg: "↓ HR, ↑ PR", notes: "Slow AV conduction. Verapamil for SVT. Avoid with β-blockers (risk of asystole). Negative inotropy." },
];

const otherAgents = [
  { drug: "Adenosine", mechanism: "A₁ receptor → ↑ K⁺ conductance (IKAdo) → hyperpolarisation of SA/AV nodes", use: "First-line for SVT diagnosis & termination. Half-life 8–10 s. Give rapid IV bolus + flush.", caution: "Bronchospasm, transient asystole, chest tightness. Potentiated by dipyridamole, antagonised by theophylline." },
  { drug: "Digoxin", mechanism: "Na⁺/K⁺-ATPase inhibition → ↑ vagal tone at AV node (+ direct inotrope)", use: "Rate control in AF, especially with heart failure.", caution: "Narrow therapeutic index. Toxicity: nausea, xanthopsia, any arrhythmia (classically bigeminy, slow AF, bidirectional VT)." },
  { drug: "Atropine", mechanism: "Muscarinic (M₂) antagonist → ↑ SA node rate, ↑ AV conduction", use: "Symptomatic bradycardia (ALS algorithm). 500 µg IV, max 3 mg.", caution: "Ineffective in denervated hearts (transplant). Paradoxical bradycardia at very low doses." },
  { drug: "Magnesium", mechanism: "Stabilises membrane potential, blocks Ca²⁺ influx, suppresses EADs", use: "Torsades de pointes, digoxin toxicity, eclampsia. 2 g IV (8 mmol).", caution: "Monitor for hypotension, respiratory depression, loss of reflexes." },
];

const workedExamples: WorkedExample[] = [
  {
    title: "Choosing an antiarrhythmic for new AF with structural heart disease",
    scenario:
      "A 68-year-old with previous anterior MI (LVEF 35%) presents with new-onset fast AF (HR 140, BP 105/65, asymptomatic). The team asks whether flecainide is appropriate to restore sinus rhythm. What is your reasoning and what would you give?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Classify the patient: structural heart disease (ischaemic cardiomyopathy, reduced LVEF) — not a 'normal heart' AF case.</li>
          <li>Recall the CAST trial: class Ic agents (flecainide, encainide) increase mortality post-MI through pro-arrhythmia. Flecainide is contraindicated here.</li>
          <li>Filter the safe options: amiodarone (class III with all-class activity, safe in structural heart disease) or digoxin (rate control, useful in HFrEF).</li>
          <li>Pick the goal: rhythm control with amiodarone IV (300 mg over 1 h, then 900 mg over 23 h via central line); rate control with digoxin if rhythm strategy fails or is inappropriate.</li>
          <li>Plan monitoring: continuous ECG (QT and rhythm), electrolytes (K⁺ &gt;4.0, Mg²⁺ &gt;1.0), thyroid/LFT baseline before amiodarone, and document long-term thyroid/lung/liver surveillance.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Using flecainide because 'AF without WPW' — forgetting the structural-heart-disease exclusion.</li>
            <li>Loading amiodarone peripherally beyond brief use — thrombophlebitis.</li>
            <li>Forgetting that amiodarone potentiates warfarin and digoxin.</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Avoid flecainide (class Ic, contraindicated post-MI per CAST). Use IV amiodarone via a central line (300 mg over 1 h then 900 mg over 23 h) for rhythm control, with electrolyte correction and continuous ECG monitoring. Digoxin is a reasonable rate-control alternative given the reduced LVEF.",
    cites: ["Peck & Hill Ch.12","BJA Educ 2015"],
  },
];
const objectives = [
  "Classify antiarrhythmics by Vaughan-Williams class and explain each mechanism on the cardiac action potential",
  "Distinguish Class I subtypes (Ia/Ib/Ic) by Na⁺ channel kinetics and APD effect",
  "Describe amiodarone's multi-class activity, pharmacokinetics and toxicity profile",
  "Outline the role and dosing of adenosine, digoxin, atropine and magnesium",
  "Recognise pro-arrhythmic risks and CAST-trial implications for structural heart disease",
];

const keyPoints = [
  { text: "Vaughan-Williams classifies antiarrhythmics into 4 classes: I (Na⁺ block), II (β-block), III (K⁺ block), IV (Ca²⁺ block)", cites: ["Peck & Hill Ch.12"] },
  { text: "Class I subdivides by Na⁺ channel dissociation kinetics: Ia (intermediate, ↑ APD), Ib (fast, ↓ APD), Ic (slow, no change APD)", cites: ["BJA Educ 2015"] },
  { text: "Amiodarone has properties of all 4 classes — t½ ~40 days — toxicity: pulmonary fibrosis, thyroid, liver, cornea", cites: ["Vaughan Williams"] },
  { text: "Class Ic drugs (flecainide) are contraindicated post-MI — CAST trial showed ↑ mortality in structural heart disease", cites: ["Peck & Hill Ch.12"] },
  { text: "Adenosine (t½ 8–10 s) is first-line for SVT — acts via A₁ receptor → IKAdo → AV node block", cites: ["BJA Educ 2015"] },
  { text: "Sotalol has both class II (β-block) and class III (K⁺ block) activity — prolongs QT", cites: ["Vaughan Williams"] },
  { text: "All antiarrhythmics carry pro-arrhythmic risk — especially with hypokalaemia and hypomagnesaemia", cites: ["Peck & Hill Ch.12"] },
  { text: "Magnesium is first-line for torsades de pointes — stabilises membrane and suppresses early afterdepolarisations", cites: ["BJA Educ 2015"] },
];

const AntiarrhythmicsTopic = () => {
  return (
    <TopicTemplate
      title="Antiarrhythmic Drugs"
      subtitle="FRCA Primary & Final — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="antiarrhythmics"
      topicTitle="Antiarrhythmic Drugs"
      objectives={objectives}
      keyPoints={keyPoints}
      workedExamples={workedExamples}
      quizQuestions={antiarrhythmicsQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2015",
          "Peck & Hill Ch.12",
          "Vaughan Williams",
        ],
        keyPoints: [
          "BJA Educ 2015",
          "Peck & Hill Ch.12",
          "Vaughan Williams",
        ],
        workedExamples: ["Peck & Hill Ch.12", "BJA Educ 2015"],
      }}
      
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
        <div className="prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Antiarrhythmic drugs modify cardiac ion channels, receptors, or autonomic tone to prevent or terminate abnormal heart rhythms.
              The <strong>Vaughan-Williams classification</strong> groups them by their primary electrophysiological mechanism, though many agents
              have actions spanning multiple classes. Understanding this classification, including its limitations, is core to the FRCA and FFICM curricula.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Vaughan-Williams Classification</h2>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <VaughanWilliamsAPDiagram />
            </div>
            <div className="overflow-x-auto my-4">
              <table className="min-w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Class</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Mechanism</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Drugs</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">ECG Effects</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Key Notes</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  {drugData.map((row) => (
                    <tr key={row.cls} className="border-b border-border/50">
                      <td className="px-3 py-2 font-bold text-foreground">{row.cls}</td>
                      <td className="px-3 py-2">{row.action}</td>
                      <td className="px-3 py-2">{row.drugs}</td>
                      <td className="px-3 py-2">{row.ecg}</td>
                      <td className="px-3 py-2 text-xs">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Sotalol combines class II and III actions; renal elimination, QT prolongation and structural substrate must therefore be considered before prescribing <InlineRef topicId="antiarrhythmics" refLabel="CCM 2000 Proarrhythmia" />.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Class I Subclasses — Na⁺ Channel Kinetics</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Class I agents differ in their rate of dissociation from the Na⁺ channel, which determines their use-dependence and effect on action potential duration (APD):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground mb-1">Ia — Intermediate</p>
                <p className="text-muted-foreground">↑ APD (blocks K⁺ too). Widens QRS <em>and</em> prolongs QT. Effective for both atrial and ventricular arrhythmias.</p>
                <p className="text-xs text-foreground/80 mt-2"><strong>Agents:</strong> procainamide, quinidine, disopyramide. Procainamide remains an option for stable monomorphic VT and pre-excited AF; quinidine has a role in Brugada syndrome and disopyramide in HOCM (negative inotropy is useful there).</p>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground mb-1">Ib — Fast</p>
                <p className="text-muted-foreground">↓ APD. Minimal effect on normal tissue — selectively binds inactivated channels in ischaemic myocardium. Lidocaine is the prototype.</p>
                <p className="text-xs text-foreground/80 mt-2"><strong>Agents:</strong> lidocaine (IV, ventricular arrhythmias in ischaemia), mexiletine (oral analogue, used in long QT3 and refractory VT) and phenytoin (historically for digoxin-induced arrhythmias)<InlineRef topicId="antiarrhythmics" refLabel="CCM 2000 Proarrhythmia" />.</p>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground mb-1">Ic — Slow</p>
                <p className="text-muted-foreground">No change in APD. Markedly slows conduction (phase 0). Contraindicated in structural heart disease (CAST trial — ↑ mortality post-MI).</p>
                <p className="text-xs text-foreground/80 mt-2"><strong>Agents:</strong> flecainide and propafenone (which also has weak β-blocking activity) — used for pharmacological cardioversion and “pill-in-the-pocket” in structurally normal hearts only.</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 mt-4">
              For completeness across the remaining classes: <strong>Class II</strong> — bisoprolol, metoprolol, esmolol (short-acting,
              titratable, ideal in critical care), atenolol, propranolol. <strong>Class III</strong> — amiodarone, sotalol (also class II),
              dronedarone, ibutilide, vernakalant. <strong>Class IV</strong> — verapamil and diltiazem (avoid in reduced ejection
              fraction and with intravenous β-blockade).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Amiodarone — A Multi-Class Agent</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Amiodarone is the most frequently examined antiarrhythmic. It has properties of all four Vaughan-Williams classes:
            </p>
            <div className="overflow-x-auto my-4">
              <table className="min-w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="px-4 py-2 text-left text-foreground font-semibold border-b border-border">Property</th>
                    <th className="px-4 py-2 text-left text-foreground font-semibold border-b border-border">Detail</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  <tr className="border-b border-border/50"><td className="px-4 py-2 font-medium">Class I</td><td className="px-4 py-2">Na⁺ channel blockade (use-dependent)</td></tr>
                  <tr className="border-b border-border/50"><td className="px-4 py-2 font-medium">Class II</td><td className="px-4 py-2">Non-competitive β-blockade</td></tr>
                  <tr className="border-b border-border/50"><td className="px-4 py-2 font-medium">Class III</td><td className="px-4 py-2">K⁺ channel blockade → ↑ APD & ERP (predominant effect)</td></tr>
                  <tr className="border-b border-border/50"><td className="px-4 py-2 font-medium">Class IV</td><td className="px-4 py-2">Ca²⁺ channel blockade</td></tr>
                  <tr className="border-b border-border/50"><td className="px-4 py-2 font-medium">Half-life</td><td className="px-4 py-2">~40–55 days (huge Vd, highly lipophilic, iodinated structure)</td></tr>
                  <tr className="border-b border-border/50"><td className="px-4 py-2 font-medium">Loading</td><td className="px-4 py-2">300 mg IV over 20–60 min (cardiac arrest: bolus), then 900 mg/24 h</td></tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-2 font-medium">Toxicity</td>
                    <td className="px-4 py-2">
                      <strong>Pulmonary fibrosis</strong>, thyroid (hypo- & hyper- due to iodine), hepatotoxicity,
                      corneal microdeposits, peripheral neuropathy, slate-grey skin, photosensitivity
                    </td>
                  </tr>
                  <tr className="border-b border-border/50"><td className="px-4 py-2 font-medium">Interactions</td><td className="px-4 py-2">↑ Digoxin & warfarin levels (CYP inhibition). ↑ QT with other prolonging drugs.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Other Antiarrhythmic Agents</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Several important agents fall outside the Vaughan-Williams classification:
            </p>
            <div className="space-y-3">
              {otherAgents.map((a) => (
                <div key={a.drug} className="rounded-lg p-4 border border-border bg-card">
                  <p className="font-bold text-foreground text-base">{a.drug}</p>
                  <p className="text-foreground/90 text-sm mt-1"><strong>Mechanism:</strong> {a.mechanism}</p>
                  <p className="text-foreground/90 text-sm"><strong>Use:</strong> {a.use}</p>
                  <p className="text-muted-foreground text-xs mt-1"><strong>Caution:</strong> {a.caution}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Limitations of the Vaughan-Williams Classification</h2>
            <p className="text-foreground/90 leading-relaxed">
              The classification is a simplification — many drugs act on multiple channels (e.g. amiodarone, sotalol, propafenone).
              The <strong>Sicilian Gambit</strong> (1991) proposed a more detailed framework linking arrhythmia mechanism
              (re-entry, triggered activity, abnormal automaticity) to the vulnerable parameter and the appropriate drug target.
              While more comprehensive, the Vaughan-Williams system remains the standard for exam purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Pro-Arrhythmic Risk</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              All antiarrhythmics can paradoxically cause arrhythmias:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground/90 text-sm">
              <li><strong>Class Ia & III:</strong> QT prolongation → torsades de pointes (especially with hypokalaemia/hypomagnesaemia)</li>
              <li><strong>Class Ic:</strong> ↑ mortality in structural heart disease (CAST trial, 1989 — flecainide & encainide post-MI)</li>
              <li><strong>Digoxin:</strong> Toxicity causes virtually any arrhythmia — classically bigeminy, slow AF, bidirectional VT</li>
              <li><strong>Risk factors:</strong> ↓K⁺, ↓Mg²⁺, ↑QTc, structural heart disease, renal impairment, drug interactions</li>
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Antiarrhythmic Choice in Structural Heart Disease</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg p-4 border border-border bg-card"><p className="font-bold text-foreground">HFrEF and ischaemic cardiomyopathy</p><p className="text-muted-foreground mt-1">Avoid flecainide and other class Ic drugs after MI or with structural disease, and avoid negatively inotropic verapamil in reduced EF. Evidence-based β-blockade and amiodarone are the usual pharmacological choices; also correct ischaemia, congestion and electrolytes.</p></div>
              <div className="rounded-lg p-4 border border-border bg-card"><p className="font-bold text-foreground">Hypertrophic cardiomyopathy</p><p className="text-muted-foreground mt-1">β-blockers are first line for symptoms and arrhythmia control. Specialist options include amiodarone and disopyramide, whose negative inotropy can reduce dynamic outflow obstruction.</p></div>
              <div className="rounded-lg p-4 border border-border bg-card"><p className="font-bold text-foreground">Arrhythmogenic cardiomyopathy</p><p className="text-muted-foreground mt-1">Sotalol is often used first line, with amiodarone an alternative, alongside ICD assessment and ablation where appropriate. Avoid competitive endurance exercise because it accelerates disease and arrhythmic risk.</p></div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Abnormal substrate magnifies proarrhythmia, so drug choice must accompany specialist rhythm and sudden-death risk assessment <InlineRef topicId="antiarrhythmics" refLabel="CCM 2000 Proarrhythmia" />.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Digoxin Toxicity Management</h2>
            <ul className="list-disc list-inside space-y-1 text-foreground/90 text-sm">
              <li><strong>Features:</strong> nausea, vomiting, anorexia, confusion and xanthopsia; virtually any arrhythmia may occur, including slow or regularised AF, bradycardia, ventricular bigeminy and bidirectional VT.</li>
              <li><strong>Immediate care:</strong> stop digoxin, monitor continuously, check renal function, digoxin concentration and electrolytes, and correct hypokalaemia or hypomagnesaemia carefully. Use atropine for symptomatic bradycardia and magnesium for ventricular arrhythmia.</li>
              <li><strong>Specific antidote:</strong> give digoxin-specific antibody fragments (DigiFab/Digibind) for life-threatening arrhythmia, severe end-organ dysfunction or acute toxicity with K⁺ &gt;5.5 mmol/L; calculate dose from the amount ingested or post-distribution serum level.</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">Do not use electrical cardioversion unless immediately life-saving because it may precipitate ventricular fibrillation; avoid routine calcium in acute digoxin poisoning <InlineRef topicId="antiarrhythmics" refLabel="CCM 2000 Proarrhythmia" />.</p>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Electrical Storm</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Electrical storm is defined as <strong>three or more distinct episodes of sustained VT, VF or appropriate ICD therapies
              within 24 hours</strong>. It is a state of life-threatening electrical instability with high short-term mortality, and
              treatment must simultaneously suppress the arrhythmia, remove triggers and address the underlying substrate<InlineRef topicId="antiarrhythmics" refLabel="JACC 2023 Electrical Storm" />.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground mb-1">Immediate goals</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Terminate and suppress recurrent arrhythmia.</li>
                  <li>Find and correct reversible triggers: ischaemia, electrolyte disturbance, decompensated heart failure, hypoxia, sepsis, drug toxicity or a pro-arrhythmic drug, and inappropriate ICD programming.</li>
                  <li>Support haemodynamics and reduce sympathetic drive.</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground mb-1">Initial management</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Optimise electrolytes: K⁺ &gt;4.5 mmol/L, Mg²⁺ &gt;1.2 mmol/L.</li>
                  <li>Intravenous β-blockade first line — esmolol infusion (titratable) or propranolol; sympathetic blockade is more effective than escalating antiarrhythmics alone.</li>
                  <li>Amiodarone loading 300 mg IV then 900 mg/24 h; lidocaine as an alternative in ischaemic VT.</li>
                  <li>Adequate sedation and analgesia — pain and anxiety from repeated shocks drive further catecholamine release.</li>
                  <li>Reprogramme the ICD (raise VT detection rate, enable anti-tachycardia pacing) to reduce shock burden.</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-foreground/80 mt-3">
              <strong>Escalation for refractory storm:</strong> deep sedation with general anaesthesia and neuromuscular blockade,
              percutaneous stellate ganglion block or thoracic epidural for sympathetic modulation, urgent catheter ablation, overdrive
              pacing for pause-dependent torsades, and mechanical circulatory support (IABP, Impella, VA-ECMO) as a bridge to ablation
              or transplantation.
            </p>
          </section>

          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "Vaughan-Williams: Class I Na⁺ blockers (Ia/Ib/Ic), Class II β-blockers, Class III K⁺ blockers (amiodarone), Class IV Ca²⁺ blockers.",
              "Amiodarone: prolongs APD and QT — risks include pulmonary fibrosis, hepatitis, thyroid dysfunction, corneal deposits and skin photosensitivity.",
              "Adenosine: very short t½ (~10 s); transient AV block — useful diagnostically and to terminate SVT; contraindicated in asthma and 2nd/3rd-degree block.",
              "Pro-arrhythmia is a class effect — Class Ic (flecainide) post-MI worsens mortality (CAST trial).",
              "Digoxin has narrow therapeutic index; toxicity worsened by hypokalaemia, hypomagnesaemia, hypercalcaemia and renal impairment.",
            ]}
          />
        </div>
      </ExamSection>
          <TopicFaqs faqs={antiarrhythmicsFaqs} />
        </>
      }
    />
  );
};

export default AntiarrhythmicsTopic;
