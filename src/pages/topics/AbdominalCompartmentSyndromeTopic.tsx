import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { abdominalCompartmentSyndromeQuestions } from "@/data/quizzes";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { IahEpidemiologyTeaching } from "@/components/topic/IahEpidemiologyTeaching";
import { InlineRef } from "@/components/references/InlineRef";
import { WSACSEvidenceTeaching } from "@/components/topic/WSACSEvidenceTeaching";

const abdominalCompartmentSyndromeFaqs: Array<[string, string]> = [
  ["How is intra-abdominal pressure measured and what defines ACS?", "Via the bladder with no more than 25 mL sterile saline, at end-expiration, supine, with abdominal muscle contractions absent and the transducer zeroed at the mid-axillary line. IAH is a sustained or repeated IAP ≥12 mmHg; ACS is a sustained IAP >20 mmHg with new organ dysfunction or failure (WSACS 2013)."],
  ["What are the physiological consequences of raised intra-abdominal pressure?", "Reduced venous return and CO, raised airway pressure with reduced FRC, oliguria from renal venous congestion, raised ICP from impaired cerebral venous drainage, and gut ischaemia from reduced splanchnic perfusion."],
  ["What are the non-surgical options before decompressive laparotomy?", "WSACS 2013 suggests optimal analgesia and sedation, brief trials of neuromuscular blockade, attention to body position, nasogastric or rectal decompression when the bowel is dilated, neostigmine for refractory colonic ileus, percutaneous drainage of obvious intraperitoneal fluid, and avoiding a positive fluid balance after initial resuscitation. Decompressive laparotomy is recommended for overt ACS."],
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
        + furosemide or RRT if a negative balance is needed (WSACS 2013 made no recommendation on these, so this is pragmatic practice), review head-of-bed angle. Reassess IAP hourly. If IAP remains
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
        Secondary ACS from massive resuscitation without intra-abdominal injury; major burns and massive fluid
        resuscitation are both WSACS risk factors. Aggressive medical management first; escharotomy if circumferential torso eschar
        contributes to abdominal-wall non-compliance.
      </>
    ),
    answer: (
      <>
        Stop crystalloid, switch to 5 % albumin / 20 % HAS for ongoing losses, deepen sedation + NMB, decompress
        stomach and rectum, escharotomy of torso eschar. Trial percutaneous catheter drainage if free intraperitoneal
        fluid on US. Decompressive laparotomy if IAP &gt; 20 mmHg with organ failure persists despite the above.
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
        transducer zeroed at the mid-axillary line, no more than 25 mL of sterile saline instilled via the Foley. Patient position, PEEP, coughing and a full
        rectum all falsely elevate the value.
      </>
    ),
    answer: (
      <>
        Repeat the measurement supine, at end-expiration, with abdominal muscles relaxed, transducer at the mid-axillary line,
        ≤ 25 mL saline instilled. If sustained ≥ 12 mmHg → IAH; ≥ 20 mmHg + new organ failure → ACS. Trend rather
        than single values, using a local protocol in at-risk patients (WSACS recommends protocolised monitoring).
      </>
    ),
    cites: ["WSACS 2013"],
  },
];

