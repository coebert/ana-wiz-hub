import { InlineRef } from "@/components/references/InlineRef";
const R = ({ label }: { label: string }) => <InlineRef topicId="local-anaesthetics" refLabel={label} />;

export function DifferentialBlockadeTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed mt-6">
    <h3 className="text-lg font-semibold text-foreground">Why the “size principle” is an incomplete explanation</h3>
    <p>The textbook rule — thin fibres block first — is a useful clinical summary but not a reliable law. In single-axon recordings during lidocaine perfusion, unmyelinated C fibres were <em>less</em> susceptible to conduction block than thinly myelinated Aδ fibres, contradicting a simple diameter ordering.<R label="Fink 1984 Single-Axon Block" /> In vivo rat sciatic recordings found the most sensitive fibres were small myelinated Aγ motor and Aδ sensory fibres, with C fibres and large Aα/β fibres blocked later.<R label="Gokin 2001 Preferential Block" /></p>
    <p>The clinical sequence therefore emerges from several interacting factors rather than diameter alone: internodal distance and the length of nerve exposed to drug (critical blocking length), the safety factor for conduction, firing frequency (use-dependent block of open/inactivated channels), the drug's diffusion into the nerve over time, and where fibres sit within the fascicle.<R label="Gokin 2001 Preferential Block" /><R label="BJA Educ 2015" /></p>
    <h3 className="text-lg font-semibold text-foreground">Applying it at the bedside</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Concentration, not just volume:</strong> a dilute epidural solution may sit near the threshold for some fibre groups but below it for others, which is why labour regimens can spare motor function. Increasing concentration narrows the differential.<R label="BJA Educ 2015" /></li>
      <li><strong className="text-foreground">Time course:</strong> during onset and regression, partial block is common — temperature sensation may be lost while sharp pain is incompletely blocked. Test the modality relevant to surgery and repeat after adequate time.</li>
      <li><strong className="text-foreground">Neuraxial levels:</strong> sympathetic block typically extends above sensory block, and motor block lies below it; haemodynamic effects can therefore exceed what the sensory level suggests.</li>
      <li><strong className="text-foreground">Evidence limits:</strong> most fibre-sensitivity data are animal electrophysiology with lidocaine; extrapolation to human peripheral and neuraxial blocks with long-acting agents is inferential.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: is loss of cold sensation proof the block is ready for incision?</summary><p className="mt-2">No. Cold sensation can be lost before full block of the fibres carrying sharp or surgical pain. Confirm with the relevant modality (e.g. pinprick or touch for caesarean section, per local practice) at the required level, and have a supplementation plan.</p></details>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: do C fibres always block first?</summary><p className="mt-2">No. Single-axon and in vivo studies found small myelinated (Aδ, Aγ) fibres more sensitive to lidocaine than unmyelinated C fibres. “Small fibres first” is a simplification.</p></details>
  </div>;
}
