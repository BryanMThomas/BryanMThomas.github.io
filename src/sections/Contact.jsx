import React, { useEffect, useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import Aurora from '../components/Aurora.jsx';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

const prompts = [
  'Design a multi-agent system for our product…',
  'Ship an MCP server for our platform…',
  'Take our LLM feature from demo to production…',
  'Build the eval suite our agents are missing…',
];

// types each prompt, holds, deletes, moves to the next
function useTypewriter(phrases) {
  const [text, setText] = useState(prefersReducedMotion() ? phrases[0] : '');
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 0;
    let pos = 0;
    let deleting = false;
    let t;
    const step = () => {
      const phrase = phrases[i];
      pos += deleting ? -1 : 1;
      setText(phrase.slice(0, pos));
      let delay = deleting ? 22 : 46;
      if (!deleting && pos === phrase.length) {
        deleting = true;
        delay = 2200;
      } else if (deleting && pos === 0) {
        deleting = false;
        i = (i + 1) % phrases.length;
        delay = 500;
      }
      t = setTimeout(step, delay);
    };
    t = setTimeout(step, 800);
    return () => clearTimeout(t);
  }, [phrases]);
  return text;
}

export default function Contact() {
  const typed = useTypewriter(prompts);
  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-32 text-center">
      <Aurora a="#3fd0e0" b="#f6b352" flip />
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan/80">Contact</p>
        <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-mist md:text-6xl">
          Let's build something <span className="gradient-text">at the frontier</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-mist/65">
          I'm an applied AI / forward-deployed engineer who ships production AI and the agent
          tooling behind it. If that's your problem, let's talk.
        </p>

        {/* prompt-styled CTA — the ask goes straight to my inbox */}
        <a
          href="mailto:thomas.bryan.m@gmail.com"
          className="group mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-3 pl-5 text-left backdrop-blur transition hover:border-cyan/50 hover:shadow-[0_0_40px_rgba(63,208,224,0.15)]"
        >
          <span className="font-mono text-sm text-cyan">&gt;</span>
          <span className="caret min-h-[1.5rem] flex-1 truncate font-mono text-sm text-mist/80">
            {typed}
          </span>
          <span className="shrink-0 rounded-xl bg-cyan px-4 py-2.5 text-sm font-semibold text-ink transition group-hover:bg-amber">
            Email me ↵
          </span>
        </a>

        <div className="mt-8 flex items-center justify-center gap-6 font-mono text-sm text-mist/60">
          <a className="transition hover:text-cyan" href="mailto:thomas.bryan.m@gmail.com">
            thomas.bryan.m@gmail.com
          </a>
          <a
            className="transition hover:text-cyan"
            href="https://github.com/BryanMThomas"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="transition hover:text-cyan"
            href="https://www.linkedin.com/in/bryan-m-thomas/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </Reveal>
      <p className="mt-20 font-mono text-[10px] text-mist/30">
        Built by Bryan Thomas · React · Three.js · real Gemini embeddings · images by Nano Banana
      </p>
    </section>
  );
}
