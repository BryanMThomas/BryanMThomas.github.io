/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a1622',
        navy: '#1f3a52',
        slate2: '#0d1b2a',
        cyan: '#3fd0e0',
        amber: '#f6b352',
        violet: '#8a7cf0',
        mist: '#e8eef3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-28px,0) scale(1.06)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'none' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        beamDash: {
          to: { strokeDashoffset: '-24' },
        },
      },
      animation: {
        float: 'float 11s ease-in-out infinite',
        'float-slow': 'float 17s ease-in-out infinite',
        'fade-up': 'fadeUp .9s cubic-bezier(.2,.7,.2,1) both',
        'spin-slow': 'spinSlow 14s linear infinite',
        beam: 'beamDash .6s linear infinite',
      },
    },
  },
  plugins: [],
};
