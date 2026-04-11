const AxialView = () => (
  <svg viewBox="0 0 500 400" className="w-full">
    {/* Background body outline — thoracic cross-section */}
    <ellipse cx="250" cy="185" rx="210" ry="160" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--border))" strokeWidth="2" />

    {/* Vertebral body (posterior) */}
    <rect x="215" y="275" width="70" height="45" rx="8" fill="hsl(var(--muted-foreground)/0.15)" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
    <text x="250" y="300" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">Vertebral body</text>

    {/* Spinal cord */}
    <circle cx="250" cy="265" r="9" fill="hsl(var(--muted-foreground)/0.2)" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
    <text x="250" y="268" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="middle">SC</text>

    {/* Descending Aorta */}
    <circle cx="205" cy="248" r="24" fill="hsl(0 65% 50% / 0.15)" stroke="hsl(0 65% 50%)" strokeWidth="2.5" />
    <text x="205" y="245" fontSize="7" fill="hsl(0 65% 50%)" textAnchor="middle" fontWeight="bold">Descending</text>
    <text x="205" y="255" fontSize="7" fill="hsl(0 65% 50%)" textAnchor="middle" fontWeight="bold">Aorta</text>
    <circle cx="205" cy="263" r="3" fill="hsl(0 65% 50%)" />
    <text x="218" y="267" fontSize="5" fill="hsl(0 65% 50%)">flow ⊙</text>

    {/* Oesophagus */}
    <ellipse cx="250" cy="218" rx="15" ry="11" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="2" />
    <text x="250" y="221" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold">Oesoph.</text>

    {/* Probe */}
    <rect x="244" y="210" width="12" height="16" rx="4" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    <text x="250" y="222" fontSize="4.5" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold">Probe</text>

    {/* Doppler beam */}
    <line x1="248" y1="224" x2="215" y2="242" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 2" />
    <line x1="248" y1="224" x2="195" y2="238" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />
    <line x1="248" y1="224" x2="218" y2="256" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />
    <text x="218" y="235" fontSize="6" fill="hsl(var(--primary))" fontWeight="600" transform="rotate(-25, 218, 235)">Doppler beam</text>

    {/* Trachea */}
    <circle cx="250" cy="140" r="17" fill="hsl(200 40% 90% / 0.3)" stroke="hsl(200 40% 50%)" strokeWidth="1.5" />
    <text x="250" y="138" fontSize="6.5" fill="hsl(200 40% 50%)" textAnchor="middle">Trachea</text>
    <text x="250" y="147" fontSize="5" fill="hsl(200 40% 50%)" textAnchor="middle">(carina)</text>

    {/* Lungs */}
    <ellipse cx="140" cy="170" rx="52" ry="55" fill="hsl(200 30% 85% / 0.2)" stroke="hsl(200 30% 60%)" strokeWidth="1" strokeDasharray="3 2" />
    <text x="140" y="168" fontSize="7" fill="hsl(200 30% 60%)" textAnchor="middle">Left lung</text>
    <ellipse cx="360" cy="170" rx="52" ry="55" fill="hsl(200 30% 85% / 0.2)" stroke="hsl(200 30% 60%)" strokeWidth="1" strokeDasharray="3 2" />
    <text x="360" y="168" fontSize="7" fill="hsl(200 30% 60%)" textAnchor="middle">Right lung</text>

    {/* Sternum */}
    <rect x="230" y="38" width="40" height="16" rx="4" fill="hsl(var(--muted-foreground)/0.12)" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
    <text x="250" y="49" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Sternum</text>

    {/* Orientation */}
    <text x="250" y="30" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">ANTERIOR</text>
    <text x="250" y="348" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">POSTERIOR</text>
    <text x="30" y="185" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">RIGHT</text>
    <text x="470" y="185" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">LEFT</text>

    {/* Callout */}
    <line x1="262" y1="210" x2="340" y2="90" stroke="hsl(var(--border))" strokeWidth="0.8" />
    <rect x="340" y="72" width="140" height="38" rx="5" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
    <text x="410" y="85" fontSize="6.5" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">Probe at 35-40 cm from teeth</text>
    <text x="410" y="96" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Rotated to face aorta (max signal)</text>
    <text x="410" y="105" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">4 MHz continuous-wave Doppler</text>

    {/* Doppler equation */}
    <line x1="190" y1="270" x2="60" y2="290" stroke="hsl(var(--border))" strokeWidth="0.8" />
    <rect x="15" y="282" width="148" height="48" rx="5" fill="hsl(0 65% 50% / 0.05)" stroke="hsl(0 65% 50% / 0.3)" strokeWidth="1" />
    <text x="89" y="295" fontSize="6.5" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">Doppler Equation</text>
    <text x="89" y="306" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Δf = 2 · f₀ · v · cos θ / c</text>
    <text x="89" y="316" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">v = blood velocity, θ ≈ 45°</text>
    <text x="89" y="326" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">Frequency shift → velocity → flow</text>

    <text x="250" y="370" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Axial (transverse) cross-section</text>
    <text x="250" y="382" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">T5-T6 level, viewed from below</text>
  </svg>
);

