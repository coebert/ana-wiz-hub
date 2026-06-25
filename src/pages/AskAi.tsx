import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import {
  Send, Sparkles, Trash2, BookOpen, Loader2, History, Search, X, MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger,
} from "@/components/ui/sheet";
import { SectionLayout } from "@/components/SectionLayout";
import { supabase } from "@/integrations/supabase/client";

/**
 * Ask AnaesthesiaCore — a single-conversation tutor that retrieves the most
 * relevant topic snippets from `kb_chunks` (curriculum overviews, SEO blurbs,
 * FAQs) and streams a grounded answer with links back to the topics the user
 * should read.
 *
 * Storage:
 * - Current conversation messages: browser localStorage (single chat).
 * - Q&A library: shared `ask_qa_library` table — every answered question is
 *   saved server-side via `kb-chat`'s onFinish hook, then every user can
 *   browse, search, and reopen the full library.
 */

const STORAGE_KEY = "anaesthesiacore.ask.messages.v1";
const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/kb-chat`;

const SUGGESTED = [
  "Explain the four phases of a normal capnograph",
  "How should I manage anaphylaxis under anaesthesia?",
  "What's the difference between SIMV and PSV?",
  "When is voiding mandatory before day-case discharge?",
];

interface QAEntry {
  id: string;
  question: string;
  normalized: string;
  tokens: string[];
  answer: string;
  askCount: number;
  updatedAt: number;
}

const STOPWORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being","of","to","in","on",
  "for","and","or","but","with","without","as","at","by","from","that","this","it",
  "its","do","does","did","how","what","why","when","where","which","who","whom",
  "should","could","would","can","may","might","i","you","we","they","my","your",
  "about","into","over","under","than","then","so","if","not","no","yes",
]);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

function jaccard(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const sa = new Set(a);
  const sb = new Set(b);
  let inter = 0;
  sa.forEach((t) => { if (sb.has(t)) inter += 1; });
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 0 : inter / union;
}

interface RawLibraryRow {
  id: string;
  question: string;
  normalized: string;
  answer: string;
  ask_count: number;
  updated_at: string;
}

function rowToEntry(row: RawLibraryRow): QAEntry {
  return {
    id: row.id,
    question: row.question,
    normalized: row.normalized,
    tokens: tokenize(row.question),
    answer: row.answer,
    askCount: row.ask_count ?? 1,
    updatedAt: new Date(row.updated_at).getTime(),
  };
}

async function fetchLibrary(): Promise<QAEntry[]> {
  // The shared Q&A library is world-readable via RLS; the publishable anon
  // key in the default client is enough.
  const { data, error } = await supabase
    .from("ask_qa_library")
    .select("id, question, normalized, answer, ask_count, updated_at")
    .order("updated_at", { ascending: false })
    .limit(500);
  if (error) {
    console.error("[AskAi] failed to load Q&A library", error);
    return [];
  }
  return ((data ?? []) as RawLibraryRow[]).map(rowToEntry);
}

function findCachedMatch(question: string, cache: QAEntry[]): QAEntry | null {
  const norm = normalize(question);
  if (!norm) return null;
  const exact = cache.find((e) => e.normalized === norm);
  if (exact) return exact;
  const toks = tokenize(question);
  if (toks.length < 2) return null;
  let best: { entry: QAEntry; score: number } | null = null;
  for (const entry of cache) {
    const score = jaccard(toks, entry.tokens);
    if (score >= 0.8 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }
  return best?.entry ?? null;
}

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

function buildCachedReply(entry: QAEntry): string {
  const when = new Date(entry.updatedAt).toLocaleDateString(undefined, {
    day: "numeric", month: "short", year: "numeric",
  });
  return [
    `**This question is already in the shared Ask AnaesthesiaCore library** — here's the answer saved on ${when} for "_${entry.question}_":`,
    "",
    "---",
    "",
    entry.answer,
    "",
    "---",
    "",
    "_If this isn't quite what you meant, rephrase the question to get a fresh answer._",
  ].join("\n");
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
  const [qaCache, setQaCache] = useState<QAEntry[]>([]);
  // Tracks the last question we sent to the server so the post-stream
  // refetch can prioritise picking up its new library row.
  const pendingQuestionRef = useRef<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Persist the current chat transcript locally.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* quota etc. — best effort only */
    }
  }, [messages]);

  // Load the shared Q&A library on mount, and refresh it whenever the
  // database notifies us of inserts/updates so other users' new questions
  // appear in real time.
  useEffect(() => {
    let cancelled = false;
    void fetchLibrary().then((rows) => { if (!cancelled) setQaCache(rows); });
    const channel = supabase
      .channel("ask_qa_library_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ask_qa_library" },
        () => { void fetchLibrary().then((rows) => setQaCache(rows)); },
      )
      .subscribe();
    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, []);

  // After a streamed answer completes, refetch the library so the newly
  // saved row (written by `kb-chat`'s onFinish hook) is visible immediately
  // — realtime should also deliver it, but this is a guaranteed fallback.
  useEffect(() => {
    if (status !== "ready") return;
    if (!pendingQuestionRef.current) return;
    pendingQuestionRef.current = null;
    // Small delay to give the server's upsert time to commit.
    const t = setTimeout(() => { void fetchLibrary().then(setQaCache); }, 600);
    return () => clearTimeout(t);
  }, [status]);

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

    // 1. Check the local Q&A cache first. If we've answered this (or a very
    //    similar) question before, surface the prior answer instead of
    //    spending another model call.
    const cached = findCachedMatch(trimmed, qaCache);
    if (cached) {
      const now = Date.now();
      const userMsg: UIMessage = {
        id: `cached-user-${now}`,
        role: "user",
        parts: [{ type: "text", text: trimmed }],
      };
      const assistantMsg: UIMessage = {
        id: `cached-assistant-${now}`,
        role: "assistant",
        parts: [{ type: "text", text: buildCachedReply(cached) }],
      };
      setMessages([...messages, userMsg, assistantMsg]);
      return;
    }

    pendingQuestionRef.current = trimmed;
    await sendMessage({ text: trimmed });
  };

  const clear = () => {
    setMessages([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    textareaRef.current?.focus();
  };

  // Inject a saved Q&A pair into the live conversation so the user can keep
  // following up. No model call is made.
  const reopen = (entry: QAEntry) => {
    const now = Date.now();
    const userMsg: UIMessage = {
      id: `history-user-${now}`,
      role: "user",
      parts: [{ type: "text", text: entry.question }],
    };
    const assistantMsg: UIMessage = {
      id: `history-assistant-${now}`,
      role: "assistant",
      parts: [{ type: "text", text: entry.answer }],
    };
    setMessages([...messages, userMsg, assistantMsg]);
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
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 sm:px-4 py-2">
          <div className="text-xs text-muted-foreground">
            {qaCache.length > 0
              ? `${qaCache.length} saved Q${qaCache.length === 1 ? "" : "s"} in history`
              : "No saved questions yet"}
          </div>
          <HistoryPanel
            entries={qaCache}
            onReopen={reopen}
            onDelete={deleteEntry}
            onClearAll={clearHistory}
          />
        </div>
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

interface HistoryPanelProps {
  entries: QAEntry[];
  onReopen: (entry: QAEntry) => void;
  onDelete: (normalized: string) => void;
  onClearAll: () => void;
}

const HistoryPanel = ({ entries, onReopen, onDelete, onClearAll }: HistoryPanelProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const sorted = [...entries].sort((a, b) => b.at - a.at);
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (e) =>
        e.question.toLowerCase().includes(q) ||
        e.answer.toLowerCase().includes(q),
    );
  }, [entries, query]);

  const handleReopen = (entry: QAEntry) => {
    onReopen(entry);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className="h-8 gap-1.5">
          <History className="h-3.5 w-3.5" aria-hidden />
          <span className="text-xs">History</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b border-border space-y-1">
          <SheetTitle className="text-base font-serif">Question history</SheetTitle>
          <SheetDescription className="text-xs">
            Search and reopen previously asked questions. Stored only in this browser.
          </SheetDescription>
        </SheetHeader>

        <div className="p-3 border-b border-border space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions and answers…"
              className="pl-8 h-9 text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {entries.length > 0 && (
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>
                {filtered.length} of {entries.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Clear all saved Q&A history? This cannot be undone.")) {
                    onClearAll();
                    setExpanded(null);
                  }
                }}
                className="hover:text-destructive underline-offset-2 hover:underline"
              >
                Clear all history
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {entries.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-3 opacity-40" aria-hidden />
              Your Q&A history will appear here once you ask your first question.
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No matches for "{query}".
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map((entry) => {
                const isOpen = expanded === entry.normalized;
                return (
                  <li key={entry.normalized} className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : entry.normalized)}
                        className="flex-1 text-left text-sm font-medium text-foreground hover:text-primary"
                      >
                        {entry.question}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(entry.normalized)}
                        aria-label="Delete this entry"
                        title="Delete"
                        className="shrink-0 text-muted-foreground hover:text-destructive p-1 -m-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {new Date(entry.at).toLocaleString(undefined, {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </div>
                    {isOpen && (
                      <div className="mt-2 rounded-md border border-border bg-muted/30 p-3 prose prose-sm max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-primary">
                        <ReactMarkdown
                          components={{
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
                          {entry.answer}
                        </ReactMarkdown>
                      </div>
                    )}
                    <div className="mt-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleReopen(entry)}
                        className="h-7 text-xs gap-1.5"
                      >
                        <MessageSquare className="h-3 w-3" aria-hidden />
                        Reopen in chat
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AskAi;
