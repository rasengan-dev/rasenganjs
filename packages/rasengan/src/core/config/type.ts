import type * as Vite from 'vite';
import { BuildOptions } from '../../server/build';

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

export type SageModeConfig = {
  /**
   * ReactCompiler option enable the React Compiler feature, in order to memoize automatically values, functions and react components.
   */
  reactCompiler?:
    | boolean
    | {
        compilationMode: 'annotation';
      };

  /**
   * rsc stands for React Server Component, this option enable all the feature related to RSC and makes rasengan.js becomes a really powerfull framework by leveraging more react features
   */
  // rsc?: boolean;
};

export type AppConfig = {
  /**
   * Enable ssr mode
   */
  ssr?: boolean;

  /**
   * Enable pre-rendering or not
   */
  prerender?:
    | boolean
    | {
        routes: string[];
      };

  /**
   * Enable much power by enabling reactCompiler and rsc features
   */
  sageMode?: SageModeConfig;

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

export type OptimizedAppConfig = {
  prerender?: AppConfig['prerender'];
  ssr?: AppConfig['ssr'];
  redirects: Redirect[];
  buildOptions: BuildOptions;
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
