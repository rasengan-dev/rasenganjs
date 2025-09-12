import fs from "fs";

interface ManifestEntry {
	file?: string;
	name: string;
	imports?: string[];
	dynamicImports?: string[];
	css?: string[];
	isDynamicEntry?: boolean;
	isEntry?: boolean;
	src?: string;
}

interface ResolvedAssets {
	scripts: string[];
	styles: string[];
}

export class ManifestManager {
	private _manifestPath: string;
	private _manifest: Record<string, ManifestEntry>;
	private _entry = "src/index";

	constructor(manifestPath: string) {
		this._manifestPath = manifestPath;
		this._manifest = this.loadManifest();
	}

	/**
	 * Load the manifest file.
	 */
	private loadManifest(): Record<string, ManifestEntry> {
		try {
			const content = fs.readFileSync(this._manifestPath, "utf-8");
			return JSON.parse(content) as Record<string, ManifestEntry>;
		} catch (error) {
			console.error(`Error loading manifest file: ${(error as Error).message}`);
			return {};
		}
	}

	/**
	 * Resolve all assets for a given page.
	 * @param source - The file path of the page to resolve.
	 * @returns Resolved assets with scripts and styles.
	 */
	public resolveAssets(source: string): ResolvedAssets {
		const visited = new Set<string>();
		const assets: ResolvedAssets = {
			scripts: [],
			styles: [],
		};

		const collectAssets = (entry: ManifestEntry | undefined): void => {
			if (!entry || visited.has(entry.name)) return;
			visited.add(entry.name);

			// Add scripts
			if (entry.file && !assets.scripts.includes(entry.file)) {
				assets.scripts.push(entry.file);
			}

			// Add CSS
			if (entry.css) {
				entry.css.forEach((cssFile) => {
					if (!assets.styles.includes(cssFile)) {
						assets.styles.push(cssFile);
					}
				});
			}

			// // Collect static imports
			// if (entry.imports) {
			// 	entry.imports.forEach((importName) => {
			// 		const isPageChunk = importName.includes("page-");

			// 		if (!isPageChunk) {
			// 			collectAssets(this._manifest[importName]);
			// 		} else {
			// 			const pagePath = importName.split("-")[1];

			// 			if (pagePath === pageName) {
			// 				collectAssets(this._manifest[importName]);
			// 			}
			// 		}
			// 	});
			// }

			if (entry.imports) {
				for (const importName of entry.imports) {
					collectAssets(this._manifest[importName]);
				}
			}

			// // Collect dynamic imports
			// if (entry.dynamicImports) {
			// 	for (const dynamicImport of entry.dynamicImports) {
			// 		collectAssets(this._manifest[dynamicImport]);
			// 	}
			// }

			// Collect dynamic imports (filter by pageName)
			if (entry.dynamicImports) {
				for (const dynamicImport of entry.dynamicImports) {
					const dynEntry = this._manifest[dynamicImport];

					if (!dynEntry) continue;

					// Check if the dynamic import corresponds to the requested page
					if (dynEntry.src?.includes(source)) {
						collectAssets(dynEntry);
					}
				}
			}
		};

		collectAssets(
			this._manifest[`${this._entry}.js`] || this._manifest[`${this._entry}.ts`]
		);
		return assets;
	}

	/**
	 * Generate meta tags for a given page.
	 * @param source - The file path of the page to generate meta tags for.
	 * @returns HTML string containing script and style tags.
	 */
	public generateMetaTags(source: string) {
		const { scripts, styles } = this.resolveAssets(source);

		const scriptTags = scripts.map((file) => (
			<script type='module' src={`/${file}`}></script>
		));

		const styleTags = styles.map((file) => (
			<link rel='stylesheet' href={`/${file}`} />
		));

		return [...scriptTags, ...styleTags];
	}
}
