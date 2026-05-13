import { useState } from "react";
import { Button } from "@/components/ui/button";

type Division = "sympathetic" | "parasympathetic";

interface OrganEffect {
  organ: string;
  sympathetic: string;
  parasympathetic: string;
}

const effects: OrganEffect[] = [
  { organ: "Heart", sympathetic: "↑ Rate (β₁), ↑ Contractility (β₁)", parasympathetic: "↓ Rate (M₂), ↓ Conduction (M₂)" },
  { organ: "Bronchi", sympathetic: "Bronchodilation (β₂)", parasympathetic: "Bronchoconstriction (M₃)" },
  { organ: "Blood Vessels", sympathetic: "Constriction (α₁), Dilation (β₂ skeletal)", parasympathetic: "Minimal direct effect" },
  { organ: "Pupil", sympathetic: "Mydriasis (α₁)", parasympathetic: "Miosis (M₃)" },
  { organ: "GI Tract", sympathetic: "↓ Motility (α₂, β₂), Sphincter contraction (α₁)", parasympathetic: "↑ Motility (M₃), Sphincter relaxation" },
  { organ: "Bladder", sympathetic: "Detrusor relaxation (β₃), Sphincter contraction (α₁)", parasympathetic: "Detrusor contraction (M₃), Sphincter relaxation" },
  { organ: "Salivary Glands", sympathetic: "Thick, viscous secretion (α₁)", parasympathetic: "Watery secretion (M₃)" },
];

export const ANSDiagram = () => {
  const [highlight, setHighlight] = useState<Division | null>(null);

  return (
        <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={highlight === "sympathetic" ? "default" : "outline"}
          size="sm"
          onClick={() => setHighlight(highlight === "sympathetic" ? null : "sympathetic")}
        >
          ⚡ Sympathetic
        </Button>
        <Button
          variant={highlight === "parasympathetic" ? "default" : "outline"}
          size="sm"
          onClick={() => setHighlight(highlight === "parasympathetic" ? null : "parasympathetic")}
        >
          🕊️ Parasympathetic
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 border-b border-border font-semibold text-foreground">Organ</th>
              <th className={`text-left p-2 border-b border-border font-semibold transition-colors ${highlight === "sympathetic" ? "text-destructive" : "text-foreground"}`}>
                Sympathetic
              </th>
              <th className={`text-left p-2 border-b border-border font-semibold transition-colors ${highlight === "parasympathetic" ? "text-primary" : "text-foreground"}`}>
                Parasympathetic
              </th>
            </tr>
          </thead>
          <tbody>
            {effects.map((e) => (
              <tr key={e.organ} className="border-b border-border/50">
                <td className="p-2 font-medium text-foreground">{e.organ}</td>
                <td className={`p-2 transition-all ${highlight === "parasympathetic" ? "opacity-30" : "opacity-100"} ${highlight === "sympathetic" ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                  {e.sympathetic}
                </td>
                <td className={`p-2 transition-all ${highlight === "sympathetic" ? "opacity-30" : "opacity-100"} ${highlight === "parasympathetic" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {e.parasympathetic}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg p-3 border border-destructive/30 bg-destructive/5">
          <p className="font-semibold text-foreground">Sympathetic Pathway</p>
          <p className="text-muted-foreground mt-1">T1–L2 → short preganglionic (ACh→nAChR) → long postganglionic (NA→adrenoceptors)</p>
        </div>
        <div className="rounded-lg p-3 border border-primary/30 bg-primary/5">
          <p className="font-semibold text-foreground">Parasympathetic Pathway</p>
          <p className="text-muted-foreground mt-1">CN III,VII,IX,X + S2-4 → long preganglionic (ACh→nAChR) → short postganglionic (ACh→mAChR)</p>
        </div>
      </div>
    </div>
  );
};
