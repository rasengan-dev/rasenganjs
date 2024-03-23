#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import __dirname from "./dirname.js";
import { execa } from "execa";

// Config

// @ts-ignore
import config from "../../../../rasengan.config.js";

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
  .action(() => {
    // Displaying the message
    console.log("");
    console.log(chalk.blue("Preparing your project for production..."));
    console.log("");

    // Checking the config file in order to know about hosting strategy
    const { server } = config;

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
        ["-r", "node_modules/rasengan/lib/server/functions/vercel/api", "."],
        {
          stdio: "inherit",
        }
      );

      // Copying the vercel.json file to the root directory
      execa(
        "cp",
        ["node_modules/rasengan/lib/server/functions/vercel/vercel.json", "."],
        {
          stdio: "inherit",
        }
      );

      // Removing index.d.ts and index.js.map files from the api folder
      execa("rm", ["api/index.d.ts"], {
        stdio: "inherit",
      });
    } else if (hostingStrategy === "netlify") {
      // Copying the netlify.toml file to the root directory
      // execa(
      //   "cp",
      //   ["node_modules/rasengan/src/server/functions/netlify/netlify.toml", "."],
      //   {
      //     stdio: "inherit",
      //   }
      // );
    }
  });

// Handle the start command
program
  .command("start")
  .description("Start the project in production mode")
  .action(async () => {
    const childProcess = execa("npm", ["run", "preview"], {
      cwd: "node_modules/rasengan",
      stdio: "inherit", // Pipe child process output to the parent process
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        process.stdout.write("Project started Succesfully");
      }
    });
  });

program.parse(process.argv);
