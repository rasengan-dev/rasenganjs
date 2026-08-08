import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: [
        'src/env.ts',
        'src/detect.ts',
        'src/types.ts',
        'src/adapters/node/**/*.ts',
      ],
      exclude: [
        'src/**/*.test.ts',
        'src/index.ts',
        'src/**/index.ts',
        'src/adapters/bun/**/*.ts',
        'src/adapters/workerd/**/*.ts',
      ],
    },
    testTimeout: 10000,
  },
});
