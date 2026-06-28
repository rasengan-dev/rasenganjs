import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  webServer: process.env.CI
    ? {
        command:
          'pnpm --filter @rasenganjs/serve run build && pnpm --filter @rasenganjs/serve run start',
        port: 4173,
        reuseExistingServer: true,
      }
    : undefined,
});
