import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { transfusionCoagulationQuestions } from "@/data/quizzes";
import CoagulationCascadeDiagram from "@/components/diagrams/pharmacology/CoagulationCascadeDiagram";
import TraliVsTacoDecisionTool from "@/components/diagrams/intensive-care/TraliVsTacoDecisionTool";
import CellSalvageAnimatedDiagram from "@/components/diagrams/intensive-care/CellSalvageAnimatedDiagram";
import AcdCitrateChelationDiagram from "@/components/diagrams/intensive-care/AcdCitrateChelationDiagram";
import CitrateWashSeparationDiagram from "@/components/diagrams/intensive-care/CitrateWashSeparationDiagram";
import MajorHaemorrhageFlowchart from "@/components/diagrams/shared/MajorHaemorrhageFlowchart";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const transfusionCoagulationFaqs: Array<[string, string]> = [
  ["What ratios are used in major haemorrhage protocols?", "Empirical 1:1:1 (RBC:FFP:platelets) until ROTEM/TEG-guided, based on PROPPR trial; activate at predicted 4+ units in 1 h, give TXA 1 g within 3 h (CRASH-2) and target ionised Ca²⁺ >1.0 mmol/L."],
  ["When is prothrombin complex concentrate preferred over FFP?", "For warfarin reversal in major bleeding (25–50 U/kg with vitamin K, BSH 2018), or factor replacement in liver disease where volume load from FFP is harmful; PCC restores INR within minutes versus hours for FFP."],
  ["How is ROTEM/TEG used to guide blood product use?", "FIBTEM A5 <12 mm → fibrinogen concentrate or cryoprecipitate; EXTEM CT >80 s → FFP or PCC; EXTEM A5 <40 mm with normal FIBTEM → platelets; ML >15% → tranexamic acid (ITACTIC trial)."],
];

const objectives = [
  "Describe the composition, shelf-life, donor-to-recipient survival and storage requirements of each blood component",
  "Recognise and manage the major transfusion reactions (acute haemolytic, FNHTR, TRALI, TACO, anaphylaxis, TA-GvHD, TTI)",
  "Map product-specific risks (e.g. TRALI with FFP/platelets, TACO with red cells in elderly) to their mechanisms and prevention",
  "Apply the Massive Haemorrhage Protocol — triggers, ratios, targets and complications (lethal triad, hypocalcaemia)",
  "Explain the principles of intra-operative cell salvage (ICS), the wash cycle, and the practical steps to set it up and run it safely",
  "List the absolute and relative contraindications to cell salvage and the situations where leucodepletion filters extend its use (obstetrics, malignancy)",
  "Interpret viscoelastic (ROTEM/TEG) tracings to direct goal-directed product replacement",
  "Diagnose DIC using the ISTH score and distinguish it from TTP/HUS and hepatic coagulopathy",
  "Quote the major trial evidence shaping practice (TRICC, TRISS, PROPPR, CRASH-2, CRYOSTAT-2, FIBRES)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Massive haemorrhage in blunt trauma",
    scenario:
      "32-year-old, RTC, pelvic and femur fractures, BP 78/40, HR 138, FAST positive, Hb 68 on point-of-care. ABG: pH 7.18, lactate 6.8, iCa²⁺ 0.86, temperature 34.4°C.",
    working:
      "Activate MHP: 1:1:1 (PRBC:FFP:platelets) packs. Give TXA 1 g IV bolus as soon as possible and within 3 h (CRASH-2); the follow-on 1 g over 8 h is retained by most UK major-haemorrhage protocols and is clearly indicated in isolated traumatic brain injury, where CRASH-3 showed benefit in mild-to-moderate injury given within 3 h — in elective non-cardiac surgery a single 1 g bolus is the standard regimen (POISE-3). Address lethal triad: warm fluids/forced-air warming → temperature; correct acidosis by source control + perfusion; coagulopathy by 1:1:1 + cryo or fibrinogen concentrate to keep fibrinogen >1.5–2 g/L. Citrate-induced hypocalcaemia: 10 mL CaCl₂ 10% per 4 units PRBC and whenever iCa²⁺ <1.0. Damage control resuscitation — permissive hypotension (SBP 80–90) until surgical/IR control. Send ROTEM to switch from empiric ratios to goal-directed.",
    answer:
      "Activate MHP, TXA within 3 h, 1:1:1 ratio, calcium replacement, active warming, permissive hypotension, urgent damage-control surgery/IR. Transition to ROTEM-guided once available.",
    cites: ["BSH 2017"],
  },
  {
    title: "Setting up cell salvage for a redo aortic case",
    scenario:
      "A 68-year-old Jehovah's Witness is listed for redo open AAA repair. She declines allogeneic blood but accepts intra-operative cell salvage if the circuit remains in continuity with her body. How do you set up and run cell salvage for this case?",
    working:
      "Confirm consent and document the agreed components (red cells via continuous circuit). Two suction lines: a low-vacuum (≤−150 mmHg) salvage suction kept on the surgical field below blood level, and a separate standard high-vacuum sucker for irrigation/contaminants. Anticoagulate the collection reservoir — heparinised saline (30,000 IU in 1 L 0.9% NaCl) primed at 60 mL per 100 mL anticipated blood, dripping into the suction tubing tip; citrate (ACD-A) is the alternative when systemic heparin is contraindicated. When the reservoir holds ~500–1000 mL, the wash cycle starts: blood is centrifuged in a spinning bell, plasma + heparin + free Hb + cytokines are decanted to waste, and packed RBCs are washed with 1–1.5 L saline before being suspended in 0.9% saline at Hct ~50–70%. The processed unit is returned through a standard blood-giving set with a 40 µm filter; in obstetrics or malignancy add a leucodepletion filter to remove amniotic/tumour debris. Returned blood has no platelets, fibrinogen or clotting factors — anticipate dilutional coagulopathy after 1500–2000 mL salvaged volume and replace with FFP/cryo/platelets guided by ROTEM.",
    answer:
      "Document continuous-circuit consent. Prime reservoir with heparinised saline, use dual-suction technique at low vacuum, process when ≥500 mL collected, return washed RBCs through a 40 µm (± leucodepletion) filter, and supplement with FFP/cryo/platelets once >1500 mL has been re-infused or ROTEM signals coagulopathy. Avoid topical haemostats, betadine and unlicensed irrigants in the salvage field.",
    cites: ["NICE NG24"],
  },
  {
    title: "ISTH DIC scoring in septic shock",
    scenario:
      "Septic shock from urosepsis, day 2 ICU. Platelets 42 ×10⁹/L, PT prolonged 8 s above control, fibrinogen 0.9 g/L, D-dimer strongly raised, oozing from cannulae.",
    working:
      "ISTH points: platelets 42 → 2; PT prolongation >6 s → 2; fibrinogen <1 g/L → 1; D-dimer strong increase → 3. Total = 8 (≥5 = overt DIC). Confirm clinical bleeding + microvascular thrombosis suspicion. Differentiate from TTP (normal coag screen + ADAMTS13 <10%) and from hepatic coagulopathy (FVIII low in liver disease, preserved in DIC).",
    answer:
      "Overt DIC (score 8). Treat the cause (source control + appropriate antimicrobials). Replace to clinical targets: platelets >50, fibrinogen >1.5 g/L (cryo or fibrinogen concentrate), FFP if PT ratio >1.5 + bleeding. Avoid TXA unless ROTEM confirms hyperfibrinolysis (ML >15%).",
    cites: ["BJA Educ 2015"],
  },
];

