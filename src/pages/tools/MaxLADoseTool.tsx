import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ToolShell } from "@/components/tools/ToolShell";
import {
  LOCAL_ANAESTHETIC_ROWS,
  calculateLocalAnaestheticLimit,
  localAnaestheticUnsupportedReason,
} from "@/lib/local-anaesthetic-limits";

export default function MaxLADoseTool() {
  const [weight, setWeight] = useState(70);
  const [rowKey, setRowKey] = useState("lidocaine-plain");

  const row = LOCAL_ANAESTHETIC_ROWS.find((r) => r.key === rowKey)!;
  const [conc, setConc] = useState(row.concentrations[0]);

  const concentration = row.concentrations.includes(conc) ? conc : row.concentrations[0];

  const limit = useMemo(
    () => calculateLocalAnaestheticLimit(rowKey, weight, concentration),
    [rowKey, weight, concentration]
  );
  const unsupported = useMemo(
    () => localAnaestheticUnsupportedReason(rowKey, weight, concentration),
    [rowKey, weight, concentration]
  );

  return (
    <ToolShell
      slug="max-local-anaesthetic-dose"
      title="Local anaesthetic product limits"
      description="Product-, technique- and route-scoped local anaesthetic limits for named UK products, with the volume at the chosen strength."
      intro={
        <>
          Each option below is a single named UK product table, not an agent-wide ceiling. Select
          the product and technique you are actually using; the calculator refuses combinations that
          product does not cover. If toxicity occurs, follow the{" "}
          <Link
            to="/notes/local-anaesthetic-systemic-toxicity-management"
            className="text-pharmacology hover:underline"
          >
            LAST management guide
          </Link>{" "}
          (Association of Anaesthetists QRH 3-10, 2023).
        </>
      }
      references={
        <>
          <p>
            Association of Anaesthetists Quick Reference Handbook 3-10: local anaesthetic toxicity,
            version 2 (2023).
          </p>
          <p>
            Named product SmPCs:{" "}
            <a className="underline" href={row.sourceUrl}>
              {row.product}
            </a>
            .
          </p>
        </>
      }
      caveat={
        <>
          Educational aid only. A listed ceiling is a product upper limit, not a target and not a
          toxicity threshold; prior doses, mixed agents, site, weight basis and patient factors need
          individual assessment. Check against your local formulary and protocol with pharmacist
          review before prescribing. Always have lipid emulsion 20% and resuscitation equipment
          immediately available before any regional block.
        </>
      }
    >
      <div className="mb-5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-foreground">
        <strong>Pharmacist review and local protocol required.</strong> These are product-specific
        single-dose ceilings for adults; they do not certify a safe dose for a particular patient or
        block.
      </div>

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
          <span className="text-muted-foreground">Product, technique and route</span>
          <select
            value={rowKey}
            onChange={(e) => {
              const next = LOCAL_ANAESTHETIC_ROWS.find((r) => r.key === e.target.value)!;
              setRowKey(next.key);
              setConc(next.concentrations[0]);
            }}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          >
            {LOCAL_ANAESTHETIC_ROWS.map((r) => (
              <option key={r.key} value={r.key}>
                {r.agent} — {r.technique}
                {r.withAdrenaline ? " (+ adrenaline)" : ""}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="text-muted-foreground">
            Concentration (%) — covered by this product table
          </span>
          <select
            value={concentration}
            onChange={(e) => setConc(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          >
            {row.concentrations.map((c) => (
              <option key={c} value={c}>
                {c}%
              </option>
            ))}
          </select>
        </label>

        <div className="text-xs text-muted-foreground sm:pt-6">
          <p className="font-medium text-foreground">{row.product}</p>
          <p>{row.route}</p>
        </div>
      </div>

      {limit ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="text-xs uppercase text-muted-foreground">
              Product single-dose ceiling
            </div>
            <div className="mt-1 text-3xl font-bold text-foreground">
              {limit.maxMg.toFixed(0)}{" "}
              <span className="text-base font-medium text-muted-foreground">mg</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {limit.mgPerKg !== undefined
                ? `${limit.mgPerKg} mg/kg × ${weight} kg`
                : "no adult mg/kg figure in this product table"}
              {limit.cappedBy === "absolute" && ", capped by the product maximum"}
              {limit.cappedBy === "product-only" && ", product maximum"}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="text-xs uppercase text-muted-foreground">
              Equivalent volume @ {concentration}%
            </div>
            <div className="mt-1 text-3xl font-bold text-foreground">
              {limit.maxMl.toFixed(1)}{" "}
              <span className="text-base font-medium text-muted-foreground">mL</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              ({limit.mgPerMl.toFixed(0)} mg/mL)
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm">
          <p className="font-semibold text-foreground">No calculated limit</p>
          <p className="mt-1 text-muted-foreground">{unsupported}</p>
        </div>
      )}

      <div className="mt-4 rounded-xl border border-border p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">Scope of this row</p>
        <p className="mt-1">{row.notes}</p>
        <p className="mt-2">
          Source:{" "}
          <a className="underline" href={row.sourceUrl}>
            {row.product}
          </a>
          . Not interchangeable with another product, concentration, technique or route.
        </p>
      </div>
    </ToolShell>
  );
}
