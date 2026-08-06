import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@rasenganjs/mdx/plugin';

export default defineConfig(async () => {
  return {
    ssr: false,
    // runtime: 'bun',
    prerender: true,
    vite: {
      plugins: [tailwindcss(), mdx(), rasengan({})],
    },
  };
});
