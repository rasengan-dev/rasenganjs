import { defineConfig } from 'rasengan';
// import { rasengan } from 'rasengan/plugin';
import mdx from '@rasenganjs/mdx/plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [
        mdx(),
        tailwindcss(),
        // rasengan({
        //   adapter: 'vercel',
        // }),
      ],
    },
  };
});
