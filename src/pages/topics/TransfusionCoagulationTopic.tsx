import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { transfusionCoagulationQuestions } from "@/data/quizzes";
import CoagulationCascadeDiagram from "@/components/diagrams/CoagulationCascadeDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const TransfusionCoagulationTopic = () => {
  return (
    <SectionLayout title="Transfusion & Coagulation" subtitle="FRCA / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Coagulation Cascade — Foundations</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A working knowledge of the intrinsic, extrinsic and common pathways underpins interpretation of clotting tests, transfusion targets, and the rational use of factor concentrates and antifibrinolytics covered below.
        </p>
        <CoagulationCascadeDiagram />
      </section>

      <section className="space-y-6 mb-10">
        <div>
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
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Packed Red Cells</td><td>Hb ~200 g/L, Hct ~0.55, volume ~280 ml</td><td>2–6°C for 35 days. Transfuse over 2–4 hrs. Storage lesion: ↓2,3-DPG, ↑K⁺, ↓pH.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">FFP</td><td>All clotting factors, fibrinogen ~3 g/L</td><td>Thaw required (30 min). Dose 15 ml/kg. Must be ABO-compatible.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cryoprecipitate</td><td>Fibrinogen, FVIII, vWF, FXIII</td><td>2 pools (10 units) ↑ fibrinogen by ~1 g/L. Target fibrinogen {'>'} 1.5 g/L in bleeding.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Platelets</td><td>1 ATD = pool of 4 donors</td><td>20–24°C with agitation, 5-day shelf life. Target {'>'} 75 × 10⁹/L in active bleeding.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Tranexamic Acid</td><td>Lysine analogue — antifibrinolytic</td><td>1g IV {'<'} 3h post-injury (CRASH-2). Used in PPH, cardiac surgery. Contraindicated in DIC with predominant thrombosis.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fibrinogen Concentrate</td><td>Purified, pasteurised human fibrinogen (RiaSTAP / Haemocomplettan P). 1 g vial → reconstitute in 50 mL water.</td><td>Room temperature storage, rapid reconstitution (~10 min vs 30 min thaw for cryo). Dose: 30–50 mg/kg (typically 2–4 g). 1 g raises plasma fibrinogen by ~0.4 g/L (70 kg). No ABO matching required. Viral inactivation steps — lower infection risk than cryo. Target fibrinogen {'>'} 1.5–2.0 g/L in major haemorrhage.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Prothrombin Complex Concentrate (PCC)</td><td>4-factor PCC (e.g. Beriplex P/N, Octaplex): factors II, VII, IX, X + protein C & S.</td><td>Room temperature storage, rapid preparation. Dose by INR: INR 2–4 → 25 IU/kg; INR 4–6 → 35 IU/kg; INR {'>'} 6 → 50 IU/kg (max 5000 IU). Give with IV vitamin K 5–10 mg. Primary indication: emergency reversal of warfarin. Also used in major haemorrhage (liver failure, coagulopathy). Prothrombotic risk — avoid in HIT, DIC. Recheck INR at 30 min and 6–8 h.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cryoprecipitate vs Fibrinogen Concentrate</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Both are used to replace fibrinogen in major haemorrhage, but they differ in preparation, safety profile, and evidence base.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left py-2 text-foreground font-semibold">Cryoprecipitate</th>
                  <th className="text-left py-2 text-foreground font-semibold">Fibrinogen Concentrate</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Source</td><td>Pooled donor plasma (typically 5 donors per pool)</td><td>Purified from pooled human plasma, industrially manufactured</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Contents</td><td>Fibrinogen, FVIII, vWF, FXIII, fibronectin</td><td>Purified fibrinogen only</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fibrinogen per dose</td><td>~3–4 g per 2 pools (10 units)</td><td>1 g per vial (typical dose 2–4 g)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Storage</td><td>Frozen (−25°C). 30 min thaw required.</td><td>Room temperature. Lyophilised powder — reconstitute in ~10 min.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ABO matching</td><td>ABO-compatible required</td><td>Not required</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Viral safety</td><td>Donor-screened but NOT virally inactivated. Pooled donor exposure.</td><td>Pasteurised + nanofiltration. Very low transmission risk.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Volume</td><td>~200 mL per 2 pools</td><td>50 mL per 1 g vial (lower volume)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Standardisation</td><td>Variable fibrinogen content between units</td><td>Precise, standardised dosing</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cost</td><td>Lower per dose (NHS)</td><td>Higher per dose (~£500–700 per 2 g)</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Availability (UK)</td><td>Widely available — standard NHS blood product</td><td>Licensed in UK but not universally stocked. Increasing use.</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Key Evidence</h3>
          <div className="space-y-2 mb-3">
            {[
              { trial: "CRYOSTAT-2 (2023)", detail: "Multicentre UK RCT. Early cryoprecipitate (within 90 min) vs standard care in major trauma haemorrhage. Higher fibrinogen levels achieved but NO significant difference in 28-day mortality (primary outcome) or transfusion requirements. Supports targeting fibrinogen but questions the mortality benefit of early empiric supplementation." },
              { trial: "FIB-PPH (2023)", detail: "Early fibrinogen concentrate (2 g) vs placebo in PPH. No reduction in RBC transfusion or progression to severe PPH. Suggests empiric fibrinogen replacement without confirmed hypofibrinogenaemia is not beneficial." },
              { trial: "FIBRES (2019)", detail: "Canadian RCT in cardiac surgery. Fibrinogen concentrate vs cryoprecipitate for bleeding post-CPB with fibrinogen <2 g/L. Non-inferior — no difference in RBC transfusion within 24 h. Fibrinogen concentrate was faster to administer." },
              { trial: "RETIC (2017)", detail: "Small Austrian RCT in trauma. Fibrinogen concentrate + PCC vs FFP-based strategy. Fibrinogen group had less total blood product use. Limited by small sample size." },
            ].map((e) => (
              <div key={e.trial} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{e.trial}</p>
                <p className="text-sm text-muted-foreground mt-1">{e.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              Know the practical advantages of fibrinogen concentrate (room temperature storage, rapid preparation, no ABO matching, viral inactivation, precise dosing) vs cryoprecipitate (cheaper, contains additional factors — FVIII, vWF, FXIII). Current evidence (CRYOSTAT-2, FIB-PPH) does not support empiric fibrinogen replacement before confirming hypofibrinogenaemia. FIBRES showed non-inferiority in cardiac surgery. Target fibrinogen {'>'} 1.5–2.0 g/L in active major haemorrhage — guided by ROTEM FIBTEM or Clauss assay.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Transfusion Reactions</h2>
          <div className="space-y-2">
            {[
              { reaction: "Acute Haemolytic", incidence: "1:40,000", features: "ABO incompatibility. Fever, pain, haemoglobinuria, DIC, renal failure. STOP transfusion immediately. Supportive care." },
              { reaction: "Febrile Non-Haemolytic", incidence: "1:300", features: "Commonest reaction. Cytokine accumulation. Temperature rise {'>'} 1°C. Slow/stop, paracetamol, exclude haemolysis." },
              { reaction: "TRALI", incidence: "1:5,000", features: "Non-cardiogenic pulmonary oedema within 6 hrs. Donor anti-HLA antibodies. Bilateral infiltrates, hypoxia. Supportive — no diuretics." },
              { reaction: "TACO", incidence: "1:100 (elderly/cardiac)", features: "Volume overload. Raised BNP/JVP, bilateral effusions. Diuretics, slow transfusion rate." },
              { reaction: "Allergic/Anaphylactic", incidence: "Urticaria 1:100, anaphylaxis 1:40,000", features: "IgA deficiency → anaphylaxis with IgA-containing products. Adrenaline, washed products for future." },
            ].map((r) => (
              <div key={r.reaction} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{r.reaction} <span className="font-normal text-xs text-muted-foreground">({r.incidence})</span></p>
                <p className="text-sm text-muted-foreground mt-1">{r.features}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Viscoelastic Testing (ROTEM/TEG)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Point-of-care coagulation assessment guiding targeted blood product therapy. Reduces empiric transfusion and improves outcomes.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">ROTEM Parameters</p>
              <p className="text-sm text-muted-foreground mt-1">EXTEM CT: extrinsic pathway (FFP). FIBTEM A5/MCF: fibrinogen contribution (cryoprecipitate if {'<'} 12mm). EXTEM MCF: platelet contribution. HEPTEM: heparin effect.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Goal-Directed Algorithm</p>
              <p className="text-sm text-muted-foreground mt-1">FIBTEM low → cryoprecipitate. EXTEM CT prolonged → FFP. EXTEM MCF low (FIBTEM normal) → platelets. HEPTEM shorter than INTEM → protamine. Reduces blood product use by 30–50%.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Transfusion Trials</h2>
          <div className="space-y-2">
            {[
              { trial: "TRICC (1999)", result: "Restrictive (Hb 70 g/L trigger) as safe as liberal (100 g/L) in most ICU patients. Lower in-hospital mortality trend." },
              { trial: "TRISS (2014)", result: "Restrictive (Hb 70) vs liberal (90) in septic shock — no difference in 90-day mortality or ischaemic events." },
              { trial: "TITRe2 (2015)", result: "Restrictive (Hb 75) vs liberal (90) post-cardiac surgery — restrictive non-inferior. Trend to higher mortality in restrictive group." },
              { trial: "PROPPR (2015)", result: "1:1:1 vs 1:1:2 (PRBC:FFP:Plt) in trauma — 1:1:1 achieved haemostasis faster, no mortality difference." },
            ].map((t) => (
              <div key={t.trial} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{t.trial}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.result}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Massive Transfusion Protocol (MTP)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Massive transfusion is defined as replacement of one entire blood volume within 24 hours (~70 mL/kg, ~10 units PRBC in a 70 kg adult), or {'>'} 4 units PRBC within 1 hour with ongoing bleeding anticipated. Activation of an MTP ensures rapid, coordinated delivery of blood products.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Triggers for MTP Activation</h3>
          <div className="space-y-2 mb-4">
            {[
              { trigger: "Clinical", detail: "Uncontrolled haemorrhage not responding to initial resuscitation. Obvious exsanguination (penetrating torso, open fracture, ruptured AAA). Shocked patient requiring emergency surgery/intervention." },
              { trigger: "Shock Index", detail: "Heart rate ÷ systolic BP. SI > 1.0 suggests significant haemorrhage. SI > 1.4 predicts massive transfusion requirement." },
              { trigger: "ABC Score", detail: "Assessment of Blood Consumption. Penetrating mechanism, SBP ≤90, HR ≥120, positive FAST. Score ≥2 predicts massive transfusion (sensitivity ~75%, specificity ~85%)." },
              { trigger: "ROTEM/TEG", detail: "Point-of-care viscoelastic testing to guide ongoing product replacement. FIBTEM A5 <12 mm → fibrinogen replacement. EXTEM CT >80 s → FFP." },
            ].map((t) => (
              <div key={t.trigger} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{t.trigger}</p>
                <p className="text-sm text-muted-foreground">{t.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Transfusion Ratios</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Empiric Fixed-Ratio Approach</p>
              <p className="text-sm text-muted-foreground mt-1">
                1:1:1 ratio of PRBC : FFP : platelets (by units). Aims to approximate whole blood. PROPPR trial (2015): 1:1:1 achieved haemostasis faster than 1:1:2, with no difference in 24 h or 30-day mortality. Most UK MTPs use a pack system (e.g. MTP pack 1: 6 PRBC, 4 FFP, 1 ATD platelets).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Goal-Directed Approach</p>
              <p className="text-sm text-muted-foreground mt-1">
                ROTEM/TEG-guided replacement. Treats specific deficits rather than empiric ratios. Reduces overall blood product use by 30–50%. Increasingly favoured in cardiac surgery, liver transplant, and where POC testing is available. Combine with empiric approach in initial resuscitation phase.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">MTP Targets</h3>
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
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Haemoglobin</td><td>{'>'} 80 g/L (active bleeding)</td><td>Packed red cells</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fibrinogen</td><td>{'>'} 1.5–2.0 g/L</td><td>Cryoprecipitate or fibrinogen concentrate</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">PT/APTT ratio</td><td>{'<'} 1.5× normal</td><td>FFP 15 mL/kg</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Platelets</td><td>{'>'} 75 × 10⁹/L</td><td>1 ATD (adult therapeutic dose)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Calcium (iCa²⁺)</td><td>{'>'} 1.0 mmol/L</td><td>IV calcium chloride 10% (10 mL = 6.8 mmol)</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Temperature</td><td>{'>'} 35°C</td><td>Fluid warmer, forced-air warming, warm theatre</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Complications of Massive Transfusion</h3>
          <div className="space-y-2 mb-4">
            {[
              { complication: "Hypocalcaemia", detail: "Citrate in stored blood chelates ionised calcium. Most dangerous metabolic complication — causes myocardial depression, coagulopathy, vasodilation. Give 10 mL CaCl₂ 10% per 4 units PRBC or if iCa²⁺ <1.0 mmol/L." },
              { complication: "Hypothermia", detail: "Cold blood products (4°C) rapidly lower core temperature. Hypothermia worsens coagulopathy (enzyme function ↓), causes acidosis, and impairs cardiac function. Use fluid warmers for ALL products. Part of the 'lethal triad'." },
              { complication: "Hyperkalaemia", detail: "K⁺ increases in stored blood (~30–50 mmol/L by day 35). Risk of cardiac arrest, especially in rapid infusion and renal impairment. Use fresh blood if available. Monitor K⁺ frequently. Treat with insulin/dextrose, calcium." },
              { complication: "Coagulopathy", detail: "Dilutional coagulopathy — PRBC contain no clotting factors or platelets. Consumptive coagulopathy (DIC) from tissue injury + shock. Acidosis and hypothermia further impair clotting enzyme function." },
              { complication: "Metabolic Acidosis", detail: "Stored blood pH ~6.6–6.8 (lactic acid accumulation). Citrate metabolism generates bicarbonate → may cause late metabolic alkalosis after resuscitation." },
              { complication: "TRALI / TACO", detail: "TRALI: non-cardiogenic pulmonary oedema (donor antibodies). TACO: volume overload, especially elderly/cardiac patients. Differentiate by BNP, echo, clinical context." },
              { complication: "Hypomagnasaemia", detail: "Citrate also chelates magnesium. Worsens cardiac irritability and coagulopathy. Monitor and replace." },
            ].map((c) => (
              <div key={c.complication} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{c.complication}</p>
                <p className="text-sm text-muted-foreground">{c.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 border border-destructive/30 mb-3">
            <p className="text-sm font-semibold text-foreground mb-1">⚠️ The Lethal Triad</p>
            <p className="text-sm text-muted-foreground">
              Hypothermia + acidosis + coagulopathy form a self-perpetuating cycle of worsening haemorrhage. Damage control resuscitation aims to break this cycle: permissive hypotension (target SBP 80–90 until surgical control), minimise crystalloid, early blood products, TXA within 3 hours, correct hypothermia and calcium, and expedite definitive haemorrhage control (damage control surgery).
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              Massive transfusion is a very common FRCA/FFICM exam topic. Know: the lethal triad, citrate-induced hypocalcaemia (commonest dangerous complication), PROPPR trial (1:1:1), damage control resuscitation principles, and the late metabolic alkalosis from citrate metabolism. Remember that standard coagulation tests (PT/APTT) are performed at 37°C and may underestimate coagulopathy in a hypothermic patient — viscoelastic testing is more informative.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Disseminated Intravascular Coagulation (DIC)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            DIC is a systemic process of simultaneous widespread activation of coagulation and fibrinolysis, leading to microvascular thrombosis and consumptive coagulopathy. It is always secondary to an underlying condition and is not a diagnosis in itself.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Common Causes</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { cause: "Sepsis", detail: "Commonest cause in ICU. Endotoxin and inflammatory cytokines activate tissue factor pathway. Gram-negative > gram-positive." },
              { cause: "Trauma / Major Surgery", detail: "Tissue factor release from damaged tissue. Compounded by shock, hypothermia, acidosis (lethal triad)." },
              { cause: "Obstetric", detail: "Amniotic fluid embolism, placental abruption, pre-eclampsia/HELLP, retained products of conception." },
              { cause: "Malignancy", detail: "Acute promyelocytic leukaemia (APML — very high risk). Solid tumours (mucin-secreting adenocarcinomas). Tumour lysis syndrome." },
            ].map((c) => (
              <div key={c.cause} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{c.cause}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Pathophysiology</h3>
          <div className="space-y-2 mb-4">
            {[
              { phase: "Activation", detail: "Tissue factor exposure → massive thrombin generation → widespread fibrin deposition in microvasculature → end-organ ischaemia (renal, hepatic, pulmonary, cerebral)." },
              { phase: "Consumption", detail: "Clotting factors and platelets consumed faster than produced → coagulopathy and thrombocytopenia → bleeding from wounds, lines, mucosal surfaces." },
              { phase: "Fibrinolysis", detail: "Secondary plasmin activation breaks down fibrin clots → elevated D-dimers and FDPs. FDPs themselves are anticoagulant → worsen bleeding. Fibrinolytic shutdown may occur in trauma DIC." },
              { phase: "Anticoagulant Depletion", detail: "Antithrombin III, protein C, and protein S consumed. Loss of natural anticoagulant pathways perpetuates thrombosis." },
            ].map((p) => (
              <div key={p.phase} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{p.phase}</p>
                <p className="text-sm text-muted-foreground">{p.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">ISTH DIC Scoring System</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The International Society on Thrombosis and Haemostasis (ISTH) overt DIC score is the most widely used diagnostic tool. Score ≥5 = overt DIC. Repeat daily to monitor trajectory.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                  <th className="text-left py-2 text-foreground font-semibold">0 points</th>
                  <th className="text-left py-2 text-foreground font-semibold">1 point</th>
                  <th className="text-left py-2 text-foreground font-semibold">2 points</th>
                  <th className="text-left py-2 text-foreground font-semibold">3 points</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Platelet count</td>
                  <td>{'>'} 100 × 10⁹/L</td>
                  <td>50–100 × 10⁹/L</td>
                  <td>{'<'} 50 × 10⁹/L</td>
                  <td>—</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">D-dimer / FDPs</td>
                  <td>No increase</td>
                  <td>—</td>
                  <td>Moderate increase</td>
                  <td>Strong increase</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">PT prolongation</td>
                  <td>{'<'} 3 s</td>
                  <td>3–6 s</td>
                  <td>{'>'} 6 s</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Fibrinogen</td>
                  <td>{'>'} 1.0 g/L</td>
                  <td>{'<'} 1.0 g/L</td>
                  <td>—</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border" style={{ borderLeftWidth: 4, borderLeftColor: "#ef4444" }}>
              <p className="font-bold text-foreground text-sm mb-1">Overt DIC (Score ≥5)</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Clinical bleeding + microvascular thrombosis</li>
                <li>Requires active management</li>
                <li>Repeat score daily — trajectory matters</li>
                <li>Mortality correlates with score</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border" style={{ borderLeftWidth: 4, borderLeftColor: "#f59e0b" }}>
              <p className="font-bold text-foreground text-sm mb-1">Non-Overt DIC (Score {'<'} 5)</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Subclinical — haemostatic system compensating</li>
                <li>May progress to overt DIC</li>
                <li>Repeat scoring in 24–48 h</li>
                <li>Treat underlying cause aggressively</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Additional Investigations</h3>
          <div className="space-y-2 mb-4">
            {[
              { test: "Blood Film", detail: "Microangiopathic haemolytic anaemia (MAHA): schistocytes from shearing through fibrin strands. Also seen in TTP/HUS — must distinguish." },
              { test: "Antithrombin III", detail: "Low in DIC (consumed). May guide AT replacement therapy. Not part of ISTH score." },
              { test: "ROTEM/TEG", detail: "Consumptive pattern: prolonged CT, low MCF, increased lysis (ML >15%). More informative than PT/APTT for guiding targeted replacement." },
              { test: "Factor VIII vs V", detail: "Factor VIII preserved in DIC (acute phase reactant) but low in liver failure. Factor V low in both. Helps distinguish DIC from hepatic coagulopathy." },
            ].map((t) => (
              <div key={t.test} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{t.test}</p>
                <p className="text-sm text-muted-foreground">{t.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Management</h3>
          <div className="space-y-2 mb-4">
            {[
              { principle: "Treat the Cause", management: "The single most important intervention. DIC will not resolve without treating the underlying condition (antibiotics for sepsis, delivery in obstetric causes, ATRA in APML)." },
              { principle: "Supportive Replacement", management: "Transfuse to clinical targets, not lab values. Platelets: target >50 × 10⁹/L if bleeding, >20 if not. FFP 15 mL/kg if PT ratio >1.5 and bleeding. Cryoprecipitate/fibrinogen concentrate: target fibrinogen >1.5 g/L." },
              { principle: "Tranexamic Acid", management: "Consider ONLY if hyperfibrinolysis is dominant (ROTEM ML >15%). Contraindicated if thrombosis predominates — may worsen microvascular thrombosis." },
              { principle: "Anticoagulation", management: "Low-dose heparin may be considered if thrombosis is dominant (purpura fulminans, acral ischaemia) and bleeding is controlled. Full anticoagulation is rarely appropriate." },
              { principle: "AT Replacement", management: "AT concentrate if AT <50% and not responding. KyberSept trial — no overall mortality benefit in sepsis-DIC, but subgroup signal without heparin. Not routine." },
              { principle: "Activated Protein C", management: "Drotrecogin alfa — withdrawn (2011) after PROWESS-SHOCK showed no benefit. Historical/exam interest only." },
            ].map((m) => (
              <div key={m.principle} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{m.principle}</p>
                <p className="text-sm text-muted-foreground">{m.management}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 border border-destructive/30 mb-3">
            <p className="text-sm font-semibold text-foreground mb-1">⚠️ DIC vs TTP/HUS</p>
            <p className="text-sm text-muted-foreground">
              Both cause MAHA + thrombocytopenia but management differs critically. In TTP: ADAMTS13 {'<'} 10%, coagulation screen typically NORMAL (PT/APTT/fibrinogen). Treatment: plasma exchange — do NOT transfuse platelets (can worsen). In DIC: coagulation screen is abnormal (↑PT, ↓fibrinogen, ↑D-dimer). Always check ADAMTS13 if MAHA + thrombocytopenia without clear DIC trigger.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              Know the ISTH scoring system and its 4 components. Treating the underlying cause is the most important intervention. TXA is contraindicated in DIC with predominant thrombosis. Factor VIII is preserved in DIC (acute phase reactant) but low in liver failure — this distinguishes the two. Drotrecogin alfa was withdrawn after PROWESS-SHOCK — a favourite exam question.
            </p>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Restrictive transfusion (Hb 70 g/L trigger) is safe in most ICU patients — TRICC, TRISS",
        "TRALI: non-cardiogenic pulmonary oedema within 6h — do NOT give diuretics (unlike TACO)",
        "ROTEM/TEG enables goal-directed transfusion — FIBTEM guides fibrinogen, EXTEM guides FFP/platelets",
        "TXA within 3 hours of trauma injury reduces mortality (CRASH-2)",
        "Massive transfusion: hypocalcaemia is the most dangerous metabolic complication — give CaCl₂ early",
        "Lethal triad: hypothermia + acidosis + coagulopathy — damage control resuscitation breaks the cycle",
        "DIC: ISTH score ≥5 = overt DIC. Treat the underlying cause — the most important intervention",
        "DIC vs TTP: coagulation screen normal in TTP, abnormal in DIC. Never give platelets in TTP",
        "TXA contraindicated in DIC with predominant thrombosis — only if hyperfibrinolysis dominant",
      ]} />

      <QuizSection questions={transfusionCoagulationQuestions} />
      <ReferencesList topicId="transfusion-coagulation" />

      <SeeAlso topicId="transfusion-coagulation" />
        <TopicCompletionToggle topicId="transfusion-coagulation" topicTitle="Transfusion & Coagulation" />
    </SectionLayout>
  );
};

export default TransfusionCoagulationTopic;
