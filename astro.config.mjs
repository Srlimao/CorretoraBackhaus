import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://srlimao.github.io',
  base: '/CorretoraBackhaus',
  integrations: [tailwind({
    applyBaseStyles: false,
  })],
  build: {
    format: 'directory'
  }
});
