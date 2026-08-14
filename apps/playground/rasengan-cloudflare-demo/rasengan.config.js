import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import { configure } from '@rasenganjs/cloudflare';

export default defineConfig({
  ssr: true,
  runtime: 'workerd',
  vite: {
    plugins: [
      rasengan({
        adapter: configure({}),
      }),
    ],
  },
});
