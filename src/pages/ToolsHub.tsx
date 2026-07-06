import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calculator, Activity, Baby, Droplet, Syringe, Wind } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

const TOOLS = [
  {
    slug: "mac-for-age",
    title: "MAC for age & temperature",
    blurb:
      "Age- and temperature-adjusted MAC for isoflurane, sevoflurane, desflurane and N₂O.",
    icon: Wind,
  },
  {
    slug: "paediatric-emergency-doses",
    title: "Paediatric emergency drug doses",
    blurb:
      "Weight-based bolus doses for arrest, induction and analgesia in children.",
    icon: Baby,
  },
  {
    slug: "maintenance-fluid",
    title: "Maintenance fluid (4-2-1)",
    blurb:
      "Holliday–Segar hourly maintenance rate and 24-hour requirement by weight.",
    icon: Droplet,
  },
  {
    slug: "max-local-anaesthetic-dose",
    title: "Max local anaesthetic dose",
    blurb:
      "Maximum safe dose and volume by agent, weight and concentration.",
    icon: Syringe,
  },
  {
    slug: "abg-interpreter",
    title: "ABG interpreter",
    blurb:
      "Boston-rules acid–base interpretation with expected compensation.",
    icon: Activity,
  },
];

export default function ToolsHub() {
  const url = "https://anaesthesiacore.app/tools";
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Anaesthesia calculators and decision tools",
    url,
    itemListElement: TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${url}/${t.slug}`,
      name: t.title,
    })),
  };
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Anaesthesia calculators & decision tools | Anaesthesia Core</title>
        <meta
          name="description"
          content="Free anaesthesia calculators: MAC for age, paediatric emergency drug doses, 4-2-1 maintenance fluid, max local anaesthetic dose, ABG interpreter."
        />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(itemList)}</script>
      </Helmet>
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <Breadcrumbs items={[{ label: "Tools" }]} />
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground">
            <Calculator className="h-3 w-3" />
            Calculator library
          </div>
          <h1 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-foreground">
            Anaesthesia calculators &amp; decision tools
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Fast, source-cited bedside calculators for theatre, recovery and ICU.
            Each tool is indexable, deep-linkable and works offline once loaded.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.slug}
                to={`/tools/${t.slug}`}
                className="group rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-serif text-lg font-semibold text-foreground">
                      {t.title}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">{t.blurb}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Educational aids for trained clinicians. Always verify against your local
          formulary.
        </p>
      </div>
    </main>
  );
}
