// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ginolencina-dev.netlify.app',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  vite: {
    // @ts-ignore — conflicto de tipos entre Vite de Tailwind 4 y Vite de Astro 5
    plugins: [tailwindcss()],
  }
});