import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const ContextSensitiveHalfTimeNote = () => (
  <NoteLayout
    slug="context-sensitive-half-time-propofol-vs-remifentanil"
    title="Context-sensitive half-time: propofol vs remifentanil"
    shortTitle="Context-sensitive half-time"
    description="What context-sensitive half-time means, why propofol's rises modestly with infusion duration and remifentanil's stays flat at ~3–4 minutes, and how to use that difference in TIVA planning."
    datePublished="2026-06-13"
    lede="Context-sensitive half-time (CSHT) is the time for plasma drug concentration to fall by 50% once a steady-state infusion is stopped. It depends on how long the infusion has been running because peripheral compartments fill up and then re-release drug back into plasma. CSHT — not elimination half-life — is what predicts emergence."
    faqs={[
      {
        q: "What is context-sensitive half-time?",
        a: "The time taken for the plasma concentration of a drug to halve after stopping a steady-state infusion. The 'context' is the duration of the infusion: as peripheral compartments saturate, drug redistributes back into plasma when the infusion stops, slowing the fall in plasma concentration. CSHT is therefore longer for longer infusions — except for drugs cleared independently of redistribution.",
      },
      {
        q: "Why is remifentanil's context-sensitive half-time flat?",
        a: "Remifentanil is hydrolysed by non-specific plasma and tissue esterases. Clearance is rapid (~3 L/min) and entirely independent of duration, hepatic function or renal function. Even after a 10-hour infusion the CSHT remains ~3–4 minutes, because the drug is metabolised faster than it can redistribute out of tissues.",
      },
      {
        q: "Why does propofol's context-sensitive half-time rise with infusion duration?",
        a: "Propofol is highly lipid-soluble with a large peripheral volume of distribution. Over hours of infusion, fat and muscle accumulate drug. When the infusion stops, this peripheral reservoir flows back into plasma, slowing the fall in concentration. CSHT is ~10 minutes at 1 hour, ~20 minutes at 4 hours and ~30–40 minutes after 8+ hours — still much shorter than its elimination half-life of several hours.",
      },
      {
        q: "How does CSHT change TIVA practice?",
        a: "Pair a long-CSHT hypnotic (propofol) with a flat-CSHT opioid (remifentanil) so analgesia offsets predictably and emergence is hypnotic-limited. For long cases use target-controlled infusion (TCI) modelling so the pump accounts for peripheral compartment dynamics, and load alternative analgesia (long-acting opioid, regional, paracetamol/NSAID) before the remifentanil is stopped to avoid acute hyperalgesia.",
      },
    ]}
    related={[
      { label: "Pharmacokinetics — full topic", to: "/pharmacology/pharmacokinetics" },
      { label: "Intravenous induction agents", to: "/pharmacology/iv-anaesthetics" },
      { label: "Opioids", to: "/pharmacology/opioids" },
      { label: "TIVA — total intravenous anaesthesia", to: "/clinical/tiva" },
    ]}
  >
    <h2>Why elimination half-life is the wrong number</h2>
    <p>
      Elimination half-life (t½β) assumes a single, well-mixed compartment.
      Anaesthetic drugs do not behave that way: lipid-soluble agents move
      rapidly between plasma and a large peripheral tissue reservoir — the multi-compartment kinetics covered in the <Link to="/pharmacology/pharmacokinetics">pharmacokinetics topic</Link>. After a
      single bolus, plasma concentration falls fast as drug distributes out;
      after a long infusion, that same reservoir refills plasma when the
      infusion stops, slowing the fall to a crawl. <strong>Context-sensitive
      half-time</strong> captures this duration-dependence directly.
    </p>

    <h2>Propofol — modest, rising CSHT</h2>
    <p>
      Propofol is a high-clearance, highly lipid-soluble drug with a large
      peripheral volume of distribution (~4 L/kg at steady state). Typical
      CSHTs:
    </p>
    <ul>
      <li>1 hour infusion → ~10 minutes</li>
      <li>3 hours → ~15–18 minutes</li>
      <li>8 hours → ~30–40 minutes</li>
    </ul>
    <p>
      The plateau is sub-linear because metabolic clearance (hepatic and
      extra-hepatic) is also high, so each cycle of redistribution donates drug
      back into a plasma compartment that is itself being cleared. In practice,
      a propofol-only TIVA wakes up in 10–20 minutes for cases up to a few
      hours, and 30–40 minutes for an all-day case.
    </p>

    <h2>Remifentanil — flat CSHT of ~3–4 minutes</h2>
    <p>
      Remifentanil is a piperidine opioid esterified at the propionic acid
      side-chain. Non-specific plasma and tissue esterases hydrolyse it to an
      inactive carboxylic acid metabolite. Clearance (~3 L/min) is faster than
      the rate at which drug can redistribute back from peripheral compartments,
      so the plasma concentration falls predictably regardless of how long the
      infusion has been running. CSHT stays at ~3–4 minutes even after a
      10-hour infusion — a unique feature exploited in long neurosurgical or
      cardiac TIVA cases.
    </p>

    <h2>Clinical pairing</h2>
    <p>
      Pairing propofol with remifentanil gives a predictable, hypnotic-limited
      emergence. Two practical consequences follow:
    </p>
    <ul>
      <li>
        <strong>Load long-acting analgesia before stopping remifentanil.</strong>{" "}
        Remifentanil's CSHT is so short that analgesia disappears within
        minutes. Without longer-acting cover, patients wake into severe pain
        and possible opioid-induced hyperalgesia.
      </li>
      <li>
        <strong>Use target-controlled infusion (TCI) for long cases.</strong>{" "}
        TCI pumps run the Schnider or Marsh propofol model and the Minto
        remifentanil model continuously, accounting for peripheral compartment
        dynamics rather than guessing at a fixed mL/kg/h rate.
      </li>
    </ul>
  </NoteLayout>
);

export default ContextSensitiveHalfTimeNote;
