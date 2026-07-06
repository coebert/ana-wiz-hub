import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SectionLayout } from "@/components/layout/SectionLayout";
import BernoulliVenturiDiagram from "@/components/diagrams/BernoulliVenturiDiagram";

/**
 * SEO-focused page for "venturi mask" search intent.
 *
 * Semrush UK: ~4,400/mo, mid-difficulty SERP dominated by patient.info,
 * GeekyMedics and product vendors. AnaesthesiaCore can compete on the
 * FRCA/clinical-physiology angle: colour-coded FiO₂ table, entrainment
 * ratio physics, and the link back to Bernoulli/Venturi theory.
 */

const venturiColours: Array<{
  colour: string;
  swatch: string;
  fio2: string;
  oxygenFlow: string;
  entrainmentRatio: string;
  totalFlow: string;
}> = [
  { colour: "Blue",   swatch: "#2563eb", fio2: "24%", oxygenFlow: "2 L/min",  entrainmentRatio: "1 : 25", totalFlow: "≈ 52 L/min" },
  { colour: "White",  swatch: "#e5e7eb", fio2: "28%", oxygenFlow: "4 L/min",  entrainmentRatio: "1 : 10", totalFlow: "≈ 44 L/min" },
  { colour: "Yellow", swatch: "#facc15", fio2: "35%", oxygenFlow: "8 L/min",  entrainmentRatio: "1 : 5",  totalFlow: "≈ 48 L/min" },
  { colour: "Red",    swatch: "#dc2626", fio2: "40%", oxygenFlow: "10 L/min", entrainmentRatio: "1 : 3",  totalFlow: "≈ 40 L/min" },
  { colour: "Green",  swatch: "#16a34a", fio2: "60%", oxygenFlow: "15 L/min", entrainmentRatio: "1 : 1",  totalFlow: "≈ 30 L/min" },
];

const venturiFaqs: Array<[string, string]> = [
  [
    "What is a venturi mask?",
    "A venturi mask (also called an air-entrainment or fixed-performance mask) is an oxygen-delivery device that uses the Bernoulli/Venturi effect to deliver a precise, predictable fraction of inspired oxygen (FiO₂) independent of the patient's breathing pattern. Oxygen is driven through a narrow jet inside a colour-coded barrel; the resulting low pressure entrains room air through side ports in a fixed ratio, so the FiO₂ stays constant even if minute ventilation changes.",
  ],
  [
    "How does a venturi mask work?",
    "Oxygen passes through a constriction in the venturi barrel. By Bernoulli's principle, velocity rises at the constriction and lateral pressure falls below atmospheric. Room air is entrained through fixed-size side holes. The entrainment ratio (air : O₂) is set by the size of the holes — wider holes entrain more air and give a lower FiO₂. The total gas flow leaving the mask exceeds the patient's peak inspiratory flow, so the delivered FiO₂ is independent of respiratory rate or tidal volume.",
  ],
  [
    "What are the venturi mask colours and percentages?",
    "Standard UK colour codes are: blue 24%, white 28%, yellow 35%, red 40%, green 60%. Each barrel is marked with the minimum oxygen flow required to guarantee that FiO₂ (commonly 2, 4, 8, 10 and 15 L/min respectively). Using less oxygen than the printed minimum invalidates the entrainment ratio and the delivered FiO₂ is no longer predictable.",
  ],
  [
    "When should you use a venturi mask?",
    "Venturi masks are the device of choice when a controlled, accurate FiO₂ matters — most importantly in hypercapnic respiratory failure (e.g. type 2 respiratory failure from COPD), where excessive oxygen can worsen hypercapnia by abolishing hypoxic respiratory drive, increasing V/Q mismatch and the Haldane effect. BTS guidance recommends starting at 24–28% and titrating to SpO₂ 88–92% in patients at risk of hypercapnic failure.",
  ],
  [
    "What is the entrainment ratio in a venturi mask?",
    "The entrainment ratio is the volume of room air drawn in for every volume of oxygen delivered through the jet. It is set mechanically by the size of the side ports. A 24% blue mask has an entrainment ratio of about 1:25 (high air, low FiO₂), while a 60% green mask is about 1:1 (low air, high FiO₂). Total gas flow at the mask = oxygen flow × (1 + entrainment ratio).",
  ],
  [
    "Why does a venturi mask give a fixed FiO₂?",
    "Because the entrainment ratio is determined by mask geometry, not by the patient. As long as the total gas flow at the mask exceeds the patient's peak inspiratory flow (typically 30–40 L/min in an adult, higher in respiratory distress), no room air dilutes the delivered gas. This makes the venturi a fixed-performance device — unlike a Hudson mask or nasal cannulae, whose FiO₂ swings with minute ventilation.",
  ],
];

