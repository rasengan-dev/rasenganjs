export interface BuildConfig {
  outDir?: string;
  minify?: boolean;
  formats?: Array<'single-file' | 'directory'>;
}

export interface RasenganServerConfig {
  entry?: string;
  port?: number;
  host?: string;
  preset?: 'node' | 'bun' | 'workerd';
  watchDir?: string | string[];
  build?: BuildConfig;
}

export function defineConfig(
  config: RasenganServerConfig
): RasenganServerConfig {
  return config;
}
