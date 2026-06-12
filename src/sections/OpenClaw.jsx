import React, { useEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import Aurora from '../components/Aurora.jsx';
import useInView from '../hooks/useInView.js';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

// sanitized / generalized agent roles (public)
const grid = [
  'Daily Brief',
  'Research',
  'Projects',
  'Comms',
  'Orchestrator',
  'Ops',
  'Scheduler',
  'Analytics',
  'Memory',
];

const HUB = 4; // orchestrator's index in the grid

// cell centers (in % of the grid) for the delegation beams
const CENTERS = [
  [16.7, 16.7],
  [50, 16.7],
  [83.3, 16.7],
  [16.7, 50],
  [50, 50],
  [83.3, 50],
  [16.7, 83.3],
  [50, 83.3],
  [83.3, 83.3],
];

const TASKS = {
  'Daily Brief': 'compile_brief(sources=12)',
  Research: 'search_web("agent evals")',
  Projects: 'scan_repos(status)',
  Comms: 'draft_replies(inbox)',
  Ops: 'health_check(fleet)',
  Scheduler: 'dispatch(cron: hourly)',
  Analytics: 'usage_report(7d)',
  Memory: 'consolidate(embeddings)',
};

const MODELS = ['sonnet', 'haiku', 'opus'];
const slug = (label) => label.toLowerCase().replace(/\s+/g, '-');
const stamp = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

const caps = [
  'MCP tool-calling',
  'Cron-scheduled autonomy',
  'Multi-model (OpenRouter)',
  'Shared-memory substrate',
  'Runs on a Linux host',
];

// looping simulation: orchestrator delegates to a random agent, the terminal
// streams the matching tool-call log lines
function useOrchestration(running) {
  const [active, setActive] = useState(null);
  const [lines, setLines] = useState(() => [
    { t: stamp(), text: 'openclaw fleet online · 8 agents registered', kind: 'sys' },
  ]);
  const cycle = useRef(0);
  useEffect(() => {
    if (!running) return;
    const push = (line) => setLines((ls) => [...ls.slice(-6), line]);
    let t1;
    let t2;
    const tick = () => {
      const agents = grid.filter((_, i) => i !== HUB);
      const label = agents[Math.floor(Math.random() * agents.length)];
      const i = grid.indexOf(label);
      const model = MODELS[cycle.current++ % MODELS.length];
      setActive(i);
      push({ t: stamp(), text: `orchestrator → ${slug(label)} · ${TASKS[label]}`, kind: 'call' });
      t1 = setTimeout(() => {
        push({
          t: stamp(),
          text: `${slug(label)} ✓ done · ${2 + Math.floor(Math.random() * 5)} tool calls · model: ${model}`,
          kind: 'ok',
        });
      }, 1300);
      t2 = setTimeout(() => setActive(null), 2100);
    };
    tick();
    const iv = setInterval(tick, 2700);
    return () => {
      clearInterval(iv);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [running]);
  return { active, lines };
}

function Beam({ from, to }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        stroke="#3fd0e0"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        vectorEffect="non-scaling-stroke"
        className="animate-beam"
        opacity="0.9"
      />
    </svg>
  );
}

export default function OpenClaw() {
  const [vizRef, inView] = useInView(0.35);
  const reduced = prefersReducedMotion();
  const { active, lines } = useOrchestration(inView && !reduced);

  return (
    <section id="openclaw" className="relative mx-auto max-w-6xl px-6 py-28 md:py-32">
      <Aurora a="#3fd0e0" b="#5fd38b" />
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan/80">OpenClaw</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-mist md:text-5xl">
              An agent fleet I <span className="gradient-text">designed and run</span>.
            </h2>
            <p className="mt-4 leading-relaxed text-mist/75">
              OpenClaw is an autonomous multi-agent system: an{' '}
              <span className="text-cyan">orchestrator</span> delegates to specialized agents over
              MCP tool-calling, each cron-scheduled and routed to the right model. I built it to
              live at the frontier — and to prove I ship agentic systems end-to-end, not just talk
              about them. The simulation on the right mirrors how the real fleet delegates work.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {caps.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-mist/70"
                >
                  {c}
                </span>
              ))}
            </div>
            <a
              href="https://github.com/BryanMThomas/openclaw-skeleton"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block font-mono text-sm text-cyan transition hover:text-amber"
            >
              github.com/BryanMThomas/openclaw-skeleton ↗
            </a>
            <p className="mt-2 font-mono text-[10px] text-mist/40">
              architecture shown generalized · zero personal data
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div ref={vizRef}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 p-5">
              <img
                src="/img/openclaw.webp"
                alt=""
                width="1024"
                height="1024"
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
              />
              <div className="relative">
                <div className="grid grid-cols-3 gap-3">
                  {grid.map((label, i) => {
                    const isHub = i === HUB;
                    const isActive = i === active;
                    return (
                      <div
                        key={label}
                        className={`flex aspect-square items-center justify-center rounded-xl border p-2 text-center text-xs font-semibold transition-all duration-300 ${
                          isHub
                            ? 'border-cyan/60 bg-cyan/15 text-cyan shadow-[0_0_24px_rgba(63,208,224,0.35)]'
                            : isActive
                              ? 'scale-105 border-cyan/70 bg-cyan/10 text-cyan shadow-[0_0_20px_rgba(63,208,224,0.45)]'
                              : 'border-white/10 bg-ink/60 text-mist/75'
                        }`}
                      >
                        {label}
                      </div>
                    );
                  })}
                </div>
                {active !== null && <Beam from={CENTERS[HUB]} to={CENTERS[active]} />}
              </div>
            </div>

            {/* live delegation log */}
            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#081019]">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-mist/40">
                  openclaw · orchestrator.log
                </span>
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-mist/40">
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-[#28c840] ${reduced ? '' : 'animate-pulse'}`}
                  />
                  live sim
                </span>
              </div>
              <div className="flex h-40 flex-col justify-end px-4 py-3 font-mono text-[11px] leading-relaxed">
                {lines.map((l, i) => (
                  <p key={`${l.t}-${i}`} className="truncate">
                    <span className="text-mist/30">[{l.t}]</span>{' '}
                    <span
                      className={
                        l.kind === 'ok'
                          ? 'text-[#5fd38b]'
                          : l.kind === 'call'
                            ? 'text-cyan/90'
                            : 'text-mist/50'
                      }
                    >
                      {l.text}
                    </span>
                  </p>
                ))}
                <p className="caret text-mist/40">&nbsp;</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
