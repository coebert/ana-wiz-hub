import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { statisticsEBMQuiz } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const StatisticsEBMTopic = () => {
  return (
    <SectionLayout
      title="Statistics & Evidence-Based Medicine"
      subtitle="Study design, hypothesis testing, p-values, confidence intervals, odds ratios, and common statistical tests"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="space-y-8">
        <KeyLearningPoints
          points={[
            "A p-value is the probability of observing a result at least as extreme as the data, assuming the null hypothesis is true — it is NOT the probability the null is true",
            "Type I error (α): rejecting a true null hypothesis (false positive). Type II error (β): failing to reject a false null (false negative). Power = 1 − β",
            "Odds ratio (OR) compares odds of exposure in cases vs controls; relative risk (RR) compares incidence — RR is only valid in cohort studies, not case-control",
            "Number needed to treat (NNT) = 1 / absolute risk reduction (ARR). NNT contextualises clinical significance beyond statistical significance",
            "Parametric tests (t-test, ANOVA) assume normally distributed data; non-parametric tests (Mann-Whitney, Wilcoxon, Kruskal-Wallis) do not",
            "Sensitivity = TP/(TP+FN) — rules OUT disease (SnNOut); Specificity = TN/(TN+FP) — rules IN disease (SpPIn)",
            "Hierarchy of evidence: systematic reviews/meta-analyses > RCTs > cohort > case-control > case series > expert opinion",
          ]}
        />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Statistics and evidence-based medicine (EBM) are examined across the Primary FRCA, Final FRCA, and FFICM.
            Understanding study design, measures of effect, hypothesis testing, and diagnostic test performance is
            essential for interpreting the literature and for clinical decision-making. This topic covers the key
            statistical concepts tested in anaesthetic examinations, from basic probability through to meta-analysis.
          </p>
        </div>

        {/* Study Design */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Study Design</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Randomised Controlled Trials (RCTs)</strong> are the gold standard for evaluating interventions.
              Randomisation minimises confounding, while blinding reduces observer and participant bias. A
              <strong> double-blind</strong> trial means neither participant nor investigator knows the allocation;
              <strong> triple-blind</strong> extends this to the data analyst.
            </p>
            <p>
              <strong>Cohort studies</strong> follow exposed and unexposed groups forward in time (prospective) or
              look back (retrospective). They measure <strong>relative risk (RR)</strong> and incidence.
              <strong> Case-control studies</strong> start with outcome (cases) and compare exposure history with
              controls — they measure the <strong>odds ratio (OR)</strong> but cannot directly calculate RR.
            </p>
            <p>
              <strong>Cross-sectional studies</strong> measure prevalence at a single time point.
              <strong> Ecological studies</strong> use population-level data and are prone to the ecological fallacy.
              <strong> Systematic reviews</strong> and <strong>meta-analyses</strong> synthesise multiple studies and sit
              at the top of the evidence hierarchy, but are only as good as the included studies.
            </p>
          </div>
        </div>

        {/* Hypothesis Testing */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Hypothesis Testing & p-Values</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The <strong>null hypothesis (H₀)</strong> states there is no difference between groups. The
              <strong> alternative hypothesis (H₁)</strong> states a difference exists. A <strong>p-value</strong> is the
              probability of obtaining results at least as extreme as observed, assuming H₀ is true. By convention,
              p &lt; 0.05 is considered "statistically significant," meaning there is less than a 5% chance the result
              is due to chance alone.
            </p>
            <p>
              <strong>Type I error (α)</strong>: rejecting a true null hypothesis — a false positive. The α level is
              conventionally set at 0.05. <strong>Type II error (β)</strong>: failing to reject a false null — a false
              negative. <strong>Power (1 − β)</strong> is the probability of detecting a true effect; studies typically
              aim for power ≥ 0.8 (80%).
            </p>
            <p>
              <strong>Confidence intervals (CIs)</strong> provide a range within which the true population parameter
              likely lies. A 95% CI that does not cross the null value (0 for differences, 1 for ratios) indicates
              statistical significance at p &lt; 0.05. CIs are more informative than p-values alone as they convey
              both the magnitude and precision of the estimate.
            </p>
          </div>
        </div>

        {/* Measures of Effect */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Measures of Effect</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Relative Risk (RR)</strong> = incidence in exposed / incidence in unexposed. An RR of 2.0 means
              twice the risk. RR can only be calculated from cohort studies or RCTs where incidence is known.
            </p>
            <p>
              <strong>Odds Ratio (OR)</strong> = (a×d) / (b×c) from a 2×2 table. In case-control studies, the OR
              approximates the RR when the outcome is rare (&lt;10%) — the <strong>rare disease assumption</strong>.
              The OR is always further from 1 than the corresponding RR.
            </p>
            <p>
              <strong>Absolute Risk Reduction (ARR)</strong> = control event rate − treatment event rate.
              <strong> Relative Risk Reduction (RRR)</strong> = ARR / control event rate. The
              <strong> Number Needed to Treat (NNT)</strong> = 1/ARR — the number of patients who must be treated to
              prevent one additional bad outcome. Similarly, <strong>Number Needed to Harm (NNH)</strong> = 1/absolute
              risk increase.
            </p>
            <p>
              <strong>Hazard Ratio (HR)</strong> is used in survival analysis (Kaplan-Meier curves, Cox regression) and
              accounts for time-to-event data. An HR of 0.7 means a 30% reduction in the rate of the event at any
              given time point.
            </p>
          </div>
        </div>

        {/* Diagnostic Tests */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Diagnostic Test Performance</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Sensitivity</strong> = TP / (TP + FN) — the proportion of true positives correctly identified.
              A highly sensitive test, when negative, helps <strong>rule out</strong> disease (<strong>SnNOut</strong>).
            </p>
            <p>
              <strong>Specificity</strong> = TN / (TN + FP) — the proportion of true negatives correctly identified.
              A highly specific test, when positive, helps <strong>rule in</strong> disease (<strong>SpPIn</strong>).
            </p>
            <p>
              <strong>Positive Predictive Value (PPV)</strong> = TP / (TP + FP) — depends heavily on disease prevalence.
              <strong> Negative Predictive Value (NPV)</strong> = TN / (TN + FN). PPV increases with higher prevalence;
              NPV decreases. This is why screening tests in low-prevalence populations generate many false positives.
            </p>
            <p>
              <strong>Likelihood Ratios (LR)</strong> combine sensitivity and specificity into a single metric.
              LR+ = sensitivity / (1 − specificity); LR− = (1 − sensitivity) / specificity. LRs are prevalence-independent
              and can be applied to pre-test probability using Fagan's nomogram or Bayes' theorem.
            </p>
            <p>
              <strong>ROC curves</strong> plot sensitivity (y-axis) against 1 − specificity (x-axis). The area under
              the ROC curve (AUC or c-statistic) measures overall discriminative ability: 0.5 = no discrimination,
              1.0 = perfect. An AUC &gt; 0.8 is generally considered good.
            </p>
          </div>
        </div>

        {/* Statistical Tests */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Common Statistical Tests</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Choosing the correct test depends on the type of data (continuous, categorical, ordinal), number of groups,
              paired vs unpaired design, and whether the data is normally distributed.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 mt-2">
              <h3 className="text-sm font-semibold text-foreground mb-2">Parametric Tests (normal distribution assumed)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Student's t-test</strong> — compares means of 2 groups (unpaired) or before/after (paired)</li>
                <li><strong>ANOVA (Analysis of Variance)</strong> — compares means of ≥3 groups; post-hoc tests (Tukey, Bonferroni) identify which pairs differ</li>
                <li><strong>Pearson's correlation (r)</strong> — measures linear association between two continuous variables (−1 to +1)</li>
                <li><strong>Linear regression</strong> — models a continuous outcome as a function of predictor variables</li>
              </ul>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 mt-2">
              <h3 className="text-sm font-semibold text-foreground mb-2">Non-Parametric Tests (no distribution assumption)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Mann-Whitney U test</strong> — unpaired comparison of 2 groups (equivalent to unpaired t-test)</li>
                <li><strong>Wilcoxon signed-rank test</strong> — paired comparison (equivalent to paired t-test)</li>
                <li><strong>Kruskal-Wallis test</strong> — compares ≥3 groups (equivalent to ANOVA)</li>
                <li><strong>Spearman's rank correlation (ρ)</strong> — correlation for non-normal or ordinal data</li>
              </ul>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 mt-2">
              <h3 className="text-sm font-semibold text-foreground mb-2">Categorical Data Tests</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Chi-squared (χ²) test</strong> — compares proportions between groups (expected frequency ≥5)</li>
                <li><strong>Fisher's exact test</strong> — used when expected frequencies are small (&lt;5)</li>
                <li><strong>McNemar's test</strong> — paired categorical data (e.g., before/after intervention)</li>
                <li><strong>Logistic regression</strong> — models a binary outcome with multiple predictors, yields OR</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bias and Confounding */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Bias, Confounding & Validity</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Selection bias</strong>: systematic differences in who is enrolled (e.g., Berkson's bias in
              hospital-based studies). <strong>Information bias</strong>: systematic errors in measurement, including
              recall bias (case-control studies) and observer bias (unblinded assessors).
            </p>
            <p>
              <strong>Confounding</strong> occurs when a third variable is associated with both exposure and outcome.
              Methods to address confounding include: randomisation, restriction, matching, stratification, and
              multivariable regression. <strong>Intention-to-treat (ITT)</strong> analysis preserves randomisation by
              analysing patients in their allocated group regardless of compliance; <strong>per-protocol</strong> analysis
              only includes compliant patients and is more prone to bias.
            </p>
            <p>
              <strong>Internal validity</strong>: the degree to which results are free from bias within the study.
              <strong> External validity (generalisability)</strong>: whether findings apply to other populations.
              <strong> Blinding</strong>, <strong>allocation concealment</strong>, and adequate <strong>follow-up</strong> are
              key determinants of internal validity in RCTs.
            </p>
          </div>
        </div>

        {/* Meta-analysis */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Systematic Reviews & Meta-Analysis</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              A <strong>systematic review</strong> uses a pre-defined protocol (PRISMA guidelines) to identify, appraise,
              and synthesise all relevant studies on a question. A <strong>meta-analysis</strong> is the statistical
              pooling of results from multiple studies to produce a single summary estimate with narrower confidence intervals.
            </p>
            <p>
              Results are displayed on a <strong>forest plot</strong>: each study is shown as a point estimate with CI,
              and the pooled estimate is shown as a diamond. <strong>Heterogeneity</strong> between studies is assessed
              using the I² statistic (0% = no heterogeneity, &gt;50% = substantial) and Cochran's Q test.
              <strong> Fixed-effects models</strong> assume one true effect size; <strong>random-effects models</strong> allow
              for between-study variation and produce wider CIs.
            </p>
            <p>
              <strong>Publication bias</strong> (positive results are more likely published) is assessed using
              <strong> funnel plots</strong> — asymmetry suggests bias. Egger's test provides a formal statistical assessment.
            </p>
          </div>
        </div>

        {/* Bayesian Statistics */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Bayesian Concepts</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Bayes' theorem</strong>: posterior odds = prior odds × likelihood ratio. This underpins the
              interpretation of diagnostic tests in clinical practice — the post-test probability depends not only on
              test performance (sensitivity/specificity) but also on the <strong>pre-test probability (prevalence)</strong>.
            </p>
            <p>
              A positive troponin in a patient with crushing chest pain (high pre-test probability) has a much higher
              PPV than in an asymptomatic patient being screened. This is the mathematical basis for the clinical
              adage: "don't order a test if the result won't change your management."
            </p>
          </div>
        </div>

        <QuizSection questions={statisticsEBMQuiz} />
      <ReferencesList topicId="statistics-ebm" />

        <SeeAlso topicId="statistics-ebm" />
        <TopicCompletionToggle topicId="statistics-ebm" topicTitle="Statistics & Evidence-Based Medicine" />
      </div>
    </SectionLayout>
  );
};

export default StatisticsEBMTopic;
