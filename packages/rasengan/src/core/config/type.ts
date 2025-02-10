import type * as Vite from "vite";

export type PartialAppConfig = {
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
	};

	/**
	 * Configure the app
	 */
	redirects?: () => Promise<Redirect[]>;
};

export type AppConfig = PartialAppConfig & {
	/**
	 * Configure Vite
	 */
	vite?: {
		/**
		 * Configure Vite plugins
		 */
		plugins?: Vite.Plugin[];

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
			postcss?: string;
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
};

export type ProductionAppConfig = Omit<PartialAppConfig, "redirects"> & {
	redirects: Redirect[];
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
};
