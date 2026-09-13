import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  BookMarked,
  ClipboardCheck,
  ExternalLink,
  HeartPulse,
  Search,
  TriangleAlert,
} from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { icuNursingProtocols, nursingProtocolCategories } from "@/data/icuNursingProtocols";

const IcuNursingProtocols = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return icuNursingProtocols.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.category,
        p.aim,
        ...p.steps,
        ...p.monitoring,
        ...p.escalation,
        ...p.references.map((r) => `${r.label} ${r.source}`),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category]);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>ICU Nursing Protocols | AnaesthesiaCore</title>
        <meta
          name="description"
          content="Intensive care nursing protocols and care bundles: central line care, ventilated patient bundle, tracheostomy, prone positioning, RRT circuits, feeding."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/nursing-protocols" />
        <meta property="og:url" content="https://anaesthesiacore.app/intensive-care/nursing-protocols" />
      </Helmet>

      <PageSection className="pt-8 pb-16">
        <Link
          to="/intensive-care"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Intensive Care
        </Link>

        <div className="mt-4 flex items-start gap-3">
          <div className="rounded-lg bg-icu/10 p-2.5 text-icu">
            <HeartPulse className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ICU Nursing Protocols</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              The bedside care bundles that underpin daily critical care — what is
              done, what is monitored, and when to escalate. Each protocol cites
              the national guidance it is based on, so you can quote a source in
              a viva or at the bedside.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" aria-hidden />
          <p>
            Revision summaries of UK national guidance. Your unit's own written
            protocols and policies always take precedence at the bedside.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-6 space-y-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search protocols, steps or references…"
              aria-label="Search nursing protocols"
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["All", ...nursingProtocolCategories].map((c) => (
              <Button
                key={c}
                size="sm"
                variant={c === category ? "default" : "outline"}
                className="shrink-0"
                onClick={() => setCategory(c)}
                aria-pressed={c === category}
              >
                {c}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {icuNursingProtocols.length} protocols
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            No protocols match that search. Try a different term or clear the filters.
          </p>
        ) : (
          <Accordion type="multiple" className="mt-6 space-y-4">
            {filtered.map((p) => (
              <AccordionItem
                key={p.id}
                value={p.id}
                id={p.id}
                className="scroll-mt-24 rounded-xl border border-border bg-card px-4 sm:px-5"
              >
                <AccordionTrigger className="py-4 text-left hover:no-underline">
                  <span className="flex flex-col gap-1 pr-2">
                    <span className="text-base font-semibold text-foreground sm:text-lg">
                      {p.title}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wide text-icu">
                      {p.category}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Aim: </span>
                    {p.aim}
                  </p>

                  <div className="mt-4">
                    <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <ClipboardCheck className="h-3.5 w-3.5" aria-hidden /> Protocol steps
                    </h2>
                    <ol className="mt-2 space-y-2 text-sm text-foreground/90">
                      {p.steps.map((s, i) => (
                        <li key={s} className="flex gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-icu/10 text-[11px] font-semibold text-icu">
                            {i + 1}
                          </span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Monitoring and documentation
                      </h2>
                      <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
                        {p.monitoring.map((m) => (
                          <li key={m} className="flex gap-2">
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-icu/60"
                            />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-icu/25 bg-icu/5 p-4">
                      <h2 className="text-xs font-semibold uppercase tracking-wide text-icu">
                        Escalate if
                      </h2>
                      <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
                        {p.escalation.map((e) => (
                          <li key={e} className="flex gap-2">
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-icu"
                            />
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <BookMarked className="h-3.5 w-3.5" aria-hidden /> References
                    </h2>
                    <ul className="mt-2 space-y-2 text-sm">
                      {p.references.map((r) => (
                        <li key={r.url + r.label}>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-1.5 font-medium text-icu underline-offset-4 hover:underline"
                          >
                            <span>{r.label}</span>
                            <ExternalLink className="mt-1 h-3 w-3 shrink-0" aria-hidden />
                          </a>
                          <span className="block text-xs text-muted-foreground">{r.source}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <p className="mt-10 text-sm text-muted-foreground">
          Related:{" "}
          <Link
            to="/intensive-care/management-flows"
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            ICU management flows
          </Link>{" "}
          ·{" "}
          <Link
            to="/intensive-care/drug-doses"
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            ICU drug dosing table
          </Link>{" "}
          ·{" "}
          <Link
            to="/intensive-care/infusions"
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            ICU infusions guide
          </Link>
        </p>
      </PageSection>
    </main>
  );
};

export default IcuNursingProtocols;
