import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SectionLayout } from "@/components/layout/SectionLayout";
import CapnographyWaveformDiagram from "@/components/diagrams/physics/CapnographyWaveformDiagram";
import { PageJsonLd } from "@/components/layout/PageJsonLd";

/**
 * SEO-focused companion page to /physics/capnography.
 *
 * Targets the "capnography waveforms" / "waveform capnography" / "how
 * to read capnography" search intent (Semrush UK: 390/mo, KDI 22, weak
 * SERP dominated by LITFL & vendor pages). The parent page owns the
 * broader "capnography" head term; this page goes pattern-by-pattern
 * with a labelled diagram and an "interpret → cause → action" mini
 * card for each classic waveform, plus FAQPage JSON-LD covering the
 * question-keyword cluster.
 */

const waveformPatterns: Array<{
  id: string;
  name: string;
  description: string;
  causes: string;
  action: string;
}> = [
  {
    id: "normal",
    name: "Normal capnograph",
    description:
      "Four crisp phases — flat zero baseline (I), near-vertical upstroke (II), gently rising alveolar plateau (III) with α-angle ≈ 100–110° and β-angle ≈ 90°, then rapid descent (0). ETCO₂ sits at the end of phase III (normal 4.5–6.0 kPa / 35–45 mmHg).",
    causes: "Healthy lungs, properly ventilated.",
    action: "Document baseline shape; compare future traces against it.",
  },
  {
    id: "shark-fin",
    name: "Shark-fin (sloped plateau)",
    description:
      "Phase II loses its steep upstroke and merges into a sloping phase III. The α-angle becomes obtuse and the whole waveform takes on a fin shape. Reflects prolonged, uneven alveolar emptying.",
    causes:
      "Expiratory airflow obstruction: acute severe asthma, COPD exacerbation, anaphylactic bronchospasm, kinked tracheal tube, blocked HME filter or partial circuit obstruction.",
    action:
      "Treat the obstruction first (bronchodilator, suction, check the tube and circuit). Do NOT just increase the rate — you'll generate auto-PEEP.",
  },
  {
    id: "upper-airway-obstruction",
    name: "Upper (extrathoracic) airway obstruction",
    description:
      "A delayed, low-amplitude breath that still reaches a genuinely FLAT plateau. Phase II is slurred and prolonged and the downstroke is slow, but the α-angle is close to normal once flow is established. Contrast with bronchospasm, where a single fixed resistance is replaced by thousands of small airways with different time constants, so the trace climbs continuously and never plateaus.",
    causes:
      "Laryngospasm or partial glottic closure, soft-tissue/tongue obstruction in a sedated patient, kinked or bitten tracheal tube, malpositioned supraglottic airway, airway oedema, tumour or foreign body above the carina.",
    action:
      "Bronchodilators will not help. Jaw thrust and CPAP, deepen anaesthesia, suxamethonium for laryngospasm, pass a suction catheter or replace the tube. Look for stridor and see-saw breathing rather than wheeze.",
  },
  {
    id: "curare-cleft",
    name: "Curare cleft",
    description:
      "A sharp downward notch dropping into the middle of the alveolar plateau (phase III) on a controlled-ventilation trace. Depth of the cleft mirrors patient effort.",
    causes:
      "Returning diaphragmatic activity against partial neuromuscular blockade — the relaxant is wearing off.",
    action:
      "Confirm with quantitative neuromuscular monitoring (TOF ratio). Top-up the relaxant if surgery continues, or plan reversal (neostigmine/sugammadex) if appropriate.",
  },
  {
    id: "rebreathing",
    name: "Raised baseline (rebreathing)",
    description:
      "Phase I no longer returns to zero — the baseline lifts. The whole waveform shifts upward; phase III may also be elevated.",
    causes:
      "Exhausted soda lime CO₂ absorber, incompetent expiratory valve in a circle system, inadequate fresh gas flow in a Mapleson D/Bain, or external rebreathing via a faulty NIV mask.",
    action:
      "Switch to a fresh circuit / change the soda lime canister. Inspect inspiratory and expiratory valves. Increase fresh gas flow temporarily while the cause is corrected.",
  },
  {
    id: "sudden-loss",
    name: "Sudden loss of waveform",
    description:
      "Trace abruptly drops to zero across all phases. No upstroke, no plateau, no oscillation.",
    causes:
      "Oesophageal intubation, accidental extubation, complete circuit disconnection, total airway obstruction, or cardiac arrest with no cardiac output.",
    action:
      "Treat as a life-threatening event. Look at the patient and the airway: confirm tube position with direct laryngoscopy / videolaryngoscopy, check connections from patient to machine, palpate a central pulse. Call for help.",
  },
  {
    id: "exponential-decline",
    name: "Exponential decline",
    description:
      "Progressive, breath-by-breath fall in ETCO₂ over seconds to minutes, with the waveform shape preserved.",
    causes:
      "Falling cardiac output: hypovolaemia, sepsis, pulmonary embolism, tension pneumothorax, dynamic hyperinflation, tamponade. Also seen with sudden hyperventilation.",
    action:
      "Treat circulation: check BP, HR, lactate. Look for blood loss and obstructive causes. ETCO₂ recovery tracks restoration of cardiac output.",
  },
  {
    id: "cardiac-oscillations",
    name: "Cardiac oscillations",
    description:
      "Small ripples superimposed on the descending limb (phase 0), occurring at heart-rate frequency. The underlying waveform is otherwise normal.",
    causes:
      "Cardiac contractions transmitting through a low-volume lung, usually in small adults or paediatric patients on low tidal volumes near end-expiration. Benign.",
    action:
      "Reduce ventilator trigger sensitivity if pressure-support mode is auto-triggering off them; otherwise no intervention needed.",
  },
  {
    id: "steep-plateau",
    name: "Steeply rising plateau",
    description:
      "Phase III slope > 5°. ETCO₂ at end-expiration is significantly higher than at the start of the plateau.",
    causes:
      "V/Q heterogeneity from COPD, ARDS, early bronchospasm, or pregnancy-related compression atelectasis. May precede frank shark-fin.",
    action:
      "Treat the underlying lung pathology. Bronchodilators if reversible; lung-protective settings in ARDS.",
  },
  {
    id: "cpr",
    name: "Capnography in CPR",
    description:
      "Low-amplitude waveform during compressions (typically 1.0–2.0 kPa / 8–15 mmHg if compressions are effective). A sudden sustained rise above this baseline is one of the earliest signs of ROSC.",
    causes:
      "ETCO₂ during CPR reflects pulmonary blood flow generated by compressions.",
    action:
      "Aim for ETCO₂ > 1.3 kPa (10 mmHg) during good-quality CPR (RCUK/ERC 2021). Persistent ETCO₂ < 1.3 kPa after 20 minutes of advanced life support is associated with very low likelihood of survival.",
  },
];

