"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";

/**
 * Home page headline with a 3D look:
 * - extruded burgundy depth (layered text-shadow, see .hero-3d in globals.css)
 * - lines flip up into place on load, one after another
 * - on desktop the headline tilts gently towards the mouse
 * Motion is disabled for visitors with "reduce motion" switched on.
 */
export function HeroTitle3D({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const fx = (e.clientX - r.left) / r.width - 0.5;
    const fy = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--tilt-y", `${(fx * 10).toFixed(2)}deg`);
    ref.current.style.setProperty("--tilt-x", `${(fy * -8).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--tilt-y", "0deg");
    ref.current?.style.setProperty("--tilt-x", "0deg");
  };

  return (
    <div className="hero-3d-stage" onPointerMove={onMove} onPointerLeave={onLeave}>
      <h1 ref={ref} className="type-hero hero-3d mt-5">
        {lines.map((word, i) => (
          <span key={word} className="hero-3d-line block" style={{ animationDelay: `${120 + i * 140}ms` }}>
            {word.replace(/\.$/, "")}
            <span className="text-crimson">.</span>
          </span>
        ))}
      </h1>
    </div>
  );
}
