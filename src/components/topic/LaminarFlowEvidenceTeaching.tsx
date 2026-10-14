import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="operating-theatre-environment" refLabel={label} />;

export function LaminarFlowEvidenceTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Does Laminar Flow Actually Prevent Surgical Site Infection?</h2>
    <p>
      Ultra-clean unidirectional ("laminar") airflow is a defining feature of orthopaedic implant theatres in the UK. The evidence
      behind it is more contested than the engineering suggests, and examiners frequently probe the gap between mechanism and
      outcome.
    </p>
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">The original evidence — Lidwell 1982</h3>
      <p className="text-sm mb-2">
        The MRC multicentre randomised study randomised over 8,000 total hip or knee replacements to ultraclean air or
        conventionally ventilated theatres. Deep joint sepsis developed in <strong className="text-foreground">about 1.5% of
        operations in conventional theatres versus 0.6% with ultraclean air</strong>, with a further reduction when body-exhaust
        suits were worn.<R label="Lidwell 1982" /> This remains the historical basis for HTM 03-01's ultraclean provision for
        prosthetic implant work.
      </p>
    </div>
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">The counter-evidence — Brandt 2008 and WHO 2016</h3>
      <p className="text-sm mb-2">
        Brandt et al. analysed approximately <strong className="text-foreground">99,230 operations</strong> from a German national
        surveillance system (KISS) and found that laminar airflow showed <strong className="text-foreground">no protective effect
        on surgical site infection</strong> in orthopaedic and abdominal surgery; for hip prosthesis surgery the infection rate
        was actually higher in laminar-flow rooms (adjusted OR ≈1.6).<R label="Brandt 2008" />
      </p>
      <p className="text-sm mb-2">
        On this basis the WHO 2016 global guidelines on surgical site infection prevention made a
        <strong className="text-foreground"> conditional recommendation that laminar airflow ventilation should not be used to
        reduce the risk of SSI in patients undergoing total arthroplasty</strong> (moderate quality evidence).<R label="WHO SSI 2016" />
      </p>
    </div>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Why the disagreement:</strong> Lidwell randomised the <em>ventilation</em>, but modern observational data reflect real-world theatres where laminar flow is often breached — door openings, personnel movement, ceiling-mounted equipment — and where ventilation is only one element of an SSI bundle (antibiotic prophylaxis, normothermia, skin antisepsis, surgical technique).</li>
      <li><strong className="text-foreground">Reconciling the guidance:</strong> UK practice (HTM 03-01) continues to provide ultraclean theatres for implant orthopaedics, while WHO and much of the international evidence base caution that the benefit is unproven or absent in contemporary practice. A good viva answer states both positions and explains the differences (trial design, adherence to airflow discipline, co-interventions).</li>
      <li><strong className="text-foreground">What it means for your practice:</strong> engineering cannot compensate for behaviour. Keeping the theatre door closed, minimising traffic, positioning the surgical field within the canopy, and wearing exhaust suits correctly matter as much as the air-change rate.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what does WHO 2016 recommend about laminar flow for arthroplasty?</summary><p className="mt-2">A conditional recommendation against using laminar airflow systems to reduce SSI risk in total arthroplasty, based on moderate-quality evidence showing no protective effect (Brandt 2008).</p></details>
    <LessonSources topicId="operating-theatre-environment" labels={["Lidwell 1982", "Brandt 2008", "WHO SSI 2016"]} />
  </div>;
}
