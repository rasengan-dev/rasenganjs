import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@rasenganjs/mdx/plugin';
import { configure } from '@rasenganjs/vercel';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [mdx(), tailwindcss(), rasengan({ adapter: configure() })],
    },

    async redirects() {
      return [
        {
          source: '/docs',
          destination: '/docs/getting-started/installation',
          permanent: true,
        },
      ];
    },
  };
});

/**
 * prerender: boolean | string[] | {
 *   routes: string[]
 * }
 */

// git clone https://token@github.com/rasenganjs/docs.git
