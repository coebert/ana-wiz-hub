import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, AlertTriangle, Stethoscope, X } from "lucide-react";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { ExamSection } from "@/components/exam/ExamSection";
import { LessonSources } from "@/components/topic/LessonSources";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Exam } from "@/data/curriculum";
import { operations, specialties, searchOperations, type Operation, type Specialty } from "@/data/operativeSteps";
import { OperativeDiagram } from "@/components/diagrams/operative/OperativeDiagrams";

const T = "operative-steps";
const exams = [Exam.FINAL];

type Filter = Specialty | "All";

const quiz = [
  { question: "During carotid endarterectomy under local anaesthesia, a new contralateral hand weakness appears after cross-clamping. The usual response is:", options: ["Deepen sedation", "Tell the surgeon — a shunt is usually inserted, and blood pressure supported", "Give protamine", "Convert to EVAR"], correctIndex: 1, explanation: "New deficit on clamping signals cerebral ischaemia; shunting and raising blood pressure restore flow." },
  { question: "GALA compared general with local anaesthesia for carotid endarterectomy and found:", options: ["Fewer strokes with local", "Fewer strokes with general", "No significant difference in stroke, MI or death at 30 days", "Lower mortality with general"], correctIndex: 2, explanation: "No significant difference in the composite primary outcome." },
  { question: "Releasing an infrarenal aortic cross-clamp typically causes:", options: ["Hypertension", "Hypotension from reduced afterload and washout of ischaemic metabolites", "Bradycardia only", "No change"], correctIndex: 1, explanation: "Staged release, volume loading and vasopressors limit declamping hypotension." },
  { question: "In EVAR-1, 30-day mortality with EVAR versus open repair was:", options: ["1.7% vs 4.7%", "4.7% vs 1.7%", "Equal", "10% vs 15%"], correctIndex: 0, explanation: "EVAR had lower early mortality; long-term survival benefit was not sustained." },
  { question: "In a ruptured AAA, the safest time to induce general anaesthesia is:", options: ["Before transfer to theatre", "After the patient is prepped and draped with the surgeon ready", "After CT", "Only after aortic clamping"], correctIndex: 1, explanation: "Induction can cause collapse; the surgeon must be ready to gain control immediately." },
  { question: "Bone cement implantation syndrome during hemiarthroplasty is most likely:", options: ["At skin incision", "Around cement and stem insertion", "At closure", "In recovery only"], correctIndex: 1, explanation: "The surgeon should announce cementing so the anaesthetist can watch for hypoxia and hypotension." },
  { question: "During monopolar TURP with glycine irrigation, a confused, bradycardic patient most likely has:", options: ["Local anaesthetic toxicity", "TURP syndrome — fluid absorption and hyponatraemia", "Hypoglycaemia", "Spinal too high"], correctIndex: 1, explanation: "Check sodium, stop irrigation and finish surgery quickly." },
  { question: "During Ivor Lewis oesophagectomy, the gastric conduit's perfusion depends most on:", options: ["Inspired oxygen", "Systemic blood pressure and cardiac output", "Epidural level", "Tidal volume"], correctIndex: 1, explanation: "The conduit relies on one gastroepiploic artery; avoid prolonged hypotension." },
];

