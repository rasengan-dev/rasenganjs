import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';

export default defineConfig({
  // The serve suite builds this app twice: SSR, then prerendered.
  prerender: process.env.RASENGAN_FIXTURE_PRERENDER === '1',
  // Destination under the source path, like the docs site's own config.
  redirects: async () => [
    { source: '/docs', destination: '/docs/intro', permanent: true },
  ],
  vite: {
    plugins: [rasengan()],
  },
});
