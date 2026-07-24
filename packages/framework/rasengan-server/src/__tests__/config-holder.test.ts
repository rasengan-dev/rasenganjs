import { describe, it, expect, beforeEach } from 'vitest';
import { ConfigHolder } from '../config/holder.js';

describe('ConfigHolder', () => {
  beforeEach(() => {
    ConfigHolder.reset();
    delete process.env.RASENGAN_SERVER_CONFIG;
  });

  describe('set / get', () => {
    it('returns the config that was set', async () => {
      ConfigHolder.set({ port: 4000, host: '127.0.0.1' } as any);

      const result = await ConfigHolder.get();
      expect(result).toEqual({ port: 4000, host: '127.0.0.1' });
    });

    it('returns a frozen object', async () => {
      ConfigHolder.set({ port: 3000 } as any);

      const result = await ConfigHolder.get();
      expect(Object.isFrozen(result)).toBe(true);
    });

    it('applies overrides on top', async () => {
      ConfigHolder.set({ port: 3000, host: '0.0.0.0' } as any);

      const result = await ConfigHolder.get({ port: 5000 });
      expect(result).toEqual({ port: 5000, host: '0.0.0.0' });
    });

    it('overrides result is also frozen', async () => {
      ConfigHolder.set({ port: 3000 } as any);

      const result = await ConfigHolder.get({ port: 5000 });
      expect(Object.isFrozen(result)).toBe(true);
    });
  });

  describe('env var fallback', () => {
    it('reads from RASENGAN_SERVER_CONFIG env var', async () => {
      process.env.RASENGAN_SERVER_CONFIG = JSON.stringify({ port: 8080 });

      const result = await ConfigHolder.get();
      expect(result).toEqual({ port: 8080 });
    });

    it('env var with overrides works', async () => {
      process.env.RASENGAN_SERVER_CONFIG = JSON.stringify({
        port: 8080,
        host: '0.0.0.0',
      });

      const result = await ConfigHolder.get({ host: '127.0.0.1' });
      expect(result).toEqual({ port: 8080, host: '127.0.0.1' });
    });
  });

  describe('fallback to loadConfig', () => {
    it('returns defaults when no instance or env var is set', async () => {
      const result = await ConfigHolder.get();
      expect(result.port).toBe(3000);
      expect(result.entry).toBe('src/main.ts');
    });

    it('applies overrides on top of defaults', async () => {
      const result = await ConfigHolder.get({ port: 9999 });
      expect(result.port).toBe(9999);
      expect(result.entry).toBe('src/main.ts');
    });
  });

  describe('reset', () => {
    it('clears the cached instance so next get falls through', async () => {
      ConfigHolder.set({ port: 1111 } as any);
      ConfigHolder.reset();

      const result = await ConfigHolder.get();
      expect(result.port).toBe(3000);
    });
  });

  describe('order of precedence', () => {
    it('set() takes precedence over env var', async () => {
      process.env.RASENGAN_SERVER_CONFIG = JSON.stringify({ port: 8080 });
      ConfigHolder.set({ port: 3000 } as any);

      const result = await ConfigHolder.get();
      expect(result.port).toBe(3000);
    });

    it('env var takes precedence over defaults', async () => {
      process.env.RASENGAN_SERVER_CONFIG = JSON.stringify({ port: 7070 });

      const result = await ConfigHolder.get();
      expect(result.port).toBe(7070);
    });
  });
});
