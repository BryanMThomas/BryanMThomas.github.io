import React, { useRef } from 'react';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

// cursor-tracked 3D tilt + spotlight; children can include a .tilt-spotlight layer
export default function TiltCard({ children, className = '', maxTilt = 6 }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    if (!prefersReducedMotion()) {
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * maxTilt}deg) rotateY(${
        (px - 0.5) * maxTilt
      }deg)`;
    }
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}
