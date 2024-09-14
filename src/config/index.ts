// import path, { dirname } from "node:path";
import { type AppConfig } from "./type.js";
// import { fileURLToPath } from "node:url";

/**
 * Function to define the config for the app
 * It will be used by vite.config.ts and other files in other to configure the app
 * @param {AppConfig} loadedConfig
 */
export const defineConfig = (loadedConfig: AppConfig) => {
  const { reactStrictMode, server, vite, experimental } = loadedConfig;

  // Define default values for vite config coming from loadedConfig.vite
  const defaultViteConfig = {
    plugins: vite?.plugins || [],
    optimizeDeps: {
      exclude: vite?.optimizeDeps?.exclude || [],
      include: vite?.optimizeDeps?.include || [],
    },
    css: {
      postcss: vite?.css?.postcss || undefined,
    },
    build: {
      external: vite?.build?.external || [],
    },
    resolve: {
      symbole: vite?.resolve?.symbole || '@',
      alias: vite?.resolve?.alias || [],
    },
  };

  // Define default values for server config coming from loadedConfig.server
  const defaultServerConfig = {
    development: {
      port: server?.development?.port || undefined,
      open: server?.development?.open || false,
    },

    production: {
      hosting: server?.production?.hosting || "custom",
    },
  };

  // Define default values for experimentals features coming from loadedConfig.experimentals
  // const defaultExperimentalFeaturesConfig = {
  //   stream: experimental?.stream || true
  // }

  try {
    const config = {
			reactStrictMode: reactStrictMode === undefined ? true : reactStrictMode,
			server: defaultServerConfig,
			vite: {
				plugins: defaultViteConfig.plugins,

				optimizeDeps: {
					exclude: [
						"node:http",
						"node-fetch",
						...defaultViteConfig.optimizeDeps.exclude,
					],
					include: [
						"react-fast-compare",
						"invariant",
						"shallowequal",
						"react-dom/client",
						"react-dom",
						"react",
						"react-router-dom",
						"react-helmet-async",
						...defaultViteConfig.optimizeDeps.include,
					],
				},

				css: {
					postcss: defaultViteConfig.css.postcss,
				},

				build: {
					external: defaultViteConfig.build.external,
				},

        resolve: {
          // concat two arrays
          alias: [
            {
              find: defaultViteConfig.resolve.symbole,
              replacement: "./src",
            },
            {
              find: "path",
              replacement: "node_modules/path-browserify",
            },
            ...defaultViteConfig.resolve.alias,
          ],
        },

        appType: "custom",
      },

      // experimental: defaultExperimentalFeaturesConfig,
      // More config options...
    };

    return config;
  } catch (error) {
    return {
      reactStrictMode: true,
      vite: {
        optimizeDeps: {
          exclude: ["node:http", "node-fetch"],
          include: [
            "react-fast-compare",
            "invariant",
            "shallowequal",
            "react-dom/client",
            "react-dom",
            "react",
            "react-router-dom",
            "react-helmet-async",
          ],
        },
        appType: "custom",
        resolve: {
          alias: [
            {
              find: "@",
              replacement: "./src",
            },
            {
              find: "path",
              replacement: "node_modules/path-browserify",
            },
          ],
        },
      },
      // experimental: {
      //   stream: true
      // },
    };
  }
};

/**
 * Function to adapt the path for dev and prod
 * @param {string | Array<string>} paths
 */
export const adaptPath = (paths: string | Array<string>) => {
  // Check if we are in dev mode or prod
  const isProduction = process.env.NODE_ENV === "production";
  const prefix = isProduction ? "./../../" : "";

  // Chech if the path is an array
  const isArray = Array.isArray(paths);

  // If the path is an array
  if (isArray) {
    return paths.map((path) => `${process.cwd()}/${prefix}${path}`);
  }

  // If the path is a string
  return `${process.cwd()}/${prefix}${paths}`;
};


/**
 * Adapts the provided file path to a valid URL format based on the operating system.
 * 
 * @param path - The file path to be adapted.
 * @returns The adapted file path in a valid URL format.
 */
export const resolvePath = (path: string) => {
  // Check the OS
  const isWindows = process.platform === "win32";

  // Adapt the path
  if (isWindows) {
    return `file:///${path}`;
  }

  return path;
}


/**
 * Asynchronously loads a module from a file path relative to the project root directory.
 *
 * This function checks the current environment (production or development) and adjusts the file path accordingly. It then resolves the file path to a valid URL format based on the operating system.
 *
 * @param filename - The name of the file to be loaded.
 * @returns The loaded module.
 */
// export const loadAsyncFromRoot = async (filename: string) => {
//   try {
//     const isProduction = process.env.NODE_ENV === "production";
//     let __pathToRoot = "";

//     if (!isProduction) {
//       __pathToRoot = process.cwd();
// 		} else {
//       __pathToRoot = path.join(process.cwd(), "./../../");
// 		}

//     const filePath = resolvePath(path.join(__pathToRoot, filename));

//     const file = await import(`./${filePath}`);

//     return file;
//   } catch (error) {
//     console.error(error);
//     return {};
//   }
// }

// export const getDirname = (url: string) => {
// 	// Get directory name
// 	const __dirname = dirname(fileURLToPath(url));

//   return __dirname;
// }