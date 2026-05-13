import { DiagramFigure } from "./_shared/DiagramFigure";
const AxialView = () => (
  <svg viewBox="0 0 520 420" className="w-full">
    {/* Background body outline — thoracic cross-section */}
    <ellipse cx="260" cy="200" rx="220" ry="170" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--border))" strokeWidth="2" />

    {/* Orientation */}
    <text x="260" y="22" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">ANTERIOR</text>
    <text x="260" y="390" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">POSTERIOR</text>
    <text x="28" y="200" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">RIGHT</text>
    <text x="492" y="200" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">LEFT</text>

    {/* Sternum */}
    <rect x="238" y="38" width="44" height="18" rx="4" fill="hsl(var(--muted-foreground)/0.12)" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
    <text x="260" y="50" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">Sternum</text>

    {/* Left lung */}
    <ellipse cx="145" cy="185" rx="58" ry="62" fill="hsl(200 30% 85% / 0.2)" stroke="hsl(200 30% 60%)" strokeWidth="1" strokeDasharray="3 2" />
    <text x="145" y="185" fontSize="8" fill="hsl(200 30% 60%)" textAnchor="middle">Left lung</text>

    {/* Right lung */}
    <ellipse cx="375" cy="185" rx="58" ry="62" fill="hsl(200 30% 85% / 0.2)" stroke="hsl(200 30% 60%)" strokeWidth="1" strokeDasharray="3 2" />
    <text x="375" y="185" fontSize="8" fill="hsl(200 30% 60%)" textAnchor="middle">Right lung</text>

    {/* Trachea */}
    <circle cx="260" cy="120" r="20" fill="hsl(200 40% 90% / 0.3)" stroke="hsl(200 40% 50%)" strokeWidth="1.5" />
    <text x="260" y="118" fontSize="7" fill="hsl(200 40% 50%)" textAnchor="middle">Trachea</text>
    <text x="260" y="127" fontSize="6" fill="hsl(200 40% 50%)" textAnchor="middle">(carina)</text>

    {/* Vertebral body (posterior) */}
    <rect x="225" y="300" width="70" height="48" rx="8" fill="hsl(var(--muted-foreground)/0.15)" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
    <text x="260" y="322" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">Vertebral</text>
    <text x="260" y="334" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">body</text>

    {/* Spinal cord */}
    <circle cx="260" cy="285" r="10" fill="hsl(var(--muted-foreground)/0.2)" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
    <text x="260" y="288" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">SC</text>

    {/* Descending Aorta */}
    <circle cx="200" cy="260" r="28" fill="hsl(0 65% 50% / 0.12)" stroke="hsl(0 65% 50%)" strokeWidth="2" />
    <circle cx="200" cy="272" r="3" fill="hsl(0 65% 50%)" />

    {/* Aorta label — positioned to the left, outside the circle */}
    <line x1="175" y1="250" x2="120" y2="230" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x="118" y="225" fontSize="8" fill="hsl(0 65% 50%)" textAnchor="end" fontWeight="bold">Descending</text>
    <text x="118" y="236" fontSize="8" fill="hsl(0 65% 50%)" textAnchor="end" fontWeight="bold">Aorta</text>
    <text x="118" y="248" fontSize="6.5" fill="hsl(0 65% 50%)" textAnchor="end">Blood flow ⊙ (out of page)</text>

    {/* Oesophagus — between trachea and aorta */}
    <ellipse cx="260" cy="215" rx="16" ry="13" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="2" />

    {/* Oesophagus label — positioned to the right */}
    <line x1="276" y1="210" x2="310" y2="195" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x="315" y="192" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">Oesophagus</text>

    {/* Doppler probe inside oesophagus */}
    <rect x="253" y="207" width="14" height="16" rx="5" fill="hsl(var(--primary)/0.35)" stroke="hsl(var(--primary))" strokeWidth="1.5" />

    {/* Probe label */}
    <line x1="267" y1="220" x2="315" y2="230" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x="318" y="228" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">Doppler probe</text>
    <text x="318" y="238" fontSize="6" fill="hsl(var(--muted-foreground))">4 MHz CW Doppler</text>

    {/* Doppler beam — angled toward aorta */}
    <polygon points="257,222 210,248 210,260 215,268 257,222"
      fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 2" />
    <text x="222" y="243" fontSize="6.5" fill="hsl(var(--primary))" fontWeight="600" transform="rotate(-30, 222, 243)">Doppler beam</text>

    {/* 45° angle arc */}
    <path d="M 257,210 A 12,12 0 0,0 248,222" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.75" />
    <text x="240" y="210" fontSize="5.5" fill="hsl(var(--primary))">45°</text>

    {/* Callout: probe insertion */}
    <rect x="348" y="95" width="150" height="40" rx="5" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
    <text x="423" y="110" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">Probe at 35-40 cm from teeth</text>
    <text x="423" y="121" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Rotated to face aorta (max signal)</text>
    <text x="423" y="131" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Measures descending aortic velocity</text>
    <line x1="348" y1="120" x2="276" y2="205" stroke="hsl(var(--border))" strokeWidth="0.75" />

    {/* Callout: Doppler equation */}
    <rect x="55" y="310" width="148" height="52" rx="5" fill="hsl(0 65% 50% / 0.05)" stroke="hsl(0 65% 50% / 0.3)" strokeWidth="1" />
    <text x="129" y="325" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">Doppler Equation</text>
    <text x="129" y="337" fontSize="6.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">Δf = 2 · f₀ · v · cos θ / c</text>
    <text x="129" y="349" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">v = blood velocity, θ ≈ 45°</text>
    <text x="129" y="359" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Frequency shift → velocity → flow</text>

    <text x="260" y="405" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Axial (transverse) cross-section</text>
    <text x="260" y="416" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">T5-T6 level, viewed from below</text>
  </svg>
);

