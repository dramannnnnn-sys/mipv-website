"use client";

import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { usePathname } from "next/navigation";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { illustrations } from "@/lib/media";
import { cx } from "./primitives";

/**
 * Decorative 3D Malaysia map.
 * - The dot map sits on a tilted plane (CSS 3D perspective) with a soft
 *   shadow and "thickness" layers underneath for depth.
 * - Pulsing nodes and flowing connection arcs link Peninsular Malaysia and
 *   Borneo. Nodes are generic points, not labelled locations.
 * - Mouse movement tilts the map slightly; when idle it sways gently.
 * - Zoom in / zoom out / reset buttons; when zoomed, drag to move the map.
 * Animations stop automatically for visitors with "reduce motion" switched on
 * (see the .map-* rules in app/globals.css).
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

const DOTS_ONLY = "/images/illustrations/malaysia-map-dots.svg"; // same map without grid lines
const ZOOMS = [1, 1.5, 2.2, 3];
const BASE_TILT = 34; // degrees, map plane leaning back

const labels = {
  en: { zoomIn: "Zoom in", zoomOut: "Zoom out", reset: "Reset map view", hint: "Drag to move the map" },
  bm: { zoomIn: "Zum masuk", zoomOut: "Zum keluar", reset: "Set semula paparan peta", hint: "Seret untuk mengalihkan peta" },
};

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
  const pathname = usePathname() || "";
  const t = pathname.startsWith("/bm") ? labels.bm : labels.en;

  const boxRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; px: number; py: number } | null>(null);
  const [level, setLevel] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const zoom = ZOOMS[level];

  const clampPan = useCallback((x: number, y: number, z: number) => {
    const box = boxRef.current;
    if (!box || z <= 1) return { x: 0, y: 0 };
    const mx = ((z - 1) * box.clientWidth) / 2;
    const my = ((z - 1) * box.clientHeight) / 2;
    return { x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y)) };
  }, []);

  const setZoomLevel = (next: number) => {
    const l = Math.max(0, Math.min(ZOOMS.length - 1, next));
    setLevel(l);
    setPan((p) => clampPan((p.x * ZOOMS[l]) / zoom, (p.y * ZOOMS[l]) / zoom, ZOOMS[l]));
  };

  const reset = () => {
    setLevel(0);
    setPan({ x: 0, y: 0 });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (zoom <= 1 || (e.target as HTMLElement).closest("button")) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d && d.id === e.pointerId) {
      setPan(clampPan(d.px + e.clientX - d.x, d.py + e.clientY - d.y, zoom));
      return;
    }
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const fx = (e.clientX - r.left) / r.width - 0.5;
    const fy = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: fx * 8, y: fy * -10 });
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current?.id === e.pointerId) {
      drag.current = null;
      setDragging(false);
    }
  };

  const transition = dragging ? "none" : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div
      ref={boxRef}
      className={cx("map3d relative w-full select-none overflow-hidden", zoom > 1 && (dragging ? "cursor-grabbing" : "cursor-grab"), className)}
      style={{ aspectRatio: `${map.width} / ${map.height * 1.15}`, touchAction: zoom > 1 ? "none" : "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={(e) => {
        endDrag(e);
        setTilt({ x: 0, y: 0 });
      }}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
    >
      {/* Stage with perspective */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1400px" }} aria-hidden="true">
        {/* Zoom + pan (screen space) */}
        <div
          className="relative w-[92%]"
          style={{
            aspectRatio: `${map.width} / ${map.height}`,
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transformStyle: "preserve-3d",
            transition,
          }}
        >
          {/* Tilt (mouse) */}
          <div
            className="absolute inset-0"
            style={{
              transform: `rotateX(${BASE_TILT + tilt.y}deg) rotateZ(${tilt.x}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 500ms ease-out",
            }}
          >
            {/* Idle sway */}
            <div className="map-sway absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
              {/* Shadow on the "ground" */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={DOTS_ONLY}
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full"
                style={{ transform: "translateZ(-40px)", filter: "brightness(0) blur(7px)", opacity: 0.16 }}
              />
              {/* Thickness layers */}
              {[-9, -6, -3].map((z) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={z}
                  src={DOTS_ONLY}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 h-full w-full"
                  style={{ transform: `translateZ(${z}px)`, filter: "brightness(0.55)", opacity: 0.45 }}
                />
              ))}
              {/* Map surface */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={map.src} alt="" draggable={false} className="absolute inset-0 h-full w-full" />

              {/* Network overlay */}
              <svg
                viewBox={`0 0 ${map.width} ${map.height}`}
                className="absolute inset-0 h-full w-full overflow-visible text-crimson"
                style={{ transform: "translateZ(1px)" }}
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
                          strokeOpacity={0.8}
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
                      <circle cx={x} cy={y} r={5.5} stroke="#fff" strokeWidth={2} />
                    </g>
                  ))}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-1 right-1 z-10 flex flex-col sm:bottom-2 sm:right-2 border border-line bg-white/95 shadow-sm">
        <button
          type="button"
          onClick={() => setZoomLevel(level + 1)}
          disabled={level === ZOOMS.length - 1}
          aria-label={t.zoomIn}
          title={t.zoomIn}
          className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center text-brand transition-colors hover:bg-rose-mist disabled:opacity-35"
        >
          <ZoomIn aria-hidden="true" size={18} />
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel(level - 1)}
          disabled={level === 0}
          aria-label={t.zoomOut}
          title={t.zoomOut}
          className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center border-t border-line text-brand transition-colors hover:bg-rose-mist disabled:opacity-35"
        >
          <ZoomOut aria-hidden="true" size={18} />
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={level === 0 && pan.x === 0 && pan.y === 0}
          aria-label={t.reset}
          title={t.reset}
          className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center border-t border-line text-brand transition-colors hover:bg-rose-mist disabled:opacity-35"
        >
          <RotateCcw aria-hidden="true" size={16} />
        </button>
      </div>

      {zoom > 1 && (
        <p className="pointer-events-none absolute bottom-2 left-2 bg-white/90 px-2 py-1 text-[0.8125rem] font-semibold text-muted">
          {t.hint}
        </p>
      )}
    </div>
  );
}
