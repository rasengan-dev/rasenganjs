import { describe, it, expect, afterEach } from 'vitest';
import { ServerMode, isServerMode } from '../../../server/runtime/mode.js';
import { checkOsPlateform } from '../../../server/runtime/utils.js';
import { detectDeploymentPlatform } from '../../../server/runtime/detect-runtime.js';

describe('ServerMode / isServerMode', () => {
  it('accepts each enum member', () => {
    expect(isServerMode(ServerMode.Development)).toBe(true);
    expect(isServerMode(ServerMode.Production)).toBe(true);
    expect(isServerMode(ServerMode.Test)).toBe(true);
  });

  it('rejects an arbitrary string', () => {
    expect(isServerMode('staging')).toBe(false);
  });

  it('rejects non-string values', () => {
    expect(isServerMode(undefined)).toBe(false);
    expect(isServerMode(null)).toBe(false);
    expect(isServerMode(42)).toBe(false);
  });
});

describe('checkOsPlateform', () => {
  it('matches the real current platform', () => {
    expect(checkOsPlateform(process.platform as any)).toBe(true);
  });

  it('does not match an OS name that is not the current one', () => {
    const other = process.platform === 'win32' ? 'linux' : 'win32';
    expect(checkOsPlateform(other as any)).toBe(false);
  });
});

describe('detectDeploymentPlatform', () => {
  const keys = ['VERCEL', 'NETLIFY', 'NODE_ENV'] as const;
  const saved: Record<string, string | undefined> = {};

  function snapshot() {
    for (const key of keys) saved[key] = process.env[key];
  }

  function restore() {
    for (const key of keys) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }

  afterEach(restore);

  it('detects vercel via VERCEL=1', () => {
    snapshot();
    delete process.env.NETLIFY;
    process.env.VERCEL = '1';
    expect(detectDeploymentPlatform()).toBe('vercel');
  });

  it('detects netlify via NETLIFY=true', () => {
    snapshot();
    delete process.env.VERCEL;
    process.env.NETLIFY = 'true';
    expect(detectDeploymentPlatform()).toBe('netlify');
  });

  it('vercel takes priority over netlify when both are set', () => {
    snapshot();
    process.env.VERCEL = '1';
    process.env.NETLIFY = 'true';
    expect(detectDeploymentPlatform()).toBe('vercel');
  });

  it('detects local via NODE_ENV=development', () => {
    snapshot();
    delete process.env.VERCEL;
    delete process.env.NETLIFY;
    process.env.NODE_ENV = 'development';
    expect(detectDeploymentPlatform()).toBe('local');
  });

  it('detects local via NODE_ENV=test', () => {
    snapshot();
    delete process.env.VERCEL;
    delete process.env.NETLIFY;
    process.env.NODE_ENV = 'test';
    expect(detectDeploymentPlatform()).toBe('local');
  });

  it('falls back to unknown when nothing matches', () => {
    snapshot();
    delete process.env.VERCEL;
    delete process.env.NETLIFY;
    process.env.NODE_ENV = 'production';
    expect(detectDeploymentPlatform()).toBe('unknown');
  });
});
