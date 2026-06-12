import React, { useEffect, useRef } from 'react';

// thin cyan progress bar pinned to the top of the viewport
export default function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
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
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5">
      <div
        ref={ref}
        className="h-full origin-left bg-gradient-to-r from-cyan via-violet to-amber"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
