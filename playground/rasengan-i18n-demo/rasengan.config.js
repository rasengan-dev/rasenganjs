import { defineConfig } from 'rasengan';
import tailwindcss from '@tailwindcss/vite';
import i18n from '@rasenganjs/i18n/plugin';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [
        tailwindcss(),
        i18n({
          defaultLocale: 'fr',
          locales: ['en', 'es', 'fr'],
          resources: {
            source: '/translations',
          },
        }),
      ],
    },
  };
});
