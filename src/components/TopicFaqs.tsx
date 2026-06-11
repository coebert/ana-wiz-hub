import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";

export type TopicFaqPair = [question: string, answer: string];

interface TopicFaqsProps {
  /**
   * Tuple list of [question, answer]. Must be declared in the parent topic
   * file as `const <name>Faqs: Array<[string, string]> = [...]` so the
   * build-time extractor (scripts/extract-faqs.ts) can pick them up for
   * prerendered FAQPage JSON-LD.
   */
  faqs: TopicFaqPair[];
  /** Section heading. Defaults to "Frequently asked". */
  heading?: string;
  /** Optional sub-heading shown under the heading. */
  description?: string;
}

/**
 * Renders visible Q&A as an accordion AND emits FAQPage JSON-LD via Helmet.
 *
 * Google's FAQ rich-result policy requires that every Q&A in the schema is
 * visibly present on the page; this component is the canonical way to satisfy
 * that on AnaesthesiaCore topic pages. The prerender step (scripts/prerender-seo.ts)
 * additionally bakes the same JSON-LD into the static <head> for crawlers
 * that don't execute JS — see scripts/extract-faqs.ts for the extraction
 * convention.
 */
export const TopicFaqs = ({
  faqs,
  heading = "Frequently asked",
  description,
}: TopicFaqsProps) => {
  if (!faqs || faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };

  return (
    <CollapsibleSubsection title={heading} defaultOpen={false}>
      {description ? (
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      ) : null}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map(([q, a], i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-sm font-medium">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
    </CollapsibleSubsection>
  );
};

export default TopicFaqs;
