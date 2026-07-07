import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig } from '../cli/config.js';
import type { RasenganServerConfig } from './index.js';

export class ConfigHolder {
  private static instance: Readonly<RasenganServerConfig> | null = null;

  static set(config: RasenganServerConfig): void {
    ConfigHolder.instance = Object.freeze({ ...config });
  }

  /** Clear the cached config (useful in tests). */
  static reset(): void {
    ConfigHolder.instance = null;
  }

  static async get(
    overrides?: Partial<RasenganServerConfig>
  ): Promise<Readonly<RasenganServerConfig>> {
    if (ConfigHolder.instance) {
      return applyOverrides(ConfigHolder.instance, overrides);
    }

    const envConfig = process.env.RASENGAN_SERVER_CONFIG;
    if (envConfig) {
      try {
        const parsed = JSON.parse(envConfig) as RasenganServerConfig;
        ConfigHolder.instance = Object.freeze(parsed);
        return applyOverrides(ConfigHolder.instance, overrides);
      } catch {}
    }

    try {
      const configPath = join(process.cwd(), 'dist', 'config.json');
      const text = readFileSync(configPath, 'utf-8');
      const parsed = JSON.parse(text) as RasenganServerConfig;
      ConfigHolder.instance = Object.freeze(parsed);
      return applyOverrides(ConfigHolder.instance, overrides);
    } catch {}

    ConfigHolder.instance = Object.freeze(await loadConfig());
    return applyOverrides(ConfigHolder.instance, overrides);
  }
}

function applyOverrides(
  base: Readonly<RasenganServerConfig>,
  overrides?: Partial<RasenganServerConfig>
): Readonly<RasenganServerConfig> {
  if (overrides && Object.keys(overrides).length > 0) {
    return Object.freeze({ ...base, ...overrides });
  }
  return base;
}
