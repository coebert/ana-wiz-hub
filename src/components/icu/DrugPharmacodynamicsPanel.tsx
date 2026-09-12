import { pharmacodynamicsFor } from "@/data/pd";

interface DrugPharmacodynamicsPanelProps {
  /** Mechanism-page slug for the drug. */
  slug: string;
}

export const DrugPharmacodynamicsPanel = ({ slug }: DrugPharmacodynamicsPanelProps) => {
  const pd = pharmacodynamicsFor(slug);
  if (!pd) return null;

  return (
    <div id={`pd-${slug}`} className="mt-4 scroll-mt-24 rounded-lg border border-border bg-muted/30 p-4">
      <h4 className="text-sm font-semibold">Pharmacodynamics — dose–response and therapeutic window</h4>

      <dl className="mt-3 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-foreground">Dose–response</dt>
          <dd className="mt-0.5 text-muted-foreground">{pd.doseResponse}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Therapeutic window</dt>
          <dd className="mt-0.5 text-muted-foreground">{pd.therapeuticWindow}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">What you titrate against</dt>
          <dd className="mt-0.5 text-muted-foreground">{pd.titrationTarget}</dd>
        </div>
        {pd.tolerance && (
          <div>
            <dt className="font-medium text-foreground">Tolerance, tachyphylaxis and rebound</dt>
            <dd className="mt-0.5 text-muted-foreground">{pd.tolerance}</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-foreground">Dose-related side effects (low → high exposure)</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {pd.doseRelatedEffects.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Pharmacodynamic interactions</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {pd.interactions.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Doses and levels are for revision. Confirm against the BNF, the summary of product
        characteristics and local critical care guidelines before prescribing.
      </p>
    </div>
  );
};

export default DrugPharmacodynamicsPanel;
