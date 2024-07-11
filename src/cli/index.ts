#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import __dirname from "./dirname.js";
import { execa } from "execa";

// @ts-ignore
import path from "node:path";

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

    execa("node", ["node_modules/rasengan/server"], {
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
    execa("npm", ["run", "build"], {
      cwd: "node_modules/rasengan",
      stdio: "inherit", // Pipe child process output to the parent process
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
    const appConfig = await import(path.join(process.cwd(), "rasengan.config.js"));

    // Checking the config file in order to know about hosting strategy
    const { server } = appConfig;

    const hostingStrategy = server?.production?.hosting ?? "custom";

    if (hostingStrategy === "vercel") {
      // Displaying the message
      console.log(
        `Your project is configured to be hosted on ${chalk.bold.blue(
          hostingStrategy
        )}\n`
      );

      // Copying the api folder to the root directory
      execa(
        "cp",
        ["-r", "node_modules/rasengan/lib/esm/server/functions/vercel/api", "."],
        {
          stdio: "inherit",
        }
      );

      // Copying the vercel.json file to the root directory
      execa(
        "cp",
        ["node_modules/rasengan/lib/esm/server/functions/vercel/vercel.json", "."],
        {
          stdio: "inherit",
        }
      );
    } else if (hostingStrategy === "netlify") {
      // Displaying the message
      console.log(
        `Your project is configured to be hosted on ${chalk.bold.blue(
          hostingStrategy
        )}\n`
      );

      // create a netlify folder at the root
      execa("mkdir", ["-p", "netlify"], {
        stdio: "inherit",
      });

      // Copying the netlify folder to the root directory
      execa(
        "cp",
        [
          "-r",
          "node_modules/rasengan/lib/esm/server/functions/netlify/functions",
          "./netlify",
        ],
        {
          stdio: "inherit",
        }
      );

      // Copying the netlify.toml file to the root directory
      execa(
        "cp",
        ["node_modules/rasengan/lib/esm/server/functions/netlify/netlify.toml", "."],
        {
          stdio: "inherit",
        }
      );
    }
  });

// Handle the start command
program
  .command("start")
  .description("Start the project in production mode")
  .action(async () => {
    execa("npm", ["run", "preview"], {
      cwd: "node_modules/rasengan",
      stdio: "inherit", // Pipe child process output to the parent process
    });
  });

program.parse(process.argv);
