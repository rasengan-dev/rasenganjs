import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@rasenganjs/mdx/plugin';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [
        tailwindcss(),
        rasengan({}),
        mdx({ code: { keepBackground: false } }),
      ],
    },
  };
});
