import { defineConfig } from 'rasengan';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [tailwindcss()],
    },
  };
});
