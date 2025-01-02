#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import { execa } from "execa";

// @ts-ignore
import path from "node:path";
import { resolvePath } from "../core/config/index.js";

const program = new Command();

program
	.name(chalk.blue("rasengan"))
	.version("1.0.0", "-v, --version", "Output the current version number");

// Handle the dev command
program
	.command("dev")
	.option("-p <port>")
	.description("Start development server")
	.action(async ({ p: port }: { p: number }) => {
		const convertedPort = Number(port);

		// Checking port
		if (
			port &&
			(isNaN(convertedPort) || convertedPort < 0 || convertedPort > 65535)
		) {
			console.log("");
			console.log(
				chalk.red("Please provide a valid port number between 0-65535")
			);
			console.log("");
			process.exit(1);
		}

		execa("node", ["node_modules/rasengan/lib/esm/server/dev/server"], {
			stdio: "inherit",
			env: {
				...process.env,
				PORT: convertedPort ? convertedPort.toString() : undefined,
			},
		});
	});

// Handle the build command
program
	.command("build")
	.description("Build the project")
	.action(() => {
		execa("node", ["node_modules/rasengan/lib/esm/scripts/build-command"], {
			stdio: "inherit",
		});
	});

// Handle the prebuild command
program
	.command("prepare")
	.description("Prepare the project")
	.action(async () => {
		// Displaying the message
		console.log("");
		console.log(chalk.blue("Preparing your project for production..."));
		console.log("");

		// Importing the config file
		const configPath = resolvePath(
			path.join(process.cwd(), "rasengan.config.js")
		);

		const appConfig = (await import(configPath)).default;

		// Checking the config file in order to know about hosting strategy
		const { server } = await appConfig;

		const hostingStrategy = server?.production?.hosting ?? "custom";

		execa("node", ["node_modules/rasengan/lib/esm/scripts/prepare-command"], {
			stdio: "inherit",
			env: {
				...process.env,
				HOSTING_STRATEGY: hostingStrategy,
			},
		});
	});

// Handle the start command
program
	.command("start")
	.description("Start the project in production mode")
	.action(async () => {
		execa("node", ["node_modules/rasengan/lib/esm/scripts/preview-command"], {
			stdio: "inherit",
		});
	});

program.parse(process.argv);
