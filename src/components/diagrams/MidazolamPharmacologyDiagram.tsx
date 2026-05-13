import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { DiagramFigure } from "./_shared/DiagramFigure";

export const MidazolamPharmacologyDiagram = () => {
  const [eGFR, setEGFR] = useState([90]); // ml/min/1.73m²
  const [infusionH, setInfusionH] = useState([24]); // hours
  const [flumazenilDose, setFlumazenilDose] = useState([0.2]); // mg

  // Context-sensitive half-time (CSHT) — typical values
  // Normal renal function: CSHT after 24h ≈ 60 min; after 96h ≈ 200 min.
  // In renal failure, α-OH-midazolam-glucuronide accumulates → effective sedative half-time
  // can extend to many hours/days.
  const renalFactor = Math.max(0.3, eGFR[0] / 90); // <=1
  const baseCSHT = 30 + Math.min(infusionH[0], 96) * 2.0; // grows ~2 min per hour up to 96 h
  const effectiveCSHT = baseCSHT / renalFactor;
  const effectiveHrs = (effectiveCSHT / 60).toFixed(1);

  // Flumazenil — t½ ≈ 40–80 min vs midazolam t½ 1.5–2.5h (much longer with active metabolite)
  // Reversal duration ≈ dose-dependent (very rough): 0.1 mg ~10 min … 1 mg ~45 min
  const reversalMin = Math.round(8 + flumazenilDose[0] * 38);
  const resedationRisk = flumazenilDose[0] < 0.5 || eGFR[0] < 60;

  return (
    <DiagramFigure
      id="midazolam-pharmacology-diagram"
      title="Midazolam pharmacology"
      description="Auto-generated wrapper for the Midazolam pharmacology anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <Card className="p-4 sm:p-6 my-6 bg-card border-border">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">
          Midazolam Pharmacology
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Imidazobenzodiazepine. pH-dependent ring opening: water-soluble &amp; injectable at pH&nbsp;3.5,
          lipid-soluble at physiological pH → rapid CNS penetration.
        </p>
  
        <Tabs defaultValue="receptor" className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-4">
            <TabsTrigger value="receptor">GABA-A</TabsTrigger>
            <TabsTrigger value="csht">CSHT &amp; Renal</TabsTrigger>
            <TabsTrigger value="metabolite">Metabolite</TabsTrigger>
            <TabsTrigger value="flumazenil">Flumazenil</TabsTrigger>
          </TabsList>
  
          {/* === RECEPTOR === */}
          <TabsContent value="receptor" className="space-y-3">
            <div className="rounded-lg border border-border bg-secondary/20 p-3">
              <svg viewBox="0 0 600 280" className="w-full h-auto">
                {/* membrane */}
                <rect x="0" y="120" width="600" height="40" fill="hsl(var(--muted))" opacity="0.35" />
                <text x="10" y="115" fontSize="9" className="fill-muted-foreground">extracellular</text>
                <text x="10" y="180" fontSize="9" className="fill-muted-foreground">intracellular</text>
  
                {/* Five subunits arranged around chloride channel */}
                {/* α1 */}
                <circle cx="220" cy="140" r="32" fill="hsl(var(--pharmacology))" opacity="0.85" />
                <text x="220" y="138" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">α₁</text>
                <text x="220" y="152" textAnchor="middle" fontSize="8" className="fill-primary-foreground">sedation</text>
  
                {/* α1 second subunit */}
                <circle cx="380" cy="140" r="32" fill="hsl(var(--pharmacology))" opacity="0.85" />
                <text x="380" y="143" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">α₁</text>
  
                {/* β2 */}
                <circle cx="160" cy="180" r="28" fill="hsl(var(--clinical))" opacity="0.7" />
                <text x="160" y="184" textAnchor="middle" fontSize="10" fontWeight="600" className="fill-primary-foreground">β₂</text>
  
                {/* β2 second */}
                <circle cx="440" cy="180" r="28" fill="hsl(var(--clinical))" opacity="0.7" />
                <text x="440" y="184" textAnchor="middle" fontSize="10" fontWeight="600" className="fill-primary-foreground">β₂</text>
  
                {/* γ2 */}
                <circle cx="300" cy="195" r="30" fill="hsl(var(--icu))" opacity="0.85" />
                <text x="300" y="198" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">γ₂</text>
  
                {/* Cl- channel pore */}
                <ellipse cx="300" cy="160" rx="18" ry="22" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeDasharray="2 2" />
                <text x="300" y="164" textAnchor="middle" fontSize="9" className="fill-foreground" fontWeight="600">Cl⁻</text>
  
                {/* GABA binding site at α-β interface */}
                <circle cx="190" cy="160" r="6" fill="hsl(var(--accent))">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <text x="190" y="105" textAnchor="middle" fontSize="9" className="fill-foreground" fontWeight="600">GABA site</text>
                <line x1="190" y1="108" x2="190" y2="152" stroke="hsl(var(--border))" />
  
                {/* Benzodiazepine binding site at α1-γ2 interface */}
                <circle cx="260" cy="170" r="7" fill="hsl(var(--destructive))">
                  <animate attributeName="r" values="6;9;6" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <text x="260" y="240" textAnchor="middle" fontSize="9" className="fill-foreground" fontWeight="600">BZD site</text>
                <text x="260" y="252" textAnchor="middle" fontSize="8" className="fill-muted-foreground">α₁ / γ₂ interface</text>
                <line x1="260" y1="178" x2="260" y2="232" stroke="hsl(var(--border))" />
  
                {/* Cl- ions flowing into cell */}
                {[0, 1, 2].map((i) => (
                  <circle key={i} cx="300" cy="140" r="2.5" fill="hsl(var(--primary))">
                    <animate attributeName="cy" values="135;220" dur="1.4s" repeatCount="indefinite" begin={`${i * 0.45}s`} />
                    <animate attributeName="opacity" values="1;1;0" dur="1.4s" repeatCount="indefinite" begin={`${i * 0.45}s`} />
                  </circle>
                ))}
  
                <text x="510" y="200" textAnchor="middle" fontSize="9" className="fill-muted-foreground">↑ Cl⁻ influx</text>
                <text x="510" y="212" textAnchor="middle" fontSize="9" className="fill-muted-foreground">→ hyperpolarisation</text>
              </svg>
            </div>
  
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <p className="font-semibold text-foreground mb-1">α-subunit subtype effects</p>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li><strong className="text-foreground">α₁</strong> — sedation, anterograde amnesia, anticonvulsant</li>
                  <li><strong className="text-foreground">α₂, α₃</strong> — anxiolysis, muscle relaxation</li>
                  <li><strong className="text-foreground">α₅</strong> — implicated in tolerance &amp; cognitive effects</li>
                  <li>Z-drugs (zolpidem) selective for α₁ → sedation without anxiolysis</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <p className="font-semibold text-foreground mb-1">Mechanism (allosteric)</p>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>BZDs bind α₁/γ₂ pocket — distinct from GABA site</li>
                  <li><strong className="text-foreground">↑ frequency</strong> of channel opening (barbiturates ↑ duration)</li>
                  <li>Requires GABA — no effect alone (ceiling effect, safer in OD)</li>
                  <li>Chloride influx → hyperpolarisation → ↓ neuronal firing</li>
                </ul>
              </div>
            </div>
          </TabsContent>
  
          {/* === CSHT === */}
          <TabsContent value="csht" className="space-y-4">
            <div className="rounded-lg border border-border bg-secondary/20 p-4 space-y-4">
              <div>
                <p className="text-xs font-semibold text-foreground mb-2">Infusion duration</p>
                <Slider value={infusionH} onValueChange={setInfusionH} min={1} max={120} step={1} />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>1 h</span>
                  <span className="font-mono text-foreground">{infusionH[0]} h</span>
                  <span>120 h</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground mb-2">eGFR (renal function)</p>
                <Slider value={eGFR} onValueChange={setEGFR} min={5} max={120} step={5} />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>5 (dialysis)</span>
                  <span className="font-mono text-foreground">{eGFR[0]} ml/min</span>
                  <span>120 (normal)</span>
                </div>
              </div>
  
              {/* CSHT bar */}
              <svg viewBox="0 0 600 80" className="w-full h-auto">
                <rect x="20" y="20" width="560" height="22" rx="3" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <rect x="20" y="20" width={Math.min(560, (effectiveCSHT / 720) * 560)} height="22" rx="3"
                  fill={effectiveCSHT > 240 ? "hsl(var(--destructive))" : effectiveCSHT > 120 ? "hsl(var(--clinical))" : "hsl(var(--primary))"}>
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="300" y="36" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                  CSHT ≈ {Math.round(effectiveCSHT)} min ({effectiveHrs} h)
                </text>
                <text x="20" y="60" fontSize="9" className="fill-muted-foreground">0</text>
                <text x="300" y="60" fontSize="9" textAnchor="middle" className="fill-muted-foreground">6 h</text>
                <text x="580" y="60" fontSize="9" textAnchor="end" className="fill-muted-foreground">12 h</text>
              </svg>
  
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div className="rounded p-2 bg-secondary/40 border border-border text-center">
                  <p className="text-muted-foreground">Bolus dose</p>
                  <p className="font-mono font-semibold text-foreground">t½ ≈ 1.5–2.5 h</p>
                </div>
                <div className="rounded p-2 bg-secondary/40 border border-border text-center">
                  <p className="text-muted-foreground">Vd</p>
                  <p className="font-mono font-semibold text-foreground">1.0–1.5 L/kg</p>
                </div>
                <div className="rounded p-2 bg-secondary/40 border border-border text-center">
                  <p className="text-muted-foreground">Protein binding</p>
                  <p className="font-mono font-semibold text-foreground">~96% (albumin)</p>
                </div>
              </div>
  
              <p className="text-[11px] text-muted-foreground">
                Midazolam itself shows only modest CSHT prolongation (compared to thiopentone or fentanyl), but
                <strong className="text-foreground"> active glucuronide metabolite accumulates rapidly in renal failure</strong> →
                effective sedative half-time can extend to <strong className="text-foreground">days</strong>, causing
                prolonged coma after infusion stops.
              </p>
            </div>
          </TabsContent>
  
          {/* === METABOLITE === */}
          <TabsContent value="metabolite" className="space-y-3">
            <div className="rounded-lg border border-border bg-secondary/20 p-3">
              <svg viewBox="0 0 620 220" className="w-full h-auto">
                {/* Midazolam */}
                <rect x="20" y="80" width="120" height="50" rx="4" fill="hsl(var(--pharmacology))" opacity="0.85" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x="80" y="100" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">Midazolam</text>
                <text x="80" y="115" textAnchor="middle" fontSize="8" className="fill-primary-foreground">parent (active)</text>
  
                {/* CYP3A4 */}
                <text x="180" y="95" fontSize="9" className="fill-foreground" fontWeight="600">CYP3A4</text>
                <text x="180" y="107" fontSize="8" className="fill-muted-foreground">(hepatic)</text>
                <path d="M 145 105 L 220 105" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#arrow-mid)" />
  
                {/* α-OH-midazolam */}
                <rect x="225" y="80" width="160" height="50" rx="4" fill="hsl(var(--clinical))" opacity="0.85" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x="305" y="100" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">α-OH-midazolam</text>
                <text x="305" y="115" textAnchor="middle" fontSize="8" className="fill-primary-foreground">~10% of parent activity</text>
  
                {/* UGT */}
                <text x="410" y="95" fontSize="9" className="fill-foreground" fontWeight="600">UGT</text>
                <text x="410" y="107" fontSize="8" className="fill-muted-foreground">(glucuronidation)</text>
                <path d="M 390 105 L 450 105" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#arrow-mid)" />
  
                {/* α-OH-midazolam glucuronide */}
                <rect x="455" y="65" width="150" height="80" rx="4" fill="hsl(var(--destructive))" opacity="0.8">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" stroke="hsl(var(--border))" strokeWidth="0.75" />
                </rect>
                <text x="530" y="90" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-primary-foreground">α-OH-midazolam-</text>
                <text x="530" y="103" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-primary-foreground">glucuronide</text>
                <text x="530" y="118" textAnchor="middle" fontSize="8" className="fill-primary-foreground">water-soluble · active</text>
                <text x="530" y="130" textAnchor="middle" fontSize="8" className="fill-primary-foreground">renally excreted</text>
  
                {/* Renal clearance arrow downward */}
                <path d="M 530 145 L 530 195" stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#arrow-mid)" />
                <text x="540" y="170" fontSize="9" className="fill-destructive" fontWeight="600">renal excretion</text>
                <text x="540" y="182" fontSize="8" className="fill-muted-foreground">(blocked in AKI/CKD)</text>
  
                {/* Accumulation back-loop */}
                <path d="M 530 200 Q 80 215 80 145" stroke="hsl(var(--destructive))" strokeWidth="1.5"
                  strokeDasharray="4 3" fill="none" markerEnd="url(#arrow-mid)" />
                <text x="280" y="212" textAnchor="middle" fontSize="9" className="fill-destructive" fontWeight="600">
                  accumulation → prolonged sedation in renal failure
                </text>
  
                <defs>
                  <marker id="arrow-mid" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--foreground))" />
                  </marker>
                </defs>
              </svg>
            </div>
  
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <Badge variant="outline" className="text-[10px] mb-2">Pharmacokinetics</Badge>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Hepatic <strong className="text-foreground">CYP3A4</strong> oxidation → α-hydroxy &amp; 4-hydroxy</li>
                  <li>α-OH-midazolam undergoes <strong className="text-foreground">glucuronidation (UGT)</strong></li>
                  <li>Glucuronide is <strong className="text-foreground">pharmacologically active</strong> (~10% parent potency at GABA-A)</li>
                  <li>Cleared <strong className="text-foreground">renally</strong> — accumulates in AKI/CKD</li>
                  <li>CYP3A4 inhibitors (erythromycin, diltiazem, grapefruit, HIV protease inhibitors) markedly potentiate</li>
                </ul>
              </div>
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                <Badge variant="destructive" className="text-[10px] mb-2">Clinical impact</Badge>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Prolonged ICU sedation in renal failure — coma days after stopping infusion</li>
                  <li>Why <strong className="text-foreground">PADIS guidelines deprioritise BZDs</strong> for ICU sedation</li>
                  <li>Elderly: ↓ clearance + ↑ brain sensitivity → reduce dose by ~30–50%</li>
                  <li>Hepatic failure: ↓ CYP3A4 → ↑ midazolam itself; combined with renal failure = worst case</li>
                  <li>Use <strong className="text-foreground">infusion only with daily sedation holds</strong> &amp; CAM-ICU monitoring</li>
                </ul>
              </div>
            </div>
          </TabsContent>
  
          {/* === FLUMAZENIL === */}
          <TabsContent value="flumazenil" className="space-y-3">
            <div className="rounded-lg border border-border bg-secondary/20 p-4 space-y-3">
              <p className="text-xs font-semibold text-foreground">
                Flumazenil — competitive BZD-site antagonist · t½ ≈ 40–80 min
              </p>
              <Slider value={flumazenilDose} onValueChange={setFlumazenilDose} min={0.1} max={1.0} step={0.1} />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0.1 mg</span>
                <span className="font-mono text-foreground text-sm">{flumazenilDose[0].toFixed(1)} mg IV</span>
                <span>1.0 mg</span>
              </div>
  
              <svg viewBox="0 0 600 180" className="w-full h-auto">
                {/* time axis */}
                <line x1="40" y1="150" x2="580" y2="150" stroke="hsl(var(--border))" />
                {[0, 30, 60, 90, 120, 180, 240].map((t) => {
                  const x = 40 + (t / 240) * 540;
                  return (
                        <g key={t}>
                      <line x1={x} y1="148" x2={x} y2="154" stroke="hsl(var(--border))" />
                      <text x={x} y="166" textAnchor="middle" fontSize="9" className="fill-muted-foreground">{t}</text>
                    </g>
    );
                })}
                <text x="310" y="178" textAnchor="middle" fontSize="9" className="fill-muted-foreground">time (min)</text>
  
                {/* Midazolam sedation curve (long, slow decay especially with metabolite) */}
                <path
                  d="M 40 50 Q 120 55 200 70 Q 320 90 480 115 Q 540 130 580 138"
                  stroke="hsl(var(--pharmacology))"
                  strokeWidth="2"
                  fill="none"
                />
                <text x="500" y="105" fontSize="9" className="fill-pharmacology" fontWeight="600">midazolam effect</text>
  
                {/* Flumazenil reversal — quick drop then return as flumazenil wears off */}
                <path
                  d={`M 40 50 L 70 ${50} L 70 30 Q ${70 + reversalMin * 2} 30 ${70 + reversalMin * 2.2} ${30 + reversalMin * 0.5}
                     Q ${100 + reversalMin * 3} 90 580 138`}
                  stroke="hsl(var(--destructive))"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 3"
                />
                <text x="100" y="22" fontSize="9" className="fill-destructive" fontWeight="600">flumazenil reversal</text>
  
                {/* arrow showing resedation window */}
                <line x1={70 + reversalMin * 2.2} y1="40" x2={70 + reversalMin * 2.2} y2="145"
                  stroke="hsl(var(--clinical))" strokeWidth="1" strokeDasharray="2 2" />
                <text x={70 + reversalMin * 2.2 + 6} y="50" fontSize="9" className="fill-clinical" fontWeight="600">
                  ~{reversalMin} min
                </text>
                <text x={70 + reversalMin * 2.2 + 6} y="62" fontSize="8" className="fill-muted-foreground">
                  reversal duration
                </text>
              </svg>
  
              <div className={`rounded-md p-3 border ${resedationRisk ? "bg-destructive/10 border-destructive/30" : "bg-secondary/40 border-border"}`}>
                <p className="text-xs font-semibold text-foreground">
                  {resedationRisk ? "⚠ High resedation risk" : "Reversal achieved"}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Midazolam (and active metabolite) outlive flumazenil ({reversalMin} min). Patient may
                  <strong className="text-foreground"> resedate</strong> when flumazenil wears off — observe for
                  ≥ 2 h, or give a flumazenil infusion (0.1–0.4 mg/h). Risk highest with renal failure, large
                  midazolam dose, or low flumazenil dose.
                </p>
              </div>
            </div>
  
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <p className="font-semibold text-foreground mb-1">Flumazenil dosing</p>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>200 µg IV over 15 s, then 100 µg every 60 s (max 1 mg, 2 mg in OD)</li>
                  <li>Onset 1–2 min · peak 6–10 min · duration 30–60 min</li>
                  <li>Hepatic metabolism — minimally affected by renal function</li>
                  <li>Infusion 100–400 µg/h if recurrent sedation</li>
                </ul>
              </div>
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                <p className="font-semibold text-foreground mb-1">Cautions / contraindications</p>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li><strong className="text-foreground">Chronic BZD use</strong> → withdrawal seizures</li>
                  <li><strong className="text-foreground">Mixed overdose</strong> with TCAs / proconvulsants → seizures, arrhythmias</li>
                  <li>Raised ICP — abrupt rise in cerebral metabolic rate</li>
                  <li>Status epilepticus controlled by BZDs</li>
                  <li>Not for routine end-of-procedure reversal — risk &gt; benefit</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </DiagramFigure>
  );
};

export default MidazolamPharmacologyDiagram;
