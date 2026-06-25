import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Send, Sparkles, Trash2, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SectionLayout } from "@/components/SectionLayout";

/**
 * Ask AnaesthesiaCore — a single-conversation tutor that retrieves the most
 * relevant topic snippets from `kb_chunks` (curriculum overviews, SEO blurbs,
 * FAQs) and streams a grounded answer with links back to the topics the user
 * should read.
 *
 * Storage choice (per user): browser localStorage only. No login, no
 * server-side conversation log. "New conversation" clears the local message
 * history.
 */

const STORAGE_KEY = "anaesthesiacore.ask.messages.v1";
const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/kb-chat`;

const SUGGESTED = [
  "Explain the four phases of a normal capnograph",
  "How should I manage anaphylaxis under anaesthesia?",
  "What's the difference between SIMV and PSV?",
  "When is voiding mandatory before day-case discharge?",
];

function loadInitialMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as UIMessage[];
  } catch {
    /* ignore corrupt cache */
  }
  return [];
}

function partsToText(parts: UIMessage["parts"]): string {
  return (parts ?? [])
    .map((p) => {
      const part = p as { type: string; text?: string };
      return part.type === "text" ? part.text ?? "" : "";
    })
    .join("");
}

const AskAi = () => {
  const [initial] = useState<UIMessage[]>(loadInitialMessages);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: ENDPOINT,
        headers: {
          // Public Lovable Cloud anon key — safe in client code, required by
          // the gateway in front of all Edge Functions.
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? ""}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "",
        },
      }),
    [],
  );

  const { messages, sendMessage, status, setMessages, error, stop } = useChat({
    id: "anaesthesiacore-ask",
    messages: initial,
    transport,
  });

  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Persist on every message change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* quota etc. — best effort only */
    }
  }, [messages]);

  // Auto-scroll to newest message.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  // Keep the composer focused for fast follow-up questions.
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);
  useEffect(() => {
    if (status === "ready") textareaRef.current?.focus();
  }, [status]);

  const isBusy = status === "submitted" || status === "streaming";

  const submit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    setInput("");
    await sendMessage({ text: trimmed });
  };

  const clear = () => {
    setMessages([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    textareaRef.current?.focus();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submit(input);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submit(input);
    }
  };

  return (
    <SectionLayout
      title="Ask AnaesthesiaCore"
      subtitle="Ground your question in the FRCA / FFICM curriculum and get pointed to the right topics."
      backPath="/"
      backLabel="Home"
      accentColor="text-primary"
    >
      <Helmet>
        <title>Ask AnaesthesiaCore — AI study assistant | FRCA &amp; FFICM</title>
        <meta
          name="description"
          content="Ask any FRCA Primary, FRCA Final or FFICM question and get a grounded answer with links to the relevant AnaesthesiaCore topic pages."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex flex-col h-[min(75vh,900px)] rounded-xl border border-border bg-card">
        {/* Transcript */}
        <div
          ref={scrollerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6"
          aria-live="polite"
        >
          {messages.length === 0 ? (
            <EmptyState onPick={(q) => void submit(q)} />
          ) : (
            messages.map((m) => <Bubble key={m.id} message={m} />)
          )}
          {status === "submitted" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              Searching the curriculum…
            </div>
          )}
          {error && (
            <div className="rounded-md border border-destructive/40 bg-destructive/5 text-sm text-destructive p-3">
              {error.message || "Something went wrong. Try again."}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={onSubmit}
          className="border-t border-border p-3 sm:p-4 bg-background/50"
        >
          <div className="flex items-end gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              placeholder="e.g. How do I manage a STOP-BANG 6 patient for day-case surgery?"
              className="flex-1 resize-none text-sm min-h-[60px]"
              disabled={isBusy}
            />
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                size="icon"
                disabled={isBusy || !input.trim()}
                aria-label="Send question"
              >
                <Send className="h-4 w-4" />
              </Button>
              {isBusy ? (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={stop}
                  aria-label="Stop generating"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={clear}
                  disabled={messages.length === 0}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Answers are AI-generated from the AnaesthesiaCore curriculum and may not be complete. Always confirm against the linked topic and primary references before clinical use.
          </p>
        </form>
      </div>
    </SectionLayout>
  );
};

const EmptyState = ({ onPick }: { onPick: (q: string) => void }) => (
  <div className="text-center max-w-xl mx-auto py-8 space-y-5">
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Sparkles className="h-6 w-6" aria-hidden />
    </div>
    <div className="space-y-2">
      <h2 className="text-lg font-serif font-semibold text-foreground">
        Ask anything about the curriculum
      </h2>
      <p className="text-sm text-muted-foreground">
        I'll answer using AnaesthesiaCore's FRCA Primary, FRCA Final, FFICM and
        EDIC notes, then point you at the exact topic pages to read next.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
      {SUGGESTED.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onPick(q)}
          className="text-xs sm:text-sm p-3 rounded-lg border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition text-foreground"
        >
          {q}
        </button>
      ))}
    </div>
  </div>
);

const Bubble = ({ message }: { message: UIMessage }) => {
  const text = partsToText(message.parts);
  const isUser = message.role === "user";
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2.5 text-sm whitespace-pre-wrap">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 mt-1 h-7 w-7 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center">
        <BookOpen className="h-3.5 w-3.5" aria-hidden />
      </div>
      <div className="flex-1 min-w-0 prose prose-sm max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-primary prose-a:font-medium">
        <ReactMarkdown
          components={{
            // Use react-router Link for in-app paths so we don't full-page reload.
            a: ({ href, children, ...rest }) => {
              if (href && href.startsWith("/")) {
                return (
                  <Link to={href} className="text-primary underline-offset-2 hover:underline">
                    {children}
                  </Link>
                );
              }
              return (
                <a href={href} target="_blank" rel="noreferrer" {...rest}>
                  {children}
                </a>
              );
            },
          }}
        >
          {text || "…"}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AskAi;