const TransfusionCoagulationTopic = () => {
  return (
    <TopicTemplate
      title="Transfusion & Coagulation"
      subtitle="FRCA / FFICM — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      topicId="transfusion-coagulation"
      topicTitle="Transfusion & Coagulation"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={transfusionCoagulationQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 4.6", "EDIC 5.6"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2015",
          "NICE NG24",
          "BSH 2017",
        ],
        keyPoints: [
          "BJA Educ 2015",
          "NICE NG24",
          "BSH 2017",
        ],
        workedExamples: ["BSH 2017", "NICE NG24", "BJA Educ 2015"],
      }}
      keyPoints={[
        { text: "Restrictive transfusion (Hb 70 g/L trigger) is safe in most ICU patients — TRICC, TRISS", cites: ["BSH 2017"] },
        { text: "Red cells: 35-day shelf life at 2–6°C; storage lesion (↓2,3-DPG, ↑K⁺, ↓pH) reverses over 24 h in the recipient", cites: ["NICE NG24"] },
        { text: "Platelets: only 5–7 days at 20–24°C with agitation — bacterial contamination is the leading infectious risk", cites: ["BJA Educ 2015"] },
        { text: "FFP/cryo: 2 years at −30°C; once thawed, use within 24 h (FFP) or 4 h (cryo, room temperature)", cites: ["BSH 2017"] },
        { text: "TACO is now the leading cause of transfusion-related death reported to SHOT — TRALI incidence fell ~10-fold after the UK male-donor FFP policy. TRALI remains a major immune complication (anti-HLA/HNA antibodies from multiparous donors, FFP and apheresis platelets) but is no longer the commonest fatal one", cites: ["NICE NG24"] },
        { text: "TRALI vs TACO: both cause pulmonary oedema within 6 h — TRALI has normal CVP/JVP and worsens with diuretics; TACO improves with diuresis", cites: ["BJA Educ 2015"] },
        { text: "Cell salvage washes shed blood, suspends RBCs in saline (Hct ~50–70%), and removes plasma, platelets, heparin, free Hb and most cytokines — returned blood has NO clotting factors or platelets", cites: ["BSH 2017"] },
        { text: "ICS contraindications are largely relative — sickle cell disease, contamination with iodine/topical haemostats, and pharmacological agents not licensed for IV use; obstetric and oncological use is now supported with a leucodepletion filter (NICE TA/OAA-AAGBI)", cites: ["NICE NG24"] },
        { text: "ROTEM/TEG enables goal-directed transfusion — FIBTEM guides fibrinogen, EXTEM guides FFP/platelets", cites: ["BJA Educ 2015"] },
        { text: "TXA within 3 hours of trauma reduces mortality (CRASH-2: 1 g bolus then 1 g over 8 h). In elective non-cardiac surgery the regimen is a single 1 g bolus, which reduced bleeding in POISE-3 but did not meet non-inferiority for the cardiovascular composite — so weigh bleeding against thrombotic risk", cites: ["CRASH-2 2010", "POISE-3 2022"] },
        { text: "Massive transfusion: hypocalcaemia is the most dangerous metabolic complication — give CaCl₂ early", cites: ["NICE NG24"] },
        { text: "Lethal triad: hypothermia + acidosis + coagulopathy — damage control resuscitation breaks the cycle", cites: ["BJA Educ 2015"] },
        { text: "DIC: ISTH score ≥5 = overt DIC. Treat the underlying cause — the most important intervention", cites: ["BSH 2017"] },
        { text: "DIC vs TTP: coagulation screen normal in TTP, abnormal in DIC. Never give platelets in TTP", cites: ["NICE NG24"] },
        { text: "TXA contraindicated in DIC with predominant thrombosis — only if hyperfibrinolysis dominant", cites: ["BJA Educ 2015"] },
      ]}
      coreConcepts={
        <>
        <>
          <ExamSection id="cascade" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Coagulation Cascade — Foundations" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A working knowledge of the intrinsic, extrinsic and common pathways underpins interpretation of clotting tests, transfusion targets, and the rational use of factor concentrates and antifibrinolytics covered below.
            </p>
            <CoagulationCascadeDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="products" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.6"]}>
            <CollapsibleSubsection title="Blood Products">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Product</th>
                    <th className="text-left py-2 text-foreground font-semibold">Content</th>
                    <th className="text-left py-2 text-foreground font-semibold">Storage / Notes</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Packed Red Cells</td><td>Hb ~200 g/L, Hct ~0.55, vol ~280 mL</td><td>2–6°C × 35 d. Storage lesion: ↓2,3-DPG, ↑K⁺, ↓pH.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">FFP</td><td>All clotting factors, fibrinogen ~3 g/L</td><td>Thaw 30 min. Dose 15 mL/kg. ABO-compatible.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cryoprecipitate</td><td>Fibrinogen, FVIII, vWF, FXIII</td><td>2 pools (10 units) ↑ fibrinogen ~1 g/L. Target &gt;1.5 g/L.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Factor XIII concentrate</td><td>Purified FXIII (fibrin-stabilising factor)</td><td>Cross-links fibrin and protects the clot from fibrinolysis. Consider when bleeding and poor clot firmness persist despite corrected fibrinogen, platelets and normal CT/INR — ROTEM shows low MCF with normal FIBTEM, or clot breakdown. Typical dose 20–30 IU/kg guided by FXIII activity (target &gt;60%); indicated in congenital FXIII deficiency and used off-licence in acquired deficiency after cardiac and major surgery<InlineRef topicId="transfusion-coagulation" refLabel="Anaesthesia 2017 TIC" /></td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Platelets</td><td>1 ATD = pool of 4 donors</td><td>20–24°C with agitation, 5-day shelf life. Target &gt;75 ×10⁹/L.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Tranexamic Acid</td><td>Lysine analogue antifibrinolytic</td><td>1 g IV &lt;3 h post-injury (CRASH-2). PPH (WOMAN). Avoid in thrombotic DIC.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fibrinogen Concentrate</td><td>Purified, pasteurised. 1 g vial.</td><td>Room-T, ~10 min reconstitution. 30–50 mg/kg. No ABO. Lower infection risk than cryo.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">PCC (4-factor)</td><td>II, VII, IX, X + Protein C/S</td><td>Warfarin reversal: dose by INR. Give with IV vit K 5–10 mg. Recheck INR at 30 min and 6–8 h.</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">The Red Cell Storage Lesion</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                During storage, red cells undergo progressive biochemical and structural change. Biochemically: ↓2,3-DPG and ↓ATP, ↑extracellular K⁺, a falling pH, oxidative membrane damage, ↑cell-free haemoglobin (which scavenges nitric oxide and may impair microvascular flow), and accumulation of bioactive lipids and cytokines from residual leucocytes/platelets. Morphologically, cells progress from the normal biconcave disc → echinocyte → spherocyte, with reduced deformability that may impair microcirculatory passage <InlineRef topicId="transfusion-coagulation" refLabel="BPA Transfusion 2026" />.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Functionally, depleted 2,3-DPG left-shifts the oxyhaemoglobin dissociation curve, impairing immediate oxygen offloading at the tissues in freshly transfused units; this reverses over a few hours in vivo as 2,3-DPG regenerates.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Clinically, the large randomised trials ABLE and RECESS showed no outcome benefit from using fresher red cells over standard-issue units in critically ill and cardiac surgical populations <InlineRef topicId="transfusion-coagulation" refLabel="ABLE 2015" /> <InlineRef topicId="transfusion-coagulation" refLabel="RECESS 2015" />. However, the accumulated extracellular potassium remains clinically relevant during rapid massive transfusion, in neonates, and in renal failure — favour fresher or washed units in these settings, and note that irradiated units leak more potassium during storage <InlineRef topicId="transfusion-coagulation" refLabel="BPA Transfusion 2026" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="lifespans" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.6"]}>
            <CollapsibleSubsection title="Component Lifespans & In-vivo Survival">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Each component has both a <em>shelf-life</em> (how long it can be stored before issue) and an <em>in-vivo survival</em> (how long the transfused component continues to function in the recipient). The two are not the same — a unit of red cells can be stored for 35 days but typical post-transfusion 24-h recovery is ~75% with a circulating half-life close to that of native RBCs.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Component</th>
                    <th className="text-left py-2 text-foreground font-semibold">Storage</th>
                    <th className="text-left py-2 text-foreground font-semibold">Shelf-life</th>
                    <th className="text-left py-2 text-foreground font-semibold">Once issued / thawed</th>
                    <th className="text-left py-2 text-foreground font-semibold">In-vivo survival</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Packed red cells (SAG-M)</td><td>2–6°C</td><td>35 days</td><td>Use within 4 h of leaving fridge</td><td>~75% recovery at 24 h; mean survival ≈ 58 d</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Platelets (pooled / apheresis)</td><td>20–24°C with continuous agitation</td><td>5–7 days</td><td>Transfuse over 30 min</td><td>Functional 3–5 days; CCI at 1 h is the best functional measure</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fresh frozen plasma (FFP)</td><td>−25°C or colder</td><td>2 years</td><td>Thaw 20–30 min; use within 24 h (4°C)</td><td>Factor levels rise ~10–20% per 15 mL/kg; FVII (t½ ~6 h) limits duration</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cryoprecipitate</td><td>−25°C or colder</td><td>2 years</td><td>Thaw 20 min; use within 4 h at room T</td><td>Fibrinogen t½ ~3–5 days; FVIII t½ ~12 h</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Granulocytes</td><td>20–24°C, no agitation</td><td>24 h (must be irradiated)</td><td>Transfuse ASAP</td><td>Hours — no functional persistence beyond ~24 h</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">PCC (4-factor)</td><td>2–25°C lyophilised</td><td>~3 years</td><td>Reconstitute, use immediately</td><td>FIX t½ ~24 h dictates redosing; recheck INR at 30 min and 6–8 h</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Fibrinogen concentrate</td><td>2–25°C lyophilised</td><td>5 years</td><td>~10 min reconstitution</td><td>Fibrinogen t½ ~3–5 days</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-lg border border-border bg-secondary/30">
              <p className="text-sm font-semibold text-foreground mb-1">Storage lesion (red cells)</p>
              <p className="text-sm text-muted-foreground">
                Progressive ↓2,3-DPG (left-shifts the OHDC for ~24 h post-transfusion until regenerated), ↑extracellular K⁺ (up to 30–40 mmol/L by day 35 — clinically relevant in massive/neonatal/cardiac transfusion), ↑lactate, ↓pH (~6.5), microaggregate formation, and accumulation of bioactive lipids implicated in TRALI. The ABLE and INFORM RCTs found no clinical benefit from preferentially using "fresh" red cells.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="cryo-vs-fib" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Cryoprecipitate vs Fibrinogen Concentrate">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Both replace fibrinogen in major haemorrhage but differ in preparation, safety and evidence.
            </p>
            <div className="space-y-2 mb-3">
              {[
                { trial: "CRYOSTAT-2 (2023)", detail: "Early cryoprecipitate (within 90 min) vs standard care in major trauma haemorrhage. No mortality benefit despite higher fibrinogen levels." },
                { trial: "FIB-PPH (2023)", detail: "Empiric fibrinogen concentrate 2 g vs placebo in PPH — no reduction in RBC transfusion. Empiric replacement without confirmed hypofibrinogenaemia not beneficial." },
                { trial: "FIBRES (2019)", detail: "Cardiac surgery, fibrinogen concentrate vs cryo for fibrinogen <2 g/L. Non-inferior, faster to administer." },
              ].map((e) => (
                <div key={e.trial} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{e.trial}</p>
                  <p className="text-sm text-muted-foreground mt-1">{e.detail}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="reactions" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Transfusion Reactions">
            <div className="space-y-2 mb-4">
              {[
                { reaction: "Acute Haemolytic (AHTR)", incidence: "1:40,000", features: "ABO incompatibility (IgM). Fever, loin/cannula-site pain, haemoglobinuria, DIC, AKI, hypotension. STOP transfusion, send unit + post-transfusion bloods to lab, supportive ITU care, treat DIC and AKI." },
                { reaction: "Delayed Haemolytic (DHTR)", incidence: "1:5,000", features: "Anamnestic IgG response to non-ABO antigens (Kidd, Duffy, Rh) 5–14 d post-transfusion. Falling Hb, jaundice, ↑LDH, +DAT. Supportive; flag for future cross-match." },
                { reaction: "Febrile Non-Haemolytic (FNHTR)", incidence: "1:300", features: "Cytokine accumulation in stored unit / recipient leucocyte antibodies. Temp ↑ >1°C without other features. Slow or stop, paracetamol, exclude haemolysis." },
                { reaction: "TRALI", incidence: "1:5,000–1:12,000", features: "Non-cardiogenic pulmonary oedema within 6 h of transfusion. Donor anti-HLA / anti-HNA antibodies (commonly multiparous female plasma) activate recipient neutrophils → capillary leak. Bilateral infiltrates, normal CVP/JVP, PaO₂/FiO₂ ≤300. Supportive; lung-protective ventilation. NO diuretics." },
                { reaction: "TACO", incidence: "1:100 (elderly / cardiac)", features: "Volume overload within 6 h. Raised BNP/JVP, S3, response to diuresis. Slow rate, sit up, furosemide, oxygen. Now the most commonly reported transfusion-related death in SHOT." },
                { reaction: "Allergic / Anaphylactic", incidence: "Urticaria 1:100, anaphylaxis 1:40,000", features: "Donor plasma proteins; severe in IgA-deficient recipients with anti-IgA. Adrenaline; washed or IgA-deficient products thereafter." },
                { reaction: "TA-GvHD", incidence: "Rare but ≈100% fatal", features: "Donor T-cells engraft in immunosuppressed recipient (or shared HLA haplotype). Pancytopenia, rash, deranged LFTs 1–4 wk post-transfusion. Prevent by gamma-irradiating cellular components for at-risk patients (Hodgkin's, neonates, intra-uterine, fludarabine, congenital T-cell defects)." },
                { reaction: "Transfusion-Transmitted Infection (TTI)", incidence: "HIV ~1:6.5M, HBV ~1:1.3M, HCV ~1:28M (UK)", features: "Bacterial sepsis remains the highest infectious risk and is highest in platelets (room-temperature storage). Variant CJD risk → UK leucodepletion + male-donor FFP/imported plasma." },
                { reaction: "Post-Transfusion Purpura", incidence: "Rare", features: "Sudden severe thrombocytopenia 5–12 d post-transfusion, usually HPA-1a negative women. Treat with IVIG; avoid platelet transfusion (ineffective)." },
              ].map((r) => (
                <div key={r.reaction} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{r.reaction} <span className="font-normal text-xs text-muted-foreground">({r.incidence})</span></p>
                  <p className="text-sm text-muted-foreground mt-1">{r.features}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Product-Specific Risks</h3>
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Product</th>
                    <th className="text-left py-2 text-foreground font-semibold">Highest-risk reactions</th>
                    <th className="text-left py-2 text-foreground font-semibold">Why</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Packed red cells</td><td>TACO, AHTR, DHTR, hyperkalaemia, iron overload (chronic)</td><td>Largest volume per unit; ABO/Rh antigen exposure; storage-lesion K⁺; 250 mg Fe per unit</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">FFP</td><td><strong>TRALI</strong>, anaphylaxis, TACO, citrate toxicity</td><td>High plasma volume rich in donor anti-HLA/HNA antibodies; IgA content; citrate anticoagulant chelates Ca²⁺. UK uses male-donor or solvent-detergent (Octaplas®) FFP to mitigate TRALI</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cryoprecipitate</td><td>Allergic, TRALI (lower than FFP), TTI</td><td>Pooled from 5 donors → higher cumulative exposure. No solvent-detergent equivalent in UK adult use</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Platelets</td><td><strong>Bacterial sepsis</strong>, TRALI, FNHTR, allergic, refractoriness</td><td>Stored at 22°C → bacterial growth (leading infectious transfusion risk). Apheresis plasma carrier shares TRALI risk</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">PCC</td><td>Thrombosis (DVT/PE/MI), DIC, heparin-induced thrombocytopenia (heparin in some preparations)</td><td>Concentrated procoagulant load; risk rises with repeated dosing</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Fibrinogen concentrate</td><td>Thrombosis (low), allergic (very low)</td><td>Pasteurised, virally inactivated; no ABO matching needed</td></tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-lg bg-secondary/50 border border-destructive/30">
              <p className="text-sm font-semibold text-foreground mb-1">⚠️ TRALI vs TACO at the bedside</p>
              <p className="text-sm text-muted-foreground">
                Both present with hypoxia and bilateral infiltrates within 6 h of transfusion. <strong>TRALI</strong>: normal CVP, no S3, BNP normal, fever common, transient leucopenia, worsens with fluid challenge — supportive ventilation only. <strong>TACO</strong>: raised CVP/JVP, S3, BNP &gt;1.5× baseline, hypertension, responds to diuresis. SHOT consistently reports TACO as the leading cause of transfusion-related death in the UK; TRALI incidence has fallen ~10-fold since the male-donor FFP policy. <InlineRef topicId="transfusion-coagulation" refLabel="SHOT 2023" /> In isolated traumatic brain injury, TXA 1 g over 10 min then 1 g over 8 h within 3 h of injury reduced head-injury-related death in mild-to-moderate TBI, whereas a single 1 g bolus is the regimen validated in elective non-cardiac surgery.<InlineRef topicId="transfusion-coagulation" refLabel="CRASH-3 2019" /><InlineRef topicId="transfusion-coagulation" refLabel="POISE-3 2022" />
              </p>
            </div>

            <div className="mt-4">
              <TraliVsTacoDecisionTool />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="mtp" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.6"]}>
            <CollapsibleSubsection title="Massive Transfusion Protocol (MTP)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Defined as one entire blood volume in 24 h (~10 units PRBC in 70 kg adult), or &gt;4 units in 1 h with ongoing bleeding. Activation enables coordinated product delivery.
            </p>

            <h3 className="text-base font-semibold text-foreground mt-4 mb-1">Major Haemorrhage — Flowchart with Reaction Branch</h3>
            <p className="text-sm text-muted-foreground">
              The hard exam scenario is the bleeding patient who also develops hypoxia or fever mid-transfusion. The flow below separates the empirical phase from goal-directed therapy, and branches into the acute reaction pathway (TACO, TRALI, haemolytic, bacterial) without abandoning resuscitation.
            </p>
            <MajorHaemorrhageFlowchart />

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Empiric 1:1:1</p>
                <p className="text-sm text-muted-foreground mt-1">PROPPR (2015): 1:1:1 vs 1:1:2 — faster haemostasis, no mortality difference. UK MTP packs typically 6 PRBC : 4 FFP : 1 ATD platelets.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Goal-Directed (ROTEM/TEG)</p>
                <p className="text-sm text-muted-foreground mt-1">FIBTEM A5 &lt;12 → cryo/fibrinogen. EXTEM CT prolonged → FFP. Reduces blood product use 30–50%.</p>
              </div>
            </div>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                    <th className="text-left py-2 text-foreground font-semibold">Target</th>
                    <th className="text-left py-2 text-foreground font-semibold">Product</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Haemoglobin</td><td>&gt;80 g/L (active bleeding)</td><td>Packed red cells</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fibrinogen</td><td>&gt;1.5–2.0 g/L</td><td>Cryo or fibrinogen concentrate</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">PT/APTT ratio</td><td>&lt;1.5× normal</td><td>FFP 15 mL/kg</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Platelets</td><td>&gt;75 ×10⁹/L</td><td>1 ATD</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">iCa²⁺</td><td>&gt;1.0 mmol/L</td><td>10% CaCl₂ 10 mL = 6.8 mmol</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Temperature</td><td>&gt;35°C</td><td>Fluid warmer, forced-air</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-destructive/30">
              <p className="text-sm font-semibold text-foreground mb-1">⚠️ The Lethal Triad</p>
              <p className="text-sm text-muted-foreground">
                Hypothermia + acidosis + coagulopathy form a self-perpetuating cycle. Damage control resuscitation: permissive hypotension (SBP 80–90), minimise crystalloid, early blood products, TXA &lt;3 h, correct hypothermia and Ca²⁺, expedite definitive haemorrhage control.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="tic" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.6"]}>
            <CollapsibleSubsection title="Trauma-Induced Coagulopathy (TIC)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              TIC is present on admission in up to 25% of severely injured patients, before any fluid resuscitation has been given — it is an endogenous coagulopathy of injury, not simply dilution <InlineRef topicId="transfusion-coagulation" refLabel="Anaesthesia 2017 TIC" />.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Drivers include tissue factor release from injured tissue, shock/hypoperfusion with endothelial activation, activated protein C-mediated anticoagulation (consuming factors V and VIII and impairing PAI-1), fibrinogen depletion, endotheliopathy with glycocalyx shedding, and hyperfibrinolysis. This is then amplified by the lethal triad of acidosis, hypothermia and hypocalcaemia, plus iatrogenic dilution from resuscitation fluid <InlineRef topicId="transfusion-coagulation" refLabel="Anaesthesia 2017 TIC" />.
            </p>
            <div className="p-3 rounded-lg bg-secondary/50 border border-destructive/30 mb-3">
              <p className="text-sm font-semibold text-foreground mb-1">⚠️ TIC vs DIC — contrasting phenotypes</p>
              <p className="text-sm text-muted-foreground">
                TIC is a bleeding phenotype driven by hyperfibrinolysis and factor consumption from injury and shock. This contrasts with the predominantly thrombotic microvascular phenotype of sepsis-driven DIC (see above), where anticoagulation may occasionally be considered and TXA is usually avoided. In TIC, early TXA is beneficial; in thrombosis-dominant DIC it may cause harm.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Management follows damage-control resuscitation principles: empirical 1:1:1 ratios or viscoelastic (ROTEM/TEG) goal-directed factor therapy, tranexamic acid 1 g IV within 3 hours of injury followed by 1 g over 8 hours, correction of ionised calcium to &gt;1.0 mmol/L, active warming to reverse hypothermia, and permissive hypotension until surgical or radiological control of bleeding is achieved <InlineRef topicId="transfusion-coagulation" refLabel="Anaesthesia 2017 TIC" />.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="cell-salvage" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.6"]}>
            <CollapsibleSubsection title="Intra-operative Cell Salvage (ICS)">
            <p className="text-muted-foreground leading-relaxed mb-4">
              ICS collects shed surgical blood, washes the red cells, and returns them to the patient — reducing or avoiding allogeneic transfusion. AAGBI/ATACCC, NICE and the Obstetric Anaesthetists' Association now recommend its use in any procedure where blood loss is expected to exceed 500–1000 mL (or 20% of estimated blood volume), and explicitly support its use in obstetrics and oncology with a leucodepletion filter.
            </p>

            <div className="my-4">
              <CellSalvageAnimatedDiagram />
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Principles — what the machine actually does</h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-muted-foreground mb-4">
              <li><strong>Collection</strong> — surgical blood is aspirated through a dual-lumen suction tip with anticoagulant (heparinised saline or ACD-A citrate) dripping at the tip. Vacuum is kept low (≤−150 mmHg, ideally −100 mmHg) to minimise mechanical haemolysis. The collected blood enters a filtered reservoir.</li>
              <li><strong>Centrifugation</strong> — once ~500–1000 mL is in the reservoir, blood is pumped into a spinning centrifuge bowl (Latham bowl 125–225 mL, or continuous-flow disc). Red cells, being densest, layer outwards; plasma, platelets, anticoagulant, free Hb, activated complement and inflammatory cytokines layer centrally.</li>
              <li><strong>Wash</strong> — 1–1.5 L of 0.9% saline is passed through the spinning bowl to elute the unwanted layer to a waste bag. Wash quality is the single most important determinant of returned product safety.</li>
              <li><strong>Re-suspension & return</strong> — washed RBCs are pumped into a re-infusion bag at Hct ~50–70% suspended in saline. They are returned through a standard blood-giving set with a 40 µm screen filter; in obstetrics or malignancy a leucodepletion (LDF, ~40 nm) filter is added in series.</li>
            </ol>


            <div className="p-4 rounded-lg border border-border bg-muted/30 mb-4">
              <p className="font-semibold text-foreground text-sm mb-1">What is ACD (ACD-A)?</p>
              <p className="text-sm text-muted-foreground">
                <strong>Acid–Citrate–Dextrose, formula A</strong> — a sterile anticoagulant solution containing <em>citric acid</em> (anhydrous 0.73 g/100 mL), <em>sodium citrate</em> (2.20 g/100 mL) and <em>dextrose</em> (2.45 g/100 mL), pH ~5. The citrate <strong>chelates ionised calcium</strong>, blocking the coagulation cascade at multiple Ca²⁺-dependent steps; the dextrose preserves red-cell metabolism (ATP and 2,3-DPG). In cell salvage, ACD-A is dripped into the suction tubing at the operative tip at roughly <strong>15 mL per 100 mL of shed blood</strong> (≈1 drop per second) and is washed out during the centrifuge wash cycle, so systemic citrate toxicity is rare. ACD-A is preferred over heparinised saline whenever <strong>systemic heparin must be avoided</strong> (e.g. HIT, recent neurosurgery, active intracranial bleeding) and is the standard anticoagulant for apheresis circuits.
              </p>
            </div>

            <AcdCitrateChelationDiagram />
            <CitrateWashSeparationDiagram />

            <aside
              aria-label="Hypocalcaemia risk and monitoring during ACD-A cell salvage"
              className="mb-4 grid md:grid-cols-[auto_1fr] gap-0 rounded-lg border-l-4 border-amber-500 bg-amber-500/5 overflow-hidden"
            >
              <div className="bg-amber-500/15 px-4 py-3 md:py-4 flex md:flex-col items-center md:items-start gap-2 md:min-w-[160px]">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-700 dark:text-amber-400">Safety</span>
                <span className="text-sm font-serif font-bold text-foreground leading-tight">Hypocalcaemia risk &amp; monitoring</span>
              </div>
              <div className="p-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Properly washed salvaged blood is essentially citrate-free. Risk of <strong className="text-foreground">ionised hypocalcaemia</strong> arises when the wash cycle is shortened or bypassed (emergency unwashed return), when very large volumes are reinfused rapidly, or when concurrent allogeneic FFP/platelets (also citrated) are given to a patient with impaired hepatic citrate clearance (liver failure, neonates, hypothermia, transplant anhepatic phase).
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-md border border-border bg-card">
                    <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-1">Watch for</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>Perioral &amp; digital paraesthesiae (awake patient)</li>
                      <li>Prolonged QT, T-wave flattening, ↓ contractility</li>
                      <li>Hypotension unresponsive to fluid</li>
                      <li>Metabolic alkalosis (citrate → HCO₃⁻ in liver)</li>
                      <li>Chvostek / Trousseau signs (rare, late)</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-md border border-border bg-card">
                    <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-1">Monitor</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li><strong className="text-foreground">iCa²⁺ on ABG</strong> — every 30 min during high-volume salvage; target &gt; 1.0 mmol/L</li>
                      <li>Continuous ECG (QTc trend)</li>
                      <li>Invasive BP if &gt; 1500 mL salvaged or rapid return</li>
                      <li>Lactate, pH, base excess (alkalosis trend)</li>
                      <li>Total transfused citrate load (salvage + FFP + platelets)</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-md border border-amber-500/40 bg-amber-500/10">
                  <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-1">Treatment</p>
                  <p>
                    <strong className="text-foreground">Calcium chloride 10% — 5–10 mL IV</strong> via a central line (provides ~3× the elemental Ca²⁺ of equivalent gluconate) <em>or</em> <strong className="text-foreground">calcium gluconate 10% — 10–20 mL IV</strong> peripherally. Repeat to iCa²⁺ &gt; 1.0 mmol/L. Slow the rate of unwashed return where possible; never co-administer with bicarbonate (precipitates CaCO₃).
                  </p>
                </div>

                <p className="text-xs italic">
                  <strong>High-risk scenarios:</strong> liver transplant (anhepatic phase), massive obstetric haemorrhage, paediatric salvage with low circulating volume, ECMO/CRRT regional citrate anticoagulation running concurrently, hypothermic cardiac surgery.
                </p>
              </div>
            </aside>

            <div className="mb-4">
              <p className="font-semibold text-foreground text-sm mb-2">ACD-A vs heparinised saline — anticoagulant choice for cell salvage</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                      <th className="text-left py-2 text-foreground font-semibold">ACD-A (citrate)</th>
                      <th className="text-left py-2 text-foreground font-semibold">Heparinised saline</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Mechanism</td><td>Chelates ionised Ca²⁺ — blocks Ca²⁺-dependent steps of cascade</td><td>Potentiates antithrombin → inhibits thrombin (IIa) and Xa</td></tr>
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Typical preparation</td><td>ACD-A solution, ready-made (citric acid + Na citrate + dextrose, pH ~5)</td><td>30,000 IU UFH in 1 L 0.9% NaCl (30 IU/mL)</td></tr>
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Dose to suction tip</td><td>~15 mL per 100 mL shed blood (≈1 drop/sec)</td><td>~60 mL per 100 mL anticipated blood (prime + drip)</td></tr>
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Systemic effect after wash</td><td>Negligible — citrate washed out; dextrose preserves 2,3-DPG/ATP</td><td>Negligible — heparin washed out; trace residual possible if wash inadequate</td></tr>
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Preferred when</td><td>Systemic heparin contraindicated: HIT, recent neurosurgery, active intracranial bleed; standard for apheresis</td><td>Default choice in most UK theatres — cheap, familiar, widely stocked</td></tr>
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Risks / caveats</td><td>Citrate toxicity (hypocalcaemia, metabolic alkalosis) only if wash bypassed or massive unwashed return</td><td>Heparin rebound if washing inadequate; contraindicated in HIT</td></tr>
                    <tr><td className="py-2 font-medium text-foreground">Reversal</td><td>IV calcium (chloride or gluconate) if symptomatic</td><td>Protamine 1 mg per 100 IU residual heparin</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">What you get back</p>
                <p className="text-sm text-muted-foreground">Washed packed red cells, Hct 50–70%, ~225 mL per processed bowl. Functionally equivalent to (or better than) stored allogeneic RBCs — fresh, normal 2,3-DPG, normal K⁺.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">What you do NOT get back</p>
                <p className="text-sm text-muted-foreground">No platelets, no fibrinogen, no clotting factors, no plasma proteins. After 1500–2000 mL of returned salvaged blood expect dilutional coagulopathy — replace FFP/cryo/platelets guided by ROTEM.</p>
              </div>
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Setting it up — practical checklist</h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-muted-foreground mb-4">
              <li>Trained operator present and a recent competency check (AAGBI 2018: ICS should not be run by an untrained user).</li>
              <li>Patient consent — discuss with Jehovah's Witness patients pre-operatively and document which components of the circuit are acceptable (continuous-circuit ICS is usually accepted).</li>
              <li>Disposables: collection reservoir, processing set (bowl size matched to anticipated loss), wash saline (1–3 L 0.9% NaCl), heparinised saline (30,000 IU UFH in 1 L 0.9% NaCl) or ACD-A, dual-lumen suction tubing, re-infusion bag, 40 µm filter ± leucodepletion filter.</li>
              <li>Prime the reservoir with ~200 mL anticoagulant and run anticoagulant at ~60 mL per 100 mL anticipated blood loss (≈1 drop per second initially).</li>
              <li>Use two suckers: <em>salvage</em> sucker (low vacuum, kept beneath blood level, no skimming of air) and a separate <em>standard</em> high-vacuum sucker for irrigation, contaminated fluid, or anything below.</li>
              <li>Label the re-infusion bag with patient identifiers, time of processing, and a 4-hour expiry.</li>
              <li>Document salvaged volume returned in the anaesthetic record; many trusts require a SHOT-style traceability entry equivalent to allogeneic transfusion.</li>
            </ol>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Contraindications & cautions</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Category</th>
                    <th className="text-left py-2 text-foreground font-semibold">Examples</th>
                    <th className="text-left py-2 text-foreground font-semibold">Workaround</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Topical agents not licensed for IV use</td><td>Betadine, chlorhexidine, hydrogen peroxide, topical thrombin, gelatin/collagen haemostats, bone cement, distilled water, <strong>adrenaline-soaked swabs/packs</strong></td><td>Switch to standard sucker until field is irrigated and dry; avoid salvaging blood in contact with these agents. Salvaging blood exposed to adrenaline-soaked swabs can re-infuse a substantial adrenaline load and cause severe hypertension, tachycardia and arrhythmia</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Bowel contents / pus</td><td>Faecal contamination, frank infection</td><td>Traditionally listed as a contraindication, but this is <strong>relative and contested</strong>: with copious washout and a wash/leucodepletion cycle, reported bacteraemia is usually transient and clinically insignificant, and in life-threatening haemorrhage the risk of massive allogeneic transfusion may outweigh it. Practical approach — standard sucker while the field is contaminated, copious lavage, then resume salvage with antibiotic cover if bleeding is severe; discuss with the surgeon and haematology</td></tr>

                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Malignancy</td><td>Tumour-bearing surgical field</td><td>Acceptable with a leucodepletion filter (NICE IPG 144)<InlineRef topicId="transfusion-coagulation" refLabel="NICE IPG144" />; also consider irradiation of salvaged blood. The historic absolute ban reflected theory, not outcome data — no increase in recurrence has been shown in urological or hepatic resection series</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Obstetrics</td><td>Caesarean delivery, PPH</td><td>Acceptable with separate suction of amniotic fluid before salvage and a leucodepletion filter (OAA-AAGBI 2018)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Sickle cell disease</td><td>HbSS</td><td>Avoid — washing/centrifugation may precipitate sickling. HbAS / trait is acceptable</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Other</td><td>Catecholamine-secreting tumours (phaeochromocytoma — wash adequately), thalassaemia (use shorter-stored cells)</td><td>Case-by-case discussion with haematology</td></tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-lg bg-secondary/50 border border-destructive/30">
              <p className="text-sm font-semibold text-foreground mb-1">⚠️ Salvaged blood syndrome</p>
              <p className="text-sm text-muted-foreground">
                Re-infusion of inadequately washed salvaged blood can cause non-cardiogenic pulmonary oedema, coagulopathy, hypotension and DIC — driven by activated leucocytes, complement, free Hb and bioactive lipids. Mitigation: always complete the wash cycle, never bypass to deliver "raw" reservoir contents, and limit a single salvaged unit to ≤4 h once in the re-infusion bag.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="rotem" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Viscoelastic Testing (ROTEM/TEG)">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">ROTEM Parameters</p>
                <p className="text-sm text-muted-foreground mt-1">EXTEM CT: extrinsic pathway (FFP). FIBTEM A5/MCF: fibrinogen (cryo if &lt;12 mm). EXTEM MCF: platelet contribution. HEPTEM: heparin effect.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Goal-Directed Algorithm</p>
                <p className="text-sm text-muted-foreground mt-1">FIBTEM low → cryo. EXTEM CT prolonged → FFP. EXTEM MCF low (FIBTEM normal) → platelets. HEPTEM shorter than INTEM → protamine.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              <strong>Interpreting clot firmness correctly:</strong> EXTEM MCF is not a "platelet number" and no fixed
              percentage split between platelets and fibrinogen should be quoted. Clot firmness reflects a{" "}
              <strong>complex, non-linear interaction</strong> between platelet count and function, fibrinogen
              concentration, fibrin polymerisation, factor XIII-mediated cross-linking, haematocrit, temperature,
              pH and ionised calcium. FIBTEM (platelet contribution abolished by cytochalasin D) isolates the
              fibrin component, so the <strong>difference</strong> between EXTEM and FIBTEM amplitudes is used to
              infer the platelet contribution — but the relative contributions vary with the clinical state, and
              fibrinogen deficiency, dilutional coagulopathy, hypocalcaemia or hypothermia can all reduce MCF with
              a normal platelet count. Always interpret amplitudes alongside the clinical picture, laboratory
              fibrinogen/platelet counts and correction of temperature and ionised calcium{" "}
              <InlineRef topicId="transfusion-coagulation" refLabel="Curr Opin Anaesthesiol 2013 VHA" />.
            </p>
            </CollapsibleSubsection>
          </ExamSection>


          <ExamSection id="trials" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Key Transfusion Trials">
            <div className="space-y-2">
              {[
                { trial: "TRICC (1999)", result: "Restrictive (Hb 70) as safe as liberal (100) in most ICU patients." },
                { trial: "TRISS (2014)", result: "Restrictive (Hb 70) vs liberal (90) in septic shock — no difference in 90-day mortality." },
                { trial: "TITRe2 (2015)", result: "Restrictive (Hb 75) vs liberal (90) post-cardiac surgery — restrictive non-inferior. Trend to higher mortality in restrictive group." },
                { trial: "PROPPR (2015)", result: "1:1:1 vs 1:1:2 in trauma — 1:1:1 faster haemostasis, no mortality difference." },
              ].map((t) => (
                <div key={t.trial} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{t.trial}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.result}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="dic" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.6", "EDIC 5.6"]}>
            <CollapsibleSubsection title="Disseminated Intravascular Coagulation">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Systemic activation of coagulation and fibrinolysis → microvascular thrombosis + consumptive coagulopathy. Always secondary to an underlying condition (sepsis, trauma, obstetric, malignancy).
            </p>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">ISTH DIC Score (≥5 = overt)</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                    <th className="text-left py-2 text-foreground font-semibold">0</th>
                    <th className="text-left py-2 text-foreground font-semibold">1</th>
                    <th className="text-left py-2 text-foreground font-semibold">2</th>
                    <th className="text-left py-2 text-foreground font-semibold">3</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Platelets ×10⁹/L</td><td>&gt;100</td><td>50–100</td><td>&lt;50</td><td>—</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">D-dimer/FDPs</td><td>None</td><td>—</td><td>Moderate ↑</td><td>Strong ↑</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">PT prolongation</td><td>&lt;3 s</td><td>3–6 s</td><td>&gt;6 s</td><td>—</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Fibrinogen</td><td>&gt;1.0 g/L</td><td>&lt;1.0 g/L</td><td>—</td><td>—</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Management Principles</h3>
            <div className="space-y-2 mb-3">
              {[
                { principle: "Treat the cause", detail: "The single most important step — DIC will not resolve without it (antibiotics, delivery, ATRA in APML)." },
                { principle: "Supportive replacement", detail: "Transfuse to clinical targets, not lab values. Platelets >50 if bleeding; FFP if PT ratio >1.5 + bleeding; fibrinogen >1.5 g/L." },
                { principle: "TXA — caution", detail: "Only if hyperfibrinolysis dominant (ROTEM ML >15%). Contraindicated if thrombosis predominates." },
                { principle: "Anticoagulation", detail: "Low-dose heparin only if thrombosis dominant (purpura fulminans) and bleeding controlled. Full anticoagulation rarely appropriate." },
              ].map((m) => (
                <div key={m.principle} className="p-3 rounded border border-border">
                  <p className="font-bold text-primary text-sm mb-1">{m.principle}</p>
                  <p className="text-sm text-muted-foreground">{m.detail}</p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-2">
              Treatment of the underlying trigger is paramount and DIC will not resolve without it — appropriate antimicrobials and source control in sepsis, expedited delivery in obstetric causes, and ATRA (all-trans retinoic acid) in acute promyelocytic leukaemia <InlineRef topicId="transfusion-coagulation" refLabel="ISTH DIC 2009" />.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Haemostatic support is reserved for active bleeding or before an invasive procedure, targeted to clinical rather than purely numerical thresholds: platelets &gt;50 ×10⁹/L if bleeding (a lower threshold of 20–30 ×10⁹/L is used if not bleeding but at high risk, e.g. sepsis with marrow suppression); fibrinogen &gt;1.5–2.0 g/L with cryoprecipitate or fibrinogen concentrate; and FFP 15 mL/kg for bleeding with a prolonged PT/APTT ratio &gt;1.5 <InlineRef topicId="transfusion-coagulation" refLabel="ISTH DIC 2009" />.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Anticoagulation is controversial. A low-dose unfractionated heparin infusion may be considered in thrombosis-dominant DIC — purpura fulminans, acral ischaemia, large-vessel thrombosis — once any bleeding is controlled, aiming to interrupt ongoing consumption; there is no good trial evidence of mortality benefit and the risk-benefit balance must be individualised <InlineRef topicId="transfusion-coagulation" refLabel="ISTH DIC 2009" />.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              TXA is generally avoided in DIC because it can worsen microvascular thrombosis by inhibiting fibrinolysis of already-forming clot; the exception is demonstrated hyperfibrinolysis on viscoelastic testing (ROTEM/TEG maximum lysis &gt;15%) with severe bleeding, where antifibrinolytic therapy may be justified <InlineRef topicId="transfusion-coagulation" refLabel="ISTH DIC 2009" />.
            </p>

            <div className="p-3 rounded-lg bg-secondary/50 border border-destructive/30">
              <p className="text-sm font-semibold text-foreground mb-1">⚠️ DIC vs TTP/HUS</p>
              <p className="text-sm text-muted-foreground">
                Both cause MAHA + thrombocytopenia. In TTP: ADAMTS13 &lt;10%, coagulation screen typically NORMAL. Treat with plasma exchange — do NOT transfuse platelets. In DIC: PT/APTT/fibrinogen abnormal. Always check ADAMTS13 if MAHA + thrombocytopenia without clear DIC trigger.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Massive haemorrhage protocol: 1:1:1 RBC:FFP:platelets, TXA within 3 h, fibrinogen >2 g/L (>2.5 in obstetrics), calcium replacement.",
              "TACO (overload — hypertension, raised JVP) vs TRALI (lung injury — bilateral infiltrates, normal CVP, fever).",
              "Cell salvage: contraindicated relative to malignancy/sepsis (but useful in obstetrics with leukocyte filter).",
              "TEG/ROTEM: clot initiation (R/CT), kinetics (K/CFT), strength (MA/MCF), fibrinolysis (LY30) — guides goal-directed therapy.",
              "DIC: treat underlying cause; replace if bleeding (FFP, cryo, platelets) — not by numbers alone.",
            ]}
          />
        </>
          <TopicFaqs faqs={transfusionCoagulationFaqs} />
        </>
      }
    />
  );
};

export default TransfusionCoagulationTopic;
