import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ToolShell } from "@/components/tools/ToolShell";
import { MAC_AGE_MIN_YEARS, macForAge, temperatureFactor } from "@/lib/mac-for-age";

interface Agent {
  key: string;
  name: string;
  mac40: number; // MAC at age 40 in 100% O2, %
}

const AGENTS: Agent[] = [
  { key: "sevo", name: "Sevoflurane", mac40: 1.8 },
  { key: "iso", name: "Isoflurane", mac40: 1.17 },
  { key: "des", name: "Desflurane", mac40: 6.6 },
  { key: "n2o", name: "Nitrous oxide", mac40: 104 },
  { key: "hal", name: "Halothane", mac40: 0.75 },
];

export default function MACForAgeTool() {
  const [age, setAge] = useState(60);
  const [tempC, setTempC] = useState(37);

  const infant = age < MAC_AGE_MIN_YEARS;

  const rows = useMemo(() => {
    const tempFactor = temperatureFactor(tempC);
    return AGENTS.map((a) => {
      const aged = macForAge(a.mac40, age);
      return { ...a, aged, adjusted: aged === null ? null : aged * tempFactor };
    });
  }, [age, tempC]);

  return (
    <ToolShell
      slug="mac-for-age"
      title="MAC for age & temperature"
      description="Calculate age- and temperature-adjusted minimum alveolar concentration for sevoflurane, isoflurane, desflurane, halothane and nitrous oxide (age over 1 year)."
      intro={
        <>
          MAC falls ~6% per decade of age (Mapleson/Eger), and ~5% per °C below 37 °C in this
          illustrative display. The age regression is derived for patients{" "}
          <strong>over 1 year</strong>, so infant values are withheld rather than extrapolated. For
          the derivation and exam framing see the{" "}
          <Link to="/notes/mac-for-age-formula" className="text-pharmacology hover:underline">
            MAC for age formula guide
          </Link>
          , and for agent choice at emergence the{" "}
          <Link
            to="/notes/sevoflurane-vs-desflurane-recovery"
            className="text-pharmacology hover:underline"
          >
            sevoflurane vs desflurane recovery guide
          </Link>
          .
        </>
      }
      references={
        <>
          <p>
            Mapleson WW. Effect of age on MAC in humans: a meta-analysis. Br J Anaesth 1996;
            76:179–85.{" "}
            <a className="underline" href="https://pubmed.ncbi.nlm.nih.gov/8777094/">
              PubMed 8777094
            </a>{" "}
            (data for age &gt; 1 year).
          </p>
          <p>Eger EI. Age, MAC, and Ramsay sedation scale. Anesth Analg 2001; 93:947–53.</p>
        </>
      }
      caveat={
        <>
          Educational aid only. These are model estimates, not end-tidal targets; check against your
          local protocol and the patient in front of you.
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted-foreground">Age (years)</span>
          <input
            type="number"
            min={0}
            max={110}
            step={0.1}
            value={age}
            onChange={(e) => setAge(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Core temperature (°C)</span>
          <input
            type="number"
            min={28}
            max={42}
            step={0.1}
            value={tempC}
            onChange={(e) => setTempC(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>
      </div>

      {infant && (
        <div className="mt-4 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm">
          <p className="font-semibold text-foreground">Infant values are withheld</p>
          <p className="mt-1 text-muted-foreground">
            The Mapleson age regression is derived from data for age over 1 year. Infants have a
            higher MAC than that trend predicts, so no value is extrapolated here — use a paediatric
            source and your local protocol.
          </p>
        </div>
      )}

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-muted-foreground border-b border-border">
              <th className="py-2 pr-3">Agent</th>
              <th className="py-2 pr-3">MAC₄₀</th>
              <th className="py-2 pr-3">Age-adj.</th>
              <th className="py-2">Age + temp</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-b border-border/60">
                <td className="py-2 pr-3 font-medium text-foreground">{r.name}</td>
                <td className="py-2 pr-3 text-muted-foreground">{r.mac40}%</td>
                <td className="py-2 pr-3 text-muted-foreground">
                  {r.aged === null ? "—" : `${r.aged.toFixed(2)}%`}
                </td>
                <td className="py-2 text-foreground font-semibold">
                  {r.adjusted === null ? "—" : `${r.adjusted.toFixed(2)}%`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Values are 1.0 MAC; aim 1.2–1.3 MAC for surgical stimulus when not using opioids/regional.
        Reduce further with N₂O, opioids, age &gt; 80, or haemodynamic instability.
      </p>
    </ToolShell>
  );
}
