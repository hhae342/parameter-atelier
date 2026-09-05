import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/parameter-atelier/',
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
});
