import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';

// _api/ routes (RFC-0008) require ssr: true with prerender disabled —
// that's the only build shape that produces dist/server/api-router.js.
// See proposals/RFC-0008-Api-Routes.md §9.
export default defineConfig(async () => {
  return {
    ssr: true,
    vite: {
      plugins: [rasengan({})],
    },
  };
});
