import React from 'react';
import Reveal from '../components/Reveal.jsx';
import Aurora from '../components/Aurora.jsx';
import TiltCard from '../components/TiltCard.jsx';

const ventures = [
  {
    name: 'TripHelm',
    img: '/img/triphelm.webp',
    tagline: 'Plan trips minute by minute — from your own AI.',
    body: 'A drag-and-drop itinerary canvas with an MCP server that exposes the whole trip as tool-callable data. Plan manually, or tell Claude/ChatGPT/Perplexity "put my Kyoto trip in TripHelm" and watch it land on the calendar. Its assistant, Hilo, shares a name with my corgi.',
    tags: ['Next.js 15', 'MCP server', 'Prisma · Postgres', 'WorkOS'],
    live: 'https://triphelm.com',
    repo: 'https://github.com/BryanMThomas/triphelm-showcase',
  },
  {
    name: 'BryxBids',
    img: '/img/bryxbids.webp',
    tagline: 'Proposal SaaS for contractors.',
    body: 'A multi-tenant SaaS with a drag-and-drop visual proposal editor, pixel-accurate PDF export, and Stripe billing — time-to-value from hours to 30 seconds.',
    tags: ['Next.js', 'Supabase', 'Postgres RLS', 'Stripe'],
    live: 'https://bryxbids.com',
    repo: 'https://github.com/BryanMThomas/bryxbids-showcase',
  },
  {
    name: 'Code & Capital',
    img: '/img/codecapital.webp',
    tagline: 'Building in public.',
    body: 'My content endeavor on engineering, AI, and entrepreneurship — sharing how I build production AI systems and ship products solo.',
    tags: ['Content', 'AI', 'Entrepreneurship'],
    repo: 'https://github.com/BryanMThomas',
  },
];

export default function Ventures() {
  return (
    <section id="ventures" className="relative mx-auto max-w-6xl px-6 py-28 md:py-32">
      <Aurora a="#f6b352" b="#3fd0e0" flip />
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan/80">Ventures</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-mist md:text-5xl">
          Products I <span className="gradient-text">build and ship</span> on the side.
        </h2>
        <p className="mt-3 max-w-2xl text-mist/60">
          Founder-built, shipped, and live. The same frontier tooling I work with by day — turned
          into real products.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {ventures.map((v, i) => (
          <Reveal key={v.name} delay={i * 90} className="h-full">
            <TiltCard className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-cyan/40 hover:shadow-[0_8px_40px_rgba(63,208,224,0.12)]">
                <div
                  aria-hidden="true"
                  className="tilt-spotlight pointer-events-none absolute inset-0 z-10"
                />
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={v.img}
                    alt={`${v.name} — ${v.tagline}`}
                    width="1024"
                    height="1024"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-bold text-mist">{v.name}</h3>
                  <p className="mt-1 text-sm font-medium text-cyan/90">{v.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist/70">{v.body}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {v.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-mist/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-4 font-mono text-xs">
                    {v.live && (
                      <a
                        href={v.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan transition hover:text-amber"
                      >
                        Live ↗
                      </a>
                    )}
                    {v.repo && (
                      <a
                        href={v.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-mist/60 transition hover:text-mist"
                      >
                        Case study ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
