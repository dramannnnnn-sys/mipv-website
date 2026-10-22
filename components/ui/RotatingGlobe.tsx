"use client";

import { useEffect, useRef, useState } from "react";
import { illustrations } from "@/lib/media";
import { cx } from "./primitives";

/**
 * Animated 3D globe for the home hero (canvas, no external libraries).
 * - Orthographic globe with graticule and depth-shaded dot grid.
 * - Slowly turns back and forth around Malaysia; visitors can drag to spin it.
 * - Connection arcs leave a Malaysia hub with travelling light pulses.
 * - Pauses when off-screen or when the tab is hidden; shows a still frame for
 *   visitors with "reduce motion" switched on.
 * The static SVG globe is shown until the first canvas frame is drawn.
 */

const RAD = Math.PI / 180;
const VIEW_LON = 83.8; // matches the static illustration
const VIEW_LAT = -9.2;
const ROLL = -8 * RAD;
const SWAY_DEG = 38;
const SWAY_PERIOD = 26; // seconds
const HUB: [number, number] = [101.7, 3.1]; // Malaysia (general)
const TARGETS: [number, number][] = [
  [139.7, 35.7],
  [55.3, 25.2],
  [116.4, 39.9],
  [77.2, 28.6],
  [103.8, 1.35],
  [121.0, 14.6],
  [106.8, -6.2],
  [100.5, 13.75],
  [151.2, -33.9],
  [37.6, 55.8],
];

type V3 = [number, number, number];

function toVec(lon: number, lat: number): V3 {
  const l = lon * RAD;
  const p = lat * RAD;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
}

function slerp(a: V3, b: V3, t: number): V3 {
  const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const w = Math.acos(dot);
  if (w < 1e-6) return a;
  const s = Math.sin(w);
  const ka = Math.sin((1 - t) * w) / s;
  const kb = Math.sin(t * w) / s;
  return [a[0] * ka + b[0] * kb, a[1] * ka + b[1] * kb, a[2] * ka + b[2] * kb];
}

// Pre-computed geometry (world space, unit sphere)
const graticule: { pts: V3[]; major: boolean }[] = [];
for (let lon = -180; lon < 180; lon += 10) {
  const pts: V3[] = [];
  for (let lat = -80; lat <= 80; lat += 2) pts.push(toVec(lon, lat));
  graticule.push({ pts, major: lon % 30 === 0 });
}
for (let lat = -80; lat <= 80; lat += 10) {
  const pts: V3[] = [];
  for (let lon = -180; lon <= 180; lon += 2) pts.push(toVec(lon, lat));
  graticule.push({ pts, major: lat % 30 === 0 });
}
const dots: V3[] = [];
for (let lon = -180; lon < 180; lon += 6) for (let lat = -84; lat <= 84; lat += 6) dots.push(toVec(lon, lat));

const ARC_STEPS = 48;
const hubVec = toVec(HUB[0], HUB[1]);
const arcs: V3[][] = TARGETS.map(([lon, lat]) => {
  const b = toVec(lon, lat);
  const dist = Math.acos(Math.max(-1, Math.min(1, hubVec[0] * b[0] + hubVec[1] * b[1] + hubVec[2] * b[2])));
  return Array.from({ length: ARC_STEPS + 1 }, (_, k) => {
    const t = k / ARC_STEPS;
    const v = slerp(hubVec, b, t);
    const lift = 1 + Math.sin(Math.PI * t) * 0.14 * Math.min(1, dist * 1.2);
    return [v[0] * lift, v[1] * lift, v[2] * lift] as V3;
  });
});

