import { execaCommand } from "execa";
import chalk from "chalk";
import { getDirname } from "../core/config/utils/index.js";
import { join } from "path";

(async function () {
	try {
		const __dirname = await getDirname(import.meta.url);

		console.log(chalk.cyan(`Running app build ✨\n`));

		const viteConfigPath = join(__dirname, "../../../vite.config.ts").replace(
			/ /g,
			"\\ "
		);

		await execaCommand(`vite build --app --config ${viteConfigPath}`, {
			stdio: "inherit",
		});
	} catch (error) {
		console.error(chalk.red("Error while running build command: ", error));
		process.exit(1);
	}
})();
