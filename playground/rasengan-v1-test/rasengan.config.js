import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import mdx from '@rasenganjs/mdx/plugin';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [
        mdx(),
        rasengan({
          adapter: 'vercel',
        }),
      ],
    },
  };
});
