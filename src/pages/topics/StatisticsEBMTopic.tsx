import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { statisticsEBMQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import NormalDistributionDiagram from "@/components/diagrams/physics/NormalDistributionDiagram";
import SkewDistributionDiagram from "@/components/diagrams/physics/SkewDistributionDiagram";
import CentralTendencyShiftDiagram from "@/components/diagrams/physics/CentralTendencyShiftDiagram";
import BoxPlotDiagram from "@/components/diagrams/physics/BoxPlotDiagram";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const statisticsEbmFaqs: Array<[string, string]> = [
  [
    "What is the difference between type I and type II error?",
    "Type I (α) — false positive: rejecting a true null hypothesis. Set conventionally at 0.05. Type II (β) — false negative: failing to reject a false null hypothesis. Power = 1 − β, usually set at 0.8. Type I error is reduced by smaller α; Type II error by larger sample size or effect size."
  ],
  [
    "Explain absolute risk reduction, relative risk reduction and number needed to treat.",
    "ARR = control event rate − treatment event rate. RRR = ARR / control event rate. NNT = 1 / ARR. Example: mortality 10 % → 8 %. ARR = 2 %, RRR = 20 %, NNT = 50 (treat 50 patients to prevent one death). RRR alone exaggerates clinically small effects; always quote ARR and NNT."
  ],
  [
    "What is the difference between sensitivity, specificity and likelihood ratio?",
    "Sensitivity = true positives / (true positives + false negatives) — ability to detect disease. Specificity = true negatives / (true negatives + false positives) — ability to exclude disease. Likelihood ratio + = sensitivity / (1 − specificity); LR+ >10 strongly increases post-test probability. Unlike PPV/NPV, LRs are independent of disease prevalence."
  ]
];

const objectives = [
  "Distinguish RCT, cohort, case-control, cross-sectional and ecological designs and their measures of effect",
  "Define p-value, type I/II error, power and confidence intervals correctly",
  "Calculate and interpret RR, OR, ARR, RRR and NNT/NNH from a 2×2 table",
  "Choose the correct statistical test based on data type, group number and distribution",
  "Interpret diagnostic test performance (sensitivity, specificity, PPV/NPV, LR, ROC)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "NNT for a perioperative intervention",
    scenario:
      "An RCT of perioperative beta-blockade reports 30-day mortality of 4% in the intervention group vs 6% in the control group. Calculate the absolute risk reduction, relative risk reduction and number needed to treat.",
    working:
      "Control event rate (CER) = 6% = 0.06\nExperimental event rate (EER) = 4% = 0.04\nARR = CER − EER = 0.06 − 0.04 = 0.02 (2%)\nRRR = ARR / CER = 0.02 / 0.06 = 0.33 (33%)\nNNT = 1 / ARR = 1 / 0.02 = 50",
    answer:
      "ARR 2%, RRR 33%, NNT 50 — i.e. 50 patients must receive perioperative beta-blockade to prevent one additional 30-day death.",
    cites: ["BJA Educ 2015"],
  },
  {
    title: "Post-test probability with likelihood ratios",
    scenario:
      "A patient has a pre-test probability of pulmonary embolism of 30%. A test has sensitivity 90% and specificity 80%. What is the post-test probability if the test is positive?",
    working:
      "LR+ = sensitivity / (1 − specificity) = 0.90 / 0.20 = 4.5\nPre-test odds = 0.30 / 0.70 = 0.43\nPost-test odds = pre-test odds × LR+ = 0.43 × 4.5 = 1.93\nPost-test probability = 1.93 / (1 + 1.93) = 0.66 (66%)",
    answer:
      "≈66%. The positive test raises the probability of PE from 30% to 66% — illustrating why pre-test probability matters as much as the test characteristics.",
    cites: ["Petrie & Sabin"],
  },
];

