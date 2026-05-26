import React from 'react';
import Reveal from '../components/Reveal.jsx';

const interests = [
  'Dirtbiking', '45-mph e-bike commute', 'Camping', 'Golf',
  'Phoenix Suns', 'Cardinals', 'Seahawks', 'Steelers',
  'Laguna & Dana Point', 'Corgi dad 🐕',
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-5xl px-6 py-28 md:py-36">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan/80">About</p>
      </Reveal>
      <div className="mt-8 grid items-start gap-10 md:grid-cols-[200px_1fr]">
        <Reveal>
          <img
            src="/img/avatar.png"
            alt="Bryan Thomas"
            className="w-40 rounded-2xl border border-white/10 shadow-2xl md:w-full"
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="space-y-5 text-lg leading-relaxed text-mist/85">
            <p>
              I'm an applied AI engineer at Microsoft, where I lead the technical build of
              conversational AI for employee listening — from a hackathon pitch to an
              EVP-sponsored product with <span className="text-cyan">15,000+</span> real conversations.
            </p>
            <p>
              I build production LLM systems <em>and</em> the multi-agent tooling behind them — and
              I do it for fun, too: an 8-agent ops fleet (<span className="text-cyan">OpenClaw</span>),
              a LangGraph travel planner (<span className="text-cyan">TripHelm</span>), and a
              contractor SaaS (<span className="text-cyan">BryxBids</span>). I like being the engineer
              who ships the hard thing and helps everyone else ship with AI too.
            </p>
            <p>
              Phoenix-raised, <span className="text-amber">ASU</span> grad, now in Seattle. Off the
              keyboard you'll find me dirtbiking, camping, on the golf course, or at a beach in
              Laguna or Dana Point with my corgi <span className="text-amber">Hilo</span> — yes, the
              same Hilo I named TripHelm's AI assistant after.
            </p>
          </div>
        </Reveal>
      </div>
      <Reveal delay={150}>
        <div className="mt-8 flex flex-wrap gap-2">
          {interests.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-mist/70">
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
