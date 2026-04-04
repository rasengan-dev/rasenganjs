import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@rasenganjs/mdx/plugin';
import { configure } from '@rasenganjs/vercel';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';

export default defineConfig(async () => {
  return {
    prerender: true,

    vite: {
      plugins: [
        mdx({
          // rehypePlugins: [rehypeKatex],
          // remarkPlugins: [remarkMath],
          code: { keepBackground: false },
        }),
        tailwindcss(),
        rasengan({ adapter: configure() }),
      ],
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