const keyPoints = [
  { text: "Normal IAP in the critically ill ≈ 5–7 mmHg. IAH = sustained IAP ≥ 12 mmHg. ACS = sustained IAP ≥ 20 mmHg WITH new organ dysfunction (WSACS 2013).", cites: ["WSACS 2013"] },
  { text: "Grades: I 12–15, II 16–20, III 21–25, IV > 25 mmHg. Grade alone does not define ACS — new organ dysfunction is required.", cites: ["WSACS 2013"] },
  { text: "Measure via the bladder: supine, end-expiration, maximum 25 mL sterile saline, transducer zeroed at the mid-axillary line, no abdominal muscle contraction.", cites: ["WSACS 2013"] },
  { text: "Primary ACS = intra-abdominal/pelvic pathology (trauma, ruptured AAA, pancreatitis, peritonitis). Secondary ACS = extra-abdominal cause, typically massive resuscitation (burns, sepsis). Recurrent ACS = re-develops after decompression.", cites: ["WSACS 2013"] },
  { text: "Pathophysiology is global: ↓ venous return, ↓ CO, ↑ SVR; ↑ ITP → ↓ FRC, ↑ plateau pressures, V/Q mismatch; renal vein compression + ↓ RBF → AKI; ↑ ICP via ↑ CVP; gut ischaemia and bacterial translocation; hepatic congestion.", cites: ["WSACS 2013"] },
  { text: "Abdominal perfusion pressure (APP = MAP − IAP) appears in the ACS definition (with or without APP < 60 mmHg), but WSACS 2013 made NO recommendation on using APP to guide resuscitation.", cites: ["WSACS 2013"] },
  { text: "WSACS medical bundle (5 domains): (1) evacuate intraluminal contents (NG, rectal tube, prokinetics); (2) evacuate intra-abdominal collections (percutaneous drain); (3) improve abdominal-wall compliance (analgesia/sedation, brief NMB trials, body position, escharotomy); (4) optimise fluid administration (avoid a positive balance after resuscitation — WSACS made no recommendation on diuretics, albumin or RRT); (5) optimise systemic and regional perfusion. Most are weak suggestions on low-quality evidence.", cites: ["WSACS 2013"] },
  { text: "Surgical decompression: indicated for ACS unresponsive to medical management. Midline laparotomy left open with temporary abdominal closure; WSACS recommends negative-pressure wound therapy and protocolised efforts to achieve early, or at least same-hospital-stay, fascial closure.", cites: ["WSACS 2013"] },
  { text: "WSACS recommends measuring IAP whenever any risk factor is present: e.g. abdominal surgery, major trauma or burns, prone position, ileus, pancreatitis, intra-abdominal fluid or infection, damage-control laparotomy, massive fluid resuscitation or positive balance, acidosis, hypothermia, mechanical ventilation, PEEP > 10, obesity, sepsis, shock.", cites: ["WSACS 2013"] },
  { text: "Prognosis: IAH developing during the ICU stay independently predicted mortality (RR 1.85) in a multicentre mixed ICU cohort; admission IAP did not. WSACS rated the overall evidence base as generally low quality.", cites: ["Malbrain 2005 IAH epidemiology", "WSACS 2013"] },
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
                <li><strong>Children:</strong> IAP is about 4–10 mmHg and IAH is defined as &gt; 10 mmHg; bladder instillation is 1 mL/kg (minimum 3 mL, maximum 25 mL).<InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" /></li>
                <li><strong>Abdominal perfusion pressure (APP)</strong> = MAP − IAP. WSACS 2013 could make no recommendation on using APP in resuscitation.<InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" /></li>
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
                  { type: "Primary ACS", detail: "Injury or disease in the abdominopelvic region that frequently needs early surgical or radiological intervention — abdominal trauma (haematoma, packing), ruptured AAA, severe pancreatitis, perforated viscus / peritonitis, mesenteric ischaemia, ileus, post-laparotomy haemorrhage, retroperitoneal bleed." },
                  { type: "Secondary ACS", detail: "No intra-abdominal injury — typically massive resuscitation: major burns > 30 % TBSA, septic shock, prolonged CPR, polytrauma without abdominal injury, capillary-leak states. WSACS defines it simply as IAH/ACS from conditions that do not originate in the abdominopelvic region." },
                  { type: "Recurrent ACS", detail: "Recurrence after surgical or medical resolution of a previous episode — usually in patients with an open abdomen who fail to achieve early fascial closure or develop ongoing capillary leak." },
                ].map((c) => (
                  <div key={c.type} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{c.type}</p>
                    <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg border border-border bg-secondary/20">
                <p className="text-xs font-semibold text-foreground mb-1">WSACS 2013 risk factors — measure IAP if any are present (frequency per local protocol)</p>
                <p className="text-xs text-muted-foreground">
                  Diminished abdominal-wall compliance (abdominal surgery, major trauma, major burns, prone positioning) ·
                  Increased intraluminal contents (gastroparesis/distension, ileus, colonic pseudo-obstruction, volvulus) ·
                  Increased intra-abdominal contents (pancreatitis, haemo-/pneumoperitoneum or fluid collections, infection/abscess, tumour, excessive laparoscopic insufflation, cirrhosis with ascites, peritoneal dialysis) ·
                  Capillary leak / fluid resuscitation (acidosis, damage-control laparotomy, hypothermia, high APACHE II/SOFA, massive resuscitation or positive balance, polytransfusion) ·
                  Others (age, bacteraemia, coagulopathy, raised head-of-bed angle, massive incisional hernia repair, mechanical ventilation, obesity, PEEP &gt; 10, peritonitis, pneumonia, sepsis, shock)<InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" />
                </p>
              </div>
            </div>

            {/* Pathophysiology */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pathophysiology — a multi-organ disease</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Raised IAP transmits to every adjacent compartment and impairs venous return globally. 
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
                  { sys: "Cardiovascular", detail: "↓ IVC return → ↓ preload, ↓ CO; ↑ intrathoracic pressure → falsely elevated CVP/PAOP; ↑ SVR and PVR. " },
                  { sys: "Respiratory", detail: "Diaphragmatic splinting → ↓ FRC and chest-wall compliance → ↑ plateau and peak pressures, hypoxaemia, hypercapnia, V/Q mismatch. Mimics ARDS." },
                  { sys: "Renal", detail: "Renal vein compression + ↓ cardiac output + ↑ renal parenchymal pressure → oliguria → AKI. Oliguria is common and may not respond to fluid challenge." },
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
                Clinical examination is inaccurate for detecting raised IAP, so diagnosis relies on measurement in any
                at-risk patient<InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" />.
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
                The <strong>trans-bladder technique</strong> is the WSACS reference standard for intermittent IAP
                measurement<InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" />.
              </p>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li>Patient supine, measured at end-expiration.</li>
                <li>No abdominal muscle contraction — deepen sedation ± neuromuscular blockade if needed.</li>
                <li>Instil no more than 25 mL of sterile saline via the urinary catheter.</li>
                <li>Zero the transducer at the <strong>mid-axillary line</strong>.</li>
                <li>Express in <strong>mmHg</strong> (not cmH₂O).</li>
                <li>Trend values using a protocol; WSACS recommends protocolised monitoring and management.</li>
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
                    Used when the bladder route is unavailable or unreliable (e.g. cystectomy, bladder trauma,
                    neurogenic bladder).<InlineRef topicId="abdominal-compartment-syndrome" refLabel="Malbrain 2004" />
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-1">
                    <li><strong>Intragastric:</strong> a standard NG tube with 50–100 mL saline connected to a transducer (or a balloon-tipped catheter). Useful in anuric patients or bladder injury; unreliable with gastric distension, active enteral feeding or recent upper GI surgery.</li>
                    <li><strong>Direct intraperitoneal:</strong> the most accurate but invasive — a catheter placed at laparotomy or percutaneously (e.g. a peritoneal dialysis or drainage catheter). Used during laparotomy or with an open abdomen; carries infection and bowel-injury risk.</li>
                    <li><strong>Less common:</strong> intracolonic (rectal balloon) and inferior vena cava pressure via a femoral catheter are described in specialist literature but are not routine.</li>
                  </ul>
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
                The WSACS medical algorithm groups therapies into five domains, escalated stepwise while IAP is re-measured.
                Decompressive laparotomy is recommended for overt ACS (GRADE 1D); most medical measures are weak suggestions (GRADE 2C–2D)<InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" />.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Enteral nutrition should be delayed or stopped in established ACS or severe intra-abdominal
                hypertension with gut dysfunction; trophic, post-pyloric or parenteral feeding routes are considered
                once intra-abdominal pressures fall<InlineRef topicId="abdominal-compartment-syndrome" refLabel="ESICM EN 2017" />.
                In IAH without ACS (IAP 12–20 mmHg), cautious trophic enteral feeding can be tried, with close
                monitoring for intolerance (rising gastric residuals, distension) and repeat IAP measurement; stop if IAP
                rises. In established ACS (IAP &gt; 20 mmHg with new organ failure), ESICM suggests delaying enteral
                nutrition because of the risk of bowel ischaemia.
              </p>
              <h3 className="text-base font-semibold text-foreground mt-4 mb-2">Fluid management in IAH/ACS</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mb-3">
                <li><strong>Fluid creep and secondary ACS:</strong> large-volume resuscitation (especially crystalloid) causes bowel and abdominal-wall oedema, ascites and capillary leak, raising IAP even without abdominal pathology.</li>
                <li><strong>The vicious cycle:</strong> IAH causes organ dysfunction (oliguria, hypotension), which prompts more fluid, which worsens IAH.<InlineRef topicId="abdominal-compartment-syndrome" refLabel="Jacobs 2022" /></li>
                <li><strong>Phased strategy:</strong> resuscitate adequately early, then move promptly to de-resuscitation once shock is controlled, aiming for a neutral-to-negative balance. Clear triggers for this switch are lacking, so use daily reassessment.</li>
                <li><strong>Active fluid removal:</strong> diuretics (often combined with 20% albumin to support oncotic pressure) or renal replacement therapy with ultrafiltration. Concentrated albumin can limit crystalloid volume, though evidence for colloids in ACS is limited.</li>
              </ul>
              <div className="space-y-3">
                {[
                  { topic: "1. Evacuate intraluminal contents", detail: "Large-bore NG tube on free drainage and rectal decompression; neostigmine for established colonic ileus not responding to simple measures (suggestion, 2D). Other prokinetics and endoscopic decompression are used in practice but are not specifically graded by WSACS." },
                  { topic: "2. Evacuate intra/extra-abdominal fluid collections", detail: "Percutaneous catheter drainage of obvious intraperitoneal fluid when technically possible — suggested over doing nothing (2C) and over immediate laparotomy (2D), as it may avoid the need for decompression." },
                  { topic: "3. Improve abdominal-wall compliance", detail: "Optimal analgesia and sedation (2D); brief trials of neuromuscular blockade as a temporising measure (2D); consider the contribution of body position, including head-of-bed angle and prone positioning (2D); escharotomy for circumferential torso burns." },
                  { topic: "4. Optimise fluid balance", detail: "Use a protocol to avoid a positive cumulative fluid balance once acute resuscitation is complete (2C), and an enhanced plasma:red-cell ratio in massive haemorrhage (2D). WSACS could make NO recommendation on diuretics, albumin or RRT to mobilise fluid — their use is pragmatic." },
                  { topic: "5. Optimise systemic and regional perfusion", detail: "Support organ perfusion while avoiding fluid loading purely to raise MAP. WSACS could make NO recommendation on targeting APP; an APP of 60 mmHg is sometimes used as a pragmatic goal." },
                ].map((m) => (
                  <div key={m.topic} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{m.topic}</p>
                    <p className="text-sm text-muted-foreground mt-1">{m.detail}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Stepwise escalation by IAH grade</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                The WSACS algorithm is deliberately stepwise: measure IAP, treat, re-measure, and escalate only if the
                pressure or organ function fails to improve. A pragmatic ladder — grade-specific actions are local practice, not graded WSACS statements<InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" /><InlineRef topicId="abdominal-compartment-syndrome" refLabel="Malbrain 2006" />:
              </p>
              <div className="space-y-3">
                {[
                  { grade: "Grade I — IAP 12–15 mmHg", detail: "Maintain a high index of suspicion. Measure IAP 4–6-hourly, avoid a positive fluid balance, decompress the stomach and rectum, review sedation and analgesia, consider head-of-bed angle, and remove constricting dressings/binders. No intervention beyond these; treat the underlying pathology." },
                  { grade: "Grade II — IAP 16–20 mmHg", detail: "Escalate the medical bundle and measure IAP hourly. Prokinetics for ileus, image-guided drainage of any ascites/collection, avoid a positive balance (diuretics, albumin or RRT are pragmatic options without a WSACS recommendation), and support perfusion with vasopressors rather than fluid loading." },
                  { grade: "Grade III — IAP 21–25 mmHg", detail: "Full medical bundle plus deeper sedation and a trial of neuromuscular blockade, which can drop IAP quickly and buys time. Escharotomy for circumferential torso burns. Stop enteral feed. Inform the surgeon now: if IAP remains ≥ 20 mmHg with new organ dysfunction after a few hours of maximal medical therapy, this is ACS and decompression is indicated." },
                  { grade: "Grade IV — IAP > 25 mmHg", detail: "If there is new organ dysfunction this is ACS: proceed to decompressive laparotomy with temporary abdominal closure if medical measures do not rapidly lower IAP. Prepare for reperfusion hypotension and continue IAP monitoring afterwards for recurrent ACS." },
                ].map((g) => (
                  <div key={g.grade} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{g.grade}</p>
                    <p className="text-sm text-muted-foreground mt-1">{g.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic mt-2">
                Grade alone never mandates surgery — it is IAP <em>plus new organ dysfunction unresponsive to medical
                management</em> that defines ACS and triggers decompression.
              </p>

              <h3 className="text-base font-semibold text-foreground mt-5 mb-2">Surgical decompression</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Indicated for <strong>ACS refractory to medical management</strong>, or as a primary strategy in
                damage-control laparotomy where the abdomen is anticipated not to close (massive transfusion,
                bowel oedema, prolonged operating time).
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Midline laparotomy under general anaesthesia — anticipate hypotension on opening the abdomen and have vasopressors ready.</li>
                <li>Leave abdomen open with a <strong>temporary abdominal closure (TAC)</strong>: WSACS recommends negative-pressure wound therapy for the open abdomen (GRADE 1C).</li>
                <li>Make protocolised efforts to achieve early, or at least same-hospital-stay, <strong>fascial closure</strong> (GRADE 1D). Avoid routine early biological mesh (suggestion, 2D); no recommendation was possible on acute component separation.</li>
                <li>Continue IAP monitoring even with an open abdomen — recurrent ACS can occur through the dressing.</li>
              </ul>
            </div>

            <CollapsibleSubsection title="Management of the Open Abdomen">
              <p className="text-muted-foreground leading-relaxed mb-3">
                The WSACS 2013 open-abdomen classification (an update of Björck's original scheme) grades the wound by
                contamination and fixation<InlineRef topicId="abdominal-compartment-syndrome" refLabel="Björck 2016" />.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {[
                  { g: "Grade 1a", v: "Clean, no fixation." },
                  { g: "Grade 1b", v: "Contaminated, no fixation." },
                  { g: "Grade 1c", v: "Enteric leak, no fixation." },
                  { g: "Grade 2a", v: "Clean, developing fixation." },
                  { g: "Grade 2b", v: "Contaminated, developing fixation." },
                  { g: "Grade 2c", v: "Enteric leak, developing fixation." },
                  { g: "Grade 3a", v: "Clean, frozen abdomen." },
                  { g: "Grade 3b", v: "Contaminated, frozen abdomen." },
                  { g: "Grade 4", v: "Established enteroatmospheric fistula, frozen abdomen." },
                ].map((s) => (
                  <div key={s.g} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{s.g}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.v}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>Goals of temporary abdominal closure</strong>: prevent evisceration, control fluid loss,
                prevent fistula formation, and preserve fascia and abdominal domain<InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" />.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Bogotá bag</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Cheap and simple, but provides no fascial traction and carries a high rate of incisional hernia
                    and loss of domain.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Negative-pressure with fascial traction</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ABThera or Wittmann patch systems combine negative-pressure wound therapy with active fascial
                    traction, improving rates of same-admission fascial closure<InlineRef topicId="abdominal-compartment-syndrome" refLabel="Björck 2016" />.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-2">
                <strong>Complications of the open abdomen</strong>:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li>High-volume protein-rich fluid loss through the wound.</li>
                <li>Enterocutaneous or enteroatmospheric fistula formation.</li>
                <li>Loss of domain as the abdominal wall retracts.</li>
                <li>Recurrent intra-abdominal hypertension despite an already-open abdomen.</li>
                <li>Ventral hernia at the time of eventual closure.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Definitive closure</strong>: aim for early, or at least same-hospital-stay, fascial closure.
                If this fails, options include component separation, biological or synthetic mesh, or a planned
                ventral hernia for staged reconstruction<InlineRef topicId="abdominal-compartment-syndrome" refLabel="Björck 2016" /><InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" />.
              </p>
            </CollapsibleSubsection>

            <CollapsibleSubsection title="Evidence Strength of WSACS Recommendations">
              <WSACSEvidenceTeaching />
            </CollapsibleSubsection>
            <CollapsibleSubsection title="Does IAH Predict Death? Multicentre Epidemiology">
              <IahEpidemiologyTeaching />
            </CollapsibleSubsection>

            {/* Prognosis */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Prognosis</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>IAH developing during the ICU stay independently predicted mortality (RR 1.85) in a multicentre mixed ICU cohort.<InlineRef topicId="abdominal-compartment-syndrome" refLabel="Malbrain 2005 IAH epidemiology" /></li>
                <li>Established ACS carries high mortality; published figures vary widely by population and are not given in the WSACS guideline.</li>
                <li>WSACS recommends protocolised IAP monitoring and management (GRADE 1C), but rates the overall evidence as generally low quality.<InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" /></li>
                <li>Survivors face prolonged ventilation, AKI, enteroatmospheric fistula after an open abdomen, and planned ventral hernia requiring later reconstruction.</li>
                <li>Long-term rehabilitation needs are common, as for other survivors of prolonged critical illness.</li>
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
