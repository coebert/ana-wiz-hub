import { TopicTemplate } from "@/components/TopicTemplate";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { ExamMappingBadges } from "@/components/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { enhancedRecoveryQuestions } from "@/data/quizzes";
import { DiagramSection } from "@/components/DiagramSection";
import { TrendingDown, TrendingUp, Award, FlaskConical } from "lucide-react";
import { InlineRef } from "@/components/InlineRef";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Outline the three temporal pillars (pre/intra/postoperative) of an ERAS pathway",
  "Explain how each ERAS element attenuates the surgical neuroendocrine, inflammatory and metabolic stress response",
  "Quote the magnitude of LOS, complication and mortality benefit from landmark ERAS evidence",
  "Apply the Apfel score and design multimodal PONV prophylaxis",
  "Describe specialty-specific protocols (colorectal, arthroplasty, cardiac) and the implementation/audit framework (EIAS)",
];

const keyPoints = [
  { text: "ERAS reduces length of stay by 30–50% and complications by ~40% (Cochrane RR 0.60); compliance ≥ 70% is the dose–response threshold", cites: ["Cochrane 2011", "ERAS Compliance 2015"] },
  { text: "Landmark evidence: ERAS Compliance Group 2015, LAFA, POWER, Cochrane 2020 — consistent across colorectal, urological, hepatobiliary, orthopaedic and now cardiac surgery", cites: ["ERAS Compliance 2015", "LAFA 2011", "POWER 2019", "Cochrane 2011"] },
  { text: "RELIEF trial: 'restrictive' fluid (≤ 6 mL/kg/h) increases AKI — current ERAS standard is goal-directed, zero-balance fluid therapy", cites: ["RELIEF 2018", "OPTIMISE 2014"] },
  { text: "Carbohydrate loading 2h pre-op reduces insulin resistance and improves patient well-being", cites: ["ERAS Colorectal 2018", "Ljungqvist 2017"] },
  { text: "Prehabilitation (4–6 weeks structured exercise) and IV iron for anaemia (Hb target > 130 men / > 120 women) reduce complications and transfusion", cites: ["Ljungqvist 2017", "Hughes 2014"] },
  { text: "ERAS Cardiac (2019) and arthroplasty (2020) protocols extend benefits beyond GI surgery; TXA + spinal anaesthesia + LIA are pillars in joint replacement", cites: ["ERAS Cardiac 2019", "ERAS Arthroplasty 2020"] },
  { text: "Apfel PONV score (female, non-smoker, PONV history, opioids) — multimodal prophylaxis for ≥ 2 risk factors", cites: ["ERAS Colorectal 2018"] },
  { text: "Implementation requires MDT champion, dedicated coordinator, audit (EIAS), and order-set bundles — NHS programme saved £70–90 m/yr in bed-days", cites: ["NHS EPRR 2013", "POWER 2019"] },

];

const EnhancedRecoveryTopicWorkedExamples: WorkedExample[] = [
  {
    title: "ERAS pathway for elective colorectal resection",
    scenario: "A 65-year-old for elective laparoscopic right hemicolectomy. Outline the key ERAS elements from pre-admission to discharge that you control as anaesthetist.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Pre-op: pre-habilitation, treat anaemia (IV iron), carbohydrate drink up to 2 h pre-op, avoid mechanical bowel prep, no premed sedation</li>
          <li>Intra-op: short-acting agents, opioid-sparing (TAP block or epidural for open, IV lidocaine infusion for laparoscopic), goal-directed fluids (avoid &gt;2 L crystalloid), normothermia, PONV prophylaxis (≥2 agents)</li>
          <li>Avoid routine drains and NG tubes; remove urinary catheter early</li>
          <li>Post-op: multimodal analgesia (paracetamol + NSAID + LA infiltration), early oral intake, mobilise day 0</li>
          <li>Audit: discharge by day 3–4; readmission monitored</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Liberal fluid administration causing bowel oedema and ileus</li>
          <li>Opioid-heavy analgesia delaying gut function</li>
          <li>Hypothermia (&lt;36 °C) tripling wound infection risk</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Apply the ERAS bundle: carb loading, opioid-sparing analgesia, goal-directed fluids, normothermia, early feeding and mobilisation.",
    cites: ["Ljungqvist 2017", "ERAS Colorectal 2018", "Hughes 2014"],
  },
];

