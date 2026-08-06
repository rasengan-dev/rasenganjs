export type RuntimeEnvironment = 'vercel' | 'netlify' | 'local' | 'unknown';

/**
 * Detects the *deployment platform* (Vercel, Netlify, local, ...) via
 * env vars — unrelated to the JS runtime (Node/Bun/Workerd). Named
 * `detectDeploymentPlatform`, not `detectRuntime`, to avoid colliding
 * with `@rasenganjs/runtime`'s own `detectRuntime` (RFC-0007 §5).
 */
export function detectDeploymentPlatform(): RuntimeEnvironment {
  if (process.env.VERCEL === '1') {
    return 'vercel';
  }

  if (process.env.NETLIFY === 'true') {
    return 'netlify';
  }

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    return 'local';
  }

  return 'unknown';
}
