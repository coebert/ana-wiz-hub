import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const StatusEpilepticusNote = () => (
  <NoteLayout
    slug="status-epilepticus"
    title="Status epilepticus: definition, management algorithm and drug doses"
    shortTitle="Status epilepticus"
    description="Status epilepticus management for adults: the 5-minute definition, benzodiazepine first line, levetiracetam, valproate or phenytoin second line, and anaesthesia for refractory seizures."
    datePublished="2026-09-24"
    examTags={["final", "fficm"]}
    lede="Status epilepticus is a seizure lasting 5 minutes or more, or repeated seizures without recovery in between. Treat it as a time-critical emergency: give a benzodiazepine first, a second-line anti-seizure drug if seizures continue, and move to general anaesthesia with intensive care if they still don't stop."
    faqs={[
      {
        q: "What is the definition of status epilepticus?",
        a: "The ILAE 2015 definition for convulsive (tonic–clonic) status uses two time points: treatment should start at 5 minutes (t1), and there is a risk of long-term neuronal injury after 30 minutes (t2). Recurrent seizures without return to baseline between them also count.",
      },
      {
        q: "What is first-line treatment for status epilepticus?",
        a: "A benzodiazepine. In adults: IV lorazepam 0.1 mg/kg (usually 4 mg), repeated once after 5–10 minutes if needed. Without IV access: buccal midazolam 10 mg or rectal diazepam 10–20 mg. Limit benzodiazepines to two doses in total, including any given before hospital.",
      },
      {
        q: "What is second-line treatment?",
        a: "Levetiracetam, sodium valproate or phenytoin. The ESETT trial found them similarly effective (about half of patients stop seizing). UK guidance (NICE 2022) lists all three; many units favour levetiracetam for its safety. Avoid valproate in women and girls who could become pregnant and in suspected liver or mitochondrial disease.",
      },
      {
        q: "What are refractory and super-refractory status epilepticus?",
        a: "Refractory status continues despite a benzodiazepine and one second-line drug; it usually needs anaesthesia (propofol, thiopental or midazolam infusion) with EEG monitoring. Super-refractory status continues, or recurs, 24 hours or more after starting anaesthesia.",
      },
    ]}
    related={[
      { label: "Neurointensive care — full topic", to: "/intensive-care/neurointensive-care" },
      { label: "Neurological co-existing disease", to: "/perioperative/neurological-disease" },
      { label: "Notes index", to: "/notes" },
    ]}
  >
    <h2>Immediate steps (0–5 minutes)</h2>
    <ul>
      <li>ABCDE, high-flow oxygen, protect from injury, note the time of onset.</li>
      <li>Check capillary glucose; treat hypoglycaemia (e.g. 10% glucose IV).</li>
      <li>Give IV thiamine (Pabrinex) before glucose if alcohol misuse or malnutrition is possible.</li>
      <li>IV access, bloods including anti-seizure drug levels, electrolytes (Na⁺, Ca²⁺, Mg²⁺) and a pregnancy test where relevant.</li>
    </ul>

    <h2>Stepwise drug treatment (adults)</h2>
    <p>
      Doses below reflect UK practice; always check your local protocol and the
      BNF, especially in older, frail or renally impaired patients.
    </p>
    <ol>
      <li>
        <strong>5 minutes, first line: benzodiazepine.</strong> IV lorazepam
        0.1 mg/kg (usually 4 mg), repeat once after 5–10 minutes. If no IV
        access, buccal midazolam 10 mg or rectal diazepam 10–20 mg.
      </li>
      <li>
        <strong>After two benzodiazepine doses, second line</strong> (one of):
        <ul>
          <li>Levetiracetam 60 mg/kg IV (max 4.5 g) over 10 minutes.</li>
          <li>Sodium valproate 40 mg/kg IV (max 3 g) over about 10 minutes.</li>
          <li>Phenytoin 20 mg/kg IV at no more than 50 mg/min (or fosphenytoin 20 mg PE/kg), with ECG and blood-pressure monitoring for bradycardia, hypotension and arrhythmia.</li>
        </ul>
      </li>
      <li>
        <strong>About 30 minutes, or if seizures continue: third line.</strong>{" "}
        Call anaesthesia and intensive care. Rapid sequence induction with
        propofol or thiopental, intubation and ventilation, then an anaesthetic
        infusion titrated to seizure control or burst suppression on EEG.
      </li>
    </ol>

    <h2>Anaesthetic and ICU points</h2>
    <ul>
      <li>Rocuronium is a reasonable relaxant; muscle relaxation hides convulsions, so arrange continuous or frequent EEG.</li>
      <li>Suxamethonium can cause dangerous hyperkalaemia after prolonged seizures with rhabdomyolysis.</li>
      <li>Watch for aspiration, hyperthermia, rhabdomyolysis, lactic acidosis and neurogenic pulmonary oedema.</li>
      <li>Look for the cause: drug withdrawal or non-adherence, alcohol, infection (meningitis, encephalitis), stroke, tumour, trauma, eclampsia, metabolic or toxic causes, autoimmune encephalitis.</li>
      <li>Consider eclampsia in any pregnant or recently pregnant woman: give magnesium sulfate.</li>
      <li>Non-convulsive status can follow convulsive status. Suspect it if the patient does not wake up, and confirm on EEG.</li>
    </ul>

    <p>
      For status epilepticus alongside TBI, SAH and brain-death testing, see the{" "}
      <Link to="/intensive-care/neurointensive-care">neurointensive care topic</Link>.
    </p>
  </NoteLayout>
);

export default StatusEpilepticusNote;
