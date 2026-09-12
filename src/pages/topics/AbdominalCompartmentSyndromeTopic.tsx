import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { abdominalCompartmentSyndromeQuestions } from "@/data/quizzes";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { InlineRef } from "@/components/references/InlineRef";

const abdominalCompartmentSyndromeFaqs: Array<[string, string]> = [
  ["How is intra-abdominal pressure measured and what defines ACS?", "Bladder pressure with 25 mL saline at end-expiration, supine, transduced at the mid-axillary line; intra-abdominal hypertension ≥12 mmHg, ACS = sustained IAP >20 mmHg with new organ dysfunction (WSACS 2013)."],
  ["What are the physiological consequences of raised intra-abdominal pressure?", "Reduced venous return and CO, raised airway pressure with reduced FRC, oliguria from renal venous congestion, raised ICP from impaired cerebral venous drainage, and gut ischaemia from reduced splanchnic perfusion."],
  ["What are the non-surgical options before decompressive laparotomy?", "Nasogastric and rectal decompression, neuromuscular blockade, prokinetics, percutaneous drainage of ascites, deep sedation, and conservative fluid strategy; surgery is reserved for refractory ACS with organ failure."],
];

const objectives = [
  "Define intra-abdominal hypertension (IAH) and abdominal compartment syndrome (ACS) using WSACS 2013 criteria.",
  "Measure intra-abdominal pressure (IAP) correctly via the intravesical (Foley) technique and interpret the IAH grading.",
  "Recognise primary, secondary and recurrent ACS and the at-risk populations (trauma, burns, pancreatitis, massive resuscitation, post-laparotomy).",
  "Apply the WSACS medical management algorithm to lower IAP (sedation, NMB, decompression of hollow viscera, fluid balance, escharotomy).",
  "Identify the indications and techniques for surgical decompression and the management of the resulting open abdomen.",
  "Counsel on prognosis: ACS independently increases mortality, AKI, prolonged ventilation and ICU length of stay.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Post-laparotomy oliguria with rising airway pressures",
    scenario: (
      <>
        72-year-old, day 1 post emergency laparotomy for perforated diverticulitis. Received 9 L crystalloid intra-op.
        Now distended abdomen, plateau pressure risen from 22 → 34 cmH₂O, MAP 62 on increasing noradrenaline,
        urine output 8 mL/h, lactate 3.8. Bladder pressure (end-expiration, supine, 25 mL saline) = 24 mmHg.
      </>
    ),
    working: (
      <>
        Sustained IAP ≥ 20 mmHg with new organ dysfunction (oliguric AKI, refractory shock, ventilatory failure)
        = ACS (WSACS 2013). This is primary ACS from the intra-abdominal pathology and aggressive resuscitation.
        Start the WSACS medical bundle and prepare for surgical decompression if IAP fails to fall within hours.
      </>
    ),
    answer: (
      <>
        Deepen sedation, give a trial of NMB, NG decompression and rectal tube, stop maintenance fluid, give 20 % HAS
        + furosemide or initiate RRT for negative balance, head-up &lt; 20°. Reassess IAP hourly. If IAP remains
        ≥ 20 mmHg with organ failure, proceed to <strong>decompressive laparotomy</strong> and leave open abdomen with
        a negative-pressure temporary closure (e.g. ABThera).
      </>
    ),
    cites: ["WSACS 2013"],
  },
  {
    title: "Severe burns and secondary ACS",
    scenario: (
      <>
        45 % TBSA flame burn, 80 kg. By 18 h has received 24 L Hartmann's (Parkland-guided). Abdomen tense, peak
        pressures 38 cmH₂O, IAP 28 mmHg, anuric for 4 h, CVP 22.
      </>
    ),
    working: (
      <>
        Secondary ACS from massive resuscitation without intra-abdominal injury. Risk is &gt; 10 % once volumes
        exceed 250 mL/kg/24 h. Aggressive medical management first; escharotomy if circumferential torso eschar
        contributes to abdominal-wall non-compliance.
      </>
    ),
    answer: (
      <>
        Stop crystalloid, switch to 5 % albumin / 20 % HAS for ongoing losses, deepen sedation + NMB, decompress
        stomach and rectum, escharotomy of torso eschar. Trial percutaneous catheter drainage if free intraperitoneal
        fluid on US. Decompressive laparotomy if IAP &gt; 20 mmHg with organ failure persists despite the above.
        Mortality of established ACS in this group exceeds 50 %.
      </>
    ),
    cites: ["WSACS 2013"],
  },
  {
    title: "Measuring IAP correctly",
    scenario: (
      <>
        The night SHO records "bladder pressure 18 mmHg" in a semi-recumbent septic patient who is coughing on the
        tube. They are about to call surgery.
      </>
    ),
    working: (
      <>
        IAP must be measured: supine, end-expiration, no abdominal muscle contraction (deepen sedation ± NMB),
        transducer zeroed at the mid-axillary line at the iliac crest, 25 mL of saline instilled into an empty
        bladder via the Foley, read after 30–60 s equilibration. Patient position, PEEP, coughing and a full
        rectum all falsely elevate the value.
      </>
    ),
    answer: (
      <>
        Repeat the measurement supine, end-expiration, fully sedated, transducer at iliac-crest mid-axillary line,
        25 mL saline instilled. If sustained ≥ 12 mmHg → IAH; ≥ 20 mmHg + new organ failure → ACS. Trend rather
        than single values, every 4–6 h in at-risk patients.
      </>
    ),
    cites: ["WSACS 2013"],
  },
];

