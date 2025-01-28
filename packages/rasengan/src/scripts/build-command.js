import { execaCommand } from "execa";
import chalk from "chalk";

(async function () {
	try {
		console.log(chalk.cyan(`Running app build ✨\n`));

		await execaCommand(
			`vite build --app --config ./node_modules/rasengan/vite.config.ts`,
			{
				stdio: "inherit",
				env: {
					NODE_ENV: "production",
				},
			}
		);
	} catch (error) {
		console.error(chalk.red("Error while running build command: ", error));
		process.exit(1);
	}
})();
