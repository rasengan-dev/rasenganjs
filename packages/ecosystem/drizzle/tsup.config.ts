import { defineConfig } from 'tsup';

// Two entries, mirroring the package's subpath exports: importing the
// core ("@rasenganjs/drizzle") must never pull in a specific driver's
// client package (see src/index.ts).
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'drivers/node-postgres': 'src/drivers/node-postgres.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['@rasenganjs/server', 'drizzle-orm', 'pg'],
});
