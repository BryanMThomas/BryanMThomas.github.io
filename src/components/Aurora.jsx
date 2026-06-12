import React from 'react';

// soft drifting glow blobs behind a section — parent must be position:relative
export default function Aurora({ a = '#3fd0e0', b = '#8a7cf0', flip = false }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute h-[26rem] w-[26rem] rounded-full blur-3xl animate-float ${
          flip ? '-right-32 -top-24' : '-left-32 -top-24'
        }`}
        style={{ background: a, opacity: 0.07 }}
      />
      <div
        className={`absolute h-[30rem] w-[30rem] rounded-full blur-3xl animate-float-slow ${
          flip ? '-left-40 -bottom-32' : '-right-40 -bottom-32'
        }`}
        style={{ background: b, opacity: 0.055 }}
      />
    </div>
  );
}
