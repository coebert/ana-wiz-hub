import { useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/ToolShell";

interface LA {
  key: string;
  name: string;
  plain: number; // mg/kg
  withAdr?: number; // mg/kg with adrenaline
  absoluteCap?: number; // mg
}

const AGENTS: LA[] = [
  { key: "lido", name: "Lidocaine", plain: 3, withAdr: 7, absoluteCap: 500 },
  { key: "bupi", name: "Bupivacaine", plain: 2, withAdr: 2, absoluteCap: 175 },
  { key: "levo", name: "Levobupivacaine", plain: 2, withAdr: 2, absoluteCap: 150 },
  { key: "ropi", name: "Ropivacaine", plain: 3, withAdr: 3, absoluteCap: 225 },
  { key: "prilo", name: "Prilocaine", plain: 6, withAdr: 8, absoluteCap: 600 },
];

const CONCENTRATIONS = [0.25, 0.5, 1, 2]; // %

export default function MaxLADoseTool() {
  const [weight, setWeight] = useState(70);
  const [withAdr, setWithAdr] = useState(false);
  const [agentKey, setAgentKey] = useState<string>("lido");
  const [conc, setConc] = useState(1); // %

  const agent = AGENTS.find((a) => a.key === agentKey)!;

  const { maxMg, maxMl } = useMemo(() => {
    const perKg = withAdr ? agent.withAdr ?? agent.plain : agent.plain;
    const raw = perKg * weight;
    const capped = agent.absoluteCap ? Math.min(raw, agent.absoluteCap) : raw;
    const mgPerMl = conc * 10; // 1% = 10 mg/mL
    return { maxMg: capped, maxMl: capped / mgPerMl };
  }, [agent, weight, withAdr, conc]);

  return (
    <ToolShell
      slug="max-local-anaesthetic-dose"
      title="Max local anaesthetic dose"
      description="Calculate maximum safe local anaesthetic dose and volume by agent, weight, concentration, and adrenaline status."
      intro={
        <>
          Maximum safe single-shot dose for the most commonly used local
          anaesthetics. Doses are upper limits in fit adults — reduce in frailty,
          extremes of age, or hepatic/cardiac disease.
        </>
      }
      references={
        <>
          <p>
            AAGBI Safety Guideline: Management of severe local anaesthetic
            toxicity, 2010 (reviewed).
          </p>
          <p>BNF / SPCs for each agent (current edition).</p>
        </>
      }
      caveat={
        <>
          Educational aid only. Always have lipid emulsion 20% and resuscitation
          equipment immediately available before any regional block.
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted-foreground">Weight (kg)</span>
          <input
            type="number"
            min={1}
            max={200}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>

        <label className="block text-sm">
          <span className="text-muted-foreground">Agent</span>
          <select
            value={agentKey}
            onChange={(e) => setAgentKey(e.target.value)}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          >
            {AGENTS.map((a) => (
              <option key={a.key} value={a.key}>
                {a.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="text-muted-foreground">Concentration (%)</span>
          <select
            value={conc}
            onChange={(e) => setConc(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          >
            {CONCENTRATIONS.map((c) => (
              <option key={c} value={c}>
                {c}%
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-end gap-2 text-sm">
          <input
            id="adr"
            type="checkbox"
            checked={withAdr}
            onChange={(e) => setWithAdr(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          <span className="text-foreground">With adrenaline</span>
        </label>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="text-xs uppercase text-muted-foreground">Max dose</div>
          <div className="mt-1 text-3xl font-bold text-foreground">
            {maxMg.toFixed(0)}{" "}
            <span className="text-base font-medium text-muted-foreground">mg</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {(withAdr ? agent.withAdr ?? agent.plain : agent.plain)} mg/kg
            {agent.absoluteCap && `, capped at ${agent.absoluteCap} mg`}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="text-xs uppercase text-muted-foreground">
            Max volume @ {conc}%
          </div>
          <div className="mt-1 text-3xl font-bold text-foreground">
            {maxMl.toFixed(1)}{" "}
            <span className="text-base font-medium text-muted-foreground">mL</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ({(conc * 10).toFixed(0)} mg/mL)
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
