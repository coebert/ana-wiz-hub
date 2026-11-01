import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { AnaesthesiaDosingCallout } from "@/components/perioperative/AnaesthesiaDosingCallout";
import { PageJsonLd } from "@/components/layout/PageJsonLd";
import { LessonSources } from "@/components/topic/LessonSources";

/**
 * Comparison guide: Suxamethonium vs Rocuronium for RSI.
 *
 * This is a standalone SEO landing page (not part of the curriculum
 * topic list) targeting the "neuromuscular blocking agents" /
 * "sux vs roc RSI" keyword cluster. It deliberately uses
 * SectionLayout directly rather than TopicTemplate so it doesn't need
 * a curriculum topicId, exam mapping, or quiz wiring — those would be
 * misleading on a comparison page. Detailed mechanism/monitoring
 * teaching lives on /pharmacology/muscle-relaxants and we deep-link
 * to it throughout.
 */
const SuxVsRocComparisonTopic = () => {
  const url = "https://anaesthesiacore.app/pharmacology/suxamethonium-vs-rocuronium";
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is rocuronium as fast as suxamethonium for RSI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At 1.0–1.2 mg/kg, rocuronium produces intubating conditions in ~60 seconds — comparable to suxamethonium 1.0–1.5 mg/kg in most adults. Suxamethonium remains marginally faster (~45 s) and produces denser jaw relaxation, but the difference is rarely clinically decisive when full RSI doses of rocuronium are used (Tran et al., Cochrane 2017).",
        },
      },
      {
        "@type": "Question",
        name: "What are the RSI doses of suxamethonium and rocuronium?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Suxamethonium is given as 1.0–1.5 mg/kg intravenously. Rocuronium for RSI requires 1.0–1.2 mg/kg IV; the standard 0.6 mg/kg induction dose is inadequate for rapid sequence intubation because onset extends to ~90 seconds and intubating conditions are inferior (Tran et al., Cochrane 2017).",
        },
      },
      {
        "@type": "Question",
        name: "When should suxamethonium be avoided?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Suxamethonium is contraindicated in patients with hyperkalaemia, major burns after the initial 24 hours under the Salisbury burns protocol, or denervation injury with ongoing hyperkalaemia risk, malignant hyperthermia susceptibility, plasma cholinesterase deficiency, and a personal/family history of suxamethonium-induced complications. In these patients rocuronium with planned sugammadex reversal is the standard alternative.",
        },
      },
      {
        "@type": "Question",
        name: "Why is suxamethonium dangerous after burns or spinal cord injury?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "After burns or denervation injury, upregulation of extrajunctional nicotinic acetylcholine receptors causes an exaggerated potassium release with suxamethonium — serum potassium can rise by 5–10 mmol/L, provoking cardiac arrest. Rocuronium does not depolarise the muscle membrane and carries no such risk.",
        },
      },
      {
        "@type": "Question",
        name: "What dose of sugammadex reverses rocuronium?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sugammadex reverses rocuronium in a dose-dependent manner: 2 mg/kg at reappearance of T2 for routine reversal; 4 mg/kg at recovery to 1–2 post-tetanic counts (PTC); and 16 mg/kg for adult immediate reversal approximately 3 minutes after rocuronium 1.2 mg/kg; paediatric immediate reversal has not been investigated. Follow the named Bridion contraception advice: oral users follow their product’s missed-dose instructions; non-oral hormonal users add non-hormonal contraception for 7 days.",
        },
      },
      {
        "@type": "Question",
        name: "Can sugammadex reverse rocuronium fast enough to rescue a failed RSI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Adult immediate reversal is a specific Bridion regimen after rocuronium 1.2 mg/kg, not guaranteed airway rescue. Recovery time varies; continue oxygenation and the failed-airway plan even if neuromuscular recovery is demonstrated.",
        },
      },
      {
        "@type": "Question",
        name: "Can rocuronium be used for RSI if sugammadex is unavailable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rocuronium can be used without sugammadex where the patient-specific airway and ventilation plan accounts for prolonged paralysis. Four twitches are TOF count 4, not T2. ASA 2023 supports neostigmine as an alternative at minimal block (quantitative TOF ratio 0.4 to <0.9); deeper reversal is slower and less predictable. Choice of NMBA and reversal follows the clinical context, monitoring and available expertise.",
        },
      },
    ],
  };

  return (
    <SectionLayout
      title="Suxamethonium vs Rocuronium for RSI"
      subtitle="A head-to-head comparison of the two RSI neuromuscular blockers — onset, duration, contraindications and reversal."
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      metaDescription="Suxamethonium vs rocuronium for rapid sequence induction: onset, duration, contraindications (hyperkalaemia, MH, plasma cholinesterase deficiency) and reversal with sugammadex — exam-focused comparison for FRCA and FFICM."
    >
      <PageJsonLd name="Suxamethonium vs Rocuronium for RSI" description="Onset, duration, contraindications and reversal compared for the two rapid sequence induction neuromuscular blockers." learningResourceType="Topic" />
      <Helmet>
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content="Suxamethonium vs Rocuronium for RSI — AnaesthesiaCore" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <article className="prose prose-slate max-w-none space-y-10">
        <section>
          <p className="text-foreground/90 leading-relaxed">
            Suxamethonium (succinylcholine) and rocuronium are the two neuromuscular
            blocking agents (NMBAs) used to secure the airway during a{" "}
            <strong>rapid sequence induction</strong> (RSI). They achieve the same
            end — fast, dense paralysis for tracheal intubation — by very different
            routes, and the choice between them increasingly turns on patient
            factors and reversal options rather than speed alone. This guide is a
            focused comparison; the full pharmacology of both agents lives on the{" "}
            <Link to="/pharmacology/muscle-relaxants" className="text-pharmacology underline">
              Muscle Relaxants topic
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground">Head-to-head summary</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-semibold">Property</th>
                  <th className="text-left p-3 font-semibold">Suxamethonium</th>
                  <th className="text-left p-3 font-semibold">Rocuronium</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-t [&_tr]:border-border [&_td]:p-3 [&_td]:align-top">
                <tr>
                  <td className="font-medium">Class</td>
                  <td>Depolarising</td>
                  <td>Non-depolarising aminosteroid</td>
                </tr>
                <tr>
                  <td className="font-medium">RSI dose</td>
                  <td>1.0–1.5 mg/kg IV</td>
                  <td>1.0–1.2 mg/kg IV</td>
                </tr>
                <tr>
                  <td className="font-medium">Onset (intubating conditions)</td>
                  <td>~45 s</td>
                  <td>~60 s at 1.2 mg/kg</td>
                </tr>
                <tr>
                  <td className="font-medium">Clinical duration</td>
                  <td>~6–10 min (spontaneous offset)</td>
                  <td>Often prolonged without reversal; depends on dose and patient. Sugammadex recovery time is variable.</td>
                </tr>
                <tr>
                  <td className="font-medium">Metabolism / elimination</td>
                  <td>Plasma cholinesterase (pseudo-ChE)</td>
                  <td>Hepatic (biliary) — minimal renal</td>
                </tr>
                <tr>
                  <td className="font-medium">Reversal</td>
                  <td>None — wait for spontaneous recovery</td>
                  <td>Sugammadex according to the defined routine/immediate regimen; neostigmine requires adequate spontaneous recovery and quantitative monitoring.</td>
                </tr>
                <tr>
                  <td className="font-medium">MH trigger</td>
                  <td>Yes</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td className="font-medium">Histamine release</td>
                  <td>Minimal</td>
                  <td>Negligible</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Sources: Sparr et al., <em>Anesthesiology</em> 1999 (rocuronium 1.2 mg/kg
            intubating conditions); Tran et al., <em>Cochrane Database</em> 2017
            (sux vs roc for RSI). Product-specific reversal/contraception advice and
            quantitative monitoring recommendations use the named sources below.
          </p>
          <LessonSources topicId="suxamethonium-vs-rocuronium" labels={["ASA 2023 NMB", "Bridion SmPC", "Salisbury Burns Checklist", "Suxamethonium SmPC"]} />
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground">Onset and intubating conditions</h2>
          <p className="text-foreground/90 leading-relaxed">
            Suxamethonium remains the fastest onset NMBA in routine use, producing
            jaw relaxation and vocal-cord abduction in ~45 seconds. Rocuronium at
            the full RSI dose of 1.0–1.2 mg/kg achieves comparable intubating
            conditions in ~60 seconds; the 2017 Cochrane review concluded that
            suxamethonium provides marginally superior conditions but the
            difference is small when the higher rocuronium dose is used and
            anaesthesia is matched. The lower 0.6 mg/kg "induction" dose is{" "}
            <em>not</em> appropriate for true RSI — onset extends to ~90 seconds
            and intubating conditions are inferior.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground">Duration of action</h2>
          <p className="text-foreground/90 leading-relaxed">
            This is where the two agents diverge sharply. Suxamethonium's short
            duration (~6–10 min) is a safety feature in the era before sugammadex:
            a failed intubation would, in theory, allow the patient to resume
            spontaneous ventilation before desaturation became critical. In
            practice, apnoea time on suxamethonium frequently exceeds safe
            apnoea time in obese, pregnant, or critically ill patients, so this
            "self-rescue" argument is weaker than traditionally taught.
            Rocuronium's prolonged action remains important even when sugammadex is
            available. The adult immediate-reversal regimen has a specific
            recent-rocuronium context and does not guarantee airway patency
            or adequate breathing; ventilation and the failed-airway plan remain essential.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground">Contraindications — when to avoid suxamethonium</h2>
          <ul className="list-disc list-inside space-y-1 text-foreground/90">
            <li>
              <strong>Hyperkalaemia or risk of exaggerated K⁺ release</strong> —
              extrajunctional nAChR upregulation in burns (the adopted Salisbury protocol avoids suxamethonium after the initial 24 h),
              denervation injury, prolonged immobility, or critical illness can
              precipitate K⁺ rises of 5–10 mmol/L and cardiac arrest.
            </li>
            <li><strong>Malignant hyperthermia</strong> susceptibility (known or family history).</li>
            <li>
              <strong>Plasma cholinesterase deficiency</strong> — homozygotes for
              atypical pseudo-ChE develop prolonged apnoea (up to several hours).
            </li>
            <li>
              <strong>Pre-existing hyperkalaemia</strong>, severe rhabdomyolysis,
              or significant muscular dystrophy (risk of hyperkalaemic arrest and
              rhabdomyolysis).
            </li>
            <li>
              <strong>Children with undiagnosed myopathy</strong> — relative
              contraindication outside emergency airway use.
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Rocuronium has none of these contraindications. Its main caveat is
            anaphylaxis, which is more common with rocuronium than with most
            other NMBAs in some national registries; sugammadex availability
            does not modify this risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground">Reversal strategy</h2>
          <p className="text-foreground/90 leading-relaxed">
            Suxamethonium has no pharmacological reversal — recovery depends on
            plasma cholinesterase hydrolysis. For rocuronium reversal, <strong>sugammadex</strong>
            is selected according to the measured block and the specific licensed
            routine or immediate-reversal context:
          </p>
          <ul className="list-disc list-inside space-y-1 text-foreground/90 mt-2">
            <li><strong>2 mg/kg</strong> — routine reversal at reappearance of T2.</li>
            <li><strong>4 mg/kg</strong> — PTC 1–2, not TOF count 1–2.</li>
            <li><strong>16 mg/kg</strong> — adult immediate reversal, approximately 3 min after rocuronium 1.2 mg/kg; not any prolonged block or paediatric immediate reversal. Quantitative TOF ratio ≥0.9 remains the recovery target.</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Use the Bridion missed-dose advice for oral contraception; add non-hormonal
            contraception for 7 days with non-oral hormonal methods. Re-use of an
            NMBA depends on the previous reversal dose, renal function and the
            product waiting-time table; there is no universal 24-hour rule.
            Reversal does <em>not</em> guarantee adequate breathing or replace the
            failed-airway plan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground">So which should I use?</h2>
          <div className="rounded-lg border border-pharmacology/30 bg-pharmacology/5 p-4 space-y-2 text-foreground/90">
            <p>
              <strong>Rocuronium is an RSI option:</strong> choose the drug and dose for
              the patient, airway plan and available reversal/ventilation support.
              Sugammadex availability does not guarantee rescue after failed intubation.
            </p>
            <p>
              <strong>Suxamethonium is still reasonable</strong> when sugammadex
              is unavailable, when very brief paralysis is genuinely desirable
              (e.g. ECT, short laryngospasm rescue), or when local practice and
              familiarity favour it.
            </p>
            <p>
              <strong>Avoid suxamethonium altogether</strong> in hyperkalaemic
              patients, burns &gt;24 h, denervation injury, MH-susceptibility,
              and known plasma cholinesterase deficiency.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground">Related topics</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><Link to="/pharmacology/muscle-relaxants" className="text-pharmacology underline">Muscle Relaxants & Neuromuscular Blocking Agents</Link> — full pharmacology, monitoring and reversal.</li>
            <li><Link to="/clinical/airway-management" className="text-pharmacology underline">Airway Management</Link> — RSI sequence and failed intubation plans.</li>
            <li><Link to="/pharmacology/iv-anaesthetics" className="text-pharmacology underline">IV Anaesthetics</Link> — induction agents paired with NMBAs for RSI.</li>
          </ul>
        </section>
      <AnaesthesiaDosingCallout focus="suxamethonium and rocuronium dosing" />
      </article>
    </SectionLayout>
  );
};

export default SuxVsRocComparisonTopic;
