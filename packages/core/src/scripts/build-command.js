import { execaCommand } from "execa";
import chalk from "chalk";

(async function () {
	try {
		const buildClientCommand =
			"vite build --ssrManifest --outDir dist/client --config node_modules/rasengan/vite.config.ts";
		const buildServerCommand =
			"vite build --ssr node_modules/rasengan/lib/esm/entries/entry-server.js --outDir dist/server --config node_modules/rasengan/vite.config.ts";

		console.log(chalk.cyan(`Running client build ✨\n`));

		await execaCommand(buildClientCommand, {
			stdio: "inherit",
		});

		console.log(chalk.cyan(`\nRunning server build 🔥\n`));

		await execaCommand(buildServerCommand, {
			stdio: "inherit",
		});
	} catch (error) {
		console.error(chalk.red("Error while running build command: ", error));
		process.exit(1);
	}
})();
