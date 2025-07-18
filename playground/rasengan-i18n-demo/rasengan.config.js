import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import tailwindcss from '@tailwindcss/vite';
import i18n from '@rasenganjs/i18n/plugin';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [
        tailwindcss(),
        i18n({
          defaultLocale: 'fr',
          resources: {
            source: '/translations',
          },
        }),
        rasengan({}),
      ],
    },
  };
});