const waveformFaqs: Array<[string, string]> = [
  [
    "What is the normal capnography waveform?",
    "A normal capnograph has four phases: phase I — flat zero baseline (anatomical dead-space gas); phase II — rapid, near-vertical upstroke as alveolar gas reaches the sensor; phase III — gently rising alveolar plateau (slope < 5°) whose end value is the ETCO₂; phase 0 — rapid descent back to zero on inspiration. The α-angle (between II and III) is ≈ 100–110°, the β-angle (between III and 0) ≈ 90°. Normal ETCO₂ in a healthy ventilated adult is 4.5–6.0 kPa (35–45 mmHg).",
  ],
  [
    "How do you read a capnography waveform?",
    "Work through the trace in four steps. (1) Is there a waveform at all — sudden loss means oesophageal intubation, disconnection, complete obstruction or arrest. (2) Is the baseline at zero — a raised baseline is rebreathing. (3) Is the upstroke steep and the plateau flat — a sloping shark-fin is expiratory obstruction. (4) Is the plateau smooth — a downward notch is a curare cleft. Only after the shape is normal does the absolute ETCO₂ number become useful.",
  ],
  [
    "What does a shark-fin capnography waveform mean?",
    "A shark-fin (sloped) trace reflects prolonged, uneven alveolar emptying — the α-angle becomes obtuse and the plateau slopes upward. It indicates expiratory airflow obstruction: acute severe asthma, COPD exacerbation, anaphylactic bronchospasm, a kinked tracheal tube or a partly obstructed circuit. Treat the cause; do not increase the ventilator rate before addressing the obstruction or you will generate auto-PEEP.",
  ],
  [
    "What is a curare cleft on the capnograph?",
    "A curare cleft is a sharp downward notch in the middle of the alveolar plateau (phase III) caused by a spontaneous diaphragmatic effort against partial neuromuscular blockade — the relaxant is wearing off. Confirm with quantitative neuromuscular monitoring (train-of-four ratio) and top up the relaxant or wake and reverse depending on the stage of surgery.",
  ],
  [
    "What does a raised capnography baseline mean?",
    "If phase I no longer returns to zero, the patient is rebreathing CO₂. Causes are exhausted soda lime, an incompetent expiratory valve in a circle system, inadequate fresh gas flow in a Mapleson D/Bain circuit, or external rebreathing via a faulty NIV mask. Increase fresh gas flow as a temporising measure and change the absorber or circuit.",
  ],
  [
    "What is a normal ETCO₂ range?",
    "In a healthy ventilated adult the normal end-tidal CO₂ (ETCO₂) range is 4.5–6.0 kPa (35–45 mmHg). ETCO₂ typically sits 0.3–0.7 kPa (2–5 mmHg) below the arterial PaCO₂ because of alveolar dead-space dilution; this PaCO₂–ETCO₂ gradient widens with pulmonary embolism, low cardiac output, COPD/ARDS and high airway pressures.",
  ],
  [
    "Why does ETCO₂ suddenly fall to zero?",
    "A complete loss of the capnograph waveform across all phases means no expired CO₂ is reaching the sensor. The differential is short: oesophageal intubation, accidental extubation, complete circuit disconnection, total airway obstruction, or cardiac arrest with no cardiac output. Treat as life-threatening — look at the patient and the airway, confirm tube position, check every connection from patient to machine, and palpate a central pulse.",
  ],
  [
    "What is the α-angle on a capnograph?",
    "The α-angle is the angle between phase II (expiratory upstroke) and phase III (alveolar plateau). Normally 100–110°. It widens (becomes obtuse) whenever expiration is prolonged or uneven — most commonly with expiratory airflow obstruction (asthma, COPD). The β-angle, between phase III and phase 0, normally sits near 90° and widens with rebreathing.",
  ],
];

