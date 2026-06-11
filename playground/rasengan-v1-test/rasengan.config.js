import { defineConfig } from 'rasengan';
import { rasengan } from 'rasengan/plugin';
import mdx from '@rasenganjs/mdx/plugin';
import tailwindcss from '@tailwindcss/vite';
import { configure } from '@rasenganjs/vercel';

export default defineConfig({
  ssr: false,
  prerender: true,
  vite: {
    plugins: [
      mdx({
        code: {
          theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        },
      }),
      tailwindcss(),
      rasengan({
        adapter: configure({}),
      }),
    ],
  },

  redirects: () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
});
