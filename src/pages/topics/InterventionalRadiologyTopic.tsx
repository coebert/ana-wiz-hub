import { SectionLayout } from "@/components/SectionLayout";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { ReferencesList } from "@/components/ReferencesList";
import { interventionalRadiologyQuestions } from "@/data/quizzes";
import ContrastReactionDiagram from "@/components/diagrams/ContrastReactionDiagram";
import { SeeAlso } from "@/components/SeeAlso";

const keyPoints = [
  "Interventional radiology suites are remote locations — ensure full anaesthetic equipment, monitoring, and assistance are available before starting (AAGBI guidelines for anaesthesia in remote locations)",
  "Iodinated contrast media can cause anaphylactoid reactions, contrast-induced nephropathy (CI-AKI), and thyroid storm in hyperthyroidism — pre-hydrate high-risk patients with NaHCO₃ or NaCl",
  "Radiation exposure requires adherence to ALARA principles — wear lead apron, thyroid shield, and dosimeter; maximise distance from the X-ray source; use shielding",
  "TIPSS, embolisation for haemorrhage, and aortic stent-grafting carry significant haemodynamic risks and may require general anaesthesia with full invasive monitoring",
  "Sedation for IR procedures demands the same standards as any anaesthetic — capnography is mandatory for moderate/deep sedation (NAP5 recommendations)",
];

const InterventionalRadiologyTopic = () => {
  return (
    <SectionLayout
      title="Anaesthesia for Interventional Radiology"
      subtitle="Remote location anaesthesia, contrast reactions, radiation safety, and procedure-specific considerations"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
    >
      <div className="space-y-8">
        <KeyLearningPoints points={keyPoints} />
        <ContrastReactionDiagram />

        {/* Remote Location Anaesthesia */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Remote Location Anaesthesia</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              IR suites present unique challenges: unfamiliar environment, limited access to the patient (often within a C-arm), restricted space, and reduced staffing. The <strong className="text-foreground">AAGBI guidelines for anaesthesia outside the operating theatre</strong> mandate the same standards of monitoring, equipment, and assistance.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Essential Preparations</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Self-inflating bag, oxygen supply, suction, and full airway equipment including difficult airway trolley</li>
                <li>Standard monitoring: ECG, SpO₂, NIBP, capnography (mandatory for sedation), temperature</li>
                <li>Invasive monitoring (arterial line, CVC) for major procedures — TIPSS, embolisation, stent-grafting</li>
                <li>Dedicated anaesthetic assistant and ODP; agreed plan for emergency transfer to theatre/ICU</li>
                <li>MRI-conditional equipment if required (some hybrid suites)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contrast Media */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Contrast Media Reactions</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Iodinated Contrast Reactions</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Mild</strong> — urticaria, pruritus, nausea (no treatment or antihistamine)</li>
                <li><strong className="text-foreground">Moderate</strong> — bronchospasm, facial oedema, significant hypotension (adrenaline, IV fluids, bronchodilators)</li>
                <li><strong className="text-foreground">Severe</strong> — anaphylaxis, cardiovascular collapse, laryngeal oedema (full ABCDE, IM/IV adrenaline, call for help)</li>
                <li>Reactions are <strong className="text-foreground">anaphylactoid</strong> (non-IgE-mediated) in most cases — direct histamine release and complement activation</li>
                <li>Risk factors: previous contrast reaction (5× risk), asthma, atopy, renal impairment</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Contrast-Induced Acute Kidney Injury (CI-AKI)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Rise in creatinine ≥25% or ≥44 μmol/L within 72 hours of contrast administration</li>
                <li>Risk factors: pre-existing CKD (eGFR &lt;30), diabetes, dehydration, nephrotoxic drugs, large contrast volume</li>
                <li>Prevention: IV hydration (NaCl 0.9% 1 ml/kg/h for 12h pre and post), use iso-osmolar or low-osmolar contrast, minimise contrast volume</li>
                <li>N-acetylcysteine is no longer routinely recommended (evidence does not support benefit)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Radiation Safety */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Radiation Safety</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              All staff in the IR suite are exposed to ionising radiation. The <strong className="text-foreground">ALARA principle</strong> (As Low As Reasonably Achievable) guides practice.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Radiation Protection Measures</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Distance</strong> — inverse square law: doubling distance reduces exposure by 75%</li>
                <li><strong className="text-foreground">Shielding</strong> — lead apron (0.5 mm Pb equivalent), thyroid shield, lead glasses</li>
                <li><strong className="text-foreground">Time</strong> — minimise time near the radiation source</li>
                <li><strong className="text-foreground">Monitoring</strong> — personal dosimeter (TLD or electronic); pregnant staff require additional monitoring and dose limits</li>
                <li>Annual dose limits: whole body 20 mSv/year; lens of eye 20 mSv/year; extremities 500 mSv/year</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Procedure-Specific */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Procedure-Specific Considerations</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">TIPSS (Transjugular Intrahepatic Portosystemic Shunt)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Patients often have decompensated cirrhosis — coagulopathy, thrombocytopaenia, ascites, encephalopathy</li>
                <li>Usually performed under GA or deep sedation with invasive monitoring</li>
                <li>Risk of hepatic capsule perforation, haemoperitoneum, cardiac arrhythmias (guidewire through hepatic vein/IVC/right atrium)</li>
                <li>Post-procedure: worsening hepatic encephalopathy (portal blood now bypasses the liver)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Embolisation for Haemorrhage</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Emergency setting — patient may be haemodynamically unstable; resuscitation simultaneous with procedure</li>
                <li>Common indications: pelvic fracture bleeding, postpartum haemorrhage, GI bleeding, trauma</li>
                <li>GA often required for agitated/unstable patients; arterial line, large-bore IV access, crossmatched blood</li>
                <li>Post-embolisation syndrome: pain, fever, nausea — common and usually self-limiting</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">EVAR (Endovascular Aortic Repair)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Elective EVAR: may be performed under local/regional anaesthesia with sedation</li>
                <li>Emergency ruptured AAA: GA with invasive monitoring, cell salvage, massive transfusion protocol availability</li>
                <li>Permissive hypotension (systolic 70–80 mmHg) until aortic balloon/stent deployed in ruptured cases</li>
                <li>Complications: endoleak, renal artery occlusion, limb ischaemia, contrast nephropathy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sedation */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sedation for IR Procedures</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Many IR procedures can be performed under local anaesthesia with <strong className="text-foreground">conscious sedation</strong> (midazolam ± fentanyl)</li>
                <li><strong className="text-foreground">Capnography is mandatory</strong> for moderate and deep sedation (NAP5, AAGBI)</li>
                <li>Target-controlled infusion of propofol ± remifentanil for deep sedation/GA</li>
                <li>Patient may need to lie flat and still for prolonged periods — comfort, analgesia, and bladder management are important</li>
                <li>Breath-hold instructions for angiography — coordinate with radiologist; may need apnoeic oxygenation under GA</li>
              </ul>
            </div>
          </div>
        </section>

        <QuizSection questions={interventionalRadiologyQuestions} />

        <ReferencesList topicId="interventional-radiology" />

        <SeeAlso topicId="interventional-radiology" />
        <TopicCompletionToggle topicId="interventional-radiology" topicTitle="Anaesthesia for Interventional Radiology" />
      </div>
    </SectionLayout>
  );
};

export default InterventionalRadiologyTopic;
