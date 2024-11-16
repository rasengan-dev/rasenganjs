export type AppConfig = {
	/**
	 * Enable strict mode
	 * @default true
	 * @deprecated
	 * This option will be removed in the future, prefer using the "StrictMode" component from your App component props or from "react"
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
			 * Configure the starting point of the aliases
			 */
			symbole?: string;

			/**
			 * Configure aliases
			 */
			alias?: Array<{
				find: string;
				replacement: string;
			}>;
		};

		appType: "custom" | "mpa";
	};

	/**
	 * List of experimental features
	 */
	// experimental?: {
	// 	/**
	// 	 * Enable stream mode in order to use suspense feature of react
	// 	 */
	// 	stream?: boolean;
	// };

	/**
	 * Configure the app
	 */
	redirects?: () => Promise<Redirect[]>;

	// More config options...
};

export type AppConfigFunction = () => AppConfig;

export type AppConfigFunctionAsync = () => Promise<AppConfig>;

/**
 * Hosting strategy
 */
export type HostingStrategy = "vercel" | "custom";

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
}
