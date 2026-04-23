import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { statisticsEBMQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

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
  },
  {
    title: "Post-test probability with likelihood ratios",
    scenario:
      "A patient has a pre-test probability of pulmonary embolism of 30%. A test has sensitivity 90% and specificity 80%. What is the post-test probability if the test is positive?",
    working:
      "LR+ = sensitivity / (1 − specificity) = 0.90 / 0.20 = 4.5\nPre-test odds = 0.30 / 0.70 = 0.43\nPost-test odds = pre-test odds × LR+ = 0.43 × 4.5 = 1.93\nPost-test probability = 1.93 / (1 + 1.93) = 0.66 (66%)",
    answer:
      "≈66%. The positive test raises the probability of PE from 30% to 66% — illustrating why pre-test probability matters as much as the test characteristics.",
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
      keyPoints={[
        "A p-value is the probability of observing a result at least as extreme as the data, assuming the null hypothesis is true — NOT the probability the null is true",
        "Type I error (α): rejecting a true null (false positive). Type II error (β): failing to reject a false null. Power = 1 − β",
        "OR compares odds of exposure in cases vs controls; RR compares incidence — RR is only valid in cohort/RCT designs",
        "Number needed to treat (NNT) = 1 / absolute risk reduction (ARR). Contextualises clinical significance",
        "Parametric tests (t-test, ANOVA) assume normally distributed data; non-parametric tests (Mann-Whitney, Wilcoxon, Kruskal-Wallis) do not",
        "Sensitivity = TP/(TP+FN) — rules OUT disease (SnNOut); Specificity = TN/(TN+FP) — rules IN (SpPIn)",
        "Hierarchy of evidence: systematic reviews/meta-analyses > RCTs > cohort > case-control > case series > expert opinion",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Statistics and evidence-based medicine (EBM) are examined across the Primary FRCA, Final FRCA, and FFICM. Understanding study design, measures of effect,
              hypothesis testing, and diagnostic test performance is essential for interpreting the literature and for clinical decision-making.
            </p>
          </ExamSection>

          <ExamSection id="study-design" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Study Design</h2>
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
            </div>
          </ExamSection>

          <ExamSection id="hypothesis-testing" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Hypothesis Testing & p-Values</h2>
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
                <strong>Confidence intervals (CIs)</strong> provide a range within which the true population parameter likely lies. A 95% CI that does not cross the null value
                (0 for differences, 1 for ratios) indicates significance at p &lt; 0.05. CIs are more informative than p-values alone — they convey both magnitude and precision.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="measures-effect" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Measures of Effect</h2>
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
            </div>
          </ExamSection>

          <ExamSection id="diagnostic-tests" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Diagnostic Test Performance</h2>
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
          </ExamSection>

          <ExamSection id="statistical-tests" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Common Statistical Tests</h2>
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
          </ExamSection>

          <ExamSection id="bias-confounding" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Bias, Confounding & Validity</h2>
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
          </ExamSection>

          <ExamSection id="meta-analysis" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Systematic Reviews & Meta-Analysis</h2>
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
            </div>
          </ExamSection>

          <ExamSection id="bayesian" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Bayesian Concepts</h2>
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
          </ExamSection>
        </>
      }
    />
  );
};

export default StatisticsEBMTopic;
