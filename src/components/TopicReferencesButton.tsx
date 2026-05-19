import { useState } from "react";
import { BookOpen, ExternalLink, RefreshCw, AlertTriangle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchTopicReferences,
  generateTopicReferences,
  formatReference,
  referenceHref,
  referenceLinkLabel,
  TopicReference,
} from "@/lib/topicReferences";

interface TopicReferencesButtonProps {
  topicId: string;
  topicTitle: string;
  section: string;
  /** Visual variant — default = full button in topic header, compact = icon-only inline */
  variant?: "default" | "compact";
}

export const TopicReferencesButton = ({
  topicId,
  topicTitle,
  section,
  variant = "default",
}: TopicReferencesButtonProps) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const queryKey = ["topic-references", topicId];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchTopicReferences(topicId),
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });

  const generate = useMutation({
    mutationFn: (force: boolean) =>
      generateTopicReferences({ topicId, topicTitle, section, force }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const ready = data?.status === "ready" && data.refs.length > 0;
  const failed = data?.status === "failed" || generate.isError;
  const working = generate.isPending || data?.status === "generating";

  // Auto-generate the first time the drawer is opened for a topic that has no row yet
  const shouldAutoGenerate =
    open &&
    !isLoading &&
    !generate.isPending &&
    !generate.isSuccess &&
    !ready &&
    (data === null || data?.status === "pending");
  if (shouldAutoGenerate) {
    // queue mutation in microtask so we don't trigger during render
    queueMicrotask(() => {
      if (!generate.isPending && !generate.isSuccess) generate.mutate(false);
    });
  }

  const trigger =
    variant === "compact" ? (
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5"
        aria-label={`References for ${topicTitle}`}
      >
        <BookOpen className="h-4 w-4" />
        References
      </Button>
    ) : (
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        aria-label={`References for ${topicTitle}`}
      >
        <BookOpen className="h-4 w-4" />
        References
      </Button>
    );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">References</SheetTitle>
          <SheetDescription>
            Key reading for <span className="font-medium">{topicTitle}</span>, in
            BJA Education style. AI-curated and cached — verify before clinical
            use.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {(isLoading || working) && <ReferencesSkeleton />}

          {!isLoading && !working && failed && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
              <div className="flex items-start gap-2 text-destructive">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Couldn't load references</p>
                  <p className="text-destructive/80 mt-1">
                    {generate.error instanceof Error
                      ? generate.error.message
                      : data?.error_message || "Unknown error"}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 gap-1.5"
                onClick={() => generate.mutate(true)}
              >
                <RefreshCw className="h-3.5 w-3.5" /> Retry
              </Button>
            </div>
          )}

          {!isLoading && !working && ready && (
            <>
              <ol className="space-y-3 list-decimal pl-5 text-sm text-foreground">
                {data!.refs.map((r, i) => (
                  <ReferenceItem key={i} ref_={r} />
                ))}
              </ol>
              <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t">
                <span>
                  Updated {new Date(data!.updated_at).toLocaleDateString()}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1.5 h-7 px-2"
                  onClick={() => generate.mutate(true)}
                  disabled={generate.isPending}
                >
                  <RefreshCw className="h-3 w-3" /> Refresh
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ReferenceItem = ({ ref_ }: { ref_: TopicReference }) => {
  const text = formatReference(ref_);
  const href = referenceHref(ref_);
  const label = referenceLinkLabel(ref_);
  return (
    <li className="leading-relaxed">
      <span>{text}</span>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1.5 inline-flex items-center gap-0.5 align-baseline text-primary hover:underline text-xs font-medium"
          aria-label={`Open citation on ${label}`}
        >
          <ExternalLink className="h-3 w-3" />
          {label}
        </a>
      )}
    </li>
  );
};

const ReferencesSkeleton = () => (
  <div className="space-y-3">
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} className="space-y-1.5">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    ))}
    <p className="text-xs text-muted-foreground italic">
      Generating BJA-style references…
    </p>
  </div>
);
