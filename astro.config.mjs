// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://untitledmixedmedia.com',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    cacheDir: process.env.LOCALAPPDATA
      ? `${process.env.LOCALAPPDATA}/vite-cache/umm-website`
      : 'node_modules/.vite',
  },
  integrations: [sitemap()],
});
