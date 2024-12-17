import chalk from "chalk";

/**
 * Logs information about the next steps to take after a project has been created.
 *
 * @param nameOfProject - The name of the project that was created. If provided, the log will include instructions for navigating to the project directory and running the development server. If not provided, the log will only include instructions for installing dependencies and running the development server.
 */
export const logInfo = (nameOfProject: string) => {
	// Display the next steps
	console.log(chalk.bold.blue("Next steps:"));

	console.log("");

	// Display the next steps
	if (nameOfProject) {
		console.log(`1. ${chalk.blue(`cd ${nameOfProject}`)}`);
		console.log(
			`2. ${chalk.blue("npm install")} or ${chalk.blue("yarn")}`
		);
		console.log(
			`3. ${chalk.blue("npm run dev")} or ${chalk.blue(
				"yarn dev"
			)} or ${chalk.blue("pnpm run dev")}`
		);
	} else {
		console.log(
			`1. ${chalk.blue("npm install")} or ${chalk.blue("yarn")}`
		);
		console.log(
			`2. ${chalk.blue("npm run dev")} or ${chalk.blue(
				"yarn dev"
			)} or ${chalk.blue("pnpm run dev")}`
		);
	}

	console.log("");

	// Congratulation message
	console.log(`${chalk.bold.blue("Congratulation !")} 🎉`);

	console.log("");
	console.log(
		`For more information, visit ${chalk.blue("https://rasengan.dev/docs")}`
	);
};
