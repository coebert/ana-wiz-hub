import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const PaediatricMaintenanceFluidsNote = () => (
  <NoteLayout
    slug="paediatric-maintenance-fluids-4-2-1-rule"
    title="Paediatric maintenance fluids: the 4-2-1 rule and isotonic shift"
    shortTitle="Paediatric 4-2-1 fluid rule"
    description="How the 4-2-1 rule derives paediatric maintenance fluid rates, why hypotonic fluids caused fatal hyponatraemia, and what isotonic prescribing looks like now."
    datePublished="2026-07-30"
    examTags={["primary", "final"]}
    curriculumCodes={["PA_BK_20", "PR_BK_31"]}
    lede="The 4-2-1 rule turns weight into an hourly maintenance rate: 4 mL/kg/h for the first 10 kg, 2 mL/kg/h for the next 10 kg, and 1 mL/kg/h for every kilogram thereafter. The rate has survived unchanged since Holliday and Segar in 1957 — but the fluid you hang has not. Hypotonic maintenance solutions are now contraindicated for routine perioperative use because they cause hospital-acquired hyponatraemia."
    faqs={[
      {
        q: "What is the 4-2-1 rule for paediatric fluids?",
        a: "4 mL/kg/h for the first 10 kg of body weight, plus 2 mL/kg/h for the second 10 kg, plus 1 mL/kg/h for each kilogram above 20 kg. A 26 kg child therefore needs (10 × 4) + (10 × 2) + (6 × 1) = 66 mL/h.",
      },
      {
        q: "Where does the 4-2-1 rule come from?",
        a: "It is the hourly form of Holliday and Segar's 1957 daily rule (100/50/20 mL/kg/day), which was derived from estimated energy expenditure — roughly 1 mL of water per kcal metabolised. Dividing 100, 50 and 20 mL/kg/day by 24 gives approximately 4, 2 and 1 mL/kg/h.",
      },
      {
        q: "Why are hypotonic maintenance fluids no longer used?",
        a: "Surgery, pain, nausea, opioids and positive-pressure ventilation all drive non-osmotic ADH release, so free water is retained. Giving 0.18% saline/4% glucose in that setting produces acute hyponatraemia, cerebral oedema and, in reported cases, death. NICE CG174/NG29 and the APA recommend isotonic solutions instead.",
      },
      {
        q: "Which fluid should be used for paediatric maintenance?",
        a: "An isotonic balanced crystalloid (Plasma-Lyte 148 or Hartmann's) or 0.9% saline, with 1–2% glucose added for neonates, infants and any child at risk of hypoglycaemia. Sodium concentration should be 131–154 mmol/L, and plasma sodium and glucose should be measured if fluids continue beyond a few hours.",
      },
      {
        q: "Does the 4-2-1 rule cover fasting and third-space losses?",
        a: "No. It is maintenance only. Deficit (fasting hours × maintenance rate), ongoing losses and blood loss are prescribed separately, though modern short fasting times and clear-fluid-until-1-hour regimens have made large calculated deficits largely obsolete.",
      },
    ]}
    related={[
      { label: "Maintenance fluid calculator", to: "/tools/maintenance-fluid" },
      { label: "Renal physiology — full topic", to: "/physiology/renal-physiology" },
      { label: "Perioperative fluid therapy", to: "/perioperative/perioperative-fluids" },
      { label: "Paediatric emergency drug doses", to: "/tools/paediatric-emergency-doses" },
    ]}
  >
    <h2>The rule itself</h2>
    <p>
      Maintenance water replaces obligatory losses: urine, stool and insensible
      loss from skin and respiratory tract. Holliday and Segar tied those losses
      to metabolic rate, giving 100 mL/kg/day for the first 10 kg, 50 mL/kg/day
      for the next 10 kg and 20 mL/kg/day thereafter. Expressed hourly this
      becomes the familiar <strong>4-2-1 rule</strong>:
    </p>
    <ul>
      <li>First 10 kg — 4 mL/kg/h</li>
      <li>Second 10 kg — 2 mL/kg/h</li>
      <li>Each kg above 20 kg — 1 mL/kg/h</li>
    </ul>
    <p>
      Worked examples: an 8 kg infant needs 32 mL/h; a 15 kg toddler needs
      40 + 10 = 50 mL/h; a 35 kg child needs 40 + 20 + 15 = 75 mL/h. A useful
      shortcut for children over 20 kg is <em>weight + 40</em> mL/h. Run the
      numbers for any weight with the{" "}
      <Link to="/tools/maintenance-fluid">maintenance fluid calculator</Link>.
    </p>

    <h2>Why the rate is still right but the fluid was wrong</h2>
    <p>
      Holliday and Segar's estimate of <em>volume</em> holds up reasonably well
      in healthy children. Their accompanying suggestion of a hypotonic
      electrolyte content does not. Hospitalised and perioperative children have
      a powerful non-osmotic stimulus to antidiuretic hormone release — pain,
      nausea, vomiting, opioids, hypovolaemia and positive-pressure ventilation.
      ADH-driven free water retention with a hypotonic infusion lowers plasma
      sodium; because the paediatric brain has less room to accommodate
      swelling inside the skull, even a fall to 125–130 mmol/L can produce
      seizures, herniation and death. See{" "}
      <Link to="/physiology/renal-physiology">renal physiology</Link> for the
      ADH and free-water clearance mechanisms behind this.
    </p>

    <h2>The isotonic shift</h2>
    <p>
      Following the 2007 NPSA alert and NICE guidance (CG174, NG29), UK practice
      is to prescribe an <strong>isotonic</strong> maintenance fluid with a
      sodium concentration of 131–154 mmol/L:
    </p>
    <ul>
      <li>
        <strong>Balanced crystalloid</strong> — Plasma-Lyte 148 or Hartmann's:
        physiological chloride, bicarbonate precursor (acetate/lactate), avoids
        hyperchloraemic acidosis.
      </li>
      <li>
        <strong>0.9% sodium chloride</strong> — acceptable, but large volumes
        risk hyperchloraemic metabolic acidosis.
      </li>
      <li>
        <strong>Add 1–2% glucose</strong> for neonates, infants under ~6 months,
        prolonged fasting, malnourished children and those on parenteral
        nutrition — hepatic glycogen stores are small and hypoglycaemia is easy
        to miss under anaesthesia.
      </li>
      <li>
        <strong>Neonates</strong> are the exception to the standard rule: day-1
        requirements are far lower (~60 mL/kg/day) and rise over the first week,
        with electrolytes prescribed to measured values.
      </li>
    </ul>

    <h2>Monitoring and pitfalls</h2>
    <ul>
      <li>
        Measure plasma sodium and glucose before starting, and at least daily
        (more often if unwell) once maintenance fluid continues.
      </li>
      <li>
        Do not give maintenance fluid to a hypovolaemic child — resuscitate with
        10 mL/kg boluses of balanced crystalloid first, then reassess.
      </li>
      <li>
        Reduce or stop maintenance fluid as enteral intake resumes; the commonest
        modern error is over-prescription, not under-prescription.
      </li>
      <li>
        Use the 4-2-1 rate as an upper starting point in children with cardiac
        or renal disease, raised ICP, or SIADH, where restriction is appropriate.
      </li>
    </ul>

    <h2>Exam summary</h2>
    <ul>
      <li>4-2-1 mL/kg/h = the hourly form of 100/50/20 mL/kg/day.</li>
      <li>Volume derived from energy expenditure (~1 mL water per kcal).</li>
      <li>The rule gives a <em>rate</em>, not a fluid composition.</li>
      <li>
        Hypotonic fluids + non-osmotic ADH release = hospital-acquired
        hyponatraemia; use isotonic balanced crystalloid ± 1–2% glucose.
      </li>
      <li>Deficit, ongoing losses and blood loss are prescribed separately.</li>
    </ul>
  </NoteLayout>
);

export default PaediatricMaintenanceFluidsNote;
