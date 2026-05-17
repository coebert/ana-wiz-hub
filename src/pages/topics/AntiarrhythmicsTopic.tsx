import { TopicTemplate } from "@/components/TopicTemplate";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { antiarrhythmicsQuiz } from "@/data/quizzes";
import VaughanWilliamsAPDiagram from "@/components/diagrams/VaughanWilliamsAPDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const drugData = [
  { cls: "Ia", action: "Na⁺ block (intermediate dissociation) + ↑ APD", drugs: "Quinidine, Procainamide, Disopyramide", ecg: "↑ QT, widened QRS", notes: "Use-dependent block. Procainamide for VT & WPW. Risk of torsades." },
  { cls: "Ib", action: "Na⁺ block (fast dissociation), ↓ APD", drugs: "Lidocaine, Mexiletine, Phenytoin", ecg: "Minimal change", notes: "Selective for ischaemic/depolarised tissue. Lidocaine IV for VT." },
  { cls: "Ic", action: "Na⁺ block (slow dissociation), no change APD", drugs: "Flecainide, Propafenone", ecg: "Widened QRS, ↑ PR", notes: "Potent conduction slowing. Avoid post-MI (↑ mortality — CAST trial). Flecainide for SVT/AF with normal heart." },
  { cls: "II", action: "β-adrenoceptor blockade", drugs: "Atenolol, Metoprolol, Esmolol, Bisoprolol", ecg: "↓ HR, ↑ PR", notes: "↓ SA & AV node automaticity, ↓ cAMP. Esmolol ultra-short acting (t½ 9 min). Reduce mortality post-MI." },
  { cls: "III", action: "K⁺ channel blockade → ↑ APD & ERP", drugs: "Amiodarone, Sotalol, Dronedarone", ecg: "↑ QT", notes: "Amiodarone has actions across all 4 classes. Long t½ (~40 days). Pulmonary, thyroid, hepatic, corneal toxicity. Sotalol also has class II activity." },
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
      }}
      diagrams={<VaughanWilliamsAPDiagram />}
      coreConcepts={
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
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground mb-1">Ib — Fast</p>
                <p className="text-muted-foreground">↓ APD. Minimal effect on normal tissue — selectively binds inactivated channels in ischaemic myocardium. Lidocaine is the prototype.</p>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground mb-1">Ic — Slow</p>
                <p className="text-muted-foreground">No change in APD. Markedly slows conduction (phase 0). Contraindicated in structural heart disease (CAST trial — ↑ mortality post-MI).</p>
              </div>
            </div>
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
      }
    />
  );
};

export default AntiarrhythmicsTopic;
