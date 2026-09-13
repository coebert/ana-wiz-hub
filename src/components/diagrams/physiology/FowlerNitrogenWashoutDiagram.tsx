const FowlerNitrogenWashoutDiagram = () => (
  <figure aria-labelledby="fowler-title" className="rounded-lg border border-border bg-card p-4">
    <svg viewBox="0 0 760 360" role="img" aria-labelledby="fowler-title fowler-desc" className="h-auto w-full">
      <title id="fowler-title">Fowler single-breath nitrogen washout curve</title>
      <desc id="fowler-desc">
        Nitrogen concentration plotted against expired volume, showing phases one to four, the equal-area line through phase two, and closing volume from phase four to residual volume.
      </desc>
      <line x1="70" y1="300" x2="720" y2="300" className="stroke-border" strokeWidth="2" />
      <line x1="70" y1="300" x2="70" y2="35" className="stroke-border" strokeWidth="2" />
      <text x="395" y="342" textAnchor="middle" className="fill-muted-foreground text-sm">Expired volume</text>
      <text x="20" y="170" textAnchor="middle" transform="rotate(-90 20 170)" className="fill-muted-foreground text-sm">Expired N₂ concentration</text>
      <path d="M70 295 L205 295 C225 292 250 220 290 150 C325 100 360 92 430 88 L585 82 C615 80 625 54 650 40 L700 38" fill="none" className="stroke-physiology" strokeWidth="5" strokeLinecap="round" />
      <line x1="257" y1="300" x2="257" y2="170" className="stroke-primary" strokeWidth="2" strokeDasharray="7 6" />
      <path d="M225 293 C238 270 246 225 257 190" fill="none" className="stroke-primary" strokeWidth="2" />
      <path d="M257 190 C270 165 280 150 295 140" fill="none" className="stroke-primary" strokeWidth="2" />
      <text x="258" y="326" textAnchor="middle" className="fill-foreground text-xs">Equal-area point = anatomical dead space</text>
      <text x="130" y="270" textAnchor="middle" className="fill-foreground text-sm font-semibold">Phase I</text>
      <text x="250" y="135" textAnchor="middle" className="fill-foreground text-sm font-semibold">Phase II</text>
      <text x="455" y="70" textAnchor="middle" className="fill-foreground text-sm font-semibold">Phase III</text>
      <text x="645" y="25" textAnchor="middle" className="fill-foreground text-sm font-semibold">Phase IV</text>
      <line x1="615" y1="315" x2="700" y2="315" className="stroke-primary" strokeWidth="3" />
      <line x1="615" y1="307" x2="615" y2="323" className="stroke-primary" strokeWidth="3" />
      <line x1="700" y1="307" x2="700" y2="323" className="stroke-primary" strokeWidth="3" />
      <text x="657" y="338" textAnchor="middle" className="fill-foreground text-xs">Closing volume</text>
    </svg>
    <figcaption className="mt-2 text-xs text-muted-foreground">
      Phase IV begins when dependent small airways close; closing capacity equals residual volume plus closing volume.
    </figcaption>
  </figure>
);

export default FowlerNitrogenWashoutDiagram;