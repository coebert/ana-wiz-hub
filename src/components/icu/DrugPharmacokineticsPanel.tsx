import { ArrowRight } from "lucide-react";
import { pharmacokineticsFor } from "@/data/pk";
import { pharmacodynamicsFor } from "@/data/pd";

interface DrugPharmacokineticsPanelProps {
  /** Mechanism-page slug for the drug. */
  slug: string;
}

const ROWS: Array<{ key: keyof ReturnType<typeof rowSource>; label: string }> = [
  { key: "onset", label: "Onset" },
  { key: "duration", label: "Duration / offset" },
  { key: "halfLife", label: "Half-life" },
  { key: "volumeOfDistribution", label: "Volume of distribution" },
  { key: "proteinBinding", label: "Protein binding" },
  { key: "metabolicPathway", label: "Metabolic pathway" },
  { key: "activeMetabolites", label: "Active metabolites" },
  { key: "elimination", label: "Elimination" },
  { key: "organImpairment", label: "Hepatic / renal failure and RRT" },
  { key: "infusionBehaviour", label: "Prolonged infusion" },
];

// Helper purely for typing the row keys above.
const rowSource = () => ({
  onset: "",
  duration: "",
  halfLife: "",
  volumeOfDistribution: "",
  proteinBinding: "",
  metabolicPathway: "",
  activeMetabolites: "",
  elimination: "",
  organImpairment: "",
  infusionBehaviour: "" as string | undefined,
});

export const DrugPharmacokineticsPanel = ({ slug }: DrugPharmacokineticsPanelProps) => {
  const pk = pharmacokineticsFor(slug);
  const hasPd = Boolean(pharmacodynamicsFor(slug));
  if (!pk) return null;

  return (
    <div id={`pk-${slug}`} className="mt-4 scroll-mt-24 rounded-lg border border-border bg-muted/30 p-4">
      <h4 className="text-sm font-semibold">Pharmacokinetics and metabolism</h4>
      <dl className="mt-3 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
        {ROWS.map(({ key, label }) => {
          const value = pk[key];
          if (!value) return null;
          return (
            <div key={key}>
              <dt className="font-medium text-foreground">{label}</dt>
              <dd className="mt-0.5 text-muted-foreground">{value}</dd>
            </div>
          );
        })}
      </dl>

      {hasPd && (
        <a
          href={`#pd-${slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-icu underline-offset-4 hover:underline"
        >
          Pharmacodynamics: dose–response, therapeutic window, side effects and interactions
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
};

export default DrugPharmacokineticsPanel;