const SagittalView = () => (
  <svg viewBox="0 0 520 420" className="w-full">
    {/* Body outline — sagittal thorax */}
    <path d="M 70 55 Q 110 35 240 30 Q 370 35 410 55 L 420 340 Q 370 360 240 365 Q 110 360 60 340 Z"
      fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1.5" />

    {/* Orientation */}
    <text x="90" y="25" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">ANTERIOR</text>
    <text x="380" y="25" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">POSTERIOR</text>
    <text x="240" y="18" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">SUPERIOR ↑</text>
    <text x="240" y="378" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">↓ INFERIOR</text>

    {/* ─── Vertebral column (far right) ─── */}
    {[60, 100, 140, 180, 220, 260, 300].map((y, i) => (
      <g key={i}>
        <rect x="380" y={y} width="35" height="32" rx="5" fill="hsl(var(--muted-foreground)/0.12)" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="397" y={y + 20} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">T{i + 2}</text>
      </g>
    ))}
    <text x="397" y="348" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">Spine</text>

    {/* ─── Descending Aorta (vertical tube, right of centre) ─── */}
    <rect x="330" y="50" width="24" height="290" rx="11" fill="hsl(0 65% 50% / 0.10)" stroke="hsl(0 65% 50%)" strokeWidth="2" />
    {/* Flow arrow */}
    <defs>
      <marker id="sagArrowRed" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="hsl(0 65% 50%)" />
      </marker>
    </defs>
    <line x1="342" y1="65" x2="342" y2="325" stroke="hsl(0 65% 50%)" strokeWidth="1" markerEnd="url(#sagArrowRed)" />
    {/* Aorta label — outside the tube */}
    <text x="342" y="355" fontSize="7" fill="hsl(0 65% 50%)" textAnchor="middle" fontWeight="bold">Descending</text>
    <text x="342" y="365" fontSize="7" fill="hsl(0 65% 50%)" textAnchor="middle" fontWeight="bold">Aorta ↓</text>

    {/* ─── Oesophagus (left of aorta, well separated) ─── */}
    <rect x="275" y="50" width="20" height="290" rx="9" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    {/* Oesophagus label — outside, to the left */}
    <text x="268" y="100" fontSize="7" fill="hsl(var(--primary))" textAnchor="end" fontWeight="bold">Oesophagus</text>
    <line x1="270" y1="98" x2="275" y2="98" stroke="hsl(var(--primary))" strokeWidth="0.75" />

    {/* ─── Doppler probe inside oesophagus ─── */}
    <rect x="278" y="175" width="14" height="50" rx="6" fill="hsl(var(--primary)/0.35)" stroke="hsl(var(--primary))" strokeWidth="2" />
    {/* Probe label */}
    <text x="268" y="203" fontSize="7" fill="hsl(var(--primary))" textAnchor="end" fontWeight="bold">Probe</text>
    <line x1="270" y1="201" x2="278" y2="201" stroke="hsl(var(--primary))" strokeWidth="0.75" />

    {/* Probe cable going up */}
    <line x1="285" y1="175" x2="285" y2="50" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="3 2" />
    <text x="285" y="42" fontSize="7" fill="hsl(var(--primary))" textAnchor="middle">↑ to mouth</text>

    {/* ─── Doppler beam (cone from probe toward aorta) ─── */}
    <polygon points="292,192 330,182 330,212"
      fill="hsl(var(--primary)/0.10)" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 2" />
    {/* Beam label — below the cone, clear of structures */}
    <text x="310" y="225" fontSize="6.5" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="600">Doppler beam</text>
    <text x="310" y="235" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle">(45° to flow)</text>

    {/* ─── Trachea (anterior, upper portion) ─── */}
    <rect x="215" y="50" width="28" height="115" rx="12" fill="hsl(200 40% 90% / 0.25)" stroke="hsl(200 40% 50%)" strokeWidth="1.5" />
    <text x="208" y="115" fontSize="7" fill="hsl(200 40% 50%)" textAnchor="end">Trachea</text>
    <line x1="210" y1="113" x2="215" y2="113" stroke="hsl(200 40% 50%)" strokeWidth="0.75" />
    {/* Carina / bifurcation */}
    <line x1="226" y1="165" x2="210" y2="188" stroke="hsl(200 40% 50%)" strokeWidth="1.5" />
    <line x1="234" y1="165" x2="245" y2="188" stroke="hsl(200 40% 50%)" strokeWidth="1.5" />
    <text x="228" y="180" fontSize="6" fill="hsl(200 40% 50%)" textAnchor="middle">Carina</text>

    {/* ─── Heart (anterior) ─── */}
    <ellipse cx="155" cy="185" rx="55" ry="50" fill="hsl(0 50% 50% / 0.06)" stroke="hsl(0 50% 50% / 0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
    <text x="155" y="182" fontSize="9" fill="hsl(0 50% 50% / 0.5)" textAnchor="middle">Heart</text>
    <text x="155" y="195" fontSize="6" fill="hsl(0 50% 50% / 0.4)" textAnchor="middle">(LV posterior)</text>

    {/* Aortic arch */}
    <path d="M 175 135 Q 200 65 255 58 Q 300 52 330 55" fill="none" stroke="hsl(0 65% 50%)" strokeWidth="2" strokeDasharray="4 3" />
    <text x="200" y="82" fontSize="7" fill="hsl(0 65% 50%)" textAnchor="middle">Aortic arch</text>

    {/* ─── Depth markings on probe cable ─── */}
    {[90, 115, 140, 165].map((y, i) => (
      <g key={i}>
        <line x1="278" y1={y} x2="272" y2={y} stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="268" y={y + 3} fontSize="5.5" fill="hsl(var(--primary))" textAnchor="end">{25 + i * 5} cm</text>
      </g>
    ))}

    {/* T5-T6 level indicator */}
    <line x1="75" y1="197" x2="420" y2="197" stroke="hsl(var(--foreground)/0.12)" strokeWidth="0.75" strokeDasharray="6 3" />
    <text x="78" y="193" fontSize="7" fill="hsl(var(--foreground))" fontWeight="600">T5-T6</text>
    <text x="78" y="204" fontSize="5.5" fill="hsl(var(--muted-foreground))">optimal level</text>

    {/* Annotation callout */}
    <rect x="80" y="265" width="148" height="55" rx="5" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
    <text x="154" y="280" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">Probe tip at T5-T6</text>
    <text x="154" y="292" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Oesophagus lies directly</text>
    <text x="154" y="302" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">anterior to descending aorta</text>
    <text x="154" y="312" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">at this level — ideal window</text>

    <text x="240" y="400" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Sagittal (lateral) view</text>
    <text x="240" y="412" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">Left para-sagittal plane</text>
  </svg>
);

