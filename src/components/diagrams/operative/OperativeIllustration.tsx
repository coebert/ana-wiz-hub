import { Children, cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";

const tissue = "hsl(var(--muted))";
const ink = "hsl(var(--foreground))";
const artery = "hsl(var(--destructive))";
const vein = "hsl(var(--primary))";
const graft = "hsl(var(--perioperative))";

/** Local procedural views: no new whole-body laterality is inferred by shading. */
export function IllustrationDefs({ id }: { id: string }) {
  return <defs>
    <radialGradient id={`${id}-tissue`} cx="35%" cy="25%" r="85%">
      <stop offset="0" stopColor="hsl(var(--card))" />
      <stop offset="0.6" stopColor={tissue} />
      <stop offset="1" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.45" />
    </radialGradient>
    {[["artery", artery], ["vein", vein], ["graft", graft], ["instrument", ink]].map(([name, color]) =>
      <linearGradient key={name} id={`${id}-${name}`} x1="0" y1="0" x2="520" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={color} /><stop offset="0.42" stopColor={color} />
        <stop offset="0.5" stopColor="hsl(var(--card))" stopOpacity="0.65" />
        <stop offset="0.6" stopColor={color} /><stop offset="1" stopColor={color} />
      </linearGradient>)}
    <pattern id={`${id}-mesh`} width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M0 0L8 8M8 0L0 8" fill="none" stroke={graft} strokeWidth="0.6" opacity="0.7" />
    </pattern>
  </defs>;
}

/** Apply depth only to drawn structures, never labels or semantic descriptions. */
export function shadeIllustration(children: ReactNode, id: string): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child) || typeof child.type !== "string") return child;
    const element = child as ReactElement<{ fill?: string; stroke?: string; strokeWidth?: number; children?: ReactNode }>;
    const props = element.props;
    const update: typeof props = { children: shadeIllustration(props.children, id) };
    if (props.fill === tissue) update.fill = `url(#${id}-tissue)`;
    if ((props.strokeWidth ?? 0) >= 7) {
      const role = props.stroke === artery ? "artery" : props.stroke === vein ? "vein" : props.stroke === graft ? "graft" : undefined;
      if (role) update.stroke = `url(#${id}-${role})`;
    }
    return cloneElement(element, update);
  });
}

export function Leader({ from, to }: { from: [number, number]; to: [number, number] }) {
  return <path d={`M${from.join(" ")} L${to.join(" ")}`} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />;
}

export function Sutures({ x, y, vertical = false, count = 5 }: { x: number; y: number; vertical?: boolean; count?: number }) {
  return <g stroke={ink} strokeWidth="1.1" fill="none">{Array.from({ length: count }, (_, i) =>
    <path key={i} d={vertical ? `M${x-7} ${y+i*7-3}l14 6` : `M${x+i*7-3} ${y-7}l6 14`} />)}</g>;
}

export function Flow({ x, y, direction = "down" }: { x: number; y: number; direction?: "down" | "up" | "right" }) {
  const rotation = direction === "up" ? 180 : direction === "right" ? -90 : 0;
  return <path d="M0 -10V10M-4 4L0 10L4 4" transform={`translate(${x} ${y}) rotate(${rotation})`} fill="none" stroke={ink} strokeWidth="1.8" />;
}