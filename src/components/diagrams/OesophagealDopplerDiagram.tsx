const OesophagealDopplerDiagram = () => {
  return (
    <div className="space-y-4 my-8">
      <h3 className="text-xl font-serif font-bold text-foreground">Oesophageal Doppler — Probe Placement & Principle</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Cross-sectional view at T5-T6 level showing the anatomical relationship between the oesophagus and descending aorta, with the Doppler probe positioned to insonate aortic blood flow.
      </p>

      <div className="rounded-xl border border-border bg-card p-4">
        <svg viewBox="0 0 500 480" className="w-full">
          {/* Background body outline — thoracic cross-section */}
          <ellipse cx="250" cy="200" rx="210" ry="170" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--border))" strokeWidth="2" />
          <text x="250" y="385" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">
            Thoracic cross-section at T5-T6 level (viewed from below)
          </text>

          {/* Vertebral body (posterior) */}
          <rect x="215" y="290" width="70" height="50" rx="8" fill="hsl(var(--muted-foreground)/0.15)" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
          <text x="250" y="320" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">Vertebral</text>
          <text x="250" y="330" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">body</text>

          {/* Spinal cord */}
          <circle cx="250" cy="280" r="10" fill="hsl(var(--muted-foreground)/0.2)" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
          <text x="250" y="283" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="middle">SC</text>

          {/* Descending Aorta — left anterior to vertebral body */}
          <circle cx="205" cy="260" r="26" fill="hsl(0 65% 50% / 0.15)" stroke="hsl(0 65% 50%)" strokeWidth="2.5" />
          <text x="205" y="256" fontSize="7" fill="hsl(0 65% 50%)" textAnchor="middle" fontWeight="bold">Descending</text>
          <text x="205" y="266" fontSize="7" fill="hsl(0 65% 50%)" textAnchor="middle" fontWeight="bold">Aorta</text>

          {/* Blood flow direction — out of page (dot in circle) */}
          <circle cx="205" cy="275" r="3" fill="hsl(0 65% 50%)" />
          <text x="218" y="279" fontSize="5.5" fill="hsl(0 65% 50%)">flow ⊙</text>

          {/* Oesophagus — anterior and slightly right of aorta */}
          <ellipse cx="250" cy="230" rx="16" ry="12" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="250" y="233" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold">Oesoph.</text>

          {/* Doppler probe inside oesophagus */}
          <rect x="244" y="222" width="12" height="18" rx="4" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <text x="250" y="235" fontSize="4.5" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="bold">Probe</text>

          {/* Doppler beam — angled posterolaterally toward aorta at ~45° */}
          <line x1="248" y1="238" x2="215" y2="255" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="248" y1="238" x2="195" y2="250" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />
          <line x1="248" y1="238" x2="218" y2="268" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />
          {/* Beam cone label */}
          <text x="218" y="247" fontSize="6" fill="hsl(var(--primary))" fontWeight="600" transform="rotate(-25, 218, 247)">Doppler beam</text>
          <text x="193" y="290" fontSize="5.5" fill="hsl(var(--primary))" textAnchor="middle" fontStyle="italic">(45° angle)</text>

          {/* Trachea — anterior midline */}
          <circle cx="250" cy="150" r="18" fill="hsl(200 40% 90% / 0.3)" stroke="hsl(200 40% 50%)" strokeWidth="1.5" />
          <text x="250" y="148" fontSize="6.5" fill="hsl(200 40% 50%)" textAnchor="middle">Trachea</text>
          <text x="250" y="157" fontSize="5" fill="hsl(200 40% 50%)" textAnchor="middle">(carina)</text>

          {/* Left lung */}
          <ellipse cx="140" cy="180" rx="55" ry="60" fill="hsl(200 30% 85% / 0.2)" stroke="hsl(200 30% 60%)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="140" y="175" fontSize="7" fill="hsl(200 30% 60%)" textAnchor="middle">Left</text>
          <text x="140" y="185" fontSize="7" fill="hsl(200 30% 60%)" textAnchor="middle">lung</text>

          {/* Right lung */}
          <ellipse cx="360" cy="180" rx="55" ry="60" fill="hsl(200 30% 85% / 0.2)" stroke="hsl(200 30% 60%)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="360" y="175" fontSize="7" fill="hsl(200 30% 60%)" textAnchor="middle">Right</text>
          <text x="360" y="185" fontSize="7" fill="hsl(200 30% 60%)" textAnchor="middle">lung</text>

          {/* Sternum (anterior) */}
          <rect x="230" y="45" width="40" height="18" rx="4" fill="hsl(var(--muted-foreground)/0.12)" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
          <text x="250" y="57" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Sternum</text>

          {/* Orientation labels */}
          <text x="250" y="38" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">ANTERIOR</text>
          <text x="250" y="365" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">POSTERIOR</text>
          <text x="35" y="200" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">RIGHT</text>
          <text x="465" y="200" fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">LEFT</text>

          {/* ─── Annotations / Explanation callouts ─── */}

          {/* Callout 1: Probe position */}
          <line x1="262" y1="220" x2="340" y2="100" stroke="hsl(var(--border))" strokeWidth="0.8" />
          <rect x="340" y="82" width="140" height="38" rx="5" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
          <text x="410" y="95" fontSize="6.5" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">Probe at 35-40 cm from teeth</text>
          <text x="410" y="106" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Rotated to face aorta (max signal)</text>
          <text x="410" y="115" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">4 MHz continuous-wave Doppler</text>

          {/* Callout 2: Doppler equation */}
          <line x1="190" y1="288" x2="60" y2="310" stroke="hsl(var(--border))" strokeWidth="0.8" />
          <rect x="15" y="300" width="155" height="55" rx="5" fill="hsl(0 65% 50% / 0.05)" stroke="hsl(0 65% 50% / 0.3)" strokeWidth="1" />
          <text x="92" y="314" fontSize="6.5" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">Doppler Equation</text>
          <text x="92" y="326" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Δf = 2 · f₀ · v · cos θ / c</text>
          <text x="92" y="338" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">v = blood velocity, θ ≈ 45°</text>
          <text x="92" y="348" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">Frequency shift → velocity → flow</text>

          {/* ─── Velocity-Time waveform below cross-section ─── */}
          <rect x="50" y="400" width="400" height="70" rx="6" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="250" y="398" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Aortic Velocity-Time Waveform</text>

          {/* Axes */}
          <line x1="80" y1="460" x2="430" y2="460" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
          <line x1="80" y1="460" x2="80" y2="410" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
          <text x="75" y="435" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="end" transform="rotate(-90,75,435)">Velocity</text>
          <text x="430" y="470" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="end">Time →</text>

          {/* Waveform shape — triangular systolic peak */}
          <path d="M 100 460 Q 110 458 120 450 Q 140 415 160 412 Q 175 410 185 420 Q 195 440 210 455 Q 215 460 220 460"
            fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
          <path d="M 240 460 Q 250 458 260 450 Q 280 415 300 412 Q 315 410 325 420 Q 335 440 350 455 Q 355 460 360 460"
            fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />

          {/* FTc annotation */}
          <line x1="100" y1="462" x2="100" y2="468" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <line x1="220" y1="462" x2="220" y2="468" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <line x1="100" y1="466" x2="220" y2="466" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <text x="160" y="475" fontSize="6" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">FTc (corrected flow time)</text>

          {/* Peak velocity */}
          <line x1="160" y1="412" x2="160" y2="460" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="163" y="408" fontSize="5.5" fill="hsl(var(--foreground))" fontWeight="600">PV</text>

          {/* SD annotation */}
          <line x1="300" y1="412" x2="300" y2="460" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="303" y="408" fontSize="5.5" fill="hsl(var(--foreground))" fontWeight="600">PV</text>

          {/* CO calculation callout */}
          <rect x="240" y="400" width="195" height="38" rx="4" fill="hsl(var(--primary)/0.05)" stroke="hsl(var(--primary)/0.2)" strokeWidth="0.8" />
          <text x="337" y="413" fontSize="6" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">CO = SV × HR</text>
          <text x="337" y="423" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">SV = VTI × CSA (aorta)</text>
          <text x="337" y="433" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">VTI = area under velocity-time curve</text>

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
