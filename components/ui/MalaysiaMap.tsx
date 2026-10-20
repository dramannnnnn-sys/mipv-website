import { illustrations } from "@/lib/media";
import { cx } from "./primitives";

/**
 * Decorative Malaysia map with a subtle animated "connected network" overlay:
 * pulsing nodes and flowing connection arcs between Peninsular Malaysia and
 * Borneo. Pure SVG + CSS (no JavaScript). Nodes are generic points on the
 * dot map, not labelled locations. Animation stops automatically when the
 * visitor has "reduce motion" switched on (see .map-* rules in globals.css).
 */

// Node positions snapped to dots of /images/illustrations/malaysia-map.svg (viewBox 1050 × 385).
const nodes: [number, number][] = [
  [85.8, 96.2],
  [148.2, 166.4],
  [117.0, 244.4],
  [218.4, 306.8],
  [592.8, 314.6],
  [717.6, 252.2],
  [842.4, 166.4],
  [928.2, 57.2],
];

const links: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 6],
  [2, 5],
  [4, 5],
  [5, 6],
  [6, 7],
];

function arc(a: [number, number], b: [number, number]) {
  const [x1, y1] = a;
  const [x2, y2] = b;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const cx = (x1 + x2) / 2;
  const cy = Math.max(6, (y1 + y2) / 2 - dist * 0.28);
  return `M${x1} ${y1} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`;
}

export function MalaysiaMap({ alt = "", className }: { alt?: string; className?: string }) {
  const map = illustrations.malaysiaMap;
  return (
    <div
      className={cx("relative w-full", className)}
      style={{ aspectRatio: `${map.width} / ${map.height}` }}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={map.src} width={map.width} height={map.height} alt="" loading="lazy" className="absolute inset-0 h-full w-full" />
      <svg
        viewBox={`0 0 ${map.width} ${map.height}`}
        className="absolute inset-0 h-full w-full overflow-visible text-crimson"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          {links.map(([a, b], i) => {
            const d = arc(nodes[a], nodes[b]);
            return (
              <g key={`${a}-${b}`}>
                <path d={d} strokeWidth={1.5} strokeOpacity={0.18} />
                <path
                  d={d}
                  strokeWidth={2}
                  strokeOpacity={0.75}
                  className="map-flow"
                  style={{ animationDelay: `${(i * -0.37).toFixed(2)}s` }}
                />
              </g>
            );
          })}
        </g>
        <g fill="currentColor">
          {nodes.map(([x, y], i) => (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={7}
                fillOpacity={0.35}
                className="map-pulse"
                style={{ animationDelay: `${(i * 0.45).toFixed(2)}s` }}
              />
              <circle cx={x} cy={y} r={5} stroke="#fff" strokeWidth={2} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
