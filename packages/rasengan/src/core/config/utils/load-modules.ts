import { resolvePath } from "./path.js";
import fs from "fs/promises";

export const extensions = [
	".mjs",
	".js",
	".mts",
	".ts",
	".jsx",
	".tsx",
	".json",
];

/**
 * Asynchronously loads a module from a file path only in the server-side environment.
 *
 * @param path - The path to the module.
 * @returns The loaded module.
 */
export const loadModuleSSR = async (path: string) => {
	try {
		let modulePath = path;

		// Check if the module path has an extension
		const moduleExtension = path.split(".").pop(); // eg: js or ts

		if (!moduleExtension || !extensions.includes(`.${moduleExtension}`)) {
			const { path: newPath } = await findModulePath(path);
			modulePath = newPath;
		}

		const module = await import(/* @vite-ignore */ resolvePath(modulePath));
		return module;
	} catch (error) {
		throw new Error(error);
	}
};

/**
 * Finds the module path with the right extension.
 *
 * @param path - The path to the module.
 * @returns The module path and extension.
 */
export const findModulePath = async (path: string) => {
	try {
		let modulePath = path;
		let rightExtension = "";

		// Check if the module path has an extension
		const moduleExtension = path.split(".").pop(); // eg: js or ts

		if (!moduleExtension || !extensions.includes(`.${moduleExtension}`)) {
			for (let ext of extensions) {
				const newModulePath = `${modulePath}${ext}`;

				try {
					await fs.access(newModulePath);
					modulePath = newModulePath;
					rightExtension = ext;
					break;
				} catch (error) {
					continue;
				}
			}

			if (modulePath === path) {
				throw new Error(`Module "${path}" not found`);
			}
		}

		return {
			path: modulePath,
			extension: rightExtension,
		};
	} catch (error) {
		throw new Error(error);
	}
};

export const getDirname = async (url: string) => {
	// Load the dirname function from the path module
	// and return the dirname of the file URL
	const { dirname } = await import("node:path");
	const { fileURLToPath } = await import("node:url");

	return dirname(fileURLToPath(url));
};
