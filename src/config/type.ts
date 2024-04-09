export type AppConfig = {
  /**
   * Enable strict mode
   * @default true
   */
  reactStrictMode?: boolean;

  /**
   * Configure server both in development and production
   */
  server?: {
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

    /**
     * Configure server in production
     */
    production?: {
      /**
       * Set the hosting strategy
       * @default "custom"
       */
      hosting?: HostingStrategy;
    };
  };

  /**
   * Configure Vite
   */
  vite?: {
    /**
     * Configure Vite plugins
     */
    plugins?: any[];

    /**
     * Optimize dependencies
     */
    optimizeDeps?: {
      /**
       * Dependencies to exclude from the optimized bundle
       */
      exclude?: string[];

      /**
       * Dependencies to include in the optimized bundle
       */
      include?: string[];
    };

    /**
     * Configure css options
     */
    css?: {
      postcss?: {
        plugins?: any[];
      };
    };

    /**
     * Configure build options
     */
    build?: {
      /**
       * Configure external dependencies
       */
      external?: string[];
    };

    /**
     * Configure resolve options
     */
    resolve?: {
      /**
       * Configure aliases
       */
      alias?: Array<{
        find: string;
        replacement: string;
      }>;
    };
  };
  // More config options...
};

/**
 * Hosting strategy
 */
export type HostingStrategy = "vercel" | "custom";