const keyPoints = [
  { text: "Normal IAP in the critically ill ≈ 5–7 mmHg. IAH = sustained IAP ≥ 12 mmHg. ACS = sustained IAP ≥ 20 mmHg WITH new organ dysfunction (WSACS 2013).", cites: ["WSACS 2013"] },
  { text: "Grades: I 12–15, II 16–20, III 21–25, IV > 25 mmHg. Risk of organ failure rises steeply above grade III.", cites: ["WSACS 2013"] },
  { text: "Measure via Foley: supine, end-expiration, 25 mL saline, transducer zeroed at mid-axillary line at iliac crest, no abdominal contraction.", cites: ["WSACS 2013"] },
  { text: "Primary ACS = intra-abdominal/pelvic pathology (trauma, ruptured AAA, pancreatitis, peritonitis). Secondary ACS = extra-abdominal cause, typically massive resuscitation (burns, sepsis). Recurrent ACS = re-develops after decompression.", cites: ["WSACS 2013"] },
  { text: "Pathophysiology is global: ↓ venous return, ↓ CO, ↑ SVR; ↑ ITP → ↓ FRC, ↑ plateau pressures, V/Q mismatch; renal vein compression + ↓ RBF → AKI; ↑ ICP via ↑ CVP; gut ischaemia and bacterial translocation; hepatic congestion.", cites: ["WSACS 2013"] },
  { text: "Abdominal perfusion pressure (APP = MAP − IAP) ≥ 60 mmHg correlates with survival better than IAP alone — the resuscitation target in IAH.", cites: ["WSACS 2013"] },
  { text: "WSACS medical bundle (5 domains): (1) evacuate intraluminal contents (NG, rectal tube, prokinetics); (2) evacuate intra-abdominal collections (percutaneous drain); (3) improve abdominal-wall compliance (sedation, NMB, escharotomy, head-up < 20°); (4) optimise fluid balance (avoid positive balance, HAS + diuretic, RRT); (5) optimise systemic perfusion (APP-guided).", cites: ["WSACS 2013"] },
  { text: "Surgical decompression: indicated for ACS unresponsive to medical management. Midline laparotomy left open with temporary abdominal closure (Bogotá bag, Wittmann patch, ABThera negative-pressure dressing). Aim for delayed primary fascial closure within 7–10 days.", cites: ["WSACS 2013"] },
  { text: "Risk factors to screen 4–6-hourly: massive resuscitation (> 3.5 L/24 h crystalloid), damage-control laparotomy, severe pancreatitis, major burns > 30 % TBSA, ileus, prone position, high PEEP, capillary leak, intra-abdominal infection.", cites: ["WSACS 2013"] },
  { text: "Prognosis: established ACS carries mortality 40–70 %; early recognition and decompression reduce mortality; survivors have prolonged ventilation, AKI requiring RRT in up to 50 %, and high rates of ventral hernia and enteric fistula.", cites: ["WSACS 2013"] },
];

