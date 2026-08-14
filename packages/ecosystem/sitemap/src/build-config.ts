import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

export interface RasenganRedirect {
  source: string;
  destination: string;
  permanent?: boolean;
}

export interface RasenganBuildOptions {
  buildDirectory: string;
  staticDirectory: string;
  clientPathDirectory: string;
  serverPathDirectory: string;
  assetPathDirectory: string;
}

export interface RasenganBuildConfig {
  buildOptions: RasenganBuildOptions;
  ssr: boolean;
  prerender: boolean;
  redirects: RasenganRedirect[];
}

/**
 * Locate and parse the `config.json` `rasengan build` writes, same file
 * `@rasenganjs/vercel`/`@rasenganjs/netlify` already read post-build. Tries
 * both locations those adapters try (SSR/SSG puts it under `client/`, SPA
 * doesn't).
 */
export async function loadBuildConfig(
  cwd: string
): Promise<RasenganBuildConfig> {
  const candidates = [
    path.posix.join(cwd, 'dist', 'client', 'assets', 'config.json'),
    path.posix.join(cwd, 'dist', 'assets', 'config.json'),
  ];

  for (const candidate of candidates) {
    try {
      await access(candidate);
      const text = await readFile(candidate, 'utf-8');
      const parsed = JSON.parse(text) as RasenganBuildConfig;
      return { ...parsed, redirects: parsed.redirects ?? [] };
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error(
    'Could not find dist/client/assets/config.json or dist/assets/config.json. ' +
      'Run `rasengan build` before `rasengan-sitemap`.'
  );
}
