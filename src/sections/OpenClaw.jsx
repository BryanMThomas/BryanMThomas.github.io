import React from 'react';
import Reveal from '../components/Reveal.jsx';

// sanitized / generalized agent roles (public)
const grid = [
  'Daily Brief', 'Research', 'Projects',
  'Comms', 'Orchestrator', 'Ops',
  'Scheduler', 'Analytics', 'Memory',
];

const caps = ['MCP tool-calling', 'Cron-scheduled autonomy', 'Multi-model (OpenRouter)', 'Shared-memory substrate', 'Runs on a Linux host'];

export default function OpenClaw() {
  return (
    <section id="openclaw" className="relative mx-auto max-w-6xl px-6 py-28 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan/80">OpenClaw</p>
            <h2 className="mt-3 text-3xl font-extrabold text-mist md:text-4xl">
              An 8-agent fleet I designed and run.
            </h2>
            <p className="mt-4 leading-relaxed text-mist/75">
              OpenClaw is an autonomous multi-agent system: an <span className="text-cyan">orchestrator</span> delegates
              to specialized agents over MCP tool-calling, each cron-scheduled and routed to the right model.
              I built it to live at the frontier — and to prove I ship agentic systems end-to-end, not just talk about them.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {caps.map((c) => (
                <span key={c} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-mist/70">{c}</span>
              ))}
            </div>
            <a href="https://github.com/BryanMThomas/openclaw-skeleton" target="_blank" rel="noreferrer" className="mt-6 inline-block font-mono text-sm text-cyan transition hover:text-amber">
              github.com/BryanMThomas/openclaw-skeleton ↗
            </a>
            <p className="mt-2 font-mono text-[10px] text-mist/40">architecture shown generalized · zero personal data</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 p-5">
            <img src="/img/openclaw.png" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="relative grid grid-cols-3 gap-3">
              {grid.map((label) => {
                const isHub = label === 'Orchestrator';
                return (
                  <div
                    key={label}
                    className={`flex aspect-square items-center justify-center rounded-xl border p-2 text-center text-xs font-semibold ${
                      isHub
                        ? 'border-cyan/60 bg-cyan/15 text-cyan shadow-[0_0_24px_rgba(63,208,224,0.35)]'
                        : 'border-white/10 bg-ink/60 text-mist/75'
                    }`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