const VenturiMaskTopic = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: venturiFaqs.map(([name, acceptedAnswer]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Venturi Mask: Colours, FiO₂ Percentages & Entrainment Physics",
    description:
      "Venturi mask explained for FRCA — colour codes (24–60%), oxygen flow rates, entrainment ratio, Bernoulli physics and use in type 2 respiratory failure.",
    inLanguage: "en-GB",
    author: { "@type": "Person", name: "Dr Rob Coe" },
    publisher: { "@type": "Organization", name: "AnaesthesiaCore", url: "https://anaesthesiacore.app/" },
    isPartOf: { "@type": "WebSite", name: "AnaesthesiaCore", url: "https://anaesthesiacore.app/" },
    mainEntityOfPage: "https://anaesthesiacore.app/physics/venturi-mask",
  };

  return (
    <>
      <Helmet>
        <title>Venturi Mask Colours, FiO₂ % & Entrainment | FRCA</title>
        <meta property="og:title" content="Venturi Mask Colours, FiO₂ % & Entrainment | FRCA" />
        <meta name="twitter:title" content="Venturi Mask Colours, FiO₂ % & Entrainment | FRCA" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>
      <SectionLayout
        title="Venturi Mask"
        subtitle="Colour-coded fixed-performance oxygen masks — FiO₂ 24–60%, the Bernoulli/Venturi physics that drives them, and when to choose one in hypoxic vs hypercapnic respiratory failure."
        backPath="/physics"
        backLabel="Physics"
        accentColor="text-physics"
        metaDescription="Venturi mask explained: colour codes (blue 24%, white 28%, yellow 35%, red 40%, green 60%), required oxygen flow rates, entrainment ratio, Bernoulli physics and FRCA-ready use in COPD/type 2 respiratory failure."
      >
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              A fixed-performance oxygen mask
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A venturi mask delivers a precise, predictable fraction of
              inspired oxygen (FiO₂) regardless of how the patient
              breathes. Oxygen is driven through a narrow jet inside a
              colour-coded barrel; the low pressure at the constriction
              entrains room air through fixed-size side ports in a set
              ratio. Total gas flow at the mask outstrips the patient's
              peak inspiratory flow, so no room air dilutes the delivered
              mixture. This is the device to reach for whenever the FiO₂
              <em> matters</em> — most importantly in patients at risk of
              hypercapnic respiratory failure.
            </p>
          </section>

          <section>
            <BernoulliVenturiDiagram />
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Venturi mask colours and FiO₂
            </h2>
            <p className="text-sm text-muted-foreground">
              Each barrel is colour-coded and marked with the minimum
              oxygen flow needed to guarantee the printed FiO₂. Below the
              marked minimum, the entrainment ratio fails and the
              delivered FiO₂ becomes unpredictable.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-foreground">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold">Colour</th>
                    <th className="text-left px-3 py-2 font-semibold">FiO₂</th>
                    <th className="text-left px-3 py-2 font-semibold">O₂ flow (min)</th>
                    <th className="text-left px-3 py-2 font-semibold">Entrainment ratio (air : O₂)</th>
                    <th className="text-left px-3 py-2 font-semibold">Total flow at mask</th>
                  </tr>
                </thead>
                <tbody>
                  {venturiColours.map((row) => (
                    <tr key={row.colour} className="border-t border-border">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className="inline-block h-4 w-4 rounded-sm border border-border"
                            style={{ backgroundColor: row.swatch }}
                          />
                          <span className="font-medium text-foreground">{row.colour}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 font-semibold text-foreground">{row.fio2}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.oxygenFlow}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.entrainmentRatio}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.totalFlow}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground">
              Total flow = O₂ flow × (1 + entrainment ratio). Higher FiO₂
              barrels deliver <em>less</em> total flow because they
              entrain less air — which is why high-FiO₂ venturis may not
              meet the inspiratory demands of a tachypnoeic patient.
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="text-lg font-serif font-semibold text-foreground">
                The physics — Bernoulli & continuity
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In a narrowing tube the cross-sectional area falls, so
                velocity must rise (A₁v₁ = A₂v₂). By Bernoulli's
                principle <span className="font-mono">P + ½ρv² + ρgh = const</span>,
                rising velocity is paid for by falling lateral
                pressure. The sub-atmospheric pressure at the throat
                draws ("entrains") room air through the side ports. The
                ratio of entrained air to driving oxygen is fixed by the
                geometry of the barrel.
              </p>
            </article>
            <article className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="text-lg font-serif font-semibold text-foreground">
                Why "fixed performance"?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Total flow at the mask (oxygen + entrained air) is
                typically 30–60 L/min, which exceeds an adult's peak
                inspiratory flow (~30–40 L/min). Because the patient
                cannot out-breathe the device, no atmospheric air is
                drawn in around the mask to dilute the gas — the FiO₂
                stays at the printed value. Hudson masks and nasal
                cannulae are variable-performance: their FiO₂ falls as
                the patient breathes harder.
              </p>
            </article>
          </section>

          <section className="rounded-xl border border-physics/40 bg-physics/5 p-5 space-y-2">
            <h3 className="text-lg font-serif font-semibold text-foreground">
              Clinical use — type 2 respiratory failure
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In patients at risk of hypercapnic (type 2) respiratory
              failure — most often COPD — uncontrolled oxygen worsens
              CO₂ retention through three mechanisms: loss of hypoxic
              respiratory drive, reversal of hypoxic pulmonary
              vasoconstriction (worsening V/Q mismatch), and the Haldane
              effect (deoxygenated haemoglobin offloads CO₂ more
              readily). BTS guidance recommends starting at <strong>24%
              (blue) or 28% (white)</strong> and titrating to a target
              SpO₂ of <strong>88–92%</strong>, repeating an arterial
              blood gas at 30–60 minutes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Frequently asked questions
            </h2>
            <dl className="space-y-4">
              {venturiFaqs.map(([q, a]) => (
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
                <Link to="/physics/flow-measurement" className="text-physics underline">
                  Flow measurement — Bernoulli, Venturi & flow physics
                </Link>
              </li>
              <li>
                <Link to="/physics/capnography" className="text-physics underline">
                  Capnography — ETCO₂, waveforms and CPR
                </Link>
              </li>
              <li>
                <Link to="/physics/breathing-circuits" className="text-physics underline">
                  Breathing circuits — Mapleson classification and circle systems
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </SectionLayout>
    </>
  );
};

export default VenturiMaskTopic;
