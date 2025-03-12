import { defineConfig } from 'rasengan';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@rasenganjs/mdx/plugin';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [mdx(), tailwindcss()],
    },
  };
});
