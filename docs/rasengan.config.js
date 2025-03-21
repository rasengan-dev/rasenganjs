import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@rasenganjs/mdx/plugin';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [mdx(), tailwindcss(), rasengan({ prerender: true })],
    },
  };
});

/**
 * prerender: boolean | string[] | {
 *   routes: string[]
 * }
 */

// git clone https://token@github.com/rasenganjs/docs.git
