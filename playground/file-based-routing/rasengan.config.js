import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@rasenganjs/mdx/plugin';
// import { configure } from '@rasenganjs/netlify';

export default defineConfig(async () => {
  return {
    // ssr: false,
    vite: {
      plugins: [
        tailwindcss(),
        mdx(),
        rasengan({
          // adapter: configure({}),
        }),
      ],
    },
  };
});
