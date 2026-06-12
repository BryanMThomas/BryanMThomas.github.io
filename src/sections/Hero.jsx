import React, { Suspense, lazy, useMemo, useState } from 'react';
import data, { nodesById, neighborsOf } from '../data.js';

const HeroCanvas = lazy(() => import('../three/HeroCanvas.jsx'));

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

// static backdrop shown while three.js loads, or if WebGL is unavailable/crashes
function StaticBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#13283c_0%,_#0a1622_70%)]"
    />
  );
}

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <StaticBackdrop /> : this.props.children;
  }
}

export default function Hero() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const sel = selected ? nodesById[selected] : null;
  const neighbors = selected ? neighborsOf(selected) : [];
  const hasWebGL = useMemo(webglAvailable, []);

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Intro">
      <div
        className="absolute inset-0"
        role="img"
        aria-label="Interactive 3D map of Bryan's work, products, and interests, positioned by AI embedding similarity"
      >
        {hasWebGL ? (
          <CanvasErrorBoundary>
            <Suspense fallback={<StaticBackdrop />}>
              <HeroCanvas
                selected={selected}
                setSelected={setSelected}
                hovered={hovered}
                setHovered={setHovered}
              />
            </Suspense>
          </CanvasErrorBoundary>
        ) : (
          <StaticBackdrop />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-5 md:p-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold leading-none text-mist md:text-4xl">
              Bryan&nbsp;Thomas
            </h1>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan/90 md:text-xs">
              Applied AI Engineer · Seattle
            </p>
            <p className="mt-2 max-w-xs text-sm text-mist/60">
              I ship production AI systems — and the multi-agent tooling behind them.
            </p>
          </div>
          <nav aria-label="Primary" className="pointer-events-auto hidden gap-4 font-mono text-[11px] uppercase tracking-widest text-mist/60 md:flex">
            <a className="transition hover:text-cyan" href="#about">About</a>
            <a className="transition hover:text-cyan" href="#ventures">Work</a>
            <a className="transition hover:text-cyan" href="#openclaw">OpenClaw</a>
            <a className="transition hover:text-cyan" href="#lab">Now</a>
            <a className="transition hover:text-cyan" href="https://github.com/BryanMThomas" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
        </header>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {Object.entries(data.clusters).map(([k, c]) => (
                <span key={k} className="flex items-center gap-1.5 text-[11px] text-mist/70">
                  <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
                  {c.label}
                </span>
              ))}
            </div>
            <p className="font-mono text-[10px] tracking-wide text-mist/40">
              drag to orbit · click any point
            </p>
          </div>

          <p className="max-w-[16rem] text-right font-mono text-[10px] leading-relaxed text-mist/40">
            every point is a real embedding<br />
            (Gemini, 3072-d) projected to 3D —<br />
            <span className="text-cyan/70">proximity = relatedness</span>
          </p>
        </div>
      </div>

      {sel && (
        <aside className="pointer-events-auto absolute bottom-20 left-1/2 z-20 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-white/10 bg-ink/85 p-5 backdrop-blur-md md:bottom-24 md:left-8 md:translate-x-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="inline-block h-3 w-3 rounded-full" style={{ background: data.clusters[sel.cluster].color, boxShadow: `0 0 10px ${data.clusters[sel.cluster].color}` }} />
              <h2 className="text-lg font-bold text-mist">{sel.label}</h2>
            </div>
            <button onClick={() => setSelected(null)} className="rounded-md px-2 text-mist/50 transition hover:text-mist" aria-label="Close">✕</button>
          </div>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-mist/40">
            {data.clusters[sel.cluster].label}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mist/80">{sel.blurb}</p>
          {sel.url && (
            <a href={sel.url} target="_blank" rel="noreferrer" className="mt-3 inline-block font-mono text-xs text-cyan transition hover:text-amber">
              {sel.url.replace('https://', '')} ↗
            </a>
          )}
          {neighbors.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-mist/40">Closest in embedding space</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {neighbors.map((n) => (
                  <button key={n.id} onClick={() => setSelected(n.id)} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-mist/70 transition hover:border-cyan/60 hover:text-cyan">
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      )}

      <a href="#about" className="pointer-events-auto absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-mist/40 transition hover:text-cyan motion-safe:animate-bounce">
        ↓ scroll
      </a>
    </section>
  );
}