function OperationCard({ op, open }: { op: Operation; open: boolean }) {
  return (
    <details id={op.id} open={open} className="group rounded-xl border border-border bg-card scroll-mt-[21rem]">
      <summary className="cursor-pointer list-none p-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="text-lg font-serif font-bold text-foreground">{op.name}</h3>
          {op.aka?.length ? <p className="text-xs text-muted-foreground">Also: {op.aka.join(", ")}</p> : null}
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{op.specialty}</Badge>
          <Badge variant="outline">Blood loss risk: {op.bloodLossRisk}</Badge>
        </div>
      </summary>
      <div className="px-4 pb-5 space-y-5">
        <p className="text-sm text-muted-foreground leading-relaxed">{op.summary}</p>
        <p className="text-sm"><span className="font-semibold text-foreground">Position: </span><span className="text-muted-foreground">{op.position}</span></p>
        {op.diagram && <OperativeDiagram kind={op.diagram} />}
        <div>
          <h4 className="font-semibold text-foreground mb-2">Surgical steps and what they mean for you</h4>
          <ol className="space-y-3">
            {op.steps.map((s, i) => (
              <li key={i} className="grid gap-2 md:grid-cols-2 rounded-lg border border-border p-3">
                <p className="text-sm text-foreground"><span className="font-semibold mr-1">{i + 1}.</span>{s.step}</p>
                {s.anaesthetic && (
                  <p className="text-sm text-muted-foreground flex gap-2"><Stethoscope className="h-4 w-4 mt-0.5 shrink-0 text-primary" aria-hidden /><span><span className="sr-only">Anaesthetic note: </span>{s.anaesthetic}</span></p>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3">
          <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive" aria-hidden />Critical moments</h4>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">{op.criticalMoments.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">Anaesthetic considerations</h4>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">{op.anaestheticNotes.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
        {op.related && <p className="text-sm"><Link to={op.related.path} className="text-primary underline">Read more: {op.related.label} →</Link></p>}
        {op.sources?.length ? <LessonSources topicId={T} labels={op.sources} /> : null}
      </div>
    </details>
  );
}

/**
 * Search + specialty filter for the operations library. Rendered at the top of
 * the page so learners can look up a specific operation as soon as they arrive,
 * and pinned just under the header while the list itself is on screen.
 */
export function OperationsSearchBar({
  query,
  specialty,
  resultCount,
  sticky,
  onQuery,
  onSpecialty,
  onEnter,
  inputRef,
}: {
  query: string;
  specialty: Filter;
  resultCount: number;
  sticky: boolean;
  onQuery: (value: string) => void;
  onSpecialty: (value: Filter) => void;
  onEnter: () => void;
  inputRef: RefObject<HTMLInputElement>;
}) {
  const trimmed = query.trim();
  const summary = trimmed
    ? `${resultCount} of ${operations.length} operations shown for "${trimmed}" — press Enter to open the first one`
    : `${resultCount} of ${operations.length} operations shown`;
  return (
    <div
      className={`rounded-xl border px-3 py-3 sm:px-4 ${
        sticky
          ? "sticky top-[7rem] z-30 border-border bg-background shadow-sm 2xl:top-[5.5rem]"
          : "border-border bg-muted/30"
      }`}
    >
      <label htmlFor="operations-search" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Search the operations library
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          id="operations-search"
          ref={inputRef}
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter();
            }
          }}
          placeholder="Look up an operation — e.g. carotid endarterectomy — or a hazard: cross-clamp"
          className="pl-9 pr-10"
          aria-label="Search operations"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              onQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </div>
      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by specialty">
        {(["All", ...specialties] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSpecialty(s)}
            aria-pressed={specialty === s}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${specialty === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            {s}
            {s !== "All" && ` (${operations.filter((o) => o.specialty === s).length})`}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
        {summary}
      </p>
    </div>
  );
}

function OperationsLibrary({ results, target, query }: { results: Operation[]; target: string; query: string }) {
  return (
    <div className="space-y-6">
      {specialties.map((sp) => {
        const group = results.filter((o) => o.specialty === sp);
        if (!group.length) return null;
        return (
          <section key={sp} aria-labelledby={`sp-${sp}`} className="space-y-3">
            <h3 id={`sp-${sp}`} className="text-base font-serif font-bold text-foreground border-b border-border pb-1">
              {sp} <span className="text-xs font-sans font-normal text-muted-foreground">({group.length})</span>
            </h3>
            {group.map((op) => (
              <OperationCard key={op.id} op={op} open={op.id === target || (query.trim() !== "" && results.length <= 3)} />
            ))}
          </section>
        );
      })}
      {!results.length && <p className="text-sm text-muted-foreground">No operations match. Try a broader word, or clear the search.</p>}
    </div>
  );
}

export default function OperativeStepsTopic() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState<Filter>("All");
  const { hash } = useLocation();
  const target = hash.replace("#", "");
  const results = useMemo(() => searchOperations(query, specialty), [query, specialty]);
  const libraryRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    if (target) document.getElementById(target)?.scrollIntoView({ block: "start" });
  }, [target]);

  // Pin the search bar only while the list is on screen, so it never floats
  // over the objectives, quiz or references further down the page.
  useEffect(() => {
    const el = libraryRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setSticky(entry.isIntersecting), {
      rootMargin: "-80px 0px 0px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openFirstResult = () => {
    const first = results[0];
    if (first) document.getElementById(first.id)?.scrollIntoView({ block: "start" });
  };

  return (
    <TopicTemplate
      title="Operations Library: Surgical Steps for Anaesthetists"
      subtitle="FRCA Final — Perioperative"
      backPath="/perioperative"
      backLabel="Perioperative"
      accentColor="text-perioperative"
      topicId={T}
      topicTitle="Operations Library: Surgical Steps for Anaesthetists"
      preContent={
        <OperationsSearchBar
          query={query}
          specialty={specialty}
          resultCount={results.length}
          sticky={sticky}
          onQuery={setQuery}
          onSpecialty={setSpecialty}
          onEnter={openFirstResult}
          inputRef={inputRef}
        />
      }
      objectives={[
        "Describe the main stages of common operations, especially vascular procedures",
        "Anticipate the surgical moments that change anaesthetic management (cross-clamp, cementing, insufflation, one-lung ventilation)",
        "Plan positioning, monitoring and analgesia around the operation's sequence",
      ]}
      keyPoints={[
        { text: "Carotid cross-clamping is the critical cerebral moment: keep blood pressure up and assess neurology; GALA found no outcome difference between general and local anaesthesia", cites: ["GALA 2008"] },
        { text: "Aortic clamping raises afterload; declamping causes hypotension — prepare before each step", cites: ["ESVS 2024 AAA"] },
        { text: "EVAR lowers early mortality compared with open repair but needs lifelong surveillance", cites: ["EVAR-1 2004", "NICE NG156"] },
        { text: "Cemented hip surgery needs an announced cementing step and a team watch for bone cement implantation syndrome", cites: ["AAGBI BCIS 2015"] },
      ]}
      sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
      quizQuestions={quiz}
      coreConcepts={
        <div className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            A searchable summary of what the surgeon is doing at each stage of common operations, with what each step means for anaesthesia.
            Steps describe a typical sequence — techniques vary by surgeon and unit, so confirm the plan at the team brief. Diagrams are schematic, not to scale.
            For specialty-level plans see <Link to="/clinical/surgical-protocols" className="text-primary underline">Perioperative Protocols by Surgery Type</Link>.
          </p>
          <ExamSection id="operations-library" exams={exams}>
            <div ref={libraryRef}>
              <OperationsLibrary results={results} target={target} query={query} />
            </div>
          </ExamSection>
        </div>
      }
    />
  );
}
