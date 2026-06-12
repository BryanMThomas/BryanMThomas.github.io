import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from './hooks/usePrefersReducedMotion.js';
import ScrollProgress from './components/ScrollProgress.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Experience from './sections/Experience.jsx';
import Ventures from './sections/Ventures.jsx';
import OpenClaw from './sections/OpenClaw.jsx';
import Lab from './sections/Lab.jsx';
import Contact from './sections/Contact.jsx';

function Divider() {
  return (
    <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-cyan/25 to-transparent" />
  );
}

export default function App() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // smooth anchor navigation
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: 0 });
        }
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <div aria-hidden="true" className="noise" />
      <Hero />
      <main className="relative z-10 bg-ink">
        <About />
        <Divider />
        <Experience />
        <Divider />
        <Ventures />
        <Divider />
        <OpenClaw />
        <Divider />
        <Lab />
        <Divider />
        <Contact />
      </main>
    </div>
  );
}
