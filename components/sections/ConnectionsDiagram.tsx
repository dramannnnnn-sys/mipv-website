/**
 * Interconnection diagram: eight organisational dimensions arranged around
 * MIPV, each connected to every other — the integrated perspective at the
 * heart of MIPV's positioning. Pure SVG, scales crisply at any size.
 */
export function ConnectionsDiagram({ labels, title }: { labels: string[]; title: string }) {
  const W = 780;
  const H = 560;
  const c = W / 2; // horizontal centre
  const cy = H / 2;
  const r = 178;
  const nodes = labels.map((label, i) => {
    const a = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
    return { label, x: c + r * Math.cos(a), y: cy + r * Math.sin(a), a };
  });
  const lines: Array<[number, number]> = [];
  for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) lines.push([i, j]);
  const tones = ["#9c6870", "#82414d", "#732230", "#5f0718"];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="connections-title" className="h-auto w-full">
      <title id="connections-title">{`${title}: ${labels.join(", ")}`}</title>
      <circle cx={c} cy={cy} r={r + 42} fill="none" stroke="#e5dedd" strokeWidth="1" />
      <circle cx={c} cy={cy} r={r} fill="none" stroke="#e5dedd" strokeWidth="1" strokeDasharray="2 6" />
      {lines.map(([i, j]) => (
        <line
          key={`${i}-${j}`}
          x1={nodes[i].x}
          y1={nodes[i].y}
          x2={nodes[j].x}
          y2={nodes[j].y}
          stroke="#8b3047"
          strokeOpacity={Math.abs(i - j) === 1 || Math.abs(i - j) === nodes.length - 1 ? 0.45 : 0.14}
          strokeWidth="1.2"
        />
      ))}
      {nodes.map((n) => (
        <line key={`spoke-${n.label}`} x1={c} y1={cy} x2={n.x} y2={n.y} stroke="#5f0718" strokeOpacity="0.35" strokeWidth="1.5" />
      ))}
      {/* Centre mark: rotated square (the diamond motif from the brand backgrounds) */}
      <g transform={`rotate(45 ${c} ${cy})`}>
        <rect x={c - 58} y={cy - 58} width="116" height="116" fill="#ffffff" stroke="#5f0718" strokeWidth="2" />
        <rect x={c - 48} y={cy - 48} width="96" height="96" fill="#5f0718" />
      </g>
      <text
        x={c}
        y={cy + 9}
        textAnchor="middle"
        fill="#ffffff"
        style={{ font: "800 26px var(--font-heading)", letterSpacing: "2px" }}
      >
        MIPV
      </text>
      {nodes.map((n, i) => {
        const lx = c + (r + 42) * Math.cos(n.a);
        const ly = cy + (r + 42) * Math.sin(n.a);
        const anchor = Math.abs(Math.cos(n.a)) < 0.2 ? "middle" : Math.cos(n.a) > 0 ? "start" : "end";
        const dy = Math.sin(n.a) > 0.5 ? 14 : Math.sin(n.a) < -0.5 ? -4 : 6;
        return (
          <g key={n.label}>
            <rect
              x={n.x - 11}
              y={n.y - 11}
              width="22"
              height="22"
              transform={`rotate(45 ${n.x} ${n.y})`}
              fill={tones[i % 4]}
              stroke="#ffffff"
              strokeWidth="3"
            />
            <text
              x={lx + (anchor === "start" ? -14 : anchor === "end" ? 14 : 0)}
              y={ly + dy}
              textAnchor={anchor}
              fill="#262326"
              style={{ font: "800 17px var(--font-heading)", letterSpacing: "1.2px" }}
            >
              {n.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
