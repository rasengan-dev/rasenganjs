import chalk from "chalk";
import ora from "ora";
import fs from "fs/promises";
// @ts-ignore
import keypress from "keypress";
import openBrowser from "open";
import os from "node:os";
import { ServerMode } from "../runtime/mode.js";

// Get local IP
export default function getIPAddress() {
	// Get network interfaces
	const networkInterfaces = os.networkInterfaces();

	// Find the IPv4 address for the default network interface
	let ipAddress = "";

	// Loop through the network interfaces
	for (const interfaceName in networkInterfaces) {
		// Get the network interface
		const iface = networkInterfaces[interfaceName];

		// Skip when there is no network interface
		if (!iface) {
			continue;
		}

		// Loop through the interface addresses
		for (let i = 0; i < iface.length; i++) {
			const alias = iface[i];

			if (alias.family === "IPv4" && !alias.internal) {
				ipAddress = alias.address;
				break;
			}
		}

		if (ipAddress) {
			break;
		}
	}

	return ipAddress;
}

/**
 * Log server info after the server is started
 * @param {number} port The port the server is running on
 * @param {boolean} isProduction Whether the server is running in production mode
 * @param {boolean} open Whether to open the browser automatically
 */
export async function logServerInfo(
	port: number,
	mode: ServerMode,
	open: boolean = false
) {
	// Constants
	const arrowRight = "\u2192";

	// Spinner
	console.log("");
	const spinner = ora({
		text: `Starting server in ${mode} mode...`,
		color: "blue",
		spinner: "dots",
	}).start();

	// Getting the package.json file
	let packageJson: string = await fs.readFile(
		"node_modules/rasengan/package.json",
		"utf-8"
	);

	// Parsing the package.json file
	const parsedPackageJson = JSON.parse(packageJson);

	spinner.succeed(
		`${chalk.bold.blue(
			`Rasengan v${parsedPackageJson["version"]}`
		)} is running 🚀`
	);

	console.log("\n\n");

	process.stdout.write(
		`${chalk.bold.green(arrowRight)} ${chalk.bold("Local:")}   ${chalk.blue(
			`http://localhost:${chalk.bold(port)}`
		)}`
	);
	console.log("");

	// Get the IP address of the machine
	const ipAddress = getIPAddress();

	if (ipAddress) {
		process.stdout.write(
			`${chalk.bold.green(arrowRight)} ${chalk.bold("Network:")} ${chalk.blue(
				`http://${ipAddress}:${chalk.bold(port)}`
			)}\n`
		);
	}

	// Display options
	process.stdout.write(
		`${chalk.bold.green(arrowRight)} ${chalk.gray("Use")} ${chalk.bold(
			"-p <PORT>"
		)} ${chalk.gray("to specify a custom port")}\n`
	);
	process.stdout.write(
		`${chalk.bold.green(arrowRight)} ${chalk.gray("Press")} ${chalk.bold(
			"c"
		)} ${chalk.gray("to clear")}\n`
	);
	process.stdout.write(
		`${chalk.bold.green(arrowRight)} ${chalk.gray("Press")} ${chalk.bold(
			"ctrl + c"
		)} ${chalk.gray("to close the server")}\n`
	);

	console.log("\n");

	// Open the browser
	if (open) {
		openBrowser(`http://localhost:${port}`);
	}

	// Enable keypress events on the process.stdin stream
	keypress(process.stdin);

	// Listen on user keyboard input on the terminal
	process.stdin.on("keypress", (_: string, key: any) => {
		// Check if the key pressed is 'c'
		if (key) {
			if (key.name === "c" && key.ctrl) {
				console.log(
					`${chalk.green("ctrl + c")} ${chalk.gray("pressed: ")} ${chalk.blue(
						"Closing server... \n\n"
					)}`
				);
				process.exit(0);
			} else if (key.name === "c" && !key.ctrl && !key.meta && !key.shift) {
				// Clear terminal
				process.stdout.write("\x1Bc");

				logServerInfo(port, mode);
			}
		}
	});

	// Allow the process to exit when Ctrl+C is pressed
	if (process.stdin.setRawMode instanceof Function) {
		process.stdin.setRawMode(true);
	}
	process.stdin.resume();

	// Set a higher limit for the number of listeners
	process.stdin.setMaxListeners(100);
}
