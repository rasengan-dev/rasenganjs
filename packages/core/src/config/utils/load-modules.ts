/**
 * Asynchronously loads a module from a file path.
 *
 * @param path - The path to the module.
 * @returns The loaded module.
 */
export const loadModule = async (path: string) => {
	try {
		const module = await import(path);
		return module;
	} catch (error) {
		throw new Error(error);
	}
};

/**
 * Asynchronously loads a module from a file path only in the server-side environment.
 *
 * @param path - The path to the module.
 * @returns The loaded module.
 */
export const loadModuleSSR = async (path: string) => {
	try {
		if (typeof window === "undefined") {
			const module = await loadModule(path);
			return module;
		}

		return {};
	} catch (error) {
		throw new Error(error);
	}
};

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