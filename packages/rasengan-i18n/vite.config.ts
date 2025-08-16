import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        plugin: resolve(__dirname, 'src/plugin.ts'),
      },
      name: 'rasengan-i18n',
    },
    rollupOptions: {
      // external: ['virtual:rasengan/i18n'],

      output: {
        dir: 'lib',
      },
    },
  },
});
