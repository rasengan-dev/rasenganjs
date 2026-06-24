/**
 * Environment variable utilities for Rasengan.
 *
 * `parseEnv()` is a zero-dependency .env file parser that
 * follows the dotenv convention:
 *   - `KEY=VALUE` on each line
 *   - `#` comments
 *   - single/double quoted values
 *   - `export` prefix silently ignored
 *   - blank lines skipped
 */

export type EnvironmentMap = Record<string, string>;

/**
 * Parse the text content of a .env file into a key-value map.
 *
 * Later keys override earlier ones (within a single file).
 *
 * @example
 * ```ts
 * parseEnv('PORT=3000\nHOST=localhost')
 * // => { PORT: '3000', HOST: 'localhost' }
 * ```
 */
export function parseEnv(text: string): EnvironmentMap {
  const env: EnvironmentMap = {};

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim();

    // Skip blank lines and comments
    if (!line || line.startsWith('#')) continue;

    // Strip optional `export ` prefix
    const withoutExport = line.startsWith('export ')
      ? line.slice(7).trimStart()
      : line;

    // Find the first `=` that separates key from value
    const eqIdx = withoutExport.indexOf('=');
    if (eqIdx === -1) continue;

    const key = withoutExport.slice(0, eqIdx).trim();
    if (!key) continue;

    let value = withoutExport.slice(eqIdx + 1).trim();

    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

/**
 * Priority-ordered .env file names following the dotenv convention.
 *
 * Order: later files override earlier ones.
 *   ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`]
 */
export function getEnvFileNames(mode: 'development' | 'production'): string[] {
  return ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`];
}
