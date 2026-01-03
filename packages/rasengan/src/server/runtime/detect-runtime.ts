export type RuntimeEnvironment = 'vercel' | 'netlify' | 'local' | 'unknown';

export function detectRuntime(): RuntimeEnvironment {
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
