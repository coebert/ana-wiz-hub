import { TopicTemplate } from "@/components/TopicTemplate";
import { emergencySurgeryQuestions } from "@/data/quizzes";
import { NCEPODClassificationDiagram } from "@/components/diagrams/NCEPODClassificationDiagram";
import { EmergencyRSIDiagram } from "@/components/diagrams/EmergencyRSIDiagram";
import { EmergencyLaparotomyBundleDiagram } from "@/components/diagrams/EmergencyLaparotomyBundleDiagram";
import { EmergencySurgeryGlossaryDrawer } from "@/components/EmergencySurgeryGlossaryDrawer";

const objectives = [
  "Apply the NCEPOD classification to prioritise emergency surgery and resuscitation.",
  "Perform a safe RSI in the haemodynamically unstable, full-stomach emergency patient.",
  "Use risk stratification tools (P-POSSUM, NELA, SORT) to plan level of care and senior involvement.",
  "Resuscitate before/during induction in haemorrhagic shock and select appropriate induction agents.",
  "Apply NELA care-bundle standards to emergency laparotomy.",
];

const keyPoints = [
  "All emergency patients are 'full stomach' — RSI is the default unless awake intubation indicated",
  "Emergency laparotomy mortality 10-15%; NELA standards mandate consultant presence for high-risk cases",
  "Ruptured ectopic: do NOT delay surgery — haemorrhage control IS the resuscitation",
  "Ketamine is the induction agent of choice in haemodynamically unstable emergency patients",
  "Resuscitate before/during induction: correct hypovolaemia, anticipate cardiovascular collapse",
  "Risk stratification (P-POSSUM, NELA calculator) guides level of care and senior involvement",
];

