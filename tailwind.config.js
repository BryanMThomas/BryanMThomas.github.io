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
    },
  },
  plugins: [],
};
