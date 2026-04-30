import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { transfusionCoagulationQuestions } from "@/data/quizzes";
import CoagulationCascadeDiagram from "@/components/diagrams/CoagulationCascadeDiagram";
import { WorkedExample } from "@/components/WorkedExamples";
import { Exam } from "@/data/curriculum";

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
      "Activate MHP: 1:1:1 (PRBC:FFP:platelets) packs. Give TXA 1 g IV bolus + 1 g over 8 h (CRASH-2: within 3 h reduces mortality). Address lethal triad: warm fluids/forced-air warming → temperature; correct acidosis by source control + perfusion; coagulopathy by 1:1:1 + cryo or fibrinogen concentrate to keep fibrinogen >1.5–2 g/L. Citrate-induced hypocalcaemia: 10 mL CaCl₂ 10% per 4 units PRBC and whenever iCa²⁺ <1.0. Damage control resuscitation — permissive hypotension (SBP 80–90) until surgical/IR control. Send ROTEM to switch from empiric ratios to goal-directed.",
    answer:
      "Activate MHP, TXA within 3 h, 1:1:1 ratio, calcium replacement, active warming, permissive hypotension, urgent damage-control surgery/IR. Transition to ROTEM-guided once available.",
  },
  {
    title: "Setting up cell salvage for a redo aortic case",
    scenario:
      "A 68-year-old Jehovah's Witness is listed for redo open AAA repair. She declines allogeneic blood but accepts intra-operative cell salvage if the circuit remains in continuity with her body. How do you set up and run cell salvage for this case?",
    working:
      "Confirm consent and document the agreed components (red cells via continuous circuit). Two suction lines: a low-vacuum (≤−150 mmHg) salvage suction kept on the surgical field below blood level, and a separate standard high-vacuum sucker for irrigation/contaminants. Anticoagulate the collection reservoir — heparinised saline (30,000 IU in 1 L 0.9% NaCl) primed at 60 mL per 100 mL anticipated blood, dripping into the suction tubing tip; citrate (ACD-A) is the alternative when systemic heparin is contraindicated. When the reservoir holds ~500–1000 mL, the wash cycle starts: blood is centrifuged in a spinning bell, plasma + heparin + free Hb + cytokines are decanted to waste, and packed RBCs are washed with 1–1.5 L saline before being suspended in 0.9% saline at Hct ~50–70%. The processed unit is returned through a standard blood-giving set with a 40 µm filter; in obstetrics or malignancy add a leucodepletion filter to remove amniotic/tumour debris. Returned blood has no platelets, fibrinogen or clotting factors — anticipate dilutional coagulopathy after 1500–2000 mL salvaged volume and replace with FFP/cryo/platelets guided by ROTEM.",
    answer:
      "Document continuous-circuit consent. Prime reservoir with heparinised saline, use dual-suction technique at low vacuum, process when ≥500 mL collected, return washed RBCs through a 40 µm (± leucodepletion) filter, and supplement with FFP/cryo/platelets once >1500 mL has been re-infused or ROTEM signals coagulopathy. Avoid topical haemostats, betadine and unlicensed irrigants in the salvage field.",
  },
  {
    title: "ISTH DIC scoring in septic shock",
    scenario:
      "Septic shock from urosepsis, day 2 ICU. Platelets 42 ×10⁹/L, PT prolonged 8 s above control, fibrinogen 0.9 g/L, D-dimer strongly raised, oozing from cannulae.",
    working:
      "ISTH points: platelets 42 → 2; PT prolongation >6 s → 2; fibrinogen <1 g/L → 1; D-dimer strong increase → 3. Total = 8 (≥5 = overt DIC). Confirm clinical bleeding + microvascular thrombosis suspicion. Differentiate from TTP (normal coag screen + ADAMTS13 <10%) and from hepatic coagulopathy (FVIII low in liver disease, preserved in DIC).",
    answer:
      "Overt DIC (score 8). Treat the cause (source control + appropriate antimicrobials). Replace to clinical targets: platelets >50, fibrinogen >1.5 g/L (cryo or fibrinogen concentrate), FFP if PT ratio >1.5 + bleeding. Avoid TXA unless ROTEM confirms hyperfibrinolysis (ML >15%).",
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
      keyPoints={[
        "Restrictive transfusion (Hb 70 g/L trigger) is safe in most ICU patients — TRICC, TRISS",
        "Red cells: 35-day shelf life at 2–6°C; storage lesion (↓2,3-DPG, ↑K⁺, ↓pH) reverses over 24 h in the recipient",
        "Platelets: only 5–7 days at 20–24°C with agitation — bacterial contamination is the leading infectious risk",
        "FFP/cryo: 2 years at −30°C; once thawed, use within 24 h (FFP) or 4 h (cryo, room temperature)",
        "TRALI: leading cause of transfusion-related death; strongly associated with FFP and apheresis platelets from multiparous donors (anti-HLA/HNA antibodies). UK male-donor FFP policy has reduced incidence ~10-fold",
        "TRALI vs TACO: both cause pulmonary oedema within 6 h — TRALI has normal CVP/JVP and worsens with diuretics; TACO improves with diuresis",
        "Cell salvage washes shed blood, suspends RBCs in saline (Hct ~50–70%), and removes plasma, platelets, heparin, free Hb and most cytokines — returned blood has NO clotting factors or platelets",
        "ICS contraindications are largely relative — sickle cell disease, contamination with iodine/topical haemostats, and pharmacological agents not licensed for IV use; obstetric and oncological use is now supported with a leucodepletion filter (NICE TA/OAA-AAGBI)",
        "ROTEM/TEG enables goal-directed transfusion — FIBTEM guides fibrinogen, EXTEM guides FFP/platelets",
        "TXA within 3 hours of trauma reduces mortality (CRASH-2)",
        "Massive transfusion: hypocalcaemia is the most dangerous metabolic complication — give CaCl₂ early",
        "Lethal triad: hypothermia + acidosis + coagulopathy — damage control resuscitation breaks the cycle",
        "DIC: ISTH score ≥5 = overt DIC. Treat the underlying cause — the most important intervention",
        "DIC vs TTP: coagulation screen normal in TTP, abnormal in DIC. Never give platelets in TTP",
        "TXA contraindicated in DIC with predominant thrombosis — only if hyperfibrinolysis dominant",
      ]}
      coreConcepts={
        <>
          <ExamSection id="cascade" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Coagulation Cascade — Foundations</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A working knowledge of the intrinsic, extrinsic and common pathways underpins interpretation of clotting tests, transfusion targets, and the rational use of factor concentrates and antifibrinolytics covered below.
            </p>
            <CoagulationCascadeDiagram />
          </ExamSection>

          <ExamSection id="products" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.6"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Blood Products</h2>
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
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Platelets</td><td>1 ATD = pool of 4 donors</td><td>20–24°C with agitation, 5-day shelf life. Target &gt;75 ×10⁹/L.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Tranexamic Acid</td><td>Lysine analogue antifibrinolytic</td><td>1 g IV &lt;3 h post-injury (CRASH-2). PPH (WOMAN). Avoid in thrombotic DIC.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fibrinogen Concentrate</td><td>Purified, pasteurised. 1 g vial.</td><td>Room-T, ~10 min reconstitution. 30–50 mg/kg. No ABO. Lower infection risk than cryo.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">PCC (4-factor)</td><td>II, VII, IX, X + Protein C/S</td><td>Warfarin reversal: dose by INR. Give with IV vit K 5–10 mg. Recheck INR at 30 min and 6–8 h.</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="lifespans" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.6"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Component Lifespans & In-vivo Survival</h2>
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
          </ExamSection>

          <ExamSection id="cryo-vs-fib" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cryoprecipitate vs Fibrinogen Concentrate</h2>
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
          </ExamSection>

          <ExamSection id="reactions" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Transfusion Reactions</h2>
            <div className="space-y-2">
              {[
                { reaction: "Acute Haemolytic", incidence: "1:40,000", features: "ABO incompatibility. Fever, pain, haemoglobinuria, DIC, AKI. STOP transfusion immediately." },
                { reaction: "Febrile Non-Haemolytic", incidence: "1:300", features: "Cytokine accumulation. Temp ↑ >1°C. Slow/stop, paracetamol, exclude haemolysis." },
                { reaction: "TRALI", incidence: "1:5,000", features: "Non-cardiogenic pulmonary oedema within 6 h. Donor anti-HLA antibodies. Supportive — no diuretics." },
                { reaction: "TACO", incidence: "1:100 (elderly/cardiac)", features: "Volume overload. Raised BNP/JVP. Diuretics, slow rate." },
                { reaction: "Allergic/Anaphylactic", incidence: "Urticaria 1:100, anaphylaxis 1:40,000", features: "IgA deficiency → anaphylaxis with IgA-containing products. Adrenaline, washed products in future." },
              ].map((r) => (
                <div key={r.reaction} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{r.reaction} <span className="font-normal text-xs text-muted-foreground">({r.incidence})</span></p>
                  <p className="text-sm text-muted-foreground mt-1">{r.features}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="mtp" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.6"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Massive Transfusion Protocol (MTP)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Defined as one entire blood volume in 24 h (~10 units PRBC in 70 kg adult), or &gt;4 units in 1 h with ongoing bleeding. Activation enables coordinated product delivery.
            </p>
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
          </ExamSection>

          <ExamSection id="rotem" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Viscoelastic Testing (ROTEM/TEG)</h2>
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
          </ExamSection>

          <ExamSection id="trials" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Transfusion Trials</h2>
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
          </ExamSection>

          <ExamSection id="dic" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.6", "EDIC 5.6"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Disseminated Intravascular Coagulation</h2>
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

            <div className="p-3 rounded-lg bg-secondary/50 border border-destructive/30">
              <p className="text-sm font-semibold text-foreground mb-1">⚠️ DIC vs TTP/HUS</p>
              <p className="text-sm text-muted-foreground">
                Both cause MAHA + thrombocytopenia. In TTP: ADAMTS13 &lt;10%, coagulation screen typically NORMAL. Treat with plasma exchange — do NOT transfuse platelets. In DIC: PT/APTT/fibrinogen abnormal. Always check ADAMTS13 if MAHA + thrombocytopenia without clear DIC trigger.
              </p>
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default TransfusionCoagulationTopic;