const EmergencySurgeryTopic = () => {
  return (
    <TopicTemplate
      title="Anaesthesia for Emergency Surgery"
      subtitle="FRCA Final / FFICM — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="emergency-surgery"
      topicTitle="Anaesthesia for Emergency Surgery"
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={emergencySurgeryQuestions}
      diagrams={
        <div className="space-y-6">
          <NCEPODClassificationDiagram />
          <EmergencyRSIDiagram />
          <EmergencyLaparotomyBundleDiagram />
        </div>
      }
      sectionExamMapping={{
        objectives: { exams: ["final", "fficm"] },
        diagrams: { exams: ["final", "fficm"] },
        keyPoints: { exams: ["final", "fficm"] },
      }}
      sectionSources={{
        objectives: ["NCEPOD 2011", "NELA Year 9 2023", "RCoA GPAS Ch.5"],
        diagrams: ["DAS 2015", "NELA Year 9 2023", "BJA Educ 2017"],
        keyPoints: ["NELA Year 9 2023", "BJA Educ 2017", "DAS 2015"],
      }}
      coreConcepts={
        <section className="space-y-6 mb-10">
          <div className="flex justify-end">
            <EmergencySurgeryGlossaryDrawer />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Emergency surgery accounts for a significant proportion of anaesthetic workload and carries substantially higher morbidity and mortality than elective procedures. The NCEPOD classification (immediate, urgent, expedited, elective) guides timing. Key challenges include incomplete assessment, full stomach, physiological derangement, and limited time for optimisation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">NCEPOD Classification</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Immediate (1)", value: "Life-saving, resuscitation simultaneous with surgery — e.g. ruptured AAA, ruptured ectopic" },
                { label: "Urgent (2)", value: "Within hours of decision — e.g. perforated viscus, compound fracture, intestinal obstruction" },
                { label: "Expedited (3)", value: "Early surgery but not immediately life-threatening — e.g. acute appendicitis, open fracture debridement" },
                { label: "Elective (4)", value: "Planned procedure at a time to suit both patient and hospital" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Preoperative Considerations</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Aspiration risk</strong>: all emergency patients are assumed to have a full stomach — RSI or awake intubation</li>
              <li><strong>Resuscitation</strong>: correct hypovolaemia, electrolyte abnormalities, and acidosis before or during induction</li>
              <li><strong>Coagulation</strong>: check coagulation status; reverse anticoagulation if actively bleeding</li>
              <li><strong>Consent</strong>: may be limited; document capacity assessment; treat without consent if life-threatening and patient lacks capacity</li>
              <li><strong>Fasting status</strong>: often irrelevant as RSI is indicated regardless; do not delay life-saving surgery for fasting</li>
              <li><strong>Team briefing</strong>: WHO checklist adapted for emergency; clear communication of plan A/B/C</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Emergency Laparotomy</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Emergency laparotomy carries 10–15% overall mortality (NELA data), rising to &gt;25% in high-risk patients. The National Emergency Laparotomy Audit (NELA) has driven quality improvement through standardised care bundles.
            </p>
            <div className="bg-secondary/20 border border-border rounded-lg p-4 space-y-2">
              <p className="font-semibold text-foreground text-sm">NELA Care Bundle Standards</p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Risk assessment documented (P-POSSUM or NELA risk calculator)</li>
                <li>CT within 2 hours of decision if required</li>
                <li>Consultant surgeon and anaesthetist present for high-risk cases (predicted mortality &gt;5%)</li>
                <li>Arrival in theatre within timescale appropriate to urgency</li>
                <li>Goal-directed fluid therapy (cardiac output monitoring if high risk)</li>
                <li>Postoperative critical care admission for high-risk patients</li>
              </ul>
            </div>
            <div className="mt-3 space-y-2">
              <p className="text-sm text-muted-foreground"><strong>Anaesthetic management:</strong></p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>RSI — ketamine preferred if haemodynamically unstable; propofol with caution if stable</li>
                <li>Arterial line and large-bore IV access pre-induction; consider CVC</li>
                <li>Vasopressors drawn up and ready (metaraminol, phenylephrine, or noradrenaline infusion)</li>
                <li>Anticipate large fluid shifts and blood loss — have blood products available</li>
                <li>Epidural for postoperative analgesia (if coagulation normal and patient stable); alternatively rectus sheath block or TAP blocks</li>
                <li>Temperature management — active warming throughout</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Emergency Appendicectomy</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Appendicitis is the most common surgical emergency. Typically affects young, otherwise healthy patients, but elderly patients may present late with perforation and sepsis.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Timing</strong>: NCEPOD expedited (within 6–18 hours); urgent if peritonitis</li>
              <li><strong>Approach</strong>: usually laparoscopic — consider specific pneumoperitoneum effects (↑ IAP, ↓ venous return, ↑ PaCO₂)</li>
              <li><strong>Induction</strong>: RSI (full stomach); standard IV induction if stable</li>
              <li><strong>Analgesia</strong>: simple multimodal — paracetamol, NSAID (if no contraindication), local infiltration, ± opioid</li>
              <li><strong>Antibiotics</strong>: IV co-amoxiclav or cefuroxime + metronidazole at induction</li>
              <li><strong>PONV</strong>: high risk — ondansetron + dexamethasone; consider cyclizine</li>
              <li><strong>Day-case potential</strong>: uncomplicated laparoscopic appendicectomy in selected patients</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ruptured Ectopic Pregnancy</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A life-threatening obstetric emergency. Patients may present with catastrophic haemoperitoneum and haemodynamic collapse. The priority is rapid surgical haemorrhage control.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Classification", value: "NCEPOD immediate — life-saving surgery" },
                { label: "Key concern", value: "Massive haemorrhage; may need ≥4 units PRBC rapidly" },
                { label: "Induction", value: "RSI — ketamine 1-2 mg/kg preferred (haemodynamic stability)" },
                { label: "Access", value: "Two large-bore (14-16G) IVCs; consider intraosseous if peripheral access difficult" },
                { label: "Blood products", value: "Group O Rh-negative immediately; crossmatch ASAP; activate MTP if needed" },
                { label: "Monitoring", value: "Arterial line ASAP (may be placed post-induction); urinary catheter" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground"><strong>Key principles:</strong></p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Do NOT delay surgery for investigations or optimisation — haemorrhage control is the resuscitation</li>
                <li>Prepare for cardiovascular collapse at induction (loss of sympathetic drive)</li>
                <li>Surgeon scrubbed and ready before induction — knife-to-skin within seconds</li>
                <li>Cell salvage may be available but should not delay surgery</li>
                <li>Anti-D immunoglobulin if Rh-negative</li>
                <li>Emotional support — this is a pregnancy loss; debrief team and patient</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intestinal Obstruction</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Patients with bowel obstruction present unique anaesthetic challenges including massive fluid shifts, electrolyte derangement, high aspiration risk, and abdominal compartment syndrome.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Fluid resuscitation</strong>: may need 3–6L crystalloid preoperatively; guided by urine output and lactate</li>
              <li><strong>NG decompression</strong>: reduces gastric volume but does NOT eliminate aspiration risk — still RSI</li>
              <li><strong>Electrolytes</strong>: correct hypokalaemia (from vomiting) and hyponatraemia before induction if possible</li>
              <li><strong>Third-space losses</strong>: ongoing intraoperative losses may be substantial</li>
              <li><strong>Strangulation</strong>: if suspected bowel ischaemia — urgent surgery; anticipate sepsis and metabolic acidosis</li>
              <li><strong>Postoperative</strong>: HDU/ICU admission; ongoing NG drainage; DVT prophylaxis; enhanced recovery principles where applicable</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Risk Scoring in Emergency Surgery</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "P-POSSUM", value: "Physiological and Operative Severity Score — predicts morbidity and mortality" },
                { label: "NELA Risk Calculator", value: "Uses age, ASA, urgency, malignancy, operative severity — validated for emergency laparotomy" },
                { label: "Surgical Apgar Score", value: "Intraoperative score: EBL, lowest MAP, lowest HR — predicts major complications" },
                { label: "SORT", value: "Surgical Outcome Risk Tool — preoperative 30-day mortality prediction" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
    />
  );
};

export default EmergencySurgeryTopic;