export function RotatingGlobe({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const drag = useRef({ active: false, id: -1, x: 0, offset: 0, velocity: 0 });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let size = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let running = false;
    let last = performance.now();
    let clock = 0;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      size = wrap.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    };

    const draw = (time: number) => {
      if (!size) return;
      const S = size;
      const C = S / 2;
      const R = S * (290 / 640);
      const lw = S / 640;
      const viewLon = (VIEW_LON + SWAY_DEG * Math.sin((2 * Math.PI * time) / SWAY_PERIOD) - drag.current.offset) * RAD;
      const tilt = VIEW_LAT * RAD;
      const cl = Math.cos(-viewLon);
      const sl = Math.sin(-viewLon);
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      const cr = Math.cos(ROLL);
      const sr = Math.sin(ROLL);

      // World → view: yaw (longitude), pitch (latitude), roll
      const view = (v: V3): V3 => {
        const x1 = v[0] * cl + v[2] * sl;
        const z1 = -v[0] * sl + v[2] * cl;
        const y2 = v[1] * ct - z1 * st;
        const z2 = v[1] * st + z1 * ct;
        return [x1 * cr - y2 * sr, x1 * sr + y2 * cr, z2];
      };
      const sx = (x: number) => C + R * x;
      const sy = (y: number) => C - R * y;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, S, S);

      // Sphere
      const g = ctx.createRadialGradient(C - R * 0.2, C - R * 0.3, R * 0.05, C, C, R * 1.05);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.7, "#f7eff0");
      g.addColorStop(1, "#ead8db");
      ctx.beginPath();
      ctx.arc(C, C, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Graticule (front hemisphere only)
      for (const line of graticule) {
        ctx.beginPath();
        let pen = false;
        for (const p of line.pts) {
          const v = view(p);
          if (v[2] > 0) {
            if (pen) ctx.lineTo(sx(v[0]), sy(v[1]));
            else ctx.moveTo(sx(v[0]), sy(v[1]));
            pen = true;
          } else pen = false;
        }
        ctx.strokeStyle = line.major ? "rgba(130,65,77,0.45)" : "rgba(156,104,112,0.28)";
        ctx.lineWidth = (line.major ? 1.1 : 0.8) * lw;
        ctx.stroke();
      }

      // Dot grid with depth shading
      ctx.fillStyle = "#8b3047";
      for (const d of dots) {
        const v = view(d);
        if (v[2] <= 0.02) continue;
        ctx.globalAlpha = v[2] * 0.55 + 0.08;
        ctx.beginPath();
        ctx.arc(sx(v[0]), sy(v[1]), (1 + v[2] * 1.1) * lw, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Outline
      ctx.beginPath();
      ctx.arc(C, C, R, 0, Math.PI * 2);
      ctx.strokeStyle = "#5f0718";
      ctx.lineWidth = 2.2 * lw;
      ctx.stroke();

      // Arcs + travelling pulses
      const isVisible = (v: V3) => v[2] > 0 || v[0] * v[0] + v[1] * v[1] > 1;
      arcs.forEach((arc, i) => {
        const pts = arc.map(view);
        ctx.beginPath();
        let pen = false;
        for (const v of pts) {
          if (isVisible(v)) {
            if (pen) ctx.lineTo(sx(v[0]), sy(v[1]));
            else ctx.moveTo(sx(v[0]), sy(v[1]));
            pen = true;
          } else pen = false;
        }
        ctx.strokeStyle = "rgba(122,0,25,0.75)";
        ctx.lineWidth = 1.6 * lw;
        ctx.lineCap = "round";
        ctx.stroke();

        // End point
        const end = pts[pts.length - 1];
        if (end[2] > 0) {
          ctx.beginPath();
          ctx.arc(sx(end[0]), sy(end[1]), 3.2 * lw, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          ctx.strokeStyle = "#8b3047";
          ctx.lineWidth = 1.6 * lw;
          ctx.stroke();
        }

        // Pulse
        const phase = (((time / 2.8 + i * 0.37) % 1) + 1) % 1;
        const idx = Math.max(0, Math.min(ARC_STEPS, Math.floor(phase * ARC_STEPS)));
        const p = pts[idx];
        if (p && isVisible(p)) {
          const fade = Math.sin(Math.PI * phase);
          const pg = ctx.createRadialGradient(sx(p[0]), sy(p[1]), 0, sx(p[0]), sy(p[1]), 9 * lw);
          pg.addColorStop(0, `rgba(122,0,25,${0.9 * fade})`);
          pg.addColorStop(1, "rgba(122,0,25,0)");
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(sx(p[0]), sy(p[1]), 9 * lw, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(sx(p[0]), sy(p[1]), 2.4 * lw, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${fade})`;
          ctx.fill();
        }
      });

      // Hub (Malaysia)
      const h = view(hubVec);
      if (h[2] > 0) {
        const hx = sx(h[0]);
        const hy = sy(h[1]);
        const beat = (time % 2.4) / 2.4;
        const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 34 * lw);
        glow.addColorStop(0, "rgba(122,0,25,0.35)");
        glow.addColorStop(1, "rgba(122,0,25,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(hx, hy, 34 * lw, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(hx, hy, (8 + beat * 22) * lw, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(122,0,25,${0.6 * (1 - beat)})`;
        ctx.lineWidth = 1.5 * lw;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(hx, hy, 7 * lw, 0, Math.PI * 2);
        ctx.fillStyle = "#7a0019";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.5 * lw;
        ctx.stroke();
      }
    };

    const frame = (now: number) => {
      const dt = Math.max(0, Math.min(0.1, (now - last) / 1000)); // rAF time can precede `last`
      last = now;
      clock += dt;
      // Inertia after a drag
      const d = drag.current;
      if (!d.active) {
        if (Math.abs(d.velocity) > 0.01) {
          d.offset += d.velocity * dt;
          d.velocity *= Math.pow(0.02, dt);
        }
        // Ease back towards Malaysia after the visitor lets go
        d.offset *= Math.pow(0.6, dt);
      }
      draw(clock);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const update = () => (visible && !document.hidden ? start() : stop());

    resize();
    draw(0);
    setReady(true);

    const ro = new ResizeObserver(() => {
      resize();
      draw(clock);
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    });
    io.observe(wrap);
    document.addEventListener("visibilitychange", update);
    update();

    // Drag to spin (also redraws when animation is off)
    const onDown = (e: PointerEvent) => {
      const d = drag.current;
      d.active = true;
      d.id = e.pointerId;
      d.x = e.clientX;
      d.velocity = 0;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const d = drag.current;
      if (!d.active || e.pointerId !== d.id) return;
      const dx = e.clientX - d.x;
      d.x = e.clientX;
      const deg = (dx / Math.max(1, size)) * 120;
      d.offset += deg;
      d.velocity = d.velocity * 0.5 + deg * 30;
      if (reduce) draw(clock);
    };
    const onUp = (e: PointerEvent) => {
      const d = drag.current;
      if (e.pointerId !== d.id) return;
      d.active = false;
      if (reduce) d.velocity = 0;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const still = illustrations.globe;
  return (
    <div ref={wrapRef} className={cx("relative aspect-square w-full", className)} aria-hidden="true">
      {/* Static fallback until the canvas is ready (also used if JavaScript is off) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={still.src}
        width={still.width}
        height={still.height}
        alt=""
        fetchPriority="high"
        className={cx("absolute inset-0 h-full w-full transition-opacity duration-500", ready && "opacity-0")}
      />
      <canvas
        ref={canvasRef}
        className={cx("absolute inset-0 h-full w-full cursor-grab touch-pan-y transition-opacity duration-500 active:cursor-grabbing", ready ? "opacity-100" : "opacity-0")}
      />
    </div>
  );
}
