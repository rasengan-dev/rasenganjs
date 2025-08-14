import { defineConfig } from 'rasengan';
import tailwindcss from '@tailwindcss/vite';
import { rasengan } from 'rasengan/plugin';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [tailwindcss(), rasengan()],
    },
  };
});