const SagittalView = () => (
  <svg viewBox="0 0 500 400" className="w-full">
    {/* Body outline — sagittal thorax */}
    <path d="M 80 50 Q 120 30 250 25 Q 380 30 420 50 L 430 340 Q 380 360 250 365 Q 120 360 70 340 Z"
      fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1.5" />

    {/* ─── Vertebral column (posterior, right side) ─── */}
    {[55, 95, 135, 175, 215, 255, 295].map((y, i) => (
      <g key={i}>
        <rect x="350" y={y} width="50" height="32" rx="5" fill="hsl(var(--muted-foreground)/0.12)" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="375" y={y + 20} fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">T{i + 2}</text>
      </g>
    ))}
    <text x="375" y="345" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">Spine</text>

    {/* ─── Descending Aorta (runs parallel anterior to spine) ─── */}
    <rect x="310" y="45" width="22" height="290" rx="10" fill="hsl(0 65% 50% / 0.12)" stroke="hsl(0 65% 50%)" strokeWidth="2" />
    <text x="321" y="200" fontSize="7" fill="hsl(0 65% 50%)" textAnchor="middle" fontWeight="bold" transform="rotate(-90, 321, 200)">DESCENDING AORTA</text>
    {/* Flow arrow downward */}
    <line x1="321" y1="60" x2="321" y2="320" stroke="hsl(0 65% 50%)" strokeWidth="1.2" markerEnd="url(#sagArrowRed)" />

    {/* ─── Oesophagus (anterior to aorta) ─── */}
    <rect x="270" y="45" width="18" height="290" rx="8" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    <text x="279" y="200" fontSize="6.5" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold" transform="rotate(-90, 279, 200)">OESOPHAGUS</text>

    {/* ─── Doppler probe inside oesophagus ─── */}
    <rect x="273" y="165" width="12" height="55" rx="5" fill="hsl(var(--primary)/0.35)" stroke="hsl(var(--primary))" strokeWidth="2" />
    <text x="279" y="195" fontSize="5" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold" transform="rotate(-90, 279, 195)">PROBE</text>

    {/* Probe cable going up through oesophagus & out mouth */}
    <line x1="279" y1="165" x2="279" y2="45" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="3 2" />
    <text x="279" y="38" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle">↑ to mouth</text>

    {/* ─── Doppler beam from probe toward aorta ─── */}
    <polygon points="285,185 310,175 310,205" fill="hsl(var(--primary)/0.12)" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 2" />
    <text x="300" y="215" fontSize="5.5" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="600">Beam</text>
    <text x="300" y="223" fontSize="5" fill="hsl(var(--primary))" textAnchor="middle">(45° to flow)</text>

    {/* ─── Trachea (anterior to oesophagus, upper portion) ─── */}
    <rect x="220" y="45" width="30" height="120" rx="12" fill="hsl(200 40% 90% / 0.25)" stroke="hsl(200 40% 50%)" strokeWidth="1.5" />
    <text x="235" y="110" fontSize="6" fill="hsl(200 40% 50%)" textAnchor="middle" transform="rotate(-90, 235, 110)">TRACHEA</text>
    {/* Carina / bifurcation */}
    <line x1="232" y1="165" x2="210" y2="190" stroke="hsl(200 40% 50%)" strokeWidth="1.5" />
    <line x1="238" y1="165" x2="250" y2="190" stroke="hsl(200 40% 50%)" strokeWidth="1.5" />
    <text x="230" y="175" fontSize="5" fill="hsl(200 40% 50%)" textAnchor="middle">Carina</text>

    {/* ─── Heart (anterior, left side) ─── */}
    <ellipse cx="160" cy="175" rx="60" ry="55" fill="hsl(0 50% 50% / 0.06)" stroke="hsl(0 50% 50% / 0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
    <text x="160" y="170" fontSize="8" fill="hsl(0 50% 50% / 0.6)" textAnchor="middle">Heart</text>
    <text x="160" y="182" fontSize="6" fill="hsl(0 50% 50% / 0.4)" textAnchor="middle">(LV posterior)</text>

    {/* Aortic arch */}
    <path d="M 180 125 Q 200 60 260 55 Q 300 50 315 55" fill="none" stroke="hsl(0 65% 50%)" strokeWidth="2" strokeDasharray="4 3" />
    <text x="240" y="70" fontSize="6" fill="hsl(0 65% 50%)" textAnchor="middle">Aortic arch</text>

    {/* ─── Depth markings on probe cable ─── */}
    {[85, 105, 125, 145].map((y, i) => (
      <g key={i}>
        <line x1="274" y1={y} x2="270" y2={y} stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="266" y={y + 2} fontSize="4.5" fill="hsl(var(--primary))" textAnchor="end">{25 + i * 5} cm</text>
      </g>
    ))}

    {/* T5-T6 level indicator */}
    <line x1="100" y1="190" x2="430" y2="190" stroke="hsl(var(--foreground)/0.15)" strokeWidth="0.8" strokeDasharray="6 3" />
    <text x="95" y="188" fontSize="6" fill="hsl(var(--foreground))" textAnchor="end" fontWeight="600">T5-T6</text>
    <text x="95" y="197" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="end">optimal level</text>

    {/* Orientation */}
    <text x="115" y="25" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">ANTERIOR</text>
    <text x="395" y="25" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">POSTERIOR</text>
    <text x="250" y="15" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">SUPERIOR ↑</text>
    <text x="250" y="358" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">↓ INFERIOR</text>

    {/* Annotation callouts */}
    <rect x="90" y="260" width="138" height="58" rx="5" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
    <text x="159" y="274" fontSize="6.5" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">Probe tip at T5-T6</text>
    <text x="159" y="285" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">Oesophagus lies directly</text>
    <text x="159" y="295" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">anterior to descending aorta</text>
    <text x="159" y="305" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">at this level — ideal window</text>
    <text x="159" y="315" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">for Doppler insonation</text>

    <text x="250" y="380" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Sagittal (lateral) view</text>
    <text x="250" y="392" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">Left para-sagittal plane</text>

    <defs>
      <marker id="sagArrowRed" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill="hsl(0 65% 50%)" />
      </marker>
    </defs>
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
          <line x1="70" y1="88" x2="70" y2="94" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <line x1="210" y1="88" x2="210" y2="94" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <line x1="70" y1="92" x2="210" y2="92" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <text x="140" y="100" fontSize="6" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">FTc (corrected flow time)</text>

          {/* PV */}
          <line x1="140" y1="25" x2="140" y2="85" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="144" y="22" fontSize="6" fill="hsl(var(--foreground))" fontWeight="600">PV</text>

          {/* CO box */}
          <rect x="380" y="20" width="110" height="42" rx="4" fill="hsl(var(--primary)/0.05)" stroke="hsl(var(--primary)/0.2)" strokeWidth="0.8" />
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
