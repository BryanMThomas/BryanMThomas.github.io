import React, { useEffect, useState } from 'react';
import useInView from '../hooks/useInView.js';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 1300,
  className = '',
}) {
  const [ref, inView] = useInView(0.6);
  const [display, setDisplay] = useState(prefersReducedMotion() ? value : 0);
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