const CapnographyWaveformsTopic = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: waveformFaqs.map(([name, acceptedAnswer]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Capnography Waveforms: How to Read the Capnograph Trace",
    description:
      "Pattern-by-pattern guide to capnography waveforms — normal phases, shark-fin, curare cleft, rebreathing, sudden loss, cardiac oscillations and CPR.",
    inLanguage: "en-GB",
    author: { "@type": "Person", name: "Dr Rob Coe" },
    publisher: { "@type": "Organization", name: "AnaesthesiaCore", url: "https://anaesthesiacore.app/" },
    isPartOf: { "@type": "WebSite", name: "AnaesthesiaCore", url: "https://anaesthesiacore.app/" },
    mainEntityOfPage: "https://anaesthesiacore.app/physics/capnography/waveforms",
  };

  return (
    <>
      <Helmet>
        <title>Capnography Waveforms: How to Read the Trace | FRCA</title>
        <meta property="og:title" content="Capnography Waveforms: How to Read the Trace | FRCA" />
        <meta name="twitter:title" content="Capnography Waveforms: How to Read the Trace | FRCA" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>
      <SectionLayout
        title="Capnography Waveforms"
        subtitle="How to read the capnograph trace — normal phases, shark-fin, curare cleft, rebreathing, sudden loss and cardiac oscillations, with an interactive simulator and FRCA-ready interpretation rules."
        backPath="/physics/capnography"
        backLabel="Capnography"
        accentColor="text-physics"
        metaDescription="Capnography waveforms explained for FRCA Primary/Final and FFICM: four normal phases, shark-fin, curare cleft, rebreathing, sudden loss, cardiac oscillations, ETCO₂ in CPR — with a labelled interactive trace."
      >
        <PageJsonLd name="Capnography Waveforms" description="Capnography waveforms explained for FRCA and FFICM: normal phases, shark-fin, curare cleft, rebreathing, sudden loss and cardiac oscillations." learningResourceType="Topic" />
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Read the shape before the number
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every classic clinical event on the anaesthetic machine has
              a fingerprint on the capnograph. Learning the shape of the
              trace — not the ETCO₂ number — is what distinguishes a
              safe trainee from a senior. This page is a focused
              pattern-recognition guide: each waveform is shown, named,
              explained and paired with the action that follows. Use the
              simulator first to lock the shapes in, then work through
              the patterns below. For the underlying physics, sidestream
              vs mainstream sampling, and the wider clinical use of
              capnography, see the main{" "}
              <Link to="/physics/capnography" className="text-physics underline">
                capnography topic
              </Link>
              .
            </p>
          </section>

          <section>
            <CapnographyWaveformDiagram />
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              The classic patterns
            </h2>
            <p className="text-sm text-muted-foreground">
              For each pattern: what the waveform looks like, the
              clinical cause, and the immediate action. Memorise the
              shape first — the differential follows.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {waveformPatterns.map((p) => (
                <article
                  key={p.id}
                  id={p.id}
                  className="scroll-mt-24 rounded-xl border border-border bg-card p-5 space-y-3"
                >
                  <h3 className="text-lg font-serif font-semibold text-foreground">
                    {p.name}
                  </h3>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                      Waveform
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                      Causes
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.causes}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                      Action
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {p.action}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Quick-reference interpretation algorithm
            </h2>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2 leading-relaxed">
              <li>
                <strong>Is there a waveform at all?</strong> No trace →
                oesophageal intubation, disconnection, complete
                obstruction or arrest.
              </li>
              <li>
                <strong>Is the baseline at zero?</strong> Raised baseline
                → rebreathing (soda lime, valves, fresh gas flow).
              </li>
              <li>
                <strong>Is the upstroke steep and the plateau flat?</strong>{" "}
                Sloping shark-fin → expiratory obstruction (asthma, COPD,
                kinked tube).
              </li>
              <li>
                <strong>Is the plateau smooth?</strong> Downward notch in
                phase III → curare cleft (neuromuscular blockade wearing
                off).
              </li>
              <li>
                <strong>Is the trend stable?</strong> Exponential decline
                → falling cardiac output (haemorrhage, sepsis, PE).
              </li>
              <li>
                <strong>Only now — is the number normal?</strong>{" "}
                4.5–6.0 kPa (35–45 mmHg) for a healthy ventilated adult.
                Remember ETCO₂ underestimates PaCO₂ by 0.3–0.7 kPa and
                the gap widens in dead-space disease.
              </li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Frequently asked questions
            </h2>
            <dl className="space-y-4">
              {waveformFaqs.map(([q, a]) => (
                <div key={q} className="rounded-lg border border-border bg-secondary/20 p-4">
                  <dt className="font-semibold text-foreground text-sm mb-1">{q}</dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
            <p className="text-foreground font-semibold mb-1">See also</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>
                <Link to="/physics/capnography" className="text-physics underline">
                  Capnography — physics, sampling, ETCO₂ in CPR
                </Link>
              </li>
              <li>
                <Link to="/physics/pulse-oximetry" className="text-physics underline">
                  Pulse oximetry — Beer-Lambert law and saturation curves
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </SectionLayout>
    </>
  );
};

export default CapnographyWaveformsTopic;
