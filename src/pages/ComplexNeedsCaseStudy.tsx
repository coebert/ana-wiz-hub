import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  CalendarClock,
  ClipboardList,
  HeartPulse,
  Lightbulb,
  ShieldAlert,
  Users,
} from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { PageJsonLd } from "@/components/layout/PageJsonLd";

/**
 * Narrative case study built on the sections of the complex-needs anaesthesia
 * topic. The patient is a composite, not a real individual: every detail is
 * typical of published autism and needle-phobia pathways rather than taken
 * from one person's record.
 */

const TOPIC = "/perioperative/complex-needs-anaesthesia";

interface Stage {
  id: string;
  when: string;
  title: string;
  narrative: string[];
  decisions?: { question: string; answer: string }[];
  link?: { label: string; to: string };
}

const STAGES: Stage[] = [
  {
    id: "referral",
    when: "Week 0 — referral",
    title: "The referral that would previously have been cancelled",
    narrative: [
      "Daniel is 27. He is autistic, has a mild learning disability, lives with his mother and works part-time in a warehouse. He has severe needle phobia: two previous attempts at blood tests ended with him leaving the department distressed, and a dental extraction two years ago was abandoned in the anaesthetic room.",
      "He is referred for surgical removal of two impacted lower wisdom teeth after three episodes of pericoronitis and a course of antibiotics. He is in pain, is eating a soft diet only, and has lost 4 kg. Doing nothing is not a neutral option — this is exactly the pattern of untreated physical illness that the LeDeR reviews describe.",
      "The referral is flagged at booking as needing reasonable adjustments. Instead of a standard pre-assessment slot, he is given a double appointment at the end of the day, and the learning disability liaison nurse is copied in.",
    ],
    decisions: [
      {
        question: "Why not simply list him and see how it goes?",
        answer:
          "An improvised struggle in the anaesthetic room is the predictable failure mode. It is unsafe, it is not consented, and it makes every future encounter harder — Daniel already carries one abandoned anaesthetic. Planning is the intervention.",
      },
    ],
    link: { label: "General principles & reasonable adjustments", to: `${TOPIC}#section-principles` },
  },
  {
    id: "assessment",
    when: "Week 2 — pre-assessment",
    title: "Pre-assessment on his terms",
    narrative: [
      "Daniel attends with his mother and brings a completed hospital passport: he dislikes fluorescent light and sudden noise, he does not like being touched on the arms without warning, he communicates well verbally but needs processing time and dislikes being asked several questions at once, and he becomes distressed if he is kept waiting without being told why.",
      "Observations are taken in a side room with the door closed and the overhead light off. Blood pressure is measured on the calf because he will not tolerate an arm cuff on first meeting. No bloods are taken at this visit — his history and examination do not require them, and forcing a venepuncture to complete a proforma would sabotage the pathway.",
      "The anaesthetist assesses capacity for this decision. Daniel understands he has an infected tooth, that it needs removing, that he will be asleep and that there are risks including sore throat, nausea and a small risk of serious harm. He can retain and weigh that information and communicate a clear decision. He has capacity: this is his consent to give, not a best-interests decision.",
    ],
    decisions: [
      {
        question: "Learning disability plus autism — does he lack capacity?",
        answer:
          "No. Capacity is decision-specific and is presumed until the opposite is demonstrated. Diagnosis is never the test. What Daniel needs is information in a format he can use and time to process it — that is an adjustment, not a finding of incapacity.",
      },
      {
        question: "What about the needle phobia?",
        answer:
          "Phobia does not remove capacity either, but an overwhelming phobic response can prevent a person acting on their own decision. That is why the plan is built to avoid an awake cannulation rather than to talk him into one.",
      },
    ],
    link: { label: "Capacity, consent & restraint", to: `${TOPIC}#section-capacity` },
  },
  {
    id: "communication",
    when: "Week 2 — same visit",
    title: "Preparing him rather than persuading him",
    narrative: [
      "He is given easy-read information with photographs of the actual anaesthetic room, the trolley and the mask, and a short social story that sets out the day in order: arrive, wait in the side room, walk to theatre, breathe the sweet-smelling gas, wake up in recovery with his mother there.",
      "He agrees to a familiarisation visit the following week, walks into the anaesthetic room, sits on the trolley and holds a face mask to his own face. He takes a mask home to practise with.",
      "Together they agree the words to be used on the day and a stop signal — a raised flat hand means pause and explain, and staff must actually stop when he uses it. That agreement is what makes cooperation possible.",
    ],
    link: { label: "Communication strategies", to: `${TOPIC}#section-communication` },
  },
  {
    id: "plan",
    when: "Week 3 — planning meeting",
    title: "The written plan everybody works to",
    narrative: [
      "A short multidisciplinary meeting — anaesthetist, oral surgeon, theatre coordinator, recovery nurse, liaison nurse, Daniel and his mother — produces one page in the notes and in the hospital passport.",
      "First on the morning list, so fasting is short and waiting is minimal. Admitted straight to a quiet side room, gowned in his own clothes until theatre, mother present until he is asleep and again as he wakes. Named nurse for the whole episode, no rotation of staff, and no student observers. Topical local anaesthetic cream applied at home two hours before arrival for any post-induction cannula, and everything to be documented as an adjustment plan rather than a special favour.",
      "Anaesthetic plan: oral premedication with a benzodiazepine if he wants it, inhalational induction with sevoflurane in nitrous oxide and oxygen sitting up on the trolley, cannula sited only after he is asleep, nasal intubation for surgical access, dexamethasone and ondansetron, paracetamol and ibuprofen with a small dose of fentanyl, local infiltration by the surgeon, and no attempt at an awake block or awake cannula under any circumstances.",
    ],
    decisions: [
      {
        question: "Premedication or straight to inhalational induction?",
        answer:
          "Offer the choice and let him decide. He accepts oral midazolam. Doses for oral and buccal midazolam, oral clonidine, buccal or intranasal dexmedetomidine and oral ketamine are set out in the premedication section of the preoperative assessment topic — a planned premedication is far safer than an unplanned restraint.",
      },
      {
        question: "What if he refuses on the day?",
        answer:
          "The plan states explicitly that a capacitous refusal is final, the list moves on, and he is offered a further attempt with more preparation. It also names the one exception: nothing here justifies restraint, because he has capacity and there is no emergency.",
      },
    ],
    link: { label: "Sedation alternatives", to: `${TOPIC}#section-sedation-alternatives` },
  },
  {
    id: "day",
    when: "Day of surgery — 07:30",
    title: "Admission and premedication",
    narrative: [
      "He arrives at 07:30 having fasted from a light breakfast at 02:00 and clear fluids until 06:30. He is taken directly to the side room; the ward avoids the group waiting area entirely.",
      "Oral midazolam is given at 07:50 with a small volume of apple juice. By 08:15 he is calm, chatty and slightly unsteady, and he is kept on a trolley with a nurse present from that point on.",
      "The team confirms his consent again in his own words before he is premedicated, not after — sedation changes the picture, and the consent that matters was taken while he was clear-headed.",
    ],
    link: { label: "Consent in practice", to: `${TOPIC}#section-consent-practice` },
  },
  {
    id: "induction",
    when: "08:30 — anaesthetic room",
    title: "Induction without a needle",
    narrative: [
      "Lights are dimmed, the room is quiet, monitors are silenced and only three people are present. He walks in with his mother, sits on the trolley and holds the mask himself while breathing 8% sevoflurane in 60% nitrous oxide and oxygen, with the anaesthetist's hand resting lightly over his to steady it.",
      "A pulse oximeter probe goes on a toe first because he tolerates that; ECG and blood pressure follow as consciousness is lost. Losing full monitoring for the first minute of a gas induction is a considered trade-off, made with an assistant, suction, airway equipment and drugs already checked and to hand.",
      "He becomes apnoeic briefly during the excitement phase, is supported with gentle CPAP, and a 20 G cannula is sited in the anaesthetised hand at the second stage. Rocuronium and a nasal tube follow. His mother leaves once he is asleep, having been warned in advance that gas induction looks dramatic.",
    ],
    decisions: [
      {
        question: "Was restraint used?",
        answer:
          "No. He held the mask himself. Had he pulled away, the plan was to stop — clinical holding in a capacitous adult who withdraws consent is assault, however well-intentioned.",
      },
    ],
    link: { label: "Severe needle & anaesthetic phobia", to: `${TOPIC}#section-phobia` },
  },
  {
    id: "intraop",
    when: "08:45–09:30 — theatre",
    title: "Intraoperative course",
    narrative: [
      "Maintenance with sevoflurane in air and oxygen, controlled ventilation, throat pack documented on the whiteboard and in the count, and a warming blanket because he is thin and the case is a shared airway with a wet field.",
      "Analgesia is layered so that he wakes comfortable: local infiltration by the surgeon before incision, intravenous paracetamol and ibuprofen, dexamethasone 6.6 mg and ondansetron 4 mg, and fentanyl 100 microgram in total. Long-acting opioids are deliberately avoided — nausea and drowsiness on the ward would be far more distressing to him than mild pain.",
      "Neuromuscular blockade is fully reversed and confirmed with a train-of-four ratio above 0.9, the pack is removed and the count confirmed, and the plan for a calm emergence is briefed to recovery before he leaves theatre.",
    ],
  },
  {
    id: "recovery",
    when: "09:40 — recovery",
    title: "Recovery: where good plans are usually lost",
    narrative: [
      "He is extubated deep-to-awake in the left lateral position, moved to a quiet bay with the lights low, and his mother is brought in before he opens his eyes. The named nurse is the same person who admitted him.",
      "He wakes disorientated and pulls at the cannula. Because this was anticipated, the cannula is dressed with an opaque bandage, he is reoriented in short single sentences, and no restraint is needed. Pain is scored with his mother's help using his usual signs — rocking and rubbing his jaw — rather than a numerical scale he cannot use at this point.",
      "He drinks within 40 minutes, eats ice cream, and the cannula is removed before he is transferred back to the side room. He goes home the same afternoon.",
    ],
    link: { label: "Postoperative care & recovery", to: `${TOPIC}#section-postop` },
  },
  {
    id: "discharge",
    when: "Discharge and follow-up",
    title: "Closing the loop",
    narrative: [
      "Discharge analgesia is regular paracetamol and ibuprofen with clear written and pictorial instructions, timings rather than 'as required', and no opioid.",
      "The hospital passport is updated with what actually worked: gas induction sitting up holding his own mask, calf blood pressure at first contact, no arm cuff before induction, opaque cannula dressing, mother present at induction and emergence, first on the list. This is now the starting point for every future admission rather than something that has to be rediscovered.",
      "The GP and the learning disability team receive the same summary, and an annual health check is arranged — his weight loss and dental disease were both avoidable, and the pathway is only complete if the next problem is picked up earlier.",
    ],
    link: { label: "Learning disability", to: `${TOPIC}#section-learning-disability` },
  },
];