const EnhancedRecoveryTopic = () => {
  return (
    <TopicTemplate
      title="Enhanced Recovery (ERAS)"
      subtitle="FRCA / FFICM — Perioperative Medicine"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-perioperative"
      topicId="enhanced-recovery"
      topicTitle="Enhanced Recovery (ERAS)"
      workedExamples={EnhancedRecoveryTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={enhancedRecoveryQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "Ljungqvist 2017",
          "ERAS Colorectal 2018",
          "Hughes 2014",
          "ERAS Compliance 2015",
          "LAFA 2011",
          "EnROL 2014",
          "Cochrane 2011",
          "Greco 2014",
          "POWER 2019",
          "RELIEF 2018",
          "OPTIMISE 2014",
          "ERAS Arthroplasty 2020",
          "ERAS Cardiac 2019",
          "POISE-1 2008",
          "NHS EPRR 2013",
        ],
        keyPoints: [
          "Ljungqvist 2017",
          "ERAS Colorectal 2018",
          "Hughes 2014",
          "ERAS Compliance 2015",
          "LAFA 2011",
          "EnROL 2014",
          "Cochrane 2011",
          "Greco 2014",
          "POWER 2019",
          "RELIEF 2018",
          "OPTIMISE 2014",
          "ERAS Arthroplasty 2020",
          "ERAS Cardiac 2019",
          "POISE-1 2008",
          "NHS EPRR 2013",
        ],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.FINAL]} className="scroll-mt-24">
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ERAS Principles</h2>
          <ExamMappingBadges exams={[Exam.FINAL]} curriculumCodes={["PO_BK_03"]} />
              <p className="text-muted-foreground leading-relaxed mb-3">
                Enhanced Recovery After Surgery is a multimodal, evidence-based perioperative care pathway that reduces surgical stress, maintains physiological function, and accelerates recovery.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Preoperative</p>
                  <p className="text-sm text-muted-foreground mt-1">Patient education & counselling. Optimisation (anaemia, nutrition, fitness — prehabilitation). Carbohydrate loading (maltodextrin drink 2h pre-op). No prolonged fasting (clear fluids 2h, solids 6h).</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Intraoperative</p>
                  <p className="text-sm text-muted-foreground mt-1">Short-acting anaesthetics. Regional/neuraxial analgesia. GDFT. Normothermia. Minimally invasive surgery. Avoid drains/NG tubes where possible. Antiemetic prophylaxis.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Postoperative</p>
                  <p className="text-sm text-muted-foreground mt-1">Early oral intake (day 0). Early mobilisation (day 0). Multimodal opioid-sparing analgesia. Remove catheters/lines early. Planned discharge criteria (not time-based).</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Surgical Stress Response</h2>
          <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PO_BK_03"]} />
              <p className="text-muted-foreground leading-relaxed mb-3">
                Surgery triggers neuroendocrine, metabolic, and inflammatory responses. ERAS aims to attenuate these:
              </p>
              <div className="space-y-2">
                {[
                  { response: "Neuroendocrine", effect: "↑ Cortisol, catecholamines, ADH, aldosterone. Causes: Na⁺/H₂O retention, hyperglycaemia, insulin resistance, protein catabolism." },
                  { response: "Inflammatory", effect: "IL-6, TNF-α, CRP rise. Proportional to tissue injury (minimally invasive surgery attenuates). Contributes to organ dysfunction." },
                  { response: "Metabolic", effect: "Insulin resistance (up to 14 days post-major surgery). Carbohydrate loading + epidural analgesia reduce insulin resistance." },
                  { response: "Immunological", effect: "Cell-mediated immunity suppressed. T-cell function impaired. Increased infection susceptibility. Blood transfusion adds immunosuppression (TRIM effect)." },
                ].map((r) => (
                  <div key={r.response} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{r.response}</p>
                    <p className="text-sm text-muted-foreground mt-1">{r.effect}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Prehabilitation</h2>
          <ExamMappingBadges exams={[Exam.FINAL]} curriculumCodes={["PO_BK_03"]} />
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Exercise</p>
                  <p className="text-sm text-muted-foreground mt-1">Structured exercise programme 4–6 weeks pre-surgery. Improves cardiorespiratory fitness (AT/VO₂ peak). Reduces postoperative complications. Supervised, individualised, multimodal.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Anaemia Optimisation</p>
                  <p className="text-sm text-muted-foreground mt-1">Iron deficiency: IV iron (ferric carboxymaltose — 1g single dose). Target Hb {'>'} 130 g/L (men) or {'>'} 120 g/L (women). NICE NG24. Reduces transfusion rates by 30–50%.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postoperative Nausea & Vomiting (PONV)</h2>
          <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PO_BK_03", "PH_BK_12"]} />
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Apfel Score (Risk Factors)</p>
                  <p className="text-sm text-muted-foreground mt-1">Female, non-smoker, history of PONV/motion sickness, postoperative opioids. 0 factors = 10%, 4 factors = 80% risk.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Multimodal Prophylaxis</p>
                  <p className="text-sm text-muted-foreground mt-1">Ondansetron (5-HT₃), dexamethasone 4–8 mg (at induction), cyclizine (H₁), droperidol. TIVA reduces PONV vs volatile. Each antiemetic from different class reduces risk by 25%.</p>
                </div>
              </div>
            </div>
          </section>

          <DiagramSection
            title="Evidence Base — Outcome Effects of ERAS"
            intro={
              <p>
                ERAS pathways have one of the largest evidence bases in perioperative medicine. Effects are most pronounced in colorectal, hepatobiliary, urological, and orthopaedic surgery, and are reproducible across hospital systems.
              </p>
            }
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {[
                { icon: TrendingDown, stat: "−30 to 50%", label: "Length of stay", detail: "Colorectal LOS reduced from 8–10 to 4–5 days" },
                { icon: TrendingDown, stat: "−40%", label: "Overall complications", detail: "Pulmonary, infective, cardiac (RR ~0.60)" },
                { icon: TrendingDown, stat: "−50%", label: "Readmission risk", detail: "When ≥ 70% protocol compliance achieved" },
                { icon: TrendingUp, stat: "≥ 70%", label: "Compliance threshold", detail: "Dose–response: outcomes improve with each additional element" },
              ].map((m) => (
                <div key={m.label} className="p-4 rounded-lg border border-border bg-card">
                  <m.icon className="h-5 w-5 text-perioperative mb-2" />
                  <p className="text-2xl font-serif font-bold text-foreground">{m.stat}</p>
                  <p className="text-xs font-semibold text-foreground mt-1">{m.label}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{m.detail}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-perioperative" /> Landmark trials & meta-analyses
              </p>
              {[
                { trial: "ERAS Compliance Group (Ann Surg 2015)", refLabel: "ERAS Compliance 2015", n: "n = 2,352 colorectal", finding: "Each 10% increase in protocol compliance reduced 30-day morbidity (OR 0.86) and LOS. Compliance > 70% was the inflection point for benefit." },
                { trial: "LAFA Trial (Ann Surg 2011)", refLabel: "LAFA 2011", n: "n = 400 colonic resection", finding: "2×2 factorial: laparoscopy + ERAS vs open + traditional care. Laparoscopy was the dominant LOS driver; ERAS reduced LOS independently. Combined arm: median LOS 5 days vs 7." },
                { trial: "EnROL (J Clin Oncol 2014)", refLabel: "EnROL 2014", n: "n = 204 colorectal", finding: "Lap vs open within an ERAS pathway. Laparoscopy reduced physical fatigue and time to recovery (median 5 vs 7 d). Confirmed ERAS benefits hold within minimally invasive surgery." },
                { trial: "Cochrane Review (Spanjersberg 2011 / Greco 2014)", refLabel: "Cochrane 2011", n: "RCT meta-analysis", finding: "ERAS reduced LOS by ~2.5 days and overall complications (RR 0.60, 95% CI 0.46–0.76) without increase in readmission or mortality." },
                { trial: "POWER Study (JAMA Surg 2019)", refLabel: "POWER 2019", n: "n = 2,084 elective colorectal, 80 hospitals", finding: "Higher per-protocol ERAS adherence independently reduced moderate-to-severe complications (OR 0.34) and 30-day mortality." },
                { trial: "RELIEF Trial (NEJM 2018)", refLabel: "RELIEF 2018", n: "n = 3,000 major abdominal", finding: "Restrictive (~6 mL/kg/h) vs liberal (~10 mL/kg/h) IV fluid. Restrictive arm had higher AKI (8.6% vs 5.0%). Re-defined 'goal-directed, zero-balance' as the ERAS fluid target — not blanket restriction." },
                { trial: "OPTIMISE (JAMA 2014)", refLabel: "OPTIMISE 2014", n: "n = 734 high-risk GI surgery", finding: "Cardiac output–guided GDFT showed a non-significant reduction in 30-day complications; supports individualised haemodynamic optimisation within ERAS." },
              ].map((t) => (
                <div key={t.trial} className="p-3 rounded-lg border border-border bg-card">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <p className="font-semibold text-foreground text-sm">
                      {t.trial}
                      <InlineRef topicId="enhanced-recovery" refLabel={t.refLabel} />
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">{t.n}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t.finding}</p>
                </div>
              ))}
            </div>
          </DiagramSection>

          <DiagramSection
            title="Exemplar ERAS Protocols by Surgical Specialty"
            intro={
              <p>
                ERAS® Society guidelines now exist for &gt; 20 procedures. The principles are conserved but specific elements (analgesic strategy, drain use, mobilisation timing) are tailored. Below: three of the most evidence-rich pathways.
              </p>
            }
          >
            <div className="space-y-4">
              {[
                {
                  title: "Colorectal Surgery",
                  subtitle: "ERAS® Society 2018 (Gustafsson et al, World J Surg)",
                  refLabel: "ERAS Colorectal 2018",
                  evidence: "Original and most validated pathway. Median LOS 4–5 d (vs 8–10), complications −40%.",
                  elements: [
                    "Pre-op: counselling + carb load (50 g maltodextrin 2h pre-op); no mechanical bowel prep for colon (selective for rectal)",
                    "Intra-op: thoracic epidural OR TAP block + lidocaine infusion; laparoscopic approach; goal-directed fluid (CO monitor); normothermia ≥ 36°C",
                    "Post-op: chewing gum + early enteral nutrition day 0; mobilise > 2h day 0, > 6h day 1; remove urinary catheter day 1; multimodal opioid-sparing analgesia",
                  ],
                },
                {
                  title: "Hip & Knee Arthroplasty",
                  subtitle: "ERAS® Society 2020 (Wainwright et al, Acta Orthop)",
                  refLabel: "ERAS Arthroplasty 2020",
                  evidence: "Day-of-surgery discharge feasible in selected patients. LOS reduced from 5–7 d to 1–3 d; transfusion rates ↓ ~70% with TXA.",
                  elements: [
                    "Pre-op: prehab exercise + iron optimisation; spinal anaesthesia preferred over GA (lower DVT, blood loss, mortality)",
                    "Intra-op: tranexamic acid 15 mg/kg IV (or topical); local infiltration analgesia (LIA — bupivacaine ± adrenaline ± ketorolac); avoid drains and urinary catheters",
                    "Post-op: mobilise within 4h of return to ward; no PCA opioids (oral multimodal); discharge criteria-based, often day 1–2",
                  ],
                },
                {
                  title: "Cardiac Surgery (ERAS® Cardiac)",
                  subtitle: "Engelman et al, JAMA Surg 2019",
                  refLabel: "ERAS Cardiac 2019",
                  evidence: "Newest pathway. Reduces ICU LOS, opioid consumption, and ventilation time; non-inferior safety.",
                  elements: [
                    "Pre-op: carb load if not diabetic; correct anaemia (IV iron); insulin sliding scale (target 7.8–10 mmol/L)",
                    "Intra-op: bilateral parasternal / erector spinae blocks; opioid-sparing TIVA option; goal-directed perfusion on bypass; rigid sternal fixation in selected pts",
                    "Post-op: extubation within 6h ('fast-track'); chest drain removal day 1 if drainage < 150 mL/8h; early mobilisation; multimodal analgesia (paracetamol + dexmedetomidine + regional)",
                  ],
                },
              ].map((p) => (
                <div key={p.title} className="p-4 rounded-lg border-2 border-perioperative/40 bg-perioperative/5">
                  <div className="flex items-start gap-2 mb-2">
                    <Award className="h-5 w-5 text-perioperative mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">
                        {p.title}
                        <InlineRef topicId="enhanced-recovery" refLabel={p.refLabel} />
                      </p>
                      <p className="text-xs text-muted-foreground">{p.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground mb-2 italic">{p.evidence}</p>
                  <ul className="space-y-1.5">
                    {p.elements.map((e, i) => (
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-perioperative">
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DiagramSection>

          <DiagramSection
            title="Implementation, Compliance & Audit"
            intro={
              <p>
                ERAS is an <em>implementation science</em> challenge as much as a clinical one. Outcomes correlate tightly with measured compliance — the ERAS® Interactive Audit System (EIAS) is the validated tool.
              </p>
            }
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">Barriers to compliance</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-4">
                  <li>Surgeon preference (drains, NG tubes, prolonged fasting)</li>
                  <li>Lack of dedicated ERAS nurse coordinator</li>
                  <li>Out-of-hours admissions bypassing pathway</li>
                  <li>Patient comorbidity / frailty (real or perceived)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">Enablers</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-4">
                  <li>Multidisciplinary team with named champion</li>
                  <li>Pre-printed order sets / electronic prescribing bundles</li>
                  <li>Continuous audit + feedback (EIAS dashboard)</li>
                  <li>Patient-held diary with daily milestones</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-lg border-l-4 border-perioperative bg-perioperative/5">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Health-economic impact:</span> The NHS Enhanced Recovery Partnership Programme (2009–13)<InlineRef topicId="enhanced-recovery" refLabel="NHS EPRR 2013" /> demonstrated mean LOS reduction of 1.6–2.6 days across colorectal, urological, gynaecological and orthopaedic surgery, with estimated annual savings of <strong>£70–90 million</strong> in bed-days alone, without increased readmission or mortality.
              </p>
            </div>
          </DiagramSection>
        <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              'Three pillars: prehabilitation, intra-operative optimisation, structured postoperative recovery — outcomes depend on the whole bundle, not individual elements.',
              'Carbohydrate drinks up to 2 h preoperatively (unless diabetic gastroparesis) — reduces insulin resistance and improves wellbeing.',
              'Goal-directed fluid therapy with stroke-volume optimisation reduces complications in major surgery — avoid both salt/water overload and hypovolaemia.',
              'Opioid-sparing multimodal analgesia (paracetamol + NSAID + regional + dexamethasone) is core to ERAS — long-acting opioids delay return of gut function.',
              'Early mobilisation, removal of drains/catheters and oral intake within 24 h are key recovery milestones.',
              'Audit compliance — ERAS benefit is dose-dependent (≥70% bundle compliance correlates with reduced LOS and morbidity).',
            ]}
          />
        </ExamSection>
      }
    />
  );
};

export default EnhancedRecoveryTopic;
