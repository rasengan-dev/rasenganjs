import path from 'node:path';
import type { RasenganBuildConfig } from './build-config.js';

/**
 * Same directory-selection logic `@rasenganjs/vercel`'s `copyStaticFiles()`
 * already uses: prerender output lives in a top-level `static/` sibling of
 * `dist/`, SSR output's client half lives in `dist/client/`, SPA output is
 * the bare `dist/`.
 */
export function resolveOutputDirectory(
  cwd: string,
  build: RasenganBuildConfig
): string {
  if (build.prerender) {
    return path.posix.join(cwd, build.buildOptions.staticDirectory);
  }

  if (build.ssr) {
    return path.posix.join(
      cwd,
      build.buildOptions.buildDirectory,
      build.buildOptions.clientPathDirectory
    );
  }

  return path.posix.join(cwd, build.buildOptions.buildDirectory);
}
