import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kubiko.my.id',
  output: 'static',
  compressHTML: true
});
