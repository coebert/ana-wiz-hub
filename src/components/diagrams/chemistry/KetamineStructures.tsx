import { ketamineConnectionTables } from "./ketamineConnectionTables";
import { InlineRef } from "@/components/references/InlineRef";

export function KetamineStructures() {
  return <div className="space-y-3">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ketamineConnectionTables.map(record => {
        const atoms = new Map<number, (typeof record.atoms)[number]>(record.atoms.map(a => [a.id, a]));
        const xs = record.atoms.map(a => a.x), ys = record.atoms.map(a => a.y);
        const minX = Math.min(...xs), maxY = Math.max(...ys);
        const point = (id: number) => { const a = atoms.get(id); return a ? { x: 30 + (a.x - minX) * 53, y: 25 + (maxY - a.y) * 53 } : null; };
        const width = 60 + (Math.max(...xs) - minX) * 53, height = 55 + (maxY - Math.min(...ys)) * 53;
        return <figure key={record.cid}>
          <figcaption className="text-sm font-semibold text-center">({record.configuration})-ketamine — PubChem CID {record.cid}</figcaption>
          <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${record.configuration}-ketamine source-defined molecular connectivity`} className="w-full text-foreground">
            {record.bonds.map(b => {
              const a = point(b.fromAtom), z = point(b.toAtom); if (!a || !z) return null;
              const dx = z.x-a.x, dy=z.y-a.y, len=Math.hypot(dx,dy), nx=-dy/len, ny=dx/len;
              const key = `${b.fromAtom}-${b.toAtom}`;
              if (b.stereo === 1) return <polygon key={key} points={`${a.x},${a.y} ${z.x+nx*5},${z.y+ny*5} ${z.x-nx*5},${z.y-ny*5}`} fill="currentColor" />;
              if (b.stereo === 6) return <g key={key}>{Array.from({length:7},(_,i)=>{const t=(i+1)/8,w=5*t;return <line key={i} x1={a.x+dx*t-nx*w} y1={a.y+dy*t-ny*w} x2={a.x+dx*t+nx*w} y2={a.y+dy*t+ny*w} stroke="currentColor" strokeWidth="1.5" />;})}</g>;
              return <g key={key}><line x1={a.x} y1={a.y} x2={z.x} y2={z.y} stroke="currentColor" strokeWidth="1.8" />{b.order === 2 && <line x1={a.x+nx*4} y1={a.y+ny*4} x2={z.x+nx*4} y2={z.y+ny*4} stroke="currentColor" strokeWidth="1.5" />}</g>;
            })}
            {record.atoms.filter(a=>a.element!=='C').map(a=>{const p=point(a.id);if(!p)return null;return <g key={a.id}><rect x={p.x-12} y={p.y-10} width={24} height={20} className="fill-background" /><text x={p.x} y={p.y+5} textAnchor="middle" fontSize="15" fill="currentColor">{a.element==='N'?'NH':a.element}</text></g>;})}
          </svg>
        </figure>;
      })}
    </div>
    <p className="text-xs text-muted-foreground leading-relaxed">Cyclohexanone has a six-membered ring; the adjacent stereocentre bears methylamino and 2-chlorophenyl groups. Chlorine is ortho on the phenyl ring, not bonded directly to the stereocentre. These structures do not establish dose, onset, emergence or clinical superiority. <InlineRef topicId="organic-chemistry" refLabel="PubChem Ketamine Structures" /></p>
  </div>;
}