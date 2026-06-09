import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SectionLayout } from "@/components/SectionLayout";

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
        name: "When should suxamethonium be avoided?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Suxamethonium is contraindicated in patients with hyperkalaemia, major burns or denervation injury beyond ~48–72 hours, malignant hyperthermia susceptibility, plasma cholinesterase deficiency, and a personal/family history of suxamethonium-induced complications. In these patients rocuronium with planned sugammadex reversal is the standard alternative.",
        },
      },
      {
        "@type": "Question",
        name: "Can sugammadex reverse rocuronium fast enough to rescue a failed RSI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sugammadex 16 mg/kg reverses a 1.2 mg/kg rocuronium block to a TOF ratio ≥0.9 in approximately 3 minutes — faster than spontaneous recovery from suxamethonium 1.0 mg/kg (~9–10 minutes). However, reversal does not restore upper-airway tone immediately, so it should never replace a proper difficult-airway plan (DAS 2015).",
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
                  <td>~45–70 min (or &lt;3 min with sugammadex 16 mg/kg)</td>
                </tr>
                <tr>
                  <td className="font-medium">Metabolism / elimination</td>
                  <td>Plasma cholinesterase (pseudo-ChE)</td>
                  <td>Hepatic (biliary) — minimal renal</td>
                </tr>
                <tr>
                  <td className="font-medium">Reversal</td>
                  <td>None — wait for spontaneous recovery</td>
                  <td>Sugammadex (2/4/16 mg/kg by depth) or neostigmine once T2</td>
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
            (sux vs roc for RSI); Schaller &amp; Fink, <em>Anaesthesia</em> 2013
            (sugammadex 16 mg/kg reversal time).
          </p>
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
            Rocuronium's 45–70 min duration is irrelevant if sugammadex is
            immediately available — a 16 mg/kg dose reverses a 1.2 mg/kg
            rocuronium block to TOF ratio ≥0.9 in approximately 3 minutes,
            faster than spontaneous suxamethonium recovery.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground">Contraindications — when to avoid suxamethonium</h2>
          <ul className="list-disc list-inside space-y-1 text-foreground/90">
            <li>
              <strong>Hyperkalaemia or risk of exaggerated K⁺ release</strong> —
              extrajunctional nAChR upregulation in burns (&gt;24–72 h),
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
            plasma cholinesterase hydrolysis. Rocuronium can be reversed at any
            depth by <strong>sugammadex</strong>, a modified γ-cyclodextrin that
            encapsulates the molecule 1:1:
          </p>
          <ul className="list-disc list-inside space-y-1 text-foreground/90 mt-2">
            <li><strong>2 mg/kg</strong> — routine reversal at reappearance of T2.</li>
            <li><strong>4 mg/kg</strong> — TOF count 1–2, no T2 yet.</li>
            <li><strong>16 mg/kg</strong> — immediate reversal of an intubating dose (≥3 min after rocuronium 1.2 mg/kg).</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Counsel patients that sugammadex inactivates hormonal contraceptives
            for 7 days. Re-paralysis within 24 h needs a benzylisoquinolinium
            (e.g. cisatracurium) or a much larger rocuronium dose. Reversal does
            <em>not</em> restore upper-airway tone instantly and is never a
            substitute for a proper failed-intubation plan (DAS 2015).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground">So which should I use?</h2>
          <div className="rounded-lg border border-pharmacology/30 bg-pharmacology/5 p-4 space-y-2 text-foreground/90">
            <p>
              <strong>Default for modern RSI where sugammadex is immediately
              available:</strong> rocuronium 1.0–1.2 mg/kg. Comparable intubating
              conditions, no MH/hyperkalaemia risk, fully reversible.
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
      </article>
    </SectionLayout>
  );
};

export default SuxVsRocComparisonTopic;