const OesophagealDopplerDiagram = () => {
  return (
        <div className="space-y-4 my-8">
      <h3 className="text-xl font-serif font-bold text-foreground">Oesophageal Doppler — Probe Placement & Principle</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Two views showing the anatomical relationship between the oesophagus and descending aorta, with the Doppler probe positioned to insonate aortic blood flow at the T5-T6 level.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <AxialView />
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <SagittalView />
        </div>
      </div>

      {/* Velocity-time waveform */}
      <div className="rounded-xl border border-border bg-card p-4">
        <svg viewBox="0 0 500 100" className="w-full">
          <text x="250" y="12" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Aortic Velocity-Time Waveform</text>

          {/* Axes */}
          <line x1="50" y1="85" x2="470" y2="85" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
          <line x1="50" y1="85" x2="50" y2="22" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
          <text x="45" y="55" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="end" transform="rotate(-90,45,55)">Velocity</text>
          <text x="470" y="95" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="end">Time →</text>

          {/* Waveforms */}
          <path d="M 70 85 Q 80 82 90 72 Q 115 28 140 25 Q 160 23 170 35 Q 185 60 200 80 Q 205 85 210 85"
            fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
          <path d="M 230 85 Q 240 82 250 72 Q 275 28 300 25 Q 320 23 330 35 Q 345 60 360 80 Q 365 85 370 85"
            fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />

          {/* FTc */}
          <line x1="70" y1="88" x2="70" y2="94" stroke="hsl(var(--foreground))" strokeWidth="0.75" />
          <line x1="210" y1="88" x2="210" y2="94" stroke="hsl(var(--foreground))" strokeWidth="0.75" />
          <line x1="70" y1="92" x2="210" y2="92" stroke="hsl(var(--foreground))" strokeWidth="0.75" />
          <text x="140" y="100" fontSize="6" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">FTc (corrected flow time)</text>

          {/* PV */}
          <line x1="140" y1="25" x2="140" y2="85" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="144" y="22" fontSize="6" fill="hsl(var(--foreground))" fontWeight="600">PV</text>

          {/* CO box */}
          <rect x="380" y="20" width="110" height="42" rx="4" fill="hsl(var(--primary)/0.05)" stroke="hsl(var(--primary)/0.2)" strokeWidth="0.75" />
          <text x="435" y="34" fontSize="6.5" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">CO = SV × HR</text>
          <text x="435" y="45" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">SV = VTI × CSA (aorta)</text>
          <text x="435" y="55" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">VTI = area under curve</text>
        </svg>
      </div>

      {/* Clinical interpretation */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs font-semibold text-primary mb-2">Key Measurements</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li><strong className="text-foreground">FTc</strong> — corrected flow time (normal 330-360 ms). &lt;330 ms → hypovolaemia; &gt;360 ms → vasodilation or myocardial failure</li>
            <li><strong className="text-foreground">Peak Velocity (PV)</strong> — reflects LV contractility (normal 50-120 cm/s). Decreases with age, negative inotropy</li>
            <li><strong className="text-foreground">Stroke Distance (SD)</strong> — VTI of waveform, proportional to stroke volume</li>
            <li><strong className="text-foreground">Minute Distance (MD)</strong> — SD × HR, proportional to cardiac output</li>
          </ul>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <p className="text-xs font-semibold text-foreground mb-2">Assumptions & Limitations</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>Assumes aortic CSA is constant (estimated by nomogram from age, height, weight)</li>
            <li>Only measures descending aortic flow (~70% of CO) — assumes fixed split</li>
            <li>Angle-dependent — θ must remain ~45° for accuracy</li>
            <li>Requires GA or heavy sedation — probe poorly tolerated awake</li>
            <li>Unreliable with aortic coarctation, IABP, or severe aortic regurgitation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OesophagealDopplerDiagram;