const AbdominalCompartmentSyndromeTopic = () => {
  return (
    <TopicTemplate
      title="Abdominal Compartment Syndrome"
      subtitle="FRCA Final / FFICM — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="abdominal-compartment-syndrome"
      topicTitle="Abdominal Compartment Syndrome"
      quizQuestions={abdominalCompartmentSyndromeQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: ["WSACS 2013", "BJA Educ 2019"],
        keyPoints: ["WSACS 2013", "BJA Educ 2019"],
        workedExamples: ["WSACS 2013"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
          <section className="space-y-6">
            {/* Definitions */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Definitions & Grading (WSACS 2013)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The <strong>World Society of the Abdominal Compartment Syndrome (WSACS)</strong> consensus defines:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li><strong>Intra-abdominal pressure (IAP)</strong> — steady-state pressure in the abdominal cavity. Normal in the critically ill ≈ 5–7 mmHg.</li>
                <li><strong>Intra-abdominal hypertension (IAH)</strong> — sustained or repeated pathological elevation of IAP ≥ 12 mmHg.</li>
                <li><strong>Abdominal compartment syndrome (ACS)</strong> — sustained IAP &gt; 20 mmHg (with or without APP &lt; 60 mmHg) <em>plus</em> new organ dysfunction or failure.</li>
                <li><strong>Abdominal perfusion pressure (APP)</strong> = MAP − IAP; target ≥ 60 mmHg.</li>
              </ul>
              <div className="grid sm:grid-cols-4 gap-3">
                {[
                  { g: "Grade I", v: "12–15 mmHg" },
                  { g: "Grade II", v: "16–20 mmHg" },
                  { g: "Grade III", v: "21–25 mmHg" },
                  { g: "Grade IV", v: "> 25 mmHg" },
                ].map((s) => (
                  <div key={s.g} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{s.g}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Causes */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Causes & Classification</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { type: "Primary ACS", detail: "Intra-abdominal or pelvic pathology — abdominal trauma (haematoma, packing), ruptured AAA, severe pancreatitis, perforated viscus / peritonitis, mesenteric ischaemia, ileus, post-laparotomy haemorrhage, retroperitoneal bleed." },
                  { type: "Secondary ACS", detail: "No intra-abdominal injury — typically massive resuscitation: major burns > 30 % TBSA, septic shock, prolonged CPR, polytrauma without abdominal injury, capillary-leak states (Parkland > 250 mL/kg/24 h is the recognised threshold)." },
                  { type: "Recurrent ACS", detail: "Recurrence after surgical or medical resolution of a previous episode — usually in patients with an open abdomen who fail to achieve early fascial closure or develop ongoing capillary leak." },
                ].map((c) => (
                  <div key={c.type} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{c.type}</p>
                    <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg border border-border bg-secondary/20">
                <p className="text-xs font-semibold text-foreground mb-1">WSACS risk factors — screen IAP 4–6 hourly if any are present</p>
                <p className="text-xs text-muted-foreground">
                  Diminished abdominal-wall compliance (mechanical ventilation, high PEEP, prone position, abdominal-wall burns) ·
                  Increased intraluminal contents (gastroparesis, ileus, pseudo-obstruction) ·
                  Increased intra-abdominal contents (haemoperitoneum, ascites, intra-abdominal infection, tumour) ·
                  Capillary leak / massive resuscitation (sepsis, burns, pancreatitis, damage-control surgery, polytrauma, &gt; 3.5 L crystalloid/24 h)
                </p>
              </div>
            </div>

            {/* Pathophysiology */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pathophysiology — a multi-organ disease</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Raised IAP transmits to every adjacent compartment and impairs venous return globally. Even moderate
                IAH (12–15 mmHg) reduces splanchnic perfusion before any clinical sign is apparent.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>Polycompartment syndrome</strong> describes raised pressure in two or more anatomical compartments
                simultaneously. Raised IAP is transmitted through the diaphragm to raise intrathoracic pressure, which
                reduces venous return and raises central venous pressure; this in turn raises intracranial pressure and
                worsens cerebral perfusion. The abdominal, thoracic, cranial and limb compartments interact — a rise in
                one compartment's pressure, and abdominal-wall compliance itself, influences the others<InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" />.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { sys: "Cardiovascular", detail: "↓ IVC return → ↓ preload, ↓ CO; ↑ intrathoracic pressure → falsely elevated CVP/PAOP; ↑ SVR and PVR. Cardiac output falls long before BP, masked by vasopressors." },
                  { sys: "Respiratory", detail: "Diaphragmatic splinting → ↓ FRC and chest-wall compliance → ↑ plateau and peak pressures, hypoxaemia, hypercapnia, V/Q mismatch. Mimics ARDS." },
                  { sys: "Renal", detail: "Renal vein compression + ↓ cardiac output + ↑ renal parenchymal pressure → oliguria → AKI. Oliguria is often the earliest sign; unresponsive to fluid challenge." },
                  { sys: "Neurological", detail: "↑ intrathoracic pressure obstructs cerebral venous drainage → ↑ ICP, ↓ CPP. Particularly dangerous in TBI." },
                  { sys: "GI / hepatic", detail: "↓ mesenteric perfusion → mucosal ischaemia, bacterial translocation, lactic acidosis, anastomotic breakdown. Hepatic congestion → impaired lactate clearance and drug metabolism." },
                  { sys: "Abdominal wall", detail: "Ischaemia of rectus sheath → necrosis, dehiscence, surgical-site infection, late ventral hernia." },
                ].map((s) => (
                  <div key={s.sys} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{s.sys}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Presentation */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Clinical Presentation</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Examination is insensitive — palpation correctly identifies IAH in fewer than 50 % of cases. Have a
                high index of suspicion in any at-risk patient and measure IAP.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Tense, distended abdomen (insensitive sign).</li>
                <li>New or worsening oliguria refractory to fluid or vasopressor escalation.</li>
                <li>Rising plateau and peak airway pressures; falling lung and chest-wall compliance.</li>
                <li>Hypotension with rising vasopressor requirement and rising CVP / PAOP (paradoxical).</li>
                <li>Rising lactate, metabolic acidosis, falling MvO₂ — gut hypoperfusion.</li>
                <li>Rising ICP in TBI patients with abdominal pathology.</li>
              </ul>
            </div>

            {/* Diagnosis */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Diagnosis & Measurement of IAP</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The <strong>intravesical (Foley) technique</strong> is the gold standard. It is cheap, reproducible
                and the reference method in all WSACS literature.
              </p>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li>Patient fully supine (head-up &lt; 20°) and at end-expiration.</li>
                <li>No abdominal muscle contraction — deepen sedation ± neuromuscular blockade if needed.</li>
                <li>Empty the bladder, then instil 25 mL of warmed sterile saline via the Foley.</li>
                <li>Zero the transducer at the <strong>mid-axillary line at the iliac crest</strong>.</li>
                <li>Read after 30–60 s equilibration. Express in <strong>mmHg</strong>.</li>
                <li>Trend every 4–6 h in at-risk patients; isolated values are misleading.</li>
              </ol>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Pitfalls falsely raising IAP</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Head-up position, coughing, asynchrony, high PEEP, full rectum, large instillation volume (&gt; 25 mL),
                    transducer zeroed at the symphysis pubis, neurogenic bladder spasm.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Alternative routes</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Intragastric (nasogastric transducer), intracolonic and direct intraperitoneal (via catheter) —
                    used if Foley not possible (e.g. cystectomy, ruptured bladder). All correlate reasonably with
                    intravesical measurement.
                  </p>
                </div>
              </div>
            </div>

            {/* Work-up */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Work-up</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { test: "Bedside", detail: "Hourly IAP, hourly UO, APP (MAP − IAP), ventilator plateau pressure trend, ABG (lactate, base deficit), abdominal US (free fluid, AAA, bladder volume)." },
                  { test: "Bloods", detail: "FBC, U&E, LFT, CK, coagulation, lactate, CRP, group & save; troponin if myocardial demand-ischaemia suspected." },
                  { test: "Imaging", detail: "CT abdomen-pelvis with contrast if cause unclear or to plan surgery — narrow IVC, round-belly sign, bowel-wall thickening, free fluid, retroperitoneal haematoma, ileus." },
                  { test: "Cause-specific", detail: "Amylase/lipase (pancreatitis), CT angiogram (AAA, mesenteric ischaemia), bedside echocardiography (LV/RV function, IVC), surgical review for damage-control or perforation." },
                ].map((t) => (
                  <div key={t.test} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{t.test}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Management */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Management — WSACS Medical Bundle</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Apply <strong>all five domains</strong> in parallel as IAH worsens; reassess IAP every 1–2 h. Escalate
                to surgical decompression if IAP remains ≥ 20 mmHg with organ failure<InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" />.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Enteral nutrition should be delayed or stopped in established ACS or severe intra-abdominal
                hypertension with gut dysfunction; trophic, post-pyloric or parenteral feeding routes are considered
                once intra-abdominal pressures fall<InlineRef topicId="abdominal-compartment-syndrome" refLabel="ESICM EN 2017" />.
              </p>
              <div className="space-y-3">
                {[
                  { topic: "1. Evacuate intraluminal contents", detail: "Large-bore NG tube on free drainage and rectal decompression; prokinetics — metoclopramide 10 mg TDS and erythromycin 250 mg QDS; neostigmine for pseudo-obstruction; endoscopic or colonoscopic decompression; stop enteral feed." },
                  { topic: "2. Evacuate intra/extra-abdominal fluid collections", detail: "Image-guided percutaneous drainage of ascites, haematoma or abscess under ultrasound or CT guidance — can avoid laparotomy in selected cases." },
                  { topic: "3. Improve abdominal-wall compliance", detail: "Adequate analgesia and sedation; neuromuscular blockade can drop IAP dramatically and is a useful temporising measure; nurse supine / head-up < 20°; escharotomy for circumferential torso burns; avoid tight dressings and prone positioning." },
                  { topic: "4. Optimise fluid balance", detail: "De-resuscitate — aim for a neutral-to-negative fluid balance once initial resuscitation is complete: 20 % albumin with furosemide, early renal replacement therapy with ultrafiltration, avoid excessive crystalloid, and use balanced blood-component ratios rather than crystalloid in ongoing haemorrhage." },
                  { topic: "5. Optimise systemic and regional perfusion", detail: "Target abdominal perfusion pressure (APP = MAP − IAP) ≥ 60 mmHg — noradrenaline first-line, avoiding over-zealous fluid administration purely to raise MAP." },
                ].map((m) => (
                  <div key={m.topic} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{m.topic}</p>
                    <p className="text-sm text-muted-foreground mt-1">{m.detail}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Surgical decompression</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Indicated for <strong>ACS refractory to medical management</strong>, or as a primary strategy in
                damage-control laparotomy where the abdomen is anticipated not to close (massive transfusion,
                bowel oedema, prolonged operating time).
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Midline laparotomy under general anaesthesia — anticipate profound reperfusion hypotension on opening (ischaemia-reperfusion mediators, abrupt drop in SVR). Pre-load with fluid and have vasopressor running.</li>
                <li>Leave abdomen open with a <strong>temporary abdominal closure (TAC)</strong>: negative-pressure systems (ABThera, vacuum-pack) are preferred over Bogotá bag for fluid handling, reducing visceral oedema, and improving rates of primary fascial closure.</li>
                <li>Plan for early <strong>delayed primary fascial closure</strong> within 7–10 days. Beyond this, consider mesh-mediated traction or component separation; otherwise expect a planned ventral hernia.</li>
                <li>Continue IAP monitoring even with an open abdomen — recurrent ACS can occur through the dressing.</li>
              </ul>
            </div>

            {/* Prognosis */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Prognosis</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>IAH is independently associated with increased mortality even in the absence of ACS.</li>
                <li>Established ACS carries hospital mortality of <strong>40–70 %</strong>, highest in secondary ACS from burns and septic shock.</li>
                <li>Early recognition with structured IAP monitoring and the WSACS bundle significantly reduces mortality and progression to surgical decompression.</li>
                <li>Survivors face prolonged ventilation, AKI requiring RRT in up to 50 %, gut dysfunction with enterocutaneous fistula in 5–15 % of open abdomens, and high rates of planned ventral hernia requiring later reconstruction.</li>
                <li>Long-term: increased risk of PICS (post-intensive-care syndrome), reduced HRQoL at 6–12 months, and significant rehabilitation needs.</li>
              </ul>
            </div>
          </section>
        </ExamSection>
          <TopicFaqs faqs={abdominalCompartmentSyndromeFaqs} />
        </>
      }
    />
  );
};

export default AbdominalCompartmentSyndromeTopic;
