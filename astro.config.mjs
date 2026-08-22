import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.backhausimoveis.com.br',
  base: '/',
  integrations: [tailwind({
    applyBaseStyles: false,
  })],
  build: {
    format: 'directory'
  }
});
