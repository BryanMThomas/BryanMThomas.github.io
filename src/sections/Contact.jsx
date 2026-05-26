import React from 'react';
import Reveal from '../components/Reveal.jsx';

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-32 text-center">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan/80">Contact</p>
        <h2 className="mt-4 text-4xl font-extrabold leading-tight text-mist md:text-5xl">
          Let's build something at the frontier.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-mist/65">
          I'm an applied AI / forward-deployed engineer who ships production AI and the agent
          tooling behind it. If that's your problem, let's talk.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:thomas.bryan.m@gmail.com"
            className="rounded-full bg-cyan px-6 py-3 font-semibold text-ink transition hover:bg-amber"
          >
            thomas.bryan.m@gmail.com
          </a>
          <div className="flex gap-5 font-mono text-sm text-mist/60">
            <a className="transition hover:text-cyan" href="https://github.com/BryanMThomas" target="_blank" rel="noreferrer">GitHub</a>
            <a className="transition hover:text-cyan" href="https://www.linkedin.com/in/bryan-m-thomas/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </Reveal>
      <p className="mt-20 font-mono text-[10px] text-mist/30">
        Built by Bryan Thomas · React · Three.js · real Gemini embeddings · images by Nano Banana
      </p>
    </section>
  );
}
