import React from 'react';
import Reveal from '../components/Reveal.jsx';

// my current ranking of AI coding agents — shifts constantly, that's the point
const tools = [
  { name: 'Claude Code', note: 'Daily driver. This site, my agent fleet, and most of my product code run through it.' },
  { name: 'Codex', note: 'OpenAI’s agent in the loop — a second opinion and a second pair of hands for parallel work.' },
  { name: 'Cursor', note: 'Where a lot of my in-editor, tab-complete-heavy work still happens.' },
  { name: 'Antigravity', note: 'Google’s agent-first IDE — kicking the tires on the Gemini agent workflow.' },
  { name: 'GitHub Copilot / VS Code', note: 'The original copilot. Still in the rotation for quick inline help.' },
];

// frontier ideas I'm going deeper on right now
const exploring = [
  'Vectorization & embeddings',
  'Agent evals',
  'Multi-agent orchestration',
  'Agent-to-agent handoff',
  'Human-in-the-loop',
];

export default function Lab() {
  return (
    <section id="lab" className="relative mx-auto max-w-5xl px-6 py-28 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan/80">Currently</p>
        <h2 className="mt-3 text-3xl font-extrabold text-mist md:text-4xl">
          Staying fluent in the frontier.
        </h2>
        <p className="mt-3 max-w-2xl text-mist/60">
          New AI coding agents ship every week. I run all of them in rotation — being fluent in
          whatever’s actually best right now is part of the job.
        </p>
      </Reveal>

      {/* AI coding agent leaderboard */}
      <Reveal delay={80}>
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber/80">
              AI coding agents · my ranking
            </p>
            <p className="font-mono text-[10px] text-mist/40">re-ranked basically weekly</p>
          </div>
          <ol className="mt-5 space-y-px">
            {tools.map((t, i) => (
              <li
                key={t.name}
                className="flex items-start gap-4 rounded-lg px-2 py-3 transition hover:bg-white/[0.03]"
              >
                <span
                  className={`mt-0.5 w-7 shrink-0 font-mono text-lg font-extrabold tabular-nums ${
                    i === 0 ? 'text-amber' : 'text-mist/30'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className="font-semibold text-mist">{t.name}</span>
                  {i === 0 && (
                    <span className="ml-2 rounded-full bg-amber/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-amber">
                      top pick
                    </span>
                  )}
                  <p className="mt-0.5 text-sm leading-relaxed text-mist/60">{t.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* going deeper on */}
        <Reveal delay={120}>
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan/80">
              Going deeper on
            </p>
            <p className="mt-2 text-sm text-mist/60">
              The agent stack I’m actively leveling up next.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {exploring.map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1 text-sm text-mist/80"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* claude certification */}
        <Reveal delay={180}>
          <div className="flex h-full flex-col justify-between rounded-2xl border border-amber/20 bg-amber/[0.04] p-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-amber" />
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber/90">
                  In progress
                </p>
              </div>
              <h3 className="mt-3 text-xl font-bold text-mist">Anthropic Claude Certification</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist/65">
                Formalizing what I already build with daily — prompt engineering, tool use, and
                agentic patterns on Claude.
              </p>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-mist/40">
              studying now
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
