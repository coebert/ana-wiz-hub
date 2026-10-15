import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { InlineRef } from "@/components/references/InlineRef";
import { breathTiming } from "@/lib/peep-teaching";

export default function PEEPTimingDiagram() {
  const [rate, setRate] = useState(12);
  const [ti, setTi] = useState(1);
  const timing = breathTiming(rate, ti);
  const fraction = timing ? ti / timing.cycle : 1;
  return <DiagramFigure id="peep-breath-timing" title="Breath timing and the space left for expiration" description="A timing calculation for a fixed inspiratory time. It does not predict auto-PEEP, recruitability or a safe patient setting.">
    <div className="space-y-4 border border-border rounded-lg p-4" role="group" aria-label="PEEP breath timing explorer">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-foreground">Respiratory rate: <strong>{rate} breaths/min</strong><input aria-label="Respiratory rate" type="range" min="6" max="30" step="1" value={rate} onChange={e => setRate(Number(e.target.value))} className="mt-3 block w-full accent-primary" /></label>
        <label className="text-sm text-foreground">Inspiratory time: <strong>{ti.toFixed(1)} s</strong><input aria-label="Inspiratory time" type="range" min="0.5" max="2.5" step="0.1" value={ti} onChange={e => setTi(Number(e.target.value))} className="mt-3 block w-full accent-primary" /></label>
      </div>
      <svg viewBox="0 0 600 110" className="w-full h-auto" role="img" aria-labelledby="peep-timing-title peep-timing-desc">
        <title id="peep-timing-title">One breath cycle</title><desc id="peep-timing-desc">Inspiration followed by the remaining expiratory time. Increasing respiratory rate at the same inspiratory time leaves less time to breathe out.</desc>
        <rect x="10" y="32" width="580" height="28" rx="3" className="fill-muted" />
        <rect x="10" y="32" width={580 * fraction} height="28" rx="3" className="fill-primary" />
        <text x="10" y="20" className="fill-foreground" fontSize="13">Inspiration</text>
        <text x="590" y="20" textAnchor="end" className="fill-foreground" fontSize="13">Expiration</text>
        <text x="10" y="83" className="fill-muted-foreground" fontSize="12">0 s</text>
        <text x="590" y="83" textAnchor="end" className="fill-muted-foreground" fontSize="12">{(60 / rate).toFixed(2)} s per cycle</text>
      </svg>
      <p role="status" className="font-mono text-sm text-foreground">{timing ? `Expiratory time ${timing.expiration.toFixed(2)} s · I:E 1:${timing.expiratoryRatio.toFixed(2)}` : "No expiratory time remains: inspiratory time must be shorter than the breath cycle."}</p>
      <p className="text-sm text-muted-foreground">In severe airflow obstruction, more time for expiration can reduce air trapping, but waveform inspection and patient assessment are still essential. Longer time alone cannot establish that all lung regions have emptied.<InlineRef topicId="peep-management" refLabel="Stather 2005 expiration" /></p>
      <Button variant="outline" size="sm" onClick={() => { setRate(12); setTi(1); }}><RotateCcw aria-hidden="true" focusable={false} />Reset timing</Button>
    </div>
  </DiagramFigure>;
}