const StatisticsEBMTopic = () => {
  return (
    <TopicTemplate
      title="Statistics & Evidence-Based Medicine"
      subtitle="Study design, hypothesis testing, p-values, confidence intervals, odds ratios, and common statistical tests"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="statistics-ebm"
      topicTitle="Statistics & Evidence-Based Medicine"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={statisticsEBMQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Primary — Statistics"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2016",
          "Petrie & Sabin",
          "BJA Educ 2015",
        ],
        keyPoints: [
          "BJA Educ 2016",
          "Petrie & Sabin",
          "BJA Educ 2015",
        ],
        workedExamples: ["BJA Educ 2015", "Petrie & Sabin", "BJA Educ Measures of Association 2020", "BJA Educ Diagnostic Tests 2017", "BJA Educ Confidence Intervals 2019", "BJA Educ EBM 2021"],
      }}
      keyPoints={[
        { text: "A p-value is the probability of observing a result at least as extreme as the data, assuming the null hypothesis is true — NOT the probability the null is true", cites: ["BJA Educ 2016"] },
        { text: "Type I error (α): rejecting a true null (false positive). Type II error (β): failing to reject a false null. Power = 1 − β", cites: ["BJA Educ 2015"] },
        { text: "OR compares odds of exposure in cases vs controls; RR compares incidence — RR is only valid in cohort/RCT designs", cites: ["Petrie & Sabin"] },
        { text: "Number needed to treat (NNT) = 1 / absolute risk reduction (ARR). Contextualises clinical significance", cites: ["BJA Educ 2016"] },
        { text: "Parametric tests (t-test, ANOVA) assume normally distributed data; non-parametric tests (Mann-Whitney, Wilcoxon, Kruskal-Wallis) do not", cites: ["BJA Educ 2015"] },
        { text: "Sensitivity = TP/(TP+FN) — rules OUT disease (SnNOut); Specificity = TN/(TN+FP) — rules IN (SpPIn)", cites: ["Petrie & Sabin"] },
        { text: "Hierarchy of evidence: systematic reviews/meta-analyses > RCTs > cohort > case-control > case series > expert opinion", cites: ["BJA Educ 2016"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Statistics and evidence-based medicine (EBM) are examined across the Primary FRCA, Final FRCA, and FFICM. Understanding study design, measures of effect,
              hypothesis testing, and diagnostic test performance is essential for interpreting the literature and for clinical decision-making.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="study-design" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Study Design">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Randomised Controlled Trials (RCTs)</strong> are the gold standard for evaluating interventions. Randomisation minimises confounding; blinding
                reduces observer and participant bias. <strong>Double-blind</strong>: neither participant nor investigator knows allocation; <strong>triple-blind</strong>
                extends this to the data analyst.
              </p>
              <p>
                <strong>Cohort studies</strong> follow exposed and unexposed groups forward (prospective) or look back (retrospective). They measure
                <strong> relative risk (RR)</strong> and incidence. <strong>Case-control studies</strong> start with outcome (cases) and compare exposure history with
                controls — they measure the <strong>odds ratio (OR)</strong> but cannot directly calculate RR.
              </p>
              <p>
                <strong>Cross-sectional studies</strong> measure prevalence at a single time point. <strong>Ecological studies</strong> use population-level data and are
                prone to the ecological fallacy. <strong>Systematic reviews</strong> and <strong>meta-analyses</strong> sit at the top of the hierarchy of evidence but are
                only as good as the included studies.
              </p>
              <div className="grid md:grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg border border-border p-3"><strong className="text-foreground">RCT variants</strong><ul className="mt-2 list-disc pl-5 text-sm"><li><strong>Parallel:</strong> concurrent groups receive different treatments.</li><li><strong>Crossover:</strong> each patient receives each treatment, separated by washout; best for stable chronic disease without carry-over.</li><li><strong>Factorial:</strong> a 2×2 or larger design tests interventions and interaction efficiently.</li><li><strong>Cluster randomised:</strong> whole units (theatres, wards, hospitals) are randomised rather than individuals — practical for care-pathway interventions but requires analysis adjusted for the intracluster correlation.</li><li><strong>Superiority:</strong> designed to show the new treatment is better than comparator.</li><li><strong>Equivalence:</strong> designed to show the two treatments differ by no more than a pre-specified margin in either direction.</li><li><strong>Non-inferiority:</strong> tests whether a new treatment is not unacceptably worse than control by a pre-specified clinically acceptable margin — common in anaesthesia and critical care where a new agent offers practical advantages rather than greater efficacy.</li></ul><InlineRef topicId="statistics-ebm" refLabel="Petrie & Sabin" /></div>
                <div className="rounded-lg border border-border p-3"><strong className="text-foreground">Clinical trial phases</strong><ul className="mt-2 list-disc pl-5 text-sm"><li><strong>I:</strong> first-in-human safety, pharmacokinetics and dose-ranging, usually in few healthy volunteers.</li><li><strong>II:</strong> preliminary efficacy, safety and dose selection in affected patients.</li><li><strong>III:</strong> large comparative RCTs providing the main efficacy and safety evidence for approval.</li><li><strong>IV:</strong> post-marketing effectiveness, long-term safety and rare adverse effects.</li></ul><InlineRef topicId="statistics-ebm" refLabel="BJA Educ 2016" /></div>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="hypothesis-testing" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Hypothesis Testing & p-Values">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The <strong>null hypothesis (H₀)</strong> states there is no difference between groups. The <strong>alternative hypothesis (H₁)</strong> states a difference
                exists. A <strong>p-value</strong> is the probability of obtaining results at least as extreme as observed, assuming H₀ is true. By convention,
                p &lt; 0.05 is considered "statistically significant."
              </p>
              <p>
                <strong>Type I error (α)</strong>: rejecting a true null — false positive. The α level is conventionally 0.05. <strong>Type II error (β)</strong>: failing to reject
                a false null — false negative. <strong>Power (1 − β)</strong>: probability of detecting a true effect; aim for ≥0.8 (80%).
              </p>
              <p>
                <strong>Confidence intervals (CIs)</strong> express the precision of a sample estimate. Strictly: if the study were repeated many times, 95% of the resulting 95% CIs would contain the true population parameter — a single interval either does or does not, so CIs are not a direct probability statement about that interval. A 95% CI that does not cross the null value
                (0 for differences, 1 for ratios) corresponds to p &lt; 0.05. CIs are more informative than p-values alone — they convey both magnitude and precision.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="central-tendency" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Measures of Central Tendency & Spread">
            <div className="text-muted-foreground leading-relaxed space-y-3 mb-4">
              <p>
                A measure of central tendency summarises a dataset with a single "typical" value. The choice depends on the <strong>data type</strong> (nominal, ordinal, interval/ratio)
                and the <strong>shape of the distribution</strong>. Each measure has a paired measure of spread that should be reported alongside it.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-md border border-border bg-card">
                <p className="font-semibold text-foreground">Mean (x̄)</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">Σx / n</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Arithmetic average. Uses every value, so it is sensitive to outliers and skew.
                </p>
                <p className="text-xs text-foreground mt-2"><strong>Best for:</strong> symmetric, interval/ratio data (e.g. MAP, weight).</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Spread:</strong> standard deviation (SD), variance, SEM.</p>
              </div>
              <div className="p-3 rounded-md border border-border bg-card">
                <p className="font-semibold text-foreground">Median</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">middle value when ranked</p>
                <p className="text-sm text-muted-foreground mt-2">
                  The 50th centile. Robust to outliers and skew because it ignores their magnitude.
                </p>
                <p className="text-xs text-foreground mt-2"><strong>Best for:</strong> skewed or ordinal data (e.g. ICU LOS, pain scores, Apgar).</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Spread:</strong> interquartile range (IQR, Q1–Q3), range.</p>
              </div>
              <div className="p-3 rounded-md border border-border bg-card">
                <p className="font-semibold text-foreground">Mode</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">most frequent value</p>
                <p className="text-sm text-muted-foreground mt-2">
                  The peak of the distribution. The only valid measure for nominal categorical data, and useful for bimodal datasets.
                </p>
                <p className="text-xs text-foreground mt-2"><strong>Best for:</strong> nominal data (e.g. blood group), categorical counts.</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Spread:</strong> frequency table, proportions.</p>
              </div>
            </div>

            <div className="p-3 rounded-md bg-secondary/40 border border-border">
              <p className="font-semibold text-foreground text-sm">Choosing between them</p>
              <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-0.5">
                <li><strong>Symmetric, normally distributed:</strong> mean = median = mode → report mean (SD).</li>
                <li><strong>Skewed:</strong> mean is dragged toward the tail → report median (IQR) and consider non-parametric tests.</li>
                <li><strong>Bimodal:</strong> a single mean can be misleading; report both modes and consider whether two sub-populations are present.</li>
                <li><strong>Categorical / nominal:</strong> only the mode is meaningful (e.g. most common ASA grade).</li>
              </ul>
            </div>

            <div className="mt-6">
              <CentralTendencyShiftDiagram />
            </div>

            <div className="mt-6">
              <BoxPlotDiagram />
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-xs uppercase tracking-wide text-physics font-semibold">Worked clinical examples</p>

              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground mb-1">1. Mean arterial pressure (MAP) in a healthy preoperative cohort</p>
                <p className="text-sm text-muted-foreground mb-2">
                  In 200 ASA 1–2 adults the MAP follows a roughly symmetric, bell-shaped distribution: mean 92 mmHg, median 91 mmHg, SD 8 mmHg, IQR 86–97 mmHg.
                </p>
                <p className="text-sm"><strong className="text-foreground">Report:</strong> mean ± SD → <span className="font-mono">MAP 92 ± 8 mmHg</span>.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong className="text-foreground">Why:</strong> the data are continuous, approximately normally distributed and free of meaningful outliers, so the mean is an unbiased
                  central estimate and the SD captures variability efficiently. Use parametric tests (t-test, ANOVA) for between-group comparisons and quote a 95% CI for the mean.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground mb-1">2. ICU length of stay after emergency laparotomy</p>
                <p className="text-sm text-muted-foreground mb-2">
                  In 150 patients, LOS ranges from 1 to 42 days. Most discharge within a week; a tail of patients with sepsis or AKI stays much longer. Mean LOS 7.4 days, median 4 days, IQR 2–8 days.
                </p>
                <p className="text-sm"><strong className="text-foreground">Report:</strong> median (IQR) → <span className="font-mono">LOS 4 days (IQR 2–8)</span>.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong className="text-foreground">Why:</strong> LOS is positively skewed and bounded at zero — the mean is dragged up by a handful of long-stay outliers and overstates the
                  "typical" experience. The median resists this; the IQR conveys the spread of the middle 50%. Use non-parametric tests (Mann–Whitney U for two groups, Kruskal–Wallis for three or more), or
                  log-transform before a parametric test.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground mb-1">3. Postoperative pain score (NRS 0–10) at 24 h</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Pain is an <strong>ordinal</strong> 11-point scale. In 80 day-case patients the most frequent score is 2 (n = 26), median is 3, IQR 2–5; only a few patients report ≥8.
                </p>
                <p className="text-sm"><strong className="text-foreground">Report:</strong> median (IQR) — and the mode if you want to highlight the typical experience → <span className="font-mono">NRS 3 (IQR 2–5), mode 2</span>.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong className="text-foreground">Why:</strong> ordinal categories don't have equal arithmetic spacing, so the mean (e.g. 3.4) implies a precision the scale doesn't support. The median respects rank and the mode
                  identifies the commonest response. Compare groups with non-parametric tests (Wilcoxon signed-rank for paired, Mann–Whitney U for unpaired); for proportions above a clinical threshold (e.g. NRS ≥4) use χ² or Fisher's exact.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg border border-physics/30 bg-physics/5">
              <p className="text-xs uppercase tracking-wide text-physics font-semibold mb-2">Key learning points</p>
              <ul className="text-sm text-foreground space-y-1.5 list-disc list-inside marker:text-physics">
                <li><strong>Mean</strong> = Σx / n. Uses every value, so it is the most efficient summary for symmetric interval/ratio data — but is dragged toward outliers and the long tail of skewed data. Pair with <strong>SD</strong> (or SEM for an estimate of the mean).</li>
                <li><strong>Median</strong> = the middle (50th centile) value when ranked. Robust to outliers and skew because it depends on rank, not magnitude. Pair with <strong>IQR (Q1–Q3)</strong>; it is the preferred summary for skewed or ordinal data.</li>
                <li><strong>Mode</strong> = the most frequent value (peak of the distribution). The only valid measure for nominal categorical data, and useful for spotting bimodal datasets; unstable in small samples.</li>
                <li>In a perfectly symmetric distribution: <strong>mean = median = mode</strong>. As skew increases, the mean moves furthest, the median shifts modestly, and the mode stays at the peak — the gap between them is itself a clue to skew.</li>
                <li>Choose the summary that matches the data type and shape, then choose the corresponding test family: parametric (t-test/ANOVA) for mean ± SD on normal data; non-parametric (Mann–Whitney/Wilcoxon) for median (IQR) on skewed data.</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="measures-of-spread" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Measures of Spread (Dispersion)">
            <div className="text-muted-foreground leading-relaxed space-y-3 mb-4">
              <p>
                A measure of central tendency only describes the "middle" of a dataset; it tells you nothing about how tightly or loosely values are scattered around it.
                Two samples can share an identical mean (e.g. MAP 90 mmHg) yet behave very differently clinically — one tightly clustered between 85–95 mmHg, the other ranging from 50–130 mmHg.
                Measures of <strong>spread (dispersion)</strong> quantify this scatter and are essential for choosing reference ranges, statistical tests and clinical thresholds.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="rounded-lg border border-border p-4 bg-card">
                <p className="font-semibold text-foreground">Range</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">Range = max − min</p>
                <p className="text-sm text-muted-foreground mt-2">
                  The simplest measure: difference between the largest and smallest values. Easy to calculate but extremely sensitive to a single outlier and ignores everything in between.
                </p>
                <p className="text-xs text-foreground mt-2"><strong>Use:</strong> quick descriptive summary; vital signs charts ("HR 60–110 bpm overnight").</p>
              </div>

              <div className="rounded-lg border border-border p-4 bg-card">
                <p className="font-semibold text-foreground">Interquartile range (IQR)</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">IQR = Q3 − Q1 (middle 50% of data)</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Spread of the central half of the distribution after ranking. Robust to outliers and skew because it ignores the tails. Visualised as the "box" of a box-and-whisker plot.
                </p>
                <p className="text-xs text-foreground mt-2"><strong>Use:</strong> skewed or ordinal data — pair with median (e.g. ICU LOS, NRS pain).</p>
              </div>

              <div className="rounded-lg border border-border p-4 bg-card">
                <p className="font-semibold text-foreground">Variance (s²)</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">s² = Σ(xᵢ − x̄)² / (n − 1)</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Mean of the squared deviations from the sample mean. Squaring keeps every contribution positive and weights large deviations heavily, but the units are squared (e.g. mmHg²) which makes it hard to interpret directly.
                </p>
                <p className="text-xs text-foreground mt-2"><strong>Use:</strong> intermediate quantity — most often reported as its square root, the SD.</p>
              </div>

              <div className="rounded-lg border border-border p-4 bg-card">
                <p className="font-semibold text-foreground">Standard deviation (SD)</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">SD = √s²  (same units as the data)</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Average distance of each observation from the mean, in the original units. For a normal distribution: mean ± 1 SD ≈ 68% of values, ± 2 SD ≈ 95%, ± 3 SD ≈ 99.7% — the basis of biological reference ranges.
                </p>
                <p className="text-xs text-foreground mt-2"><strong>Use:</strong> symmetric interval/ratio data — pair with mean.</p>
              </div>

              <div className="rounded-lg border border-border p-4 bg-card">
                <p className="font-semibold text-foreground">Standard error of the mean (SEM)</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">SEM = SD / √n</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Describes the precision of the <em>sample mean</em>, not the spread of individuals. Shrinks as the sample grows and forms the basis of the 95% CI (≈ x̄ ± 1.96 × SEM). Reporting "mean ± SEM" makes data look tighter than it is — usually inappropriate as a descriptive statistic.
                </p>
                <p className="text-xs text-foreground mt-2"><strong>Use:</strong> precision of an estimate; building confidence intervals.</p>
              </div>

              <div className="rounded-lg border border-border p-4 bg-card">
                <p className="font-semibold text-foreground">Coefficient of variation (CV)</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">CV = SD / mean × 100%</p>
                <p className="text-sm text-muted-foreground mt-2">
                  A unitless, relative measure of spread that allows comparison of variability between datasets with different units or scales (e.g. assay precision across drugs at very different concentrations).
                </p>
                <p className="text-xs text-foreground mt-2"><strong>Use:</strong> comparing variability across units; lab assay quality control.</p>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <p className="text-sm font-semibold text-foreground mb-2">Quick reference — match the spread to the centre</p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted/40">
                    <th className="text-left p-2 font-semibold text-foreground border border-border">Data shape</th>
                    <th className="text-left p-2 font-semibold text-foreground border border-border">Centre</th>
                    <th className="text-left p-2 font-semibold text-foreground border border-border">Spread</th>
                    <th className="text-left p-2 font-semibold text-foreground border border-border">Test family</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-border">Symmetric / normal</td>
                    <td className="p-2 border border-border">Mean</td>
                    <td className="p-2 border border-border">SD (and 95% CI for the mean)</td>
                    <td className="p-2 border border-border">Parametric (t-test, ANOVA)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-border">Skewed / ordinal</td>
                    <td className="p-2 border border-border">Median</td>
                    <td className="p-2 border border-border">IQR (Q1–Q3); range</td>
                    <td className="p-2 border border-border">Non-parametric (Mann–Whitney, Kruskal–Wallis)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-border">Nominal / categorical</td>
                    <td className="p-2 border border-border">Mode</td>
                    <td className="p-2 border border-border">Frequency table, proportions</td>
                    <td className="p-2 border border-border">χ², Fisher exact</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-lg border border-physics/30 bg-physics/5">
              <p className="text-xs uppercase tracking-wide text-physics font-semibold mb-2">Key learning points</p>
              <ul className="text-sm text-foreground space-y-1.5 list-disc list-inside marker:text-physics">
                <li><strong>Range</strong> and <strong>IQR</strong> are <em>position-based</em> — calculated from ranked values; robust to skew.</li>
                <li><strong>Variance</strong>, <strong>SD</strong>, <strong>SEM</strong> and <strong>CV</strong> are <em>moment-based</em> — calculated from deviations around the mean; assume meaningful arithmetic on the values.</li>
                <li><strong>SD</strong> describes individuals; <strong>SEM</strong> describes the precision of the mean (SEM = SD/√n).</li>
                <li>Always report a measure of spread alongside the centre — a mean or median in isolation hides clinically important variability.</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="normal-distribution" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Normal Distribution & Confidence Intervals">
            <div className="text-muted-foreground leading-relaxed space-y-3 mb-4">
              <p>
                The <strong>normal (Gaussian) distribution</strong> is a symmetrical, bell-shaped probability density curve defined entirely by its mean (μ) and standard deviation (σ).
                Many biological variables — height, blood pressure, haemoglobin, sample means under the central limit theorem — approximate this shape, which is why it underpins
                most parametric statistics.
              </p>
              <p>
                The <strong>empirical 68–95–99.7 rule</strong> states that ±1σ contains ~68% of values, ±2σ ~95% and ±3σ ~99.7%. The same geometry generates <strong>confidence intervals</strong>:
                a 95% CI is the mean ± 1.96 × standard error — the central band that would capture the true population mean in 95 of 100 repeated samples. Use the toggle to compare
                90%, 95% and 99% intervals; wider intervals trade precision for greater confidence.
              </p>
            </div>
            <NormalDistributionDiagram />

            <div className="mt-6 p-4 rounded-lg border border-physics/30 bg-physics/5">
              <p className="text-xs uppercase tracking-wide text-physics font-semibold mb-1">Worked example</p>
              <p className="font-semibold text-foreground mb-2">Calculating a 95% confidence interval</p>
              <p className="text-sm text-muted-foreground mb-3">
                A trial of a new induction agent reports a mean time to loss of consciousness of <strong>42 s</strong> in 64 patients, with a standard deviation of <strong>8 s</strong>. Calculate the 95% confidence interval for the mean and interpret it.
              </p>
              <div className="space-y-1.5 text-sm">
                <p className="font-semibold text-foreground">Working</p>
                <p className="font-mono text-xs text-muted-foreground">SE = SD / √n = 8 / √64 = 8 / 8 = 1.0 s</p>
                <p className="font-mono text-xs text-muted-foreground">95% CI = mean ± 1.96 × SE = 42 ± 1.96 × 1.0</p>
                <p className="font-mono text-xs text-muted-foreground">      = 42 ± 1.96 s → 40.04 s to 43.96 s</p>
              </div>
              <div className="mt-3 space-y-1.5 text-sm">
                <p className="font-semibold text-foreground">Answer</p>
                <p className="text-muted-foreground">
                  Mean time to LOC <strong>42 s (95% CI 40.0–44.0 s)</strong>.
                </p>
                <p className="font-semibold text-foreground mt-2">Interpretation</p>
                <p className="text-muted-foreground">
                  If this trial were repeated many times, 95% of the resulting confidence intervals would contain the true population mean induction time. The narrow interval (~4 s wide) reflects a reasonably large sample and modest variability, so the estimate is precise. Because the interval does <em>not</em> include a clinically meaningful comparator (e.g. propofol's typical 30 s), the new agent is unlikely to be non-inferior on speed of onset.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Confidence interval vs standard deviation</h3>
              <p className="text-sm text-muted-foreground">
                SD and CI both quote a "± something" around a mean, which makes them easy to confuse — but they answer completely different questions.
                The <strong>SD</strong> describes the <em>spread of individual values</em> in the sample. The <strong>95% CI of the mean</strong> describes the <em>precision of the sample mean as an estimate of the population mean</em>.
                Crucially, the CI shrinks as the sample grows (because SE = SD/√n), whereas the SD does not — adding patients makes you more certain about the average, not less variable as individuals.
              </p>

              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">Standard error (SE) — the bridge between SD and CI</p>
                <p className="text-sm text-muted-foreground">
                  The <strong>standard error of the mean</strong> is the standard deviation of the <em>sampling distribution of the mean</em>: if you repeated the study many times, the sample means would themselves scatter around the true population mean, and that scatter has SD equal to the SE.
                </p>
                <p className="font-mono text-xs text-muted-foreground">SE = SD / √n</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><strong>SD</strong> measures variability between <em>individuals</em> — a property of the data, roughly stable as n grows.</li>
                  <li><strong>SE</strong> measures variability of the <em>sample mean</em> — a property of the estimate, shrinks with √n.</li>
                  <li><strong>95% CI</strong> is built directly from SE: <span className="font-mono">x̄ ± 1.96 × SE</span>. So SE is literally the "half-width unit" of the CI.</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Quick example.</strong> SD = 8 s, n = 64 → SE = 8/√64 = <span className="font-mono">1.0 s</span>; 95% CI ≈ mean ± 1.96 s. Quadruple the sample to n = 256 and SE halves to 0.5 s, halving the CI width — but the SD still describes 8 s of between-patient variability.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-md">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-2 font-semibold text-foreground">Quantity</th>
                      <th className="text-left p-2 font-semibold text-foreground">Standard deviation (SD)</th>
                      <th className="text-left p-2 font-semibold text-foreground">95% confidence interval</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Question answered</td>
                      <td className="p-2">How spread out are the individual values?</td>
                      <td className="p-2">How precisely have we estimated the population mean?</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Formula</td>
                      <td className="p-2 font-mono text-xs">√[Σ(x − x̄)² / (n − 1)]</td>
                      <td className="p-2 font-mono text-xs">x̄ ± 1.96 × SD/√n</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Effect of larger n</td>
                      <td className="p-2">Stable — describes the population's natural variability.</td>
                      <td className="p-2">Narrows in proportion to 1/√n.</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Used for</td>
                      <td className="p-2">Reference ranges, describing a sample.</td>
                      <td className="p-2">Inference about the underlying population, significance testing.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-lg border border-physics/30 bg-physics/5">
                <p className="text-xs uppercase tracking-wide text-physics font-semibold mb-1">Worked example</p>
                <p className="font-semibold text-foreground mb-2">Same SD, very different CI</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Two studies measure systolic BP in healthy adults. Both report a mean of <strong>120 mmHg</strong> with an <strong>SD of 15 mmHg</strong>.
                  Study A enrols <strong>n = 25</strong>; Study B enrols <strong>n = 400</strong>. Compare the 95% CI of the mean.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-md bg-card border border-border">
                    <p className="font-semibold text-foreground mb-1">Study A (n = 25)</p>
                    <p className="font-mono text-xs text-muted-foreground">SE = 15 / √25 = 15 / 5 = 3.0 mmHg</p>
                    <p className="font-mono text-xs text-muted-foreground">95% CI = 120 ± 1.96 × 3.0</p>
                    <p className="font-mono text-xs text-muted-foreground">      = 120 ± 5.88 → 114.1 – 125.9 mmHg</p>
                  </div>
                  <div className="p-3 rounded-md bg-card border border-border">
                    <p className="font-semibold text-foreground mb-1">Study B (n = 400)</p>
                    <p className="font-mono text-xs text-muted-foreground">SE = 15 / √400 = 15 / 20 = 0.75 mmHg</p>
                    <p className="font-mono text-xs text-muted-foreground">95% CI = 120 ± 1.96 × 0.75</p>
                    <p className="font-mono text-xs text-muted-foreground">      = 120 ± 1.47 → 118.5 – 121.5 mmHg</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  <strong className="text-foreground">Interpretation:</strong> the SD is identical (15 mmHg) — both studies show the same biological variability between individuals,
                  and the reference range (mean ± 2 SD ≈ 90–150 mmHg) is unchanged. But Study B's CI is roughly four times narrower because n is sixteen times larger (√16 = 4).
                  Study B has therefore <em>estimated the population mean four times more precisely</em>, even though the spread of individual readings is the same.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong className="text-foreground">Take-home:</strong> use SD when describing how variable patients are, and CI when describing how confident you are about an average. Quoting "mean ± SD" tells the reader about the population; "mean (95% CI)" tells them about the estimate.
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="skew" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Skewed Distributions">
            <div className="text-muted-foreground leading-relaxed space-y-3 mb-4">
              <p>
                Real biological data are often <strong>skewed</strong> rather than perfectly Gaussian. Skew is named for the direction of the long tail:
                <strong> positive (right) skew</strong> has a tail extending toward high values (mean &gt; median &gt; mode), while <strong>negative (left) skew</strong> has a tail toward low values (mean &lt; median &lt; mode).
              </p>
              <p>
                When a distribution is skewed, the mean is dragged toward the tail and becomes a poor measure of central tendency. Report the <strong>median and IQR</strong>, choose <strong>non-parametric tests</strong>,
                or apply a transformation (commonly a log-transform for positively skewed variables) before running parametric analyses.
              </p>
            </div>
            <SkewDistributionDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="measures-effect" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Measures of Effect">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Relative Risk (RR)</strong> = incidence in exposed / incidence in unexposed. Calculable only from cohort studies or RCTs.
              </p>
              <p>
                <strong>Odds Ratio (OR)</strong> = (a×d) / (b×c) from a 2×2 table. In case-control studies, OR approximates RR when the outcome is rare (&lt;10%) — the
                <strong> rare disease assumption</strong>. OR is always further from 1 than the corresponding RR.
              </p>
              <p>
                <strong>Absolute Risk Reduction (ARR)</strong> = control event rate − treatment event rate. <strong>Relative Risk Reduction (RRR)</strong> = ARR / control event rate.
                <strong> Number Needed to Treat (NNT)</strong> = 1/ARR. Similarly, <strong>NNH</strong> = 1/absolute risk increase.
              </p>
              <p>
                <strong>Hazard Ratio (HR)</strong> is used in survival analysis (Kaplan-Meier curves, Cox regression) and accounts for time-to-event data. An HR of 0.7
                means a 30% reduction in event rate at any given time point.
              </p>
              <p><strong>Kaplan–Meier analysis</strong> plots time on the x-axis and estimated survival on the y-axis as a stepped curve, falling whenever an event occurs. A censored participant—lost to follow-up or event-free when follow-up ends—contributes information until censoring and is marked with a tick. Median survival is where the curve crosses 50%; the log-rank test compares whole survival curves. The <strong>Cox proportional hazards model</strong> is a regression model for time-to-event data that estimates hazard ratios while adjusting for confounders, assuming the hazard ratio between groups is constant over time. <InlineRef topicId="statistics-ebm" refLabel="Petrie & Sabin" /><InlineRef topicId="statistics-ebm" refLabel="BJA Educ 2016" /></p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagnostic-tests" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Diagnostic Test Performance">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Sensitivity</strong> = TP / (TP + FN) — proportion of true positives correctly identified. A highly sensitive test, when negative, helps
                <strong> rule out</strong> disease (<strong>SnNOut</strong>).
              </p>
              <p>
                <strong>Specificity</strong> = TN / (TN + FP) — proportion of true negatives correctly identified. A highly specific test, when positive, helps
                <strong> rule in</strong> disease (<strong>SpPIn</strong>).
              </p>
              <p>
                <strong>PPV</strong> = TP / (TP + FP) — depends heavily on disease prevalence. <strong>NPV</strong> = TN / (TN + FN). PPV rises with higher prevalence;
                NPV falls. This is why screening tests in low-prevalence populations generate many false positives.
              </p>
              <p>
                <strong>Likelihood Ratios (LR)</strong> combine sensitivity and specificity. LR+ = sens / (1 − spec); LR− = (1 − sens) / spec. LRs are
                prevalence-independent and applied to pre-test probability via Fagan's nomogram or Bayes' theorem.
              </p>
              <p>
                <strong>ROC curves</strong> plot sensitivity (y-axis) against 1 − specificity (x-axis). The AUC (c-statistic) measures overall discriminative ability:
                0.5 = no discrimination, 1.0 = perfect; AUC &gt;0.8 is generally considered good.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="statistical-tests" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Common Statistical Tests">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Choosing the correct test depends on the type of data (continuous, categorical, ordinal), number of groups, paired vs unpaired design, and whether the data is normally distributed.
              </p>
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Parametric Tests (normal distribution assumed)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Student's t-test</strong> — compares means of 2 groups (unpaired) or before/after (paired)</li>
                  <li><strong>ANOVA</strong> — compares means of ≥3 groups; post-hoc tests (Tukey, Bonferroni) identify which pairs differ</li>
                  <li><strong>Pearson's r</strong> — linear association between two continuous variables (−1 to +1)</li>
                  <li><strong>Linear regression</strong> — models a continuous outcome as a function of predictors</li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Non-Parametric Tests (no distribution assumption)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Mann-Whitney U</strong> — unpaired comparison of 2 groups</li>
                  <li><strong>Wilcoxon signed-rank</strong> — paired comparison</li>
                  <li><strong>Kruskal-Wallis</strong> — compares ≥3 groups</li>
                  <li><strong>Spearman's ρ</strong> — correlation for non-normal or ordinal data</li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Categorical Data Tests</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Chi-squared (χ²)</strong> — compares proportions between groups (expected frequency ≥5)</li>
                  <li><strong>Fisher's exact</strong> — used when expected frequencies are small (&lt;5)</li>
                  <li><strong>McNemar's test</strong> — paired categorical data</li>
                  <li><strong>Logistic regression</strong> — binary outcome with multiple predictors, yields OR</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="bias-confounding" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Bias, Confounding & Validity">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Selection bias</strong>: systematic differences in who is enrolled (e.g., Berkson's bias). <strong>Information bias</strong>: systematic measurement
                errors, including recall bias (case-control) and observer bias (unblinded assessors).
              </p>
              <p>
                <strong>Confounding</strong> occurs when a third variable is associated with both exposure and outcome. Address via randomisation, restriction, matching,
                stratification, and multivariable regression. <strong>Intention-to-treat (ITT)</strong> preserves randomisation; <strong>per-protocol</strong> only includes
                compliant patients and is more prone to bias.
              </p>
              <p>
                <strong>Internal validity</strong>: freedom from bias within the study. <strong>External validity (generalisability)</strong>: applicability to other populations.
                Blinding, allocation concealment, and adequate follow-up are key determinants of internal validity in RCTs.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="meta-analysis" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Systematic Reviews & Meta-Analysis">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                A <strong>systematic review</strong> uses a pre-defined protocol (PRISMA) to identify, appraise and synthesise all relevant studies. A <strong>meta-analysis</strong>
                is the statistical pooling of results to produce a single summary estimate with narrower CIs.
              </p>
              <p>
                Results are displayed on a <strong>forest plot</strong>: each study as a point estimate with CI, pooled estimate as a diamond. <strong>Heterogeneity</strong>
                between studies is assessed using the I² statistic (0% = none, &gt;50% = substantial) and Cochran's Q. <strong>Fixed-effects</strong> models assume one true effect;
                <strong> random-effects</strong> models allow between-study variation and produce wider CIs.
              </p>
              <p>
                <strong>Publication bias</strong> is assessed using <strong>funnel plots</strong> — asymmetry suggests bias. Egger's test provides a formal statistical assessment.
              </p>
              <div className="rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">GRADE methodology</h3><p className="mt-2">GRADE separates certainty of evidence from strength of recommendation. Certainty is rated <strong>high, moderate, low or very low</strong>. Risk of bias, inconsistency, indirectness, imprecision and publication bias downgrade certainty; a large effect, dose–response gradient or plausible residual confounding that would reduce an observed effect can upgrade observational evidence. Recommendations then balance certainty with benefits, harms, values and resource use. <InlineRef topicId="statistics-ebm" refLabel="GRADE Handbook" /></p></div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="bayesian" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Bayesian Concepts">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Bayes' theorem</strong>: posterior odds = prior odds × likelihood ratio. The post-test probability depends not only on test performance
                (sensitivity/specificity) but also on the <strong>pre-test probability (prevalence)</strong>.
              </p>
              <p>
                A positive troponin in a patient with crushing chest pain (high pre-test probability) has a much higher PPV than in an asymptomatic screened patient.
                This is the mathematical basis for: "don't order a test if the result won't change your management."
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Parametric tests assume normal distribution and equal variance; non-parametric tests (Mann-Whitney, Wilcoxon) do not.",
              "p<0.05 means <5% probability of the observed (or more extreme) result under the null hypothesis — it is not the probability the null is true.",
              "Type I error (α) = false positive; Type II (β) = false negative; power = 1 − β.",
              "Sensitivity = true positives / all disease; specificity = true negatives / all healthy. PPV/NPV depend on prevalence.",
              "NNT = 1 / absolute risk reduction; odds ratios approximate relative risk only when outcomes are rare.",
            ]}
          />
          <TopicFaqs faqs={statisticsEbmFaqs} />

        </>
      }
    />
  );
};

export default StatisticsEBMTopic;
