import React from 'react';
import Reveal from '../components/Reveal.jsx';

const stats = [
  { v: '0→1', l: 'products from pitch to launch' },
  { v: '10-eng', l: 'squad I led as tech lead' },
  { v: '3×', l: 'promoted in 4 years' },
  { v: '5+ yrs', l: 'shipping production software' },
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
    points: ['Built a hybrid-cloud onboarding desktop app deployed across enterprise environments.'],
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
    points: ['Worked on the CRM platform behind a large share of company revenue — event-driven AWS integrations and customer-facing React features that lifted upsell conversion.'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-28 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan/80">Experience</p>
        <h2 className="mt-3 text-3xl font-extrabold text-mist md:text-4xl">
          From hackathon pitch to shipped AI product.
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="text-2xl font-extrabold text-cyan md:text-3xl">{s.v}</div>
              <div className="mt-1 text-xs text-mist/60">{s.l}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 space-y-6">
        {timeline.map((job, i) => (
          <Reveal key={job.org} delay={i * 60}>
            <div className={`rounded-2xl border p-6 ${job.featured ? 'border-cyan/25 bg-cyan/5' : 'border-white/10 bg-white/[0.03]'}`}>
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
