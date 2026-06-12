import React, { useEffect, useRef } from 'react';
import Reveal from '../components/Reveal.jsx';
import Aurora from '../components/Aurora.jsx';
import CountUp from '../components/CountUp.jsx';

const stats = [
  { prefix: '0→', value: 1, suffix: '', l: 'products from pitch to launch' },
  { prefix: '', value: 10, suffix: '-eng', l: 'squad I led as tech lead' },
  { prefix: '', value: 3, suffix: '×', l: 'promoted in 4 years' },
  { prefix: '', value: 5, suffix: '+ yrs', l: 'shipping production software' },
];

const timeline = [
  {
    org: 'Microsoft — Employee Voice & Experience',
    role: 'Sr. Applied AI Engineer',
    when: 'May 2025 — Present',
    featured: true,
    points: [
      'Pitched an AI alternative to employee surveys at a hackathon → won executive sponsorship, stood up an engineering squad, and led it to pilot as technical lead.',
      'Shipped the core product: an AI interviewer that replaces surveys with natural conversations and real-time transcript analysis — sentiment, themes, action recommendations.',
      'Built the evaluation platform non-engineers use to run their own prompt experiments.',
      'Implemented a deterministic pre-model AI safety layer that cleared enterprise responsible-AI review.',
      'Ran internal workshops and a shared plugin marketplace that got non-engineers shipping their own prototypes.',
    ],
  },
  {
    org: 'Microsoft — Viva Pulse',
    role: 'Software Engineer 2',
    when: 'Mar 2023 — May 2025',
    points: [
      'Owned multi-survey scheduling end-to-end — it became one of the product’s highest-retention features.',
      'Led a monolith → modular-microservices transition that sped up new-developer onboarding.',
    ],
  },
  {
    org: 'Microsoft — Azure ARC',
    role: 'Software Engineer',
    when: 'Aug 2021 — Mar 2023',
    points: [
      'Built a hybrid-cloud onboarding desktop app deployed across enterprise environments.',
    ],
  },
  {
    org: 'Independent — AI & Product Consulting',
    role: 'Consultant',
    when: '2024 — Present',
    points: [
      'Year-long engagement building product and AI features for an early-stage agentic-commerce startup.',
      'Stood up the AI image-generation pipeline for an interior-design studio (Ruby Lantern Design) — turning a room photo and a few preferences into curated design concepts.',
    ],
  },
  {
    org: 'GoDaddy',
    role: 'Full Stack Software Engineer',
    when: 'Dec 2018 — Jul 2021',
    points: [
      'Worked on the CRM platform behind a large share of company revenue — event-driven AWS integrations and customer-facing React features that lifted upsell conversion.',
    ],
  },
];

// gradient rail that fills as the timeline scrolls through the viewport
function TimelineRail({ wrapRef }) {
  const fillRef = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const fill = fillRef.current;
      if (!wrap || !fill) return;
      const r = wrap.getBoundingClientRect();
      const passed = Math.min(Math.max(window.innerHeight * 0.72 - r.top, 0), r.height);
      fill.style.height = `${(passed / r.height) * 100}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [wrapRef]);
  return (
    <div aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-white/10">
      <div
        ref={fillRef}
        className="w-full bg-gradient-to-b from-cyan via-violet to-amber shadow-[0_0_12px_rgba(63,208,224,0.7)]"
        style={{ height: 0 }}
      />
    </div>
  );
}

export default function Experience() {
  const wrapRef = useRef(null);
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-28 md:py-32">
      <Aurora a="#8a7cf0" b="#3fd0e0" />
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan/80">Experience</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-mist md:text-5xl">
          From hackathon pitch to <span className="gradient-text">shipped AI product</span>.
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.l}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-cyan/30 hover:bg-cyan/5"
            >
              <div className="text-2xl font-extrabold text-cyan md:text-3xl">
                <CountUp prefix={s.prefix} value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-mist/60">{s.l}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div ref={wrapRef} className="relative mt-12">
        <TimelineRail wrapRef={wrapRef} />
        <div className="space-y-6">
          {timeline.map((job, i) => (
            <Reveal key={job.org} delay={i * 60}>
              <div className="relative pl-8 md:pl-10">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-8 h-[15px] w-[15px] rounded-full border-2 bg-ink ${
                    job.featured
                      ? 'border-cyan shadow-[0_0_14px_rgba(63,208,224,0.9)]'
                      : 'border-mist/40 shadow-[0_0_8px_rgba(232,238,243,0.25)]'
                  }`}
                />
                <div
                  className={`rounded-2xl border p-6 transition hover:border-cyan/30 ${job.featured ? 'border-cyan/25 bg-cyan/5' : 'border-white/10 bg-white/[0.03]'}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-mist">{job.org}</h3>
                      <p className="text-sm italic text-mist/60">{job.role}</p>
                    </div>
                    <span className="font-mono text-xs text-mist/45">{job.when}</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {job.points.map((p, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed text-mist/80">
                        <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/70" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
