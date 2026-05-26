import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom domain (bryan-thomas.com) serves at root, so base = '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
