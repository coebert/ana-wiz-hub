import { ArrowRight, BookOpenCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { relatedCasesForTopic } from "@/data/cases";

interface RelatedCasesProps {
  topicId: string;
}

export const RelatedCases = ({ topicId }: RelatedCasesProps) => {
  const relatedCases = relatedCasesForTopic(topicId);

  if (relatedCases.length === 0) return null;

  return (
    <section id="related-cases" className="scroll-mt-24 border-y border-border py-6">
      <div className="flex items-start gap-3 mb-4">
        <BookOpenCheck className="h-5 w-5 shrink-0 text-perioperative mt-0.5" aria-hidden />
        <div>
          <h2 className="text-xl font-serif font-bold text-foreground">Related case bank</h2>
          <p className="mt-1 text-sm text-muted-foreground">Apply this topic in realistic, progressive clinical scenarios.</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {relatedCases.map((caseItem) => (
          <article key={`${caseItem.path}`} className="border border-border bg-card rounded-lg p-4 min-w-0">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary">{caseItem.category}</Badge>
              <Badge variant="outline">{caseItem.difficulty}</Badge>
            </div>
            <h3 className="font-semibold text-foreground leading-snug">{caseItem.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{caseItem.summary}</p>
            <p className="mt-2 text-xs text-muted-foreground">{caseItem.bankTitle}</p>
            <Button asChild variant="link" size="sm" className="mt-2 h-auto p-0 whitespace-normal text-left justify-start">
              <Link to={caseItem.path}>
                Open full scenario <ArrowRight aria-hidden />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
};
