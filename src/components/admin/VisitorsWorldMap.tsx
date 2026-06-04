import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { NUMERIC_TO_ALPHA2 } from "@/lib/iso3166";

const WORLD_TOPO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export interface CountryDatum {
  country: string; // alpha-2
  countryName: string;
  users: number;
  visits: number;
}

interface Props {
  data: CountryDatum[];
  metric?: "users" | "visits";
}

/** Convert alpha-2 country code to flag emoji. */
function flag(code: string): string {
  if (!/^[A-Z]{2}$/.test(code)) return "";
  return String.fromCodePoint(...[...code].map(c => 0x1f1a5 + c.charCodeAt(0)));
}

export const VisitorsWorldMap = ({ data, metric = "users" }: Props) => {
  const [hover, setHover] = useState<{ code: string; name: string; users: number; visits: number; x: number; y: number } | null>(null);

  const byCode = useMemo(() => {
    const m = new Map<string, CountryDatum>();
    data.forEach(d => m.set(d.country.toUpperCase(), d));
    return m;
  }, [data]);

  const max = useMemo(() => {
    let max = 0;
    data.forEach(d => {
      const v = metric === "users" ? d.users : d.visits;
      if (v > max) max = v;
    });
    return max || 1;
  }, [data, metric]);

  // Color scale: log-ish, primary token with varied alpha
  const colorFor = (value: number | undefined): string => {
    if (!value) return "hsl(var(--muted))";
    const t = Math.log(value + 1) / Math.log(max + 1);
    const alpha = 0.15 + t * 0.75;
    return `hsl(var(--primary) / ${alpha.toFixed(3)})`;
  };

  const total = data.reduce((s, d) => s + (metric === "users" ? d.users : d.visits), 0);

  return (
    <div className="relative w-full">
      <ComposableMap
        projectionConfig={{ scale: 140 }}
        width={900}
        height={420}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={[10, 10]} zoom={1} minZoom={1} maxZoom={6}>
          <Geographies geography={WORLD_TOPO_URL}>
            {({ geographies }) =>
              geographies.map(geo => {
                const numeric = Number(geo.id);
                const alpha2 = NUMERIC_TO_ALPHA2[numeric];
                const datum = alpha2 ? byCode.get(alpha2) : undefined;
                const value = datum ? (metric === "users" ? datum.users : datum.visits) : 0;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorFor(value)}
                    stroke="hsl(var(--border))"
                    strokeWidth={0.4}
                    onMouseEnter={e =>
                      setHover({
                        code: alpha2 ?? "",
                        name: datum?.countryName ?? geo.properties?.name ?? "—",
                        users: datum?.users ?? 0,
                        visits: datum?.visits ?? 0,
                        x: e.clientX,
                        y: e.clientY,
                      })
                    }
                    onMouseMove={e =>
                      setHover(h => (h ? { ...h, x: e.clientX, y: e.clientY } : h))
                    }
                    onMouseLeave={() => setHover(null)}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "hsl(var(--primary))", cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {data.length} countries · {total.toLocaleString()} total {metric}
        </span>
        <div className="flex items-center gap-2">
          <span>Fewer</span>
          <div className="h-2 w-32 rounded" style={{ background: "linear-gradient(to right, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.9))" }} />
          <span>More</span>
        </div>
      </div>

      {hover && (
        <div
          className="pointer-events-none fixed z-50 rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md text-popover-foreground"
          style={{ left: hover.x + 12, top: hover.y + 12 }}
        >
          <div className="font-semibold text-foreground">
            {hover.code && <span aria-hidden className="mr-1">{flag(hover.code)}</span>}
            {hover.name}
            {hover.code && <span className="ml-2 font-mono text-muted-foreground">{hover.code}</span>}
          </div>
          <div className="mt-0.5 tabular-nums text-muted-foreground">
            {hover.users.toLocaleString()} users · {hover.visits.toLocaleString()} visits
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorsWorldMap;
