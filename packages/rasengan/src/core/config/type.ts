import type * as Vite from 'vite';

export interface ServerConfig {
  /**
   * Configure server in development
   */
  development?: {
    /**
     * Port to listen on
     * @default 5320
     */
    port?: number;

    /**
     * Automatically open browser
     * @default false
     */
    open?: boolean;
  };
}

export interface ViteConfig
  extends Omit<
    Vite.UserConfig,
    | 'plugins'
    | 'environments'
    | 'appType'
    | 'resolve'
    | 'cacheDir'
    | 'envPrefix'
    | 'builder'
    | 'ssr'
    | 'server'
    | 'build'
    | 'ssrEmitAssets'
    | 'root'
    | 'base'
  > {
  plugins?: Vite.Plugin[];
  resolve?: {
    symbole?: string;
    alias?: Array<{
      find: string;
      replacement: string;
    }>;
  };
  build?: {
    external?: string[];
  };
  appType?: 'spa' | 'mpa' | 'custom';
}

export type AppConfig = {
  ssr?: boolean;

  /**
   * Configure server
   */
  server?: ServerConfig;

  /**
   * Configure Vite
   */
  vite?: ViteConfig;

  /**
   * Configure the app
   */
  redirects?: () => Promise<Redirect[]>;
};

export type AppConfigFunction = () => AppConfig;

export type AppConfigFunctionAsync = () => Promise<AppConfig>;

/**
 * Redirect
 */
export type Redirect = {
  /**
   * Source path
   */
  source: string;

  /**
   * Destination path
   */
  destination: string;

  /**
   * Permanent redirect
   */
  permanent?: boolean;
};

// export type ConfigOptions = {
//   mode: 'development' | 'production' | 'test';
//   command: 'serve' | 'build';
//   isSsrBuild?: boolean;
// };
