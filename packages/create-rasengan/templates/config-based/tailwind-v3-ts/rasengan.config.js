import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';

export default defineConfig({
  vite: {
    plugins: [rasengan()],
  },
});
