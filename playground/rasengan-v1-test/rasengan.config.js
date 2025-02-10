import { defineConfig } from 'rasengan';
import mdx from '@rasenganjs/mdx/plugin';

export default defineConfig({
  vite: {
    plugins: [mdx()],
  },
});
