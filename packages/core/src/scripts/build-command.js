import { execaCommand } from "execa";
import chalk from "chalk";
import { getDirname } from "../config/utils/index.js";
import { join } from "path";

(async function () {
	try {
		const __dirname = await getDirname(import.meta.url);

		const buildClientCommand =
			"vite build --ssrManifest --outDir dist/client --config node_modules/rasengan/vite.config.ts";
		const buildServerCommand =
			"vite build --ssr node_modules/rasengan/lib/esm/entries/entry-server.js --outDir dist/server --config node_modules/rasengan/vite.config.ts";

		console.log(chalk.cyan(`Running app build ✨\n`));

		// await execaCommand(buildClientCommand, {
		// 	stdio: "inherit",
		// });

		// console.log(chalk.cyan(`\nRunning server build 🔥\n`));
		const viteConfigPath = (join(__dirname, "../../../vite.config.ts")).replace(/ /g, '\\ ');
		console.log({ config: viteConfigPath });

		await execaCommand(
			`vite build --app --config ${viteConfigPath}`,
			{
				stdio: "inherit",
			}
		);
	} catch (error) {
		console.error(chalk.red("Error while running build command: ", error));
		process.exit(1);
	}
})();
