import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://dart-production.vercel.app',
  output: 'static',
  adapter: vercel(),
});
