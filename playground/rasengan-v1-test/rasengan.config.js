import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import mdx from '@rasenganjs/mdx/plugin';
import tailwindcss from '@tailwindcss/vite';
import { configure } from '@rasenganjs/vercel';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [
        mdx(),
        tailwindcss(),
        rasengan({
          adapter: configure({}),
        }),
      ],
    },
  };
});
