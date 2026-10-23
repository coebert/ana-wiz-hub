import { Link } from "react-router-dom";

const links = [
  { id: "orchidopexy", name: "Orchidopexy (undescended testis)", note: "paediatric day case: caudal vs ilioinguinal coverage, cord-traction bradycardia" },
  { id: "hypospadias-repair", name: "Hypospadias repair", note: "long paediatric case: total local anaesthetic dose, heat loss" },
  { id: "ureteroscopy-laser", name: "Ureteroscopy and laser lithotripsy", note: "lithotomy positioning, irrigation-related sepsis" },
  { id: "pcnl", name: "Percutaneous nephrolithotomy (PCNL)", note: "prone turn, supracostal pneumothorax, tract bleeding" },
];

/** Links from Anaesthetic Risk to Operations Library entries that illustrate procedure-specific risks. */
export function RiskOperationLinks() {
  return <aside className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
    <h3 className="text-base font-semibold text-foreground">See these risks in specific operations</h3>
    <p className="text-sm text-muted-foreground">Staged diagrams in the Operations Library show where in each procedure the positioning, regional and age-related risks above arise.</p>
    <ul className="list-disc pl-5 space-y-1 text-sm">
      {links.map(l => <li key={l.id}><Link className="text-primary underline underline-offset-2" to={`/perioperative/operative-steps#${l.id}`}>{l.name}</Link> <span className="text-muted-foreground">— {l.note}</span></li>)}
    </ul>
  </aside>;
}
