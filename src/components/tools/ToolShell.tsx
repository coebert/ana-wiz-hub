import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface ToolShellProps {
  title: string;
  slug: string; // e.g. "mac-for-age"
  description: string; // <160 chars meta
  intro: ReactNode;
  children: ReactNode;
  references?: ReactNode;
  caveat?: ReactNode;
}

/**
 * Shared layout for items in the /tools calculator library.
 * Handles SEO head, breadcrumbs, MedicalCalculator JSON-LD, and a
 * consistent results / references / safety-caveat shell.
 */
export function ToolShell({
  title,
  slug,
  description,
  intro,
  children,
  references,
  caveat,
}: ToolShellProps) {
  const url = `https://anaesthesiacore.app/tools/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description,
    url,
    audience: { "@type": "MedicalAudience", audienceType: "Physician" },
    about: { "@type": "MedicalProcedure", name: title },
  };
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{`${title} | Anaesthesia Core`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`${title} | Anaesthesia Core`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="container mx-auto max-w-3xl px-4 py-6">
        <Breadcrumbs
          items={[
            { label: "Tools", to: "/tools" },
            { label: title },
          ]}
        />
        <header className="mb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">{intro}</p>
        </header>

        <section className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm">
          {children}
        </section>

        {references && (
          <section className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
            <h2 className="text-sm font-semibold text-foreground mb-2">
              Source / further reading
            </h2>
            <div className="text-xs text-muted-foreground space-y-1">{references}</div>
          </section>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          {caveat ?? (
            <>
              Educational aid for trained clinicians. Always double-check against your
              local formulary and the patient in front of you.
            </>
          )}{" "}
          <Link to="/tools" className="underline hover:text-foreground">
            Back to all tools
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
