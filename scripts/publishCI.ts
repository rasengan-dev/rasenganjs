import { publish } from '@vitejs/release-scripts';
import { getPkgDir } from './pkg-path.js';

publish({
  defaultPackage: 'rasengan',
  packageManager: 'pnpm',
  provenance: true,
  // Without this, publish()'s own internal package-dir resolution
  // defaults to `packages/${pkg}` (per @vitejs/release-scripts' own
  // docs) — stale since the monorepo restructure. See scripts/pkg-path.ts.
  getPkgDir,
});
