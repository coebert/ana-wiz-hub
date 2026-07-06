import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export const DiathermyDiagram = () => {
  const [mode, setMode] = useState<"mono" | "bi">("mono");
  const [plateArea, setPlateArea] = useState([150]); // cm²
  const POWER_W = 50;
  const TIP_AREA = 0.01; // cm² at active electrode tip
  const tipDensity = (POWER_W / TIP_AREA).toFixed(0);
  const plateDensity = (POWER_W / plateArea[0]).toFixed(2);
  const plateRisk = plateArea[0] < 70;

  return (
    <Card className="p-4 sm:p-6 my-6 bg-card border-border">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        Surgical Diathermy — Monopolar vs Bipolar
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        High-frequency AC (0.4–3 MHz) — too fast to depolarise nerve/muscle, but generates
        intense local heating where current density is high.
      </p>

      <Tabs defaultValue="modes" className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-4">
          <TabsTrigger value="modes">Mono vs Bi</TabsTrigger>
          <TabsTrigger value="coupling">Coupling Risks</TabsTrigger>
          <TabsTrigger value="channel">Channelling</TabsTrigger>
        </TabsList>

        {/* === MODES === */}
        <TabsContent value="modes" className="space-y-4">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setMode("mono")}
              className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
                mode === "mono"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/30 text-foreground border-border hover:bg-secondary/50"
              }`}
            >
              Monopolar
            </button>
            <button
              onClick={() => setMode("bi")}
              className={`px-3 py-1.5 text-xs rounded-md border transition-all ${
                mode === "bi"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/30 text-foreground border-border hover:bg-secondary/50"
              }`}
            >
              Bipolar
            </button>
          </div>

          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <svg viewBox="0 0 600 280" className="w-full h-auto">
              {/* patient body outline */}
              <ellipse cx="300" cy="180" rx="240" ry="70" fill="hsl(var(--muted))" opacity="0.35" />
              <text x="300" y="265" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
                patient
              </text>

              {/* generator */}
              <rect x="20" y="20" width="80" height="40" rx="4" fill="hsl(var(--primary))" opacity="0.85" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <text x="60" y="45" textAnchor="middle" className="fill-primary-foreground" fontSize="10" fontWeight="600">
                ESU 0.4–3 MHz
              </text>

              {mode === "mono" ? (
                <>
                  {/* active lead */}
                  <path d="M 60 60 Q 60 100 200 110" stroke="hsl(var(--destructive))" strokeWidth="2" fill="none" />
                  {/* active electrode tip */}
                  <circle cx="200" cy="110" r="5" fill="hsl(var(--destructive))">
                    <animate attributeName="r" values="4;7;4" dur="0.8s" repeatCount="indefinite" />
                  </circle>
                  <text x="200" y="98" textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="600">
                    active tip
                  </text>
                  <text x="200" y="125" textAnchor="middle" className="fill-destructive" fontSize="8">
                    ~0.01 cm² → high density
                  </text>

                  {/* current spreading through body (animated dots) */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <circle key={i} cx="200" cy="110" r="2" fill="hsl(var(--destructive))">
                      <animateMotion dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`}
                        path={`M 0 0 Q ${50 + i * 20} ${60 + i * 5} ${250 - i * 10} ${110 + i * 2}`} />
                      <animate attributeName="opacity" values="1;0.2;0" dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                    </circle>
                  ))}

                  {/* return plate on thigh */}
                  <rect x="400" y="200" width="120" height="20" rx="3" fill="hsl(var(--primary))" opacity="0.7" stroke="hsl(var(--border))" strokeWidth="0.75" />
                  <text x="460" y="195" textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="600">
                    return plate
                  </text>
                  <text x="460" y="235" textAnchor="middle" className="fill-primary" fontSize="8">
                    ~150 cm² → low density
                  </text>

                  {/* return path */}
                  <path d="M 60 60 L 60 230 L 400 230" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeDasharray="3 2" />
                </>
              ) : (
                <>
                  {/* bipolar forceps - two prongs */}
                  <path d="M 60 60 Q 100 100 280 130" stroke="hsl(var(--destructive))" strokeWidth="2" fill="none" />
                  <path d="M 60 60 Q 100 110 320 130" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />

                  <rect x="275" y="125" width="6" height="20" fill="hsl(var(--destructive))" />
                  <rect x="319" y="125" width="6" height="20" fill="hsl(var(--primary))" />
                  <text x="300" y="115" textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="600">
                    bipolar forceps
                  </text>

                  {/* arc between prongs */}
                  {[0, 1, 2].map((i) => (
                    <circle key={i} cx="278" cy="140" r="1.8" fill="hsl(var(--destructive))">
                      <animateMotion dur="0.6s" repeatCount="indefinite" begin={`${i * 0.2}s`}
                        path="M 0 0 Q 22 -8 44 0" />
                      <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                    </circle>
                  ))}

                  <text x="300" y="170" textAnchor="middle" className="fill-muted-foreground" fontSize="9">
                    current confined between prongs (mm)
                  </text>
                  <text x="300" y="184" textAnchor="middle" className="fill-muted-foreground" fontSize="8">
                    no return plate · safer near pacemakers
                  </text>
                </>
              )}
            </svg>
          </div>

          {mode === "mono" && (
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <p className="text-xs font-semibold text-foreground mb-2">Return plate area slider — current density at plate</p>
              <Slider value={plateArea} onValueChange={setPlateArea} min={20} max={200} step={5} />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>20 cm² (lifted)</span>
                <span className="font-mono text-foreground">{plateArea[0]} cm²</span>
                <span>200 cm² (full contact)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="rounded bg-destructive/10 border border-destructive/30 p-2">
                  <p className="text-[10px] text-muted-foreground">Active tip density</p>
                  <p className="text-sm font-mono font-bold text-destructive">{tipDensity} W/cm²</p>
                  <p className="text-[10px] text-muted-foreground">→ tissue vaporisation</p>
                </div>
                <div className={`rounded border p-2 ${plateRisk ? "bg-destructive/10 border-destructive/30" : "bg-primary/10 border-primary/30"}`}>
                  <p className="text-[10px] text-muted-foreground">Plate density</p>
                  <p className={`text-sm font-mono font-bold ${plateRisk ? "text-destructive" : "text-primary"}`}>
                    {plateDensity} W/cm²
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {plateRisk ? "⚠ burn risk" : "safe — no heating"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-border bg-secondary/20 p-3">
              <p className="font-semibold text-foreground mb-1">Monopolar</p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Current: tip → patient → return plate → ESU</li>
                <li>Cuts/coagulates at tip; plate disperses</li>
                <li>Versatile, deep effect</li>
                <li>Needs return plate; plate burns possible</li>
                <li>Risk near pacemakers / ICDs</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-secondary/20 p-3">
              <p className="font-semibold text-foreground mb-1">Bipolar</p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Current confined between two forceps tips</li>
                <li>No return plate, no body current</li>
                <li>Lower power (5–30 W); precise haemostasis</li>
                <li>Safer with pacemakers, end-arteries (digits)</li>
                <li>Cannot cut large tissue volumes</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* === COUPLING === */}
        <TabsContent value="coupling" className="space-y-3">
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <svg viewBox="0 0 600 240" className="w-full h-auto">
              {/* trocar metal sleeve */}
              <rect x="240" y="40" width="20" height="160" fill="hsl(var(--muted-foreground))" opacity="0.6" />
              <text x="190" y="55" className="fill-foreground" fontSize="9" fontWeight="600">metal trocar</text>

              {/* insulated active electrode through trocar */}
              <rect x="246" y="20" width="8" height="200" fill="hsl(var(--destructive))" opacity="0.5" />
              <rect x="247" y="40" width="6" height="160" fill="hsl(var(--card))" />
              <rect x="247" y="40" width="6" height="160" fill="hsl(var(--destructive))" opacity="0.2" />
              <text x="320" y="35" className="fill-foreground" fontSize="9" fontWeight="600">insulated active electrode</text>

              {/* capacitor symbol — invisible coupling */}
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <line x1="254" y1={70 + i * 30} x2="240" y2={70 + i * 30}
                    stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="2 2" opacity="0.7">
                    <animate attributeName="opacity" values="0.2;0.9;0.2" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                  </line>
                </g>
              ))}
              <text x="100" y="130" className="fill-destructive" fontSize="9" fontWeight="600">capacitative</text>
              <text x="100" y="142" className="fill-destructive" fontSize="9" fontWeight="600">coupling →</text>

              {/* bowel loop touching trocar */}
              <ellipse cx="380" cy="180" rx="60" ry="20" fill="hsl(var(--destructive))" opacity="0.3" />
              <ellipse cx="380" cy="180" rx="60" ry="20" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
              <text x="380" y="215" textAnchor="middle" className="fill-foreground" fontSize="9">bowel loop</text>
              <text x="380" y="227" textAnchor="middle" className="fill-destructive" fontSize="8">unintended burn</text>

              {/* spark from trocar to bowel */}
              <path d="M 260 200 L 320 185" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="3 2">
                <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" />
              </path>

              {/* active tip at bottom */}
              <circle cx="250" cy="218" r="5" fill="hsl(var(--destructive))" />
            </svg>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
              <Badge variant="destructive" className="text-[10px] mb-2">Capacitative coupling</Badge>
              <p className="text-muted-foreground">
                AC current induces a charge across the insulator of the active electrode → metal trocar acts
                as a "plate" of a capacitor. Up to <strong className="text-foreground">40–70%</strong> of
                power can transfer to the trocar without visible arcing. If the trocar contacts bowel away
                from the surgeon's view → full-thickness burn presenting 3–7 days post-op as peritonitis.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong className="text-foreground">Mitigation:</strong> all-metal cannulae (current returns
                via abdominal wall, not bowel); avoid hybrid metal/plastic ports; active electrode monitoring
                (AEM); shorter activations; lower voltage (cut &lt; coag).
              </p>
            </div>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
              <Badge variant="destructive" className="text-[10px] mb-2">Direct coupling</Badge>
              <p className="text-muted-foreground">
                Active electrode touches another conductive instrument (forceps, scope) inside the abdomen
                while activated → energy flows down that instrument and discharges at the tip into adjacent
                tissue. Always inspect for insulation breaks before use; never activate diathermy unless the
                tip is in view and not touching another instrument.
              </p>
            </div>
          </div>
        </TabsContent>

        {/* === CHANNELLING === */}
        <TabsContent value="channel" className="space-y-3">
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <svg viewBox="0 0 600 240" className="w-full h-auto">
              {/* hand outline */}
              <path d="M 100 180 Q 100 90 130 90 L 130 60 Q 145 50 150 90 L 165 60 Q 180 50 185 90 L 200 65 Q 215 55 220 95 L 235 80 Q 250 75 255 110 L 280 130 Q 290 150 280 180 Z"
                fill="hsl(var(--muted))" opacity="0.4" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />

              {/* digit being treated */}
              <ellipse cx="155" cy="75" rx="10" ry="22" fill="hsl(var(--destructive))" opacity="0.4" />
              <text x="155" y="40" textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="600">
                treated digit
              </text>

              {/* active electrode at fingertip */}
              <circle cx="155" cy="55" r="4" fill="hsl(var(--destructive))">
                <animate attributeName="r" values="3;6;3" dur="0.8s" repeatCount="indefinite" />
              </circle>

              {/* current funnelling through narrow base */}
              {[0, 1, 2].map((i) => (
                <path key={i} d={`M 155 75 Q ${145 + i * 5} 130 ${180 + i * 30} 175`}
                  stroke="hsl(var(--destructive))" strokeWidth="1" fill="none" opacity="0.5" strokeDasharray="2 2">
                  <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                </path>
              ))}

              {/* bottleneck warning */}
              <circle cx="155" cy="118" r="14" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="3 2">
                <animate attributeName="r" values="12;18;12" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text x="375" y="125" className="fill-destructive" fontSize="10" fontWeight="600">
                ↑ density at narrow base
              </text>
              <text x="375" y="138" className="fill-muted-foreground" fontSize="8">
                = ischaemic + thermal injury
              </text>
              <text x="375" y="155" className="fill-destructive" fontSize="9" fontWeight="600">
                end-artery → necrosis
              </text>

              {/* return path widens */}
              <text x="320" y="200" className="fill-muted-foreground" fontSize="9">
                current spreads in palm/forearm → low density, no harm
              </text>
            </svg>
          </div>

          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-xs">
            <p className="font-semibold text-foreground mb-1">Channelling effect</p>
            <p className="text-muted-foreground">
              When monopolar current passes through an appendage with a narrow pedicle (digit, penis, ear,
              scrotal flap), all return current must funnel through a small cross-sectional area →
              <strong className="text-foreground"> current density rises sharply at the base</strong>,
              producing both Joule heating <em>and</em> microvascular thrombosis in end-arteries with no
              collateral supply. Result: delayed digital ischaemia or necrosis hours-to-days later.
            </p>
            <p className="text-muted-foreground mt-2">
              <strong className="text-foreground">Rule:</strong> never use monopolar diathermy on appendages
              supplied by end-arteries. Use <strong className="text-foreground">bipolar</strong> — current
              stays between the two prongs and never traverses the pedicle.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default DiathermyDiagram;