const PITFALLS = [
  "Assuming a learning disability or autism diagnosis means the patient lacks capacity — capacity is decision-specific and is presumed.",
  "Attempting an awake cannula 'just once' in a patient with severe needle phobia: it fails, it traumatises, and it removes the option of a planned inhalational induction.",
  "Taking bloods or observations that will not change management because a proforma has empty boxes.",
  "Sedating first and consenting afterwards.",
  "Planning a perfect anaesthetic and leaving recovery, the ward and discharge to improvise — most reported distress happens after the anaesthetic.",
  "Calling restraint 'clinical holding' to make it feel lawful. In a patient with capacity who withdraws consent, it is neither.",
  "Not writing down what worked, so the next admission starts from zero.",
];

const LEARNING = [
  "Reasonable adjustments are a legal duty and a clinical intervention: appointment length, environment, list order, staff continuity and information format change outcomes more than drug choice does.",
  "Preparation and familiarisation convert an impossible patient into a cooperative one — a rehearsed pathway beats a stronger premedication.",
  "Offer a menu of premedication and induction routes and let the patient choose; document the choice and the fallback.",
  "Inhalational induction with the patient holding their own mask is the workhorse technique for severe needle phobia in adults, with cannulation after loss of consciousness.",
  "Analgesia should be multimodal and opioid-light so that emergence is calm and nausea unlikely.",
  "Recovery planning is part of the anaesthetic plan: same staff, quiet bay, supporter present, observational pain assessment.",
  "Update the hospital passport before the patient goes home; it is the only part of this episode that improves the next one.",
];

