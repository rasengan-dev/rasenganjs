import { defineConfig } from 'rasengan';
import tailwindcss from '@tailwindcss/vite';
import { rasengan } from 'rasengan/plugin';

export default defineConfig(async () => {
  return {
    server: {
      // 5321 so the demo can run alongside other playground apps (5320).
      development: {
        port: 5321,
      },
    },
    vite: {
      plugins: [tailwindcss(), rasengan()],
    },
  };
});