const ComplexNeedsCaseStudy = () => {
  const title = "Case Study: Anaesthesia for a Patient with Autism & Severe Phobia";
  const description =
    "Step-by-step case study of an autistic adult with severe needle phobia undergoing dental surgery: reasonable adjustments, capacity, premedication, inhalational induction, recovery and discharge.";

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{title} — AnaesthesiaCore</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://anaesthesiacore.app/perioperative/complex-needs-case-study" />
        <meta property="og:url" content="https://anaesthesiacore.app/perioperative/complex-needs-case-study" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
      <PageJsonLd name={title} description={description} />

      <PageSection className="pt-8 pb-16">
        <Link
          to={TOPIC}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Anaesthesia for Patients with Complex Needs
        </Link>

        <header className="mt-4 flex items-start gap-3">
          <div className="rounded-lg bg-perioperative/10 p-2.5 text-perioperative">
            <Users className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Case Study: Autism, Learning Disability &amp; Severe Needle Phobia
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
              A single patient followed from referral to follow-up, showing how the reasonable adjustments,
              communication, sedation, consent and recovery sections of the complex needs topic fit together in
              practice.
            </p>
          </div>
        </header>

        <p className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Composite case.</strong> &ldquo;Daniel&rdquo; is not a real patient. The
          history, obstacles and solutions are typical of published autism and needle-phobia pathways and of reported
          incidents, combined into one narrative for teaching. Doses and drugs are illustrative — check the BNF and
          local guidelines.
        </p>

        <section className="mt-8" aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <ClipboardList className="h-5 w-5 text-perioperative" aria-hidden="true" /> Case in one paragraph
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-foreground/85">
            A 27-year-old autistic man with a mild learning disability and severe needle phobia, whose dental extraction
            was abandoned two years earlier, needs surgical removal of two infected wisdom teeth. Over four weeks he is
            prepared with a hospital passport, easy-read information, a familiarisation visit and an agreed stop signal.
            He is listed first, premedicated with oral midazolam, and anaesthetised by inhalational induction holding his
            own mask, with the cannula sited after he is asleep. Multimodal opioid-light analgesia and a planned quiet
            recovery with his mother present get him home the same day, and the passport is updated with what worked.
          </p>
        </section>

        <section className="mt-10" aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <CalendarClock className="h-5 w-5 text-perioperative" aria-hidden="true" /> The pathway, step by step
          </h2>
          <ol className="mt-4 space-y-4">
            {STAGES.map((stage) => (
              <li key={stage.id} id={stage.id} className="scroll-mt-24 rounded-xl border border-border bg-card p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-perioperative">{stage.when}</p>
                <h3 className="mt-1 text-base font-semibold text-foreground">{stage.title}</h3>
                <div className="mt-2 space-y-2 text-sm text-foreground/85">
                  {stage.narrative.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
                {stage.decisions && (
                  <dl className="mt-3 space-y-2 rounded-lg bg-muted/50 p-3">
                    {stage.decisions.map((d) => (
                      <div key={d.question}>
                        <dt className="text-sm font-medium text-foreground">{d.question}</dt>
                        <dd className="mt-0.5 text-sm text-muted-foreground">{d.answer}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {stage.link && (
                  <Link
                    to={stage.link.to}
                    className="mt-3 inline-block text-xs text-perioperative underline-offset-4 hover:underline"
                  >
                    Read the full guidance: {stage.link.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <section aria-labelledby="pitfalls-heading" className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h2 id="pitfalls-heading" className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <ShieldAlert className="h-5 w-5 text-destructive" aria-hidden="true" /> Where this case goes wrong
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              {PITFALLS.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="learning-heading" className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h2 id="learning-heading" className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Lightbulb className="h-5 w-5 text-perioperative" aria-hidden="true" /> Learning points
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              {LEARNING.map((l) => (
                <li key={l} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-perioperative" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-10" aria-labelledby="next-heading">
          <h2 id="next-heading" className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <HeartPulse className="h-5 w-5 text-perioperative" aria-hidden="true" /> Where to read more
          </h2>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <li>
              <Link to={TOPIC} className="text-perioperative underline-offset-4 hover:underline">
                Anaesthesia for patients with complex needs (full topic)
              </Link>
            </li>
            <li>
              <Link
                to="/perioperative/preoperative-assessment#section-premedication"
                className="text-perioperative underline-offset-4 hover:underline"
              >
                Premedication doses: midazolam, clonidine, dexmedetomidine, ketamine
              </Link>
            </li>
            <li>
              <Link to={`${TOPIC}#section-behaviour`} className="text-perioperative underline-offset-4 hover:underline">
                Behaviour that challenges &amp; sedation strategies
              </Link>
            </li>
            <li>
              <Link to="/perioperative/day-surgery" className="text-perioperative underline-offset-4 hover:underline">
                Day surgery pathways and discharge criteria
              </Link>
            </li>
          </ul>
        </section>
      </PageSection>
    </main>
  );
};

export default ComplexNeedsCaseStudy;
